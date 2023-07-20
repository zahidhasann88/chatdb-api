const axios = require('axios');

class OpenAiRepository {

    async getResponseFromOpenAi(content) {
        try {
            if (!content.trim()) {
                return null;
            }

            const apiEndpoint = 'https://api.openai.com/v1/chat/completions';
            const payload = {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content }],
            };
            const headers = {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post(apiEndpoint, payload, { headers });

            const { data } = response;
            const validResponse =
                data &&
                Array.isArray(data.choices) &&
                data.choices.length > 0 &&
                data.choices[0].message &&
                data.choices[0].message.content;

            if (validResponse) {
                const { content: assistantReply } = data.choices[0].message;
                return assistantReply;
            } else {
                console.error('Invalid response from OpenAI:', data);
                throw new Error('Invalid response from OpenAI');
            }
        } catch (error) {
            console.error('Error generating response:', error);
            throw error;
        }
    }
}

module.exports = new OpenAiRepository();
