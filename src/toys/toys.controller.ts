import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { ToysService } from './toys.service';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';

@Controller('toys')
export class ToysController {
  constructor(private readonly toysService: ToysService) {}

  @Post()
  create(@Body() createToyDto: CreateToyDto) {
    return this.toysService.create(createToyDto);
  }

  @Get()
  findAll() {
    return this.toysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toysService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateToyDto: UpdateToyDto) {
    const reponse = await this.toysService.update(+id, updateToyDto);
    if (!reponse) throw new NotFoundException("Id not found!");
    return reponse;
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const reponse = await this.toysService.remove(+id);
    if (!reponse) throw new NotFoundException("Id not found!");
  }
}
