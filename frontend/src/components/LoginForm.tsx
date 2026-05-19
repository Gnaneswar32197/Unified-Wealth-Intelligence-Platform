import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {

  try {

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    console.log(data)

    if(response.ok){

      localStorage.setItem("token", data.token)

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      )

      navigate("/dashboard")

    } else {

      alert(data.message)

    }

  } catch(error){

    console.log(error)

    alert("Server error")

  }

}

  return (

    <div className="w-[450px]">

      <h1 className="text-5xl font-bold text-white mb-4">
        Welcome Back
      </h1>

      <p className="text-slate-400 mb-10 text-lg">
        Login to access your financial dashboard.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-5 rounded-2xl bg-slate-800 text-white mb-6 outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        className="w-full p-5 rounded-2xl bg-slate-800 text-white mb-8 outline-none"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 hover:bg-blue-700 duration-300 text-white p-5 rounded-2xl text-lg font-semibold"
      >
        Login
      </button>

    </div>

  )
}

export default LoginForm