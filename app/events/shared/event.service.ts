import { EventEmitter, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IEvent, ISession } from './event.model';

@Injectable()
export class EventService {
  constructor(private http: Http) { }

  public getEvents(): Observable<IEvent[]> {
    return this.http.get('/api/events').map((response: Response) => {
      return response.json() as IEvent[];
    }).catch(this.handleError);
  }

  public getEvent(id: number): Observable<IEvent> {
    return this.http.get('/api/events/' + id).map((response: Response) => {
      return response.json() as IEvent;
    }).catch(this.handleError);
  }

  public saveEvent(event: IEvent): Observable<IEvent> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({headers});

    return this.http.post('/api/events', event, options).map((r) => r.json()).catch(this.handleError);
  }

  public searchSessions(searchTerm: string) {
    return this.http.get('/api/sessions/search?search=' + searchTerm).map((response: Response) => {
      return response.json();
    }).catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
