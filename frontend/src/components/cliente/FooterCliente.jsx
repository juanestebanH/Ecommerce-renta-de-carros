import {
  Car,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
} from 'lucide-react';

function FooterCliente() {
  return (
    <footer className="bg-slate-900 text-white  px-16">
      <div className="px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:place-items-center">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-400" />
              <span className="text-xl">RentaCar</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Tu compañía de confianza para renta de vehículos. Más de 15 años
              ofreciendo el mejor servicio y los mejores precios del mercado.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </button>
              <button className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white">Enlaces Rápidos</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#autos-destacados"
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                Nuestra Flota
              </a>
              <a
                href="#ubicaciones"
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                Ubicaciones
              </a>
              <a
                href="#servicios"
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                Servicios
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300 text-sm">
                  info@rentacar.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-slate-300 text-sm">cali - Colombia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300 text-sm">24/7 Disponible</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-400 text-sm">
            © 2025 RentaCar. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <a
              href="#beneficios"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Política de Privacidad
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Términos de Servicio
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default FooterCliente;
