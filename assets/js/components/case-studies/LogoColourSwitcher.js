( function() {
	'use strict';

	function LogoColourSwitcher( el ) {
		this._$caseStudyLogo = el;
		this._$activeButton = null;
		this._activeColour = 'ter';

		this._colours = [
			'ter',
			'sec',
			'pri'
		];

		this._classes = {
			switcher: 'c-case-study__logo__switcher',
			item: 'c-case-study__logo__item',
			button: 'c-case-study__logo__button',
			active: 'is-active'
		};

		this._init();
	}

	LogoColourSwitcher.prototype = {
		_init: function() {
			this._createLogoColourSwitcher();
			this._attachEventHandlers();
		},

		_createLogoColourSwitcher: function() {
			var _this = this;
			var $colourSwitcher = '<ul class="' + this._classes.switcher + '">';
			this._colours.forEach( function( colour, i ) {
				$colourSwitcher += '<li class="' + _this._classes.item + '">';
				if( i === 0 ) {
					$colourSwitcher += '<button class="' + _this._classes.button + ' ' + _this._classes.button + '--' + colour + ' ' + _this._classes.active + '" data-colour="' + colour + '" data-fastclick></button>';
				} else {
					$colourSwitcher += '<button class="' + _this._classes.button + ' ' + _this._classes.button + '--' + colour + '" data-colour="' + colour + '" data-fastclick></button>';
				}
				$colourSwitcher += '</li>';
			} );
			$colourSwitcher += '</ul>';

			this._$caseStudyLogo.insertAdjacentHTML( 'beforeend', $colourSwitcher );
		},

		_attachEventHandlers: function() {
			var _this = this;
			var $logoColourSwitcherButtons = this._$caseStudyLogo.querySelectorAll( '.' + this._classes.button );
			this._$activeButton = this._$caseStudyLogo.querySelector( '.' + this._classes.button + '.' + this._classes.active );

			Array.prototype.forEach.call( $logoColourSwitcherButtons, function( $logoColourSwitcherButton ) {
				$logoColourSwitcherButton.addEventListener( 'click', function() {
					var $button = this;
					var colour = $button.getAttribute( 'data-colour' );

					_this._updateColourSwitcher( $button );
					_this._updateLogo( colour );
				} );
			} );
		},

		_updateColourSwitcher: function( $button ) {
			this._$activeButton.classList.remove( this._classes.active );
			$button.classList.add( this._classes.active );
			this._$activeButton = $button;
		},

		_updateLogo: function( colour ) {
			this._$caseStudyLogo.classList.remove( 'c-case-study__logo--' + this._activeColour );
			this._$caseStudyLogo.classList.add( 'c-case-study__logo--' + colour );
			this._activeColour = colour;
		}
	};

	window.LogoColourSwitcher = LogoColourSwitcher;
} )();
