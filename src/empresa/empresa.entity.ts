import { Inventario } from 'src/inventario/inventario.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'empresas'})
export class Empresa {
  @PrimaryGeneratedColumn()
  id_empresa: number;

  @Column()
  nombre: string;

  @Column({ unique: true, length: 13 })
  ruc: string;

  @Column()
  direccion: string;

  @Column({ unique: true, length: 10 })
  telefono: string;

  @Column({ unique: true })
  email_contacto: string;

  @Column({ nullable: true })
  sector_industria: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @Column({ type: 'char', length: 1, default: 'A' })
  estado: string;

  //Relación con Usuario de uno a muchos
  @OneToMany(() => Usuario, (us) => us.empresa,{cascade: false}) 
  usuarios: Usuario[];
  //Relación con Inventario de uno a muchos 
  @OneToMany(() => Inventario, (inv) => inv.empresa,{cascade: false})
  inventarios: Inventario[];

}
