import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

export default function Home() {
  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <span className="text-xl font-bold text-gradient">数据分析学院</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="font-medium text-primary-500">首页</Link>
              <Link to="/progress" className="font-medium hover:text-primary-500 transition-colors">学习进度</Link>
              <Link to="/achievements" className="font-medium hover:text-primary-500 transition-colors">成就系统</Link>
              <Link to="/project/1" className="btn-soft text-sm">开始学习</Link>
            </nav>
            <button className="md:hidden text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="12" y2="12"/>
                <line x1="3" x2="21" y1="6" y2="6"/>
                <line x1="3" x2="21" y1="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-3">
            <div className="card-soft p-6">
              <h2 className="text-lg font-semibold mb-6 text-primary-500">学习导航</h2>
              <nav className="space-y-2">
                <Link to="/" className="nav-item active">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  <span>首页</span>
                </Link>
                <Link to="/progress" className="nav-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 20V4"/>
                    <path d="M12 20V10"/>
                    <path d="M6 20v-6"/>
                  </svg>
                  <span>学习进度</span>
                </Link>
                <Link to="/achievements" className="nav-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m12 8-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
                  </svg>
                  <span>成就系统</span>
                </Link>
                <Link to="/" className="nav-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" x2="8" y1="13" y2="13"/>
                    <line x1="16" x2="8" y1="17" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                  <span>学习资源</span>
                </Link>
                <Link to="/" className="nav-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                  <span>关于我们</span>
                </Link>
              </nav>
            </div>

            {/* Progress Card */}
            <div className="card-soft p-6 mt-6">
              <h3 className="font-semibold mb-4">学习进度</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>完成项目</span>
                    <span>0/10</span>
                  </div>
                  <div className="w-full bg-primary-100 rounded-full h-2.5">
                    <div className="bg-gradient-primary h-2.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>完成练习</span>
                    <span>0/10</span>
                  </div>
                  <div className="w-full bg-primary-100 rounded-full h-2.5">
                    <div className="bg-gradient-primary h-2.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>解锁成就</span>
                    <span>0/10</span>
                  </div>
                  <div className="w-full bg-primary-100 rounded-full h-2.5">
                    <div className="bg-gradient-primary h-2.5 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content */}
          <div className="lg:col-span-9">
            {/* Hero Section */}
            <div className="card-soft p-8 mb-8 relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent -z-10"></div>
              
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-4 text-gradient">
                    商务数据分析<br/>
                    <span className="text-primary-500">实战项目平台</span>
                  </h1>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    为商务数据分析与应用专业学生设计的完整实战体系，
                    包含10个精心设计的项目、练习、测评和成就系统，
                    助你成为数据分析专家。从基础到高级，全面掌握数据分析技能。
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/project/1" className="btn-soft">开始学习</Link>
                    <Link to="/" className="px-6 py-3 border border-primary-200 rounded-xl font-medium transition-all duration-300 hover:bg-primary-50">
                      了解项目体系
                    </Link>
                  </div>
                  
                  {/* Features */}
                  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                      <span className="text-2xl mb-2">📊</span>
                      <span className="text-sm font-medium">10个项目</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                      <span className="text-2xl mb-2">✏️</span>
                      <span className="text-sm font-medium">实践练习</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                      <span className="text-2xl mb-2">📝</span>
                      <span className="text-sm font-medium">测评系统</span>
                    </div>
                    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm">
                      <span className="text-2xl mb-2">🏆</span>
                      <span className="text-sm font-medium">成就系统</span>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="relative">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20business%20data%20analysis%20dashboard%20with%20charts%20and%20graphs%20professional%20design&image_size=landscape_16_9" 
                        alt="商务数据分析" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-3xl">📊</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="card-soft p-6 text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-500 text-2xl font-bold">10</span>
                </div>
                <h3 className="font-semibold">实训项目</h3>
                <p className="text-sm text-gray-500">从入门到高级</p>
              </div>
              <div className="card-soft p-6 text-center">
                <div className="w-12 h-12 bg-secondary-green/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-700 text-2xl font-bold">50+</span>
                </div>
                <h3 className="font-semibold">实践练习</h3>
                <p className="text-sm text-gray-500">真实业务场景</p>
              </div>
              <div className="card-soft p-6 text-center">
                <div className="w-12 h-12 bg-secondary-yellow/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-gray-700 text-2xl font-bold">10</span>
                </div>
                <h3 className="font-semibold">成就徽章</h3>
                <p className="text-sm text-gray-500">激励学习进度</p>
              </div>
            </div>

            {/* Testimonials */}
            <div className="card-soft p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-center">学员反馈</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-xl">👨‍🎓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">张三</h4>
                      <p className="text-sm text-gray-500">商务数据分析专业学生</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    这个平台的课程非常实用，从基础到高级都有覆盖，而且练习和测评系统帮助我巩固了所学知识。成就系统也很有趣，让学习更有动力。
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-xl">👩‍🎓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">李四</h4>
                      <p className="text-sm text-gray-500">商务数据分析专业学生</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    课程内容很贴合实际业务场景，老师讲解清晰，练习题目也很有针对性。通过这个平台，我的数据分析能力有了很大提升。
                  </p>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <h2 className="text-2xl font-bold mb-6 text-center">实训项目</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {projects.map((project) => (
                <Link to={`/project/${project.id}`} key={project.id} className="card-soft group hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-500 text-2xl">
                        {project.id}
                      </span>
                      <div>
                        <h3 className="font-semibold">{project.title}</h3>
                        <span className="text-xs text-gray-500">
                          {project.id < 4 ? '入门' : project.id < 8 ? '进阶' : '高级'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">数据集: {project.dataset.filename}</span>
                      <span className="text-primary-500 group-hover:underline">查看详情 →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Practice Section */}
            <h2 className="text-2xl font-bold mb-6 text-center">实践练习</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[
                { id: 1, title: "数据清洗练习", description: "练习处理缺失值、重复值和异常值", difficulty: "入门" },
                { id: 2, title: "数据可视化练习", description: "练习使用Matplotlib和Seaborn创建各种图表", difficulty: "进阶" },
                { id: 3, title: "统计分析练习", description: "练习使用统计方法分析数据", difficulty: "进阶" },
                { id: 4, title: "机器学习练习", description: "练习使用机器学习算法进行预测", difficulty: "高级" },
                { id: 5, title: "时间序列分析练习", description: "练习使用时间序列方法进行预测", difficulty: "高级" }
              ].map((practice) => (
                <Link to={`/practice/${practice.id}`} key={practice.id} className="card-soft group hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-green/20 text-secondary-green text-2xl">
                        {practice.id}
                      </span>
                      <div>
                        <h3 className="font-semibold">{practice.title}</h3>
                        <span className="text-xs text-gray-500">
                          {practice.difficulty}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {practice.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">难度: {practice.difficulty}</span>
                      <span className="text-primary-500 group-hover:underline">开始练习 →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Assessment Section */}
            <h2 className="text-2xl font-bold mb-6 text-center">测评</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { id: 1, title: "数据清洗与预处理测评", duration: "60分钟" },
                { id: 2, title: "数据可视化测评", duration: "45分钟" },
                { id: 3, title: "统计分析测评", duration: "50分钟" },
                { id: 4, title: "机器学习测评", duration: "60分钟" }
              ].map((assessment) => (
                <Link to={`/assessment/${assessment.id}`} key={assessment.id} className="card-soft group hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-yellow/20 text-secondary-yellow text-2xl">
                        {assessment.id}
                      </span>
                      <div>
                        <h3 className="font-semibold">{assessment.title}</h3>
                        <span className="text-xs text-gray-500">
                          {assessment.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">时长: {assessment.duration}</span>
                      <span className="text-primary-500 group-hover:underline">开始测评 →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Call to Action */}
            <div className="card-soft p-8 bg-gradient-soft text-center">
              <h2 className="text-2xl font-bold mb-4">准备好开始你的数据分析之旅了吗？</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                加入我们的商务数据分析实战项目平台，从零基础到专业，全面掌握数据分析技能，为你的职业发展打下坚实基础。
              </p>
              <Link to="/project/1" className="btn-soft">
                立即开始学习
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📊</span>
                <span className="text-xl font-bold text-gradient">数据分析学院</span>
              </div>
              <p className="text-gray-600 text-sm">
                为商务数据分析与应用专业学生设计的在线实战平台，提供完整的项目体系和实践机会。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">学习资源</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-600 hover:text-primary-500">项目体系</Link></li>
                <li><Link to="/progress" className="text-gray-600 hover:text-primary-500">学习进度</Link></li>
                <li><Link to="/achievements" className="text-gray-600 hover:text-primary-500">成就系统</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-primary-500">学习资源</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">关于我们</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-600 hover:text-primary-500">平台介绍</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-primary-500">师资团队</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-primary-500">联系我们</Link></li>
                <li><Link to="/" className="text-gray-600 hover:text-primary-500">常见问题</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">联系方式</h3>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-600">邮箱: contact@data-analysis.edu</li>
                <li className="text-gray-600">电话: 400-123-4567</li>
                <li className="text-gray-600">地址: 北京市海淀区中关村</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2026 数据分析学院. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
