define( function() {
	'use strict';

	function VisitedLink( el ) {
		this._link = el;

		this._setLocalStorage();
		this._setVisitedLink();
	}

	VisitedLink.prototype = {
		_setLocalStorage: function() {
			localStorage.setItem( 'visited-' + window.location.pathname, true );
		},

		_setVisitedLink: function() {
			var _this = this;

			if( this._link.host == window.location.host && localStorage.getItem( 'visited-' + this._link.pathname ) ) {
				_this._link.classList.add( 'is-visited' );
			}
		}
	};

	return VisitedLink;
});
