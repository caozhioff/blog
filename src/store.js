import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        username:''
    },
    mutations:{
        changeUser(state,newVal){
            state.username = newVal
        }
    }
})

export default store