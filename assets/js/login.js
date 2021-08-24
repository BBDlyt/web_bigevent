$(function(){
    $('#link_reg').on('click',function(){
       $('.login_box').hide()
       $('.reg_box').show()
       console.log(1);
    })
    $('#link_login').on('click',function(){
        $('.login_box').show()
        $('.reg_box').hide()
    })
    //获取form元素
    var form=layui.form
    var layer=layui.layer
    //自定义校验规则
    form.verify({
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        repwd:function(value){
            var pwd=$('.reg_box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
      }); 
    $('#form_reg').on('submit',function(e){
        var username=$('#form_reg [name=username]').val()
        var password=$('#form_reg [name=password]').val()
        e.preventDefault()
        $.post(
            'api/reguser',
            {username,password},
            function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#link_login').click()
            }
        )
    })
    $('#form_login').on('submit',function(e){
        console.log(1)
        e.preventDefault()
        $.ajax({
            url:'api/login',
            method:'post',
            data:$(this).serialize(),
            success:function(res){
                console.log(res.token)
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token',res.token)
                location.href='/index.html'

            }
        })
    })          
})