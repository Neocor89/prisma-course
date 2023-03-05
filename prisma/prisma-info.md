# **PRISMA ORM INFORMATION**

## Table of Contents

1. [General Info 🗞️](#general-info)
2. [Installation 👨‍💻](#installation)
3. [Setup Prisma Database](#setup-prisma-database)
4. [Start](#collaboration)
5. [FAQs](#faqs)
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

### **Setup Prisma Database**

---

Next, create a new Prisma project by running the following command in your terminal:

```Bash
npx prisma init
```

> This command will create and initialize a new Prisma project with a basic directory structure and a "<span style="text-decoration: underline;">schema.prisma</span>" file that describes your **database schema**.

<div style="margin-top: 15px;"></div>

> It is possible to specify directly the database you use with this command

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
DATABASE_URL=<database>://<user>:@localhost:<port>/<name-database>
```

For more information check url connection in [Prisma documentation](https://www.prisma.io/docs/reference/database-reference/connection-urls)

<div style="margin-top: 30px;"></div>

> ### **Start**

---

<!--
Update available 4.10.1 -> 4.11.0
Run the following to update

npm i --save-dev prisma@latest
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

> That's it!

You have now installed Prisma with npm and created a new Prisma project. You can now start using Prisma to interact with your `database`.

```Bash
npm install --save-dev prisma typescript ts-node @types/node nodemon
npx prisma init --datasource-provider mysql
npx prisma migrate dev --name init
```

#### **Data Migration into Database**

<!-- Create a new Prisma project using the command "npx prisma init" in a terminal. This command will generate a "prisma/schema.prisma" file that describes your database.

Open the "prisma/schema.prisma" file in a text editor and edit the "datasource" section to include your MySQL database connection information. Here is an example of the configuration:
: For validation command
 npm prisma migrate dev --name init
: migration prisma dev DB
-->

```Bash
Datasource "db": MySQL database "test" at "localhost:3306"

Applying migration `20230302164110_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20230302164110_init/
    └─ migration.sql

Your database is now in sync with your schema.

Running generate... (Use --skip-generate to skip the generators)
```
