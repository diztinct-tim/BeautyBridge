$(function(){

    $("body").on("click", ".click-tog-search", function(){
        $(this).parent().toggleClass("black-outline");
        $(this).toggleClass("open-search");
        $(".mob-tog-search").slideToggle("fast");
        $(".mob-tog-search").toggleClass("open");
    });

    $("li.account-menu-toggle > span").on("click", function(){
        $(this).parent("li").find("ul").slideToggle();
        $(this).parent("li").toggleClass("open-menu");
    });

    if( $(window).width() < 768 ){
        var previousScroll = 0,
        headerOrgOffset = $('.menu-wrap').offset().top + 5;

        $(window).scroll(function() {
            var currentScroll = $(this).scrollTop();
            if(currentScroll > headerOrgOffset) {
                if (currentScroll > previousScroll) {
                    $('.menu-wrap').removeClass('mob-fix');
                    $('.header-logo').removeClass('bottom-spacer');
                    $('.mob-tog-search').removeClass('fixed-head');
                } else {
                    // $('#Header > .inner').fadeIn(400);
                    $('.menu-wrap').addClass('mob-fix');
                    $('.header-logo').addClass('bottom-spacer');
                    $('.mob-tog-search').addClass('fixed-head');
                }
            } else {
                 $('.menu-wrap').removeClass('mob-fix');
                 $('.header-logo').removeClass('bottom-spacer');
                 $('.mob-tog-search').removeClass('fixed-head');
            }
            previousScroll = currentScroll;
        });
    }

    if( $(window).width() >= 768 ){
        var previousScroll = 0,
        headerOrgOffset = $('.header').offset().top - 70;

        $(window).scroll(function() {
            var currentScroll = $(this).scrollTop();
            if(currentScroll > headerOrgOffset) {
                if (currentScroll > previousScroll) {
                    $('.header').removeClass('desk-fix');
                    $('.banners.cf').removeClass('desk-fix');
                    $('.menu-wrap').removeClass('desk-fix');
                    $('.mob-tog-search').removeClass('fixed-head');
                    $('div.body').removeClass('top-fix-margin');
                } else {
                    $('.header').addClass('desk-fix');
                    $('.banners.cf').addClass('desk-fix');
                    $('.menu-wrap').addClass('desk-fix');
                    $('.mob-tog-search').addClass('fixed-head');
                    $('div.body').addClass('top-fix-margin');
                }
            } else {
                    $('.header').removeClass('desk-fix');
                    $('.banners.cf').removeClass('desk-fix');
                    $('.menu-wrap').removeClass('desk-fix');
                    $('.mob-tog-search').removeClass('fixed-head');
                    $('div.body').removeClass('top-fix-margin');
            }
            previousScroll = currentScroll;
        });
    }


})

export default class PageManager {
    before(next) {
        next();

        function addPageClass(){
            var catName = $('.page-heading').text();
            var catName = catName.replace(/ /g, '');         
            var catName = catName.replace(/'/g, '');
            var catName = catName.replace(/&/g, '');
            var catName = $.trim(catName);
            if( catName == "404Error-Pagenotfound" ){
                $('body').addClass('page-not-found');
            } else {
                $('body').addClass(''+catName+'');
            }
        }
        addPageClass();

        // CHANGE TO RED CART WHEN ITEM ADDED OR BACK TO BLACK IF COUNT IS 0
        function changeMobileCartImg(){
            if( $(window).width() < 768 && $(".mob-cart-num").text() !== "0" ){
                $("div.cart-num > img").attr("src", "https://cdn3.bigcommerce.com/s-pxmpwj/product_images/uploaded_images/mob-red-cart-03.jpg");
            }
        }
        changeMobileCartImg();
        $(".mob-cart-num").on("change", changeMobileCartImg() );

        // make first thumbnail active
        function makeThumbnailActive(){
            $("ul.productView-thumbnails > li.productView-thumbnail:first-child > a").addClass("is-active");
        }
        makeThumbnailActive();

        // add classes to cat page
        function addCategoryPageClass(){
            if( $(".page").hasClass('category-page') ){
                $("body").addClass("CategoryPage");
            }
        }
        addCategoryPageClass();

        // add class to searchpage
        function addSearchPageClass(){
            if( $(".page").hasClass('search-page') ){
                $("body").addClass("SearchPage");
            }
        }
        addSearchPageClass();

        var pageName = window.location.href;
        if( pageName == "http://beautybridge.mybigcommerce.com/brands/" || pageName == "http://localhost:3000/brands/" ){
            $(".body").addClass("brands-list");
            $(".sub-cat-list > .navList").addClass("brandGrid");
            addListHeaders();
        }

        function addListHeaders(){
            var list = { letters: [] };
            $(".brandGrid.brand-page-only").children("li").each(function(){
                var itmLetter = $(this).text().substring(0,1).toUpperCase();
                // var itmLetter = $(this).next("a").text().substring(0,1).toUpperCase();
                if (!(itmLetter in list)) {
                    list[itmLetter] = [];
                    list.letters.push(itmLetter);
                }
                list[itmLetter].push($(this));
            });
            list.letters.sort();
            $(".brandGrid.brand-page-only").empty();
            $.each(list.letters, function(i, letter){
                list[letter].sort(function(a, b) {
                    return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
                });
                var ul = $("<ul/>");
                $.each(list[letter], function(idx, itm){
                    ul.append(itm);
                });
                $(".brandGrid.brand-page-only").append($("<li class='cf'></li>").append($("<a/>").attr("name", letter.toLowerCase()).addClass("listHeader").html(letter)).append(ul));
            });
        }

        if ($(window).width() < 768 ) {
            $("#search_query_adv").attr("placeholder","Search");
        }
        else {
            $("#search_query_adv").attr("placeholder","Search by keyword or search term");
        }










    }

    loaded(next) {
        next();

        $(".FrequentlyAskedQuestions .main-info-container ul > li").on("click", function(){
            $(this).toggleClass("open");
        })

    }

    after(next) {
        next();
    }

    type() {
        return this.constructor.name;
    }
}
