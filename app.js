require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const googleSearchKey = process.env.GOOGLE_SEARCH_KEY;
const googleCxId = process.env.GOOGLE_CX_ID;
const baseurl = 'https://www.googleapis.com/customsearch/v1';
const searchPassword = process.env.SEARCH_PASSWORD; // �����һ��

app.post('/search', async (req, res) => {
  const { searchKey } = req.body; // ���������ȡsearchKey
  const { password } = req.query; // �Ӳ�ѯ�ַ�����ȡpassword

  // ��������Ƿ���ȷ
  if (password !== searchPassword) {
    return res.status(401).json({ error: '�������' });
  }
  
  if (!searchKey) {
    return res.json({ prompt: '' });
  }

  try {
    const response = await axios.get(baseurl, {
      params: {
        q: searchKey,
        cx: googleCxId,
        key: googleSearchKey,
        c2coff: 1,
        start: 1,
        num: 5,
        dateRestrict: 'm[1]'
      }
    });
    const result = response.data.items.map((item) => item.snippet).join('\n');
    res.json({ prompt: `������: ${searchKey};google �������: ${result}` });
  } catch (err) {
    console.error(err);
    res.json({ prompt: '' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
