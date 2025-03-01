import { Auth } from 'src/auth/auth.entity';
import { Empresa } from 'src/empresa/empresa.entity';
import { Movimiento } from 'src/movimiento_inventario/movimiento_inventario.entity';
import { Rol } from 'src/rol/rol.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  nombre_completo: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 10 })
  telefono: string;

  @Column({ type: 'char', length: 1, default: 'A' })
  estado: string;

  @Column()
  password_hash: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  ultima_conexion: Date;

  //Relación con Rol de muchos a muchos
  @ManyToMany(() => Rol, (rol) => rol.usuarios)
  roles: Rol[];

  //Relación con Empresa de uno a muchos
  @ManyToOne(() => Empresa, (emp) => emp.usuarios, { onDelete: 'CASCADE' })
  empresa: Empresa;

  //Relación uno a muchos con Movimiento
  @OneToMany(() => Movimiento, (mov) => mov.usuario, { cascade: false })
  movimientos: Movimiento[];

  //Relación uno a uno con Auth
  @OneToOne(() => Auth,(auth)=>auth.usuario)
  @JoinColumn({ name: 'id_auth' })
  auth: Auth;
}
