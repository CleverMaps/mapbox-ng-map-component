(function() {
    'use strict';

    angular
        .module('mapbox-ng-map-component')
        .controller('MbxNgMapCtrl', MbxNgMapCtrl);

    MbxNgMapCtrl.$inject = [
        'mbxNgMapService',
        'mbxNgDefaults',
        'mbxNgHelpers',
        '$attrs'
    ];

    function MbxNgMapCtrl(mbxNgMapService, mbxNgDefaults, mbxNgHelpers, $attrs) {
        var id = mbxNgHelpers.getMapId({}, $attrs.id);

        this.options.container = id;
        var mapDefaults = mbxNgDefaults.setMapDefaults(this.options, id);
        var map = new mapboxgl.Map(mapDefaults);

        // Resolve the map object to the promises
        map.on('load', function() {
            mbxNgMapService.setMap(map, id);
        });

        this.$onDestroy = function() {
            map.remove();
            mbxNgMapService.unresolveMap(id);
        };
    }
})();
