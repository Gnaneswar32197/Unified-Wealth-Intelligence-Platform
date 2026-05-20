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