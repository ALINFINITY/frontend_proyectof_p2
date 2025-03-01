import { Usuario } from 'src/usuario/usuario.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'auth' })
export class Auth {
  @PrimaryGeneratedColumn()
  id_auth: number;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @UpdateDateColumn()
  ultimo_inicio: Date;

  //Relación uno a uno con usuario
  @OneToOne(() => Usuario, (us) => us.auth)
  usuario: Usuario;
}
