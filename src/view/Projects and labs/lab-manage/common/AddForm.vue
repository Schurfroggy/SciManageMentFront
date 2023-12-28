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
    labID: formRules(),
    labName: formRules('must'),
    labIntroduction: formRules('must'),
    directorId: formRules('must'),
    secretaryId: formRules('must')
  },
  formData: {
    labID: '',
    labName: '',
    labIntroduction: '',
    directorId: '',
    secretaryId: ''
  },
  formItem: [
    {
      label: '研究室ID',
      type: 'number',
      value: 'labID',
      width: 24,
      readOnly: true
    },
    {
      label: '研究室名称',
      type: 'text',
      value: 'labName',
      width: 24
    },
    {
      label: '研究室介绍',
      type: 'textarea',
      value: 'labIntroduction',
      width: 24
    },
    {
      label: '主任ID',
      type: 'number',
      value: 'directorId',
      width: 24
    },
    {
      label: '秘书ID',
      type: 'number',
      value: 'secretaryId',
      width: 24
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑研究室'
    state.formData = data
  } else {
    state.title = '新增研究室'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增研究室') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
}

const handleAddSubmit = () => {
  const newdata = state.formData
  $api.post('/lab/add?lab_id=' + newdata.labID + '&name=' + newdata.labName + '&introduction=' + newdata.labIntroduction + '&director_id=' + newdata.directorId + '&secretary_id=' + newdata.secretaryId).then(() => {
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
  $api.put('/lab/update?lab_id=' + newdata.labID + '&name=' + newdata.labName + '&introduction=' + newdata.labIntroduction + '&director_id=' + newdata.directorId + '&secretary_id=' + newdata.secretaryId).then(() => {
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
