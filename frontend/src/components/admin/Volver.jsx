import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Volver({ to }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-center bg-white gap-2 border-[#6B7280] border-1 rounded-lg  text-sm w-24 h-9"
    >
      <ArrowLeft />
      Volver
    </Link>
  );
}

export default Volver;
