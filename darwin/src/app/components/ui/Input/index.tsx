import { ReactNode, forwardRef } from "react";

import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";

interface CustomInputProps extends InputProps {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  errorText?: string;
  containerProps?: any;
  height?: string; // 기본값 주기 위함
  hasError?: boolean;
  setHasError?: (hasError: boolean) => void;
}

export const Input = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      variant = "primary",
      w,
      leftElement,
      rightElement,
      errorText,
      containerProps,
      height = "44px",
      minW = "200px",
      pr,
      hasError,
      setHasError,
      ...props
    },
    ref
  ) => {
    return (
      <Stack spacing="4px" {...containerProps} w={w}>
        <InputGroup minW={minW}>
          {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
          <ChakraInput
            variant={variant}
            ref={ref}
            h={height}
            isInvalid={hasError}
            pr={rightElement ? pr || "44px" : pr}
            borderColor={hasError ? "#FF5356" : "inherit"}
            _focus={{
              borderColor: hasError ? "red.500" : "blue.500",
              boxShadow: hasError ? "0 0 0 1px red.500" : "0 0 0 1px blue.500",
            }}
            _hover={{
              borderColor: hasError ? "red.500" : "gray.300",
            }}
            onFocus={() => setHasError?.(false)}
            {...props}
            onChange={(e) => {
              setHasError?.(false); // 입력 중에도 에러 해제
              props.onChange?.(e); // 기존 onChange 유지
            }}
          />
          {rightElement && (
            <InputRightElement pr={16} pt={1}>
              {rightElement}
            </InputRightElement>
          )}
        </InputGroup>
        {hasError && (
          <Text fontSize="15px" color="red.500" textAlign="left" top="100%" mt="4px">
            {errorText}
          </Text>
        )}
      </Stack>
    );
  }
);

Input.displayName = "Input";
