define([
 './hello-world-model',
 './fake-server'
],
function (Model, server) {
  server.autoRespond = true;
  server.autoRespondAfter = 3000;

  var model = new Model();

  model.fetch()
    .done(function () {
      document.getElementById('id-hello-world').innerHTML = '<h1>' + model.helloWorld() + '</h1>';
    })
    .fail(function () {
      console.log(arguments);
    });
});
