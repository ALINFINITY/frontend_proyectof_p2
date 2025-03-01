import { Producto } from "src/producto/producto.entity";
import { Usuario } from "src/usuario/usuario.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'movimientos'})
export class Movimiento{

    @PrimaryGeneratedColumn()
    id_movimiento: number;

    @Column()
    tipo_movimiento: string;

    @Column({type:'integer'})
    cantidad: number;

    @CreateDateColumn()
    fecha_movimiento: Date;
    
    @Column()
    motivo: string;

    @Column({type:'double precision'})
    costo_unitario: number;

    @Column()
    ubicacion: string;


    //Relacion de muchos a uno con Producto
    @ManyToOne(()=>Producto, (prod)=>prod.movimientos,{onDelete:'RESTRICT'})
    producto: Producto;

    //Relacion de muchos a uno con Usuario
    @ManyToOne(()=>Usuario, (usu)=>usu.movimientos,{onDelete:'RESTRICT'})
    usuario: Usuario;

}