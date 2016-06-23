import { hooks } from 'bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';


$(function(){

    function moveSeoText(){
        $(".category-description").detach().appendTo(".seo-txt");
    }
    moveSeoText();

    function moveCatImage(){
        if($(".admin-input-area.cat-has-img > .cat-img")){
            $(".admin-input-area.cat-has-img > .cat-img").detach().prependTo("h1.page-heading");
            $("h1.page-heading").css("margin-top","10px");
            // $("h1.page-heading").css("text-indent","-130px");
            $(".page.category-page").css("clear","both");
        }
    }
    moveCatImage();

    // IF ITS BRANDS CATEGORY, CHANGE THE VIEW
    var url = window.location.href;
    if ( url == "http://localhost:3000/brands/" || url == "http://beautybridge.mybigcommerce.com/brands/" || url == "www.beautybridge.com/brands/" ){
        console.log("it's equal to just brands");
        $('body').addClass('list-brands');
    }

    if( $(window).width() < 768 && $(".seo-txt > .category-description").height() > 250 ){
        $(".seo-txt > .category-description").addClass("hide-rest");
        $(".seo-txt").append("<span class='view-more'>View More</span>");
    }

    $("span.view-more").on("click", function(){
        $(this).fadeOut();
        $(".seo-txt > .category-description").removeClass("hide-rest");
    }); 

    function mobilefyPagination(pageLength, currentPage){
        console.log("inside function");
        console.log('currentPage = ' + currentPage);
        console.log("pagination length = " + pageLength);
        if(pageLength > 2){
            $("li.pagination-item").each(function(idx){
                $(this).removeClass("hide-me");
                console.log("data = " + $(this).data("pageNum"));
                if($(this).data("pageNum") > currentPage + 1 || $(this).data("pageNum") < currentPage - 1){
                    $(this).addClass("hide-me");
                }
            })
        }
    }

    if( $("div.page").hasClass("category-page") ){

        var pageLength = $(".bottom-pagination ul li").length;
        var currentPage = $(".pagination-item.pagination-item--current").data().pageNum;
        mobilefyPagination(pageLength, currentPage);

        var currentPage = $(".pagination-item.pagination-item--current").data("pageNum");
        var lastPage = $(".pagination-item:last-child").data("pageNum");
        if( currentPage == '1'){
            $(".pagination-item.pagination-item--next").addClass("center-me");
        } else if (currentPage == lastPage){
            $(".pagination-item.pagination-item--previous").addClass("center-me");
        }

    }
    
    
})




export default class Category extends CatalogPage {
    loaded() {
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);

        });
    }
}
