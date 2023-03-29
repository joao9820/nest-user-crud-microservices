import { Module } from '@nestjs/common';
import { DataBaseModule } from './infra/database/database.module';
import HttpModule from './infra/http/controllers/http.module';
import {MongooseModule} from '@nestjs/mongoose';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  //O Module acopla vários controllers e vários services, um Module pode importar outro também
  imports: [HttpModule, DataBaseModule, MongooseModule.forRoot('mongodb://localhost/nest'), EventEmitterModule.forRoot()],
  //Automaticamente o nest passa uma instancia da classe AppService dentro do constructor do controller
  /* providers: [AppService, 
    PrismaService,
    //Ao utilizar classes abstratas ou interfaces devemos utilizar dessa forma
    {
     provide: MailService,
     useClass: SMTPMailService       
    }
  ], */
})
export class AppModule {}

//Injenção de dependência, forma de automatizar a inserção das dependências, quando as classes forem instanciadas, semelhante ao serviceProviders do laravel
//Para isso basta que a classe tenha o decorator @Injectable


