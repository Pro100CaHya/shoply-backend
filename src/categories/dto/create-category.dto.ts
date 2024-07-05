import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty({
        example: "Mobile phones",
        description: "The name of the category"
    })
    readonly name: string;
}