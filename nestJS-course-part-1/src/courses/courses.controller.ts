import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

// @Controller() não é necessario que esse decorator tenha uma string
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  // /@Get('list') podemos fazer uma rota aninhada utilizando uma string dentro do decorator
  // @Get()
  // findAll(@Res() response) { //http status code dinamico
  //     return response.status(200).send('Listagem de cursos');
  // }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  // @Get(':id')
  // findOne(
  //     @Param() params) {
  //     return `Curso #${params.id}`;
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  // @Post()
  // create(
  //     @Body('teste) teste: string) {
  //     return teste;
  // }

  // @Post()
  // @HttpCode(HttpStatus.NO_CONTENT) DEFINIÇÃO FIXA DE STATUS CODE
  // create(
  //     @Body() body) {
  //     return body;
  // }

  // @Post()
  // create(
  //     @Body() body) {
  //     return body;
  // }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
