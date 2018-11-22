$(document).ready(function() { 
    var page= 1
    var offset= 20 
    init = function (page) {
        $.getJSON("/photo/output.json", function (data) {
            render(page, data);

            scroll(data);
        });
    }
    
    init(page);

    var render = function (page, data) {
 
        var begin = (page - 1) * offset;
        var end = page * offset;
        if (begin >= data.length) return;
        var html, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
            li += '<li style="margin-buttom:20px;display:inline;"><div class="img-box">' +
                '<a class="img-bg" id="alterimage'+i+'" rel="example_group" href="http://photo.xiaoxiaomo.com/' + data[i] + '?imageView2/1/w/200/h/200&raw=true"></a>' +
                '<img lazy-src="http://photo.xiaoxiaomo.com/' + data[i] + '?imageView2/1/w/200/h/200&raw=true" />' +
                '</li>';

        }

        jQuery_lazyload(".img-box-ul").append(li);
        jQuery_lazyload(".img-box-ul").lazyload();
        if(jQuery_lazyload(document).width() <= 600){
            jQuery_lazyload(".img-box").css({"width":"auto", "height":"220"});
        }else{
            var width = jQuery_lazyload(".img-box-ul").width();
            // var size = Math.max(width*0.26, 200);
            // jQuery_lazyload(".img-box").width(size).height(size);
            jQuery_lazyload(".img-box").width(200).height(220);
        }
            
        jQuery_lazyload("a[rel=example_group]").fancybox();
    }

    var scroll = function (data) {
        jQuery_lazyload(window).scroll(function() {
            var windowPageYOffset = window.pageYOffset;
            var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
            var sensitivity = 0;

            var offsetTop = jQuery_lazyload(".instagram").offset().top + jQuery_lazyload(".instagram").height();

            if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                render(++page, data);
            }
        })
    }
});

