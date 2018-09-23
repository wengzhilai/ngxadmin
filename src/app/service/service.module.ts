import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilityService } from './utility.service';
import { UserService } from './users.service'


const SERVICES = [
    UtilityService,
    UserService,
];

@NgModule({
    declarations: [
    ],
    entryComponents: [
    ],
    exports: [
    ],
    imports: [
        CommonModule,
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
