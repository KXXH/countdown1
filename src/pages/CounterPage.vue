<template>
    <el-row>
        <el-col :span="24">
            <AddCounter/>
            <transition-group name="el-fade-in">
            <div v-for="item in countDownMap" :key="item.index">
                
                <CounterListItem
                    :createAt="item.createAt"
                    :countType="item.countType"
                    :index="item.index"
                    :dueDate="item.dueDate"
                    :history="item.history"
                    :countTitle="item.countTitle"
                />
                
            </div>
            </transition-group>
        </el-col>
    </el-row>
</template>

<script>
import CounterListItem from "../components/CounterListItem";
import AddCounter from "../components/AddCounter";
//import { mapState } from 'vuex'
import _ from 'lodash'
export default {
    components:{
        CounterListItem,
        AddCounter
    },
    computed:{
        countDownMap:function(){
            return _.values(this.$store.state.countDownMap);
        }
    }
}
</script>