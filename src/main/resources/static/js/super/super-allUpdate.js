/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////
function as_show_update_modal(sid) {
    $.ajax({
        type: "get",
        url: "/findOneStu",
        xhrFields: {widthCredentials: true},
        async: false,
        data: {sid: sid},
        success: function (student) {
            let modal = '<form class="form-horizontal" role="form" id="as-update-form" style="margin: 20px;">\n' +
                '        <div class="modal fade" id="as-update' + student.sid + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"\n' +
                '             aria-hidden="true">\n' +
                '            <div class="modal-dialog">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
                '                            &times;\n' +
                '                        </button>\n' +
                '                        <h4 class="modal-title">\n' +
                '                            修改学生信息\n' +
                '                        </h4>\n' +
                '                    </div>\n' +
                '                    <div class="modal-body">\n' +
                '                        <form class="form-horizontal" role="form">\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">宿舍楼名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id="as-update-dbname" name="dbname" value="' + student.dorm.dormBuilding.dbname + '" ">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">寝室名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id="as-update-dname" name="dname" value="' + student.dorm.dname + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">姓名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="sname" value="' + student.sname + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">学号</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id = "as-update-sid" name="stuNumber" value="' + student.stuNumber + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">性别</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="gender" value="' + student.gender + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">电话号码</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="telephone" value="' + student.telephone + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">所在班级</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="grade" value="' + student.grade + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">辅导员姓名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="teacherName" value="' + student.teacherName + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">辅导员电话号码</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="teacherTelephone" value="' + student.teacherTelephone + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </form>\n' +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
                '                        <button type="submit" class="btn btn-primary" id="as-update-submit">提交</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </form>';
            $('#as-other-modal').html(modal);
        },
        error: function () {
            alert("未知错误");
        }
    });

    $('#as-update-submit').click(function () {
        let sid = $('#as-update-sid').val();
        let dbname = $('#as-update-dbname').val();
        let dname = $('#as-update-dname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            if (dname === '' || dname === null) {
                alert("寝室号不能为空")
            } else {
                if (sid === '' || sid === null)
                {
                    alert("学号不能为空")
                }
                else{
                    let data = $.param({sid: sid}) + '&' + $('#as-update-form').serialize();
                    $.ajax({
                        type: "post",
                        url: "/updateStu",
                        xhrFields: {widthCredentials: true},
                        async: false,
                        data: data,
                        success: function (info) {
                            if (info.flag) {
                                alert("修改成功");
                            } else {
                                alert("修改失败，" + info.errorMsg);
                            }
                            location.href = "smain.html";
                        },
                        error: function () {
                            alert("未知错误");
                        }
                    });
                }
            }
        }
    });
}

/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllDormBuilding//////////////////////////////////////////////////////////
function adb_show_update_modal(dbid) {
    $.ajax({
        type: "get",
        url: "/findOneDb",
        xhrFields: {widthCredentials: true},
        async: false,
        data: {dbid: dbid},
        success: function (dormBuilding) {
            let modal = '<form class="form-horizontal" role="form" id="adb-update-form" style="margin: 20px;">\n' +
                '        <div class="modal fade" id="adb-update' + dormBuilding.dbid + '" tabindex="-1" role="dialog"\n' +
                '             aria-labelledby="myModalLabel" aria-hidden="true">\n' +
                '            <div class="modal-dialog">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
                '                            &times;\n' +
                '                        </button>\n' +
                '                        <h4 class="modal-title">\n' +
                '                            修改宿舍楼信息\n' +
                '                        </h4>\n' +
                '                    </div>\n' +
                '                    <div class="modal-body">\n' +
                '                        <form class="form-horizontal" role="form">\n' +
                '                            <div class="form-group">\n' +
                '                                <label for="" class="col-sm-3 control-label">宿舍楼名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="dbname" id="adb-update-dbname" value="' + dormBuilding.dbname + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label for="" class="col-sm-3 control-label">房间数量</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="roomNumber" value="' + dormBuilding.roomNumber + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label for="" class="col-sm-3 control-label">学生数量</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="studentNumber" value="' + dormBuilding.studentNumber + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </form>\n' +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
                '                        <button type="submit" class="btn btn-primary" id="adb-update-submit">提交</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </form>';
            $('#adb-other-modal').html(modal);
        },
        error: function () {
            alert("未知错误");
        }
    });

    $('#adb-update-submit').click(function () {
        let dbname = $('#adb-update-dbname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            let data = $.param({dbid: dbid}) + '&' + $('#adb-update-form').serialize();
            $.ajax({
                type: "post",
                url: "/updateDb",
                xhrFields: {widthCredentials: true},
                async: false,
                data: data,
                success: function (info) {
                    if (info.flag) {
                        alert("修改成功");
                    } else {
                        alert("修改失败，" + info.errorMsg);
                    }
                    location.href = "smain.html";
                },
                error: function () {
                    alert("未知错误");
                }
            });
        }
    });
}

