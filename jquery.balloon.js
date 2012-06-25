/*
 * @author:	Ciao Chiang
 * @version:	1.0.0
 * @create:	2012/6/23
 * @description:
 * 	Balloon
 */

(function($){
	var ui = {
		init:
		function(trigger, options)
		{
			if(options.side == 'down')
			{
				$offset		= side.down(trigger, options);
				$balloon 	= ui.down(options);
			}
			else if(options.side == 'up')
			{
				$offset 	= side.up(trigger, options);
				options.css.padding = '0 0 20px 0';
				$balloon	= ui.up(options);
			}
			else if(options.side == 'left')
			{
				$offset		= side.left(trigger, options);
				options.css.padding = '0 20px 0 0';
				$balloon	= ui.left(options);
			}
			else if(options.side == 'right')
			{	
				$offset		= side.right(trigger, options);
				options.css.padding = '0 0  0 20px';
				$balloon	= ui.right(options);
			}
			else if(options.side == 'auto')
			{
				$offset		= side.down(trigger, options);
			}

			options.css.top		= $offset.top;
			options.css.left	= $offset.left;

			
			var render = 	$balloon
					.css(options.css)
					.hover(function(){
						$(this).show();
					},function(){
						$(this).hide();
					})
			return render;
		},
		
		up:
		function(options)
		{
			var render =	$('<div></div>')
					.attr({
						id:	options.id
					})
					.append(ui.content(options))
					.append(arrow.down(options));
			return render;
		},

		down:
		function(options)
		{
			var render =	$('<div></div>')
					.attr({
						id:	options.id
					})
					.append(arrow.up(options))
					.append(ui.content(options));
			return render;
		},

		left:
		function(options)
		{
			var render =	$('<div></div>')
					.attr({
						id:	options.id
					})
					.append(arrow.right(options))
					.append(ui.content(options));
			return render;
		},

		right:
		function(options)
		{
			var render =	$('<div></div>')
					.attr({
						id:	options.id
					})
					.append(arrow.left(options))
					.append(ui.content(options));
			return render;
		},
		
		content:
		function(options)
		{
			var render =	$('<div></div>')
					.html(options.message)
					.css({
						'background-color':	options.color,
						'display':		'block',
						'height':		'100%',
						'border-width':		'1px',
						'border-style':		'solid',
						'border-color':		options.border,
						'box-shadow':		'0px 3px 8px rgba(0,0,0,0.3)'
					});

			if(options.ajax == true)
			{
				$.ajax({
					dataType:	options.ajaxDataType,
					url:		options.url,
					method:		options.ajaxMethod,
					data:		options.ajaxParams,
					cache:		options.ajaxCache,
					success:	function(html)
					{
						render.html(html);	
					}
				})
			}

			return render;
		}
	};

	var arrow = {
		up:
		function(options)
		{
			var render = 	$('<span></span>')
					.css({
						'width':	'20px',
						'height':	'20px',
						'display':	'block',
						'position':	'relative',
						'top':		'1px',
						'left':		'50%',
						'margin-left':	'-10px',
						'background-image':	"url('../image/white-arrow.png')",
						'background-position':	"bottom"
					})
			return render;
		},

		down:
		function(options)
		{
			var render =	$('<span></span>')
					.css({
						'width':	'20px',
						'height':	'20px',
						'display':	'block',
						'position':	'relative',
						'top':		'-1px',
						'left':		'50%',
						'margin-left':	'-10px',
						'background-image':	"url('../image/white-arrow-down.png')",
						'background-position':	"bottom"
					});
			return render;
		},

		left:
		function(options)
		{
			var render =	$('<span></span>')
					.css({
						'width':	'20px',
						'height':	'20px',
						'display':	'block',
						'position':	'absolute',
						'left':		'1px',
						'top':		'48%',
						'background-image':	"url('../image/white-arrow-left.png')",
						'background-position':	"bottom"
					});
			return render;
		},

		right:
		function(options)
		{
			var render =	$('<span></span>')
					.css({
						'width':	'20px',
						'height':	'20px',
						'display':	'block',
						'position':	'absolute',
						'right':	'1px',
						'top':		'48%',
						'background-image':	"url('../image/white-arrow-right.png')",
						'background-position':	"bottom"
					});
			return render;
		}
	};

	var side = {
		up:
		function(trigger, options)
		{
			$offset	= trigger.offset();
			var position = {
				top:	$offset.top - trigger.height() - options.height,
				left:	$offset.left - (options.width / 2) + (trigger.width() / 2)
			};
			return position;
		},

		down:
		function(trigger, options)
		{
			$offset = trigger.offset();
			var position = {
				top:	$offset.top + trigger.height(),
				left:	$offset.left - (options.width / 2) + (trigger.width() / 2)
			};
			return position;
		},

		left:
		function(trigger, options)
		{
			$offset = trigger.offset();
			var position = {
				top: 	$offset.top - (options.height / 2) + (trigger.height() / 2),
				left:	$offset.left - options.width - 20
			};
			return position;
		},

		right:
		function(trigger, options)
		{
			$offset = trigger.offset();
			var position = {
				top:	$offset.top - (options.height / 2) + (trigger.height() / 2),
				left:	$offset.left + 40
			}
			return position;
		}
	};	

	$.fn.balloon = function(options)
	{
		return this.each(function(){
			var $this = $(this);
		
			var settings = $.extend({
				id:		'balloon_' + $this.attr('id'),
				ajax:		false,
				url:		null,
				ajaxDataType:	'html',
				ajaxMethod:	'post',
				ajaxParams:	null,
				ajaxCache:	true,
				side:		'down',
				arrowPosition:	'0 auto 0 auto',
				message:	($this.attr('title'))?$this.attr('title'):'Loading...',
				loading:	'',
				color:		'rgb(255,255,255)',
				width:		'200',
				height:		'200',
				border:		'rgb(100,100,100)'
			},options);

			var css	= {
				'position':		'absolute',
				'width':		settings.width + 'px',
				'height':		settings.height + 'px',
				'display':		'block',
				'z-index':		999
			};
			settings.css	= css;

			$this.hover(function(){
				if($('#' + settings.id).length == 0)
					$('body').append(ui.init($this, settings));
				else
					$('#' + settings.id).show();
			},function(){
				$('#' + settings.id).hide();
			})
		});
	};
})(jQuery)
