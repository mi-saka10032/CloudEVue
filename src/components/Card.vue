<template>
<!--  聊天窗口左上角：头像、名称、搜索框-->
  <div id="card">
    <header>
      <img class="avatar" :src="header.src" :alt="header.name">
      <p class="name">{{ header.name }}</p>
    </header>
    <footer>
      <input class="search" type="text" v-model="filterData" placeholder="search user...">
    </footer>
  </div>
</template>

<script>
import {mapState,mapMutations} from "vuex";
export default {
  name: 'Card',
  data() {
    return {
      filterData: ''
    }
  },
  computed: {
    ...mapState('chatting',['header'])
  },
  methods: {
    ...mapMutations('chatting',['emitFilterKey'])
  },
  watch: {
    filterData(newValue) {
      this.emitFilterKey(newValue);
    }
  },
}
</script>

<style lang="less" scoped>
#card {
  padding: 12px;

  .avatar {
    width: 40px;
    height: 40px;
    vertical-align: middle; /*这个是图片和文字居中对齐*/
  }

  .name {
    display: inline-block;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
  }

  .search {
    background: #26292E;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border: 1px solid #3a3a3a;
    border-radius: 4px;
    outline: none; /*鼠标点击后不会出现蓝色边框*/
    color: #FFF;
  }
}
</style>
