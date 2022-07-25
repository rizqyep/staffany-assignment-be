import {
  getRepository,
  FindOneOptions,
} from "typeorm";
import moduleLogger from "../../../shared/functions/logger";
import { IFindWeek } from "../../../shared/interfaces";
import Week from "../entity/week";


const logger = moduleLogger("weekRepository");

export const findById = async (
  id: string,
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  logger.info("Find by id");
  const repository = getRepository(Week);
  const data = await repository.findOne(id, opts);
  return data;
};

export const findOne = async (
  opts?: IFindWeek
): Promise<Week> => {
  logger.info("Find one");
  const repository = getRepository(Week);
  const data = await repository.findOne({
    where:{
        startDate: new Date(opts.startDate),
        endDate: new Date(opts.endDate)
    }
  })
  return data;
};



export const create = async (payload:Week):Promise<Week> => {
    logger.info("Create week / Publish");
    const repository = getRepository(Week);
    const newData = await repository.save(payload);
    return newData;
}