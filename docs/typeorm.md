# [TypeORM](https://typeorm.io/#/) Configuration

> TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).

## Usage with Docker and Nx

### Nx Configuration

1. Add in the `project.json` of the application the followings targets:

```json
"targets": {
    ...,
    "typeorm": {
      "executor": "nx:run-commands",
      "outputs": [],
      "options": {
        "command": "ts-node --project tsconfig.app.json ../../node_modules/typeorm/cli",
        "cwd": "apps/app-1"
      }
    },
    "typeorm:create": {
      "executor": "nx:run-commands",
      "outputs": [],
      "options": {
        "command": "nx run app-1:typeorm migration:create src/database/migrations/{args.name}",
        "cwd": "apps/app-1"
      }
    },
    "typeorm:generate": {
      "executor": "nx:run-commands",
      "outputs": [],
      "options": {
        "command": "nx run app-1:typeorm migration:generate src/database/migrations/{args.name} -d src/database/data.source.ts",
        "cwd": "apps/app-1"
      }
    },
    "typeorm:run": {
      "executor": "nx:run-commands",
      "outputs": [],
      "options": {
        "command": "nx run app-1:typeorm migration:run -d src/database/data.source.ts",
        "cwd": "apps/app-1"
      }
    }
}
```

**Notes**:

- Replace `app-1` with the name of the application.
- Replace `src/database/data.source.ts` with the path of the data source file.

### Docker Installation and Configuration

see: [Docker Installation and Configuration](./docker.md)

### TypeORM Command Line Interface

#### Create a new migration

see: [Creating a new migration](https://typeorm.io/migrations#creating-a-new-migration)

Syntax:

```terminal
docker-compose run --rm <container-name> nx run <project-name>:typeorm:create --name=<migration-name>
```

### Generate a new migration

see: [Generating migrations](https://typeorm.io/migrations#generating-migrations)

**note**: The data source must be configure in the `src/database/data-source.ts` file.

Syntax:

```terminal
docker-compose run --rm <container-name> nx run <project-name>:typeorm:generate --name=<migration-name>
```

### Run migrations

see: [Running migrations](https://orkhan.gitbook.io/typeorm/docs/migrations#running-and-reverting-migrations)

**note**: The data source must be configure in the `src/database/data-source.ts` file.

Syntax:

```terminal
docker-compose run --rm <container-name> nx run <project-name>:typeorm:run
```
