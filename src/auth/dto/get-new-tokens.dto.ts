import { ApiProperty } from "@nestjs/swagger";

export class GetNewTokensDto {
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInRva2VuVHlwZSI6InJlZnJlc2giLCJkZXZpY2VJZCI6ImJkY2M5MTliLTE0ZjQtNDRlOC1iZmI3LWJjODAxMTYwNmVlMiIsImlhdCI6MTcxOTk5ODg5OCwiZXhwIjoxNzIwMDg1Mjk4fQ.pH3U3LhhcvqQG977c2bmQLp3ZIAbT1JZIxRAXoo_oNs",
        description: "The refresh token",
    })
    readonly refreshToken: string
}