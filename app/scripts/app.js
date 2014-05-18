(function(angular){
	'use strict';

	var confirm = this.confirm,
		hds = this.H.DataStore,
		resultsLog = [],
		log = function(d){
			console.log(d);
			resultsLog.push(d);
		};

	angular.module('HttpDataStoreTester', [])
	.constant('storeUrl', 'http://h-httpstore.azurewebsites.net/')
	.factory('store', ['storeUrl', function(storeUrl){
		return new hds.Store('HttpDataStoreTester', storeUrl);
	}])
	.controller('TesterCtrl', ['$scope', 'store', function($scope, store){
		$scope.createEntity = function(){
			$scope.newEntity = new hds.Entity({});
		};
		$scope.storeEntity = function(){
			store.Save($scope.newEntity).then(function(result){
				$scope.newEntity = null;
				log(result);
			});
		};
		$scope.delete = function(entityId){
			if(!confirm('Are you sure you want to remove the selected entity?')){
				return;
			}
			store.Delete(entityId).then($scope.refreshBlotter);
		};
		$scope.refreshBlotter = function(){
			store.QueryMeta(hds.queryWithAnd()).then(function(result){
				$scope.entities = result.data;
				log(result);
				$scope.$apply();
			});
		};

		$scope.refreshBlotter();
		$scope.entity = {"Name": "Hintee"};
		$scope.log = resultsLog;
	}]);


}).call(this, this.angular);