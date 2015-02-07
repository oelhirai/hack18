// Enter a client ID for a web application from the Google Developer Console.
// The provided clientId will only work if the sample is run directly from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// In your Developer Console project, add a JavaScript origin that corresponds to the domain
// where you will be running the script.

// var clientId = '592070593741-v7btq920h2jnomg72os2ghlklgi7n3lt.apps.googleusercontent.com';
var clientId = '592070593741-7b1ou64p0sga7clnlc35gadg6rmcbnmb.apps.googleusercontent.com';

// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// var apiKey = 'AIzaSyAacSydWx5BBEZ1jzbodr7HnbMQtYuifk4';
var apiKey = 'AIzaSyAacSydWx5BBEZ1jzbodr7HnbMQtYuifk4';
// To enter one or more authentication scopes, refer to the documentation for the API.
var scopes = 'https://www.googleapis.com/auth/calendar';

// Use a button to handle authentication the first time.
function handleClientLoad() {
  document.text_field.addEventListener("keydown", function(e) {
      if (e.keyCode == 13) { makeApiCall(); }
  } , true);
  console.log("print one " + Math.random());
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  var textField = document.text_field;
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    console.log("print two " + Math.random());
    //document.getElementById('text_field').addEventListener("submit", makeApiCall);
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
      console.log("making api call")
      gapi.client.load('calendar', 'v3', function() {
      var user_text = document.getElementById('event').value;
      console.log(user_text.toString());
      var request = gapi.client.calendar.events.quickAdd({
      'calendarId': 'tartanhack18@gmail.com',
      'text' : user_text
    });
    request.execute(function(resp) {
    console.log(resp);
    document.getElementById('event').value = resp.htmlLink
   });
  });
}

function setValue() {
  document.getElementById('event').value = Math.random()
}

window.onload = function() {
document.addEventListener('DOMContentLoaded', setValue())
}