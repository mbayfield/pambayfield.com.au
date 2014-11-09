

//var pageTracker = _gat._getTracker("UA-1120546-1");
//pageTracker._initData();
//pageTracker._trackPageview();

var d = new Date();
	
var years = d.getFullYear();
if ( d.getFullYear() != '2006' )
	years = '2006 - ' + d.getFullYear();

var siteDomain = document.domain;
	
var copyright = years + ' Bayfield Business Solutions';

$(document).ready(function(){
	$("ul:first-child>li>a")
	.prepend('<span class="navIcon">&gt;</span>');
	
	$("ul>li>a").mouseover(function () {
	$(this).css('text-decoration','underline');
		    $(this).mouseout(function () {
		   $(this).css('text-decoration','none');
	      });
	});
	
	$.Lightbox.construct({
		show_linkback:	false,
		show_extended_info: true,
		colorBlend:	false,
		ie6_support: true,
		ie6_upgrade: true,
		download_link: false,
		opacity: 0.7,
		text: {
		image:		'Photo',
		help: {
			close: 'Click to close',
			interact: 'Click on the photo to view the next in this series'
			}
		}
	});
	
	// get the page name
	var pageName = $('#pageName').html();
	// Main Navigation
	$('.nav li:first').css( "border-top", "0px"  );
	
	// Loop through all anchor links and insert or append stuff
	$('a').each(function() {
		var linkName = $(this).attr('href');
		var includePageTracker = false;
		var trackerType = '';
		var linkTracked = '';
		var hasHttp = -1;
		var hasMailto = -1;

		if ( linkName != undefined && linkName.length > 0 ) {
			hasHttp = linkName.indexOf('http://');
			hasMailto = linkName.indexOf('mailto:');
			hasPdf = linkName.indexOf('pdf');
			homeLink = linkName.indexOf(siteDomain);
		}

		// if the link is an outgoing domain
		if ( homeLink != -1 && ( hasHttp != -1 || hasMailto != -1 ) ) {
			// get the domain part after the protocol
			linkTracked = linkName.substring(7);

			// if the domain has an extension
			if ( linkTracked.indexOf('/') != -1 ) {
				// get the domain part with out the extension
				linkTracked = linkTracked.substring(0, linkTracked.indexOf('/') ); 
			}
			// the address has an querystring
			else if ( linkTracked.indexOf('?') != -1 ) {
				// get the address part with out the extension
				linkTracked = linkTracked.substring(0, linkTracked.indexOf('?') ); 
			}
			// add the onClick event to the link
			includePageTracker = true;

			// set the tracker type
			if ( hasHttp != -1 )
				trackerType = '/outgoing/';
			else if ( hasMailto != -1 )
				trackerType = '/mailto/';
		}

		if ( hasPdf != -1 )
		{
			trackerType = '/pdf/';
			linkTracked = linkName.substring(linkName.lastIndexOf('/') + 1, linkName.lastIndexOf('.'));
			includePageTracker = true;
		}

		// set the page tracker
		if ( includePageTracker ) {
			$(this).click(function() {
				pageTracker._trackPageview(trackerType + linkTracked.toLowerCase());
			}); 
			$(this).attr("target","_blank");
			
		}

		// lightbox-enable images
		if ( $(this).hasClass( 'lightbox-enabled' ) ) {
			linkTracked = linkName.substring(linkName.lastIndexOf('/') + 1, linkName.lastIndexOf('.'));
			trackItem = '/lightbox/' + pageName + '/' + $(this).attr('title') + '/' + linkTracked.toLowerCase();

			$(this).click(function() {
				pageTracker._trackPageview( trackItem );
				// remove this ie6 limitation once new version of lightbox is available
				if ( jQuery.browser.version != 6 ) {
					$(this).lightbox({ start:true, events:false });
				} else {
					window.open($(this).attr('href'), 'new_window');
				}
				return false;
			});
		}
	});
	
	$("#current-release").click(function(){
		return false;
	});
	
	$("#testimonials").click(function(){
		return false;
	});
	
	$(".nav")
	.superfish({
		animation : { opacity:"show",height:"show"}
	});
	
	// copyright
	$('#copy').append(copyright).attr('align','center');
});

/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
;(function($){$.fn.superfish=function(op){var sf=$.fn.superfish,c=sf.c,$arrow=$(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),over=function(){var $$=$(this),menu=getMenu($$);clearTimeout(menu.sfTimer);$$.showSuperfishUl().siblings().hideSuperfishUl()},out=function(){var $$=$(this),menu=getMenu($$),o=sf.op;clearTimeout(menu.sfTimer);menu.sfTimer=setTimeout(function(){o.retainPath=($.inArray($$[0],o.$path)>-1);$$.hideSuperfishUl();if(o.$path.length&&$$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path)}},o.delay)},getMenu=function($menu){var menu=$menu.parents(['ul.',c.menuClass,':first'].join(''))[0];sf.op=sf.o[menu.serial];return menu},addArrow=function($a){$a.addClass(c.anchorClass).append($arrow.clone())};return this.each(function(){var s=this.serial=sf.o.length;var o=$.extend({},sf.defaults,op);o.$path=$('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){$(this).addClass([o.hoverClass,c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass)});sf.o[s]=sf.op=o;$('li:has(ul)',this)[($.fn.hoverIntent&&!o.disableHI)?'hoverIntent':'hover'](over,out).each(function(){if(o.autoArrows)addArrow($('>a:first-child',this))}).not('.'+c.bcClass).hideSuperfishUl();var $a=$('a',this);$a.each(function(i){var $li=$a.eq(i).parents('li');$a.eq(i).focus(function(){over.call($li)}).blur(function(){out.call($li)})});o.onInit.call(this)}).each(function(){menuClasses=[c.menuClass];if(sf.op.dropShadows&&!($.browser.msie&&$.browser.version<7))menuClasses.push(c.shadowClass);$(this).addClass(menuClasses.join(' '))})};var sf=$.fn.superfish;sf.o=[];sf.op={};sf.IE7fix=function(){var o=sf.op;if($.browser.msie&&$.browser.version>6&&o.dropShadows&&o.animation.opacity!=undefined)this.toggleClass(sf.c.shadowClass+'-off')};sf.c={bcClass:'sf-breadcrumb',menuClass:'sf-js-enabled',anchorClass:'sf-with-ul',arrowClass:'sf-sub-indicator',shadowClass:'sf-shadow'};sf.defaults={hoverClass:'sfHover',pathClass:'overideThisToUse',pathLevels:1,delay:800,animation:{opacity:'show'},speed:'normal',autoArrows:true,dropShadows:true,disableHI:false,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){}};$.fn.extend({hideSuperfishUl:function(){var o=sf.op,not=(o.retainPath===true)?o.$path:'';o.retainPath=false;var $ul=$(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass).find('>ul').hide().css('visibility','hidden');o.onHide.call($ul);return this},showSuperfishUl:function(){var o=sf.op,sh=sf.c.shadowClass+'-off',$ul=this.addClass(o.hoverClass).find('>ul:hidden').css('visibility','visible');sf.IE7fix.call($ul);o.onBeforeShow.call($ul);$ul.animate(o.animation,o.speed,function(){sf.IE7fix.call($ul);o.onShow.call($ul)});return this}})})(jQuery);
