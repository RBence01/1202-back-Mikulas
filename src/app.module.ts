import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChildrenModule } from './children/children.module';
import { ToysModule } from './toys/toys.module';

@Module({
  imports: [ChildrenModule, ToysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
