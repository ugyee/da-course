import { Link } from 'react-router-dom';

interface ProjectProgress {
  id: number;
  title: string;
  completed: boolean;
  progress: number;
  lastAccessed: string;
  score?: number;
}

interface PracticeProgress {
  id: number;
  title: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

interface AssessmentProgress {
  id: number;
  title: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

const projectProgress: ProjectProgress[] = [
  {
    id: 1,
    title: "销售数据清洗与预处理",
    completed: true,
    progress: 100,
    lastAccessed: "2026-04-25",
    score: 92
  },
  {
    id: 2,
    title: "销售业绩多维度分析与可视化",
    completed: true,
    progress: 100,
    lastAccessed: "2026-04-26",
    score: 88
  },
  {
    id: 3,
    title: "客户分群与RFM分析",
    completed: false,
    progress: 60,
    lastAccessed: "2026-04-27"
  },
  {
    id: 4,
    title: "产品销售预测",
    completed: false,
    progress: 0,
    lastAccessed: "-"
  },
  {
    id: 5,
    title: "市场调研数据分析",
    completed: false,
    progress: 0,
    lastAccessed: "-"
  },
  {
    id: 6,
    title: "客户流失预测",
    completed: false,
    progress: 0,
    lastAccessed: "-"
  },
  {
    id: 7,
    title: "A/B测试结果分析",
    completed: false,
    progress: 0,
    lastAccessed: "-"
  },
  {
    id: 8,
    title: "财务报表自动化分析",
    completed: false,
    progress: 0,
    lastAccessed: "-"
  },
  {
    id: 9,
    title: "综合商务智能仪表盘",
    completed: false,
    progress: 0,
    lastAccessed: "-"
  },
  {
    id: 10,
    title: "员工流失分析与预测",
    completed: false,
    progress: 0,
    lastAccessed: "-"
  }
];

const practiceProgress: PracticeProgress[] = [
  {
    id: 1,
    title: "数据清洗练习",
    completed: true,
    score: 85,
    completedAt: "2026-04-25"
  },
  {
    id: 2,
    title: "数据可视化练习",
    completed: true,
    score: 80,
    completedAt: "2026-04-26"
  },
  {
    id: 3,
    title: "统计分析练习",
    completed: false
  },
  {
    id: 4,
    title: "机器学习练习",
    completed: false
  },
  {
    id: 5,
    title: "时间序列分析练习",
    completed: false
  }
];

const assessmentProgress: AssessmentProgress[] = [
  {
    id: 1,
    title: "数据清洗与预处理测评",
    completed: true,
    score: 90,
    completedAt: "2026-04-26"
  },
  {
    id: 2,
    title: "数据可视化测评",
    completed: true,
    score: 85,
    completedAt: "2026-04-27"
  },
  {
    id: 3,
    title: "统计分析测评",
    completed: false
  },
  {
    id: 4,
    title: "机器学习测评",
    completed: false
  }
];

export default function Progress() {
  const totalProgress = projectProgress.reduce((sum, project) => sum + project.progress, 0) / projectProgress.length;
  const completedProjects = projectProgress.filter(p => p.completed).length;
  
  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-primary-500 hover:text-primary-600 mb-4 inline-flex items-center gap-2">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gradient">学习进度</h1>
          <p className="text-gray-500 mt-2">跟踪你的项目完成进度和成就</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall Progress */}
        <div className="card-soft p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">总体进度</h2>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl">
              {Math.round(totalProgress)}%
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary rounded-full" 
                  style={{ width: `${totalProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>已完成 {completedProjects} 个项目</span>
                <span>共 {projectProgress.length} 个项目</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Progress */}
        <div className="card-soft p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">项目进度</h2>
          <div className="space-y-4">
            {projectProgress.map((project) => (
              <div key={project.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <Link to={`/project/${project.id}`} className="font-medium hover:text-primary-500">
                    {project.id}. {project.title}
                  </Link>
                  <div className="flex items-center gap-3">
                    {project.completed ? (
                      <span className="text-secondary-green">✓ 已完成</span>
                    ) : project.progress > 0 ? (
                      <span className="text-primary-500">进行中</span>
                    ) : (
                      <span className="text-gray-400">未开始</span>
                    )}
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-gradient-primary rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{project.score ? `得分: ${project.score}分` : '得分: -'}</span>
                  <span>最后访问: {project.lastAccessed}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Progress */}
        <div className="card-soft p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">练习完成情况</h2>
          <div className="space-y-3">
            {practiceProgress.map((practice) => (
              <div key={practice.id} className="flex items-center justify-between p-3 hover:bg-primary-50 rounded-lg">
                <Link to={`/practice/${practice.id}`} className="font-medium hover:text-primary-500">
                  {practice.title}
                </Link>
                <div className="flex items-center gap-3">
                  {practice.completed ? (
                    <div className="flex items-center gap-2">
                      <span className="text-secondary-green">✓</span>
                      <span className="text-sm">{practice.score}分</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">未完成</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Progress */}
        <div className="card-soft p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">测评完成情况</h2>
          <div className="space-y-3">
            {assessmentProgress.map((assessment) => (
              <div key={assessment.id} className="flex items-center justify-between p-3 hover:bg-primary-50 rounded-lg">
                <Link to={`/assessment/${assessment.id}`} className="font-medium hover:text-primary-500">
                  {assessment.title}
                </Link>
                <div className="flex items-center gap-3">
                  {assessment.completed ? (
                    <div className="flex items-center gap-2">
                      <span className="text-secondary-green">✓</span>
                      <span className="text-sm">{assessment.score}分</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">未完成</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-soft p-6">
          <h2 className="text-xl font-semibold mb-4">最近活动</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 hover:bg-primary-50 rounded-lg">
              <span className="text-secondary-green mt-1">✓</span>
              <div>
                <p className="font-medium">完成了项目1：销售数据清洗与预处理</p>
                <p className="text-sm text-gray-500">2026-04-25 14:30</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 hover:bg-primary-50 rounded-lg">
              <span className="text-secondary-green mt-1">✓</span>
              <div>
                <p className="font-medium">完成了数据清洗与预处理测评</p>
                <p className="text-sm text-gray-500">2026-04-26 10:15</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 hover:bg-primary-50 rounded-lg">
              <span className="text-secondary-green mt-1">✓</span>
              <div>
                <p className="font-medium">完成了项目2：销售业绩多维度分析与可视化</p>
                <p className="text-sm text-gray-500">2026-04-26 16:45</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 hover:bg-primary-50 rounded-lg">
              <span className="text-secondary-green mt-1">✓</span>
              <div>
                <p className="font-medium">完成了数据可视化测评</p>
                <p className="text-sm text-gray-500">2026-04-27 09:45</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 hover:bg-primary-50 rounded-lg">
              <span className="text-primary-500 mt-1">📊</span>
              <div>
                <p className="font-medium">开始项目3：客户分群与RFM分析</p>
                <p className="text-sm text-gray-500">2026-04-27 11:20</p>
              </div>
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
