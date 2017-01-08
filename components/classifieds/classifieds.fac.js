(function() {
  "use strict";

  angular
    .module("ngClassifieds")
    .factory("classifiedsFactory", function($http, $firebaseArray) {
      var ref = firebase.database().ref();

      return {
        ref: $firebaseArray(ref)
      }
    });
})();
