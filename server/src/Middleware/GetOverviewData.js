const { UserModel } = require("../Mongo/UserModel");
const { ProductModel } = require("../Mongo/ProductModel");
const { OrderModel } = require("../Mongo/OrderModel");



const GetOverviewData = async (req, res, next) => {
    try {
        const [
            userCount,
            productsCount,
            { ordersCount, pendingOrdersCount },
            salesData
        ] = await Promise.all([
            UserModel.countDocuments(),
            ProductModel.countDocuments(),
            (async () => {
                const ordersCount = await OrderModel.countDocuments();
                const pendingOrdersCount = await OrderModel.countDocuments({ status: 'Pending' });
                return { ordersCount, pendingOrdersCount };
            })(),
            (async () => {
                const mostSoldProduct = await ProductModel.findOne().sort({ sales: -1 }).limit(1);
                const totalSales = await ProductModel.aggregate([
                    { $group: { _id: null, totalSales: { $sum: "$sales" } } }
                ]);
                const totalNetProfit = await ProductModel.aggregate([
                    {
                        $group: {
                            _id: null,
                            totalProfit: { $sum: { $multiply: ["$price", "$sales"] } },
                        },
                    },
                ]);
                
                return {
                    mostSoldProduct: mostSoldProduct || { name: "No products" },
                    totalSales: totalSales[0]?.totalSales || 0,
                    totalNetProfit: totalNetProfit[0]?.totalProfit || 0
                };
            })()
        ]);

        res.status(200).json({
            success: true,
            data: {
                userCount,
                productsCount,
                ordersInfo: { ordersCount, pendingOrdersCount },
                salesInfo: salesData
            }
        });
    } catch (error) {
        console.error('Error in GetOverviewData:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving overview data',
            error: error.message
        });
    }
};


module.exports = {GetOverviewData};