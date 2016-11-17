# IonPush Documentation

## Set-up and Procedures:
- Clone this repository
- Install needed modules and plugins using this command : 

  `npm install`
- Add platforms:

   `ionic platform add android or ionic platform add ios`
- In `app.module.ts`, change `app_id` to your Ionic App ID. Change `sender_id` to your SENDER_ID (in Firebase Cloud Messaging)

### Authenticating Request:
- Add these codes to  authorize request

```node
var options = {
  method: 'GET',
  url: 'https://api.ionic.io/push/notifications',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
    }
  };  request(options, (err, response, body) => {
    if (err) throw new Error(err);
    console.log(body);
  });
```
(where `token` is the API Token of Ionic Cloud App)

### Sending Push Notification using API

