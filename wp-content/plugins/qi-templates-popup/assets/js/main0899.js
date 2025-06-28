(function ( $ ) {
	'use strict';

	$( window ).on(
		'load',
		function () {
			qodefQiPopup();
		}
	);

	function qodefQiPopup() {
		var popupOpener = $( '.qi-templates-popup-holder' ),
			popupClose  = $( '.qi-templates-popup-close' );

		if ( popupOpener.length ) {
			var disabledQiPopup = 'no',
				disabledQiPopupTime,
				currentTime,
				timeTrigger,
				body = $( 'body' );

			// disable popup while user is logged
			if ( body.hasClass( 'logged-in' ) ) {
				disabledQiPopup = 'yes';
			} else {
				disabledQiPopupTime = localStorage.getItem( 'disabledQiPopupTime' );

				currentTime = Math.floor( Date.now() / 1000 );
				// allow popup to be disabled for 24h
				timeTrigger = currentTime < (parseInt( disabledQiPopupTime ) + 86400);

				if ( timeTrigger ) {
					disabledQiPopup = 'yes';
				}

				sessionStorage.removeItem( 'disabledQiPopup' );
			}

			popupClose.on(
				'click',
				function ( e ) {
					e.preventDefault();
					qodefPopupDisable();
					body.removeClass( 'qi-templates-popup-opened' );
				}
			);

			// show subscribe holder after scroll
			if ( disabledQiPopup !== 'yes' ) {
				body.addClass( 'qi-templates-popup-opened' );
			}
		}
	}

	function qodefPopupDisable() {
		localStorage.setItem(
			'disabledQiPopup',
			'yes'
		);

		var currentTime = '' + Math.floor( Date.now() / 1000 );
		localStorage.setItem(
			'disabledQiPopupTime',
			currentTime
		);
	}

})( jQuery );
