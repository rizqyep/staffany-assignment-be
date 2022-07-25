import { Request, ResponseToolkit } from "@hapi/hapi";
import * as weekUseCase from "../../../usecases/weekUseCase";
import { errorHandler } from "../../../shared/functions/error";
import {
  ICreateWeek,
  ISuccessResponse,
} from "../../../shared/interfaces";
import moduleLogger from "../../../shared/functions/logger";

const logger = moduleLogger("weekController");

export const find = async (req: Request, h: ResponseToolkit) => {
  logger.info("Find shifts");
  try {
    const filter = req.query;
    const data = await weekUseCase.findOne(filter);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Get week successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};

export const create = async (req: Request, h: ResponseToolkit) => {
  logger.info("Create shift");
  try {
    const body = req.payload as ICreateWeek;
    const data = await weekUseCase.create(body);
    const res: ISuccessResponse = {
      statusCode: 200,
      message: "Create shift successful",
      results: data,
    };
    return res;
  } catch (error) {
    logger.error(error.message)
    return errorHandler(h, error);
  }
};
