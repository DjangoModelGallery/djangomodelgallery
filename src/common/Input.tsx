import React, { forwardRef } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import tw, { styled } from "twin.macro";

const InputContainer = tw.div``;
const InputTitleLabel = tw.p`mb-1 font-bold text-gray-700`;
const InputWrapper = tw.div`relative `;
const InputArea = tw.div``;
const Input = styled.input<{ haserror?: boolean }>`
  ${tw`w-full px-4 py-2 border border-lime-100 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500`}
  ${({ haserror }) => haserror && tw`border-red-500`}
`;
const ErrorMessage = tw.p`mt-1 text-sm text-red-500`;

export interface CustomInputType<T extends FieldValues> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
  error?: string;
  onlyNumber?: boolean;
  control: Control<T>;
  name: Path<T>;
  validation?: boolean;
  defaultValue?: PathValue<T, Path<T>>;
  valueType?: "date";
  maxLength?: number;
  autoComplete?: "new-password" | "username" | "current-password" | "off";
  onChangeCallback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputType<any>>(
  (
    {
      label,
      placeholder,
      type = "text",
      disabled = false,
      readOnly = false,
      onlyNumber = false,
      control,
      name,
      error,
      validation = true,
      defaultValue,
      valueType,
      maxLength,
      autoComplete,
      onChangeCallback,
    },
    ref
  ) => {
    return (
      <InputContainer>
        {label && <InputTitleLabel>{label}</InputTitleLabel>}
        <Controller
          control={control}
          defaultValue={defaultValue ? defaultValue : undefined}
          name={name}
          render={({ field: { onChange, onBlur, value }, fieldState }) => (
            <InputWrapper>
              <InputArea>
                <Input
                  ref={ref}
                  type={type}
                  placeholder={placeholder}
                  disabled={disabled}
                  readOnly={readOnly}
                  value={value}
                  onChange={(e) => {
                    if (onlyNumber) {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "");
                    }
                    onChange(e);
                    if (onChangeCallback) {
                      onChangeCallback(e);
                    }
                  }}
                  onBlur={onBlur}
                  maxLength={maxLength}
                  haserror={fieldState.error ? value : undefined}
                  autoComplete={autoComplete ?? "off"}
                />
                {fieldState.error?.message && validation && (
                  <ErrorMessage>{fieldState.error?.message}</ErrorMessage>
                )}
              </InputArea>
            </InputWrapper>
          )}
        />
      </InputContainer>
    );
  }
);

// displayName 설정
CustomInput.displayName = "CustomInput";

export default CustomInput;
