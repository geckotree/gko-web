( function() {
	'use strict';

	var ScrollMonitor = window.scrollMonitor;

	function Header( el ) {
		this._classes = {
			fixed: 'is-fixed'
		};

		this._$el = el;

		this._init();
	}

	Header.prototype = {
		_init: function() {
			this._stickyHeader();
		},

		_stickyHeader: function() {

		}
	};

	window.Header = Header;
} )();
