import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment-status.service';
import { PaymentStatusEntity } from './entities/payment-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentStatusEntity])],
  providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
