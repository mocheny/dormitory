/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////
//定义一个含条件加载AllStudent中table表内容的方法
function as_load_table(current, dormBuildingName, dormName, searchContent) {
    $.get("/allStuQuery", {
        current: current,
        dormBuildingName: dormBuildingName,
        dormName: dormName,
        searchContent: searchContent
    }, function (page) {
        if (dormBuildingName === null || dormBuildingName === undefined) {
            dormBuildingName = '';
        }
        if (dormName === null || dormName === undefined) {
            dormName = '';
        }
        if (searchContent === null || searchContent === undefined) {
            searchContent = '';
        }

        //设置数据量相关信息
        $('#as-current').html(page.current);
        $('#as-pages').html(page.pages);
        $('#as-total').html(page.total);
        //设置数字浮标
        $('#as-count').html(page.total);

        let lis = "";
        if (page.pages > 0) {
            let beforeNum = page.current === 1 ? page.current : page.current - 1;
            let beforePage = '<li onclick=\'javascript:as_load_table(' + beforeNum + ',"' + dormBuildingName + '","' + dormName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            let nextNum = page.current === page.pages ? page.current : page.current + 1;
            let nextPage = '<li onclick=\'javascript:as_load_table(' + nextNum + ',"' + dormBuildingName + '","' + dormName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
            lis += beforePage;
            /**
             1.一共展示10个页码，能够达到前5后4的效果
             2.如果前面不够5个，后面补齐10个
             3.如果后面不够5个，前面补齐10个
             */
                //定义开始位置begin，结束位置end
            let begin;
            let end;
            //1.要显示10个页码
            if (page.pages < 10) {
                //总页码不足10页
                begin = 1;
                end = page.pages;
            } else {
                //总页码超过10页
                begin = page.current - 5;
                end = page.current + 4;

                //2.如果前面不够5个，后面补齐10个
                if (begin < 1) {
                    begin = 1;
                    end = begin + 9;
                }

                //3.如果后面不够5个，前面补齐10个
                if (end > page.pages) {
                    end = page.pages;
                    begin = end - 9;
                }
            }
            for (let i = begin; i <= end; i++) {
                let li = '';
                //判断当前页码是否等于i
                if (page.current === i) {
                    li = '<li class="active" onclick=\'javascript:as_load_table(' + i + ',"' + dormBuildingName + '","' + dormName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                } else {
                    li = '<li onclick=\'javascript:as_load_table(' + i + ',"' + dormBuildingName + '","' + dormName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                }
                lis += li;
            }
            lis += nextPage;
        }
        $('#as-pagination').html(lis);

        let table = '<tbody>' +
            '           <tr>\n' +
            '                <th>宿舍楼名</th>\n' +
            '                <th>房间数量</th>\n' +
            '                <th>学生总数</th>\n' +
            '                <th>寝室名</th>\n' +
            '                <th>居住人数</th>\n' +
            '                <th>剩余电费</th>\n' +
            '                <th>剩余水费</th>\n' +
            '                <th>学生姓名</th>\n' +
            '                <th>学生学号</th>\n' +
            '                <th>学生性别</th>\n' +
            '                <th>学生电话号码</th>\n' +
            '                <th>学生所在班级</th>\n' +
            '                <th>学生辅导员姓名</th>\n' +
            '                <th>学生辅导员电话号码</th>\n' +
            '                <th>#</th>\n' +
            '            </tr>';
        for (let i = 0; i < page.records.length; i++) {
            let student = page.records[i];
            let tr = '<tr>\n' +
                '                <td>' + student.dorm.dormBuilding.dbname + '</td>\n' +
                '                <td>' + student.dorm.dormBuilding.roomNumber + '</td>\n' +
                '                <td>' + student.dorm.dormBuilding.studentNumber + '</td>\n' +
                '                <td>' + student.dorm.dname + '</td>\n' +
                '                <td>' + student.dorm.studentNumber + '</td>\n' +
                '                <td>' + student.dorm.resElectricity + '</td>\n' +
                '                <td>' + student.dorm.resWater + '</td>\n' +
                '                <td>' + student.sname + '</td>\n' +
                '                <td>' + student.stuNumber + '</td>\n' +
                '                <td>' + student.gender + '</td>\n' +
                '                <td>' + student.telephone + '</td>\n' +
                '                <td>' + student.grade + '</td>\n' +
                '                <td>' + student.teacherName + '</td>\n' +
                '                <td>' + student.teacherTelephone + '</td>\n' +
                '                <td>\n' +
                '                    <button type="button" class="btn btn-primary btn-success" data-toggle="modal" ' +
                '                           data-target="#as-update' + student.sid + '" onclick="as_show_update_modal(' + student.sid + ')">修改</button>\n' +
                '                    <button type="button" class="btn btn-primary btn-danger" data-toggle="modal" ' +
                '                           data-target="#as-delete' + student.sid + '" onclick="as_show_delete_model(' + student.sid + ')">删除</button>\n' +
                '                </td>\n' +
                '            </tr>';
            table += tr;
        }
        table += '</tbody>';
        $('#as-table').html(table);
        tableFormatting();  //表格格式化
    });
}

