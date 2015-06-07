define( function() {
	'use strict';

	function VisitedLink( el ) {
		this._$link = el;

		this._setLocalStorage();
		this._setVisitedLink();
	}

	VisitedLink.prototype = {
		_setLocalStorage: function() {
			localStorage.setItem( 'visited-' + window.location.pathname, true );
		},

		_setVisitedLink: function() {
			var _this = this;

			if( this._$link.host == window.location.host && localStorage.getItem( 'visited-' + this._$link.pathname ) ) {
				_this._$link.classList.add( 'is-visited' );
			}
		}
	};

	return VisitedLink;
});
