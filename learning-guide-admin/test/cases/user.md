# 用户管理模块测试用例

## USER-001 分页查询用户列表

- 请求：`GET /adm/v1/user/list?pageNum=1&pageSize=10`
- 前置条件：`tb_user` 表存在用户数据
- 预期结果：返回当前页用户数组，且不包含密码字段
- 预期响应格式：

```json
{
  "code": 0,
  "data": [
    {
      "id": 1,
      "username": "zhangsan",
      "nickname": null,
      "age": 33,
      "createTime": null,
      "updateTime": null
    }
  ],
  "msg": "success"
}
```

## USER-002 计算第二页查询位置

- 输入：`pageNum=2`、`pageSize=10`
- 预期结果：TypeORM 查询参数为 `skip=10`、`take=10`
- 排序规则：按用户 ID 升序

## USER-003 分页字符串参数转换

- 输入：`pageNum="1"`、`pageSize="10"`
- 预期结果：转换为数字 `1` 和 `10`，并通过参数校验

## USER-004 非法分页参数

- 输入场景：页码为 0、每页数量为 0、非数字页码、小数页码
- 预期结果：参数校验失败，接口返回 `400 Bad Request`

自动化测试：

- `test/unit/user/user.controller.spec.ts`
- `test/unit/user/user.service.spec.ts`
- `test/unit/user/user-list-query.dto.spec.ts`
