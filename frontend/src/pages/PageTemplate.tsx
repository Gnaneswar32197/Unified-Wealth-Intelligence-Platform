import React from 'react';

interface PageTemplateProps {
  title: string;
  subtitle: string;
  details: string[];
  children?: React.ReactNode;
}

export default function PageTemplate({ title, subtitle, details, children }: PageTemplateProps) {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-emerald-500 pl-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">{subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {details.map((item) => (
          <div key={item} className="rounded-3xl border border-gray-850 bg-gray-900/90 p-6 shadow-sm">
            <p className="text-sm text-slate-200">{item}</p>
          </div>
        ))}
      </div>

      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </div>
  );
}
