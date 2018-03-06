$(function() {
    // 发送ajax请求，获取表格中的一级分类数据，并渲染
    var page = 1;
    var pageSize = 5;
    function renderFirst() {      
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info) {
                // console.log(info);
                $('tbody').html(template('firstTpl',info));

                // 设置分页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,   //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: page,  //当前页
                    totalPages: Math.ceil(info.total / info.size),  //总页数
                    onPageClicked: function(event, originalEvent, type,Page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        // 设置当前页
                        page = Page;
                        // 重新渲染
                        renderFirst();
                    }
                });
            }
        })
    }
    renderFirst();

    // 添加分类功能 点击显示模态框
    $('.main-add').on('click',function() {
        $("#firstModal").modal("show");       
    })

    // 初始化表单校验
    var $form = $('#form');  // 提高性能，避免每次都获取dom对象
    $form.bootstrapValidator({
        // 指定校验时的图标显示
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 指定校验字段
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名不能为空'
                    }
                }
            }
        }
    })

    // 给表单注册校验成功事件
    // 阻止默认的表单提交，使用ajax提交表单 
    // ‘添加’按钮类型需为submit，不能是button，否则无法验证表单及提交表单
    $form.on("success.form.bv", function(e) {
        // 阻止默认事件
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $form.serialize(),
            success: function(info) {
                // console.log(info);
                if(info.success) {
                    // 关闭模态框
                    $("#firstModal").modal("hide");;
                    // 清空表单样式
                    $form.data("bootstrapValidator").resetForm(true);
                    // 重新渲染第一页
                    page = 1;
                    renderFirst();
                }
            }
        })
    })

})