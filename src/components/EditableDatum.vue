<template>
  <el-dialog title="编辑员工信息" :visible="dialogFormVisible" @open="initContent" @close="closeDialog">
    <el-form ref="form" :model="formDatum" label-width="80px">
      <el-row>
        <el-col :span="5">
          <el-form-item label="工号" size="mini">
            <el-input v-model="formDatum.workID"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="姓名" size="mini">
            <el-input v-model="formDatum.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="性别" size="mini">
            <el-radio-group v-model="formDatum.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="出生日期" size="mini">
            <el-date-picker type="date" v-model="formDatum.birthday" value-format="yyyy-MM-dd" size="mini"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="身份证号" size="mini">
            <el-input v-model="formDatum.idCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="婚姻状况" size="mini">
            <el-radio-group v-model="formDatum.wedlock">
              <el-radio label="未婚"/>
              <el-radio label="已婚"/>
              <el-radio label="离异"/>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="民族" size="mini">
            <el-select v-model="formDatum.nationId">
              <el-option v-for="item in nation" :key="item.id" :label="item.name" :value="item.id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">
          <el-form-item label="籍贯" size="mini">
            <el-input v-model="formDatum.nativePlace"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="政治面貌" size="mini">
            <el-select v-model="formDatum.politicId">
              <el-option v-for="item in politics" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="邮箱" size="mini">
            <el-input v-model="formDatum.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="联系电话" size="mini">
            <el-input v-model="formDatum.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="住址" size="mini">
            <el-input v-model="formDatum.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="所属部门" size="mini">
            <el-select v-model="formDatum.departmentId" size="mini">
              <el-option v-for="item in department" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="职称" size="mini">
            <el-select v-model="formDatum.jobLevelId" size="mini">
              <el-option v-for="item in jobLevel" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="职位" size="mini">
            <el-select v-model="formDatum.posId" size="mini">
              <el-option v-for="item in position" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="聘用形式" size="mini">
            <el-radio-group v-model="formDatum.engageForm">
              <el-radio label="劳动合同"/>
              <el-radio label="劳务合同"/>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="最高学历" size="mini">
            <el-select v-model="formDatum.tiptopDegree">
              <el-option v-for="item in tiptopDegree" :key="item.id" :label="item.value" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="毕业院校" size="mini">
            <el-input v-model="formDatum.school"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="专业" size="mini">
            <el-input v-model="formDatum.specialty"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="在职状态" size="mini">
            <el-radio-group v-model="formDatum.workState">
              <el-radio label="在职"/>
              <el-radio label="离职"/>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="入职日期" size="mini">
            <el-date-picker type="date" v-model="formDatum.beginDate" value-format="yyyy-MM-dd" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="转正日期" size="mini">
            <el-date-picker type="date" v-model="formDatum.conversionTime" value-format="yyyy-MM-dd" size="mini"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="合同起始日期" size="mini" label-width="100px">
            <el-date-picker type="date" v-model="formDatum.beginContract" value-format="yyyy-MM-dd" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="合同截止日期" size="mini" label-width="100px">
            <el-date-picker type="date" v-model="formDatum.endContract" value-format="yyyy-MM-dd" size="mini"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sendDialog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import deepCopy from "@/utils/deepCopy";
import department from "@/assets/config/department";
import jobLevel from "@/assets/config/jobLevel";
import nation from "@/assets/config/nation";
import politics from "@/assets/config/politics";
import position from "@/assets/config/position";
import tiptopDegree from "@/assets/config/tiptopDegree";

export default {
  name: "EditableDatum",
  data() {
    return {
      department,
      jobLevel,
      nation,
      politics,
      position,
      tiptopDegree,
      //传入对象初始化，深拷贝传递值
      formDatum: {},
    }
  },
  props: ['dialogFormVisible', 'datum'],
  methods: {
    //新老信息数据比较，只比较值不比较对象，对象是其他table的外键关联项，无需修改
    compareData() {
      let callBackObj = {};
      callBackObj.id = this.formDatum.id;
      for (const key in this.formDatum) {
        if (!(this.formDatum[key] instanceof Object)) {
          const newValue = this.formDatum[key];
          const oldValue = this.datum[key];
          if (newValue !== oldValue) {
            callBackObj[key] = newValue;
          }
        }
      }
      return callBackObj;
    },
    //发送信息提示
    sendDialog() {
      const callBackObj = this.compareData();
      //因为默认将id传入，所以长度最少为1，只有长度为2数据实际上才有修改
      if (Object.keys(callBackObj).length === 1) this.closeDialog();
      else {
        this.$uiMessageBox.confirm('检测到信息已修改，该操作会永久修改员工信息，是否修改？', '修改警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.$emit('sendModifyMessage', callBackObj);
          this.closeDialog();
          //修改成功的信息由服务器返回
        }).catch(() => {
          this.$uiMessage.info('操作撤销');
        });
      }
    },
    //关闭弹窗
    closeDialog() {
      this.$emit('changeVisibility');
    },
    //初始化深拷贝数组
    initContent() {
      this.formDatum = deepCopy({}, this.datum);
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 60px;
}
</style>