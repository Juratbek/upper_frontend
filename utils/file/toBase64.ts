export const toBase64 = (file: File): Promise<FileReader['result']> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (): void => resolve(reader.result);
    reader.onerror = (error): void => reject(error);
  });
