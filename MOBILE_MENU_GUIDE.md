# Mobile Navigation Menu Guide

## Overview
The mobile navigation menu provides easy access to all main sections of the POS application on mobile devices and smaller screens.

## Features

### 🍔 Hamburger Menu Icon
- **Appears on screens under 1280px**
- Located in the top-right corner of the header
- Tap to open/close the navigation menu
- Changes from ☰ (hamburger) to ✕ (close) when open

### 📱 Slide-in Drawer
- **280px width** on tablets and larger phones
- **85% width** (max 320px) on small phones
- Slides in from the right side
- Smooth animation with backdrop overlay
- Click/tap outside to close

### 🧭 Navigation Items
Each menu item includes:
- Icon for visual identification
- Text label for clarity
- Active state highlighting (pink accent)
- Left border on active page
- Smooth hover/tap effects

## Menu Structure

```
┌─────────────────────────┐
│  ☰  Little Duckling  🌙 │
├─────────────────────────┤
│                         │
│  Dashboard →            │
│  Order List →           │
│  Reports →              │
│  History →              │
│  Admin →                │
│                         │
└─────────────────────────┘
```

## Navigation Pages

1. **Dashboard** 🏠
   - Main overview
   - Open orders
   - Menu items
   - Place new orders

2. **Order List** 📋
   - View all active orders
   - Update order status
   - Kitchen management

3. **Reports** 📊
   - Sales analytics
   - Performance metrics
   - Revenue charts

4. **History** 🧾
   - Past transactions
   - Completed orders
   - Payment records

5. **Admin** ⚙️
   - Menu management
   - Add/edit items
   - Inventory control

## User Experience

### Opening the Menu
1. Tap the hamburger icon (☰) in the top-right
2. Menu slides in from the right
3. Semi-transparent backdrop appears

### Navigating
1. Tap any menu item to navigate
2. Menu automatically closes after selection
3. Active page is highlighted with pink accent

### Closing the Menu
- **Tap the X icon** in the top-right
- **Tap outside** the menu (on the backdrop)
- **Select a navigation item** (auto-closes)

## Technical Details

### Breakpoints
- **Desktop (≥1280px)**: Traditional top navigation bar
- **Tablet/Mobile (<1280px)**: Hamburger menu with drawer

### Animations
- **Slide-in**: 0.3s ease animation from right
- **Fade-in**: Backdrop fades in smoothly
- **Transform**: Scale effect on button press

### Accessibility
- **Touch targets**: All buttons meet 44px minimum size
- **Color contrast**: WCAG AA compliant
- **Visual feedback**: Clear active/hover states
- **Theme support**: Works in both light and dark modes

## Styling

### Colors
- **Default text**: `var(--text-secondary)`
- **Active item**: `var(--primary-blue)` (#cd1354)
- **Hover background**: `var(--hover-bg)`
- **Active background**: Pink tint (rgba(205, 19, 84, 0.1))

### Layout
- **Menu width**: 280px (desktop), 85% (mobile)
- **Item padding**: 16px vertical, 24px horizontal
- **Icon size**: 20px
- **Border accent**: 4px left border on active

## Browser Support
✅ Chrome/Edge  
✅ Safari (iOS)  
✅ Firefox  
✅ Samsung Internet  
✅ UC Browser  

## Tips for Users

1. **Quick Access**: The menu is always one tap away
2. **Active Page**: The current page is highlighted in pink
3. **Dark Mode**: Menu adapts to your theme preference
4. **Smooth**: All transitions are smooth and responsive

## Troubleshooting

### Menu won't open?
- Check if screen width is < 1280px
- Try refreshing the page
- Ensure JavaScript is enabled

### Menu stays open?
- Tap outside the menu or the X button
- If stuck, refresh the page

### Items not responding?
- Ensure you're tapping the button area
- Check internet connection
- Clear browser cache if needed

## Development Notes

The mobile menu is implemented using:
- React Hooks (`useState` for menu state)
- CSS animations (slideInRight, fadeIn)
- Click-outside detection
- Event propagation control

File locations:
- Component: `src/components/Header.js`
- Styles: `src/App.css` (lines 603-688)
