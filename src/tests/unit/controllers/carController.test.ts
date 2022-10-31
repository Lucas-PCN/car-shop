import * as sinon from 'sinon';
import chai from 'chai';
import { NextFunction, Response, Request } from 'express';
import { carMockReceves, carMockSubmit, carMocKListen, carMockUpdatedExpect, carMockUpdatedSubmit } from '../../unit/mocks/CarMocks';
import ICarController from '../../../controllers/CarController';
import IcarService from '../../../services/CarService';
import CarModel from '../../../models/CarModel';

const { expect } = chai;

describe('Testes da camada Controller', () => {

  const icarModel = new CarModel();
  const icarService = new IcarService(icarModel);
  const icarController = new ICarController(icarService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(icarService, 'create').resolves(carMockSubmit);
    sinon
      .stub(icarService, 'readOne').resolves(carMockSubmit);
    sinon.stub(icarService, 'read').resolves(carMocKListen);
    sinon.stub(icarService, 'update').resolves(carMockUpdatedExpect);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Cadastro de um novo carro sistema', () => {
    it('Testa se é possivel cadastrar um carro novo', async () => {
      req.body = carMockSubmit;
      await icarController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockSubmit)).to.be.true
    });
  });

  describe('Busca os dados de um carro', () => {
    it('Testa se os dados certos são retornados ao se passar o id', async () => {
      req.params = { id: carMockReceves._id };
      await icarController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockSubmit)).to.be.true;
    })
  })

  describe('Testa se todos os carros cadastrados são retornados', () => {
    it('Testa se retorna um array com todos os objetos cadastrados', async () => {
      await icarController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMocKListen)).to.be.true;
    })
  })

  describe('Testa se é possivel atualizar os dados', () => {
    it('Testa se os dados são atualizados', async () => {
      req.params = { id: carMockUpdatedExpect._id };
      req.body = carMockUpdatedSubmit;
      await icarController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockUpdatedExpect)).to.be.true;

    })
  })

});