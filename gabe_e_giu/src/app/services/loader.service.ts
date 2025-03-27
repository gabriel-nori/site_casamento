import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class Loader {
    constructor() {}
    public is_loading: boolean = false
}