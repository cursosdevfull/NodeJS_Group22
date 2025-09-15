import { IsNotEmpty, MinLength } from "class-validator";

export class UserCreateValidator {
    @IsNotEmpty()
    @MinLength(4)
    name!: string;

    @IsNotEmpty()
    @MinLength(4)
    lastname!: string;
}