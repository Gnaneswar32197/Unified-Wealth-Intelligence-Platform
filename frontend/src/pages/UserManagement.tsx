<<<<<<< HEAD
import {

  useEffect,

  useState

} from "react";

import toast from "react-hot-toast";



const API =
"http://localhost:5000";



export default function UserManagement(){



  /* ==========================================
     STATES
  ========================================== */

  const [users,setUsers] =
  useState<any[]>([]);



  const [loading,setLoading] =
  useState(false);



  const [showCreateModal,setShowCreateModal] =
  useState(false);



  const [formData,setFormData] =
  useState({

    full_name:"",

    email:"",

    password:"",

    role_id:"",

    employee_code:""
  });



  /* ==========================================
     AUTH
  ========================================== */

  const token =
  localStorage.getItem(
    "wealth-token"
=======
import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import { ShieldCheck, UserCheck, UserX, UserPlus, RefreshCw, X } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New user form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchUsersAndRoles() {
    try {
      const token = localStorage.getItem('wealth-token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const [usersRes, rolesRes] = await Promise.all([
        fetch('http://localhost:5000/api/admin/users', { headers }).then(r => r.json()),
        fetch('http://localhost:5000/api/roles', { headers }).then(r => r.json())
      ]);

      if (usersRes.success) setUsers(usersRes.users);
      if (rolesRes.success) setRoles(rolesRes.roles);
    } catch (err) {
      console.error("Failed to fetch user list, using fallback:", err);
      // Fallbacks
      setUsers([
        { id: 1, full_name: "Admin User", email: "admin@wealth.io", employee_code: "EMP-001", is_active: true, role_name: "SuperAdmin" },
        { id: 2, full_name: "Aditya Vardhan", email: "aditya@wealth.io", employee_code: "EMP-002", is_active: true, role_name: "RM" },
        { id: 3, full_name: "Meera Nair", email: "meera@wealth.io", employee_code: "EMP-003", is_active: false, role_name: "Advisory" }
      ]);
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
    fetchUsersAndRoles();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!fullName || !email || !password || !roleId || !employeeCode) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch('http://localhost:5000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          password,
          role_id: Number(roleId),
          employee_code: employeeCode
        })
      });

      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        // Reset form
        setFullName('');
        setEmail('');
        setPassword('');
        setRoleId('');
        setEmployeeCode('');
        // Refresh list
        fetchUsersAndRoles();
      } else {
        setErrorMessage(data.message || 'Failed to create user');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network connection failure');
    }
  };

  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    setActionLoading(`status-${userId}`);
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_active: !currentStatus })
      });

      const data = await res.json();
      if (data.success) {
        setUsers(users.map(u => u.id === userId ? { ...u, is_active: !currentStatus } : u));
      } else {
        alert(data.message || 'Failed to update user status');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRoleChange = async (userId: number, newRoleId: number) => {
    setActionLoading(`role-${userId}`);
    try {
      const token = localStorage.getItem('wealth-token');
      const res = await fetch(`http://localhost:5000/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role_id: newRoleId })
      });

      const data = await res.json();
      if (data.success) {
        const foundRole = roles.find(r => r.id === newRoleId);
        setUsers(users.map(u => u.id === userId ? { ...u, role_name: foundRole ? foundRole.role_name : u.role_name } : u));
        alert('Role updated successfully');
      } else {
        alert(data.message || 'Failed to update user role');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <PageTemplate
      title="User Operations Center"
      subtitle="Provision system credentials, configure custom microservice role scopes, and lock/unlock terminal nodes."
      details={[
        'Define institutional roles (RM, Compliance, Operations, Advisory, Security, Admin)',
        'Toggle network clearances for active operator shells',
        'Verify employee credentials with secure multi-tenant checks',
        'Audit access sessions and security compliance scores in real time',
      ]}
    >
      <div className="mt-8 flex justify-between items-center mb-6">
        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Institutional Node Operators</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-emerald-500/10"
        >
          <UserPlus size={14} />
          Provision Operator
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
                  <th className="px-6 py-4">Operator Name</th>
                  <th className="px-6 py-4">Security Email Address</th>
                  <th className="px-6 py-4">Employee ID</th>
                  <th className="px-6 py-4">Assigned Role Desk</th>
                  <th className="px-6 py-4 text-center">Clearance Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((operator) => (
                  <tr key={operator.id} className="hover:bg-gray-850/30 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-100">{operator.full_name}</td>
                    <td className="px-6 py-4 font-mono text-gray-300">{operator.email}</td>
                    <td className="px-6 py-4 font-mono text-gray-400">{operator.employee_code || "EMP-MOCK"}</td>
                    <td className="px-6 py-4">
                      {roles.length > 0 ? (
                        <select
                          disabled={actionLoading === `role-${operator.id}`}
                          value={roles.find(r => r.role_name === operator.role_name)?.id || ''}
                          onChange={(e) => handleRoleChange(operator.id, Number(e.target.value))}
                          className="bg-gray-950 border border-gray-800 rounded-lg py-1 px-2.5 outline-none transition focus:border-emerald-500 font-semibold text-gray-300"
                        >
                          <option value="" disabled>Select Role</option>
                          {roles.map(r => (
                            <option key={r.id} value={r.id}>{r.role_name}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-bold text-emerald-400 font-mono">{operator.role_name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border ${
                        operator.is_active 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                          : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                      }`}>
                        {operator.is_active ? "AUTHORIZED" : "REVOKED"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(operator.id, operator.is_active)}
                        disabled={actionLoading === `status-${operator.id}`}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 ml-auto transition ${
                          operator.is_active
                            ? 'bg-rose-500/5 border-rose-500/20 text-rose-400 hover:bg-rose-500/10'
                            : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10'
                        }`}
                      >
                        {actionLoading === `status-${operator.id}` ? (
                          <RefreshCw className="animate-spin" size={13} />
                        ) : operator.is_active ? (
                          <>
                            <UserX size={13} />
                            Deauthorize
                          </>
                        ) : (
                          <>
                            <UserCheck size={13} />
                            Authorize
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Provision Operator Dialog Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-[2rem] p-8 shadow-2xl flex flex-col relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" />
              Provision Access Node
            </h3>
            <p className="text-xs text-gray-400 mb-6">Create credentials and define institutional role policies for platform operations.</p>

            {errorMessage && (
              <div className="mb-4 p-3 bg-rose-950/20 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Operator Name</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="E.g., Alex Mercer"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 outline-none transition focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Employee ID</label>
                  <input
                    value={employeeCode}
                    onChange={(e) => setEmployeeCode(e.target.value)}
                    required
                    placeholder="E.g., EMP-401"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 outline-none transition focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Institutional Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="alex@wealth.io"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 outline-none transition focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Initialize Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 outline-none transition focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Clearance Desk Role</label>
                <select
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  required
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-xs text-gray-200 outline-none transition focus:border-emerald-500 font-semibold"
                >
                  <option value="" disabled>Select access clearance level</option>
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.role_name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 mt-8 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-gray-950 hover:bg-gray-900 border border-gray-800 text-gray-400 text-xs font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition shadow-lg shadow-emerald-500/10"
                >
                  Confirm Provisioning
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageTemplate>
>>>>>>> 0dd0924b (changed frontend)
  );



  const headers = {

    "Content-Type":
    "application/json",

    Authorization:
    `Bearer ${token}`
  };



  /* ==========================================
     LOAD USERS
  ========================================== */

  useEffect(() => {

    loadUsers();

  },[]);



  async function loadUsers(){

    try {

      setLoading(true);



      const loadingToast =
      toast.loading(
        "Loading users..."
      );



      const res =
      await fetch(
        `${API}/api/admin/users`,
        {
          headers
        }
      );



      const data =
      await res.json();



      toast.dismiss(
        loadingToast
      );



      if(data.success){

        setUsers(
          data.users || []
        );

      } else {

        toast.error(
          "Failed to load users"
        );
      }

    } catch(error){

      toast.error(
        "Server error"
      );

      console.log(error);

    } finally {

      setLoading(false);
    }
  }



  /* ==========================================
     CREATE USER
  ========================================== */

  async function createUser(){

    try {

      const loadingToast =
      toast.loading(
        "Creating user..."
      );



      const res =
      await fetch(
        `${API}/api/admin/users`,
        {

          method:"POST",

          headers,

          body:JSON.stringify(
            formData
          )
        }
      );



      const data =
      await res.json();



      toast.dismiss(
        loadingToast
      );



      if(data.success){

        toast.success(
          "User created successfully"
        );



        loadUsers();



        setShowCreateModal(false);



        setFormData({

          full_name:"",

          email:"",

          password:"",

          role_id:"",

          employee_code:""
        });

      } else {

        toast.error(
          data.message ||
          "Failed to create user"
        );
      }

    } catch(error){

      toast.error(
        "Server error"
      );

      console.log(error);
    }
  }



  /* ==========================================
     UPDATE ROLE
  ========================================== */

  async function updateRole(
    id:number,
    role_id:number
  ){

    try {

      const loadingToast =
      toast.loading(
        "Updating role..."
      );



      const res =
      await fetch(
        `${API}/api/admin/users/${id}/role`,
        {

          method:"PATCH",

          headers,

          body:JSON.stringify({
            role_id
          })
        }
      );



      const data =
      await res.json();



      toast.dismiss(
        loadingToast
      );



      if(data.success){

        toast.success(
          "Role updated successfully"
        );

        loadUsers();

      } else {

        toast.error(
          data.message ||
          "Failed to update role"
        );
      }

    } catch(error){

      toast.error(
        "Server error"
      );

      console.log(error);
    }
  }



  /* ==========================================
     UPDATE STATUS
  ========================================== */

  async function toggleStatus(
    id:number,
    is_active:boolean
  ){

    try {

      const loadingToast =
      toast.loading(
        "Updating user status..."
      );



      const res =
      await fetch(
        `${API}/api/admin/users/${id}/status`,
        {

          method:"PATCH",

          headers,

          body:JSON.stringify({

            is_active:
            !is_active
          })
        }
      );



      const data =
      await res.json();



      toast.dismiss(
        loadingToast
      );



      if(data.success){

        toast.success(
          "User status updated"
        );

        loadUsers();

      } else {

        toast.error(
          data.message ||
          "Failed to update status"
        );
      }

    } catch(error){

      toast.error(
        "Server error"
      );

      console.log(error);
    }
  }



  /* ==========================================
     DELETE USER
  ========================================== */

  async function deleteUser(
    id:number
  ){

    const confirmDelete =
    window.confirm(
      "Delete this user?"
    );



    if(!confirmDelete){

      return;
    }



    try {

      const loadingToast =
      toast.loading(
        "Deleting user..."
      );



      const res =
      await fetch(
        `${API}/api/admin/users/${id}`,
        {

          method:"DELETE",

          headers
        }
      );



      const data =
      await res.json();



      toast.dismiss(
        loadingToast
      );



      if(data.success){

        toast.success(
          "User deleted successfully"
        );

        loadUsers();

      } else {

        toast.error(
          data.message ||
          "Failed to delete user"
        );
      }

    } catch(error){

      toast.error(
        "Server error"
      );

      console.log(error);
    }
  }



  return (

    <div className="space-y-8 p-6">



      {/* ======================================
         PAGE HEADER
      ====================================== */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-white">

            User Management

          </h1>

          <p className="text-gray-400 mt-2">

            Manage platform users,
            enterprise roles,
            and access controls

          </p>

        </div>



        <button
          onClick={() =>
            setShowCreateModal(true)
          }
          className="
            bg-emerald-500
            hover:bg-emerald-600
            transition-all
            px-6
            py-3
            rounded-xl
            text-black
            font-semibold
            shadow-lg
          "
        >

          + Create User

        </button>

      </div>



      {/* ======================================
         CREATE USER MODAL
      ====================================== */}

      {
        showCreateModal && (

          <div
            className="
              fixed
              inset-0
              bg-black/70
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
            "
          >

            <div
              className="
                bg-gray-900
                border
                border-gray-800
                rounded-3xl
                p-8
                w-full
                max-w-2xl
                shadow-2xl
              "
            >

              {/* HEADER */}

              <div className="flex justify-between items-center mb-8">

                <div>

                  <h2 className="text-2xl font-bold text-white">

                    Create Platform User

                  </h2>

                  <p className="text-gray-400 mt-1">

                    Add a new enterprise operator

                  </p>

                </div>



                <button
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                  className="
                    text-gray-400
                    hover:text-white
                    text-2xl
                  "
                >

                  ×

                </button>

              </div>



              {/* FORM */}

              <div className="grid grid-cols-2 gap-5">

                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      full_name:e.target.value
                    })
                  }
                  className="
                    bg-gray-950
                    border
                    border-gray-700
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-emerald-500
                  "
                />



                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email:e.target.value
                    })
                  }
                  className="
                    bg-gray-950
                    border
                    border-gray-700
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-emerald-500
                  "
                />



                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password:e.target.value
                    })
                  }
                  className="
                    bg-gray-950
                    border
                    border-gray-700
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-emerald-500
                  "
                />



                <input
                  type="text"
                  placeholder="Employee Code"
                  value={formData.employee_code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employee_code:e.target.value
                    })
                  }
                  className="
                    bg-gray-950
                    border
                    border-gray-700
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-emerald-500
                  "
                />



                <select
                  value={formData.role_id}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role_id:e.target.value
                    })
                  }
                  className="
                    bg-gray-950
                    border
                    border-gray-700
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:border-emerald-500
                  "
                >

                  <option value="">
                    Select Role
                  </option>

                  <option value="1">
                    ADMIN
                  </option>

                  <option value="2">
                    RM
                  </option>

                  <option value="3">
                    ADVISOR
                  </option>

                  <option value="4">
                    OPERATIONS
                  </option>

                  <option value="5">
                    COMPLIANCE
                  </option>

                  <option value="6">
                    SECURITY
                  </option>

                </select>

              </div>



              {/* ACTIONS */}

              <div className="flex justify-end gap-4 mt-8">

                <button
                  onClick={() =>
                    setShowCreateModal(false)
                  }
                  className="
                    px-5
                    py-3
                    rounded-xl
                    bg-gray-800
                    hover:bg-gray-700
                    transition
                  "
                >

                  Cancel

                </button>



                <button
                  onClick={createUser}
                  className="
                    bg-emerald-500
                    hover:bg-emerald-600
                    transition-all
                    px-6
                    py-3
                    rounded-xl
                    text-black
                    font-semibold
                  "
                >

                  Create User

                </button>

              </div>

            </div>

          </div>
        )
      }



      {/* ======================================
         USERS LIST
      ====================================== */}

      <div className="space-y-4">

        {
          loading
          ?
          (
            <p className="text-gray-400">

              Loading users...

            </p>
          )
          :
          (
            users.map((user:any) => (

              <div
                key={user.id}
                className="
                  bg-gray-900
                  border
                  border-gray-800
                  rounded-2xl
                  p-6
                "
              >

                <div className="flex justify-between">

                  <div>

                    <h3 className="text-lg font-semibold text-white">

                      {user.full_name}

                    </h3>

                    <p className="text-gray-400 text-sm">

                      {user.email}

                    </p>

                    <p className="text-xs text-gray-500 mt-2">

                      Employee:
                      {user.employee_code}

                    </p>

                  </div>



                  <div className="text-right">

                    <div className="text-emerald-400 font-semibold">

                      {user.role_name}

                    </div>

                    <div className="text-xs text-gray-500 mt-2">

                      {
                        user.is_active
                        ?
                        "ACTIVE"
                        :
                        "DISABLED"
                      }

                    </div>

                  </div>

                </div>



                {/* ACTIONS */}

                <div className="flex gap-3 mt-6 flex-wrap">

                  <button
                    onClick={() =>
                      updateRole(
                        user.id,
                        1
                      )
                    }
                    className="
                      bg-blue-500
                      hover:bg-blue-600
                      transition
                      px-4
                      py-2
                      rounded-xl
                      text-sm
                    "
                  >

                    Make Admin

                  </button>



                  <button
                    onClick={() =>
                      updateRole(
                        user.id,
                        2
                      )
                    }
                    className="
                      bg-purple-500
                      hover:bg-purple-600
                      transition
                      px-4
                      py-2
                      rounded-xl
                      text-sm
                    "
                  >

                    Make RM

                  </button>



                  <button
                    onClick={() =>
                      toggleStatus(
                        user.id,
                        user.is_active
                      )
                    }
                    className="
                      bg-yellow-500
                      hover:bg-yellow-600
                      transition
                      text-black
                      px-4
                      py-2
                      rounded-xl
                      text-sm
                    "
                  >

                    {
                      user.is_active
                      ?
                      "Deactivate"
                      :
                      "Activate"
                    }

                  </button>



                  <button
                    onClick={() =>
                      deleteUser(
                        user.id
                      )
                    }
                    className="
                      bg-red-500
                      hover:bg-red-600
                      transition
                      px-4
                      py-2
                      rounded-xl
                      text-sm
                    "
                  >

                    Delete

                  </button>

                </div>

              </div>
            ))
          )
        }

      </div>

    </div>
  );
}