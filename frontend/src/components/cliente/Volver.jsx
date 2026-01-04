import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function Volver({ ruta, title }) {
  return (
    <div className="bg-white w-full p-4 ">
      <Link to={ruta} className="flex gap-4  md:mx-16">
        <ArrowLeft />
        Volver a {title}
      </Link>
    </div>
  );
}

export default Volver;
