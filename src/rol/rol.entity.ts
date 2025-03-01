import { Usuario } from "src/usuario/usuario.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'roles'})
export class Rol{

    @PrimaryGeneratedColumn()
    id_rol: number;
    
    @Column()
    nombre: string;

    @Column({nullable: true})
    descripcion: string;

    @ManyToMany(()=>Usuario, us=>  us.roles )
    @JoinTable({name: 'usuario_rol'})
    usuarios: Usuario[];
}