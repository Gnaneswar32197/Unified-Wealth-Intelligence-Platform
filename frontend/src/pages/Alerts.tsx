import PageTemplate from './PageTemplate';

export default function Alerts() {
  return (
    <PageTemplate
      title="Alerts"
      subtitle="Configure notifications, monitor critical system events, and manage custom alert rules." 
      details={[
        'Review active alert conditions and notification channels',
        'Configure rules for service health, API thresholds, and security events',
        'View alert history and incident acknowledgements',
        'Enable auto-notifications for compliance and operations teams',
      ]}
    />
  );
}
