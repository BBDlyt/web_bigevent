//每次发送请求，会先调用ajaxPrefilter这个函数，可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(option){
   
    option.url='http://api-breakingnews-web.itheima.net/'+option.url
})