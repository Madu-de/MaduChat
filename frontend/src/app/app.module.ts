import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ChatModule } from './chat/chat.module';
import { NavigationModule } from './navigation/navigation.module';
import { LanguageService } from './services/language.service';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ChatService } from './services/chat.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CookieService } from './services/cookie.service';
import { SettingsModule } from './settings/settings.module';
import { SocketIoModule } from 'ngx-socket-io';
import { Websocket } from './services/socket.service';
import { FriendsModule } from './friends/friends.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    BrowserAnimationsModule,
    ChatModule,
    NavigationModule,
    MatListModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule,
    HttpClientModule,
    AuthenticationModule,
    SettingsModule,
    FriendsModule,
    MatSnackBarModule,
    UserModule,
  ],
  providers: [LanguageService, AuthService, ChatService, CookieService, Websocket],
  bootstrap: [AppComponent],
})
export class AppModule { }
