const { ProductModel } = require("../Mongo/ProductModel");
// const ProductModel = require("../mongo/ProductModel")


const GetProducts = async (req, res, next) => {
    try {

        const products = await ProductModel.find().lean();
        return res.status(200).json(products);

    } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
        return res.status(500).json({ message: "خطای داخلی سرور" });
    }
}

module.exports = {
    GetProducts
}











// const NodeCache = require('node-cache');
// const productCache = new NodeCache({ stdTTL: 60 }); // Cache for 60 seconds

// const GetProducts = async (req, res, next) => {
//     try {
//         const cachedProducts = productCache.get('allProducts');
//         if (cachedProducts) {
//             return res.status(200).json(cachedProducts);
//         }
        
//         const products = await ProductModel.find()
//             .select('name price description stock imageUrl')
//             .lean();
            
//         productCache.set('allProducts', products);
//         return res.status(200).json(products);
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }
