import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/filter", async (req, res) => {
  console.log(req.body);
  console.log(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`)
  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${req.body.type}&participants=${req.body.participants}`);
    
    const randomNumber = Math.floor(Math.random()*response.data.length);
    const result = response.data[randomNumber];
    res.render("index.ejs", {data: result});
  } catch (error) {

    // tutaj można przesłać różne rodzaje message error, w zależności od błędu, który wystąpił
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "Try again, no activities match your criteria"
    });
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
