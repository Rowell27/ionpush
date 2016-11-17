# IonPush Documentation

## Set-up and Procedures:
- Clone this repository
- Install needed modules and plugins using this command : 

  `npm install`


### Sending Push Notification using API:
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


