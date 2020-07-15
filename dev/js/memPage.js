Vue.config.devtools = true;
Vue.component('meminfo', {
    props: [],
    data() {
        return {
            counter:0,
            subject:['name','mail','phone','address'],
            name:"",
            mail:"",
            phone:"",
            adrs:"",
        };
    },
    template: `
    <div class="contentBox">
        <form action="" class="mem_info">
            <label for="name">
            <span class="subjectBox">姓名</span>
            <span class="inputBox">{{name}}</span>
            </label>
            <label for="mail">
            <span class="subjectBox">信箱</span>
            <span class="inputBox">{{mail}}</span>
            </label>
            <label for="phone">
            <span class="subjectBox">電話</span>
            <span class="inputBox">{{phone}}</span>
            </label>
            <label>
            <span class="subjectBox">地址</span>
            <span class="inputBox">{{adrs}}</span>
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
            let xhr = new XMLHttpRequest();
            let a = this;
            xhr.onload= function(){
                if(xhr.status == 200) {
                    alert(xhr.responseText);
                    for(let i=0; i<alterInput.length; i++){
                        inputbox[i].innerHTML = `${alterInput[i].value}`;
                    }
                    a.counter--;
                }else{
                    alert(xhr.status);
                }
            }
            xhr.open("post", "./php/alterMemberInfo.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            let obj = {
                name:alterInput[0].value,
                mail:alterInput[1].value,
                phone:alterInput[2].value,
                adrs:alterInput[3].value
            };
            let str = JSON.stringify(obj);
            xhr.send(`alterStr=${str}`);
        },
        getInfo(){
            let xhr = new XMLHttpRequest();
            let a = this;
            xhr.onload = function () {
                if (xhr.status == 200) {
                    member = JSON.parse(xhr.responseText);
                    if (member.mail) { //已登入
                        a.name = member.name;
                        a.mail = member.mail;
                        a.phone = member.phone;
                        a.adrs = member.adrs;
                    }else{
                        alert('請先登入會員');
                        document.getElementById('login').style.display = "flex";
                    }
                }
            }
            xhr.open("get", "./php/getMemberInfo.php", true);
            xhr.send(null);
        }
    },
    mounted() {
        this.getInfo();
    },
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
                    <button class="mem_buybtn mem_buyactive" data-list="tab1" @click="orderTab">未出貨</button>
                    <button class="mem_buybtn" data-list="tab2" @click="orderTab">已出貨</button>
                </div>
                
                <div class="mem_buycontent">  
                    <table class="mem_tablegroup">
                        <thead>
                            <tr class="mem_buydetail_title">
                                <th>編號</th>
                                <th>日期</th>
                                <th>金額</th>
                                <th>寄送地址</th>
                                <th>明細</th>
                            </tr>
                        </thead>
                        <component :is="list"><component>
                    </table>
                </div>
    </div>
    `,
})

