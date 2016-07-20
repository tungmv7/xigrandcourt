;(function($){

	"use strict";

	var Core = {

		DOMReady: function(){

			var self = this;

			self.searchBox();
			self.videoPlay();
			self.backToTopBtn({
			    transitionIn: 'bounceInRight',
			    transitionOut: 'bounceOutRight'
			});

			self.navigation.init();

			if($('.gmap').length){

				self.googleMaps();

			}

			self.anchor();

		},

		windowLoad: function(){

			var self = this;

			self.fullScreen.init();



		},


		/**
		**	Full screen
		**/

		fullScreen:{

			init: function(){

				var self = this;

				self.w = $(window);
				self.slide = $('.slides>li');
				self.header = $('#header');

				self.calculation();

				self.w.on('resize', function(){

					self.calculation();

				});

			},

			calculation: function(){

				var self = this;
				self.wHeight = self.w.height();
				self.imgBox = $('.slide_img_box').height();

				// $('.first_screen').height(self.wHeight);

				self.slide.css({
					'padding-bottom': self.imgBox
				});
			},

		},


		/**
		**	Video Play button
		**/

		videoPlay: function(){

			var self = this;

			$('.video_btn').on('click',function(){

				var $this = $(this),
					videoBox = $this.closest('.video_box'),
					video = $("#my-video")[0];

				if(!videoBox.hasClass('pause')){

					videoBox.addClass('pause');
					video.play();

				}
				else{

					videoBox.removeClass('pause');
					video.pause();

				}

			});

		},


		/**
		**	Search Box
		**/

		searchBox : function(){

		    $('.search_btn').on('click',function(){

		    	var $this = $(this);

		    	$this.parents('.search_box').toggleClass('active');
		    	$this.parents('.search_box').find('input[type="search"]').focus();

		    });

		    $(document).on('click',function(event){

		    	if(!$(event.target).closest('.search_box').length){
					$('.search_box').removeClass('active');
		    	}

		    });

		},

		/**
		**	Back to top
		**/

		backToTopBtn: function(config){

			config = $.extend({
				offset: 350,
				transitionIn: 'bounceInRight',
				transitionOut: 'bounceOutRight'
			}, config);

			var btn = $('<button></button>', {
				class: 'back_to_top animated hide',
				html: '<i class="fa fa-angle-up"></i>'
			}).appendTo($('body')),

			$wd = $(window),
			$html = $('html'),
			$body = $('body');

			$wd.on('scroll.back_to_top', function(){

				if($wd.scrollTop() > config.offset){

					btn.removeClass('hide '+config.transitionOut).addClass(config.transitionIn);

				}
				else{

					btn.removeClass(config.transitionIn).addClass(config.transitionOut);

				}

			});

			btn.on('click', function(){

				$html.add($body).animate({

					scrollTop: 0

				});

			});

	   	},


		/**
		**	Main navigation
		**/

		navigation: {

		    init: function () {

		    	var self = this;

		    	self.w = $(window);
		    	self.body = $('body');
		    	self.nav = $('.navigation');
		    	self.section = $('.section');
		    	self.sectionQt = self.section.length;

		    	self.anchorScroll();
		    	self.responsiveMenu.events();

		    	self.w.on('scroll',function(){

		    		self.pageScroll();

		    	});

		    	self.w.on('resize', function(){

		    		self.responsiveMenu.menuClose();

		    	});

		    },

		    anchorScroll: function(){

		    	var self = this;

		    	self.nav.on('click', "a", function(event){

		    		event.preventDefault();

		    		var $this = $(this),
		    			item = $this.parent(),
		    			dataId = $this.attr('href'),
		    			offset = $(dataId).offset().top;


		    		item.addClass('current').siblings().removeClass('current');

		    		self.scrollContent(offset);

		    	});

		    },

		    scrollContent: function(offset){

		    	var self = this;

		    	self.body.addClass('scrollContent');

		    	$('html,body').stop().animate({

					scrollTop: offset - 50

		    	},1000,function(){

		    		self.body.removeClass('scrollContent');

		    	});

		    },

		    pageScroll: function(){

		    	var self = this;

		    	if(self.body.hasClass('scrollContent'))return;

		    	self.wScroll = self.w.scrollTop();
		    	self.wHeightHalf = self.w.height()/2;

		    	for (var i = 0; i <= self.sectionQt - 1; i++) {

		    		var offset = $(self.section[i]).offset().top,
		    			heightBox = $(self.section[i]).outerHeight(),
		    			bottomOffset = $(self.section[i+1]).length ? $(self.section[i+1]).offset().top : offset + heightBox,
		    			id = $(self.section[i]).attr('id'),
		    			activItem = $('.navigation').find("a[href='" + "#" + id + "']").parent();

		    		$('.navigation li').removeClass('active');
		    		$('.navigation_point li').removeClass('navigation_point_active');

		    		if(self.wScroll + self.wHeightHalf > offset && self.wScroll + self.wHeightHalf < bottomOffset ){

		    			setTimeout(function(){

		    			},1000)

		    			activItem.addClass('current').siblings().removeClass('current');

		    			return false;

		    		}

		    	};

		    },

		    responsiveMenu: {

		    	events: function(){

		    		var self = this;

		    		self.nav = $('nav');
		    		self.navButton = $('.nav_btn');

					self.navButton.on('click', function () {

						if(self.nav.hasClass('open_menu')){

							self.menuClose();

						}
						else{

							self.menuOpen();

						}

					});

					self.nav.on('click', 'a', function(){

						self.menuClose();

					});

		    	},

		    	menuOpen: function(){

		    		var self = this;

		    		self.nav.addClass('open_menu');

		    	},

		    	menuClose: function(){

		    		var self = this;

		    		self.nav.removeClass('open_menu');

		    	},

		    },

		},


		/**
		**	Google Map
		**/


		googleMaps: function(){

		    var mapsCollection = [],
				mapSettings = {

					map_options: {
						zoom: 16

					},
					generate_controls: false,
					controls_on_map: false,
					view_all: false

			    },

		    	mapStyles = {

					'mapBox' : {
						map_options: {
							zoom: 15,
							scrollwheel: false,
							mapTypeId: google.maps.MapTypeId.ROADMAP
						},
						styles:{
							'mapBox': [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
			      		}
					}

		    	};

		    $('.gmap').each(function(i, el){

		    	var dataCoords = $(el).data('coords');

		    	// dataCoords[0].icon = './images/icons/place_icon_map1x.png';

		    	mapSettings.locations = dataCoords;

		    	// console.log(mapSettings.locations);

				var map = $.extend(mapSettings, mapStyles[$(el).data('gmap-type')]);

				map.map_div = '#' + $(el).attr('id');

				mapsCollection.push(new Maplace(map).Load());

		    });

		    if(!mapsCollection.length) return;

		    $(window).on('resize.map', function(){

				setTimeout(function(){

					mapsCollection.forEach(function(elem, index, arr){

						elem.Load();

					});

				}, 100);

		    });

		},


		/**
		**	Anchor
		**/


		anchor: function(){

			$('.anchor').on('click',function(e){

				e.preventDefault();

				var id = $(this).attr('href'),
					offset = $(id).offset().top;


		    	$('html,body').stop().animate({

					scrollTop: offset

		    	},1000);


			});

		},



	}


	$(document).ready(function(){

		Core.DOMReady();

		$('video').mediaelementplayer({
			features: [],
			loop: true,
			plugins: ['youtube'],
			success: function(media, node, player) {
				media.play();
			}
		});

	});

	$(window).load(function(){

		Core.windowLoad();

	});

})(jQuery);
