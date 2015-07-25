( function() {
	'use strict';

	if( 'visibilityState' in document ) {
		var FastClick = window.FastClick;
		var Toggle = window.Toggle;

		var i;
		var $node;
		var moduleName;
		var $html = document.querySelector( 'html' );
		var $nodes = document.querySelectorAll( '[data-module]' );
		var $fastclick = document.querySelectorAll( '[data-fastclick]' );

		$html.classList.remove( 'no-enhance' );
		$html.classList.add( 'enhance' );

		for( i = 0; i < $fastclick.length; i++ ) {
			FastClick.attach( $fastclick[ i ] );
		}

		for( i = 0; i < $nodes.length; i++ ) {
			$node = $nodes[ i ];
			moduleName = $node.getAttribute( 'data-module' );
			new window[moduleName]( $node );
		}
	}
})();
