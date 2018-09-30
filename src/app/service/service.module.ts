import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {UserService} from "./users.service"
import { UtilityService } from "../service/utility.service";
import { ToPostService } from "../service/ToPost.Service";
import {DefaultTreeviewI18n} from "./TreeviewI18n"

import { SharedModule } from '../components/shared.module';
import { ModalConfirmPage,ModalLoadingPage } from "../components/modals";
const SERVICES = [
    UtilityService,
    UserService,
    ToPostService,
    DefaultTreeviewI18n,
];

@NgModule({
    declarations: [
    ],
    entryComponents: [
        ModalConfirmPage,
        ModalLoadingPage
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        SharedModule.forRoot()
    ],
    providers: [
        ...SERVICES,
    ],
})
export class ServiceModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
            ngModule: ServiceModule,
            providers: [
                ...SERVICES,
            ],
        };
    }
}
