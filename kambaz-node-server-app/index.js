import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

const app = express();
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000)


console.log("Server running on http://localhost:4000");