export async function createThumbnail(file: File): Promise<string | null> {
  if (!file.type.startsWith('image/')) return null;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const img = new Image();
  const imageUrl = URL.createObjectURL(file);

  return new Promise((resolve) => {
    img.onload = () => {
      URL.revokeObjectURL(imageUrl);
      const MAX_SIZE = 300;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) {
          height = height * (MAX_SIZE / width);
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = width * (MAX_SIZE / height);
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.src = imageUrl;
  });
}