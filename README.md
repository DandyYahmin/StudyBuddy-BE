
# ExpressJS Standard Authentication






### Authors

- [@DandyYahmin](https://github.com/DandyYahmin)


### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SERVER_PORT`

`SERVER_SIGNATURE`


### API Reference

```http
  POST /api/*
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `signature` | `string` | **Required**. same as `ENV.SERVER_SIGNATURE` |
| `device` | `string` | **Required**. `web` or `mobile`  |

```http
  POST /api/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**.|
| `password`      | `string` | **Required**.|

```http
  POST /api/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. must be registered|
| `password`      | `string` | **Required**. must be registered|

```http
  POST /api/vr/*
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. must be registered|
| `token`      | `string` | **Required**. min length 100|

```http
  POST /api/vr/logout
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| | | |




### Used By

I use this project on:

-




### License

End User License Agreement (EULA)

Last updated: `6 June 2024`

This `End User License Agreement` is a legal contract between `you` and `Dandy D. Al Yahmin` regarding use of the software, including all materials in it. `By installing, using or modifying this Software, you agree to be bound by the terms of this Agreement`.

#### Grant of License

`Dandy D. Al Yahmin` grants you a `limited`, `non-exclusive`, `non-transferable` license to download, use, and modify.

#### Ownership Rights

`Dandy D. Al Yahmin` and its `contributor` retain all right, title and interest in the Software, `and all of it has been assigned to you`. `"THIS SOFTWARE HAS BEEN SOLD TO YOU"`

