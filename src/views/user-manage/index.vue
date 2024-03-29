<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
        >
          {{ $t('excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">
          {{ $t('excel.exportExcel') }}
        </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" :label="$t('excel.name')">
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('excel.mobile')">
        </el-table-column>
        <el-table-column :label="$t('excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column :label="$t('excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="default">{{
                item.title
              }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="default">{{ $t('excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column :label="$t('excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('excel.action')"
          fixed="right"
          width="260"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="default"
              @click="onShowClick(row._id)"
              >{{ $t('excel.show') }}</el-button
            >
            <el-button
              type="info"
              size="default"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
              >{{ $t('excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              size="default"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t('excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <roles-dialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    ></roles-dialog>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
import ExportToExcel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
// 监听语言切换
watchSwitchLang(getListData)
// 处理导入用户后数据不重新加载的问题
onActivated(getListData)

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

const router = useRouter()
/**
 * excel 导入点击事件
 */
const onImportExcelClick = () => {
  router.push('/user/import')
}
/**
 * 查看用户详情按钮点击事件
 */
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}
/**
 * 查看角色的点击事件
 * 为员工分配角色
 */
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}
// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})
/**
 * 删除按钮点击事件
 * 删除用户
 */
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('excel.dialogTitle1') +
      row.username +
      i18n.t('excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('excel.removeSuccess'))
    // 重新渲染数据
    getListData()
  })
}

/**
 * excel 导出点击事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  :deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  :deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
