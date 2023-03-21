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

> ### **GET Data**

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

- A message in the terminal, will warn us of the good progress of the new migration.

```Bash
The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20230316163640_test2/
    └─ migration.sql
```

  <div style="margin-top: 25px;"></div>

> ### **Problem of access to generated data models**

  <div style="margin-top: 10px;"></div>

Once the migration is complete, the data is manipulated with the `scripts.ts` file containing our **Prisma client**.
Sometimes there is a problem accessing the data.

In this case there are 3 possibilities that can be put in place :

1. Generate the data with the command :

```Bash
npx prisma generate
```

2. Close the file containing the Prisma client and open it again.

3. Relaunch the `Typescript` code by clicking on the method that is trying to access the data, while holding down the `Ctrl` key. Close the open file and test the data access with `Ctrl` + `space`

  <div style="margin-top: 25px;"></div>

> Once you have access to the data you can start adding information to the database

<div style="margin-top: 25px;"></div>

**include**

---

Thanks to the definition of models, Prsima allows
to include specific data by nesting them in others.

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
        },
      },
    },
    // Nesting
    include: {
      UserPreference: true,
    },
    })


// Result
    {
  id: 'd59f1874-c847-4783-b7a7-e9b49681',
  age: 37,
  name: 'Ben',
  email: 'bendevweb@test.com',
  role: 'BASIC',
  userPreferenceId: '6f2ce73f-ab5b-4be1-bbaf-8188632',
  UserPreference: { id: '6f2ce73f-ab5b-4be1-bbaf-8188632', emailUpdates: true }
}
```

<div style="margin-top: 20px;"></div>

**Select**

---

Selected and returned a specific fields to fetch from the User

```Typescript
const user = await prisma.user.create({
    data: {
      name: "Ben",
      email: "bendevweb@test.com",
      age: 37,
      UserPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },

    // Choice of fields to select
    select: {
      name: true,
      // Basic selection
      UserPreference : true,

      // Nested selection
      UserPreference : {select: {id: true} },
    },
    })

    // Result
    {
      name: 'Ben',
      UserPreference: { id: '43dd4d84-2483-4665-8611-7d6c95e6c3d2' }
    }
```

> It is only possible to make one `selection` or `inclusion` at a time.

<p style="text-decoration: underline;">Impossible to do both at the same time</p>

**log**
Allows to record new requests and to have a log of our current requests and display all the execution process.

_Useful for_ :

- `Debugging` certain things
- Analysis and `performance improvement`.

```Typescript
const prisma = new PrismaClient({ log: ["query"]});

// Defaults to stdout
log: ['query', 'info', 'warn', 'error']

// Emit as events
log: [
 { emit: 'stdout', level: 'query' },
 { emit: 'stdout', level: 'info' },
 { emit: 'stdout', level: 'warn' }
 { emit: 'stdout', level: 'error' }
]
```

> Here is what is happening with Prisma in the `background`

```SQL
prisma:query BEGIN
prisma:query SELECT `test`.`User`.`id` FROM `test`.`User` WHERE 1=1
prisma:query SELECT `test`.`User`.`id` FROM `test`.`User` WHERE 1=1
prisma:query DELETE FROM `test`.`User` WHERE (`test`.`User`.`id` IN (?) AND 1=1)
prisma:query COMMIT
prisma:query BEGIN
prisma:query INSERT INTO `test`.`UserPreference` (`id`,`emailUpdates`) VALUES (?,?)
prisma:query INSERT INTO `test`.`User` (`id`,`age`,`name`,`email`,`role`,`userPreferenceId`) VALUES (?,?,?,?,?,?)
prisma:query SELECT `test`.`User`.`id`, `test`.`User`.`name`, `test`.`User`.`userPreferenceId` FROM `test`.`User` WHERE `test`.`User`.`id` = ? LIMIT ? OFFSET ?
prisma:query SELECT `test`.`UserPreference`.`id` FROM `test`.`UserPreference` WHERE `test`.`UserPreference`.`id` IN (?)
prisma:query COMMIT
```

<div style="margin-top: 30px;"></div>

> ### **CREATE Data**

---

For data creation it is possible to create several data at once with the function <span style="color: greenYellow; font-weight: 600;">createMany()</span>,

- Takes an array[],
- Not accept the clause of `select` options where `include`

```Typescript
const users = await prisma.user.createMany({
    data: [{
      name: "Ben",
      email: "bendevweb@test.com",
      age: 37,
    },
    {
      name: "Mat",
      email: "mat@test.com",
      age: 57,
    },
    {
      name: "Sam",
      email: "sam@test.com",
      age: 47,
    }]
    });

    // Option not available
    select: {
      name: true,
      UserPreference : {select: {id: true}},
    },
