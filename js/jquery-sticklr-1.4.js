/*
 * Sticklr.js v1.4.1
 * Sticky side panel jQuery plugin
 * https://github.com/faisalman/sticklr-js
 *
 * Copyright © 2011-2012 Faisal Salman <f@faisalman.com>
 * Dual licensed under GPLv2 & MIT
 */
 
(function($){

    $.fn.sticklr = function(method){

        var defaults = {
            animate         : false,
            menuHeight      : 20,
            menuWidth       : 180,
            relativeGap     : 15,
            relativeTo      : 'center',
            showOn		    : 'click',
            stickTo         : 'left',
            tabHeight       : 16,
            tabWidth        : 16
        };
               
        var methods = {
        
            init : function(opts){

                return this.each(function(){
                
                    var $sticklr    = $(this),
                        props       = $.extend({}, defaults, opts);
                    
                    if(props.animate && $(window).height() <= 320)
                    {
                        props.animate = false;
                    }
                                        
                    var top = helpers.calcTop(props.animate, props.relativeTo, props.relativeGap, $sticklr.height());
                    
                    if(!$sticklr.hasClass('sticklr'))
                    {
                        $sticklr.addClass('sticklr');
                    }
                    if(props.stickTo == 'right')
                    {
                        $sticklr.addClass('sticklr-right');
                    }                  
                    if(props.showOn == 'hover')
                    {
                        props.showOn = 'mouseenter';
                    }
                                   
                    $sticklr
                        .addClass('sticklr-js')
                        .css({
                            'position'  : (props.animate ? 'absolute' : 'fixed'),
                            'top'       : top,
                            'width'     : parseInt(props.tabWidth, 10) + 8
                        })
                        .data('props', props)
					    .find('a[href="#"]')
					        .bind('click', function(e){
						        e.preventDefault();
					        })
					        .end()
					    .children('li')
					        .css({
					            'height' : parseInt(props.tabHeight, 10) + 8
					        })
					        .children('a')
					            .css({
					                'height'    : props.tabHeight,
					                'width'     : props.tabWidth
					            })
					            .bind('click', function(){
					                methods.hide();
					            })					            
					            .bind(props.showOn, function(e){
					                if(!$(this).siblings().hasClass('sticklr-active')){
                                        methods.hide();
                                        var arrowStyle = $(this).siblings('ul').length ?
                                                        (
                                                            'class="sticklr-arrow" style="' 
                                                            + ((props.stickTo === 'left') ? 'left:' : 'right:') 
                                                            + (parseInt(props.tabWidth, 10) + 8) + 'px;top:' + (parseInt(props.tabHeight, 10) / 2) + 'px"'
                                                        )
                                                        : '';
                                        $(this)
                                            .append('<span ' + arrowStyle + '></span>')
                                            .siblings()
                                                .each(function(){                                                        
                                                    $(this)
                                                        .css({
                                                            'margin-left'   : parseInt(props.tabWidth, 10) + 34,
                                                            'margin-right'  : parseInt(props.tabWidth, 10) + 34,
                                                            'opacity'       : 0,
                                                            'position'      : 'absolute',
                                                            'top'           : 0
                                                        })
                                                        .show();
                                                    
                                                    var newTop          = 0,
                                                        totalHeight     = $(this).height() + $(this).offset().top,
                                                        windowHeight    = $(window).height() + $(window).scrollTop();
                                                    
                                                    if(totalHeight > windowHeight)
                                                    {
                                                        newTop = parseInt($(this).css('top'), 10) - (totalHeight -windowHeight);                                      
                                                    }                                                    
                                                    $(this)
                                                        .css({
                                                            'top'           : newTop
                                                        })
                                                        .animate({
                                                            'margin-left'   : parseInt(props.tabWidth, 10) + 4,
                                                            'margin-right'  : parseInt(props.tabWidth, 10) + 4,
                                                            'opacity'       : 1.0
                                                        }, 200);
                                                })
                                                .addClass('sticklr-active');
                                    }
                                    
                                    if($(this).attr('href') === '#')
                                    {
                                        e.preventDefault();
                                    }
					    });
				
				    //if($.browser.msie || props.menuWidth != defaults.menuWidth){					    
					    for(var i = 2; i < 10; i++){                            
                            var newLeft     = 23 + i + (parseInt(props.menuWidth, 10) * (i - 2)),
                                newRight    = 'auto';
                            if(props.stickTo === 'right'){
                                newRight    = newLeft;
                                newLeft     = 'auto';
                            }                            
						    $sticklr
						        .find('li')
						            .find('ul:nth-child(' + i + ')')
						                .each(function(){
						                    var menuWidth = parseInt($(this).attr('data-width'), 10) || props.menuWidth;
						                    $(this)
						                        .css({
							                        'left'	: newLeft,
							                        'right' : newRight,
							                        'width'	: menuWidth
						                        })
						                        .children('li')
						                            .css('min-height', props.menuHeight)
						                            .children('a')
						                                .css('min-height', props.menuHeight);
						                });
					    }
				    //}
                });
            },
        
            hide: function(){
            
                var mL = $('.sticklr-active').css('margin-left');
                var mR = $('.sticklr-active').css('margin-right');            
                $('.sticklr-active').animate({
                        'margin-left'   : parseInt(mL, 10) + 14,
                        'margin-right'  : parseInt(mR, 10) + 14,
                        'opacity'       : 0
                    }, 200, function(){
                        $(this)
                            .removeClass('sticklr-active')
                            .hide();
                });            
                $('span.sticklr-arrow').remove();
            }
        };

        var helpers = {
        
            calcTop : function(absl, pos, gap, panelHeight){
                var winTop      = $(window).scrollTop(),
                    winHeight   = $(window).height(),
                    diff        = winHeight - panelHeight;
                    
                if(/top|high/i.test(pos))
                {
                    return gap + (absl ? winTop : 0);                
                } 
                else if(/bottom|low|ground/i.test(pos))
                {
                    return (absl ? (winTop + diff) : diff) - gap;
                } 
                else 
                {
                    return absl ? (winTop + (diff / 2)) : (diff / 2);
                }
            },
            
            fixPos: function(){
                $('.sticklr').each(function(){
                    var pos         = $(this).data('props').relativeTo,
                        gap         = $(this).data('props').relativeGap,
                        panelHeight = $(this).height();
                    if($(this).css('position') === 'absolute'){
                        $(this).stop().animate({
                            'top'   : helpers.calcTop(true, pos, gap, panelHeight)
                        }, 1000);
                    } else {
                        $(this).css({
                            'top'   : helpers.calcTop(false, pos, gap, panelHeight)
                        });
                    }
                });
            }
        };
        
        $(window).bind('resize', helpers.fixPos);
        $(window).bind('scroll', helpers.fixPos);
        $(document).bind('click', function(e){
            if(!$(e.target).parents().hasClass('sticklr'))
            {
                methods.hide();
            }
        });
        
        if (methods[method] && method.toLowerCase() != 'init'){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method){
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' +  method + '" does not exist in Sticklr');
        }     
    }
})(jQuery);
