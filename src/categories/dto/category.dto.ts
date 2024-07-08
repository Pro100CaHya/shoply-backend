import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
    @ApiProperty({
        example: 1,
        description: "The unique identifier for the category",
    })
    readonly id: number;

    @ApiProperty({
        example: "Mobile Phones",
        description: "The email address of the category",
    })
    readonly name: string;

    @ApiProperty({
        example: "2022-07-09T11:02:56.000Z",
        description: "Creation date of the category"
    })
    readonly createdAt: Date;

    @ApiProperty({
        example: "2022-07-09T11:02:56.000Z",
        description: "Update date of the user account",
    })
    readonly updatedAt: Date;
}