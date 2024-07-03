import { UnauthorizedException } from "@nestjs/common";

export class IncorrectRefreshToken extends UnauthorizedException {
    constructor() {
        super("Incorrect refresh token");
    }
}