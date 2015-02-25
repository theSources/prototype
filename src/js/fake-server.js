define([
],
function () {
  var ok = 200;
  var headers = {'Content-Type': 'application/json'};
  var server = sinon.fakeServer.create();

  server.respondWith('GET', '/hello-world', [ ok, headers, JSON.stringify({'hello-world': 'Hello World'})]);

  return server;
});
