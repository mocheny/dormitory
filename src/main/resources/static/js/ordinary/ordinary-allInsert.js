$(function () {
/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////
    $('#as-insert-submit').click(function () {
        let dbname = $('#as-content-dbname').val();
        let dname = $('#as-content-dname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            if (dname === '' || dname === null) {
                alert("寝室号不能为空")
            } else {
                $.ajax({
                    type: "post",
                    url: "/addStu",
                    xhrFields: {widthCredentials: true},
                    data: $('#as-insert-form').serialize(),
                    async: false,
                    success: function (info) {
                        if (info.flag) {
                            alert("添加成功");
                        } else {
                            alert("添加失败，" + info.errorMsg);
                        }
                        location.href = "omain.html";
                    },
                    error: function () {
                        alert("未知错误");
                    }
                })
            }
        }
    });
/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////
    $('#ad-insert-submit').click(function () {
        let dbname = $('#ad-content-dbname').val();
        let dname = $('#ad-content-dname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            if (dname === '' || dname === null) {
                alert("寝室号不能为空")
            } else {
                $.ajax({
                    type: "post",
                    url: "/addDorm",
                    xhrFields: {widthCredentials: true},
                    data: $('#ad-insert-form').serialize(),
                    async: false,
                    success: function (info) {
                        if (info.flag) {
                            alert("添加成功");
                        } else {
                            alert("添加失败，" + info.errorMsg);
                        }
                        location.href = "omain.html";
                    },
                    error: function () {
                        alert("未知错误");
                    }
                })
            }
        }
    });
/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////
    $('#av-insert-submit').click(function () {
        let dbname = $('#av-content-dbname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            $.ajax({
                type: "post",
                url: "/addVis",
                xhrFields: {widthCredentials: true},
                data: $('#av-insert-form').serialize(),
                async: false,
                success: function (info) {
                    if (info.flag) {
                        alert("添加成功");
                    } else {
                        alert("添加失败，" + info.errorMsg);
                    }
                    location.href = "omain.html";
                },
                error: function () {
                    alert("未知错误");
                }
            })
        }
    });
/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////
    $('#ari-insert-submit').click(function () {
        let dbname = $('#ari-content-dbname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            $.ajax({
                type: "post",
                url: "/addRep",
                xhrFields: {widthCredentials: true},
                data: $('#ari-insert-form').serialize(),
                async: false,
                success: function (info) {
                    if (info.flag) {
                        alert("添加成功");
                    } else {
                        alert("添加失败，" + info.errorMsg);
                    }
                    location.href = "omain.html";
                },
                error: function () {
                    alert("未知错误");
                }
            })
        }
    });
/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////
/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
    $('#ali-insert-submit').click(function () {
        let dbname = $('#ali-content-dbname').val();
        let stuNumber = $('#ali-content-stuNumber').val();
        if (stuNumber == '' || stuNumber == null){
            alert("学号不能为空");
        }
        else{
            $.ajax({
                type: "post",
                url: "/addLat",
                xhrFields: {widthCredentials: true},
                data: $('#ali-insert-form').serialize(),
                async: false,
                success: function (info) {
                    if (info.flag) {
                        alert("添加成功");
                    } else {
                        alert("添加失败，" + info.errorMsg);
                    }
                    location.href = "smain.html";
                },
                error: function () {
                    alert("未知错误");
                }
            })
        }
    });

/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
})