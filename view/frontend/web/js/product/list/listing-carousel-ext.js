define([
    'ko',
    'jquery',
    'mage/apply/main',
    'mage/cookies'
], function (ko, $, mage, cookies) {
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
                const targetContainerSelector = ("." + (this.additionalClasses).split(' ').join('.'));
                this.filteredRows.subscribe((value) => {
                    if (value.length && !this.magesuiteCarouselInitialized) {
                        this.magesuiteCarouselInitialized = true;
                        value.map(function(product){
                            productIds.push(product.id)
                        });

                        $.get(this.magesuiteCarouselRendererEndpoint, {
                            id: productIds,
                        }).then(({ content }) => {
                            this.carouselMarkup(content);
                            // Initialize js components for injected content and refresh form_key
                            mage.apply();
                            $(targetContainerSelector)
                                .trigger('contentUpdated')
                                .find('input[name="form_key"]')
                                .val($.mage.cookies.get('form_key'));
                        });
                    }
                });
            },
        });
    }
});
