import Sidebar from "../components/Sidebar"

const RealEstate = () => {

  return (

    <div className="flex bg-slate-950 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10 text-white">

        <h1 className="text-4xl font-bold mb-10">
          Real Estate Dashboard
        </h1>

        <div className="grid grid-cols-3 gap-8">

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Properties
            </h2>

            <p className="text-4xl text-blue-400">
              6
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Total Value
            </h2>

            <p className="text-4xl text-green-400">
              ₹2.1Cr
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">
              Rental Income
            </h2>

            <p className="text-4xl text-yellow-400">
              ₹1.2L
            </p>
          </div>

        </div>

      </div>

    </div>

  )
}

export default RealEstate