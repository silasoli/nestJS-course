import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly coursRepository: Repository<Course>,
    ) { }


    findAll() {
        return this.coursRepository.find();
    }

    findOne(id: string) {
        const course = this.coursRepository.findOne(id);

        if (!course) throw new NotFoundException(`Course ID ${id} not found`);

        return course;
    }

    create(createCourseDto: CreateCourseDto) {
        const course = this.coursRepository.create(createCourseDto);
        return this.coursRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const course = await this.coursRepository.preload({
            id: +id,
            ...updateCourseDto
        });

        if (!course) throw new NotFoundException(`Course ID ${id} not found`);

        return this.coursRepository.save(course);
    }

    async remove(id: string) {
        const course = await this.coursRepository.findOne(id);

        if (!course) throw new NotFoundException(`Course ID ${id} not found`);

        return this.coursRepository.remove(course);
    }
}
