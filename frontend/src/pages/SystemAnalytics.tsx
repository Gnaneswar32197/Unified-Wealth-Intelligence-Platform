import PageTemplate from './PageTemplate';

export default function SystemAnalytics() {
  return (
    <PageTemplate
      title="System Analytics"
      subtitle="Access complete analytics across the platform, including revenue, asset flows, and compliance metrics." 
      details={[
        'View unified portfolio and wealth trend analytics',
        'Track platform adoption, investor growth, and asset performance',
        'Analyze service health alongside API and alert metrics',
        'Review compliance and audit signal trends over time',
      ]}
    />
  );
}
