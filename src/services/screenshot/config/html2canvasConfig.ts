/**
 * Configuration for html2canvas
 */
export const getScreenshotConfig = (devicePixelRatio: number) => ({
  useCORS: true,
  scale: devicePixelRatio,
  logging: false,
  allowTaint: true,
  foreignObjectRendering: true,
  ignoreElements: (element: Element) => 
    element.classList.contains('screenshot-exclude') ||
    !!element.closest('.screenshot-exclude'),
  backgroundColor: null,
  imageTimeout: 0,
  removeContainer: true
});