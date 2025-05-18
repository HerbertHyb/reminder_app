const http = uni.$u.http
export const foodPic = 'http://fridge.binw.top:9000/food/uploadPic'
export const userAvatar = 'http://fridge.binw.top:9000/user/uploadAvatar'
export const loginByPassword = (data, config = {}) => http.post('/auth/loginByPassword', data, config)
export const foodInfo = (food, config = {}) => http.post('/food/info', food, config)
//分界线
export const getInfo = (data = {}, config = {}) => http.get('/auth/info', data, config)
export const logout = (data = {}, config = {}) => http.get('/auth/logout', data, config)
export const userModifyPass = (password, config = {}) => http.post('/auth/modifyPass', password, config)
export const userUpdateInfo = (user, config = {}) => http.post('/auth/updateInfo', user, config)
export const fridgeUnBind = (fridge, config = {}) => http.post('/fridge/unBind', fridge, config)
export const fridgeUpdate = (fridge, config = {}) => http.post('/fridge/update', fridge, config)
export const fridgeBind = (active, config = {}) => http.post('/fridge/bind', active, config)
export const fridgeModifyPass = (password, config = {}) => http.post('/fridge/modifyPass', password, config)
export const storageAdd = (storage, config = {}) => http.post('/storage/add', storage, config)
export const storageDelete = (storage, config = {}) => http.post('/storage/delete', storage, config)
export const storageUpdate = (storage, config = {}) => http.post('/storage/update', storage, config)
export const dishRecommend = (data = {}, config = {}) => http.get('/dish/recommend', data, config)
export const dishSearch = (index, size, filter = {}, config = {}) => http.post('/dish/search', {
  filter: filter,
  index: index,
  size: size
}, config)
export const remindList = (fridgeId, config = {}) => http.post('/remind/list', { filter: fridgeId }, config)
export const remindAdd = (remind, config = {}) => http.post('/remind/add', remind, config)
export const remindDelete = (remind, config = {}) => http.post('/remind/delete', remind, config)
export const remindUpdate = (remind, config = {}) => http.post('/remind/update', remind, config)
export const foodSearchDefault = (index, size, filter = {}, config = {}) => http.post('/food/searchDefault', {
  filter: filter,
  index: index,
  size: size
}, config)
export const foodSearchCustom = (index, size, filter = {}, config = {}) => http.post('/food/searchCustom', {
  filter: filter,
  index: index,
  size: size
}, config)
export const foodAdd = (food, config = {}) => http.post('/food/add', food, config)
export const foodDelete = (food, config = {}) => http.post('/food/delete', food, config)
export const foodUpdate = (food, config = {}) => http.post('/food/update', food, config)
export const foodTypeList = (food = {}, config = {}) => http.get('/foodType/list', food, config)
export const unitList = (food = {}, config = {}) => http.get('/unit/list', food, config)