( function() {
	'use strict';

	function AdSpy( el ) {
		this._$el = el;
		this._$caseStudyLogo = this._$el.querySelector( '.js-case-study-logo' );

		// this._init();
	}

	AdSpy.prototype = {
		_init: function() {
			this._createLogoColourSwitcher();
		},

		_createLogoColourSwitcher: function() {
			var $colourSwitcher;

			$colourSwitcher += '<ul class="c-case-study__logo__switcher">';
			$colourSwitcher += '<li class="c-case-study__logo__item">';
			$colourSwitcher += '<button class="c-case-study__logo__button c-case-study__logo__button--ter js-logo-button is-active" data-colour="ter"></button>';
			$colourSwitcher += '</li>';
			$colourSwitcher += '<li class="c-case-study__logo__item">';
			$colourSwitcher += '<button class="c-case-study__logo__button c-case-study__logo__button--sec js-logo-button" data-colour="sec"></button>';
			$colourSwitcher += '</li>';
			$colourSwitcher += '<li class="c-case-study__logo__item">';
			$colourSwitcher += '<button class="c-case-study__logo__button c-case-study__logo__button--pri js-logo-button" data-colour="pri"></button>';
			$colourSwitcher += '</li>';
			$colourSwitcher += '</ul>';

			this._$caseStudyLogo.appendChild( $colourSwitcher );
			// this._$fakeFooter = this._$el.querySelector( '.js-fake-footer' );
		}
	};

	window.AdSpy = AdSpy;
} )();
