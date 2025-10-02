# Design System - Currency Converter

## Theme Selection

**USE OCEAN THEME** with custom gradient enhancements for modern fintech appeal.

## Foundations

### Color System

**Light Mode:**
- Primary: hsl(200, 84%, 42%) - Rich blue for buttons and interactive elements
- Background: hsl(0, 0%, 98%) - Very light gray for main background
- Card: hsl(0, 0%, 100%) - Pure white for currency converter card
- Text: hsl(0, 0%, 12%) - Very dark gray for high contrast readability
- Secondary: hsl(200, 84%, 42%) - Rich blue for secondary actions
- Border: hsl(0, 0%, 88%) - Light gray for subtle borders
- Muted: hsl(0, 0%, 94%) - Very light gray for disabled states
- Accent: hsl(180, 84%, 45%) - Teal for hover states and highlights
- Success: hsl(142, 71%, 45%) - Green for positive rate changes
- Chart: hsl(220, 84%, 39%) - Deep blue for rate visualization

**Dark Mode:**
- Background: hsl(0, 0%, 9%) - Very dark gray
- Card: hsl(0, 0%, 14%) - Dark gray for converter card
- Primary: hsl(200, 84%, 42%) - Rich blue maintained
- Text: hsl(0, 0%, 95%) - Very light gray
- Border: hsl(0, 0%, 22%) - Medium dark gray
- Muted: hsl(0, 0%, 18%) - Dark gray for disabled states

**Currency Chip Colors:**
- Default: Card background with Border color
- Selected: Primary color background with white text
- Hover: Muted background with slight scale transform

### Typography

**Font Family:**
- Primary: Inter - Modern, highly readable for numbers and currency data
- Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

**Type Scale:**
- Display: 3.5rem (56px) - Large conversion amounts
- H1: 2.5rem (40px) - Page title
- H2: 2rem (32px) - Section headers
- H3: 1.5rem (24px) - Currency labels
- Body: 1rem (16px) - Standard text
- Small: 0.875rem (14px) - Exchange rates, timestamps
- Micro: 0.75rem (12px) - Helper text

**Font Weights:**
- Regular: 400 - Body text
- Medium: 500 - Currency names
- Semibold: 600 - Conversion amounts
- Bold: 700 - Primary headings

**Line Heights:**
- Tight: 1.2 - Display numbers
- Normal: 1.5 - Body text
- Relaxed: 1.75 - Helper text

### Spacing & Grid

**Spacing Scale (rem):**
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

**Grid System:**
- Container max-width: 600px (centered single-page layout)
- Card padding: 2xl (48px)
- Input spacing: lg (24px)
- Chip gap: sm (8px)
- Section margin: xl (32px)

**Breakpoints:**
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Iconography

**Icon Library:** Lucide React

**Key Icons:**
- ArrowDownUp - Currency swap/exchange
- TrendingUp - Rate increases
- TrendingDown - Rate decreases
- RefreshCw - Update rates
- Globe - Currency selection
- Search - Currency search
- Check - Selected currency chip

**Icon Sizes:**
- Small: 16px - Inline with text
- Medium: 24px - Buttons and chips
- Large: 32px - Primary actions

## Component Design

### Currency Converter Card
- Background: Card color with subtle shadow (0 4px 20px rgba(0,0,0,0.08))
- Border radius: 16px for modern feel
- Padding: 2xl on desktop, xl on mobile
- Max-width: 600px centered

### Input Fields
- Height: 64px for easy touch targets
- Font size: H2 (2rem) for conversion amounts
- Border: 2px solid Border color, Primary on focus
- Border radius: 12px
- Padding: lg (24px)
- Transition: all 0.3s ease for focus states

### Currency Chips
- Height: 48px
- Padding: sm md (8px 16px)
- Border radius: 24px (pill shape)
- Border: 1px solid Border color
- Font size: Body (1rem)
- Gap between chips: sm (8px)
- Transition: transform 0.2s, background 0.2s
- Hover: scale(1.05) + Muted background
- Active: Primary background + white text + scale(1.0)

### Buttons
- Primary: Primary background, white text, 48px height
- Border radius: 12px
- Padding: md lg (16px 24px)
- Font weight: Semibold
- Transition: all 0.3s ease
- Hover: brightness(110%)
- Active: scale(0.98)

## Theming

**Light Mode (Default):**
- Clean white converter card on light gray background
- High contrast text for numbers and currency codes
- Subtle shadows for depth
- Blue accent for interactive elements

**Dark Mode:**
- Dark converter card on darker background
- Maintained contrast ratios for readability
- Blue accent color preserved
- Reduced shadow intensity

**Theme Toggle:**
- Positioned top-right corner
- Moon/Sun icon toggle
- Smooth transition: all 0.3s ease
- Persisted in localStorage

## Animation & Micro-interactions

**Page Load:**
- Fade in + slide up converter card (0.5s ease-out)
- Stagger animation for currency chips (0.1s delay each)

**Input Interactions:**
- Focus: Border color change (0.3s) + subtle scale(1.02)
- Type: Real-time conversion with 300ms debounce

**Currency Swap:**
- ArrowDownUp icon rotate 180deg (0.4s ease-in-out)
- Amount values crossfade (0.3s)

**Chip Selection:**
- Scale(1.05) on hover (0.2s)
- Background color transition (0.2s)
- Checkmark fade in on selection (0.2s)

**Rate Updates:**
- Pulse animation on rate change (0.5s)
- Color flash: Green for increase, Red for decrease
- Number counter animation (0.8s ease-out)

**Loading States:**
- Skeleton shimmer effect for rate data
- Spinner on refresh button (rotate 360deg infinite)

**Transitions:**
- All color changes: 0.3s ease
- All transforms: 0.2s ease-out
- Theme switch: 0.3s ease (all properties)

## Dark Mode & Color Contrast Rules (Critical)

- Always use explicit colors - never rely on browser defaults or component variants like 'variant="outline"'
- Force dark mode with CSS: 'html { color-scheme: dark; }' and 'meta name="color-scheme" content="dark"'
- Use high contrast ratios: minimum 4.5:1 for normal text, 3:1 for large text
- Override browser defaults with '!important' for form elements: 'input, textarea, select { background-color: #000000 !important; color: #ffffff !important; }'
- Test in both light and dark system modes - system dark mode can override custom styling
- Use semantic color classes instead of component variants: 'className="bg-gray-800 text-gray-300 border border-gray-600"' not 'variant="outline"'
- Create CSS custom properties for consistency across components
- Quick debugging: check if using 'variant="outline"', add explicit colors, use '!important' if needed, test system modes

### Color Contrast Checklist (apply to all components):
□ No 'variant="outline"' or similar browser-dependent styles
□ Explicit background and text colors specified
□ High contrast ratios (4.5:1+ for text, 3:1+ for large text)
□ Tested with system dark mode ON and OFF
□ Form elements have forced dark styling
□ Badges and buttons use custom classes, not default variants
□ Placeholder text has proper contrast
□ Focus states are visible and accessible
