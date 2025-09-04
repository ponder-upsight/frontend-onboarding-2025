import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { cloneElement } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type ContolledInputProviderProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const ContolledInputProvider = <T extends FieldValues>({
  name,
  label,
  children,
}: ContolledInputProviderProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<FieldValues>();
  return (
    <FormControl isInvalid={!!errors?.[name]}>
      <FormLabel fontSize="sm">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          cloneElement(children as React.ReactElement, { ...field })
        }
      />
      <FormErrorMessage>{errors?.[name]?.message?.toString()}</FormErrorMessage>
    </FormControl>
  );
};
export default ContolledInputProvider;
