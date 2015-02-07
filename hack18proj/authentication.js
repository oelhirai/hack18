      // Enter a client ID for a web application from the Google Developer Console.
      // The provided clientId will only work if the sample is run directly from
      // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
      // In your Developer Console project, add a JavaScript origin that corresponds to the domain
      // where you will be running the script.
      var clientId = '592070593741-v7btq920h2jnomg72os2ghlklgi7n3lt.apps.googleusercontent.com';
      // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
      // requests in the code.
      // The provided key works for this sample only when run from
      // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
      // To use in your own application, replace this API key with your own.
      var apiKey = 'AIzaSyAacSydWx5BBEZ1jzbodr7HnbMQtYuifk4';
      // To enter one or more authentication scopes, refer to the documentation for the API.
      var scopes = 'https://www.googleapis.com/auth/calendar';
      // Use a button to handle authentication the first time.
      function handleClientLoad() {
        console.log("whatever yo!");
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth,1);
      }
      function checkAuth() {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
      }
      function handleAuthResult(authResult) {
        var authorizeButton = document.getElementById('authorize-button');
        if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          console.log("whatever yo!");
          makeApiCall();
        } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
      }
      function handleAuthClick(event) {
        gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
        return false;
      }
      // Load the API and make an API call.  Display the results on the screen.
      function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
          var request = gapi.client.calendar.events.list({
            'calendarId': 'tartanhack18@gmail.com'
          });
          request.execute(function(resp) {
           console.log(resp);
           for (var i = 0; i < resp.items.length; i++) {
             var title = document.createTextNode(resp.items[i].summary); 
             var description = document.createTextNode(resp.items[i].description + ' ');
             var location = document.createTextNode(resp.items[i].location + ' ');
             var date = document.createTextNode('Start: ' + resp.items[i].start.date + ' End: ' + resp.items[i].end.date);

             var div = document.createElement('div');
             var h1 = document.createElement('h1');
             h1.appendChild(title);
             div.appendChild(location);
             div.appendChild(description);
             div.appendChild(h1);
             var p = document.createElement('p');
             p.appendChild(date);
             div.appendChild(p);
             document.body.appendChild(h1);
             document.body.appendChild(div);
           }
         });
        });
    }