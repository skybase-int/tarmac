export function isImageRoute(route?: string) {
  if (!route) return false;
  const imageRegex = /\.(jpe?g|png|gif|bmp|svg)$/i;
  return imageRegex.test(route);
}
