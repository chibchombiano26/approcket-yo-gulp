'use strict';

describe('The Memory state', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html#/memory');
  });

 it('should be 4 cards ath the begining', function () {
    browser.driver.manage().timeouts().implicitlyWait(10000);
    browser.driver.findElements(by.css('card')).
        then(function(elems) {
            expect(elems.length).toEqual(4);
        }
    );
  });

});
