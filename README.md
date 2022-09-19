# repoprovas-back

A system for sharing tests between students!

## Features

- User Registration and Login;
- Create tests;
- List Tests by Disciplines;
- List Tests by Teachers;

## API Reference

### Create user

```http
POTS /users/signup
```

#### Request:

| Body              | Type     | Description                 |
| :---------------- | :------- | :-------------------------- |
| `email`           | `string` | **Required**. user email    |
| `password`        | `string` | **Required**. user password |
| `confirmPassword` | `string` | **Required**. user password |

#

### Login user

```http
POST /users/login
```

#### Request:

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. user email    |
| `password` | `string` | **Required**. user password |

#### Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE2NjM1NDczNzgsImV4cCI6MTY2MzYzMzc3OH0.HF1Z_W9BIhbQJgc2qzbTPTFucfJxLBLJkkO5yJn615U"
}
```

#

### Create a test

```http
POST /tests/create
```

#### Request:

| Body           | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `name`         | `string` | **Required**. test name          |
| `pdfUrl`       | `string` | **Required**. test pdfUrl        |
| `categoryId`   | `string` | **Required**. test category id   |
| `teacherId`    | `string` | **Required**. test teacher id    |
| `disciplineId` | `string` | **Required**. test discipline id |

| Headers         | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#

### List tests by disciplines

```http
GET /tests/by-disciplines
```

#### Request:

| Headers         | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Response:

```json
[
  ...
  {
    "id": 5,
    "number": 5,
    "disciplines": [
      {
        "id": 5,
        "name": "Planejamento",
        "term": {
          "id": 5,
          "number": 5
        },
        "categories": [
          ...
          {
            "id": 3,
            "name": "Recuperação",
            "tests": [
              {
                "id": 8,
                "name": "Minha primeira prova",
                "pdfUrl": "https://minha-prov.pdf",
                "teacher": {
                  "id": 2,
                  "name": "Bruna Hamori"
                }
              }
            ]
          }
          ...
        ]
      }
    ]
  },
  ...
]
```

#

### List tests by teachers

```http
GET /tests/by-teachers
```

#### Request:

| Headers         | Type     | Description                |
| :-------------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Bearer token |

#### Response:

```json
[
  ...
  {
    "id": 2,
    "name": "Bruna Hamori",
    "categories": [
      ...
      {
        "id": 3,
        "name": "Recuperação",
        "tests": [
          {
            "id": 8,
            "name": "Minha primeira prova",
            "pdfUrl": "https://minha-prov.pdf",
            "discipline": {
              "id": 5,
              "name": "Planejamento",
              "term": {
                "id": 5,
                "number": 5
              }
            }
          }
        ]
      }
      ...
    ]
  }
  ...
]
```

#

## Running the Project

1. Clone the repository:

   ```bash
   https://github.com/thalyabbeltrame/repoprovas-back.git
   ```

2. Navigate to the project directory:

   ```bash
   cd repoprovas-back/
   ```

3. Install all dependencies:

   ```bash
   npm install
   ```

4. Set your environment variables (.env file) following the .env.example:

   | Name           | Type     |
   | :------------- | :------- |
   | `DATABASE_URL` | `string` |
   | `PORT`         | `number` |
   | `JWT_SECRET`   | `number` |

5. Run the prisma migrations command:

   ```bash
   npx prisma migrate dev
   ```

6. Run the project on development mode:

   ```bash
   npm run dev
   ```

### Execute tests with Jest

1. Create a `.env.test` file and set your testing database url `DATABASE_URL`;

2. Run the command:

   ```bash
   npm run test
   ```
