Vue.config.devtools = true;
Vue.component('meminfo', {
    props: [],
    data() {
        return {
            counter:0,
            subject:['name','mail','phone','address'],
        };
    },
    template: `
    <div class="contentBox">
        <form action="" class="mem_info">
            <label for="name">
            <span class="subjectBox">姓名</span>
            <span class="inputBox">Rouge</span>
            </label>
            <label for="mail">
            <span class="subjectBox">信箱</span>
            <span class="inputBox">rouge@gmail.com</span>
            </label>
            <label for="phone">
            <span class="subjectBox">電話</span>
            <span class="inputBox">0912345678</span>
            </label>
            <label>
            <span class="subjectBox">地址</span>
            <span class="inputBox">桃園市桃園區中正一街一百二十三號七樓之八</span>
            </label for="mail">
            <button class="modifyMemInfo" @click="alterMemInfo" v-if="this.counter == 0">修改資料</button>
            <div v-if="this.counter == 1">
                <button class="modifyMemInfo" @click="confirmAlter" style="margin-right:10px;">確認</button>
                <button class="modifyMemInfo" @click="cancelAlter">取消</button>
            </div>
        </form>
    </div>
    `,
    methods:{
        alterMemInfo(e){
            e.preventDefault();
            let inputbox = document.querySelectorAll('.inputBox');
            for(let i=0; i<inputbox.length; i++){
                inputbox[i].innerHTML = `<input type="text" name="${this.subject[i]}" class="alterInput" style="width:80%;padding:5px 10px;" value="${inputbox[i].textContent}">`;
            }
            this.counter++;
        },
        cancelAlter(e){
            e.preventDefault();
            let alterInput = document.querySelectorAll('.alterInput');
            let inputbox = document.querySelectorAll('.inputBox');
            for(let i=0; i<alterInput.length; i++){
                inputbox[i].innerHTML = `${alterInput[i].defaultValue}`;
            }
            this.counter--;
        },
        confirmAlter(e){
            e.preventDefault();
            let alterInput = document.querySelectorAll('.alterInput');
            let inputbox = document.querySelectorAll('.inputBox');
            for(let i=0; i<alterInput.length; i++){
                inputbox[i].innerHTML = `${alterInput[i].value}`;
            }
            this.counter--;
        }
    }
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
