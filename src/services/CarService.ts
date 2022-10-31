import { IService } from '../interfaces/IService';
import { ICar, CarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

class CarService implements IService<ICar> {
  private _icar:IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._icar = model;
  }

  public create(obj: unknown): Promise<ICar> {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._icar.create(parsed.data);
  }
}

export default CarService;