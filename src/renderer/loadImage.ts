export async function loadImage(src: string): Promise<HTMLImageElement> {
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (error) => {
      reject(error);
    };
  });

  return promise;
}
