import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../shared/event.service';
import { IEvent } from '../shared/index';
import { ISession } from '../shared/index';

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left: 20px; padding-right: 20px; }
        .event-image { height: 100px; }
        a { cursor: pointer; }
    `],
})
export class EventDetailsComponent implements OnInit {
    public event: IEvent;
    public addMode: boolean;
    public filterBy: string = 'all';
    public sortBy: string = 'votes';
    
    constructor(private eventService: EventService,
                private route: ActivatedRoute) {
        
    }

    public ngOnInit(): void {
        this.route.data.forEach((data) => {
            this.event = data.event;
            this.addMode = false;
        });
    }

    public addSession() {
        this.addMode = true;
    }

    public saveNewSession(session: ISession) {
        const nextId = Math.max.apply(null, this.event.sessions.map((s) => s.id));
        session.id = nextId + 1;
        this.event.sessions.push(session);
        this.eventService.saveEvent(this.event).subscribe();
        this.addMode = false;
    }

    public cancelAddSession() {
        this.addMode = false;
    }
}
