"use strict";

app.controller("NewPinViewCtrl", function($scope, AuthFactory, PinFactory, $location, IdService){

	$scope.newPin = {
		title: "",
		imgURL: "",
		comments: "",
		uid: "",
		boardId: ""
	};

	$scope.addPin = function(){
		console.log(IdService.getBoardId());
		$scope.newPin.uid = AuthFactory.getUser();
		$scope.newPin.boardId = IdService.getBoardId()[0];
		PinFactory.postPinFB($scope.newPin)
		.then(function(){
			$location.url("/pins")
		})
	};

});