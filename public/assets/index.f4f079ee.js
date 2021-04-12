import{r as e,o as a,c as t,C as o,a as l,d as s,s as i,u as n,b as r,w as d,e as c,v as u,f as p,p as m,g as b,h as g,i as h,j as y,k as v,T as f,l as C,F as k,m as w,n as x,t as M,q as S,x as E,y as P,z as V,A,B as L,D as T,E as I,G as _,H as O,I as D,J as R,K as U,L as j,M as $,N,O as q,P as B,Q as H,R as F,S as Y,U as G}from"./vendor.6601a9f8.js";!function(e=".",a="__import__"){try{self[a]=new Function("u","return import(u)")}catch(t){const o=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[a]=e=>new Promise(((t,s)=>{const i=new URL(e,o);if(self[a].moduleMap[i])return t(self[a].moduleMap[i]);const n=new Blob([`import * as m from '${i}';`,`${a}.moduleMap['${i}']=m;`],{type:"text/javascript"}),r=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(n),onerror(){s(new Error(`Failed to import: ${e}`)),l(r)},onload(){t(self[a].moduleMap[i]),l(r)}});document.head.appendChild(r)})),self[a].moduleMap={}}}("/assets/");const z={name:"App"};z.render=function(o,l,s,i,n,r){const d=e("router-view");return a(),t(d)};const J=o.create({baseUrl:"http://taosback.test/"});J.interceptors.request.use((function(e){const a=JSON.parse(window.localStorage.getItem("token"));return e.headers={Authorization:`Bearer ${a}`},e}),(function(e){return Promise.reject(e)}));const W=s({components:{Toast:i},setup(){const e=n(),a=l({email:"",password:""}),t=(()=>{const e=l({data:null,loading:!0,error:!1,messageError:""});return{state:e,login:async(a,t)=>await J.post("https://taos.schoooldays.com.ar/api/login",{email:a,password:t}).then((a=>(e.data=a.data,e.error=!1,e.messageError="",a))).catch((a=>(e.error=!0,e.messageError=a.response.data.error,a.response)))}})();return{toast:e,form:a,iniciarSesion:async()=>{let o=await t.login(a.email,a.password);console.log(o),404==o.status&&e.add({severity:"error",summary:"Error",detail:t.state.messageError,life:3e3}),200==o.status&&(window.localStorage.setItem("token",JSON.stringify(t.state.data.access_token)),window.localStorage.setItem("user",JSON.stringify(t.state.data.user)),yt.push({name:"Dashboard.index"}))},LoginState:t}}}),Q=p("data-v-7cb8e1c1");m("data-v-7cb8e1c1");const K={class:"bg-auto bg-center bg-gray-600 min-h-screen",style:{"background-image":"url('/images/backgound-petroleo.jpg')"}},Z={class:"flex flex-col bg-black min-h-screen bg-opacity-40"},X={class:"m-auto"},ee=r("div",{class:"bg-white opacity-100 rounded p-2"},[r("img",{class:"object-contain max-h-48",src:"/images/logo-taos.png"})],-1),ae=r("div",null,[r("p",{class:"text-center text-white xl:text-8xl lg:text-6xl md:text-xl sm:text-base"}," Panel de Administracion Cloud "),r("p",{class:"text-center text-white xl:text-6xl lg:text-xl md:text-base sm:text-sm"}," Ciclo de Observacion de Seguridad ")],-1),te={class:"rounded m-auto w-full lg:w-3/6"},oe={class:"flex flex-col"},le=r("label",{class:"text-white text-xl"},"E-mail",-1),se={class:"flex flex-col mt-2"},ie=r("label",{class:"text-white text-xl"},"Contraseña",-1),ne={class:"flex flex-col mt-2"},re=r("div",{class:"m-auto"},[r("p",{class:"text-white text-center text-2xl"},"Powered By"),r("div",{class:"bg-white rounded p-2"},[r("img",{class:"object-contain max-h-48",src:"/images/logo-tecno.png"})])],-1);b();const de=Q(((o,l,s,i,n,p)=>{const m=e("Toast");return a(),t("div",K,[r("div",Z,[r("div",X,[ee,ae,r("div",te,[r("form",{onSubmit:l[4]||(l[4]=d((()=>{}),["prevent"])),class:"flex flex-col p-12 w-full"},[r("div",oe,[le,c(r("input",{type:"email",placeholder:"Email",class:"rounded text-black focus:border-black","onUpdate:modelValue":l[1]||(l[1]=e=>o.form.email=e)},null,512),[[u,o.form.email]])]),r("div",se,[ie,c(r("input",{type:"password",placeholder:"Contraseña",class:"rounded text-black focus:border-black","onUpdate:modelValue":l[2]||(l[2]=e=>o.form.password=e)},null,512),[[u,o.form.password]])]),r("div",ne,[r("button",{class:"p-2 transition duration-500 mt-2 ease-in-out bg-white rounded text-2xl hover:bg-red-600 transform hover:-translate-y-1 hover:scale-110",onClick:l[3]||(l[3]=(...e)=>o.iniciarSesion&&o.iniciarSesion(...e))}," Iniciar Sesión ")])],32)])]),re]),r(m)])}));W.render=de,W.__scopeId="data-v-7cb8e1c1";const ce={components:{InputText:g},methods:{onMenuToggle(e){this.$emit("menu-toggle",e)}}},ue={class:"layout-topbar"},pe=r("span",{class:"pi pi-bars"},null,-1),me={class:"layout-topbar-icons"},be={class:"layout-topbar-search"},ge=r("span",{class:"layout-topbar-search-icon pi pi-search"},null,-1),he=h('<button class="p-link"><span class="layout-topbar-item-text">Events</span><span class="layout-topbar-icon pi pi-calendar"></span><span class="layout-topbar-badge">5</span></button><button class="p-link"><span class="layout-topbar-item-text">Settings</span><span class="layout-topbar-icon pi pi-cog"></span></button><button class="p-link"><span class="layout-topbar-item-text">User</span><span class="layout-topbar-icon pi pi-user"></span></button>',3);ce.render=function(o,l,s,i,n,d){const c=e("InputText");return a(),t("div",ue,[r("button",{class:"p-link layout-menu-button",onClick:l[1]||(l[1]=(...e)=>d.onMenuToggle&&d.onMenuToggle(...e))},[pe]),r("div",me,[r("span",be,[r(c,{type:"text",placeholder:"Search"}),ge]),he])])};const ye={data:()=>({expanded:!1}),methods:{onClick(e){this.expanded=!this.expanded,e.preventDefault()},cerrarSesion(){window.localStorage.removeItem("token"),window.localStorage.removeItem("user"),yt.push({name:"Home"})}}},ve={class:"layout-profile"},fe=r("div",null,[r("img",{src:"/images/profile.png",alt:""})],-1),Ce=r("span",{class:"username"},"Claire Williams",-1),ke=r("i",{class:"pi pi-fw pi-cog"},null,-1),we=h('<li><button class="p-link"><i class="pi pi-fw pi-user"></i><span>Cuenta</span></button></li><li><button class="p-link"><i class="pi pi-fw pi-inbox"></i><span>Notificaciones</span><span class="menuitem-badge">2</span></button></li>',2),xe=r("i",{class:"pi pi-fw pi-power-off"},null,-1),Me=r("span",null,"Cerrar Sesión",-1);ye.render=function(e,o,l,s,i,n){return a(),t("div",ve,[fe,r("button",{class:"p-link layout-profile-link",onClick:o[1]||(o[1]=(...e)=>n.onClick&&n.onClick(...e))},[Ce,ke]),r(f,{name:"layout-submenu-wrapper"},{default:y((()=>[c(r("ul",null,[we,r("li",null,[r("button",{class:"p-link",onClick:o[2]||(o[2]=e=>n.cerrarSesion())},[xe,Me])])],512),[[v,i.expanded]])])),_:1})])};const Se={name:"appsubmenu",props:{items:Array,root:{type:Boolean,default:!1}},data:()=>({activeIndex:null}),methods:{onMenuItemClick(e,a,t){a.disabled?e.preventDefault():(a.to||a.url||e.preventDefault(),a.command&&a.command({originalEvent:e,item:a}),this.activeIndex=t===this.activeIndex?null:t,this.$emit("menuitem-click",{originalEvent:e,item:a}))},visible:e=>"function"==typeof e.visible?e.visible():!1!==e.visible}},Ee=p("data-v-bff04d80");m("data-v-bff04d80");const Pe={key:0},Ve={key:0,class:"arrow"},Ae={key:0,class:"pi pi-fw pi-angle-down menuitem-toggle-icon"},Le={key:1,class:"menuitem-badge"},Te={key:0,class:"pi pi-fw pi-angle-down menuitem-toggle-icon"},Ie={key:1,class:"menuitem-badge"};b();const _e=Ee(((o,l,s,i,n,d)=>{const u=e("router-link"),p=e("appsubmenu"),m=C("ripple");return s.items?(a(),t("ul",Pe,[(a(!0),t(k,null,w(s.items,((e,i)=>(a(),t(k,null,[d.visible(e)&&!e.separator?(a(),t("li",{key:i,class:[{"active-menuitem":n.activeIndex===i&&!e.to&&!e.disabled}],role:"none"},[e.items&&!0===s.root?(a(),t("div",Ve)):x("",!0),e.to?c((a(),t(u,{key:1,to:e.to,class:[e.class,"p-ripple",{"active-route":n.activeIndex===i,"p-disabled":e.disabled}],style:e.style,onClick:a=>d.onMenuItemClick(a,e,i),target:e.target,exact:"",role:"menuitem"},{default:Ee((()=>[r("i",{class:e.icon},null,2),r("span",null,M(e.label),1),e.items?(a(),t("i",Ae)):x("",!0),e.badge?(a(),t("span",Le,M(e.badge),1)):x("",!0)])),_:2},1032,["to","class","style","onClick","target"])),[[m]]):x("",!0),e.to?x("",!0):c((a(),t("a",{key:2,href:e.url||"#",style:e.style,class:[e.class,"p-ripple",{"p-disabled":e.disabled}],onClick:a=>d.onMenuItemClick(a,e,i),target:e.target,role:"menuitem"},[r("i",{class:e.icon},null,2),r("span",null,M(e.label),1),e.items?(a(),t("i",Te)):x("",!0),e.badge?(a(),t("span",Ie,M(e.badge),1)):x("",!0)],14,["href","onClick","target"])),[[m]]),r(f,{name:"layout-submenu-wrapper"},{default:Ee((()=>[c(r(p,{items:d.visible(e)&&e.items,onMenuitemClick:l[1]||(l[1]=e=>o.$emit("menuitem-click",e))},null,8,["items"]),[[v,n.activeIndex===i]])])),_:2},1024)],2)):x("",!0),d.visible(e)&&e.separator?(a(),t("li",{class:"p-menu-separator",style:e.style,key:"separator"+i,role:"separator"},null,4)):x("",!0)],64)))),256))])):x("",!0)}));Se.render=_e,Se.__scopeId="data-v-bff04d80";const Oe={props:{model:Array},methods:{onMenuItemClick(e){this.$emit("menuitem-click",e)}},components:{AppSubmenu:Se}},De={class:"layout-menu-container"};Oe.render=function(o,l,s,i,n,d){const c=e("app-submenu");return a(),t("div",De,[r(c,{items:s.model,class:"layout-menu",root:!0,onMenuitemClick:d.onMenuItemClick},null,8,["items","onMenuitemClick"])])};const Re={props:{layoutMode:{type:String,default:null},layoutColorMode:{type:String,default:null}},data(){return{active:!1,d_layoutMode:this.layoutMode,d_layoutColorMode:this.layoutColorMode}},watch:{$route(){this.active&&(this.active=!1,this.unbindOutsideClickListener())},layoutMode(e){this.d_layoutMode=e},layoutColorMode(e){this.d_layoutColorMode=e}},outsideClickListener:null,methods:{toggleConfigurator(e){this.active=!this.active,e.preventDefault(),this.active?this.bindOutsideClickListener():this.unbindOutsideClickListener()},hideConfigurator(e){this.active=!1,this.unbindOutsideClickListener(),e.preventDefault()},changeInputStyle(e){this.$appState.inputStyle=e},changeRipple(e){this.$primevue.ripple=e},changeLayout(e,a){this.$emit("layout-change",a),e.preventDefault()},changeLayoutColor(e,a){this.$emit("layout-color-change",a),e.preventDefault()},bindOutsideClickListener(){this.outsideClickListener||(this.outsideClickListener=e=>{this.active&&this.isOutsideClicked(e)&&(this.active=!1)},document.addEventListener("click",this.outsideClickListener))},unbindOutsideClickListener(){this.outsideClickListener&&(document.removeEventListener("click",this.outsideClickListener),this.outsideClickListener=null)},isOutsideClicked(e){return!(this.$el.isSameNode(e.target)||this.$el.contains(e.target))}},computed:{containerClass(){return["layout-config",{"layout-config-active":this.active}]},rippleActive(){return this.$primevue.ripple},inputStyle(){return this.$appState.inputStyle}}},Ue=r("i",{class:"pi pi-cog"},null,-1),je=r("i",{class:"pi pi-times"},null,-1),$e={class:"layout-config-content"},Ne=r("h5",{style:{"margin-top":"0"}},"Input Style",-1),qe={class:"p-formgroup-inline"},Be={class:"p-field-radiobutton"},He=r("label",{for:"input_outlined"},"Outlined",-1),Fe={class:"p-field-radiobutton"},Ye=r("label",{for:"input_filled"},"Filled",-1),Ge=r("h5",null,"Ripple Effect",-1),ze=r("h5",null,"Menu Type",-1),Je={class:"p-formgroup-inline"},We={class:"p-field-radiobutton"},Qe=r("label",{for:"static"},"Static",-1),Ke={class:"p-field-radiobutton"},Ze=r("label",{for:"overlay"},"Overlay",-1),Xe=r("h5",null,"Menu Color",-1),ea={class:"p-formgroup-inline"},aa={class:"p-field-radiobutton"},ta=r("label",{for:"dark"},"Dark",-1),oa={class:"p-field-radiobutton"},la=r("label",{for:"light"},"Light",-1);Re.render=function(o,l,s,i,n,d){const c=e("RadioButton"),u=e("InputSwitch");return a(),t("div",{id:"layout-config",class:d.containerClass},[r("a",{href:"#",class:"layout-config-button",id:"layout-config-button",onClick:l[1]||(l[1]=(...e)=>d.toggleConfigurator&&d.toggleConfigurator(...e))},[Ue]),r("a",{href:"#",class:"layout-config-close",onClick:l[2]||(l[2]=(...e)=>d.hideConfigurator&&d.hideConfigurator(...e))},[je]),r("div",$e,[Ne,r("div",qe,[r("div",Be,[r(c,{id:"input_outlined",name:"inputstyle",value:"outlined",modelValue:d.inputStyle,"onUpdate:modelValue":d.changeInputStyle},null,8,["modelValue","onUpdate:modelValue"]),He]),r("div",Fe,[r(c,{id:"input_filled",name:"inputstyle",value:"filled",modelValue:d.inputStyle,"onUpdate:modelValue":d.changeInputStyle},null,8,["modelValue","onUpdate:modelValue"]),Ye])]),Ge,r(u,{modelValue:d.rippleActive,"onUpdate:modelValue":d.changeRipple},null,8,["modelValue","onUpdate:modelValue"]),ze,r("div",Je,[r("div",We,[r(c,{id:"static",name:"layoutMode",value:"static",modelValue:n.d_layoutMode,"onUpdate:modelValue":l[3]||(l[3]=e=>n.d_layoutMode=e),onChange:l[4]||(l[4]=e=>d.changeLayout(e,"static"))},null,8,["modelValue"]),Qe]),r("div",Ke,[r(c,{id:"overlay",name:"layoutMode",value:"overlay",modelValue:n.d_layoutMode,"onUpdate:modelValue":l[5]||(l[5]=e=>n.d_layoutMode=e),onChange:l[6]||(l[6]=e=>d.changeLayout(e,"overlay"))},null,8,["modelValue"]),Ze])]),Xe,r("div",ea,[r("div",aa,[r(c,{id:"dark",name:"layoutColorMode",value:"dark",modelValue:n.d_layoutColorMode,"onUpdate:modelValue":l[7]||(l[7]=e=>n.d_layoutColorMode=e),onChange:l[8]||(l[8]=e=>d.changeLayoutColor(e,"dark"))},null,8,["modelValue"]),ta]),r("div",oa,[r(c,{id:"light",name:"layoutColorMode",value:"light",modelValue:n.d_layoutColorMode,"onUpdate:modelValue":l[9]||(l[9]=e=>n.d_layoutColorMode=e),onChange:l[10]||(l[10]=e=>d.changeLayoutColor(e,"light"))},null,8,["modelValue"]),la])])])],2)};const sa={name:"AppFooter"},ia={class:"layout-footer"},na=r("span",{class:"footer-text",style:{"margin-right":"5px"}},"Powered by",-1),ra=r("img",{src:"/images/logo.svg",alt:"sigma",width:"80"},null,-1),da={class:"footer-text",style:{"margin-left":"5px"}};sa.render=function(e,o,l,s,i,n){return a(),t("div",ia,[na,ra,r("span",da,M((new Date).getFullYear()),1)])};const ca={data:()=>({layoutMode:"static",layoutColorMode:"dark",staticMenuInactive:!1,overlayMenuActive:!1,mobileMenuActive:!1,menu:[{label:"Dashboard",icon:"pi pi-fw pi-home",to:"/"},{label:"Tarjetas",icon:"pi pi-fw pi-sitemap",items:[{label:"Agregar",icon:"pi pi-fw pi-id-card",to:"/dashboard/Tarjetas/Agregar"},{label:"Gestionar",icon:"pi pi-fw pi-check-square",to:"/dashboard/Tarjetas/Gestionar"},{label:"Listado",icon:"pi pi-fw pi-bookmark",to:"/dashboard/Tarjetas"}]},{label:"Usuarios",icon:"pi pi-fw pi-globe",items:[{label:"Listar",icon:"pi pi-fw pi-desktop",to:"/display"}]},{label:"Perfiles",icon:"pi pi-fw pi-clone",items:[{label:"Listar",icon:"pi pi-fw pi-user-edit",to:"/crud"}]},{label:"Locaciones",icon:"pi pi-fw pi-search",items:[{label:"Listar",icon:"pi pi-fw pi-bookmark",items:[{label:"Submenu 1.1",icon:"pi pi-fw pi-bookmark",items:[{label:"Submenu 1.1.1",icon:"pi pi-fw pi-bookmark"},{label:"Submenu 1.1.2",icon:"pi pi-fw pi-bookmark"},{label:"Submenu 1.1.3",icon:"pi pi-fw pi-bookmark"}]}]}]},{label:"Documentation",icon:"pi pi-fw pi-question",command:()=>{window.location="#/documentation"}}]}),watch:{$route(){this.menuActive=!1,this.$toast.removeAllGroups()}},methods:{onWrapperClick(){this.menuClick||(this.overlayMenuActive=!1,this.mobileMenuActive=!1),this.menuClick=!1},onMenuToggle(){this.menuClick=!0,this.isDesktop()?"overlay"===this.layoutMode?(!0===this.mobileMenuActive&&(this.overlayMenuActive=!0),this.overlayMenuActive=!this.overlayMenuActive,this.mobileMenuActive=!1):"static"===this.layoutMode&&(this.staticMenuInactive=!this.staticMenuInactive):this.mobileMenuActive=!this.mobileMenuActive,event.preventDefault()},onSidebarClick(){this.menuClick=!0},onMenuItemClick(e){e.item&&!e.item.items&&(this.overlayMenuActive=!1,this.mobileMenuActive=!1)},onLayoutChange(e){this.layoutMode=e},onLayoutColorChange(e){this.layoutColorMode=e},addClass(e,a){e.classList?e.classList.add(a):e.className+=" "+a},removeClass(e,a){e.classList?e.classList.remove(a):e.className=e.className.replace(new RegExp("(^|\\b)"+a.split(" ").join("|")+"(\\b|$)","gi")," ")},isDesktop:()=>window.innerWidth>1024,isSidebarVisible(){return!this.isDesktop()||("static"===this.layoutMode?!this.staticMenuInactive:"overlay"!==this.layoutMode||this.overlayMenuActive)}},computed:{containerClass(){return["layout-wrapper",{"layout-overlay":"overlay"===this.layoutMode,"layout-static":"static"===this.layoutMode,"layout-static-sidebar-inactive":this.staticMenuInactive&&"static"===this.layoutMode,"layout-overlay-sidebar-active":this.overlayMenuActive&&"overlay"===this.layoutMode,"layout-mobile-sidebar-active":this.mobileMenuActive,"p-input-filled":"filled"===this.$appState.inputStyle,"p-ripple-disabled":!1===this.$primevue.ripple}]},sidebarClass(){return["layout-sidebar",{"layout-sidebar-dark":"dark"===this.layoutColorMode,"layout-sidebar-light":"light"===this.layoutColorMode}]},logo(){return"dark"===this.layoutColorMode?"/images/logo-white.svg":"/images/logo.svg"}},beforeUpdate(){this.mobileMenuActive?this.addClass(document.body,"body-overflow-hidden"):this.removeClass(document.body,"body-overflow-hidden")},components:{AppTopBar:ce,AppProfile:ye,AppMenu:Oe,AppConfig:Re,AppFooter:sa}},ua=p("data-v-efe13970");m("data-v-efe13970");const pa={class:"layout-logo"},ma={class:"layout-main"};b();const ba=ua(((o,l,s,i,n,d)=>{const u=e("AppTopBar"),p=e("router-link"),m=e("AppProfile"),b=e("AppMenu"),g=e("router-view"),h=e("Toast"),y=e("AppFooter");return a(),t("div",{class:d.containerClass,onClick:l[2]||(l[2]=(...e)=>d.onWrapperClick&&d.onWrapperClick(...e))},[r(u,{onMenuToggle:d.onMenuToggle},null,8,["onMenuToggle"]),r(f,{name:"layout-sidebar"},{default:ua((()=>[c(r("div",{class:d.sidebarClass,onClick:l[1]||(l[1]=(...e)=>d.onSidebarClick&&d.onSidebarClick(...e))},[r("div",pa,[r(p,{to:"/"},{default:ua((()=>[r("img",{alt:"Logo",src:d.logo},null,8,["src"])])),_:1})]),r(m),r(b,{model:n.menu,onMenuitemClick:d.onMenuItemClick},null,8,["model","onMenuitemClick"])],2),[[v,d.isSidebarVisible()]])])),_:1}),r("div",ma,[r(g),r(h)]),r(y)],2)}));ca.render=ba,ca.__scopeId="data-v-efe13970";const ga={props:{title:{type:String,require:!0},detail:{type:String,require:!0},count:{type:String,require:!0}}},ha={class:"p-col-12 p-lg-4"},ya={class:"card summary"},va={class:"title"},fa={class:"detail"},Ca={class:"count visitors"};ga.render=function(e,o,l,s,i,n){return a(),t("div",ha,[r("div",ya,[r("span",va,M(l.title),1),r("span",fa,M(l.detail),1),r("span",Ca,M(l.count),1)])])};const ka={components:{CounterStats:ga,Vue3ChartJs:S},setup(){const e=E(null),a=E(null),t=E(null),o=E(null),s=E(null),i=E(null),n=E(null),{ObtenerEstaditica:r,ObtenerEstaditica2:d,state:c}=function(){let e=l({numeroTarjetas:0,numeroUsuarios:0,data:[]});const a="https://taos.schoooldays.com.ar/";return{ObtenerEstaditica:async(t=null,o=null)=>{await J.get(`${a}api/estadistica`).then((a=>{e.numeroTarjetas=a.data.CardTotal,e.numeroUsuarios=a.data.UsersTotal})).catch((e=>{console.log(e)}))},ObtenerEstaditica2:async(e=null,t=null)=>await J.get(`${a}api/StaticsData`).then((e=>e.data)).catch((e=>{console.log(e)})),state:e}}();let u=l({id:"doughnut",type:"doughnut",data:{labels:[],datasets:[{backgroundColor:["#4663e8","#667dec","#8497f0","#a9b7f5","#bac5f8"],data:[]}]}}),p=l({id:"horizontalBar",type:"horizontalBar",data:{labels:[],datasets:[{backgroundColor:["#4663e8","#667dec","#8497f0","#a9b7f5","#bac5f8"],data:[],label:""}]},options:{title:{display:!0,text:"Estadistica por categorias"},plugins:{labels:{render:"percentage",fontSize:20}}}}),m=l({id:"bar",type:"bar",data:{labels:[],datasets:[{backgroundColor:["#4663e8","#667dec","#8497f0","#a9b7f5","#bac5f8"],data:[],label:""}]},options:{title:{display:!0,text:"Reacciones de Personas"}}}),b=l({id:"barEpp",type:"bar",data:{labels:[],datasets:[{backgroundColor:["#4663e8","#667dec","#8497f0","#a9b7f5","#bac5f8"],data:[],label:""}]},options:{title:{display:!0,text:"EQUIPO DE PROTECCION PERSONAL"}}}),g=l({id:"barEpp",type:"bar",data:{labels:[],datasets:[{backgroundColor:["#4663e8","#667dec","#8497f0","#a9b7f5","#bac5f8"],data:[],label:""}]},options:{title:{display:!0,text:"HERRAMIENTAS Y EQUIPO"}}}),h=l({id:"barEpp",type:"bar",data:{labels:[],datasets:[{backgroundColor:["#4663e8","#667dec","#8497f0","#a9b7f5","#bac5f8"],data:[],label:""}]},options:{title:{display:!0,text:"PROCEDIMIENTOS, ORDEN Y LIMPIEZA"}}}),y=l({id:"barEpp",type:"bar",data:{labels:[],datasets:[{backgroundColor:["#4663e8","#667dec","#8497f0","#a9b7f5","#bac5f8"],data:[],label:""}]},options:{title:{display:!0,text:"POSICIONES DE LAS PERSONAS"}}});return P((async()=>{await r()})),V((async()=>{let l=await d();u.data.labels=l.dataCategorias.labels,u.data.datasets[0].data=l.dataCategorias.value,p.data.labels=l.dataCategorias.labels,p.data.datasets[0].data=l.dataCategorias.value,m.data.labels=l.dataReaccionesDePersonas.labels,m.data.datasets[0].data=l.dataReaccionesDePersonas.value,b.data.labels=l.dataEpp.labels,b.data.datasets[0].data=l.dataEpp.value,g.data.labels=l.dataHerryEquip.labels,g.data.datasets[0].data=l.dataHerryEquip.value,h.data.labels=l.dataPOL.labels,h.data.datasets[0].data=l.dataPOL.value,y.data.labels=l.dataPP.labels,y.data.datasets[0].data=l.dataPP.value,e.value.update(),a.value.update(),t.value.update(),o.value.update(),s.value.update(),i.value.update(),n.value.update()})),{state:c,dataCategoria:u,dataCategoria2:p,dataReaccionesDePersonas:m,dataEpp:b,chartRef:e,chartRef2:a,chartRefReaccionDePersonas:t,chartRefPOL:i,options:{title:{display:!0,text:"Estadistica por categorias"},plugins:{labels:{render:"percentage"}}},chartRefEpp:o,chartRefHerryEquip:s,dataHYE:g,dataPOL:h,dataPP:y,chartRefPP:n}}},wa={class:"p-grid p-fluid dashboard"},xa=A(" - "),Ma={class:"p-col-12 p-lg-6"},Sa={class:"p-col-12 p-lg-6"},Ea={class:"p-col-12 p-lg-6"},Pa={class:"p-col-12 p-lg-6"},Va={class:"p-col-12 p-lg-6"},Aa={class:"p-col-12 p-lg-6"},La={class:"p-col-12 p-lg-6"};function Ta(){let e=l({categorias:[]});const a="https://taos.schoooldays.com.ar/";return{ObtenerCategorias:async(t=null,o=null)=>{await J.get(`${a}api/categories`).then((a=>{e.categorias=a.data})).catch((e=>{console.log(e)}))},guardarTarjeta:async e=>await J.post(`${a}api/card`,{data:e}).then((e=>e)).catch((e=>e)),listadoTarjetas:async()=>await J.get(`${a}api/card`).then((e=>e.data)).catch((e=>{console.log(error)})),state:e}}ka.render=function(o,l,s,i,n,d){const c=e("counter-stats"),u=e("vue3-chart-js");return a(),t("div",wa,[r(c,{title:"Cantidad de tarjetas",detail:"Numero total de tarjetas realizadas.",count:i.state.numeroTarjetas},null,8,["count"]),r(c,{title:"Cantidad de usuarios",detail:"Numero total de usuarios registrados",count:i.state.numeroUsuarios},null,8,["count"]),xa,r("div",Ma,[r(u,{ref:"chartRef",id:i.dataCategoria.id,type:i.dataCategoria.type,data:i.dataCategoria.data,options:i.options},null,8,["id","type","data","options"])]),r("div",Sa,[r(u,{ref:"chartRef2",id:i.dataCategoria2.id,type:i.dataCategoria2.type,data:i.dataCategoria2.data,options:i.options},null,8,["id","type","data","options"])]),r("div",Ea,[r(u,{ref:"chartRefReaccionDePersonas",id:i.dataReaccionesDePersonas.id,type:i.dataReaccionesDePersonas.type,data:i.dataReaccionesDePersonas.data,options:i.dataReaccionesDePersonas.options},null,8,["id","type","data","options"])]),r("div",Pa,[r(u,{ref:"chartRefEpp",id:i.dataEpp.id,type:i.dataEpp.type,data:i.dataEpp.data,options:i.dataEpp.options},null,8,["id","type","data","options"])]),r("div",Va,[r(u,{ref:"chartRefHerryEquip",id:i.dataHYE.id,type:i.dataHYE.type,data:i.dataHYE.data,options:i.dataHYE.options},null,8,["id","type","data","options"])]),r("div",Aa,[r(u,{ref:"chartRefPOL",id:i.dataPOL.id,type:i.dataPOL.type,data:i.dataPOL.data,options:i.dataPOL.options},null,8,["id","type","data","options"])]),r("div",La,[r(u,{ref:"chartRefPP",id:i.dataPP.id,type:i.dataPP.type,data:i.dataPP.data,options:i.dataPP.options},null,8,["id","type","data","options"])])])};const Ia={components:{InputText:g,Divider:L,Chips:T,Dropdown:I,Checkbox:_,Button:O,Toolbar:D,ProgressSpinner:R},setup(){const{ObtenerCategorias:e,state:a}=Ta(),t=E(["checkbox","date","email","file","month","number","radio","tel","text","time"]);let o=E(!0);return P((async()=>{o.value=!0,await e(),o.value=!1})),{state:a,tipoCampos:t,loading:o}}},_a={key:0},Oa=A(" Cargando... "),Da={key:1,class:"p-grid p-jc-center p-ai-center vertical-container"},Ra={class:"p-col-12 p-lg-10"},Ua={class:"p-col-12 headerCategorias p-text-center"},ja=r("i",{class:"pi pi-plus-circle p-ml-2"},null,-1),$a={class:"borderItems"},Na={class:"p-col-12 p-md-3"},qa=r("span",{class:"p-ml-1"},"Nombre",-1),Ba=r("br",null,null,-1),Ha={class:"p-col-12 p-md-2"},Fa=r("span",{class:"p-ml-1"},"Tipo campo",-1),Ya=r("br",null,null,-1),Ga={key:0,class:"p-col-12 p-md-2"},za=r("span",{class:"p-ml-1"},"Valores posibles",-1),Ja=r("br",null,null,-1),Wa={class:"p-col-12 p-md-1"},Qa=r("span",{class:"p-ml-1"},"Es requerido",-1),Ka=r("br",null,null,-1),Za={class:"p-col-12 p-md-2"},Xa=r("div",{class:"p-col-12"},[r("hr")],-1);Ia.render=function(o,l,s,i,n,d){const c=e("ProgressSpinner"),u=e("Button"),p=e("Toolbar"),m=e("InputText"),b=e("Dropdown"),g=e("Chips"),h=e("Checkbox");return i.loading?(a(),t("div",_a,[Oa,r(c)])):(a(),t("div",Da,[r("div",Ra,[r(p,null,{left:y((()=>[r(u,{label:"Guardar",icon:"pi pi-check",class:"p-mr-2"})])),right:y((()=>[r(u,{label:"Agregar grupo",icon:"pi pi-plus",class:"p-mr-2 p-button-outlined"})])),_:1}),(a(!0),t(k,null,w(i.state.categorias,(e=>(a(),t("div",{class:"card",key:e.id},[r("div",Ua,[r("span",null,M(e.name),1),ja]),r("div",$a,[(a(!0),t(k,null,w(e.items,(e=>(a(),t("div",{class:"p-grid p-ai-center vertical-container p-px-2",key:e.id},[r("div",Na,[qa,Ba,r(m,{style:{width:"100%"},type:"text",modelValue:e.descripcion,"onUpdate:modelValue":a=>e.descripcion=a},null,8,["modelValue","onUpdate:modelValue"])]),r("div",Ha,[Fa,Ya,r(b,{style:{width:"100%"},modelValue:e.tipo_campo,"onUpdate:modelValue":a=>e.tipo_campo=a,options:i.tipoCampos,placeholder:"Seleccionar tipo de campo"},null,8,["modelValue","onUpdate:modelValue","options"])]),"checkbox"==e.tipo_campo||"radio"==e.tipo_campo?(a(),t("div",Ga,[za,Ja,r(g,{style:{width:"100%"},modelValue:e.valores_posibles,"onUpdate:modelValue":a=>e.valores_posibles=a},null,8,["modelValue","onUpdate:modelValue"])])):x("",!0),r("div",Wa,[Qa,Ka,r(h,{modelValue:e.es_requerido,"onUpdate:modelValue":a=>e.es_requerido=a,binary:!0},null,8,["modelValue","onUpdate:modelValue"])]),r("div",Za,[r(u,{label:"Eliminar",class:"p-button-outlined p-button-danger"})]),Xa])))),128))])])))),128))])]))};const et=s({components:{Checkbox:_,Textarea:U,Dropdown:I,Button:O,Toast:i},setup(){let e=E(!0);const{ObtenerCategorias:a,guardarTarjeta:t,state:o}=Ta(),l=n();P((async()=>{e.value=!0,await a(),e.value=!1}));return{state:o,loading:e,guardarTarjeta:t,enviarTarjeta:async()=>{let e=!1;o.categorias.forEach((a=>{a.items.forEach((a=>{1==a.es_requerido&&(a.hasOwnProperty("model")||(e=!0))}))})),e?l.add({severity:"error",summary:"Error de validación",detail:"Debe completar todos los campos requeridos.",life:3e3}):200==(await t(o)).status&&l.add({severity:"success",summary:"Tarjeta creada.",detail:"La tarjeta se ha creado correctamente",life:3e3})}}}}),at={class:"p-grid"},tt={class:"p-text-bold"},ot=r("hr",{class:"hr1"},null,-1),lt={key:0},st={key:0,class:"requerido"},it={key:1},nt={key:0,class:"requerido"},rt={key:2},dt={key:0,class:"requerido"},ct=r("br",null,null,-1),ut=r("div",{class:"p-col-12"},[r("span",{class:"requerido"},"*"),A("Campo requerido")],-1),pt={class:"p-col-12"};et.render=function(o,l,s,i,n,d){const c=e("Checkbox"),u=e("Textarea"),p=e("Dropdown"),m=e("Button"),b=e("Toast");return a(),t("div",at,[(a(!0),t(k,null,w(o.state.categorias,(e=>(a(),t("div",{class:"p-col-12 p-lg-5 p-m-1 categoria",key:e.id},[r("div",tt,M(e.name),1),ot,(a(!0),t(k,null,w(e.items,(e=>(a(),t("div",{class:"item p-mt-1",key:e.id},["checkbox"==e.tipo_campo?(a(),t("div",lt,[r(c,{class:"p-mr-1",modelValue:e.model,"onUpdate:modelValue":a=>e.model=a,binary:!0},null,8,["modelValue","onUpdate:modelValue"]),e.es_requerido?(a(),t("span",st,"*")):x("",!0),A(M(e.descripcion),1)])):x("",!0),"textarea"==e.tipo_campo?(a(),t("div",it,[e.es_requerido?(a(),t("span",nt,"*")):x("",!0),A(M(e.descripcion)+" ",1),r(u,{modelValue:e.model,"onUpdate:modelValue":a=>e.model=a,rows:"5",cols:"30"},null,8,["modelValue","onUpdate:modelValue"])])):x("",!0),"select"==e.tipo_campo?(a(),t("div",rt,[e.es_requerido?(a(),t("span",dt,"*")):x("",!0),A(M(e.descripcion)+" ",1),ct,r(p,{style:{width:"100%"},modelValue:e.model,"onUpdate:modelValue":a=>e.model=a,options:e.valores_posibles,placeholder:"Seleccionar"},null,8,["modelValue","onUpdate:modelValue","options"])])):x("",!0)])))),128))])))),128)),ut,r("div",pt,[r(m,{label:"Agregar Tarjeta",onClick:o.enviarTarjeta,class:"p-button-outlined"},null,8,["onClick"])]),r(b)])};const mt={components:{Column:j,DataTable:$,ProgressSpinner:R},setup(){const{listadoTarjetas:e}=Ta(),a=E([]);let t=E(!0);return P((async()=>{t.value=!0;let o=await e();a.value=o,t.value=!1})),{tarjetas:a,loading:t}}},bt={key:0},gt=A(" Cargando... ");mt.render=function(o,l,s,i,n,d){const c=e("ProgressSpinner"),u=e("Column"),p=e("DataTable");return i.loading?(a(),t("div",bt,[gt,r(c)])):(a(),t(p,{key:1,value:i.tarjetas},{default:y((()=>[r(u,{field:"created_at",header:"FECHA"}),r(u,{field:"id",header:"NUMERO"}),r(u,{field:"user.country.name",header:"PAÍS"}),r(u,{field:"user.state.name",header:"PROVINCIA"}),r(u,{field:"user.city.name",header:"CIUDAD"}),r(u,{field:"user.fullName",header:"CREADO POR"})])),_:1},8,["value"]))};const ht=[{path:"/",name:"Home",component:W},{path:"/dashboard",name:"Dashboard",component:ca,children:[{path:"/dashboard",name:"Dashboard.index",component:ka},{path:"/dashboard/Tarjetas",name:"Dashboard.Tarjetas",component:mt},{path:"/dashboard/Tarjetas/Gestionar",name:"Dashboard.Tarjetas.Gestionar",component:Ia},{path:"/dashboard/Tarjetas/Agregar",name:"Dashboard.Tarjetas.Agregar",component:et}]}],yt=N({history:q(),routes:ht}),vt={beforeMount(e,a){a.modifiers.script?e.className="language-javascript":a.modifiers.css?e.className="language-css":e.className="language-markup",B.highlightElement(e.children[0])}};const ft=H(z);ft.config.globalProperties.$appState=l({inputStyle:"outlined"}),ft.config.globalProperties.$primevue=l({ripple:!0}),ft.directive("tooltip",F),ft.directive("ripple",Y),ft.directive("code",vt),ft.use(yt).use(G).mount("#app");