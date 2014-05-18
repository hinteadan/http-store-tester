(function(angular){
	'use strict';

	var hds = this.H.DataStore,
		log = this.console.log;

	angular.module('HttpDataStoreTester', [])
	.constant('storeUrl', 'http://h-httpstore.azurewebsites.net/')
	.factory('store', ['storeUrl', function(storeUrl){
		return new hds.Store('HttpDataStoreTester', storeUrl);
	}])
	.controller('TesterCtrl', ['$scope', 'store', function($scope, store){
		store.QueryMeta(hds.queryWithOr()).then(log);
		$scope.entity = {"Name": "Hintee"};
	}]);


}).call(this, this.angular);