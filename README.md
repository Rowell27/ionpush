# IonPush Documentation

## Set-up and Procedures:
- Clone this repository
- Install needed modules and plugins using this command : 

  `npm install`
- Add platforms:

   `ionic platform add android or ionic platform add ios`
- In `app.module.ts`, change `app_id` to your Ionic App ID. Change `sender_id` to your SENDER_ID (in Firebase Cloud Messaging)
- In `home.ts`, change `token` to your Ionic Cloud App created `API Token` (create one from your App's Settings> API Tokens)  

### Authenticating Request:
- Add Headers to  authorize request

```node
let headers: Headers = new Headers({ 
      "Content-Type" : "application/json", 
      "Authorization" : "Bearer " + API_TOKEN
    });
let options = new RequestOptions({ "headers" : headers })
```
(where `API_TOKEN` is the API Token of your Ionic Cloud App)

### Sending Push Notification using API
- To send push notification to registered devices:
```node
this.http.post("https://api.ionic.io/push/notifications", data , options)
            .subscribe();
```
(where `data` is the JSON body object and `options` is the RequestOptions Argument)
