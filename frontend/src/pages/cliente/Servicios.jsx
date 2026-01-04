import garaje from '../../assets/garaje.jpg';
import seguro from '../../assets/seguro.jpg';
import atencio from '../../assets/cliente.jpg';
import ubicaciones from '../../assets/map.jpg';
import pagos from '../../assets/pagos.jpg';
import appweb from '../../assets/appweb.jpg';
import { useNavigate } from 'react-router-dom';

function Servicios() {
  const navigate = useNavigate();
  const services = [
    {
      title: 'Renta de Vehículos',
      description:
        'Amplia selección de autos, camionetas y SUVs para todas tus necesidades de viaje.',
      image: garaje,
    },
    {
      title: 'Seguro Completo',
      description:
        'Protección total contra daños, robo y responsabilidad civil en cada renta.',
      image: seguro,
    },
    {
      title: 'Atención 24/7',
      description:
        'Servicio de asistencia en carretera y soporte al cliente disponible todo el día.',
      image: atencio,
    },
    {
      title: 'Múltiples Ubicaciones',
      description: 'Más de 3 puntos de recogida y entrega en todo el país.',
      image: ubicaciones,
    },
    {
      title: 'Pago Flexible',
      description:
        'Aceptamos tarjetas de crédito, débito y pagos digitales para mayor comodidad.',
      image: pagos,
    },
    {
      title: 'Plataforma Digital',
      description:
        'Reserva, gestiona y contacta soporte desde nuestra app móvil o sitio web.',
      image: appweb,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            En RentaCar, ofrecemos una gama completa de servicios diseñados para
            hacer tu experiencia de alquiler de vehículos lo más sencilla y
            placentera posible. Desde la selección de tu auto ideal hasta el
            soporte continuo, estamos aquí para ti.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            ¿Listo para comenzar tu aventura? Reserva tu vehículo hoy mismo.
          </p>
          <button
            onClick={() => navigate('/carros')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reservar Ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default Servicios;
