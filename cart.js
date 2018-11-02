$(function(){
	//1.全选或取消全选
	var isTrue = false;
	$("#checkall").click(function(){
		isTrue = !isTrue;
		if(isTrue){
			//选中操作，全选 checked = "true"
			//获取所有商品前的选择框，设置选中属性
			//prop()类似于attr，为元素设置属性
			$("[name=check]").prop("checked","true");
		}else{
			$("[name=check]").removeAttr("checked","true");
		}
	});

	//2.通过商品选择框反选操作全选按钮
	$("[name=check]").click(function(){
		//:checked 表示匹配被选中的元素
		//获取所有未被选中 的元素,判断是否小于等于0
		if($("input[name=check]").not("input:checked").size() <= 0){
			//全选按钮也应该是选中状态
			$("#checkall").prop("checked",true);
			//标记全选按钮的状态
			isTrue =true;
		}else{
			//存在未被勾选的商品，全选框是不被选中的
			$("#checkall").prop("checked",false);	
			isTrue = false;
			// $("#checkall").removeAttr("checked","true");
		}
	})

	//3.数量操作
	$(".increment").click(function(){
		//点击+ ,操作输入框
		var value = $(this).prev().val();
		//数值自增之后重新赋给输入框显示
		$(this).prev().val(++value);
		//价格联动
		//通过层级结构获取当前商品的单价
		var priceStr = $(this).parent().prev().text();//单价
		//截取字符串，获取价格
		var price = Number(priceStr.substring(1,priceStr.length));
		//获取小计 
		$(this).parent().next().html("<strong>&yen;"+value*price+"</strong>");
	});
	//点击- 
	$(".decrement").click(function(){
		if($(this).next().val()>1){
			//数量大于1 才做减减--
			var value = $(this).next().val();
			$(this).next().val(--value);
			//价格联动
			//通过层级结构获取当前商品的单价
			var priceStr = $(this).parent().prev().text();//单价
			//截取字符串，获取价格
			var price = Number(priceStr.substring(1,priceStr.length));
			//获取小计 
			$(this).parent().next().html("<strong>&yen;"+value*price+"</strong>");

		}else{
			//将元素移除
			$(this).parent().parent().remove();
		}

	});

	// 4.移除按钮
	$(".removeItem").click(function(){
		$(this).parent().parent().remove();

	});

	// 5.写动态修改商品数量 ，实现价格联动
	$("[name=count]").blur(function(){
		var value = $(this).val();
		if(isNaN(value)){
			//如果输入了非法字符，当前的输入框重新获取焦点
			//显示红色 的轮廓线		
		}else{
			//价格联动
			//通过层级结构获取当前商品的单价
			var priceStr = $(this).parent().prev().text();//单价
			//截取字符串，获取价格
			var price = Number(priceStr.substring(1,priceStr.length));
			//获取小计 
			$(this).parent().next().html("<strong>&yen;"+value*price+"</strong>");
			// console.log(priceStr,price)
		}
	});

	// 6.总数量和总价格变动
	function countItem(){

	//  只计算当前选中的商品
		$('[name=check]:checked').each(function(){

	
			//各类商品的数量值和总价
			//获取各类商品的总数
			var sum = 0;
			$('[name=count]').each(function(){
				//遍历所有的name =count 的输入框，取值相加
				sum += Number($(this).val());
			});
			//获取所有商品的总价格
			var price = 0;
			$(".t-sum strong").each(function(){
				var priceStr = $(this).text() // ￥169
				var price = Number(priceStr.substring(1,priceStr.length));
				priceSum +=price;			
			});
			//在页面底部显示数量和价格
			$(".submit-count span").html(sum);
			$(".submit-price span").html('$yen;'+priceSum);	
		});
	}

});
	// isNaN(x)用来判断变量是否为非数字，如果变量为非数字返回true，如果不是
