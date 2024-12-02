import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, Put, ConflictException } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childrenService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    const response = await this.childrenService.update(+id, updateChildDto);
    if (!response) throw new NotFoundException("Id not found!");
    return response;
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.childrenService.remove(+id);
    if (!response) throw new NotFoundException("Id not found!");
  }

  @Put(':id/toy/:toyId')
  async addToy(@Param('id') id: string, @Param('toyId') toyId: string) {
    const response = await this.childrenService.addToy(+id, +toyId);
    if (response == -1) throw new ConflictException("Child wasn't good.");
    if (!response) throw new NotFoundException("Id not found!");
    return response;
  }

  @Delete(":id/toy")
  async removeToy(@Param('id') id: string) {
    const response = await this.childrenService.removeToy(+id);
    if (!response) throw new NotFoundException("Id not found!");
    return response;
  }
}
