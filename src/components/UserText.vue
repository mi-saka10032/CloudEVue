<template>
  <div id="user-text">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup.ctrl.enter="sendMessage"></textarea>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import {nanoid} from "nanoid";

export default {
  name: 'UserText',
  data() {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState('chatting', ['currentSessionId'])
  },
  methods: {
    ...mapMutations('chatting', ['addMessage']),
    sendMessage() {
      if (this.content.length) {
        const msg = {
          id: nanoid(),
          content: this.content,
          date: new Date()
        };
        //向服务端发送信息发送消息
        this.messageInteraction(msg);
        //清空
        this.content = '';
      }
    },
    messageInteraction(msg) {
      const fromToken = window.sessionStorage.getItem('cloudetoken');
      const toId = this.currentSessionId;
      //向服务端发送auth-id-message事件
      this.$socket.emit('auth-id-message', {fromToken, toId, msg});
    }
  },
  sockets: {
    NotOnline() {
      this.$uiMessage.error({message: '对方未在线,发送失败！'});
    },
    SuccessfulSending(data) {
      //成功后返回，再向页面添加，并在data中添加self标志表明是己方消息
      this.addMessage({...data,self: true});
    }
  },
  mounted() {
    this.$socket.emit('NotOnline', {subscribe: true});
    this.$socket.emit('SuccessfulSending', {subscribe: true});
  }
}
</script>

<style lang="less" scoped>
#user-text {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #DDD;

  > textarea {
    padding: 10px;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
}
</style>
