(function() {
  "use strict";

  angular
    .module("ngClassifieds")
    .directive("classifiedCard", function() {
      return {
        templateUrl: "components/classifieds/card/classified-card.tpl.html",
        scope: {
          classifieds: "=classifieds",
          classifiedsFilter: "=classifiedsFilter",
          category: "=categoryFilter"
        },
        controller: classifiedCardController,
        controllerAs: "vm"
      }

      function classifiedCardController($state, $scope, $mdDialog, $mdToast) {
        var vm = this;
        vm.editClassified = editClassified;
        vm.deleteClassified = deleteClassified;

        function editClassified(classified) {
          vm.editing = "true";
          vm.sidebarTitle = 'Edit Classified';
          $state.go('classifieds.edit', {
            id: classified.$id
          });
        }

        function deleteClassified(event, classified) {
          var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete ' + classified.title + '?')
            .ok('Yes')
            .cancel('No')
            .targetEvent(event)

          $mdDialog.show(confirm).then(function() {
            $scope.classifieds.$remove(classified);
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
      }
    })
})();
