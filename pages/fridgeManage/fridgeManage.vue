<template>
	<view>
		<view style="z-index: 10072;">
			<u-modal showCancelButton @cancel="confirmUnBind = false" :show="confirmUnBind" @confirm="handleUnBind()" title="确认要解除绑定？" content="如果您解除绑定,该冰箱将不会出现在您的列表中.如果之后您需要该冰箱,请确保您知道该冰箱的密码!"></u-modal>
		</view>
			
		<u-popup :show="show" mode="center" :round="10" @close="close" @open="open" :duration="100"
		:closeOnClickOverlay="false" customStyle="width:80%;height:40%" :closeable="true">
				<view style="width: 100%;height: 100%;position: relative;">
					<view style="width: 100%;display: flex;justify-content: center;">
						<view style="margin-top: 20rpx;font-size: larger;">
							{{form.name}}
						</view>
					</view>
					<view style="width: 100%;display: flex;justify-content: center;">
						<view style="width: 90%;margin-top: 40rpx;">
							<view style="margin-bottom: 50rpx;">
								<u-row>
										<view class="label1">
											<text>旧密码</text>
										</view>
										<view class="input">
											<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
												placeholder="请输入密码" placeholder-style="color:rgb(200,200,200)" v-model="password.oldPass"
												type="password" />
										</view>
								</u-row>
							</view>
							<view style="margin-bottom: 50rpx;">
								<u-row>
										<view class="label1">
											<text>新密码</text>
										</view>
										<view class="input">
											<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
												placeholder="请输入密码" placeholder-style="color:rgb(200,200,200)" v-model="password.newPass"
												type="password" />
										</view>
								</u-row>
							</view>
							<view style="margin-bottom: 50rpx;">
								<u-row>
									<view class="label1">
										<text>确认密码</text>
									</view>
										<view class="input">
											<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
												placeholder="请输入密码" placeholder-style="color:rgb(200,200,200)"
												v-model="password.confirm" type="password" />
										</view>
								</u-row>
							</view>
						</view>
					</view>
					
					<view style="position: absolute;bottom: 50rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
						<view style="width: 90%;">
							<u-button type="success" @click="handleModifyPass()" text="更新密码"></u-button>
						</view>
					</view>
				</view>
		</u-popup>
		
		<u-popup :show="bind" mode="center" :round="10" @close="close" @open="open" :duration="100"
		:closeOnClickOverlay="false" customStyle="width:80%;height:40%" :closeable="true">
				<view style="width: 100%;height: 100%;position: relative;">
					<view style="width: 100%;display: flex;justify-content: center;">
						<view style="margin-top: 20rpx;font-size: larger;">
							添加新冰箱
						</view>
					</view>
					<view style="width: 100%;display: flex;justify-content: center;">
						<view style="width: 90%;margin-top: 40rpx;">
							<view style="margin-bottom: 50rpx;">
								<u-row>
									<u-col span="3">
										<text class="label">序列号</text>
									</u-col>
									<u-col span="9">
										<view class="input">
											<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
												placeholder="请输入序列号" placeholder-style="color:rgb(200,200,200)" v-model="active.id"
												type="password" />
										</view>
									</u-col>
								</u-row>
							</view>
							<view style="margin-bottom: 50rpx;">
								<u-row>
									<u-col span="3">
										<text class="label">激活码</text>
									</u-col>
									<u-col span="9">
										<view class="input">
											<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
												placeholder="请输入激活码" placeholder-style="color:rgb(200,200,200)" v-model="active.activeCode"
												type="password" />
										</view>
									</u-col>
								</u-row>
							</view>
							<view style="margin-bottom: 50rpx;">
								<u-row>
									<u-col span="3">
										<text class="label">密码</text>
									</u-col>
									<u-col span="9">
										<view class="input">
											<input style=" border:1px solid #dadbde;border-radius:8rpx;padding: 14rpx 14rpx 14rpx 14rpx"
												placeholder="请输入密码" placeholder-style="color:rgb(200,200,200)"
												v-model="active.password" type="password" />
										</view>
									</u-col>
								</u-row>
							</view>
						</view>
					</view>
					
					<view style="position: absolute;bottom: 50rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
						<view style="width: 90%;">
							<u-button type="success" @click="handleBind()" text="绑定"></u-button>
						</view>
					</view>
				</view>
		</u-popup>
		
		<u-popup :show="edit" mode="center" :round="10" @close="close" @open="open" :duration="100" zIndex="10071"
		:closeOnClickOverlay="false" customStyle="width:80%;height:30%" :closeable="true">
				<view style="width: 100%;height: 100%;position: relative;">
					<view style="width: 100%;display: flex;justify-content: center;">
						<view style="margin-top: 20rpx;font-size: larger;">
							{{form.name}}
						</view>
					</view>
					<view style="width: 100%;display: flex;justify-content: center;">
						<view style="width: 90%;margin-top: 40rpx;">
							<u--form labelPosition="left" :model="form" labelWidth="150rpx">
								<u-form-item label="冰箱名称" prop="form.name" borderBottom ref="item1">
									<u--input v-model="form.name" border="none" placeholder="请输入冰箱名称" ></u--input>
								</u-form-item>
							</u--form>
						</view>
					</view>
					
					<view style="position: absolute;bottom: 80rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
						<view style="width: 90%;">
							<view style="margin-bottom: 30rpx;">
								<u-button type="success" @click="handleUpdate()" text="更新资料"></u-button>	
							</view>
							<u-button type="error" @click="confirmUnBind = true" text="解除绑定"></u-button>
						</view>
					</view>
				</view>
		</u-popup>
		<view>
			<view v-if="fridges!==undefined && fridges!==null && fridges.length>0">
				<view v-for="item in fridges"
					style="height: 160rpx; display: flex;border-radius: 10px;border: 2rpx solid #eaeaea;margin: 10rpx;padding: 10rpx;align-items: center;position: relative;">
					<view style="float: left;margin-left: 20rpx;">
						<view v-if="item.name!==undefined && item.name!==null" style="font-size: larger;">{{item.name}}</view>
						<view v-else style="font-size: larger;">还没有起名字呦~</view>
						<u--text :text="'生产日期：'+item.createTime"></u--text>
						<u--text :text="'激活时间：'+item.activeTime+' 保修期：'+item.guarantee+'天'"></u--text>
					</view>
					<view style="position: absolute;right: 20rpx;top: 20rpx;">
						<u-button type="primary" text="编辑资料" size="small" @click="editInfo(item)"></u-button>
					</view>
					<view style="position: absolute;right: 20rpx;bottom: 20rpx;">
						<u-button type="error" text="修改密码" size="small" @click="open(item)"></u-button>
					</view>
				</view>
				<view style="height: 90rpx;">
		
				</view>
			</view>
			<view style="margin-top: 100rpx;" v-else>
				<u-empty mode="list" text="还没有食物呦~">
				</u-empty>
			</view>
			<!-- #ifndef H5 -->
			<view
				style="position: fixed;bottom: 10rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view
					style="position: fixed;bottom: 110rpx;justify-content:center;display: flex;width: 100%;align-items: center;height: 80rpx;">
					<!-- #endif -->
					<!-- <button style="display:flex;align-items: center;justify-content: center;height: 70rpx;" @click="add()">
						<image src="../../static/firdge/plus.png" style="width: 50rpx;height: 50rpx;"></image>
					</button> -->
					<view style="margin: 0px auto;width: 90%;">
						<u-button @click="add()" type="primary" text="绑定新冰箱">
						</u-button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		fridgeList,
		fridgeUnBind,
		fridgeBind,
		fridgeUpdate,
		fridgeModifyPass,
		imgServer
	} from "../../config/api.js"
	export default {
		data() {
			return {
				show: false,
				bind: false,
				edit: false,
				confirmUnBind: false,
				fridges: [{
					id:1,
					name:'请购买智慧冰箱后绑定使用'
				}],
				current: 0,
				form:{},
				currentFridge:0,
				password: {
					id:'',
					oldPass: '',
					newPass: '',
					confirm: ''
				},
				active:{
					id:'',
					activeCode:'',
					password:''
				}
			}
		},
		methods: {
			img(){
				return imgServer
			},
			open(item) {
			        // console.log('open');
				this.show = true
				this.form = item
				this.password.id = item.id
			},
			editInfo(item){
				this.edit = true
				this.form = item
			},
			close() {
				this.show = false
				this.bind = false
				this.edit = false
				// console.log('close');
			},
			async handleModifyPass()
			{
				let res = await fridgeModifyPass(this.password)
				uni.$u.toast(res.message)
				this.show = false
			},
			async handleUpdate()
			{
				let res = await fridgeUpdate(this.form)
				this.edit = false
				this.getListInfo()
			},
			async handleUnBind(){
				let res = await fridgeUnBind(this.form)
				uni.$u.toast(res.message)
				this.show = false
				this.getListInfo()
			},
			async getListInfo(){
				this.init()
			},
			add() {
				this.bind = true
			},
			async handleBind(){
				let res = await fridgeBind(this.active)
				uni.$u.toast(res.message)
				this.bind = false
				this.getListInfo()
			},
			async init() {
				let fridgeRes = await fridgeList();
				if (fridgeRes.data!==undefined&&fridgeRes.data!==null && fridgeRes.data.length!== 0) {
					this.fridges = fridgeRes.data
					console.log(this.fridges)
				}
			}
		},
		computed: {},
		onLoad() {
			this.init()
		},
		onPullDownRefresh() {
		    this.getListInfo()
			uni.stopPullDownRefresh();
		}

	}
</script>
<style scoped>
	.label {
		text-align: justify;
		text-align-last: justify;
		padding: 0rpx 10rpx 0rpx 10rpx;
	}
	.label1{
		text-align: justify;
		text-align-last: justify;
		padding: 0rpx 10rpx 0rpx 10rpx;
		width: 140rpx;
	}

	.input {
		padding: 0rpx 10rpx 0rpx 10rpx;
		;
	}

</style>