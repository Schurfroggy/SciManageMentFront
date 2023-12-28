<template>
  <div class="client-manage">
    <FormSearch :form-item="formItem" :form-data="formData" @searchForm="getList" @clearForm="clearForm"/>
    <div class="btn-list">
      <el-button type="primary" icon="Plus" @click="addClue">新增</el-button>
    </div>
    <Table
      :table-head="tableHead"
      :table-data="tableData"
      :operation="['view','edit','del']"
      :total="8000"
      :list-loading="listLoading"
      style="height:calc(100vh - 250px);"
      @handleView="handleView"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @paginationChange="paginationChange"
    />
    <AddForm ref="AddFormRef" @update="rawfresh"/>
    <Detail ref="DetailRef"/>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { formItem, tableHead } from './js/static-var'
import { ElMessage, ElMessageBox } from 'element-plus'
import Table from '@/components/Table/BaseTable.vue'
import AddForm from './common/AddForm.vue'
import FormSearch from '@/components/Form/FormSearch.vue'
import Detail from './common//Detail.vue'
import * as $api from '@/utils/axios'

const formData = reactive({ })
const AddFormRef = ref(null)
const DetailRef = ref(null)

const listLoading = ref(true)
let tableData = reactive([])

setTimeout(() => {
  // 从后端api获取数据
  $api.get('/sci_project/getAllSub').then(res => {
    fresh(res)
  })
}, 500)

function addClue() {
  AddFormRef.value.open()
}
function handleView(row) {
  $api.get('/sci_project/sub/' + row.subProjectID).then(res => {
    row.sciProjectID = res.data
    DetailRef.value.openDialog(row)
  }).catch(() => {
    ElMessageBox({
      title: '错误',
      message: '该子项目暂无更多细节',
      showCancelButton: true,
      confirmButtonText: '确定'
    })
  })
}

function handleEdit(row) {
  AddFormRef.value.open(row)
}

function handleDelete(row) {
  ElMessageBox({
    title: '提示',
    message: '确定要删除吗?',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    callback: (action) => {
      if (action === 'confirm') {
        $api.delete_('/sci_project/deleteSub?sub_project_id=' + row.subProjectID).then(() => {
          ElMessage.success('删除成功')
          rawfresh()
        })
      }
    }
  })
}
function getList(val) {
  if (val) {
    console.log('查询数据', val)
    $api.get('/sci_project/searchByProjectId?sci_project_id=' + val.sciProjectID).then(res => {
      fresh(res)
    })
  }
}

function clearForm() {
  rawfresh()
}
function paginationChange(data) {
  console.log('页码变化', data)
}

function fresh(res) {
  listLoading.value = true
  tableData = []
  for (let i = 0; i < res.total; i++) {
    tableData.push({
      subProjectID: res.data[i].sub_project_id,
      headName: res.data[i].head_name,
      sequenceID: res.data[i].sequence_id,
      deadline: res.data[i].deadline,
      fund: res.data[i].fund,
      techIndicator: res.data[i].tech_indicator
    })
  }
  listLoading.value = false
}

function rawfresh() {
  $api.get('/sci_project/getAllSub').then(res => {
    fresh(res)
  })
}

</script>
<style scoped lang="less">
.menu-manage{
  .btn-list{
    margin-bottom: 10px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
