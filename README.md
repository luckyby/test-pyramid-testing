# REST server for study (created on Next.js)
### Server has next endpoins:

| method | enpoint                                                                                                 |  description |
|--------|---------------------------------------------------------------------------------------------------------|---|
| **POST**   | /api/users/restore with  body: {"login":"admin","password":"5678"}                                      | restore table "person" to original state  |
| **POST**   | /api/users with body for example: {"firstname":"Ben","lastname":"Rogers","role":"captain"}              | create one user with firstname, lastname, and role  |
| **GET**    | /api/users                                                                                              | return json object of all users in database  |
| **GET**    | /api/users/id/[id]                                                                                      | return json object with data of one user selected by id  |
| **PATCH**  | /api/users/id/[id] with body for example: {"firstname":"Peter","lastname":"Parker","role":"spider-man"} |  update one user by id |
| **DELETE** | /api/users/id/[id]                                                                                      |  delete one user by id |
| **DELETE** | /api/users                                                                                              | delete all users  |

### Server has next pages:

| link:  |  description: |
|---|---|
| /about  | page "About this server"  |
| /exchange | page "Exchange rate USD to UAH by National Bank of Ukraine"  |

## Getting Started:

1. Clone repository
```bash
git clone git@github.com:luckyby/test-pyramid-testing.git
```

2. Install all needed:
```bash
npm install
```

3. Make next change before start:
   - 3.1
   For msw create in .env file next variables:
    ```text
    BASE_APP_URL='http://<host>:<port>'           # your server url
    BASE_URL_DB_SERVER='http://<host>:<port>'     # your db server url
    MOCKSERVER='1'                                # 1 for use mockserver
    PACT_BROKER_URL='https://<yourAccaunt>.pactflow.io'  # your pactflow url
    PACT_BROKER_TOKEN_R='ХХХХХХХХХХХХХХХХХХХХХХ'  # your pactflow only read token
    PACT_BROKER_TOKEN_RW='ХХХХХХXXXXXXXXXXXXXXX'  # your pactflow read/write token
    PROVIDER_BASE_URL='http://<host>:<port>'      # your pact provider url 
    ```


4. start sever in dev mode:
```bash
npm run dev
```

or for production build application and start build:
```bash
npm run build
npm run start
```
The default application runs on port = 3000

If you want to run the application on a different port (for example 3010), type in the terminal:
```bash
PORT=3010 npm run dev
```
or change in package.json:
```text
"scripts": {
    ...
    "dev": "next dev -p 3010",
    ...
}
```

 Then open [http://localhost:3010](http://localhost:3010) with your browser to see the result.


