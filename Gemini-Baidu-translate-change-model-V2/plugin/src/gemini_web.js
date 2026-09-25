function geminiRequest(text, prompt, apiKey, model) {
    var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey;
    var body = {
        contents: [{ role: 'user', parts: [{ text: prompt + '\n\nVăn bản cần dịch:\n' + text }] }],
        generationConfig: {
            temperature: Number(typeof temp === 'undefined' ? 0.5 : temp),
            topP: Number(typeof topP === 'undefined' ? 0.5 : topP),
            topK: Number(typeof topK === 'undefined' ? 20 : topK),
            maxOutputTokens: 65536
        },
        safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
        ]
    };
    try {
        var response = fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        var result = response.json();
        if (!response.ok) return { ok: false, error: 'Gemini HTTP ' + response.status };
        var candidate = result.candidates && result.candidates[0];
        var part = candidate && candidate.content && candidate.content.parts && candidate.content.parts[0];
        if (!part || !part.text) return { ok: false, error: candidate && candidate.finishReason ? candidate.finishReason : 'Gemini không trả về nội dung' };
        return { ok: true, text: String(part.text).trim() };
    } catch (error) {
        return { ok: false, error: String(error) };
    }
}
