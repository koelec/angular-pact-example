import { AngularPactExamplePage } from './app.po';

describe('angular-pact-example App', () => {
  let page: AngularPactExamplePage;

  beforeEach(() => {
    page = new AngularPactExamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
