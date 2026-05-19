import PageTemplate from './PageTemplate';

export default function ServiceMonitoring() {
  return (
    <PageTemplate
      title="Service Monitoring"
      subtitle="Inspect operational health, queue activity, and service dependencies for the full platform." 
      details={[
        'Monitor service dependencies and background job status',
        'Track queue backlogs, retry rates, and failed sync jobs',
        'View downstream service availability and integration errors',
        'Review reconciliation workflows and operational alerts',
      ]}
    />
  );
}