/////////////////////////////////////////////////AllDormBuilding//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////
function ad_show_update_modal(did) {
    $.ajax({
        type: "get",
        url: "/findOneDorm",
        xhrFields: {widthCredentials: true},
        async: false,
        data: {did: did},
        success: function (dorm) {
            let modal = '<form class="form-horizontal" role="form" id="ad-update-form" style="margin: 20px;">\n' +
                '        <div class="modal fade" id="ad-update' + dorm.did + '" tabindex="-1" role="dialog"\n' +
                '             aria-labelledby="myModalLabel" aria-hidden="true">\n' +
                '            <div class="modal-dialog">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
                '                            &times;\n' +
                '                        </button>\n' +
                '                        <h4 class="modal-title">\n' +
                '                            修改寝室信息\n' +
                '                        </h4>\n' +
                '                    </div>\n' +
                '                    <div class="modal-body">\n' +
                '                        <form class="form-horizontal" role="form">\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">宿舍楼名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id="ad-update-dbname" name="dbname" value="' + dorm.dormBuilding.dbname + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">寝室名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id="ad-update-dname" name="dname" value="' + dorm.dname + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">可容纳人数</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="accNumber" value="' + dorm.accNumber + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">居住人数</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="studentNumber" value="' + dorm.studentNumber + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">剩余电费</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="resElectricity" value="' + dorm.resElectricity + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">剩余水费</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="resWater"  value="' + dorm.resWater + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </form>\n' +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
                '                        <button type="submit" class="btn btn-primary" id="ad-update-submit">提交</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </form>';
            $('#ad-other-modal').html(modal);
        },
        error: function () {
            alert("未知错误");
        }
    });

    $('#ad-update-submit').click(function () {
        let dbname = $('#ad-update-dbname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            let data = $.param({did: did}) + '&' + $('#ad-update-form').serialize();
            $.ajax({
                type: "post",
                url: "/updateDorm",
                xhrFields: {widthCredentials: true},
                async: false,
                data: data,
                success: function (info) {
                    if (info.flag) {
                        alert("修改成功");
                    } else {
                        alert("修改失败，" + info.errorMsg);
                    }
                    location.href = "smain.html";
                },
                error: function () {
                    alert("未知错误");
                }
            });
        }
    });
}

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllDormitoryManagers//////////////////////////////////////////////////////////
function adm_show_update_modal(mid) {
    $.ajax({
        type: "get",
        url: "/findOneDMan",
        xhrFields: {widthCredentials: true},
        async: false,
        data: {mid: mid},
        success: function (manager) {
            let modal = '<form class="form-horizontal" role="form" id="adm-update-form" style="margin: 20px;">\n' +
                '        <div class="modal fade" id="adm-update' + manager.mid + '" tabindex="-1" role="dialog"\n' +
                '             aria-labelledby="myModalLabel" aria-hidden="true">\n' +
                '            <div class="modal-dialog">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
                '                        <h4 class="modal-title">修改宿管信息</h4>\n' +
                '                    </div>\n' +
                '                    <div class="modal-body">\n' +
                '                        <form class="form-horizontal" role="form">\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">宿舍楼名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id="adm-update-dbname" name="dbname" value="' + manager.dormBuilding.dbname + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">姓名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="name" value="' + manager.name + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">性别</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="gender" value="' + manager.gender + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">电话号码</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="telephone" value="' + manager.telephone + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">用户名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id="adm-update-username" name="username" value="' + manager.username + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">密码</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id="adm-update-password" name="password" value="' + manager.password + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </form>\n' +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
                '                        <button type="submit" class="btn btn-primary" id="adm-update-submit">提交</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </form>';
            $('#adm-other-modal').html(modal);
        },
        error: function () {
            alert("未知错误");
        }
    });

    $('#adm-update-submit').click(function () {
        let dbname = $('#adm-update-dbname').val();
        let username = $('#adm-update-username').val();
        let password = $('#adm-update-password').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            if (username === '' || username === null) {
                alert("用户名不能为空");
            } else {
                if (password === '' || password === null) {
                    alert("密码不能为空");
                } else {
                    let data = $.param({mid: mid}) + '&' + $('#adm-update-form').serialize();
                    $.ajax({
                        type: "post",
                        url: "/updateDMan",
                        xhrFields: {widthCredentials: true},
                        async: false,
                        data: data,
                        success: function (info) {
                            if (info.flag) {
                                alert("修改成功");
                            } else {
                                alert("修改失败，" + info.errorMsg);
                            }
                            location.href = "smain.html";
                        },
                        error: function () {
                            alert("未知错误");
                        }
                    });
                }
            }
        }
    });
}

