import Sidebar from "../components/Sidebar";



export default function MainLayout({

  children

}:any){



  /* =====================================
     SAFE USER PARSE
  ===================================== */

  let user:any = {};



  try {

    const storedUser =
    localStorage.getItem(
      "wealth-user"
    );



    user =
    storedUser
    ?
    JSON.parse(storedUser)
    :
    {};

  } catch(error){

    console.log(error);

    user = {};
  }



  return (

    <div
      className="
        flex
        min-h-screen
        bg-black
        text-white
      "
    >



      {/* =================================
         SIDEBAR
      ================================= */}

      <Sidebar />



      {/* =================================
         MAIN CONTENT
      ================================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          bg-gradient-to-br
          from-gray-950
          via-black
          to-gray-950
        "
      >



        {/* =============================
           TOPBAR
        ============================== */}

        <div
          className="
            border-b
            border-gray-800
            px-8
            py-5
            flex
            justify-between
            items-center
            sticky
            top-0
            bg-black/70
            backdrop-blur-lg
            z-50
          "
        >

          <div>

            <h1 className="text-2xl font-bold">

              Unified Wealth Intelligence

            </h1>

            <p className="text-sm text-gray-400 mt-1">

              Enterprise Wealth Operations Platform

            </p>

          </div>



          {/* =========================
             USER PROFILE
          ========================== */}

          <div className="flex items-center gap-4">

            <div className="text-right">

              <h3 className="font-semibold">

                {user?.name || "Guest"}

              </h3>

              <p className="text-sm text-emerald-400">

                {user?.role || "NO ROLE"}

              </p>

            </div>



            <div
              className="
                w-12
                h-12
                rounded-full
                bg-emerald-500
                text-black
                flex
                items-center
                justify-center
                font-bold
                text-lg
              "
            >

              {
                user?.name
                ?
                user.name.charAt(0)
                :
                "U"
              }

            </div>

          </div>

        </div>



        {/* =============================
           PAGE CONTENT
        ============================== */}

        <div className="p-8">

          {children}

        </div>

      </div>

    </div>
  );
}