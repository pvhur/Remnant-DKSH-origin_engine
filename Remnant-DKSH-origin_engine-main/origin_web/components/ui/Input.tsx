import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-toss-dark mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3.5 h-14
            bg-white border rounded-2xl
            text-base text-toss-dark
            placeholder:text-toss-greyText
            focus:outline-none focus:ring-2 focus:ring-toss-blue focus:border-transparent
            transition-all duration-200
            ${error ? 'border-red-300 focus:ring-red-400' : 'border-gray-200'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-2 text-sm text-toss-greyText">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

