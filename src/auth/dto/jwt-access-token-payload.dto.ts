export class JwtAccessTokenPayloadDto {
    readonly userId: number;
    readonly email: string;
    readonly tokenType: string;
    readonly deviceId: string;
}