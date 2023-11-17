## API Reference

## URL

_Server_

```
http://localhost:3000
```

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

## RESTful endpoints

### POST /api/user/

> Post New User

_Request Header_

```
Authenticated as Admin
Bearer <Token_Admin>
```

_Request Body_

```
{
    "fullName" : <User_full_name>
    "email" : <email_user>
    "roleId" : <role_user>
    "password" : <password_user>
    "confirmPassword": <confirm_password_user>
}
```

_Response (200)_

```
{
    "data": {<Data_user>},
    "status": "Success Create User"
}
```

_Response (400 - User Already Exist)_

```
{
    "message": "User Already Exist"
}
```

_Response (404 - Role Not Found)_

```
{
    "message": "Role Not Found"
}
```

_Response (400 - Validation Error)_

```
{
    "message": "*/fullName*/ min length 3 and required"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### POST /api/user/user-login

> User Login

_Request Header_

```
not needed
```

_Request Body_

```
{
    "email": <email_user>
    "password": <password_user>
}
```

_Response (200)_

```
{
    "data": {<data_user>},
    "status": "Success"
}
```

_Response (400 - Password is not same)_

```
{
    "message": "Password is not same"
}
```

_Response (400 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### POST /api/user/user-logout

> Post user logout

_Request Header_

```
Authorization Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "status": "Success Logout"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### POST /api/inventory/

> Create Inventory

_Request Header_

```
Authorization Bearer Token as Admin
```

_Request Body_

```
{
    "name" : <inventory_name>
    "count" : <count_item>
    "description" : <description_item>
    "categoryId" : <category_id>
    "image" : <file_photo_image_item>
}
```

_Response (400 - Inventory Name Already used)_

```
{
    "message": "Inventory Name Already used"
}
```

_Response (404 - Category not found)_

```
{
    "message": "Category not found"
}
```

_Response (400 - Image size exceeds the limit.)_

```
{
    "message": "Image size exceeds the limit."
}
```

_Response (200)_

```
{
    "status": "Success Create Inventory"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### POST /api/category/

> Create category

_Request Header_

```
Authorization Bearer Token as Admin
```

_Request Body_

```
{
    "categoryName" : <category_name>

}
```

_Response (400 - Category Name is Already Used)_

```
{
    "message": "Category Name is Already Used"
}
```

_Response (400 - Validation Error)_

```
{
    "message": "Validation Error"
}
```

_Response (200)_

```
{
    "status": "Success Create Category"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Internal Server Error"
}
```

### GET /api/user

> Get All user

```http
    GET /api/user/
```

_Request Header_

```
Authenticated as Super Admin Bearer Token
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_user>],
    "status": "Success"
}
```

_Response (403, "Unauthorized")_

```
{
    "message" : "Unauthorized"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

#### User Detail

```http
    GET /api/user/:identifier(id or email)
```

_Request Header_

```
Bearer Token as Super Admin
```

_Request Body_

```
not needed
```

_Request Params_

```
id or email user
```

_Response (200)_

```
{
    "data": [<data_user>],
    "status": "Success"
}
```

_Response (404 - User Not Found)_

```
{
    "message": "User Not Found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

#### User Profile

```http
    GET /api/user/user-profile/
```

_Request Header_

```
Bearer Token as User Login
```

_Request Body_

```
not needed
```

_Request Params_

```
id or email user
```

_Response (200)_

```
{
    "data": [<data_user>],
    "status": "Success"
}
```

_Response (404 - User Not Found)_

```
{
    "message": "User Not Found"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

### GET /api/inventory

```http
    GET /api/inventory
```

_Request Header_

```
Bearer Token as Admin
```

_Request Body_

```
not needed
```

_Request Params_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_user>],
    "status": "Success"
}
```

_Response (403 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

#### Inventory Detail

```http
    GET /api/user/:identifier(id or email)
```

_Request Header_

```
Bearer Token as Admin on Login or Super Admin
```

_Request Body_

```
not needed
```

_Request Params_

```
id or name inventory
```

_Response (200)_

```
{
    "data": [<data_inventory>],
    "status": "Success"
}
```

_Response (404 - Inventory not found)_

```
{
    "message": "Inventory not found"
}
```

_Response (404 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

### GET /api/categories

> Get All categories

```http
    GET /api/categories/
```

_Request Header_

```
Bearer Token as Admin
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_buku>],
    "status": "Success"
}
```

_Response (403 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

### GET /api/categories/:id

> Get Category By Id

```http
    GET /api/categories/:id
