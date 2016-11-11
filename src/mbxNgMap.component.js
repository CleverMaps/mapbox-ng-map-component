(function() {
    'use strict';

    angular
        .module('mapbox-ng-map-component')
        .component('mbxNgMap', {
            controller: 'MbxNgMapCtrl',
            bindings: {
                options: '<mbxNgOptions'
            }
        });
})();
