/*eslint-disable*/
import {Http, HttpModule, BaseRequestOptions, Response, RequestOptions, XHRBackend, ResponseOptions, RequestMethod} from '@angular/http';
import {TestBed, inject, getTestBed, async} from '@angular/core/testing';
import {HelloApiService} from '../hello/hello-api.service';
let Pact = require('pact-web')

describe("Pact consumer test", () => {

    let provider;


    beforeAll(function(done) {
//      client = example.createClient('http://localhost:1234')
      provider = Pact({ consumer: 'hello-client', provider: 'hello-service', web: true })

      // required for slower Travis CI environment
      setTimeout(function () { done() }, 2000)

      // Required if run with `singleRun: false`
      provider.removeInteractions()
    })

    afterAll(function (done) {
      provider.finalize()
        .then(function () { done() }, function (err) { done.fail(err) })
    })

    let service;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
          providers: [
            HelloApiService
          ]
      });
      const testbed = getTestBed();
        service = testbed.get(HelloApiService);
    });

    describe("sayHello", () => {
      beforeAll(function (done) {
        provider.addInteraction({
          uponReceiving: 'a request for say hello',
          withRequest: {
            method: 'GET',
            path: '/hello-service/api',
            query: 'name=Chris'
          },
          willRespondWith: {
            status: 200,
            headers: { "Content-Type": "application/json" },
            body: 'Hello Chris!'
          }
        })
        .then(function () { done() }, function (err) { done.fail(err) })
      })

      it("should say hello", function(done) {
        //Run the tests
        service.sayHello('Chris')
          .subscribe(res => {
            expect(res).toEqual('Hello Chris!')
            done()
          },
          err => {

          done.fail(err)
        })
      });

      // verify with Pact, and reset expectations
      it('successfully verifies', function(done) {
        provider.verify()
          .then(function(a) {
            done()
          }, function(e) {
            done.fail(e)
          })
      })
    })
  })
