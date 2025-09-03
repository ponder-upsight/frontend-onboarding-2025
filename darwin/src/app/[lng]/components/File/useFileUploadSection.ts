import {useState} from "react";

export const useFileUploadSection = ({
  fileInputRef,
  onFileChange,
  onFileRemove,
  multiple,
}: {
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileChange: (files: File[]) => void;
  onFileRemove?: (index: number) => void;
  multiple?: boolean;
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleClick = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (multiple) {
      const newFiles = Array.from(files);
      onFileChange([...selectedFiles, ...newFiles]);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    } else {
      onFileChange([files[0]]);
    }

    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (!files.length) return;

    if (multiple) {
      const newFiles = Array.from(files);
      onFileChange([...selectedFiles, ...newFiles]);
    } else {
      onFileChange([files[0]]);
    }
  };

  const handleRemoveFile = (index: number) => {
    if (onFileRemove) {
      onFileRemove(index);
    } else {
      const newFiles = selectedFiles.filter((_, i) => i !== index);
      onFileChange(newFiles);
    }
  };

  const createImagePreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  return {
    isDragOver,
    selectedFiles,
    handleClick,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleRemoveFile,
    handleFileSelect,
    createImagePreview,
  }
}
