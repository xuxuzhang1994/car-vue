import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ocLazyLoad from 'oclazyload';

let <%= name %>Module = angular.module('<%= name %>', [
  uiRouter,
  ocLazyLoad
])

.config(($stateProvider) => {
    "ngInject";

    $stateProvider
        .state('c.<%= name %>', {
            url: '<%= modulePath %>/<%= fileName %>',
            template: '<<%= fileName %>></<%= fileName %>>',
            // Lazy load this component
            resolve: {
              // 如果使用 angular-animate，需要加入 $$animateJs 依赖
              loadComponent: ($q, $ocLazyLoad, $myHelper) => {
                "ngInject";

                var deferred = $q.defer();

                // Webpack will define a code-split point for all requires in this callback
                // This will effectively bundle this entire module into a single file
                // that only gets downloaded when this state is transitioned to
                require.ensure([], function(require) {

                  try {
                    // Require our modules
                    // This replaces the `import` statements from above
                    //let something = require('./<%= name %>.something');
                    // .. any other dependencies
                    let component = require('./<%= fileName %>.component');

                    // Inject all dependencies into our module
                    // This replaces adding them to the original angular.module dependency array
                    $ocLazyLoad.inject([
                                         //something.name
                                         // .. any other dependencies
                                       ])

                      // Register the component so the template recognizes it
                      .then(() => {
                        try {
                          console.log('lazy load [<%= name %>] module resources');
                          $myHelper.directive('<%= name %>', component.directive);
                        } catch (e) {
                          location.reload(true);
                        }
                      }, function () {
                        console.log("[<%= name %>] module inject error")
                      })

                      // Continue the state transition
                      .then(deferred.resolve);
                  } catch (e) {
                    location.reload(true);
                  }

                }, '<%= name %>'); // Name our bundle so it shows up pretty in the network tab

                return deferred.promise
              }
            }
        });
});


export default <%= name %>Module;
