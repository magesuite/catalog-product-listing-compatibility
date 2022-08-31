var config = {
    paths: {
        'Magento_Catalog/template/product/list/listing': 'MageSuite_CatalogProductListingCompatibility/template/product/list/listing'
    },
    config: {
        mixins: {
            'Magento_Catalog/js/product/list/listing': {
                'MageSuite_CatalogProductListingCompatibility/js/product/list/listing-carousel-ext': true,
            }
        },
    },
};
