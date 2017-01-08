(function() {

  "use strict";

  angular
    .module("ngClassifieds")
    .controller("classifiedsController", function($scope, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

      var vm = this;

      vm.categories;
      vm.classified;
      vm.classifieds;
      vm.closeSidebar = closeSidebar;
      vm.deleteClassified = deleteClassified;
      vm.editing;
      vm.editClassified = editClassified;
      vm.openSidebar = openSidebar;
      vm.saveEdit = saveEdit;
      vm.saveClassified = saveClassified;

      vm.classifieds = classifiedsFactory.ref;
      vm.classifieds.$loaded().then(function(classifieds) {
        vm.categories = getCategories(classifieds)
      })

      $scope.$on('newClassified', function(event, classified) {
        vm.classifieds.$add(classified);
        showToast('Classified Saved');
      })

      $scope.$on('editSaved', function(event, message) {
        showToast(message)
      })

      var contact = {
        name: "Mark Morris",
        phone: "970-222-1234",
        email: "test@example.com"
      }

      function openSidebar() {
        $state.go('classifieds.new');
      }

      function closeSidebar() {
        $mdSidenav('left').close();
      }


      function saveClassified(classified) {
        if(classified) {
          classified.contact = contact;
          vm.classifieds.push(classified);

          // clear the existing classified
          vm.classified = {};

          // ..and close the Sidebar
          closeSidebar();
          showToast("Classified Saved!");
        }
      }

      function editClassified(classified) {
        $state.go('classifieds.edit', {
          id: classified.$id
        });
      }

      function saveEdit(classified) {
        vm.editing = false;
        vm.classified = {};
        closeSidebar();
        showToast("Edit Saved!");
      }

      function deleteClassified(event, classified) {
        var confirm = $mdDialog.confirm()
          .title('Are you sure you want to delete ' + classified.title + '?')
          .ok('Yes')
          .cancel('No')
          .targetEvent(event)

        $mdDialog.show(confirm).then(function() {
          vm.classifieds.$remove(classified);
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
