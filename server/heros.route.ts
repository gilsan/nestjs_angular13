import {Request, Response} from 'express';
import { DATAS } from './server-db';


export function heroes(req: Request, res: Response) {

  const page: number = req.query.page;
  console.log("[page] ===> ", page)
  const perPage: number = 3;
  const start: number = (page - 1) * perPage;
  const end: number = (page * perPage) -1;

  const newValue = DATAS.slice(start, end+1)
  res.status(200).json(newValue);

}

export function tests(req: Request, res: Response) {
  console.log(" TEST OK !!!! ===> ")
  res.status(200).json({"TEST": "OK"});
}


