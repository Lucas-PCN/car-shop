import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/CarModel';
import { carMockReceves, carMockSubmit, carMocKListen, carMockUpdatedSubmit, carMockUpdatedExpect } from '../../unit/mocks/CarMocks';
import { ErrorTypes } from '../../../errors/catalog';

const { expect } = chai;


describe('Testes da camada model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockReceves);
    sinon.stub(Model, 'findOne').resolves(carMockReceves);
    sinon.stub(Model, 'find').resolves(carMocKListen);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdatedExpect)
  });

  after(()=>{
    sinon.restore();
  })

  describe('Cadastro de novos objetos', () => {
    it('Testa se é possivel cadastrar um novo carro', async () => {
      const newCar = await carModel.create(carMockSubmit);
      expect(newCar).to.be.deep.equal(carMockReceves)
    });
  })

  describe('Busca de um objeto pelo id', () => {
    it('Testa se ao passar um id por parâmentro ele retorna os dados de um carro', async () => {
      const responseCar = await carModel.readOne('63582c16143d597f738567a7');
      expect(responseCar).to.be.deep.equal(carMockReceves)
    });

    it('Testa que não é possível buscar um carro com id inexistente', async () => {
      try {
        await carModel.readOne('1254ee');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId')
      }
    });
  })

  describe('Busca todos os objetos do banco', () => {
    it('Testa se o retorno é um array', async () => {
      const responseCar = await carModel.read();
      expect(responseCar).to.be.deep.equal(carMocKListen)
    });
  });

  describe('Testa se é possivel atualizar os dados', () => {
    it('Testa se os dados são atualizados com sucesso', async () => {
      const icarUpdated = await carModel.update('6358fc9dae42019707e819ac', carMockUpdatedSubmit);
      expect(icarUpdated).to.be.deep.equal(carMockUpdatedExpect)
    });

    it('Testa que não é possível atualizar os dados com id incorreto', async () => {
      try {
        await carModel.update('12555221', carMockUpdatedSubmit);
      } catch (error: any) {
        expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
      }
    });
  })
}); 