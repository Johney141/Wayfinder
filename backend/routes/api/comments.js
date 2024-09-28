const express = require('express')
const { Articles, Comments, Organization, User } = require('../../db/models');
const { requireOrg } = require('../../utils/validation')

const router = express.Router();

module.exports = router;