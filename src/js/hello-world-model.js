define([
  'exoskeleton'
],
function (Exoskeleton) {
  var Model = Exoskeleton.Model.extend({
    urlRoot: '/hello-world',

    helloWorld: function () {
      return this.get('hello-world');
    }
  });

  return Model;
});
