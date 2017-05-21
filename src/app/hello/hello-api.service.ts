import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class HelloApiService {

  constructor(private http: Http) {
  }

  sayHello(name: string): Observable<string> {
    return this.http.get('/hello-service/api?name=' + name)
    .map ((res: Response) => res.text());
  }
}
