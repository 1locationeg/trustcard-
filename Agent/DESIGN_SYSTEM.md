# Design System

## Core Color Tokens (CSS Variables mapped to Tailwind)
- **Primary**: Blue (`--primary: #2563EB`, text/bg utilities)
- **Neutral/Backgrounds**: Slate (`--background: #F8FAFC`, `--foreground: #0F172A`, text/bg utilities)
- **Success (Low Impact)**: Green (`--success: #22C55E`, text-green-700 bg-green-50 border-green-200)
- **Warning (Medium Impact)**: Amber (`--warning: #F59E0B`, text-amber-700 bg-amber-50 border-amber-200)
- **Error (High Impact)**: Red (`--destructive: #EF4444`, text-red-700 bg-red-50 border-red-200)
- **Info/Bridges**: Slate-50/100 (`--muted`, border/bg utilities)

## Typography & Weights
- **Primary Font Family**: Inter (`font-sans`)
- **Card/Section Titles**: `text-lg font-bold text-slate-900`
- **Section Subtitles**: `text-sm text-slate-500 mt-1 font-medium` (always formatted as short noun phrases, no terminal punctuation)
- **Metric Value Highlight**: `text-2xl font-bold text-slate-900` (plus `tabular-nums` for numeric alignment inside tables/funnels)
- **Small Labels**: `text-xs font-semibold uppercase tracking-wider text-slate-500`

## Spacing, Borders & Shadows
- **Base Spacing Grid**: 4px (`gap-1` = 4px, `gap-2` = 8px, `gap-4` = 16px, `gap-6` = 24px)
- **Outer Card Shadows**: `shadow-sm border border-slate-200`
- **Card Corner Radius**: `rounded-xl` (12px base, maps to Tailwind `rounded-xl`)
- **Interactive Badges/Pills/Buttons Radius**: `rounded-md` (8px base, maps to Tailwind `rounded-md` or `rounded-lg` depending on parent container)
- **Standard Card Layout Spacing**:
  - `CardHeader`: `pb-4 border-b border-slate-100 shrink-0`
  - `CardContent`: `pt-6` (to separate content clean from header bottom border)