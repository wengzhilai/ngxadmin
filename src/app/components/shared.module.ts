import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmPage } from "./modals/confirm";
import { ModalLoadingPage } from "./modals/loading";
import { ThemeModule } from '../@theme/theme.module';
import { SmartTableFormatValuePage } from "./SmartTable/formatValue";
import { TooltipModule } from 'ngx-bootstrap';
import { TreeviewModule } from 'ngx-treeview';
import { TreeviewSelectComponent } from "./TreeviewSelect/treeview-select.component";

@NgModule({
    declarations: [
        ModalConfirmPage,
        SmartTableFormatValuePage,
        ModalLoadingPage,
        TreeviewSelectComponent,
    ],
    imports: [
        CommonModule,
        ThemeModule,
        TooltipModule.forRoot(),
        TreeviewModule.forRoot(),
    ],
    exports: [
        CommonModule,
        ModalConfirmPage,
        ModalLoadingPage,
        SmartTableFormatValuePage,
        TreeviewSelectComponent,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule
      };
    }
}
