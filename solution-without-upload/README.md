![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Iteration #0

In a terminal #1 (port 5000):
```
npm install
npm run dev
```

In a terminal #2 (port 3000):
```
cd client
npm install
npm start
```

# Iteration #1: Backend

Express-side, implement the backend route: `POST /auth/upload`:

| Method  |  Endpoint         |  Parameters                   | Return Value |
|---------|-------------------|-------------------------------|--------------|
| POST    | `/auth/upload`    | a file with fieldname `photo` | User updated |

- [ ] you should prevent not-logged users from uploading a new avatar
- [ ] your server should store the file to Cloudinary
- [ ] once stored, update the user's `image` property to the Cloudinary URL (into DB)
- [ ] your server should send a `200` with the new user infos as response

# Iteration #2: 

`client`-side, in `Profile` component:
1. just after the avatar `img`, add a form-control that allows the user to select a file from his hard-drive
2. once the file selected: upload that file to your `/auth/upload` route
3. once upload is complete, refresh the avatar with the new uploaded picture.