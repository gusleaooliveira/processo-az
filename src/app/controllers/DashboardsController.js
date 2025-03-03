// src/app/controllers/DashboardsController.js
import Order from "../models/Order";

class DashboardsController {
  async index(req, res) {
    try {
      const { startDate, endDate, page = 1, limit = 10 } = req.query;
      const skip = (page - 1) * Number(limit);

      let filter = {};
      if (startDate && endDate) {
        filter.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }

      const pipeline = [
        { $match: filter },
        {
          $facet: {
            summary: [
              {
                $group: {
                  _id: null,
                  orders_total: { $sum: { $ifNull: ["$payment.amount", 0] } },
                  orders_count: { $sum: 1 },
                  sales_total: {
                    $sum: {
                      $cond: [
                        { $eq: ["$payment.status", "succeeded"] },
                        { $ifNull: ["$payment.amount", 0] },
                        0,
                      ],
                    },
                  },
                  sales_count: {
                    $sum: {
                      $cond: [{ $eq: ["$payment.status", "succeeded"] }, 1, 0],
                    },
                  },
                },
              },
              { $project: { _id: 0 } },
            ],
            orders: [
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: Number(limit) },
            ],
            total: [{ $count: "count" }],
          },
        },
      ];

      const result = await Order.aggregate(pipeline);
      const summary = result[0].summary[0] || {
        orders_total: 0,
        orders_count: 0,
        sales_total: 0,
        sales_count: 0,
      };

      const total_items = result[0].total[0]?.count || 0;
      const total_pages = Math.ceil(total_items / Number(limit));

      const average_ticket =
        summary.sales_count > 0
          ? Number((summary.sales_total / summary.sales_count).toFixed(2))
          : 0;

      return res.json({
        orders_total: summary.orders_total,
        orders_count: summary.orders_count,
        sales_total: summary.sales_total,
        sales_count: summary.sales_count,
        average_ticket: average_ticket,
        orders: result[0].orders,
        pagination: {
          total_items,
          total_pages,
          current_page: Number(page),
          items_per_page: Number(limit),
        },
      });
    } catch (error) {
      console.error("Erro ao buscar dashboard:", error);
      return res
        .status(500)
        .json({
          error: true,
          message: "Erro ao buscar os dados do dashboard.",
        });
    }
  }
}

export default new DashboardsController();
