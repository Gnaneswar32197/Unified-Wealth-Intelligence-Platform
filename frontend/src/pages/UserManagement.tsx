import PageTemplate from './PageTemplate';

export default function UserManagement() {
  return (
    <PageTemplate
      title="User Management"
      subtitle="Manage users, assign roles, and enforce access policies across the wealth intelligence platform." 
      details={[
        'Create, update, and disable user accounts',
        'Assign roles like RM, Operations, Compliance, and Advisor',
        'Grant or revoke access to dashboards and data endpoints',
        'Review active sessions and audit user behavior',
      ]}
    />
  );
}
