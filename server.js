const express     = require("express");
const morgan      = require("morgan");
const compression = require("compression");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression({ level: 1 }));
app.use(morgan("dev"));
app.use(require("./routes"));

app.listen(3030, () => console.log("server running on port 3030"));