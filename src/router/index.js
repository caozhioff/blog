import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import About from '@/components/About.vue'
import My from '@/components/My.vue'
import Contact from '@/components/Contact.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'

Vue.use(VueRouter);

const routes = [
    {
        path:'/',
        component:Home
    },
    {
        path:'/about',
        component:About
    },
    {
        path:'/my',
        component:My
    },
    {
        path:'/contact',
        component:Contact
    },
    {
        path:'/register',
        component:Register
    },
    {
        path:'/login',
        component:Login
    }
]

export default new VueRouter({
    routes
})