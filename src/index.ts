import {NormalizedMousePosition, NormalizedMousePositionOptions} from "./types";

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
export function getNormalizedMousePosition({
                                               x,
                                               y,
                                               origin = "50% 50%",
                                               target = window,
                                               clamp = true,
                                               invertX = false,
                                               invertY = false
                                           }: NormalizedMousePositionOptions): NormalizedMousePosition {
    // Parse origin string (e.g., "50% 50%" or "0 100%")
    const [originXStr, originYStr] = origin.split(' ');

    // Convert percentage strings to decimal values
    const originX = parseFloat(originXStr.replace('%', '')) / 100;
    const originY = parseFloat(originYStr.replace('%', '')) / 100;

    // Get target dimensions
    const isWindow = (target as any) === window;
    const targetWidth = isWindow ? window.innerWidth : (target as unknown as HTMLElement).offsetWidth;
    const targetHeight = isWindow ? window.innerHeight : (target as unknown as HTMLElement).offsetHeight;

    // Calculate the origin point in absolute coordinates
    const originPointX = targetWidth * originX;
    const originPointY = targetHeight * originY;

    // Calculate distance from origin to edges
    const maxDistanceX = Math.max(originPointX, targetWidth - originPointX);
    const maxDistanceY = Math.max(originPointY, targetHeight - originPointY);

    // Calculate normalized position relative to origin
    let normalizedX = (x - originPointX) / maxDistanceX;
    let normalizedY = (y - originPointY) / maxDistanceY;

    // Apply inversions if requested
    if (invertX) normalizedX = -normalizedX;
    if (invertY) normalizedY = -normalizedY;

    // Apply clamping if requested
    if (clamp) {
        normalizedX = Math.max(-1, Math.min(1, normalizedX));
        normalizedY = Math.max(-1, Math.min(1, normalizedY));
    }

    return {
        x: normalizedX,
        y: normalizedY,
        origin: {
            x: originX,
            y: originY
        },
        size: {
            width: targetWidth,
            height: targetHeight
        }
    };
}