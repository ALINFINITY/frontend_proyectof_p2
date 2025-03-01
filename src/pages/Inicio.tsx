import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";  // Cambié history por useNavigate
import { Divider } from "primereact/divider";

export const Inicio: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<string>("");
  const navigate = useNavigate();  // Usamos el hook useNavigate para navegación

  const showMoreInfo = (info: string) => {
    setDialogContent(info);
    setShowDialog(true);
  };

  const handleGoToEmpresas = () => {
    navigate("/empresas");  // Usamos navigate para cambiar de ruta
  };

  const handleGoToProductos = () => {
    navigate("/productos");
  };



  return (
    <div className="p-grid p-dir-col p-align-center">
      <div className="p-col-12">
        <h2 className="text-center">Gestión Empresarial</h2>
        <Divider />
      </div>

      <div className="p-grid p-nogutter p-mt-4">
        <div className="p-col-12 p-md-6 p-lg-3">
          <Card title="Gestión de Productos" className="p-shadow-2">
            <p>Administra los productos de tu empresa de forma eficiente.</p>
            <Button label="Ver Productos" onClick={handleGoToProductos} className="p-button-outlined p-button-rounded" />
          </Card>
        </div>

        <div className="p-col-12 p-md-6 p-lg-3">
          <Card title="Gestión de Empresas" className="p-shadow-2">
            <p>Crea y administra múltiples empresas con facilidad.</p>
            <Button label="Ver Empresas" onClick={handleGoToEmpresas} className="p-button-outlined p-button-rounded" />
          </Card>
        </div>

        <div className="p-col-12 p-md-6 p-lg-3">
          <Card title="Estadísticas de Ventas" className="p-shadow-2">
            <p>Visualiza el rendimiento de tus productos en tiempo real con gráficos interactivos.</p>
            <Button label="Ver Estadísticas" onClick={() => showMoreInfo("Todos nuestros clientes satisfechos")} className="p-button-outlined p-button-rounded" />
          </Card>
        </div>
      </div>

      <div className="p-grid p-nogutter p-mt-4">
        <div className="p-col-12 p-md-6 p-lg-3">
          <Card title="Gestión de Empleados" className="p-shadow-2">
            <p>Agrega, edita y elimina empleados que forman parte de tu empresa.</p>
            <Button label="Ver Empleados" onClick={() => showMoreInfo("Asignación de roles y gestión de usuarios")} className="p-button-outlined p-button-rounded" />
          </Card>
        </div>

        <div className="p-col-12 p-md-6 p-lg-3">
          <Card title="Gestión de Roles" className="p-shadow-2">
            <p>Asigna roles a los usuarios de la empresa para gestionar privilegios.</p>
            <Button label="Ver Roles" onClick={() => showMoreInfo("Roles como Administrador, Gerente, etc.")} className="p-button-outlined p-button-rounded" />
          </Card>
        </div>

        <div className="p-col-12 p-md-6 p-lg-3">
          <Card title="Proveedores" className="p-shadow-2">
            <p>Gestiona tus proveedores y mantén un registro actualizado.</p>
            <Button label="Ver Proveedores" onClick={() => showMoreInfo("Todos sus proveedores a un solo click")} className="p-button-outlined p-button-rounded" />
          </Card>
        </div>

        <div className="p-col-12 p-md-6 p-lg-3">
          <Card title="Alertas y Notificaciones" className="p-shadow-2">
            <p>Recibe notificaciones sobre cambios importantes en los productos y el inventario.</p>
            <Button label="Ver Notificaciones" onClick={() => showMoreInfo("Notificaciones llamativas y efectivas")} className="p-button-outlined p-button-rounded" />
          </Card>
        </div>
      </div>

      <Dialog header="Más Información" visible={showDialog} onHide={() => setShowDialog(false)} maximizable>
        <p>{dialogContent}</p>
      </Dialog>
    </div>
  );
};
