import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { courses } from '../data/projects';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const course = courses.find(c => c.id === parseInt(id || '0'));
  const [activeModule, setActiveModule] = useState<number | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center card-soft p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">课程未找到</h2>
          <Link to="/courses" className="btn-soft inline-block">返回课程列表</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/courses" className="text-primary-500 hover:text-primary-600 mb-4 inline-flex items-center gap-2">
            ← 返回课程列表
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary font-bold text-lg text-white">
              {course.id}
            </span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
              <p className="text-gray-500 mt-2">{course.description}</p>
              <span className="inline-block px-3 py-1 bg-primary-50 text-primary-500 text-xs rounded-full mt-2">
                {course.level}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Course Navigation */}
          <div className="lg:col-span-3">
            <div className="card-soft p-6 mb-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4 text-primary-500">课程导航</h2>
              <nav className="space-y-2">
                {course.modules.map((module) => (
                  <div key={module.id} className="mb-4">
                    <button
                      onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                      className="flex items-center justify-between w-full text-left px-4 py-3 rounded-xl transition-all duration-300 hover:bg-primary-50 hover:text-primary-500"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-500 text-xs font-medium">
                          {module.id}
                        </span>
                        <span>{module.title}</span>
                      </span>
                      <span className={`transition-transform ${activeModule === module.id ? 'transform rotate-180' : ''}`}>
                        ▼
                      </span>
                    </button>
                    {activeModule === module.id && (
                      <div className="ml-8 mt-2 space-y-2">
                        {module.lessons.map((lesson) => (
                          <a
                            key={lesson.id}
                            href={`#lesson-${lesson.id}`}
                            className="block px-4 py-2 text-sm hover:bg-primary-50 rounded-lg hover:text-primary-500"
                          >
                            {lesson.id}. {lesson.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Course Info */}
            <div className="card-soft p-6">
              <h3 className="font-semibold mb-4">课程信息</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">课程编号</span>
                  <span className="font-medium">{course.id}/8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">难度等级</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">模块数量</span>
                  <span className="font-medium">{course.modules.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">课时数量</span>
                  <span className="font-medium">{course.modules.reduce((total, module) => total + module.lessons.length, 0)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content - Course Content */}
          <div className="lg:col-span-9">
            {course.modules.map((module) => (
              <section key={module.id} className="card-soft p-6 mb-8">
                <h2 className="text-xl font-semibold mb-6 text-primary-500 flex items-center gap-2">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-500 font-bold">
                    {module.id}
                  </span>
                  {module.title}
                </h2>

                <div className="space-y-6">
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} id={`lesson-${lesson.id}`} className="border-l-2 border-primary-200 pl-4 py-4">
                      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-500 text-white text-xs font-bold">
                          {lesson.id}
                        </span>
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{lesson.content}</p>
                      <div className="flex items-center gap-4">
                        <button className="btn-soft text-sm px-4 py-2">
                          开始学习
                        </button>
                        <button className="px-4 py-2 border border-primary-200 rounded-xl font-medium hover:bg-primary-50 text-sm">
                          查看练习
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between">
          {parseInt(id || '0') > 1 && (
            <Link
              to={`/course/${parseInt(id || '0') - 1}`}
              className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
            >
              ← 上一门课程
            </Link>
          )}
          <div className="flex-1"></div>
          {parseInt(id || '0') < courses.length && (
            <Link
              to={`/course/${parseInt(id || '0') + 1}`}
              className="flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
            >
              下一门课程 →
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>商务数据分析在线教育平台 · 为商务数据分析与应用专业学生设计</p>
            <p className="mt-2">© 2026 数据分析学院</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
