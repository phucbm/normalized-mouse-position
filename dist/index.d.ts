/**
 * Configuration options for getNormalizedMousePosition function
 */
interface NormalizedMousePositionOptions {
    /** X coordinate of the mouse position */
    x: number;
    /** Y coordinate of the mouse position */
    y: number;
    /**
     * Origin point as a string with percentage values (e.g., "50% 50%" for center, "0 0" for top-left)
     * @default "50% 50%"
     */
    origin?: string;
    /**
     * Target element to use as reference. Can be window or any DOM element
     * @default window
     */
    target?: Window | Element;
    /**
     * Whether to clamp the result to [-1, 1] range
     * @default true
     */
    clamp?: boolean;
    /**
     * Whether to invert the X axis (left becomes right)
     * @default false
     */
    invertX?: boolean;
    /**
     * Whether to invert the Y axis (up becomes down)
     * @default false
     */
    invertY?: boolean;
}
/**
 * Return type for getNormalizedMousePosition function
 */
interface NormalizedMousePosition {
    /** Normalized X coordinate in range [-1, 1] (or beyond if clamp is false) */
    x: number;
    /** Normalized Y coordinate in range [-1, 1] (or beyond if clamp is false) */
    y: number;
    /** The origin point used for normalization as decimal values */
    origin: {
        /** Origin X position as decimal (0.0 to 1.0) */
        x: number;
        /** Origin Y position as decimal (0.0 to 1.0) */
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
}

/**
 * Converts mouse coordinates to normalized values relative to a configurable origin point.
 *
 * This function takes raw mouse coordinates and normalizes them to a [-1, 1] range
 * (or beyond if clamp is disabled), with the normalization relative to a specified
 * origin point rather than always using the center.
 *
 * @param options - Configuration object containing mouse position and normalization options
 * @returns Normalized mouse position with x, y coordinates and origin information
 */
declare function getNormalizedMousePosition({ x, y, origin, target, clamp, invertX, invertY }: NormalizedMousePositionOptions): NormalizedMousePosition;

export { getNormalizedMousePosition };