/////////////////////////////////////////////////AllStudent//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////
function ad_load_table(current, dormBuildingName, searchContent) {
    $.get("/allDormQuery", {
        current: current,
        dormBuildingName: dormBuildingName,
        searchContent: searchContent
    }, function (page) {
        if (dormBuildingName === null || dormBuildingName === undefined) {
            dormBuildingName = '';
        }
        if (searchContent === null || searchContent === undefined) {
            searchContent = '';
        }

        //设置数据量相关信息
        $('#ad-current').html(page.current);
        $('#ad-pages').html(page.pages);
        $('#ad-total').html(page.total);
        //设置数字浮标
        $('#ad-count').html(page.total);

        let lis = "";
        if (page.pages > 0) {
            let beforeNum = page.current === 1 ? page.current : page.current - 1;
            let beforePage = '<li onclick=\'javascript:ad_load_table(' + beforeNum + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            let nextNum = page.current === page.pages ? page.current : page.current + 1;
            let nextPage = '<li onclick=\'javascript:ad_load_table(' + nextNum + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
            lis += beforePage;
            let begin;
            let end;
            if (page.pages < 10) {
                begin = 1;
                end = page.pages;
            } else {
                begin = page.current - 5;
                end = page.current + 4;
                if (begin < 1) {
                    begin = 1;
                    end = begin + 9;
                }
                if (end > page.pages) {
                    end = page.pages;
                    begin = end - 9;
                }
            }
            for (let i = begin; i <= end; i++) {
                let li = '';
                if (page.current === i) {
                    li = '<li class="active" onclick=\'javascript:ad_load_table(' + i + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                } else {
                    li = '<li onclick=\'javascript:ad_load_table(' + i + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                }
                lis += li;
            }
            lis += nextPage;
        }
        $('#ad-pagination').html(lis);

        let table = '<tbody>' +
            '           <tr>\n' +
            '                <th>宿舍楼名</th>\n' +
            '                <th>寝室号</th>\n' +
            '                <th>可容纳学生数量</th>\n' +
            '                <th>学生居住人数</th>\n' +
            '                <th>剩余电费</th>\n' +
            '                <th>剩余水费</th>\n' +
            '                <th>#</th>\n' +
            '            </tr>';
        for (let i = 0; i < page.records.length; i++) {
            let dorm = page.records[i];
            let tr = '<tr>\n' +
                '                <td>' + dorm.dormBuilding.dbname + '</td>\n' +
                '                <td>' + dorm.dname + '</td>\n' +
                '                <td>' + dorm.accNumber + '</td>\n' +
                '                <td>' + dorm.studentNumber + '</td>\n' +
                '                <td>' + dorm.resElectricity + '</td>\n' +
                '                <td>' + dorm.resWater + '</td>\n' +
                '                <td>\n' +
                '                    <button type="button" class="btn btn-primary btn-success" data-toggle="modal" ' +
                '                           data-target="#ad-update' + dorm.did + '" onclick="ad_show_update_modal(' + dorm.did + ')">修改</button>\n' +
                '                    <button type="button" class="btn btn-primary btn-danger" data-toggle="modal" ' +
                '                           data-target="#ad-delete' + dorm.did + '" onclick="ad_show_delete_model(' + dorm.did + ')">删除</button>\n' +
                '                </td>\n' +
                '            </tr>'
            table += tr;
        }
        table += '</tbody>';
        $('#ad-table').html(table);
        tableFormatting();  //表格格式化
    });
}

