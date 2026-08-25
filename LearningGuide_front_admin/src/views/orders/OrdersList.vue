<script setup>
import {
    Edit,
    Delete,
} from '@element-plus/icons-vue'

import { ref } from 'vue'


//订单搜索时填写的昵称
const orderNo = ref('')


//订单列表数据模型
const orders = ref([
    
])

//定义变量，控制标题的展示
const title = ref('')

//分页条数数据模型
const pageNum = ref(1)   //当前页
const total = ref(20)   //总条数
const pageSize = ref(10) //每页条数

//当每页条数发生了变化，调用此函数
const onSizeChange = (size) => {
    pageSize.value = size
    ordersList()
}

//当前页码发生变化，调用此函数
const onCurrentChange = (num) => {
    pageNum.value = num
    ordersList()
}

import { ordersListService, ordersCreateService, ordersDeleteService } from '@/api/orders';

//获取列表数据
const ordersList = async()=> {
    let params = {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        orderNo: orderNo.value ? orderNo.value : null,
    }

    let result = await ordersListService(params)

    //渲染视图
    console.log(result.data.total)
    total.value = result.data.total
    orders.value = result.data

}
ordersList()

import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { Plus } from '@element-plus/icons-vue'
//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加表单数据模型
const ordersModel = ref({
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
//     ordersModel.value.image = result.data
//     console.log(result.data)
// }

//添加订单
import { ElMessage } from 'element-plus';

const onAddCategory = () => {
    title.value = '添加订单'
    visibleDrawer.value = true
}

const addCategory = async()=>{
    console.log('add orders')

    if(ordersModel.value.name == '') {
        ElMessage.error('订单名称不能为空')
        return
    }

    //调用接口
    let result = await ordersCreateService(ordersModel.value)
    ElMessage.success(result.msg ? result.msg : '添加成功')

    //让抽屉消失
    visibleDrawer.value = false
    //刷新当前列表
    ordersList()
}

import { ElMessageBox } from 'element-plus';
//删除订单
const deleteCategory = (row)=> {
    //提示订单，确认框
    ElMessageBox.confirm(
        '你确认要删除该订单吗',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
        })
        .then(async () => {
            //调用接口
            let result = ordersDeleteService(row.id)
            ElMessage({ type: 'success', message: '删除成功'})
            //刷新列表
            setTimeout(ordersList, 200);
        })
        .catch(() => {
            ElMessage({ type: 'info', message: '订单取消了删除'})
        })
    
    
}

//显示编辑弹窗
const editCategory = (row) => {
    console.log(row)
    // title.value = '编辑订单'
    // //让抽屉显示
    // visibleDrawer.value = true

    // if(row.type == "单人") {
    //     ordersModel.value.type = 1
    // }else if(row.type == "多人") {
    //     ordersModel.value.type = 2
    // }else if(row.type == "订单") {
    //     ordersModel.value.type = 3
    // }

    // //数据拷贝
    // ordersModel.value.name = row.name
    // ordersModel.value.image = row.image
    // ordersModel.value.description = row.description
    // ordersModel.value.sort = row.sort
    // ordersModel.value.status = row.status=="启用" ? "1" : "0"
    // //扩展id属性，将来需要传递给后台，完成订单的修改
    // ordersModel.value.id = row.id
    
}

//编辑订单
const updateCategory = async() => {
    console.log('update orders')
    console.log(title)
    // //调用接口
    // let result = await ordersUpdateService(ordersModel.value)
    // ElMessage.success(result.msg ? result.msg : '修改成功')
    // //调用获取订单列表
    // ordersList()
    // visibleDrawer.value = false     //隐藏弹窗

}

//清空表单数据
const clearData = ()=> {
    ordersModel.value = {
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
                <span>订单管理</span>
                <div class="extra">
  
                </div>
            </div>
        </template>
        <!-- 搜索表单 -->
        <el-form inline>
            <el-form-item label="订单号：" style="width: 210px">
                <el-input v-model="name" placeholder="请输入订单号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="ordersList">搜索</el-button>
                <el-button @click="name = '';">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 订单列表 -->
        <el-table :data="orders" style="width: 100%">
            <el-table-column label="ID" width="60" prop="id"></el-table-column>
            <el-table-column label="订单号" prop="orderNo"></el-table-column>
            <el-table-column label="用户账号" width="120" prop="userName"></el-table-column>
            <el-table-column label="用户昵称" width="120" prop="nickName"></el-table-column>
            <el-table-column label="课程标题" width="120" prop="courseTitle"></el-table-column>
            <el-table-column label="购买金额" width="120" prop="pricePaid"></el-table-column>
            <el-table-column label="操作" width="150">
                <template #default="{ row }">

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
        <el-drawer v-model="visibleDrawer" title="添加订单" direction="rtl" size="50%">
            <!-- 添加订单表单 -->
            <el-form :model="ordersModel" label-width="100px">
                
                <el-form-item label="订单名称">
                    <el-input v-model="ordersModel.name" placeholder="请输入订单名称"></el-input>
                </el-form-item>
                
                
                <el-form-item label="订单描述">
                    <el-input v-model="ordersModel.description" placeholder="请输入订单描述"></el-input>
                </el-form-item>
                <el-form-item label="订单排序">
                    <el-input type="number" v-model="ordersModel.sort" placeholder="请输入订单排序"></el-input>
                </el-form-item>
                <el-form-item label="发布状态">
                    <el-radio-group v-model="ordersModel.status">
                        <el-radio value="1" checked>启用</el-radio>
                        <el-radio value="0">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="title == '添加订单' ? addCategory() : updateCategory()">确认</el-button>
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
