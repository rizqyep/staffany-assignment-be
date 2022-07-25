import * as shiftRepository from "../database/default/repository/shiftRepository";
import { FindManyOptions, FindOneOptions, Between} from "typeorm";
import Shift from "../database/default/entity/shift";
import { ICreateShift, IUpdateShift } from "../shared/interfaces";
import { getWeekStartAndEndDifferences, timeOverlaps } from "../shared/functions/shiftDateTime";


export const find = async (opts: FindManyOptions<Shift>): Promise<Shift[]> => {
  return shiftRepository.find(opts);
};

export const findById = async (
  id: string,
  opts?: FindOneOptions<Shift>
): Promise<Shift> => {
  return shiftRepository.findById(id, opts);
};





export const create = async (payload: ICreateShift): Promise<Shift> => {
  const shift = new Shift();
  shift.name = payload.name;
  shift.date = payload.date;
  shift.startTime = payload.startTime;
  shift.endTime = payload.endTime;

  return shiftRepository.create(shift);
};

export const updateById = async (
  id: string,
  payload: IUpdateShift
): Promise<Shift> => {
  return shiftRepository.updateById(id, {
    ...payload,
  });
};

export const deleteById = async (id: string | string[]) => {
  return shiftRepository.deleteById(id);
};



export const checkOverlappingTime = async(payload: ICreateShift):Promise<Boolean> => {
    const {startDifference, endDifference}:any = getWeekStartAndEndDifferences(payload.date);

    const [startWeek, endWeek] = [
      new Date(payload.date),
      new Date(payload.date)
    ];

    startWeek.setDate(startWeek.getDate() - startDifference);
    endWeek.setDate(endWeek.getDate() + endDifference);

    const shifts = await shiftRepository.find({
      where:{
        date:
          Between(
            startWeek,
            endWeek
          )
      }
    });

    console.log(payload.date);

    for(let i = 0 ; i < shifts.length ; i++){
      if(shifts[i].date == payload.date){
        const a = {start:payload.startTime, end: payload.endTime}
        const b = {start:shifts[i].startTime, end: shifts[i].endTime}
        if(timeOverlaps(a,b)){
          return true;
        }
      }
    }

    return false;
}
