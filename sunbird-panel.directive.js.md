<a name="readme-top"></a>

<details>
  <summary>ð Table of Contents</summary>
- [ä½çºè³æé¡¯ç¤ºçé¢æ¿](#ä½çºè³æé¡¯ç¤ºçé¢æ¿)
- [ä½çºæäº¤è³æçè¡¨å®](#ä½çºæäº¤è³æçè¡¨å®)
  - [æ¶æ§](#æ¶æ§)
- [ä½¿ç¨èäº¤äºï¼ï¼¡æ¬ä½é¸æå¾ï¼å½±é¿ï¼¢æ¬ä½å¯é¸é¸é ](#ä½¿ç¨èäº¤äºï½æ¬ä½é¸æå¾å½±é¿ï½æ¬ä½å¯é¸é¸é )
</details>

## ä½çºè³æé¡¯ç¤ºçé¢æ¿
é¢æ¿å¯ä»¥é½æ View Mode / Edit Modeã

é¢æ¿å¯ä»¥æ±ºå®æ¯å¦å¯ææ³

## ä½çºæäº¤è³æçè¡¨å®
é¢æ¿å¯ä»¥è¦çºä¸åå­è¡¨å®ãåµå»ºé é¢æäº¤çæåï¼ç­æ¼éåææå­é¢æ¿ãå­è¡¨å®æäº¤ä¸æ´åè¡¨å®ã

### æ¶æ§
- row in panelLayout
	- field in row
		- astrisk / gumball to indicated if input is required
		- Field Label
		- Field Control å¯ä»¥æ¯ä¸åä»»ä¸
			- dropdown: åºæ¼åä¸æ ¼ dropdown å¤æ·éä¸å dropdown é¡¯ç¤ºé¸é 
			- input (textbox) : readonly ? "é¢æ¿" : "è¡¨å®"
			- checkbox (å¤é¸)ï¼ä¾å¦å¯ä¸æç [[custom-combobox.js]]
			- radio button (å®é¸)
		- ActionButton (å¯åç¶ç¸½è¡¨å®çéåºæéãåæ¶æéç­ç­)




## ä½¿ç¨èäº¤äºï¼ï¼¡æ¬ä½é¸æå¾ï¼å½±é¿ï¼¢æ¬ä½å¯é¸é¸é 
- å½æ¸å¼å«é åºï¼ç¶æ¬ä½çº combobox çä¸æé¸å®ï¼
	```js
	// panel.directive.js
	onChange(fld, oldValue) // triggered by ng-change directive
	  updatePanelData(fld, oldValue)
	    $timeout(() => { // trigger digest cycle
	      updateData(fld)
		  updateDataLabel(fld)
		  emitOnChangeEvent(fld, oldValue) // å³éäºä»¶çµ¦ create-structured-cabling 
	  	})
	  	  // create-structured-cabling.directive.js
	  	  
	  	  setSelectizeOptions() // custom-combobox.js
	```