```

Prisma sends us through the terminal the number of users created

```JSON
{ count: 3 }
```

<div style="margin-top: 20px;"></div>

#### **Creating sub-data sets**

<div style="margin-top: 15px;"></div>

<span style="color: greenYellow; font-weight: 600;">create</span>

- Allows to create linked data between two models it is necessary to use the `Create` keyword

<div style="margin-top: 10px;"></div>

```Typescript
const user = await prisma.post.create({
    data: {
      title: "Prisma Crash Course",
      averageRating: 4.4,
      authorId: "e08fe917-47d6-481f-b176-9b01f0",
      // Category Model
      categories : {
        // Create subsets of data
        create: [
          {name: "Database"},
          {name: "Web Development"},
        ]
      }
    }
  })

  // Result
  {
  id: 'e72b56a9-f857-4add-b007-c8c74c',
  title: 'Prisma Crash Course',
  averageRating: 4.4,
  createdAt: 2023-03-21T18:40:21.149Z,
  updatedAt: 2023-03-21T18:40:21.149Z,
  authorId: 'e08fe917-47d6-481f-b176-9b01f0',
}
```

<span style="color: greenYellow; font-weight: 600;">connect</span>

- Allows to connect data between two models using the keyword `Connect`

<div style="margin-top: 10px;"></div>

```Typescript
const user = await prisma.post.create({
    data: {
      title: "Prisma Crash Course",
      averageRating: 4.4,
      authorId: "e08fe917-47d6-481f-b176-9b01f0",
      // Category Model
      categories : {
        // Connect data
        connect: [
          {name: "Database"},
          {name: "Web Development"},
        ]
      }
    }
  })
```

<div style="margin-top: 30px;"></div>

> ### **Reading data**

---

<div style="margin-top: 25px;"></div>

### [findUnique](#find-unique)

Allows to read data from `models` that have been
specified with the `@unique` attribute.

```Typescript
// Example of unique attributes
model Category {
  id    String @id @default(uuid())
  name  String @unique
}
```

To read the data from the database containing the `@unique` attribute.
You have to use the <span style="color: greenYellow; font-weight: 600;">findUnique()</span> function which

- Takes an object : `{}`
- Takes a search filter : `where`
- Always returns a : `single data`

```Typescript
// script.ts
const user = await prisma.user.findUnique({});


// Find zero or one User that matches the filter.
const user = await prisma.user.findUnique({
  // ... Provide filter for @unique attribute fields
  where: {
    // Example
    name: "Ben"
  }
})


// Result
{
  id: 'e08fe917-47d6-481f-b176-9b01f04',
  age: 37,
  name: 'Ben',
  email: 'bendevweb@test.com',
}
```

Prisma allows you to define multiple uniqueness constraints,
on different fields with the unique attribute.

```Typescript
model User {
  // Definition of constraints on several fields
  @@unique([age, name])
}
```

They are represented by an `underscore` between the different properties.

Then we have to pass an object `{}` to the clause of our choice :

- <span style="color: greenYellow;">where</span>
- <span style="color: greenYellow;">include</span>

With the values of the properties we want to retrieve

```Typescript
// Example
const user = await prisma.user.findUnique({
    where: {
      // Reading the recorded data
      age_name: {
        age : 37,
        name: "Ben",
      }
    }
  })

  // Result
  {
  id: 'e08fe917-47d6-481f-b176-9b01f04',
  age: 37,
  name: 'Ben',
  email: 'bendevweb@test.com',
}
```

The combination of the two constraints must be valid,
to be able to read the information requested from the database.

- Otherwise we get

```Bash
null
```

<div style="margin-top: 20px;"></div>

### [findFirst](#find-first)

To find the first reference in the database with Prisma we use the function <span style="color: greenYellow; font-weight: 600;">findFirst()</span>

Returns the first reference meeting the condition

```Typescript
const user = await prisma.user.findFirst({
  where: {
    age: 47,
  }
})

