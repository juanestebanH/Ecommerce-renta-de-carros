import React from "react";

import CardCetegoria from "./CardCetegoria";

function CategoriaSection() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center p-10">
      <h1 className="text-lg font-medium text-center md:text-3xl mt-6 mb-6">
        Amplia Gama De Vehículos
      </h1>

      <div className="mt-10 grid  grid-cols-1 md:grid-cols-2 place-items-center  gap-6">
        <CardCetegoria ruta={"cat1"} titulo={"Cars"} />
        <CardCetegoria ruta={"cat2"} titulo={"Suvs"} />
        <CardCetegoria ruta={"cat3"} titulo={"Vans"} />
        <CardCetegoria ruta={"cat4"} titulo={"electric"} />
      </div>
    </section>
  );
}

export default CategoriaSection;
