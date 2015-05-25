define( [ 'require' ], function( require ) {
	/**
	 * setup global polyfills and base utility
	 *
	 * @exports Utils
	 */

	var Utils = function(){

		if(!Array.prototype.indexOf) {
			/**
			 * find the index of a value in an array
			 *
			 * @global
			 * @param {*} what - value to search for
			 * @param {int} i - index to start search from
			 * @return {int}
			 */
			Array.prototype.indexOf = function(what, i) {
				i = i || 0;
				var L = this.length;
				while (i < L) {
					if(this[i] === what) return i;
					++i;
				}
				return -1;
			};
		}

		/**
		 * remove item or items from array by their value, returning the original array {@linkcode http://stackoverflow.com/a/3955096}
		 *
		 * @global
		 * @summary remove item from array by value
		 * @param {...*} - values to remove
		 * @return {array}
		 */
		Array.prototype.remove = function() {
			var what, a = arguments, L = a.length, ax;
			while (L && this.length) {
				what = a[--L];
				while ((ax = this.indexOf(what)) !== -1) {
					this.splice(ax, 1);
				}
			}
			return this;
		};
	};

	Utils.prototype = {

		/** device pixel ratio shortcut */
		dpr: window.devicePixelRatio,

		/**
		 * requires a module based on boolean with optional callback
		 *
		 * @param {boolean} boolean - include or not
		 * @param {string} module - require js module
		 * @param {function} cb - callback when module has been included
		 */
		conditionallyLoadModule: function( boolean, module, cb ) {
			if( boolean ) {
				require( [ module ], function( moduleName ) {
					if( typeof cb === 'function' ) cb( moduleName );
				});
			}
		}
	};

	return Utils;
});
