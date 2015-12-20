/*global angular*/
angular.module('cards').
service('utilService', function(){
    
    var dataFactory = {};
    
    // used to remove something form an array by index
    dataFactory.removeByIndex = function(arr, index) {
        arr.splice(index, 1);
    }
    
    dataFactory.insertByIndex= function (arr, index, item) {
    	arr.splice(index, 0, item);
    }
    
    return dataFactory;
});