// Result
{
  id: 'f9251c9c-ed30-4c6b-8b3a-affa2019',
  age: 47,
  name: 'Jane',
  email: 'jane@test.com',
}
```

### [findMany](#find-many)

#

<span style="color: greenYellow; font-weight: 600;">findMany()</span> is very similar to `findFirst`,
but it simply returns all references that match the requested property value

```Typescript
// Get first 10 Users
const users = await prisma.user.findMany({ take: 10 })

// Only select the `id`
const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })

// All users with the same name "Ben"
const user = await prisma.user.findMany({
  where: {
    name: "Ben",
  }
})

// Returns all results
[
  {
    id: 'e08fe917-47d6-481f-b176-9b01f04',
    age: 37,
    name: 'Ben',
    email: 'bendevweb@test.com',
  },
  {
    id: 'f75b15be-97d2-4cd0-b3b2-2c58ab3',
    age: 38,
    name: 'Ben',
    email: 'bendevweb@test2.com',
  }
]
```

The `findMany` function of Prisma allows options, paginations and distinctions,
with the following syntax:

<div style="margin-top: 20px;"></div>

#### <p style="text-decoration: underline; font-weight: bold;">Distinction</p>

---

The `distinct` option in Prisma is a feature that allows you to filter the results of a query to eliminate duplicates by one or more specified fields.

- Take an `array[]`
- Accept **one** or **more** search `fields`

For example, if you want to get all users with unique **name** you can use the _distinct_ option on the **name field**.

```Typescript
// Returns all values that have a unique name and age and are different for each of them
const users = await prisma.user.findMany({
  where: {
    name: "Ben",
  },
  distinct: ["name", "age"]
})

// Result
[
  {
    id: 'e08fe917-47d6-481f-b176-9b01f04',
    age: 37,
    name: 'Ben',
    email: 'bendevweb@test.com',
  },
  {
    id: 'f75b15be-97d2-4cd0-b3b2-2c58ab3',
    age: 38,
    name: 'Ben',
    email: 'bendevweb@test2.com',
  }
]
```

### [Distinct One to One](#distinct-one-to-one)

To use the "distinct" option with relations, you must first define the relations between your models in the Prisma schema.

Then you can use a nested select to include the relationship fields in your query.

Get all users with unique names and profiles, you can do :

```Typescript
const users = await prisma.user.findMany({
  distinct: ["name"],
  select: {
    name: true,
    profile: true,
  },
});
```

### [Distinct Many to Many](#distinct-many-to-many)

If you have a many-to-many relationship, you must use an intermediate model to represent the relationship in the Prisma schema. For example, if you have a relationship between Post and Category, you can create a PostCategory model that contains the foreign keys of both models :

```SQL
model Post {
  id        Int    @id @default(autoincrement())
  title     String
  categories PostCategory[]
}

model Category {
  id    Int    @id @default(autoincrement())
  name  String
  posts PostCategory[]
}

model PostCategory {
  post       Post     @relation(fields: [postId], references: [id])
  postId     Int
  category   Category @relation(fields: [categoryId], references: [id])
  categoryId Int

  @@id([postId, categoryId])
}
```

Then you can use the "distinct" option with a nested select to get posts with unique categories:

```Typescript
const posts = await prisma.post.findMany({
  distinct: ["title"],
  select: {
    title: true,
    categories: {
      select: {
        category: true,
      },
    },
  },
});
```

<div style="margin-top: 20px;"></div>

#### <p style="text-decoration: underline; font-weight: bold;">Pagination</p>

---

<div style="margin-top: 15px;"></div>

The pagination is organized with different options and keywords

<span style="color: greenYellow; font-weight: 600;"></span>

## [take](#pagination-take)

which returns the number of **available users**,
passed in value to the **keyword**.

```Typescript
// Return 2 Users if exist
const user = await prisma.user.findMany({
    where: {
        name: "Jane"
    },
    take: 2,
  })

