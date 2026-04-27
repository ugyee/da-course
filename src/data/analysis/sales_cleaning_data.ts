// 销售数据清洗与预处理 - 包含常见数据问题的模拟数据集
export const salesCleaningData = {
  // 原始数据
  rawData: [
    { order_id: 1, date: '2024-01-01', product: '产品A', quantity: 10, unit_price: 50, total_amount: 500, region: '华东', channel: '线上' },
    { order_id: 2, date: '2024-01-02', product: '产品B', quantity: 5, unit_price: 100, total_amount: 500, region: '华南', channel: '线下' },
    { order_id: 3, date: '2024-01-03', product: '产品A', quantity: 8, unit_price: 50, total_amount: 400, region: '华北', channel: '线上' },
    { order_id: 4, date: '2024-01-04', product: '产品C', quantity: 3, unit_price: 150, total_amount: 450, region: '华东', channel: '线下' },
    { order_id: 5, date: '2024-01-05', product: '产品B', quantity: 12, unit_price: 100, total_amount: 1200, region: '华南', channel: '线上' },
    { order_id: 6, date: '2024-01-06', product: '产品A', quantity: 15, unit_price: 50, total_amount: 750, region: '华北', channel: '线下' },
    { order_id: 7, date: '2024-01-07', product: '产品C', quantity: 2, unit_price: 150, total_amount: 300, region: '华东', channel: '线上' },
    { order_id: 8, date: '2024-01-08', product: '产品B', quantity: 6, unit_price: 100, total_amount: 600, region: '华南', channel: '线下' },
    { order_id: 9, date: '2024-01-09', product: '产品A', quantity: 10, unit_price: 50, total_amount: 500, region: '华北', channel: '线上' },
    { order_id: 10, date: '2024-01-10', product: '产品C', quantity: 4, unit_price: 150, total_amount: 600, region: '华东', channel: '线下' },
    // 包含数据问题的记录
    { order_id: 11, date: '2024-01-11', product: null, quantity: 5, unit_price: 100, total_amount: 500, region: '华南', channel: '线上' }, // 缺失产品名称
    { order_id: 12, date: '2024-01-12', product: '产品A', quantity: null, unit_price: 50, total_amount: 250, region: '华北', channel: '线下' }, // 缺失数量
    { order_id: 13, date: '2024-01-13', product: '产品B', quantity: 8, unit_price: null, total_amount: 800, region: '华东', channel: '线上' }, // 缺失单价
    { order_id: 14, date: null, product: '产品C', quantity: 3, unit_price: 150, total_amount: 450, region: '华南', channel: '线下' }, // 缺失日期
    { order_id: 15, date: '2024-01-15', product: '产品A', quantity: 10, unit_price: 50, total_amount: null, region: '华北', channel: '线上' }, // 缺失总金额
    { order_id: 16, date: '2024-01-16', product: '产品B', quantity: 5, unit_price: 100, total_amount: 500, region: null, channel: '线下' }, // 缺失地区
    { order_id: 17, date: '2024-01-17', product: '产品C', quantity: 2, unit_price: 150, total_amount: 300, region: '华东', channel: null }, // 缺失渠道
    { order_id: 18, date: '2024-01-01', product: '产品A', quantity: 10, unit_price: 50, total_amount: 500, region: '华东', channel: '线上' }, // 重复记录
    { order_id: 19, date: '2024-01-19', product: '产品B', quantity: -5, unit_price: 100, total_amount: -500, region: '华南', channel: '线下' }, // 负数数量和金额
    { order_id: 20, date: '2024-01-20', product: '产品A', quantity: 1000, unit_price: 50, total_amount: 50000, region: '华北', channel: '线上' }, // 异常大的数量
    { order_id: 21, date: '2024/01/21', product: '产品C', quantity: 3, unit_price: 150, total_amount: 450, region: '华东', channel: '线下' }, // 日期格式不一致
    { order_id: 22, date: '2024-01-22', product: '产品B', quantity: '6', unit_price: '100', total_amount: '600', region: '华南', channel: '线上' }, // 数据类型错误
    { order_id: 23, date: '2024-01-23', product: '产品A', quantity: 8, unit_price: 50, total_amount: 400, region: '华北', channel: '线下' },
    { order_id: 24, date: '2024-01-24', product: '产品C', quantity: 4, unit_price: 150, total_amount: 600, region: '华东', channel: '线上' },
    { order_id: 25, date: '2024-01-25', product: '产品B', quantity: 7, unit_price: 100, total_amount: 700, region: '华南', channel: '线下' }
  ],
  // 清洗后的数据（预期结果）
  cleanedData: [
    { order_id: 1, date: '2024-01-01', product: '产品A', quantity: 10, unit_price: 50, total_amount: 500, region: '华东', channel: '线上' },
    { order_id: 2, date: '2024-01-02', product: '产品B', quantity: 5, unit_price: 100, total_amount: 500, region: '华南', channel: '线下' },
    { order_id: 3, date: '2024-01-03', product: '产品A', quantity: 8, unit_price: 50, total_amount: 400, region: '华北', channel: '线上' },
    { order_id: 4, date: '2024-01-04', product: '产品C', quantity: 3, unit_price: 150, total_amount: 450, region: '华东', channel: '线下' },
    { order_id: 5, date: '2024-01-05', product: '产品B', quantity: 12, unit_price: 100, total_amount: 1200, region: '华南', channel: '线上' },
    { order_id: 6, date: '2024-01-06', product: '产品A', quantity: 15, unit_price: 50, total_amount: 750, region: '华北', channel: '线下' },
    { order_id: 7, date: '2024-01-07', product: '产品C', quantity: 2, unit_price: 150, total_amount: 300, region: '华东', channel: '线上' },
    { order_id: 8, date: '2024-01-08', product: '产品B', quantity: 6, unit_price: 100, total_amount: 600, region: '华南', channel: '线下' },
    { order_id: 9, date: '2024-01-09', product: '产品A', quantity: 10, unit_price: 50, total_amount: 500, region: '华北', channel: '线上' },
    { order_id: 10, date: '2024-01-10', product: '产品C', quantity: 4, unit_price: 150, total_amount: 600, region: '华东', channel: '线下' },
    { order_id: 11, date: '2024-01-11', product: '未知产品', quantity: 5, unit_price: 100, total_amount: 500, region: '华南', channel: '线上' },
    { order_id: 12, date: '2024-01-12', product: '产品A', quantity: 5, unit_price: 50, total_amount: 250, region: '华北', channel: '线下' },
    { order_id: 13, date: '2024-01-13', product: '产品B', quantity: 8, unit_price: 100, total_amount: 800, region: '华东', channel: '线上' },
    { order_id: 14, date: '2024-01-14', product: '产品C', quantity: 3, unit_price: 150, total_amount: 450, region: '华南', channel: '线下' },
    { order_id: 15, date: '2024-01-15', product: '产品A', quantity: 10, unit_price: 50, total_amount: 500, region: '华北', channel: '线上' },
    { order_id: 16, date: '2024-01-16', product: '产品B', quantity: 5, unit_price: 100, total_amount: 500, region: '未知地区', channel: '线下' },
    { order_id: 17, date: '2024-01-17', product: '产品C', quantity: 2, unit_price: 150, total_amount: 300, region: '华东', channel: '未知渠道' },
    { order_id: 19, date: '2024-01-19', product: '产品B', quantity: 5, unit_price: 100, total_amount: 500, region: '华南', channel: '线下' },
    { order_id: 21, date: '2024-01-21', product: '产品C', quantity: 3, unit_price: 150, total_amount: 450, region: '华东', channel: '线下' },
    { order_id: 22, date: '2024-01-22', product: '产品B', quantity: 6, unit_price: 100, total_amount: 600, region: '华南', channel: '线上' },
    { order_id: 23, date: '2024-01-23', product: '产品A', quantity: 8, unit_price: 50, total_amount: 400, region: '华北', channel: '线下' },
    { order_id: 24, date: '2024-01-24', product: '产品C', quantity: 4, unit_price: 150, total_amount: 600, region: '华东', channel: '线上' },
    { order_id: 25, date: '2024-01-25', product: '产品B', quantity: 7, unit_price: 100, total_amount: 700, region: '华南', channel: '线下' }
  ]
};
