load('mng_funtion_add.js');
load('creat_prompt_name.js');
load('language_list.js');

function execute() {
    return Response.success(availableLanguages());
}
