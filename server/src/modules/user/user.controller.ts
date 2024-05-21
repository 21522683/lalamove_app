import { 
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Post, 
    Query, 
    Req, 
    Request, 
    Res, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, LoginUserDto, } from '../../dtos';
import { Response } from 'express';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('get-driver-infor')
    async getDriverInfor(@Request() req, @Res() res: Response, @Query() query: any) {
        const u = await this.userService.getDriverInfor(req.user.sub, query.query);
        res.status(200).json(u);
    }
    @Post('update-driver-infor')
    async updateDriverInfo(@Req() req, @Res() res: Response) {
        const u = await this.userService.updateDriverInfor(req.body);
        res.status(200).json(u);
    }

}
