import { NgModule } from '@angular/core';
import { SharedModule } from '../shared-module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/auth-interceptor';

@NgModule({
  declarations: [],
  imports: [
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