/////////////////////////////////////////////////AllDorm//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////
function av_load_table(current, dormBuildingName, searchContent) {
    $.get("/allVisQuery", {
        current: current,
        dormBuildingName: dormBuildingName,
        searchContent: searchContent
    }, function (page) {
        if (dormBuildingName === null || dormBuildingName === undefined) {
            dormBuildingName = '';
        }
        if (searchContent === null || searchContent === undefined) {
            searchContent = '';
        }

        //设置数据量相关信息
        $('#av-current').html(page.current);
        $('#av-pages').html(page.pages);
        $('#av-total').html(page.total);
        //设置数字浮标
        $('#av-count').html(page.total);

        let lis = "";
        if (page.pages > 0) {
            let beforeNum = page.current === 1 ? page.current : page.current - 1;
            let beforePage = '<li onclick=\'javascript:av_load_table(' + beforeNum + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            let nextNum = page.current === page.pages ? page.current : page.current + 1;
            let nextPage = '<li onclick=\'javascript:av_load_table(' + nextNum + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
            lis += beforePage;
            let begin;
            let end;
            if (page.pages < 10) {
                begin = 1;
                end = page.pages;
            } else {
                begin = page.current - 5;
                end = page.current + 4;
                if (begin < 1) {
                    begin = 1;
                    end = begin + 9;
                }
                if (end > page.pages) {
                    end = page.pages;
                    begin = end - 9;
                }
            }
            for (let i = begin; i <= end; i++) {
                let li = '';
                if (page.current === i) {
                    li = '<li class="active" onclick=\'javascript:av_load_table(' + i + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                } else {
                    li = '<li onclick=\'javascript:av_load_table(' + i + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                }
                lis += li;
            }
            lis += nextPage;
        }
        $('#av-pagination').html(lis);

        let table = '<tbody>' +
            '           <tr>\n' +
            '                <th>宿舍楼名</th>\n' +
            '                <th>姓名</th>\n' +
            '                <th>性别</th>\n' +
            '                <th>电话号码</th>\n' +
            '                <th>进入时间</th>\n' +
            '                <th>离开时间</th>\n' +
            '                <th>来访原因</th>\n' +
            '                <th>#</th>\n' +
            '            </tr>';
        for (let i = 0; i < page.records.length; i++) {
            let visitor = page.records[i];
            let tr = '<tr>\n' +
                '                <td>' + visitor.dormBuilding.dbname + '</td>\n' +
                '                <td>' + visitor.vname + '</td>\n' +
                '                <td>' + visitor.gender + '</td>\n' +
                '                <td>' + visitor.telephone + '</td>\n' +
                '                <td>' + visitor.inTime + '</td>\n' +
                '                <td>' + visitor.outTime + '</td>\n' +
                '                <td>' + visitor.instructions + '</td>\n' +
                '                <td>\n' +
                '                    <button type="button" class="btn btn-primary btn-success" data-toggle="modal" ' +
                '                           data-target="#av-update' + visitor.vid + '" onclick="av_show_update_modal(' + visitor.vid + ')">修改</button>\n' +
                '                    <button type="button" class="btn btn-primary btn-danger" data-toggle="modal" ' +
                '                           data-target="#av-delete' + visitor.vid + '" onclick="av_show_delete_model(' + visitor.vid + ')">删除</button>\n' +
                '                </td>\n' +
                '            </tr>';
            table += tr;
        }
        table += '</tbody>';
        $('#av-table').html(table);
        tableFormatting();  //表格格式化
    });
}

/////////////////////////////////////////////////AllVisitors//////////////////////////////////////////////////////////

