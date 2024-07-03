import { JwtTokenPayloadDto } from "../dto/jwt-token-payload.dto";

export interface RequestWithJwtPayload extends Request {
    payload: JwtTokenPayloadDto
}