import {getRequest} from "../utils/api";

const chatting = {
    namespaced: true,
    state: {
        //个人的头部头像和名字
        header: {
            name: '',
            src: ''
        },
        otherAdmins: [],
        //聊天用户信息
        sessions: [],
        //当前聊天用户的id，用于切换聊天框显示
        currentSessionId: 0,
        //信息发送红点提示
        redDot: false,
        tipId: 0,
        //左上角搜索框输入
        filterKey: ''
    },
    getters: {},
    mutations: {
        //消除红点
        eraseRedDot(state) {
            state.redDot = false;
        },
        //将搜索框的值发射给filterKey保存
        emitFilterKey(state, data) {
            state.filterKey = data;
        },
        //将首页获取到的头像地址和名称发射给header保存
        emitHeader(state, {name, src}) {
            state.header.name = name;
            state.header.src = src;
        },
        //切换聊天用户id
        changeCurrentSessionId(state, data) {
            const session = state.sessions.filter(item => item.id && item.id === data.id);
            //如果在当前缓存中找不到用户信息，则新建一个用户信息对象
            if (session.length === 0) {
                state.sessions.push({...data, messages: []});
            }
            //切换当前id
            state.currentSessionId = data.id;
        },
        //接收聊天信息
        getMessage(state, data) {
            //获取基于当前激活用户的id-1的数组索引元素，往messages数组里push一个新的对象，包含信息内容、最新发送时间、自己信息的self标识
            let curIndex = -1;
            const {fromId} = data;
            //先找sessions里面有没有数据，forEach找到了就直接push
            state.sessions.forEach((item, index) => {
                if (item.id === fromId) curIndex = index;
            })
            if (curIndex !== -1) {
                state.sessions[curIndex].messages.push(data);
            }
            //找不到再新建聊天session对象，由于websocket联络已经成功发送请求，所以fromId一定存在于otherAdmins中
            else {
                const admin = state.otherAdmins.filter(item => item.id === fromId)[0];
                const messages = [data];
                state.sessions.push({...admin, messages});
            }
            state.redDot = true;
            state.tipId = fromId;
        },
        //发送本地聊天的自己信息
        addMessage(state, data) {
            let curIndex = -1;
            const {toId} = data;
            state.sessions.forEach((item, index) => {
                if (item.id === toId) curIndex = index;
            });
            if (curIndex !== -1) {
                state.sessions[curIndex].messages.push(data);
            }
            //找不到再新建聊天session对象，data中包含fromId值，可锁定对方，其实对方id这时候也等同于currentSessionId
            else {
                const admin = state.otherAdmins.filter(item => item.id === toId)[0];
                const messages = [data];
                state.sessions.push({...admin, messages});
            }
        },
        //初始化其他管理员的头像
        //初始化数据，如果本地存储存在历史记录，则将历史记录赋给sessions，否则就建立全新的数组
        INIT_ADMINS(state, data) {
            state.otherAdmins = data;
            let local = localStorage.getItem('vue-chat-session');
            if (local) state.sessions = JSON.parse(local);
        }
    },
    actions: {
        initData({commit}) {
            commit('INIT_DATA')
        },
        //初始化管理员，将第一个元素的id赋给CurrentSessionId
        initAdmins({commit, state}) {
            getRequest('/getadminsinfo').then(value => {
                commit('INIT_ADMINS', value);
                //将默认第一个元素的id赋给currentSessionId，让页面有一个初始聊天对象
                state.currentSessionId = value[0].id;
            }).catch(error => {
                console.log(error);
            });
        }
    }
};

export default chatting;