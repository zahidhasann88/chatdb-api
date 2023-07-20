const express = require('express');
const router = express.Router();
const assistantController = require('../controllers/assistantController');

router.post('/get-chat-from-oa', assistantController.getAssistantFromOpenAi);


module.exports = router;
