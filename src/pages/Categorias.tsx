import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Categoria } from "../types/types";
import { useEffect, useRef, useState } from "react";
import { CategoriaService } from "../services/categoriaService";

export const Categoriac: React.FC = () => {
  //Notificaciones
  const toast = useRef<Toast>(null);

  //categorias
  const [categorias, setcategorias] = useState<Categoria[]>([]);

  //Agregar categorias modal
  const [categoria, setcategoria] = useState<Partial<Categoria>>({});
  const [visible, setVisible] = useState<boolean>(false);

  //Cargar los categorias desde la base de datos
  const loadcategorias = async () => {
    try {
      const data = await CategoriaService.findAll();
      setcategorias(data);
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al cargar las categorías",
        life: 3000,
      });
    }
  };

  //Primera operación cargar categorias desde la bd
  useEffect(() => {
    loadcategorias();
  }, []);

  //Guardar Actualiza
  const savecategoria = async () => {
    try {
      await CategoriaService.create(categoria);
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Categoría guardada correctamente",
        life: 3000,
      });

      setVisible(false);
      loadcategorias();
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error el guardar la categoría",
        life: 3000,
      });
    }
  };

  //Modal
  const modal_visible = () => {
    setcategoria({});
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
        onClick={savecategoria}
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
          label="Nueva categoría"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={modal_visible}
        ></Button>
        <Dialog
          header={"Nueva categoria"}
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
              value={categoria.nombre || ""}
              onChange={(e) =>
                setcategoria({ ...categoria, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className="p-field caja_p">
            <label htmlFor="descripcion">Descripción:</label>
            <InputText
              id="descripcion"
              value={categoria.descripcion || ""}
              onChange={(e) =>
                setcategoria({ ...categoria, descripcion: e.target.value })
              }
            />
          </div>
        </Dialog>
      </div>

      <Toast ref={toast} />
      <h1>Gestión de Categorías</h1>
      <DataTable value={categorias} scrollable style={{ overflowX: "auto" }}>
        <Column field="id_categoria" header="ID" sortable></Column>
        <Column field="nombre" header="Nombre" sortable></Column>
        <Column field="descripcion" header="Descripción" sortable></Column>
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
          body={(rowData: Categoria) => (
            <>
              <Button
                className="p-button-warning mybtn"
                icon="pi pi-pencil"
                onClick={() => {
                  setcategoria(rowData);
                  setVisible(true);
                }}
              />
              <Button
                className="p-button-danger mybtn"
                icon="pi pi-trash"
                onClick={() => {
                  setcategoria(rowData);
                }}
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
};
