import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { HttpModule } from '@nestjs/axios';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter],
    imports: [HttpModule],
})
export class CommonModule {}
