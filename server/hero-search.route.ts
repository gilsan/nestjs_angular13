import {Request, Response} from 'express';
import { DATAS } from './server-db';


export function searchHeroes(req: Request, res: Response) {

  const name: string = req.query.name;

  const newValue = DATAS.filter(item => item.name === name)
  res.status(200).json(newValue);

}
