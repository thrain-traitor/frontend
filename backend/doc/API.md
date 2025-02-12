# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

### 1. Login

- **Endpoint:** `/auth/login`
- **Method:** `POST`
- **Description:** Mengautentikasi pengguna dan mengembalikan token akses.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "accessToken": "your_jwt_token"
    }
    ```
  - **Error (401):**
    ```json
    {
      "message": "Invalid Credentials"
    }
    ```

### 2. Register

- **Endpoint:** `/auth/register`
- **Method:** `POST`
- **Description:** Mendaftarkan pengguna baru dan membuat profil secara otomatis.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "id": 1,
      "email": "user@example.com",
      "is_admin": false,
      "profile": {
        "id": 1,
        "user_id": 1,
        "first_name": "anon",
        "last_name": null,
        "bio": null,
        "profile_picture": null
      }
    }
    ```
  - **Error (400):**
    ```json
    {
      "message": "Password is required"
    }
    ```

## Users

### 1. Create User

- **Endpoint:** `/users`
- **Method:** `POST`
- **Description:** Membuat pengguna baru.
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "id": 1,
      "email": "user@example.com",
      "is_admin": false,
      "profile": {
        "id": 1,
        "user_id": 1,
        "first_name": "anon",
        "last_name": null,
        "bio": null,
        "profile_picture": null
      }
    }
    ```
  - **Error (400):**
    ```json
    {
      "message": "Password is required"
    }
    ```

### 2. Get All Users

- **Endpoint:** `/users`
- **Method:** `GET`
- **Description:** Mengambil daftar semua pengguna beserta profil mereka.
- **Response:**
  - **Success (200):**
    ```json
    [
      {
        "id": 1,
        "email": "user@example.com",
        "is_admin": false,
        "profile": {
          "id": 1,
          "user_id": 1,
          "first_name": "anon",
          "last_name": null,
          "bio": null,
          "profile_picture": null
        }
      }
    ]
    ```

### 3. Get User by ID

- **Endpoint:** `/users/:id`
- **Method:** `GET`
- **Description:** Mengambil detail pengguna berdasarkan ID.
- **Parameters:**
  - `id` (number): ID pengguna yang ingin diambil.
- **Response:**
  - **Success (200):**
    ```json
    {
      "id": 1,
      "email": "user@example.com",
      "is_admin": false,
      "profile": {
        "id": 1,
        "user_id": 1,
        "first_name": "anon",
        "last_name": null,
        "bio": null,
        "profile_picture": null
      }
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "User  not found"
    }
    ```

### 4. Update User

- **Endpoint:** `/users/:id`
- **Method:** `PUT`
- **Description:** Memperbarui informasi pengguna berdasarkan ID.
- **Parameters:**
  - `id` (number): ID pengguna yang ingin diperbarui.
- **Request Body:**
  ```json
  {
    "email": "new_email@example.com",
    "is_admin": true
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "id": 1,
      "email": "new_email@example.com",
      "is_admin": true,
      "profile": {
        "id": 1,
        "user_id": 1,
        "first_name": "anon",
        "last_name": null,
        "bio": null,
        "profile_picture": null
      }
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "User  not found"
    }
    ```

### 5. Delete User

- **Endpoint:** `/users/:id`
- **Method:** `DELETE`
- **Description:** Menghapus pengguna berdasarkan ID.
- **Parameters:**
  - `id` (number): ID pengguna yang ingin dihapus.
- **Response:**
  - **Success (204):** `No Content`
  - **Error (404):**
    ```json
    {
      "message": "User  not found"
    }
    ```

## Profile (Dalam Tahap Pengembangan)

### 1. Get User Profile

- **Endpoint** ```markdown
`/users/:id/profile`

- **Method:** `GET`
- **Description:** Mengambil profil pengguna berdasarkan ID.
- **Parameters:**
  - `id` (number): ID pengguna yang profilnya ingin diambil.
- **Response:**
  - **Success (200):**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "first_name": "anon",
      "last_name": null,
      "bio": null,
      "profile_picture": null
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "User  not found"
    }
    ```

### 2. Update User Profile

- **Endpoint:** `/users/:id/profile`
- **Method:** `PUT`
- **Description:** Memperbarui profil pengguna berdasarkan ID.
- **Parameters:**
  - `id` (number): ID pengguna yang profilnya ingin diperbarui.
- **Request Body:**
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "bio": "This is my bio",
    "profile_picture": "http://example.com/my-picture.jpg"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "id": 1,
      "user_id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "bio": "This is my bio",
      "profile_picture": "http://example.com/my-picture.jpg"
    }
    ```
  - **Error (404):**
    ```json
    {
      "message": "User  not found"
    }
    ```
