load('mng_funtion_add.js');
load('mng_key_die.js');
load('module_trans_chunk.js');
load('dictionary.js');
load('phienam.js');
load('prompt.js');
load('creat_prompt_name.js');
load('language_list.js');
load('gemini_web.js');
load('mng_Gemini_trans.js');

function cacheableModel(model) {
    return configLines(typeof modelsavecache === 'undefined' ? '' : modelsavecache).indexOf(model) !== -1;
}

function targetLanguage(target) {
    return String(target || 'vi').indexOf('PROMPT_') === 0 ? 'vi' : target;
}

function execute() {
    var sourceText = String(typeof text === 'undefined' ? '' : text);
    if (!sourceText.trim()) return Response.success('');

    var destination = targetLanguage(typeof to === 'undefined' ? 'vi' : to);
    var useBasicDictionary = typeof use_vb_basic_dic !== 'undefined' && use_vb_basic_dic;
    var useNameFilter = typeof use_loc_name !== 'undefined' && use_loc_name;
    var input = useBasicDictionary ? applyBasicDictionary(sourceText) : sourceText;
    if (useNameFilter) input = normalizeNameCandidates(input);

    var key = 'vbook_gemini_v2_' + fingerprint(input) + '_' + destination;
    var cached = getLocalValue(key, '');
    if (cached) return Response.success(cached);

    var pool = new GeminiKeyPool(typeof api_keys === 'undefined' ? '' : api_keys);
    if (!pool.size()) return Response.error('Vui lòng cấu hình ít nhất một Gemini API key.');

    var models = configuredModels();
    var maxChunkLength = Math.min(Number(typeof max_length === 'undefined' ? 20000 : max_length) || 20000, 18000);
    var chunks = splitTranslationChunks(input, maxChunkLength);
    var translated = [];
    var usedModel = '';

    for (var index = 0; index < chunks.length; index += 1) {
        var result = translateWithGemini(chunks[index], destination, models, pool);
        if (!result.ok) return Response.error('Không thể dịch phần ' + (index + 1) + ':\n' + result.error);
        translated.push(result.text);
        usedModel = result.model;
    }

    var output = translated.join('\n');
    if (cacheableModel(usedModel)) setLocalValue(key, output);
    return Response.success(output);
}
