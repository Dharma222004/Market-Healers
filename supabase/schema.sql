-- ==============================================================================
-- MARKET HEALERS — COMPLETE DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. USER PROFILES TABLE (Associated with auth.users.id)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  experience_level TEXT DEFAULT 'Beginner', -- 'Beginner', 'Intermediate', 'Advanced'
  primary_goal TEXT DEFAULT 'Learn investing',
  risk_profile JSONB DEFAULT '{
    "level": "Moderate",
    "riskUnderstanding": 50,
    "financialDiscipline": 50,
    "marketKnowledge": 50,
    "drawdownTolerance": "Moderate",
    "timeHorizon": "Medium"
  }'::jsonb,
  preferred_sectors TEXT[] DEFAULT '{}'::text[],
  is_profile_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 2. SUBSCRIPTIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free', -- 'free', 'pro', 'premium'
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'trialing', 'past_due', 'cancelled', 'expired'
  current_period_start TIMESTAMPTZ DEFAULT NOW(),
  current_period_end TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days',
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_subscription UNIQUE(user_id)
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage subscriptions"
  ON public.subscriptions FOR ALL
  USING (true);

-- ------------------------------------------------------------------------------
-- 3. COURSE ENROLLMENTS & PROGRESS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  progress_percent INTEGER NOT NULL DEFAULT 0,
  current_lesson_id TEXT,
  completed_lessons_count INTEGER NOT NULL DEFAULT 0,
  total_lessons_count INTEGER NOT NULL DEFAULT 12,
  is_completed BOOLEAN NOT NULL DEFAULT false,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_course UNIQUE(user_id, course_id)
);

ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments"
  ON public.course_enrollments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments"
  ON public.course_enrollments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own enrollments"
  ON public.course_enrollments FOR UPDATE
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 4. LESSON PROGRESS TRACKING
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started', -- 'not_started', 'in_progress', 'completed'
  progress_percent INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  last_accessed_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_lesson UNIQUE(user_id, course_id, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lesson progress"
  ON public.lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lesson progress"
  ON public.lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON public.lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 5. LEARNING ACTIVITIES & STREAK AUDIT
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.learning_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL, -- 'lesson_completed', 'quiz_completed', 'course_started'
  activity_date DATE NOT NULL DEFAULT CURRENT_DATE,
  course_id TEXT,
  lesson_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_activity_day_lesson UNIQUE(user_id, activity_date, activity_type, lesson_id)
);

ALTER TABLE public.learning_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own learning activity"
  ON public.learning_activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can record own learning activity"
  ON public.learning_activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 6. USER STREAK & SUMMARY
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_streaks (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  lessons_this_week INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own streak"
  ON public.user_streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own streak"
  ON public.user_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own streak"
  ON public.user_streaks FOR UPDATE
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 7. NEW USER TRIGGER (Auto-creates profile, subscription, streak on signup)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert default profile
  INSERT INTO public.profiles (id, full_name, email, experience_level, primary_goal, is_profile_complete)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'Beginner',
    'Learn investing',
    false
  )
  ON CONFLICT (id) DO NOTHING;

  -- Insert default free subscription
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active')
  ON CONFLICT (user_id) DO NOTHING;

  -- Insert default streak record
  INSERT INTO public.user_streaks (user_id, current_streak, longest_streak, lessons_this_week)
  VALUES (NEW.id, 0, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
