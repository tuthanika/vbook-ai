function createPromptName(text) {
    return String(text || 'prompt').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-zA-Z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '').toLowerCase();
}

function saveGeneratedPrompt(name, prompt) {
    var key = 'PROMPT_' + createPromptName(name);
    setLocalValue(key, prompt);
    return key;
}
