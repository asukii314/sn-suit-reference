(this["webpackJsonpsn-suit-reference"]=this["webpackJsonpsn-suit-reference"]||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t,s){},,,,,,,function(e,t,s){},function(e,t,s){},function(e,t,s){},,function(e,t,s){},function(e,t,s){},function(e,t,s){},function(e,t,s){},function(e,t,s){"use strict";s.r(t);var i=s(1),a=s.n(i),n=s(17),c=s.n(n),r=(s(23),s(24),s(8)),l=s(3),o=s(4),u=s(6),d=s(5),p=s(9),h=s(10),b=(s(25),s(0)),j=function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(e){var i;return Object(l.a)(this,s),(i=t.call(this,e)).toggleZoom=function(){i.setState({zoomed:!i.state.zoomed})},i.state={zoomed:!1},i}return Object(o.a)(s,[{key:"render",value:function(){return Object(b.jsx)("img",{className:this.props.className+(this.state.zoomed?" zoomed-in":" zoomed-out"),src:this.props.src,alt:this.props.alt,onClick:this.toggleZoom})}}]),s}(i.Component),f=(s(27),function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(e){var i;return Object(l.a)(this,s),(i=t.call(this,e)).decrement=function(){i.state.level>1&&i.setState({level:i.state.level-1})},i.increment=function(){i.state.level<5&&i.setState({level:i.state.level+1})},i.state={level:1},i}return Object(o.a)(s,[{key:"render",value:function(){return this.props.iconUrl||this.props.CoR?Object(b.jsxs)("div",{className:"reflection-info-card",children:[Object(b.jsxs)("div",{className:"reflection-card-column",children:[Object(b.jsx)("div",{className:"CoR-title",children:"Call of Reflection"}),Object(b.jsx)("img",{className:"reflection-icon",src:this.props.iconUrl,alt:"reflection-icon"})]}),Object(b.jsxs)("div",{className:"reflection-card-column",children:[Object(b.jsxs)("div",{className:"level-input",children:[Object(b.jsx)("button",{className:"CoR-level-change",onClick:this.decrement,children:"-"}),Object(b.jsx)("div",{className:"CoR-level",children:"Lvl ".concat(this.state.level)}),Object(b.jsx)("button",{className:"CoR-level-change",onClick:this.increment,children:"+"})]}),Object(b.jsx)("div",{className:"CoR-description",dangerouslySetInnerHTML:{__html:this.props.CoR[this.state.level]}})]})]}):Object(b.jsx)("div",{className:"reflection-info-card",children:Object(b.jsxs)("div",{className:"reflection-card-column",children:[Object(b.jsx)("div",{className:"CoR-title",children:"Call of Reflection"}),Object(b.jsx)("div",{className:"CoR-description",style:{marginTop:"5px",color:"darkgray"},children:Object(b.jsx)("i",{children:"(no skill info found)"})})]})})}}]),s}(i.Component)),v=(s(28),function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(e){var i;return Object(l.a)(this,s),(i=t.call(this,e)).updateImgType=function(e){i.setState({imgType:e})},i.renderSuitImageButtons=function(){return Object.entries(i.props.suit.images).filter((function(e){var t=Object(p.a)(e,2);t[0];return!!t[1]})).map((function(e){var t=Object(p.a)(e,2),s=t[0],a=(t[1],"suit-detail-type-button"+(s===i.state.imgType?" selected":""));return Object(b.jsx)("button",{className:a,onClick:i.updateImgType.bind(Object(h.a)(i),s),children:s[0].toUpperCase()+s.substring(1)},s)}))},i.renderSuitIcons=function(){return Object(b.jsxs)("div",{className:"suit-detail-icon-container",children:[Object(b.jsx)("img",{src:"rarity/".concat(i.props.suit.rarity.toLowerCase(),".png"),className:"suit-icon",alt:"rarity"}),i.props.suit.attribute&&Object(b.jsx)("img",{src:"attribute/".concat(i.props.suit.attribute.toLowerCase(),".png"),className:"suit-icon",alt:"rarity"})]})},i.state={imgType:"promo"},i}return Object(o.a)(s,[{key:"componentDidUpdate",value:function(){this.props.suit&&(this.props.suit.images[this.state.imgType]||this.setState({imgType:"promo"}))}},{key:"render",value:function(){if(this.props.suit){var e,t,s,i,a=null===(e=this.props.suit.reflection)||void 0===e||null===(t=e.images)||void 0===t?void 0:t[this.state.imgType];return Object(b.jsxs)("div",{className:"suit-detail-container",children:[Object(b.jsxs)("div",{className:"suit-detail-type-button-container",children:[Object(b.jsx)("div",{className:"suit-source",children:"".concat(this.props.suit.source.type," \xb7 ").concat(this.props.suit.source.subtype)}),Object(b.jsxs)("div",{className:"suit-detail-header-container",children:[this.renderSuitIcons(),Object(b.jsx)("div",{className:"suit-title",children:"".concat(this.props.suit.designer," \xb7 ").concat("awakened"===this.state.imgType&&""!==this.props.suit.awakenedName?this.props.suit.awakenedName:this.props.suit.name)})]}),this.renderSuitImageButtons(),Object(b.jsx)("button",{className:"suit-detail-type-button",onClick:this.props.closePane,children:"\u274c"})]}),Object(b.jsxs)("div",{className:"suit-detail-img-container",children:[Object(b.jsx)(j,{className:"suit-detail-img",src:this.props.suit.images[this.state.imgType],alt:this.state.imgType}),a&&Object(b.jsx)(j,{className:"suit-detail-img",src:a,alt:"reflection"})]}),Object(b.jsx)(f,{iconUrl:null===(s=this.props.suit.reflection.images)||void 0===s?void 0:s.icon,CoR:null===(i=this.props.suit.reflection)||void 0===i?void 0:i.CoR})]})}return null}}]),s}(i.Component)),m=(s(15),s(16),function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(e){var i;return Object(l.a)(this,s),(i=t.call(this,e)).onClick=function(e){i.props.setActiveSuit(e)},i.renderSuitCard=function(e,t){return Object(b.jsxs)("div",{className:"suit-card".concat(e===i.props.activeSuit?" active":""),onClick:i.onClick.bind(Object(h.a)(i),e),children:[Object(b.jsxs)("div",{className:"suit-icon-container",children:[Object(b.jsx)("img",{src:"rarity/".concat(e.rarity.toLowerCase(),".png"),className:"suit-icon",alt:"rarity"}),e.attribute&&Object(b.jsx)("img",{src:"attribute/".concat(e.attribute.toLowerCase(),".png"),className:"suit-icon",alt:"rarity"})]}),Object(b.jsx)("img",{src:e.images.promo,className:"suit-img",alt:e.name}),Object(b.jsxs)("p",{className:"suit-name",children:[" ",e.name," "]})]},t)},i.setActiveSuit=function(e){i.props.setActiveSuit(e)},i.state={},i}return Object(o.a)(s,[{key:"render",value:function(){return this.props.suits?Object(b.jsx)("div",{className:"suit-cards-container ".concat(this.props.layout),children:this.props.suits.map(this.renderSuitCard)}):null}}]),s}(i.Component)),O=s(11),g=s(12),x=(s(29),s(30),function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(e){var i;return Object(l.a)(this,s),(i=t.call(this,e)).toggleExpand=function(){i.setState({expanded:!i.state.expanded})},i.toggleCheckbox=function(e,t,s){i.props.onChange(i.props.category,i.props.category===t?null:t,e,s.target.checked)},i.showChildren=function(e){var t;return(null===(t=i.props.subcategories)||void 0===t?void 0:t[e])&&i.props.checked[e]?Object(b.jsx)("div",{className:"child-option-container",children:i.showOptions(Object.keys(i.props.subcategories[e]),i.props.subcategories[e],e)}):null},i.showOptions=function(e,t,s){return e.map((function(e){return Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"filter-option",children:[Object(b.jsx)("input",{type:"checkbox",checked:t[e],onChange:i.toggleCheckbox.bind(Object(h.a)(i),e,s)},"".concat(e,"-checkbox")),i.props.hasIcons&&Object(b.jsx)("img",{className:"filter-icon",alt:"".concat(e,"-icon"),src:"".concat(i.props.category.toLowerCase(),"/").concat(e.toLowerCase(),".png")},"".concat(e,"-icon")),Object(b.jsx)("div",{className:"filter-label",children:e},"".concat(e,"-label"))]},"".concat(e,"-container")),i.showChildren(e)]},"".concat(e,"-wrapper"))}))},i.showAllOptions=function(){return i.showOptions(Object.keys(i.props.checked),i.props.checked,i.props.category)},i.state={expanded:!0},i}return Object(o.a)(s,[{key:"render",value:function(){return Object(b.jsxs)("div",{className:"filter-box-container",children:[Object(b.jsxs)("div",{className:"filter-box-title",onClick:this.toggleExpand,children:[Object(b.jsx)("div",{children:this.props.category}),Object(b.jsx)("div",{style:{fontWeight:"normal",fontSize:"10px"},children:this.state.expanded?"\u2227":"\u2228"})]}),this.state.expanded&&Object(b.jsx)("div",{className:"filter-option-container",children:this.showAllOptions()})]})}}]),s}(i.Component)),y=function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(e){var i;return Object(l.a)(this,s),(i=t.call(this,e)).getNestedValue=function(e,t){var s,i=e,a=Object(g.a)(t);try{for(a.s();!(s=a.n()).done;){var n,c=s.value;i=null===(n=i)||void 0===n?void 0:n[c]}}catch(r){a.e(r)}finally{a.f()}return i},i.updateFilter=function(e,t,s,a){return null===t?i.setState({filters:Object(r.a)(Object(r.a)({},i.state.filters),{},Object(O.a)({},e,Object(r.a)(Object(r.a)({},i.state.filters[e]),{},Object(O.a)({},s,a))))},i.filterSuits):i.setState({childFilters:Object(r.a)(Object(r.a)({},i.state.childFilters),{},Object(O.a)({},e,Object(r.a)(Object(r.a)({},i.state.childFilters[e]),{},Object(O.a)({},t,Object(r.a)(Object(r.a)({},i.state.childFilters[e][t]),{},Object(O.a)({},s,a))))))},i.filterSuits)},i.filterSuits=function(){var e=Object.keys(i.state.filters).filter((function(e){return Object.values(i.state.filters[e]).some((function(e){return!!e}))})).reduce((function(e,t){var s=Object.keys(i.state.filters[t]).filter((function(e){return i.state.filters[t][e]})).map((function(e){return e.toLowerCase()}));return e.filter((function(e){var a=i.getNestedValue(e,i.metadata[t].paths).toLowerCase();if(!s.includes(a))return!1;if(i.state.childFilters[t]){for(var n=[],c=[],r=function(){var e=o[l],s=Object.keys(i.state.childFilters[t][e]).filter((function(s){return i.state.childFilters[t][e][s]})).map((function(e){return e.toLowerCase()}));s.length>0&&(n=n.concat(s),c.push(e.toLowerCase()))},l=0,o=Object.keys(i.state.childFilters[t]);l<o.length;l++)r();if(n.length>0&&c.includes(a)){var u,d=null===(u=i.getNestedValue(e,i.metadata[t].childPaths))||void 0===u?void 0:u.toLowerCase();if(!n.includes(d))return!1}}return!0}))}),i.props.suits);i.props.updateFilteredSuits(e)},i.renderFilters=function(){return Object.keys(i.state.filters).map((function(e){return Object(b.jsx)(x,{category:e,checked:i.state.filters[e],subcategories:i.state.childFilters[e],onChange:i.updateFilter,hasIcons:i.metadata[e].hasIcons},e)}))},i.state={filters:{Rarity:{R:!1,SR:!1,SSR:!1,UR:!1},Attribute:{Cool:!1,Elegant:!1,Fresh:!1,Sexy:!1,Sweet:!1},Source:{Pavillion:!1,Crafting:!1,Free:!1,Paid:!1,"Other event type":!1}},childFilters:{Source:{Pavillion:{Permanent:!1,Rotational:!1,Event:!1,Collab:!1},Crafting:{Lifetime:!1,"Chapter suit":!1,"Mind maze":!1,"Memory stairway":!1,Other:!1},Free:{Arena:!1,"Pinnacle battle":!1,"Styling competition":!1,"Intel hub":!1,Welfare:!1,Other:!1},Paid:{Recharge:!1,"VIP level":!1,"Fashion plan":!1,"Purple diamonds":!1}}}},i.metadata={Rarity:{paths:["rarity"],hasIcons:!0},Attribute:{paths:["attribute"],hasIcons:!0},Source:{paths:["source","type"],hasIcons:!1,childPaths:["source","subtype"]}},i}return Object(o.a)(s,[{key:"render",value:function(){return Object(b.jsxs)("div",{className:"suit-filter-container",children:[Object(b.jsxs)("div",{className:"toggle-filter-btn",onClick:this.props.toggleFilterPane,children:[Object(b.jsx)("img",{className:"toggle-filter-icon",alt:"toggle-filters",src:"filter-icon.png"}),Object(b.jsx)("div",{className:"toggle-filter-label",children:this.props.expanded?"Hide Filters":"Show Filters"})]}),this.props.expanded&&Object(b.jsx)("div",{className:"filter-title",children:"Filters"}),this.props.expanded&&this.renderFilters()]})}}]),s}(i.Component),S=function(e){Object(u.a)(s,e);var t=Object(d.a)(s);function s(e){var i;return Object(l.a)(this,s),(i=t.call(this,e)).setActiveSuit=function(e){i.state.activeSuit===e?i.closePane():i.setState({activeSuit:e})},i.closePane=function(){i.setState({activeSuit:null})},i.updateFilteredSuits=function(e){i.setState({filteredSuits:e})},i.toggleFilterPane=function(){i.setState({filterPaneOpen:!i.state.filterPaneOpen})},i.state={suits:[],filteredSuits:[],activeSuit:null,filterPaneOpen:!1},i}return Object(o.a)(s,[{key:"componentDidMount",value:function(){var e=this;window.fetch("https://sheets.googleapis.com/v4/spreadsheets/1XkJ4QD8pzoOwL97lFtTSAv2fOb3DikNQYDNkXn6LL9Y/values/Reflections?key=AIzaSyBXC3NZmF3G0LK50YSS4EY4yxb3W7AJa80").then((function(e){return e.json()})).then((function(e){for(var t={},s=1;s<e.values.length;s++){var i=e.values[s][9].split("\n"),a=e.values[s][10].split("\n");t[e.values[s][1]]={tier:e.values[s][2],images:{icon:e.values[s][3],original:e.values[s][4],awakened:e.values[s][5]},CoR:[null,e.values[s][7].replace("A%",'<b style="color:#d1668f">'.concat(i[0],"</b>")).replace("B%",'<b style="color:#d1668f">'.concat(a[0],"</b>")).replace("\n\n"," \xb7 "),e.values[s][7].replace("A%",'<b style="color:#d1668f">'.concat(i[1],"</b>")).replace("B%",'<b style="color:#d1668f">'.concat(a[1],"</b>")).replace("\n\n"," \xb7 "),e.values[s][7].replace("A%",'<b style="color:#d1668f">'.concat(i[2],"</b>")).replace("B%",'<b style="color:#d1668f">'.concat(a[2],"</b>")).replace("\n\n"," \xb7 "),e.values[s][7].replace("A%",'<b style="color:#d1668f">'.concat(i[3],"</b>")).replace("B%",'<b style="color:#d1668f">'.concat(a[3],"</b>")).replace("\n\n"," \xb7 "),e.values[s][7].replace("A%",'<b style="color:#d1668f">'.concat(i[4],"</b>")).replace("B%",'<b style="color:#d1668f">'.concat(a[4],"</b>")).replace("\n\n"," \xb7 ")]}}return t})).then((function(t){window.fetch("https://sheets.googleapis.com/v4/spreadsheets/1XkJ4QD8pzoOwL97lFtTSAv2fOb3DikNQYDNkXn6LL9Y/values/Suits?key=AIzaSyBXC3NZmF3G0LK50YSS4EY4yxb3W7AJa80").then((function(e){return e.json()})).then((function(s){for(var i=[],a=1;a<s.values.length;a++)i.push({name:s.values[a][0],awakenedName:s.values[a][1],reflection:Object(r.a)({name:s.values[a][5]},t[s.values[a][0]]),designer:s.values[a][5],rarity:s.values[a][2],attribute:s.values[a][3],images:{promo:s.values[a][11],detail:s.values[a][12],original:s.values[a][13],awakened:s.values[a][14]},source:{type:s.values[a][7].split(" - ")[0],subtype:s.values[a][7].split(" - ")[1],eventName:s.values[a][8]},availability:{TW:!0,JP:"TRUE"===s.values[a][9],EN:"TRUE"===s.values[a][10]},metadata:{nation:s.values[a][4],archive:s.values[a][6]}});e.setState({suits:i,filteredSuits:i})}))}))}},{key:"render",value:function(){return this.state.suits?Object(b.jsxs)("div",{children:[Object(b.jsx)(v,{suit:this.state.activeSuit,closePane:this.closePane}),Object(b.jsxs)("div",{children:[Object(b.jsx)(y,{suits:this.state.suits,updateFilteredSuits:this.updateFilteredSuits,expanded:this.state.filterPaneOpen,toggleFilterPane:this.toggleFilterPane}),Object(b.jsx)(m,{suits:this.state.filteredSuits,activeSuit:this.state.activeSuit,setActiveSuit:this.setActiveSuit,layout:this.state.filterPaneOpen?"narrow":"wide"})]})]}):null}}]),s}(i.Component),N=s(2),C=s(18);var k=function(){return Object(b.jsx)(C.a,{children:Object(b.jsx)("div",{className:"App",children:Object(b.jsx)("header",{className:"App-header",children:Object(b.jsx)(N.c,{children:Object(b.jsx)(N.a,{path:"/",element:Object(b.jsx)(S,{})})})})})})},w=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,32)).then((function(t){var s=t.getCLS,i=t.getFID,a=t.getFCP,n=t.getLCP,c=t.getTTFB;s(e),i(e),a(e),n(e),c(e)}))};c.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(k,{})}),document.getElementById("root")),w()}],[[31,1,2]]]);
//# sourceMappingURL=main.d00b1e4a.chunk.js.map