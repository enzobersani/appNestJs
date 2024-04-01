import { Injectable, Query } from '@nestjs/common';
import { CreateEmployeeModel } from '../../Models/createEmployeeModel';
import { PrismaService } from 'src/database/PrismaService';
import { searchEmployeeModel } from 'src/Models/searchEmployeeModel';
import { updateEmployeeModel } from 'src/Models/updateEmployeeModel';
import { ok } from 'assert';

@Injectable()
export class EmployeeService {

    constructor(private prisma: PrismaService){}

    async create(data: CreateEmployeeModel){

        if(data.id !== null){
            const employeeExists = await this.prisma.employee.findFirst({
                where: {
                    id: data.id
                }
            });

            if(employeeExists){
                throw new Error('Employee already exists');
            }
        }

        await this.prisma.employee.create({
            data
        });
        return Date.now();
    }

    async findAll(){
        return await this.prisma.employee.findMany();
    }

    async findByParam(request: searchEmployeeModel){

        if (request == null)
            return await this.prisma.employee.findMany();

        let whereClause: any = {};

        if (request.id !== undefined) {
            whereClause['id'] = Number(request.id);
        }
    
        if (request.name !== null) {
            whereClause['name'] = request.name;
        }

        const employee = await this.prisma.employee.findMany({ where: whereClause });
        return employee;
    }

    async update(request: updateEmployeeModel){
        const employee = await this.prisma.employee.findFirst(
            { where: {
                id: request.id
            }});

        if(!employee)
            throw new Error("Employee not found!");

        const updateEmployee = await this.prisma.employee.update({
            where: {
                id: request.id
            },
            data: {
                name: request.name
            }
        });

        return updateEmployee;
    }

    async delete(idRequest: number){
        const employee = await this.prisma.employee.findFirst(
            { where: {
                id: Number(idRequest)
            }});

        if(!employee)
            throw new Error("Employee not found!");

        await this.prisma.employee.delete({
            where: { id: Number(idRequest) }
        }); 
    }

}
