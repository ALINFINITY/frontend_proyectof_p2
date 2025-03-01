import { Producto } from "src/producto/producto.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'categorias'})
export class Categoria {

    @PrimaryGeneratedColumn()
    id_categoria: number;

    @Column()
    nombre: string;

    @Column({nullable: true})
    descripcion?: string;

    @CreateDateColumn()
    fecha_creacion: Date;

    //Relacion de uno a muchos con Producto
    @OneToMany(()=>Producto,(prod)=>prod.categoria,{cascade:false})
    productos: Producto[];
    
}