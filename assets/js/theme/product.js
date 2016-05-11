/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from '../page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';

export default class Product extends PageManager {
    constructor() {
        super();
        this.url = location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#writeReview') !== -1) {
                history.replaceState('', document.title, window.location.pathname);
            }
        });




        $("body").addClass("ProductPage");


        function percentOff(){
            var sale = $(".productView .price.price--withoutTax").text().replace("$","");
            var retail = $(".productView .price.retail").text().replace("$","").trim();

            if( retail !== "" ){
              var percentRaw = (retail - sale) / retail * 100;
              var percentOff = Math.round(percentRaw);
              if( percentOff >= 10 ){
                $("span.percent-off").text('Save '+ percentOff + '%');
              } else {
                $(".productView .price.retail").hide();
                $("span.percent-off").hide()
              }
            }

        }
        percentOff();


        if( $(".productView-thumbnails > li").length > 3 ){
            makeSlideThumbnails();
        }


        function makeSlideThumbnails(){

            $('.productView-thumbnails').addClass("thumb-slider");

            $('.productView-thumbnails').slick({
              dots: false,
              infinite: false,
              // speed: 300,
              slidesToShow: 6,
              slidesToScroll: 6,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: false,
                    dots: false
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false
                  }
                }
              ]
            });

        }

        $(".product-details-accordion > ul > li > h3").on("click", function(){
          $(this).parent("li").toggleClass('open-accordion');
        })

        if( $(window).width() < 900 ){
          $(".product-details-accordion > ul > li:first-child").removeClass("open-accordion");

        }

        $('.related-products > ul.productGrid').slick({
              dots: false,
              infinite: false,
              // speed: 300,
              slidesToShow: 5,
              slidesToScroll: 5,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: false,
                    dots: false
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: false
                  }
                }
              ]
            });


        next();
    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation();
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }

            return false;
        });

        next();
    }

    after(next) {
        this.productReviewHandler();

        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#writeReview') !== -1) {
            this.$reviewLink.click();
        }
    }
}
