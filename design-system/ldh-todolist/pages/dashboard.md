# Dashboard Page Overrides

**Project:** LDH TodoList
**Page:** `/` todo dashboard
**Overrides:** Master (`Flat Design` + teal/orange)

Keep Master colors. Do not use dark analytics dashboard styling.

## Layout

- Minimal single column, `max-w-2xl`
- Sticky header with `top-4 left-4 right-4` inset (not flush to viewport edges)
- Composer (add todo) at top, then filter tabs, then list

## Interactions

- Filter tabs: All / Active / Completed with `role="tablist"`
- Row hover: background tint only (`bg-primary/5`), no scale
- Completed items: checkbox + line-through (color is not the only indicator)
- Empty states differ by filter

## Density

- Comfortable padding (not data-dense)
- Stats as three compact counts, not charts
