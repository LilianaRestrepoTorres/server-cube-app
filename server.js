const express = require("express");
const axios = require("axios");
require('dotenv').config();

const app = express();

// Endpoint to fetch and format data from the external API
app.get("/files/data", async (req, res) => {
  try {
    // Call the API to get the list of files
    const fileListResponse = await axios(
      `${process.env.API_BASE_URL}/files`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    
    res.send(fileListResponse.data);
  } catch (err) {
    res.status(500).send("Internal Server Error: ", err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
