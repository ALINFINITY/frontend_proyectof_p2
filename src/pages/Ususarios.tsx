import { useEffect, useRef, useState } from "react";
import { Usuario } from "../types/types";
import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { UsuarioService } from "../services/userService";

export const Usuarioc: React.FC = () => {
  // Notificaciones
  const toast = useRef<Toast>(null);

  // Usuarios
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  // Modal de agregar/editar usuario
  const [usuario, setUsuario] = useState<Partial<Usuario>>({});
  const [visible, setVisible] = useState<boolean>(false);

  // Cargar usuarios desde la base de datos
  const loadUsuarios = async () => {
    try {
      const data = await UsuarioService.findAll();
      setUsuarios(data);
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al cargar los usuarios",
        life: 3000,
      });
    }
  };

  // Cargar usuarios al inicio
  useEffect(() => {
    loadUsuarios();
  }, []);

  // Guardar o actualizar usuario
  const saveUsuario = async () => {
    try {
      await UsuarioService.create(usuario);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Usuario guardado correctamente",
        life: 3000,
      });

      setVisible(false);
      loadUsuarios();
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al guardar el usuario",
        life: 3000,
      });
    }
  };

  // Eliminar usuario
  const deleteUsuario = async () => {
    toast.current?.show({
      severity: "info",
      summary: "Info",
      detail: "Aun en creación",
      life: 3000,
    });
  };

  // Abrir el modal para crear/editar usuario
  const modalVisible = () => {
    setUsuario({});
    setVisible(true);
  };

  // Cerrar el modal
  const modalOcultar = () => {
    setVisible(false);
  };

  const footerContent = (
    <div>
      <Button
        label="Guardar"
        className="p-button-success mybtn"
        icon="pi pi-save"
        onClick={saveUsuario}
      />
      <Button
        label="Cancelar"
        className="p-button-danger mybtn"
        icon="pi pi-times"
        onClick={modalOcultar}
      />
    </div>
  );

  return (
    <div>
      <div>
        <Button
          label="Nuevo usuario"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={modalVisible}
        ></Button>
        <Dialog
          header={usuario.id_usuario ? "Editar Usuario" : "Nuevo Usuario"}
          footer={footerContent}
          visible={visible}
          style={{ width: "50vw" }}
          modal
          onHide={modalOcultar}
        >
          <div className="p-field caja_p">
            <label htmlFor="nombre">Nombre Completo: </label>
            <InputText
              id="nombre"
              value={usuario.nombre_completo || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, nombre_completo: e.target.value })
              }
              required
              autoFocus
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="tel">Teléfono: </label>
            <InputText
              id="tel"
              value={usuario.telefono || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, telefono: e.target.value })
              }
              required
              autoFocus
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="email">Email: </label>
            <InputText
              id="email"
              value={usuario.email || ""}
              onChange={(e) =>
                setUsuario({ ...usuario, email: e.target.value })
              }
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="pass">Contraseña: </label>
            <InputText
              id="pas"
              value={usuario.password_hash || ""}
              type="password"
              onChange={(e) =>
                setUsuario({ ...usuario, password_hash: e.target.value })
              }
              required
              autoFocus
            />
          </div>
        </Dialog>
      </div>

      <Toast ref={toast} />
      <h1>Gestión de usuarios</h1>
      <DataTable value={usuarios} scrollable style={{ overflowX: "auto" }}>
        <Column field="id_usuario" header="ID" sortable></Column>
        <Column field="nombre_completo" header="Nombre" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="telefono" header="Teléfono" sortable></Column>
        <Column
          header="Acciones"
          body={(rowData: Usuario) => (
            <>
              <Button
                className="p-button-warning mybtn"
                icon="pi pi-pencil"
                onClick={() => {
                  setUsuario(rowData);
                  setVisible(true);
                }}
              />
              <Button
                className="p-button-danger mybtn"
                icon="pi pi-trash"
                onClick={() => deleteUsuario()}
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
};
