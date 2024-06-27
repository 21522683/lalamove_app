import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Complain } from './Schema/complain.schema';
import { Model } from 'mongoose';
import { UpdateComplainDTO } from './DTO/update_complain.dto';
import { CreateComplainDTO } from './DTO/create_complain.dto copy';
import path from 'path';

@Injectable()
export class ComplainService {
  constructor(
    @InjectModel(Complain.name) private complainModel: Model<Complain>,
  ) {}

  async addNewComplain(complain: CreateComplainDTO) {
    const newComplain = new this.complainModel(complain);
    return await newComplain.save();
  }

  async updateComplain(complainId: string, complain: UpdateComplainDTO) {
    return await this.complainModel.findByIdAndUpdate(
      complainId,
      {
        ...complain,
        isResponsed: true,
        responseDate: new Date(),
      },
      {
        new: true,
      },
    );
  }

  async deleteComplainById(complainId: string) {
    return await this.complainModel.findByIdAndDelete(complainId);
  }

  async getComplainsOfCurrentUser(userId: string) {
    return await this.complainModel
      .find({
        user: userId,
      })
      .populate({
        path: 'order',
        model: 'Order',
        populate: {
          path: 'drive',
          model: 'User',
        },
      });
  }

  async getAllComplains() {
    return await this.complainModel.find().populate({
      path: 'order',
      model: 'Order',
      populate: [
        {
          path: 'drive',
          model: 'User',
        },
        {
          path: 'customer',
          model: 'User',
        },
      ],
    });
  }
}
