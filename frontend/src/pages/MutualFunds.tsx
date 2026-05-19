import Sidebar from "../components/Sidebar"

const MutualFunds = () => {

  return (

    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10 text-white">

        <h1 className="text-4xl font-bold mb-10">
          Mutual Funds & SIP Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-8">

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Active SIPs
            </h2>

            <p className="text-4xl text-blue-400">
              24
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              NAV Value
            </h2>

            <p className="text-4xl text-green-400">
              ₹8.2L
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Failed SIPs
            </h2>

            <p className="text-4xl text-red-400">
              2
            </p>
          </div>

        </div>

      </div>

    </div>

  )
}

export default MutualFunds