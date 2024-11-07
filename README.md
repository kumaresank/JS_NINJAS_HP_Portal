# Notes
- What happens if the doctor is also a patient?

# Api endpoints


## Std error response
```javascript
{
    "errorCode": "<errorCode>",
    "errorMessage": "User friendly error message",
    "data"?: {}  // specific to the api
}
```


## Login
- Endpoint -> `/login`
- Method -> `POST`
- Request
```json
{
    "email": "rahul@gmail.com",
    "password": "mypass"
}
```
- Response
```javascript
{

    "token": "JWT Token"
}
```

## Signup
- Endpoint -> `/signup`
- Method -> `POST`
- Request
```javascript
{
    "fullName": "Rahul Badenkal",
    "email": "rahulbadenkal@gmail.com",
    "password": "mypass"
    "role": "doctor" | "patient"
}
```
- Response
```javascript
{

    "token": "JWT Token"
}
```

## Profile
- Endpoint -> `/profile`
- Request 
```javascript
{
    "userId": "1"
}
```
- Response 
```javascript
{
    "fullName": "heyo"
}
```

## Patients Appointments
- Endpoint -> `/appointmets`
- Request
```javascript
```
- 

