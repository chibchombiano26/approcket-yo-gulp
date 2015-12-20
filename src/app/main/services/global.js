/*global angular*/
angular.module('cards').
factory('global', function(){
   
    var dataFactory = {};
   
    dataFactory.currentSessionOpen = false;
    dataFactory.previousCard = null;
    dataFactory.numPairs = 0;
    
   return dataFactory;
    
});