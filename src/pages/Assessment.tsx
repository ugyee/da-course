import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

interface Question {
  id: number;
  type: 'multiple-choice' | 'coding';
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  codeTemplate?: string;
  expectedOutput?: string;
}

interface Assessment {
  id: number;
  title: string;
  description: string;
  duration: string;
  questions: Question[];
}

const assessments: Assessment[] = [
  {
    id: 1,
    title: "数据清洗与预处理测评",
    description: "测试你对数据清洗和预处理的理解",
    duration: "60分钟",
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "以下哪种方法不是处理缺失值的常用方法？",
        options: ["删除包含缺失值的行", "使用均值填充", "使用中位数填充", "使用随机数填充"],
        correctAnswer: "使用随机数填充"
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: "IQR方法用于检测什么？",
        options: ["缺失值", "重复值", "异常值", "数据类型错误"],
        correctAnswer: "异常值"
      },
      {
        id: 3,
        type: 'coding',
        question: "编写代码处理以下数据中的缺失值和异常值",
        codeTemplate: `import pandas as pd
import numpy as np

# 数据
data = {
    'name': ['Alice', 'Bob', 'Charlie', np.nan, 'Eve'],
    'age': [25, 30, 35, np.nan, 45],
    'salary': [50000, 60000, 70000, 1000000, 90000]
}

df = pd.DataFrame(data)

# 1. 处理缺失值
# TODO: 填充缺失的name和age

# 2. 处理异常值
# TODO: 检测并处理salary中的异常值

print("处理后的数据:")
print(df)
`,
        expectedOutput: "处理后的数据集，包含填充的缺失值和处理后的异常值"
      }
    ]
  },
  {
    id: 2,
    title: "数据可视化测评",
    description: "测试你对数据可视化的理解和应用能力",
    duration: "45分钟",
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "以下哪种图表最适合显示时间序列数据？",
        options: ["柱状图", "折线图", "饼图", "散点图"],
        correctAnswer: "折线图"
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: "Seaborn库是基于哪个库构建的？",
        options: ["Matplotlib", "Pandas", "NumPy", "SciPy"],
        correctAnswer: "Matplotlib"
      },
      {
        id: 3,
        type: 'coding',
        question: "使用Matplotlib创建一个销售趋势折线图",
        codeTemplate: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'WenQuanYi Micro Hei']
plt.rcParams['axes.unicode_minus'] = False

# 数据
dates = pd.date_range('2024-01', periods=12, freq='M')
sales = [1000, 1200, 1500, 1300, 1600, 1800, 2000, 2200, 2500, 2300, 2600, 3000]

# TODO: 创建销售趋势折线图
# 1. 创建图形
# 2. 绘制折线
# 3. 添加标题和标签
# 4. 显示图表

print("图表已生成")
`,
        expectedOutput: "销售趋势折线图，包含标题、x轴和y轴标签"
      }
    ]
  },
  {
    id: 3,
    title: "统计分析测评",
    description: "测试你对统计分析方法的理解和应用能力",
    duration: "50分钟",
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "以下哪种方法用于衡量两个变量之间的线性关系？",
        options: ["标准差", "相关系数", "方差", "均值"],
        correctAnswer: "相关系数"
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: "t检验用于什么？",
        options: ["比较两个样本的均值差异", "比较两个样本的方差差异", "检测异常值", "处理缺失值"],
        correctAnswer: "比较两个样本的均值差异"
      },
      {
        id: 3,
        type: 'coding',
        question: "计算两个变量之间的相关系数",
        codeTemplate: `import pandas as pd
import numpy as np
from scipy import stats

# 数据
data = {
    'advertising': [100, 200, 300, 400, 500, 600, 700, 800],
    'sales': [250, 350, 450, 500, 600, 750, 800, 900]
}

df = pd.DataFrame(data)

# TODO: 计算相关系数
# 1. 计算皮尔逊相关系数
# 2. 打印结果

