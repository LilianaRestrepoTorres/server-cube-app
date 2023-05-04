const express = require("express");
const axios = require("axios");
require('dotenv').config();

const app = express();

// Endpoint to fetch and format data from the external API
app.get("/files/data", async (req, res) => {
  try {
    // Call the API to get the list of files
    const { data } = await axios(
      `${process.env.API_BASE_URL}/files`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    const fileNames = data.files;

    let fileNameFilter;
    if (req.query.fileName) {
      fileNameFilter = req.query.fileName;
      if (!fileNames.includes(fileNameFilter)) {
        return res.status(404).json({ message: 'File not found' });
      }
    }

    const formattedFiles = await Promise.all(
      data.files.map(async (filename) => {
        if (fileNameFilter && filename !== fileNameFilter) {
          return null;
        }
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

app.get('/files/list', async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_BASE_URL}/files`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.json(data);
  } catch (error) {
    if (error.response && error.response.status === 500) {
      return res.status(500).json({ message: 'External API error' });
    }
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = 3000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = server;