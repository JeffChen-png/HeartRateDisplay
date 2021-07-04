$(document).ready(function(){
	
	// Слайдер

	$('.carousel__inner').slick({
		speed: 500,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"> <img src="icons/chevron-left-solid.png" alt=""> </button>',
		nextArrow: '<button type="button" class="slick-next"> <img src="icons/chevron-right-solid.png" alt=""> </button>',
		responsive: [
		{
			breakpoint: 1050,
			settings: {
				dots: true,
				arrows: false, 
			}
		}]
	});

	//Табы

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
	    $(this)
	    	.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
	    	.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  	});

	//Подробное описание товара

  	function toggleSlide(item) {
  		$(item).each(function(i) {
			$(this).on('click', function(){
				$('div.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('ul.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			});	
	  	});
  	};

  	toggleSlide('div.catalog-item__link');
  	toggleSlide('div.catalog-item__back');

  	//Модальные окна data-modal="consultation || order || thanks"

  	$('[data-modal=consultation]').on('click', function() {
  		$('.overlay, #consultation').show();
  	});

  	$('.button_catalog').each(function(i) {
  		$(this).on('click', function() {
  			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
  			$('.overlay, #order').show();
  		});
  	});

  	$('[data-modal=thanks]').on('click', function() {
  		$('.overlay, #thanks').show();
  	});

  	$('.overlay').on('click', function(e) {
  		if (!$('.modal').is(e.target) && $('.modal').has(e.target).length === 0 || $('.modal__close').is(e.target)) { 
  			$('.overlay, #consultation, #order, #thanks').hide();
		}
  	});
});

