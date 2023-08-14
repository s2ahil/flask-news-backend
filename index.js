const express = require("express");
const app = express();
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const supabase = createClient(
  "https://tkpmtywpivnmzuwqqokq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrcG10eXdwaXZubXp1d3Fxb2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIwMjU4ODQsImV4cCI6MjAwNzYwMTg4NH0.mP4trna5TvoU4-ObsXvIBqA3vBAyKA5BaTxhXemRhtE"
);



app.get("/", (req, res) => {
  res.send("Hello World");
})
// // Custom authentication middleware
// const authenticate = async (req, res, next) => {
//   console.log("hello");
//   const token = req.headers.authorization;
//   console.log(token);

//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   // const { data, error } = await supabase.auth.getUser(token);
//   try {
//     const { data, error } = await supabase.auth.getUser(token);
//     // const { data, error } = await supabase.auth.api.getUser(token);

//     console.log(data);
//     if (error) {
//       throw error;
//     }

//     req.user = data;
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// };

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// app.post("/api/signup", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password)
//   try {
//     const { data, error } = await supabase.auth.signUp({ email, password });
//     if (error) throw error;
//     res.json({ data, message: "confirm mail and then login" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// app.post("/api/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) throw error;

//     const accessToken = data.session.access_token;
//     res.json({ token: accessToken, data });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

app.post("/api/predict", async (req, res) => {
 
 async function api() {
    let result;
    try {
      // Make the POST request using Axios
      // const response = await axios.post('https://news-final.onrender.com/predict', {
      //   news_text: "hello"
      // });
      console.log(req.body.news_text)
      response = await axios.post("https://news-final.onrender.com/predict",{
        news_text: req.body.news_text,
      });
      
      console.log(response.data)

      if(response.data.message[7]=='1'){
         result="unreliable news"
      }else{
        result="reliable news"
      }
      console.log("API Response:", result);
      res.json({
        message: "Authenticated route",
        // user: req.user,
        prediction: result, // Include the prediction result in the response
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  api();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

