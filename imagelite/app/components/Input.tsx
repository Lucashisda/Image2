import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-slate-300">
      <span>{label}</span>
      <input
        className={`w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-slate-100 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-900/50 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white file:transition hover:file:bg-cyan-400 ${className ?? ''}`}
        {...props}
      />
    </label>
  );
}
