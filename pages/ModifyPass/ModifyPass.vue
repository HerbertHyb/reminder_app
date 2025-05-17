<template>
	<view style="width: 100%;">
		
		<u-popup :show="load" mode="center" :round="10" :duration="100"
		:closeOnClickOverlay="false" customStyle="width:50%;height:20%">
				<view style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;">
					<u-loading-icon mode="semicircle" text="修改中,请稍后"></u-loading-icon>
				</view>
		</u-popup>
		
		<view style="text-align: center;font-size: 50rpx;padding: 50rpx 0rpx 50rpx 0rpx">
			修改密码
		</view>
		<view style="width: 100%; display: flex;justify-content: center;"> 
			<view style="width: 90%;margin-top: 50rpx;">
				<view style="margin-bottom: 50rpx;">
					<u-row>
						<u-col span="3">
							<text class="label">旧密码</text>
						</u-col>
						<u-col span="9">
							<view class="input">
								<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
									placeholder="请输入密码" placeholder-style="color:rgb(200,200,200)" v-model="password.old"
									type="password" />
							</view>
						</u-col>
					</u-row>
				</view>
				<view style="margin-bottom: 50rpx;">
					<u-row>
						<u-col span="3">
							<text class="label">新密码</text>
						</u-col>
						<u-col span="9">
							<view class="input">
								<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
									placeholder="请输入密码" placeholder-style="color:rgb(200,200,200)" v-model="password.new"
									type="password" />
							</view>
						</u-col>
					</u-row>
				</view>
				<view style="margin-bottom: 50rpx;">
					<u-row>
						<u-col span="3">
							<text class="label">确认密码</text>
						</u-col>
						<u-col span="9">
							<view class="input">
								<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
									placeholder="请输入密码" placeholder-style="color:rgb(200,200,200)"
									v-model="password.confirm" type="password" />
							</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</view>
		
		<view class="button">
			<u-button type="success" text="确认修改" @click="modify()"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				load:false,
				password: {
					old: '',
					new: '',
					confirm: ''
				}
			}
		},
		methods: {
			modify(){
				
			}
		}
	}
</script>

<style scoped>
	.label {
		text-align: justify;
		text-align-last: justify;
		padding: 0rpx 10rpx 0rpx 10rpx;
	}

	.input {
		padding: 0rpx 10rpx 0rpx 10rpx;
		;
	}

	.button {
		margin: 30rpx;
		padding: 0rpx 10rpx 0rpx 10rpx;
	}
</style>
