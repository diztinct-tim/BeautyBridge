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
        $(".admin-input-area.cat-has-img > .cat-img").detach().insertBefore(".category-description");
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

    var currentPage = $(".pagination-item.pagination-item--current").data("pageNum");
    if( currentPage == '1'){
        $(".pagination-item.pagination-item--next").addClass("center-me");
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
