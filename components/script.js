function sizing(){var a=s(".piece").css("width")[0];a=9*Number(a.substr(0,a.length-4))/16+45,a=String(a)+"px",console.log(a),s(".piece").css("height",a);var b=s(".piece").css("margin-right");s(".piece").css("margin-bottom",b[0]),s(".wrapper").css("padding-right",b[0]).css("padding-left",b[0]);var c=s(".piece > .image").css("width")[0];c=9*Number(c.substr(0,c.length-4))/16,c=String(c)+"px",console.log(c),s(".piece > .image").css("height",c)}function showSubmit(){s(".submit-overlay").css("visibility","visible"),s(".submit-overlay").css("opacity","1")}function hideSubmit(){s(".submit-overlay").css("opacity","0"),s(".submit-overlay").css("visibility","hidden")}!function(){var a=function(a,c){return new b(a,c)},b=function(a,b){"undefined"==typeof b?(this.l=document.querySelectorAll(a),this.selector=a):this.l=[document.querySelectorAll(a)[b]]};b.ready=function(a){return document.addEventListener("DOMContentLoaded",a()),this},a.fn=b.prototype={innerHtml:function(a){if("undefined"!=typeof a){for(var b=0;b<this.l.length;b++)this.l[b].innerHTML=a;return this}for(var c=[],b=0;b<this.l.length;b++)c[b]=this.l[b].innerHTML;return c},outerHtml:function(a){if("undefined"!=typeof a){for(var b=0;b<this.l.length;b++)this.l[b].outerHTML=a;return this}for(var c=[],b=0;b<this.l.length;b++)c[b]=this.l[b].outerHTML;return c},css:function(a,b){if("undefined"!=typeof b){for(var c=0;c<this.l.length;c++)this.l[c].style[a]=b;return this}for(var d=[],c=0;c<this.l.length;c++){var e=document.querySelectorAll(this.selector)[c];d[c]=window.getComputedStyle(e)[a]}return d},attr:function(a,b){if("undefined"!=typeof b){for(var c=0;c<this.l.length;c++)this.l[c].setAttribute(a,b);return this}for(var d=[],c=0;c<this.l.length;c++)d[c]=this.l[c].getAttribute(a);return d},"class":function(a){if("undefined"!=typeof a){for(var b=0;b<this.l.length;b++)this.l[b].setAttribute("class",a);return this}for(var c=[],b=0;b<this.l.length;b++)c[b]=this.l[b].getAttribute("class");return c},_id:function(a){if("undefined"!=typeof a){for(var b=0;b<this.l.length;b++)this.l[b].setAttribute("id",a);return this}for(var c=[],b=0;b<this.l.length;b++)c[b]=this.l[b].getAttribute("id");return c},addClass:function(a){for(var b=0;b<this.l.length;b++){var c=this.l[b].getAttribute("class");c?this.l[b].setAttribute("class",c+" "+a):this.l[b].setAttribute("class",a)}return this},addId:function(a){for(var b=0;b<this.l.length;b++){var c=this.l[b].getAttribute("id");c?this.l[b].setAttribute("id",c+" "+a):this.l[b].setAttribute("id",a)}return this},removeClass:function(a){if("undefined"!=typeof a)for(var b=0;b<this.l.length;b++)this.l[b].getAttribute("class")&&this.l[b].setAttribute("class",this.l[b].getAttribute("class").replace(a,""));else for(var b=0;b<this.l.length;b++)this.l[b].setAttribute("class","");return this},removeId:function(a){if("undefined"!=typeof a)for(var b=0;b<this.l.length;b++)this.l[b].getAttribute("id")&&this.l[b].setAttribute("id",this.l[b].getAttribute("id").replace(a,""));else for(var b=0;b<this.l.length;b++)this.l[b].setAttribute("id","");return this},hasClass:function(a){for(var b=[],c=0;c<this.l.length;c++){var d=" "+this.l[c].getAttribute("class")+" ";b[c]=d.indexOf(" "+a+" ")>-1}return b},hasId:function(a){for(var b=[],c=0;c<this.l.length;c++){var d=" "+this.l[c].getAttribute("id")+" ";b[c]=d.indexOf(" "+a+" ")>-1}return b},at:function(a){return new b(this.selector,a)},first:function(){return new b(this.selector,0)},last:function(){return new b(this.selector,this.l.length-1)},each:function(a){for(var b=0;b<this.l.length;b++)a();return this},insert:function(a){for(var b=0;b<this.l.length;b++)this.l[b].innerHTML=this.l[b].innerHTML+a;return this},presert:function(a){for(var b=0;b<this.l.length;b++)this.l[b].innerHTML=a+this.l[b].innerHTML;return this},append:function(a){for(var b=0;b<this.l.length;b++)this.l[b].outerHTML=this.l[b].outerHTML+a;return this},prepend:function(a){for(var b=0;b<this.l.length;b++)this.l[b].outerHTML=a+this.l[b].outerHTML;return this},wrap:function(a,b){for(var c=0;c<this.l.length;c++)this.l[c].outerHTML=a+this.l[c].outerHTML+b;return this}},window.s||(window.s=a),window.S||(window.S=window.Slimpickin=b)}(),window.onload=function(){sizing();var a=document.getElementsByClassName("submit-button");a[0].onclick=function(){showSubmit()};var b=document.getElementsByClassName("submit-overlay");b[0].onclick=function(){hideSubmit()};var c=document.getElementsByClassName("submit-panel");c[0].onclick=function(){event.stopPropagation()}},window.onresize=function(a){sizing()};