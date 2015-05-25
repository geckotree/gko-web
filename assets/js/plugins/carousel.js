/**
 * TODO:
 * - Recalculate pixel widths on resize/orientation change
 * - Add touch functionality
 * - Extend to include prev & next button
 */

define( function() {
	'use strict';

	function Carousel( el ) {
		this._$carousel = el;
		this._$list = el.querySelector( '.js-carousel-list' );
		this._$item = el.querySelectorAll( '.js-carousel-item' );
		this._$activeSlide = null;
		this._$navButtons = null;
		this._$clickedButton = null;
		this._$activeButton = null;
		this._$slider = null;

		this._defaults = {
			activeIdx: 0,
			slideWidth: 0,
			sliderWidth: 0,
			navLength: 'carousel--' + this._$item.length,
			nav: 'carousel__navigation',
			list: 'carousel__nav-list',
			item: 'carousel__nav-item',
			button: 'carousel__button',
			active: 'is-active',
			slider: 'carousel__slider'
		};

		this._createNavigation();
	}

	Carousel.prototype = {
		_createNavigation: function() {
			var navMarkup = '<nav class="' + this._defaults.nav + ' ' + this._defaults.navLength + '">';
			navMarkup += '<ul class="' + this._defaults.list + '">';

			for( var i = 0; i < this._$item.length; i++ ) {
				navMarkup += '<li class="' + this._defaults.item + '">';

				if( i === this._defaults.activeIdx ) {
					this._$item[ this._defaults.activeIdx ].classList.add( this._defaults.active );
					navMarkup += '<button class="' + this._defaults.button + ' ' + this._defaults.active + '">';
				} else {
					navMarkup += '<button class="' + this._defaults.button + '">';
				}

				if( this._$item[ i ].getAttribute( 'data-label' ) ) {
					navMarkup += this._$item[ i ].getAttribute( 'data-label' );
				}

				navMarkup += '</button>';
				navMarkup += '</li>';
			}

			navMarkup += '</ul>';
			navMarkup += '<div class="' + this._defaults.slider + '"></div>';
			navMarkup += '</nav>';

			this._$carousel.insertAdjacentHTML( 'beforeend', navMarkup );
			this._setCarouselWidths();
			this._attachEventHandlers();
		},

		_setCarouselWidths: function() {
			this._$list.style.width = ( 100 * this._$item.length ) + '%';

			for( var i = 0; i < this._$item.length; i++ ) {
				this._$item[ i ].style.width = ( 100 / this._$item.length ) + '%';
			}

			this._defaults.slideWidth = this._$carousel.querySelector( '.js-carousel-item' ).offsetWidth;
			this._defaults.sliderWidth = this._$carousel.querySelector( '.' + this._defaults.slider ).offsetWidth;
		},

		_attachEventHandlers: function() {
			var _this = this;
			this._$navButtons = this._$carousel.querySelectorAll( '.' + this._defaults.button );

			for( var i = 0; i < this._$navButtons.length; i++ ) {
				this._$navButtons[ i ].addEventListener( 'click', _this._update( i ) );
			}
		},

		_update: function( i ) {
			var _this = this;

			return function() {
				_this._defaults.activeIdx = i;
				_this._$clickedButton = this;
				_this._updateSlides();
				_this._updateNav();
			};
		},

		_updateSlides: function() {
			this._$activeSlide = this._$carousel.querySelector( '.js-carousel-item.' + this._defaults.active );

			this._$activeSlide.classList.remove( this._defaults.active );
			this._$item[ this._defaults.activeIdx ].classList.add( this._defaults.active );
			this._$activeSlide = this._$item[ this._defaults.activeIdx ];
			this._$list.style.transform = 'translate3d( -' + this._defaults.slideWidth * this._defaults.activeIdx + 'px, 0, 0 )';
		},

		_updateNav: function() {
			this._$activeButton = this._$carousel.querySelector( '.' + this._defaults.button + '.' + this._defaults.active );
			this._$slider = this._$carousel.querySelector( '.' + this._defaults.slider );

			this._$activeButton.classList.remove( this._defaults.active );
			this._$clickedButton.classList.add( this._defaults.active );
			this._$slider.style.transform = 'translate3d( ' + this._defaults.sliderWidth * this._defaults.activeIdx + 'px, 0, 0 )';
		}
	};

	return Carousel;
});
