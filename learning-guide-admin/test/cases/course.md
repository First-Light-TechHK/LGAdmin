# 课程管理模块测试用例

## COURSE-001 分页查询课程列表

- 请求：`POST /adm/v1/course/list`
- 请求体：

```json
{
  "pageNum": 1,
  "pageSize": 10
}
```

- 预期结果：返回当前页课程、关联名称和课程总数
- 排序规则：按课程 ID 降序
- 关联字段：教师名称、分类名称、科目名称
- 预期响应格式：

```json
{
  "code": 0,
  "data": [
    {
      "categoryId": 1,
      "categoryName": "古诗词",
      "cover": "",
      "createTime": "2026-08-08T10:26:26",
      "description": "Biology course 测试",
      "discount": 0,
      "hours": 0,
      "id": 23,
      "lessons": 0,
      "level": 1,
      "price": 0,
      "status": 1,
      "subjectId": null,
      "subjectName": null,
      "tags": "",
      "teacherId": 1,
      "teacherName": "jack",
      "title": "Biology course",
      "type": 1,
      "updateTime": "2026-08-08T10:26:26"
    }
  ],
  "msg": null,
  "total": 10
}
```

## COURSE-002 计算分页位置

- 输入：`pageNum=2`、`pageSize=10`
- 预期结果：TypeORM 查询参数为 `skip=10`、`take=10`

## COURSE-003 非法分页参数

- 输入场景：页码或每页数量小于 1、非数字页码、小数页码
- 预期结果：参数校验失败，接口返回 `400 Bad Request`

自动化测试：

- `test/unit/course/course.controller.spec.ts`
- `test/unit/course/course.service.spec.ts`
- `test/unit/course/course-list.dto.spec.ts`
