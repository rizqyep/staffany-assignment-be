import { Server } from "@hapi/hapi";
import createShiftRoutes from "./shifts";
import createWeekRoutes from "./week";
export default function (server: Server, basePath: string) {
  createShiftRoutes(server, basePath + "/shifts");
  createWeekRoutes(server, basePath + "/weeks");
  
}
