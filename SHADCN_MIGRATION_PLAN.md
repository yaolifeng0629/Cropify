# shadcn/ui Migration Plan for Cropify

## 📋 Current Component Analysis

### Existing Custom UI Components
Located in `src/components/ui/index.tsx`:

1. **Button Component**
   - Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`
   - Sizes: `sm`, `md`, `lg`
   - Features: `loading` state with spinner, disabled state
   - Usage: Extensively used in BatchProcessor, ExportSystem, CropControlPanel

2. **Card Component**
   - Props: `title`, `padding` (none/sm/md/lg), `className`
   - Features: Optional header with title, configurable padding
   - Usage: All major panels (ImageInfoPanel, QualityControlPanel, etc.)

3. **ProgressBar Component**
   - Props: `value` (0-100), `showPercentage`, `color` (blue/green/red/yellow)
   - Features: Animated progress, percentage display
   - Usage: BatchProcessor for overall and individual task progress

### Form Elements Found in Components

4. **Input Fields** (in CropControlPanel)
   - Type: `number` inputs for width, height, x, y coordinates
   - Features: min/max validation, onChange handlers

5. **Range Sliders** (in ViewSettings, QualityControlPanel)
   - Type: `range` inputs for zoom, quality settings
   - Features: min/max/step configuration

6. **Checkboxes & Toggle Switches** (in ViewSettings)
   - Custom toggle implementation for grid display
   - Checkbox-style inputs

7. **Tab Navigation** (in CropControlPanel)
   - Custom tab implementation with active state styling
   - Tabs: 'manual', 'preset', 'ratio'

8. **Select/Button Groups** (in QualityControlPanel)
   - Format selection buttons (JPG, PNG, WebP)
   - Radio button-style selection

## 🎯 shadcn/ui Component Mapping

| Current Component | shadcn/ui Equivalent | Migration Priority |
|-------------------|---------------------|-------------------|
| Button | `@shadcn/ui/button` | High (Phase 1) |
| Card | `@shadcn/ui/card` | High (Phase 1) |
| ProgressBar | `@shadcn/ui/progress` | High (Phase 1) |
| Input (number) | `@shadcn/ui/input` | Medium (Phase 2) |
| Range Slider | `@shadcn/ui/slider` | Medium (Phase 2) |
| Checkbox | `@shadcn/ui/checkbox` | Medium (Phase 2) |
| Toggle Switch | `@shadcn/ui/switch` | Medium (Phase 2) |
| Tab Navigation | `@shadcn/ui/tabs` | Medium (Phase 2) |
| Select/Radio Group | `@shadcn/ui/radio-group` | Low (Phase 3) |

## 🔄 Variant Mapping

### Button Variants
- `primary` → `default` (shadcn/ui default)
- `secondary` → `secondary`
- `outline` → `outline`
- `ghost` → `ghost`
- `danger` → `destructive`

### Button Sizes
- `sm` → `sm`
- `md` → `default`
- `lg` → `lg`

### Card Structure
- Current: Single component with title prop
- shadcn/ui: Separate CardHeader, CardTitle, CardContent components

### Progress Colors
- Current: `blue`, `green`, `red`, `yellow`
- shadcn/ui: Uses CSS variables, customizable via className

## 📦 Installation Plan

### Phase 1: Core Components
```bash
pnpm dlx shadcn@latest add button card progress
```

### Phase 2: Form Components
```bash
pnpm dlx shadcn@latest add input slider checkbox switch tabs
```

### Phase 3: Advanced Components
```bash
pnpm dlx shadcn@latest add radio-group label
```

## 🚧 Migration Challenges & Solutions

### 1. Loading State in Buttons
- **Current**: Custom loading prop with spinner SVG
- **Solution**: Use shadcn/ui Button with Lucide React icons

### 2. Card Title Prop
- **Current**: Single component with title prop
- **Solution**: Refactor to use CardHeader + CardTitle pattern

### 3. Progress Bar Colors
- **Current**: Color prop with predefined colors
- **Solution**: Use className with custom CSS variables

### 4. Custom Toggle Switch
- **Current**: Custom implementation with transform animations
- **Solution**: Replace with shadcn/ui Switch component

### 5. Tab Navigation
- **Current**: Custom button-based tabs
- **Solution**: Refactor to use shadcn/ui Tabs, TabsList, TabsTrigger, TabsContent

## 📁 File Structure After Migration

```
src/
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── progress.tsx
│   │   ├── input.tsx
│   │   ├── slider.tsx
│   │   ├── checkbox.tsx
│   │   ├── switch.tsx
│   │   ├── tabs.tsx
│   │   └── radio-group.tsx
│   └── modules/                # Feature components (updated)
├── lib/
│   └── utils.ts               # shadcn/ui utilities
└── ...
```

## ✅ Testing Checklist

- [ ] All buttons render with correct variants and sizes
- [ ] Card components display titles and content properly
- [ ] Progress bars animate and show correct values
- [ ] Form inputs maintain validation and onChange behavior
- [ ] Tab navigation works correctly
- [ ] Toggle switches maintain state
- [ ] All components are accessible (ARIA attributes)
- [ ] Styling is consistent with design system
- [ ] No TypeScript errors
- [ ] Application builds successfully

## 🎨 Styling Considerations

### CSS Variables Integration
- shadcn/ui uses CSS variables for theming
- Current project uses fixed Tailwind classes
- Need to ensure color consistency

### Custom Styles Preservation
- Maintain custom scrollbar styles
- Preserve drag-over effects
- Keep image container and grid overlay styles
- Maintain crop selection and handle styles

## 📝 Implementation Notes

1. **Incremental Migration**: Replace components one type at a time
2. **Backward Compatibility**: Keep old components until migration is complete
3. **Testing**: Test each component replacement thoroughly
4. **Documentation**: Update component documentation and examples
5. **Performance**: Monitor bundle size changes
