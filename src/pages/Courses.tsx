import { Link } from 'react-router-dom';
import { courses } from '../data/projects';

export default function Courses() {
  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-primary-500 hover:text-primary-600 mb-4 inline-flex items-center gap-2">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gradient">课程体系</h1>
          <p className="text-gray-500 mt-2">为商务数据分析与应用专业学生设计的完整课程体系</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Levels */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-6 py-2 bg-gradient-primary text-white rounded-xl font-medium">
            全部课程
          </button>
          <button className="px-6 py-2 border border-primary-200 rounded-xl font-medium hover:bg-primary-50">
            入门课程
          </button>
          <button className="px-6 py-2 border border-primary-200 rounded-xl font-medium hover:bg-primary-50">
            进阶课程
          </button>
          <button className="px-6 py-2 border border-primary-200 rounded-xl font-medium hover:bg-primary-50">
            高级课程
          </button>
        </div>

        {/* Course List */}
        <div className="space-y-8">
          {courses.map((course) => (
            <div key={course.id} className="card-soft p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary font-bold text-lg text-white">
                    {course.id}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {course.description}
                    </p>
                    <span className="px-3 py-1 bg-primary-50 text-primary-500 text-xs rounded-full">
                      {course.level}
                    </span>
                  </div>
                </div>
                <Link to={`/course/${course.id}`} className="btn-soft text-sm px-4 py-2">
                  查看详情
                </Link>
              </div>

              {/* Modules */}
              <div className="space-y-4 ml-16">
                {course.modules.map((module) => (
                  <div key={module.id} className="border-l-2 border-primary-200 pl-4 py-2">
                    <h4 className="font-semibold mb-2">{module.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-2 p-2 hover:bg-primary-50 rounded-lg">
                          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary-100 text-primary-500 text-xs font-medium">
                            {lesson.id}
                          </span>
                          <span className="text-sm">{lesson.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
