import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: "ivan.ivanov@gmail.com",
        description: "The email address of the user",
    })
    readonly email: string;

    @ApiProperty({
        example: "password_to_the_account",
        description: "The password of the user account",
    })
    readonly password: string;
}