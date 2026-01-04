import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Importar imágenes directamente (ESM)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const carritoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car-icon lucide-car"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`;
const carritoIcon = L.divIcon({
  html: carritoSvg,
  className: '', // sin estilos extra de Leaflet
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
// Arreglar iconos por defecto
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const cities = [
  { name: 'Cali', position: [3.4516, -76.532] },
  { name: 'Buga', position: [3.9009, -76.2978] },
  { name: 'Palmira', position: [3.5394, -76.3036] },
];

function Ubicaciones() {
  return (
    <section className="md:px-18 px-4 py-8 mb-15 " id="ubicaciones">
      <h1 className="text-lg text-center font-medium  md:text-3xl mb-4 mt-8 text-shadow">
        Ubicaciones de RentaCar
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Encontramos tu vehículo en las mejores ubicaciones de la ciudad.
      </p>
      <MapContainer
        center={[3.4516, -76.532]}
        zoom={9}
        className="h-[550px] w-full rounded-2xl shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city, idx) => (
          <Marker key={idx} position={city.position} icon={carritoIcon}>
            <Popup>{city.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
}

export default Ubicaciones;
