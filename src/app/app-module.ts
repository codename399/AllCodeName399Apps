import { NgModule } from '@angular/core';
import { SharedModule } from '../shared-module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/auth-interceptor';
import { LoginModule } from '../authentication/components/login-component/login-module';

@NgModule({
  declarations: [],
  imports: [
    LoginModule,
    SharedModule
  ],
  providers: [
  {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
})
export class AppModule { }
