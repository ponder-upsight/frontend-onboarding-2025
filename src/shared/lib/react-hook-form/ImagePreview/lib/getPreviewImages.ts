const getPreviewImages = (files: FileList | undefined) => {
  // 미리보기 URL 생성
  return files && files.length > 0
    ? Array.from(files).map((file) => URL.createObjectURL(file as File))
    : [];
};
export default getPreviewImages;
