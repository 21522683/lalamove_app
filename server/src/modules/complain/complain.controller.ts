import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ComplainService } from './complain.service';
import { CreateComplainDTO } from './DTO/create_complain.dto copy';
import { Response } from 'express';

@Controller('complain')
export class ComplainController {
  constructor(private readonly complainService: ComplainService) {}

  @Get()
  welcome(@Req() req) {
    return 'Welcome';
  }

  @Post('addNewComplain')
  async addNewComplain(
    @Req() req,
    @Body() body: CreateComplainDTO,
    @Res() res: Response,
  ) {
    try {
      const { sub: user } = req.user;
      const newComplain = await this.complainService.addNewComplain({
        user,
        ...body,
      });
      res.status(HttpStatus.CREATED).json({
        message: 'Add new complain successfully',
        data: newComplain,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Patch('updateComplain/:complainId')
  async updateComplain(
    @Param('complainId') complainId: string,
    @Body() body,
    @Res() res: Response,
  ) {
    try {
      const address = await this.complainService.updateComplain(
        complainId,
        body,
      );
      res.status(HttpStatus.OK).json({
        message: 'Update new address successfully',
        data: address,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Delete('deleteComplain/:complainId')
  async deleteAddress(
    @Param('complainId') complainId: string,
    @Body() body,
    @Res() res: Response,
  ) {
    try {
      const address = await this.complainService.deleteComplainById(complainId);
      res.status(HttpStatus.OK).json({
        message: 'Delete  complain successfully',
        data: address,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get('getComplainsOfCurrentUser')
  async getComplainsOfCurrentUser(@Req() req, @Res() res: Response) {
    try {
      const userId: string = req.user.sub;
      const complains =
        await this.complainService.getComplainsOfCurrentUser(userId);
      res.status(HttpStatus.CREATED).json({
        message: 'Get complains successfully',
        data: complains,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get('getAllComplains')
  async getAllComplains(@Req() req, @Res() res: Response) {
    try {
      const complains = await this.complainService.getAllComplains();
      res.status(HttpStatus.CREATED).json({
        message: 'Get complains successfully',
        data: complains,
      });
    } catch (error) {
      console.log(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
