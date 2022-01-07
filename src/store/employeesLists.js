import deepCopy from "@/utils/deepCopy";

const employeesLists = {
    namespaced: true,
    //state存储三个数据，所有员工数据，筛选员工数据，当前分页下的员工数据
    state: {
        //所有员工数组不向任何组件发布，仅初始化时注入，用于向筛选数组提供原始数据
        allEmployees: [],
        //筛选数组原则上也不向组件发布，仅是为了提供数组长度计算，或其他用途
        filterableEmployees: [],
        //分页数组向有需要的组件发布，此类组件大多有分页功能，组件传入页码和数目，通过对筛选数组的计算，得出分页数组的数据，向组件发布
        pagingEmployees: []
    },
    //mutations只提供
    mutations: {
        //组件初次挂载时调用，得到所有员工数组，第一次加载将所有员工数组全部赋给筛选数组
        initEmployees(state, data) {
            //初始默认让筛选数组等于全部员工信息数组
            state.allEmployees = deepCopy(data);
            state.filterableEmployees = deepCopy(data);
        },
        //筛选actions方法调用时调用
        filterEmployees(state, data) {
            //该数组用于给组件提供实际数据
            state.filterableEmployees = deepCopy(data);
        },
        //分页actions方法调用时调用
        pagEmployees(state, data) {
            state.pagingEmployees = deepCopy(data);
        }
    },
    actions: {
        //分页actions方法，提供分页
        pagingContent({commit, state: {filterableEmployees}}, {limit, pageSize}) {
            const tempData = filterableEmployees.slice((limit - 1) * pageSize, limit * pageSize);
            commit('pagEmployees', tempData);
        },
        //全局查询，当label名称为特殊名称时，去判断对象里的name，否则直接判断key名，符合条件的推入临时数组，传递给筛选数组
        searchContent({commit, state: {allEmployees}}, {label, value}) {
            let tempData = [];
            for (const item of allEmployees) {
                if (label === 'department' || label === 'joblevel' || label === 'nation' || label === 'politic' || label === 'position') {
                    if (item[label].name && item[label]['name'].indexOf(value) !== -1) tempData.push(item);
                } else {
                    if (item[label] && item[label].indexOf(value) !== -1) tempData.push(item);
                }
            }
            commit('filterEmployees', tempData);
        }
    },
    getters: {
        //计算筛选员工数组长度，用于传递给分页栏总数total
        filterEmployeesLength({filterableEmployees}) {
            return filterableEmployees.length;
        }
    }
};

export default employeesLists;