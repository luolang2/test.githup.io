$(function () {
    // go reg
    $('#link_reg').on('click', function () {
        $('.login').hide();
        $('.reg').show();
    })

    // go login
    $('#link_login').on('click', function () {
        $('.login').show();
        $('.reg').hide();
    })

    // 表单验证
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ]
    })

    // reg
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $('.username2').val(), password: $('.password2').val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录');
            // 模拟文档点击行为
            $('#link_login').click();
        })
    })

    // login
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'post',
            // 快速获取表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败');
                }
                layer.msg('登陆成功');
                //把token值存储在本地
                localStorage.setItem('token', res.token)
                // 跳转页面到主页
                location.href = '/index.html';
            }
        })
    })
})