( function() {
	'use strict';

	var ScrollMonitor = window.scrollMonitor;

	function InPageNav( el ) {
		this._classes = {
			fixed: 'is-fixed',
			bottom: 'is-bottom',
			active: 'is-active'
		};

		this._$el = el;
		this._$pageNavLinks = this._$el.querySelectorAll( '.js-page-nav-link' );
		this._$hero = this._$el.querySelector( '.js-hero' );
		this._$content = this._$el.querySelector( '.js-content' );
		this._$pageNav = this._$el.querySelector( '.js-page-nav' );
		this._$footer = document.querySelector( '.js-footer' );
		this._$sections = this._$el.querySelectorAll( '[data-section]' );

		this._easing = {
			easeInOutQuad: function( t ) {
				return t < .5 ? 2 * t * t : -1 + ( 4 - 2 * t ) * t; // jshint ignore:line
			}
		};

		this._init();
	}

	InPageNav.prototype = {
		_init: function() {
			var _this = this;

			this._attachEventHandlers();
			this._createFakeFooter();
			this._stickySideNav();
			this._setActiveSectionsOnScroll();

			//@todo toggle button on mobile
		},

		_attachEventHandlers: function() {
			var _this = this;

			Array.prototype.forEach.call( this._$pageNavLinks, function( $pageNavLink ) {
				$pageNavLink.addEventListener( 'click', function( e ) {
					var target = this.getAttribute( 'data-scroll-to' );
					var $target = _this._$el.querySelector( '[data-section="' + target + '"]' );
					var targetOffset = _this._elOffset( $target );

					e.preventDefault();
					_this._scrollTo( targetOffset.top, 300, _this._easing.easeInOutQuad );
				} );
			} );

			//@todo check if this works with orientation change
			window.addEventListener( 'resize', function() {
				_this._stickySideNav();
			} );
		},

		_elOffset: function( elt ) {
			var rect = elt.getBoundingClientRect();
			var bodyElt = document.body;

			return {
				top: rect.top + bodyElt.scrollTop + 1,
				left: rect.left + bodyElt.scrollLeft
			};
		},

		_stickySideNav: function() {
			var _this = this;
			var margin = ( ScrollMonitor.viewportHeight - this._$pageNav.offsetHeight ) / 2;

			if( window.matchMedia( '( min-width: 1000px )' ).matches ) {
				//@todo check if nav is bigger than viewport
				_this._$pageNav.setAttribute( 'style', 'margin-bottom:' + margin + 'px;' + 'margin-top:' + margin + 'px;' );
				_this._setHeroWatcher();
				_this._setFooterWatcher( margin );
			} else {
				_this._$pageNav.setAttribute( 'style', 'margin-bottom: 0px;' + 'margin-top: 0px;' );
			}
		},

		_setActiveSectionsOnScroll: function() {
			var _this = this;

			for( var i = 0; i < this._$sections.length; i++ ) {
				var $section = _this._$sections[ i ];
				var target = $section.getAttribute( 'data-section' );
				var $pageNavLink = _this._$el.querySelector( '[data-scroll-to="' + target + '"]' );
				var watcher = ScrollMonitor.create( $section );

				_this._setSectionScrollWatcher( watcher, $pageNavLink );
			}
		},

		_scrollTo: function( Y, duration, easingFunction, callback ) {
			var start = Date.now();
			var elem = document.documentElement.scrollTop ? document.documentElement : document.body;
			var from = elem.scrollTop;

			if( from === Y ) {
				callback();
				return;
			}

			function min( a, b ) {
				return a < b ? a : b;
			}

			function scroll( timestamp ) {
				var currentTime = Date.now();
				var time = min( 1, ( ( currentTime - start ) / duration ) );
				var easedT = easingFunction( time );

				elem.scrollTop = ( easedT * ( Y - from ) ) + from;

				if( time < 1 ) requestAnimationFrame( scroll );
				else
				if( callback ) callback();
			}

			requestAnimationFrame( scroll );
		},

		_createFakeFooter: function() {
			var $fakeFooter = document.createElement( 'div' );

			$fakeFooter.style.bottom = '-' + ( this._$footer.offsetHeight + 80 ) + 'px';
			$fakeFooter.style.height = this._$footer.offsetHeight + 'px';
			$fakeFooter.style.position = 'absolute';
			$fakeFooter.style.width = '100%';
			$fakeFooter.style.zIndex = '-10';
			$fakeFooter.setAttribute( 'class', 'js-fake-footer' );
			$fakeFooter.setAttribute( 'role', 'presentation' );

			this._$content.appendChild( $fakeFooter );
			this._$fakeFooter = this._$el.querySelector( '.js-fake-footer' );
		},

		_setHeroWatcher: function() {
			var _this = this;
			var heroWatcher = ScrollMonitor.create( this._$hero );

			heroWatcher.lock();

			heroWatcher.visibilityChange( function() {
				_this._$pageNav.classList.toggle( _this._classes.fixed, !heroWatcher.isInViewport );
			} );
		},

		_setFooterWatcher: function( margin ) {
			var _this = this;
			var footerWatcher = ScrollMonitor.create( this._$fakeFooter, {
				top: this._$pageNav.offsetHeight + margin + margin
			} );

			footerWatcher.fullyEnterViewport( function() {
				if( footerWatcher.isAboveViewport ) {
					_this._$pageNav.classList.remove( _this._classes.fixed );
					_this._$pageNav.classList.add( _this._classes.bottom );
				}
			} );

			footerWatcher.partiallyExitViewport( function() {
				if( !footerWatcher.isAboveViewport ) {
					_this._$pageNav.classList.add( _this._classes.fixed );
					_this._$pageNav.classList.remove( _this._classes.bottom );
				}
			} );

			if( footerWatcher.isAboveViewport ) {
				this._$pageNav.classList.remove( _this._classes.fixed );
				this._$pageNav.classList.add( _this._classes.bottom );
			}
		},

		_setSectionScrollWatcher: function( watcher, $pageNavLink ) {
			var _this = this;

			watcher.lock();

			watcher.stateChange( function() {
				$pageNavLink.classList.toggle( _this._classes.active, this.isAboveViewport );
			} );

			watcher.visibilityChange( function() {
				if( watcher.top && watcher.isAboveViewport ) {
					$pageNavLink.classList.add( _this._classes.active );
				}
			} );
		}
	};

	window.InPageNav = InPageNav;
} )();
