import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    EmployeeModule,
    ThrottlerModule.forRoot([
      {
        name:'long',
        ttl:60000, //ttl: time to live //
        limit: 10, // 3 req per 60 sec
      },
      {
        name:'short',
        ttl: 1000,
        limit: 3,
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
