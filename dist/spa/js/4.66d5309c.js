(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{1306:function(t,e,a){},"713b":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t._self._c;return e("q-layout",{attrs:{view:"hHh lpR fFf"}},[e("q-header",{attrs:{elevated:""}},[e("q-toolbar",[e("q-toolbar-title",[t._v("\n        Sand Delivery\n      ")]),t.loggedIn?e("q-btn",{staticClass:"absolute-right",attrs:{flat:"",label:"Logout"},on:{click:t.logoutUser}}):t._e()],1)],1),t.loggedIn?e("q-footer",[e("q-tabs",t._l(t.navs,(function(t){return e("q-route-tab",{key:t.label,attrs:{to:t.to,icon:t.icon,label:t.label}})})),1)],1):t._e(),t.loggedIn?e("q-drawer",{attrs:{breakpoint:767,width:250,"show-if-above":"",bordered:"","content-class":"bg-primary"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[e("q-list",{attrs:{dark:""}},[e("q-item-label",{attrs:{header:""}},[t._v("\n        Navigation\n      ")]),t._l(t.navs,(function(a){return e("q-item",{key:a.label,staticClass:"text-grey-4",attrs:{to:a.to,exact:"",clickable:""}},[e("q-item-section",{attrs:{avatar:""}},[e("q-icon",{attrs:{name:a.icon}})],1),e("q-item-section",[e("q-item-label",[t._v(t._s(a.label))])],1)],1)}))],2)],1):t._e(),e("q-page-container",[e("router-view")],1)],1)},n=[],l=a("2f62"),r={name:"MainLayout",data(){return{leftDrawerOpen:this.$q.platform.is.desktop,navs:[{label:"Delivery",icon:"front_loader",to:"/"},{label:"Settings",icon:"settings",to:"/settings"}]}},computed:{...Object(l["d"])("auth",["loggedIn"])},methods:{...Object(l["b"])("auth",["logoutUser"])}},i=r,s=(a("9f4a"),a("2877")),c=a("4d5a"),b=a("e359"),u=a("65c6"),d=a("6ac5"),f=a("9c40"),g=a("7ff0"),p=a("429b"),q=a("7867"),v=a("9404"),m=a("1c1c"),w=a("0170"),Q=a("66e5"),h=a("4074"),_=a("0016"),k=a("09e3"),y=a("eebe"),I=a.n(y),D=Object(s["a"])(i,o,n,!1,null,null,null);e["default"]=D.exports;I()(D,"components",{QLayout:c["a"],QHeader:b["a"],QToolbar:u["a"],QToolbarTitle:d["a"],QBtn:f["a"],QFooter:g["a"],QTabs:p["a"],QRouteTab:q["a"],QDrawer:v["a"],QList:m["a"],QItemLabel:w["a"],QItem:Q["a"],QItemSection:h["a"],QIcon:_["a"],QPageContainer:k["a"]})},"9f4a":function(t,e,a){"use strict";a("1306")}}]);