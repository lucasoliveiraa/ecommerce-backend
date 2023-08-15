import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from 'src/cache/cache.module';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { CityEntity } from './entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity]), CacheModule],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
