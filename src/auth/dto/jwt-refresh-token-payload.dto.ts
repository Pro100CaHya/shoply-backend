export class JwtRefreshTokenPayloadDto {
    readonly userId: number;
    readonly tokenType: string;
    readonly deviceId: string;
}