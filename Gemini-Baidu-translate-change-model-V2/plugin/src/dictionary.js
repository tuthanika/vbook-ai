function applyBasicDictionary(text) {
    var dictionary = getLocalValue('vb_basic_dic', '');
    if (!dictionary) return text;
    return configLines(dictionary).reduce(function (result, entry) {
        var pair = entry.split(/\s*(?:=>|=|\||:)\s*/, 2);
        if (pair.length !== 2 || !pair[0]) return result;
        return result.split(pair[0]).join(pair[1]);
    }, text);
}
