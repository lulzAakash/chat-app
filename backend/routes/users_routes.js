const express = require('express');
const protectRoute = require('../middlware/protectRoute');
const { getUserForSidebar } = require('../controllers/user_controller');

const router = express.Router();

router.get('/',protectRoute,getUserForSidebar)

module.exports = router;