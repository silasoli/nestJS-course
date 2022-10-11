import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

describe('CoursesService', () => {
  let id;
  let date;
  let service: CoursesService;

  beforeEach(async () => {
    service = new CoursesService();
    id = 'bab8ed4d-0b67-4659-84a8-c703e2283043';
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should creates a course', async () => {
    const expectOutputTags = [
      {
        id,
        name: 'nestjs',
        created_at: date,
      },
    ];
    const expectOutputCourse = {
      id,
      name: 'Test',
      description: 'Test description',
      created_at: date,
      tags: expectOutputTags,
    };
    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;
    const createCourseDto: CreateCourseDto = {
      name: 'Test',
      description: 'Test description',
      tags: ['nestjs'],
    };
    const newCourse = await service.create(createCourseDto);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(expectOutputCourse).toStrictEqual(newCourse);
  });

  //   describe('findOne', () => {
  //     describe('Buscar curso pelo ID', () => {
  //       it('Deve retornar o objeto Course', async () => {
  //         const courseId = '1';
  //         const expectedCourse = {};

  //         courseRepository.findOne.mockReturnValue(expectedCourse);
  //         const course = await service.findOne(courseId);
  //         expect(course).toEqual(expectedCourse);
  //       });

  //       it('Deve retornar um NotFoundException', async () => {
  //         const courseId = '1';
  //         courseRepository.findOne.mockReturnValue(undefined);

  //         try {
  //           await service.findOne(courseId);
  //         } catch (error) {
  //           expect(error).toBeInstanceOf(NotFoundException);
  //           expect(error.message).toEqual(`Course ID ${courseId} not found`);
  //         }
  //       });
  //     });
  //   });
});