/////////////////////////////////////////////////AllDormitoryManagers//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////
function av_show_update_modal(vid) {
    $.ajax({
        type: "get",
        url: "/findOneVis",
        xhrFields: {widthCredentials: true},
        async: false,
        data: {vid: vid},
        success: function (visitor) {
            let modal = '<form class="form-horizontal" role="form" id="av-update-form" style="margin: 20px;">\n' +
                '        <div class="modal fade" id="av-update' + visitor.vid + '" tabindex="-1" role="dialog"\n' +
                '             aria-labelledby="myModalLabel" aria-hidden="true">\n' +
                '            <div class="modal-dialog">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
                '                        <h4 class="modal-title">修改访客信息</h4>\n' +
                '                    </div>\n' +
                '                    <div class="modal-body">\n' +
                '                        <form class="form-horizontal" role="form">\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">宿舍楼名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id="av-update-dbname" name="dbname" value="' + visitor.dormBuilding.dbname + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">姓名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="vname" value="' + visitor.vname + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">性别</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="gender" value="' + visitor.gender + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">电话号码</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="telephone" value="' + visitor.telephone + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">进入时间</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="inTime" value="' + visitor.inTime + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">离开时间</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="outTime" value="' + visitor.outTime + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">来访原因</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="instructions" value="' + visitor.instructions + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </form>\n' +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
                '                        <button type="submit" class="btn btn-primary" id="av-update-submit">提交</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </form>';
            $('#av-other-modal').html(modal);
        },
        error: function () {
            alert("未知错误");
        }
    });

    $('#av-update-submit').click(function () {
        let dbname = $('#av-update-dbname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            let data = $.param({vid: vid}) + '&' + $('#av-update-form').serialize();
            $.ajax({
                type: "post",
                url: "/updateVis",
                xhrFields: {widthCredentials: true},
                async: false,
                data: data,
                success: function (info) {
                    if (info.flag) {
                        alert("修改成功");
                    } else {
                        alert("修改失败，" + info.errorMsg);
                    }
                    location.href = "smain.html";
                },
                error: function () {
                    alert("未知错误");
                }
            });
        }
    });
}

