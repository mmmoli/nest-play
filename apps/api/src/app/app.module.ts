import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ProjectsModule } from '@api/projects/nest';

@Module({
  imports: [ProjectsModule],
  providers: [AppService],
})
export class AppModule {}
