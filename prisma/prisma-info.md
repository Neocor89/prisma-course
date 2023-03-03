# **PRISMA ORM INFORMATION**

## Table of Contents

1. [General Info 🗞️](#general-info)
2. [Technologies 👨‍💻](#technologies)
3. [Installation](#installation)
4. [Collaboration](#collaboration)
5. [FAQs](#faqs)

<div style="margin-top: 30px;"></div>

> ### **General Info**

---

What is **Prisma** :

- [Prisma](https://www.prisma.io/) is ORM that helps developers read and write data to databases

---

Before connect Prisma with `XAMPP` and a `MySQL database`, you can follow these steps:

Make sure you have XAMPP installed on your computer. You can download it from the Apache Friends website.

Start the MySQL server in XAMPP by clicking the "Start" button next to "MySQL" in the XAMPP control window.

Create a MySQL database using the phpMyAdmin interface provided by XAMPP. To access phpMyAdmin, open your web browser and go to http://localhost/phpmyadmin/.

---

#### **Installation**

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

Next, create a new Prisma project by running the following command in your terminal:

```Bash
npx prisma init
```

> This command will create a new Prisma project with a basic directory structure and a "schema.prisma" file that describes your database schema.

Finally, you can generate the Prisma client by running the following command in your terminal:

```Bash
npx prisma generate
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

Open the "prisma/schema.prisma" file in a text editor and edit the "datasource" section to include your MySQL database connection information. Here is an example of the configuration: -->

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
