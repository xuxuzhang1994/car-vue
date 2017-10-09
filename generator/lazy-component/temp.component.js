import template from './<%= fileName %>.html';
import controller from './<%= fileName %>.controller';
import './<%= fileName %>.styl';

let <%= name %>Component = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'ctrl'
};

export default <%= name %>Component;

export function directive() {
  "ngInject";
  return {
    restrict: 'E',
    template:template,
    controller:controller,
    controllerAs: 'ctrl'
  };
}
