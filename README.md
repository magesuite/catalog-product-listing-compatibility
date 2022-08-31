# MageSuite extension for Magento Catalog product listing

It allows using MageSuite product carousel as a template for "Recently viewed products" and "Recently compared products" widgets.
It aligns displaying products to the other parts of the shop, using MageSuite's carousel and product tile.

## Developer notes: 
Please acknowledge that the module changes the path of `Magento_Catalog/template/product/list/listing.html` to the module's one `MageSuite_CatalogProductListingCompatibility/template/product/list/listing.html` in `requirejs-config.js`. It also provides a mixin to product listing UI component, allowing usage of carousel instead of the defautl view.