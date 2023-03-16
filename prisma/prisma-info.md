# **PRISMA ORM INFORMATION**

## Table of Contents

1. [General Info 🗞️](#general-info)
2. [Installation 👨‍💻](#installation)
3. [Setup Prisma Database](#setup-prisma-database)
4. [Database Interaction](#database-interaction)
5. [Schema Prisma](#schema-prisma)
6. [FAQs](#faqs)
<!-- 2. [Technologies ](#technologies) -->

<div style="margin-top: 30px;"></div>

> ### **General Info**

---

What is **Prisma** :

- [Prisma](https://www.prisma.io/) is ORM that helps developers read and write data to databases

Before connect Prisma with `XAMPP` and a `MySQL database`, you can follow these steps:

Make sure you have _XAMPP_ installed on your computer. You can download it from the Apache Friends website.

Start the _MySQL_ server in _XAMPP_ by clicking the "Start" button next to "_MySQL_" in the _XAMPP_ control window.

Create a _MySQL_ database using the `phpMyAdmin interface` provided by _XAMPP_. To access _phpMyAdmin_, open your web browser and go to :
http://localhost/phpmyadmin/

- Creating a ts.config.json file and add **Prisma recomendation** or use your ts config in your project configuration

```Typescript
{
  //: Prisma Doc Recomentdation
  "compilerOptions": {
    "sourceMap": true,
    "outDir": "dist",
    "strict": true,
    "lib": ["esnext"],
    "esModuleInterop": true
  }
}
```

#

<div style="margin-top: 30px;"></div>

> ### **Installation**

---

Make sure you have Node.js and npm installed on your system.
You can download and install [Node.js](https://nodejs.org/en/download/) from the official website.

Open your terminal or command prompt and run the following command to install Prisma globally:

```Bash
npm install prisma --global
```

The global installation of Prisma will allow you to use the `Prisma CLI` from any directory on your system.

After the installation is complete, you can verify that _Prisma_ is installed correctly by running the following command in your terminal:

```Bash
prisma --version
```

This command should output the version of _Prisma_ installed on your system.

<div style="margin-top: 30px;"></div>

> ### **Setup Prisma Database**

---

Next, create a new Prisma project by running the following command in your terminal:

```Bash
npx prisma init
```

This command will create and initialize a new Prisma project with a basic directory structure and a "<span style="text-decoration: underline;">schema.prisma</span>" file that describes your **database schema**.

<div style="margin-top: 10px;"></div>

It is possible to specify directly the database you use with this command

```Bash
npx prisma init --datasource-provider <your-database>
```

This command initializes some files and uses the default database type

```Typescript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "<your-database>"
  url      = env("DATABASE_URL")
}
```

Then in the `.env file` replace the default information of the url by yours, depending on the type of database you want to use

```Bash
DATABASE_URL="your-database://db-user:@localhost:db-port/name-of-database>"
```

For more information check url connection in [Prisma documentation](https://www.prisma.io/docs/reference/database-reference/connection-urls)

<div style="margin-top: 30px;"></div>

> ### **Schema Prisma**

---

```Typescript
//: Define Schema

model User {
  id   Int    @id @default(autoincrement())
  name String
}
```

<!--
Update available 4.10.1 -> 4.11.0
Run the following to update

npm i @prisma/client@latest -->

Finally, you can generate or regenerate the Prisma client by running the following command in your terminal:

```Bash
npx prisma generate
```

To allow access to the Prisma client

```Typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

This command will generate the _Prisma_ client, which provides
a type-safe API for querying your `database`.

<div style="margin-top: 30px;"></div>

##### <p style="text-decoration: underline">**GOOD PRACTICE**</p>

```Typescript
//: Disconnect database after queries running
.catch(e => {
  console.error(e.message);
})
.finally(async () => {
  await prisma.$disconnect()
})
```

> That's it!

You have now installed Prisma with npm and created a new Prisma project. You can now start using Prisma to interact with your `database`.

<div style="margin-top: 30px;"></div>

### **Database Interaction**

#

```Typescript
  // Write Prisma Client Queries
async function main() {

  // Create Data for interact with Database
  const user = await prisma.user.create({
    data: {
      name: "Bendevweb"
    }
  })
  console.log(user);
}

main()

//: Disconnect database
.catch(e => {
  console.error(e.message);
})
.finally(async () => {
  await prisma.$disconnect()
})
```

Creation of a script in the `package.json` file.

```JSON
"scripts": {
    "devStart": "nodemon script.ts"
  },
```

To automatically
compile our **script.ts** file at each new modification.

```Bash
> prisma@1.0.0 devStart
> nodemon script.ts

[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node script.ts`
{ id: 1, name: 'Bendevweb' }
[nodemon] clean exit - waiting for changes before restart
```

There are several ways to retrieve `user` information from the _database_.

```Typescript
// Get all Users
const users = await prisma.user.findMany()

// Delete all Users
const users = await prisma.user.deleteMany()

// Get first 10 Users
const users = await prisma.user.findMany({ take: 10 })

// Only select the `id`
const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
```

<div style="margin-top: 20px;"></div>

#### <p style="text-decoration: underline; font-weight: bold;">Result</p>

```Typescript
const users = await prisma.user.findMany()
[
  { id: 1, name: 'Bendevweb' },
  { id: 2, name: 'Neocor89' }
]
```

#### <p style="text-decoration: underline; font-weight: bold;">Operation</p>

As _Prisma_ connects directly to the _database_ it is possible to have only one source that provides the data, which is the `provider`

```Typescript
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

We create our schema with all the data we want.
Once finished, we create our migrations that allow us to make changes to our database, once updated, a migration is automatically created, in order to move to the next step and allow the database to be always up to date.

#### <p style="text-decoration: underline; font-weight: bold;">Models</p>

The **models** represent to the tables of your database and the fields inside these models represent the different **rows**.
Each field is composed of 4 parts:

- `Name`
- `Type` (particular type)
- `Modifier` (Optional)
- `Attribute` (Optional)

```Typescript
model User {
  id Int  @id @default(autoincrement())
  name String
}

model User {
  Name Type  @attribute
  Name optionalType?
  posts Post[] // the [] It is a modifier and indicates that there can be multiple
}
```

> `Particular type` in Prisma :  
> Prisma allows you to convert an existing database and as it does not accept all types of data it will be recovered and listed as **unsupported**.

```Typescript
Unsupported(_ name: String)
```

`Fields Attributes`

> Field attributes, as their names suggest, apply to fields.
> They are applied on the same row as the field and have the `@` symbol in front of them

```Typescript
model User {
  id  String   @id @default(uuid()) // Field Attribute
  email  String   @unique  // Field Attribute
}
```

```Typescript
 @id
 // Defines a single-field ID on the model

 @unique
 // Defines a unique constraint for this field.
```

```Typescript
 @default()
// Defines a default value for this field.

 @default(now())
 // Set a timestamp of the time when a record is created.
```

```Typescript
@updatedAt
// Automatically stores the time when a record was last updated.
```

`Bloc Attributes`

> The block attributes have their own line and are applied inside the braces of the model, with two `@@` symbols before them.
> And allows you to apply an option to the _whole block (model)_

Example :

You can't have two people with the same age and the same name

```Typescript
model User {
  age   Int
  name  String

  @@index(email)  // Block Attribute
  // Defines an index on the model fields and Help with sorting and performance

  @@unique([age, name])  // Block Attribute

  @@id  // Block Attribute
  // Possible to create a composite id for the model not for one field
}
```

Other type of data source generator model

`Enum`

Enums are defined via the enum block.
You can define enums in your data model if they're supported by the datasource
you use (e.g SQLite: not supported).

> Syntax of the Enum model generator

```Typescript

keyWord modelName {
 FIELDNAME
}

enum Role {
  BASIC
  ADMIN
}
```

```Typescript

// Without enum
model User {
  id       String   @id @default(uuid())
  age      Int
  name     String
  email    String   @unique
  isAdmin  Boolean  // Traditional Field

  @@unique([age, name])
  @@index([email])
}

/*
---------------------------
*/

// Example of enum use
model User {
  id     String  @id @default(uuid())
  age    Int
  name   String
  email  String  @unique
  role   Role    @default(BASIC)  // enum field

  @@unique([age, name])
  @@index([email])
}


enum Role {
  BASIC
  ADMIN
}
```

<div style="margin-top: 20px;"></div>

#### <p style="text-decoration: underline; font-weight: bold;">Relation</p>

There are `3` different types of relationships in Prsima :

- `One to many`
- `many to many`
- `one to one`

A _User_ can have **multiple** messages

When you create a field that is linked to another model, for example the user model. You have to specify its relation to the X field in the model and its reference to the Y field of the linked model

```Typescript
model Post {
  id        String   @id @default(uuid())
  rating    Float
  createdAt DateTime
  updatedAt DateTime
  // Definition of a one-to-many relation
  author    User     @relation(fields: [userId], references: [id])
  userId    Int
}
```

```Typescript
model User {
  id          Int     @id @default(autoincrement())
  name        String
  email       String
  isAdmin     Boolean
  preferences Json?
  // The syntax [] is a field type modifier
  posts       Post[]
}
```

```Typescript
@relation(_ name: String?, map: String?, fields: FieldReference[]?, references: FieldReference[]?)
```

<div style="margin-top: 20px;"></div>

#### <p style="text-decoration: underline; font-weight: bold;">Defines a connection between two models</p>

- `name` Defines the name of the relationship. In an m-n-relation, it also determines the name of the underlying relation table.

- `map` Defines a custom name for the foreign key in the database.

- `fields` A list of field references of the current model.

- `references` A list of field references of the model on the other side of the relation.

- `onDelete` Specifies the action to perform when a referenced entry in the referenced model is being deleted.

- `onUpdate` Specifies the action to perform when a referenced field in the

#### <p style="text-decoration: underline; font-weight: bold;">Personalization of relations between models</p>

Creation of a relationship between two models

```Typescript
model Post {
  id            String   @id @default(uuid())
  author        User     @relation("WrittenPosts", fields: [authorId], references: [id])
  authorId      String
  favoritedBy   User     @relation("FavoritePosts", fields: [favoritedById], references: [id])
  favoritedById String
  // By assigning a type of model in another it must necessarily be linked
  // Refers to this category model
  categories Category[]
}


model Category {
  id String @id @default(uuid())
  // Refers to the Post model
  posts Post[]
}
```

  <div style="margin-top: 20px;"></div>

#### **Data Migration into Database**

> Once the different models have been created,
> it is necessary to migrate them to the database,
> using the command :

```Bash
npx prisma migrate <name>
```

When migrating your models, Prisma will warn you if you have added certain constraints that may have unexpected behaviour.

_Example_ :

```Bash
⚠️  Warnings for the current datasource:

  • A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  • A unique constraint covering the columns `[age,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.

  ✅ Are you sure you want create and apply this migration? ... yes
✅ Enter a name for the new migration: ... dbtest

Applying migration `20230313173047_dbtest`
```

For example, be careful because if there are duplicate values they will be deleted.

Once the _validation_ is complete and you have given it a name.
The _migration_ will be created and the client will be generated.
A new sub-folder will be created in our `Prisma/migrations` folder.
Containing a file with the `SQL` code of the _models_ created in the `schema file`.

  <div style="margin-top: 25px;"></div>

> Each time one or more `models` are modified the `database` must be updated with the following command.

```Bash
 npx prisma mmigrate <datatabase>
```

> `<database>` is the name of the database you specified during the migration

For example for the case used the database used is `dev`.

```Bash
 npx prisma mmigrate dev
```

> It is also preferable to name it, with the flag  
> **--name**

```Bash
npx prisma mmigrate dev --name <your-migration-name>
```

For example for the case used :

```Bash
npx prisma mmigrate dev --name test2
```

  <div style="margin-top: 25px;"></div>

### Problem of access to generated data models

  <div style="margin-top: 10px;"></div>

Once the migration is complete, the data is manipulated with the `scripts.ts` file containing our **Prisma client**.
Sometimes there is a problem accessing the data.

> In this case there are 3 possibilities that can be put in place :

1. Generate the data with the command :

```Bash
npx prisma generate
```

2. Close the file containing the Prisma client and open it again.

3. Relaunch the `Typescript` code by clicking on the method that is trying to access the data, while holding down the `Ctrl` key. Close the open file and test the data access with `Ctrl` + `space`

  <div style="margin-top: 25px;"></div>

> Once you have access to the data you can start adding information to the database

<div style="margin-top: 12px;"></div>

```Typescript

// script.ts
const user = await prisma.user.create({
    data: {
      name: "Ben",
      email: "bendevweb@test.com",
      age: 37,
      UserPreference: {
        create: {
          emailUpdates: true,
        }
      }
    },
    })
```

<!--
: Create a new Prisma project using the command "npx prisma init" in a terminal. This command will generate a "prisma/schema.prisma" file that describes your database.

```Bash
npm install --save-dev prisma typescript ts-node @types/node nodemon
npx prisma init --datasource-provider mysql
npx prisma migrate dev --name init
```

: Open the "prisma/schema.prisma" file in a text editor and edit the "datasource" section to include your MySQL database connection information. Here is an example of the configuration:
: For validation command
 npm prisma migrate dev --name init
: migration prisma dev DB
-->

<!-- ```Bash
Datasource "db": MySQL database "test" at "localhost:3306"

Applying migration `20230302164110_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20230302164110_init/
    └─ migration.sql

Your database is now in sync with your schema.

Running generate... (Use --skip-generate to skip the generators)
``` -->
