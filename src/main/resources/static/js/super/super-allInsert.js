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
                        location.href = "smain.html";
                    },
                    error: function () {
                        alert("未知错误");
                    }
                })
            }
        }
    });
/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////


/////////////////////////////////////////////////AllDormBuilding//////////////////////////////////////////////////////////
    //AllDormBuilding中添加宿舍楼按钮事件
    $('#adb-submit1').click(function () {
        let dbname = $('#adb-content-dbname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            $.ajax({
                type: "post",
                url: "/addDb",
                xhrFields: {widthCredentials: true},
                data: $('#adb-db-form').serialize(),
                async: false,
                success: function (flag) {
                    if (flag) {
                        alert("添加成功！");
                    } else {
                        alert("添加失败，该宿舍楼已存在！");
                    }
                    location.href = "smain.html";
                },
                error: function () {
                    alert("未知错误");
                }
            });
        }
    });
/////////////////////////////////////////////////AllDormBuilding//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////
    $('#ad-insert-submit').click(function () {
        //let dbname = $('#ad-content-dbname').val();
        let index = $('#ad-content-dbname option:selected');
        let dbname = index.text();
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
                        location.href = "smain.html";
                    },
                    error: function () {
                        alert("未知错误");
                    }
                })
            }
        }
    });
/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllDormitoryManagers//////////////////////////////////////////////////////////
    $('#adm-insert-submit').click(function () {
        let dbname = $('#adm-content-dbname').val();
        let username = $('#adm-content-username').val();
        let password = $('#adm-content-password').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            if (username === '' || username === null) {
                alert("用户名不能为空");
            } else {
                if (password === '' || password === null) {
                    alert("密码不能为空");
                } else {
                    $.ajax({
                        type: "post",
                        url: "/addDMan",
                        xhrFields: {widthCredentials: true},
                        data: $('#adm-insert-form').serialize(),
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
            }
        }
    });
/////////////////////////////////////////////////AllDormitoryManagers//////////////////////////////////////////////////////////

})