//改变小菜单文本
function exchangeContent(id, name) {
    let str = $('#' + id).text();
    str += ' <span class="caret"></span>';
    $('#' + name).html(str);
}

//格式化表格
function tableFormatting() {
    $("td,th").addClass("text-center");
}
