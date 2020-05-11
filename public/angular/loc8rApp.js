angular.module('loc8rApp', []);

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

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl);
