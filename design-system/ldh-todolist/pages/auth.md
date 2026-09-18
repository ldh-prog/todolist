# Auth Page Overrides

**Project:** LDH TodoList
**Page:** login / signup
**Overrides:** Master (`Flat Design` + teal/orange)

Keep Master colors and Plus Jakarta Sans. Do not switch to Inter or blue.

## Layout

- Centered single column, `max-w-md`
- Hero: product name + 한 줄 가치 제안
- Benefit bullets: 최대 3개
- Form card: white surface, visible teal-tinted border
- Fields: 이메일, 비밀번호 (2 fields). 회원가입도 동일하게 2 fields

## Form UX

- Every input has a visible `<label>`
- Password visibility toggle with Lucide `Eye` / `EyeOff`
- Submit CTA uses `--color-cta` (#F97316)
- Error text is not color-only: icon + message
- Focus ring: `focus-visible:ring-2 focus-visible:ring-primary`

## Anti-patterns for this page

- Complex signup
- Placeholder-only labels
- Dark background
