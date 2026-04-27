# Python商务数据处理基础 - 电商订单数据处理

## 项目概述

本项目面向零基础学习者，通过真实的电商订单数据处理场景，系统性学习Python商务数据处理的核心技能。项目采用模拟的真实电商订单数据集，覆盖Python基础语法和数据处理库的核心功能。

## 环境搭建

### 1. 安装Python
- 访问 [Python官网](https://www.python.org/downloads/) 下载并安装Python 3.8+
- 验证安装：在命令行运行 `python --version`

### 2. 安装必要的库
```bash
pip install pandas numpy matplotlib
```

## 数据集说明

### 模拟电商订单数据集 (ecommerce_orders.csv)

| 字段名 | 数据类型 | 描述 |
|-------|---------|------|
| order_id | 字符串 | 订单编号 |
| customer_id | 字符串 | 客户编号 |
| order_date | 日期 | 下单日期 |
| product_id | 字符串 | 产品编号 |
| product_name | 字符串 | 产品名称 |
| category | 字符串 | 产品类别 |
| quantity | 整数 | 购买数量 |
| unit_price | 浮点数 | 单价 |
| total_amount | 浮点数 | 订单金额 |
| payment_method | 字符串 | 支付方式 |
| shipping_address | 字符串 | 收货地址 |
| order_status | 字符串 | 订单状态 |

## 核心知识点讲解

### 1. Python基础语法

#### 变量与数据类型
```python
# 变量定义
order_id = "ORD001"  # 字符串
quantity = 2  # 整数
unit_price = 99.99  # 浮点数
is_paid = True  # 布尔值

# 数据类型转换
quantity_str = str(quantity)  # 整数转字符串
total = float(quantity) * unit_price  # 计算总金额
```

#### 条件语句
```python
# 条件判断
if total > 100:
    print("订单金额超过100元")
elif total > 50:
    print("订单金额超过50元")
else:
    print("订单金额低于50元")
```

#### 循环结构
```python
# for循环
products = ["手机", "电脑", "平板"]
for product in products:
    print(f"产品: {product}")

# while循环
count = 0
while count < 5:
    print(f"计数: {count}")
    count += 1
```

#### 数据结构
```python
# 列表
product_list = ["手机", "电脑", "平板"]

# 字典
customer_info = {
    "name": "张三",
    "age": 30,
    "email": "zhangsan@example.com"
}

# 元组
order_tuple = ("ORD001", "2024-01-01", 199.98)
```

#### 函数定义与调用
```python
def calculate_total(quantity, price):
    """计算总金额"""
    return quantity * price

# 调用函数
total_amount = calculate_total(2, 99.99)
print(f"总金额: {total_amount}")
```

### 2. pandas库基础

#### 数据读取
```python
import pandas as pd

# 读取CSV文件
df = pd.read_csv('ecommerce_orders.csv')

# 查看数据前5行
print(df.head())
```

#### 数据框操作
```python
# 查看数据基本信息
print(df.info())

# 查看数据统计摘要
print(df.describe())

# 选择特定列
product_names = df['product_name']

# 添加新列
df['discount'] = df['total_amount'] * 0.1
```

#### 数据筛选
```python
# 筛选特定条件的数据
high_value_orders = df[df['total_amount'] > 200]

# 多条件筛选
filtered_orders = df[(df['category'] == '电子产品') & (df['quantity'] > 1)]
```

#### 数据排序
```python
# 按金额排序
sorted_df = df.sort_values('total_amount', ascending=False)

# 多列排序
sorted_df = df.sort_values(['category', 'total_amount'], ascending=[True, False])
```

#### 分组聚合
```python
# 按类别分组计算总销售额
category_sales = df.groupby('category')['total_amount'].sum()

# 多维度分组
grouped = df.groupby(['category', 'payment_method'])['total_amount'].agg(['sum', 'mean', 'count'])
```

### 3. numpy库基础

#### 数值计算
```python
import numpy as np

# 创建数组
quantities = np.array(df['quantity'])
prices = np.array(df['unit_price'])

# 计算总金额
total_amounts = quantities * prices

# 统计计算
mean_amount = np.mean(total_amounts)
max_amount = np.max(total_amounts)
min_amount = np.min(total_amounts)
```

## 实操任务

### 任务1：数据基本探索

**业务目标**：了解数据集的基本情况，包括数据量、字段含义和数据分布。

**实现步骤**：
1. 读取数据集
2. 查看数据基本信息
3. 计算基本统计指标
4. 分析数据分布

**验收标准**：
- 能够正确读取数据集
- 能够输出数据的基本信息
- 能够计算并解释基本统计指标

**代码示例**：
```python
import pandas as pd

# 读取数据
df = pd.read_csv('ecommerce_orders.csv')

# 查看数据基本信息
print("数据形状:", df.shape)
print("\n数据字段:", df.columns.tolist())
print("\n数据基本信息:")
df.info()

# 查看数据前10行
print("\n前10行数据:")
print(df.head(10))

# 计算基本统计指标
print("\n数值型字段统计:")
print(df.describe())

# 分析类别分布
print("\n产品类别分布:")
print(df['category'].value_counts())

print("\n支付方式分布:")
print(df['payment_method'].value_counts())
```

### 任务2：数据清洗与预处理

**业务目标**：处理数据中的缺失值、异常值，确保数据质量。

**实现步骤**：
1. 检查缺失值
2. 处理缺失值
3. 检查并处理异常值
4. 数据类型转换

**验收标准**：
- 能够识别数据中的缺失值
- 能够正确处理缺失值
- 能够识别并处理异常值
- 能够正确转换数据类型

**代码示例**：
```python
import pandas as pd

# 读取数据
df = pd.read_csv('ecommerce_orders.csv')

# 检查缺失值
print("缺失值情况:")
print(df.isnull().sum())

# 处理缺失值（填充或删除）
# 填充缺失值
df['shipping_address'] = df['shipping_address'].fillna('未知地址')

# 删除其他缺失值
df = df.dropna()

# 检查异常值（例如：单价为负数）
anomalies = df[df['unit_price'] < 0]
print("\n异常值:")
print(anomalies)

# 处理异常值
df = df[df['unit_price'] >= 0]

# 转换数据类型
df['order_date'] = pd.to_datetime(df['order_date'])
df['quantity'] = df['quantity'].astype(int)

print("\n数据清洗完成后的形状:", df.shape)
```

### 任务3：销售数据分析

**业务目标**：分析销售数据，了解销售趋势和产品表现。

**实现步骤**：
1. 计算总销售额
2. 分析不同类别的销售情况
3. 分析不同支付方式的使用情况
4. 分析销售趋势

**验收标准**：
- 能够计算总销售额
- 能够分析不同类别的销售情况
- 能够分析不同支付方式的使用情况
- 能够分析销售趋势

**代码示例**：
```python
import pandas as pd

# 读取数据
df = pd.read_csv('ecommerce_orders.csv')

# 计算总销售额
total_sales = df['total_amount'].sum()
print(f"总销售额: ¥{total_sales:.2f}")

# 分析不同类别的销售情况
category_sales = df.groupby('category')['total_amount'].agg(['sum', 'mean', 'count'])
category_sales.columns = ['总销售额', '平均销售额', '订单数']
print("\n各品类销售情况:")
print(category_sales)

# 分析不同支付方式的使用情况
payment_stats = df.groupby('payment_method')['total_amount'].agg(['sum', 'count'])
payment_stats.columns = ['总金额', '订单数']
print("\n各支付方式使用情况:")
print(payment_stats)

# 分析销售趋势
# 转换日期格式
df['order_date'] = pd.to_datetime(df['order_date'])
# 按日期分组
daily_sales = df.groupby(df['order_date'].dt.date)['total_amount'].sum()
print("\n每日销售趋势:")
print(daily_sales)

# 分析Top 10热销产品
top_products = df.groupby('product_name')['total_amount'].sum().sort_values(ascending=False).head(10)
print("\nTop 10热销产品:")
print(top_products)
```

### 任务4：客户行为分析

**业务目标**：分析客户购买行为，了解客户价值和购买习惯。

**实现步骤**：
1. 分析客户购买频次
2. 分析客户购买金额
3. 识别高价值客户
4. 分析客户购买偏好

**验收标准**：
- 能够分析客户购买频次
- 能够分析客户购买金额
- 能够识别高价值客户
- 能够分析客户购买偏好

**代码示例**：
```python
import pandas as pd

# 读取数据
df = pd.read_csv('ecommerce_orders.csv')

# 分析客户购买频次
customer_freq = df.groupby('customer_id')['order_id'].count()
print("\n客户购买频次分布:")
print(customer_freq.value_counts().sort_index())

# 分析客户购买金额
customer_value = df.groupby('customer_id')['total_amount'].agg(['sum', 'mean', 'count'])
customer_value.columns = ['总购买金额', '平均购买金额', '购买次数']
print("\n客户价值分析:")
print(customer_value.sort_values('总购买金额', ascending=False).head(10))

# 识别高价值客户（总购买金额 > 1000）
high_value_customers = customer_value[customer_value['总购买金额'] > 1000]
print(f"\n高价值客户数量: {len(high_value_customers)}")

# 分析客户购买偏好
customer_preferences = df.groupby(['customer_id', 'category'])['total_amount'].sum().reset_index()
# 找出每个客户最偏好的类别
customer_top_category = customer_preferences.loc[customer_preferences.groupby('customer_id')['total_amount'].idxmax()]
print("\n客户购买偏好:")
print(customer_top_category.head(10))
```

### 任务5：数据可视化分析

**业务目标**：通过可视化方式直观展示数据 insights。

**实现步骤**：
1. 安装可视化库
2. 绘制销售趋势图
3. 绘制类别销售分布图
4. 绘制支付方式饼图
5. 绘制客户价值分布图

**验收标准**：
- 能够安装并使用可视化库
- 能够绘制销售趋势图
- 能够绘制类别销售分布图
- 能够绘制支付方式饼图
- 能够绘制客户价值分布图

**代码示例**：
```python
import pandas as pd
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'WenQuanYi Micro Hei']
plt.rcParams['axes.unicode_minus'] = False

# 读取数据
df = pd.read_csv('ecommerce_orders.csv')
df['order_date'] = pd.to_datetime(df['order_date'])

# 1. 销售趋势图
daily_sales = df.groupby(df['order_date'].dt.date)['total_amount'].sum()
plt.figure(figsize=(12, 6))
daily_sales.plot(kind='line', marker='o')
plt.title('每日销售趋势')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.grid(True)
plt.tight_layout()
plt.savefig('sales_trend.png')
print("销售趋势图已保存为 sales_trend.png")

# 2. 类别销售分布图
category_sales = df.groupby('category')['total_amount'].sum()
plt.figure(figsize=(10, 6))
category_sales.plot(kind='bar')
plt.title('各品类销售分布')
plt.xlabel('品类')
plt.ylabel('销售额')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('category_sales.png')
print("品类销售分布图已保存为 category_sales.png")

# 3. 支付方式饼图
payment_sales = df.groupby('payment_method')['total_amount'].sum()
plt.figure(figsize=(8, 8))
plt.pie(payment_sales, labels=payment_sales.index, autopct='%1.1f%%', startangle=90)
plt.title('支付方式分布')
plt.axis('equal')
plt.tight_layout()
plt.savefig('payment_distribution.png')
print("支付方式饼图已保存为 payment_distribution.png")

# 4. 客户价值分布图
customer_value = df.groupby('customer_id')['total_amount'].sum()
plt.figure(figsize=(10, 6))
plt.hist(customer_value, bins=20)
plt.title('客户价值分布')
plt.xlabel('总购买金额')
plt.ylabel('客户数量')
plt.grid(True)
plt.tight_layout()
plt.savefig('customer_value_distribution.png')
print("客户价值分布图已保存为 customer_value_distribution.png")

print("\n所有可视化图表已生成完成！")
```

## 常见错误排查

### 1. 数据读取错误
**错误**：`FileNotFoundError: [Errno 2] No such file or directory: 'ecommerce_orders.csv'`
**解决方案**：确保CSV文件与Python脚本在同一目录，或使用绝对路径。

### 2. 数据类型错误
**错误**：`TypeError: unsupported operand type(s) for *: 'str' and 'float'`
**解决方案**：检查数据类型，确保进行数值计算的列是数值类型。

### 3. 缺失值错误
**错误**：`ValueError: Cannot convert non-finite values (NA or inf) to integer`
**解决方案**：在转换数据类型前处理缺失值。

### 4. 日期格式错误
**错误**：`ParserError: Unknown string format: 2024/01/01`
**解决方案**：指定日期格式，例如：`pd.to_datetime(df['order_date'], format='%Y/%m/%d')`

### 5. 内存不足
**错误**：`MemoryError`
**解决方案**：处理大型数据集时，考虑分块读取或使用更高效的数据处理方式。

## 最佳实践建议

### 1. 代码组织
- 使用函数封装重复的操作
- 添加详细的注释说明代码功能
- 模块化设计，将不同功能分离到不同函数

### 2. 数据处理
- 始终先了解数据结构和质量
- 建立数据清洗的标准流程
- 保留原始数据，创建处理后的副本
- 使用pandas的向量化操作，避免使用Python循环处理大型数据集

### 3. 分析方法
- 从整体到局部，逐步深入分析
- 结合业务背景解读数据结果
- 使用可视化工具直观展示分析结果
- 验证分析结果的合理性

### 4. 性能优化
- 对于大型数据集，使用适当的数据类型减少内存使用
- 避免在循环中修改DataFrame
- 合理使用索引加速数据查询
- 考虑使用Dask等库处理超大型数据集

## 学习成果

通过完成本项目，您将能够：

1. **掌握Python基础语法**：变量、数据类型、条件语句、循环结构、数据结构和函数

2. **熟练使用pandas库**：数据读取、数据框操作、数据筛选、排序和分组聚合

3. **了解numpy库基础**：数值计算和数组操作

4. **独立完成商务数据处理**：
   - 数据读取和基本探索
   - 数据清洗和预处理
   - 销售数据分析
   - 客户行为分析
   - 数据可视化

5. **解决实际业务问题**：
   - 识别销售趋势
   - 分析产品表现
   - 了解客户行为
   - 制定数据驱动的业务决策

## 模拟数据集生成代码

为了方便练习，您可以使用以下代码生成模拟的电商订单数据集：

```python
import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# 生成模拟数据
def generate_ecommerce_data(n=1000):
    # 产品信息
    products = [
        {"id": "P001", "name": "智能手机", "category": "电子产品", "price": 3999.99},
        {"id": "P002", "name": "笔记本电脑", "category": "电子产品", "price": 5999.99},
        {"id": "P003", "name": "平板电脑", "category": "电子产品", "price": 2999.99},
        {"id": "P004", "name": "智能手表", "category": "可穿戴设备", "price": 1299.99},
        {"id": "P005", "name": "无线耳机", "category": "音频设备", "price": 899.99},
        {"id": "P006", "name": "蓝牙音箱", "category": "音频设备", "price": 599.99},
        {"id": "P007", "name": "智能体脂秤", "category": "健康设备", "price": 299.99},
        {"id": "P008", "name": "空气净化器", "category": "家用电器", "price": 1499.99},
        {"id": "P009", "name": "扫地机器人", "category": "家用电器", "price": 2499.99},
        {"id": "P010", "name": "智能摄像头", "category": "安防设备", "price": 399.99}
    ]
    
    # 支付方式
    payment_methods = ["支付宝", "微信支付", "银行卡", "货到付款"]
    
    # 订单状态
    order_statuses = ["已完成", "待付款", "待发货", "已发货", "已取消"]
    
    # 生成数据
    data = []
    start_date = datetime(2024, 1, 1)
    
    for i in range(n):
        # 随机选择产品
        product = random.choice(products)
        quantity = random.randint(1, 5)
        unit_price = product["price"]
        total_amount = quantity * unit_price
        
        # 生成订单日期
        days_offset = random.randint(0, 90)  # 3个月数据
        order_date = start_date + timedelta(days=days_offset)
        
        # 生成客户ID
        customer_id = f"C{random.randint(1000, 9999)}"
        
        # 生成订单ID
        order_id = f"ORD{2024}{i+1:04d}"
        
        # 随机选择支付方式和状态
        payment_method = random.choice(payment_methods)
        order_status = random.choice(order_statuses)
        
        # 生成收货地址
        cities = ["北京", "上海", "广州", "深圳", "杭州", "成都", "武汉", "西安"]
        city = random.choice(cities)
        district = f"{city}市{random.choice(['朝阳区', '海淀区', '浦东新区', '天河区', '南山区'])}"
        shipping_address = f"{district}{random.randint(1, 999)}号"
        
        # 添加到数据列表
        data.append({
            "order_id": order_id,
            "customer_id": customer_id,
            "order_date": order_date.strftime("%Y-%m-%d"),
            "product_id": product["id"],
            "product_name": product["name"],
            "category": product["category"],
            "quantity": quantity,
            "unit_price": unit_price,
            "total_amount": total_amount,
            "payment_method": payment_method,
            "shipping_address": shipping_address,
            "order_status": order_status
        })
    
    # 创建DataFrame
    df = pd.DataFrame(data)
    
    # 保存为CSV文件
    df.to_csv('ecommerce_orders.csv', index=False, encoding='utf-8')
    print(f"生成了 {n} 条模拟数据，保存为 ecommerce_orders.csv")

# 生成数据
generate_ecommerce_data(1000)
```

## 总结

本项目通过真实的电商订单数据处理场景，系统地覆盖了Python商务数据处理的核心技能。从Python基础语法到pandas和numpy库的应用，再到实际的业务分析任务，为零基础学习者提供了一个完整的学习路径。

通过完成五个由易到难的实操任务，您将逐步掌握数据处理的各个环节，最终能够独立完成商务数据的基本读取、清洗和简单统计分析，为后续更复杂的数据分析工作打下坚实的基础。

祝您学习愉快！