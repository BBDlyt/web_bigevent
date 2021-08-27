$(function () {
    var form = layui.form
    var laypage = layui.laypage;
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    function initList() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表失败')
                }
                console.log(res);
                var html = template('tpl-table', res)
                $('tbody').html(html)
                randerPage(res.total)
            }
        })
    }
    initList()
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类失败')
                }
                layer.msg('获取分类成功')
                var htmlstr = template('tpl-cate', res)
                $('#fenlei').html(htmlstr)
                form.render()
            }
        })
    }
    initCate()
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initList()

    })
    function randerPage(total) {
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total,//数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            jump: function (obj,first) {
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                if(!first){
                    initList()

                }

            }
        });
    }
    $('tbody').on('click', '#btn-delete', function () {
        var len=$('#btn-delete').length
        var id = $(this).attr('data-id')
        layer.confirm('是否删除', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if(len==1){
                        if(q.pagenum!==1){
                            q.pagenum--
                        }
                    }
                    layer.close(index);
                    initList()
                }
            })
            
        });


    })
})