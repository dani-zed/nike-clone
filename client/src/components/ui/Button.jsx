import React from 'react';
import { clsx } from 'clsx';

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}) {
  return (
    <button
      className={clsx(
        'rounded-full font-medium transition-colors',
        {
          'bg-black text-white hover:bg-gray-800': variant === 'primary',
          'bg-white text-black hover:bg-gray-100': variant === 'secondary',
          'border-2 border-gray-300 hover:border-gray-400': variant === 'outline',
          'px-4 py-1.5 text-sm': size === 'sm',
          'px-6 py-2': size === 'md',
          'px-8 py-3 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}