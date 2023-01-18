export function loadImageAsync(
  src: string,
  width?: number,
  height?: number
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image(width, height);
    img.onerror = reject;
    img.onload = () => resolve(img);
    img.src = src;
  });
}

export function sleepAsync(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
