import {
  getRepository,
  FindConditions,
  FindOneOptions,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import moduleLogger from "../../../shared/functions/logger";
import Week from "../entity/week";


const logger = moduleLogger("weekRepository");

const findById = async (
  id: string,
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  logger.info("Find by id");
  const repository = getRepository(Week);
  const data = await repository.findOne(id, opts);
  return data;
};

export const findOne = async (
  where?: FindConditions<Week>,
  opts?: FindOneOptions<Week>
): Promise<Week> => {
  logger.info("Find one");
  const repository = getRepository(Week);
  const data = await repository.findOne(where, opts);
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