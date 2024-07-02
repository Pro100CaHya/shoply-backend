import { UnauthorizedException } from "@nestjs/common";

export class IncorrectLoginOrPassword extends UnauthorizedException {
    constructor() {
        super("Incorrect login or password");
    }
}