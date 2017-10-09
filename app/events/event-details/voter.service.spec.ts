import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ISession } from '../shared/event.model';
import { VoterService } from './voter.service';

describe('VoterService', () => {
    let voterService: VoterService,
        mockHttp: jasmine.SpyObj<Http>;

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj<Http>('mockHttp', ['delete', 'post']);
        voterService = new VoterService(mockHttp);
    });

    describe('deleteVoter', () => {
        it('should remove the voter from the list of voters', () => {
            let session = { id: 6, voters: ['Joe', 'John'] };
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(3, session as ISession, 'Joe');

            expect(session.voters.length).toBe(1);
            expect(session.voters[0]).toBe('John');
        });

        it('should call http.delete with the right URL', () => {
            let session = { id: 6, voters: ['Joe', 'John'] };
            mockHttp.delete.and.returnValue(Observable.of(false));

            voterService.deleteVoter(3, session as ISession, 'Joe');

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Joe');
        });
    });

    describe('addVoter', () => {
        it('should call http.post with the right URL', () => {
            let session = { id: 6, voters: ['John'] };
            mockHttp.post.and.returnValue(Observable.of(false));

            voterService.addVoter(3, session as ISession, 'Joe');

            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Joe', '{}', jasmine.any(Object));
        });
    });
});
