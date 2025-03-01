import { Injectable } from "@nestjs/common";
import { Rol } from "./rol.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>
    ){}

    findAll(): Promise<Rol[]> {
        return this.rolRepository.find();
    }

    findById(id: number): Promise<Rol|null>{
        return this.rolRepository.findOne({where: {id_rol: id}});
    }

    create(rol: Partial<Rol>): Promise<Rol> {
        const rolEntity = this.rolRepository.create(rol);
        return this.rolRepository.save(rolEntity);
    }

    async update(id: number, rol: Partial<Rol>): Promise<Rol|null> {
        await this.rolRepository.update({id_rol: id}, rol);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.rolRepository.delete({id_rol: id});
    }

}