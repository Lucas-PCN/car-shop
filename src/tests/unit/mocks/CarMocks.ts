import { ICar } from "../../../interfaces/ICar";

const carMockSubmit: ICar = {
    model: 'Ferrari Maranello',
    year: 1963,
    color: 'red',
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
}

const carMockReceves: ICar & { _id: string } = {
	_id: "63582532143d597f738567a5",
  model: 'Ferrari Maranello',
	year: 1963,
	color: "red",
	buyValue: 3500000,
	doorsQty: 2,
	seatsQty: 2,
}


type carMockWidth = {
  _id: string,
  status: boolean,
  model: string,
  year: number,
  color: string,
  buyValue: number,
  doorsQty: number,
  seatsQty: number,
}


const carMocKListen: carMockWidth[] = [
	{
		_id: "6358577eafa164088865b5b7",
    status: true,
		model: "Ferrari Maranello",
		year: 1963,
		color: "red",
		buyValue: 3500000,
		doorsQty: 2,
		seatsQty: 2,
	}
]

const carMockUpdatedSubmit: ICar = {
    model: "Maranello",
    year: 1963,
    color: "black",
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
}


type carMockUpadetedExpect = {
  _id: string,
	model: string,
	year: number,
	color: string,
	buyValue: number,
	doorsQty: number,
	seatsQty: number
}

const carMockUpdatedExpect: carMockUpadetedExpect = {
	_id: "6358fc9dae42019707e819ac",
	model: "Maranello",
	year: 1963,
	color: "black",
	buyValue: 3500000,
	doorsQty: 2,
	seatsQty: 2
}

export {
  carMockSubmit,
  carMockReceves, 
  carMocKListen,
  carMockUpdatedSubmit,
  carMockUpdatedExpect
}