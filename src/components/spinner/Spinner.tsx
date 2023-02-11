import React, { FC } from 'react';
import clsx from 'clsx';

interface SpinnerProps {
  color?: string;
  size?: 'sm' | 'lg';
}

export const Spinner: FC<SpinnerProps> = ({ color, size }) => {
  const colorClass = color ? `border-${color}` : 'border-white';
  const sizeClass =
    size === 'sm' ? 'w-4 h-4 border-2' : size === 'lg' ? 'w-8 h-8 border-4' : 'w-6 h-6 border-2';
  return (
    <div className="flex items-center justify-center">
      <div
        className={clsx('animate-spin inline-block rounded-full', colorClass, sizeClass)}
        role="status"
      ></div>
    </div>
  );
};
