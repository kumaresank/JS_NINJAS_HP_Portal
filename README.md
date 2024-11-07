# Notes
- What happens if the doctor is also a patient?

# Api endpoints


## Std error response
```javascript
{
    "status": 400, // http error code,
    "code": "<business_error_code>"  // business specific error code
    "message": "User friendly error message",  // error message to diplay to user
    "data"?: {}  // any data 
}
```


## Login
- Endpoint -> `/login`
- Method -> `POST`
- Request
```json
{
    "email": "user@gmail.com",
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
    "firstName": "Hello",
    "lastName": "User",
    "email": "user@gmail.com",
    "password": "mypass"
}
```
- Response
```javascript
{

    "token": "JWT Token",
    "firstName": "Hello",
    "lastName": "User",
    "email": "user@gmail.com",
}
```

## Profile
- Endpoint -> `/profile`
- Method -> `GET`
- Request 
```
- Response 
```javascript
{
    "fullName": "heyo"
    "email": "rahul@gmail.com",
    "role": "doctor" | "patient",
}

```

## Get doctors
- Endpoints -> `/doctors/`
- Method -> `GET`
- Response
```javascript
{
    "doctors": [
        {"id": string, "name": string}
    ]
}
```

## Update slots
- Endpoints -> `/slots/`
- Method -> `GET`
- Response
```javascript
{
    "doctors": [
        {"id": string, "name": string}
    ]
}
```

## Get doctor slots
- Endpoint -> `/slots/:doctorId`
- Method -> `GET`
- Request 
```javascript
{
    "date": "Date"
}

```
- Response 
```javascript
{
    "slots": str[]
}
```

## Create appointement
- Endpoint -> `/appointmets/create`
- Method -> `POST`
- Request 
```javascript
{
    "patientId": "1",
    "doctorId": "1",
    "date": "Date",
    "slot": "str"
    "reason": "str",
    "notes": "str"
}
```
- Response 
```javascript
{
    "id": "1",
    "patientId": "str",
    "doctorId": "str",
    "date": "str",
    "slot": "str",
    "reason": "str",
    "notes": "str"
}
```

## Patients Appointments
- Endpoint -> `patients/:patientId/appointmets`
- Method -> `GET`
- - param -> `patientId`
- Response
```javascript
[{
    "id": "1",
    "patientId": "str",
    "doctorId": "str",
    "date": "str",
    "reason": "str",
    "notes": ""
}]
```

## Doctors Appointments
- Endpoint -> `doctors/:doctorId/appointmets`
- Method -> `GET`
- param -> `doctorId`
- Response
```javascript
[{
    "id": "1",
    "patientId": "str",
    "doctorId": "str",
    "date": "str",
    "reason": "str",
    "notes": ""
}]
```

