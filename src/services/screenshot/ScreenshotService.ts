/**
 * Main service for handling screenshot functionality
 */
import { ScreenshotCapture } from './capture/ScreenshotCapture';
import { ImageValidator } from '../imageProcessing/utils/validation';

export class ScreenshotService {
  static async capture(): Promise<string> {
    try {
      // Get device pixel ratio for high-quality screenshots
      const devicePixelRatio = window.devicePixelRatio || 1;

      // Capture screenshot
      const screenshot = await ScreenshotCapture.capture(devicePixelRatio);

      // Validate screenshot data
      if (!ImageValidator.isValidImageData(screenshot)) {
        throw new Error('Invalid screenshot data');
      }

      return screenshot;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Screenshot capture failed: ${message}`);
    }
  }
}