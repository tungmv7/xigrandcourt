function cstheme_parallax() {
	"use strict";
	
	/* ------------------------------------------------
	    Parallax
		------------------------------------------------ */

	   if($(".blackout[class*='bg'],.blackout2[class*='bg']").length){

	  	  $(".blackout[class*='bg'],.blackout2[class*='bg']").each(function(){

	     $(this).parallax("50%", 0.2);

	    });

	   }
	   
	if($(".cstheme_parallax").length){
		$(".cstheme_parallax").each(function(){
			$(this).parallax("50%", 0.2);
		});
	}
		/* ------------------------------------------------
		    End Parallax
		------------------------------------------------ */
}

;(function($){

	"use strict";

	$(document).ready(function(){

		/* ------------------------------------------------
				magnificPopup
		------------------------------------------------ */

			$('.gallery_slider').magnificPopup({
				delegate: '.gallery_item',
				type: 'image',
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true,
					duration: 300 // don't foget to change the duration also in CSS
				}
				
			});

        /* ------------------------------------------------
				End of magnificPopup
		------------------------------------------------ */

		/* ------------------------------------------------
				owlCarousel
		------------------------------------------------ */

			if($('.gallery_slider').length){

				$('.gallery_slider').owlCarousel({
				    nav:true,
				    navText: ['',''],
				    loop: true,
				    responsive:{
				        0:{
				            items:1
				        },
				        767:{
				            items:2
				        },
				        992:{
				            items:4
				        },
				        1199:{
				            items:6
				        }
				    }
				})
			}

		/* ------------------------------------------------
				End of owlCarousel
		------------------------------------------------ */

	});

	$(window).load(function(){

		cstheme_parallax();

	});
	
	jQuery(window).resize(function(){
	
		cstheme_parallax();
		
	});

})(jQuery);