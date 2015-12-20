/*global angular*/
angular.module('cards').
service('constantsService', function(){
   
   var rows = 3;
   var columns = 6;
   
   var dataFactory = {};
   
   // constant variables 
   dataFactory.constants = function() {
        
        if(dataFactory.rows){
            rows = parseInt(dataFactory.rows);
        }
        
        if(dataFactory.columns){
            columns = parseInt(dataFactory.columns);
        }
    };
    
    dataFactory.getRows = function() { return rows; };
    dataFactory.getColumns = function() { return columns; };
    dataFactory.getNumMatches = function() { 
        var item = (rows * columns) / 2;
        return  item; 
    };
    
   return dataFactory;
    
});