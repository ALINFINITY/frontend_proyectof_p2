export interface Rol {
    id_rol: number;
    nombre: string;
    descripcion?: string | null;
    usuarios: Usuario[];
  }

  export interface Usuario {
    id_usuario: number;
    nombre_completo: string;
    email: string;
    telefono: string;
    estado: string;
    password_hash: string;
    fecha_creacion: Date;
    ultima_conexion: Date;
    roles: Rol[];
    empresa: Empresa;
    movimientos: Movimiento[];
    auth: Auth;
  }

  export interface Empresa {
    id_empresa: number;
    nombre: string;
    ruc: string;
    direccion: string;
    telefono: string;
    email_contacto: string;
    sector_industria?: string | null;
    fecha_creacion: Date;
    estado: string;
    usuarios: Usuario[];
    inventarios: Inventario[];
  }

  export interface Auth {
    id_auth: number;
    email: string;
    password_hash: string;
    ultimo_inicio: Date;
    usuario: Usuario;
  }

  export interface Categoria {
    id_categoria: number;
    nombre: string;
    descripcion?: string | null;
    fecha_creacion: Date;
    productos: Producto[];
  }

  export interface Inventario {
    id_inventario: number;
    fecha_actualizacion: Date;
    empresa: Empresa;
    productos: Producto[];
  }

  export interface Producto {
    id_producto: number;
    codigo_barra: string;
    nombre: string;
    descripcion: string;
    precio_compra: number;
    precio_venta: number;
    stock_max: number;
    stock_min: number;
    fecha_creacion: Date;
    fecha_actualizacion: Date;
    inventario: Inventario;
    categoria: Categoria;
    movimientos: Movimiento[];
  }

  export interface Movimiento {
    id_movimiento: number;
    tipo_movimiento: string;
    cantidad: number;
    fecha_movimiento: Date;
    motivo: string;
    costo_unitario: number;
    ubicacion: string;
    producto: Producto;
    usuario: Usuario;
  }