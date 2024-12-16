/**
 * Utility functions for handling DOM elements during screenshot
 */
export class ElementUtils {
  static async hideScreenshotElements(): Promise<HTMLElement[]> {
    const elements = document.querySelectorAll('.screenshot-exclude') as NodeListOf<HTMLElement>;
    const hiddenElements: HTMLElement[] = [];
    
    elements.forEach(el => {
      if (this.shouldHideElement(el)) {
        this.hideElement(el);
        hiddenElements.push(el);
      }
    });
    
    return hiddenElements;
  }

  static restoreElements(elements: HTMLElement[]): void {
    elements.forEach(el => {
      if (el && el.style) {
        el.style.visibility = '';
      }
    });
  }

  private static shouldHideElement(element: HTMLElement): boolean {
    return element.style.visibility !== 'hidden' &&
           !element.closest('.screenshot-processing');
  }

  private static hideElement(element: HTMLElement): void {
    if (element && element.style) {
      element.style.visibility = 'hidden';
    }
  }
}