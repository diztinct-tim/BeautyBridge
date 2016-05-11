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






        function makeThumbnailActive(){
            $("ul.productView-thumbnails > li.productView-thumbnail:first-child > a").addClass("is-active");
        }
        makeThumbnailActive();

        function addCategoryPageClass(){
            if( $(".page").hasClass('category-page') ){
                $("body").addClass("CategoryPage");
            }
        }
        addCategoryPageClass();

        function addSearchPageClass(){
            if( $(".page").hasClass('search-page') ){
                $("body").addClass("SearchPage");
            }
        }
        addSearchPageClass();

        var pageName = window.location.href;
        if( pageName.indexOf("brands") >= -1 ){
            addListHeaders();
        }
        function addListHeaders(){
            var list = { letters: [] };
            $(".brandGrid").children("li").each(function(){
                var itmLetter = $(this).text().substring(0,1).toUpperCase();
                if (!(itmLetter in list)) {
                    list[itmLetter] = [];
                    list.letters.push(itmLetter);
                }
                list[itmLetter].push($(this));
            });
            list.letters.sort();
            $(".brandGrid").empty();
            $.each(list.letters, function(i, letter){
                list[letter].sort(function(a, b) {
                    return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
                });
                var ul = $("<ul/>");
                $.each(list[letter], function(idx, itm){
                    ul.append(itm);
                });
                $(".brandGrid").append($("<li/>").append($("<a/>").attr("name", letter.toLowerCase()).addClass("listHeader").html(letter)).append(ul));
            });
        }

        



    }

    loaded(next) {
        next();

        $(".FrequentlyAskedQuestions .main-info-container ul > li").on("click", function(){
            $(this).toggleClass("open");
        })


        // $("body").on("click", ".click-tog-search", function(){
        //     $(this).parent().toggleClass("black-outline");
        //     $(this).toggleClass("open-search");
        //     $(".mob-tog-search").slideToggle("fast");
        // });

        // $(".account-menu-toggle").on("click", function(){
        //     $(this).find("ul").slideToggle();
        //     $(this).toggleClass("open-menu");
        // })







    }

    after(next) {
        next();
    }

    type() {
        return this.constructor.name;
    }
}
