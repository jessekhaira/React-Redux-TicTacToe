(this.webpackJsonptictactoe=this.webpackJsonptictactoe||[]).push([[0],{22:function(e,t,a){e.exports=a(35)},31:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(10),i=a.n(s),o=a(11),c=a(12),u=(a(31),a(3)),l=a(4),d=a(6),m=a(5),_=a(7),p=a(2),h=a(8),g=[[[0,0],[1,1],[2,2]],[[0,0],[0,1],[0,2]],[[1,0],[1,1],[1,2]],[[2,0],[2,1],[2,2]],[[0,0],[1,0],[2,0]],[[0,1],[1,1],[2,1]],[[0,2],[1,2],[2,2]],[[2,0],[1,1],[0,2]]];function y(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];t.forEach((function(e){return e.style.display="none"}))}function v(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];t.forEach((function(e){return e.style.display="block"}))}function f(e){for(var t=0;t<e.length;t++)for(var a=0;a<e[t].length;a++)document.getElementById("_"+String(t)+String(a)).innerHTML=e[t][a]}function b(){for(var e=0;e<3;e++)for(var t=0;t<3;t++)document.getElementById("_"+String(e)+String(t)).style.backgroundColor="rgba(11, 78, 145, 0.8)"}function E(e){var t,a=Object(h.a)(g);try{for(a.s();!(t=a.n()).done;){var n,r=t.value,s="",i=0,o=Object(h.a)(r);try{for(o.s();!(n=o.n()).done;){var c=n.value,u=e[c[0]][c[1]];if(""===s)s=u;else{if(s!==u)break;i++}}}catch(l){o.e(l)}finally{o.f()}if(2===i)return[!0,s,r]}}catch(l){a.e(l)}finally{a.f()}return[!1,"",null]}function G(e){e.style.display="grid",e.style.gridTemplateColumns="repeat(3, minmax(50px, 1fr))"}function k(e){for(var t=0;t<e.length;t++){var a=e[t][0],n=e[t][1];document.getElementById("_"+String(a)+String(n)).style.backgroundColor="green"}}for(var S=[],O=0;O<3;O++)S.push(Array(3).fill(""));var N={current_turn:"",curr_board_status:S,game_state:"PAUSED"},B=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e)).chooseStyle=n.chooseStyle.bind(Object(p.a)(n)),n.startGame=n.startGame.bind(Object(p.a)(n)),n._resetYes=n._resetYes.bind(Object(p.a)(n)),n._resetNo=n._resetNo.bind(Object(p.a)(n)),n._startNewGame=n._startNewGame.bind(Object(p.a)(n)),n._resetGame=n._resetGame.bind(Object(p.a)(n)),n._newGameYes=n._newGameYes.bind(Object(p.a)(n)),n._newGameNo=n._newGameNo.bind(Object(p.a)(n)),n._updateGameState=n._updateGameState.bind(Object(p.a)(n)),n._showGameHistory=n._showGameHistory.bind(Object(p.a)(n)),n._goBack=n._goBack.bind(Object(p.a)(n)),n._noResetToStateT=n._noResetToStateT.bind(Object(p.a)(n)),n._resetToStateT=n._resetToStateT.bind(Object(p.a)(n)),n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this._initDisplay(),this._initStatesHolder()}},{key:"_initStatesHolder",value:function(){document.getElementById("states_holder")}},{key:"_initDisplay",value:function(){Array.from(document.getElementById("button_holder").children).forEach((function(e){var t="start"===e.id?"block":"none";e.style.display=t}))}},{key:"startGame",value:function(e){var t=document.getElementById("O"),a=document.getElementById("X");y(e.target),v(t,a)}},{key:"chooseStyle",value:function(e){var t=e.target.id,a=document.getElementById("O"),n=document.getElementById("X"),r=document.getElementById("reset"),s=document.getElementById("history"),i=document.getElementById("new_game");y(a,n),v(r,s,i),this.props.update_game_status(this.props.time_step,"STARTED",t)}},{key:"_hideGameButtons",value:function(){y(document.getElementById("reset"),document.getElementById("history"),document.getElementById("new_game"))}},{key:"_showGameButtons",value:function(){v(document.getElementById("reset"),document.getElementById("history"),document.getElementById("new_game"))}},{key:"_turnOffWinnerStalemate",value:function(){y(document.getElementById("winner_div"),document.getElementById("stalemate_div"))}},{key:"_updateGameState",value:function(e){return"GAME_WON"===this.props.game_state||"STALEMATE"===this.props.game_state?this.props.game_state:e}},{key:"_resetGame",value:function(){this.props.update_game_status(this.props.time_step,this._updateGameState("PAUSED"),this.props.curr_turn);var e=document.getElementById("confirm_reset");this._hideGameButtons(),e.style.display="flex",e.style.flexDirection="column",e.style.justifyContent="center"}},{key:"_resetYes",value:function(){this.props.resetGame(),this._turnOffWinnerStalemate(),this._showGameButtons(),y(document.getElementById("confirm_reset")),this._clearGameHistory(),b()}},{key:"_resetNo",value:function(){this.props.update_game_status(this.props.time_step,this._updateGameState("STARTED"),this.props.curr_turn),this._showGameButtons(),y(document.getElementById("confirm_reset"))}},{key:"_startNewGame",value:function(){this.props.update_game_status(this.props.time_step,this._updateGameState("PAUSED"),this.props.curr_turn),this._hideGameButtons();var e=document.getElementById("confirm_newgame");e.style.display="flex",e.style.flexDirection="column",e.style.justifyContent="center"}},{key:"_newGameYes",value:function(){this.props.startNewGame(),this._turnOffWinnerStalemate();var e=document.getElementById("confirm_newgame"),t=document.getElementById("start");y(e),v(t),this._clearGameHistory(),b()}},{key:"_newGameNo",value:function(){this.props.update_game_status(this.props.time_step,this._updateGameState("STARTED"),this.props.curr_turn),this._showGameButtons(),y(document.getElementById("confirm_newgame"))}},{key:"_showGameHistory",value:function(){this.props.update_game_status(this.props.time_step,this._updateGameState("PAUSED"),this.props.curr_turn),this._hideGameButtons(),v(document.getElementById("go_back")),G(document.getElementById("states_holder"))}},{key:"_clearGameHistory",value:function(){for(var e=document.getElementById("states_holder");e.firstChild;)e.removeChild(e.lastChild)}},{key:"_goBack",value:function(e){this._showGameButtons(),this.props.update_game_status(this.props.time_step,this._updateGameState("STARTED"),this.props.curr_turn),y(e.target,document.getElementById("states_holder"))}},{key:"_resetToStateT",value:function(e){var t=e.target.getAttribute("timestep");this.props.go_back_state(t),y(document.getElementById("option_buttons")),this._showGameButtons(),document.getElementById("winner_div").innerHTML="",document.getElementById("stalemate_div").innerHTML="",function(e,t){for(var a=0;a<e.children.length;){var n=e.children[a];n.getAttribute("timestep")>=t?e.removeChild(n):a++}}(document.getElementById("states_holder"),e.target.getAttribute("timestep"))}},{key:"_noResetToStateT",value:function(){y(document.getElementById("option_buttons")),v(document.getElementById("go_back")),G(document.getElementById("states_holder")),f(this.props.curr_board_status);var e=E(this.props.curr_board_status),t=Object(_.a)(e,3),a=t[0],n=(t[1],t[2]);a&&k(n)}},{key:"render",value:function(){return r.a.createElement("div",{id:"button_loc"},r.a.createElement("div",{id:"button_holder"},r.a.createElement("div",{id:"start",className:"buttons",onClick:this.startGame},"Start Game"),r.a.createElement("div",{id:"O",className:"buttons",onClick:this.chooseStyle},"Choose O"),r.a.createElement("div",{id:"X",className:"buttons",onClick:this.chooseStyle},"Choose X"),r.a.createElement("div",{id:"reset",className:"buttons",onClick:this._resetGame},"Reset Game"),r.a.createElement("div",{id:"history",className:"buttons",onClick:this._showGameHistory},"Show Game History"),r.a.createElement("div",{id:"new_game",className:"buttons",onClick:this._startNewGame},"Start New Game")),r.a.createElement("div",{id:"confirm_reset"},r.a.createElement("h3",null,"Are you sure?"),r.a.createElement("div",{id:"reset_buttons"},r.a.createElement("div",{id:"reset_yes",className:"buttons",onClick:this._resetYes},"Yes"),r.a.createElement("div",{id:"reset_no",className:"buttons",onClick:this._resetNo},"No"))),r.a.createElement("div",{id:"confirm_newgame"},r.a.createElement("h3",null,"Are you sure?"),r.a.createElement("div",{id:"newgame_buttons"},r.a.createElement("div",{id:"newgame_yes",className:"buttons",onClick:this._newGameYes},"Yes"),r.a.createElement("div",{id:"newgame_no",className:"buttons",onClick:this._newGameNo},"No"))),r.a.createElement("div",{id:"state_through_time"},r.a.createElement("div",{id:"go_back",className:"buttons",onClick:this._goBack},"Go Back"),r.a.createElement("div",{id:"states_holder"}),r.a.createElement("div",{id:"option_buttons"},r.a.createElement("h3",{id:"timestep_descr"}),r.a.createElement("div",{id:"go_back_yes",className:"buttons",onClick:this._resetToStateT},"Start playing from this time onward?"),r.a.createElement("div",{id:"go_back_no",className:"buttons",onClick:this._noResetToStateT},"Back to list of timestates"))))}}]),a}(r.a.Component),w=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(u.a)(this,a),(n=t.call(this,e))._handlerFunctionGridCells=n._handlerFunctionGridCells.bind(Object(p.a)(n)),n._initHandlersGridCells=n._initHandlersGridCells.bind(Object(p.a)(n)),n._renderGridUpdate=n._renderGridUpdate.bind(Object(p.a)(n)),n._addNewStateDiv=n._addNewStateDiv.bind(Object(p.a)(n)),n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this._initIdsGridCells(),this._initHandlersGridCells()}},{key:"componentDidUpdate",value:function(e){e.time_step!==this.props.time_step&&this._renderGridUpdate()}},{key:"_renderGridUpdate",value:function(){var e=this.props.curr_board_status;f(e);var t=E(e),a=Object(_.a)(t,3),n=a[0],r=a[1],s=a[2];n?(this.displayWinner(r,s),k(s)):function(e){var t,a=g.length,n=Object(h.a)(g);try{for(n.s();!(t=n.n()).done;){var r,s=t.value,i="",o=Object(h.a)(s);try{for(o.s();!(r=o.n()).done;){var c=r.value,u=e[c[0]][c[1]];if(""!==u)if(""===i)i=u;else if(i!==u){a--;break}}}catch(l){o.e(l)}finally{o.f()}}}catch(l){n.e(l)}finally{n.f()}return 0===a}(e)&&this.displayStalemate()}},{key:"_initIdsGridCells",value:function(){for(var e=document.getElementsByClassName("grid_cells"),t=0,a=0;a<3;a++)for(var n=0;n<3;n++)e[t].id="_"+String(a)+String(n),t++}},{key:"_initHandlersGridCells",value:function(){for(var e=0;e<3;e++)for(var t=0;t<3;t++){document.getElementById("_"+String(e)+String(t)).addEventListener("click",this._handlerFunctionGridCells)}}},{key:"_handlerFunctionGridCells",value:function(e){if("STARTED"===this.props.game_state){var t=Number(e.target.id[1]),a=Number(e.target.id[2]);if(""===this.props.curr_board_status[t][a]){var n=this.props.time_step,r=this.props.curr_turn,s=[t,a,r];this.props.update_board(s,n),this._addNewStateDiv(n,r,t,a)}}}},{key:"_updateGameState",value:function(e){return"GAME_WON"===this.props.game_state||"STALEMATE"===this.props.game_state?this.props.game_state:e}},{key:"_addNewStateDiv",value:function(e,t,a,n){var r=this,s=document.createElement("div");s.addEventListener("click",(function(){r._stateDivHandler(e,t,a,n)})),s.innerHTML="Go to move # ".concat(e),s.className="buttons",s.setAttribute("timestep",e),document.getElementById("states_holder").appendChild(s)}},{key:"_stateDivHandler",value:function(e,t,a,n){f(this.props.all_board_statuses[e]),y(document.getElementById("states_holder"),document.getElementById("go_back")),v(document.getElementById("option_buttons")),document.getElementById("go_back_yes").setAttribute("timestep",e),this.props.update_game_status(e,this._updateGameState("PAUSED"),t),document.getElementById("timestep_descr").innerHTML="This is what the game looked like at time ".concat(e,". \n        In this timestep, it was player ").concat(t,"'s turn to go. Move previously made here was to add ").concat(t," to cell\n        [").concat(a,", ").concat(n,"]."),b()}},{key:"displayWinner",value:function(e,t){this.props.update_game_status(this.props.time_step,"GAME_WON",this.props.curr_turn);var a=document.getElementById("winner_div");a.style.display="block",a.innerHTML="Player ".concat(e," wins! Reset the game, travel back to an earlier\n        game state, or start a new game!")}},{key:"displayStalemate",value:function(){this.props.update_game_status(this.props.time_step,"STALEMATE",this.props.curr_turn);var e=document.getElementById("stalemate_div");e.style.display="block",e.innerHTML="The game has reached a stalemate. Please reset the game, travel back to an\n        earlier game state and continue playing from there, or start a new game!"}},{key:"render",value:function(){return r.a.createElement("div",{id:"grid_holder"},r.a.createElement("div",{className:"grid_cells"}),r.a.createElement("div",{className:"grid_cells"}),r.a.createElement("div",{className:"grid_cells"}),r.a.createElement("div",{className:"grid_cells"}),r.a.createElement("div",{className:"grid_cells"}),r.a.createElement("div",{className:"grid_cells"}),r.a.createElement("div",{className:"grid_cells"}),r.a.createElement("div",{className:"grid_cells"}),r.a.createElement("div",{className:"grid_cells"}))}}]),a}(r.a.Component),T=a(20),I=a(21);var A=function(){return r.a.createElement("div",{id:"header_grid"},r.a.createElement("div",{id:"header"},r.a.createElement("h1",null,"Tic-Tac-Toe"),r.a.createElement("div",{id:"dice_icon"},r.a.createElement(T.a,{icon:I.a,size:"4x",color:"#EDF5E1"})),r.a.createElement("div",{id:"winner_div",className:"finished_board"}),r.a.createElement("div",{id:"stalemate_div",className:"finished_board"})))},j=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(e){return Object(u.a)(this,a),t.call(this,e)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(A,null),r.a.createElement(w,{all_board_statuses:this.props.all_board_statuses,update_game_status:this.props.update_game_status,time_step:this.props.time_step,update_board:this.props.update_board,curr_board_status:this.props.curr_board_status,game_state:this.props.game_state,curr_turn:this.props.curr_turn}))}}]),a}(r.a.Component);var C=function(){return{type:"RESET"}};var D=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){return Object(u.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{id:"AppComponents"},r.a.createElement("div",{id:"container"},r.a.createElement(j,{all_board_statuses:this.props.all_board_statuses,update_game_status:this.props.update_game_status,time_step:this.props.time_step,update_board:this.props.update_board,curr_board_status:this.props.curr_board_status,game_state:this.props.game_state,curr_turn:this.props.curr_turn}),r.a.createElement(B,{startNewGame:this.props.startNewGame,time_step:this.props.time_step,update_game_status:this.props.update_game_status,go_back_state:this.props.go_back_state,curr_board_status:this.props.curr_board_status,resetGame:this.props.resetGame,game_state:this.props.game_state,curr_turn:this.props.curr_turn})))}}]),a}(r.a.Component),H=Object(c.b)((function(e){for(var t=Object.keys(e).length-1,a={},n=0,r=Object.keys(e);n<r.length;n++){var s=r[n];a[s]=JSON.parse(JSON.stringify(e[s].curr_board_status))}return{curr_board_status:e[t].curr_board_status,curr_turn:e[t].current_turn,game_state:e[t].game_state,time_step:t,all_board_statuses:a}}),(function(e){return{update_board:function(t,a){return e(function(e,t){return{type:"UPDATE_BOARD",time_step:t,update_info:e}}(t,a))},go_back_state:function(t){return e({type:"GO_BACK",to_timestep:t})},update_game_status:function(t,a,n){return e(function(e,t,a){return{type:"CHANGE_GAME_STATUS",time_step:e,new_game_status:t,current_turn:a}}(t,a,n))},resetGame:function(){return e(C())},startNewGame:function(){return e({type:"NEW_GAME"})}}}))(D),M=function(e,t){var a=JSON.parse(JSON.stringify(e)),n=t.time_step;a[n+1]=JSON.parse(JSON.stringify(e[n]));var r=Object(_.a)(t.update_info,3),s=r[0],i=r[1],o=r[2];return a[n+1].curr_board_status[s][i]=o,a[n+1].current_turn="O"===o?"X":"O",a},R=function(e,t){for(var a=JSON.parse(JSON.stringify(e)),n=Number(t.to_timestep)+1;void 0!==a[n];)delete a[n],n++;return a[Object.keys(a).length-1].game_state="STARTED",a},J=function(e,t){var a=JSON.parse(JSON.stringify(e)),n=t.time_step,r=t.new_game_status,s=t.current_turn;return a[n].game_state=r,a[n].current_turn=s,a},U=function(e){var t={0:[]};return t[0]=JSON.parse(JSON.stringify(e[0])),t[0].game_state="STARTED",t},L=function(e,t){var a={};return a[0]=JSON.parse(JSON.stringify(e[0])),a[0].current_turn="",a[0].game_state="PAUSED",a},W={0:N};var P=Object(o.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:W,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"UPDATE_BOARD":return M(e,t);case"GO_BACK":return R(e,t);case"CHANGE_GAME_STATUS":return J(e,t);case"RESET":return U(e);case"NEW_GAME":return L(e);default:return e}}));var Y=function(){return r.a.createElement(c.a,{store:P},r.a.createElement(H,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.b01c9d6a.chunk.js.map