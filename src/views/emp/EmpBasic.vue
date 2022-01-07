<template>
  <div ref="tableBox">
    <el-form
        :inline="true"
        :model="searchInline"
        class="left-form"
    >
      <el-form-item label="全局搜索：">
        <el-select v-model="searchInline.label">
          <el-option v-for="item in searchParams" :key="item.value" :label="item.label" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchInline.value" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button type="primary" @click="clearSearch">清除查询</el-button>
      </el-form-item>
    </el-form>
    <el-form
        :inline="true"
        class="right-form"
    >
      <el-form-item>
        <el-button type="primary" disabled>导入数据</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" disabled>导出数据</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" disabled>添加新员工</el-button>
      </el-form-item>
    </el-form>
    <el-table
        ref="multipleTable"
        :data="pagingEmployees"
        :stripe="true"
        border
        tooltip-effect="light"
        style="width: 100%;min-height: 200px"
    >
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          fixed
          prop="workID"
          label="工号"
          align="left"
          width="100">
      </el-table-column>
      <el-table-column
          fixed
          prop="name"
          label="姓名"
          align="left"
          width="80">
      </el-table-column>
      <el-table-column
          prop="gender"
          label="性别"
          align="left"
          width="60">
      </el-table-column>
      <el-table-column
          prop="birthday"
          label="出生日期"
          align="left"
          width="110">
      </el-table-column>
      <el-table-column
          prop="idCard"
          label="身份证号码"
          align="left"
          width="180">
      </el-table-column>
      <el-table-column
          prop="wedlock"
          label="婚姻状况"
          align="left"
          width="80">
      </el-table-column>
      <el-table-column
          prop="nation.name"
          label="民族"
          align="left"
          width="80">
      </el-table-column>
      <el-table-column
          prop="nativePlace"
          label="籍贯"
          align="left"
          width="100">
      </el-table-column>
      <el-table-column
          prop="politic.name"
          label="政治面貌"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          align="left"
          width="200">
      </el-table-column>
      <el-table-column
          prop="phone"
          label="联系电话"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="address"
          label="住址"
          align="left"
          width="350">
      </el-table-column>
      <el-table-column
          prop="department.name"
          label="所属部门"
          align="left"
          width="100">
      </el-table-column>
      <el-table-column
          prop="joblevel.name"
          label="职称"
          align="left"
          width="120">
      </el-table-column>
      <el-table-column
          prop="position.name"
          label="职位"
          align="left"
          width="100">
      </el-table-column>
      <el-table-column
          prop="engageForm"
          label="聘用形式"
          align="left"
          width="100">
      </el-table-column>
      <el-table-column
          prop="tiptopDegree"
          label="最高学历"
          align="left"
          width="110">
      </el-table-column>
      <el-table-column
          prop="school"
          label="毕业院校"
          align="left"
          width="150">
      </el-table-column>
      <el-table-column
          prop="specialty"
          label="专业"
          align="left"
          width="160">
      </el-table-column>
      <el-table-column
          prop="workState"
          label="在职状态"
          align="left"
          width="80">
      </el-table-column>
      <el-table-column
          prop="beginDate"
          label="入职日期"
          align="left"
          width="110">
      </el-table-column>
      <el-table-column
          prop="conversionTime"
          label="转正日期"
          align="left"
          width="110">
      </el-table-column>
      <el-table-column
          prop="beginContract"
          label="合同起始日期"
          align="left"
          width="110">
      </el-table-column>
      <el-table-column
          prop="endContract"
          label="合同截止日期"
          align="left"
          width="110">
      </el-table-column>
      <el-table-column
          prop="contractTerm"
          label="合同期限"
          align="left"
          width="80">
      </el-table-column>
      <el-table-column
          fixed="right"
          header-align="center"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button size="medium" class="emp-button" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="primary" size="medium" class="emp-button">查看高级资料</el-button>
          <el-button type="danger" size="medium" class="emp-button">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        ref="pag"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="changePage"
        @size-change="changeSize"
        :current-page="pagingParams.limit"
        :page-size.sync="pagingParams.pageSize"
        :pager-count="pager_Count"
        :total="this.filterEmployeesLength"
    >
    </el-pagination>
    <EditableDatum :dialogFormVisible="dialogFormVisible" :datum="datum" ref="edit"/>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from "vuex";
import EditableDatum from "@/components/EditableDatum";

