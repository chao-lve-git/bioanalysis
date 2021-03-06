/**
 * Created by gaohuan on 2017/5/29.
 */
app.controller("loginCtrl", ["$state", "$rootScope", "$scope", "loginService", "$cookieStore",
    function ($state, $rootScope, $scope, loginService, $cookieStore) {
        var contentHeight = $(window).height();
        $("#login").height(contentHeight);
        $scope.accountEmpty = false;
        $scope.accountError = false;
        $scope.passwordEmpty = false;
        $scope.passwordError = false;
        $scope.user = $cookieStore.get("bioanalysisAccount") ? $cookieStore.get("bioanalysisAccount") : {};
        $scope.checkName = function () {
            $scope.accountError = false;
            $scope.passwordError = false;
            if ($scope.loginForm.accountName.$valid) {
                $scope.accountEmpty = false;
            } else {
                $scope.accountEmpty = true;
            }
        };
        $scope.checkPassword = function () {
            if ($scope.loginForm.accountPassword.$valid) {
                $scope.passwordEmpty = false;
            } else {
                $scope.passwordEmpty = true;
            }
        };
        $scope.submit = function () {
            if ($scope.loginForm.$valid) {
                if ($("#rememberMe")[0].checked) {
                    $cookieStore.put("bioanalysisAccount", {name: $scope.user.name, password: $scope.user.password});
                } else {
                    $cookieStore.put("bioanalysisAccount", {name: $scope.user.name, password: ""});
                }
                $scope.accountEmpty = false;
                $scope.passwordEmpty = false;
                loginService.login($scope.user).then(function (res) {
                    if (res) {
                        $rootScope.user = $scope.user;
                        $state.go('app.processAnalysis');
                    } else {
                        $scope.accountError = true;
                        $scope.passwordError = true;
                        $scope.user.password = '';
                    }
                });
            } else {
                if (!$scope.loginForm.accountName.$valid) {
                    $scope.accountEmpty = true;
                } else if (!$scope.loginForm.accountPassword.$valid) {
                    $scope.passwordEmpty = true;
                }
            }
        };
    }]);