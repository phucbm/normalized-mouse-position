# normalized-mouse-position

Convert mouse coordinates to normalized values relative to any origin point for smooth UI interactions and animations.

[![npm version](https://badgen.net/npm/v/normalized-mouse-position?icon=npm)](https://www.npmjs.com/package/normalized-mouse-position)
[![npm downloads](https://badgen.net/npm/dm/normalized-mouse-position?icon=npm)](https://www.npmjs.com/package/normalized-mouse-position)
[![npm dependents](https://badgen.net/npm/dependents/normalized-mouse-position?icon=npm)](https://www.npmjs.com/package/normalized-mouse-position)
[![github stars](https://badgen.net/github/stars/phucbm/normalized-mouse-position?icon=github)](https://github.com/phucbm/normalized-mouse-position/)
[![github license](https://badgen.net/github/license/phucbm/normalized-mouse-position?icon=github)](https://github.com/phucbm/normalized-mouse-position/blob/main/LICENSE)

## Installation
```bash
npm i normalized-mouse-position
```
```bash
pnpm add normalized-mouse-position
```

## Quick Start

```typescript
import { getNormalizedMousePosition } from 'normalized-mouse-position';

// Basic usage - mouse position relative to center
const pos = getNormalizedMousePosition({
    x: mouseEvent.clientX,
    y: mouseEvent.clientY,
    origin: "50% 50%" // center origin
});
// Result: {x: 0.3, y: -0.8, origin: {x: 0.5, y: 0.5}, size: {width: 800, height: 600}}
```

## Key Features

- 🎯 **Configurable Origin** - Use any point as reference: center, corners, or custom positions
- 📏 **Normalized Output** - Always get predictable [-1, 1] range (or beyond if unclamped)  
- 🔄 **Axis Inversion** - Perfect for 3D controls and mirror effects
- 🎨 **Multiple Targets** - Works with window or any DOM element
- 📦 **TypeScript Ready** - Full type safety with comprehensive JSDoc

## Examples

### Different Origin Points
```typescript
// Center origin (default)
const centerPos = getNormalizedMousePosition({
    x: mouseEvent.clientX,
    y: mouseEvent.clientY,
    origin: "50% 50%"
});

// Top-left origin  
const topLeftPos = getNormalizedMousePosition({
    x: mouseEvent.clientX,
    y: mouseEvent.clientY,
    origin: "0 0"
});

// Custom origin
const customPos = getNormalizedMousePosition({
    x: mouseEvent.clientX,
    y: mouseEvent.clientY,
    origin: "25% 75%"
});
```

### Target Specific Elements
```typescript
const elementPos = getNormalizedMousePosition({
    x: mouseEvent.clientX,
    y: mouseEvent.clientY,
    target: document.querySelector('.my-element'),
    origin: "50% 50%"
});
```

### 3D-Style Controls
```typescript
const controlPos = getNormalizedMousePosition({
    x: mouseEvent.clientX,
    y: mouseEvent.clientY,
    origin: "50% 50%",
    invertY: true, // Mouse up = positive Y (like 3D coordinates)
    clamp: false   // Allow values beyond [-1, 1]
});
```

### GSAP Observer Integration
```typescript
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { getNormalizedMousePosition } from 'normalized-mouse-position';

function gsapMouseParallaxImage() {
    gsap.registerPlugin(Observer);

    document.querySelectorAll('[data-mouse-parallax-parent]').forEach(parentTarget => {
        const childTarget = parentTarget.querySelector('[data-mouse-parallax-target]');
        if (!childTarget) return;

        Observer.create({
            target: parentTarget,
            type: "pointer",
            onMove: ({x, y, target}) => {
                const pos = getNormalizedMousePosition({x, y, target});
                const parallaxIntensity = -20; // Negative for opposite direction

                gsap.to(childTarget, {
                    force3D: true,
                    x: pos.x * parallaxIntensity,
                    y: pos.y * parallaxIntensity,
                    duration: 1,
                    ease: "power1.out"
                });
            }
        });
    });
}
```

### Parallax Effects
```typescript
// Mouse parallax with GSAP
document.addEventListener('mousemove', (e) => {
    const pos = getNormalizedMousePosition({
        x: e.clientX,
        y: e.clientY,
        origin: "50% 50%"
    });
    
    gsap.to('.parallax-element', {
        x: pos.x * 50,
        y: pos.y * 50,
        duration: 0.3
    });
});
```

## API

### `getNormalizedMousePosition(options)`

**Parameters:**
- `x: number` - Mouse X coordinate
- `y: number` - Mouse Y coordinate  
- `origin?: string` - Origin point as "x% y%" (default: "50% 50%")
- `target?: Window | Element` - Reference element (default: window)
- `clamp?: boolean` - Limit to [-1, 1] range (default: true)
- `invertX?: boolean` - Invert X axis (default: false)
- `invertY?: boolean` - Invert Y axis (default: false)

**Returns:**
```typescript
{
    x: number;        // Normalized X coordinate
    y: number;        // Normalized Y coordinate  
    origin: {         // Origin as decimal values
        x: number;
        y: number;
    };
    size: {           // Target dimensions
        width: number;
        height: number;
    };
}
```

## Development
```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Build the package
pnpm run build

# Run tests in watch mode
pnpm run test:watch
```

## License
MIT © [phucbm](https://github.com/phucbm)
