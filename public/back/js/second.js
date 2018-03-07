$(function() {
    var page = 1;
    var pageSize = 5;
    // 渲染二级分类列表
    function renderSecond() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info) {
                // console.log(info);
                $('tbody').html(template('secondTpl',info));
                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function(a,b,c,p) {
                        page = p;
                        renderSecond();
                    } 
                })
            }
        })
    }
    renderSecond();

    // 1. 点击添加分类按钮，显示模态框,加载一级分类数据
    $('.main-add').on('click',function() {
        $('#secondModal').modal("show");
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function(info) {
                // console.log(info);
                $('.dropdown-menu').html(template('firstTitleTpl',info));
            }
        })
    })

    // 2. 给dropdown-menu下所有的a标签(一级分类)设置点击事件
    $('.dropdown-menu').on('click','a',function() {
        // 将选中的一级分类填入dropdown_text框中
        var text = $(this).text();
        $('.dropdown_text').text(text);
        // 获取当前点击的a标签所在的li的id (已使用data-id属性来存储一级分类的id),利用input标签的name属性提交categoryId
        var id = $(this).parent().data('id');
        $('[name="categoryId"]').val(id);
        // 让categoryId的校验通过 需先激活校验工具
        $form.data('bootstrapValidator').updateStatus('categoryId','VALID');
    })

    //3. 初始化图片上传
        //3.1 引入js文件 （jquery、 ui.widgt.js 、fileupload）
        //3.2 准备一个input:file的文本框，   name和data-url
        //3.3 初始化  fileupload
    $('#fileupload').fileupload({
        dataType: 'json',
        // 图片上传结束后，会调用的回调函数
        done: function(e,data) {
            // 图片的地址
            var pic = data.result.picAddr;
            // 显示图片
            $('.img_box img').attr('src',pic);
            // 给传递图片logo的隐藏input设置value值
            $('[name="brandLogo"]').val(pic);
            // 让brandLogo的校验通过
            $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    })

    // 4.表单校验功能
    var $form = $('#secondForm');
    $form.bootstrapValidator({
        // 设置隐藏的元素参与校验
        excluded: [],
        // 设置小图标       
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 设置字段校验规则
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入品牌名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传品牌图片'
                    }
                }
            }
        }
    })

    // 5. 添加二级分类
    // 注册表单校验成功实践，阻止默认提交表单，使用ajax提交表单
    $form.on('success.form.bv',function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $form.serialize(),
            success: function(info) {
                // console.log(info);
                if(info.success) {
                    // 关闭模态框
                    $('#secondModal').modal('hide');
                    // 渲染第一页
                    page = 1;
                    renderSecond();
                    // 重置模态框中表单的内容 
                    $form.data('bootstrapValidator').resetForm(true);
                    $('.dropdown_text').text('请选择一级分类');
                    $('.img_box img').attr('src','images/none.png');
                }
            }
        })
    })

})