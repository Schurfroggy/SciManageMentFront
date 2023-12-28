import Layout from '@/layout/index.vue'
import RouteView from '@/components/Tool/RouteView.vue'
import { t } from '@/hooks/web/usei18n'
const layoutMap = [
  {
    path: 'home',
    name: 'Home',
    component: () => import('@/view/home/index.vue'),
    meta: { title: t('router.home'), icon: 'HomeFilled' }
  },
  {
    path: 'introduction',
    name: 'introduction',
    component: () => import('@/view/introduction/index.vue'),
    meta: { title: t('router.introduction'), icon: 'HelpFilled' }
  },
  {
    path: 'Projects and labs',
    name: 'Projects and labs',
    component: RouteView,
    meta: { title: t('router.Projects_and_labs.Projects_and_labs'), icon: 'Monitor' },
    redirect: { name: 'LabManage' },
    children: [
      {
        path: 'lab-manage',
        name: 'LabManage',
        meta: { title: t('router.Projects_and_labs.LabManage'), icon: 'School' },
        component: () => import('@/view/Projects and labs/lab-manage/index.vue')
      },
      {
        path: 'project-manage',
        name: 'ProjectManage',
        meta: { title: t('router.Projects_and_labs.ProjectManage'), icon: 'Management' },
        component: () => import('@/view/Projects and labs/project-manage/index.vue')
      },
      {
        path: 'subproject-manage',
        name: 'SubProjectManage',
        meta: { title: t('router.Projects_and_labs.SubProjectManage'), icon: 'List' },
        component: () => import('@/view/Projects and labs/subproject-manage/index.vue')
      },
      {
        path: 'payoff-manage',
        name: 'PayoffManage',
        meta: { title: t('router.Projects_and_labs.PayoffManage'), icon: 'Medal' },
        component: () => import('@/view/Projects and labs/payoff-manage/index.vue')
      }
    ]
  },
  {
    path: 'Human Resource',
    name: 'Human Resource',
    component: RouteView,
    meta: { title: t('router.Human_Resource.Human_Resource'), icon: 'User' },
    redirect: { name: 'ResearcherManage' },
    children: [
      {
        path: 'researcher-manage',
        name: 'ResearcherManage',
        meta: { title: t('router.Human_Resource.Researcher'), icon: 'UserFilled' },
        component: () => import('@/view/Human Resource/researcher-manage/index.vue')
      },
      {
        path: 'director-manage',
        name: 'DirectorManage',
        meta: { title: t('router.Human_Resource.Director'), icon: 'Avatar' },
        component: () => import('@/view/Human Resource/director-manage/index.vue')
      },
      {
        path: 'secretary-manage',
        name: 'SecretaryManage',
        meta: { title: t('router.Human_Resource.Secretary'), icon: 'Service' },
        component: () => import('@/view/Human Resource/secretary-manage/index.vue')
      }
    ]
  },
  {
    path: 'Land and Units',
    name: 'Land and Units',
    component: RouteView,
    meta: { title: t('router.Land_and_Units.Land_and_Units'), icon: 'MapLocation' },
    redirect: { name: 'UserManage' },
    children: [
      {
        path: 'client-manage',
        name: 'ClientManage',
        meta: { title: t('router.Land_and_Units.ClientManage'), icon: 'Coin' },
        component: () => import('@/view/Land and Units/client-manage/index.vue')
      },
      {
        path: 'partner-manage',
        name: 'PartnerManage',
        meta: { title: t('router.Land_and_Units.PartnerManage'), icon: 'Coordinate' },
        component: () => import('@/view/Land and Units/partner-manage/index.vue')
      },
      {
        path: 'testing-manage',
        name: 'TestingManage',
        meta: { title: t('router.Land_and_Units.TestingManage'), icon: 'Tools' },
        component: () => import('@/view/Land and Units/testing-manage/index.vue')
      },
      {
        path: 'office-manage',
        name: 'OfficeManage',
        meta: { title: t('router.Land_and_Units.OfficeManage'), icon: 'OfficeBuilding' },
        component: () => import('@/view/Land and Units/office-manage/index.vue')
      }
    ]
  },
  {
    path: 'Contact Numbers',
    name: 'Contact Numbers',
    component: RouteView,
    meta: { title: t('router.Contact_Numbers.Contact_Numbers'), icon: 'Promotion' },
    redirect: { name: 'NumberManage' },
    children: [
      {
        path: 'number-manage',
        name: 'NumberManage',
        meta: { title: t('router.Contact_Numbers.Numbers'), icon: 'PhoneFilled' },
        component: () => import('@/view/Contact Numbers/number-manage/index.vue')
      }
    ]
  }
]

const routes = [
  {
    path: '/',
    name: 'Layout',
    meta: { title: t('router.home') },
    redirect: { name: 'Home' },
    component: Layout,
    children: [...layoutMap]
  },
  {
    path: '/login/:type?',
    name: 'Login',
    meta: { title: t('router.login') },
    component: () => import('@/view/login/Login.vue')
  }
]
export { routes, layoutMap }
