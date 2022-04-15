$(function () {
    as_load_db_menu();
    as_load_db_menu2();
    as_load_d_menu();

    ad_load_db_menu();
    ad_load_db_menu2();

    adm_load_db_menu();

    av_load_db_menu();

    ari_load_db_menu();

    as_load_d_menu2();

    ali_load_db_menu();
    ali_load_db_menu2();
    ali_load_d_menu();
    ali_load_d_menu2();
})


/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////
//小菜单每个框的点击事件
function as_screen_db(id, name) {
    exchangeContent(id, name);
    let str = "全部寝室号"
    str += ' <span class="caret"></span>';
    $('#as-d').html(str);
    as_load_d_menu();

    let dormBuildingName = $('#as-db').text().trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    let searchContent = $('#as-search').val();
    as_load_table(null, dormBuildingName, null, searchContent);
}

//小菜单每个框的点击事件
function as_screen_d(id, name) {
    exchangeContent(id, name);
    let dormBuildingName = $('#as-db').text().trim();
    let dormName = $('#as-d').text().trim();
    if (dormName === "全部寝室号") {
        dormName = null;
    }
    let searchContent = $('#as-search').val();
    as_load_table(null, dormBuildingName, dormName, searchContent);
}

//从数据库中获取所有名称，显示到全部宿舍楼小菜单中
function as_load_db_menu() {
    $.get("/allDb", {}, function (dormBuildings) {
        let asdb = "as-db";
        let asdbnum = "as-db-num";
        let lis = '<li id="' + asdbnum + '0" onclick=\'javascript:as_screen_db("' + asdbnum + '0","' + asdb + '")\'>\n' +
            '                   <a href="javascript:void(0)">全部宿舍楼</a>\n' +
            '               </li>';
        for (let i = 0; i < dormBuildings.length; i++) {
            let dormBuilding = dormBuildings[i];
            let id = asdbnum + dormBuilding.dbid;
            let li = '<li id="' + id + '" onclick=\'javascript:as_screen_db("' + id + '","' + asdb + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dormBuilding.dbname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#as-db-menu').html(lis);
    });
}

//从数据库中获取所有名称，显示到全部寝室号小菜单中
function as_load_d_menu() {
    let dbName = $('#as-db').text();
    dbName = dbName.trim();
    $.get("/allD", {dbName: dbName}, function (dorms) {
        let asd = "as-d";
        let asdnum = "as-d-num";
        let lis = '<li id="' + asdnum + '0" onclick=\'javascript:as_screen_d("' + asdnum + '0","' + asd + '")\'>\n' +
            '                        <a href="javascript:void(0)">全部寝室号</a>\n' +
            '                    </li>';
        for (let i = 0; i < dorms.length; i++) {
            let dorm = dorms[i];
            let id = asdnum + dorm.did;
            let li = '<li id="' + id + '" onclick=\'javascript:as_screen_d("' + id + '","' + asd + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dorm.dname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#as-d-menu').html(lis);
    })
}
/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////



//从数据库中获取所有名称，显示到全部宿舍楼小菜单中
function as_load_db_menu2() {
    $.get("/allDb", {}, function (dormBuildings) {
        //let asdb = "as-db2";
        let asdbnum = "as-db-num2";

        for (let i = 0; i < dormBuildings.length; i++) {
            let dormBuilding = dormBuildings[i];
            let id = addbnum + dormBuilding.dbid;
            let text = dormBuilding.dbname;

            var opt = document.createElement("option");
            opt.value = text;
            opt.text = text;
            $('#ad-content-dbname').append(opt);
        }
        $('#ad-content-dbname').html(lis);
    });
}

function as_load_d_menu2() {
//    let dbName = $('#as-db2').text();

    let index = $('#ad-content-dbname option:selected');

    let dbName = index.text();

    // dbName = dbName.trim();

    $.get("/allD", {dbName: dbName}, function (dorms) {


        for (let i = 0; i < dorms.length; i++) {
            let dormBuilding = dorms[i];

            let text = dormBuilding.dname;

            var opt = document.createElement("option");
            opt.value = text;
            opt.text = text;
            $('#ad-content-dname').append(opt);
        }
        $('#ad-content-dname').html(lis);
    })
}

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////
//小菜单每个框的点击事件
function ad_screen_db(id, name) {
    exchangeContent(id, name);
    let dormBuildingName = $('#ad-db').text().trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    let searchContent = $('#ad-search').val();
    ad_load_table(null, dormBuildingName, searchContent);
}
//从数据库中获取所有名称，显示到全部宿舍楼小菜单中
function ad_load_db_menu() {
    $.get("/allDb", {}, function (dormBuildings) {
        let addb = "ad-db";
        let addbnum = "ad-db-num";
        let lis = '<li id="' + addbnum + '0" onclick=\'javascript:ad_screen_db("' + addbnum + '0","' + addb + '")\'>\n' +
            '                   <a href="javascript:void(0)">全部宿舍楼</a>\n' +
            '               </li>';
        for (let i = 0; i < dormBuildings.length; i++) {
            let dormBuilding = dormBuildings[i];
            let id = addbnum + dormBuilding.dbid;
            let li = '<li id="' + id + '" onclick=\'javascript:ad_screen_db("' + id + '","' + addb + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dormBuilding.dbname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#ad-db-menu').html(lis);
    });
}
/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////




//从数据库中获取所有名称，显示到全部宿舍楼小菜单中
function ad_load_db_menu2() {
    $.get("/allDb", {}, function (dormBuildings) {
        //    let addb = "ad-db2";
        let addbnum = "ad-db-num2";

        for (let i = 0; i < dormBuildings.length; i++) {
            let dormBuilding = dormBuildings[i];
            let id = addbnum + dormBuilding.dbid;
            let text = dormBuilding.dbname;

            var opt = document.createElement("option");
            opt.value = text;
            opt.text = text;


            $('#ad-content-dbname').append(opt);

        }
        $('#ad-content-dbname').html(lis);
    });
}







/////////////////////////////////////////////////AllDormitoryManagers//////////////////////////////////////////////////////////
//小菜单每个框的点击事件
function adm_screen_db(id, name) {
    exchangeContent(id, name);
    let dormBuildingName = $('#adm-db').text().trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    let searchContent = $('#adm-search').val();
    adm_load_table(null, dormBuildingName, searchContent);
}
//从数据库中获取所有名称，显示到全部宿舍楼小菜单中
function adm_load_db_menu() {
    $.get("/allDb", {}, function (dormBuildings) {
        let admdb = "adm-db";
        let admdbnum = "adm-db-num";
        let lis = '<li id="' + admdbnum + '0" onclick=\'javascript:adm_screen_db("' + admdbnum + '0","' + admdb + '")\'>\n' +
            '                   <a href="javascript:void(0)">全部宿舍楼</a>\n' +
            '               </li>';
        for (let i = 0; i < dormBuildings.length; i++) {
            let dormBuilding = dormBuildings[i];
            let id = admdbnum + dormBuilding.dbid;
            let li = '<li id="' + id + '" onclick=\'javascript:adm_screen_db("' + id + '","' + admdb + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dormBuilding.dbname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#adm-db-menu').html(lis);
    });
}
/////////////////////////////////////////////////AllDormitoryManagers//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////
//小菜单每个框的点击事件
function av_screen_db(id, name) {
    exchangeContent(id, name);
    let dormBuildingName = $('#av-db').text().trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    let searchContent = $('#av-search').val();
    av_load_table(null, dormBuildingName, searchContent);
}
//从数据库中获取所有名称，显示到全部宿舍楼小菜单中
function av_load_db_menu() {
    $.get("/allDb", {}, function (dormBuildings) {
        let avdb = "av-db";
        let avdbnum = "av-db-num";
        let lis = '<li id="' + avdbnum + '0" onclick=\'javascript:av_screen_db("' + avdbnum + '0","' + avdb + '")\'>\n' +
            '                   <a href="javascript:void(0)">全部宿舍楼</a>\n' +
            '               </li>';
        for (let i = 0; i < dormBuildings.length; i++) {
            let dormBuilding = dormBuildings[i];
            let id = avdbnum + dormBuilding.dbid;
            let li = '<li id="' + id + '" onclick=\'javascript:av_screen_db("' + id + '","' + avdb + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dormBuilding.dbname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#av-db-menu').html(lis);
    });
}
/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////
//小菜单每个框的点击事件
function ari_screen_db(id, name) {
    exchangeContent(id, name);
    let dormBuildingName = $('#ari-db').text().trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    let searchContent = $('#ari-search').val();
    ari_load_table(null, dormBuildingName, searchContent);
}
//从数据库中获取所有名称，显示到全部宿舍楼小菜单中
function ari_load_db_menu() {
    $.get("/allDb", {}, function (dormBuildings) {
        let aridb = "ari-db";
        let aridbnum = "ari-db-num";
        let lis = '<li id="' + aridbnum + '0" onclick=\'javascript:ari_screen_db("' + aridbnum + '0","' + aridb + '")\'>\n' +
            '                   <a href="javascript:void(0)">全部宿舍楼</a>\n' +
            '               </li>';
        for (let i = 0; i < dormBuildings.length; i++) {
            let dormBuilding = dormBuildings[i];
            let id = aridbnum + dormBuilding.dbid;
            let li = '<li id="' + id + '" onclick=\'javascript:ari_screen_db("' + id + '","' + aridb + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dormBuilding.dbname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#ari-db-menu').html(lis);
    });
}
/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
//小菜单每个框的点击事件
function ali_screen_db(id, name) {
    exchangeContent(id, name);
    let str = "全部寝室号"
    str += ' <span class="caret"></span>';
    $('#ali-d').html(str);
    ali_load_d_menu();

    let dormBuildingName = $('#ali-db').text().trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    let searchContent = $('#ali-search').val();
    ali_load_table(null, dormBuildingName, null, searchContent);
}

//小菜单每个框的点击事件
function ali_screen_d(id, name) {
    exchangeContent(id, name);
    let dormBuildingName = $('#ali-db').text().trim();
    let dormName = $('#ali-d').text().trim();
    if (dormName === "全部寝室号") {
        dormName = null;
    }
    let searchContent = $('#ali-search').val();
    ali_load_table(null, dormBuildingName, dormName, searchContent);
}

//从数据库中获取所有名称，显示到全部宿舍楼小菜单中
function ali_load_db_menu() {
    $.get("/allDb", {}, function (dormBuildings) {
        let alidb = "ali-db";
        let alidbnum = "ali-db-num";
        let lis = '<li id="' + alidbnum + '0" onclick=\'javascript:ali_screen_db("' + alidbnum + '0","' + alidb + '")\'>\n' +
            '                   <a href="javascript:void(0)">全部宿舍楼</a>\n' +
            '               </li>';
        for (let i = 0; i < dormBuildings.length; i++) {
            let dormBuilding = dormBuildings[i];
            let id = alidbnum + dormBuilding.dbid;
            let li = '<li id="' + id + '" onclick=\'javascript:ali_screen_db("' + id + '","' + alidb + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dormBuilding.dbname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#ali-db-menu').html(lis);
    });
}

//从数据库中获取所有名称，显示到全部寝室号小菜单中
function ali_load_d_menu() {
    let dbName = $('#ali-db').text();
    dbName = dbName.trim();
    $.get("/allD", {dbName: dbName}, function (dorms) {
        let alid = "ali-d";
        let alidnum = "ali-d-num";
        let lis = '<li id="' + alidnum + '0" onclick=\'javascript:ali_screen_d("' + alidnum + '0","' + alid + '")\'>\n' +
            '                        <a href="javascript:void(0)">全部寝室号</a>\n' +
            '                    </li>';
        for (let i = 0; i < dorms.length; i++) {
            let dorm = dorms[i];
            let id = alidnum + dorm.did;
            let li = '<li id="' + id + '" onclick=\'javascript:ali_screen_d("' + id + '","' + alid + '")\'>\n' +
                '                        <a href="javascript:void(0)">' + dorm.dname + '</a>\n' +
                '                    </li>';
            lis += li;
        }
        $('#ali-d-menu').html(lis);
    })
}

function ali_load_d_menu2() {
//    let dbName = $('#as-db2').text();

    let index = $('#ali-content-dbname option:selected');

    let dbName = index.text();

    // dbName = dbName.trim();

    $.get("/allD", {dbName: dbName}, function (dorms) {


        for (let i = 0; i < dorms.length; i++) {
            let dormBuilding = dorms[i];

            let text = dormBuilding.dname;

            var opt = document.createElement("option");
            opt.value = text;
            opt.text = text;
            $('#ali-content-dname').append(opt);
        }
        $('#ali-content-dname').html(lis);
    })
}

//从数据库中获取所有名称，显示到全部宿舍楼小菜单中
function ali_load_db_menu2() {
    $.get("/allDb", {}, function (dormBuildings) {
        //let asdb = "as-db2";
        let asdbnum = "ali-db-num2";

        for (let i = 0; i < dormBuildings.length; i++) {
            let dormBuilding = dormBuildings[i];
            let id = addbnum + dormBuilding.dbid;
            let text = dormBuilding.dbname;

            var opt = document.createElement("option");
            opt.value = text;
            opt.text = text;
            $('#ali-content-dbname').append(opt);
        }
        $('#ali-content-dbname').html(lis);
    });
}

/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
