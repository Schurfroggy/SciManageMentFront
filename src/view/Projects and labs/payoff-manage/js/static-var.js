// 查询条件
export const formItem = [
  {
    label: '研究成果名称',
    value: 'payoffName',
    width: 6,
    type: 'text'
  }
]

// 表头数据
export const tableHead = [
  {
    prop: 'payoffID',
    label: '研究成果ID'
  },
  {
    prop: 'type',
    label: '成果种类'
  },
  {
    prop: 'name',
    label: '成果名'
  },
  {
    prop: 'date',
    label: '取得时间'
  },
  {
    prop: 'ranks',
    label: '排名'
  }
]
// 详情数据
export const detailItem = [
  {
    label: '所属项目ID',
    value: 'sciProjectID',
    width: 12
  },
  {
    label: '所属项目名',
    value: 'sciProjectName',
    width: 12
  },
  {
    label: '所属项目内容',
    value: 'sciProjectContent',
    width: 12
  },
  {
    label: '项目完成时间',
    value: 'sciProjectEndDate',
    width: 12
  },
  {
    label: '项目经费',
    value: 'sciProjectFund',
    width: 12
  }
]
