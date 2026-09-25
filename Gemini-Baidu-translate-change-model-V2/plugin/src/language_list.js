function configuredModels() {
    var models = configLines(typeof model_Auto_Trans === 'undefined' ? '' : model_Auto_Trans);
    if (!models.length) models = ['gemini-2.5-flash', 'gemini-2.5-flash-lite'];
    return models.filter(function (model) { return model.indexOf('gemini-') === 0; });
}

function configuredPromptLanguages() {
    return configLines(typeof listprompts === 'undefined' ? '' : listprompts).map(function (name) {
        return { id: 'PROMPT_' + createPromptName(name), name: name };
    });
}

function availableLanguages() {
    var models = configuredModels().map(function (model) { return { id: model, name: 'Gemini: ' + model }; });
    return models.concat([
        { id: 'auto', name: 'Tự động' },
        { id: 'zh', name: 'Trung' },
        { id: 'en', name: 'Anh' },
        { id: 'vi', name: 'Việt' }
    ], configuredPromptLanguages());
}
