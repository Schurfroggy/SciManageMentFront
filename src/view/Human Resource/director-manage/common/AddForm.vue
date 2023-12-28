<template>
	<el-dialog v-model="state.dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false" :title="state.title" destroy-on-close width="50%">
		<Form ref="formRef" :form-data="state.formData" :form-item="state.formItem" :rules="state.rules" @submitForm="submitForm"/>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="confirm">确定</el-button>
				<el-button @click="cancel">取消</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue'
import Form from '@/components/Form/Form.vue'
import { formRules } from '@/utils/config.js'
import * as $api from '@/utils/axios'
import { ElMessageBox } from 'element-plus'

const state = reactive({
  dialogVisible: false,
  title: '',
  rules: {
    directorID: formRules('must'),
    researcherID: formRules('must'),
    labID: formRules('must'),
    employDate: formRules('must'),
    tenure: formRules('must')
  },
  formData: {
    directorID: '',
    researcherID: '',
    labID: '',
    employDate: '',
    tenure: ''
  },
  formItem: [
    {
      label: '主任ID',
      type: 'number',
      value: 'directorID',
      width: 24
    },
    {
      label: '作为研究员的ID',
      type: 'number',
      value: 'researcherID',
      width: 24
    },
    {
      label: '所属研究室ID',
      type: 'number',
      value: 'labID',
      width: 24
    },
    {
      label: '上任时间',
      type: 'date',
      value: 'employDate',
      width: 24
    },
    {
      label: '任期',
      type: 'text',
      value: 'tenure',
      width: 24
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑主任'
    state.formData = data
  } else {
    state.title = '新增主任'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增主任') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
}

const handleAddSubmit = () => {
  const newdata = state.formData
  $api.post('/director/add?director_id=' + newdata.directorID + '&researcher_id=' + newdata.researcherID + '&lab_id=' + newdata.labID + '&date=' + newdata.employDate + '&tenure=' + newdata.tenure).then(() => {
    ElMessageBox({
      message: '新增成功',
      type: 'success',
      showClose: true
    })
    emit('update')
  }).catch(() => {
    ElMessageBox({
      message: '新增失败',
      type: 'error',
      showClose: true
    })
  })
  state.dialogVisible = false
}

const handleEditSubmit = (data) => {
  const newdata = state.formData
  $api.post('/director/update?director_id=' + newdata.directorID + '&researcher_id=' + newdata.researcherID + '&lab_id=' + newdata.labID + '&date=' + newdata.employDate + '&tenure=' + newdata.tenure).then(() => {
    ElMessageBox({
      message: '修改成功',
      type: 'success',
      showClose: true
    })
    emit('update')
  }).catch(() => {
    ElMessageBox({
      message: '修改失败',
      type: 'error',
      showClose: true
    })
  })
  state.dialogVisible = false
}

const submitForm = (data) => {
  state.formData = data
}
const cancel = () => {
  state.dialogVisible = false
}

const emit = defineEmits(['update'])
defineExpose({ open, edit })
</script>
