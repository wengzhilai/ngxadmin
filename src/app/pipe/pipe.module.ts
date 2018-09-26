import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFilterPipe } from './json-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [JsonFilterPipe],
  exports: [
    JsonFilterPipe
  ]
})
export class PipeModule { }
