/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////
//小菜单每个框的点击事件
function as_screen_d(id, name, dormBuildingName) {
    exchangeContent(id, name);
    dormBuildingName = dormBuildingName.trim();
    let dormName = $('#as-d').text().trim();
    if (dormName === "全部寝室号") {
        dormName = null;
    }
    let searchContent = $('#as-search').val();
    as_load_table(null, dormBuildingName, dormName, searchContent);
}

//从数据库中获取所有名称，显示到全部寝室号小菜单中
function as_load_d_menu(dbName) {
    dbName = dbName.trim();
    $.get("/allD", {dbName: dbName}, function (dorms) {
        let asd = "as-d";
        let asdnum = "as-d-num";
        let lis = '<li id="' + asdnum + '0" onclick=\'javascript:as_screen_d("' + asdnum + '0","' + asd + '","' + dbName + '")\'>\n' +
            '                        <a href="javascript:void(0)">全部寝室号</a>\n' +
            '                    </li>';
        for (let i = 0; i < dorms.length; i++) {
            let dorm = dorms[i];
            let id = asdnum + dorm.did;
            let li = '<li id="' + id + '" onclick=\'javascript:as_screen_d("' + id + '","' + asd + '","' + dbName + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dorm.dname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#as-d-menu').html(lis);
    })
}

/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////
/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
//小菜单每个框的点击事件
function ali_screen_d(id, name, dormBuildingName) {
    exchangeContent(id, name);
    dormBuildingName = dormBuildingName.trim();
    let dormName = $('#ali-d').text().trim();
    if (dormName === "全部寝室号") {
        dormName = null;
    }
    let searchContent = $('#ali-search').val();
    ali_load_table(null, dormBuildingName, dormName, searchContent);
}

function ali_load_d_menu(dbName) {
    dbName = dbName.trim();
    $.get("/allD", {dbName: dbName}, function (dorms) {
        let alid = "ali-d";
        let alidnum = "ali-d-num";
        let lis = '<li id="' + alidnum + '0" onclick=\'javascript:ali_screen_d("' + alidnum + '0","' + alid + '","' + dbName + '")\'>\n' +
            '                        <a href="javascript:void(0)">全部寝室号</a>\n' +
            '                    </li>';
        for (let i = 0; i < dorms.length; i++) {
            let dorm = dorms[i];
            let id = alidnum + dorm.did;
            let li = '<li id="' + id + '" onclick=\'javascript:ali_screen_d("' + id + '","' + alid + '","' + dbName + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dorm.dname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#ali-d-menu').html(lis);
    })
}