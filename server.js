const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/api/surveys', async (req, res) => {
  try {
    const response = await axios.get('https://api.irbureau.com/offerwall_api/get_new.php?format=json&partner_id=VYED111&token=7wrtctve2K&all=true&status=live&num=20000');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/qualification', async (req, res) => {
  try {
    let survey_id = req.query.survey_id
    let url = `https://api.irbureau.com/offerwall_api/survey_screener.php?format=xml&partner_id=VYED111&token=7wrtctve2K&all=true&status=live&survey_id=${survey_id}`
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get('/api/quota', async (req, res) => {
  try {
    let survey_id = req.query.survey_id

    let url = `http://api.irbureau.com/offerwall_api/survey_quota.php?format=xml&partner_id=VYED111&token=7wrtctve2K&survey_id=${survey_id}`
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.get('/api/report', async (req, res) => {
  try {
    let survey_id = req.query.survey_id

    let url = `https://api.irbureau.com/offerwall_api/conversion_report.php?format=xml&partner_id=VYED111&token=7wrtctve2K&&survey_id=${survey_id}`
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log('Proxy running on http://localhost:4000/'));
