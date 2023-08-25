import { Module } from '@nestjs/common';
import { PaymentEntity } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
