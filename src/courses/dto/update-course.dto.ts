export class UpdateCourseDto {
    readonly name?: string;
    readonly description?: string;
    readonly tags?: string[];
}
//no caso do DTO de update o ideal seria usar: export class UpdateCourseDto extends PartialType(CreateCourseDto) {}, mas fiz como estava no curso