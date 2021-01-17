
$('#myTab a').on('click', function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
  
    if (scroll >= 50) {
        $(".navbar").addClass("whiteHeader");
    }
    else{
      $(".navbar").removeClass("whiteHeader");
    }
}); //missing );

$(document).ready(function(){
   setTimeout(()=>{ $(this).scrollTop(0);},100)
});

$(function () {
    lines();
});

function lines(){
    $('.line').each(function(index, e){
        var elm = $(e);
        var elmInside = $(e).find('>div');
        var direction = elm.data('direction');
        var duration = elm.data('duration');
        var delay = elm.data('delay');
        var start = elm.data('start');
        var top = elm.data('top');
        var mov = elm.data('mov');
        var width = elm.data('width');
        var height = elm.data('height');
        
        
        if (direction == 'left'){
            var origin = 'right top 0px';
            var to = 'left top 0px';
            elm.css({
                'right': start+'px',
            });
        }else{
            var origin = 'left top 0px';
            var to = 'right top 0px';
            elm.css({
                'left': start+'px',
            });
        }
        
        elm.css({
            'top': top+'px',
        });
        
        elmInside.css({
            'width': width+'px',
            'height': height+'px',
            'background': elm.data('color'),
            '-webkit-transform-origin': origin,
            '-moz-transform-origin': origin,
            '-ms-transform-origin': origin,
            'transform-origin': origin,
            'transform': 'scaleX(0)'  
        });
        
        // Initial scale from 0 to 1
        var scale = [1, 0];
        
        function loop(){
            // ANIM LINE 
            if (direction == 'left'){
                elm.velocity({
                    'right': mov+'px',
                },{
                    duration: (duration*2),
                    easing: "ease",
                    delay: delay,
                    complete: function(){
                        elm.css({
                            'right': start+'px',
                        });
                    }
                });
            }else{
                elm.velocity({
                    'left': mov+'px'
                },{
                    duration: (duration*2),
                    easing: "ease",
                    delay: delay,
                    complete: function(){
                        elm.css({
                            'left': start+'px',
                        });
                    }
                });
            }
            
            // ANIM INSIDE LINE
            elmInside.velocity({
                 scaleX:scale,
            },{
                duration: duration,
                easing: "ease",
                delay: delay,
                complete: function() { 
                    elmInside.css({
                        'transform-origin': to,
                        'transition':''
                    });
                    elmInside.velocity({
                        scaleX: 0
                    },{
                        duration: duration,
                        easing: "ease",
                        delay: 0,
                        complete: function(){
                            elmInside.css({
                                'transform-origin': origin
                            });
                            scale = 1;
                            loop();
                        }
                    });
                }
            });
        }
        loop();
        
    });
}



