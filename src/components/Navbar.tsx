import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: "Inicio",
      icon: "pi pi-home",
      command: () => navigate("/"),
    },
    {
      label: "Empresas",
      icon: "pi pi-building",
      command: () => navigate("/empresas"),
    },
    {
      label: "Categorías",
      icon: "pi pi-objects-column",
      command: () => navigate("/categorias"),
    },
    {
      label: "Productos",
      icon: "pi pi-tag",
      command: () => navigate("/productos"),
    },
    {
      label: "Roles",
      icon: "pi pi-user-plus",
      command: () => navigate("/roles"),
    },
    {
      label: "Usuarios",
      icon: "pi pi-user",
      command: () => navigate("/usuarios"),
    },
  ];
  return (
    <>
      <div className="card">
        <Menubar model={items} />
      </div>
    </>
  );
};
