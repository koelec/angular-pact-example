import {Observable} from 'rxjs/Rx';
import {HelloApiService} from './hello-api.service';
import { Response, ResponseOptions } from '@angular/http';


class StubService {
  get(url: string) {
    const name = url.substring(url.indexOf('?name=') + 6);
    const options = new ResponseOptions({
      body: 'Hello ' + name + '!'
    });
    const res = new Response(options);

    return Observable.of(res);
  }
}

describe('Hello Api Service', () => {
  let testService: HelloApiService;

  const stubService = new StubService();
  beforeEach(() => {
    testService = new HelloApiService(<any>stubService);
  });

  it('should say hello', () => {
    testService.sayHello('Chris').subscribe((res: string) => {
      expect(res).toEqual('Hello Chris!');
    });
  });
});
