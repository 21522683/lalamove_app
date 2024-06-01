import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Post, Req, Request, Res  } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../auth/authPublic.decorator';
import { Response } from 'express';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

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
