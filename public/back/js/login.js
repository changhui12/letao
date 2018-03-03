// 入口函数的作用：
// 1-页面加载完成之后再执行
// 2-防止全局变量污染
$(function() {

    // 1-校验表单
    $('form').bootstrapValidator({
        // 指定校验字段
        fields: {
            // 校验用户名，对应name表单的name属性
            username: {
                validators: {
                    // 不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    // 长度校验
                    stringLength: {
                        min: 2,
                        max: 18,
                        message: '用户名需在2-8位'
                    },
                    // 正则校验
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: '用户名由数字字母下划线和.构成'
                    },
                    // 专门用来提示 表单提交之后 未登录成功的提示信息
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            // 校验密码
            password: {
                validators: {
                    notEmpty: {
                        message: '用户密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码需在6-18位'
                    },
                    callback: {
                        message: '密码错误'
                    }
                }
            },
            // 配置与提示信息相匹配的小图标
            
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    })

    // 2-提交表单
    // 当表单校验成功时，会触发success.form.bv事件，此时会提交表单，这时候，我们需要禁止表单的自动提交，使用ajax进行表单的提交
    // 给表单注册一个校验成功的事件，事件被触发时，阻止表单的默认提交，而使用ajax提交表单
    $('form').on('success.form.bv',function(e) {
        // 阻止浏览器的默认行为
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('form').serialize(),    // 表单序列化
            dataType: 'json',
            success: function(info) {
                // console.log(info);
                // 用户名不存在导致登录失败时返回 {error: 1000, message: "用户名不存在! "}
                // 密码错误导致登录失败时返回 {error: 1001, message: "密码错误！"}
                // 登录成功时返回 {success: true}
                if(info.error === 1000) {
                    $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
                } else if(info.error === 1001) {
                    $('form').data('bootstrapValidator').updateStatus('password','INVALID','callback');
                } else if(info.success) {
                    location.href = 'index.html';
                }
            }
        })
    })

    // 3-设置重置按钮 重置表单，清除所有内容
    $('[type="reset"]').on('click',function() {
        $('form').data('bootstrapValidator').resetForm(true);
        // 这里type=reset，参数true传与不传结果都会清空整个表单，如果不是reset类型，则必须传入true
    })

})