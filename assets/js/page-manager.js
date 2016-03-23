export default class PageManager {
    before(next) {
        next();
    }

    loaded(next) {
        next();


        $(".click-tog-search").on("click", function(){
            $(this).parent().toggleClass("black-outline")
            $(this).toggleClass("open-search");
            $(".mob-tog-search").slideToggle("fast");
        });

        $(".account-menu-toggle").on("click", function(){
            $(this).find("ul").slideToggle();
            $(this).toggleClass("open-menu");
        })


    }

    after(next) {
        next();
    }

    type() {
        return this.constructor.name;
    }
}
