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
    
    
})