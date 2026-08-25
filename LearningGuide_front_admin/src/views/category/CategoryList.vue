<script setup>
import {
    Edit,
    Delete,
} from '@element-plus/icons-vue'

import { ref } from 'vue'


//分类搜索时填写的昵称
const nickname = ref('')


//分类列表数据模型
const categorys = ref([
    
])

//定义变量，控制标题的展示
const title = ref('')

//分页条数数据模型
const pageNum = ref(1)   //当前页
const total = ref(20)   //总条数
const pageSize = ref(3) //每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    categoryList()
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    categoryList()
}

import { categoryListService, categoryCreateService, categoryDeleteService } from '@/api/category';

//获取列表数据
const categoryList = async()=> {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        nickname: nickname.value ? nickname.value : null,
    }
    let result = await categoryListService(params)

    //渲染视图
    console.log(result.data.total)
    total.value = result.data.total
    categorys.value = result.data

}
categoryList()

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const categoryModel = ref({
    name: '',
    description: '',
    sort: 1,
    status: '1'
})

//导入token
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore()

//上传成功的回调函数
// const uploadSuccess = (result)=>{
//     categoryModel.value.image = result.data
//     console.log(result.data)
// }

//添加分类
import { ElMessage } from 'element-plus';

const onAddCategory = () => {
    title.value = '添加分类'
    visibleDrawer.value = true
}

const addCategory = async()=>{
    console.log('add category')

    if(categoryModel.value.name == '') {
        ElMessage.error('分类名称不能为空')
        return
    }

    //调用接口
    let result = await categoryCreateService(categoryModel.value)
    ElMessage.success(result.msg ? result.msg : '添加成功')

    //让抽屉消失
    visibleDrawer.value = false
    //刷新当前列表
    categoryList()
}

import { ElMessageBox } from 'element-plus';
//删除分类
const deleteCategory = (row)=> {
    //提示分类，确认框
    ElMessageBox.confirm(
        '你确认要删除该分类吗',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            //调用接口
            let result = categoryDeleteService(row.id)
            ElMessage({ type: 'success', message: '删除成功'})
            //刷新列表
            setTimeout(categoryList, 200);
        })
        .catch(() => {
            ElMessage({ type: 'info', message: '分类取消了删除'})
        })
    
    
}

//显示编辑弹窗
const editCategory = (row) => {
    console.log(row)
    // title.value = '编辑分类'
    // //让抽屉显示
    // visibleDrawer.value = true

    // if(row.type == "单人") {
    //     categoryModel.value.type = 1
    // }else if(row.type == "多人") {
    //     categoryModel.value.type = 2
    // }else if(row.type == "分类") {
    //     categoryModel.value.type = 3
    // }

    // //数据拷贝
    // categoryModel.value.name = row.name
    // categoryModel.value.image = row.image
    // categoryModel.value.description = row.description
    // categoryModel.value.sort = row.sort
    // categoryModel.value.status = row.status=="启用" ? "1" : "0"
    // //扩展id属性，将来需要传递给后台，完成分类的修改
    // categoryModel.value.id = row.id
    
}

//编辑分类
const updateCategory = async() => {
    console.log('update category')
    console.log(title)
    // //调用接口
    // let result = await categoryUpdateService(categoryModel.value)
    // ElMessage.success(result.msg ? result.msg : '修改成功')
    // //调用获取分类列表
    // categoryList()
    // visibleDrawer.value = false     //隐藏弹窗

}

//清空表单数据
const clearData = ()=> {
    categoryModel.value = {
         name: '',
         description: '',
         sort: 1,
         status: 1
    }
}

</script>

<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>分类管理</span>
                <div class="extra">
                    <el-button @click="onAddCategory">添加分类</el-button>
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="分类名称：" style="width: 210px">
                <el-input v-model="name" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="categoryList">搜索</el-button>
                <el-button @click="name = '';">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 分类列表 -->
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="ID" width="60" prop="id"></el-table-column>
            <el-table-column label="分类名称" prop="name"></el-table-column>
            <el-table-column label="分类描述" prop="description"></el-table-column>
            <el-table-column label="分类排序" width="120" prop="sort"></el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="editScene(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>
        <!-- 分页条 -->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-sizes="[3, 5, 10, 15]"
            layout="jumper, total, sizes, prev, pager, next" background :total="total" @size-change="onSizeChange"
            @current-change="onCurrentChange" style="margin-top: 20px; justify-content: flex-end" />

        <!-- 抽屉 -->
        <el-drawer v-model="visibleDrawer" title="添加分类" direction="rtl" size="50%">
            <!-- 添加分类表单 -->
            <el-form :model="categoryModel" label-width="100px">
                
                <el-form-item label="分类名称">
                    <el-input v-model="categoryModel.name" placeholder="请输入分类名称"></el-input>
                </el-form-item>
                
                
                <el-form-item label="分类描述">
                    <el-input v-model="categoryModel.description" placeholder="请输入分类描述"></el-input>
                </el-form-item>
                <el-form-item label="分类排序">
                    <el-input type="number" v-model="categoryModel.sort" placeholder="请输入分类排序"></el-input>
                </el-form-item>
                <el-form-item label="发布状态">
                    <el-radio-group v-model="categoryModel.status">
                        <el-radio value="1" checked>启用</el-radio>
                        <el-radio value="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title == '添加分类' ? addCategory() : updateCategory()">确认</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

/* 抽屉样式 */
.avatar-uploader {
    :deep() {
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .el-upload {
            border: 1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }

        .el-upload:hover {
            border-color: var(--el-color-primary);
        }

        .el-icon.avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            text-align: center;
        }
    }
}

</style>