Vue.component('tab1',{ 
    data() {
        return {
            ord:0,
            datas:[],
            counter:0,
            prepare:[],
            gift: "",
        };
    },
    template: `
            <tbody class="mem_buydetail_info">
                <div class="checkOrderItemDetail" v-if="counter==1">
                    <ul class="checkOrderItemDetailTh">
                        <li>數量</li>
                        <li>價錢</li>
                        <li>商品</li>
                    </ul>
                    <div class="checkOrderItemDetailDiv">
                        <ul class="checkOrderItemDetailTr" v-for="(list, i) in prepare" :list="list" :key="i">
                            <li>{{list.ORD_LIST_NUM}}</li>
                            <li>{{list.ORD_PRICE}}</li>
                            <li>{{list.PRO_NAME}}</li>
                        </ul>
                        <div class="checkOrderItemDetailGift"><i>贈品&nbsp&nbsp</i> {{gift}}</div>
                    </div>
                    <div class="checkOrderItemDetailBtnBox">
                    <button @click="counter--;">確認</button>
                    </div>
                </div>
                <tr v-for="item, i in datas" :item="item" :key="i">
                    <td>{{item.ORD_NO}}</td>
                    <td>{{item.ORD_DATE}}</td>
                    <td>{{item.ORD_PRICE}}</td>
                    <td>{{item.ORP_ADRS}}</td>
                    <td>
                        <button :data-ordno="item.ORD_NO" @click="checkList">查詢</button>
                    </td>
                </tr>
            </tbody>
    `,
    methods:{
        getData(){
            let xhr = new XMLHttpRequest();
            let a = this;
            xhr.onload = function (){
                if(xhr.status == 200){
                    a.datas = JSON.parse(xhr.responseText);
                }else{
                    alert(xhr.status);
                }
            }
            xhr.open("post", "../php/memPageOrder.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            let status = this.ord;
            xhr.send(`status=${status}`);
        },
        checkList(e){
            let num = e.target.dataset.ordno;
            let xhr = new XMLHttpRequest();
            let a = this;
            xhr.onload = function (){
                if(xhr.status == 200){
                    a.prepare = JSON.parse(xhr.responseText);
                    if(!JSON.parse(xhr.responseText)[0].GIF_NAME){
                        a.gift = "無贈品";
                    }else{
                        a.gift = JSON.parse(xhr.responseText)[0].GIF_NAME;
                    }
                }else{
                    alert(xhr.status);
                }
            }
            xhr.open("post", "../php/checkOrderList.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            let str={
                ordNo:num,
                ordStatus:this.ord
            }
            let obj = JSON.stringify(str);
            xhr.send(`obj=${obj}`);
            this.counter++;
        }
    },
    mounted(){
        this.getData();
    }
});
Vue.component('tab2',{ 
    data() {
        return {
            ord:1,
            datas:[],
            counter:0,
            prepare:[],
            gift: "無贈品",
        };
    },
    template: `
            <tbody class="mem_buydetail_info">
                <div class="checkOrderItemDetail" v-if="counter==1">
                    <ul class="checkOrderItemDetailTh">
                        <li>數量</li>
                        <li>價錢</li>
                        <li>商品</li>
                    </ul>
                    <div class="checkOrderItemDetailDiv">
                        <ul class="checkOrderItemDetailTr" v-for="(list, i) in prepare" :list="list" :key="i">
                            <li>{{list.ORD_LIST_NUM}}</li>
                            <li>{{list.ORD_PRICE}}</li>
                            <li>{{list.PRO_NAME}}</li>
                        </ul>
                        <div class="checkOrderItemDetailGift"><i>贈品&nbsp&nbsp</i> {{gift}}</div>
                    </div>
                    <div class="checkOrderItemDetailBtnBox">
                    <button @click="counter--;">確認</button>
                    </div>
                </div>
                <tr v-for="item, i in datas" :item="item" :key="i">
                    <td>{{item.ORD_NO}}</td>
                    <td>{{item.ORD_DATE}}</td>
                    <td>{{item.ORD_PRICE}}</td>
                    <td>{{item.ORP_ADRS}}</td>
                    <td>
                        <button :data-ordno="item.ORD_NO" @click="checkList">查詢</button>
                    </td>
                </tr>
            </tbody>
    `,
    methods:{
        getData(){
            let xhr = new XMLHttpRequest();
            let a = this;
            xhr.onload = function (){
                if(xhr.status == 200){
                    a.datas = JSON.parse(xhr.responseText);
                }else{
                    alert(xhr.status);
                }
            }
            xhr.open("post", "../php/memPageOrder.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            let status = this.ord;
            xhr.send(`status=${status}`);
        },
        checkList(e){
            let num = e.target.dataset.ordno;
            let xhr = new XMLHttpRequest();
            let a = this;
            xhr.onload = function (){
                if(xhr.status == 200){
                    a.prepare = JSON.parse(xhr.responseText);
                    if(!JSON.parse(xhr.responseText)[0].GIF_NAME){
                        a.gift = "無贈品";
                    }else{
                        a.gift = JSON.parse(xhr.responseText)[0].GIF_NAME;
                    }
                }else{
                    alert(xhr.status);
                }
            }
            xhr.open("post", "../php/checkOrderList.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            let str={
                ordNo:num,
                ordStatus:a.ord
            }
            let obj = JSON.stringify(str);
            xhr.send(`obj=${obj}`);
            this.counter++;
        }
    },
    mounted(){
        this.getData();
    }
});

Vue.component('analinfo', {
    props: [],
    data() {
        return {
            src:'',
            title:'',
            txt:'',
            date:'',
        };
    },
    template: `
    <div class="contentBox">
        <div class="mem_skinanalysis">
            <div class="mem_title">
                <p class="mem_date" v-cloak>測驗日期：{{date}}</p>
                <h1 class="mem_maintitle" v-cloak>膚質類型：{{title}}</h1>
                <div class="memPageImgBox" v-cloak>{{src}}</div>
                <p class="mem_exp" v-cloak>{{txt}}</p>
            </div>
            <button class="mem_skincarePd">建議保養步驟與商品</button>
        </div>
    </div>
    `,
    created(){
        this.getAnalData();
    },
    methods:{
        getAnalData(){
            let a = this;
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status == 200){
                    let str = JSON.parse(xhr.responseText);
                    if(str.MTC_DATE){
                        a.title = str.MTC_TYPE;
                        a.txt = str.MTI_TEXT;
                        a.date = str.MTC_DATE;
                        a.src = str.MTI_IMG;
                        window.localStorage.setItem('type',str.MTC_CLASS);
                    }else{
                        a.title = "尚未進行膚質檢測";
                    }
                }else{
                    alert(xhr.status);
                }
            }
            xhr.open("get", "./php/memAnalData.php", true);
            xhr.send(null);
        }
    },
    mounted(){
    }
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

const contents = new Vue({
    el: '#mainSection',
    data:{
        content:'meminfo',
    }
})
