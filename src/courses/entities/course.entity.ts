import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'courses' })
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'json', nullable: true })
    tags: string[];
}