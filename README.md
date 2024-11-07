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


## Signup
- Endpoint -> `/auth/register`
- Method -> `POST`
- Request
```javascript
{
    "email": "kamehameha+admin@gmail.com",
    "firstName": "Goku-admin",
    "lastName": "Kamehameha",
    "password": "heyoMate@123",
    "role": "admin"
}
```
- Response
```javascript
{
    "_id": "672cad060b2696a1b240fc07",
    "firstName": "Goku-admin3",
    "lastName": "Kamehameha",
    "email": "kamehameha+admin3@gmail.com",
    "role": "admin",
    "isVerified": false
}
```


## Login
- Endpoint -> `/auth/login`
- Method -> `POST`
- Request
```json
{
    "email": "kamehameha+doctor1@gmail.com",
    "password": "heyoMate@123"
}
```
- Response
```javascript
{
    "token": "BaBaBlackSheep",
    "_id": "672c9e7d4d46034337c8e0bf",
    "firstName": "Goku",
    "lastName": "Kamehameha",
    "email": "kamehameha+doctor1@gmail.com",
    "role": "doctor",
    "isVerified": false
}
```


## Profile
- Endpoint -> `/user/profile`
- Method -> `GET`
```
- Response 
```javascript
{
    "_id": "672ca128250fda583c8349fd",
    "firstName": "Goku-admin",
    "lastName": "Kamehameha",
    "email": "kamehameha+admin@gmail.com",
    "role": "admin",
    "isVerified": false
}

```

## Get doctors
- Endpoints -> `/doctors/`
- Method -> `GET`
- Response
```javascript
{
    "doctors": [
        {
            "_id": "672c9e7d4d46034337c8e0bf",
            "firstName": "Goku",
            "lastName": "Kamehameha",
            "email": "******@gmail.com",
            "role": "doctor",
            "isVerified": false
        },
        {
            "_id": "672c9f4b826baddc3d4d589e",
            "firstName": "Goku2",
            "lastName": "Kamehameha",
            "email": "******@gmail.com",
            "role": "doctor",
            "isVerified": false
        },
        {
            "_id": "672c9f51826baddc3d4d58a1",
            "firstName": "Goku3",
            "lastName": "Kamehameha",
            "email": "******@gmail.com",
            "role": "doctor",
            "isVerified": false
        },
        {
            "_id": "672c9f59826baddc3d4d58a4",
            "firstName": "Rahu20",
            "lastName": "Kamehameha",
            "email": "******@gmail.com",
            "role": "doctor",
            "isVerified": false
        },
        {
            "_id": "672c9f60826baddc3d4d58a7",
            "firstName": "Rahu100",
            "lastName": "Kamehameha",
            "email": "******@gmail.com",
            "role": "doctor",
            "isVerified": false
        }
    ]
}

```

## Add new slots for a doctor slots
- Endpoints -> `/slots/add`
- Method -> `POST`
- Request
```javascript
{
  "doctorId": "6451f6fc6cf8e4b4414b2e18",
  "date": "2024-11-10",
  "slots": [
    {
      "from": "2024-11-08T04:30:00Z",
      "to": "2024-11-08T05:30:00Z"
    },
    {
      "from": "2024-11-08T06:30:00Z",
      "to": "2024-11-08T07:30:00Z"
    },
    {
      "from": "2024-11-08T07:30:00Z",
      "to": "2024-11-08T08:30:00Z"
    },
    {
      "from": "2024-11-08T08:30:00Z",
      "to": "2024-11-08T09:30:00Z"
    }
  ]
}

```
- Response
```javascript
{
    "_id": "672ca922e05f793ab0d4ccb4",
    "date": "2024-11-10",
    "doctorId": "6451f6fc6cf8e4b4414b2e18",
    "__v": 0,
    "slots": [
        {
            "from": "2024-11-08T04:30:00.000Z",
            "to": "2024-11-08T05:30:00.000Z",
            "_id": "672cae1f0b2696a1b240fc0f"
        },
        {
            "from": "2024-11-08T06:30:00.000Z",
            "to": "2024-11-08T07:30:00.000Z",
            "_id": "672cae1f0b2696a1b240fc10"
        },
        {
            "from": "2024-11-08T07:30:00.000Z",
            "to": "2024-11-08T08:30:00.000Z",
            "_id": "672cae1f0b2696a1b240fc11"
        },
        {
            "from": "2024-11-08T08:30:00.000Z",
            "to": "2024-11-08T09:30:00.000Z",
            "_id": "672cae1f0b2696a1b240fc12"
        }
    ]
}
```

## Get slot for a particular doctor on a particular date
- Endpoint -> `/slots`
- Method -> `POST`
- Request 
```javascript
{
  "doctorId": "6451f6fc6cf8e4b4414b2e18",
  "date": "2024-11-10"
}
```
- Response 
```javascript
[
    {
        "_id": "672ca922e05f793ab0d4ccb4",
        "date": "2024-11-10",
        "doctorId": "6451f6fc6cf8e4b4414b2e18",
        "__v": 0,
        "slots": [
            {
                "from": "2024-11-08T04:30:00.000Z",
                "to": "2024-11-08T05:30:00.000Z",
                "_id": "672cae1f0b2696a1b240fc0f"
            },
            {
                "from": "2024-11-08T06:30:00.000Z",
                "to": "2024-11-08T07:30:00.000Z",
                "_id": "672cae1f0b2696a1b240fc10"
            },
            {
                "from": "2024-11-08T07:30:00.000Z",
                "to": "2024-11-08T08:30:00.000Z",
                "_id": "672cae1f0b2696a1b240fc11"
            },
            {
                "from": "2024-11-08T08:30:00.000Z",
                "to": "2024-11-08T09:30:00.000Z",
                "_id": "672cae1f0b2696a1b240fc12"
            }
        ]
    }
]
```

## (Not Implemeted) Create appointement
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

## (Not Implemeted) List all appointmets for the patient
- Endpoint -> `patients/:patientId/appointments`
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

## (Not Implemeted) List all appointmets for the doctor
- Endpoint -> `doctors/:doctorId/appointments`
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

