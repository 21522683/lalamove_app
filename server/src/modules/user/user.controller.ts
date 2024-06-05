import { 
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    HttpException, 
    HttpStatus, 
    NotFoundException, 
    Param, 
    Post, 
    Put, 
    Query, 
    Req, 
    Request, 
    Res, 
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { updateInfoUserDto } from 'src/dtos/UpdateInfoUser.dto';
import { updatePassUserDto } from 'src/dtos/updatePassUser.dto';
import { rejectLisencesDriverDto } from 'src/dtos/rejectLisencesDriver.dto';
import { rejectVehiclesDriverDto } from 'src/dtos/rejectVehiclesDriver.dto';

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

    @Put('/update-info/:id')
    async updateUser(
        @Param('id') id: string,
        @Body() updateInfoUserDto: updateInfoUserDto
    ) {
        return this.userService.updateUser(id, updateInfoUserDto);
    }

    @Put('/update-pass/:id')
    async updatePasswordUser(
        @Param('id') id: string,
        @Body() updatePassUserDto: updatePassUserDto
    ) {
        return this.userService.updatePasswordUser(id, updatePassUserDto);
    }

    @Get('/get-all-drivers')
    async getAllDriver(@Query() query: any) {
        return this.userService.getAllDriver(query);
    }

    @Get('/get-all-lisences-user/:id')
    async getAllLisencesOfUser(@Param('id') id: string, @Query() query: any) {
        return this.userService.getAllLisencesOfUser(id, query);
    }

    @Get('/get-all-vehicles-user/:id')
    async getAllVehiclesOfUser(@Param('id') id: string, @Query() query: any) {
        return this.userService.getAllVehiclesOfUser(id, query);
    }

    @Put('/accept-driver/:id')
    async acceptDriver(
        @Param('id') id: string,
    ) {
        return this.userService.acceptDriver(id);
    }

    @Put('/reject-driver/:id')
    async rejectDriver(
        @Param('id') id: string,
        @Body() reason: string
    ) {
        return this.userService.rejectDriver(id, reason['reason']);
    }

    @Put('/lock-driver/:id')
    async lockDriver(
        @Param('id') id: string,
        @Body() reason: string
    ) {
        return this.userService.lockDriver(id, reason['reason']);
    }

    @Put('/restore-driver/:id')
    async restoreDriver(
        @Param('id') id: string,
    ) {
        return this.userService.restoreDriver(id);
    }

    @Put('/accept-lisences-driver/:id')
    async acceptLisencesDriver(
        @Param('id') id: string,
        @Body() idLisences: string
    ) {
        const idLisence = idLisences['idLisences'];
        return this.userService.acceptLisencesDriver(id, idLisence);
    }

    @Put('/reject-lisences-driver/:id')
    async rejectLisencesDriver(
        @Param('id') id: string,
        @Body() rejectLisencesDriverDto: rejectLisencesDriverDto
    ) {
        return this.userService.rejectLisencesDriver(id, rejectLisencesDriverDto.idLisences, rejectLisencesDriverDto.reason);
    }

    @Put('/accept-vehicles-driver/:id')
    async acceptVehiclesDriver(
        @Param('id') id: string,
        @Body() idVehicles: string
    ) {
        return this.userService.acceptVehiclesDriver(id, idVehicles['idVehicles']);
    }
    
    @Put('/reject-vehicles-driver/:id')
    async rejectVehiclesDriver(
        @Param('id') id: string,
        @Body() rejectVehiclesDriverDto: rejectVehiclesDriverDto
    ) {
        return this.userService.rejectVehiclesDriver(id, rejectVehiclesDriverDto.idVehicles, rejectVehiclesDriverDto.reason);
    }
}
