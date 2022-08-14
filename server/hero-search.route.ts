import {Request, Response} from 'express';
import { DATAS } from './server-db';


export function searchHeroes(req: Request, res: Response) {
  const result = Array()
  const name: string = req.query.name;
  console.log("[문의명] ", name);

  DATAS.forEach(item => {
    const val = item.name.toLowerCase().indexOf(name.toLowerCase());
    // console.log(item.name + "    " + val);
    if (item.name.toLowerCase().indexOf(name.toLowerCase()) != -1) {

      result.push(item);
    }

  });
  // const newValue = DATAS.filter(item => item.name.toLowerCase() === name.toLowerCase())

  res.status(200).json(result);

}

export function searchHeroById(req: Request, res: Response) {
    const id: string = req.query.id
    const newValue = DATAS.filter(item => item.id.toString() === id)
    res.status(200).json(newValue)
}