print("相关系数:")
`,
        expectedOutput: "广告和销售之间的相关系数"
      }
    ]
  },
  {
    id: 4,
    title: "机器学习测评",
    description: "测试你对机器学习基础的理解和应用能力",
    duration: "60分钟",
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: "以下哪个算法用于分类问题？",
        options: ["线性回归", "K-均值聚类", "逻辑回归", "主成分分析"],
        correctAnswer: "逻辑回归"
      },
      {
        id: 2,
        type: 'multiple-choice',
        question: "训练集和测试集的主要区别是什么？",
        options: ["数据量大小不同", "训练集用于训练模型，测试集用于评估模型性能", "数据来源不同", "没有区别"],
        correctAnswer: "训练集用于训练模型，测试集用于评估模型性能"
      },
      {
        id: 3,
        type: 'coding',
        question: "使用scikit-learn构建一个简单的分类模型",
        codeTemplate: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# 数据
np.random.seed(42)
data = {
    'age': np.random.randint(18, 70, 100),
    'income': np.random.randint(30000, 120000, 100),
    'spending_score': np.random.randint(1, 100, 100)
}
df = pd.DataFrame(data)

# 创建目标变量：根据消费评分判断是否为高价值客户
df['high_value'] = (df['spending_score'] > 70).astype(int)

# TODO: 构建分类模型
# 1. 划分训练集和测试集
# 2. 训练逻辑回归模型
# 3. 预测并计算准确率

print("模型准确率:")
`,
        expectedOutput: "模型在测试集上的准确率"
      }
    ]
  }
];

export default function Assessment() {
  const { id } = useParams<{ id: string }>();
  const assessment = assessments.find(a => a.id === parseInt(id || '0'));
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

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

  const handleMultipleChoiceChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleSubmit = () => {
    if (!assessment) return;
    
    let totalScore = 0;
    const totalQuestions = assessment.questions.length;
    
    assessment.questions.forEach(question => {
      if (question.type === 'multiple-choice') {
        if (answers[question.id] === question.correctAnswer) {
          totalScore++;
        }
      } else if (question.type === 'coding') {
        // For coding questions, we'll assume it's correct if code runs without errors
        // In a real system, we would have more sophisticated grading
        if (output && !output.includes('Error:')) {
          totalScore++;
        }
      }
    });
    
    setScore(totalScore);
    setSubmitted(true);
  };

  if (!assessment) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center card-soft p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">测评未找到</h2>
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
              {assessment.id}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{assessment.title}</h1>
              <p className="text-gray-500 mt-2">{assessment.description}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="inline-block px-3 py-1 bg-primary-50 text-primary-500 text-xs rounded-full">
                  {assessment.duration}
                </span>
                <span className="inline-block px-3 py-1 bg-primary-50 text-primary-500 text-xs rounded-full">
                  {assessment.questions.length} 题
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {submitted ? (
          <div className="card-soft p-8 text-center">
            <div className="w-24 h-24 mx-auto bg-secondary-green/20 rounded-full flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-secondary-green">{score}</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">测评完成！</h2>
            <p className="text-gray-600 mb-6">你答对了 {score} 题，共 {assessment.questions.length} 题</p>
            <div className="flex justify-center gap-4">
              <Link to="/" className="btn-soft">返回首页</Link>
              <Link to={`/assessment/${assessment.id}`} className="px-6 py-3 border border-primary-200 rounded-xl font-medium hover:bg-primary-50">
                重新测评
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {assessment.questions.map((question, index) => (
              <div key={question.id} className="card-soft p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-500 text-white font-bold">
                    {index + 1}
                  </span>
                  {question.question}
                </h3>
                
                {question.type === 'multiple-choice' && (
                  <div className="space-y-2">
                    {question.options?.map((option, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input
                          type="radio"
                          id={`q${question.id}_${i}`}
                          name={`q${question.id}`}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={() => handleMultipleChoiceChange(question.id, option)}
                          className="w-4 h-4 text-primary-500"
                        />
                        <label htmlFor={`q${question.id}_${i}`} className="text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
                
                {question.type === 'coding' && (
                  <div>
                    <div className="mb-4">
                      <textarea
                        value={code}
                        onChange={(e) => handleCodeChange(e.target.value)}
                        className="w-full h-64 bg-gray-50 text-gray-800 p-4 font-mono text-sm focus:outline-none resize-none rounded-lg border border-gray-200"
                        spellCheck={false}
                      />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <button
                        onClick={runCode}
                        disabled={isLoading || !pyodideReady}
                        className="btn-soft text-sm px-4 py-2"
                      >
                        {isLoading ? '运行中...' : pyodideReady ? '▶ 运行代码' : '加载环境...'}
                      </button>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary-500 mb-2">输出结果</div>
                      <pre className="bg-gray-50 p-4 h-32 overflow-auto text-sm text-gray-700 whitespace-pre-wrap rounded-lg border border-gray-200">
                        {output || '等待运行代码...'}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="btn-soft px-8 py-3"
              >
                提交测评
              </button>
            </div>
          </div>
        )}
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
