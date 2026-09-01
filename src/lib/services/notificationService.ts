import { DBNotification } from "@/types/database";
import { MOCK_NOTIFICATIONS } from "@/lib/db/mockDb";

const STORAGE_KEY = "market_healers_notifications";

class NotificationService {
  private getStored(): DBNotification[] {
    if (typeof window === "undefined") return MOCK_NOTIFICATIONS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : MOCK_NOTIFICATIONS;
    } catch {
      return MOCK_NOTIFICATIONS;
    }
  }

  private save(items: DBNotification[]) {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.warn(e);
      }
    }
  }

  async getNotifications(): Promise<DBNotification[]> {
    return this.getStored();
  }

  async getUnreadCount(): Promise<number> {
    const list = this.getStored();
    return list.filter((n) => !n.isRead).length;
  }

  async markAsRead(id: string): Promise<void> {
    const list = this.getStored();
    const updated = list.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    this.save(updated);
  }

  async markAllAsRead(): Promise<void> {
    const list = this.getStored();
    const updated = list.map((n) => ({ ...n, isRead: true }));
    this.save(updated);
  }
}

export const notificationService = new NotificationService();
