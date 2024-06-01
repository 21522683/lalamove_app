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

    @Get('current-user')
    @HttpCode(HttpStatus.OK)
    async currentUser(@Request() req, @Res() res: Response) {
        try {
            const user = await this.userService.currentUser(req.user.sub);
            if (!user) throw new HttpException('Invalid Credentials', 401);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof NotFoundException) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
        }
    }
    
}
