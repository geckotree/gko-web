/* global requestAnimationFrame */
define( function() {
	'use strict';

	function Header( el ) {
		this._$header = el;

		this._latestKnownScrollY = 0;
		this._ticking = false;

		this._attachEventHandlers();
	}

	Header.prototype = {
		_onScroll: function() {
			var latestKnownScrollY = 0;
			var ticking = false;

				latestKnownScrollY = window.scrollY;
				requestTick();

			function requestTick() {
				if( !ticking ) {
					requestAnimationFrame( update );
				}

				ticking = true;
			}

			function update() {
				ticking = false;

				var currentScrollY = latestKnownScrollY;

				console.log( currentScrollY );
			}
		},

		// _requestTick: function() {
		// 	if( !this._ticking ) {
		// 		requestAnimationFrame( this._update );
		// 	}

		// 	this._ticking = true;
		// },

		// _update: function() {
		// 	this._ticking = false;

		// 	var currentScrollY = this._latestKnownScrollY;

		// 	console.log( currentScrollY );
  //       },

		_attachEventHandlers: function() {
			window.addEventListener('scroll', this._onScroll, false);
		}
	};

	return Header;
});
