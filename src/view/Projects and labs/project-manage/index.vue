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
  $api.get('/sci_project/getAll').then(res => {
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
  $api.get('/sci_project/' + row.sciProjectID).then(res => {
    const result = res.data
    const partnerIds = []
    const partnerNames = []
    const researcherIds = []
    const researcherWorkLoads = []
    const researcherFunds = []
    for (let i = 0; i < result.partners.length; i++) {
      partnerIds.push(result.partners[i].partner_id)
      partnerNames.push(result.partners[i].name)
    }
    for (let i = 0; i < result.researchers.length; i++) {
      researcherIds.push(result.researchers[i].researcher_id)
      researcherWorkLoads.push(result.researchers[i].workload)
      researcherFunds.push(result.researchers[i].fund)
    }
    row.clientName = result.client.name
    row.testingName = result.testing.name
    row.subProjectCount = result.sub_projects.length
    row.payoffCount = result.payoffs ? result.payoffs.length : 0
    row.partnerID = partnerIds
    row.partnerName = partnerNames
    row.researcherID = researcherIds
    row.researcherWorkLoad = researcherWorkLoads
    row.researcherFund = researcherFunds
    row = handleArrayParams(row)
    DetailRef.value.openDialog(row)
  }).catch(() => {
    ElMessageBox({
      title: '错误',
      message: '该科研项目暂无更多细节',
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
        $api.delete_('/sci_project/' + row.sciProjectID).then(() => {
          ElMessage.success('删除成功')
          rawfresh()
        })
      }
    }
  })
}
function getList(val) {
  // TODO
  console.log(val)
  if (val.sciProjectName) {
    if (val.sciProjectContent) {
      $api.get('/sci_project/searchByDouble?name=' + val.sciProjectName + '&content=' + val.sciProjectContent).then(res => {
        fresh(res)
      })
    } else {
      $api.get('/sci_project/searchByName?name=' + val.sciProjectName).then(res => {
        fresh(res)
      })
    }
  } else if (val.sciProjectContent) {
    $api.get('/sci_project/searchByContent?content=' + val.sciProjectContent).then(res => {
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
      sciProjectID: res.data[i].sci_project_id,
      name: res.data[i].name,
      content: res.data[i].content,
      startDate: res.data[i].start_date,
      endDate: res.data[i].end_date,
      headName: res.data[i].head_name,
      clientID: res.data[i].client_id,
      testingID: res.data[i].testing_id,
      fund: res.data[i].fund
    })
  }
  listLoading.value = false
}

function rawfresh() {
  $api.get('/sci_project/getAll').then(res => {
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
