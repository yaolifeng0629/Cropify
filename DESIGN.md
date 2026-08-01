---
name: Cropify
description: A local-first workspace for precise batch image cropping and export.
colors:
  ink: "#14221f"
  primary: "#00695c"
  information: "#1d4f91"
  warning: "#b45c16"
  canvas: "#f4f7f6"
  surface: "#ffffff"
  surface-tint: "#eef6f3"
  border: "#d7e4df"
  scrollbar-thumb: "#cbd5e1"
  scrollbar-thumb-hover: "#94a3b8"
  crop-control: "#3b82f6"
  crop-control-hover: "#2563eb"
  crop-control-tint: "#dbeafe"
  crop-grid: "rgba(59, 130, 246, 0.5)"
  crop-fill: "rgba(59, 130, 246, 0.08)"
  crop-fill-hover: "rgba(37, 99, 235, 0.12)"
  crop-shadow: "rgba(59, 130, 246, 0.15)"
  crop-shadow-hover: "rgba(59, 130, 246, 0.2)"
  crop-shadow-strong: "rgba(59, 130, 246, 0.3)"
  crop-shadow-active: "rgba(59, 130, 246, 0.4)"
  crop-control-muted: "rgba(59, 130, 246, 0.85)"
  crop-control-hover-muted: "rgba(37, 99, 235, 0.95)"
  control-shadow: "rgba(0, 0, 0, 0.15)"
  selection: "oklch(0.83 0.07 175)"
  selection-text: "oklch(0.2 0.02 165)"
typography:
  body:
    fontFamily: "Geist, Arial, sans-serif"
    fontWeight: 400
    lineHeight: 1.5
  title:
    fontFamily: "Geist, Arial, sans-serif"
    fontWeight: 700
    lineHeight: 1.15
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  scrollbar: "3px"
spacing:
  compact: "8px"
  default: "16px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "#005147"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
  card-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Cropify

## Overview

**Creative North Star: "The Calm Workbench"**

Cropify is an operating surface for a detail-oriented task, not a marketing canvas. The interface is light enough for long image-editing sessions, while the dark ink navigation creates a stable frame around the active workflow. Green is the action color for safe local work, blue carries system information, and copper is reserved for attention without turning the workspace into a warning field.

The visual system favors clear boundaries, compact controls, and useful state changes. The product should feel deliberate and capable without demanding attention away from a user's images.

**Key Characteristics:**
- Calm local-first workspace
- Clear functional color hierarchy
- Compact, touch-capable controls
- Low-noise surfaces with purposeful feedback

## Colors

The palette separates action, information, and attention so status can be scanned without relying on decorative color.

### Primary
- **Local Teal:** Main action and confirmation color for import, processing, and positive progress.

### Secondary
- **Clear Blue:** Informational state and precision-oriented controls.

### Tertiary
- **Copper Attention:** Limited use for instructional sequence and non-destructive attention.

### Neutral
- **Work Canvas:** Low-glare page background for extended sessions.
- **Paper Surface:** Readable containers and form fields.
- **Soft Boundary:** Quiet separation between independent controls.

**The Purposeful Color Rule.** Color explains a state or action; it does not decorate headings or divide otherwise identical cards.

## Typography

**Display Font:** Geist with a system sans-serif fallback.
**Body Font:** Geist with a system sans-serif fallback.

**Character:** Compact, highly legible, and neutral enough to keep the image and task in focus.

### Hierarchy
- **Title:** Strong, compact headings for page and task context.
- **Body:** Comfortable explanatory copy and inline guidance.
- **Label:** Direct, medium-weight controls and settings labels.

**The Action-First Type Rule.** A control names the action it performs; supporting copy explains consequence or recovery only when needed.

## Layout

The application uses a centered wide workspace with 16px default internal spacing and larger separations between workflow stages. The home surface narrows the import decision before exposing secondary product information. Editing panels remain dense on desktop and reflow without hiding core controls on smaller screens.

## Elevation & Depth

Surfaces are defined primarily by a quiet border and tonal contrast. Shadows are small and structural, used only for controls that need separation from the canvas.

**The Boundary-First Rule.** Use either a surface boundary or elevation to explain grouping; do not stack wide shadows under bordered cards.

## Shapes

Controls use restrained 4px, 6px, and 8px corners. Pills are limited to compact status counts and small tags, while work surfaces stay rectangular and easy to scan.

## Components

### Buttons
- **Shape:** Compact rounded rectangle.
- **Primary:** Teal action surface with white label.
- **Hover / Focus:** Darker action surface and visible focus ring.
- **Secondary / Ghost:** Paper or transparent surface with a quiet border until interaction.

### Cards / Containers
- **Corner Style:** Tight 8px maximum.
- **Background:** Paper surface against the work canvas.
- **Border:** Soft boundary used for grouping.
- **Internal Padding:** 16px to 24px based on content density.

### Inputs / Fields
- **Style:** Paper field, quiet boundary, legible placeholder.
- **Focus:** Teal focus ring and boundary change.
- **Error / Disabled:** State color and text remain explicit rather than relying on color alone.

### Navigation
- **Style:** Dark ink frame with white brand and links; mobile retains the primary work action rather than a decorative navigation treatment.

## Do's and Don'ts

### Do:
- **Do** make import, processing, and export status legible at a glance.
- **Do** use the action palette to distinguish positive, informational, attention, and error states.
- **Do** preserve the image workspace as the visual focal point.

### Don't:
- **Don't** use gradients or gradient text to communicate hierarchy.
- **Don't** use emoji as a substitute for interactive icons.
- **Don't** add decorative blur, color rails, or large shadows to ordinary containers.
