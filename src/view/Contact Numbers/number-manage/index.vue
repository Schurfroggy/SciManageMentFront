<template>
  <div class="number-manage">
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
    <AddForm ref="AddFormRef"/>
    <Detail ref="DetailRef"/>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
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
  $api.get('/phone/getAll').then(res => {
    fresh(res)
  })
}, 500)

function addClue() {
  AddFormRef.value.open()
}
function handleView(row) {
  DetailRef.value.openDialog(row)
}
function handleEdit(row) {
  AddFormRef.value.open(row)
}

function handleDelete(row) {
  ElMessageBox({
    message: '联系人暂时无法删除',
    type: 'error',
    showClose: true
  })
}
function getList(val) {
  if (val) {
    // console.log('查询数据', val)
    $api.get('/phone/searchByName?name=' + val.contactName).then(res => {
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
      contactID: res.data[i].id,
      name: res.data[i].name,
      type: res.data[i].type === 'link' ? '联系人' : '负责人',
      officeNumber: res.data[i].office_number,
      mobileNumber: res.data[i].mobile_number,
      emailAddress: res.data[i].email_address
    })
  }
  listLoading.value = false
}

function rawfresh() {
  $api.get('/phone/getAll').then(res => {
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
