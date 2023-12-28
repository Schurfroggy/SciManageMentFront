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
    sciProjectID: formRules('must'),
    subProjectID: formRules('must'),
    headName: formRules('must'),
    sequenceID: formRules('must'),
    deadline: formRules('must'),
    fund: formRules('must'),
    techIndicator: formRules('must')
  },
  formData: {
    sciProjectID: '',
    subProjectID: '',
    headName: '',
    sequenceID: '',
    deadline: '',
    fund: '',
    techIndicator: ''
  },
  formItem: [
    {
      label: '所属科研项目ID',
      type: 'number',
      value: 'sciProjectID',
      width: 24
    },
    {
      label: '子项目ID',
      type: 'number',
      value: 'subProjectID',
      width: 24
    },
    {
      label: '负责人姓名',
      type: 'text',
      value: 'headName',
      width: 24
    },
    {
      label: '子项目序号',
      type: 'number',
      value: 'sequenceID',
      width: 24
    },
    {
      label: '完成时间要求',
      type: 'date',
      value: 'deadline',
      width: 24
    },
    {
      label: '资金(元)',
      type: 'text',
      value: 'fund',
      width: 24
    },
    {
      label: '技术指标',
      type: 'select',
      value: 'techIndicator',
      width: 24,
      children: [
        {
          label: 'A+',
          value: 'A+'
        },
        {
          label: 'A',
          value: 'A'
        },
        {
          label: 'A-',
          value: 'A-'
        },
        {
          label: 'B+',
          value: 'B+'
        },
        {
          label: 'B',
          value: 'B'
        },
        {
          label: 'B-',
          value: 'B-'
        },
        {
          label: 'C+',
          value: 'C+'
        },
        {
          label: 'C',
          value: 'C'
        },
        {
          label: 'C-',
          value: 'C-'
        },
        {
          label: 'N',
          value: 'N'
        }
      ]
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑子项目'
    state.formData = data
  } else {
    state.title = '新增子项目'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增子项目') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
}

const handleAddSubmit = () => {
  const newdata = state.formData
  $api.post('/sci_project/addSub?sci_project_id=' + newdata.sciProjectID + '&sub_project_id=' + newdata.subProjectID + '&head_name=' + newdata.headName + '&sequence_id=' + newdata.sequenceID + '&deadline=' + newdata.deadline + '&fund=' + newdata.fund + '&tech_indicator=' + newdata.techIndicator).then(() => {
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
  $api.put('/sci_project/updateSub?sci_project_id=' + newdata.sciProjectID + '&sub_project_id=' + newdata.subProjectID + '&head_name=' + newdata.headName + '&sequence_id=' + newdata.sequenceID + '&deadline=' + newdata.deadline + '&fund=' + newdata.fund + '&tech_indicator=' + newdata.techIndicator).then(() => {
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
