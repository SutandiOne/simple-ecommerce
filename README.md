This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Simple Project Ecommerce

inspired by [SimpleTut](https://www.youtube.com/playlist?list=PL-Db3tEF6pB8UO2MmccX-5qeGDX9rek7Q).

## Package

- Firebase (Auth, Firestore, Cloud Functions)
- Midtrans
- Redux Toolkit
- Redux Persist
- React Hook Form
- React Table
- React Icons
- Ckeditor 5
- Tailwindcss with Craco

## Installation

- Install Depends

```sh
npm install

cd functions
npm install

```

- Setup Firebase

```sh
npm install -g firebase-tools
firebase init
```

1. Select feature Firestore, Functions, Emulators.
1. Don't overwrite rules, and file functions
1. Select feature emulators Auth, Firestore, Functions

- Setup Env

```sh
cp .env.example .env

cd functions

firebase functions:config:set app.url="http://localhost:3000"
firebase functions:config:set midtrans.server_key="Your-Key-Server"
firebase functions:config:set midtrans.client_key="Your-key-Client"
firebase functions:config:get > .runtimeconfig.json
```

don't forget set key in .env

## Run

- Emulator

```sh
firebase emulators:start --import emulators
```

- React App

```sh
npm start
```
