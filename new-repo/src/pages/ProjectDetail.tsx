import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import { Project } from '../types/project';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find(p => p.id === parseInt(id || '0'));
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (project) {
      setCode(project.codeTemplate);
    }
  }, [project]);

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
      
      pyodide.globals.set('print_output', '');
      
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

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    if (!project || !project.multipleChoiceQuestions) return;
    
    let correctCount = 0;
    project.multipleChoiceQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    const totalQuestions = project.multipleChoiceQuestions.length;
    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setScore(null);
    setSubmitted(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center card-soft p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">项目未找到</h2>
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
            ← 返回项目列表
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary font-bold text-lg text-white">
              {project.id}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{project.title}</h1>
              <p className="text-gray-500 mt-2">{project.description}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-3">
            <div className="card-soft p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 text-primary-500">项目导航</h2>
              <nav className="space-y-2">
                <Link to="#dataset" className="nav-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                    <line x1="3" x2="21" y1="9" y2="9"/>
                    <line x1="9" x2="9" y1="21" y2="9"/>
                  </svg>
                  <span>数据集说明</span>
                </Link>
                <Link to="#code" className="nav-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                  <span>代码编辑器</span>
                </Link>
                <Link to="#results" className="nav-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>预期结果</span>
                </Link>
                <Link to="#tasks" className="nav-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="16 11 12 15 8 11"/>
                  </svg>
                  <span>进阶任务</span>
                </Link>
              </nav>
            </div>

            {/* Project Info */}
            <div className="card-soft p-6">
              <h3 className="font-semibold mb-4">项目信息</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">项目编号</span>
                  <span className="font-medium">{project.id}/10</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">难度等级</span>
                  <span className="font-medium">
                    {parseInt(id || '0') < 4 ? '入门' : parseInt(id || '0') < 8 ? '进阶' : '高级'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">技能覆盖</span>
                  <span className="font-medium">{project.title.includes('数据') ? '数据分析' : '其他'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content */}
          <div className="lg:col-span-6">
            {/* Dataset Section */}
            <section id="dataset" className="card-soft p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-primary-500 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <line x1="3" x2="21" y1="9" y2="9"/>
                  <line x1="9" x2="9" y1="21" y2="9"/>
                </svg>
                数据集说明
              </h2>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">文件名:</p>
                <code className="bg-primary-50 text-primary-500 px-3 py-1 rounded text-sm">{project.dataset.filename}</code>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">字段说明:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-primary-50">
                        <th className="text-left py-3 px-4 text-primary-500">字段名</th>
                        <th className="text-left py-3 px-4 text-primary-500">含义</th>
                        <th className="text-left py-3 px-4 text-primary-500">类型</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.dataset.fields.map((field, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-primary-50/50">
                          <td className="py-3 px-4 font-mono text-primary-500">{field.name}</td>
                          <td className="py-3 px-4 text-gray-700">{field.meaning}</td>
                          <td className="py-3 px-4 text-secondary-green font-medium">{field.type}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-3">示例数据:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 bg-primary-50">
                        {project.dataset.sampleData[0].map((header, i) => (
                          <th key={i} className="text-left py-2 px-3 text-primary-500 text-xs font-medium">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {project.dataset.sampleData.slice(1).map((row, i) => (
                        <tr key={i} className="border-b border-gray-100 hover:bg-primary-50/30">
                          {row.map((cell, j) => (
                            <td key={j} className="py-2 px-3 text-gray-600 text-xs">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Expected Results Section */}
            <section id="results" className="card-soft p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-primary-500 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                预期结果
              </h2>
              <ul className="space-y-3">
                {project.expectedResults.map((result, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg">
                    <span className="text-secondary-green mt-1">✓</span>
                    <span className="text-gray-700">{result}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Advanced Tasks Section */}
            <section id="tasks" className="card-soft p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-primary-500 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="16 11 12 15 8 11"/>
                </svg>
                进阶练习任务
              </h2>
              <ul className="space-y-4">
                {project.advancedTasks.map((task, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 bg-gradient-soft rounded-xl">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm text-primary-500 font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Multiple Choice Questions Section */}
            {project.multipleChoiceQuestions && project.multipleChoiceQuestions.length > 0 && (
              <section id="quiz" className="card-soft p-6">
                <h2 className="text-xl font-semibold mb-6 text-primary-500 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10h-6M21 6h-6M21 14h-6M21 18h-6M9 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-6"/>
                  </svg>
                  知识测验
                </h2>
                
                {/* Score Display */}
                {submitted && score !== null && (
                  <div className="mb-6 p-4 bg-gradient-soft rounded-lg text-center">
                    <h3 className="text-lg font-semibold mb-2">测验结果</h3>
                    <div className="text-3xl font-bold text-primary-500 mb-2">{score}分</div>
                    <p className="text-gray-600">
                      共{project.multipleChoiceQuestions.length}题，答对{Math.round((score / 100) * project.multipleChoiceQuestions.length)}题
                    </p>
                    <button 
                      onClick={resetQuiz} 
                      className="mt-4 px-4 py-2 bg-white border border-primary-200 rounded-lg text-primary-500 hover:bg-primary-50 transition-colors"
                    >
                      重新测验
                    </button>
                  </div>
                )}
                
                <div className="space-y-6">
                  {project.multipleChoiceQuestions.map((q, i) => (
                    <div key={q.id} className="p-4 bg-primary-50 rounded-lg">
                      <p className="font-medium mb-4">{i + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, j) => {
                          const isSelected = answers[q.id] === option;
                          const isCorrect = option === q.correctAnswer;
                          const isWrong = submitted && isSelected && !isCorrect;
                          
                          return (
                            <div key={j} className={`flex items-center gap-3 ${submitted ? (isCorrect ? 'bg-secondary-green/10' : isWrong ? 'bg-secondary-orange/10' : '') : ''} p-2 rounded`}>
                              <input 
                                type="radio" 
                                id={`q${q.id}_${j}`} 
                                name={`q${q.id}`} 
                                value={option}
                                checked={isSelected}
                                onChange={() => handleAnswerChange(q.id, option)}
                                disabled={submitted}
                                className={`w-4 h-4 ${isCorrect ? 'text-secondary-green' : isWrong ? 'text-secondary-orange' : 'text-primary-500'}`}
                              />
                              <label htmlFor={`q${q.id}_${j}`} className={`text-gray-700 ${isCorrect ? 'font-medium' : ''}`}>
                                {option}
                                {submitted && isCorrect && <span className="ml-2 text-secondary-green">✓</span>}
                                {submitted && isWrong && <span className="ml-2 text-secondary-orange">✗</span>}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      {submitted && q.explanation && (
                        <div className="mt-4 p-3 bg-secondary-green/10 text-secondary-green text-sm rounded">
                          <strong>解析:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                  {!submitted && (
                    <div className="flex justify-center mt-6">
                      <button 
                        onClick={handleSubmitQuiz}
                        className="btn-soft px-8 py-3"
                      >
                        提交答案
                      </button>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Sidebar - Code Editor */}
          <div className="lg:col-span-3">
            <div id="code" className="card-soft sticky top-24">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-semibold flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 rounded-full bg-secondary-green"></span>
                  <span className="w-3 h-3 rounded-full bg-secondary-yellow"></span>
                  <span className="w-3 h-3 rounded-full bg-secondary-orange"></span>
                  <span className="ml-2 text-sm">code.py</span>
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
                className="w-full h-80 bg-gray-50 text-gray-800 p-4 font-mono text-sm focus:outline-none resize-none border-b border-gray-100"
                spellCheck={false}
              />
              
              <div>
                <div className="px-6 py-3 bg-primary-50 text-sm font-medium text-primary-500 border-b border-gray-100">
                  输出结果
                </div>
                <pre className="bg-gray-50 p-4 h-48 overflow-auto text-sm text-gray-700 whitespace-pre-wrap">
                  {output || '等待运行代码...'}
                </pre>
              </div>
            </div>
            
            <div className="card-soft p-4 mt-6">
              <p className="text-sm text-gray-600">
                💡 提示: 代码会在浏览器中直接运行，使用Pyodide技术。无需安装任何环境！
              </p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between">
          {parseInt(id || '0') > 1 && (
            <Link
              to={`/project/${parseInt(id || '0') - 1}`}
              className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
            >
              ← 上一个项目
            </Link>
          )}
          <div className="flex-1"></div>
          {parseInt(id || '0') < projects.length && (
            <Link
              to={`/project/${parseInt(id || '0') + 1}`}
              className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
            >
              下一个项目 →
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>使用现代Web技术构建 · 支持浏览器直接运行Python代码</p>
            <p className="mt-2">© 2026 Python数据分析实战平台</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
