# GroupProjectW1
​
## restful API
kami memberikan beberapa bentuk rest API dengan menggunakan ENDPOINT
<!-- Blockquote -->
> http://localhost:4000
​
dalam pembtan web ini digunakan API dari 3 endpoint yaitu :
1. financialpreparingmodel
2. sjfnas
3. asljkd
​
METHOD: POST
​
<!-- Blockquote -->
><!-- Tables -->
>| METHOD      | PARAMS   | RETURNING   | OPTIONS   | DETAILS   | FORMAT    |
>| --------- | ------- | ------- |------- |------- |------- |
>| POST | /users/register | User 'TOKEN'  | body must filled | (Name, Username, Email, Password) |-|
>| POST | /users/login | User 'TOKEN' | body must filled | (Username or Email, Password)|-|
>| POST | /users/stocks | Stocks DATA | headers must filled  | User's 'TOKEN' |application/JSON|
>| POST | /users/google_login | User 'TOKEN' | - | - |-|
​
METHOD: GET
​
​
<!-- Blockquote -->
><!-- Tables -->
>| METHOD      | PARAMS   | RETURNING   | OPTIONS   | DETAILS   | FORMAT    |
>| --------- | ------- | ------- |------- |------- |------- |
>| GET | /users | User DATA | headers must filled  | User's 'TOKEN' |application/JSON|
>| GET | /users/stocks | User's Stocks Lists | headers must filled  | User's 'TOKEN' |application/JSON|
>| GET | /stocks | All Stocks Lists | headers must filled  | User's 'TOKEN' |application/JSON|
​
​
METHOD: PUT
<!-- Blockquote -->
><!-- Tables -->
>| METHOD      | PARAMS   | RETURNING   | OPTIONS   | DETAILS   | FORMAT    |
>| --------- | ------- | ------- |------- |------- |------- |
>| PUT | /users | update User's DATA | body must be filled  | Username or Email, Password |application/JSON|
​
​
​
METHOD: DELETE
<!-- Blockquote -->
><!-- Tables -->
>| METHOD      | PARAMS   | RETURNING   | OPTIONS   | DETAILS   | FORMAT    |
>| --------- | ------- | ------- |------- |------- |------- |
>| DELETE | /users/stocks/:id | Removing User's Stock DATA | headers must filled  | User's 'TOKEN' |TRUE / FALSE|
​
​
​
​
for further detail you can see the response on the link below
<!-- Links -->
><a href="https://web.postman.co/collections/10566542-c91decc9-eaa2-42f9-9ca4-fefdcc93acd2?version=latest&workspace=d1851e39-f425-4335-8601-b09bf8498bbc"> click here </a>
​
​
<!-- Blockquote -->