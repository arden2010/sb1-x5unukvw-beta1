/**
 * Handles the core screenshot capture functionality
 */
import { getScreenshotConfig } from '../config/html2canvasConfig';
import { ElementUtils } from '../utils/elementUtils';
import html2canvas from 'html2canvas';

export class ScreenshotCapture {
  static async capture(devicePixelRatio: number): Promise<string> {
    // Add processing class to prevent capturing overlays
    document.body.classList.add('screenshot-processing');
    const hiddenElements = await ElementUtils.hideScreenshotElements();

    try {
      // Wait for UI update
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture screenshot
      const canvas = await html2canvas(
        document.body,
        getScreenshotConfig(devicePixelRatio)
      );

      // Convert to data URL
      const dataUrl = canvas.toDataURL('image/png');
      if (!dataUrl) {
        throw new Error('Failed to convert canvas to data URL');
      }

      return dataUrl;
    } finally {
      // Always cleanup
      document.body.classList.remove('screenshot-processing');
      ElementUtils.restoreElements(hiddenElements);
    }
  }
}