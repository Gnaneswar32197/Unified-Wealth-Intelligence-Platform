import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import MutualFunds from "../pages/MutualFunds"
import Equity from "../pages/Equity"
import RealEstate from "../pages/RealEstate"

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/mutualfunds" element={<MutualFunds />} />

        <Route path="/equity" element={<Equity />} />

        <Route path="/realestate" element={<RealEstate />} />

      </Routes>

    </BrowserRouter>

  )
}

export default AppRoutes