/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////
function ari_load_table(current, dormBuildingName, searchContent) {
    $.get("/allRepQuery", {
        current: current,
        dormBuildingName: dormBuildingName,
        searchContent: searchContent
    }, function (page) {
        if (dormBuildingName === null || dormBuildingName === undefined) {
            dormBuildingName = '';
        }
        if (searchContent === null || searchContent === undefined) {
            searchContent = '';
        }

        //设置数据量相关信息
        $('#ari-current').html(page.current);
        $('#ari-pages').html(page.pages);
        $('#ari-total').html(page.total);
        //设置数字浮标
        $('#ari-count').html(page.total);

        let lis = "";
        if (page.pages > 0) {
            let beforeNum = page.current === 1 ? page.current : page.current - 1;
            let beforePage = '<li onclick=\'javascript:ari_load_table(' + beforeNum + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            let nextNum = page.current === page.pages ? page.current : page.current + 1;
            let nextPage = '<li onclick=\'javascript:ari_load_table(' + nextNum + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
            lis += beforePage;
            let begin;
            let end;
            if (page.pages < 10) {
                begin = 1;
                end = page.pages;
            } else {
                begin = page.current - 5;
                end = page.current + 4;
                if (begin < 1) {
                    begin = 1;
                    end = begin + 9;
                }
                if (end > page.pages) {
                    end = page.pages;
                    begin = end - 9;
                }
            }
            for (let i = begin; i <= end; i++) {
                let li = '';
                if (page.current === i) {
                    li = '<li class="active" onclick=\'javascript:ari_load_table(' + i + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                } else {
                    li = '<li onclick=\'javascript:ari_load_table(' + i + ',"' + dormBuildingName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                }
                lis += li;
            }
            lis += nextPage;
        }
        $('#ari-pagination').html(lis);

        let table = '<tbody>' +
            '           <tr>\n' +
            '                <th>宿舍楼名</th>\n' +
            '                <th>报修人姓名</th>\n' +
            '                <th>报修人寝室名</th>\n' +
            '                <th>报修人电话号码</th>\n' +
            '                <th>报修原因</th>\n' +
            '                <th>报修时间</th>\n' +
            '                <th>#</th>\n' +
            '            </tr>';
        for (let i = 0; i < page.records.length; i++) {
            let repair = page.records[i];
            let tr = '<tr>\n' +
                '                <td>' + repair.dormBuilding.dbname + '</td>\n' +
                '                <td>' + repair.repairName + '</td>\n' +
                '                <td>' + repair.repairDormName + '</td>\n' +
                '                <td>' + repair.repairTelephone + '</td>\n' +
                '                <td>' + repair.instructions + '</td>\n' +
                '                <td>' + repair.repairTime + '</td>\n' +
                '                <td>\n' +
                '                    <button type="button" class="btn btn-primary btn-success" data-toggle="modal" ' +
                '                           data-target="#ari-update' + repair.rid + '" onclick="ari_show_update_modal(' + repair.rid + ')">修改</button>\n' +
                '                    <button type="button" class="btn btn-primary btn-danger" data-toggle="modal" ' +
                '                           data-target="#ari-delete' + repair.rid + '" onclick="ari_show_delete_model(' + repair.rid + ')">删除</button>\n' +
                '                </td>\n' +
                '            </tr>';
            table += tr;
        }
        table += '</tbody>';
        $('#ari-table').html(table);
        tableFormatting();  //表格格式化
    });
}

