<template>
    <el-row>
        <el-col :span="24">
            {{countTitle}}
            {{helpWord}}
            {{daysWord}}
            <el-button type="success" icon="el-icon-refresh-right" circle @click="resetCount"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="removeSelf"></el-button>
            <el-button type="primary" icon="el-icon-time" circle ></el-button>
        </el-col>
    </el-row>
</template>

<script>
//import _ from "lodash";
import showNotice from "../utils/noticeManager"

export default {
    data:()=>({
        noticeShow:false
    }),
    props:{
        createAt:{
            type:Number, 
            required:true
        },
        countType:{
            type:String,
            required:true
        },
        index:{
            type:Number,
            required:true
        },
        dueDate:{
            type:Number,
            required:false
        },
        history:{
            type:Array[Object],
            required:false,
            default:()=>[]
        },
        countTitle:{
            type:String,
            required:true
        }
    },
    computed:{
        lastOperateDate:function(){
            return this.history[this.history.length-1] || this.createAt;
        },
        daysLeft:function(){
            let res=(this.dueDate-this.$store.state.timestamp)/(3600*1000*24);
            return res;
        },
        hasBeen:function(){
            return (this.$store.state.timestamp-this.lastOperateDate)/(3600*1000*24);
        },
        helpWord:function(){
            switch(this.countType){
                case "倒计时": return "距离计时结束还有";
                case "正计时": return "距离上次已经";
                default: return "出错了";
            }
        },
        daysWord:function(){
            let dayCount=this.countType==="倒计时"?this.daysLeft:this.hasBeen;
            let secondCount=dayCount*3600*24;
            let hour=Math.floor(secondCount/3600);
            let minute=Math.floor((secondCount-3600*hour)/60);
            let second=Math.floor(secondCount%60);
            let words=`${hour}小时${minute}分钟${second}秒`
            if(dayCount<0){
                words="已经过期"
                if(!this.noticeShow&&this.countType==="倒计时"){
                    this.showError();
                }
                return words;
            }
            else if(dayCount<1){
                if(!this.noticeShow&&this.countType==="倒计时"){
                    this.showWarning(words);
                }
                return words;
            }
            else{
                return `${Math.floor(dayCount)}天`;
            }
        }
    },
    methods:{
        removeSelf:function(){
            /**
             * 删除本计时器
             */
            this.$store.commit("removeCount",this.index);
        },
        resetCount:function(){
            /**
             * 重置计时器
             */
            this.$store.commit("resetCount",this.index);
        },
        showWarning:function(words){
            showNotice({
                title:"倒计时即将到期",
                message:`"${this.countTitle}"倒计时将在${words}后到期`,
                type: 'warning',
                duration: 0
            });
            this.noticeShow=true;
        },
        showError:function(){
            showNotice({
                title:"倒计时已经到期",
                message:`"${this.countTitle}"倒计时已经到期`,
                type: 'error',
                duration: 0
            });
            this.noticeShow=true;
        }
    }
}
</script>