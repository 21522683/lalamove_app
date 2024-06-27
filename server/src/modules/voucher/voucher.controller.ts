import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { VoucherDto } from 'src/dtos';
import { VoucherService } from './voucher.service';

@Controller('vouchers')
export class VoucherController {
  constructor(private voucherService: VoucherService) {}
  @Get('')
  async getAllVoucher(@Res() res: Response) {
    const r = await this.voucherService.getAllVouchers();
    if (!r) throw new HttpException('Invalid Credentials', 401);
    res.status(200).json(r);
  }
  @Post('add-voucher')
  @UsePipes(new ValidationPipe())
  async createVoucher(@Body() voucherDto: VoucherDto, @Res() res: Response) {
    const r = await this.voucherService.addVoucher(voucherDto);
    if (!r) throw new HttpException('Invalid Credentials', 401);
    res.status(200).json(r);
  }
  @Post(':voucherId/update-voucher')
  @UsePipes(new ValidationPipe())
  async updateVoucher(
    @Body() voucherDto: VoucherDto,
    @Res() res: Response,
    @Param('voucherId') voucherId: string,
  ) {
    const r = await this.voucherService.updateVoucher(voucherDto, voucherId);
    if (!r) throw new HttpException('Invalid Credentials', 401);
    res.status(200).json(r);
  }
  @Delete(':voucherId/delete-voucher')
  async deleteVoucher(
    @Res() res: Response,
    @Param('voucherId') voucherId: string,
  ) {
    const r = await this.voucherService.deleteVoucher(voucherId);
    if (!r) throw new HttpException('Invalid Credentials', 401);
    res.status(200).json(r);
  }

  @Get('vouchersByCustomer/:money')
  async getVouchersByCustomer(
    @Res() res: Response,
    @Req() req,
    @Param('money') money: string,
  ) {
    const userId: string = req.user.sub;
    const r = await this.voucherService.getVouchersByCustomer(
      userId,
      Number(money),
    );
    if (!r) throw new HttpException('Invalid Credentials', 401);
    res.status(200).json({
      message: 'Get voucher successfully',
      data: r,
    });
  }
}
