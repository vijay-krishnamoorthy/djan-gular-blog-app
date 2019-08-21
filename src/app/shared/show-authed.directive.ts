import { Directive, OnInit, TemplateRef, ViewContainerRef, Input } from "@angular/core";
import { UserService } from '../core';




@Directive({
    selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private userService: UserService,
        private viewContainer: ViewContainerRef,
    ) { }

    condition: Boolean;

    ngOnInit() {
        this.userService.isAuthenticated.subscribe(
            (isAuthenticated) => {
                if(isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }
        )
    }
    @Input() set appShowAuthed(condition: boolean) {
        this.condition = condition;
    }
}