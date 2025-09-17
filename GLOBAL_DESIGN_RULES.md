# Global Design Rules

## Color Palette

### Base Colors
- **Night Mode**: Black + Dark Grey
- **Day Mode**: White + Light Grey

### Accent Colors (Only)
- **Red**: For negative values, errors, warnings
- **Green**: For positive values, success states
- **Blue**: For informational elements, links, interactive states (where needed)

### Color Usage Rules
- No other colors allowed (no purple, orange, yellow, etc.)
- Bars/progress indicators: Use theme-aware greys (not blue)
- **Trend badges**: Use red/green for negative/positive changes (meaningful colors)
- **Status badges**: Use grey unless specifically indicating status (red/green/blue)
- **Other badges**: Use theme-aware greys by default
- Text: Use theme-aware foreground colors only
- Backgrounds: Use theme-aware background colors only

## Typography

### Font Sizes (Only 3 Allowed)
1. **Small**: `text-xs` (12px) - For secondary text, labels, captions
2. **Medium**: `text-sm` (14px) - For primary text, buttons, most content
3. **Large**: `text-lg` (18px) - For headings, important numbers, titles

### Font Weight Rules
- **Normal**: `font-normal` - For body text
- **Medium**: `font-medium` - For emphasis
- **Semibold**: `font-semibold` - For headings
- **Bold**: `font-bold` - For important numbers/values only

## Component Rules

### Bars & Progress Indicators
- Background: `bg-muted` (theme-aware grey)
- Fill: `bg-foreground/60` (theme-aware grey, not blue)
- Never use colored bars unless specifically for status (red/green)

### Badges
- Default: `bg-muted text-muted-foreground` (grey)
- Success: `bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400`
- Error: `bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400`
- Info: `bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400` (only when needed)

### Cards & Containers
- Background: `bg-background`
- Borders: `border-border`
- No custom shadows or colors

### Text Colors
- Primary: `text-foreground`
- Secondary: `text-muted-foreground`
- Never use hardcoded colors like `text-gray-500`

## Spacing Rules
- Use consistent Tailwind spacing: `2`, `3`, `4`, `6`, `8`
- Avoid custom spacing values
- Maintain consistent padding and margins across components

## Implementation

### Global Design System Files
- **`/src/styles/design-system.css`** - Global CSS utilities
- **`/src/components/ui/design-system.tsx`** - Reusable components
- **`/src/app/globals.css`** - Imports design system

### Usage Rules
- Use design system components: `<TrendBadge />`, `<CleanCard />`, etc.
- Use CSS utilities: `.trend-positive`, `.text-scale-medium`, etc.
- All components must follow these rules
- No exceptions without explicit approval
- Use theme-aware Tailwind classes only
- Test in both light and dark modes

### Forbidden Patterns
```css
❌ NEVER USE:
text-[14px]     → ✅ USE: text-sm or .text-scale-medium
text-gray-500   → ✅ USE: text-muted-foreground
bg-purple-100   → ✅ USE: Only red/green/blue accents
```
