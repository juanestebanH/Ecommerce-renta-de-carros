import { ChevronRight } from "lucide-react";

function CardCetegoria({ ruta, titulo }) {
  return (
    <div
      className={`${ruta} h-60 w-95 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:cursor-pointer`}
    >
      <div className="h-full flex flex-col  p-4  bg-gray-800/40 rounded-2xl shadow-xl">
        <h2 className="text-3xl text-white mt-5 font-bold">{titulo}</h2>
        <div className="border-2 border-gray-100 mt-2 mb-4 w-8 rounded-full">
          <ChevronRight size={28} className="text-white " />
        </div>
      </div>
    </div>
  );
}

export default CardCetegoria;
