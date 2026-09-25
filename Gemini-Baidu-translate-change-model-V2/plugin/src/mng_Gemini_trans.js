function translateWithGemini(text, target, models, keyPool) {
    var prompt = promptForTarget(target);
    var errors = [];
    for (var modelIndex = 0; modelIndex < models.length; modelIndex += 1) {
        var model = models[modelIndex];
        for (var attempt = 0; attempt < keyPool.size(); attempt += 1) {
            var result = geminiRequest(text, prompt, keyPool.next(), model);
            if (result.ok) return { ok: true, text: result.text, model: model };
            errors.push(model + ': ' + result.error);
        }
    }
    return { ok: false, error: errors.join('\n') || 'Chưa cấu hình Gemini API key hoặc model.' };
}
