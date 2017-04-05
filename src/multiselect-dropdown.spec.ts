import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {MultiselectDropdown} from './multiselect-dropdown';
import {FormsModule} from '@angular/forms';
import {Pipe, PipeTransform} from "@angular/core";
import {MultiselectDropdownConfig} from "./multiselect-config";

describe('MultiselectDropdown', () => {
    let fixture: ComponentFixture<MultiselectDropdown>;
    let component: MultiselectDropdown;

    //TODO: async not working
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiselectDropdown, MockSearchPipe],
            imports: [FormsModule],
            providers: [
                MultiselectDropdownConfig
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiselectDropdown);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Pipe({
    name: 'searchFilter'
})
class MockSearchPipe implements PipeTransform {
    transform(value: any, args: any): any {
        return value;
    }
}
