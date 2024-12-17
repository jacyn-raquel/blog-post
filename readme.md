# Blog Post API - Documentation

## Resources

- App Base Url
    - 
- Admin User
    - admin@mail.com

## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

    ```json

    {
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```

#### [POST] - "/users/register"

- Sample Request Body

    ```json

    {
        "username": "sample123",
        "email": "sample@mail.com",
        "password": "samplePw123"
    }

    ```
      
### Blog Posts

#### [POST] - "/posts/"

- Sample Request Body

    ```json

    {
        "title": "Sample Title",
        "content": "Sample content",
    }

    ```

#### [GET] - "/posts/"
- Requires Token
- No Request Body


#### [PATCH] - "/posts/editPost/:postId"
- Requires Token
- Sample Request Body

    ```json

    {
        "title": "Sample Update Title",
        "content": "sample update content",
    }

    ```

#### [DELETE] - "/posts/deletePost/:postId"
- Requires Token
- No Request Body

