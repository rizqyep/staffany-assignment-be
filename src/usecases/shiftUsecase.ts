import * as weekRepository from "../database/default/repository/weekRepository"
import * as shiftRepository from "../database/default/repository/shiftRepository";
import { FindManyOptions, FindOneOptions, Between} from "typeorm";
import Shift from "../database/default/entity/shift";
import { ICreateShift, IUpdateShift, IUseCaseResponse } from "../shared/interfaces";
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





export const create = async (payload: ICreateShift): Promise<IUseCaseResponse> => {
  const published = await checkPublishedWeek(payload);
  if(published){
    return {error:"Week has been published", data:{}}
  }
  const isOverlap = await checkOverlappingTime(payload);
  if(isOverlap){
    return {error:"Time Overlaps", data:{}}
  }

  
  const shift = new Shift();
  shift.name = payload.name;
  shift.date = payload.date;
  shift.startTime = payload.startTime;
  shift.endTime = payload.endTime;
  const data = await shiftRepository.create(shift);
  return {error:"", data}
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


const checkPublishedWeek = async(payload:ICreateShift):Promise<Boolean> =>{
  const {startDifference, endDifference}:any = getWeekStartAndEndDifferences(payload.date);
  const [startWeek, endWeek] = [
    new Date(payload.date),
    new Date(payload.date)
  ];

  startWeek.setDate(startWeek.getDate() - startDifference);
  endWeek.setDate(endWeek.getDate() + endDifference);

  const week = await weekRepository.findOne({
    startDate: new Date(startWeek).toISOString(),
    endDate: new Date(endWeek).toISOString()
  });

  if(week){
    return true;
  }

  return false;

}


const checkOverlappingTime = async(payload: ICreateShift):Promise<Boolean> => {
    const {startDifference, endDifference}:any = getWeekStartAndEndDifferences(payload.date);
    const [startWeek, endWeek] = [
      new Date(payload.date),
      new Date(payload.date)
    ];

    startWeek.setDate(startWeek.getDate() - startDifference);
    endWeek.setDate(endWeek.getDate() + endDifference);

    const shifts:Shift[] = await shiftRepository.find({
      where:{
        date:
          Between(
            startWeek,
            endWeek
          )
      }
    });
    let overlaps = false;

    shifts.forEach((shift)=>{
      const payloadDate = new Date(payload.date).toISOString().split("T")[0]

      if(shift.date == payloadDate){
        const a = {start:payload.startTime, end: payload.endTime}
        const b = {start:shift.startTime, end: shift.endTime}
        if(timeOverlaps(a,b)){
          overlaps = true;
        }
      }
    })

    return overlaps;
}
