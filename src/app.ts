import "dotenv/config";
import express from "express";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(router);

app.get("/github", (request, reponse) => {
    reponse.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
});

app.get("/signin/callback", (request, reponse) => {
    const { code } = request.query
    return reponse.json(code)
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is run in port ${PORT}`));