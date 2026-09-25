function configLines(value) {
    return String(value || '').replace(/^"([\s\S]*)"$/, '$1').split('\n').map(function (item) {
        return item.trim();
    }).filter(function (item) { return item.length > 0; });
}

function getLocalValue(key, fallback) {
    try {
        var value = cacheStorage.getItem(key);
        return value === null || value === undefined || value === '' ? fallback : value;
    } catch (error) {
        return fallback;
    }
}

function setLocalValue(key, value) {
    try { cacheStorage.setItem(key, value); } catch (error) {}
}

function fingerprint(text) {
    var lines = String(text || '').split('\n').filter(function (line) { return line.trim(); });
    return lines.slice(0, 5).map(function (line) {
        line = line.trim();
        return line.length > 6 ? line.slice(0, 3) + line.slice(-3) : line;
    }).join('|');
}

function containsHan(text) { return /[\u4e00-\u9fff]/.test(text); }
