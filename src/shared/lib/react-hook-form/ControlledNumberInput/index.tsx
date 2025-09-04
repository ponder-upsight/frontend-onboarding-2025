import {
  NumberInputField,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
} from "@chakra-ui/react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type ControlledNumberInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

const ControlledNumberInput = <T extends FieldValues>({
  name,
  label,
}: ControlledNumberInputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();

  return (
    <FormControl isInvalid={!!errors.amount}>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Controller
        name="amount"
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <NumberInput
            {...field}
            value={value?.toString() || ""}
            onChange={(valueString) => onChange(Number(valueString) || 0)}
            min={0}>
            <NumberInputField placeholder="0" bg="gray.100" border="none" />
          </NumberInput>
        )}
      />
      <FormErrorMessage>{errors?.[name]?.message?.toString()}</FormErrorMessage>
    </FormControl>
  );
};

export default ControlledNumberInput;
