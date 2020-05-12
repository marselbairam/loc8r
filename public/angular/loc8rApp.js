angular.module('loc8rApp', []);

var _isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var formatDistance = function() {
  return function(distance) {
    var numDistance, unit;
    if (distance && _isNumeric(distance)) {
      if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
      } else {
        numDistance = parseInt(distance * 1000, 10);
        unit = 'm';
      }
      return numDistance + unit;
    } else {
      return '?';
    }
  };
};

var locationListCtrl = function($scope) {
  $scope.data = {
    locations: [{
      name: 'Cafe Hero',
      address: '434 High Street, Reading, RG5 1PS',
      rating: 4,
      facilities: ['Hot drinks', 'Premium wifi+'],
      distance: '0.04419595281228691',
      _id: '5eb27eb453bd0261bba69c90'
    }, {
      name: 'Ninja Cafe',
      address: '1131 N 121th St, Reading, PA 55555',
      rating: 4,
      facilities: ['Premium wifi'],
      distance: '2.1294723944064593',
      _id: '5eb43d22102f330ecac0b203'
    }]
  };
};

var ratingStars = function() {
  return {
    scope: {
      thisRating: '=rating'
    },
    templateUrl: '/angular/rating-stars.html'
  };
};

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars);
