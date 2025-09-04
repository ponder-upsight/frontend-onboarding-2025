"use client";

/** @jsxImportSource @emotion/react */
import { Box, Grid } from "@chakra-ui/react";
import { css } from "@emotion/react";

import { TypoGraph } from "@/app/components/ui/Typography";
import { useI18n } from "@/app/i18n/I18nProvider";

interface CurrentImagesSectionProps {
  title: string;
  imageUrls: string[];
  multiple: boolean;
}

const CurrentImagesSection = ({
  title,
  imageUrls,
  multiple,
}: CurrentImagesSectionProps) => {
  const { t } = useI18n();

  if (imageUrls.length === 0) {
    return null;
  }

  return (
    <Box>
      <TypoGraph variant="body01" mb="8px" color="gray.900">
        {t("currentImages")} ({title})
      </TypoGraph>

      {!multiple && imageUrls.length > 0 ? (
        <Box position="relative" width="fit-content">
          <Box
            css={imagePreviewContainer}
            backgroundImage={`url(${imageUrls[0]})`}
            backgroundSize="cover"
            backgroundPosition="center"
            h="120px"
            w="120px"
            borderRadius="8px"
          />
        </Box>
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(100px, 1fr))" gap="12px">
          {imageUrls.map((imageUrl, index) => (
            <Box key={`current-${index}`} position="relative">
              <Box
                css={imagePreviewContainer}
                backgroundImage={`url(${imageUrl})`}
                backgroundSize="cover"
                backgroundPosition="center"
                h="100px"
                borderRadius="8px"
              />
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CurrentImagesSection;

const imagePreviewContainer = css`
  border: 2px solid #eaecf1;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;
