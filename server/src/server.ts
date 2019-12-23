import express from "express";
import bodyParser from "body-parser";
import { Response, ParamsDictionary } from "express-serve-static-core";
import request from "request";

const app = express();
const port = process.env.PORT || 5000;
const realtidApiKey = "4d2534968afe446eba10b8415adf0599";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/api/realtime", (req, res) => {
    const baseUrl = "https://api.sl.se/api2/realtimedeparturesV4.json";

    const params: ParamsDictionary = {
        key: realtidApiKey,
        siteid: req.query["siteId"],
        timewindow: "60",
    };
    fetchData(baseUrl, params, res);
});

app.post("/api/world", (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`
    );
});

function fetchData(
    baseUrl: string,
    params: ParamsDictionary = {},
    res: Response
) {
    const url = new URL(`${baseUrl}`);
    Object.keys(params).forEach(key =>
        url.searchParams.append(key, params[key])
    );

    request(url.href).pipe(res);
}

app.listen(port, () => console.log(`Listening on port ${port}`));
