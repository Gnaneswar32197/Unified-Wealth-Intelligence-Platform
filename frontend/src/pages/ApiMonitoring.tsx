import PageTemplate from './PageTemplate';

export default function ApiMonitoring() {
  return (
    <PageTemplate
      title="API Monitoring"
      subtitle="Monitor endpoint performance, request volume, and rate-limit health for the platform APIs."
      details={[
        'Track request counts, error rates, and average latency',
        'Inspect gateway traffic and integration health status',
        'Detect API security events and suspicious access patterns',
        'Review rate-limit consumption and processing backpressure',
      ]}
    />
  );
}
