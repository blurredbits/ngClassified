(function() {

  "use strict";

  angular
    .module("ngClassifieds")
    .controller("classifiedsCtrl", function($scope, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

      classifiedsFactory.getClassifieds().then(function(classifieds) {
        $scope.classifieds = classifieds.data;
        $scope.categories = getCategories($scope.classifieds) || [];
      });

      var contact = {
        name: "Mark Morris",
        phone: "970-222-1234",
        email: "test@example.com"
      }

      $scope.openSidebar = function() {
        $mdSidenav('left').open();
      }

      $scope.closeSidebar = function() {
        $mdSidenav('left').close();
      }


      $scope.saveClassified = function(classified) {
        if(classified) {
          classified.contact = contact;
          $scope.classifieds.push(classified);

          // clear the existing classified
          $scope.classified = {};

          // ..and close the Sidebar
          $scope.closeSidebar();
          showToast("Classified Saved!");
        }
      }

      $scope.editClassified = function(classified) {
        $scope.editing = true;
        $scope.openSidebar();
        $scope.classified = classified;
      }

      $scope.saveEdit = function(classified) {
        $scope.editing = false;
        $scope.classified = {};
        $scope.closeSidebar();
        showToast("Edit Saved!");
      }

      $scope.deleteClassified = function(event, classified) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete ' + classified.title + '?')
          .ok('Yes')
          .cancel('No')
          .targetEvent(event)

        var index = $scope.classifieds.indexOf(classified);
        $mdDialog.show(confirm).then(function() {
          $scope.classifieds.splice(index, 1);
          showToast("Classified Deleted!");
        }, function() {
          showToast("Classified was NOT deleted!");
        })
      }

      function showToast(message) {
         $mdToast.show(
            $mdToast.simple()
              .content(message)
              .position("top, right")
              .hideDelay(3000)
          )
      }

      function getCategories(classifieds) {
        var categories = [];

        angular.forEach(classifieds, function(item) {
          angular.forEach(item.categories, function(category) {
            categories.push(category);
          });
        });
        return _.uniq(categories)
      }

    });
})();
