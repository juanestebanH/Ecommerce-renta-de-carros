import React from 'react';

// import imagen
import herosection from '../../assets/herosection.avif';

function HeroSection() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center ">
      <div className="absolute w-full h-full inset-0 bg-[#6c7f86]/60 z-10"></div>
      <div className="w-full h-full">
        <img
          src={herosection}
          alt="foto_calle"
          className="w-full h-full object-cover "
        />
      </div>
      <div className="absolute z-12  px-4 text-center">
        <h1 className="text-white text-5xl text-shadow">
          Encuentra El <span className="text-blue-600 text-shadow">Auto</span>{' '}
          Perfecto
        </h1>
        <p className="text-shadow text-white text-lg mt-6 max-w-2xl mx-auto mb-8">
          Renta el vehículo ideal para tus aventuras, negocios o escapadas de
          fin de semana. Con nuestra plataforma, reservar es rápido, fácil y
          seguro
        </p>
        <a
          href="/carros"
          className=" px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
        >
          Explorar vehiculos
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
