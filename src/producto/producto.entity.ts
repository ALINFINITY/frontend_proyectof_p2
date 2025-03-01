import { Categoria } from "src/categoria/categoria.entity";
import { Inventario } from "src/inventario/inventario.entity";
import { Movimiento } from "src/movimiento_inventario/movimiento_inventario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'productos'})
export class Producto{

    @PrimaryGeneratedColumn()
    id_producto: number;

    @Column()
    codigo_barra: string;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({type:'double precision'})
    precio_compra: number;

    @Column({type:'double precision'})
    precio_venta: number;

    @Column({type:'integer'})
    stock_max: number;  

    @Column({type:'integer'})
    stock_min: number;

    @CreateDateColumn()
    fecha_creacion: Date;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    // Relacion de muchos a uno con Inventario
    @ManyToOne(()=>Inventario, (inv)=>inv.productos,{onDelete:'RESTRICT'})
    inventario: Inventario;

    //Relacion de muchos a uno con Categoria
    @ManyToOne(()=>Categoria, (cat)=>cat.productos,{onDelete:'RESTRICT'})
    categoria: Categoria;

    //Relacion de uno a muchos con Movimiento Inventario
    @OneToMany(()=>Movimiento, (mov)=>mov.producto,{cascade:false})
    movimientos: Movimiento[];
}