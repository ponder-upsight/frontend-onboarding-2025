type HandleFileChangeProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  files: FileList | undefined;
  multiple: boolean;
  onChange: (files: FileList | null) => void;
};

const handleFileChange = ({
  event,
  files,
  multiple,
  onChange,
}: HandleFileChangeProps) => {
  const newFiles = event.target.files;
  if (newFiles && newFiles.length > 0) {
    if (multiple && files && files.length > 0) {
      // 기존 파일에 새 파일 추가
      const combinedFiles = Array.from(files).concat(Array.from(newFiles));
      const dataTransfer = new DataTransfer();
      combinedFiles.forEach((file) => dataTransfer.items.add(file));
      onChange(dataTransfer.files);
    } else {
      // 새 파일로 교체
      onChange(newFiles);
    }
  }
};
export default handleFileChange;
