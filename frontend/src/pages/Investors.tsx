import PageTemplate from './PageTemplate';

export default function Investors() {
  return (
    <PageTemplate
      title="Investors"
      subtitle="Manage investor access, enable/disable profiles, and review performance from the Super Admin console."
      details={[
        'View all investor profiles and contact details',
        'Enable or disable investor access across the platform',
        'Monitor total wealth, asset allocation, and recent activity',
        'Inspect PAN, holdings, and transaction history in one place',
      ]}
    />
  );
}