// Result
[
  {
    id: '5c641e9f-4c9c-40ce-940a-26a7ac4',
    age: 48,
    name: 'Jane',
    email: 'jane@test2.com',
  },
  {
    id: 'f9251c9c-ed30-4c6b-8b3a-affa201',
    age: 47,
    name: 'Jane',
    email: 'jane@test.com',
  }
]
```

## [skip](#pagination-skip)

The `skip` option, can also be used before skipping a specific number of first results

```Typescript
const user = await prisma.user.findMany({
    where: {
        name: "Jane"
    },
    take: 2,
    skip: 1,
  })

// Result
[
  {
    id: 'f9251c9c-ed30-4c6b-8b3a-affa201',
    age: 47,
    name: 'Jane',
    email: 'jane@test.com',
  }
]
```

### [Order by](#pagination-order-by)

The `Order by` option allows you to organize the pagination of the results in the chosen order.

<span style="color: greenYellow; font-weight: 600; font-size: 17px;">asc</span>

```Typescript
const user = await prisma.user.findMany({
    where: {
        name: "Jane"
    },
    orderBy: {
      age: "asc",
    },
    take: 2,
  })

// Result
[
  {
    id: 'f9251c9c-ed30-4c6b-8b3a-affa20198cdd',
    age: 47,
    name: 'Jane',
  },
  {
    id: '5c641e9f-4c9c-40ce-940a-26a7ac42529d',
    age: 48,
    name: 'Jane',
  }
]
```

<span style="color: greenYellow; font-weight: 600; font-size: 17px;">desc</span>

```Typescript
const user = await prisma.user.findMany({
    where: {
        name: "Jane"
    },
    orderBy: {
      age: "desc",
    },
    take: 2,
  })

// Result
[
  {
    id: '5c641e9f-4c9c-40ce-940a-26a7ac42529d',
    age: 48,
    name: 'Jane',
  },
  {
    id: 'f9251c9c-ed30-4c6b-8b3a-affa20198cdd',
    age: 47,
    name: 'Jane',
  }
]
```

<div style="margin-top: 30px;"></div>

### <p style="text-decoration: underline; font-weight: bold;">Advanced filters</p>

## [Where](#advanced-filters-where)

Prisma allows you to filter the results in a very efficient way,
using the `where` closes.

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">equals</span>
</div>

Take an `object{}` with different options :

The option `equals` returns <span style="text-decoration: underline;">all exact values</span> in the database.

```Typescript
const user = await prisma.user.findMany({
    where: {
      email: {
        equals: "bendevweb@test.com"
      },
    },
  });

  // Result
  [
  {
    id: 'e08fe917-47d6-481f-b176-9b01f04ce5a7',
    age: 37,
    name: 'Ben',
    email: 'bendevweb@test.com',
  }
]
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">not</span>
</div>

The `not` option returns all values different from the passed value, present in the database.

```Typescript
const user = await prisma.user.findMany({
  where: {
    email: {
      not: "Ben"
    },
  },
});

[
  // All results not equal to name : "Ben"
]
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">in</span>
</div>

The `in` option takes an `array[]` with the value(s) to include and _returns_ the value(s), **present** in the database

```Typescript
const user = await prisma.user.findMany({
  where: {
    email: {
      in: {["Ben"]},
      // OR
      in: {["Ben", "Céline"]}
    },
  },
});

[
  // All results not include name : "Ben"
]
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">notIn</span>
</div>

The `notin` option takes an `array[]` with the value(s),
<span style="text-decoration: underline;">not to be included</span> and returns the value(s), present in the database

