import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const obj = plainToInstance(metadata.metatype, value);

        const validationResult = await validate(obj);

        if (validationResult.length) {
            const errors = validationResult.map((err) => {
                return `${err.property} - ${Object.values(err.constraints).join(", ")}`;
            });

            throw new ValidationException(errors);
        }

        return value;
    }
}