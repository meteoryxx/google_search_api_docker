require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const googleSearchKey = process.env.GOOGLE_SEARCH_KEY;
const googleCxId = process.env.GOOGLE_CX_ID;
const baseurl = 'https://www.googleapis.com/customsearch/v1';
const searchPassword = process.env.SEARCH_PASSWORD; // 添加这一行

app.post('/search', async (req, res) => {
  const { searchKey } = req.body; // 从请求体获取searchKey
  const { password } = req.query; // 从查询字符串获取password

  // 检查密码是否正确
  if (password !== searchPassword) {
    return res.status(401).json({ error: '密码错误。' });
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
    res.json({ prompt: `搜索词: ${searchKey};google 搜索结果: ${result}` });
  } catch (err) {
    console.error(err);
    res.json({ prompt: '' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
