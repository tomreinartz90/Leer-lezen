import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PictureToWordComponent } from './picture-to-word/picture-to-word.component';
import { ButtonComponent } from './button/button.component';
import { MissingLettersComponent } from './missing-letters/missing-letters.component';
import { LevelSelectComponent } from './level-select/level-select.component';
import { WordToPictureComponent } from './word-to-picture/word-to-picture.component';
import { LevelHeaderComponent } from './level-header/level-header.component';

@NgModule({
  declarations: [
    AppComponent,
    PictureToWordComponent,
    ButtonComponent,
    MissingLettersComponent,
    LevelSelectComponent,
    WordToPictureComponent,
    LevelHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
