import { Angular4TemplatePage } from './app.po';

describe('angular4-template App', () => {
  let page: Angular4TemplatePage;

  beforeEach(() => {
    page = new Angular4TemplatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