export default {
  name: "EmpBasic",
  data() {
    return {
      //搜索栏label与value
      searchParams: [
        {label: '工号', value: 'workID'},
        {label: '姓名', value: 'name'},
        {label: '性别', value: 'gender'},
        {label: '出生日期', value: 'birthday'},
        {label: '身份证号', value: 'idCard'},
        {label: '婚姻状况', value: 'wedlock'},
        {label: '民族', value: 'nation'},
        {label: '籍贯', value: 'nativePlace'},
        {label: '政治面貌', value: 'politic'},
        {label: '邮箱', value: 'email'},
        {label: '联系电话', value: 'phone'},
        {label: '住址', value: 'address'},
        {label: '所属部门', value: 'department'},
        {label: '职称', value: 'joblevel'},
        {label: '职位', value: 'position'},
        {label: '聘用形式', value: 'engageForm'},
        {label: '最高学历', value: 'tiptopDegree'},
        {label: '毕业院校', value: 'school'},
        {label: '专业', value: 'specialty'},
        {label: '在职状态', value: 'workState'},
        {label: '入职日期', value: 'beginDate'},
        {label: '转正日期', value: 'conversionTime'},
        {label: '合同起始日期', value: 'beginContract'},
        {label: '合同截止日期', value: 'endContract'}
      ],
      //搜索框的值
      searchInline: {
        label: 'name',
        value: ''
      },
      //分页参数
      pagingParams: {
        limit: 1,
        pageSize: 10
      },
      //编辑信息弹窗控制和数据对象datum
      dialogFormVisible: false,
      datum: {}
    }
  },
  components: {
    EditableDatum
  },
  computed: {
    //分页数组提供页面数据展示
    ...mapState('employeesLists', ['allEmployees', 'pagingEmployees']),
    //筛选数组长度提供分页栏总数total计算
    ...mapGetters('employeesLists', ['filterEmployeesLength']),
    //计算页码数量，为了不让中间页码隐藏
    pager_Count() {
      const size = Math.ceil(this.filterEmployeesLength / this.pagingParams.pageSize);
      //size必为正整数，小于4的情况，直接返回最小奇数5
      if (size > 21) {
        return 21;
      } else if (size < 4) {
        return 5;
        //size大等于4时，偶数则加1后返回
      } else if (size % 2 === 0) {
        return size + 1;
        //大等于4的奇数直接返回
      } else return size;
    }
  },
  methods: {
    //分页数组方法，查询数组方法
    ...mapActions('employeesLists', ['pagingContent', 'searchContent']),
    //初始化全部员工数组
    ...mapMutations('employeesLists', ['initEmployees']),
    //挂载时调用初始化获取全部员工数组方法
    mountedInitEmployees() {
      this.loadingInstance = this.isLoading(this.$refs.tableBox, '正在加载中……');
      this.$getRequest('/employee/emp/basic').then(value => {
        //挂载完成，将所有员工信息置入vuex中
        this.initEmployees(value);
        //初始化完成后进行数组分页，载入分页数组
        this.pagingContent(this.pagingParams);
        this.loadingInstance.close();
      }).catch(error => {
        console.log(error);
        this.loadingInstance.close();
      });
    },
    //分页切换
    changePage(page) {
      this.pagingParams.limit = page;
      this.pagingContent(this.pagingParams);
    },
    //单页展示数量变化
    changeSize(size) {
      this.pagingParams.pageSize = size;
      this.pagingParams.limit = 1;
      this.pagingContent(this.pagingParams);
    },
    //将点击行数据和开启条件发送给子组件，让dialog显示
    handleEdit(row) {
      this.datum = row;
      this.dialogFormVisible = true;
    },
    //接收到dialog传回的数据后，向服务端发送修改请求
    modifyData(data) {
      this.$postRequest('/employee/emp/modify', data).then(() => {
        //修改成功后需要更新筛选数组，再调用一次初始化数组请求，加入延时等待数据库刷新
        setTimeout(() => {
          this.mountedInitEmployees();
        }, 1000);
      }).catch(error => {
        console.log(error);
      });
    },
    //全局查询
    async searchData() {
      await this.searchContent(this.searchInline);
      await this.pagingContent(this.pagingParams);
    },
    //清除查询
    clearSearch() {
      this.initEmployees(this.allEmployees);
      this.pagingContent(this.pagingParams);
    }
  },
  //挂载时初始化全部员工信息数组，同时绑定来自dialog发射的关闭事件和修改信息发送事件
  mounted() {
    this.mountedInitEmployees();
    //可编辑资料的子组件关闭时发射事件通知父组件关闭dialogFormVisible，使子组件关闭
    this.$refs.edit.$on('changeVisibility', () => {
      this.dialogFormVisible = false;
    });
    this.$refs.edit.$on('sendModifyMessage', (data) => {
      this.modifyData(data);
    });
  }
}
</script>

<style scoped>
.left-form {
  float: left;
}
.right-form {
  float: right;
}
.emp-button {
  padding: 0px;
}
</style>