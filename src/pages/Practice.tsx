import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Practice {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  codeTemplate: string;
  expectedOutput: string[];
  hints: string[];
}

const practices: Practice[] = [
  {
    id: 1,
    title: "数据清洗练习",
    description: "练习处理缺失值、重复值和异常值",
    difficulty: "入门",
    codeTemplate: `import pandas as pd
import numpy as np

# 模拟数据
data = {
    'id': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    'name': ['Alice', 'Bob', 'Charlie', np.nan, 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'],
    'age': [25, 30, 35, np.nan, 45, 50, 55, 60, 65, 70],
    'salary': [50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000]
}

df = pd.DataFrame(data)

print("原始数据:")
print(df)

# 1. 处理缺失值
# TODO: 填充缺失的name和age

# 2. 检测并删除重复值
# TODO: 添加一个重复行并删除

# 3. 检测并处理异常值
# TODO: 检测并处理salary中的异常值

print("\n处理后的数据:")
print(df)
`,
    expectedOutput: [
      "处理缺失值后的数据集",
      "删除重复值后的数据集",
      "处理异常值后的数据集"
    ],
    hints: [
      "使用fillna()方法填充缺失值",
      "使用duplicated()和drop_duplicates()处理重复值",
      "使用IQR方法检测异常值"
    ]
  },
  {
    id: 2,
    title: "数据可视化练习",
    description: "练习使用Matplotlib和Seaborn创建各种图表",
    difficulty: "进阶",
    codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'WenQuanYi Micro Hei']
plt.rcParams['axes.unicode_minus'] = False

# 模拟数据
np.random.seed(42)
dates = pd.date_range('2024-01-01', periods=12, freq='M')
products = ['产品A', '产品B', '产品C', '产品D']

data = []
for date in dates:
    for product in products:
        sales = np.random.randint(1000, 5000)
        profit = sales * 0.3
        data.append({
            'date': date,
            'product': product,
            'sales': sales,
            'profit': profit
        })

df = pd.DataFrame(data)

print("数据前5行:")
print(df.head())

# 1. 创建销售趋势折线图
# TODO: 按月份绘制销售趋势

# 2. 创建产品销售对比柱状图
# TODO: 绘制各产品的总销售额对比

# 3. 创建销售与利润散点图
# TODO: 绘制销售额与利润的关系

print("图表已生成")
`,
    expectedOutput: [
      "月度销售趋势折线图",
      "产品销售对比柱状图",
      "销售与利润散点图"
    ],
    hints: [
      "使用plt.plot()创建折线图",
      "使用plt.bar()创建柱状图",
      "使用plt.scatter()创建散点图"
    ]
  },
  {
    id: 3,
    title: "统计分析练习",
    description: "练习使用统计方法分析数据",
    difficulty: "进阶",
    codeTemplate: `import pandas as pd
import numpy as np
from scipy import stats

# 数据
data = {
    'advertising': [100, 200, 300, 400, 500, 600, 700, 800],
    'sales': [250, 350, 450, 500, 600, 750, 800, 900]
}

df = pd.DataFrame(data)

print("数据:")
print(df)

# 1. 计算描述性统计
# TODO: 计算均值、标准差等

# 2. 计算相关系数
# TODO: 计算广告和销售的相关系数

# 3. 进行t检验
# TODO: 测试两组数据的差异

print("\n分析结果:")
`,
    expectedOutput: [
      "描述性统计信息",
      "相关系数",
      "t检验结果"
    ],
    hints: [
      "使用df.describe()获取描述性统计",
      "使用df.corr()计算相关系数",
      "使用stats.ttest_ind()进行t检验"
    ]
  },
  {
    id: 4,
    title: "机器学习练习",
    description: "练习使用机器学习算法进行预测",
    difficulty: "高级",
    codeTemplate: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# 数据
np.random.seed(42)
data = {
    'advertising': np.random.randint(100, 1000, 100),
    'sales': np.random.randint(200, 2000, 100)
}

df = pd.DataFrame(data)

print("数据前5行:")
print(df.head())

# 1. 划分训练集和测试集
# TODO: 将数据分为训练集和测试集

# 2. 训练线性回归模型
# TODO: 使用广告数据预测销售额

# 3. 评估模型
# TODO: 计算MSE和R²

print("\n模型评估:")
`,
    expectedOutput: [
      "训练集和测试集的划分",
      "模型训练过程",
      "模型评估结果"
    ],
    hints: [
      "使用train_test_split()划分数据集",
      "使用LinearRegression()创建模型",
      "使用mean_squared_error()和r2_score()评估模型"
    ]
  },
  {
    id: 5,
    title: "时间序列分析练习",
    description: "练习使用时间序列方法进行预测",
    difficulty: "高级",
    codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'WenQuanYi Micro Hei']
plt.rcParams['axes.unicode_minus'] = False

# 数据
dates = pd.date_range('2023-01', periods=24, freq='M')
sales = [1000, 1200, 1500, 1300, 1600, 1800, 2000, 2200, 2500, 2300, 2600, 3000,
         2800, 3200, 3500, 3300, 3700, 3900, 4200, 4500, 4300, 4800, 5000, 5200]

df = pd.DataFrame({'date': dates, 'sales': sales})
df.set_index('date', inplace=True)

print("数据前5行:")
print(df.head())

# 1. 绘制时间序列图
# TODO: 绘制销售趋势图

