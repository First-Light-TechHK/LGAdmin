# 教师管理模块测试用例

## TEACHER-001 分页查询教师列表

- 请求：`GET /adm/v1/teacher/list?pageNum=1&pageSize=10`
- 前置条件：数据库存在教师数据
- 预期结果：返回当前页教师数组
- 预期响应格式：

```json
{
  "code": 0,
  "data": [
    {
      "id": 1,
      "username": "jack",
      "nickname": null,
      "age": 28,
      "status": 0,
      "createTime": null,
      "updateTime": null
    }
  ],
  "msg": "success"
}
```

## TEACHER-002 计算第二页查询位置

- 输入：`pageNum=2`、`pageSize=10`
- 预期结果：TypeORM 查询参数为 `skip=10`、`take=10`
- 排序规则：按教师 ID 升序

## TEACHER-003 分页字符串参数转换

- 输入：`pageNum="1"`、`pageSize="10"`
- 预期结果：转换为数字 `1` 和 `10`，并通过参数校验

## TEACHER-004 非法分页参数

- 输入场景：页码为 0、每页数量为 0、非数字页码、小数页码
- 预期结果：参数校验失败，接口返回 `400 Bad Request`

## TEACHER-005 教师密码字段保护

- 前置条件：`Teacher.password` 配置为 `select: false`
- 操作：查询教师列表
- 预期结果：响应数据不包含教师密码

自动化测试：

- `test/unit/teacher/teacher.controller.spec.ts`
- `test/unit/teacher/teacher.service.spec.ts`
- `test/unit/teacher/teacher-list-query.dto.spec.ts`

## TEACHER-006 添加教师

- 请求：`POST /adm/v1/teacher/add`
- 请求参数：

```json
{
  "username": "jack",
  "password": "123",
  "nickname": "Jack",
  "age": 28,
  "status": 1
}
```

- 预期结果：教师创建成功，返回 `code=0` 和教师信息
- 安全要求：密码使用 MD5 后入库，响应中不返回密码
- 参数规则：账号、密码不能为空；年龄范围为 0 到 150；状态只能为 0 或 1；昵称可以为空

## TEACHER-007 添加教师参数不合法

- 输入场景：账号为空、密码为空、年龄小于 0、年龄大于 150、状态不是 0 或 1
- 预期结果：参数校验失败，接口返回 `400 Bad Request`

对应自动化测试：`test/unit/teacher/create-teacher.dto.spec.ts`
