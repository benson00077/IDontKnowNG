<a name="readme-top"></a>

<details>
  <summary>📔 Table of Contents</summary>
- [作為資料顯示的面板](#作為資料顯示的面板)
- [作為提交資料的表單](#作為提交資料的表單)
  - [架構](#架構)
- [使用者交互：Ａ欄位選擇後，影響Ｂ欄位可選選項](#使用者交互ａ欄位選擇後影響ｂ欄位可選選項)
</details>

## 作為資料顯示的面板
面板可以都有 View Mode / Edit Mode。

面板可以決定是否可拖曳

## 作為提交資料的表單
面板可以視為一個子表單。創建頁面提交的時候，等於集合所有子面板、子表單提交一整個表單。

### 架構
- row in panelLayout
	- field in row
		- astrisk / gumball to indicated if input is required
		- Field Label
		- Field Control 可以是下列任一
			- dropdown: 基於前一格 dropdown 判斷這一個 dropdown 顯示選項
			- input (textbox) : readonly ? "面板" : "表單"
			- checkbox (多選)，例如可下拉的 [[custom-combobox.js]]
			- radio button (單選)
		- ActionButton (可充當總表單的送出按鈕、取消按鈕等等)




## 使用者交互：Ａ欄位選擇後，影響Ｂ欄位可選選項
- 函數呼叫順序（當欄位為 combobox 的下拉選單）
	```js
	// panel.directive.js
	onChange(fld, oldValue) // triggered by ng-change directive
	  updatePanelData(fld, oldValue)
	    $timeout(() => { // trigger digest cycle
	      updateData(fld)
		  updateDataLabel(fld)
		  emitOnChangeEvent(fld, oldValue) // 傳遞事件給 create-structured-cabling 
	  	})
	  	  // create-structured-cabling.directive.js
	  	  
	  	  setSelectizeOptions() // custom-combobox.js
	```