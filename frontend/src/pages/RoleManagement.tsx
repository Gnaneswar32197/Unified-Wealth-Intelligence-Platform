import PageTemplate from './PageTemplate';

export default function RoleManagement() {
  return (
    <PageTemplate
      title="Role Management"
      subtitle="Configure role-based access controls and manage permission sets for every platform role." 
      details={[
        'Define roles and permission groups for RM, Compliance, Advisor, Operations, and Security',
        'Review role assignments and service access levels',
        'Manage RBAC policies and permission matrices',
        'Audit role changes and authorization grants over time',
      ]}
    />
  );
}
