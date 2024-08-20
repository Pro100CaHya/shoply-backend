import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        example: "Mobile phones",
        description: "The name of the category"
    })
    @IsString({"message": "must be string"})
    @Length(2, 64, {"message": "length must between 2 and 64"})
    readonly name: string;
}