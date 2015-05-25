require.config({
	paths: {
		FastClick: '../components/fastclick/lib/fastclick'
	},
	modules: [
		{
			name: 'main',
			include: [
				'FastClick'
			]
		}
	]
});

define( function( require ) {
	'use strict';

	if( 'querySelector' in document &&
		'localStorage' in window &&
		'addEventListener' in window ) {

		var Toggle = require( 'plugins/toggle' );
		var Carousel = require( 'plugins/carousel' );

		var i;
		var $html = document.querySelector( 'html' );
		var $toggle = document.querySelectorAll( '[data-toggle]' );
		var $carousel = document.querySelectorAll( '.js-carousel' );

		$html.classList.remove( 'no-mustard' );
		$html.classList.add( 'mustard' );

		if( $toggle.length ) {
			for( i in $toggle ) {
				if( $toggle[ i ].nodeType == 1 ) {
					new Toggle( $toggle[ i ] );
				}
			}
		}

		if( $carousel.length ) {
			for( i in $carousel ) {
				if( $carousel[ i ].nodeType == 1 ) {
					new Carousel( $carousel[ i ] );
				}
			}
		}

	}
});
