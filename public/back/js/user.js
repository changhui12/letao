$(function() {
    var page = 1;
    var pageSize = 5;
    // 渲染用户管理表格
    function renderUser() {
        // 发送ajax请求，获取用户数据，渲染到页面
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info) {
                // console.log(info);
                // 准备数据，获取到的数据在info中
                // 模版 + 数据 = html结构  绑定模版与数据
                // 第一个参数：模版id   第二参数：对象
                // 当模版与对象绑定之后，在模版中可以直接使用对象的所有属性。
                var html = template('userTmp',info);
                // 渲染表格数据
                $('tbody').html(html);
                
                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,   // 如果使用了bootstrap3版本，必须指定此版本号
                    currentPage: page,  // 设置当前页
                    numberOfPages: 5,   // 默认显示5页
                    totalPages: Math.ceil(info.total / info.size),  // 设置总页数
                    onPageClicked: function(a,b,c,currentPage) {    // 页码被点击时触发
                        page = currentPage;     // 修改page为当前点击的页码
                        renderUser();   // 重新渲染页面
                    }
                })
            }
        })
    }
    renderUser();

    // 禁用/启用功能
    $('tbody').on('click','.btn',function() {
        // 显示模态框
        $('#userModal').modal('show');
        // 获取需传到后台的参数
        // 获取到点击按钮所在的用户id
        var id = $(this).parent().data('id');
        // console.log(id);
        // 根据按钮的.btn-success/.btn-danger 类，来判断用户账号应更改成为的状态
        var isDelete = $(this).hasClass('btn-success') ? 1 : 0;
        // 给模态框的‘确认’按钮设置点击事件    在事件里面注册事件，使用off(),阻止
        $('.btn_confirm').off().on('click',function() {
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function(info) {
                    // console.log(info);
                    if(info.success) {
                        // 关闭模态框
                        $('#userModal').modal('hide');
                        // 重新渲染
                        renderUser();
                    }
                }
            })
        })
    })
})