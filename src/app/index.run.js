(function() {
  'use strict';

  angular
    .module('workspace')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
