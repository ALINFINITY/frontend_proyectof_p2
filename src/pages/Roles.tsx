import { useEffect, useRef, useState } from "react";
import { Rol } from "../types/types";
import { Toast } from "primereact/toast";
import { RolService } from "../services/rolService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export const Roles: React.FC = () => {
  //Notificaciones
  const toast = useRef<Toast>(null);

  //Roles
  const [roles, setRoles] = useState<Rol[]>([]);

  //Agregar roles modal
  const [rol, setRol] = useState<Partial<Rol>>({});
  const [visible, setVisible] = useState<boolean>(false);

  //Cargar los roles desde la base de datos
  const loadroles = async () => {
    try {
      const data = await RolService.findAll();
      setRoles(data);
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al cargar los roles",
        life: 3000,
      });
    }
  };

  //Primera operación cargar roles desde la bd
  useEffect(() => {
    loadroles();
  }, []);

  //Guardar Actualiza
  const saveRol = async () => {
    if (!rol.nombre) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "El campo nombre es obligatorio",
        life: 3000,
      });
      return;
    }
    try {
      if (rol.id_rol) {
        await RolService.update(rol.id_rol, rol);
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Rol actualizado correctamente",
          life: 3000,
        });
      } else {
        await RolService.create(rol);
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Rol guardado correctamente",
          life: 3000,
        });
      }

      setVisible(false);
      loadroles();
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error el guardar el rol",
        life: 3000,
      });
    }
  };

  //Eliminar
  const deleterol = async () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Aun no definida esta funcion",
      life: 3000,
    });
  };

  //Modal
  const modal_visible = () => {
    setRol({});
    setVisible(true);
  };
  const modal_ocultar = () => {
    setVisible(false);
  };

  const footerContent = (
    <div>
      <Button
        label="Guardar"
        className="p-button-success mybtn"
        icon="pi pi-save"
        onClick={saveRol}
      />
      <Button
        label="Cancelar"
        className="p-button-danger mybtn"
        icon="pi pi-times"
        onClick={modal_ocultar}
      />
    </div>
  );

  return (
    <div>
      <div>
        <Button
          label="Nuevo rol"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={modal_visible}
        ></Button>
        <Dialog
          header={rol.id_rol ? "Editar Rol" : "Nuevo Rol"}
          footer={footerContent}
          visible={visible}
          style={{ width: "50vw" }}
          modal
          onHide={modal_ocultar}
        >
          <div className="p-field caja_p">
            <label htmlFor="nombre">Rol: </label>
            <InputText
              id="nombre"
              value={rol.nombre || ""}
              onChange={(e) => setRol({ ...rol, nombre: e.target.value })}
              required
              autoFocus
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="descripcion">Descripción: </label>
            <InputText
              id="descripcion"
              value={rol.descripcion || ""}
              onChange={(e) => setRol({ ...rol, descripcion: e.target.value })}
            />
          </div>
        </Dialog>
      </div>

      <Toast ref={toast} />
      <h1>Gestión de roles</h1>
      <DataTable value={roles} scrollable style={{ overflowX: "auto" }}>
        <Column field="id_rol" header="ID" sortable></Column>
        <Column field="nombre" header="Tipo rol" sortable></Column>
        <Column field="descripcion" header="Descripción" sortable></Column>
        <Column
          header="Acciones"
          body={(rowData: Rol) => (
            <>
              <Button
                className="p-button-warning mybtn"
                icon="pi pi-pencil"
                onClick={() => {
                  setRol(rowData);
                  setVisible(true);
                }}
              />
              <Button
                className="p-button-danger mybtn"
                icon="pi pi-trash"
                onClick={() => {
                  setRol(rowData);
                  deleterol();
                }}
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
};
