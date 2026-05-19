import PageTemplate from './PageTemplate';

export default function ApiGovernance() {
  return (
    <PageTemplate
      title="API Governance"
      subtitle="Manage rate limits, API key controls, and security policy enforcement for external integrations." 
      details={[
        'Configure API rate limits and usage thresholds',
        'Manage JWT and API key issuance policies',
        'Monitor suspicious API activity and permission violations',
        'Enforce security rules for endpoint access and integrations',
      ]}
    />
  );
}
