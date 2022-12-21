import express from "express";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signing";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.listen(3000, () => {
    console.log("Listening on port 3000!");
});
