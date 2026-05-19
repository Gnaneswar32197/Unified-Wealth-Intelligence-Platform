import {
  LayoutDashboard,
  Landmark,
  Building2,
  WalletCards,
  Settings
} from "lucide-react"

import { Link } from "react-router-dom"

const Sidebar = () => {

  return (

    <div className="w-[280px] min-h-screen bg-[#0f172a] border-r border-slate-800 text-white p-6">

      {/* LOGO */}

      <div className="mb-14">

        <h1 className="text-3xl font-bold text-blue-500">
          WealthX
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Unified Wealth Intelligence
        </p>

      </div>

      {/* MENU */}

      <div className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="flex items-center gap-4 hover:bg-slate-800 p-4 rounded-xl duration-300"
        >
          <LayoutDashboard />
          Dashboard
        </Link>

        <Link
          to="/equity"
          className="flex items-center gap-4 hover:bg-slate-800 p-4 rounded-xl duration-300"
        >
          <Landmark />
          Equity Investment
        </Link>

        <Link
          to="/mutualfunds"
          className="flex items-center gap-4 hover:bg-slate-800 p-4 rounded-xl duration-300"
        >
          <WalletCards />
          Mutual Funds & SIP
        </Link>

        <Link
          to="/realestate"
          className="flex items-center gap-4 hover:bg-slate-800 p-4 rounded-xl duration-300"
        >
          <Building2 />
          Real Estate
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-4 hover:bg-slate-800 p-4 rounded-xl duration-300"
        >
          <Settings />
          Settings
        </Link>

      </div>

    </div>

  )
}

export default Sidebar