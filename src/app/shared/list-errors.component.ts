import { Component, Input } from "@angular/core";
import { Errors } from '../core';

@Component({
    selector: 'app-list-errors',
    templateUrl: './list-errors.component.html'
})

export class ListErrorsComponent {
    formatedErrors: Array<string> = [];
    @Input() 
    set errors(errorList: Errors) {
        this.formatedErrors = Object.keys(errorList.errors || {})
        .map(key => `${key} ${errorList.errors[key]}`);
    }

    get errorList() {
        return this.formatedErrors;
    }
}