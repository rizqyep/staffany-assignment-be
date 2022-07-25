import * as weekRepository from "../database/default/repository/weekRepository";
import { FindManyOptions, FindOneOptions, Between} from "typeorm";
import Week from "../database/default/entity/week";
import { ICreateWeek } from "../shared/interfaces/week";


export const findOne = async (
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  return weekRepository.findOne(opts);
};

export const create = async(
    payload: ICreateWeek
):Promise<Week> =>{
    const week = new Week();
    week.startDate = payload.startDate;
    week.status = "Published";
    week.endDate = payload.endDate;
    return weekRepository.create(week);
}


