<template>
  <!--  右侧上方聊天消息显示窗口-->
  <div id="message" v-scroll-bottom="sessions">
    <!--    首次判断，只显示当前激活的聊天用户聊天信息-->
    <ul v-if="currentSession">
      <li v-for="item in currentSession.messages" :key="item.id">
        <p class="time">
          <span>{{ item.date | time }}</span>
        </p>
        <!--   self显示为自己发的消息，靠右显示-->
        <div class="main" :class="{ self: item.self}">
          <!--   如果元素靠右显示，那么显示自己的头像，否则显示聊天用户的头像     -->
          <img class="avatar" :src="item.self ? header.src : currentSession.userFace" alt="">
          <div class="text">{{ item.content }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'Message',
  computed: {
    ...mapState('chatting', ['sessions', 'currentSessionId', 'header']),
    currentSession() {
      //返回当前唯一显示的用户id，返回数组第一个索引0的元素
      return this.sessions.filter(item => this.currentSessionId === item.id)[0];
    }
  },
  methods: {
    ...mapMutations('chatting',['getMessage'])
  },
  //过滤器目的是判断新消息不存在时间信息存储，因为将最新时间获取后返回最新时和分
  filters: {
    time(date) {
      //此处已存在的date为字符串格式，需要new Date转化
      let tempDate;
      if (date) tempDate = new Date(date);
      else tempDate = new Date();
      return `${tempDate.getHours()}:${tempDate.getMinutes()}`;
    }
  },
  directives: {/*这个是vue的自定义指令,官方文档有详细说明*/
    // 发送消息后滚动到底部,这里无法使用原作者的方法，也未找到合理的方法解决，暂用setTimeout的方法模拟
    'scroll-bottom'(el) {
      setTimeout(function () {
        el.scrollTop += 9999;
      }, 1)
    }
  },
  //在聊天窗中开启socket监听，监听来自websocket的另一个客户端信息，此处除了另一端发送的信息id、内容、时间以外，还包含一个toId，
  //指向目标用户
  sockets: {
    MessageInteraction(data) {
      this.getMessage(data);
    }
  },
  mounted() {
    //发起订阅
    this.$socket.emit('MessageInteraction', {subscribe: true});
  }
}
</script>

<style lang="less" scoped>
#message {
  padding: 15px;
  max-height: 68%;
  overflow-y: scroll;

  ul {
    list-style-type: none;

    li {
      margin-bottom: 15px;
    }
  }

  .time {
    text-align: center;
    margin: 7px 0;

    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #FFF;
      background-color: #dcdcdc;
      border-radius: 2px;
    }
  }

  .main {
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
      width: 30px;
      height: 30px;

    }

    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #fafafa;
      border-radius: 4px;
      line-height: 30px;
    }
  }

  .self {
    text-align: right;

    .avatar {
      float: right;
      margin: 0 0 0 10px;
      border-radius: 3px;
      width: 30px;
      height: 30px;
    }

    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #b2e281;
      border-radius: 4px;
      line-height: 30px;
    }
  }
}
</style>
