const express = require('express');

const router = express.Router();

router.get('/healthcheck', async (req, res) => {
  res.status(200).json({ msg: 'OK' });
});

module.exports = router;
