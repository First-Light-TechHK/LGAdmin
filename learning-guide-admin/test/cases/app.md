# 应用基础功能测试用例

## APP-001 获取根接口内容

- 测试类型：单元测试
- 前置条件：`AppService.getHello()` 正常返回内容
- 操作：调用 `AppController.getHello()`
- 预期结果：Controller 返回 Service 提供的 `Hello World!#`
- 自动化测试：`test/unit/app/app.controller.spec.ts`

## APP-002 获取应用问候语

- 测试类型：单元测试
- 操作：调用 `AppService.getHello()`
- 预期结果：返回 `Hello World!#`
- 自动化测试：`test/unit/app/app.service.spec.ts`

## APP-003 请求根接口

- 测试类型：端到端测试
- 请求：`GET /`
- 预期状态码：`200`
- 预期响应：`Hello World!#`
- 自动化测试：`test/e2e/app.e2e-spec.ts`
