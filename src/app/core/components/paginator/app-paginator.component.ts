import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: 'app-paginator.component.html',
    styleUrls: ['app-paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {
    private _itemsCount: number;
    private _pageLength = 1;
    @Input('count')
    set count($event) {
        this._itemsCount = $event;
        this._setPagesCount();
    }
    @Input('pageLength')
    set pageLength($event) {
        this._pageLength = $event;
        this._setPagesCount();
    }
    @Output('paginate') private _paginateEvent: EventEmitter<object> = new EventEmitter<object>();
    public pages: Array<number> = [];
    public currentPage = 1;
    constructor() { }

    public ngOnInit(): void { }

    private _setPagesCount(): void {
        let pageCount: number = Math.floor(this._itemsCount / this._pageLength);
        if (this._itemsCount % this._pageLength > 0) {
            pageCount += 1;
        }
        else {
            this.pages = [];
        }
        for (let i = 0; i < pageCount; i++) {
            this.pages.push(i + 1);
        }
    }

    public onClickPervious(): void {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this._onPageChange(this.currentPage);
        }
    }

    public onClickNext(): void {
        if (this.currentPage < this.pages.length) {
            this.currentPage += 1;
            this._onPageChange(this.currentPage);
        }
    }

    public onClickPageNumber(index: number): void {
        if (index < this.pages.length) {
            this.currentPage = index + 1;
            this._onPageChange(this.currentPage);
        }
    }

    private _onPageChange(pageNumber: number): void {
        this._paginateEvent.emit({ pageNumber });
    }

    public ngOnDestroy(): void { }
}
