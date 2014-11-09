

var pageTracker = _gat._getTracker("UA-1120546-1");
pageTracker._initData();
pageTracker._trackPageview();

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
	
	$("#conf").click(function(){
		return false;
	});
	
	if ( $.browser.msie ){
		$("a[rel]").removeAttr("rel");
	}
	
	$(".nav")
	.superfish({
		animation : { opacity:"show",height:"show"}
	});
	
	// copyright
	$('#copy').append(copyright).attr('align','center');
});