define( function() {
	'use strict';

	// TODO set aria hidden attribute with js on page load

	function Toggle( el ) {
		this._classes = {
			activeClass: 'is-active',
			inactiveClass: 'is-inactive',
			targetActiveClass: 'is-visible',
			targetInactiveClass: 'is-hidden'
		};

		this._$toggle = el;
		this._targetClass = this._$toggle.getAttribute( 'data-toggle' );
		this._$target = document.querySelector( '.' + this._targetClass );

		// this._setAriaAttribute();
		this._attachEventHandlers();
	}

	Toggle.prototype = {
		_attachEventHandlers: function() {
			var _this = this;

			this._$toggle.addEventListener( 'click', function() {
				if( _this._$toggle.classList.contains( _this._classes.activeClass ) ) {
					_this._$toggle.classList.remove( _this._classes.activeClass );
					_this._$toggle.classList.add( _this._classes.inactiveClass );

					_this._$target.classList.remove( _this._classes.targetActiveClass );
					_this._$target.classList.add( _this._classes.targetInactiveClass );
					_this._$target.getAttributeNode( 'aria-hidden' ).value = 'true';
				} else {
					_this._$toggle.classList.remove( _this._classes.inactiveClass );
					_this._$toggle.classList.add( _this._classes.activeClass );

					_this._$target.classList.remove( _this._classes.targetInactiveClass );
					_this._$target.classList.add( _this._classes.targetActiveClass );
					_this._$target.getAttributeNode( 'aria-hidden' ).value = 'false';
				}
			});
		},

		_setAriaAttribute: function() {
			if( this._$target.classList.contains( this._classes.targetActiveClass ) ) {
				this._$target.setAttributeNode( 'aria-hidden' ).value = 'false';
			} else {
				this._$target.setAttributeNode( 'aria-hidden' ).value = 'true';
			}
		}
	};

	return Toggle;
});
