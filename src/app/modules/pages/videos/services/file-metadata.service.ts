export function getFileType(fileName: string): string | undefined {
  const fileType = fileName.split('.').pop();

  return fileName !== fileType ? fileType : undefined;
}

export function getOnlyFileName(fullFileName: string): string {
  const onlyFileName = fullFileName
    .split('.')
    .reverse()
    .slice(1)
    .reverse()
    .join('.');

  return !onlyFileName ? fullFileName : onlyFileName;
}
