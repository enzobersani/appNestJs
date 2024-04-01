import { IsNotEmpty } from "class-validator";

export class CreateEmployeeModel {
    id: number;

    @IsNotEmpty()
    name: string;
};