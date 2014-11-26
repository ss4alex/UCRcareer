angular.module('huntEdu.controllers')
    .controller('ApplicantProfileCtrl', ['$scope', 'User', '$location',
    function ApplicantProfileCtrl($scope, User, $location) {
    $scope.showApplicant = function() {
        return User.isApplicant();
    };

    $scope.updateApplicant = function() {
        $location.path('/updateApplicantProfile');
    };

    $scope.$on('$viewContentLoaded', function() {
        if(User.isApplicant()){
            var role = User.getUserRole();
            $scope.applicantProfileData = User.getProfileData(role);
    	    $scope.showResume = User.hasResume();
        }
        else {
            $location.path('/');
        }
    });
}]);