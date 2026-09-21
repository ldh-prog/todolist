# Shopping Page Overrides

**Project:** LDH TodoList
**Page:** `/shopping`
**Overrides:** Master (`Flat Design` + teal/orange)

Keep Master colors and Plus Jakarta Sans. Do not introduce a second palette.

## Layout

- Minimal single column, `max-w-2xl`
- Same sticky header as 할 일, with in-app nav: 할 일 / 장보기
- Composer: name + quantity + category, then CTA `담기`
- List grouped by category
- Filter tabs: 전체 / 살 것 / 담음

## Interactions

- Quantity stepper uses `Minus` / `Plus` icons, no layout-shifting hover
- Purchased items: checkbox + line-through (color is not the only indicator)
- Category is a labeled select, not placeholder-only
- Clear purchased is a secondary action, not the primary CTA

## Anti-patterns for this page

- Mixing shopping rows into the todo table
- Emoji category icons
- Scale/translate hover on list rows
