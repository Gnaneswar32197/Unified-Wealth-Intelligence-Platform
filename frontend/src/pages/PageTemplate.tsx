interface PageTemplateProps {
  title: string;
  subtitle: string;
  details: string[];
}

export default function PageTemplate({ title, subtitle, details }: PageTemplateProps) {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-emerald-500 pl-4">
        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">{subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {details.map((item) => (
          <div key={item} className="rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-sm shadow-slate-950/10">
            <p className="text-sm text-slate-200">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
