import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession, restrictedWords } from '../shared/index';

@Component({
    selector: 'create-session',
    templateUrl: 'app/events/event-details/create-session.component.html',
    styles: [`
    em { float: right; color: #E05C65; padding-left: 10px; }
    .error input { background-color: #E3C3C5; }
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :-ms-input-placeholder { color: #999; }
    `],
})
export class CreateSessionComponent implements OnInit {
    @Output() public saveNewSession = new EventEmitter();
    @Output() public cancelAddSession = new EventEmitter();

    public newSessionForm: FormGroup;
    public abstract: FormControl;
    public level: FormControl;
    public duration: FormControl;
    public presenter: FormControl;
    public name: FormControl;

    public ngOnInit(): void {
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [ Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar']) ]);

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract,
        });
    }

    public saveSession(formValues) {
        const session: ISession = {
            id: undefined,
            name: formValues.name,
            duration: +formValues.duration,
            level: formValues.level,
            presenter: formValues.presenter,
            abstract: formValues.abstract,
            voters: [],
        };
        this.saveNewSession.emit(session);
    }

    public cancel() {
        this.cancelAddSession.emit();
    }
}
