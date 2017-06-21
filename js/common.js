$(document).ready(function() {

$(document).foundation();

var breakpoints = [1300, 750];

var autoPaddingObj = function(container, item, mode) {
	this.container = document.getElementsByClassName(container)[0];
	this.item = document.getElementsByClassName(item)[0];
	this.mode = mode;
	var self = this;
	self.setPadding = function() {
		setTimeout(function() {
			e();
		}, 100);
		function e() {
			var padding = self.item.getBoundingClientRect().height;
			if ( mode == 'bottom') {
				self.container.style.paddingBottom = padding + 'px';
			}
			else {
				self.container.style.paddingTop = padding + 'px';
			}
		}	
	}
	self.removePadding = function() {
		setTimeout(function() {
			x();
		}, 100);
		function x() {
			if ( mode == 'bottom') {
				self.container.style.removeProperty('padding-bottom');
			}
			else {
				self.container.style.removeProperty('padding-top');
			}
		}
	}
}

var headerAutoPadding = new autoPaddingObj('b-top-container', 'b-header', 'top');
var footerAutoPadding = new autoPaddingObj('b-body', 'b-footer', 'bottom');


function HeaderAutoPadding() {
	headerAutoPadding.setPadding();
}
function FooterAutoPadding() {
	footerAutoPadding.setPadding();
}

var AutoscaleObj = {
	items: document.getElementsByClassName('autoscale')
}

function initAnimation() {
	var elems = $('.initAnimation');
	elems.on('inview', function(event, isInView) {
		if (isInView) {
			animation();
		}
	})
	function animation() {
		var i = 0;
		var interval = setInterval(function() {
			e();
		}, 350);
		function e() {
			elems[i++].classList.add('in');
			if (i >= elems.length) {
				clearInterval(interval);
			}	
		}
	}
}

function Animation() {
	$('.animated').on('inview', function(event, isInView) {
		if (isInView && !(this.classList.contains('initAnimation'))) {
			$(this).addClass('in');
		}
	})
}

function Rating() {
	var containers = document.getElementsByClassName('b-testimonials-item');
	for (var i = 0; i < containers.length; i++) {
		var number = getNumber(containers[i].className, 'rating')[0];
		setNumber(containers[i], number);
	}
	function setNumber(item, number) {
		var stars = item.getElementsByClassName('fa');
		for (var i = 0; i < number; i++) {
			stars[i].classList.add('fa-star');
		}
		for (i; i < stars.length; i++) {
			stars[i].classList.add('fa-star-o');
		}
	}
}

function testimonialsSlide() {
	var slide = $('.b-testimonials-slide');
	var initSlide = 1;
	var container = document.getElementsByClassName('b-testimonials')[0];
	slide.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		initialSlide: initSlide
	});
	var dots = container.getElementsByClassName('b-dots-item');
	var activeClass = 'b-dots-item--active';
	var active = container.getElementsByClassName(activeClass)[0];
	var next = container.getElementsByClassName('b-arrow--next')[0];
	var prev = container.getElementsByClassName('b-arrow--prev')[0];
	next.onclick = function() {
		slide.slick('slickNext');
		return false;
	}
	prev.onclick = function() {
		slide.slick('slickPrev');
		return false;
	}
	slide.on('afterChange', function(currentSlide) {
		var index = slide.slick('slickCurrentSlide');
		active.classList.remove(activeClass);
		active = dots[index];
		active.classList.add(activeClass);
	})
	for (var i = 0; i < dots.length; i++) {
		dots[i].i = i;
		dots[i].onclick = function() {
			slide.slick('slickGoTo', this.i);
			return false;
		}
	}
}

function plan() {
	var container = document.getElementsByClassName('b-plan')[0];
	var tabs = container.getElementsByClassName('b-plan-tabs__item');
	var individual = container.getElementsByClassName('b-plan-individual')[0];
	var company = container.getElementsByClassName('b-plan-company')[0];
	var contentActiveClass = 'b-plan-tabs-content--active';
	var tabsActiveClass = 'b-plan-tabs__item--active';
	var activeTab = container.getElementsByClassName(tabsActiveClass)[0];
	var activeContent = container.getElementsByClassName(contentActiveClass)[0];
	var content = container.getElementsByClassName('b-plan-tabs-content');
	var indicatorInitPosition = 0;
	var indicator = container.getElementsByClassName('b-plan-tabs__indicator')[0];
	for (var i = 0; i < content.length; i++) {
		if (!(content[i].classList.contains(contentActiveClass))) {
			content[i].style.display = 'none';
		}
	}
	for (var i = 0; i < tabs.length; i++) {
		tabs[i].width = tabs[i].getBoundingClientRect().width;
		tabs[i].start = indicatorInitPosition = indicatorInitPosition + (tabs[i-1] ? tabs[i-1].width : 0);
		tabs[i].onclick = function() {
			if (this.classList.contains('individualButton') && this != activeTab) {
				setActiveContent(individual);
			}
			else if (this != activeTab) {
				setActiveContent(company);
			}
			activeTab.classList.remove(tabsActiveClass);
			activeTab = this;
			activeTab.classList.add(tabsActiveClass);
			setIndicator(activeTab);
			return false;
		}
	}
	function setIndicator(x) {
		indicator.style.width = x.width + 22 + 'px';
		indicator.style.left = x.start + 4 + 'px';
	}
	function setActiveContent(x) {
		activeContent.classList.remove(contentActiveClass);
		setTimeout(function() {
			activeContent.style.display = 'none';
			activeContent = x;
			activeContent.style.display = 'block';
			activeContent.classList.add(contentActiveClass);
		}, 500)
	}
	setIndicator(activeTab);
}

function Autoscale() {
	AutoscaleObj.items.rescaleAll();
}

function fixedHeader() {
	var header = document.getElementsByClassName('b-header')[0];
	window.onscroll = function() {
		var height = header.getBoundingClientRect().height;
		var scrolled = window.pageYOffset;
		if (scrolled > height) {
			header.classList.add('b-header--fixed');
		}
		else if (scrolled == 0)  {
			header.classList.remove('b-header--fixed');
		}
	}
}

	Adaptive ({
		breakpoints: breakpoints,
		'default': [
			topMenu,
			HeaderAutoPadding,
			Animation,
			initAnimation,
			Rating,
			testimonialsSlide,
			plan,
			fixedHeader,
			FooterAutoPadding

		],
		'mode0': [
			FooterAutoPadding


		],
		'mode0once': [


			
		],
		'mode1': [
			FooterAutoPadding


		],
		'mode1once': [


			
		],
		'mode2': [
			FooterAutoPadding


		],
		'mode2once': [

		
			
		]
	});
});

