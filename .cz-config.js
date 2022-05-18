/**
 * // 配置 git 提交统一规范 处理
 * 1、  npm install -g commitizen
 * 2、 npm i cz-customizable --save-dev
 * 3、 配置以下文件
 */
module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:      新功能' },
    { value: 'fix', name: 'fix:       修复' },
    { value: 'docs', name: 'docs:      文档变更' },
    { value: 'style', name: 'style:     代码格式(不影响代码运行的变动)' },
    { value: 'refactor', name: 'refactor:  重构(既不是增加feature，也不是修复bug)' },
    { value: 'perf', name: 'perf:      性能优化' },
    { value: 'test', name: 'test:      增加测试' },
    { value: 'chore', name: 'chore:     构建过程' },
    { value: 'revert', name: 'revert:    回退' },
    { value: 'build', name: 'build:     打包' }
  ],
  // 步骤
  messages: {
    type: '请选择提交的类型: ',
    customScope: '请输入修改的范围（可选）',
    subject: '请简要描述提交（可选）',
    body: '请输入详细描述（可选）',
    footer: '请输入要关闭的issue（可选）',
    confirmCommit: '确认要使用以上信息提交？（y/n）'
  },
  // 跳过步骤 进行代码提交的时候就可以略过这些步骤
  skipQuestions: ['body', 'footer'],
  // 默认长度为 72
  subjectLimit: 72
}