/////////////////////////////////////////////////AllRepairInformation//////////////////////////////////////////////////////////
/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
//定义一个含条件加载AllLateInformation中table表内容的方法
function ali_load_table(current, dormBuildingName, dormName, searchContent) {
    $.get("/allLatQuery", {
        current: current,
        dormBuildingName: dormBuildingName,
        dormName: dormName,
        searchContent: searchContent
    }, function (page) {
        if (dormBuildingName === null || dormBuildingName === undefined) {
            dormBuildingName = '';
        }
        if (dormName === null || dormName === undefined) {
            dormName = '';
        }
        if (searchContent === null || searchContent === undefined) {
            searchContent = '';
        }

        //设置数据量相关信息
        $('#ali-current').html(page.current);
        $('#ali-pages').html(page.pages);
        $('#ali-total').html(page.total);
        //设置数字浮标
        $('#ali-count').html(page.total);

        let lis = "";
        if (page.pages > 0) {
            let beforeNum = page.current === 1 ? page.current : page.current - 1;
            let beforePage = '<li onclick=\'javascript:ali_load_table(' + beforeNum + ',"' + dormBuildingName + '","' + dormName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>';
            let nextNum = page.current === page.pages ? page.current : page.current + 1;
            let nextPage = '<li onclick=\'javascript:ali_load_table(' + nextNum + ',"' + dormBuildingName + '","' + dormName + '","' + searchContent + '")\'><a href="javascript:void(0)" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>';
            lis += beforePage;
            /**
             1.一共展示10个页码，能够达到前5后4的效果
             2.如果前面不够5个，后面补齐10个
             3.如果后面不够5个，前面补齐10个
             */
                //定义开始位置begin，结束位置end
            let begin;
            let end;
            //1.要显示10个页码
            if (page.pages < 10) {
                //总页码不足10页
                begin = 1;
                end = page.pages;
            } else {
                //总页码超过10页
                begin = page.current - 5;
                end = page.current + 4;

                //2.如果前面不够5个，后面补齐10个
                if (begin < 1) {
                    begin = 1;
                    end = begin + 9;
                }

                //3.如果后面不够5个，前面补齐10个
                if (end > page.pages) {
                    end = page.pages;
                    begin = end - 9;
                }
            }
            for (let i = begin; i <= end; i++) {
                let li = '';
                //判断当前页码是否等于i
                if (page.current === i) {
                    li = '<li class="active" onclick=\'javascript:ali_load_table(' + i + ',"' + dormBuildingName + '","' + dormName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                } else {
                    li = '<li onclick=\'javascript:ali_load_table(' + i + ',"' + dormBuildingName + '","' + dormName + '","' + searchContent + '")\'><a href="javascript:void(0)">' + i + '</a></li>';
                }
                lis += li;
            }
            lis += nextPage;
        }
        $('#ali-pagination').html(lis);

        let table = '<tbody>' +
            '           <tr>\n' +
            '                <th>宿舍楼名</th>\n' +
            '                <th>寝室名</th>\n' +
            '                <th>学生姓名</th>\n' +
            '                <th>学生学号</th>\n' +
            '                <th>学生性别</th>\n' +
            '                <th>学生电话号码</th>\n' +
            '                <th>学生所在班级</th>\n' +
            '                <th>晚归时间</th>\n' +
            '                <th>#</th>\n' +
            '            </tr>';
        for (let i = 0; i < page.records.length; i++) {
            let late = page.records[i];
            let tr = '<tr>\n' +
                '                <td>' + late.dorm.dormBuilding.dbname + '</td>\n' +
                '                <td>' + late.dorm.dname + '</td>\n' +
                '                <td>' + late.lname + '</td>\n' +
                '                <td>' + late.stuNumber + '</td>\n' +
                '                <td>' + late.gender + '</td>\n' +
                '                <td>' + late.telephone + '</td>\n' +
                '                <td>' + late.grade + '</td>\n' +
                '                <td>' + late.lateTime  + '</td>\n' +
                '                <td>\n' +
                '                    <button type="button" class="btn btn-primary btn-success" data-toggle="modal" ' +
                '                           data-target="#ali-update' + late.lid + '" onclick="ali_show_update_modal(' + late.lid + ')">修改</button>\n' +
                '                    <button type="button" class="btn btn-primary btn-danger" data-toggle="modal" ' +
                '                           data-target="#ali-delete' + late.lid + '" onclick="ali_show_delete_model(' + late.lid + ')">删除</button>\n' +
                '                </td>\n' +
                '            </tr>';
            table += tr;
        }
        table += '</tbody>';
        $('#ali-table').html(table);
        tableFormatting();  //表格格式化
    });
}

/////////////////////////////////////////////////AllLateInformation//////////////////////////////////////////////////////////
