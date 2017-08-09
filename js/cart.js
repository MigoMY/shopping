/**
 * Created by Administrator on 2017/8/8.
 */
var vm = new Vue({
    el:'#app',
    data:{
        //属性
        totalHoney:0,
        resultList:[],
        checkall:false,
        allMoney:0,
        delFlag:false,
        curproduct:''

    },
    filters:{//局部过滤器
        formatMoney:function (value) {
            return '￥'+value.toFixed(2)
        }
    }
    ,
    mounted:function () {
        //初始方法
        this.cartView();
        
    }
    ,
    methods:{
        //事件
        cartView:function () {
            var _this=this;
            this.$http.get('data/cart.json').then(function (res) {
                // console.log(res);
                _this.resultList=res.data.result.list;
                _this.totalHoney=res.data.result.totalHoney;
            })
        },
        changeCount:function (item,type) {
            if(type>0){
                item.count++;
            }else {
                if(item.count<=1)return;
                item.count--;
            }
            this.computMoney();
        },
        select:function (item) {
            if(typeof item.checked=="undefined"){
                this.$set(item,'checked',true)
            }else {
                item.checked=!item.checked;
            }
            this.computMoney();

        },
        allSelect:function (flag) {
            this.checkall=flag;
            var _this=this;
            this.resultList.forEach(function (item,index) {
                if (typeof item.checked == "undefined") {
                    _this.$set(item, 'checked', _this.checkall)
                } else {
                    item.checked = _this.checkall;
                }
            });
            this.computMoney();

        },
        computMoney:function () {
            var _this=this;
            this.allMoney=0;
            this.resultList.forEach(function (item,index) {
                if(item.checked){
                    _this.allMoney+=item.price*item.count
                }
            })
        },
        delConfirm:function (item) {
            this.delFlag=true;
            this.curproduct=item;
        },
        delteItem:function () {
            var index=this.resultList.indexOf(this.curproduct);
            this.resultList.splice(index,1);
            this.delFlag=false;
        }
    }
});
Vue.filter('money',function (value,type) {
   return '￥'+value.toFixed(2)+type;
});