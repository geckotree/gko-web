// @todo lazy load images
// @todo calculate slider slide distance after resize
// @todo add touch functionality
// @todo add click next item preview functionality

( function() {
	'use strict';

	function Carousel( el ) {
		this._$carousel = el;
		this._$list = el.querySelector( '.js-carousel-list' );
		this._$item = el.querySelectorAll( '.js-carousel-item' );
		this._$activeSlide = null;
		this._$clickedButton = null;
		this._$activeButton = null;
		this._$slider = null;

		this._defaults = {
			activeIdx: 0,
			slideWidth: 0,
			sliderWidth: 0,
			nav: 'o-carousel__nav',
			list: 'o-carousel__nav__list',
			item: 'o-carousel__nav__item',
			label: 'o-carousel__nav__label',
			button: 'o-carousel__nav__button',
			slider: 'o-carousel__nav__slider',
			active: 'is-active'
		};

		this._init();
	}

	Carousel.prototype = {
		_init: function() {
			this._createNavigation();
			this._attachEventHandlers();

			// @resize trigger setCarouselWidths method
		},

		_createNavigation: function() {
			var navMarkup = '<nav class="' + this._defaults.nav + '">';
			navMarkup += '<ul class="' + this._defaults.list + '">';

			for( var i = 0; i < this._$item.length; i++ ) {
				navMarkup += '<li class="' + this._defaults.item + '" style="width:' + 100 / this._$item.length + '%;">';

				if( i === this._defaults.activeIdx ) {
					this._$item[ this._defaults.activeIdx ].classList.add( this._defaults.active );
					navMarkup += '<button class="' + this._defaults.button + ' ' + this._defaults.active + '">';
				} else {
					navMarkup += '<button class="' + this._defaults.button + '">';
				}

				if( this._$item[ i ].getAttribute( 'data-label' ) ) {
					navMarkup += '<span class="' + this._defaults.label + '">';
					navMarkup += this._$item[ i ].getAttribute( 'data-label' );
					navMarkup += '</span>';
				}

				navMarkup += '</button>';
				navMarkup += '</li>';
			}

			navMarkup += '</ul>';
			navMarkup += '<div class="' + this._defaults.slider + '" style="width:' + 100 / this._$item.length + '%;"></div>';
			navMarkup += '</nav>';

			this._$carousel.insertAdjacentHTML( 'beforeend', navMarkup );
			this._setCarouselWidths();
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
			var $navButtons = this._$carousel.querySelectorAll( '.' + this._defaults.button );

			Array.prototype.forEach.call( $navButtons, function( $navButton, i ) {
				$navButton.addEventListener( 'click', function() {
					_this._defaults.activeIdx = i;
					_this._$clickedButton = this;
					_this._updateSlides();
					_this._updateNav();
				} );
			} );
		},

		_updateSlides: function() {
			this._$activeSlide = this._$carousel.querySelector( '.js-carousel-item.' + this._defaults.active );

			this._$activeSlide.classList.remove( this._defaults.active );
			this._$item[ this._defaults.activeIdx ].classList.add( this._defaults.active );
			this._$activeSlide = this._$item[ this._defaults.activeIdx ];
			this._$list.style.transform = 'translateX( -' + this._defaults.slideWidth * this._defaults.activeIdx + 'px )';
		},

		_updateNav: function() {
			this._$activeButton = this._$carousel.querySelector( '.' + this._defaults.button + '.' + this._defaults.active );
			this._$slider = this._$carousel.querySelector( '.' + this._defaults.slider );

			this._$activeButton.classList.remove( this._defaults.active );
			this._$clickedButton.classList.add( this._defaults.active );
			this._$slider.style.transform = 'translateX( ' + this._defaults.sliderWidth * this._defaults.activeIdx + 'px )';
		}
	};

	window.Carousel = Carousel;
} )();
