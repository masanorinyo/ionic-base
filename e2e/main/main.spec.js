'use strict';

// main page
describe('Main page', function() {
  it('should have a title "main"', function() {
    expect(browser.getTitle()).toEqual('main');
  });
});