```Typescript
 const user = await prisma.user.findMany({
    where: {
      name: {notIn: ["Ben", "Céline"] }
    },
  })

  // Result
  [
  {
    id: 'adf18ca4-a642-4f85-96ec-fab3e3a',
    age: 7,
    name: 'Jhon',
    email: 'jhon@test.com'
  },
  {
    id: 'b30775fc-a7ff-4125-8907-183a3e',
    age: 8,
    name: 'Jhon',
    email: 'jhon@test2.com'
  }
]
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">lt</span>
</div>

The `lt` option takes an Object, and returns all the values present in the database,
lower than the one chosen

```Typescript
const user = await prisma.user.findMany({
    where: {
      age: { lt: 20 },
    },
  })

[
  {
    id: 'adf18ca4-a642-4f85-96ec-fab3e3a6e84d',
    age: 7,
    name: 'Jhon',
    email: 'jhon@test.com',
  },
  {
    id: 'b30775fc-a7ff-4125-8907-183a3e7bf3d2',
    age: 8,
    name: 'Jhon',
    email: 'jhon@test2.com',
  }
]
```

- It is possible to be more precise by adding <span style="text-decoration: underline;">additional parameters</span>.
- If there are no values in the database, an empty `array[]` is returned.

```Typescript
const user = await prisma.user.findMany({
    where: {
      name: "Ben",
      age: { lt: 20 },
    },
  })

// Result
[
  {
    id: 'adf18ca4-a642-4f85-96ec-fab3e3a',
    age: 17,
    name: 'Ben',
    email: 'ben@test.com',
  },
  {
    id: 'b30775fc-a7ff-4125-8907-183a3e',
    age: 19,
    name: 'Ben',
    email: 'ben@test2.com',
  }
]
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">gt</span>
</div>

The `gt` option takes an `Object{}`, and returns all the values present in the database,
<span style="text-decoration: underline;">greater than the one chosen</span>.

```Typescript
const user = await prisma.user.findMany({
  where: {
    name: "Ben",
    age: { gt: 20 },
  },
})

// Returns all greater values
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">lte</span>
</div>

The `lte` option takes an `Object{}`, and returns all the values present in the database,
lower or `equal` than the one chosen

```Typescript
const user = await prisma.user.findMany({
    where: {
      age: { lte: 20 },
    },
  })
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">gte</span>
</div>

The `gte` option takes an `Object{}`, and returns all the values present in the database,
greater or `equal` than the one chosen.

```Typescript
const user = await prisma.user.findMany({
  where: {
    name: "Ben",
    age: { gte: 20 },
  },
})

// Returns all greater or equal values
```

<div style="margin-top: 25px;"></div>

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">contains</span>
</div>

The `contains` option allows you to check which **text** is
<span style="text-decoration: underline;">contained in another part of a text</span>.

```Typescript
const user = await prisma.user.findMany({
  where: {
    email: {contains: "@test2.com" },
  },
})

// Result
[
  {
    id: 'adf18ca4-a642-4f85-96ec-fab3e3a',
    age: 37,
    name: 'Jhon',
    email: 'jhon@teste.com',
  },
  {
    id: 'b30775fc-a7ff-4125-8907-183a3e',
    age: 39,
    name: 'Ben',
    email: 'ben@test2.com',
  }
]
```

- It is possible to be more precise by adding <span style="text-decoration: underline;">additional parameters</span>.
- If there are no values in the database, an empty `array[]` is returned.

```Typescript
const user = await prisma.user.findMany({
    where: {
      name: "Ben"
      email: {contains: "@test2.com" },
    },
  })

  // Result
[
  {
    id: 'b30775fc-a7ff-4125-8907-183a3e',
    age: 39,
    name: 'Ben',
    email: 'ben@test2.com',
  }
]
```

<div style="margin-top: 25px;"></div>

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">endsWith</span>
</div>

The `endsWith` option allows to check the end of a **text** is
<span style="text-decoration: underline;">contained in another part of a text</span>.

```Typescript
const user = await prisma.user.findMany({
  where: {
    email: {endsWith: "@test2.com" },
  },
})

// Returns all results containing "@test2.com" at the end
```

- It is possible to be more precise by adding <span style="text-decoration: underline;">additional parameters</span>.
- If there are no values in the database, an empty `array[]` is returned.

