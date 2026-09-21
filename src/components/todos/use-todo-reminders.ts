// src/components/todos/use-todo-reminders.ts
"use client";

import { useEffect, useState } from "react";
import { markTodoReminderFiredAction } from "@/actions/todos";
import { APP_NAMESPACE, REMINDER_POLL_MS } from "@/lib/constants";
import type { Todo } from "@/lib/todos/types";

type NotificationPermissionState = NotificationPermission | "unsupported";

function supportsNotifications() {
  return typeof window !== "undefined" && "Notification" in window;
}

function localFiredKey(todo: Todo) {
  return `${APP_NAMESPACE}:reminder-fired:${todo.id}:${todo.remind_at ?? ""}`;
}

function wasFiredLocally(todo: Todo) {
  try {
    return window.sessionStorage.getItem(localFiredKey(todo)) === "1";
  } catch {
    return false;
  }
}

function markFiredLocally(todo: Todo) {
  try {
    window.sessionStorage.setItem(localFiredKey(todo), "1");
  } catch {
    // private mode 등에서 sessionStorage가 막힐 수 있습니다.
  }
}

function shouldFire(todo: Todo, now: number) {
  if (todo.is_completed || !todo.remind_at || todo.reminder_fired_at) {
    return false;
  }
  if (wasFiredLocally(todo)) {
    return false;
  }
  return new Date(todo.remind_at).getTime() <= now;
}

async function showReminder(todo: Todo) {
  if (supportsNotifications() && Notification.permission === "granted") {
    const notification = new Notification("할 일 알림", {
      body: todo.title,
      tag: `${APP_NAMESPACE}:${todo.id}`,
    });
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }
}

export function useTodoReminders(todos: Todo[]) {
  const [permission, setPermission] = useState<NotificationPermissionState>(
    () =>
      supportsNotifications() ? Notification.permission : "unsupported",
  );
  const [activeReminder, setActiveReminder] = useState<Todo | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timers = new Set<number>();

    async function fire(todo: Todo) {
      if (cancelled || !shouldFire(todo, Date.now())) {
        return;
      }

      markFiredLocally(todo);
      setActiveReminder(todo);
      await showReminder(todo);
      await markTodoReminderFiredAction(todo.id);
    }

    function schedule() {
      const now = Date.now();
      for (const todo of todos) {
        if (
          todo.is_completed ||
          !todo.remind_at ||
          todo.reminder_fired_at ||
          wasFiredLocally(todo)
        ) {
          continue;
        }

        const remindAt = new Date(todo.remind_at).getTime();
        if (Number.isNaN(remindAt)) {
          continue;
        }

        if (remindAt <= now) {
          void fire(todo);
          continue;
        }

        const delay = Math.min(remindAt - now, REMINDER_POLL_MS);
        const timerId = window.setTimeout(() => {
          timers.delete(timerId);
          void fire(todo);
        }, delay);
        timers.add(timerId);
      }
    }

    schedule();
    const intervalId = window.setInterval(schedule, REMINDER_POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [todos]);

  async function enableNotifications() {
    if (!supportsNotifications()) {
      setPermission("unsupported");
      return false;
    }

    const next = await Notification.requestPermission();
    setPermission(next);
    return next === "granted";
  }

  function dismissReminder() {
    setActiveReminder(null);
  }

  return {
    permission,
    activeReminder,
    enableNotifications,
    dismissReminder,
  };
}
