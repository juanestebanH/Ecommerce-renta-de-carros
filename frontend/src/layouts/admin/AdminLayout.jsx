import { Outlet } from "react-router-dom";
import SidebarMenu from "../../components/admin/SideMenu";

function AdminLayout() {
  return (
    <div className="flex h-screen ">
      {/* Aquí puedes incluir el componente del menú lateral */}
      <SidebarMenu />
      <div className="flex-1 px-6 py-14 md:py-4 overflow-auto bg-[#FAFAFA]">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
