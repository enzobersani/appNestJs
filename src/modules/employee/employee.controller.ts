import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeModel } from '../../Models/createEmployeeModel';
import { searchEmployeeModel } from 'src/Models/searchEmployeeModel';
import { updateEmployeeModel } from 'src/Models/updateEmployeeModel';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @HttpCode(201)
  async createEmployee(@Body() request: CreateEmployeeModel){
    return this.employeeService.create(request);
  }

  @Get()
  @HttpCode(200)
  async findAllEmployee(){
    return this.employeeService.findAll();
  }

  @Get('search')
  @HttpCode(200)
  async findByParams(@Query() request: searchEmployeeModel){
    return this.employeeService.findByParam(request);
  }

  @Put()
  @HttpCode(200)
  async updateEmployee(@Body() request: updateEmployeeModel){
    return this.employeeService.update(request);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleleEmployee(@Param('id') request: number){
    return this.employeeService.delete(request)
  }
}
