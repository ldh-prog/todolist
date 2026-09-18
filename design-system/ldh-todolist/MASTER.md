# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** LDH TodoList (`kr.ulsan.ldh.todolist`)
**Generated:** 2026-09-18
**Category:** Productivity Tool

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#0D9488` | `--color-primary` |
| Secondary | `#14B8A6` | `--color-secondary` |
| CTA/Accent | `#F97316` | `--color-cta` |
| Background | `#F0FDFA` | `--color-background` |
| Surface | `#FFFFFF` | `--color-surface` |
| Text | `#134E4A` | `--color-text` |
| Muted | `#3F6B67` | `--color-muted` |
| Border | `#CCE8E4` | `--color-border` |
| Danger | `#DC2626` | `--color-danger` |

**Color Notes:** Teal focus + action orange. Light mode only for WCAG contrast.

### Typography

- **Heading Font:** Plus Jakarta Sans
- **Body Font:** Plus Jakarta Sans
- **Mood:** friendly, modern, saas, clean, approachable, professional
- **Google Fonts:** [Plus Jakarta Sans](https://fonts.google.com/share?selection.family=Plus+Jakarta+Sans:wght@300;400;500;600;700)

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

Flat Design이므로 그림자는 거의 쓰지 않는다. 구분은 **border + background**로 한다.

---

## Style Guidelines

**Style:** Flat Design

**Keywords:** 2D, minimalist, bold colors, no shadows, clean lines, simple shapes, typography-focused, modern, icon-heavy

**Key Effects:** No gradients/shadows, simple hover (color/opacity shift), fast loading, clean transitions (150-200ms ease), Lucide icons only

### Page Pattern

**Pattern Name:** Minimal Single Column

- Single CTA focus, large typography, lots of whitespace, mobile-first
- Container: `max-w-2xl` (할일 목록), `max-w-md` (인증 폼)
- Icons: Lucide, 20–24px, consistent set

---

## Anti-Patterns (Do NOT Use)

- Complex onboarding
- Emojis as icons
- Missing `cursor-pointer` on clickable elements
- Layout-shifting hovers (`scale`, `translateY` that moves siblings)
- Low contrast text
- Instant state changes (always 150–300ms transitions)
- Invisible focus states
- Placeholder-only form inputs

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons (use Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