```

_Request Header_

```
Bearer Token as Admin
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<data_buku>],
    "status": "Success"
}
```

_Response (404 - Category Not Found)_

```
{
    "message": "Category Not Found"
}
```

_Response (403 - Unauthorized)_

```
{
    "message": "Unauthorized"
}
```

_Response (500 - Server Error)_

```
{
    "message": "Server Error"
}
```

### PUT /api/user/user-profile/:id

> Update user profile by id

_Request Params_

```
/<user_id>
```

_Request Header_

```
Bearer token as Super Admin or Admin Login
```

_Request Body_

```
{
    "fullName": <fullname_user>,
    "email": <email_user>
}
```

_Response (200)_

```
{
    "data": {updated_user},
    "message": "Success"
}
```

_Response (400 - User Not Found)_

```
{
    "status": 404,
    "message": "User Not Found"
}
```

_Response (403 - Unauthorized)_

```
{
    "status": 403,
    "message": "Unauthorized"
}
```

_Response (400 - Validation Error)_

```
{
    "status": 404,
    "message": "\"fullName\" length must be more than 3"
}
```

### PUT /api/user/user-role/:id

> Update user role by id

_Request Params_

```
/<user_id>
```

_Request Header_

```
Bearer token as Super Admin
```

_Request Body_

```
{
    "roleId": <role_id>,
}
```

_Response (200)_

```
{
    "data": {updated_user},
    "message": "Success"
}
```

_Response (400 - User Not Found)_

```
{
    "status": 404,
    "message": "User Not Found"
}
```

_Response (403 - Unauthorized)_

```
{
    "status": 403,
    "message": "Unauthorized"
}
```

_Response (400 - Validation Error)_

```
{
    "status": 404,
    "message": "\"fullName\" length must be more than 3"
}
```

_Response (404 - Role Id Not Found)_

```
{
    "status": 404,
    "message": "Role Id Not Found"
}
```

### PUT /api/user/user-password/:id

> Update user password by id

_Request Params_

```
/<user_id>
```

_Request Header_

```
Bearer token as Super Admin or Admin Login
```

_Request Body_

```
{
    "password": <new_password>,
    "confirmPassword": <new_confirmPassword>,
}
```

_Response (200)_

```
{
    "data": {updated_user},
    "message": "Success"
}
```

_Response (400 - User Not Found)_

```
{
    "status": 404,
    "message": "User Not Found"
}
```

_Response (403 - Unauthorized)_

```
{
    "status": 403,
    "message": "Unauthorized"
}
```

_Response (400 - Validation Error)_

```
{
    "status": 404,
    "message": "\"password\" length must be more than 3"
}
```

### PUT /api/inventory/inventory-profile/:id

> Update by id

_Request Params_

```
/<inventory_id>
```

_Request Header_

```
Bearer Token as Admin
```

_Request Body_

```
{
    "name": "<new_inventory_name>",
    "description": "<description_inventory>",
    "categoryId": "<category_id>",
    "image": "<new_image_file>",
}
```

_Response (200)_

```
{
    "data": {update_inventory},
    "message": "Success"
}
```

_Response (404 - Category Not Found)_

```
{
    "status": 404,
    "message": "Category Not Found"
}
```

_Response (400 - Inventory Name already used)_

```
{
    "status": 404,
    "message": "Inventory Name already used"
}
```

_Response (400 - Image size exceeds the limits)_

```
{
    "status": 400,
    "message": "Image size exceeds the limits"
}
```

_Response (400 - Validation Error)_

```
{
    "status": 404,
    "message": "\"name\" length must be more than 3"
}
```

### PUT /api/inventory/inventory-count/:id

> Update by id

_Request Params_

```
/<inventory_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
{
    "count": "<count_item_for_buy>",
    "isPurchase": "<true ( for purchase )>",
}
```

_Request Body_

```
{
    "count": "<count_item_for_add_count>",
    "isPurchase": "<false ( for add count )>",
}
```

_Response (200)_

```
{
    "data": {update_inventory},
    "message": "Success"
}
```

_Response (404 - Inventory Not Found)_

```
{
    "status": 404,
    "message": "Inventory Not Found"
}
```

_Response (400 - Inventory has no more count)_

```
{
    "status": 404,
    "message": "Inventory has no more count"
}
```

### PUT /api/category/:id

> Update category by Id

_Request Params_

```
/<category_id>
```

_Request Header_

```
Bearer Token as Admin
```

_Request Body_

```
{
    "categoryname": "<new_category_name>",
}
```

_Response (200)_

```
{
    "data": {update_category},
    "message": "Success"
}
```

_Response (400 - Category Name Already Used)_

```
{
    "status": 400,
    "message": "Category Name Already Used"
}
```

_Response (404 - Category Not found)_

```
{
    "status": 404,
    "message": "Category Not found"
}
```

_Response (400 - Validation Error)_

```
{
    "status": 404,
    "message": "\"categoryName\" length must be more than 3"
}
```

### DELETE /api/user/:id

> Delete user by id

_Request Params_

```
/<user_id>
```

_Request Header_

```
Bearer Token as Super Admin
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Success"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "User Not Found"
}
```

### DELETE /api/inventory/:id

> Delete inventory by id

_Request Params_

```
/<inventory_id>
```

_Request Header_

```
Bearer Token as Admin
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Success"
}
```

_Response (404 - Inventory Not Found)_

```
{
    "message": "Inventory Not Found"
}
```

### DELETE /api/category/:id

> Delete category by id

_Request Params_

```
/<category_id>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "message": "Success"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Category Not Found"
}
```
