import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";


@Entity({ name: 'tags' })
export class Tag {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    name: String;

    @ManyToMany(() => Course, (course: Course) => course.tags)
    courses: Course[];

}