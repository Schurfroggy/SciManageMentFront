// 查询条件
export const formItem = [
  {
    label: '项目名称',
    value: 'sciProjectName',
    width: 6,
    type: 'text'
  },
  {
    label: '项目内容',
    value: 'sciProjectContent',
    width: 6,
    type: 'text'
  }
]

// 表头数据
export const tableHead = [
  {
    prop: 'sciProjectID',
    label: '项目ID'
  },
  {
    prop: 'name',
    label: '项目名'
  },
  {
    prop: 'content',
    label: '项目内容'
  },
  {
    prop: 'startDate',
    label: '项目开始时间'
  },
  {
    prop: 'endDate',
    label: '项目结束时间'
  },
  {
    prop: 'headName',
    label: '项目负责人'
  },
  {
    prop: 'clientID',
    label: '委托方ID'
  },
  {
    prop: 'testingID',
    label: '监测方ID'
  },
  {
    prop: 'fund',
    label: '项目资金(元)'
  }
]
// 详情数据
export const detailItem = [
  {
    label: '项目负责人',
    value: 'headName',
    width: 12
  },
  {
    label: '项目名',
    value: 'name',
    width: 12
  },
  {
    label: '项目资金(元)',
    value: 'fund',
    width: 12
  },
  {
    label: '项目内容',
    value: 'content',
    width: 12
  },
  {
    label: '项目开始时间',
    value: 'startDate',
    width: 12
  },
  {
    label: '项目预计结束时间',
    value: 'endDate',
    width: 12
  },
  {
    label: '委托方ID',
    value: 'clientID',
    width: 12
  },
  {
    label: '委托方',
    value: 'clientName',
    width: 12
  },
  {
    label: '合作方ID',
    value: 'partnerID',
    width: 12
  },
  {
    label: '合作方',
    value: 'partnerName',
    width: 12
  },
  {
    label: '监测方ID',
    value: 'testingID',
    width: 12
  },
  {
    label: '监测方',
    value: 'testingName',
    width: 12
  },
  {
    label: '项目科研人员ID',
    value: 'researcherID',
    width: 12
  },
  {
    label: '人员一般工作时间',
    value: 'researcherWorkLoad',
    width: 12
  },
  {
    label: '科研人员一般资金',
    value: 'researcherFund',
    width: 12
  },
  {
    label: '拥有子项目数量',
    value: 'subProjectCount',
    width: 12
  },
  {
    label: '拥有科研成果数量',
    value: 'payoffCount',
    width: 12
  }
]
