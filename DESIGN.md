# Start of Selection
# Design System: Midnight Bento

## 1. Color Palette
- **Background**: `#13111C` (Deep Void)
- **Surface (Card)**: `#1E1B2E` (Dark Violet/Grey)
- **Primary Accent**: `#6C63FF` (Electric Purple)
- **Secondary Accent**: `#2A2640` (Muted Violet)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#8F8FAA`

## 2. Typography
- **Headings**: **Inter**, Bold, Tight tracking.
- **Body**: **Inter**, Regular/Medium.

## 3. Components

### A. Dashboard Header
- **Greeting**: "Good morning, [User]" (Large, Bold)
- **Profile**: Small circular avatar (Placekitten/Placeholder).
- **Search Bar**: Full width, pill-shaped, dark grey background (`#2A2640`), muted text.

### B. Widget Cards (Bento Grid)
- **Shape**: `rounded-3xl` (Large rounded corners).
- **Pinned Card**: Full width top card. Gradient border or prominent background tag "PINNED".
- **Standard Cards**: 2-column grid.
- **Visuals**:
    - Icons for categories (Groceries, Goals).
    - Progress bars (visual only for now).
    - Checkboxes style.

### C. Navigation
- **FAB**: Large, circular, floating bottom-right. `#6C63FF` gradient.
- **Bottom Bar**: Minimal or removed in favor of Dashboard + FAB feel (as per image). *Decision: Keep simplified Bottom Dock for navigation, but style it invisible/dark to match.*

## 4. Animations
- **Entry**: Staggered fade-up for bento cards.
- **Hover**: Subtle lift and border glow.
