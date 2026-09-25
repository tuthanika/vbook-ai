var DEFAULT_PROMPT = [
    'Bạn là dịch giả tiểu thuyết chuyên nghiệp.',
    'Dịch chính xác văn bản sang tiếng Việt tự nhiên, giữ nguyên xuống dòng, tên riêng, số chương và dấu câu.',
    'Chỉ trả về bản dịch; không giải thích, không thêm tiêu đề và không dùng Markdown.'
].join('\n');

function promptForTarget(target) {
    if (String(target).indexOf('PROMPT_') !== 0) return DEFAULT_PROMPT;
    var saved = getLocalValue(target, '');
    return saved || DEFAULT_PROMPT;
}
