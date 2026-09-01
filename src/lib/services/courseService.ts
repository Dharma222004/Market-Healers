import { DBCourse, DBLesson, DBEnrollment } from "@/types/database";
import { MOCK_COURSES, MOCK_ENROLLMENTS } from "@/lib/db/mockDb";

export interface ICourseService {
  getAllCourses(): Promise<DBCourse[]>;
  getCourseById(courseId: string): Promise<DBCourse | null>;
  getCourseBySlug(slug: string): Promise<DBCourse | null>;
  getLesson(courseId: string, lessonId: string): Promise<{ lesson: DBLesson; course: DBCourse } | null>;
  getUserEnrollments(userId: string): Promise<DBEnrollment[]>;
  getActiveEnrollment(userId: string): Promise<{ enrollment: DBEnrollment; course: DBCourse } | null>;
  markLessonComplete(userId: string, courseId: string, lessonId: string): Promise<DBEnrollment>;
}

class CourseService implements ICourseService {
  private courses: DBCourse[] = [...MOCK_COURSES];
  private enrollments: DBEnrollment[] = [...MOCK_ENROLLMENTS];

  async getAllCourses(): Promise<DBCourse[]> {
    return [...this.courses];
  }

  async getCourseById(courseId: string): Promise<DBCourse | null> {
    return this.courses.find((c) => c.id === courseId) || null;
  }

  async getCourseBySlug(slug: string): Promise<DBCourse | null> {
    return this.courses.find((c) => c.slug === slug) || null;
  }

  async getLesson(courseId: string, lessonId: string): Promise<{ lesson: DBLesson; course: DBCourse } | null> {
    const course = await this.getCourseById(courseId);
    if (!course) return null;

    for (const mod of course.modules) {
      const lesson = mod.lessons.find((l) => l.id === lessonId);
      if (lesson) {
        return { lesson, course };
      }
    }
    return null;
  }

  async getUserEnrollments(_userId: string): Promise<DBEnrollment[]> {
    return [...this.enrollments];
  }

  async getActiveEnrollment(userId: string): Promise<{ enrollment: DBEnrollment; course: DBCourse } | null> {
    const active = this.enrollments.find((e) => !e.isCompleted) || this.enrollments[0];
    if (!active) return null;
    const course = await this.getCourseById(active.courseId);
    if (!course) return null;
    return { enrollment: active, course };
  }

  async markLessonComplete(_userId: string, courseId: string, lessonId: string): Promise<DBEnrollment> {
    let enrollment = this.enrollments.find((e) => e.courseId === courseId);
    if (!enrollment) {
      enrollment = {
        id: "enr_" + Math.random().toString(36).substring(2, 7),
        userId: "demo_user",
        courseId,
        progressPercent: 10,
        currentLessonId: lessonId,
        completedLessonIds: [lessonId],
        isCompleted: false,
        enrolledAt: new Date().toISOString(),
      };
      this.enrollments.push(enrollment);
      return enrollment;
    }

    if (!enrollment.completedLessonIds.includes(lessonId)) {
      enrollment.completedLessonIds.push(lessonId);
      const course = await this.getCourseById(courseId);
      const totalLessons = course?.lessonsCount || 10;
      enrollment.progressPercent = Math.min(100, Math.round((enrollment.completedLessonIds.length / totalLessons) * 100));
      if (enrollment.progressPercent >= 100) {
        enrollment.isCompleted = true;
        enrollment.completedAt = new Date().toISOString();
      }
    }
    return enrollment;
  }
}

export const courseService = new CourseService();
