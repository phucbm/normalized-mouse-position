import {getNormalizedMousePosition} from '../src';

describe('getNormalizedMousePosition', () => {
    // Mock window dimensions
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;

    beforeEach(() => {
        // Set consistent window dimensions for testing
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 800,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: 600,
        });
    });

    afterEach(() => {
        // Clean up DOM after each test
        document.body.innerHTML = '';
        // Restore original window dimensions
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: originalInnerWidth,
        });
        Object.defineProperty(window, 'innerHeight', {
            writable: true,
            configurable: true,
            value: originalInnerHeight,
        });
    });

    describe('Core Functionality Tests', () => {
        test('should return center position (0,0) when mouse is at center with default origin', () => {
            const result = getNormalizedMousePosition({
                x: 400, // center of 800px width
                y: 300, // center of 600px height
                origin: "50% 50%"
            });

            expect(result.x).toBeCloseTo(0);
            expect(result.y).toBeCloseTo(0);
        });

        test('should return correct edge positions with center origin', () => {
            // Top-left corner
            const topLeft = getNormalizedMousePosition({
                x: 0,
                y: 0,
                origin: "50% 50%"
            });
            expect(topLeft.x).toBeCloseTo(-1);
            expect(topLeft.y).toBeCloseTo(-1);

            // Bottom-right corner
            const bottomRight = getNormalizedMousePosition({
                x: 800,
                y: 600,
                origin: "50% 50%"
            });
            expect(bottomRight.x).toBeCloseTo(1);
            expect(bottomRight.y).toBeCloseTo(1);
        });

        test('should handle top-left origin correctly', () => {
            // Mouse at top-left should be (0,0)
            const topLeft = getNormalizedMousePosition({
                x: 0,
                y: 0,
                origin: "0 0"
            });
            expect(topLeft.x).toBeCloseTo(0);
            expect(topLeft.y).toBeCloseTo(0);

            // Mouse at bottom-right should be (1,1)
            const bottomRight = getNormalizedMousePosition({
                x: 800,
                y: 600,
                origin: "0 0"
            });
            expect(bottomRight.x).toBeCloseTo(1);
            expect(bottomRight.y).toBeCloseTo(1);
        });

        test('should handle bottom-right origin correctly', () => {
            // Mouse at bottom-right should be (0,0)
            const bottomRight = getNormalizedMousePosition({
                x: 800,
                y: 600,
                origin: "100% 100%"
            });
            expect(bottomRight.x).toBeCloseTo(0);
            expect(bottomRight.y).toBeCloseTo(0);

            // Mouse at top-left should be (-1,-1)
            const topLeft = getNormalizedMousePosition({
                x: 0,
                y: 0,
                origin: "100% 100%"
            });
            expect(topLeft.x).toBeCloseTo(-1);
            expect(topLeft.y).toBeCloseTo(-1);
        });

        test('should handle custom origin point', () => {
            // Origin at 25% 75% means x=200, y=450
            const result = getNormalizedMousePosition({
                x: 200, // at origin x
                y: 450, // at origin y
                origin: "25% 75%"
            });
            expect(result.x).toBeCloseTo(0);
            expect(result.y).toBeCloseTo(0);
        });
    });

    describe('Target Element Handling', () => {
        test('should work with DOM element as target', () => {
            const element = document.createElement('div');
            // Mock offsetWidth and offsetHeight
            Object.defineProperty(element, 'offsetWidth', {
                value: 400,
                configurable: true
            });
            Object.defineProperty(element, 'offsetHeight', {
                value: 300,
                configurable: true
            });
            document.body.appendChild(element);

            const result = getNormalizedMousePosition({
                x: 200, // center of 400px width
                y: 150, // center of 300px height
                target: element,
                origin: "50% 50%"
            });

            expect(result.x).toBeCloseTo(0);
            expect(result.y).toBeCloseTo(0);
            expect(result.size.width).toBe(400);
            expect(result.size.height).toBe(300);
        });

        test('should default to window when no target specified', () => {
            const result = getNormalizedMousePosition({
                x: 400,
                y: 300
            });

            expect(result.size.width).toBe(800);
            expect(result.size.height).toBe(600);
        });
    });

    describe('Clamping Behavior', () => {
        test('should clamp values to [-1, 1] by default', () => {
            const result = getNormalizedMousePosition({
                x: 1200, // way outside bounds
                y: 900,  // way outside bounds
                origin: "50% 50%"
            });

            expect(result.x).toBe(1);
            expect(result.y).toBe(1);
        });

        test('should allow values beyond bounds when clamp is false', () => {
            const result = getNormalizedMousePosition({
                x: 1200, // way outside bounds
                y: 900,  // way outside bounds
                origin: "50% 50%",
                clamp: false
            });

            expect(result.x).toBeGreaterThan(1);
            expect(result.y).toBeGreaterThan(1);
        });

        test('should clamp negative values correctly', () => {
            const result = getNormalizedMousePosition({
                x: -400, // way outside bounds
                y: -300, // way outside bounds
                origin: "50% 50%"
            });

            expect(result.x).toBe(-1);
            expect(result.y).toBe(-1);
        });
    });

    describe('Axis Inversion', () => {
        test('should invert X axis when invertX is true', () => {
            const normal = getNormalizedMousePosition({
                x: 600, // right side
                y: 300,
                origin: "50% 50%"
            });

            const inverted = getNormalizedMousePosition({
                x: 600, // right side
                y: 300,
                origin: "50% 50%",
                invertX: true
            });

            expect(inverted.x).toBeCloseTo(-normal.x);
            expect(inverted.y).toBeCloseTo(normal.y);
        });

        test('should invert Y axis when invertY is true', () => {
            const normal = getNormalizedMousePosition({
                x: 400,
                y: 450, // bottom side
                origin: "50% 50%"
            });

            const inverted = getNormalizedMousePosition({
                x: 400,
                y: 450, // bottom side
                origin: "50% 50%",
                invertY: true
            });

            expect(inverted.x).toBeCloseTo(normal.x);
            expect(inverted.y).toBeCloseTo(-normal.y);
        });

        test('should invert both axes when both flags are true', () => {
            const normal = getNormalizedMousePosition({
                x: 600,
                y: 450,
                origin: "50% 50%"
            });

            const inverted = getNormalizedMousePosition({
                x: 600,
                y: 450,
                origin: "50% 50%",
                invertX: true,
                invertY: true
            });

            expect(inverted.x).toBeCloseTo(-normal.x);
            expect(inverted.y).toBeCloseTo(-normal.y);
        });
    });

    describe('Return Object Structure', () => {
        test('should return object with correct structure', () => {
            const result = getNormalizedMousePosition({
                x: 400,
                y: 300,
                origin: "25% 75%"
            });

            expect(result).toHaveProperty('x');
            expect(result).toHaveProperty('y');
            expect(result).toHaveProperty('origin');
            expect(result).toHaveProperty('size');

            expect(result.origin).toHaveProperty('x');
            expect(result.origin).toHaveProperty('y');
            expect(result.size).toHaveProperty('width');
            expect(result.size).toHaveProperty('height');
        });

        test('should convert origin percentages to decimals correctly', () => {
            const result = getNormalizedMousePosition({
                x: 400,
                y: 300,
                origin: "25% 75%"
            });

            expect(result.origin.x).toBe(0.25);
            expect(result.origin.y).toBe(0.75);
        });

        test('should include correct size information', () => {
            const element = document.createElement('div');
            Object.defineProperty(element, 'offsetWidth', {
                value: 200,
                configurable: true
            });
            Object.defineProperty(element, 'offsetHeight', {
                value: 150,
                configurable: true
            });

            const result = getNormalizedMousePosition({
                x: 100,
                y: 75,
                target: element
            });

            expect(result.size.width).toBe(200);
            expect(result.size.height).toBe(150);
        });
    });

    describe('Mathematical Accuracy', () => {
        test('should maintain symmetry around origin', () => {
            const origin = "50% 50%";

            // Test points equidistant from center
            const right = getNormalizedMousePosition({
                x: 600, y: 300, origin
            });
            const left = getNormalizedMousePosition({
                x: 200, y: 300, origin
            });

            expect(right.x).toBeCloseTo(-left.x);
            expect(right.y).toBeCloseTo(left.y);

            const top = getNormalizedMousePosition({
                x: 400, y: 150, origin
            });
            const bottom = getNormalizedMousePosition({
                x: 400, y: 450, origin
            });

            expect(top.x).toBeCloseTo(bottom.x);
            expect(top.y).toBeCloseTo(-bottom.y);
        });

        test('should handle edge coordinates precisely', () => {
            // Test exact edge positions
            const edges = [
                {x: 0, y: 0},     // top-left
                {x: 800, y: 0},   // top-right
                {x: 0, y: 600},   // bottom-left
                {x: 800, y: 600}  // bottom-right
            ];

            edges.forEach(edge => {
                const result = getNormalizedMousePosition({
                    x: edge.x,
                    y: edge.y,
                    origin: "50% 50%"
                });

                // All edge results should be exactly ±1
                expect(Math.abs(result.x)).toBeCloseTo(1);
                expect(Math.abs(result.y)).toBeCloseTo(1);
            });
        });

        test('should calculate distances correctly for different origins', () => {
            // For origin at "0 0", max distance should be full width/height
            const result1 = getNormalizedMousePosition({
                x: 800, y: 600,
                origin: "0 0"
            });
            expect(result1.x).toBeCloseTo(1);
            expect(result1.y).toBeCloseTo(1);

            // For origin at "100% 100%", max distance should also be full width/height
            const result2 = getNormalizedMousePosition({
                x: 0, y: 0,
                origin: "100% 100%"
            });
            expect(result2.x).toBeCloseTo(-1);
            expect(result2.y).toBeCloseTo(-1);
        });
    });

    describe('Origin String Parsing', () => {
        test('should handle various valid origin formats', () => {
            const validOrigins = [
                "0 0",
                "50% 50%",
                "100% 100%",
                "25% 75%",
                "0% 100%"
            ];

            validOrigins.forEach(origin => {
                expect(() => {
                    getNormalizedMousePosition({
                        x: 400,
                        y: 300,
                        origin
                    });
                }).not.toThrow();
            });
        });

        test('should parse origin values correctly', () => {
            const testCases = [
                {origin: "0 0", expected: {x: 0, y: 0}},
                {origin: "50% 50%", expected: {x: 0.5, y: 0.5}},
                {origin: "100% 100%", expected: {x: 1, y: 1}},
                {origin: "25% 75%", expected: {x: 0.25, y: 0.75}}
            ];

            testCases.forEach(({origin, expected}) => {
                const result = getNormalizedMousePosition({
                    x: 400,
                    y: 300,
                    origin
                });
                expect(result.origin.x).toBeCloseTo(expected.x);
                expect(result.origin.y).toBeCloseTo(expected.y);
            });
        });
    });
});