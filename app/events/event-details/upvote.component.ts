import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'upvote',
    template: `
    <div class="voting-widget-container pointable" (click)="onClick()">
        <div class="well voting-widget">
            <div class="voting-button">
                <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
            </div>
            <div class="badge badge-inverse voting-count">
                <div>{{ count }}</div>
            </div>
        </div>
    </div>
    `,
    styleUrls: ['/app/events/event-details/upvote.component.css'],
})
export class UpvoteComponent {
    @Input() public count: number;
    @Input() set voted(val) {
        this.iconColor = val ? 'red' : 'white';
    }
    @Output() public vote = new EventEmitter();
    public iconColor: string;

    public onClick() {
        this.vote.emit({});
    }
}
