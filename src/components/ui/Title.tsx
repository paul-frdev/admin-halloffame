import React from 'react';
import { Typography } from 'antd';
import { cn } from '../../lib/utils';

interface TitleProps {
  level?: 2 | 3 | 4 | 5;
  children: React.ReactNode;
  className?: string;
}
export const Title = ({ level = 2, children, className }: TitleProps) => {
  return (
    <Typography.Title className={cn(`text-[#000] font-semibold text-2xl uppercase`, className)} level={level}>{children}</Typography.Title>
  )
}