```Typescript
const user = await prisma.user.findMany({
    where: {
      name: "Ben"
      email: {endsWith: "@test2.com" },
    },
  })

  // Returns all results of those with a name "Ben"
  // and containing the text "test" at the end of another text
[
  {
    id: 'b30775fc-a7ff-4125-8907-183a3e',
    age: 39,
    name: 'Ben',
    email: 'ben@test2.com',
  }
]
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 17px;">startWith</span>
</div>

The `startWith` option allows to check the **start** of a **text** is
<span style="text-decoration: underline;">contained in another part of a text</span>.

```Typescript
const user = await prisma.user.findMany({
  where: {
    email: {startWith: "ben" },
  },
})

```

- It is possible to be more precise by adding <span style="text-decoration: underline;">additional parameters</span>.
- If there are no values in the database, an empty `array[]` is returned.

```Typescript
const user = await prisma.user.findMany({
  where: {
    email: {startWith: "ben" },
  },
  age: 37
})

// Return all results with text start with "ben" and age equal to 37
```

<div style="margin-top: 25px;"></div>

### <p style="text-decoration: underline; font-weight: bold;">Keyword Combinations</p>

- The keywords of combinations `AND`, `OR`,
  take an `array[]` with the different **queries** chosen.

- If there are no values in the database, an empty `array[]` is returned.

- All queries in the combination keywords must be within an `object{}`

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600;">AND</span>
</div>

Returns all results that meet the two selected conditions

```Typescript
const user = await prisma.user.findMany({
    where: {
      AND: [
        { email: { startsWith: "ben" } },
        { email: { endsWith: "@test2.com"} },
      ],
    },
  })

// Result for Combination
[
  {
    id: 'f75b15be-97d2-4cd0-b3b2-2c58ab3893e4',
    age: 38,
    name: 'Ben',
    email: 'bendevweb@test2.com'
  }
]
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600;">OR</span>
</div>

Returns all results that meet one of the two selected conditions.

```Typescript
const user = await prisma.user.findMany({
    where: {
      OR: [
        { email: { startsWith: "jan" } },
        { age: { gt: 37 } }
      ],
    },
  })

// Results Combination
[
  {
    id: '5c641e9f-4c9c-40ce-940a-26a7ac',
    age: 48,
    name: 'Jane',
    email: 'jane@test2.com',
  },
  {
    id: 'f75b15be-97d2-4cd0-b3b2-2c58ab',
    age: 38,
    name: 'Ben',
    email: 'bendevweb@test2.com',
  },
  {
    id: 'f9251c9c-ed30-4c6b-8b3a-affa20',
    age: 47,
    name: 'Jane',
    email: 'jane@test.com',
  }
]
```

<div style="margin-top: 30px;"></div>

### [<p style="text-decoration: underline; font-weight: bold; color: white;">Relationship filtering</p>](#relationship-filtering)

---

<div style="margin-top: 15px;"></div>

#### <p style="font-weight: bold;">Queries and Relationships</p>

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600;">every</span>
</div>

- Check where `every` fields contain a query

```Typescript
const user = await prisma.user.findMany({
    where: {
      writtenPosts: {
        every: {
          title: "Test",
        }
      },
    },
  })
```

In the example below we check that :

- `every` **Post**
- that contains the property **title**
- and the value **"Test"**

- #### If **nothing is found** <span style="text-decoration: underline;">all users are returned</span>

<div style="margin-top: 30px;"></div>

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600;">none</span>
</div>

- Check or `none` of the fields contain a query

```Typescript
const user = await prisma.user.findMany({
    where: {
      writtenPosts: {
        none: {
          title: "Test",
        }
      },
    },
  })
```

- `none` **Post**
- that contains the property **title**
- and the value **"Test"**

- #### If **nothing is found** <span style="text-decoration: underline;">all users are returned</span>

<div style="margin-top: 30px;"></div>

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600;">some</span>
</div>

- Check or `some` fields contain a query

```Typescript
const user = await prisma.user.findMany({
    where: {
      writtenPosts: {
        some: {
          title: "Test",
        }
      },
    },
  })
```

- `some` **Post**
- that contains the property **title**
- and the value **"Test"**

