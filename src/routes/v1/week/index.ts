import { Server } from '@hapi/hapi';
import { createWeekDto } from '../../../shared/dtos/week';
import * as weekController from "./weekController";

export default function (server: Server, basePath: string) {
  server.route({
    method: "GET",
    path: basePath,
    handler: weekController.find,
    options: {
      description: 'Get week with filter',
      notes: 'Get One Week Data',
      tags: ['api', 'shift']
    }
  });
  
  
  server.route({
    method: "POST",
    path: basePath,
    handler: weekController.create,
    options: {
      description: 'Create shift',
      notes: 'Create shift',
      tags: ['api', 'shift'],
      validate: {
        payload: createWeekDto
      },
    }
  });


}