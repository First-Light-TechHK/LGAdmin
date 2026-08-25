# 管理员模块测试用例

## ADMIN-001 查询管理员列表

- 操作：调用管理员列表方法
- 预期结果：返回管理员数组

## ADMIN-002 根据 ID 查询管理员

- 前置条件：指定 ID 的管理员存在
- 操作：使用管理员 ID 查询
- 预期结果：返回对应管理员，并将 ID 正确传给 Service

## ADMIN-003 查询不存在的管理员

- 前置条件：指定 ID 的管理员不存在
- 操作：使用不存在的 ID 查询
- 预期结果：抛出 `NotFoundException`

## ADMIN-004 获取当前管理员信息

- 前置条件：JWT 中的管理员仍然存在
- 操作：请求当前管理员信息
- 预期结果：返回 JWT 用户 ID 对应的管理员

## ADMIN-005 当前管理员已不存在

- 前置条件：JWT 有效，但对应管理员已被删除
- 操作：请求当前管理员信息
- 预期结果：抛出 `UnauthorizedException`

## ADMIN-006 按 ID 升序查询管理员列表

- 操作：调用 `AdminService.findAll()`
- 预期结果：Repository 收到 `{ order: { id: 'ASC' } }`

## ADMIN-007 查询登录管理员并读取密码字段

- 操作：根据用户名查询登录管理员
- 预期结果：查询显式选择 `admin.password`，并按用户名过滤

自动化测试：

- `test/unit/admin/admin.controller.spec.ts`
- `test/unit/admin/admin.service.spec.ts`
