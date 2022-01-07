const mixins = {
    methods: {
        //返回一个loading对象，用于控制loading开关
        isLoading(element,text) {
            //Loading对象-->>loadingInstance
            return this.$uiLoading.service({
                target: element,
                text: text,
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.8)"
            });
        }
    }
}
export default mixins;