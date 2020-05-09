// ==UserScript==
// @name         YouTubePlays Touch Input Assist
// @namespace    TheDialgaTeam/YouTubePlays-Touch-Input-Assist
// @version      0.1
// @author       Yong Jian Ming (jianmingyong)
// @description  Generate useful touch commands aims to help new players to understand how the touch commands work.
// @homepage     https://github.com/TheDialgaTeam/YouTubePlays-Touch-Input-Assist
// @supportURL   https://github.com/TheDialgaTeam/YouTubePlays-Touch-Input-Assist/issues
// @match        https://www.youtube.com/watch?v=ArvVyvjm0yo*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://kit.fontawesome.com/e5e217aee3.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// ==/UserScript==
(function(){'use strict';function a(){var e=$("#movie_player");if(0===e.length)return void setTimeout(a,1e3);var f=e.find(".video-stream");if(0===f.length)return void setTimeout(a,1e3);var g=$("#chatframe").contents().find("yt-live-chat-renderer.style-scope");return 0===g.length?void setTimeout(a,1e3):void(q=e,r=f,s=g,b(),c(),d())}function b(a){if(a||(a=0),5!==a){var c=$(".ytp-ad-skip-button");return 0===c.length?void setTimeout(b,1e3,a+1):void c.click()}}function c(){"Top chat"===s.find("#label-text").text()&&s.find("a.yt-simple-endpoint:nth-child(2) > paper-item:nth-child(1)").click();var a=s.find("#live-chat-banner");0!==a.length&&a.css("display","none")}function d(){var a=m(t,parseFloat(r.css("width")),parseFloat(r.css("height"))),b=`<canvas id="touchGrid" width="${a.width}" height="${a.height}" style="display: none; z-index: 999; position: absolute; border: 1px solid black; left: ${a.left}%" />`,c=`<div id="touchCoord" style="display: none; z-index: 999; position: absolute; left: ${a.left}%; top: ${a.height+8}px">
<p>Touch Coordinates:</p>
<p>X: <span id="touchCoordX">0</span></p>
<p>Y: <span id="touchCoordY">0</span></p>
<p>Touch Command: <span id="touchCoordCommand">0</span></p>
</div>`;q.append(b),q.append(c);var d=q.find(".ytp-right-controls");if(d.prepend(`<button id="touchGridToggle" class="ytp-button" title="Show Grid" style="text-align: center"><i class="fas fa-border-none"></i></button>`),d.prepend(`<button id="touchGridLayout" class="ytp-button" title="Switch to 3ds layout" style="text-align: center"><i class="fas fa-gamepad"></i></button>`),e(q.find("#touchGrid")),g(q.find("#touchCoord")),i(d.find("#touchGridToggle")),k(d.find("#touchGridLayout")),u){var f=d.find("#touchGridToggle");f.html(`<i class="fas fa-border-all"></i>`),f.attr("title","Hide Grid"),q.find("#touchGrid").css("display","inherit"),q.find("#touchCoord").css("display","inherit")}}function e(a){a.on("mousemove",function(b){var c=100*((b.pageX-a.offset().left)/a.width()),d=100*((b.pageY-a.offset().top)/a.height());$("#touchCoordX").text(Math.round(c)),$("#touchCoordY").text(Math.round(d)),$("#touchCoordCommand").text(`t:${Math.round(c)}:${Math.round(d)}`)}),a.on("click",function(b){var c=100*((b.pageX-a.offset().left)/a.width()),d=100*((b.pageY-a.offset().top)/a.height()),e=s.find("yt-live-chat-text-input-field-renderer.style-scope > div:nth-child(2)");e.focus(),navigator.clipboard.writeText(`t:${Math.round(c)}:${Math.round(d)}`).then(function(){GM_notification({title:"Clipboard",text:"Successfully copied to clipboard!",timeout:3e3})},function(){GM_notification({title:"Clipboard",text:"Unable to copy into clipboard!",timeout:3e3})})}),f(a,a.get(0).getContext("2d"))}function f(a,b,c,d){var e=m(t,parseFloat(r.css("width")),parseFloat(r.css("height")));return e.width===c&&e.height===d?void setTimeout(f,1e3,a,b,c,d):void(b.canvas.width=e.width,b.canvas.height=e.height,a.css("left",`${e.left}%`),n(b,e.width,e.height),setTimeout(f,1e3,a,b,e.width,e.height))}function g(a){h(a)}function h(a,b,c){var d=m(t,parseFloat(r.css("width")),parseFloat(r.css("height")));return d.width===b&&d.height===c?void setTimeout(h,1e3,a,b,c):void(a.css("left",`${d.left}%`),a.css("top",`${d.height+8}px`),setTimeout(h,1e3,a,d.width,d.height))}function i(a){a.on("click",function(){a.find("svg").hasClass("fa-border-all")?(a.html(`<i class="fas fa-border-none"></i>`),a.attr("title","Show Grid"),q.find("#touchGrid").css("display","none"),q.find("#touchCoord").css("display","none"),GM_setValue("displayTouchGrid",!1)):(a.html(`<i class="fas fa-border-all"></i>`),a.attr("title","Hide Grid"),q.find("#touchGrid").css("display","inherit"),q.find("#touchCoord").css("display","inherit"),GM_setValue("displayTouchGrid",!0)),j(a)}),j(a)}function j(a){var b=a.find("svg");return 0===b.length?void setTimeout(j,1e3,a):void(b.css("width","50%"),b.css("height","100%"))}function k(a){a.on("click",function(){t.name===o.name?(a.attr("title","Switch to NDS layout"),t=p,GM_setValue("layoutMode",p),GM_notification({title:"Touch Grid Mode",text:"Successfully changed to 3DS layout!",timeout:3e3})):(a.attr("title","Switch to 3DS layout"),t=o,GM_setValue("layoutMode",o),GM_notification({title:"Touch Grid Mode",text:"Successfully changed to NDS layout!",timeout:3e3}))}),l(a)}function l(a){var b=a.find("svg");return 0===b.length?void setTimeout(l,1e3,a):void(b.css("width","50%"),b.css("height","100%"))}function m(a,b){var c=a.bottom.width/(a.top.width+a.bottom.width)*b,d=a.bottom.height/a.bottom.width*c;return{left:100*(a.top.width/(a.top.width+a.bottom.width)),width:c,height:d}}function n(a,b,c){var d=b/100,e=c/100;a.clearRect(0,0,a.canvas.width,a.canvas.height),a.beginPath();for(var f=0;100>=f;f++)a.moveTo(f*d,0),a.lineTo(f*d,c),a.moveTo(0,f*e),a.lineTo(b,f*e),0==f%10?(a.setLineDash([]),a.lineWidth=.5,a.stroke(),a.beginPath()):(a.setLineDash([1,1]),a.lineWidth=.25,a.stroke(),a.beginPath())}const o={name:"nds",top:{width:256,height:192},bottom:{width:256,height:192}},p={name:"3ds",top:{width:400,height:240},bottom:{width:320,height:240}};var q,r,s,t=GM_getValue("layoutMode",o),u=GM_getValue("displayTouchGrid",!1);a()})();