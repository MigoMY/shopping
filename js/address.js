/**
 * Created by Administrator on 2017/8/9.
 */
var vm = new Vue({
    el:'.container',
    data:{
        addressList:[],
        limitNum:3,
        currentIndex:0,
        shippingMethods:1
    },
    mounted:function () {
        var _this=this;
        this.$nextTick(function () {
            _this.getAddress();
        })
    },
    computed:{
        filterAddress:function () {
            return  this.addressList.slice(0,this.limitNum)
        }
    },
    methods:{
        getAddress:function () {
            var _this=this;
            this.$http.get('data/address.json').then(function (res) {
                _this.addressList=res.data.result
            })
        },
        loadMore:function () {
            this.limitNum=this.addressList.length;
        },
        setItem:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId==addressId){
                    address.isDefault=true
                }else {
                    address.isDefault=false
                }
            })
        }
    }
});
