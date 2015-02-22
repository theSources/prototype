define([
  './hello',
 './world'
],
function (hello, world) {
  document.getElementById('id-hello-world').innerHTML = '<h1>' + hello + ' ' + world + '</h1>';
});