- #### If **nothing is found** <span style="text-decoration: underline;">an empty `array[]` is returned</span>

<div style="margin-top: 25px;"></div>

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600;">is</span>
</div>

<div style="margin-top: 10px;"></div>

- Checks if the condition is **fulfilled**
- Otherwise returns an empty `array[]`.

```Typescript
const user = await prisma.post.findMany({
    where: {
      author: {
        is: {
          age: 37,
        }
      },
    },
  });

  // Result
  [
    {
    id: 'f75b15be-97d2-4cd0-b3b2-2c58ab',
    age: 37,
    name: 'Ben',
    email: 'bendevweb@test2.com',
  }
  ]
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600;">is</span>
</div>

<div style="margin-top: 10px;"></div>

- Checks if the condition is **fulfilled**
- Otherwise returns an empty `array[]`.

```Typescript
const user = await prisma.post.findMany({
    where: {
      author: {
        isNot: {
          age: 37,
        }
      },
    },
  });

  // Result
  []
```

<div style="margin-top: 0px; margin-bottom: 0px;">
<span style="color: greenYellow; font-weight: 600; font-size: 16px;"> Nesting Queries</span>
</div>

> All the different queries mentioned can be nested at infinite levels of depth.

<!-- <div style="margin-top: 30px;"></div> -->

<div style="margin-top: 30px;"></div>

### [Updating Data](#updating-data)

To update data with Prisma,
it is possible to use either the `Upadate` or `UpdateMany` function.

```Typescript
// Update first User
const user = await prisma.user.update({})

// Update all Users
const user = await prisma.user.updateMany({})
```

```Typescript
const user = await prisma.user.update({
  //1. What to change
    where: {
      email: "mat@test2.com",
    },

    //2. Changes
    data: {
      email: "mateo@test2.com"
    }
  });

// Result
{
  id: 'b30775fc-a7ff-4125-8907-183a3e',
  age: 38,
  name: 'Matèo',
  email: 'mateo@test2.com',
}
```

- It is possible to add<span style="text-decoration: underline;">additional parameters like :</span>

- `Include`

- `Select`

---

```Typescript
// Ordered by age ascending
// Where email contains prisma.io
// Limited to the 10 users
const aggregations = await prisma.user.aggregate({
  _avg: {
    age: true,
  },
  where: {
    email: {
      contains: "prisma.io",
    },
  },
  orderBy: {
    age: "asc",
  },
  take: 10,
})
```

<!--
<div style="margin-top: 15px;"></div>

```Bash
npm install --save-dev prisma typescript ts-node @types/node nodemon
npx prisma init --datasource-provider mysql
npx prisma migrate dev --name init
```


[
  {
    id: '5c641e9f-4c9c-40ce-940a-26a7ac42529d',
    age: 48,
    name: 'Céline',
    email: 'celine@test2.com',
    role: 'BASIC',
    userPreferenceId: null
  },
  {
    id: 'adf18ca4-a642-4f85-96ec-fab3e3a6e84d',
    age: 7,
    name: 'Matèo',
    email: 'mateo@test.com',
    role: 'BASIC',
    userPreferenceId: null
  },
  {
    id: 'b30775fc-a7ff-4125-8907-183a3e7bf3d2',
    age: 8,
    name: 'Matèo',
    email: 'mat@test2.com',
    role: 'BASIC',
    userPreferenceId: null
  },
  {
    id: 'e08fe917-47d6-481f-b176-9b01f04ce5a7',
    age: 37,
    name: 'Ben',
    email: 'bendevweb@test.com',
    role: 'BASIC',
    userPreferenceId: null
  },
  {
    id: 'f75b15be-97d2-4cd0-b3b2-2c58ab3893e4',
    age: 38,
    name: 'Ben',
    email: 'bendevweb@test2.com',
    role: 'BASIC',
    userPreferenceId: null
  },
  {
    id: 'f9251c9c-ed30-4c6b-8b3a-affa20198cdd',
    age: 47,
    name: 'Céline',
    email: 'celine@test.com',
    role: 'BASIC',
    userPreferenceId: null
  }
]

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
