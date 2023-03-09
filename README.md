# Awesome Project Build with TypeORM

## TypeORM

- Generate migrate :

```bash
npm run migrate:generate -- ./src/migrations/scripts/{fileName} -d ./src/data-source.ts
```

- Create migrate :

```bash
npm run migrate:create -- ./src/migrations/scripts/{fileName}
```

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command