/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////
function ari_show_update_modal(rid) {
    $.ajax({
        type: "get",
        url: "/findOneRep",
        xhrFields: {widthCredentials: true},
        async: false,
        data: {rid: rid},
        success: function (repair) {
            let modal = '<form class="form-horizontal" role="form" id="ari-update-form" style="margin: 20px;">\n' +
                '        <div class="modal fade" id="ari-update' + repair.rid + '" tabindex="-1" role="dialog"\n' +
                '             aria-labelledby="myModalLabel" aria-hidden="true">\n' +
                '            <div class="modal-dialog">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\n' +
                '                        <h4 class="modal-title">修改报修信息</h4>\n' +
                '                    </div>\n' +
                '                    <div class="modal-body">\n' +
                '                        <form class="form-horizontal" role="form">\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">宿舍楼名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id="ari-update-dbname" name="dbname" value="' + repair.dormBuilding.dbname + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">报修人姓名</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="repairName" value="' + repair.repairName + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">报修人寝室号</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="repairDormName" value="' + repair.repairDormName + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">报修人电话号码</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="repairTelephone" value="' + repair.repairTelephone + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">报修原因</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="instructions" value="' + repair.instructions + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">报修时间</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" name="repairTime" value="' + repair.repairTime + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </form>\n' +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
                '                        <button type="submit" class="btn btn-primary" id="ari-update-submit">提交</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </form>';
            $('#ari-other-modal').html(modal);
        },
        error: function () {
            alert("未知错误");
        }
    });

    $('#ari-update-submit').click(function () {
        let dbname = $('#ari-update-dbname').val();
        if (dbname === '' || dbname === null) {
            alert("宿舍楼不能为空");
        } else {
            let data = $.param({rid: rid}) + '&' + $('#ari-update-form').serialize();
            $.ajax({
                type: "post",
                url: "/updateRep",
                xhrFields: {widthCredentials: true},
                async: false,
                data: data,
                success: function (info) {
                    if (info.flag) {
                        alert("修改成功");
                    } else {
                        alert("修改失败，" + info.errorMsg);
                    }
                    location.href = "smain.html";
                },
                error: function () {
                    alert("未知错误");
                }
            });
        }
    });
}

/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////

function ali_show_update_modal(lid) {
    $.ajax({
        type: "get",
        url: "/findOneLate",
        xhrFields: {widthCredentials: true},
        async: false,
        data: {lid: lid},
        success: function (late) {
            let modal = '<form class="form-horizontal" role="form" id="ali-update-form" style="margin: 20px;">\n' +
                '        <div class="modal fade" id="ali-update' + late.lid + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"\n' +
                '             aria-hidden="true">\n' +
                '            <div class="modal-dialog">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
                '                            &times;\n' +
                '                        </button>\n' +
                '                        <h4 class="modal-title">\n' +
                '                            修改晚归信息\n' +
                '                        </h4>\n' +
                '                    </div>\n' +
                '                    <div class="modal-body">\n' +
                '                        <form class="form-horizontal" role="form">\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">学号</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="text" class="form-control" id = "ali-update-sid" name="stuNumber" value="' + late.stuNumber + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="form-group">\n' +
                '                                <label class="col-sm-3 control-label">晚归时间</label>\n' +
                '                                <div class="col-sm-9">\n' +
                '                                    <input type="date" class="form-control" id="ali-update-time" name = "lateTime" value="' + late.lateTime + '">\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </form>\n' +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
                '                        <button type="submit" class="btn btn-primary" id="ali-update-submit">提交</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </form>';
            $('#ali-other-modal').html(modal);
        },
        error: function () {
            alert("未知错误");
        }
    });

    $('#ali-update-submit').click(function () {
        let sn = $('#ali-update-sid').val();
        let lt = $('#ali-update-time').val();
        if (sn === '' || sn === null) {
            alert("学号不能为空");
        } else {
            if (lt === '' || lt === null) {
                alert("时间不能为空")
            } else {
                let data = $.param({lid: lid}) + '&' + $('#ali-update-form').serialize();
                $.ajax({
                    type: "post",
                    url: "/updateLate",
                    xhrFields: {widthCredentials: true},
                    async: false,
                    data: data,
                    success: function (info) {
                        if (info.flag) {
                            alert("修改成功");
                        } else {
                            alert("修改失败，" + info.errorMsg);
                        }
                        location.href = "smain.html";
                    },
                    error: function () {
                        alert("未知错误");
                    }
                });

            }
        }
    });
}