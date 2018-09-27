import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmPage } from "./modals/confirm";
import { ModalLoadingPage } from "./modals/loading";
import { ThemeModule } from '../@theme/theme.module';
import { SmartTableFormatValuePage } from "./SmartTable/formatValue";
import { TooltipModule } from 'ngx-bootstrap';
import { TreeviewModule } from 'ngx-treeview';
import { TreeviewSelectComponent } from "./TreeviewSelect/treeview-select.component";
import { EditComponent } from "./edit/edit.component";
import { PipeModule } from "../pipe/pipe.module";
@NgModule({
    declarations: [
        ModalConfirmPage,
        SmartTableFormatValuePage,
        ModalLoadingPage,
        TreeviewSelectComponent,
        EditComponent,
    ],
    imports: [
        CommonModule,
        ThemeModule,
        PipeModule,
        TooltipModule.forRoot(),
        TreeviewModule.forRoot(),
    ],
    exports: [
        CommonModule,
        ModalConfirmPage,
        ModalLoadingPage,
        SmartTableFormatValuePage,
        TreeviewSelectComponent,
        EditComponent,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule
      };
    }
}
