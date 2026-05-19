type Props = {
  title: string
  description: string
  onClick: () => void
}

const DashboardCard = ({
  title,
  description,
  onClick
}: Props) => {

  return (

    <div
      onClick={onClick}
      className="bg-slate-900 p-8 rounded-3xl cursor-pointer hover:scale-105 duration-300"
    >

      <h1 className="text-white text-2xl font-bold mb-4">
        {title}
      </h1>

      <p className="text-gray-400">
        {description}
      </p>

    </div>

  )
}

export default DashboardCard