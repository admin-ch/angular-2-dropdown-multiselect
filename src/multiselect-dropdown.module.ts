import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MultiselectDropdown, MultiSelectSearchFilter} from './multiselect-dropdown';
import {MultiselectDropdownConfig} from './multiselect-config';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [MultiselectDropdown, MultiSelectSearchFilter],
    declarations: [MultiselectDropdown, MultiSelectSearchFilter],
})
export class MultiselectDropdownModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MultiselectDropdownModule,
            providers: [
                MultiselectDropdownConfig
            ]
        };
    }
}
