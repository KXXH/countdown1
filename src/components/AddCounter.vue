<template>
    <el-form ref="addForm" :model="form" :rules="rules">
      <el-form-item label="计时器标题" prop="title" required>
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item :label="form.type?'倒计时':'正计时'" prop="type">
            <el-switch v-model="form.type"></el-switch>
        </el-form-item>
        <transition name="el-fade-in-linear">
        <el-form-item v-if="form.type" label="结束日期模式" prop="dueDateSetType">
            <el-radio-group v-model="form.dueDateSetType">
                <el-radio label="天数"></el-radio>
                <el-radio label="日期"></el-radio>
            </el-radio-group>
        </el-form-item>
        </transition>
        <transition name="el-fade-in-linear">
        <div v-if="form.type">
            <transition name="el-fade-in" mode="out-in">
            <el-form-item label="倒计时结束日期" v-if="form.dueDateSetType==='日期'" prop="date1" key="日期选择">
                <el-date-picker :picker-options="pickerOptions" type="datetime" placeholder="选择日期" v-model="form.date1" style="width: 100%;" value-format="timestamp"></el-date-picker>
            </el-form-item>
            <el-form-item v-else label="计时天数" prop="countDays" key="计时天数">
                <el-input-number  v-model="form.countDays"  :min="1"></el-input-number >
            </el-form-item>
            </transition>
            
        </div>
        </transition>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data:()=>({
        form:{
            title:"",
            type:false,
            date1:"",
            countDays:1,
            dueDateSetType:"日期"
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (Date.now()-3600*1000*24);
          },
          shortcuts: [{
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '三天后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24*3);
              picker.$emit('pick', date);
            }
          }, {
            text: '下周',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        rules: {
          date1: [
            { validator: (rule,value,callback)=>{
                if(value>Date.now()){
                    return callback();
                }else{
                    return callback(new Error("日期必须晚于当前时间"))
                }
            }, trigger: 'blur' }
          ],
        }
    }),
    methods:{
        addCount:function(success){
            if(!success){
                return;
            }
            let payload={
                countTitle:this.form.title,
                countType:this.form.type?'倒计时':'正计时',
            };
            if(this.form.type){
                if(this.form.dueDateSetType==="日期"){
                    payload.dueDate=this.form.date1;
                }
                else{
                    payload.dueDate=Date.now()+(3600*1000*24*this.form.countDays);
                }
            }
            else{
                payload.dueDate=new Date(2099,11,30).getTime();
            }

            this.$store.commit("addCount",payload);
            this.resetForm();
        },
        onSubmit:function(){
            this.$refs.addForm.validate(this.addCount);
        },
        resetForm:function(){
            this.$refs['addForm'].resetFields();
        }
    }
}
</script>