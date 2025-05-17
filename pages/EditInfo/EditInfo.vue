<template>
	<view style="display: flex;justify-content: center;">
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<view style="width: 90%;margin-top: 20rpx;">
			<u--form labelPosition="left" :model="info" labelWidth="150rpx">
				<u-form-item label="用户名" prop="info.username" borderBottom>
					<u--input v-model="info.username" border="none" placeholder="请输入用户名" ></u--input>
				</u-form-item>
				<u-form-item label="性别" prop="info.gender" borderBottom @click="showGender = true; hideKeyboard()" >
					<u--input v-model="info.genderName" disabled disabledColor="#ffffff" placeholder="请选择性别" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="电话" prop="info.phone" borderBottom>
					<u--input v-model="info.phone" border="none" placeholder="请输入电话" disabled disabledColor="#ffffff"></u--input>
				</u-form-item>
				<u-form-item label="邮箱" prop="info.email" borderBottom>
					<u--input v-model="info.email" border="none" placeholder="请输入电话" disabled disabledColor="#ffffff"></u--input>
				</u-form-item>
				<u-form-item label="图片" prop="info.avatar">
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" multiple
						:maxCount="1" :key="fileList.length"></u-upload>
				</u-form-item>

			</u--form>
			<u-action-sheet :show="showGender" :actions="gender" title="请选择性别" description=""
				@close="showGender = false" @select="genderSelect()">
			</u-action-sheet>
		</view>
		<view style="width: 100%;position: fixed;bottom: 80rpx;">
			<view style="width: 90%;margin: 0rpx auto;">
				<u-button @click="commit()" type="success" text="更新资料">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		imgServer,
		userAvatar,
		getInfo
	} from "../../config/api.js"
	export default {
		data() {
			return {
				fileList: [],
				showGender: false,
				info: {
					username: '',
					gender: '',
					avatar:'',
					genderName:''
				},
				gender: [
					{
					id:1,
					name:'男'
				},
				{
					id:0,
					name:'女'
				},
				{
					id:2,
					name:'保密'
				}
			],
				Type: [],
				radio: '',
				switchVal: false
			};
		},
		methods: {
			genderSelect(e) {
				this.user.gender = e.id
				this.user.genderName = e.name
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
						url: userAvatar, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								let realRes = JSON.parse(res.data)
								console.log(realRes)
								this.info.avatar = realRes.data.address
								resolve(realRes)
							}, 1000)
						}
					});
				})
			},
			commit()
			{
				
			},
			async init(){
				let res = await getInfo()
				console.log(res)
				console.log(this)
				this.info = res.data
				switch(this.info.gender)
				{
					case 0:
						this.info.genderName = "女"
						break
					case 1:
						this.info.genderName = "男"
						break
					case 2:
						this.info.genderName = "保密"
						break
				}
				if(this.info.avatar!==undefined&&this.info.avatar!==null)
				{
					this.fileList[0]={
						url: imgServer + this.info.avatar
					}
				}
			}
		},
		created() {
			this.init()
		}
	};
</script>
