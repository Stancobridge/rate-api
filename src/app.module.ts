import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { BaseModule } from './base';
import { ConfigsModule } from './configs';
import { DatabaseModule } from './database';
import { UtilModule } from './utils';

@Module({
  imports: [DatabaseModule, ConfigsModule, BaseModule, UtilModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
