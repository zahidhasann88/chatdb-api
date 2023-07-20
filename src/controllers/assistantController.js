const assistantRepository = require('../repositories/assistantRepository');

class AssisantController {
    async getAssistantFromOpenAi(req, res) {
        try {
            const { content } = req.body;
            const assistant = await assistantRepository.getAssistantFromOpenAi(content);
            res.status(200).json(assistant);
        } catch (error) {
            console.error('Error getting answer:\n', error);
            res.status(200).json('I am sorry, I could not understand your question. Please try again with a different question.');
        }
    }
}

module.exports = new AssisantController();
