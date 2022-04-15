/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////
function as_show_delete_model(sid) {
    let modal = '<form class="form-horizontal" role="form" id="as-delete-form" style="margin: 20px;">\n' +
        '        <div class="modal fade" id="as-delete' + sid + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"\n' +
        '             aria-hidden="true">\n' +
        '            <div class="modal-dialog">\n' +
        '                <div class="modal-content">\n' +
        '                    <div class="modal-header">\n' +
        '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
        '                            &times;\n' +
        '                        </button>\n' +
        '                        <h4 class="modal-title">\n' +
        '                            提示\n' +
        '                        </h4>\n' +
        '                    </div>\n' +
        '                    <div class="modal-body">\n' +
        '                        <p>您确认要删除该条信息吗？</p>\n' +
        '                    </div>\n' +
        '                    <div class="modal-footer">\n' +
        '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
        '                        <button type="submit" class="btn btn-primary" id="as-delete-submit">确定</button>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </form>';
    $('#as-other-modal').html(modal);

    $('#as-delete-submit').click(function () {
        $.ajax({
            type: "delete",
            url: "/deleteStu",
            xhrFields: {widthCredentials: true},
            async: false,
            data: {sid:sid},
            success: function (info) {
                if (info.flag){
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
                location.href="smain.html";
            },
            error: function () {
                alert("未知错误");
            }
        });
    });
}
/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////
function ad_show_delete_model(did) {
    let modal = '<form class="form-horizontal" role="form" id="ad-delete-form" style="margin: 20px;">\n' +
        '        <div class="modal fade" id="ad-delete' + did + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"\n' +
        '             aria-hidden="true">\n' +
        '            <div class="modal-dialog">\n' +
        '                <div class="modal-content">\n' +
        '                    <div class="modal-header">\n' +
        '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
        '                            &times;\n' +
        '                        </button>\n' +
        '                        <h4 class="modal-title">\n' +
        '                            提示\n' +
        '                        </h4>\n' +
        '                    </div>\n' +
        '                    <div class="modal-body">\n' +
        '                        <p>您确认要删除该条信息吗？</p>\n' +
        '                    </div>\n' +
        '                    <div class="modal-footer">\n' +
        '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
        '                        <button type="submit" class="btn btn-primary" id="ad-delete-submit">确定</button>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </form>';
    $('#ad-other-modal').html(modal);

    $('#ad-delete-submit').click(function () {
        $.ajax({
            type: "delete",
            url: "/deleteDorm",
            xhrFields: {widthCredentials: true},
            async: false,
            data: {did:did},
            success: function (info) {
                if (info.flag){
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
                location.href="smain.html";
            },
            error: function () {
                alert("未知错误");
            }
        });
    });
}
/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////
function av_show_delete_model(vid) {
    let modal = '<form class="form-horizontal" role="form" id="av-delete-form" style="margin: 20px;">\n' +
        '        <div class="modal fade" id="av-delete' + vid + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"\n' +
        '             aria-hidden="true">\n' +
        '            <div class="modal-dialog">\n' +
        '                <div class="modal-content">\n' +
        '                    <div class="modal-header">\n' +
        '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
        '                            &times;\n' +
        '                        </button>\n' +
        '                        <h4 class="modal-title">\n' +
        '                            提示\n' +
        '                        </h4>\n' +
        '                    </div>\n' +
        '                    <div class="modal-body">\n' +
        '                        <p>您确认要删除该条信息吗？</p>\n' +
        '                    </div>\n' +
        '                    <div class="modal-footer">\n' +
        '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
        '                        <button type="submit" class="btn btn-primary" id="av-delete-submit">确定</button>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </form>';
    $('#av-other-modal').html(modal);

    $('#av-delete-submit').click(function () {
        $.ajax({
            type: "delete",
            url: "/deleteVis",
            xhrFields: {widthCredentials: true},
            async: false,
            data: {vid:vid},
            success: function (info) {
                if (info.flag){
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
                location.href="smain.html";
            },
            error: function () {
                alert("未知错误");
            }
        });
    });
}
/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////
function ari_show_delete_model(rid) {
    let modal = '<form class="form-horizontal" role="form" id="ari-delete-form" style="margin: 20px;">\n' +
        '        <div class="modal fade" id="ari-delete' + rid + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"\n' +
        '             aria-hidden="true">\n' +
        '            <div class="modal-dialog">\n' +
        '                <div class="modal-content">\n' +
        '                    <div class="modal-header">\n' +
        '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
        '                            &times;\n' +
        '                        </button>\n' +
        '                        <h4 class="modal-title">\n' +
        '                            提示\n' +
        '                        </h4>\n' +
        '                    </div>\n' +
        '                    <div class="modal-body">\n' +
        '                        <p>您确认要删除该条信息吗？</p>\n' +
        '                    </div>\n' +
        '                    <div class="modal-footer">\n' +
        '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
        '                        <button type="submit" class="btn btn-primary" id="ari-delete-submit">确定</button>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </form>';
    $('#ari-other-modal').html(modal);

    $('#ari-delete-submit').click(function () {
        $.ajax({
            type: "delete",
            url: "/deleteRep",
            xhrFields: {widthCredentials: true},
            async: false,
            data: {rid:rid},
            success: function (info) {
                if (info.flag){
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
                location.href="smain.html";
            },
            error: function () {
                alert("未知错误");
            }
        });
    });
}
/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
function ali_show_delete_model(lid) {
    let modal = '<form class="form-horizontal" role="form" id="ali-delete-form" style="margin: 20px;">\n' +
        '        <div class="modal fade" id="ali-delete' + lid + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"\n' +
        '             aria-hidden="true">\n' +
        '            <div class="modal-dialog">\n' +
        '                <div class="modal-content">\n' +
        '                    <div class="modal-header">\n' +
        '                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\n' +
        '                            &times;\n' +
        '                        </button>\n' +
        '                        <h4 class="modal-title">\n' +
        '                            提示\n' +
        '                        </h4>\n' +
        '                    </div>\n' +
        '                    <div class="modal-body">\n' +
        '                        <p>您确认要删除该条信息吗？</p>\n' +
        '                    </div>\n' +
        '                    <div class="modal-footer">\n' +
        '                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n' +
        '                        <button type="submit" class="btn btn-primary" id="ali-delete-submit">确定</button>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </form>';
    $('#ali-other-modal').html(modal);

    $('#ali-delete-submit').click(function () {
        $.ajax({
            type: "delete",
            url: "/deleteLat",
            xhrFields: {widthCredentials: true},
            async: false,
            data: {lid:lid},
            success: function (info) {
                if (info.flag){
                    alert("删除成功");
                } else {
                    alert("删除失败");
                }
                location.href="omain.html";
            },
            error: function () {
                alert("未知错误");
            }
        });
    });
}
/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
