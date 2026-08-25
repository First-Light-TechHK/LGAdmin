# 订单管理模块测试用例

## ORDER-001 分页查询订单列表

- 请求：`POST /adm/v1/order/list`
- 请求体：

```json
{
  "pageNum": 1,
  "pageSize": 10
}
```

- 预期结果：返回当前页订单、关联的用户和课程信息以及订单总数
- 排序规则：按订单 ID 降序
- 关联字段：用户名、用户昵称、课程标题
- 预期响应格式：

```json
{
  "code": 0,
  "data": [
    {
      "courseId": 15,
      "courseTitle": "What is ChatGPT doing text",
      "createTime": "2026-04-28T20:38:32",
      "id": 1,
      "nickName": "zchlon",
      "orderNo": "202604282038321003256",
      "payStatus": 2,
      "pricePaid": 120,
      "updateTime": "2026-04-28T20:38:32",
      "userId": 6,
      "userName": "zchlon@qq.com"
    }
  ],
  "msg": null,
  "total": 1
}
```

## ORDER-002 计算分页位置

- 输入：`pageNum=2`、`pageSize=10`
- 预期结果：TypeORM 查询参数为 `skip=10`、`take=10`

## ORDER-003 非法分页参数

- 输入场景：页码或每页数量小于 1、非数字页码、小数页码
- 预期结果：参数校验失败，接口返回 `400 Bad Request`

自动化测试：

- `test/unit/order/order.controller.spec.ts`
- `test/unit/order/order.service.spec.ts`
- `test/unit/order/order-list.dto.spec.ts`
