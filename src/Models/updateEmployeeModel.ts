import { IsNotEmpty } from "class-validator";

export class updateEmployeeModel {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;
}