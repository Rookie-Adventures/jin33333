# 待实现功能清单

## 1. 验证码功能
- [ ] 邮箱验证码
  - [x] 实现验证码发送 API
  - [ ] 实现验证码验证逻辑
  - [x] 添加验证码错误处理
  - [ ] 添加验证码重发限制
  - [ ] 添加验证码有效期管理

- [ ] 手机验证码
  - [x] 实现验证码发送 API
  - [ ] 实现验证码验证逻辑
  - [x] 添加验证码错误处理
  - [ ] 添加验证码重发限制
  - [ ] 添加验证码有效期管理

## 2. 密码重置功能
- [ ] 密码重置请求页面
  - [ ] 创建请求表单
  - [ ] 添加邮箱验证
  - [ ] 实现请求提交逻辑

- [ ] 密码重置确认页面
  - [ ] 创建重置表单
  - [ ] 添加密码强度验证
  - [ ] 实现重置提交逻辑

- [ ] 重置邮件功能
  - [ ] 实现重置邮件发送
  - [ ] 添加邮件模板
  - [ ] 实现邮件发送失败处理

- [ ] 重置链接功能
  - [ ] 实现重置链接生成
  - [ ] 添加链接有效期管理
  - [ ] 实现链接验证逻辑

## 3. 第三方登录
- [ ] OAuth 配置
  - [ ] 选择支持的第三方平台
  - [ ] 配置 OAuth 客户端
  - [ ] 实现 OAuth 回调处理

- [ ] 登录界面
  - [ ] 添加第三方登录按钮
  - [ ] 实现登录流程
  - [ ] 添加登录状态同步

- [ ] 账号关联
  - [ ] 实现账号绑定功能
  - [ ] 添加账号解绑功能
  - [ ] 实现账号合并功能

## 4. 多设备管理
- [ ] 会话管理
  - [ ] 实现会话列表查看
  - [ ] 添加会话终止功能
  - [ ] 实现多设备登录限制

- [ ] 设备管理
  - [ ] 添加设备信息显示
  - [ ] 实现设备信任功能
  - [ ] 添加设备黑名单功能

## 5. 用户体验优化
- [ ] 会话超时
  - [ ] 添加会话超时提示
  - [ ] 实现自动登出功能
  - [ ] 添加会话续期功能

- [ ] 状态同步
  - [ ] 实现登录状态同步
  - [ ] 添加多标签页同步
  - [ ] 实现状态冲突处理

- [ ] 错误处理
  - [ ] 优化错误提示
  - [ ] 添加错误重试机制
  - [ ] 实现错误日志记录

## 6. 安全性增强
- [ ] 登录保护
  - [ ] 实现登录尝试限制
  - [ ] 添加 IP 黑名单
  - [ ] 实现异常登录检测

- [ ] 会话安全
  - [ ] 实现会话劫持防护
  - [ ] 添加设备指纹验证
  - [ ] 实现会话固定防护

## 进度记录

### 2024-03-21
- 创建 TODO.md 文件
- 整理未实现功能清单
- 按功能模块分类记录待实现项
- 实现验证码发送 API 和前端倒计时功能
- 添加验证码错误处理

### 下一步计划
1. 优先实现验证码功能，因为这是用户注册和登录的基础功能
2. 其次实现密码重置功能，提高用户体验
3. 然后添加第三方登录，扩展登录方式
4. 最后完善多设备管理和用户体验优化

## 注意事项
1. 每个功能实现前需要先编写测试用例
2. 实现过程中需要保持代码风格一致
3. 重要功能需要添加适当的日志记录
4. 安全性相关的功能需要经过安全测试
5. 用户体验相关的功能需要经过用户测试 