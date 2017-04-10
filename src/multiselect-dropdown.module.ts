import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MultiselectDropdown} from './multiselect-dropdown';
import {MultiselectDropdownConfig} from './multiselect-config';
import {MultiselectSearchPipe} from './multiselect-search.pipe';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule, FormsModule, TranslateModule],
    exports: [MultiselectDropdown, MultiselectSearchPipe],
    declarations: [MultiselectDropdown, MultiselectSearchPipe],
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
