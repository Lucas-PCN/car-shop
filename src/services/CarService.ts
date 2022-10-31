import { IService } from '../interfaces/IService';
import { ICar, CarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

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

  public async readOne(_id: string): Promise<ICar> {
    const cars = await this._icar.readOne(_id);

    if (!cars) throw new Error(ErrorTypes.EntityNotFound);
    return cars;
  }

  public async read(): Promise<ICar[]> {
    const responseCars = await this._icar.read();
    return responseCars;
  }

  public async update(_id: string, obj: unknown): Promise<ICar> {
    const parsed = CarSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    const responseUpdated = await this._icar.update(_id, parsed.data);
    if (!responseUpdated) throw new Error(ErrorTypes.EntityNotFound);

    return responseUpdated;
  } 

  public async delete(_id: string): Promise<ICar | null> {
    const response = await this._icar.delete(_id);
    return response;
  }
}

export default CarService;