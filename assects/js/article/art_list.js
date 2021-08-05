$(function () {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);

        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());

        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + '-' + mm + '-' + ss;
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 定义一个查询的参数对象
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //文章的状态，可选值有：已发布、草稿
    }

    initTable();
    initCate();

    // 获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败');
                }
                console.log(res);
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl_table', res);
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    }

    // 初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败');
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl_cate', res);
                $('[name=cate_id]').html(htmlStr);
                // 通知 layui 重新渲染变淡区域的ui结构
                form.render();
            }
        })
    }

    // 为筛选表单绑定submit事件
    $('#form_search').on('submit', function (e) {
        e.preventDefault();
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        initTable();
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        // 调用layui 的 laypage.render 方法渲染分页区域
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, // 每页显示的条数
            curr: q.pagenum, // 默认选择的分页
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                q.pagenum = obj.curr;
                q.pagesize = obj.limit; //得到当前页，以便向服务端请求对应页的数据。
                if (!first) {
                    initTable();
                }
                // console.log(obj.limit); //得到每页显示的条数
            }
        });
    }

    // 通过代理给删除按钮绑定事件
    $('tbody').on('click', '.btn_delete', function () {
        // 获取删除按钮的个数
        var len = $('.btn_delete').length
        var id = $(this).attr('data_id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败');
                    }
                    layer.msg('删除文章成功');
                    // 当数据删除完成后，判断当前页中是否还有数据
                    // 如果没有了 要让页码值 -1 之后再渲染
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
                    }
                    initTable();
                }
            })
            layer.close(index);
        })
    })

    // 给文章编辑按钮绑定 click 单击事件
    $('body').on('click', '.btn-edit', function () {
        location.href = '/article/art_edit.html?id=' + $(this).attr('data-id')
    })
})