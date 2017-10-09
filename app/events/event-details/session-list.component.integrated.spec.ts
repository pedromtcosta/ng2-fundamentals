import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CollapsibleWellComponent } from '../../common/collapsible-well.component';
import { AuthService } from '../../user/auth.service';
import { DurationPipe } from '../index';
import { ISession } from '../shared/event.model';
import { SessionListComponent } from './session-list.component';
import { UpvoteComponent } from './upvote.component';
import { VoterService } from './voter.service';

describe('SessionListComponent', () => {
    let fixture: ComponentFixture<SessionListComponent>,
        component: SessionListComponent,
        element: HTMLElement,
        debugEl: DebugElement;

    beforeEach(async(() => {
        const mockAuthService = {};
        const mockVoterService = {};

        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                SessionListComponent,
                UpvoteComponent,
                DurationPipe,
                CollapsibleWellComponent,
            ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: VoterService, useValue: mockVoterService },
            ],
            schemas: [],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionListComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('initial display', () => {
        it('should have the correct session title', () => {
            component.sessions = [ {
                    id: 3, name: 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner',
                    abstract: 'abstract', voters: ['john', 'bob'],
                },
            ];
            component.filterBy = 'all';
            component.sortBy = 'name';
            component.eventId = 4;

            component.ngOnChanges();
            fixture.detectChanges();

            expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
            expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');
        });
    });
});
