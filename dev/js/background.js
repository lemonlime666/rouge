Vue.config.devtools = true;

Vue.component('member',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>會員管理template放這</h2>
    `,
    mounted(){

    },
})

Vue.component('staff',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>員工管理template放這</h2>
    `,
    mounted(){

    },
})

Vue.component('product',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>商品管理template放這</h2>
    `,
    mounted(){

    },
})

Vue.component('pdpost',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>商品留言管理template放這</h2>
    `,
    mounted(){

    },
})

Vue.component('orderlist',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>訂單管理template放這</h2>
    `,
    mounted(){

    },
})

Vue.component('advert',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>廣告管理template放這</h2>
    `,
    mounted(){

    },
})

Vue.component('promotion',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>促銷方案管理template放這</h2>
    `,
    mounted(){

    },
})

Vue.component('gift',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>贈品管理template放這</h2>
    `,
    mounted(){

    },
})

Vue.component('anal',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>保養分析結果資料管理template放這</h2>
    `,
    mounted(){

    },
})

Vue.component('card',{
    props:[],
    data(){
        return {

        };
    },
    template: `
        <h2>明信片管理template放這</h2>
    `,
    mounted(){

    },
})


const background = new Vue({
    el:'#background',
    data:{
        content:'member',
    },
    methods: {
        changeSub(e){
            $('.sub').removeClass('activeSub');
            e.target.classList.add('activeSub');
            this.content = e.target.dataset.subject;
            
        }
    },
    mounted(){

    },
})