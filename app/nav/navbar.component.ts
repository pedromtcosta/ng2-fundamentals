import { Component, OnInit } from "@angular/core";
import { AuthService } from "../user/auth.service";
import { ISession, EventService, IEvent } from "../events/index";


@Component({
    selector: 'nav-bar',
    templateUrl: 'app/nav/navbar.component.html',
    styles: [`
        .nav.navbar-nav { font-size: 15px; }
        #searchForm { margin-right: 100px; }
        @media (max-width: 1200px) { #searchForm { display: none; } }
        li > a.active { color: #F97924; }
    `]
})
export class NavBarComponent implements OnInit {
    searchTerm: string = ""
    foundSessions: ISession[]
    events: IEvent[]
    loadingEvents: boolean;

    constructor(private auth: AuthService,
                private eventService: EventService) {}

    searchSessions(searchTerm) {
        this.eventService
                .searchSessions(searchTerm)
                .subscribe(sessions => {
                    this.foundSessions = sessions;
                });
    }

    ngOnInit() {
        this.loadingEvents = true;
        this.eventService.getEvents().subscribe(events => this.events = events);
        this.loadingEvents = false;
    }
}