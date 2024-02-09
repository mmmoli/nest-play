import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ProjectsModule } from '@api/projects/nest';
import { RandomHandler } from './random-handler';

@Module({
  imports: [ProjectsModule],
  providers: [AppService, RandomHandler],
})
export class AppModule {}
