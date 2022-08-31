console.log("TEST")
define([
    'ko',
    'jquery',
    'mage/apply/main',
], function (ko, $, mage) {
    return function (Listing) {
        return Listing.extend({
            defaults: {
                magesuiteCarouselInitialized: false,
                magesuiteCarouselRendererEndpoint: '/products_renderer/recommendation/carousel/',
                displayAsMagesuiteCarousel: false,
            },

            initialize: function () {
                this._super();
                this.carouselMarkup = ko.observable();

                if (this.displayAsMagesuiteCarousel === true) {
                    this.initializeMagesuiteCarousel();
                }
            },

            initializeMagesuiteCarousel: function () {
                const productIds = [];
                this.filteredRows.subscribe((value) => {
                    if (this.additionalClasses === "widget block-compared-products-grid") {
                        console.log(value);
                    }
                    if (value.length && !this.magesuiteCarouselInitialized) {
                        this.magesuiteCarouselInitialized = true;
                        value.map(function(product){
                            productIds.push(product.id)
                        });

                        $.get(this.magesuiteCarouselRendererEndpoint, {
                            id: productIds,
                        }).then(({ content }) => {
                            this.carouselMarkup(content);
                            mage.apply();
                        });
                    }
                });
            },
        });
    }
});
