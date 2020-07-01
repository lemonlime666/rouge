Vue.config.devtools = true;
Vue.component('meminfo', {
    props: [],
    data() {
        return {

        };
    },
    template: `
    <div class="contentBox">
        <form action="" class="mem_info">
            <p>姓名：</p> 
            <input type="text" placeholder="Name" name="" class="mem_input">
        </form>
        <form action="" class="mem_info">
            <p>Email：</p> 
            <input type="email" placeholder="Phone" name="" class="mem_input">
        </form>
        <form action="" class="mem_info">
            <p>電話：</p> 
            <input type="tel" placeholder="Email" name="" class="mem_input">
        </form>
        <form action="" class="mem_info">
            <p>地址：</p> 
            <input type="text" placeholder="Address" name="" class="mem_input">
        </form>
    </div>
    `,
})

Vue.component('orderlist', {
    props: [],
    data() {
        return {
            list:'tab1',
        };
    },
    methods: {
        orderTab(e){
            $('.mem_buybtn').removeClass('mem_buyactive');
            e.target.classList.add('mem_buyactive');
            this.list = e.target.dataset.list;
        }
    },
    template: `
    <div class="contentBox">
                <div class="mem_detailGroupbtn">
                    <button class="mem_buybtn mem_buyactive" data-list="tab1" @click="orderTab">全部</button>
                    <button class="mem_buybtn" data-list="tab2" @click="orderTab">待付款</button>
                    <button class="mem_buybtn" data-list="tab3" @click="orderTab">待出貨</button>
                    <button class="mem_buybtn" data-list="tab4" @click="orderTab">待收貨</button>
                    <button class="mem_buybtn" data-list="tab5" @click="orderTab">完成</button>
                    <button class="mem_buybtn" data-list="tab6" @click="orderTab">取消</button>
                </div>
                
                <div class="mem_buycontent">  
                    <div class="mem_buy mem_buyTabOne">
                        <table class="mem_tablegroup">
                            <tr class="mem_buydetail_title">
                                <th>訂單編號</th>
                                <th>訂單日期</th>
                                <th>狀態</th>
                                <th>金額</th>
                                <th>寄送地址</th>
                                <th>詳細資料</th>
                            </tr>
                            <tbody id="mem_buydetail_info">
                                <component :is="list"><component>
                            </tbody>
                        </table>
                    </div>
                </div>
    </div>
    `,
})

Vue.component('analinfo', {
    props: [],
    data() {
        return {

        };
    },
    template: `
    <div class="contentBox">
        <div class="mem_skinanalysis">
            <div class="mem_title">
                <p class="mem_date">測驗日期：2020/06/06</p>
                <h1 class="mem_maintitle">檢測結果：油性肌</h1>
                <p class="mem_exp">油性肌的人洗臉次數可一天2-3次，應選用清爽的洗臉和保養產品控制油脂分泌，也建議少吃油炸類、過甜、過辣的食物。</p>
            </div>
            <button class="mem_skincarePd">建議保養步驟與商品</button>
        </div>
    </div>
    `,
})

Vue.component('mypostcard', {
    props: [],
    data() {
        return {

        };
    },
    template: `
    <div class="contentBox">
        <div class="mem_createcard">
            <div class="mem_card">
                <div class="mem_img"></div>
                <p class="mem_text">參賽日期：2020/06/06</p>
                <p class="mem_text">票數：155</p>
            </div>
        </div>
    </div>
    `,
})

Vue.component('tab1',{ 
    template: `
            <div>tab1</div>
    `,
});
Vue.component('tab2',{ 
    template: `
            <div>tab2</div>
    `,
});
Vue.component('tab3',{ 
    template: `
            <div>tab3</div>
    `,
});
Vue.component('tab4',{ 
    template: `
            <div>tab4</div>
    `,
});
Vue.component('tab5',{ 
    template: `
            <div>tab5</div>
    `,
});
Vue.component('tab6',{ 
    template: `
            <div>tab6</div>
    `,
});

const contents = new Vue({
    el: '#mainSection',
    data:{
        content:'meminfo',
    }
})
