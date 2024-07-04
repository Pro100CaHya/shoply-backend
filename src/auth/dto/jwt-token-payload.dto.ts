import { ApiProperty } from "@nestjs/swagger";

export class JwtTokenPayloadDto {
    @ApiProperty({
        example: 1,
        description: "The unique identifier of the user",
    })
    readonly userId: number;

    @ApiProperty({
        example: "ivan_ivanov@mail.com",
        description: "The email address of the user",
    })
    readonly email: string;

    @ApiProperty({
        example: "Access",
        description: "The token type",
    })
    readonly tokenType: string;

    @ApiProperty({
        example: "bdcc919b-14f4-44e8-bfb7-bc8011606ee2",
        description: "The uuid of device",
    })
    readonly userAgent: string;
}