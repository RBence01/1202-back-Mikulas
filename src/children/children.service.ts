import { Injectable } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private readonly db: PrismaService) {}
  create(createChildDto: CreateChildDto) {
    return this.db.child.create({data: createChildDto});
  }

  findAll() {
    return this.db.child.findMany({include: {toy: true}});
  }

  findOne(id: number) {
    return this.db.child.findUnique({where: {id}, include: {toy: true}});
  }

  async update(id: number, updateChildDto: UpdateChildDto) {
    try {
      if (!updateChildDto.isGood) await this.removeToy(id);
      return await this.db.child.update({where: {id}, data: updateChildDto, include: {toy: true}});
    } catch {
      return undefined;
    }
  }

  async remove(id: number) {
    try {
      return await this.db.child.delete({where: {id}});
    } catch {
      return undefined;
    }
  }

  async addToy(id: number, toyId: number) {
    try {
      const toy = this.db.toy.findUniqueOrThrow({where: {id: toyId}});
      const child = this.db.child.findUniqueOrThrow({where: {id}});
      if (!(await child).isGood) return -1;
      await toy;
      return this.db.child.update({where: {id}, data: {toy: {connect: {id: toyId}}}, include: {toy: true}});
    } catch {
      return undefined;
    }
  }

  async removeToy(id: number) {
    try {
      const child = this.db.child.findUniqueOrThrow({where: {id}});
      await child;
      return this.db.child.update({where: {id}, data: {toy: {disconnect: {}}}, include: {toy: true}});
    } catch {
      return undefined;
    }
  }
}
