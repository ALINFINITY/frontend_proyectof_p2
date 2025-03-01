import { Empresa } from "src/empresa/empresa.entity";
import { Producto } from "src/producto/producto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name:'inventarios'})
export class Inventario{

    @PrimaryGeneratedColumn()
    id_inventario: number;

    @UpdateDateColumn()
    fecha_actualizacion: Date;

    //Relaciones de muchos a uno con Empresa
    @ManyToOne(()=>Empresa, (emp)=>emp.inventarios,{onDelete:'RESTRICT'})
    empresa: Empresa;

    //Relacion de uno muchos con Producto
    @OneToMany(()=>Producto, (prod)=>prod.inventario,{cascade:true})
    productos: Producto[];

}