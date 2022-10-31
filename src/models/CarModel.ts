import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import GenericModel from './GenericModel';

const carSchema = new Schema<ICar>({
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

class CarModel extends GenericModel<ICar> {
  constructor(model = mongooseCreateModel('Icar', carSchema)) {
    super(model);
  }
}

export default CarModel;