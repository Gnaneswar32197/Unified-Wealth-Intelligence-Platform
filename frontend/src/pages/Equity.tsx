import Sidebar from "../components/Sidebar"

const Equity = () => {

  return (

    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10 text-white">

        <h1 className="text-4xl font-bold mb-10">
          Equity Investment Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-8">

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Total Holdings
            </h2>

            <p className="text-4xl text-blue-400">
              ₹12.5L
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Transactions
            </h2>

            <p className="text-4xl text-green-400">
              142
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Growth
            </h2>

            <p className="text-4xl text-yellow-400">
              +18%
            </p>
          </div>

        </div>

      </div>

    </div>

  )
}

export default Equity