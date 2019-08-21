import { Injectable } from "@angular/core";
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';




@Injectable()
export class TagsService{
    constructor(private apiService: ApiService) { }

    getAll(): Observable<[string]> {
    return this.apiService.get('/tags').pipe(map(data => data.tags));
    }
}