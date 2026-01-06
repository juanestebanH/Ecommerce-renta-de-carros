import { useState } from 'react';
import { Menu, X, Car, User, Phone } from 'lucide-react';
function HeaderCliente() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-100 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-16">
        <div className="container mx-auto ">
          <div className="flex h-16 items-center justify-between ">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">RentaCar</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 ">
              <a href="/" className="transition-colors hover:font-medium">
                Inicio
              </a>
              <a href="/carros" className="transition-colors hover:font-medium">
                Vehículos
              </a>
              <a
                href="/servicios"
                className="transition-colors hover:font-medium"
              >
                Servicios
              </a>
              <a
                href="/reservas"
                className="transition-colors hover:font-medium"
              >
                Reservas
              </a>
              <a
                href="/ubicaciones"
                className="transition-colors hover:font-medium"
              >
                Ubicaciones
              </a>
              <a
                href="/contacto"
                className="transition-colors hover:font-medium"
              >
                Contacto
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/login"
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium transition-colors hover:text-gray-800 hover:cursor-pointer hover:bg-gray-200 rounded-xl"
              >
                <User className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </a>
              <button className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gray-950 text-white rounded-xl hover:bg-primary/90 transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                +1 (555) 123-4567
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t bg-background">
              <nav className="flex flex-col space-y-4 p-4">
                <a href="/" className="transition-colors hover:font-medium">
                  Inicio
                </a>
                <a
                  href="/carros"
                  className="transition-colors hover:font-medium"
                >
                  Vehículos
                </a>
                <a
                  href="/servicios"
                  className="transition-colors hover:font-medium"
                >
                  Servicios
                </a>

                <a
                  href="/reservas"
                  className="transition-colors hover:font-medium"
                >
                  Reservas
                </a>
                <a
                  href="/ubicaciones"
                  className="transition-colors hover:font-medium"
                >
                  Ubicaciones
                </a>
                <a
                  href="/contacto"
                  className="transition-colors hover:font-medium"
                >
                  Contacto
                </a>

                <div className="pt-4 space-y-2">
                  <a
                    href="/login"
                    className="w-full flex items-center text-sm px-3 py-2 transition-colors hover:text-primary"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Iniciar Sesión
                  </a>
                  <button className="w-full flex items-center text-sm px-4 py-2 bg-gray-950 text-white rounded-md hover:bg-primary/90 transition-colors">
                    <Phone className="h-4 w-4 mr-2" />
                    +1 (555) 123-4567
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default HeaderCliente;
