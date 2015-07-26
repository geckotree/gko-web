( function() {
	'use strict';

	var ScrollMonitor = window.scrollMonitor;

	function InPageNav( el ) {
		this._$el = el;
		this._$hero = this._$el.querySelector( '.js-hero' );
		this._$pageNav = this._$el.querySelector( '.js-page-nav' );
		this._$footer = document.querySelector( '.js-footer' );
		this._$fakeFooter = this._$el.querySelector( '.js-fake-footer' );

		this._$pageNavLinks = this._$el.querySelectorAll( '.js-page-nav-link' );
		this._$sections = this._$el.querySelectorAll( '[data-section]');

		this._stickySideNav();
		// this._attachEventHandlers();
	}

	InPageNav.prototype = {
		_attachEventHandlers: function() {
			var i;
			var _this = this;

			Array.prototype.forEach.call( this._$pageNavLinks, function( pageNavLink ) {
				pageNavLink.addEventListener( 'click', function( e ) {
					var target = this.getAttribute( 'data-scroll-to' );
					var $target = _this._$el.querySelector( '[data-section="' + target + '"]' );

					e.preventDefault();

					_this._scrollToSection();
				});
			});

			for( i = 0; i < this._$sections.length; i++ ) {
				var $section = _this._$sections[ i ];
				var target = $section.getAttribute( 'data-section' );
				var $pageNavLink = _this._$el.querySelector( '[data-scroll-to="' + target + '"]' );
				var watcher = ScrollMonitor.create( $section );

				_this._sectionEnterView( watcher, $pageNavLink );
				_this._sectionExitView( watcher, $pageNavLink );
			}
		},

		_stickySideNav: function() {
			var _this = this;
			var viewportHeight = ScrollMonitor.viewportHeight;
			var pageNavHeight = this._$pageNav.offsetHeight;
			var margin = ( viewportHeight - pageNavHeight ) / 2;

			var heroWatcher = ScrollMonitor.create( this._$hero );
			var footerWatcher = ScrollMonitor.create( this._$fakeFooter, { top: this._$pageNav.offsetHeight + margin + margin } );

			this._$pageNav.setAttribute( 'style', 'margin-bottom:' + margin + 'px;' + 'margin-top:' + margin + 'px' );

			this._$fakeFooter.setAttribute( 'style',
				'height:' + this._$footer.offsetHeight + 'px;' +
				'bottom: -' + this._$footer.offsetHeight + 'px;' +
				'position: absolute; width: 100%;'
			);

			heroWatcher.lock();

			heroWatcher.visibilityChange( function() {
				_this._$pageNav.classList.toggle( 'is-fixed', !heroWatcher.isInViewport );
			});

			footerWatcher.fullyEnterViewport( function() {
				if( footerWatcher.isAboveViewport ) {
					_this._$pageNav.classList.remove( 'is-fixed' );
					_this._$pageNav.classList.add( 'is-bottom' );
				}
			});

			footerWatcher.partiallyExitViewport( function() {
				if( !footerWatcher.isAboveViewport ) {
					_this._$pageNav.classList.add( 'is-fixed' );
					_this._$pageNav.classList.remove( 'is-bottom' );
				}
			});

			if( footerWatcher.isAboveViewport ) {
				this._$pageNav.classList.remove( 'is-fixed' );
				this._$pageNav.classList.add( 'is-bottom' );
			}
		},

		_sectionEnterView: function( watcher, el ) {
			watcher.enterViewport( function() {
				el.classList.add( 'is-active' );
			});
		},

		_sectionExitView: function( watcher, el ) {
			watcher.exitViewport( function() {
				el.classList.remove( 'is-active' );
			});
		}
	};

	window.InPageNav = InPageNav;
})();
