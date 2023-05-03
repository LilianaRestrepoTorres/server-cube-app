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

    const files = fileListResponse.data.files;

    const formattedFiles = await Promise.all(
      files.map(async (filename) => {
        try {
          const fileUrl = `${process.env.API_BASE_URL}/file/${filename}`;
          const fileResponse = await axios.get(fileUrl, {
            headers: {
              Authorization: `Bearer ${process.env.API_KEY}`,
            },
          });

          const lines = fileResponse.data.split('\n').slice(1);

          const formattedLines = lines
            .map((line) => line.split(','))
            .filter((line) => line.length === 4)
            .map(([file, text, number, hex]) => { 
              const parsedNumber = parseInt(number);
              const isValidHex = /^[0-9a-fA-F]{32}$/.test(hex);

              if (isNaN(parsedNumber) || !isValidHex) {
                return null; // Skip invalid lines
              }
              
              return { file, text, number: parsedNumber, hex };
             })
            .filter(Boolean);
          
          if (formattedLines.length === 0) {
            return null;
          };

          return {
            filename,
            lines: formattedLines,
          };
        } catch (error) {
          console.error(`Error downloading file "${filename}"`);
          return null;
        }
      })
    );

    res.json(formattedFiles.filter((file) => file !== null));
  } catch (err) {
    res.status(500).send("Internal Server Error: ", err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
