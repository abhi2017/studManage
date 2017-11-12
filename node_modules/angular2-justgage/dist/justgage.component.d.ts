import { ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
export declare class JustgageComponent implements OnInit, OnChanges {
    private elementRef;
    justgage: any;
    options: any;
    value: number;
    max: number;
    constructor(elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private create();
}
