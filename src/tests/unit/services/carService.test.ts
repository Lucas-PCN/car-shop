import * as sinon from 'sinon';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/CarModel';
import chai from 'chai';
import { carMockReceves, carMockSubmit, carMocKListen, carMockUpdatedExpect, carMockUpdatedSubmit } from '../../unit/mocks/CarMocks';
import IcarService from '../../../services/CarService';
import { ZodError } from 'zod';

const { expect } = chai;

describe('Testes da camada Service', () => {

  const carModel = new CarModel();
  const carService = new IcarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create').resolves(carMockReceves);
    sinon
      .stub(carModel, 'readOne').onCall(0).resolves(carMockReceves)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'read').resolves(carMocKListen);
    sinon.stub(carModel, 'update').onCall(0).resolves(carMockUpdatedExpect)
  });

  after(()=>{
    sinon.restore();
  })

  describe('Cadastro de um carro no sistema', () => {
    it('Testa se é possível cadastrar um novo carro', async () => {
      const responseCreated = await carService.create(carMockSubmit);
      expect(responseCreated).to.be.equal(carMockReceves);
    });

    it('Testa que não é possível cadastrar um novo carro com informações incorretas', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err
      }

      expect(error).to.be.instanceOf(ZodError);
    })
  });

  describe('Busca dados de um carro especifico', () => {
    it('Testa se os dados são retornados de forma adequada', async () => {
      const responseCreate = await carService.readOne('63582c16143d597f738567a7');
      expect(responseCreate).to.be.deep.equal(carMockReceves);
    });

    it('Testa que não é possível buscar os dados com um id que não existe', async () => {
      let error;
      try {
        await carService.readOne('63582c16143d597f738567a7');
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound)
    })
  });

  describe('Busca todos os dados', () => {
    it('Testa que o retorno deve ser um array com todos os objetos cadastrados no banco', async () => {
      const responseCars = await carService.read();
      expect(responseCars).to.be.deep.equal(carMocKListen)
    })
  });

  describe('Verifica se é possivel atualizar os dados', () => {
    it('Testa que os dados devem ser atualizados', async () => {
      const responseUpdated = await carService.update('6358fc9dae42019707e819ac', carMockUpdatedSubmit);
      expect(responseUpdated).to.be.deep.equal(carMockUpdatedExpect);
    });

    it('Testa que não é possivel atualizar os dados com um id incorreto', async () => {
      let err;
      try {
        await carService.update('125466', carMockUpdatedSubmit);
      } catch (error: any) {
        err = error;
      }

      expect(err.message).to.be.equal(ErrorTypes.EntityNotFound);
    });
  })
});