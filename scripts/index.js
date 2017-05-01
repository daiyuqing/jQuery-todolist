$(function(){
	var data=[{"id":1,"thing":"HTML","detail":"heell","time":"2017.05.06"},
		{"id":2,"thing":"CSS","detail":"hfadsfosiofl","time":"2017.05.04"},
		{"id":3,"thing":"JS","detail":"sldkjfwjf","time":"2017.05.03"}];
	data.map(function(item){
		$(".list").append("<div class='item' data-time="+item.time+" data-detail="+item.detail+"><input type='checkbox'><label>"+item.thing+"</label><p><span class='delete'>删除</span><span class='detail'>详细</span></p></div>");
	});
	// 增加任务
	$("#submit").click(function(){
		if ($("#add").val()!=="") {
			var thing=$("#add").val();
			var id=Math.random()*9000+1000;
			var item="<div class='item'><input type='checkbox'><label>"+thing+"</label><p><span class='delete'>删除</span><span class='detail'>详细</span></p></div>";
			$(".list").append(item);
			data=data.concat([{"id":id+1,"thing":thing,"detail":""}]);
			$("#add").val("");
		}
		return false;
	});
	// 删除任务
	$(".list").on("click",".delete",function(){
		$this=$(this);
		$("body").append("<div class='wrap'><div class='del'><p>确定删除吗?</p><button>删除</button><button>取消</button></div></div>");
		$(".del button").eq(0).on("click",function(){
			$(this).parents(".wrap").remove();
			$this.parents(".item").remove();
		});
		$(".del button").eq(1).on("click",function(){
			$(this).parents(".wrap").remove();
		});
		return false;
	});
	// 修改任务
	$(".list").on("dblclick",".item",function(){
		var change="<div class='wrap'><div class='change'><input type='text'><textarea rows='3' cols='30' /><p>提醒时间</p><p class='time'></p><button>更新</button></div></div>";
		$("body").append(change);
		$this=$(this);
		$(".change .time").text($(this).attr("data-time"));
		$(".change input:text").val($(this).find("label").text());
		$(".change textarea").val($(this).attr("data-detail"));
		$("body").on("click",".change button",function(){
			var text=$(".change input:text").val();
			$this.find("label").text(text);
			$this.attr("data-detail",$(".change textarea").val());
			$(".wrap").remove();
		});
	});
	$(".list").on("click",".item .detail",function(){
		var change="<div class='wrap'><div class='change'><input type='text'><textarea rows='3' cols='30' /><p>提醒时间</p><p class='time'></p><button>更新</button></div></div>";
		$("body").append(change);
		$this=$(this).parents(".item");
		$(".change .time").text($this.attr("data-time"));
		$(".change input:text").val($this.find("label").text());
		$(".change textarea").val($this.attr("data-detail"));
		$("body").on("click",".change button",function(){
			var text=$(".change input:text").val();
			$this.find("label").text(text);
			$this.attr("data-detail",$(".change textarea").val());
			$(".wrap").remove();
		});
	});
	// 任务已完成
	$(".list").on("click",".item input:checkbox",function(e){
		if($(this).is(":checked")){
			$(this).parent().css({
				"text-decoration":"line-through",
				"background":"#ccc"
			});
		}else{
			$(this).parent().css({
				"text-decoration":"none",
				"background":"#fff"
			});
		}
		$(this).on("dblclick",function(e){
			e.stopPropagation();
		});
	});
});