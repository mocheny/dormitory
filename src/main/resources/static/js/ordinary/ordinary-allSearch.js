/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////
//定义一个AllStudent中搜索框搜索table表的方法
function as_load_search(dormBuildingName) {
    dormBuildingName = dormBuildingName.trim();
    let dormName = $('#as-d').text().trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    if (dormName === "全部寝室号") {
        dormName = null;
    }
    let searchContent = $('#as-search').val();
    as_load_table(null, dormBuildingName, dormName, searchContent);
}

/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////
function ad_load_search(dormBuildingName) {
    dormBuildingName = dormBuildingName.trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    let searchContent = $('#ad-search').val();
    ad_load_table(null, dormBuildingName, searchContent);
}

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////
function av_load_search(dormBuildingName) {
    dormBuildingName = dormBuildingName.trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    let searchContent = $('#av-search').val();
    av_load_table(null, dormBuildingName, searchContent);
}

/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////
function ari_load_search(dormBuildingName) {
    dormBuildingName = dormBuildingName.trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    let searchContent = $('#ari-search').val();
    ari_load_table(null, dormBuildingName, searchContent);
}

/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////
/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
//定义一个AllStudent中搜索框搜索table表的方法
function ali_load_search(dormBuildingName) {
    dormBuildingName = dormBuildingName.trim();
    let dormName = $('#ali-d').text().trim();
    if (dormBuildingName === "全部宿舍楼") {
        dormBuildingName = null;
    }
    if (dormName === "全部寝室号") {
        dormName = null;
    }
    let searchContent = $('#ali-search').val();
    ali_load_table(null, dormBuildingName, dormName, searchContent);
}

/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
