export function dataURItoBlob(dataURI: string): Blob {
  try {
    const [header, data] = dataURI.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    
    if (!mimeMatch) {
      throw new Error('Invalid data URI format');
    }

    const mime = mimeMatch[1];
    const binary = atob(data);
    const array = new Uint8Array(binary.length);
    
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    
    return new Blob([array], { type: mime });
  } catch (error) {
    console.error('Failed to convert data URI to Blob:', error);
    throw new Error('Failed to process image data');
  }
}

export function blobToDataURI(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert blob to data URI'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read blob'));
    reader.readAsDataURL(blob);
  });
}