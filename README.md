# YOLAS - 小朋友成长教育系统

一个专为3-12岁儿童设计的数学口算练习系统，采用Next.js 14、TypeScript和Tailwind CSS构建。

## 🌟 项目特色

### 🎯 年龄分级系统
- **学前班 (3-5岁)**: 10以内加减法、数字认知、图形计数
- **小学低年级 (6-8岁)**: 100以内加减法、乘法口诀表、简单应用题
- **小学高年级 (9-12岁)**: 多位数四则运算、分数基础运算、文字应用题

### 📚 丰富的题目类型
- **数字计算**: 传统的数学运算题目
- **图形计数**: 通过彩色图形进行可视化计数
- **应用题**: 生活化的数学问题

### 🎨 友好的用户界面
- 根据年龄段调整字体大小和按钮尺寸
- 丰富的动画效果和视觉反馈
- 响应式设计，适配平板和手机
- 彩色主题和可爱图标

### 📊 智能统计功能
- 实时学习进度跟踪
- 正确率统计和分析
- 学习时长记录
- 连续学习天数统计
- 错题收集和复习建议

### 🚀 性能优化
- React.memo优化组件渲染
- 本地存储用户进度数据
- 题目预生成和缓存机制
- 懒加载和代码分割

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **状态管理**: React Hooks
- **存储**: LocalStorage
- **字体**: Geist Sans & Geist Mono

## 📦 项目结构

```
yolas/
├── app/                          # App Router页面
│   ├── page.tsx                  # 主页 (年龄选择)
│   ├── layout.tsx                # 根布局
│   ├── math/[ageGroup]/         # 数学练习页面
│   │   ├── page.tsx             # 练习界面
│   │   └── result/              # 结果页面
│   └── stats/                   # 统计页面
├── components/                   # React组件
│   ├── QuestionDisplay.tsx      # 题目显示组件
│   ├── AnswerInput.tsx          # 答案输入组件
│   ├── ProgressBar.tsx          # 进度条组件
│   ├── StatsPanel.tsx           # 统计面板组件
│   └── CelebrationAnimation.tsx # 庆祝动画组件
├── lib/                         # 核心库
│   ├── questionGenerator.ts     # 题目生成器
│   └── storage.ts              # 存储管理器
├── hooks/                       # 自定义Hooks
│   └── useLocalStorage.ts      # 本地存储Hook
├── types/                       # TypeScript类型定义
│   └── index.ts                # 主要类型定义
└── public/                      # 静态资源
```

## 🚀 快速开始

### 安装依赖

```bash
yarn install
```

### 启动开发服务器

```bash
yarn dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
yarn build
yarn start
```

## 🎮 功能详解

### 1. 年龄选择
用户首先选择合适的年龄段，系统会根据选择调整题目难度和界面样式。

### 2. 数学练习
- 自动生成符合年龄段的题目
- 支持键盘和触屏输入
- 实时答案验证和反馈
- 答对时播放庆祝动画

### 3. 进度跟踪
- 实时显示答题进度
- 统计正确率和用时
- 提供学习建议和鼓励

### 4. 结果展示
- 详细的学习报告
- 性能等级评定
- 分享功能
- 重新练习选项

### 5. 统计分析
- 多维度学习数据分析
- 历史记录查看
- 数据导出功能
- 学习趋势展示

## 🎯 核心算法

### 题目生成算法
- 根据年龄段和难度等级生成合适的题目
- 支持加减乘除四种运算类型
- 确保除法题目能整除
- 生成生活化的应用题场景

### 自适应难度
- 根据答题正确率动态调整难度
- 智能推荐薄弱环节练习
- 个性化学习路径规划

### 数据持久化
- 使用LocalStorage保存学习进度
- 支持数据导出和导入
- 跨会话数据同步

## 🔧 配置和自定义

### 难度配置
可以在 `lib/questionGenerator.ts` 中修改各年龄段的难度配置：

```typescript
const DIFFICULTY_CONFIGS: Record<AgeGroup, DifficultyConfig> = {
  [AgeGroup.PRESCHOOL]: {
    maxNumber: 10,
    availableOperations: [OperationType.ADDITION, OperationType.SUBTRACTION],
    // ...
  }
};
```

### 主题定制
在 `types/index.ts` 中定义了 `ThemeConfig` 接口，可以根据需要调整主题样式。

## 📱 设备兼容性

- **桌面端**: 完整功能支持
- **平板**: 触屏优化，大按钮设计
- **手机**: 响应式布局，单手操作友好

## 🔄 未来规划

- [ ] 添加语文学习模块
- [ ] 实现多用户支持
- [ ] 添加游戏化元素
- [ ] 支持离线使用
- [ ] 家长监控面板
- [ ] 学习报告邮件推送
- [ ] 多语言支持

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有为儿童教育事业贡献力量的开发者和教育工作者！
