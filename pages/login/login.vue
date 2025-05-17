<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<u-popup :show="load" mode="center" :round="10" :duration="100"
		:closeOnClickOverlay="false" customStyle="width:50%;height:20%">
				<view style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
					<u-loading-icon mode="semicircle" text="登录中,请稍后"></u-loading-icon>
				</view>
		</u-popup>
		
		<view style="text-align: center;font-size: 50rpx;padding: 50rpx 0rpx 50rpx 0rpx">
			登录
		</view>
		<u-sticky bgColor="#fff" style="margin-bottom: 60rpx;">
		    <u-tabs :list="methods" @change="change"></u-tabs>
		</u-sticky>
		<view style="margin: 20rpx 20rpx 20rpx 20rpx;">
			<view style="margin-bottom: 20rpx;">
				<u-row >
					<u-col span="2">
						<text class="label">手机号</text>
					</u-col>
					<u-col span="10">
						<view class="input">
							<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx" placeholder="请输入手机号" placeholder-style="color:rgb(200,200,200)" v-model="loginForm.phone"/>
						</view>
					</u-col>
				</u-row>
			</view>
			<view style="margin-bottom: 100rpx;" v-if="loginMethod===1">
				<u-row>
					<u-col span="2">
						<text class="label">验证码</text>
					</u-col>
					<u-col span="10">
						<view class="input">
							<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx" placeholder="请输入验证码" placeholder-style="color:rgb(200,200,200)" v-model="loginForm.code"/>
						</view>
					</u-col>
				</u-row>
			</view>
			<view style="margin-bottom: 100rpx;" v-else>
				<u-row>
					<u-col span="2">
						<text class="label">密码</text>
					</u-col>
					<u-col span="10">
						<view class="input">
							<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx" placeholder="请输入密码" placeholder-style="color:rgb(200,200,200)" v-model="loginForm.password" type="password" />
						</view>
					</u-col>
				</u-row>
			</view>
			<view class="button" v-if="loginMethod===1">
				<u-code ref="uCode" @change="codeChange" seconds="20" changeText="X秒重新获取"></u-code>
				<u-button @tap="getCode" :text="tips" type="success"></u-button>
			</view>
			<view class="button" v-else>
				<u-button type="success" text="登录" @click="login()"></u-button>
			</view>
			<view class="button" v-if="loginMethod===1">
				<u-button type="primary" text="注册并登录"></u-button>
			</view>
		</view>
		
		<view style="display: flex;align-items: center;position: fixed;bottom: 80rpx;justify-content: center;width: 100%;">
			<view style="float: left;">
				<u-checkbox-group placement="column" @change="acknowledge">
					<u-checkbox shape="circle" label="我已阅读并同意">
					</u-checkbox>
				</u-checkbox-group>
			</view>
			<view style="display: flex;align-items: center;float: left;">
				<u--text style="float: left;"  mode="link" text="《智慧冰箱用户协议》" href="https://www.uviewui.com"></u--text>
			</view>
		</view>
	</view>
</template>

<script>
	import {loginByPassword,loginByCode,getInfo} from "../../config/api.js"
	export default {
		data() {
			return {
				load:false,
				tips: '',
				value: '',
				confirm: '',
				loginForm:{
					phone:'15683141454',
					password:'123456',
					code:''
				},
				ack:false,
				methods:[
					{
						name:'验证码登录',
						id:1
					},
					{
						name:'账号密码登录',
						id:2
					}
				],
				loginMethod:1
			}
		},
		watch: {
			value(newValue, oldValue) {
				// console.log('v-model', newValue);
			}
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送，逗你的，开不通验证码服务');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('您的手速太快了，请慢一点~');
				}
			},
			change(index,item) {
				console.log(index)
				this.loginMethod = index.id
			},
			acknowledge(val){
				this.ack = val.length === 1
			},
			finish(){
				console.log("验证码输入完毕！")
			},
			async login()
			{
				if(this.ack === false)
				{
					this.$refs.uToast.show({message:'请先阅读并同意智慧冰箱协议'})
					return
				}
				this.load = true
				switch(this.loginMethod)
				{
					case 1:{
						console.log(loginByPassword)
						const res = await loginByCode(this.loginForm)
						console.log(res.data.token)
						// const res = await uni.$u.http.post('/auth/loginByPassword',this.loginForm)
						// console.log(res)
						this.$u.vuex("vuex_token",res.data.token)
						console.log(this.vuex_token)
						getInfo().then(res=>{
							 // private String username;
							 //    private String phone;
							 //    private String email;
							 //    private Short gender;
							 //    private String avatar;
							 // 'vuex_username','vuex_avatar','vuex_gender','vuex_phone', 'vuex_token'
							console.log(res)
							this.$u.vuex('vuex_username',res.data.username)
							this.$u.vuex('vuex_avatar',res.data.avatar)
							this.$u.vuex('vuex_gender',res.data.gender)
							this.$u.vuex('vuex_phone',res.data.phone)
						}).catch(error=>{
							uni.$u.toast("登录过期，请重新登录~")
							uni.redirectTo({
								url:'/pages/login/login'
							})
						})
						uni.switchTab({
							url:'/pages/fridge/fridge'
						})
						break
					}
					case 2:{
						console.log(loginByPassword)
						const res = await loginByPassword(this.loginForm)
						console.log(res.data.token)
						// const res = await uni.$u.http.post('/auth/loginByPassword',this.loginForm)
						// console.log(res)
						this.$u.vuex("vuex_token",res.data.token)
						console.log(this.vuex_token)
						// uni.redirectTo({
						// 	url:'/pages/fridge/fridge'
						// })
						getInfo().then(res=>{
							 // private String username;
							 //    private String phone;
							 //    private String email;
							 //    private Short gender;
							 //    private String avatar;
							 // 'vuex_username','vuex_avatar','vuex_gender','vuex_phone', 'vuex_token'
							console.log(res)
							this.$u.vuex('vuex_username',res.data.username)
							this.$u.vuex('vuex_avatar',res.data.avatar)
							this.$u.vuex('vuex_gender',res.data.gender)
							this.$u.vuex('vuex_phone',res.data.phone)
						}).catch(error=>{
							uni.$u.toast("登录过期，请重新登录~")
							uni.redirectTo({
								url:'/pages/login/login'
							})
						})
						this.load = false
						uni.switchTab({
							url:'/pages/fridge/fridge'
						})
						break
					}
					default:
						uni.$u.toast("系统故障，请联系管理员~")
				}
			}
		}
	}
</script>

<style scoped>
	.label{
		text-align: justify;
		text-align-last: justify;
		padding: 0rpx 10rpx 0rpx 10rpx;
	}
	.input{
		padding: 0rpx 10rpx 0rpx 10rpx;;
	}
	.button{
		margin-bottom: 20rpx;
		padding: 0rpx 10rpx 0rpx 10rpx;
	}
</style>
