import * as weekRepository from "../database/default/repository/weekRepository";
import Week from "../database/default/entity/week";
import { ICreateWeek, IFindWeek } from "../shared/interfaces/week";


export const findOne = async (
  opts: IFindWeek
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


