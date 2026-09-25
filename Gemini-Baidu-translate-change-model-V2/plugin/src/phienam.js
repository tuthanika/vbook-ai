function normalizeNameCandidates(text) {
    var stopWords = configLines(getLocalValue('vb_stopWord', getLocalValue('vb_stopWord_dic', '')));
    if (!stopWords.length) return text;
    return String(text).split('\n').filter(function (line) {
        return !stopWords.some(function (word) { return word && line.trim() === word; });
    }).join('\n');
}
