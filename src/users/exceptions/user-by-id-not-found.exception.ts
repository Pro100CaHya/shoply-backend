import { NotFoundException } from "@nestjs/common";

export class UserByIdNotFoundException extends NotFoundException {
    constructor(userId: number) {
        super(`User with id ${userId} not found`);
    }
}