
# QURAN APP

A Quran app that show all chapters and verses of the Holy Quran. And also an option to bookmark any verse or verses.


## API Reference

#### Get all items

```http
  GET /api/chapters
```

#### Get verses

```http
  GET /api/verses/${id}?page=${pagenumber}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of chapter to fetch |
| `pagenumber`      | `number` | **Required**. pagenumber |




## Live site

https://quran-app-red-two.vercel.app/


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REDIS_URL`

`APP_ENV`

`LIVE_TAIL_TOKEN`


## Run Locally

Clone the project

```bash
  git clone https://github.com/Abdulmojeed58/Quran-app.git
```

Go to the project directory

```bash
  cd Quran-app
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Dependencies

Here are the third-party packages and libraries used in this project, along with their respective versions:

- **@emotion/react**: 11.11.1
- **@emotion/styled**: 11.11.0
- **@logtail/pino**: 0.4.12
- **@mui/icons-material**: 5.14.12
- **@mui/material**: 5.14.12
- **@reduxjs/toolkit**: 1.9.7
- **@types/node**: 20.8.3
- **@types/react**: 18.2.25
- **@types/react-dom**: 18.2.11
- **@types/react-redux**: 7.1.27
- **autoprefixer**: 10.4.16
- **firebase**: 10.4.0
- **next**: 13.5.4
- **pino**: 8.16.0
- **pino-pretty**: 10.2.3
- **postcss**: 8.4.31
- **react**: 18.2.0
- **react-dom**: 18.2.0
- **react-redux**: 8.1.3
- **redis**: 4.6.10
- **tailwindcss**: 3.3.3
- **typescript**: 5.2.2
## Node.js Version

This project was developed using Node.js version v16.18.0.