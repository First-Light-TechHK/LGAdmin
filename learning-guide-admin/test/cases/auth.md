# 登录与认证测试用例

## AUTH-001 管理员登录成功

- 输入：正确的用户名和密码
- 预期结果：返回管理员 ID、用户名、昵称和签名后的 Token
- 预期行为：JWT Payload 包含管理员 ID 和用户名

## AUTH-002 用户名不存在

- 输入：不存在的用户名
- 预期结果：抛出 `UnauthorizedException`，不生成 Token

## AUTH-003 密码错误

- 输入：正确用户名和错误密码
- 预期结果：抛出 `UnauthorizedException`，不生成 Token

## AUTH-004 管理员密码为空

- 前置条件：查询到的管理员没有密码
- 预期结果：抛出 `UnauthorizedException`

## AUTH-005 Controller 转发登录请求

- 操作：调用登录接口
- 预期结果：登录参数完整传给 `AuthService`，并返回 Service 的结果

## AUTH-006 获取当前 JWT 信息

- 操作：请求 Profile 接口
- 预期结果：返回请求对象中的 JWT Payload

## AUTH-007 校验 JWT Payload

- 操作：调用 `JwtStrategy.validate()`
- 预期结果：返回原始 Payload，并从配置读取 `JWT_SECRET`

## AUTH-008 创建 JWT Guard

- 预期结果：Guard 可以正常实例化，并提供 `canActivate` 方法

## AUTH-009 登录参数校验

- 有效参数：非空字符串用户名和密码
- 无效参数：空用户名、空密码、非字符串用户名、超过 100 字符的用户名
- 预期结果：有效参数通过，无效参数产生校验错误

自动化测试目录：`test/unit/auth`
