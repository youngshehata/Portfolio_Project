export const onErrorImageEvent = (e: any, image: string) => {
  (e.currentTarget as HTMLImageElement).src = image;
};
