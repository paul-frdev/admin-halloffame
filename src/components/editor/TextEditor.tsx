import React, { forwardRef } from "react";
import { stripHtml } from "string-strip-html";
import WYSIWYGEditor from './WYSIWYGEditor';
import { Control, Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';

interface TextInputProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>> extends UseControllerProps<TFieldValues, TName> {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

export const TextEditor = forwardRef<HTMLDivElement, TextInputProps>(
  (
    {
      control,
      defaultValue,
      disabled = false,
      label,
      name,
      placeholder = "",
      rules,
    }: TextInputProps,
    forwardedRef
  ) => {

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <WYSIWYGEditor {...field} />
        )}
        rules={{
          validate: {
            required: (v) =>
              (v && stripHtml(v).result.length > 0) ||
              "Description is required",
            maxLength: (v) =>
              (v && stripHtml(v).result.length <= 2000) ||
              "Maximum character limit is 2000",
          },
        }}
      />
    );
  }
);
