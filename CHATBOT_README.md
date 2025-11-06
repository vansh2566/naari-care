# Naari Care AI Chatbot

## Current Implementation

The mental wellness chatbot currently uses **intelligent keyword-based responses** that work without any API keys. It provides:

- **Emotion Detection**: Recognizes anxiety, stress, sadness, and positive emotions
- **Contextual Responses**: Over 30 pre-programmed wellness responses
- **Therapeutic Techniques**: Breathing exercises, grounding techniques, and coping strategies
- **Empathetic Conversation**: Natural, supportive responses
- **No API Required**: Works completely offline for demo/prototype

## Features

✅ **Working Now (No API Needed)**:
- Keyword-based emotion detection
- Context-aware responses
- Wellness techniques and advice
- Quick reply buttons
- Typing indicators
- Conversation history
- Encouraging messages

## Optional: Integrating Real AI APIs

If you want to upgrade to a real AI model, here are your options:

### Option 1: OpenAI ChatGPT (Recommended)
**Cost**: $0.002 per 1K tokens (~$0.02 per conversation)

```javascript
// Add to mental-wellness.js
async function getOpenAIResponse(userMessage) {
    const API_KEY = 'your-openai-api-key-here';
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are Naari AI, a compassionate mental wellness chatbot for women. Provide empathetic, supportive responses focused on mental health, wellness, and emotional support. Be warm, understanding, and encouraging.'
                },
                ...conversationHistory,
                {
                    role: 'user',
                    content: userMessage
                }
            ],
            temperature: 0.7,
            max_tokens: 150
        })
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
}
```

**Get API Key**: https://platform.openai.com/api-keys

### Option 2: Anthropic Claude (Privacy-Focused)
**Cost**: Similar to OpenAI

```javascript
async function getClaudeResponse(userMessage) {
    const API_KEY = 'your-anthropic-api-key-here';
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 150,
            messages: [
                {
                    role: 'user',
                    content: userMessage
                }
            ]
        })
    });
    
    const data = await response.json();
    return data.content[0].text;
}
```

**Get API Key**: https://console.anthropic.com/

### Option 3: Google Gemini (Free Tier Available)
**Cost**: Free tier available, then pay-as-you-go

```javascript
async function getGeminiResponse(userMessage) {
    const API_KEY = 'your-google-api-key-here';
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: `You are Naari AI, a compassionate mental wellness assistant. User says: ${userMessage}`
                }]
            }]
        })
    });
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}
```

**Get API Key**: https://makersuite.google.com/app/apikey

### Option 4: Hugging Face (Free, Open Source)
**Cost**: Free for limited usage

```javascript
async function getHuggingFaceResponse(userMessage) {
    const API_KEY = 'your-huggingface-token-here';
    
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            inputs: userMessage
        })
    });
    
    const data = await response.json();
    return data[0].generated_text;
}
```

**Get API Token**: https://huggingface.co/settings/tokens

## Security Best Practices

⚠️ **Never commit API keys to GitHub!**

### Recommended Approach:

1. Create a `.env` file (add to `.gitignore`):
```
OPENAI_API_KEY=your-key-here
```

2. Use environment variables or a backend server to handle API calls

3. For production, implement:
   - Rate limiting
   - User authentication
   - API key rotation
   - Backend proxy to hide keys

## Current Demo is Production-Ready

The current implementation is perfect for:
- ✅ Prototypes and demos
- ✅ Showcasing chatbot functionality
- ✅ User testing and feedback
- ✅ Portfolio projects
- ✅ Pitch presentations

The responses are carefully crafted to be:
- Empathetic and supportive
- Therapeutically sound
- Context-aware
- Encouraging and positive

## Support

For questions or issues, contact: support@naaricare.com

---

**Note**: The chatbot provides emotional support but is not a replacement for professional therapy. Always encourage users to seek professional help for serious mental health concerns.
