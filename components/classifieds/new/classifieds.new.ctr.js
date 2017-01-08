(function() {
  "use strict";

  angular
    .module('ngClassifieds')
    .controller('newClassifiedsController', function($mdSidenav, $timeout, $state, $scope, $mdDialog, classifiedsFactory) {

      var vm = this;

      vm.closeSidebar = closeSidebar;
      vm.saveClassified = saveClassified;

      $scope.$watch('vm.sidenavOpen', function(sidenavOpen) {
        if(sidenavOpen === false) {
          $mdSidenav('left')
            .close()
            .then(function() {
              $state.go('classifieds');
            });
        }
      });

      $timeout(function() {
        $mdSidenav('left').open();
      });

      function closeSidebar() {
        vm.sidenavOpen = false;
      }

      function saveClassified(classified) {
        if(classified) {
          classified.contact = {
            name: "Mark Morris",
            phone: "970-222-1234",
            email: "test@example.com"
          }

          $scope.$emit('newClassified', classified)
          vm.sidenavOpen = false;
        }

      }

    })
})();