# 2. 计算移动平均
# TODO: 计算3个月和6个月移动平均

# 3. 预测未来销售
# TODO: 使用简单的方法预测未来3个月的销售

print("\n预测结果:")
`,
    expectedOutput: [
      "时间序列图",
      "移动平均数据",
      "未来销售预测"
    ],
    hints: [
      "使用df.plot()绘制时间序列图",
      "使用df.rolling()计算移动平均",
      "可以使用简单的趋势外推法进行预测"
    ]
  }
];

export default function Practice() {
  const { id } = useParams<{ id: string }>();
  const practice = practices.find(p => p.id === parseInt(id || '0'));
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);

  useEffect(() => {
    if (practice) {
      setCode(practice.codeTemplate);
    }
  }, [practice]);

  // Load Pyodide
  useEffect(() => {
    const loadPyodide = async () => {
      try {
        if (!(window as any).loadPyodide) {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
          script.onload = async () => {
            try {
              const pyodide = await (window as any).loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
              });
              (window as any).pyodide = pyodide;
              await pyodide.loadPackage(['micropip', 'matplotlib', 'scipy', 'scikit-learn']);
              await pyodide.runPythonAsync(`
                import micropip
                await micropip.install('pandas')
                await micropip.install('numpy')
                await micropip.install('matplotlib')
                await micropip.install('seaborn')
                await micropip.install('scikit-learn')
                await micropip.install('statsmodels')
              `);
              setPyodideReady(true);
            } catch (e) {
              console.error('Error loading Pyodide:', e);
            }
          };
          document.body.appendChild(script);
        } else if ((window as any).pyodide) {
          setPyodideReady(true);
        }
      } catch (e) {
        console.error('Failed to initialize Pyodide:', e);
      }
    };
    loadPyodide();
  }, []);

  const runCode = async () => {
    if (!(window as any).pyodide) {
      setOutput('Error: Pyodide not loaded');
      return;
    }
    
    setIsLoading(true);
    setOutput('');
    
    try {
      const pyodide = (window as any).pyodide;
      
      const wrappedCode = `
import sys
from io import StringIO

old_stdout = sys.stdout
sys.stdout = captured_output = StringIO()

try:
${code.split('\n').map(line => '    ' + line).join('\n')}
finally:
    sys.stdout = old_stdout

result = captured_output.getvalue()
result
`;
      
      const result = await pyodide.runPythonAsync(wrappedCode);
      
      // 确保结果不为undefined
      if (result === undefined) {
        setOutput('Code executed successfully');
      } else {
        setOutput(result);
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!practice) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center card-soft p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">练习未找到</h2>
          <Link to="/" className="btn-soft inline-block">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-primary-500 hover:text-primary-600 mb-4 inline-flex items-center gap-2">
            ← 返回首页
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary font-bold text-lg text-white">
              {practice.id}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{practice.title}</h1>
              <p className="text-gray-500 mt-2">{practice.description}</p>
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary-500 text-xs rounded-full mt-2">
                {practice.difficulty}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Practice Info */}
          <div className="lg:col-span-3">
            <div className="card-soft p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 text-primary-500">练习信息</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">练习编号</span>
                  <span className="font-medium">{practice.id}/{practices.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">难度等级</span>
                  <span className="font-medium">{practice.difficulty}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">预计完成时间</span>
                  <span className="font-medium">30-45分钟</span>
                </div>
              </div>
            </div>

            <div className="card-soft p-6 mb-6">
              <h3 className="font-semibold mb-4">预期输出</h3>
              <ul className="space-y-2">
                {practice.expectedOutput.map((output, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary-green mt-1">✓</span>
                    <span className="text-sm text-gray-600">{output}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-soft p-6">
              <h3 className="font-semibold mb-4">提示</h3>
              <ul className="space-y-2">
                {practice.hints.map((hint, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-secondary-yellow mt-1">💡</span>
                    <span className="text-sm text-gray-600">{hint}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Middle Content - Code Editor */}
          <div className="lg:col-span-9">
            <div className="card-soft">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 rounded-full bg-secondary-green"></span>
                  <span className="w-3 h-3 rounded-full bg-secondary-yellow"></span>
                  <span className="w-3 h-3 rounded-full bg-secondary-orange"></span>
                  <span className="ml-2 text-sm">practice.py</span>
                </h2>
                <button
                  onClick={runCode}
                  disabled={isLoading || !pyodideReady}
                  className="btn-soft text-sm px-4 py-2"
                >
                  {isLoading ? '运行中...' : pyodideReady ? '▶ 运行代码' : '加载环境...'}
                </button>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-96 bg-gray-50 text-gray-800 p-4 font-mono text-sm focus:outline-none resize-none border-b border-gray-100"
                spellCheck={false}
              />
              
              <div>
                <div className="px-6 py-3 bg-primary-50 text-sm font-medium text-primary-500 border-b border-gray-100">
                  输出结果
                </div>
                <pre className="bg-gray-50 p-4 h-64 overflow-auto text-sm text-gray-700 whitespace-pre-wrap">
                  {output || '等待运行代码...'}
                </pre>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button className="px-6 py-3 border border-primary-200 rounded-xl font-medium hover:bg-primary-50">
                重置代码
              </button>
              <button className="btn-soft">
                提交练习
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>商务数据分析实战项目平台 · 为商务数据分析与应用专业学生设计</p>
            <p className="mt-2">© 2026 数据分析学院</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
