const express = require("express");

//express server
const app = express();

app.get("/rest", (req, res) => {
  res.json({
    data: "API is working...",
  });
});

app.listen(5000, () => {
  console.log(`🚀 Server is running at http://localhost: 5000`);
});
