# Task Manager

> Мощный GraphQL API для управления задачами и проектами

---

## Технологии

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Apollo](https://img.shields.io/badge/Apollo%20Server-311C87?style=for-the-badge&logo=apollographql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge&logo=typeorm&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
---

## Модель данных

```
User
 └── имеет много Projects
      └── имеет много Tasks
           └── назначена на User
```
---

## Запуск проекта

### Требования

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) и Docker Compose
- [NestJS CLI](https://docs.nestjs.com/cli/overview)

### 1. Клонируем репозиторий

```bash
git clone https://github.com/itsisoev/nestjs-task-manager-server.git
cd nestjs-task-manager-server
```

### 2. Настраиваем переменные окружения

```bash
cp .env.example .env
```

Заполняем `.env` своими значениями:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=task_manager
PORT=3000
```

### 3. Запускаем Docker сервисы

```bash
docker compose up -d
```

Запустятся:
- **PostgreSQL** на `localhost:5432`
- **pgAdmin 4** на `http://localhost:5050`

### 4. Устанавливаем зависимости

```bash
npm install
```

### 5. Запускаем приложение

```bash
# Режим разработки
npm run start:dev
```

---

## Docker сервисы

| Сервис | URL | Данные для входа |
|---|---|---|
| PostgreSQL | `localhost:5432` | `postgres / postgres` |
| pgAdmin 4 | `http://localhost:5050` | `admin@admin.com / admin` |

Для подключения pgAdmin к базе данных:
- **Host:** `postgres`
- **Port:** `5432`
- **Username:** `postgres`
- **Password:** `postgres`

---

## 🔥 GraphQL Playground

После запуска приложения открываем:

```
http://localhost:3000/graphql
```

Пример запроса:

```graphql
query {
  users {
    id
    username
    email
    fullName
    createdAt
  }
}
```

---

## Автор

**itsisoev** — сделано с ❤️ и большим количеством кофе
