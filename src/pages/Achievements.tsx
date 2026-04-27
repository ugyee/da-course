import { Link } from 'react-router-dom';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  total?: number;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: "数据清洗大师",
    description: "完成项目1：销售数据清洗与预处理",
    icon: "🧹",
    unlocked: true,
    unlockedAt: "2026-04-25"
  },
  {
    id: 2,
    title: "可视化专家",
    description: "完成项目2：销售业绩多维度分析与可视化",
    icon: "📊",
    unlocked: true,
    unlockedAt: "2026-04-26"
  },
  {
    id: 3,
    title: "客户分群达人",
    description: "完成项目3：客户分群与RFM分析",
    icon: "👥",
    unlocked: false,
    progress: 6,
    total: 10
  },
  {
    id: 4,
    title: "销售预测专家",
    description: "完成项目4：产品销售预测",
    icon: "🔮",
    unlocked: false
  },
  {
    id: 5,
    title: "市场调研专家",
    description: "完成项目5：市场调研数据分析",
    icon: "📋",
    unlocked: false
  },
  {
    id: 6,
    title: "客户流失预防专家",
    description: "完成项目6：客户流失预测",
    icon: "💡",
    unlocked: false
  },
  {
    id: 7,
    title: "实验设计专家",
    description: "完成项目7：A/B测试结果分析",
    icon: "🧪",
    unlocked: false
  },
  {
    id: 8,
    title: "财务分析专家",
    description: "完成项目8：财务报表自动化分析",
    icon: "💰",
    unlocked: false
  },
  {
    id: 9,
    title: "商务智能专家",
    description: "完成项目9：综合商务智能仪表盘",
    icon: "📈",
    unlocked: false
  },
  {
    id: 10,
    title: "HR分析专家",
    description: "完成项目10：员工流失分析与预测",
    icon: "🏢",
    unlocked: false
  },
  {
    id: 11,
    title: "项目先锋",
    description: "完成前3个项目",
    icon: "🚀",
    unlocked: false,
    progress: 2,
    total: 3
  },
  {
    id: 12,
    title: "练习达人",
    description: "完成5个练习",
    icon: "✏️",
    unlocked: true,
    unlockedAt: "2026-04-26"
  },
  {
    id: 13,
    title: "测评冠军",
    description: "在测评中获得满分",
    icon: "🏆",
    unlocked: false
  },
  {
    id: 14,
    title: "学习先锋",
    description: "连续7天学习",
    icon: "🔥",
    unlocked: true,
    unlockedAt: "2026-04-27"
  },
  {
    id: 15,
    title: "数据科学家",
    description: "完成全部10个项目",
    icon: "🎓",
    unlocked: false,
    progress: 2,
    total: 10
  }
];

export default function Achievements() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = (unlockedCount / totalCount) * 100;
  
  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-primary-500 hover:text-primary-600 mb-4 inline-flex items-center gap-2">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gradient">成就系统</h1>
          <p className="text-gray-500 mt-2">解锁成就，展示你的项目成果</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Achievement Progress */}
        <div className="card-soft p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">成就进度</h2>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl">
              {unlockedCount}/{totalCount}
            </div>
            <div className="flex-1">
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>已解锁 {unlockedCount} 个成就</span>
                <span>共 {totalCount} 个成就</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`card-soft p-6 transition-all duration-300 hover:shadow-md ${achievement.unlocked ? 'border-2 border-secondary-green' : 'border border-gray-200 opacity-70'}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${achievement.unlocked ? 'bg-secondary-green/20 text-secondary-green' : 'bg-gray-100 text-gray-400'}`}>
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                </div>
                {achievement.unlocked ? (
                  <span className="text-secondary-green text-sm font-medium">已解锁</span>
                ) : (
                  <span className="text-gray-400 text-sm font-medium">未解锁</span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{achievement.description}</p>
              {!achievement.unlocked && achievement.progress !== undefined && achievement.total !== undefined && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                    <div 
                      className="h-full bg-primary-500 rounded-full" 
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {achievement.progress}/{achievement.total}
                  </div>
                </div>
              )}
              {achievement.unlocked && achievement.unlockedAt && (
                <div className="text-xs text-gray-500">
                  解锁于: {achievement.unlockedAt}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="card-soft p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">排行榜</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-secondary-yellow flex items-center justify-center font-bold text-white">
                  1
                </span>
                <div>
                  <p className="font-medium">张三</p>
                  <p className="text-xs text-gray-500">解锁 14/15 成就 · 完成 10 个项目</p>
                </div>
              </div>
              <span className="text-secondary-yellow font-bold">1400</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-secondary-gray flex items-center justify-center font-bold text-white">
                  2
                </span>
                <div>
                  <p className="font-medium">李四</p>
                  <p className="text-xs text-gray-500">解锁 12/15 成就 · 完成 8 个项目</p>
                </div>
              </div>
              <span className="text-secondary-gray font-bold">1200</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-secondary-orange flex items-center justify-center font-bold text-white">
                  3
                </span>
                <div>
                  <p className="font-medium">王五</p>
                  <p className="text-xs text-gray-500">解锁 10/15 成就 · 完成 6 个项目</p>
                </div>
              </div>
              <span className="text-secondary-orange font-bold">1000</span>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-primary-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                  4
                </span>
                <div>
                  <p className="font-medium">你</p>
                  <p className="text-xs text-gray-500">解锁 4/15 成就 · 完成 2 个项目</p>
                </div>
              </div>
              <span className="font-bold">400</span>
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
