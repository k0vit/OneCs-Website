(function(){
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var myScope = scope;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .sortable({
                    axis: 'y',
                    handle: ".glyphicon-align-justify",
                    start: function(event,ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function(event,ui) {
                        endIndex = ui.item.index();
                        console.log(startIndex, endIndex);
                        myScope.callback({start:startIndex, end:endIndex});
                    }
                });
        }
        return {
            scope: {
                callback: "&"
            },
            link: linker
        }
    }
})();