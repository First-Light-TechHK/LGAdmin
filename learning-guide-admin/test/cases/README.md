# 测试用例说明

本目录使用中文 Markdown 描述项目测试用例，方便评审、联调和后续维护。

自动化测试代码仍然位于：

- `test/unit`：单元测试
- `test/e2e`：端到端测试

文档与测试代码的对应关系：

| 文档 | 对应测试代码 |
| --- | --- |
| `app.md` | `test/unit/app`、`test/e2e/app.e2e-spec.ts` |
| `admin.md` | `test/unit/admin` |
| `auth.md` | `test/unit/auth` |
| `teacher.md` | `test/unit/teacher` |
| `user.md` | `test/unit/user` |
| `course.md` | `test/unit/course` |
| `order.md` | `test/unit/order` |

新增或修改接口时，应同步更新对应 Markdown 文档和自动化测试代码。
