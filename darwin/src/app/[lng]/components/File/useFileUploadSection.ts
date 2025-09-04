import { useEffect, useState } from "react";

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

    const newFiles = Array.from(files);
    let updatedFiles: File[];

    if (multiple) {
      updatedFiles = [...selectedFiles, ...newFiles];
    } else {
      updatedFiles = [newFiles[0]];
    }

    setSelectedFiles(updatedFiles);
    onFileChange(updatedFiles);
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

    const newFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (!newFiles.length) return;

    let updatedFiles: File[];

    if (multiple) {
      updatedFiles = [...selectedFiles, ...newFiles];
    } else {
      updatedFiles = [newFiles[0]];
    }

    setSelectedFiles(updatedFiles);
    onFileChange(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);

    if (onFileRemove) {
      onFileRemove(index);
    } else {
      onFileChange(newFiles);
    }
  };

  const createImagePreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        URL.revokeObjectURL(url);
      });
    };
  }, [selectedFiles]);

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
  };
};
