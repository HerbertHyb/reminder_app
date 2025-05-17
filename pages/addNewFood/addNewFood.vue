<template>
	<view style="display: flex;justify-content: center;">
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<view style="width: 90%;margin-top: 20rpx;">
			<u--form labelPosition="left" :model="food" :rules="rules" labelWidth="150rpx">
				<u-form-item label="食物名称" prop="food.name" borderBottom ref="item1">
					<u--input v-model="food.name" border="none" placeholder="请输入食物名称" ></u--input>
				</u-form-item>
				<u-form-item label="单位" prop="food.unit" borderBottom @click="showUnit = true; hideKeyboard()" >
					<u--input v-model="food.unitName" disabled disabledColor="#ffffff" placeholder="请选择单位" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="种类" prop="food.type" borderBottom @click="showType = true; hideKeyboard()" >
					<u--input v-model="food.typeName" disabled disabledColor="#ffffff" placeholder="请选择种类" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="保质期" prop="food.shelfLife" borderBottom>
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u-input placeholder="请输入保质期" border="none" v-model="food.shelfLife">
						<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input placeholder="请输入保质期" border="none" v-model="food.shelfLife">
							<!-- #endif -->
							<template slot="suffix">
								<view style="margin-right: 10rpx;">
									天
								</view>
							</template>
							<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>

				<u-form-item label="简介" prop="food.type">
					<u--textarea v-model="food.info" placeholder="请输入内容" count></u--textarea>
				</u-form-item>
				<u-form-item label="图片" prop="food.pic">
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" multiple
						:maxCount="1"></u-upload>
				</u-form-item>

			</u--form>
			<u-action-sheet :show="showUnit" :actions="Unit" title="请选择单位" description="只能选一次哦~"
				@close="showUnit = false" @select="unitSelect">
			</u-action-sheet>
			<u-action-sheet :show="showType" :actions="Type" title="请选择单位" description="只能选一次哦~"
				@close="showType = false" @select="typeSelect">
			</u-action-sheet>
		</view>
		<view style="width: 100%;position: fixed;bottom: 80rpx;">
			<view style="width: 90%;margin: 0rpx auto;">
				<u-button @click="commit()" type="success" text="提交">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		foodTypeList,
		unitList,
		imgServer,
		foodPic,
		foodAdd
	} from "../../config/api.js"
	export default {
		data() {
			return {
				fileList: [],
				showType: false,
				showUnit: false,
				food: {
					name: '',
					shelfLife: '',
					unit: '',
					pic: '',
					type: '',
					info: '',
					unitName:'',
					typeName:''

				},
				Unit: [],
				Type: [],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			};
		},
		methods: {
			unitSelect(e) {
				this.food.unit = e.id
				this.food.unitName = e.name
			},
			typeSelect(e) {
				this.food.type = e.id
				this.food.typeName = e.name
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.fileList.length
				lists.map((item) => {
					this.fileList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].thumb)
					let item = this.fileList[fileListLen]
					this.fileList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: foodPic, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								let realRes = JSON.parse(res.data)
								console.log(realRes)
								this.food.pic = realRes.data.address
								resolve(realRes)
							}, 1000)
						}
					});
				})
			},
			commit()
			{
				foodAdd(this.food).then(res=>{
					uni.$u.toast(res.message)
					let pages = getCurrentPages();
					pages.fin
					console.log(pages)
					// 获取到需要返回的页面下标
					let prevPage = pages[0];
					// 刷新页面数据(此方式为App形式刷新)
					prevPage.$vm.getListInfo();
					 // 刷新页面数据(此方式为小程序刷新)
					 //prevPage.onLoad();
					uni.navigateBack({
						
					})
				})
			},
			async init(){
				let typeRes = await foodTypeList()
				this.Type = typeRes.data
				let unitRes = await unitList()
				this.Unit = unitRes.data
			}
		},
		created() {
			this.init()
		}
	};
</script>
