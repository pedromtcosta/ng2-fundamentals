import { Injectable } from "@angular/core";
import { ISession } from "../shared/event.model";
import { RequestOptions, Headers, Response, Http } from "@angular/http";
import { Observable } from "rxjs/Rx";

@Injectable()
export class VoterService {
    constructor(private http: Http) {}

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(v => v !== voterName);

        this.http.delete(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`).catch(this.handleError).subscribe();
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({headers: headers});

        let url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
        this.http.post(url, JSON.stringify({}), options).catch(this.handleError).subscribe();
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(v => v === voterName);
    }

    private handleError(error: Response) {
        return Observable.throw(error.status);
    }
}