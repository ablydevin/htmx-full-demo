import a from"express";import d from"ably";import{uniqueNamesGenerator as f,colors as p,adjectives as h,animals as m}from"unique-names-generator";const i=async(e,o)=>{const r=f({dictionaries:[p,h,m]}),t=await d.Rest.Promise("fqOR-g.vL1AEQ:YqB33ug_1Eh1Wanqr2PG4B1qzPPtr78bc_h2ikhISaw").auth.createTokenRequest({clientId:r});return console.log(`Request: ${JSON.stringify(t)}`),o.json(t)},b=e=>{e.use(a.json()),e.use(a.urlencoded({extended:!0}))},y=e=>{e.use((o,r,c,t)=>{if(o instanceof Error)return c.status(403).json({error:o.message});t(o)})},q=(e,o)=>e,u=[void 0,i&&{source:"api/ably/token.js?fn=GET",method:"get",route:"/ably/token",path:"/api/ably/token",url:"/api/ably/token",cb:i},void 0,void 0,void 0,void 0].filter(e=>e);u.map(e=>e.method?.toUpperCase()+"	"+e.url);const R=e=>{u.forEach(o=>{o.cb=q?.(o.cb)||o.cb,e(o)})},s=a();R(e=>{const{method:o,route:r,path:c,cb:t}=e;s[o]?Array.isArray(t)?s[o](r,...t):s[o](r,t):console.log("Not Support",o,"for",r,"in",s)});const n=a();b?.(n);const{PORT:l=3e3,PUBLIC_DIR:g=".."}=process.env;n.use("/",a.static(g));n.use("/api",s);y?.(n);n.on("error",e=>{console.error(`Error at http://localhost:${l}/`,e)});n.listen(l,()=>{console.log(`Ready at http://localhost:${l}/`)});
