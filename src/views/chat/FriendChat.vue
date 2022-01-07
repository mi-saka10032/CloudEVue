<template>
  <div id="app">
    <div class="sidebar">
      <Card/>
      <List/>
    </div>
    <div class="main">
      <Message/>
      <UserText/>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import Card from '@/components/Card';
import List from '@/components/List';
import Message from '@/components/Message';
import UserText from '@/components/UserText';

export default {
  name: 'FriendChat',
  components: {
    Card, List, Message, UserText
  },
  methods: {
    ...mapActions('chatting', ['initAdmins'])
  },
  mounted() {
    //初始化其他管理员名字和头像，以及历史记录
    this.initAdmins();
    //页面挂载给服务器发送上线事件online
    this.$socket.emit('online', window.sessionStorage.getItem('cloudetoken'));
  }
}
</script>

<style lang="less" scoped>
#app {
  margin: 20px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 10px;

  .sidebar, .main {
    height: 100%;
  }

  .sidebar {
    float: left;
    color: #f4f4f4;
    background-color: #2e3238;
    width: 200px;
  }

  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
}
</style>
