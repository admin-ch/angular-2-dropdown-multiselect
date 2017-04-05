import {Injectable} from '@angular/core';

@Injectable()
export class MultiselectDropdownConfig {
    autoUnselect = false;
    buttonClasses = 'btn btn-secondary';
    checkedStyle: CheckedStyle = 'checkboxes';
    closeOnSelect = false;
    displayAllSelectedText = false;
    dynamicTitleMaxItems = 3;
    enableSearch = false;
    maxHeight = '300px';
    pullRight = false;
    selectionLimit = 0;
    showCheckAll = false;
    showUncheckAll = false;
}

export type CheckedStyle =  'checkboxes' | 'glyphicon' | 'fontawesome';
