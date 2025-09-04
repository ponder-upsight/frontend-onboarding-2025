import { useCallback } from "react";

import { FileValidationRule } from "@/utils/validators/types";

type UseDragAndDropProps = {
  onDropFiles: (files: File[]) => void;
  validationRules?: FileValidationRule[];
  onRejectFile?: (file: File, reason: string) => void;
};

export const useDragAndDrop = ({
  onDropFiles,
  validationRules = [],
  onRejectFile,
}: UseDragAndDropProps) => {
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles: File[] = [];

      for (const file of droppedFiles) {
        const results = await Promise.all(validationRules.map((rule) => rule(file)));
        const errors = results.filter((res): res is string => res !== null);

        if (errors.length > 0) {
          errors.forEach((err) => onRejectFile?.(file, err));
        } else {
          validFiles.push(file);
        }
      }

      if (validFiles.length > 0) {
        onDropFiles(validFiles);
      }
    },
    [onDropFiles, validationRules, onRejectFile]
  );

  return { handleDragOver, handleDrop };
};
