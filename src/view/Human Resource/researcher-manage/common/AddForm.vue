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
    researcherID: formRules('must'),
    labID: formRules('must'),
    name: formRules('must'),
    subProjectID: formRules('must'),
    gender: formRules('must'),
    age: formRules('must'),
    professionGrade: formRules('must'),
    researchDirection: formRules('must')
  },
  formData: {
    researcherID: '',
    labID: '',
    name: '',
    subProjectID: '',
    gender: '',
    age: '',
    professionGrade: '',
    researchDirection: ''
  },
  formItem: [
    {
      label: '科研成员ID',
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
      label: '姓名',
      type: 'text',
      value: 'name',
      width: 24
    },
    {
      label: '负责子项目ID',
      type: 'number',
      value: 'subProjectID',
      width: 24
    },
    {
      label: '性别',
      type: 'select',
      value: 'gender',
      width: 24,
      children: [
        { value: '男', label: '男' },
        { value: '女', label: '女' }
      ]
    },
    {
      label: '年龄',
      type: 'number',
      value: 'age',
      width: 24
    },
    {
      label: '职称',
      type: 'select',
      value: 'professionGrade',
      width: 24,
      children: [
        { value: '实习研究员', label: '实习研究员' },
        { value: '助理研究员', label: '助理研究员' },
        { value: '研究员', label: '研究员' },
        { value: '副教授', label: '副教授' },
        { value: '教授', label: '教授' },
        { value: '副院长', label: '副院长' },
        { value: '院长', label: '院长' }
      ]
    },
    {
      label: '研究方向',
      type: 'textarea',
      value: 'researchDirection',
      width: 24
    }
  ]
})
const formRef = ref(null)

function open(data) {
  state.formData = {}
  if (data) {
    state.title = '编辑科研人员'
    state.formData = data
  } else {
    state.title = '新增科研人员'
  }
  state.dialogVisible = true
}

const edit = (data) => {}
// 确定
const confirm = () => {
  formRef.value.submitForm()
  if (state.title === '新增科研人员') {
    handleAddSubmit()
  } else {
    handleEditSubmit()
  }
}

const handleAddSubmit = () => {
  const newdata = state.formData
  $api.post('/researcher/add?researcher_id=' + newdata.researcherID + '&name=' + newdata.name + '&sub_project_id=' + newdata.subProjectID + '&lab_id=' + newdata.labID + '&gender=' + newdata.gender + '&age=' + newdata.age + '&profession_grade=' + newdata.professionGrade + '&research_direction=' + newdata.researchDirection).then(() => {
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
  $api.put('/researcher/update?researcher_id=' + newdata.researcherID + '&name=' + newdata.name + '&sub_project_id=' + newdata.subProjectID + '&lab_id=' + newdata.labID + '&gender=' + newdata.gender + '&age=' + newdata.age + '&profession_grade=' + newdata.professionGrade + '&research_direction=' + newdata.researchDirection).then(() => {
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
