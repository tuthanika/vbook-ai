function GeminiKeyPool(rawKeys) {
    this.keys = configLines(rawKeys);
    this.cursor = 0;
}

GeminiKeyPool.prototype.next = function () {
    if (!this.keys.length) return null;
    var key = this.keys[this.cursor % this.keys.length];
    this.cursor += 1;
    return key;
};

GeminiKeyPool.prototype.size = function () { return this.keys.length; };
