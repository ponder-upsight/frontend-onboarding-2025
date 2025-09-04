"use client";

/** @jsxImportSource @emotion/react */
import { useMemo, useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Box, Flex, Text } from "@chakra-ui/react";
import { Locale, isSameDay } from "date-fns";
import { enUS, es, ja, ko } from "date-fns/locale";

import {
  CalendarBlack,
  DeleteSmallGray,
  LeftDouble,
  LeftIcon,
  RightDouble,
  RightIcon,
} from "@/assets/icons";

import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { TypoGraph } from "../Typography";
import "./DatePicker.css";
import { DATE_MONTH } from "./dateMonth";

interface DateSelectorProps {
  t: (key: string) => string;
  onClickApplyBtn: () => void;
  onClickDeleteBtn: () => void;
  startDate: Date | null;
  endDate: Date | null;
  onChangeRange?: (start: Date | null, end: Date | null) => void;
  setLocalStartDate?: (date: Date | null) => void;
  setLocalEndDate?: (date: Date | null) => void;
  locale?: "en" | "es" | "ko" | "ja";
  onlyHaveStartDate?: boolean;
  minDate?: Date;
  maxDate?: Date;
  datePickerPosition?: "left" | "right";
  hasError?: boolean;
}

registerLocale("en", enUS as Locale);
registerLocale("ko", ko as Locale);
registerLocale("es", es as Locale);
registerLocale("ja", ja as Locale);

