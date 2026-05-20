import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { KeyRound, ShieldAlert, Trash2, Plus, Edit2, X, RefreshCw } from 'lucide-react';

export default function RoleManagement() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRoleId, setEditRoleId] = useState<number | null>(null);
  const [roleName, setRoleName] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function fetchRoles() {
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch('http://localhost:5000/api/roles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setRoles(data.roles);
      }
    } catch (err) {
      console.error("Failed to fetch roles list, using fallback:", err);
      setRoles([
        { id: 1, role_name: "SuperAdmin" },
        { id: 2, role_name: "Admin" },
        { id: 3, role_name: "RM" },
        { id: 4, role_name: "Advisory" },
        { id: 5, role_name: "Operations" },
        { id: 6, role_name: "Compliance" },
        { id: 7, role_name: "Security" }
      ]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleOpenCreateModal = () => {
    setEditRoleId(null);
    setRoleName('');
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleOpenEditModal = (role: any) => {
    setEditRoleId(role.id);
    setRoleName(role.role_name);
    setErrorMsg('');
    setModalOpen(true);
  };

  const handleSubmitRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!roleName.trim()) {
      setErrorMsg('Role name is required');
      return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem('wealth-token');
      const method = editRoleId ? 'PATCH' : 'POST';
      const url = editRoleId 
        ? `http://localhost:5000/api/roles/${editRoleId}` 
        : 'http://localhost:5000/api/roles';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role_name: roleName.trim() })
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchRoles();
      } else {
        setErrorMsg(data.message || 'Action failed');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEstablishPresetRole = async (name: string) => {
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch('http://localhost:5000/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role_name: name })
      });
      const data = await res.json();
      if (data.success) {
        fetchRoles();
      } else {
        alert(data.message || `Failed to establish role ${name}`);
      }
    } catch (err) {
      console.error(err);
      alert('Connection error occurred');
    }
  };

  const handleDeleteRole = async (roleId: number) => {
    if (!confirm('Are you sure you want to delete this clearance role?')) return;

    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch(`http://localhost:5000/api/roles/${roleId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setRoles(roles.filter(r => r.id !== roleId));
        alert('Clearance role deleted');
      } else {
        alert(data.message || 'Cannot delete role assigned to active operators');
      }
    } catch (err) {
      console.error(err);
      alert('Delete failed due to network error');
    }
  };

  return (
    <PageTemplate
      title="Clearance Role Desks"
      subtitle="Establish structural access hierarchies, review privilege scopes, and edit platform access configurations."
      details={[
        'Define clear institutional role identities (RM, Compliance, Operations)',
        'Check assigned privileges across service boundary layers',
        'Prevent deletion of roles with active operators assigned',
        'Audit role configuration records dynamically to ensure security standards',
      ]}
    >
      {/* Preset Roles Hub */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-6 mb-2">
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2 font-mono">
          <ShieldAlert className="text-emerald-400" size={15} />
          Target Institutional Role Presets
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          {['RM', 'ADVISOR', 'OPERATIONS', 'COMPLIANCE', 'SECURITY'].map((presetName) => {
            const exists = roles.some(r => r.role_name.toUpperCase() === presetName.toUpperCase());
            return (
              <div key={presetName} className="p-3 bg-gray-950 border border-gray-850 rounded-xl flex flex-col justify-between items-center text-center gap-3">
                <span className="text-xs font-bold text-gray-100 font-mono tracking-wider">{presetName}</span>
                {exists ? (
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                    ACTIVE
                  </span>
                ) : (
                  <button
                    onClick={() => handleEstablishPresetRole(presetName)}
                    className="w-full py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold rounded-lg transition"
                  >
                    Establish
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-8 flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Access Clearances</h3>
        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-500/10"
        >
          <Plus size={14} />
          Create Clearance Desk
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-gray-400 bg-gray-950/60 uppercase border-b border-gray-800 font-mono">
                <tr>
                  <th className="px-6 py-4">Role Key ID</th>
                  <th className="px-6 py-4">Assigned Clearance Identifier</th>
                  <th className="px-6 py-4 text-center">Status Flag</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-850/30 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-emerald-400">#00{role.id}</td>
                    <td className="px-6 py-4 font-bold text-gray-100 uppercase tracking-wider">{role.role_name}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-mono uppercase">
                        ACTIVE_NODE
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(role)}
                        className="p-2 bg-gray-950 border border-gray-850 text-gray-400 hover:text-emerald-400 hover:border-emerald-500/30 rounded-lg transition"
                        title="Edit clearance identifier"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        className="p-2 bg-gray-950 border border-gray-850 text-gray-400 hover:text-rose-400 hover:border-rose-500/30 rounded-lg transition"
                        title="Delete clearance desk"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Dialog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-[2rem] p-8 shadow-2xl flex flex-col relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <KeyRound className="text-emerald-400" />
              {editRoleId ? 'Configure Clearance Desk' : 'Establish Clearance Desk'}
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              {editRoleId 
                ? 'Update the assigned identifier label for this institutional role desk.' 
                : 'Define a new institutional role descriptor to control routing clearance boundaries.'}
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-medium flex items-center gap-2">
                <ShieldAlert size={14} className="shrink-0" />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmitRole} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Clearance Identifier</label>
                <input
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                  placeholder="E.g., RISK_MANAGER"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 outline-none transition focus:border-emerald-500 font-bold uppercase tracking-wider"
                />
              </div>

              <div className="flex gap-4 mt-8 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-3 bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-400 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-1.5"
                >
                  {actionLoading && <RefreshCw className="animate-spin" size={13} />}
                  {editRoleId ? 'Confirm Update' : 'Establish Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageTemplate>
  );
}
