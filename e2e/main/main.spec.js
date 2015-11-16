'use strict';

// main page
describe('Main page', function() {
  it('should have a title "web base"', function() {
    expect(browser.getTitle()).toEqual('Web base');
  });
});