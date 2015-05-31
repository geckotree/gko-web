if( 'visibilityState' in document ) {

	var $html = document.querySelector( 'html' );
	$html.classList.remove( 'no-mustard' );
	$html.classList.add( 'mustard' );

	var VisitedLink = require( './components/VisitedLink' );
	var Toggle = require( './components/Toggle' );

	var $visitedLink = document.querySelectorAll( '.js-visited-link' );
	var $toggle = document.querySelectorAll( '[data-toggle]' );

	if( $toggle.length ) {
		Array.prototype.forEach.call( $toggle, function( el ) {
			new Toggle( el );
		});
	}

	if( $visitedLink.length ) {
		Array.prototype.forEach.call( $visitedLink, function( el ) {
			new VisitedLink( el );
		});
	}

}
