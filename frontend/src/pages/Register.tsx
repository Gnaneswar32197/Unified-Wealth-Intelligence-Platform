const Register = () => {

  return (

    <div className="h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-10 rounded-3xl w-[400px]">

        <h1 className="text-3xl font-bold text-white mb-8">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 rounded-xl bg-slate-800 text-white mb-5 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-slate-800 text-white mb-5 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-slate-800 text-white mb-5 outline-none"
        />

        <button
          className="w-full bg-green-600 text-white p-4 rounded-xl"
        >
          Register
        </button>

      </div>

    </div>

  )
}

export default Register