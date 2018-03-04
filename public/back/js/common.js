$(function() {

    // 设置进度条
    // jQuery 中，ajax的6个全局事件 ajaxStart--调用beforeSend的回调函数，ajaxStop在ajax请求结束时触发
    // 发送ajax请求之前，开启进度条
    $(document).ajaxStart(function() {
        NProgress.start();
    })
    // ajax请求结束之后，关闭进度条
    $(document).ajaxStop(function() {
        // 为了使进度条效果更美观，设置500ms延迟，再关闭进度条
        setTimeout(function() {
            NProgress.done();
        },500)
    })
    // 禁用进度环
    NProgress.configure({
        showSpinner: false
    })
    
    // 侧边栏二级菜单的显示与隐藏
    $('.category-second').prev().on('click',function() {
        $(this).next().slideToggle();
    })

    // 点击.head-menu ，隐藏侧边栏
    $('.head-menu').on('click',function() {
        // 使侧边栏隐藏
        $('.lt-aside').toggleClass('aside-hide');
        // 使主页面展开
        $('.lt-main').toggleClass('main-spread');
    })

    // 退出功能
    // 点击退出登录图标，显示模态框
    $('.head-logout').on('click',function() {
        $('#logoutModal').modal('show');
    })

    // 不要在事件里面注册事件
    // 点击退出登录按钮，退出登录
    $('.btn_logout').on('click',function() {
        // 需要告诉服务器，当前在执行退出操作，让服务器销毁对应的session文件
        $.ajax({
            type: 'get',
            url: '/employee/employeeLogout',
            success: function(info) {
                // console.log(info);
                // 输出结果 {success: true}
                if(info.success == true) {
                    // 如果退出成功，跳转到登录页
                    location.href = 'login.html';
                }
            }
        })
    })

    // 如果当前页不是登录页，需发送ajax请求，查询管理员是否登录
    if(location.href.indexOf('login.html') == -1) {
        $.ajax({
            type: 'get',
            url: '/employee/checkRootLogin',
            success: function(info) {
                // console.log(info);
                // 输出结果 {error: 400, message: "未登录！"}
                if(info.error === 400) {
                    location.href = 'login.html';
                }
            }
        })
    }
    
    
})