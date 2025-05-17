<template>
	<view style="width: 100%;height: 100%;">
		<view style="display: flex;align-items: center;padding: 50rpx;background-color: #1296db;">
			<view style="float: left;margin-left: 30rpx;margin-right: 80rpx;">
				<u-avatar v-if="user.avatar === null || user.avatar === ''" :text="user.username[0]"  shape="square" size="100"></u-avatar>
				<u-avatar v-else :src="user.avatar"  shape="square" size="100"></u-avatar>
			</view>
			<view style="float: left;font-size: larger;font-weight: bold;">
				<view>
					<text>{{user.username}}</text>
				</view>
				<view style="margin-top: 20px;">
					<text>{{user.phone}}</text>
				</view>
			</view>
		</view>
		<scroll-view :scroll-y="true">
			<u-cell-group>
					<u-cell icon="setting" title="个人设置" :isLink="true" @click="infoManage()"></u-cell>
					<u-cell icon="lock" title="修改密码" :isLink="true" @click="modifyPass()"></u-cell>
					<u-cell icon="phone" title="绑定手机" :isLink="true" @click=""></u-cell>
					<u-cell icon="email" title="绑定邮箱" :isLink="true" @click=""></u-cell>
					<u-cell icon="order" title="冰箱管理" :isLink="true" @click="fridgeManage()"></u-cell>
			</u-cell-group>
		</scroll-view>
		<!-- #ifndef H5 -->
		<view
			style="position: fixed;bottom: 50rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view
			style="position: fixed;bottom: 150rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
		<!-- #endif -->
				<!-- <button style="display:flex;align-items: center;justify-content: center;height: 70rpx;" @click="add()">
					<image src="../../static/firdge/plus.png" style="width: 50rpx;height: 50rpx;"></image>
				</button> -->
				<view style="margin: 0px auto;width: 90%;">
				<u-button @click="logout()" type="error" text="退出登录">
				</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {imgServer,getInfo} from "../../config/api.js"
	export default {
		data() {
			return {
				user:{
					username:'小明',
					phone:'15683141454',
					avatar:'https://cdn.uviewui.com/uview/album/1.jpg'
				}
			}
		},
		methods: {
			infoManage(){
				uni.navigateTo({
					url: '/pages/EditInfo/EditInfo'
				})
			},
			fridgeManage(){
				uni.navigateTo({
					url: '/pages/fridgeManage/fridgeManage'
				})
			},
			modifyPass(){
				uni.navigateTo({
					url: '/pages/ModifyPass/ModifyPass'
				})
			},
			logout(){
				uni.redirectTo({
					url:'/pages/login/login'
				})
			}
		},
		onLoad() {
			this.user.username = this.vuex_username
			this.user.phone = this.vuex_phone
			this.user.avatar = imgServer + this.vuex_avatar
		},
		onPullDownRefresh() {
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
				uni.stopPullDownRefresh();
		    }).catch(error=>{
		    	uni.$u.toast("登录过期，请重新登录~")
				uni.stopPullDownRefresh();
		    	uni.redirectTo({
		    		url:'/pages/login/login'
		    	})
		    })
		}
	}
</script>

<style scoped>

</style>
