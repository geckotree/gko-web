define( function() {
	'use strict';

	function Toggle( el ) {
		this._$toggle = el;
		this._$html = document.querySelector( 'html' );
		this._targetClass = this._$toggle.getAttribute( 'data-toggle' );
		this._$target = document.querySelector( '.' + this._targetClass );

		this._attachEventHandlers();
	}

	Toggle.prototype = {
		_attachEventHandlers: function() {
			var _this = this;

			this._$toggle.addEventListener( 'click', function() {
				if( _this._$html.classList.contains( _this._targetClass + '--open' ) ) {
					_this._$html.classList.remove( _this._targetClass + '--open' );
					_this._$html.classList.add( _this._targetClass + '--closed' );
					_this._$target.getAttributeNode( 'aria-hidden' ).value = 'true';
				} else {
					_this._$html.classList.remove( _this._targetClass + '--closed' );
					_this._$html.classList.add( _this._targetClass + '--open' );
					_this._$target.getAttributeNode( 'aria-hidden' ).value = 'false';
				}
			});
		}
	};

	return Toggle;
});
