import React from 'react';
import { Space, Typography } from 'antd';
import { cn } from '../../lib/utils';


interface TextProps {
  children: React.ReactNode;
  className?: string;
  type?: 'secondary' | 'danger' | 'warning' | 'success';
}
export const Text = ({ className, children, type }: TextProps) => {
  return (
    <Typography.Text className={cn(``, className)} type={type}>{children}</Typography.Text>
  )
}
