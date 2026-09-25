function splitTranslationChunks(text, maxLength) {
    var lines = String(text || '').split('\n');
    var chunks = [];
    var current = '';
    maxLength = Math.max(500, Number(maxLength) || 12000);

    lines.forEach(function (line) {
        if (line.length > maxLength) {
            if (current) { chunks.push(current); current = ''; }
            for (var start = 0; start < line.length; start += maxLength) chunks.push(line.slice(start, start + maxLength));
            return;
        }
        var candidate = current ? current + '\n' + line : line;
        if (candidate.length > maxLength && current) {
            chunks.push(current);
            current = line;
        } else current = candidate;
    });
    if (current || !chunks.length) chunks.push(current);
    return chunks;
}
