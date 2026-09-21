# Todo Reminder Overrides

**Project:** LDH TodoList
**Page:** `/` reminders
**Overrides:** Master (`Flat Design` + teal/orange)

## Layout

- Keep single column `max-w-2xl`
- Composer stacks title, then 기한 / 알림 datetime fields
- Every datetime input has a visible label

## Reminder UX

- Locale-aware Korean dates (`오늘 14:00`, `기한 지남`)
- Overdue uses danger color **and** text, not color alone
- Browser notification permission is opt-in (banner + button), never auto-prompt on load
- In-app `role="alert"` duplicate of the system notification
- `prefers-reduced-motion` already global

## Anti-patterns

- Ambiguous `01/02/03` dates
- Notification permission popup with no context
- Color-only overdue state
