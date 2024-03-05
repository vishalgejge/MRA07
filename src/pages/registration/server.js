const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/send-otp', async (req, res) => {
  const { mobNumber, generatedOtp } = req.query;

  try {
    const response = await axios.get(`https://www.textguru.in/api/v22.0/`, {
      params: {
        username: 'tectigonitsolutions.com',
        password: '61458510',
        source: 'TECTIT',
        dmobile: mobNumber,
        message: `Your OTP is ${generatedOtp}. Please do not share it with anyone.`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send OTP. Please try again.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
