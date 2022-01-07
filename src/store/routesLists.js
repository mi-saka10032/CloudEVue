const routesLists = {
    namespaced: true,
    state: {
        routes: []
    },
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        }
    },
    actions: {},
    getters: {}
};

export default routesLists;