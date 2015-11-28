app.controller('HomeController', function($scope) {
  
	$scope.originalImageSrc = "kyoto.jpg";
	$scope.currentImageSrc = $scope.originalImageSrc;
	$scope.imageId = "editable-image";

	$scope.featherEditor = new Aviary.Feather({
        apiKey: '<YOUR_KEY_HERE>',
        onSave: function(imageID, newURL) {
            $scope.currentImageSrc = newURL;
            $scope.featherEditor.close();
            $scope.$digest();
            console.log(newURL);
        },
        onError: function(errorObj) {
            console.log(errorObj.code);
            console.log(errorObj.message);
            console.log(errorObj.args);
        }
    });

	$scope.launchEditor = function() {

		var terms = /^https?:///;
		var isUrl = $scope.currentImageSrc.match(terms);

		if (isUrl) {
			$scope.featherEditor.launch({
				image: $scope.imageId,
				url: $scope.currentImageSrc
			});
		}
		else {
			$scope.featherEditor.launch({
				image: $scope.imageId
			})
		}
	}

	$scope.resetImage = function() {
		console.log('yep');

		if ($scope.currentImageSrc === $scope.originalImageSrc) {
			alert("Nothing to reset.");
		}
		else {
			$scope.currentImageSrc = $scope.originalImageSrc;
		}
	}

});