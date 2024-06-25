import { NgModule, isDevMode } from '@angular/core';
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
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ChatService } from './services/chat.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CookieService } from './services/cookie.service';
import { SettingsModule } from './settings/settings.module';
import { SocketIoModule } from 'ngx-socket-io';
import { FriendsModule } from './friends/friends.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserModule } from './user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OnlineService } from './services/online.service';
import { ImageService } from './services/image.service';
import { ReviewService } from './services/review.service';
import { ScrollService } from './services/scroll.service';

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        SocketIoModule,
        BrowserAnimationsModule,
        ChatModule,
        NavigationModule,
        MatListModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatSelectModule,
        AuthenticationModule,
        SettingsModule,
        FriendsModule,
        MatSnackBarModule,
        UserModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: false,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        })], providers: [
        LanguageService,
        AuthService,
        ChatService,
        CookieService,
        OnlineService,
        ImageService,
        ReviewService,
        ScrollService,
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
