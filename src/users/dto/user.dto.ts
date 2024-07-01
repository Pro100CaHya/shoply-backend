import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({
        example: 1,
        description: "The unique identifier for the user",
    })
    readonly id: number;

    @ApiProperty({
        example: "ivan.ivanov@gmail.com",
        description: "The email address of the user",
    })
    readonly email: string;

    @ApiProperty({
        example: "hashed_password_to_the_account",
        description: "The password of the user account as a hash string",
    })
    readonly password: string;

    @ApiProperty({
        example: "2022-07-09T11:02:56.000Z",
    })
    readonly createdAt: Date;

    @ApiProperty({
        example: "2022-07-09T11:02:56.000Z",
        description: "Update date of the user account",
    })
    readonly updatedAt: Date;
}