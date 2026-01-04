import { useState, useEffect, useRef } from 'react';
import { helpHttp } from '../../helpers/helperHttp';
import TopVehiculos from '../../components/admin/TopVehiculos';
import TopClientes from '../../components/admin/TopClientes';
import TopCategorias from '../../components/admin/TopCategorias';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';

function Reportes() {
  const [topVehiculos, setVehiculos] = useState([]);
  const [topClientes, setClientes] = useState([]);
  const [topCategorias, setCategorias] = useState([]);
  const reportRef = useRef();
  const navigate = useNavigate();

  const fetchReportes = async () => {
    try {
      const api = helpHttp();
      const res = await api.get('admin/reportes');
      if (!res.err) {
        setVehiculos(res.topCarros);
        setClientes(res.topClientes);
        setCategorias(res.topcategorias);
      }
    } catch (error) {}
  };

  const generatePDF = () => {
    const canvases = reportRef.current.querySelectorAll('canvas');
    if (canvases.length === 0) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 180; // A bit less than 210 for margins
    const pageHeight = 297;
    let yPosition = 20; // Start position

    canvases.forEach((canvas, index) => {
      const imgData = canvas.toDataURL('image/png');
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (yPosition + imgHeight > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.addImage(imgData, 'PNG', 15, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + 10; // Add some space
    });

    pdf.save('reporte.pdf');
  };

  useEffect(() => {
    fetchReportes();
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
      navigate('/admin/login');
    }
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-medium">Gestión de Reportes</h1>
      <p className="mt-2 text-[#6B7280]">
        reportes de las actividades y métricas del sistema
      </p>

      <button
        onClick={generatePDF}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Generar Reporte PDF
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TopVehiculos listado={topVehiculos} />
        <TopClientes listado={topClientes} />
      </div>

      <div ref={reportRef}>
        <TopCategorias listado={topCategorias} />
      </div>
    </div>
  );
}

export default Reportes;
