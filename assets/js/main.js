( function() {
	'use strict';

	if( 'visibilityState' in document ) {
		var FastClick = window.FastClick;

		var i;
		var $node;
		var moduleName;
		var $html = document.querySelector( 'html' );
		var $nodes = document.querySelectorAll( '[data-module]' );
		var $fastclick = document.querySelectorAll( '[data-fastclick]' );

		$html.classList.remove( 'no-enhance' );
		$html.classList.add( 'enhance' );

		//@todo this isnt working
		for( i = 0; i < $fastclick.length; i++ ) {
			FastClick.attach( $fastclick[ i ] );
		}

		for( i = 0; i < $nodes.length; i++ ) {
			$node = $nodes[ i ];
			moduleName = $node.getAttribute( 'data-module' );
			new window[ moduleName ]( $node );
		}

		//@todo create as reusable module
		// var myElement = document.querySelector( '.c-case-study-card-row' );

		// var elementWatcher = ScrollMonitor.create( myElement, {
		// 	top: -150
		// } );

		// elementWatcher.enterViewport( function() {
		// 	myElement.classList.add( 'is-inview' );
		// } );
	}
} )();
