<template>
  <div class="testing-manage">
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
  $api.get('/testing/getAll').then(res => {
    fresh(res)
  })
}, 500)

function handleArrayParams(params) {
  if (params instanceof Object) {
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key])) {
        params[key] = params[key].join(',')
      }
    })
  }
  return params
}
function addClue() {
  AddFormRef.value.open()
}
function handleView(row) {
  $api.get('/testing/' + row.testingID).then(res => {
    const result = res.data
    const linkIds = []
    const linkNames = []
    const linkMobileNumbers = []
    const linkOfficeNumbers = []
    const linkEmailAddress = []
    for (let i = 0; i < result.link.length; i++) {
      linkIds.push(result.link[i].link_id)
      linkNames.push(result.link[i].name)
      linkMobileNumbers.push(result.link[i].mobile_number)
      linkOfficeNumbers.push(result.link[i].office_number)
      linkEmailAddress.push(result.link[i].email_address)
    }
    row.sciProjectID = result.sci_project_id
    row.headName = result.head.name
    row.headMobileNumber = result.head.mobile_number
    row.headOfficeNumber = result.head.office_number
    row.headEmailAddress = result.head.email_address
    row.linkID = linkIds
    row.linkName = linkNames
    row.linkMobileNumber = linkMobileNumbers
    row.linkOfficeNumber = linkOfficeNumbers
    row.linkEmailAddress = linkEmailAddress
    row = handleArrayParams(row)
    DetailRef.value.openDialog(row)
  }).catch(() => {
    ElMessageBox({
      title: '错误',
      message: '该监测方暂无更多细节',
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
        $api.delete_('/testing/' + row.partnerID).then(() => {
          ElMessage.success('删除成功')
          rawfresh()
        })
      }
    }
  })
}
function getList(val) {
  if (val) {
    // console.log('查询数据', val)
    $api.get('/testing/searchByName?name=' + val.testingName).then(res => {
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
      testingID: res.data[i].testing_id,
      name: res.data[i].name,
      address: res.data[i].address,
      headID: res.data[i].head_id
    })
  }
  listLoading.value = false
}

function rawfresh() {
  $api.get('/testing/getAll').then(res => {
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
