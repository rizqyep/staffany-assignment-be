import {
  getRepository,
  FindConditions,
  FindOneOptions,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import moduleLogger from "../../../shared/functions/logger";
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
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  logger.info("Find one");
  const repository = getRepository(Week);
  const data = await repository.findOne(opts);
  return data;
};

export const updateById = async (
  id: string,
  payload: QueryDeepPartialEntity<Week>
): Promise<Week> => {
  logger.info("Update by id");
  const repository = getRepository(Week);
  await repository.update(id, payload);
  return findById(id);
};


export const create = async (data:Week):Promise<Week> => {
    logger.info("Create week / Publish");
    const repository = getRepository(Week);
    const newData = repository.create(data);
    return newData;
}