import { MouseEvent, useEffect, useRef, useState } from "react";
import Pdf from "react-pdf-js";

import Image from "next/image";

import { Box, Flex, Text } from "@chakra-ui/react";

import { useBlobWithCookie } from "@/hooks/usePdfBlobWithCookie";

import { LeftIcon, MinusBlack, PlusBlack, RightIcon } from "@/assets/icons";

import { downloadImage } from "@/utils/downloadImageFromURL";

import { IconButton } from "../IconButton";
import { TypoGraph } from "../Typography";

interface FilePreviewProps {
  pageNumber: number;
  setPageNumber: (PageNumber: number) => void;
  fileType: string;
  isSupportedFileType?: boolean;
  fileURL: string;
  fileInput: string;
  fileName: string;
  isDetail?: boolean;
  t: (key: string, options?: object) => string;
}

export const FilePreview = ({
  pageNumber,
  setPageNumber,
  fileInput,
  fileName,
  fileType,
  fileURL,
  t,
}: FilePreviewProps) => {
  const [scale, setScale] = useState<number>(1);
  const [viewportScale, setViewportScale] = useState<number>(1);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [pdfPosition, setPdfPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [pages, setPages] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);
  const { blobUrl, loading } = useBlobWithCookie(fileURL, fileInput);

  const onDocumentLoadSuccess = (numPages: number) => {
    setPages(numPages);
  };
  useEffect(() => {
    const updateViewportScale = () => {
      if (containerRef.current && pdfRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const pdfRect = pdfRef.current.getBoundingClientRect();

        const containerAspectRatio = containerRect.width / containerRect.height;
        const pdfAspectRatio = pdfRect.width / pdfRect.height;

        let newViewportScale = 0.95;
        if (containerAspectRatio > pdfAspectRatio) {
          newViewportScale = containerRect.height / pdfRect.height;
        } else {
          newViewportScale = containerRect.width / pdfRect.width;
        }

        newViewportScale *= 0.95;

        setViewportScale(newViewportScale);
      }
    };

    updateViewportScale();
    window.addEventListener("resize", updateViewportScale);

    return () => {
      window.removeEventListener("resize", updateViewportScale);
    };
  }, [scale]);

  const onPage = (type: number) => {
    setPageNumber(type);
  };

  const onSetScale = (type: string) => {
    let newScale = type === "in" ? scale + 0.1 : scale - 0.1;

    if (newScale > 2.0) newScale = 2.0;
    if (newScale < 0.2) newScale = 0.2;
    setScale(newScale);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsMouseDown(true);
    setMousePosition({
      x: e.clientX - pdfPosition.x,
      y: e.clientY - pdfPosition.y,
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isMouseDown) return;
    const newX = e.clientX - mousePosition.x;
    const newY = e.clientY - mousePosition.y;
    setPdfPosition({ x: newX, y: newY });
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsMouseDown(false);
  };

  const downloadFile = async (url: string, name: string) => {
    downloadImage(url, name);
  };

  const renderPreview = () => {
    if (loading) return;
    if (!blobUrl) return <Text>{t("not-allowed-file")}</Text>;
    if (fileType.startsWith("image/")) {
      return (
        <Image
          src={blobUrl}
          alt="Preview"
          width={400}
          height={600}
          style={{ minWidth: "400px", width: "auto", height: "600px" }}
        />
      );
    } else if (fileType === "application/pdf") {
      return (
        <Box
          ref={containerRef}
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <Box
            style={{
              transform: `scale(${viewportScale})`,
              transformOrigin: "center center",
            }}
          >
            <Pdf
              //@ts-expect-error: should include ref
              ref={pdfRef}
              file={blobUrl}
              onDocumentComplete={onDocumentLoadSuccess}
              page={pageNumber}
              scale={scale}
            />
          </Box>
        </Box>
      );
    } else if (fileType.endsWith(".hwp")) {
      return <Text>{t("convert-pdf")}</Text>;
    } else {
      return (
        <Text
          onMouseDown={undefined}
          onMouseMove={undefined}
          onMouseUp={undefined}
          onMouseLeave={undefined}
        >
          {t("not-allowed-file")}
        </Text>
      );
    }
  };

  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      bg="#edf2f8"
      borderRadius="5px"
      overflow={"hidden"}
    >
      <Flex justifyContent="center" alignItems="center" height="100%">
        {fileInput ? (
          <Box
            position="relative"
            width="100%"
            height="822px"
            maxH={"822px"}
            onMouseDown={fileType === "application/pdf" ? handleMouseDown : undefined}
            onMouseMove={fileType === "application/pdf" ? handleMouseMove : undefined}
            onMouseUp={fileType === "application/pdf" ? handleMouseUp : undefined}
            onMouseLeave={fileType === "application/pdf" ? handleMouseUp : undefined}
          >
            <Box
              style={{
                cursor:
                  fileType === "application/pdf"
                    ? isMouseDown
                      ? "grabbing"
                      : "grab"
                    : "default",
                transform: `scale(${viewportScale})`,
                position: "relative",
                left: `${pdfPosition.x}px`,
                top: `${pdfPosition.y}px`,
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {renderPreview()}
            </Box>
            {fileInput && fileType === "application/pdf" && (
              <>
                <IconButton
                  size="sm"
                  variant="primary_icon"
                  aria-label="Previous page"
                  leftIcon={<LeftIcon />}
                  onClick={() => {
                    if (pageNumber <= 1) {
                      onPage(pageNumber);
                      return;
                    }
                    onPage(pageNumber - 1);
                  }}
                  position="absolute"
                  left="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  bg={"gray.300"}
                  width="56px"
                  height="56px"
                  padding="16px"
                  borderRadius="12px"
                  opacity={0.8}
                />
                <IconButton
                  size="sm"
                  variant="primary_icon"
                  aria-label="Next page"
                  leftIcon={<RightIcon />}
                  onClick={() => {
                    if (pages !== null && pageNumber >= pages) {
                      return;
                    }
                    onPage(pageNumber + 1);
                  }}
                  position="absolute"
                  right="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  bg={"gray.300"}
                  width="56px"
                  height="56px"
                  padding="16px"
                  borderRadius="12px"
                  opacity={0.8}
                />
              </>
            )}
          </Box>
        ) : (
          <Text>{t("placeholder-preview")}</Text>
        )}
      </Flex>
      {fileInput && fileType === "application/pdf" && (
        <Flex
          position="absolute"
          bottom="30px"
          left="50%"
          transform="translateX(-50%)"
          justifyContent="center"
          alignItems="center"
          bg="white"
          width="auto"
          height="40px"
          boxShadow={"depth200"}
          borderRadius="0.5rem"
          border={"2px solid #EAECF1"}
          gap={16}
          p={"8px 16px"}
        >
          <Flex alignItems="center" justifyContent={"center"} w="56px" gap={8}>
            <TypoGraph variant="label01">{pageNumber}</TypoGraph>
            <TypoGraph variant="label01">/</TypoGraph>
            <TypoGraph variant="label01">{pages}</TypoGraph>
          </Flex>
          <Box width="2px" height="40px" bg={"gray.400"} />
          <Flex alignItems="center" width="auto" gap="8px">
            <IconButton
              aria-label="Zoom out"
              size="sm"
              variant="neutral_icon"
              onClick={() => onSetScale("out")}
              leftIcon={<MinusBlack color="#1F2539" />}
            />

            <TypoGraph variant="label01" w="52px" textAlign={"center"}>
              {Math.round(scale * 100)}%
            </TypoGraph>

            <IconButton
              size="sm"
              aria-label="Zoom in"
              variant="neutral_icon"
              leftIcon={<PlusBlack color="#1f2539" />}
              onClick={() => onSetScale("in")}
            />
          </Flex>
          <Box width="2px" height="36px" bg={"gray.400"} />
          <TypoGraph
            variant="label01"
            textAlign="center"
            onClick={() => downloadFile(fileURL, fileName)}
            width="84px"
            borderRadius={4}
            color={"gray.900"}
            cursor="pointer"
          >
            {t("file-download")}
          </TypoGraph>
        </Flex>
      )}
    </Box>
  );
};
