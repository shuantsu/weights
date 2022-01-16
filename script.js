$.fn.animateRotate = function(angle, duration, easing, complete) {
	return this.each(function() {
	var $elem = $(this);

	$({deg: 0}).animate({deg: angle}, {
		duration: duration,
		easing: easing,
		step: function(now) {
			$elem.css({transform: 'rotate(' + now + 'deg)'});
			},
		complete: complete || $.noop
		});
	});
};

$(function(){

	$("a").each(function(idx, el) {
		if ($(el).attr("href") == "#") {
			$(this).click(function() {
				return false;
			});
		}
	});

	var pesos = [100,100,100,100,100,100,100,50],
		tentativas = 0;

	function embaralhar(array) {
		var indice_atual = array.length, valor_temporario, indice_aleatorio;

		while (0 !== indice_atual) {

			indice_aleatorio = Math.floor(Math.random() * indice_atual);
			indice_atual -= 1;

			valor_temporario = array[indice_atual];
			array[indice_atual] = array[indice_aleatorio];
			array[indice_aleatorio] = valor_temporario;
		}

		return array;
	}
	
	embaralhar(pesos);

	function pesoEsquerda() {
		$("#arco").stop().animateRotate(-10);
		$("#bandeja_esquerda").stop().animate({marginTop: "-53px"});
		$("#bandeja_direita").stop().animate({marginTop: "-95px"});
	}
	function pesoDireita() {
		$("#arco").stop().animateRotate(10);
		$("#bandeja_esquerda").stop().animate({marginTop: "-95px"});
		$("#bandeja_direita").stop().animate({marginTop: "-53px"});
	}
	
	function pesoIgual() {
		$("#arco").stop().animateRotate(0);
		$("#bandeja_esquerda").stop().animate({marginTop: "-75px"});
		$("#bandeja_direita").stop().animate({marginTop: "-75px"});
	}
	
	function drop(e, ui){
		$(ui.draggable)
		.detach()
		.appendTo($(e.target))
		.attr('style','')
		.css({marginTop:'0px'});
		
		if ($(e.target).attr('id') == 'certa') {
			if ($("#certa .peso").html() == maisLeve()) {
				alert("Você ganhou! Parabéns!");
			} else {
				alert("Ops... você errou! Mais sorte na próxima! Recarregando...");
				window.location.reload();
			}
		}
	}
	
	function quantoPesa(bandeja) {
		var n = 0;
		if ($(".peso", bandeja)) {
			$(".peso", bandeja).each(function(i, v){
				n += pesos[$(v).data('id')];
			});
		}
		return n;
	}
	
	$(".peso").draggable({revert: "invalid", helper: "clone", stack: ".peso", start: function(){
		$(this).css({opacity:0});
	}, stop: function(){
		$(this).css({opacity:1});
		}
	});
	
	$(".bandeja").droppable({accept: function(){
		return $(this).children().length < 6;
	}, drop: drop});
	
	$(".pesos").droppable({drop: drop});
	$("#certa").droppable({drop: drop});
	
	function maisLeve() {
		return(pesos.indexOf(50) + 1);
	}
	
	$("#pesar").click(function(){
		var esq = quantoPesa("#bandeja_esquerda");
			dir = quantoPesa("#bandeja_direita");
			
		if (dir > esq) {
			pesoDireita();
		} else if (esq > dir) {
			pesoEsquerda();
		} else {
			pesoIgual();
		}
		$("#pesar").html("PESAR ("+(++tentativas)+")");
		if(tentativas == 2) {
			$("#pesar").attr('disabled','true');
		}
	});
	
	$("#instrucoes").click(function(){
		alert("Nós temos 8 pequenos pesos que parecem todos iguais. Porém apenas um dos pesos do grupo é ligeiramente mais leve que o resto.\n\nUsando a balança apenas 2 vezes, você pode descobrir qual peso é mais leve que o resto.\n\nEntão, qual é o mais leve?\n\nINSTRUÇÕES:\n\nArraste o peso para a bandeja da balança que desejar. Até 6 pesos podem ser colocados em um lado. Aperte pesar para checar os pesos. Quando descobrir, arraste o peso mais leve para a caixa que diz mais leve."); 
	});
	
	$("#dica1").click(function(){
		alert("Você não está pesando 4 pesos de cada lado, está?\n\nSe fizer isso, você terá apenas mais uma chance para determinar qual de 4 pesos é o mais leve.\n\nMas você provavelmente já sabia isso, não?");
	});
	
	$("#dica2").click(function(){
		alert("Talvez pensando em outro exemplo você poderá chegar mais perto da solução. Imagine que você tenha 3 pesos, um dos quais é mais leve que o resto.\n\nPara descobrir qual é o mais leve, tudo que você precisa fazer é pesar quaiquer 2 dentre eles. Se um dos pesos na escala é o mais leve, esta é a resposta. Se 2 pesos na balança forem iguais, o restante é o mais leve.");
	});
	
	$("#dica3").click(function(){
		alert("Pense em uma última dica. Você pode descobrir qual é o mais leve num grupo de três com um uso da balança.\n\nSe você diminuir o número de pesos na questão para três com um uso da balança, você tem a resposta.");
	});
	
	$("#reiniciar").click(function(){
		window.location="index.html";
	});
});
