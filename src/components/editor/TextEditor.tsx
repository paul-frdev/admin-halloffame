import React, { ForwardedRef, forwardRef } from "react";
import { stripHtml } from "string-strip-html";
import WYSIWYGEditor from './WYSIWYGEditor';
import { Controller, FieldValues, Path, UseControllerProps } from 'react-hook-form';
import { Editor as DraftEditor } from 'draft-js';

interface TextInputProps<TFieldValues extends FieldValues = FieldValues, TName extends Path<TFieldValues> = Path<TFieldValues>> extends UseControllerProps<TFieldValues, TName> {
  disabled?: boolean;
  label?: string;
  placeholder?: string;
}

export const TextEditor = forwardRef<DraftEditor, TextInputProps>(
  (
    {
      control,
      name,
    }: TextInputProps,
    forwardedRef: ForwardedRef<DraftEditor>
  ) => {

    return (
      <Controller
        name={name}
        control={control}
        defaultValue=''
        render={({ field }) => (
          <WYSIWYGEditor {...field} ref={forwardedRef as any} />
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
