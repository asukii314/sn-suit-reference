(this["webpackJsonpsn-suit-reference"]=this["webpackJsonpsn-suit-reference"]||[]).push([[0],{25:function(e,t,i){},48:function(e,t,i){},49:function(e,t,i){},50:function(e,t,i){},52:function(e,t,i){},53:function(e,t,i){},65:function(e,t,i){},67:function(e,t,i){},68:function(e,t,i){},83:function(e,t,i){},84:function(e,t,i){},85:function(e,t,i){"use strict";i.r(t);var n=i(1),c=i.n(n),s=i(37),r=i.n(s),a=(i(48),i(49),i(2)),o=i(7),l=i(4),u=i(5),d=i(6),j=i(9),h=i(8),b=(i(50),i(0)),f=function(e){Object(j.a)(i,e);var t=Object(h.a)(i);function i(e){var n;return Object(u.a)(this,i),(n=t.call(this,e)).toggleZoom=function(){n.setState({zoomed:!n.state.zoomed})},n.state={zoomed:!1},n}return Object(d.a)(i,[{key:"render",value:function(){return Object(b.jsxs)("div",{className:"zoomable-img-wrapper",children:[Object(b.jsx)("div",{className:this.state.zoomed?"dark-background":"",onClick:this.toggleZoom}),!this.state.zoomed&&Object(b.jsxs)("div",{children:[Object(b.jsx)("img",{src:"zoom-in-button.png",className:"zoom-in-button-background",alt:"click to zoom",onClick:this.toggleZoom}),Object(b.jsx)("img",{src:"zoom-in-button.png",className:"zoom-in-button",alt:"click to zoom",onClick:this.toggleZoom})]}),Object(b.jsx)("img",{className:"".concat(this.props.className," zoomed-out"),src:this.props.src,alt:this.props.alt,onClick:this.toggleZoom}),this.state.zoomed&&Object(b.jsx)("img",{className:"".concat(this.props.className," zoomed-in"),src:this.props.src,alt:this.props.alt,onClick:this.toggleZoom})]})}}]),i}(n.Component),p=(i(52),function(e){Object(j.a)(i,e);var t=Object(h.a)(i);function i(e){var n;return Object(u.a)(this,i),(n=t.call(this,e)).decrement=function(){n.state.level>1&&n.setState({level:n.state.level-1})},n.increment=function(){n.state.level<5&&n.setState({level:n.state.level+1})},n.state={level:1},n}return Object(d.a)(i,[{key:"render",value:function(){var e;return this.props.exists?(null===(e=this.props.iconUrl)||void 0===e?void 0:e.length)?Object(b.jsxs)("div",{className:"reflection-info-card",children:[Object(b.jsxs)("div",{className:"reflection-card-column",children:[Object(b.jsx)("div",{className:"CoR-title",children:"Skill Info"}),Object(b.jsx)("img",{className:"reflection-icon",src:this.props.iconUrl,alt:"reflection-icon"})]}),Object(b.jsxs)("div",{className:"reflection-card-column",children:[Object(b.jsxs)("div",{className:"level-input",children:[Object(b.jsx)("button",{className:"CoR-level-change",onClick:this.decrement,children:"-"}),Object(b.jsx)("div",{className:"CoR-level",children:"Lvl ".concat(this.state.level)}),Object(b.jsx)("button",{className:"CoR-level-change",onClick:this.increment,children:"+"})]}),Object(b.jsx)("div",{className:"CoR-description",dangerouslySetInnerHTML:{__html:this.props.CoR[this.state.level]}})]})]}):Object(b.jsx)("div",{className:"reflection-info-card",children:Object(b.jsxs)("div",{className:"reflection-card-column",children:[Object(b.jsx)("div",{className:"CoR-title",children:"Skill Info"}),Object(b.jsx)("div",{className:"CoR-description",style:{marginTop:"5px",color:"darkgray"},children:Object(b.jsx)("i",{children:"(no skill info found)"})})]})}):Object(b.jsx)("div",{className:"reflection-info-card",children:Object(b.jsxs)("div",{className:"reflection-card-column",children:[Object(b.jsx)("div",{className:"CoR-title",children:"Skill Info"}),Object(b.jsx)("div",{className:"CoR-description",style:{marginTop:"5px",color:"darkgray"},children:"N/A - suit does not have a reflection"})]})})}}]),i}(n.Component)),O=function(e){var t=e.url,i=e.autoplay,n=void 0!==i&&i;if(!t)return null;var c=t.includes("youtu")?"https://www.youtube.com/embed/".concat(t.slice(t.length-11)):t;return n?Object(b.jsx)("div",{className:"video-responsive",children:Object(b.jsx)("iframe",{width:"100%",height:"100%",src:c,frameBorder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",autoplay:!0,allowFullScreen:!0,title:"YouTube video player"})}):Object(b.jsx)("div",{className:"video-responsive",children:Object(b.jsx)("iframe",{width:"100%",height:"100%",src:c,frameBorder:"0",allow:"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0,title:"YouTube video player"})})};i(53);function m(e){return Object(b.jsx)("li",{className:"suit-link",children:Object(b.jsxs)("div",{children:[Object(b.jsx)("a",{className:"inline",href:e.detailPageUrl,children:e.name})," - ",e.rarity," ",e.type]})})}function v(e){var t,i=e.event,n=e.sourceType,c=(null===(t=i.suits)||void 0===t?void 0:t.length)?Object(o.a)(i.suits):[];return c.sort((function(e,t){return e.rarity===t.rarity?0:e.rarity<t.rarity?1:-1})),Object(b.jsxs)("div",{className:"event-card-container",children:[Object(b.jsx)("div",{className:"event-title",children:n}),Object(b.jsx)("div",{className:"event-subtitle",children:i.name}),Object(b.jsx)("ul",{children:c.map(m)})]})}var x=i(16),g=i.n(x),N=(i(55),i(38));i(65);function w(e){var t=e.suit,i=e.nextSuit,c=e.isFavourited,s=e.favourite,r=e.unfavourite,o=e.closePane,u=Object(n.useState)("promo"),d=Object(l.a)(u,2),j=d[0],h=d[1];g.a.config({left:function(){return i({forward:!1})},right:function(){return i({forward:!0})}}),Object(n.useEffect)((function(){t&&("video"===j&&!t.video||"video"!==j&&!t.images[j])&&h("promo")}));var m=Object(n.useState)(window.innerWidth),x=Object(l.a)(m,2),w=x[0],k=x[1];function y(){k(window.innerWidth)}Object(n.useEffect)((function(){return window.addEventListener("resize",y),function(){window.removeEventListener("resize",y)}}),[]);var S=w<=768,C=function(e){var t="suit-detail-type-button"+(e===j?" selected":"");return Object(b.jsx)("button",{className:t,onClick:function(){return h(e)},children:e[0].toUpperCase()+e.substring(1)},e)},R=function(){var e,i,n=t.source.subtype?t.source.subtype[0].toUpperCase()+t.source.subtype.substring(1):t.source.type,c=["Single SSR","Double SSR","Single UR","Double UR"];return"event"===t.source.subtype&&c.includes(null===(e=t.source.event)||void 0===e?void 0:e.type)&&(n="".concat(t.source.event.type," event")),"collab"===t.source.subtype&&c.includes(null===(i=t.source.event)||void 0===i?void 0:i.type)&&(n="".concat(t.source.event.type," collab")),n};if(t){var F,L,P=null===(F=t.reflection)||void 0===F||null===(L=F.images)||void 0===L?void 0:L[j];return Object(b.jsxs)("div",Object(a.a)(Object(a.a)({className:"suit-detail-container"},g.a.events),{},{tabIndex:"1",children:[Object(b.jsx)("button",{className:"suit-detail-close-button",onClick:o,children:"\u274c"}),function(e){return Object(b.jsxs)("div",{className:"suit-detail-left-column",children:[Object(b.jsxs)("div",{className:"suit-detail-img-container",children:["video"===j&&Object(b.jsx)(O,{url:t.video}),"video"!==j&&Object(b.jsx)(f,{className:"suit-detail-img",src:t.images[j],alt:j}),e&&Object(b.jsx)(f,{className:"suit-detail-img",src:e,alt:"reflection"})]}),Object(b.jsxs)("div",{className:"favourite-icon-container detail",children:[Object(b.jsxs)("div",{className:"suit-attribute-icons",children:[Object(b.jsx)("img",{src:"rarity/".concat(t.rarity.toLowerCase(),".png"),className:"suit-icon detail",alt:"rarity"}),Object(b.jsx)("div",{className:"suit-attribute-label",children:t.rarity}),t.attribute&&Object(b.jsx)("img",{src:"attribute/".concat(t.attribute.toLowerCase(),".png"),className:"suit-icon detail",alt:"rarity"}),t.attribute&&Object(b.jsx)("div",{className:"suit-attribute-label",children:t.attribute})]}),Object(b.jsxs)("div",{className:"suit-likes-container",children:[Object(b.jsx)("div",{className:"suit-attribute-label favourites",children:t.likes}),!c&&Object(b.jsx)("img",{src:"heart_outline.png",className:"heart-icon detail unfavourited",alt:"favourite",onClick:function(){return s(t)}}),c&&Object(b.jsx)("img",{src:"heart_red.png",className:"heart-icon detail favourited",alt:"unfavourite",onClick:function(){return r(t)}})]})]})]})}(P),Object(b.jsxs)("div",{className:"suit-title-block",children:[Object(b.jsx)("div",{className:"suit-title",children:"".concat(t.designer," \xb7 ").concat("awakened"===j&&""!==t.awakenedName?t.awakenedName:t.name)}),Object(b.jsxs)("div",{className:"suit-image-buttons-container",children:[Object.entries(t.images).filter((function(e){var t=Object(l.a)(e,2);return t[0],!!t[1]})).map((function(e){var t=Object(l.a)(e,2),i=t[0];return t[1],C(i)})),t.video&&C("video")]}),function(){var e,i,n,c,s,r,a,o;return S?Object(b.jsx)("div",{className:"suit-detail-infocard-container",children:Object(b.jsxs)(N.Carousel,{className:"carousel",showStatus:!1,showThumbs:!1,useKeyboardArrows:!1,children:[Object(b.jsx)(v,{event:null===(e=t.source)||void 0===e?void 0:e.event,sourceType:R()}),Object(b.jsx)(p,{exists:"(N/A - no reflection)"!==t.archive,iconUrl:null===(i=t.reflection)||void 0===i||null===(n=i.images)||void 0===n?void 0:n.icon,CoR:null===(c=t.reflection)||void 0===c?void 0:c.CoR})]})}):Object(b.jsxs)("div",{className:"suit-detail-infocard-container",children:[Object(b.jsx)(v,{event:null===(s=t.source)||void 0===s?void 0:s.event,sourceType:R()}),Object(b.jsx)(p,{exists:"(N/A - no reflection)"!==t.archive,iconUrl:null===(r=t.reflection)||void 0===r||null===(a=r.images)||void 0===a?void 0:a.icon,CoR:null===(o=t.reflection)||void 0===o?void 0:o.CoR})]})}()]})]}))}return null}var k=i(15),y=(i(20),i(25),i(26)),S=i.n(y),C=function(e){Object(j.a)(i,e);var t=Object(h.a)(i);function i(e){var n;return Object(u.a)(this,i),(n=t.call(this,e)).onClick=function(e){n.props.setActiveSuit(e)},n.renderSuitCard=function(e,t){return Object(b.jsxs)("div",Object(a.a)(Object(a.a)(Object(a.a)({className:"suit-card".concat(e===n.props.activeSuit?" active":""),onClick:n.onClick.bind(Object(k.a)(n),e)},g.a.events),{},{tabIndex:"1"},S.a.events),{},{children:[Object(b.jsx)("div",{className:"suit-icon-container",children:Object(b.jsxs)("div",{className:"favourite-icon-container",children:[!n.props.favouriteSuits.includes(e.id)&&Object(b.jsx)("img",{src:"heart_black.png",className:"heart-icon unfavourited suit-icon shadowed",alt:"favourite",onClick:function(t){return n.props.favourite(e,t)}}),n.props.favouriteSuits.includes(e.id)&&Object(b.jsx)("img",{src:"heart_red.png",className:"heart-icon favourited suit-icon shadowed",alt:"unfavourite",onClick:function(t){return n.props.unfavourite(e,t)}}),Object(b.jsx)("img",{src:"rarity/".concat(e.rarity.toLowerCase(),".png"),className:"suit-icon shadowed",alt:"rarity"}),e.attribute&&Object(b.jsx)("img",{src:"attribute/".concat(e.attribute.toLowerCase(),".png"),className:"suit-icon",alt:"rarity"})]})}),Object(b.jsx)("img",{src:e.images.promo,className:"suit-img",alt:e.name}),Object(b.jsxs)("p",{className:"suit-name",children:[" ",e.name," "]})]}),t)},n.setActiveSuit=function(e){n.props.setActiveSuit(e)},n.state={},g.a.config({left:function(){return n.props.nextSuit({forward:!1})},right:function(){return n.props.nextSuit({forward:!0})}}),S.a.config({left:function(){return n.props.nextSuit({forward:!1})},right:function(){return n.props.nextSuit({forward:!0})}}),n}return Object(d.a)(i,[{key:"render",value:function(){return this.props.suits?Object(b.jsx)("div",{className:"suit-cards-container".concat(this.props.suits.length?" loaded":"").concat(this.props.filterPaneOpen?" pane-open":""),children:this.props.suits.map(this.renderSuitCard)}):null}}]),i}(n.Component),R=i(11),F=i(22),L=(i(67),i(68),function(e){Object(j.a)(i,e);var t=Object(h.a)(i);function i(e){var n;return Object(u.a)(this,i),(n=t.call(this,e)).toggleExpand=function(){n.setState({expanded:!n.state.expanded})},n.toggleCheckbox=function(e,t,i){n.props.onChange(n.props.category,n.props.category===t?null:t,e,i.target.checked)},n.showChildren=function(e){var t;return(null===(t=n.props.subcategories)||void 0===t?void 0:t[e])&&n.props.checked[e]?Object(b.jsx)("div",{className:"child-option-container",children:n.showOptions(Object.keys(n.props.subcategories[e]),n.props.subcategories[e],e)}):null},n.showOptions=function(e,t,i){return e.map((function(e){return Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"filter-option",children:[Object(b.jsx)("input",{type:"checkbox",checked:t[e],onChange:n.toggleCheckbox.bind(Object(k.a)(n),e,i)},"".concat(e,"-checkbox")),n.props.hasIcons&&Object(b.jsx)("img",{className:"filter-icon",alt:"".concat(e,"-icon"),src:"".concat(n.props.category.toLowerCase(),"/").concat(e.toLowerCase(),".png")},"".concat(e,"-icon")),Object(b.jsx)("div",{className:"filter-label",children:e},"".concat(e,"-label"))]},"".concat(e,"-container")),n.showChildren(e)]},"".concat(e,"-wrapper"))}))},n.showAllOptions=function(){return n.showOptions(Object.keys(n.props.checked),n.props.checked,n.props.category)},n.state={expanded:!0},n}return Object(d.a)(i,[{key:"render",value:function(){return Object(b.jsxs)("div",{className:"filter-box-container",children:[Object(b.jsxs)("div",{className:"filter-box-title",onClick:this.toggleExpand,children:[Object(b.jsx)("div",{children:this.props.category}),Object(b.jsx)("div",{style:{fontWeight:"normal",fontSize:"10px"},children:this.state.expanded?"\u2227":"\u2228"})]}),this.state.expanded&&Object(b.jsx)("div",{className:"filter-option-container",children:this.showAllOptions()})]})}}]),i}(n.Component)),P=i(39),E=function(e){Object(j.a)(i,e);var t=Object(h.a)(i);function i(e){var n;return Object(u.a)(this,i),(n=t.call(this,e)).getNestedValue=function(e,t){var i,n=e,c=Object(F.a)(t);try{for(c.s();!(i=c.n()).done;){var s,r=i.value;n=null===(s=n)||void 0===s?void 0:s[r]}}catch(a){c.e(a)}finally{c.f()}return n},n.updateFilter=function(e,t,i,c){return null===t?n.setState({filters:Object(a.a)(Object(a.a)({},n.state.filters),{},Object(R.a)({},e,Object(a.a)(Object(a.a)({},n.state.filters[e]),{},Object(R.a)({},i,c))))},n.filterSuits):n.setState({childFilters:Object(a.a)(Object(a.a)({},n.state.childFilters),{},Object(R.a)({},e,Object(a.a)(Object(a.a)({},n.state.childFilters[e]),{},Object(R.a)({},t,Object(a.a)(Object(a.a)({},n.state.childFilters[e][t]),{},Object(R.a)({},i,c))))))},n.filterSuits)},n.filterSuits=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.triggerUpdate,i=void 0===t||t,c=Object.keys(n.state.filters).filter((function(e){return Object.values(n.state.filters[e]).some((function(e){return!!e}))})),s=n.props.suits.filter((function(e){return!(n.state.searchByNameResults&&!n.state.searchByNameResults.map((function(e){return e.name})).includes(e.name)||n.state.searchByDesignerResults&&!n.state.searchByDesignerResults.map((function(e){return e.name})).includes(e.name))})),r=c.reduce((function(e,t){var i=Object.keys(n.state.filters[t]).filter((function(e){return n.state.filters[t][e]})).map((function(e){return e.toLowerCase()}));return e.filter((function(e){var c=n.getNestedValue(e,n.metadata[t].paths).toLowerCase();if(!i.includes(c))return!1;if(n.state.childFilters[t]){for(var s=[],r=[],a=function(){var e=l[o],i=Object.keys(n.state.childFilters[t][e]).filter((function(i){return n.state.childFilters[t][e][i]})).map((function(e){return e.toLowerCase()}));i.length>0&&(s=s.concat(i),r.push(e.toLowerCase()))},o=0,l=Object.keys(n.state.childFilters[t]);o<l.length;o++)a();if(s.length>0&&r.includes(c)){var u,d=null===(u=n.getNestedValue(e,n.metadata[t].childPaths))||void 0===u?void 0:u.toLowerCase();if(!s.includes(d))return!1}}return!0}))}),s);return i&&n.props.updateFilteredSuits(r),r},n.renderFilters=function(){return Object.keys(n.state.filters).map((function(e){return Object(b.jsx)(L,{category:e,checked:n.state.filters[e],subcategories:n.state.childFilters[e],onChange:n.updateFilter,hasIcons:n.metadata[e].hasIcons},e)}))},n.handleSearch=function(e,t){n.setState({searchByNameResults:t},n.props.updateFilteredSuits(t))},n.handleClear=function(){n.setState({searchByNameResults:null},n.filterSuits)},n.handleSelect=function(e){n.handleSearch([e]),n.props.setActiveSuit(e)},n.handleDesignerSearch=function(e,t){var i=t.map((function(e){return e.name})),c=n.filterSuits({triggerUpdate:!1}).filter((function(e){return i.includes(e.designer)}));n.setState({searchByDesignerResults:c},(function(){return n.props.updateFilteredSuits(c)}))},n.handleDesignerSelect=function(e){n.handleDesignerSearch(null,[e])},n.handleDesignerClear=function(){n.setState({searchByDesignerResults:null},n.filterSuits)},n.renderSearchBars=function(){var e=n.props.suits.map((function(e){return e.designer})).filter((function(e,t,i){return i.indexOf(e)===t})).filter((function(e){return e.length>0})).sort((function(e,t){return e.localeCompare(t)})).map((function(e){return{name:e}}));return Object(b.jsx)("div",{children:Object(b.jsx)("div",{className:"search-bar-wrapper",children:Object(b.jsx)(P.ReactSearchAutocomplete,{items:e,placeholder:"Search by designer",onSearch:n.handleDesignerSearch,onSelect:n.handleDesignerSelect,onClear:n.handleDesignerClear,styling:{fontSize:"11px",height:"30px",searchIconMargin:"0px 0px 0px 8px"},useCaching:!1})})})},n.state={searchByNameResults:null,searchByDesignerResults:null,filters:{Rarity:{SR:!1,SSR:!1,UR:!1},Attribute:{Cool:!1,Elegant:!1,Fresh:!1,Sexy:!1,Sweet:!1},Source:{Pavillion:!1,Crafting:!1,Free:!1,Paid:!1,"Other event type":!1},Nation:{Apple:!1,Cloud:!1,Ninir:!1,North:!1,Pigeon:!1,Ruin:!1,Wasteland:!1}},childFilters:{Source:{Pavillion:{Permanent:!1,Gleam:!1,Event:!1,Collab:!1},Crafting:{Lifetime:!1,"Chapter suit":!1,"Mind maze":!1,"Memory stairway":!1,Other:!1},Free:{Arena:!1,"Pinnacle battle":!1,"Styling competition":!1,"Intel hub":!1,Welfare:!1,Other:!1},Paid:{Recharge:!1,"VIP level":!1,"Fashion plan":!1,"Purple diamonds":!1}}}},n.metadata={Rarity:{paths:["rarity"],hasIcons:!0},Attribute:{paths:["attribute"],hasIcons:!0},Source:{paths:["source","type"],hasIcons:!1,childPaths:["source","subtype"]},Nation:{paths:["nation"],hasIcons:!0}},n}return Object(d.a)(i,[{key:"render",value:function(){return Object(b.jsxs)("div",{className:"suit-filter-container",children:[Object(b.jsxs)("div",{className:"toggle-filter-btn",onClick:this.props.toggleFilterPane,children:[Object(b.jsx)("img",{className:"toggle-filter-icon",alt:"toggle-filter-view",title:this.props.expanded?"Close filter pane":"Open filter pane",src:this.props.expanded?"collapse-icon.png":"filter-icon.png"}),Object(b.jsx)("div",{className:"toggle-filter-label".concat(this.props.expanded?" hidden":""),children:"Show Filters"})]}),Object(b.jsxs)("div",{className:this.props.expanded?"":"hidden",children:[Object(b.jsx)("div",{className:"filter-title",children:"Filters"}),this.renderSearchBars(),this.renderFilters()]})]})}}]),i}(n.Component);function A(){return window.fetch("https://sn-suit-reference-api.herokuapp.com/suits").then((function(e){return e.json()}))}function D(e){return A().then((function(t){var i;return null===(i=t.filter((function(t){return t.name.toLowerCase()===e.toLowerCase()})))||void 0===i?void 0:i[0]}))}var I=i(12);function z(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),i=t[0],c=t[1],s=Object(n.useState)([]),r=Object(l.a)(s,2),u=r[0],d=r[1],j=Object(n.useState)([]),h=Object(l.a)(j,2),f=h[0],p=h[1],O=Object(n.useState)(null),m=Object(l.a)(O,2),v=m[0],x=m[1],g=Object(n.useState)(!1),N=Object(l.a)(g,2),k=N[0],y=N[1],S=Object(n.useState)(!1),R=Object(l.a)(S,2),F=R[0],L=R[1],P=Object(I.b)(),D=P.user,z=P.isAuthenticated,T=P.loginWithRedirect;Object(n.useEffect)((function(){i.length||A().then((function(e){c(e),p(e)})),z&&0===u.length&&!F&&(L(!0),window.fetch("https://sn-suit-reference-api.herokuapp.com/favourites/".concat(D.sub)).then((function(e){return e.json()})).then((function(e){return d(e)})))}));var U=function(e,t){if(t&&t.stopPropagation(),z){if(e&&(null===D||void 0===D?void 0:D.sub)){d([].concat(Object(o.a)(u),[e.id]));var n=i.map((function(e){return e.id})).indexOf(e.id);if(n>-1){var s=Object(o.a)(i);s[n]=Object(a.a)(Object(a.a)({},i[n]),{},{likes:i[n].likes+1}),c(s),(null===v||void 0===v?void 0:v.id)===e.id&&x(s[n])}var r=f.map((function(e){return e.id})).indexOf(e.id);if(r>-1){var l=Object(o.a)(f);l[r]=Object(a.a)(Object(a.a)({},f[r]),{},{likes:f[r].likes+1}),p(l)}window.fetch("https://sn-suit-reference-api.herokuapp.com/favourites/".concat(D.sub,"/").concat(e.id),{method:"PUT"})}}else T()},B=function(e,t){if(t&&t.stopPropagation(),e&&(null===D||void 0===D?void 0:D.sub)){var n=u.indexOf(e.id);if(n>-1){var s=Object(o.a)(u);s.splice(n,1),d(s)}var r=i.map((function(e){return e.id})).indexOf(e.id);if(r>-1){var l=Object(o.a)(i);l[r]=Object(a.a)(Object(a.a)({},i[r]),{},{likes:i[r].likes-1}),c(l),(null===v||void 0===v?void 0:v.id)===e.id&&x(l[r])}var j=f.map((function(e){return e.id})).indexOf(e.id);if(j>-1){var h=Object(o.a)(f);h[j]=Object(a.a)(Object(a.a)({},f[j]),{},{likes:f[j].likes-1}),p(h)}window.fetch("https://sn-suit-reference-api.herokuapp.com/favourites/".concat(D.sub,"/").concat(e.id),{method:"DELETE"})}},W=Object(n.useCallback)((function(e){27===e.keyCode&&H()}),[]);Object(n.useEffect)((function(){return document.addEventListener("keydown",W),function(){document.removeEventListener("keydown",W)}}),[W]);var _=function(e){v===e?H():x(e)},H=function(){x(null)},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.forward,i=void 0===t||t;if(v){var n=f.map((function(e){return e.name})).indexOf(v.name),c=n+(i?1:-1);c<0||c>=f.length||x(f[c])}};return i?Object(b.jsxs)("div",{children:[Object(b.jsx)(E,{suits:i,updateFilteredSuits:p,expanded:k,toggleFilterPane:function(){y(!k)},setActiveSuit:_}),Object(b.jsxs)("div",{className:k?"narrow":"wide",children:[Object(b.jsx)(w,{suit:v,closePane:H,nextSuit:J,isFavourited:u.includes(null===v||void 0===v?void 0:v.id)||!1,favourite:U,unfavourite:B}),Object(b.jsx)(C,{suits:f,activeSuit:v,setActiveSuit:_,nextSuit:J,favouriteSuits:u,favourite:U,unfavourite:B,filterPaneOpen:null!==v})]})]}):null}var T=i(3);i(83);function U(e){return Object.entries(e.images).filter((function(e){var t=Object(l.a)(e,2);t[0];return!!t[1]})).map((function(t){var i,n,c=Object(l.a)(t,2),s=c[0],r=c[1];return"promo"===s&&Object.values(e.images).slice(1).includes(r)?null:function(e,t,i){return Object(b.jsxs)("div",{className:"suit-img-tile",children:[Object(b.jsx)("div",{className:"suit-tile-title",children:e}),Object(b.jsxs)("div",{className:"suit-tile-img-wrapper",children:[Object(b.jsx)(f,{className:"tile-img suit",src:t,alt:e}),i&&Object(b.jsx)(f,{className:"tile-img reflection",src:i,alt:"reflection"})]})]},e)}(s,r,null===(i=e.reflection)||void 0===i||null===(n=i.images)||void 0===n?void 0:n[s])}))}function B(e){return Object(b.jsxs)("div",{className:"suit-detail-icon-container horizontal",children:[Object(b.jsx)("div",{className:"suit-source full",children:e.source.subtype?"".concat(e.source.type," \xb7 ").concat(e.source.subtype):e.source.type}),Object(b.jsx)("img",{src:"rarity/".concat(e.rarity.toLowerCase(),".png"),className:"suit-icon plain",alt:"rarity"}),e.attribute&&Object(b.jsx)("img",{src:"attribute/".concat(e.attribute.toLowerCase(),".png"),className:"suit-icon",alt:"rarity"})]})}function W(){var e,t,i,c=Object(n.useState)(0),s=Object(l.a)(c,2),r=s[0],a=s[1],o=Object(T.g)().suitId,u=o[0].toUpperCase()+o.replace(/-/g," ").substring(1);Object(n.useEffect)((function(){r||D(u).then(a)}),[r,u]),Object(n.useEffect)((function(){D(o[0].toUpperCase()+o.replace(/-/g," ").substring(1)).then(a)}),[o]);var d;return r?Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"suit-detail-info-container",children:[Object(b.jsxs)("div",{className:"suit-title-container",children:[B(r),Object(b.jsx)("div",{className:"suit-detail-header-container",children:Object(b.jsx)("div",{className:"suit-title full",children:"".concat(r.designer," \xb7 ").concat(r.name)})})]}),Object(b.jsxs)("div",{className:"suit-detail-infocard-container",children:[Object(b.jsx)(v,{event:null===(e=r.source)||void 0===e?void 0:e.event,sourceType:function(){var e,t,i=r.source.subtype?r.source.subtype[0].toUpperCase()+r.source.subtype.substring(1):r.source.type,n=["Single SSR","Double SSR","Single UR","Double UR"];return"event"===r.source.subtype&&n.includes(null===(e=r.source.event)||void 0===e?void 0:e.type)&&(i="".concat(r.source.event.type," event")),"collab"===r.source.subtype&&n.includes(null===(t=r.source.event)||void 0===t?void 0:t.type)&&(i="".concat(r.source.event.type," collab")),i}()}),"(N/A - no reflection)"!==r.archive&&Object(b.jsx)(p,{iconUrl:null===(t=r.reflection.images)||void 0===t?void 0:t.icon,CoR:null===(i=r.reflection)||void 0===i?void 0:i.CoR})]})]}),Object(b.jsxs)("div",{className:"suit-img-tiles-container",children:[U(r),(d=r.video,d?Object(b.jsxs)("div",{className:"suit-img-tile",children:[Object(b.jsx)("div",{className:"suit-tile-title",children:"Suit Display Video"}),Object(b.jsx)("div",{className:"suit-tile-img-wrapper",children:Object(b.jsx)(O,{url:d})})]},"video"):null)]})]}):null}var _=i(18);i(84);function H(){var e=Object(I.b)(),t=e.user,i=e.isAuthenticated,c=e.loginWithRedirect,s=e.logout,r=Object(n.useState)(!1),a=Object(l.a)(r,2),o=a[0],u=a[1];return Object(b.jsxs)("nav",{role:"navigation",className:o?" open":"",children:[Object(b.jsxs)("b",{children:[Object(b.jsx)("img",{className:"mobile-hamburger-menu",src:"./menu.png",onClick:function(){return u(!o)}}),"SN Suit Reference"]}),Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"#/",children:"All Suits"})}),(null===t||void 0===t?void 0:t.sub)?Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"#/wishlist/".concat(t.sub),children:"Wishlist"})}):Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"",onClick:function(){return c()},children:"Wishlist"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"#/credits",children:"Credits"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"#/contact",children:"Contact"})}),!i&&Object(b.jsx)("li",{children:Object(b.jsx)("a",{href:"",onClick:function(){return c()},children:"Log In"})}),i&&Object(b.jsx)("li",{children:Object(b.jsx)("a",{onClick:function(){return s({returnTo:window.location.origin.includes("localhost")?window.location.origin:"https://asukii314.github.io/sn-suit-reference"})},children:"Log Out"})})]})]})}function J(){return Object(b.jsxs)("div",{className:"infopage",children:[Object(b.jsx)("h3",{children:" Get in touch "}),Object(b.jsxs)("p",{children:["I love hearing from people! Please don't hesitate to reach out if you...",Object(b.jsxs)("ul",{children:[Object(b.jsx)("li",{children:"Spotted a bug to report"}),Object(b.jsx)("li",{children:"Notice any inaccurate or missing suit/reflection info"}),Object(b.jsx)("li",{children:"Have a suit, photo, or video you want added to the site"}),Object(b.jsx)("li",{children:"Have any feedback or suggestions to share"}),Object(b.jsx)("li",{children:"Would like to collaborate with me"}),Object(b.jsx)("li",{children:"Or any other reason, really!"})]})]}),Object(b.jsxs)("p",{children:["Here's a few ways to reach me:",Object(b.jsxs)("ul",{children:[Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Email:"})," ",Object(b.jsx)("a",{className:"inline",href:"mailto:asukii314.twitch@gmail.com",children:"asukii314.twitch@gmail.com"})]}),Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Discord:"})," ",Object(b.jsx)("a",{className:"inline",href:"https://discord.gg/hWCTc69C3Y",children:"Join my guild's server"}),", or DM me @asukii#7286"]}),Object(b.jsxs)("li",{children:[Object(b.jsx)("b",{children:"Github:"})," ",Object(b.jsx)("a",{className:"inline",href:"https://github.com/asukii314/sn-suit-reference",children:"Public repo is here"})," - feel free to make a PR!"]})]})]})]})}function M(){return Object(b.jsxs)("div",{className:"infopage",children:[Object(b.jsx)("h3",{children:" Credits "}),Object(b.jsxs)("p",{children:["This site wouldn't have been possible without the massive contributions - both explicit and implicit - from many others in the Shining Nikki community. Here they are:",Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)("b",{children:"Website UI/UX Design Help"}),Object(b.jsxs)("ul",{children:[Object(b.jsxs)("li",{children:["Elisa Lam - ",Object(b.jsx)("a",{className:"inline",href:"https://elisalam.squarespace.com",children:"website"})]}),Object(b.jsxs)("li",{children:["Natasha Djie - ",Object(b.jsx)("a",{className:"inline",href:"mailto:natasha.djie@gmail.com",children:"email"})]})]}),Object(b.jsx)("b",{children:"SN Reference Images"}),Object(b.jsxs)("ul",{children:[Object(b.jsxs)("li",{children:[Object(b.jsx)("a",{className:"inline",href:"https://lensdump.com/rumi/albums",children:"Rumi's Lensdump"})," ",Object(b.jsx)("i",{children:"(suit images)"})]}),Object(b.jsxs)("li",{children:[Object(b.jsx)("a",{className:"inline",href:"https://lensdump.com/sakushi/albums/",children:"Saku's Lensdump"})," ",Object(b.jsx)("i",{children:"(reflection art)"})]}),Object(b.jsxs)("li",{children:[Object(b.jsx)("a",{className:"inline",href:"https://lensdump.com/a/W7Tra/sub",children:"SND Lensdump"})," ",Object(b.jsx)("i",{children:"(reflection icons)"})]}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{className:"inline",href:"https://orangecatty-shiningnikki.tumblr.com/",children:"Orangecatty's Tumblr"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{className:"inline",href:"https://twitter.com/rei_sh3",children:"R E I - Twitter"})}),Object(b.jsx)("li",{children:Object(b.jsx)("a",{className:"inline",href:"https://nikki4.com.tw/newslist",children:"Official TW News"})}),Object(b.jsxs)("li",{children:["Official twitter accounts for ",Object(b.jsx)("a",{className:"inline",href:"https://twitter.com/ShiningNikki_JP",children:"Japan"})," and ",Object(b.jsx)("a",{className:"inline",href:"https://twitter.com/ShiningNikki_SN",children:"Global"})]}),Object(b.jsxs)("li",{children:["Various posts on the official ",Object(b.jsx)("a",{className:"inline",href:"https://discord.gg/shiningnikki",children:"SN Discord"})]})]}),Object(b.jsx)("b",{children:"Misc/Other"}),Object(b.jsxs)("ul",{children:[Object(b.jsxs)("li",{children:["Reflection skill data from Kami's ",Object(b.jsx)("a",{className:"inline",href:"https://docs.google.com/spreadsheets/d/1Va9SCIrxni6TUEB1DFxwQK8Vj9mnsCxztsPA9OJja-g/",children:"Shadow Ranking Sheet"})]}),Object(b.jsxs)("li",{children:["Metadata for global suits from ",Object(b.jsx)("a",{className:"inline",href:"https://shining-nikki.fandom.com/wiki/Shining_Nikki_Wiki",children:"the Shining Nikki Wiki"})]}),Object(b.jsx)("li",{children:"Help finding/organizing suit data from Demonic Dragon#3189"}),Object(b.jsxs)("li",{children:["Icons made by ",Object(b.jsx)("a",{className:"inline",href:"https://www.freepik.com",title:"Freepik",children:"Freepik"})," from ",Object(b.jsx)("a",{href:"https://www.flaticon.com/",className:"inline",title:"Flaticon",children:"www.flaticon.com"})]}),Object(b.jsxs)("li",{children:["And of course, ",Object(b.jsx)("a",{className:"inline",href:"#/contact",children:"me (asukii)"})," to pull it all together :)"]})]})]})]})}function V(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),i=t[0],c=t[1],s=Object(n.useState)([]),r=Object(l.a)(s,2),u=r[0],d=r[1],j=Object(n.useState)([]),h=Object(l.a)(j,2),f=h[0],p=h[1],O=Object(n.useState)(null),m=Object(l.a)(O,2),v=m[0],x=m[1],g=Object(n.useState)(!1),N=Object(l.a)(g,2),k=N[0],y=N[1],S=Object(I.b)().user,R=Object(T.g)().userid;Object(n.useEffect)((function(){i.length||Promise.all([A(),window.fetch("https://sn-suit-reference-api.herokuapp.com/favourites/".concat(R)).then((function(e){return e.json()}))]).then((function(e){var t=Object(l.a)(e,2),i=t[0],n=t[1],s=i.filter((function(e){return n.includes(e.id)}));console.log("s",s),c(s),p(s),(null===S||void 0===S?void 0:S.sub)===R?d(n):(null===S||void 0===S?void 0:S.sub)&&window.fetch("https://sn-suit-reference-api.herokuapp.com/favourites/".concat(null===S||void 0===S?void 0:S.sub)).then((function(e){return e.json()})).then(d)}))}));var F=function(e,t){if(t&&t.stopPropagation(),e&&(null===S||void 0===S?void 0:S.sub)){d([].concat(Object(o.a)(u),[e.id]));var n=i.map((function(e){return e.id})).indexOf(e.id);if(n>-1){var s=Object(o.a)(i);s[n]=Object(a.a)(Object(a.a)({},i[n]),{},{likes:i[n].likes+1}),c(s),(null===v||void 0===v?void 0:v.id)===e.id&&x(s[n])}var r=f.map((function(e){return e.id})).indexOf(e.id);if(r>-1){var l=Object(o.a)(f);l[r]=Object(a.a)(Object(a.a)({},f[r]),{},{likes:f[r].likes+1}),p(l)}window.fetch("https://sn-suit-reference-api.herokuapp.com/favourites/".concat(S.sub,"/").concat(e.id),{method:"PUT"})}},L=function(e,t){if(t&&t.stopPropagation(),e&&(null===S||void 0===S?void 0:S.sub)){var n=u.indexOf(e.id);if(n>-1){var s=Object(o.a)(u);s.splice(n,1),d(s)}var r=i.map((function(e){return e.id})).indexOf(e.id);if(r>-1){var l=Object(o.a)(i);l[r]=Object(a.a)(Object(a.a)({},i[r]),{},{likes:i[r].likes-1}),c(l),(null===v||void 0===v?void 0:v.id)===e.id&&x(l[r])}var j=f.map((function(e){return e.id})).indexOf(e.id);if(j>-1){var h=Object(o.a)(f);h[j]=Object(a.a)(Object(a.a)({},f[j]),{},{likes:f[j].likes-1}),p(h)}window.fetch("https://sn-suit-reference-api.herokuapp.com/favourites/".concat(S.sub,"/").concat(e.id),{method:"DELETE"})}},P=Object(n.useCallback)((function(e){27===e.keyCode&&z()}),[]);Object(n.useEffect)((function(){return document.addEventListener("keydown",P),function(){document.removeEventListener("keydown",P)}}),[P]);var D=function(e){v===e?z():x(e)},z=function(){x(null)},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.forward,i=void 0===t||t;if(v){var n=f.map((function(e){return e.name})).indexOf(v.name),c=n+(i?1:-1);c<0||c>=f.length||x(f[c])}};return i?Object(b.jsxs)("div",{children:[Object(b.jsx)(E,{suits:i,updateFilteredSuits:p,expanded:k,toggleFilterPane:function(){y(!k)},setActiveSuit:D}),Object(b.jsxs)("div",{className:k?"narrow":"wide",children:[Object(b.jsx)(w,{suit:v,closePane:z,nextSuit:U,isFavourited:u.includes(null===v||void 0===v?void 0:v.id)||!1,favourite:F,unfavourite:L}),Object(b.jsx)(C,{suits:f,activeSuit:v,setActiveSuit:D,nextSuit:U,favouriteSuits:u,favourite:F,unfavourite:L})]})]}):null}var Z=function(){return window.location.hash&&"#_=_"===window.location.hash&&(window.location.hash=""),Object(b.jsx)(I.a,{domain:"dev-semwqhjw.us.auth0.com",clientId:"96kzE3AqjHdAz8fzOJvTuENJO7AQj0wb",redirectUri:window.location.origin.includes("localhost")?window.location.origin:"https://asukii314.github.io/sn-suit-reference",children:Object(b.jsx)(_.a,{children:Object(b.jsx)("div",{className:"App",children:Object(b.jsxs)("header",{className:"App-header",children:[Object(b.jsx)(H,{}),Object(b.jsx)("img",{className:"hack",src:"./menu.png"}),Object(b.jsxs)(T.c,{children:[Object(b.jsx)(T.a,{exact:!0,path:"/",element:Object(b.jsx)(z,{})}),Object(b.jsx)(T.a,{path:":suitId",element:Object(b.jsx)(W,{})}),Object(b.jsx)(T.a,{path:"/credits",element:Object(b.jsx)(M,{})}),Object(b.jsx)(T.a,{path:"/contact",element:Object(b.jsx)(J,{})}),Object(b.jsx)(T.a,{path:"/wishlist/:userid",element:Object(b.jsx)(V,{})})]})]})})})})},G=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,86)).then((function(t){var i=t.getCLS,n=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;i(e),n(e),c(e),s(e),r(e)}))};r.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(Z,{})}),document.getElementById("root")),G()}},[[85,1,2]]]);
//# sourceMappingURL=main.62653332.chunk.js.map