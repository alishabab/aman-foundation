const isValidImageProperties = (image: HTMLImageElement): Promise<boolean> => {
  const MAX_IMAGE_WIDTH = 1920;
  return new Promise((resolve) => {
    image.addEventListener("load", () => {
      resolve(image.width <= MAX_IMAGE_WIDTH);
    });
  });
};

export const isValidImage = async (file: File): Promise<boolean> => {
  let isValid: boolean;
  const ALLOWED_FILE_TYPES = /\.(jpg|jpeg|png|svg)$/;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  if (
    !!file.type.match(/^image/gi) &&
    file.name.match(ALLOWED_FILE_TYPES) &&
    file.size <= MAX_FILE_SIZE
  ) {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    isValid = await isValidImageProperties(image);
  } else {
    isValid = false;
  }

  return isValid;
};
