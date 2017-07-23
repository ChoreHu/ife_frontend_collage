/*
* @Author: hupiao
* @Date:   2017-07-23 20:51:41
* @Last Modified by:   hupiao
* @Last Modified time: 2017-07-24 02:04:55
*/

'use strict';
+(function(window, document){

    //每次调用该方法的时候会初始化一个Validate对象
    var Validate = function(options, message, regex){
        //初始化一个validate对象 可以使用new方法或者直接声明
        if(!(this instanceof Validate))
            return new Validate(options,message,regex);

        this.options = this.extend({
            formId : 'formDiv',
            buttonId : 'registerBtn'
        },options)

        this.regex = this.extend({
            userNameRegex : /^\w{8,16}$/,
            pwdRegex: /^\w{6,16}$/,
            emailRegex: /^w+@[0-9A-Za-z]+[.][a-z][A-Z]{2,3}$/,
            mobileRegex:/^(13[0-9]|15[012356789]|17[07]|18[0-9])\d{8}$/,
            telRegex:/^(0\d{2,3}-)?\d(7,8)$/
        },regex)

        this.message = this.extend({
            success : '填写无误',
            userNameError : '用户名填写错误',
            pwdError : "密码填写错误",
            emailError : "邮箱填写错误",
            mobileError : "手机填写错误",
            telError: "座机填写错误",
            required : "此选项为必填项"
        },message)

        this.init();
    }

    //所有继承自validate对象都拥有这些方法
    Validate.prototype = {
        init : function(){
            var formDiv = document.getElementById(this.options.formId);
            //表单内的所有的input

            var formData = formDiv.getElementsByTagName("input");

            //提交按钮
            var registerBtn = document.getElementById(this.options.buttonId);

            registerBtn.addEventListener("click",function(){
                this.validateForm(formData)
            })

            for(var i = 0;i<formData.length;i++){
                //验证表单(验证是某一个input的内容)
                this.validateListener(formData[i])
            }
        },
        /**
         * 继承方法,覆盖存在的数据,如果有的话
         * @param {Object} obj1 我本来就有的所有的属性
         * @param {Object} obj2 我自己写的属性
         */
        extend:function(obj1,obj2){
            for(var k in obj2){
                obj1[k] = obj2[k];
            }
            return obj1;
        },
        validateForm :function(formData){
            for(var i = 0;i<formData.length;i++){
                //验证表单(验证是某一个input的内容)
                this.validateListener(formData[i])
            }
        },
        /**
         * 这个方法用于验证某个input的内容
         * @param {Object} obj  放入的input对象
         */
        validateListener: function(obj){
            var _this = this;
            //每次按钮按起来或者失焦的时候就要触发验证内容
            obj.onkeyup = obj.onblur = function(){
                _this.validateInput(obj)
            }
        },
        /**
         * 该方法提取到内容正式验证
         * @param {Object} inputData
         */
        validateInput: function(inputData){
            //提取input输入框的文本信息
            var value = inputData.value;

            //获取到当前input的父元素
            var parentNode = inputData.parentElement;

            //验证规则的来源
            var regExpKey = inputData.getAttribute("validate-type");

            //转换成实际的验证规则 Regex.username
            var regExp = this.regex[regExpKey];

            //拿到验证方式之后就需要做验证
            if(regExp.test(value)){
                //成功
                this.successValidate(parentNode)
            }else{
                //失败
                this.errorValidate(parentNode, this.message[regExpKey.replace("Regex", "Error")]);
            }
        },
        /**
         * 成功验证之后的处理
         * @param {Object} parentNode 父元素节点
         */
        successValidate : function (parentNode){
            //删掉失败的div
            this.hideMessage(parentNode, "validate-error");
            //成功Div 无
            this.showMessage(parentNode, "validate-success");
        },
        /**
         * 错误验证之后的处理
         * @param {Object} parentNode  父元素节点
         * @param {Object} result      错误信息
         */
        errorValidate : function (parentNode, result){
            //删掉成功的div
            this.hideMessage(parentNode, "validate-success");
            //显示目前的文字(div)
            this.showMessage(parentNode, "validate-error", result);
        },

        /**
         * 隐藏不满足条件的信息
         * @param {Object} parentNode  父元素节点
         * @param {Object} className   应该删除的Div的类名
         */
        hideMessage : function (parentNode, className){
            for(var i = 0;i < parentNode.children.length;i++){
                if(parentNode.children[i].className === className){
                    parentNode.removeChild(parentNode.children[i]);
                }
            }
        },

        /**
         * 展示满足条件的信息
         * @param {Object} parentNode  父元素节点
         * @param {Object} className   应该显示的Div的类名
         * @param {Object} result        应该显示的信息
         */
        showMessage : function(parentNode, className, result){
            //判断有没有成功div
            for(var i = 0;i < parentNode.children.length;i++){
                if(parentNode.children[i].className === className){
                    return
                }
            }
            //如果有return
            //如果无 createElement("div")
            var oDiv = document.createElement("div");
            var oInput = parentNode.getElementsByTagName("input")[0]
            var oText;
            if(className === "validate-success"){
                oDiv.setAttribute("class", "validate-success");
                oInput.setAttribute("class", "success-input");
                oText = document.createTextNode(this.message.success);
            }else{
                oDiv.setAttribute("class", "validate-error");
                oInput.setAttribute("class", "error-input");
                if(oInput.value === ""){
                    oText = document.createTextNode(this.message.required);
                }else{
                    oText = document.createTextNode(result);
                }
            }

            oDiv.appendChild(oText);
            parentNode.appendChild(oDiv);
        }
    }
    //暴露方法给对应加载该文件并调用该方法的js
    window.Validate = Validate;
})(window, document)