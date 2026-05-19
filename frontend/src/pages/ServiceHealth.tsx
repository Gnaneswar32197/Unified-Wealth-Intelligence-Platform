import PageTemplate from './PageTemplate';

export default function ServiceHealth() {
  return (
    <PageTemplate
      title="Service Health"
      subtitle="Review platform health scores, uptime, and external integration status in the Super Admin control panel."
      details={[
        'Monitor service latency and availability metrics',
        'Inspect the status of backend jobs and ingestion pipelines',
        'Track health indicators for downstream APIs and services',
        'View recovery status and operational incidents at a glance',
      ]}
    />
  );
}
