(function() {
  'use strict';

  angular
    .module('workspace')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      
      .state('memory', {
        url: '/memory',
        templateUrl: 'app/main/views/game.html',
        controller: 'gameController',
        controllerAs: 'game'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
