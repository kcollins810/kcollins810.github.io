console.log("Loaded");
function loginOk() {
  console.log("Ok");
  var event = new Event("okLogin", {status:'OK'});
  window.dispatchEvent(event);
}

function loginFailed() {
  console.log("Fail");
  var event = new Event("failLogin", {status:'Fail'});
  window.dispatchEvent(event);
}

function ready() {
  console.log("All Ready-------------.");
  var event = new Event("silverlightInit");
  window.dispatchEvent(event);
}
