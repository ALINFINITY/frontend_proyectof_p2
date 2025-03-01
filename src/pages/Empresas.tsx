import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Empresa } from "../types/types";
import { useEffect, useRef, useState } from "react";
import { EmpresaService } from "../services/empresaService";
import { InventarioService } from "../services/inventarioService";

export const Empresac: React.FC = () => {
  //Notificaciones
  const toast = useRef<Toast>(null);

  //empresas
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  //Agregar empresas modal
  const [empresa, setempresa] = useState<Partial<Empresa>>({});
  const [visible, setVisible] = useState<boolean>(false);

  //Cargar los empresas desde la base de datos
  const loadempresas = async () => {
    try {
      const data = await EmpresaService.findAll();
      setEmpresas(data);
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al cargar las empresas",
        life: 3000,
      });
    }
  };

  //Primera operación cargar empresas desde la bd
  useEffect(() => {
    loadempresas();
  }, []);

  //Guardar Actualiza
  const saveempresa = async () => {
    if (
      !empresa.nombre ||
      !empresa.ruc ||
      !empresa.direccion ||
      !empresa.telefono ||
      !empresa.email_contacto ||
      !empresa.estado
    ) {
      toast.current?.show({
        severity: "error",
        summary: "Error de validación",
        detail: "Por favor, complete todos los campos requeridos.",
        life: 3000,
      });
      return;
    }

    try {
      if (empresa.id_empresa) {
        await EmpresaService.update(empresa.id_empresa, empresa);
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Empresa actualizada correctamente",
          life: 3000,
        });
      } else {
        await EmpresaService.create(empresa);
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Empresa guardada correctamente",
          life: 3000,
        });
      }

      setVisible(false);
      loadempresas();
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al guardar o actualizar la empresa",
        life: 3000,
      });
    }
  };
  //Eliminar

  const deleteempresa = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar esta empresa?"
    );
    if (confirmDelete) {
      try {
        await EmpresaService.remove(id);

        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Empresa eliminada correctamente",
          life: 3000,
        });

        loadempresas();
      } catch (e) {
        toast.current?.show({
          severity: "error",
          summary: "Error Message",
          detail: "Error al eliminar la empresa",
          life: 3000,
        });
      }
    }
  };

  //Crear inventario a la empresa
  const handleCrearInventario = async (empresaId: number) => {
    try {
      await InventarioService.create(empresaId);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Inventario creado correctamente",
        life: 3000,
      });
      loadempresas();
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al crear el inventario",
        life: 3000,
      });
    }
  };

  //Modal
  const modal_visible = () => {
    setempresa({});
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
        onClick={saveempresa}
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
          label="Nueva empresa"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={modal_visible}
        ></Button>
        <Dialog
          header={"Nueva empresa"}
          footer={footerContent}
          visible={visible}
          style={{ width: "50vw" }}
          modal
          onHide={modal_ocultar}
        >
          <div className="p-field caja_p">
            <label htmlFor="nombre">Nombre:</label>
            <InputText
              id="nombre"
              value={empresa.nombre}
              onChange={(e) =>
                setempresa({ ...empresa, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className="p-field caja_p">
            <label htmlFor="ruc">RUC:</label>
            <InputText
              id="ruc"
              value={empresa.ruc}
              onChange={(e) => setempresa({ ...empresa, ruc: e.target.value })}
              required
            />
          </div>

          <div className="p-field caja_p">
            <label htmlFor="direccion">Dirección:</label>
            <InputText
              id="direccion"
              value={empresa.direccion}
              onChange={(e) =>
                setempresa({ ...empresa, direccion: e.target.value })
              }
            />
          </div>

          <div className="p-field caja_p">
            <label htmlFor="telefono">Teléfono:</label>
            <InputText
              id="telefono"
              value={empresa.telefono}
              onChange={(e) =>
                setempresa({ ...empresa, telefono: e.target.value })
              }
            />
          </div>

          <div className="p-field caja_p">
            <label htmlFor="email_contacto">Email de Contacto:</label>
            <InputText
              id="email_contacto"
              type="email"
              value={empresa.email_contacto}
              onChange={(e) =>
                setempresa({ ...empresa, email_contacto: e.target.value })
              }
            />
          </div>

          <div className="p-field caja_p">
            <label htmlFor="sector_industria">Sector Industria:</label>
            <InputText
              id="sector_industria"
              value={empresa.sector_industria || ""}
              onChange={(e) =>
                setempresa({ ...empresa, sector_industria: e.target.value })
              }
            />
          </div>

          <div className="p-field caja_p">
            <label htmlFor="estado">Estado:</label>
            <InputText
              id="estado"
              value={empresa.estado}
              onChange={(e) =>
                setempresa({ ...empresa, estado: e.target.value })
              }
              required
            />
          </div>
        </Dialog>
      </div>

      <Toast ref={toast} />
      <h1>Gestión de Empresas</h1>
      <DataTable value={empresas} scrollable style={{ overflowX: "auto" }}>
        <Column field="id_empresa" header="ID" sortable></Column>
        <Column field="nombre" header="Nombre de la empresa" sortable></Column>
        <Column field="ruc" header="Ruc" sortable></Column>
        <Column field="direccion" header="Dirección" sortable></Column>
        <Column field="telefono" header="Teléfono" sortable></Column>
        <Column field="email_contacto" header="Email" sortable></Column>
        <Column
          field="sector_industria"
          header="Sector Industrial"
          sortable
        ></Column>
        <Column field="estado" header="Estado Empresa" sortable></Column>
        <Column
          header="Número de Inventarios"
          body={(rowData: Empresa) => rowData.inventarios.length}
        />
        <Column
          field="fecha_creacion"
          header="Fecha Creación"
          sortable
          body={(rowData) =>
            rowData.fecha_creacion
              ? new Date(rowData.fecha_creacion).toLocaleDateString()
              : ""
          }
        />
        <Column
          header="Acciones"
          body={(rowData: Empresa) => (
            <>
              <Button
                className="p-button-warning mybtn"
                icon="pi pi-pencil"
                onClick={() => {
                  setempresa(rowData);
                  setVisible(true);
                }}
              />
              <Button
                className="p-button-danger mybtn"
                icon="pi pi-trash"
                onClick={() => deleteempresa(rowData.id_empresa)}
              />
              <Button
                className="p-button-info mybtn"
                label="Crear Inventario"
                icon="pi pi-box"
                onClick={() => handleCrearInventario(rowData.id_empresa)}
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
};
