import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import users from "./users/routes/users-route.js";
import places from "./places/routes/places-route.js";
import comments from "./comments/routes/comment-route.js";
import likes from "./Likes/routes/likes-route.js";
const app = express();
/* some middlewares for the incoming request */
app.use(express.json());
app.use(cors());

app.use("/api/users", users);
app.use("/api/places", places);
app.use("/api/comments", comments);
app.use("/api/likes", likes);
/**handle unsportted routes */
app.use("/", (req, res, next) => {
  return next(new Error("could not found this route"));
});

/* handling errors with this middleware */

app.use((err, req, res, next) => {
  res.status(err.code || 500).json({ err: err.message });
});

/* connect to the database then start the server */
mongoose
  .connect("mongodb://localhost:27017/sharePlace_DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () => {
      console.log("server start on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// import express from "express";

// const app = express();
// const port = 5000;

// // app.use(express.static("public"));

// app.get("/", (req, res, next) => {
//   res.sendFile("index.html");
// });

// app.listen(port, () => console.log(`Listening on port ${port}!`));

// import express from "express";

// import express from "express";
// import * as queryString from "query-string";
// import axios from "axios";

// const app = express();

// app.use(express.json());
// app.use(express.static("public"));

// app.post("/send", (req, res, next) => {
//   const secret_key = "6LcUQHYcAAAAAFTxrprVzXzXzc3N-uOQGkR3MgJn";
//   const { token } = req.body.data;
//   const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;

//   fetch(url, {
//     method: "post",
//   })
//     .then((response) => response.json())
//     .then((google_response) => res.json({ google_response }))
//     .catch((error) => res.json({ error }));
// });

// app.post("/send", (req, res, next) => {
//   const { fname, lname } = req.body.userData;
// });
// async function getGoogleUserInfo(access_token) {
//   const { data } = await axios({
//     url: "https://www.googleapis.com/oauth2/v2/userinfo",
//     method: "get",
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });
//   console.log(data); // { id, email, given_name, family_name }
//   return data;
// }

// async function getAccessTokenFromCode(code) {
//   try {
//     const { data } = await axios({
//       url: `https://oauth2.googleapis.com/token`,
//       method: "post",
//       data: {
//         client_id:
//           "351051596399-6rtkeutm20c1uumpa8vgnnc2922j0hhg.apps.googleusercontent.com",
//         client_secret: "Pp1TivMOaM941HMRZVUZzlkU",
//         redirect_uri: "http://localhost:5000/login",
//         grant_type: "authorization_code",
//         code,
//       },
//     });
//     return data.access_token;
//   } catch (err) {
//     console.log("error in axios", err);
//   }

//   // console.log(data); // { access_token, expires_in, token_type, refresh_token }
//   // return data.access_token;
// }

// const stringifiedParams = queryString.stringify({
//   client_id:
//     "351051596399-6rtkeutm20c1uumpa8vgnnc2922j0hhg.apps.googleusercontent.com",
//   redirect_uri: "http://localhost:5000/login",
//   scope: [
//     "https://www.googleapis.com/auth/userinfo.email",
//     "https://www.googleapis.com/auth/userinfo.profile",
//   ].join(" "), // space seperated string
//   response_type: "code",
//   access_type: "offline",
//   prompt: "consent",
// });

// const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

// const indexs = `<a href=${googleLoginUrl}>Login with Google</a>`;

// app.get("/", (req, res, next) => {
//   res.send(indexs);
// });

// app.get("/login", async (req, res, next) => {
//   const code = req.query.code;

//   try {
//     const token = await getAccessTokenFromCode(code);
//     const data = await getGoogleUserInfo(token);
//     res.send(data);
//   } catch (err) {
//     console.log("login", err);
//   }
// });
// app.post("/login", (req, res, next) => {
//   res.send("hello");
// });

// app.listen(5000, () => {
//   console.log("listen on port 5000");
// });