export const DateInput = ({
  t,
  locale = "en",
  startDate,
  minDate,
  maxDate,
  endDate,
  onChangeRange,
  setLocalEndDate,
  setLocalStartDate,
  onClickApplyBtn,
  onClickDeleteBtn,
  onlyHaveStartDate,
  datePickerPosition = "right",
  hasError = false,
}: DateSelectorProps) => {
  const localeMap: Record<string, Locale> = {
    en: enUS,
    es: es,
    ko: ko,
    ja: ja,
  };

  const selectedLocale = localeMap[locale] || enUS;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const pickerPositionStyle = useMemo(() => {
    return datePickerPosition === "left" ? { left: "0" } : { right: "0" };
  }, [datePickerPosition]);

  const resetDate = () => {
    setLocalStartDate?.(null);
    setLocalEndDate?.(null);
    setShowDatePicker(false);
  };

  const handleDateChange = (picked: Date | null) => {
    if (!picked) return;

    // 단일 시작일 모드
    if (onlyHaveStartDate) {
      if (onChangeRange) onChangeRange(picked, null);
      else setLocalStartDate?.(picked);
      return;
    }

    // 아직 아무 것도 없음 → 시작일로
    if (!startDate) {
      if (onChangeRange) onChangeRange(picked, null);
      else {
        setLocalStartDate?.(picked);
        setLocalEndDate?.(null);
      }
      return;
    }

    // 시작일만 있음 → 종료일 선택/스왑 처리
    if (startDate && !endDate) {
      const s = startDate.getTime();
      const n = picked.getTime();

      if (n < s) {
        // 🔁 스왑
        if (onChangeRange) onChangeRange(picked, startDate);
        else {
          setLocalStartDate?.(picked);
          setLocalEndDate?.(startDate);
        }
      } else {
        // 같은 날 포함 케이스도 여기서 end로 확정
        if (onChangeRange) onChangeRange(startDate, picked);
        else setLocalEndDate?.(picked);
      }
      return;
    }

    // 이미 둘 다 있음 → 새 범위 시작
    if (onChangeRange) onChangeRange(picked, null);
    else {
      setLocalStartDate?.(picked);
      setLocalEndDate?.(null);
    }
  };

  const handleDeleteClick = () => {
    resetDate();
    onClickDeleteBtn();
  };

  const handleApply = () => {
    onClickApplyBtn();
    setShowDatePicker(false);
  };

  const dayClassName = (date: Date) => {
    const classes: string[] = [];
    if (date.getDay() === 0) classes.push("react-datepicker_sunday");
    else if (date.getDay() === 6) classes.push("react-datepicker_saturday");

    if (startDate && !endDate && isSameDay(date, startDate)) {
      classes.push("dp-single-start"); // 시작만 선택된 날
    }
    return classes.join(" ");
  };

  const RenderDateText = () => {
    if (!startDate && !endDate) {
      return (
        <Flex alignItems="center" justifyContent="center" gap="0.625rem" width="100%">
          <CalendarBlack />
          <TypoGraph variant="label02" color="gray.800" as="span">
            {t("date")}
          </TypoGraph>
        </Flex>
      );
    }
    if (startDate && !endDate && showDatePicker && onlyHaveStartDate) {
      return (
        <Flex alignItems="center" justifyContent="space-between" gap="0.625rem">
          <CalendarBlack />
          <TypoGraph variant="label02" color="gray.900" as="span">
            {startDate.toLocaleDateString()}
          </TypoGraph>
          <DeleteSmallGray
            onClick={(e) => {
              e.stopPropagation();
              resetDate();
            }}
          />
        </Flex>
      );
    }
    if (startDate && !endDate && showDatePicker && !onlyHaveStartDate) {
      return (
        <Flex alignItems="center" justifyContent="space-between" gap="0.625rem">
          <CalendarBlack />
          <TypoGraph variant="label02" color="gray.900" as="span">
            {startDate.toLocaleDateString()} ~ {t("end-date")}
          </TypoGraph>
          <DeleteSmallGray
            onClick={(e) => {
              e.stopPropagation();
              resetDate();
            }}
          />
        </Flex>
      );
    }
    if (startDate && !endDate && !showDatePicker) {
      return (
        <Flex alignItems="center" justifyContent="space-between" gap="0.625rem">
          <CalendarBlack />
          <TypoGraph variant="label02" color="gray.900" as="span">
            {startDate.toLocaleDateString()}
          </TypoGraph>
          <DeleteSmallGray
            onClick={(e) => {
              e.stopPropagation();
              resetDate();
              onClickDeleteBtn();
            }}
          />
        </Flex>
      );
    }

    if (startDate && endDate) {
      return (
        <Flex alignItems={"center"} justifyContent={"space-between"} gap={"0.625rem"}>
          <CalendarBlack />
          <TypoGraph variant="label02" color="gray.900" as="span">
            {startDate.toLocaleDateString()} ~ {endDate.toLocaleDateString()}
          </TypoGraph>
          <DeleteSmallGray
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick();
            }}
          />
        </Flex>
      );
    }
    return null;
  };

  return (
    <Box position="relative">
      <Button
        variant="outlined"
        w="auto"
        p="11.5px 20px"
        height="2.75rem"
        color="black"
        display="flex"
        onClick={() => setShowDatePicker((prev) => !prev)}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        borderColor={hasError ? "red.400" : "gray.300"}
        useTypography={false}
      >
        <Flex justifyContent="center" alignItems="center" gap="0.625rem">
          {RenderDateText()}
        </Flex>
      </Button>

      {showDatePicker && (
        <Box
          ref={datePickerRef}
          position="absolute"
          right="0"
          h="auto"
          zIndex={9999}
          {...pickerPositionStyle}
        >
          <Box position="relative" width="fit-content">
            <DatePicker
              onClickOutside={() => {
                onClickApplyBtn();
                setShowDatePicker(false);
              }}
              onChange={handleDateChange}
              inline
              minDate={minDate}
              maxDate={maxDate ?? new Date()}
              locale={selectedLocale}
              disabledKeyboardNavigation
              dayClassName={dayClassName}
              startDate={startDate as Date}
              endDate={endDate as Date}
              dateFormat="yyyy-MM-dd"
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                increaseYear,
                decreaseYear,
                prevYearButtonDisabled,
                nextYearButtonDisabled,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                    height: "40px",
                    borderBottom: "2px solid #EAECF1",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="sm"
                      variant="neutral_icon"
                      padding={8}
                      onClick={decreaseYear}
                      disabled={prevYearButtonDisabled}
                      aria-label="Previous Year"
                    >
                      {/* <Icon icon="LeftDouble" size={24} color="#1F2539" /> */}
                      <LeftDouble />
                    </IconButton>
                    <IconButton
                      size="sm"
                      variant="neutral_icon"
                      padding={8}
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      aria-label="Previous Month"
                    >
                      <LeftIcon />
                    </IconButton>
                  </div>
                  <Text
                    fontWeight="600"
                    lineHeight="160%"
                    fontSize="16px"
                    color="#73758A"
                  >
                    {date.getFullYear()} {DATE_MONTH[locale][date.getMonth()]}
                  </Text>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="sm"
                      variant="neutral_icon"
                      padding={8}
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      aria-label="Next Month"
                    >
                      <RightIcon />
                    </IconButton>
                    <IconButton
                      size="sm"
                      variant="neutral_icon"
                      padding={8}
                      onClick={increaseYear}
                      disabled={nextYearButtonDisabled}
                      aria-label="Next Year"
                    >
                      <RightDouble />
                    </IconButton>
                  </div>
                </div>
              )}
            />
            <Box
              position="absolute"
              bottom="20px"
              onClick={handleApply}
              right="0"
              left="0"
              padding="0 24px"
              w="100%"
            >
              <Button variant="primary" zIndex={55} size="sm" w="100%">
                <TypoGraph variant="label01" as="span">
                  {locale === "en" ? "apply" : "적용하기"}
                </TypoGraph>
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
