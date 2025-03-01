import { useEffect, useRef, useState } from "react";
import { Inventario, Producto } from "../types/types";
import { Toast } from "primereact/toast";
import { ProductoService } from "../services/productoService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { CategoriaService } from "../services/categoriaService";
import { Categoria } from "../types/types";
import { InputNumber } from "primereact/inputnumber";
import { InventarioService } from "../services/inventarioService";
import { Dropdown } from "primereact/dropdown";

export const Productosc: React.FC = () => {
  //Notificaciones
  const toast = useRef<Toast>(null);

  //Productos
  const [productos, setProductos] = useState<Producto[]>([]);

  //Agregar/Editar producto modal
  const [producto, setProducto] = useState<Partial<Producto>>({});
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [inventarios, setInventarios] = useState<any[]>([]);
  const [visible, setVisible] = useState<boolean>(false);

  //Cargar los productos desde la base de datos
  const loadProductos = async () => {
    try {
      const data = await ProductoService.findAll();
      setProductos(data);
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al cargar los productos",
        life: 3000,
      });
    }
  };

  //Cargar las categorías para el dropdown
  const loadCategorias = async () => {
    try {
      const data = await CategoriaService.findAll();
      setCategorias(data);
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al cargar las categorías",
        life: 3000,
      });
    }
  };

  const loadInventarios = async () => {
    try {
      const data = await InventarioService.findAll(); // Cambia esto según tu servicio
      setInventarios(data);
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al cargar los inventarios",
        life: 3000,
      });
    }
  };

  //Primera operación cargar productos y categorías desde la bd
  useEffect(() => {
    loadProductos();
    loadCategorias();
    loadInventarios(); // Carga de inventarios
  }, []);

  //Guardar Actualizar
  const saveProducto = async () => {
    if (
      !producto.nombre ||
      !producto.precio_compra ||
      !producto.precio_venta ||
      !producto.categoria ||
      !producto.inventario
    ) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail:
          "Los campos nombre, precio de compra, precio de venta, categoría e inventario son obligatorios",
        life: 3000,
      });
      return;
    }
    try {
      if (producto.id_producto) {
        await ProductoService.update(producto.id_producto, producto);
        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto actualizado correctamente",
          life: 3000,
        });
      } else {
        const createdProducto = await ProductoService.create(producto);

        await ProductoService.asignarCaracteristicas(
          createdProducto.id_producto,
          producto.categoria.id_categoria,
          producto.inventario.id_inventario
        );

        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto guardado y asignado correctamente",
          life: 3000,
        });
      }

      setVisible(false);
      loadProductos();
      loadInventarios();
    } catch (e) {
      toast.current?.show({
        severity: "error",
        summary: "Error Message",
        detail: "Error al guardar o asignar el producto",
        life: 3000,
      });
    }
  };

  //Eliminar producto
  const deleteproducto = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este producto?"
    );
    if (confirmDelete) {
      try {
        await ProductoService.remove(id);

        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto eliminado correctamente",
          life: 3000,
        });

        loadProductos();
        loadInventarios();
      } catch (e) {
        toast.current?.show({
          severity: "error",
          summary: "Error Message",
          detail: "Error al eliminar el producto",
          life: 3000,
        });
      }
    }
  };

  //Eliminar Inventario
  const deleteinventario = async (id: number, prl: number) => {
    if (prl !== 0) {
      toast.current?.show({
        severity: "error",
        summary: "Inventario lleno",
        detail: "El inventario no se puede eliminar",
        life: 3000,
      });
      return;
    }
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este inventario?"
    );
    if (confirmDelete) {
      try {
        await InventarioService.remove(id);

        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Inventario eliminado correctamente",
          life: 3000,
        });

        loadInventarios();
      } catch (e) {
        toast.current?.show({
          severity: "error",
          summary: "Error Message",
          detail: "Error al eliminar el inventario",
          life: 3000,
        });
      }
    }
  };

  //Modal visible
  const modalVisible = () => {
    setProducto({});
    setVisible(true);
  };

  //Modal ocultar
  const modalOcultar = () => {
    setVisible(false);
  };

  const footerContent = (
    <div>
      <Button
        label="Guardar"
        className="p-button-success mybtn"
        icon="pi pi-save"
        onClick={saveProducto}
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
          label="Nuevo producto"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={modalVisible}
        ></Button>
        <Dialog
          header={producto.id_producto ? "Editar Producto" : "Nuevo Producto"}
          footer={footerContent}
          visible={visible}
          style={{ width: "50vw" }}
          modal
          onHide={modalOcultar}
        >
          <div className="p-field caja_p">
            <label htmlFor="nombre">Nombre: </label>
            <InputText
              id="nombre"
              value={producto.nombre || ""}
              onChange={(e) =>
                setProducto({ ...producto, nombre: e.target.value })
              }
              required
              autoFocus
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="codigo_b">Código de barras: </label>
            <InputText
              id="codigo_b"
              value={producto.codigo_barra || ""}
              onChange={(e) =>
                setProducto({ ...producto, codigo_barra: e.target.value })
              }
              required
              autoFocus
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="descripcion">Descripción: </label>
            <InputText
              id="descripcion"
              value={producto.descripcion || ""}
              onChange={(e) =>
                setProducto({ ...producto, descripcion: e.target.value })
              }
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="precio_compra">Precio de Compra: </label>
            <InputNumber
              id="precio_compra"
              value={producto.precio_compra}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  precio_compra: e.value as number,
                })
              }
              required
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="precio_venta">Precio de Venta: </label>
            <InputNumber
              id="precio_venta"
              value={producto.precio_venta}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  precio_venta: e.value as number,
                })
              }
              required
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="stok_mx">Stock máximo: </label>
            <InputNumber
              id="stok_mx"
              value={producto.stock_max}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  stock_max:
                    e.value !== null ? parseInt(e.value.toString()) : 1,
                })
              }
              required
            />
          </div>
          <div className="p-field caja_p">
            <label htmlFor="stock_m">Stock mínimo: </label>
            <InputNumber
              id="stock_m"
              value={producto.stock_min}
              step={1}
              onChange={(e) =>
                setProducto({
                  ...producto,
                  stock_min:
                    e.value !== null ? parseInt(e.value.toString()) : 1,
                })
              }
              required
            />
          </div>
          <Dropdown
            id="categoria"
            value={producto.categoria}
            options={categorias}
            optionLabel="nombre"
            onChange={(e) => setProducto({ ...producto, categoria: e.value })}
            placeholder="Seleccione una categoría"
          />
          <Dropdown
            id="inventario"
            value={producto.inventario}
            options={inventarios}
            optionLabel="id_inventario" // Muestra el id del inventario
            onChange={
              (e) => setProducto({ ...producto, inventario: e.value }) // Guarda el id seleccionado
            }
            placeholder="Seleccione un inventario"
          />
        </Dialog>
      </div>

      <Toast ref={toast} />
      <h1>Gestión de Productos</h1>
      <DataTable value={productos} scrollable style={{ overflowX: "auto" }}>
        <Column field="id_producto" header="ID" sortable></Column>
        <Column field="codigo_barra" header="Codigo de Barra" sortable></Column>
        <Column field="nombre" header="Nombre" sortable></Column>
        <Column field="descripcion" header="Descripción" sortable></Column>
        <Column
          field="precio_compra"
          header="Precio de Compra"
          sortable
        ></Column>
        <Column field="precio_venta" header="Precio de Venta" sortable></Column>
        <Column field="categoria.nombre" header="Categoría" sortable></Column>
        <Column field="inventario.id_inventario" header="ID Inventario" sortable></Column>
        <Column field="stock_max" header="Stock máximo" sortable></Column>
        <Column field="stock_min" header="Stock mínimo" sortable></Column>
        <Column
          header="Acciones"
          body={(rowData: Producto) => (
            <>
              <Button
                className="p-button-warning mybtn"
                icon="pi pi-pencil"
                onClick={() => {
                  setProducto(rowData);
                  setVisible(true);
                }}
              />
              <Button
                className="p-button-danger mybtn"
                icon="pi pi-trash"
                onClick={() => {
                  deleteproducto(rowData.id_producto);
                }}
              />
            </>
          )}
        />
      </DataTable>

      <h1>Inventarios</h1>
      <DataTable value={inventarios} scrollable style={{ overflowX: "auto" }}>
        <Column field="id_inventario" header="ID Inventario" sortable></Column>
        <Column field="empresa.nombre" header="Empresa Dueña" sortable></Column>
        <Column
          header="Productos"
          body={(rowData) => (
            <ul>
              {rowData.productos.map((producto: Producto) => (
                <li key={producto.id_producto}>{producto.nombre}</li>
              ))}
            </ul>
          )}
        ></Column>
        <Column
          header="Número de Productos"
          body={(rowData) => rowData.productos.length}
        ></Column>
        <Column
          header="Acciones"
          body={(rowData: Inventario) => (
            <>
              <Button
                className="p-button-danger mybtn"
                icon="pi pi-trash"
                onClick={() => {
                  deleteinventario(
                    rowData.id_inventario,
                    rowData.productos.length
                  );
                }}
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
};
