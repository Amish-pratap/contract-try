import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TodoModule } from './todo/todo.module';
import config from 'mikro-orm.config';
import { ConfigModule } from '@nestjs/config';
const getMikroORMConfig = async () => {
  return config;
};

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMikroORMConfig,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
