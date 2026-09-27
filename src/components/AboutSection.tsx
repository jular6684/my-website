import React from 'react'
import portraitImg from '../assets/about/avatar-portrait.svg'

interface AboutSectionProps {
  className?: string
}

export const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
  return (
    <section
      id="about"
      className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-28 scroll-mt-20 border-t border-slate-200/60 dark:border-slate-800/60 ${className}`}
    >
      {/* Section Sub-heading Badge */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 mb-4 backdrop-blur-xs shadow-xs">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>Biography &amp; Philosophy</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
          关于我 · 赋范空间
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
          以理性的工程度量探索智能的无限维度，构建高信度数字化产品。
        </p>
      </div>

      {/* Two-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Handsome Portrait Image */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group w-full max-w-xs sm:max-w-sm">
            {/* Ambient Sci-Fi Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500 group-hover:duration-200 pointer-events-none"
            />

            {/* Image Card Container with Anti-CLS Aspect Ratio */}
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200/80 dark:border-slate-700/80 shadow-2xl">
              <img
                src={portraitImg}
                alt="Liang Zhou 个人形象肖像照"
                loading="lazy"
                width={640}
                height={800}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              {/* Subtle Ambient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Column: Three-Paragraph Bio & Brand Badge */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
          {/* Paragraph 1: Technical Foundation */}
          <div className="relative pl-5 border-l-2 border-indigo-500 dark:border-indigo-400">
            <h3 className="text-base font-bold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase mb-1">
              全栈工程与系统底座
            </h3>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              深耕现代全栈架构与分布式系统研发，专注于将大语言模型的认知推理能力编译为工业级可落地的 AI Agent 自主智能体系统，打通从底层数据流水线到顶层用户界面的全链路工程交付。
            </p>
          </div>

          {/* Paragraph 2: Engineering Philosophy */}
          <div className="relative pl-5 border-l-2 border-purple-500 dark:border-purple-400">
            <h3 className="text-base font-bold text-purple-600 dark:text-purple-400 tracking-wide uppercase mb-1">
              规格驱动与工程哲学
            </h3>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              信奉 Spec-Driven 规格驱动开发哲学，主张以可机器验证、自闭环的规范契约约束智能体研发流程；敬畏代码严谨性与运行时低熵，追求微秒级的渲染性能与克制高级的前端交互质感。
            </p>
          </div>

          {/* Paragraph 3: Vision & Open Exploration */}
          <div className="relative pl-5 border-l-2 border-pink-500 dark:border-pink-400">
            <h3 className="text-base font-bold text-pink-600 dark:text-pink-400 tracking-wide uppercase mb-1">
              长期主义与开源共建
            </h3>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              坚守技术长期主义与开源共享精神，持续探索人机高频结对协同开发的未来范式，致力于构建既具有数学几何严谨度、又蕴含人文温度的数字化体验。
            </p>
          </div>

          {/* Bottom: Exclusive Brand Tag Badge */}
          <div className="pt-4 w-full">
            <div className="inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 shadow-sm backdrop-blur-md">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
                  品牌标签：赋范空间
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  (Normed Space · 理性度量与无限维探索)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
