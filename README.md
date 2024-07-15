# DT207G - Projekt - Café Lugnet API Webbtjänst
Detta repository innehåller kod för API Webbtjänst till Café Lugnet webbplats
## API Länk
En liveversion av APIet finns tillgänglig på följande URL: https://dt207g-cafe-lugnet-webbtjanst.onrender.com

## Databas
APIet använder NoSQL MongoDB och Mongose. Databasen innehåller följande struktur på data som skapas i ett schema i modulen Mongoose:

```
Admin:

 username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

```

```
Bookings:

 firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    phonenumber: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    guests: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    date: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    time: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    bookingMessage: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
```

```
Menu:

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    description: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    allergy: {
        type: String,
        required: false,
        unique: false,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        unique: false,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});
```

## Användning av CRUD

### Booking:

| Metod   | Ändpunkt     | Beskrivning                       |
| ------- | ------------ | --------------------------------- |
| GET     | /booking/list | Hämtar alla bordsbokningar   |
| POST    | /booking     | Skapar ny bordsbokning |
| PUT     | /booking/:bookingId    | Uppdaterar specifik bordsbokning utifrån id       |
| DELETE     | /booking/:bookingId    | Raderar befintlig bordsbokning utifrån id       |

### Admin:

| Metod   | Ändpunkt     | Beskrivning                       |
| ------- | ------------ | --------------------------------- |
| GET     | /admin       | Tillgång till skyddad data vid inloggning   |
| POST    | /login       | Skapa inloggning |
| POST     | /register    | Registrera ny användare       |

### Menu:

| Metod   | Ändpunkt     | Beskrivning                       |
| ------- | ------------ | --------------------------------- |
| GET     | /menu        | Hämtar menyn  |
| POST    | /menu/dish     | Lägga till ny maträtt i menyn |
| PUT     | /menu/:dishId   | Uppdaterar specifik maträtt i menyn utifrån id      |
| DELETE     | /menu/:dishId    | Raderar befintlig maträtt från menyn utifrån id       |




GET: /login:
{
 "username" : "username",
 "password" : "password"
}

ger följande svar
```
{
  "response": {
    "message": "Användare är inloggad",
    "token": "token"
  }
}
  ```
Token som skickas med är giltig i 1h dvs inloggad användare kan komma åt skyddad data i 1h