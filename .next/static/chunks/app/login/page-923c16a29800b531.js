(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{5682:(e,r,s)=>{Promise.resolve().then(s.bind(s,8260))},8030:(e,r,s)=>{"use strict";s.d(r,{Z:()=>o});var t=s(2265);let a=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),n=function(){for(var e=arguments.length,r=Array(e),s=0;s<e;s++)r[s]=arguments[s];return r.filter((e,r,s)=>!!e&&""!==e.trim()&&s.indexOf(e)===r).join(" ").trim()};var l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,t.forwardRef)((e,r)=>{let{color:s="currentColor",size:a=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:d="",children:c,iconNode:m,...u}=e;return(0,t.createElement)("svg",{ref:r,...l,width:a,height:a,stroke:s,strokeWidth:o?24*Number(i)/Number(a):i,className:n("lucide",d),...u},[...m.map(e=>{let[r,s]=e;return(0,t.createElement)(r,s)}),...Array.isArray(c)?c:[c]])}),o=(e,r)=>{let s=(0,t.forwardRef)((s,l)=>{let{className:o,...d}=s;return(0,t.createElement)(i,{ref:l,iconNode:r,className:n("lucide-".concat(a(e)),o),...d})});return s.displayName="".concat(e),s}},8260:(e,r,s)=>{"use strict";s.d(r,{default:()=>g});var t=s(7437),a=s(2265),n=s(9343),l=s(1014),i=s(9772),o=s(9733),d=s(7209),c=s(7114),m=s(8185),u=s(8030);let f=(0,u.Z)("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]),x=(0,u.Z)("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]),h=i.Ry({email:i.Z_().email({message:"Please enter a valid email address."}),password:i.Z_().min(8,{message:"Password must be at least 8 characters."})}),p=h.extend({name:i.Z_().min(2,{message:"Name must be at least 2 characters."}),confirmPassword:i.Z_().min(8,{message:"Password must be at least 8 characters."})}).refine(e=>e.password===e.confirmPassword,{message:"Passwords don't match",path:["confirmPassword"]});function g(){let[e,r]=(0,a.useState)(!1),[s,i]=(0,a.useState)(!0),[u,g]=(0,a.useState)(!1),[j,v]=(0,a.useState)(!1),[w,y]=(0,a.useState)(null);(0,a.useEffect)(()=>{r(!0)},[]);let N=(0,n.cI)({resolver:(0,l.F)(h),defaultValues:{email:"",password:""}}),b=(0,n.cI)({resolver:(0,l.F)(p),defaultValues:{name:"",email:"",password:"",confirmPassword:""}});async function k(){g(!0),y(null),await new Promise(e=>setTimeout(e,2e3)),g(!1),y(s?"Invalid email or password. Please try again.":"Registration failed. Please try again.")}return e?(0,t.jsx)("div",{className:"container mx-auto px-4 py-8 flex justify-center items-center min-h-screen",children:(0,t.jsxs)(m.Zb,{className:"w-full max-w-md",children:[(0,t.jsx)(m.Ol,{children:(0,t.jsxs)("div",{className:"flex rounded-md bg-muted p-1",children:[(0,t.jsx)(o.z,{variant:s?"secondary":"ghost",className:"flex-1 rounded-sm",onClick:()=>i(!0),children:"Login"}),(0,t.jsx)(o.z,{variant:s?"ghost":"secondary",className:"flex-1 rounded-sm",onClick:()=>i(!1),children:"Register"})]})}),(0,t.jsx)(m.aY,{children:s?(0,t.jsx)(c.l0,{...N,children:(0,t.jsxs)("form",{onSubmit:N.handleSubmit(k),className:"space-y-4",children:[(0,t.jsx)(c.Wi,{control:N.control,name:"email",render:e=>{let{field:r}=e;return(0,t.jsxs)(c.xJ,{children:[(0,t.jsx)(c.lX,{children:"Email"}),(0,t.jsx)(c.NI,{children:(0,t.jsx)(d.I,{placeholder:"your@email.com",...r})}),(0,t.jsx)(c.zG,{})]})}}),(0,t.jsx)(c.Wi,{control:N.control,name:"password",render:e=>{let{field:r}=e;return(0,t.jsxs)(c.xJ,{children:[(0,t.jsx)(c.lX,{children:"Password"}),(0,t.jsx)(c.NI,{children:(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(d.I,{type:j?"text":"password",placeholder:"Enter your password",...r}),(0,t.jsxs)(o.z,{type:"button",variant:"ghost",size:"icon",className:"absolute right-2 top-1/2 -translate-y-1/2",onClick:()=>v(!j),children:[j?(0,t.jsx)(f,{className:"h-4 w-4"}):(0,t.jsx)(x,{className:"h-4 w-4"}),(0,t.jsx)("span",{className:"sr-only",children:j?"Hide password":"Show password"})]})]})}),(0,t.jsx)(c.zG,{})]})}}),w&&(0,t.jsx)("div",{className:"text-red-500 text-sm",children:w}),(0,t.jsx)(o.z,{type:"submit",className:"w-full",disabled:u,children:u?"Logging in...":"Log in"})]})}):(0,t.jsx)(c.l0,{...b,children:(0,t.jsxs)("form",{onSubmit:b.handleSubmit(k),className:"space-y-4",children:[(0,t.jsx)(c.Wi,{control:b.control,name:"name",render:e=>{let{field:r}=e;return(0,t.jsxs)(c.xJ,{children:[(0,t.jsx)(c.lX,{children:"Name"}),(0,t.jsx)(c.NI,{children:(0,t.jsx)(d.I,{placeholder:"Your name",...r})}),(0,t.jsx)(c.zG,{})]})}}),(0,t.jsx)(c.Wi,{control:b.control,name:"email",render:e=>{let{field:r}=e;return(0,t.jsxs)(c.xJ,{children:[(0,t.jsx)(c.lX,{children:"Email"}),(0,t.jsx)(c.NI,{children:(0,t.jsx)(d.I,{placeholder:"your@email.com",...r})}),(0,t.jsx)(c.zG,{})]})}}),(0,t.jsx)(c.Wi,{control:b.control,name:"password",render:e=>{let{field:r}=e;return(0,t.jsxs)(c.xJ,{children:[(0,t.jsx)(c.lX,{children:"Password"}),(0,t.jsx)(c.NI,{children:(0,t.jsxs)("div",{className:"relative",children:[(0,t.jsx)(d.I,{type:j?"text":"password",placeholder:"Enter your password",...r}),(0,t.jsxs)(o.z,{type:"button",variant:"ghost",size:"icon",className:"absolute right-2 top-1/2 -translate-y-1/2",onClick:()=>v(!j),children:[j?(0,t.jsx)(f,{className:"h-4 w-4"}):(0,t.jsx)(x,{className:"h-4 w-4"}),(0,t.jsx)("span",{className:"sr-only",children:j?"Hide password":"Show password"})]})]})}),(0,t.jsx)(c.zG,{})]})}}),(0,t.jsx)(c.Wi,{control:b.control,name:"confirmPassword",render:e=>{let{field:r}=e;return(0,t.jsxs)(c.xJ,{children:[(0,t.jsx)(c.lX,{children:"Confirm Password"}),(0,t.jsx)(c.NI,{children:(0,t.jsx)(d.I,{type:"password",placeholder:"Confirm your password",...r})}),(0,t.jsx)(c.zG,{})]})}}),w&&(0,t.jsx)("div",{className:"text-red-500 text-sm",children:w}),(0,t.jsx)(o.z,{type:"submit",className:"w-full",disabled:u,children:u?"Registering...":"Register"})]})})}),(0,t.jsx)(m.eW,{className:"flex justify-center",children:(0,t.jsx)(o.z,{variant:"link",onClick:()=>i(!s),children:s?"Need an account? Register":"Already have an account? Login"})})]})}):null}},9733:(e,r,s)=>{"use strict";s.d(r,{z:()=>d});var t=s(7437),a=s(2265),n=s(2974),l=s(2218),i=s(9354);let o=(0,l.j)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),d=a.forwardRef((e,r)=>{let{className:s,variant:a,size:l,asChild:d=!1,...c}=e,m=d?n.g7:"button";return(0,t.jsx)(m,{className:(0,i.cn)(o({variant:a,size:l,className:s})),ref:r,...c})});d.displayName="Button"},8185:(e,r,s)=>{"use strict";s.d(r,{Ol:()=>i,Zb:()=>l,aY:()=>o,eW:()=>d});var t=s(7437),a=s(2265),n=s(9354);let l=a.forwardRef((e,r)=>{let{className:s,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,n.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",s),...a})});l.displayName="Card";let i=a.forwardRef((e,r)=>{let{className:s,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",s),...a})});i.displayName="CardHeader",a.forwardRef((e,r)=>{let{className:s,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,n.cn)("text-2xl font-semibold leading-none tracking-tight",s),...a})}).displayName="CardTitle",a.forwardRef((e,r)=>{let{className:s,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,n.cn)("text-sm text-muted-foreground",s),...a})}).displayName="CardDescription";let o=a.forwardRef((e,r)=>{let{className:s,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,n.cn)("p-6 pt-0",s),...a})});o.displayName="CardContent";let d=a.forwardRef((e,r)=>{let{className:s,...a}=e;return(0,t.jsx)("div",{ref:r,className:(0,n.cn)("flex items-center p-6 pt-0",s),...a})});d.displayName="CardFooter"},7114:(e,r,s)=>{"use strict";s.d(r,{l0:()=>m,NI:()=>j,Wi:()=>f,xJ:()=>p,lX:()=>g,zG:()=>v});var t=s(7437),a=s(2265),n=s(2974),l=s(9343),i=s(9354),o=s(7200);let d=(0,s(2218).j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=a.forwardRef((e,r)=>{let{className:s,...a}=e;return(0,t.jsx)(o.f,{ref:r,className:(0,i.cn)(d(),s),...a})});c.displayName=o.f.displayName;let m=l.RV,u=a.createContext({}),f=e=>{let{...r}=e;return(0,t.jsx)(u.Provider,{value:{name:r.name},children:(0,t.jsx)(l.Qr,{...r})})},x=()=>{let e=a.useContext(u),r=a.useContext(h),{getFieldState:s,formState:t}=(0,l.Gc)(),n=s(e.name,t);if(!e)throw Error("useFormField should be used within <FormField>");let{id:i}=r;return{id:i,name:e.name,formItemId:"".concat(i,"-form-item"),formDescriptionId:"".concat(i,"-form-item-description"),formMessageId:"".concat(i,"-form-item-message"),...n}},h=a.createContext({}),p=a.forwardRef((e,r)=>{let{className:s,...n}=e,l=a.useId();return(0,t.jsx)(h.Provider,{value:{id:l},children:(0,t.jsx)("div",{ref:r,className:(0,i.cn)("space-y-2",s),...n})})});p.displayName="FormItem";let g=a.forwardRef((e,r)=>{let{className:s,...a}=e,{error:n,formItemId:l}=x();return(0,t.jsx)(c,{ref:r,className:(0,i.cn)(n&&"text-destructive",s),htmlFor:l,...a})});g.displayName="FormLabel";let j=a.forwardRef((e,r)=>{let{...s}=e,{error:a,formItemId:l,formDescriptionId:i,formMessageId:o}=x();return(0,t.jsx)(n.g7,{ref:r,id:l,"aria-describedby":a?"".concat(i," ").concat(o):"".concat(i),"aria-invalid":!!a,...s})});j.displayName="FormControl",a.forwardRef((e,r)=>{let{className:s,...a}=e,{formDescriptionId:n}=x();return(0,t.jsx)("p",{ref:r,id:n,className:(0,i.cn)("text-sm text-muted-foreground",s),...a})}).displayName="FormDescription";let v=a.forwardRef((e,r)=>{let{className:s,children:a,...n}=e,{error:l,formMessageId:o}=x(),d=l?String(null==l?void 0:l.message):a;return d?(0,t.jsx)("p",{ref:r,id:o,className:(0,i.cn)("text-sm font-medium text-destructive",s),...n,children:d}):null});v.displayName="FormMessage"},7209:(e,r,s)=>{"use strict";s.d(r,{I:()=>l});var t=s(7437),a=s(2265),n=s(9354);let l=a.forwardRef((e,r)=>{let{className:s,type:a,...l}=e;return(0,t.jsx)("input",{type:a,className:(0,n.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",s),ref:r,...l})});l.displayName="Input"},9354:(e,r,s)=>{"use strict";s.d(r,{cn:()=>n});var t=s(4839),a=s(6164);function n(){for(var e=arguments.length,r=Array(e),s=0;s<e;s++)r[s]=arguments[s];return(0,a.m6)((0,t.W)(r))}}},e=>{var r=r=>e(e.s=r);e.O(0,[868,183,130,215,744],()=>r(5682)),_N_E=e.O()}]);