import React from 'react'
import openspecStudioImg from '../assets/projects/openspec-studio.svg'
import antigravityIdeImg from '../assets/projects/antigravity-ide.svg'
import synapseEngineImg from '../assets/projects/synapse-engine.svg'
import cyberlensImg from '../assets/projects/cyberlens-telemetry.svg'

export interface ProjectItem {
  id: string
  title: string
  category: string
  insights: string
  tags: readonly string[]
  image: string
  githubUrl: string
}

export const FEATURED_PROJECTS: readonly ProjectItem[] = [
  {
    id: 'project-openspec-studio',
    title: 'OpenSpec Agent Studio',
    category: 'AI Architecture & Governance',
    insights:
      '基于 Spec-Driven 规范驱动研发协议栈，将自然语言需求编译为可机器执行、自校验的三维规格契约与分步闭环实施流。',
    tags: ['TypeScript', 'React 19', 'OpenSpec', 'Agentic Workflow'],
    image: openspecStudioImg,
    githubUrl: 'https://github.com/zhouliang/openspec-agent-studio',
  },
  {
    id: 'project-antigravity-ide',
    title: 'Antigravity Next IDE',
    category: 'Developer Tools & Cloud AI',
    insights:
      '面向大模型深度结对编程的高吞吐云端工作台，集成上下文感知、多工具调度与低延迟 MCP 会话分流架构。',
    tags: ['Electron', 'Vite', 'Rust', 'MCP Protocol'],
    image: antigravityIdeImg,
    githubUrl: 'https://github.com/zhouliang/antigravity-next-ide',
  },
  {
    id: 'project-synapse-engine',
    title: 'Synapse Vector Engine',
    category: 'Data Infrastructure & RAG',
    insights:
      '超低延迟分布式多模态向量知识检索引擎，采用 HNSW 索引图算法与零拷贝内存映射，满足千万级嵌入极速检索。',
    tags: ['Go', 'SIMD', 'Vector Search', 'gRPC'],
    image: synapseEngineImg,
    githubUrl: 'https://github.com/zhouliang/synapse-vector-engine',
  },
  {
    id: 'project-cyberlens-telemetry',
    title: 'CyberLens Telemetry',
    category: 'Frontend Performance & Graphics',
    insights:
      '高帧率 WebGL/Canvas 动态可观测性数字看板，实现海量前端交互事件帧级追踪、无损采样与微秒级渲染性能分析。',
    tags: ['TypeScript', 'WebGL', 'Web Workers', 'Performance'],
    image: cyberlensImg,
    githubUrl: 'https://github.com/zhouliang/cyberlens-telemetry',
  },
]

interface ProjectSectionProps {
  projects?: readonly ProjectItem[]
  className?: string
}

export const ProjectSection: React.FC<ProjectSectionProps> = ({
  projects = FEATURED_PROJECTS,
  className = '',
}) => {
  return (
    <section
      id="projects"
      className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 scroll-mt-20 border-t border-slate-200/60 dark:border-slate-800/60 ${className}`}
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 mb-4 backdrop-blur-xs shadow-xs">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>Curated Works &amp; Engineering</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
          精选开源与架构项目
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          深入探索 AI Agent 自主智能体、全栈高并发系统与现代图形可观测性工程实践。
        </p>
      </div>

      {/* Projects Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 hover:border-indigo-400/60 dark:hover:border-indigo-500/60"
          >
            {/* Project Screenshot / Visual Container with Anti-CLS Aspect Ratio */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800/80">
              <img
                src={project.image}
                alt={`${project.title} 截图预览`}
                loading="lazy"
                width={800}
                height={450}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-900/75 text-indigo-300 backdrop-blur-md border border-slate-700/50">
                {project.category}
              </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-col flex-1 p-6 sm:p-7">
              {/* Project Title */}
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-3">
                {project.title}
              </h3>

              {/* Architecture Insights */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 flex-1">
                {project.insights}
              </p>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* GitHub Link Action */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`在 GitHub 上查看 ${project.title} 源代码（在新标签页打开）`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800/80 dark:hover:bg-slate-800 dark:hover:text-indigo-400 border border-slate-300/80 dark:border-slate-700/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
                >
                  {/* GitHub Icon SVG */}
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>源码仓库 →</span>
                </a>

                <span className="text-xs text-slate-500 dark:text-slate-500 font-mono">
                  Production-Ready
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
