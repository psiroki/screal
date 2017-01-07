(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isd=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isj)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="d"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="u"){processStatics(init.statics[b1]=b2.u,b3)
delete b2.u}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$defaultValues=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$signature=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$defaultValues=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.cV"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.cV"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.cV(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.M=function(){}
var dart=[["","",,H,{"^":"",kU:{"^":"d;a"}}],["","",,J,{"^":"",
u:function(a){return void 0},
c_:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bX:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cY==null){H.jW()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.i(new P.ev("Return interceptor for "+H.h(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$cl()]
if(v!=null)return v
v=H.k3(a)
if(v!=null)return v
if(typeof a=="function")return C.W
y=Object.getPrototypeOf(a)
if(y==null)return C.D
if(y===Object.prototype)return C.D
if(typeof w=="function"){Object.defineProperty(w,$.$get$cl(),{value:C.y,enumerable:false,writable:true,configurable:true})
return C.y}return C.y},
j:{"^":"d;",
G:function(a,b){return a===b},
gT:function(a){return H.ai(a)},
l:["f3",function(a){return H.bI(a)}],
"%":"Blob|CanvasGradient|CanvasPattern|DOMError|File|FileError|MediaError|MediaKeyError|NavigatorUserMediaError|PositionError|PushMessageData|SQLError|SVGAnimatedEnumeration|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|SVGAnimatedTransformList|WebGLRenderingContext"},
hf:{"^":"j;",
l:function(a){return String(a)},
gT:function(a){return a?519018:218159},
$isjM:1},
dK:{"^":"j;",
G:function(a,b){return null==b},
l:function(a){return"null"},
gT:function(a){return 0}},
cm:{"^":"j;",
gT:function(a){return 0},
l:["f4",function(a){return String(a)}],
$ishg:1},
hQ:{"^":"cm;"},
bO:{"^":"cm;"},
b4:{"^":"cm;",
l:function(a){var z=a[$.$get$df()]
return z==null?this.f4(a):J.ao(z)},
$signature:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
b2:{"^":"j;$ti",
cd:function(a,b){if(!!a.immutable$list)throw H.i(new P.W(b))},
ha:function(a,b){if(!!a.fixed$length)throw H.i(new P.W(b))},
aI:function(a,b){return new H.cr(a,b,[null,null])},
i2:function(a,b){var z,y,x,w
z=a.length
y=new Array(z)
y.fixed$length=Array
for(x=0;x<a.length;++x){w=H.h(a[x])
if(x>=z)return H.a(y,x)
y[x]=w}return y.join(b)},
ai:function(a,b){return H.bb(a,b,null,H.Y(a,0))},
al:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
ghK:function(a){if(a.length>0)return a[0]
throw H.i(H.dG())},
Y:function(a,b,c,d,e){var z,y,x,w,v
this.cd(a,"set range")
P.cA(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
y=J.u(d)
if(!!y.$iso){x=e
w=d}else{w=y.ai(d,e).aJ(0,!1)
x=0}y=J.H(w)
if(x+z>y.gw(w))throw H.i(H.hd())
if(x<b)for(v=z-1;v>=0;--v)a[b+v]=y.k(w,x+v)
else for(v=0;v<z;++v)a[b+v]=y.k(w,x+v)},
eE:function(a,b,c,d){return this.Y(a,b,c,d,0)},
l:function(a){return P.bB(a,"[","]")},
ga4:function(a){return new J.fq(a,a.length,0,null)},
gT:function(a){return H.ai(a)},
gw:function(a){return a.length},
sw:function(a,b){this.ha(a,"set length")
if(b<0)throw H.i(P.aj(b,0,null,"newLength",null))
a.length=b},
k:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.i(H.E(a,b))
if(b>=a.length||b<0)throw H.i(H.E(a,b))
return a[b]},
q:function(a,b,c){this.cd(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.i(H.E(a,b))
if(b>=a.length||b<0)throw H.i(H.E(a,b))
a[b]=c},
$isa5:1,
$asa5:I.M,
$iso:1,
$aso:null,
$ism:1,
$asm:null,
u:{
he:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.i(P.cb(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.i(P.aj(a,0,4294967295,"length",null))
z=H.k(new Array(a),[b])
z.fixed$length=Array
return z}}},
kT:{"^":"b2;$ti"},
fq:{"^":"d;a,b,c,d",
gO:function(){return this.d},
J:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.i(H.f9(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
b3:{"^":"j;",
aU:function(a,b){var z
if(typeof b!=="number")throw H.i(H.x(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gcs(b)
if(this.gcs(a)===z)return 0
if(this.gcs(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gcs:function(a){return a===0?1/a<0:a<0},
cA:function(a,b){return a%b},
aa:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.i(new P.W(""+a+".toInt()"))},
b6:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.i(new P.W(""+a+".floor()"))},
iq:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.i(new P.W(""+a+".round()"))},
iy:function(a){return a},
l:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gT:function(a){return a&0x1FFFFFFF},
ag:function(a){return-a},
p:function(a,b){if(typeof b!=="number")throw H.i(H.x(b))
return a+b},
n:function(a,b){if(typeof b!=="number")throw H.i(H.x(b))
return a-b},
cG:function(a,b){if(typeof b!=="number")throw H.i(H.x(b))
return a/b},
m:function(a,b){if(typeof b!=="number")throw H.i(H.x(b))
return a*b},
bO:function(a,b){if(typeof b!=="number")throw H.i(H.x(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.dt(a,b)},
aC:function(a,b){return(a|0)===a?a/b|0:this.dt(a,b)},
dt:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.i(new P.W("Result of truncating division is "+H.h(z)+": "+H.h(a)+" ~/ "+b))},
aS:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
bJ:function(a,b){if(typeof b!=="number")throw H.i(H.x(b))
return(a|b)>>>0},
S:function(a,b){if(typeof b!=="number")throw H.i(H.x(b))
return a<b},
Z:function(a,b){if(typeof b!=="number")throw H.i(H.x(b))
return a>b},
bj:function(a,b){if(typeof b!=="number")throw H.i(H.x(b))
return a>=b},
$isZ:1},
dJ:{"^":"b3;",$isR:1,$isZ:1,$isn:1},
dI:{"^":"b3;",$isR:1,$isZ:1},
bC:{"^":"j;",
p:function(a,b){if(typeof b!=="string")throw H.i(P.cb(b,null,null))
return a+b},
f2:function(a,b,c){if(c==null)c=a.length
H.jO(c)
if(b<0)throw H.i(P.bJ(b,null,null))
if(typeof c!=="number")return H.e(c)
if(b>c)throw H.i(P.bJ(b,null,null))
if(c>a.length)throw H.i(P.bJ(c,null,null))
return a.substring(b,c)},
f1:function(a,b){return this.f2(a,b,null)},
m:function(a,b){var z,y
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.i(C.L)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
hn:function(a,b,c){if(c>a.length)throw H.i(P.aj(c,0,a.length,null,null))
return H.k9(a,b,c)},
aU:function(a,b){var z
if(typeof b!=="string")throw H.i(H.x(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
l:function(a){return a},
gT:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gw:function(a){return a.length},
k:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.i(H.E(a,b))
if(b>=a.length||b<0)throw H.i(H.E(a,b))
return a[b]},
$isa5:1,
$asa5:I.M,
$isal:1}}],["","",,H,{"^":"",
dG:function(){return new P.cE("No element")},
hd:function(){return new P.cE("Too few elements")},
b9:function(a,b,c,d){if(c-b<=32)H.ic(a,b,c,d)
else H.ib(a,b,c,d)},
ic:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.H(a);z<=c;++z){x=y.k(a,z)
w=z
while(!0){if(!(w>b&&J.S(d.$2(y.k(a,w-1),x),0)))break
v=w-1
y.q(a,w,y.k(a,v))
w=v}y.q(a,w,x)}},
ib:function(a,b,c,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=C.c.aC(c-b+1,6)
y=b+z
x=c-z
w=C.c.aC(b+c,2)
v=w-z
u=w+z
t=J.H(a)
s=t.k(a,y)
r=t.k(a,v)
q=t.k(a,w)
p=t.k(a,u)
o=t.k(a,x)
if(J.S(a0.$2(s,r),0)){n=r
r=s
s=n}if(J.S(a0.$2(p,o),0)){n=o
o=p
p=n}if(J.S(a0.$2(s,q),0)){n=q
q=s
s=n}if(J.S(a0.$2(r,q),0)){n=q
q=r
r=n}if(J.S(a0.$2(s,p),0)){n=p
p=s
s=n}if(J.S(a0.$2(q,p),0)){n=p
p=q
q=n}if(J.S(a0.$2(r,o),0)){n=o
o=r
r=n}if(J.S(a0.$2(r,q),0)){n=q
q=r
r=n}if(J.S(a0.$2(p,o),0)){n=o
o=p
p=n}t.q(a,y,s)
t.q(a,w,q)
t.q(a,x,o)
if(b<0||b>=a.length)return H.a(a,b)
t.q(a,v,a[b])
if(c<0||c>=a.length)return H.a(a,c)
t.q(a,u,a[c])
m=b+1
l=c-1
if(J.z(a0.$2(r,p),0)){for(k=m;k<=l;++k){if(k>=a.length)return H.a(a,k)
j=a[k]
i=a0.$2(j,r)
h=J.u(i)
if(h.G(i,0))continue
if(h.S(i,0)){if(k!==m){if(m>=a.length)return H.a(a,m)
t.q(a,k,a[m])
t.q(a,m,j)}++m}else for(;!0;){if(l<0||l>=a.length)return H.a(a,l)
i=a0.$2(a[l],r)
h=J.O(i)
if(h.Z(i,0)){--l
continue}else{h=h.S(i,0)
g=l-1
f=a.length
if(h){if(m>=f)return H.a(a,m)
t.q(a,k,a[m])
e=m+1
if(l>=a.length)return H.a(a,l)
t.q(a,m,a[l])
t.q(a,l,j)
l=g
m=e
break}else{if(l>=f)return H.a(a,l)
t.q(a,k,a[l])
t.q(a,l,j)
l=g
break}}}}d=!0}else{for(k=m;k<=l;++k){if(k>=a.length)return H.a(a,k)
j=a[k]
if(J.a3(a0.$2(j,r),0)){if(k!==m){if(m>=a.length)return H.a(a,m)
t.q(a,k,a[m])
t.q(a,m,j)}++m}else if(J.S(a0.$2(j,p),0))for(;!0;){if(l<0||l>=a.length)return H.a(a,l)
if(J.S(a0.$2(a[l],p),0)){--l
if(l<k)break
continue}else{if(l>=a.length)return H.a(a,l)
h=J.a3(a0.$2(a[l],r),0)
g=l-1
f=a.length
if(h){if(m>=f)return H.a(a,m)
t.q(a,k,a[m])
e=m+1
if(l>=a.length)return H.a(a,l)
t.q(a,m,a[l])
t.q(a,l,j)
m=e}else{if(l>=f)return H.a(a,l)
t.q(a,k,a[l])
t.q(a,l,j)}l=g
break}}}d=!1}h=m-1
if(h>=a.length)return H.a(a,h)
t.q(a,b,a[h])
t.q(a,h,r)
h=l+1
if(h<0||h>=a.length)return H.a(a,h)
t.q(a,c,a[h])
t.q(a,h,p)
H.b9(a,b,m-2,a0)
H.b9(a,l+2,c,a0)
if(d)return
if(m<y&&l>x){while(!0){if(m>=a.length)return H.a(a,m)
if(!J.z(a0.$2(a[m],r),0))break;++m}while(!0){if(l<0||l>=a.length)return H.a(a,l)
if(!J.z(a0.$2(a[l],p),0))break;--l}for(k=m;k<=l;++k){if(k>=a.length)return H.a(a,k)
j=a[k]
if(J.z(a0.$2(j,r),0)){if(k!==m){if(m>=a.length)return H.a(a,m)
t.q(a,k,a[m])
t.q(a,m,j)}++m}else if(J.z(a0.$2(j,p),0))for(;!0;){if(l<0||l>=a.length)return H.a(a,l)
if(J.z(a0.$2(a[l],p),0)){--l
if(l<k)break
continue}else{if(l>=a.length)return H.a(a,l)
h=J.a3(a0.$2(a[l],r),0)
g=l-1
f=a.length
if(h){if(m>=f)return H.a(a,m)
t.q(a,k,a[m])
e=m+1
if(l>=a.length)return H.a(a,l)
t.q(a,m,a[l])
t.q(a,l,j)
m=e}else{if(l>=f)return H.a(a,l)
t.q(a,k,a[l])
t.q(a,l,j)}l=g
break}}}H.b9(a,m,l,a0)}else H.b9(a,m,l,a0)},
m:{"^":"U;$ti",$asm:null},
aw:{"^":"m;$ti",
ga4:function(a){return new H.dL(this,this.gw(this),0,null)},
aI:function(a,b){return new H.cr(this,b,[H.F(this,"aw",0),null])},
ai:function(a,b){return H.bb(this,b,null,H.F(this,"aw",0))},
aJ:function(a,b){var z,y,x
z=H.k([],[H.F(this,"aw",0)])
C.d.sw(z,this.gw(this))
for(y=0;y<this.gw(this);++y){x=this.al(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bH:function(a){return this.aJ(a,!0)}},
ik:{"^":"aw;a,b,c,$ti",
gfJ:function(){var z,y,x
z=J.a9(this.a)
y=this.c
if(y!=null){if(typeof y!=="number")return y.Z()
x=y>z}else x=!0
if(x)return z
return y},
gh0:function(){var z,y
z=J.a9(this.a)
y=this.b
if(y>z)return z
return y},
gw:function(a){var z,y,x,w
z=J.a9(this.a)
y=this.b
if(y>=z)return 0
x=this.c
if(x!=null){if(typeof x!=="number")return x.bj()
w=x>=z}else w=!0
if(w)return z-y
if(typeof x!=="number")return x.n()
return x-y},
al:function(a,b){var z,y
z=this.gh0()+b
if(b>=0){y=this.gfJ()
if(typeof y!=="number")return H.e(y)
y=z>=y}else y=!0
if(y)throw H.i(P.bA(b,this,"index",null,null))
return J.d_(this.a,z)},
ai:function(a,b){var z,y,x
z=this.b+b
y=this.c
if(y!=null){if(typeof y!=="number")return H.e(y)
x=z>=y}else x=!1
if(x)return new H.dx(this.$ti)
return H.bb(this.a,z,y,H.Y(this,0))},
aJ:function(a,b){var z,y,x,w,v,u,t,s,r
z=this.b
y=this.a
x=J.H(y)
w=x.gw(y)
v=this.c
if(v!=null){if(typeof v!=="number")return v.S()
u=v<w}else u=!1
if(u)w=v
if(typeof w!=="number")return w.n()
t=w-z
if(t<0)t=0
s=H.k(new Array(t),this.$ti)
for(r=0;r<t;++r){u=x.al(y,z+r)
if(r>=s.length)return H.a(s,r)
s[r]=u
if(x.gw(y)<w)throw H.i(new P.aa(this))}return s},
fo:function(a,b,c,d){var z,y
z=this.b
y=this.c
if(y!=null){if(typeof y!=="number")return y.S()
if(y<0)H.y(P.aj(y,0,null,"end",null))
if(z>y)throw H.i(P.aj(z,0,y,"start",null))}},
u:{
bb:function(a,b,c,d){var z=new H.ik(a,b,c,[d])
z.fo(a,b,c,d)
return z}}},
dL:{"^":"d;a,b,c,d",
gO:function(){return this.d},
J:function(){var z,y,x,w
z=this.a
y=J.H(z)
x=y.gw(z)
if(this.b!==x)throw H.i(new P.aa(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.al(z,w);++this.c
return!0}},
dN:{"^":"U;a,b,$ti",
ga4:function(a){return new H.hq(null,J.bj(this.a),this.b,this.$ti)},
gw:function(a){return J.a9(this.a)},
$asU:function(a,b){return[b]},
u:{
bE:function(a,b,c,d){if(!!J.u(a).$ism)return new H.dv(a,b,[c,d])
return new H.dN(a,b,[c,d])}}},
dv:{"^":"dN;a,b,$ti",$ism:1,
$asm:function(a,b){return[b]}},
hq:{"^":"dH;a,b,c,$ti",
J:function(){var z=this.b
if(z.J()){this.a=this.c.$1(z.gO())
return!0}this.a=null
return!1},
gO:function(){return this.a}},
cr:{"^":"aw;a,b,$ti",
gw:function(a){return J.a9(this.a)},
al:function(a,b){return this.b.$1(J.d_(this.a,b))},
$asaw:function(a,b){return[b]},
$asm:function(a,b){return[b]},
$asU:function(a,b){return[b]}},
e4:{"^":"U;a,b,$ti",
ai:function(a,b){return H.e5(this.a,this.b+b,H.Y(this,0))},
ga4:function(a){return new H.i9(J.bj(this.a),this.b,this.$ti)},
cR:function(a,b,c){},
u:{
e6:function(a,b,c){var z
if(!!J.u(a).$ism){z=new H.fW(a,b,[c])
z.cR(a,b,c)
return z}return H.e5(a,b,c)},
e5:function(a,b,c){var z=new H.e4(a,b,[c])
z.cR(a,b,c)
return z}}},
fW:{"^":"e4;a,b,$ti",
gw:function(a){var z=J.a9(this.a)-this.b
if(z>=0)return z
return 0},
$ism:1,
$asm:null},
i9:{"^":"dH;a,b,$ti",
J:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.J()
this.b=0
return z.J()},
gO:function(){return this.a.gO()}},
dx:{"^":"m;$ti",
ga4:function(a){return C.K},
gw:function(a){return 0},
aI:function(a,b){return C.J},
ai:function(a,b){return this},
aJ:function(a,b){var z=this.$ti
return b?H.k([],z):H.k(new Array(0),z)},
bH:function(a){return this.aJ(a,!0)}},
fX:{"^":"d;",
J:function(){return!1},
gO:function(){return}},
dA:{"^":"d;$ti"}}],["","",,H,{"^":"",
bf:function(a,b){var z=a.b3(b)
if(!init.globalState.d.cy)init.globalState.f.bf()
return z},
f7:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.u(y).$iso)throw H.i(P.aq("Arguments to main must be a List: "+H.h(y)))
init.globalState=new H.jj(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$dE()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.iV(P.cp(null,H.be),0)
x=P.n
y.z=new H.ag(0,null,null,null,null,null,0,[x,H.cP])
y.ch=new H.ag(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.ji()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.h6,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.jk)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=new H.ag(0,null,null,null,null,null,0,[x,H.bK])
x=P.aM(null,null,null,x)
v=new H.bK(0,null,!1)
u=new H.cP(y,w,x,init.createNewIsolate(),v,new H.ar(H.c1()),new H.ar(H.c1()),!1,!1,[],P.aM(null,null,null,null),null,null,!1,!0,P.aM(null,null,null,null))
x.C(0,0)
u.cV(0,v)
init.globalState.e=u
init.globalState.d=u
y=H.bi()
if(H.aF(y,[y]).aB(a))u.b3(new H.k7(z,a))
else if(H.aF(y,[y,y]).aB(a))u.b3(new H.k8(z,a))
else u.b3(a)
init.globalState.f.bf()},
ha:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.hb()
return},
hb:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.i(new P.W("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.i(new P.W('Cannot extract URI from "'+H.h(z)+'"'))},
h6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.bP(!0,[]).aF(b.data)
y=J.H(z)
switch(y.k(z,"command")){case"start":init.globalState.b=y.k(z,"id")
x=y.k(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.k(z,"args")
u=new H.bP(!0,[]).aF(y.k(z,"msg"))
t=y.k(z,"isSpawnUri")
s=y.k(z,"startPaused")
r=new H.bP(!0,[]).aF(y.k(z,"replyTo"))
y=init.globalState.a++
q=P.n
p=new H.ag(0,null,null,null,null,null,0,[q,H.bK])
q=P.aM(null,null,null,q)
o=new H.bK(0,null,!1)
n=new H.cP(y,p,q,init.createNewIsolate(),o,new H.ar(H.c1()),new H.ar(H.c1()),!1,!1,[],P.aM(null,null,null,null),null,null,!1,!0,P.aM(null,null,null,null))
q.C(0,0)
n.cV(0,o)
init.globalState.f.a.ao(new H.be(n,new H.h7(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bf()
break
case"spawn-worker":break
case"message":if(y.k(z,"port")!=null)y.k(z,"port").av(y.k(z,"msg"))
init.globalState.f.bf()
break
case"close":init.globalState.ch.be(0,$.$get$dF().k(0,a))
a.terminate()
init.globalState.f.bf()
break
case"log":H.h5(y.k(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.aL(["command","print","msg",z])
q=new H.aC(!0,P.aR(null,P.n)).ab(q)
y.toString
self.postMessage(q)}else P.c0(y.k(z,"msg"))
break
case"error":throw H.i(y.k(z,"msg"))}},
h5:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.aL(["command","log","msg",a])
x=new H.aC(!0,P.aR(null,P.n)).ab(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.a_(w)
z=H.X(w)
throw H.i(P.bx(z))}},
h8:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.dW=$.dW+("_"+y)
$.dX=$.dX+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.av(["spawned",new H.bT(y,x),w,z.r])
x=new H.h9(a,b,c,d,z)
if(e===!0){z.dz(w,w)
init.globalState.f.a.ao(new H.be(z,x,"start isolate"))}else x.$0()},
jA:function(a){return new H.bP(!0,[]).aF(new H.aC(!1,P.aR(null,P.n)).ab(a))},
k7:{"^":"l:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
k8:{"^":"l:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
jj:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",u:{
jk:function(a){var z=P.aL(["command","print","msg",a])
return new H.aC(!0,P.aR(null,P.n)).ab(z)}}},
cP:{"^":"d;a3:a>,b,c,i1:d<,ho:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
dz:function(a,b){if(!this.f.G(0,a))return
if(this.Q.C(0,b)&&!this.y)this.y=!0
this.ca()},
il:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.be(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.a(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.a(v,w)
v[w]=x
if(w===y.c)y.d9();++y.d}this.y=!1}this.ca()},
h5:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.u(a),y=0;x=this.ch,y<x.length;y+=2)if(z.G(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ik:function(a){var z,y,x
if(this.ch==null)return
for(z=J.u(a),y=0;x=this.ch,y<x.length;y+=2)if(z.G(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.y(new P.W("removeRange"))
P.cA(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
eD:function(a,b){if(!this.r.G(0,a))return
this.db=b},
hQ:function(a,b,c){var z=J.u(b)
if(!z.G(b,0))z=z.G(b,1)&&!this.cy
else z=!0
if(z){a.av(c)
return}z=this.cx
if(z==null){z=P.cp(null,null)
this.cx=z}z.ao(new H.je(a,c))},
hP:function(a,b){var z
if(!this.r.G(0,a))return
z=J.u(b)
if(!z.G(b,0))z=z.G(b,1)&&!this.cy
else z=!0
if(z){this.ct()
return}z=this.cx
if(z==null){z=P.cp(null,null)
this.cx=z}z.ao(this.gi3())},
hR:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.c0(a)
if(b!=null)P.c0(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.ao(a)
y[1]=b==null?null:J.ao(b)
for(x=new P.eG(z,z.r,null,null),x.c=z.e;x.J();)x.d.av(y)},
b3:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){t=H.a_(u)
w=t
v=H.X(u)
this.hR(w,v)
if(this.db===!0){this.ct()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gi1()
if(this.cx!=null)for(;t=this.cx,!t.gar(t);)this.cx.e5().$0()}return y},
dZ:function(a){return this.b.k(0,a)},
cV:function(a,b){var z=this.b
if(z.dH(a))throw H.i(P.bx("Registry: ports must be registered only once."))
z.q(0,a,b)},
ca:function(){var z=this.b
if(z.gw(z)-this.c.a>0||this.y||!this.x)init.globalState.z.q(0,this.a,this)
else this.ct()},
ct:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aT(0)
for(z=this.b,y=z.gej(z),y=y.ga4(y);y.J();)y.gO().fE()
z.aT(0)
this.c.aT(0)
init.globalState.z.be(0,this.a)
this.dx.aT(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
w.av(z[v])}this.ch=null}},"$0","gi3",0,0,1]},
je:{"^":"l:1;a,b",
$0:function(){this.a.av(this.b)}},
iV:{"^":"d;a,b",
hr:function(){var z=this.a
if(z.b===z.c)return
return z.e5()},
ed:function(){var z,y,x
z=this.hr()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.dH(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gar(y)}else y=!1
else y=!1
else y=!1
if(y)H.y(P.bx("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gar(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.aL(["command","close"])
x=new H.aC(!0,new P.eH(0,null,null,null,null,null,0,[null,P.n])).ab(x)
y.toString
self.postMessage(x)}return!1}z.ic()
return!0},
dn:function(){if(self.window!=null)new H.iW(this).$0()
else for(;this.ed(););},
bf:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.dn()
else try{this.dn()}catch(x){w=H.a_(x)
z=w
y=H.X(x)
w=init.globalState.Q
v=P.aL(["command","error","msg",H.h(z)+"\n"+H.h(y)])
v=new H.aC(!0,P.aR(null,P.n)).ab(v)
w.toString
self.postMessage(v)}}},
iW:{"^":"l:1;a",
$0:function(){if(!this.a.ed())return
P.iv(C.z,this)}},
be:{"^":"d;a,b,c",
ic:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.b3(this.b)}},
ji:{"^":"d;"},
h7:{"^":"l:0;a,b,c,d,e,f",
$0:function(){H.h8(this.a,this.b,this.c,this.d,this.e,this.f)}},
h9:{"^":"l:1;a,b,c,d,e",
$0:function(){var z,y,x
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
x=H.bi()
if(H.aF(x,[x,x]).aB(y))y.$2(this.b,this.c)
else if(H.aF(x,[x]).aB(y))y.$1(this.b)
else y.$0()}z.ca()}},
eB:{"^":"d;"},
bT:{"^":"eB;b,a",
av:function(a){var z,y,x
z=init.globalState.z.k(0,this.a)
if(z==null)return
y=this.b
if(y.gdd())return
x=H.jA(a)
if(z.gho()===y){y=J.H(x)
switch(y.k(x,0)){case"pause":z.dz(y.k(x,1),y.k(x,2))
break
case"resume":z.il(y.k(x,1))
break
case"add-ondone":z.h5(y.k(x,1),y.k(x,2))
break
case"remove-ondone":z.ik(y.k(x,1))
break
case"set-errors-fatal":z.eD(y.k(x,1),y.k(x,2))
break
case"ping":z.hQ(y.k(x,1),y.k(x,2),y.k(x,3))
break
case"kill":z.hP(y.k(x,1),y.k(x,2))
break
case"getErrors":y=y.k(x,1)
z.dx.C(0,y)
break
case"stopErrors":y=y.k(x,1)
z.dx.be(0,y)
break}return}init.globalState.f.a.ao(new H.be(z,new H.jm(this,x),"receive"))},
G:function(a,b){if(b==null)return!1
return b instanceof H.bT&&J.z(this.b,b.b)},
gT:function(a){return this.b.gc0()}},
jm:{"^":"l:0;a,b",
$0:function(){var z=this.a.b
if(!z.gdd())z.fu(this.b)}},
cR:{"^":"eB;b,c,a",
av:function(a){var z,y,x
z=P.aL(["command","message","port",this,"msg",a])
y=new H.aC(!0,P.aR(null,P.n)).ab(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.k(0,this.b)
if(x!=null)x.postMessage(y)}},
G:function(a,b){if(b==null)return!1
return b instanceof H.cR&&J.z(this.b,b.b)&&J.z(this.a,b.a)&&J.z(this.c,b.c)},
gT:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.bm()
y=this.a
if(typeof y!=="number")return y.bm()
x=this.c
if(typeof x!=="number")return H.e(x)
return(z<<16^y<<8^x)>>>0}},
bK:{"^":"d;c0:a<,b,dd:c<",
fE:function(){this.c=!0
this.b=null},
fu:function(a){if(this.c)return
this.b.$1(a)},
$ishV:1},
ir:{"^":"d;a,b,c",
fq:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ao(new H.be(y,new H.it(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aG(new H.iu(this,b),0),a)}else throw H.i(new P.W("Timer greater than 0."))},
u:{
is:function(a,b){var z=new H.ir(!0,!1,null)
z.fq(a,b)
return z}}},
it:{"^":"l:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
iu:{"^":"l:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
ar:{"^":"d;c0:a<",
gT:function(a){var z=this.a
if(typeof z!=="number")return z.iI()
z=C.b.aS(z,0)^C.b.aC(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
G:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.ar){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aC:{"^":"d;a,b",
ab:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.k(0,a)
if(y!=null)return["ref",y]
z.q(0,a,z.gw(z))
z=J.u(a)
if(!!z.$isdP)return["buffer",a]
if(!!z.$iscu)return["typed",a]
if(!!z.$isa5)return this.ez(a)
if(!!z.$ish4){x=this.gew()
w=a.gdW()
w=H.bE(w,x,H.F(w,"U",0),null)
w=P.bD(w,!0,H.F(w,"U",0))
z=z.gej(a)
z=H.bE(z,x,H.F(z,"U",0),null)
return["map",w,P.bD(z,!0,H.F(z,"U",0))]}if(!!z.$ishg)return this.eA(a)
if(!!z.$isj)this.ei(a)
if(!!z.$ishV)this.bg(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbT)return this.eB(a)
if(!!z.$iscR)return this.eC(a)
if(!!z.$isl){v=a.$static_name
if(v==null)this.bg(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isar)return["capability",a.a]
if(!(a instanceof P.d))this.ei(a)
return["dart",init.classIdExtractor(a),this.ey(init.classFieldsExtractor(a))]},"$1","gew",2,0,2],
bg:function(a,b){throw H.i(new P.W(H.h(b==null?"Can't transmit:":b)+" "+H.h(a)))},
ei:function(a){return this.bg(a,null)},
ez:function(a){var z=this.ex(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bg(a,"Can't serialize indexable: ")},
ex:function(a){var z,y,x
z=[]
C.d.sw(z,a.length)
for(y=0;y<a.length;++y){x=this.ab(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
ey:function(a){var z
for(z=0;z<a.length;++z)C.d.q(a,z,this.ab(a[z]))
return a},
eA:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.bg(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.d.sw(y,z.length)
for(x=0;x<z.length;++x){w=this.ab(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
eC:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
eB:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gc0()]
return["raw sendport",a]}},
bP:{"^":"d;a,b",
aF:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.i(P.aq("Bad serialized message: "+H.h(a)))
switch(C.d.ghK(a)){case"ref":if(1>=a.length)return H.a(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.k(this.b2(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.k(this.b2(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.b2(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.k(this.b2(x),[null])
y.fixed$length=Array
return y
case"map":return this.hu(a)
case"sendport":return this.hv(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.ht(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.ar(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.b2(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.i("couldn't deserialize: "+H.h(a))}},"$1","ghs",2,0,2],
b2:function(a){var z,y,x
z=J.H(a)
y=0
while(!0){x=z.gw(a)
if(typeof x!=="number")return H.e(x)
if(!(y<x))break
z.q(a,y,this.aF(z.k(a,y)));++y}return a},
hu:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.hn()
this.b.push(w)
y=J.fl(y,this.ghs()).bH(0)
for(z=J.H(y),v=J.H(x),u=0;u<z.gw(y);++u){if(u>=y.length)return H.a(y,u)
w.q(0,y[u],this.aF(v.k(x,u)))}return w},
hv:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.z(y,init.globalState.b)){v=init.globalState.z.k(0,x)
if(v==null)return
u=v.dZ(w)
if(u==null)return
t=new H.bT(u,x)}else t=new H.cR(y,w,x)
this.b.push(t)
return t},
ht:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.H(y)
v=J.H(x)
u=0
while(!0){t=z.gw(y)
if(typeof t!=="number")return H.e(t)
if(!(u<t))break
w[z.k(y,u)]=this.aF(v.k(x,u));++u}return w}}}],["","",,H,{"^":"",
fz:function(){throw H.i(new P.W("Cannot modify unmodifiable Map"))},
f0:function(a){return init.getTypeFromName(a)},
jQ:function(a){return init.types[a]},
eZ:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.u(a).$isaf},
h:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.ao(a)
if(typeof z!=="string")throw H.i(H.x(a))
return z},
ai:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
dY:function(a){var z,y,x,w,v,u,t,s,r
z=J.u(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.N||!!J.u(a).$isbO){v=C.C(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1)r=w.charCodeAt(0)===36
else r=!1
if(r)w=C.O.f1(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.f_(H.cW(a),0,null),init.mangledGlobalNames)},
bI:function(a){return"Instance of '"+H.dY(a)+"'"},
lf:[function(){return Date.now()},"$0","jD",0,0,15],
cz:function(){var z,y
if($.aO!=null)return
$.aO=1000
$.D=H.jD()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.aO=1e6
$.D=new H.hT(y)},
cy:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.i(H.x(a))
return a[b]},
dZ:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.i(H.x(a))
a[b]=c},
e:function(a){throw H.i(H.x(a))},
a:function(a,b){if(a==null)J.a9(a)
throw H.i(H.E(a,b))},
E:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.ap(!0,b,"index",null)
z=J.a9(a)
if(!(b<0)){if(typeof z!=="number")return H.e(z)
y=b>=z}else y=!0
if(y)return P.bA(b,a,"index",null,z)
return P.bJ(b,"index",null)},
x:function(a){return new P.ap(!0,a,null,null)},
aW:function(a){if(typeof a!=="number")throw H.i(H.x(a))
return a},
jO:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.i(H.x(a))
return a},
i:function(a){var z
if(a==null)a=new P.dV()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.fa})
z.name=""}else z.toString=H.fa
return z},
fa:function(){return J.ao(this.dartException)},
y:function(a){throw H.i(a)},
f9:function(a){throw H.i(new P.aa(a))},
a_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.kb(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.aS(x,16)&8191)===10)switch(w){case 438:return z.$1(H.cn(H.h(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.h(y)+" (Error "+w+")"
return z.$1(new H.dU(v,null))}}if(a instanceof TypeError){u=$.$get$ek()
t=$.$get$el()
s=$.$get$em()
r=$.$get$en()
q=$.$get$er()
p=$.$get$es()
o=$.$get$ep()
$.$get$eo()
n=$.$get$eu()
m=$.$get$et()
l=u.ae(y)
if(l!=null)return z.$1(H.cn(y,l))
else{l=t.ae(y)
if(l!=null){l.method="call"
return z.$1(H.cn(y,l))}else{l=s.ae(y)
if(l==null){l=r.ae(y)
if(l==null){l=q.ae(y)
if(l==null){l=p.ae(y)
if(l==null){l=o.ae(y)
if(l==null){l=r.ae(y)
if(l==null){l=n.ae(y)
if(l==null){l=m.ae(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.dU(y,l==null?null:l.method))}}return z.$1(new H.iz(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.e8()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.ap(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.e8()
return a},
X:function(a){var z
if(a==null)return new H.eI(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.eI(a,null)},
k5:function(a){if(a==null||typeof a!='object')return J.aZ(a)
else return H.ai(a)},
eV:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.q(0,a[y],a[x])}return b},
jY:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bf(b,new H.jZ(a))
case 1:return H.bf(b,new H.k_(a,d))
case 2:return H.bf(b,new H.k0(a,d,e))
case 3:return H.bf(b,new H.k1(a,d,e,f))
case 4:return H.bf(b,new H.k2(a,d,e,f,g))}throw H.i(P.bx("Unsupported number of arguments for wrapped closure"))},
aG:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.jY)
a.$identity=z
return z},
fw:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.u(c).$iso){z.$reflectionInfo=c
x=H.hX(z).r}else x=c
w=d?Object.create(new H.id().constructor.prototype):Object.create(new H.cd(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.a4
$.a4=J.p(u,1)
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
u=!d
if(u){t=e.length==1&&!0
s=H.d9(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.jQ,x)
else if(u&&typeof x=="function"){q=t?H.d8:H.ce
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.i("Error in reflectionInfo.")
w.$signature=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.d9(a,o,t)
w[n]=m}}w["call*"]=s
w.$requiredArgCount=z.$requiredArgCount
w.$defaultValues=z.$defaultValues
return v},
ft:function(a,b,c,d){var z=H.ce
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
d9:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.fv(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.ft(y,!w,z,b)
if(y===0){w=$.a4
$.a4=J.p(w,1)
u="self"+H.h(w)
w="return function(){var "+u+" = this."
v=$.aJ
if(v==null){v=H.bm("self")
$.aJ=v}return new Function(w+H.h(v)+";return "+u+"."+H.h(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a4
$.a4=J.p(w,1)
t+=H.h(w)
w="return function("+t+"){return this."
v=$.aJ
if(v==null){v=H.bm("self")
$.aJ=v}return new Function(w+H.h(v)+"."+H.h(z)+"("+t+");}")()},
fu:function(a,b,c,d){var z,y
z=H.ce
y=H.d8
switch(b?-1:a){case 0:throw H.i(new H.hY("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
fv:function(a,b){var z,y,x,w,v,u,t,s
z=H.fs()
y=$.d7
if(y==null){y=H.bm("receiver")
$.d7=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.fu(w,!u,x,b)
if(w===1){y="return function(){return this."+H.h(z)+"."+H.h(x)+"(this."+H.h(y)+");"
u=$.a4
$.a4=J.p(u,1)
return new Function(y+H.h(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.h(z)+"."+H.h(x)+"(this."+H.h(y)+", "+s+");"
u=$.a4
$.a4=J.p(u,1)
return new Function(y+H.h(u)+"}")()},
cV:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.u(c).$iso){c.fixed$length=Array
z=c}else z=c
return H.fw(a,b,z,!!d,e,f)},
ka:function(a){throw H.i(new P.fG("Cyclic initialization for static "+H.h(a)))},
aF:function(a,b,c){return new H.hZ(a,b,c,null)},
eS:function(a,b){var z=a.builtin$cls
if(b==null||b.length===0)return new H.i0(z)
return new H.i_(z,b,null)},
bi:function(){return C.I},
c1:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
eW:function(a){return init.getIsolateTag(a)},
k:function(a,b){a.$ti=b
return a},
cW:function(a){if(a==null)return
return a.$ti},
eX:function(a,b){return H.f8(a["$as"+H.h(b)],H.cW(a))},
F:function(a,b,c){var z=H.eX(a,b)
return z==null?null:z[c]},
Y:function(a,b){var z=H.cW(a)
return z==null?null:z[b]},
f3:function(a,b){if(a==null)return"dynamic"
else if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.f_(a,1,b)
else if(typeof a=="function")return a.builtin$cls
else if(typeof a==="number"&&Math.floor(a)===a)return C.c.l(a)
else return},
f_:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.cG("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.a=v+", "
u=a[y]
if(u!=null)w=!1
v=z.a+=H.h(H.f3(u,c))}return w?"":"<"+z.l(0)+">"},
f8:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
jI:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.P(a[y],b[y]))return!1
return!0},
eT:function(a,b,c){return a.apply(b,H.eX(b,c))},
P:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if('func' in b)return H.eY(a,b)
if('func' in a)return b.builtin$cls==="kM"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.f3(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+H.h(v)]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.jI(H.f8(u,z),x)},
eP:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.P(z,v)||H.P(v,z)))return!1}return!0},
jH:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.P(v,u)||H.P(u,v)))return!1}return!0},
eY:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.P(z,y)||H.P(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.eP(x,w,!1))return!1
if(!H.eP(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.P(o,n)||H.P(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.P(o,n)||H.P(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.P(o,n)||H.P(n,o)))return!1}}return H.jH(a.named,b.named)},
lG:function(a){var z=$.cX
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
lE:function(a){return H.ai(a)},
lD:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
k3:function(a){var z,y,x,w,v,u
z=$.cX.$1(a)
y=$.bV[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bZ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.eO.$2(a,z)
if(z!=null){y=$.bV[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bZ[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.cZ(x)
$.bV[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bZ[z]=x
return x}if(v==="-"){u=H.cZ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.f1(a,x)
if(v==="*")throw H.i(new P.ev(z))
if(init.leafTags[z]===true){u=H.cZ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.f1(a,x)},
f1:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.c_(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
cZ:function(a){return J.c_(a,!1,null,!!a.$isaf)},
k4:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.c_(z,!1,null,!!z.$isaf)
else return J.c_(z,c,null,null)},
jW:function(){if(!0===$.cY)return
$.cY=!0
H.jX()},
jX:function(){var z,y,x,w,v,u,t,s
$.bV=Object.create(null)
$.bZ=Object.create(null)
H.jS()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.f2.$1(v)
if(u!=null){t=H.k4(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
jS:function(){var z,y,x,w,v,u,t
z=C.S()
z=H.aE(C.P,H.aE(C.U,H.aE(C.B,H.aE(C.B,H.aE(C.T,H.aE(C.Q,H.aE(C.R(C.C),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.cX=new H.jT(v)
$.eO=new H.jU(u)
$.f2=new H.jV(t)},
aE:function(a,b){return a(b)||b},
k9:function(a,b,c){return a.indexOf(b,c)>=0},
fy:{"^":"d;",
l:function(a){return P.dO(this)},
q:function(a,b,c){return H.fz()}},
au:{"^":"fy;a,$ti",
bZ:function(){var z=this.$map
if(z==null){z=new H.ag(0,null,null,null,null,null,0,this.$ti)
H.eV(this.a,z)
this.$map=z}return z},
k:function(a,b){return this.bZ().k(0,b)},
bD:function(a,b){this.bZ().bD(0,b)},
gw:function(a){var z=this.bZ()
return z.gw(z)}},
hW:{"^":"d;a,b,c,d,e,f,r,x",u:{
hX:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.hW(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
hT:{"^":"l:0;a",
$0:function(){return C.b.b6(1000*this.a.now())}},
ix:{"^":"d;a,b,c,d,e,f",
ae:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
u:{
a7:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.ix(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bN:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
eq:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
dU:{"^":"G;a,b",
l:function(a){var z=this.b
if(z==null)return"NullError: "+H.h(this.a)
return"NullError: method not found: '"+H.h(z)+"' on null"}},
hj:{"^":"G;a,b,c",
l:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.h(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+H.h(z)+"' ("+H.h(this.a)+")"
return"NoSuchMethodError: method not found: '"+H.h(z)+"' on '"+H.h(y)+"' ("+H.h(this.a)+")"},
u:{
cn:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.hj(a,y,z?null:b.receiver)}}},
iz:{"^":"G;a",
l:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
kb:{"^":"l:2;a",
$1:function(a){if(!!J.u(a).$isG)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
eI:{"^":"d;a,b",
l:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
jZ:{"^":"l:0;a",
$0:function(){return this.a.$0()}},
k_:{"^":"l:0;a,b",
$0:function(){return this.a.$1(this.b)}},
k0:{"^":"l:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
k1:{"^":"l:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
k2:{"^":"l:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
l:{"^":"d;",
l:function(a){return"Closure '"+H.dY(this)+"'"},
gem:function(){return this},
gem:function(){return this}},
ea:{"^":"l;"},
id:{"^":"ea;",
l:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cd:{"^":"ea;a,b,c,d",
G:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cd))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gT:function(a){var z,y
z=this.c
if(z==null)y=H.ai(this.a)
else y=typeof z!=="object"?J.aZ(z):H.ai(z)
z=H.ai(this.b)
if(typeof y!=="number")return y.iL()
return(y^z)>>>0},
l:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.h(this.d)+"' of "+H.bI(z)},
u:{
ce:function(a){return a.a},
d8:function(a){return a.c},
fs:function(){var z=$.aJ
if(z==null){z=H.bm("self")
$.aJ=z}return z},
bm:function(a){var z,y,x,w,v
z=new H.cd("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
hY:{"^":"G;a",
l:function(a){return"RuntimeError: "+H.h(this.a)}},
bL:{"^":"d;"},
hZ:{"^":"bL;a,b,c,d",
aB:function(a){var z=this.fK(a)
return z==null?!1:H.eY(z,this.am())},
fK:function(a){var z=J.u(a)
return"$signature" in z?z.$signature():null},
am:function(){var z,y,x,w,v,u,t
z={func:"dynafunc"}
y=this.a
x=J.u(y)
if(!!x.$isls)z.v=true
else if(!x.$isds)z.ret=y.am()
y=this.b
if(y!=null&&y.length!==0)z.args=H.e1(y)
y=this.c
if(y!=null&&y.length!==0)z.opt=H.e1(y)
y=this.d
if(y!=null){w=Object.create(null)
v=H.eU(y)
for(x=v.length,u=0;u<x;++u){t=v[u]
w[t]=y[t].am()}z.named=w}return z},
l:function(a){var z,y,x,w,v,u,t,s
z=this.b
if(z!=null)for(y=z.length,x="(",w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.h(u)}else{x="("
w=!1}z=this.c
if(z!=null&&z.length!==0){x=(w?x+", ":x)+"["
for(y=z.length,w=!1,v=0;v<y;++v,w=!0){u=z[v]
if(w)x+=", "
x+=H.h(u)}x+="]"}else{z=this.d
if(z!=null){x=(w?x+", ":x)+"{"
t=H.eU(z)
for(y=t.length,w=!1,v=0;v<y;++v,w=!0){s=t[v]
if(w)x+=", "
x+=H.h(z[s].am())+" "+s}x+="}"}}return x+(") -> "+H.h(this.a))},
u:{
e1:function(a){var z,y,x
a=a
z=[]
for(y=a.length,x=0;x<y;++x)z.push(a[x].am())
return z}}},
ds:{"^":"bL;",
l:function(a){return"dynamic"},
am:function(){return}},
i0:{"^":"bL;a",
am:function(){var z,y
z=this.a
y=H.f0(z)
if(y==null)throw H.i("no type for '"+z+"'")
return y},
l:function(a){return this.a}},
i_:{"^":"bL;a,b,c",
am:function(){var z,y,x,w
z=this.c
if(z!=null)return z
z=this.a
y=[H.f0(z)]
if(0>=y.length)return H.a(y,0)
if(y[0]==null)throw H.i("no type for '"+z+"<...>'")
for(z=this.b,x=z.length,w=0;w<z.length;z.length===x||(0,H.f9)(z),++w)y.push(z[w].am())
this.c=y
return y},
l:function(a){var z=this.b
return this.a+"<"+(z&&C.d).i2(z,", ")+">"}},
ag:{"^":"d;a,b,c,d,e,f,r,$ti",
gw:function(a){return this.a},
gar:function(a){return this.a===0},
gdW:function(){return new H.hl(this,[H.Y(this,0)])},
gej:function(a){return H.bE(this.gdW(),new H.hi(this),H.Y(this,0),H.Y(this,1))},
dH:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.fI(z,a)}else return this.hX(a)},
hX:function(a){var z=this.d
if(z==null)return!1
return this.b8(this.bq(z,this.b7(a)),a)>=0},
k:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.b0(z,b)
return y==null?null:y.gaH()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.b0(x,b)
return y==null?null:y.gaH()}else return this.hY(b)},
hY:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bq(z,this.b7(a))
x=this.b8(y,a)
if(x<0)return
return y[x].gaH()},
q:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.c5()
this.b=z}this.cU(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.c5()
this.c=y}this.cU(y,b,c)}else{x=this.d
if(x==null){x=this.c5()
this.d=x}w=this.b7(b)
v=this.bq(x,w)
if(v==null)this.c9(x,w,[this.c6(b,c)])
else{u=this.b8(v,b)
if(u>=0)v[u].saH(c)
else v.push(this.c6(b,c))}}},
be:function(a,b){if(typeof b==="string")return this.dl(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.dl(this.c,b)
else return this.hZ(b)},
hZ:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bq(z,this.b7(a))
x=this.b8(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.du(w)
return w.gaH()},
aT:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
bD:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.i(new P.aa(this))
z=z.c}},
cU:function(a,b,c){var z=this.b0(a,b)
if(z==null)this.c9(a,b,this.c6(b,c))
else z.saH(c)},
dl:function(a,b){var z
if(a==null)return
z=this.b0(a,b)
if(z==null)return
this.du(z)
this.d4(a,b)
return z.gaH()},
c6:function(a,b){var z,y
z=new H.hk(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
du:function(a){var z,y
z=a.gfU()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
b7:function(a){return J.aZ(a)&0x3ffffff},
b8:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.z(a[y].gdQ(),b))return y
return-1},
l:function(a){return P.dO(this)},
b0:function(a,b){return a[b]},
bq:function(a,b){return a[b]},
c9:function(a,b,c){a[b]=c},
d4:function(a,b){delete a[b]},
fI:function(a,b){return this.b0(a,b)!=null},
c5:function(){var z=Object.create(null)
this.c9(z,"<non-identifier-key>",z)
this.d4(z,"<non-identifier-key>")
return z},
$ish4:1},
hi:{"^":"l:2;a",
$1:function(a){return this.a.k(0,a)}},
hk:{"^":"d;dQ:a<,aH:b@,c,fU:d<"},
hl:{"^":"m;a,$ti",
gw:function(a){return this.a.a},
ga4:function(a){var z,y
z=this.a
y=new H.hm(z,z.r,null,null)
y.c=z.e
return y}},
hm:{"^":"d;a,b,c,d",
gO:function(){return this.d},
J:function(){var z=this.a
if(this.b!==z.r)throw H.i(new P.aa(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
jT:{"^":"l:2;a",
$1:function(a){return this.a(a)}},
jU:{"^":"l:8;a",
$2:function(a,b){return this.a(a,b)}},
jV:{"^":"l:9;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
eU:function(a){var z=H.k(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
k6:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
c:function(a){return a},
dP:{"^":"j;",$isdP:1,"%":"ArrayBuffer"},
cu:{"^":"j;",$iscu:1,"%":"DataView;ArrayBufferView;cs|dQ|dS|ct|dR|dT|ah"},
cs:{"^":"cu;",
gw:function(a){return a.length},
$isaf:1,
$asaf:I.M,
$isa5:1,
$asa5:I.M},
ct:{"^":"dS;",
k:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
return a[b]},
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
a[b]=c}},
dQ:{"^":"cs+co;",$asaf:I.M,$asa5:I.M,
$aso:function(){return[P.R]},
$asm:function(){return[P.R]},
$iso:1,
$ism:1},
dS:{"^":"dQ+dA;",$asaf:I.M,$asa5:I.M,
$aso:function(){return[P.R]},
$asm:function(){return[P.R]}},
ah:{"^":"dT;",
q:function(a,b,c){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
a[b]=c},
$iso:1,
$aso:function(){return[P.n]},
$ism:1,
$asm:function(){return[P.n]}},
dR:{"^":"cs+co;",$asaf:I.M,$asa5:I.M,
$aso:function(){return[P.n]},
$asm:function(){return[P.n]},
$iso:1,
$ism:1},
dT:{"^":"dR+dA;",$asaf:I.M,$asa5:I.M,
$aso:function(){return[P.n]},
$asm:function(){return[P.n]}},
kY:{"^":"ct;",$iso:1,
$aso:function(){return[P.R]},
$ism:1,
$asm:function(){return[P.R]},
"%":"Float32Array"},
hB:{"^":"ct;",$iso:1,
$aso:function(){return[P.R]},
$ism:1,
$asm:function(){return[P.R]},
"%":"Float64Array"},
kZ:{"^":"ah;",
k:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
return a[b]},
$iso:1,
$aso:function(){return[P.n]},
$ism:1,
$asm:function(){return[P.n]},
"%":"Int16Array"},
l_:{"^":"ah;",
k:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
return a[b]},
$iso:1,
$aso:function(){return[P.n]},
$ism:1,
$asm:function(){return[P.n]},
"%":"Int32Array"},
l0:{"^":"ah;",
k:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
return a[b]},
$iso:1,
$aso:function(){return[P.n]},
$ism:1,
$asm:function(){return[P.n]},
"%":"Int8Array"},
l1:{"^":"ah;",
k:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
return a[b]},
$iso:1,
$aso:function(){return[P.n]},
$ism:1,
$asm:function(){return[P.n]},
"%":"Uint16Array"},
l2:{"^":"ah;",
k:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
return a[b]},
$iso:1,
$aso:function(){return[P.n]},
$ism:1,
$asm:function(){return[P.n]},
"%":"Uint32Array"},
l3:{"^":"ah;",
gw:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
return a[b]},
$iso:1,
$aso:function(){return[P.n]},
$ism:1,
$asm:function(){return[P.n]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
l4:{"^":"ah;",
gw:function(a){return a.length},
k:function(a,b){if(b>>>0!==b||b>=a.length)H.y(H.E(a,b))
return a[b]},
$iso:1,
$aso:function(){return[P.n]},
$ism:1,
$asm:function(){return[P.n]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
iJ:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.jJ()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aG(new P.iL(z),1)).observe(y,{childList:true})
return new P.iK(z,y,x)}else if(self.setImmediate!=null)return P.jK()
return P.jL()},
lt:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aG(new P.iM(a),0))},"$1","jJ",2,0,3],
lu:[function(a){++init.globalState.f.b
self.setImmediate(H.aG(new P.iN(a),0))},"$1","jK",2,0,3],
lv:[function(a){P.cI(C.z,a)},"$1","jL",2,0,3],
eJ:function(a,b){var z=H.bi()
if(H.aF(z,[z,z]).aB(a)){b.toString
return a}else{b.toString
return a}},
jE:function(){var z,y
for(;z=$.aD,z!=null;){$.aT=null
y=z.b
$.aD=y
if(y==null)$.aS=null
z.a.$0()}},
lC:[function(){$.cS=!0
try{P.jE()}finally{$.aT=null
$.cS=!1
if($.aD!=null)$.$get$cL().$1(P.eQ())}},"$0","eQ",0,0,1],
eN:function(a){var z=new P.eA(a,null)
if($.aD==null){$.aS=z
$.aD=z
if(!$.cS)$.$get$cL().$1(P.eQ())}else{$.aS.b=z
$.aS=z}},
jG:function(a){var z,y,x
z=$.aD
if(z==null){P.eN(a)
$.aT=$.aS
return}y=new P.eA(a,null)
x=$.aT
if(x==null){y.b=z
$.aT=y
$.aD=y}else{y.b=x.b
x.b=y
$.aT=y
if(y.b==null)$.aS=y}},
f4:function(a){var z=$.w
if(C.e===z){P.aU(null,null,C.e,a)
return}z.toString
P.aU(null,null,z,z.cc(a,!0))},
jz:function(a,b,c){$.w.toString
a.bP(b,c)},
iv:function(a,b){var z=$.w
if(z===C.e){z.toString
return P.cI(a,b)}return P.cI(a,z.cc(b,!0))},
cI:function(a,b){var z=C.c.aC(a.a,1000)
return H.is(z<0?0:z,b)},
iI:function(){return $.w},
bg:function(a,b,c,d,e){var z={}
z.a=d
P.jG(new P.jF(z,e))},
eK:function(a,b,c,d){var z,y
y=$.w
if(y===c)return d.$0()
$.w=c
z=y
try{y=d.$0()
return y}finally{$.w=z}},
eM:function(a,b,c,d,e){var z,y
y=$.w
if(y===c)return d.$1(e)
$.w=c
z=y
try{y=d.$1(e)
return y}finally{$.w=z}},
eL:function(a,b,c,d,e,f){var z,y
y=$.w
if(y===c)return d.$2(e,f)
$.w=c
z=y
try{y=d.$2(e,f)
return y}finally{$.w=z}},
aU:function(a,b,c,d){var z=C.e!==c
if(z)d=c.cc(d,!(!z||!1))
P.eN(d)},
iL:{"^":"l:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
iK:{"^":"l:10;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
iM:{"^":"l:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
iN:{"^":"l:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
at:{"^":"d;$ti"},
eF:{"^":"d;c7:a<,b,c,d,e",
gh4:function(){return this.b.b},
gdP:function(){return(this.c&1)!==0},
ghU:function(){return(this.c&2)!==0},
gdO:function(){return this.c===8},
hS:function(a){return this.b.b.cB(this.d,a)},
i6:function(a){if(this.c!==6)return!0
return this.b.b.cB(this.d,J.aY(a))},
hO:function(a){var z,y,x,w
z=this.e
y=H.bi()
x=J.f(a)
w=this.b.b
if(H.aF(y,[y,y]).aB(z))return w.ir(z,x.gaG(a),a.gaw())
else return w.cB(z,x.gaG(a))},
hT:function(){return this.b.b.eb(this.d)}},
aA:{"^":"d;bv:a<,b,fY:c<,$ti",
gfS:function(){return this.a===2},
gc1:function(){return this.a>=4},
ee:function(a,b){var z,y
z=$.w
if(z!==C.e){z.toString
if(b!=null)b=P.eJ(b,z)}y=new P.aA(0,z,null,[null])
this.bQ(new P.eF(null,y,b==null?1:3,a,b))
return y},
iw:function(a){return this.ee(a,null)},
el:function(a){var z,y
z=$.w
y=new P.aA(0,z,null,this.$ti)
if(z!==C.e)z.toString
this.bQ(new P.eF(null,y,8,a,null))
return y},
bQ:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gc1()){y.bQ(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.aU(null,null,z,new P.j_(this,a))}},
dk:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gc7()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gc1()){v.dk(a)
return}this.a=v.a
this.c=v.c}z.a=this.bu(a)
y=this.b
y.toString
P.aU(null,null,y,new P.j6(z,this))}},
bt:function(){var z=this.c
this.c=null
return this.bu(z)},
bu:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gc7()
z.a=y}return y},
bV:function(a){var z
if(!!J.u(a).$isat)P.bS(a,this)
else{z=this.bt()
this.a=4
this.c=a
P.aB(this,z)}},
bW:[function(a,b){var z=this.bt()
this.a=8
this.c=new P.bk(a,b)
P.aB(this,z)},function(a){return this.bW(a,null)},"iM","$2","$1","gd2",2,2,11,0],
fA:function(a){var z
if(!!J.u(a).$isat){if(a.a===8){this.a=1
z=this.b
z.toString
P.aU(null,null,z,new P.j0(this,a))}else P.bS(a,this)
return}this.a=1
z=this.b
z.toString
P.aU(null,null,z,new P.j1(this,a))},
ft:function(a,b){this.fA(a)},
$isat:1,
u:{
j2:function(a,b){var z,y,x,w
b.a=1
try{a.ee(new P.j3(b),new P.j4(b))}catch(x){w=H.a_(x)
z=w
y=H.X(x)
P.f4(new P.j5(b,z,y))}},
bS:function(a,b){var z,y,x
for(;a.gfS();)a=a.c
z=a.gc1()
y=b.c
if(z){b.c=null
x=b.bu(y)
b.a=a.a
b.c=a.c
P.aB(b,x)}else{b.a=2
b.c=a
a.dk(y)}},
aB:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
z=y.b
y=J.aY(v)
x=v.gaw()
z.toString
P.bg(null,null,z,y,x)}return}for(;b.gc7()!=null;b=u){u=b.a
b.a=null
P.aB(z.a,b)}t=z.a.c
x.a=w
x.b=t
y=!w
if(!y||b.gdP()||b.gdO()){s=b.gh4()
if(w){r=z.a.b
r.toString
r=r==null?s==null:r===s
if(!r)s.toString
else r=!0
r=!r}else r=!1
if(r){y=z.a
v=y.c
y=y.b
x=J.aY(v)
r=v.gaw()
y.toString
P.bg(null,null,y,x,r)
return}q=$.w
if(q==null?s!=null:q!==s)$.w=s
else q=null
if(b.gdO())new P.j9(z,x,w,b).$0()
else if(y){if(b.gdP())new P.j8(x,b,t).$0()}else if(b.ghU())new P.j7(z,x,b).$0()
if(q!=null)$.w=q
y=x.b
r=J.u(y)
if(!!r.$isat){p=b.b
if(!!r.$isaA)if(y.a>=4){o=p.c
p.c=null
b=p.bu(o)
p.a=y.a
p.c=y.c
z.a=y
continue}else P.bS(y,p)
else P.j2(y,p)
return}}p=b.b
b=p.bt()
y=x.a
x=x.b
if(!y){p.a=4
p.c=x}else{p.a=8
p.c=x}z.a=p
y=p}}}},
j_:{"^":"l:0;a,b",
$0:function(){P.aB(this.a,this.b)}},
j6:{"^":"l:0;a,b",
$0:function(){P.aB(this.b,this.a.a)}},
j3:{"^":"l:2;a",
$1:function(a){var z=this.a
z.a=0
z.bV(a)}},
j4:{"^":"l:12;a",
$2:function(a,b){this.a.bW(a,b)},
$1:function(a){return this.$2(a,null)}},
j5:{"^":"l:0;a,b,c",
$0:function(){this.a.bW(this.b,this.c)}},
j0:{"^":"l:0;a,b",
$0:function(){P.bS(this.b,this.a)}},
j1:{"^":"l:0;a,b",
$0:function(){var z,y
z=this.a
y=z.bt()
z.a=4
z.c=this.b
P.aB(z,y)}},
j9:{"^":"l:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.hT()}catch(w){v=H.a_(w)
y=v
x=H.X(w)
if(this.c){v=J.aY(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.bk(y,x)
u.a=!0
return}if(!!J.u(z).$isat){if(z instanceof P.aA&&z.gbv()>=4){if(z.gbv()===8){v=this.b
v.b=z.gfY()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.iw(new P.ja(t))
v.a=!1}}},
ja:{"^":"l:2;a",
$1:function(a){return this.a}},
j8:{"^":"l:1;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.hS(this.c)}catch(x){w=H.a_(x)
z=w
y=H.X(x)
w=this.a
w.b=new P.bk(z,y)
w.a=!0}}},
j7:{"^":"l:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.i6(z)===!0&&w.e!=null){v=this.b
v.b=w.hO(z)
v.a=!1}}catch(u){w=H.a_(u)
y=w
x=H.X(u)
w=this.a
v=J.aY(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.bk(y,x)
s.a=!0}}},
eA:{"^":"d;a,b"},
ak:{"^":"d;$ti",
aI:function(a,b){return new P.jl(b,this,[H.F(this,"ak",0),null])},
gw:function(a){var z,y
z={}
y=new P.aA(0,$.w,null,[P.n])
z.a=0
this.bb(new P.ig(z),!0,new P.ih(z,y),y.gd2())
return y},
bH:function(a){var z,y,x
z=H.F(this,"ak",0)
y=H.k([],[z])
x=new P.aA(0,$.w,null,[[P.o,z]])
this.bb(new P.ii(this,y),!0,new P.ij(y,x),x.gd2())
return x},
ai:function(a,b){return new P.jv(b,this,[H.F(this,"ak",0)])}},
ig:{"^":"l:2;a",
$1:function(a){++this.a.a}},
ih:{"^":"l:0;a,b",
$0:function(){this.b.bV(this.a.a)}},
ii:{"^":"l;a,b",
$1:function(a){this.b.push(a)},
$signature:function(){return H.eT(function(a){return{func:1,args:[a]}},this.a,"ak")}},
ij:{"^":"l:0;a,b",
$0:function(){this.b.bV(this.a)}},
ie:{"^":"d;"},
lx:{"^":"d;"},
iO:{"^":"d;bv:e<",
cv:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.dC()
if((z&4)===0&&(this.e&32)===0)this.da(this.gdg())},
e2:function(a){return this.cv(a,null)},
ea:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gar(z)}else z=!1
if(z)this.r.bK(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.da(this.gdi())}}}},
dB:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.bS()
z=this.f
return z==null?$.$get$bz():z},
bS:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.dC()
if((this.e&32)===0)this.r=null
this.f=this.df()},
bo:["f5",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.dq(a)
else this.bR(new P.iS(a,null,[null]))}],
bP:["f6",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ds(a,b)
else this.bR(new P.iU(a,b,null))}],
fw:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.dr()
else this.bR(C.M)},
dh:[function(){},"$0","gdg",0,0,1],
dj:[function(){},"$0","gdi",0,0,1],
df:function(){return},
bR:function(a){var z,y
z=this.r
if(z==null){z=new P.jx(null,null,0,[null])
this.r=z}z.C(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bK(this)}},
dq:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cC(this.a,a)
this.e=(this.e&4294967263)>>>0
this.bT((z&4)!==0)},
ds:function(a,b){var z,y,x
z=this.e
y=new P.iQ(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.bS()
z=this.f
if(!!J.u(z).$isat){x=$.$get$bz()
x=z==null?x!=null:z!==x}else x=!1
if(x)z.el(y)
else y.$0()}else{y.$0()
this.bT((z&4)!==0)}},
dr:function(){var z,y,x
z=new P.iP(this)
this.bS()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.u(y).$isat){x=$.$get$bz()
x=y==null?x!=null:y!==x}else x=!1
if(x)y.el(z)
else z.$0()},
da:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.bT((z&4)!==0)},
bT:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gar(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gar(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.dh()
else this.dj()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bK(this)},
cS:function(a,b,c,d){var z=this.d
z.toString
this.a=a
this.b=P.eJ(b,z)
this.c=c}},
iQ:{"^":"l:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aF(H.bi(),[H.eS(P.d),H.eS(P.ba)]).aB(y)
w=z.d
v=this.b
u=z.b
if(x)w.is(u,v,this.c)
else w.cC(u,v)
z.e=(z.e&4294967263)>>>0}},
iP:{"^":"l:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.ec(z.c)
z.e=(z.e&4294967263)>>>0}},
eD:{"^":"d;aY:a@"},
iS:{"^":"eD;b,a,$ti",
cw:function(a){a.dq(this.b)}},
iU:{"^":"eD;aG:b>,aw:c<,a",
cw:function(a){a.ds(this.b,this.c)}},
iT:{"^":"d;",
cw:function(a){a.dr()},
gaY:function(){return},
saY:function(a){throw H.i(new P.cE("No events after a done."))}},
jn:{"^":"d;bv:a<",
bK:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.f4(new P.jo(this,a))
this.a=1},
dC:function(){if(this.a===1)this.a=3}},
jo:{"^":"l:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.gaY()
z.b=w
if(w==null)z.c=null
x.cw(this.b)}},
jx:{"^":"jn;b,c,a,$ti",
gar:function(a){return this.c==null},
C:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.saY(b)
this.c=b}}},
bd:{"^":"ak;$ti",
bb:function(a,b,c,d){return this.d3(a,d,c,!0===b)},
dX:function(a,b,c){return this.bb(a,null,b,c)},
d3:function(a,b,c,d){return P.iZ(this,a,b,c,d,H.F(this,"bd",0),H.F(this,"bd",1))},
c_:function(a,b){b.bo(a)},
fQ:function(a,b,c){c.bP(a,b)},
$asak:function(a,b){return[b]}},
bR:{"^":"iO;x,y,a,b,c,d,e,f,r,$ti",
bo:function(a){if((this.e&2)!==0)return
this.f5(a)},
bP:function(a,b){if((this.e&2)!==0)return
this.f6(a,b)},
dh:[function(){var z=this.y
if(z==null)return
z.e2(0)},"$0","gdg",0,0,1],
dj:[function(){var z=this.y
if(z==null)return
z.ea()},"$0","gdi",0,0,1],
df:function(){var z=this.y
if(z!=null){this.y=null
return z.dB()}return},
iP:[function(a){this.x.c_(a,this)},"$1","gfN",2,0,function(){return H.eT(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"bR")}],
iR:[function(a,b){this.x.fQ(a,b,this)},"$2","gfP",4,0,13],
iQ:[function(){this.fw()},"$0","gfO",0,0,1],
cT:function(a,b,c,d,e,f,g){this.y=this.x.a.dX(this.gfN(),this.gfO(),this.gfP())},
u:{
iZ:function(a,b,c,d,e,f,g){var z,y
z=$.w
y=e?1:0
y=new P.bR(a,null,null,null,null,z,y,null,null,[f,g])
y.cS(b,c,d,e)
y.cT(a,b,c,d,e,f,g)
return y}}},
jl:{"^":"bd;b,a,$ti",
c_:function(a,b){var z,y,x,w,v
z=null
try{z=this.b.$1(a)}catch(w){v=H.a_(w)
y=v
x=H.X(w)
P.jz(b,y,x)
return}b.bo(z)}},
jw:{"^":"bR;z,x,y,a,b,c,d,e,f,r,$ti",
gfz:function(){return this.z},
$asbR:function(a){return[a,a]}},
jv:{"^":"bd;b,a,$ti",
d3:function(a,b,c,d){var z,y,x
z=H.Y(this,0)
y=$.w
x=d?1:0
x=new P.jw(this.b,this,null,null,null,null,y,x,null,null,this.$ti)
x.cS(a,b,c,d)
x.cT(this,a,b,c,d,z,z)
return x},
c_:function(a,b){var z=b.gfz()
if(z>0){b.z=z-1
return}b.bo(a)},
$asbd:function(a){return[a,a]},
$asak:null},
bk:{"^":"d;aG:a>,aw:b<",
l:function(a){return H.h(this.a)},
$isG:1},
jy:{"^":"d;"},
jF:{"^":"l:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.dV()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.i(z)
x=H.i(z)
x.stack=J.ao(y)
throw x}},
jq:{"^":"jy;",
gU:function(a){return},
ec:function(a){var z,y,x,w
try{if(C.e===$.w){x=a.$0()
return x}x=P.eK(null,null,this,a)
return x}catch(w){x=H.a_(w)
z=x
y=H.X(w)
return P.bg(null,null,this,z,y)}},
cC:function(a,b){var z,y,x,w
try{if(C.e===$.w){x=a.$1(b)
return x}x=P.eM(null,null,this,a,b)
return x}catch(w){x=H.a_(w)
z=x
y=H.X(w)
return P.bg(null,null,this,z,y)}},
is:function(a,b,c){var z,y,x,w
try{if(C.e===$.w){x=a.$2(b,c)
return x}x=P.eL(null,null,this,a,b,c)
return x}catch(w){x=H.a_(w)
z=x
y=H.X(w)
return P.bg(null,null,this,z,y)}},
cc:function(a,b){if(b)return new P.jr(this,a)
else return new P.js(this,a)},
h8:function(a,b){return new P.jt(this,a)},
k:function(a,b){return},
eb:function(a){if($.w===C.e)return a.$0()
return P.eK(null,null,this,a)},
cB:function(a,b){if($.w===C.e)return a.$1(b)
return P.eM(null,null,this,a,b)},
ir:function(a,b,c){if($.w===C.e)return a.$2(b,c)
return P.eL(null,null,this,a,b,c)}},
jr:{"^":"l:0;a,b",
$0:function(){return this.a.ec(this.b)}},
js:{"^":"l:0;a,b",
$0:function(){return this.a.eb(this.b)}},
jt:{"^":"l:2;a,b",
$1:function(a){return this.a.cC(this.b,a)}}}],["","",,P,{"^":"",
hn:function(){return new H.ag(0,null,null,null,null,null,0,[null,null])},
aL:function(a){return H.eV(a,new H.ag(0,null,null,null,null,null,0,[null,null]))},
b1:function(a,b,c,d,e){return new P.jc(0,null,null,null,null,[d,e])},
hc:function(a,b,c){var z,y
if(P.cT(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$aV()
y.push(a)
try{P.jC(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.e9(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
bB:function(a,b,c){var z,y,x
if(P.cT(a))return b+"..."+c
z=new P.cG(b)
y=$.$get$aV()
y.push(a)
try{x=z
x.a=P.e9(x.gaQ(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.a=y.gaQ()+c
y=z.gaQ()
return y.charCodeAt(0)==0?y:y},
cT:function(a){var z,y
for(z=0;y=$.$get$aV(),z<y.length;++z)if(a===y[z])return!0
return!1},
jC:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.ga4(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.J())return
w=H.h(z.gO())
b.push(w)
y+=w.length+2;++x}if(!z.J()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gO();++x
if(!z.J()){if(x<=4){b.push(H.h(t))
return}v=H.h(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gO();++x
for(;z.J();t=s,s=r){r=z.gO();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.h(t)
v=H.h(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
aM:function(a,b,c,d){return new P.jf(0,null,null,null,null,null,0,[d])},
dO:function(a){var z,y,x
z={}
if(P.cT(a))return"{...}"
y=new P.cG("")
try{$.$get$aV().push(a)
x=y
x.a=x.gaQ()+"{"
z.a=!0
a.bD(0,new P.hr(z,y))
z=y
z.a=z.gaQ()+"}"}finally{z=$.$get$aV()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.gaQ()
return z.charCodeAt(0)==0?z:z},
jc:{"^":"d;a,b,c,d,e,$ti",
gw:function(a){return this.a},
k:function(a,b){var z,y,x,w
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)y=null
else{x=z[b]
y=x===z?null:x}return y}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)y=null
else{x=w[b]
y=x===w?null:x}return y}else return this.fL(b)},
fL:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.az(a)]
x=this.aA(y,a)
return x<0?null:y[x+1]},
q:function(a,b,c){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cN()
this.b=z}this.d_(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cN()
this.c=y}this.d_(y,b,c)}else this.fZ(b,c)},
fZ:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=P.cN()
this.d=z}y=this.az(a)
x=z[y]
if(x==null){P.cO(z,y,[a,b]);++this.a
this.e=null}else{w=this.aA(x,a)
if(w>=0)x[w+1]=b
else{x.push(a,b);++this.a
this.e=null}}},
bD:function(a,b){var z,y,x,w
z=this.fG()
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.k(0,w))
if(z!==this.e)throw H.i(new P.aa(this))}},
fG:function(){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.e
if(z!=null)return z
y=new Array(this.a)
y.fixed$length=Array
x=this.b
if(x!=null){w=Object.getOwnPropertyNames(x)
v=w.length
for(u=0,t=0;t<v;++t){y[u]=w[t];++u}}else u=0
s=this.c
if(s!=null){w=Object.getOwnPropertyNames(s)
v=w.length
for(t=0;t<v;++t){y[u]=+w[t];++u}}r=this.d
if(r!=null){w=Object.getOwnPropertyNames(r)
v=w.length
for(t=0;t<v;++t){q=r[w[t]]
p=q.length
for(o=0;o<p;o+=2){y[u]=q[o];++u}}}this.e=y
return y},
d_:function(a,b,c){if(a[b]==null){++this.a
this.e=null}P.cO(a,b,c)},
az:function(a){return J.aZ(a)&0x3ffffff},
aA:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;y+=2)if(J.z(a[y],b))return y
return-1},
u:{
cO:function(a,b,c){if(c==null)a[b]=a
else a[b]=c},
cN:function(){var z=Object.create(null)
P.cO(z,"<non-identifier-key>",z)
delete z["<non-identifier-key>"]
return z}}},
eH:{"^":"ag;a,b,c,d,e,f,r,$ti",
b7:function(a){return H.k5(a)&0x3ffffff},
b8:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gdQ()
if(x==null?b==null:x===b)return y}return-1},
u:{
aR:function(a,b){return new P.eH(0,null,null,null,null,null,0,[a,b])}}},
jf:{"^":"jd;a,b,c,d,e,f,r,$ti",
ga4:function(a){var z=new P.eG(this,this.r,null,null)
z.c=this.e
return z},
gw:function(a){return this.a},
hm:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.fH(b)},
fH:function(a){var z=this.d
if(z==null)return!1
return this.aA(z[this.az(a)],a)>=0},
dZ:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.hm(0,a)?a:null
else return this.fT(a)},
fT:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.az(a)]
x=this.aA(y,a)
if(x<0)return
return J.fb(y,x).gd5()},
C:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.cQ()
this.b=z}return this.cZ(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.cQ()
this.c=y}return this.cZ(y,b)}else return this.ao(b)},
ao:function(a){var z,y,x
z=this.d
if(z==null){z=P.cQ()
this.d=z}y=this.az(a)
x=z[y]
if(x==null)z[y]=[this.bU(a)]
else{if(this.aA(x,a)>=0)return!1
x.push(this.bU(a))}return!0},
be:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.d0(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.d0(this.c,b)
else return this.fV(b)},
fV:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.az(a)]
x=this.aA(y,a)
if(x<0)return!1
this.d1(y.splice(x,1)[0])
return!0},
aT:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
cZ:function(a,b){if(a[b]!=null)return!1
a[b]=this.bU(b)
return!0},
d0:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.d1(z)
delete a[b]
return!0},
bU:function(a){var z,y
z=new P.jg(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
d1:function(a){var z,y
z=a.gfF()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
az:function(a){return J.aZ(a)&0x3ffffff},
aA:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.z(a[y].gd5(),b))return y
return-1},
$ism:1,
$asm:null,
u:{
cQ:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
jg:{"^":"d;d5:a<,b,fF:c<"},
eG:{"^":"d;a,b,c,d",
gO:function(){return this.d},
J:function(){var z=this.a
if(this.b!==z.r)throw H.i(new P.aa(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
jd:{"^":"i6;$ti"},
co:{"^":"d;$ti",
ga4:function(a){return new H.dL(a,this.gw(a),0,null)},
al:function(a,b){return this.k(a,b)},
aI:function(a,b){return new H.cr(a,b,[null,null])},
hM:function(a,b,c){var z,y,x,w,v
z=this.gw(a)
for(y=a.length,x=z!==y,w=b,v=0;v<z;++v){if(v>=y)return H.a(a,v)
w=c.$2(w,a[v])
if(x)throw H.i(new P.aa(a))}return w},
ai:function(a,b){return H.bb(a,b,null,H.F(a,"co",0))},
l:function(a){return P.bB(a,"[","]")},
$iso:1,
$aso:null,
$ism:1,
$asm:null},
hr:{"^":"l:4;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.h(a)
z.a=y+": "
z.a+=H.h(b)}},
ho:{"^":"aw;a,b,c,d,$ti",
ga4:function(a){return new P.jh(this,this.c,this.d,this.b,null)},
gar:function(a){return this.b===this.c},
gw:function(a){return(this.c-this.b&this.a.length-1)>>>0},
al:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.y(P.bA(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.a(y,w)
return y[w]},
aT:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
l:function(a){return P.bB(this,"{","}")},
e5:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.i(H.dG());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ao:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.a(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.d9();++this.d},
d9:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.k(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.d.Y(y,0,w,z,x)
C.d.Y(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
fi:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.k(z,[b])},
$asm:null,
u:{
cp:function(a,b){var z=new P.ho(null,0,0,0,[b])
z.fi(a,b)
return z}}},
jh:{"^":"d;a,b,c,d,e",
gO:function(){return this.e},
J:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.y(new P.aa(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
i7:{"^":"d;$ti",
aI:function(a,b){return new H.dv(this,b,[H.Y(this,0),null])},
l:function(a){return P.bB(this,"{","}")},
ai:function(a,b){return H.e6(this,b,H.Y(this,0))},
$ism:1,
$asm:null},
i6:{"^":"i7;$ti"}}],["","",,P,{"^":"",
kl:[function(a,b){return J.fg(a,b)},"$2","jP",4,0,16],
dy:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.ao(a)
if(typeof a==="string")return JSON.stringify(a)
return P.fY(a)},
fY:function(a){var z=J.u(a)
if(!!z.$isl)return z.l(a)
return H.bI(a)},
bx:function(a){return new P.iY(a)},
ax:function(a,b,c,d){var z,y,x
z=J.he(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
bD:function(a,b,c){var z,y
z=H.k([],[c])
for(y=J.bj(a);y.J();)z.push(y.gO())
if(b)return z
z.fixed$length=Array
return z},
c0:function(a){var z=H.h(a)
H.k6(z)},
jM:{"^":"d;"},
"+bool":0,
C:{"^":"d;"},
fH:{"^":"d;",$isC:1,
$asC:function(){return[P.fH]}},
R:{"^":"Z;",$isC:1,
$asC:function(){return[P.Z]}},
"+double":0,
ae:{"^":"d;aR:a<",
p:function(a,b){return new P.ae(this.a+b.gaR())},
n:function(a,b){return new P.ae(this.a-b.gaR())},
m:function(a,b){return new P.ae(C.c.iq(this.a*b))},
bO:function(a,b){if(b===0)throw H.i(new P.h2())
if(typeof b!=="number")return H.e(b)
return new P.ae(C.c.bO(this.a,b))},
S:function(a,b){return this.a<b.gaR()},
Z:function(a,b){return C.c.Z(this.a,b.gaR())},
bj:function(a,b){return C.c.bj(this.a,b.gaR())},
G:function(a,b){if(b==null)return!1
if(!(b instanceof P.ae))return!1
return this.a===b.a},
gT:function(a){return this.a&0x1FFFFFFF},
aU:function(a,b){return C.c.aU(this.a,b.gaR())},
l:function(a){var z,y,x,w,v
z=new P.fR()
y=this.a
if(y<0)return"-"+new P.ae(-y).l(0)
x=z.$1(C.c.cA(C.c.aC(y,6e7),60))
w=z.$1(C.c.cA(C.c.aC(y,1e6),60))
v=new P.fQ().$1(C.c.cA(y,1e6))
return""+C.c.aC(y,36e8)+":"+H.h(x)+":"+H.h(w)+"."+H.h(v)},
$isC:1,
$asC:function(){return[P.ae]}},
fQ:{"^":"l:5;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
fR:{"^":"l:5;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
G:{"^":"d;",
gaw:function(){return H.X(this.$thrownJsError)}},
dV:{"^":"G;",
l:function(a){return"Throw of null."}},
ap:{"^":"G;a,b,c,d",
gbY:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gbX:function(){return""},
l:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+H.h(z)+")":""
z=this.d
x=z==null?"":": "+H.h(z)
w=this.gbY()+y+x
if(!this.a)return w
v=this.gbX()
u=P.dy(this.b)
return w+v+": "+H.h(u)},
u:{
aq:function(a){return new P.ap(!1,null,null,a)},
cb:function(a,b,c){return new P.ap(!0,a,b,c)}}},
e_:{"^":"ap;e,f,a,b,c,d",
gbY:function(){return"RangeError"},
gbX:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.h(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.h(z)
else{if(typeof x!=="number")return x.Z()
if(typeof z!=="number")return H.e(z)
if(x>z)y=": Not in range "+z+".."+x+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+z}}return y},
u:{
bJ:function(a,b,c){return new P.e_(null,null,!0,a,b,"Value not in range")},
aj:function(a,b,c,d,e){return new P.e_(b,c,!0,a,d,"Invalid value")},
cA:function(a,b,c,d,e,f){if(0>a||a>c)throw H.i(P.aj(a,0,c,"start",f))
if(a>b||b>c)throw H.i(P.aj(b,a,c,"end",f))
return b}}},
h1:{"^":"ap;e,w:f>,a,b,c,d",
gbY:function(){return"RangeError"},
gbX:function(){if(J.a3(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.h(z)},
u:{
bA:function(a,b,c,d,e){var z=e!=null?e:J.a9(b)
return new P.h1(b,z,!0,a,c,"Index out of range")}}},
W:{"^":"G;a",
l:function(a){return"Unsupported operation: "+this.a}},
ev:{"^":"G;a",
l:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.h(z):"UnimplementedError"}},
cE:{"^":"G;a",
l:function(a){return"Bad state: "+this.a}},
aa:{"^":"G;a",
l:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.h(P.dy(z))+"."}},
hJ:{"^":"d;",
l:function(a){return"Out of Memory"},
gaw:function(){return},
$isG:1},
e8:{"^":"d;",
l:function(a){return"Stack Overflow"},
gaw:function(){return},
$isG:1},
fG:{"^":"G;a",
l:function(a){return"Reading static variable '"+this.a+"' during its initialization"}},
iY:{"^":"d;a",
l:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.h(z)}},
h2:{"^":"d;",
l:function(a){return"IntegerDivisionByZeroException"}},
fZ:{"^":"d;a,b",
l:function(a){return"Expando:"+H.h(this.a)},
k:function(a,b){var z,y
z=this.b
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.y(P.cb(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.cy(b,"expando$values")
return y==null?null:H.cy(y,z)},
q:function(a,b,c){var z,y
z=this.b
if(typeof z!=="string")z.set(b,c)
else{y=H.cy(b,"expando$values")
if(y==null){y=new P.d()
H.dZ(b,"expando$values",y)}H.dZ(y,z,c)}}},
n:{"^":"Z;",$isC:1,
$asC:function(){return[P.Z]}},
"+int":0,
U:{"^":"d;$ti",
aI:function(a,b){return H.bE(this,b,H.F(this,"U",0),null)},
aJ:function(a,b){return P.bD(this,b,H.F(this,"U",0))},
bH:function(a){return this.aJ(a,!0)},
gw:function(a){var z,y
z=this.ga4(this)
for(y=0;z.J();)++y
return y},
ai:function(a,b){return H.e6(this,b,H.F(this,"U",0))},
al:function(a,b){var z,y,x
if(b<0)H.y(P.aj(b,0,null,"index",null))
for(z=this.ga4(this),y=0;z.J();){x=z.gO()
if(b===y)return x;++y}throw H.i(P.bA(b,this,"index",null,y))},
l:function(a){return P.hc(this,"(",")")}},
dH:{"^":"d;"},
o:{"^":"d;$ti",$aso:null,$ism:1,$asm:null},
"+List":0,
l6:{"^":"d;",
l:function(a){return"null"}},
"+Null":0,
Z:{"^":"d;",$isC:1,
$asC:function(){return[P.Z]}},
"+num":0,
d:{"^":";",
G:function(a,b){return this===b},
gT:function(a){return H.ai(this)},
l:function(a){return H.bI(this)},
toString:function(){return this.l(this)}},
ba:{"^":"d;"},
cF:{"^":"d;a,b",
bN:function(a){if(this.b!=null){this.a=J.p(this.a,J.r($.D.$0(),this.b))
this.b=null}}},
al:{"^":"d;",$isC:1,
$asC:function(){return[P.al]}},
"+String":0,
cG:{"^":"d;aQ:a<",
gw:function(a){return this.a.length},
l:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
u:{
e9:function(a,b,c){var z=J.bj(b)
if(!z.J())return a
if(c.length===0){do a+=H.h(z.gO())
while(z.J())}else{a+=H.h(z.gO())
for(;z.J();)a=a+c+H.h(z.gO())}return a}}}}],["","",,W,{"^":"",
dd:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,C.V)},
jB:function(a){if(a==null)return
return W.eC(a)},
bh:function(a){var z=$.w
if(z===C.e)return a
return z.h8(a,!0)},
J:{"^":"dw;","%":"HTMLAppletElement|HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement|PluginPlaceholderElement;HTMLElement"},
kd:{"^":"J;",
l:function(a){return String(a)},
$isj:1,
"%":"HTMLAnchorElement"},
kf:{"^":"J;",
l:function(a){return String(a)},
$isj:1,
"%":"HTMLAreaElement"},
kg:{"^":"J;",$isj:1,"%":"HTMLBodyElement"},
kh:{"^":"J;t:height%,aK:width}",
ep:function(a,b,c){return a.getContext(b)},
eo:function(a,b){return this.ep(a,b,null)},
"%":"HTMLCanvasElement"},
ki:{"^":"j;hH:fillStyle}",
hd:function(a,b,c,d,e){return a.clearRect(b,c,d,e)},
hG:function(a,b,c,d,e){return a.fillRect(b,c,d,e)},
io:function(a){return a.restore()},
ip:function(a,b){return a.rotate(b)},
eu:function(a){return a.save()},
ev:function(a,b,c){return a.scale(b,c)},
iz:function(a,b,c){return a.translate(b,c)},
"%":"CanvasRenderingContext2D"},
kj:{"^":"b7;w:length=",$isj:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
km:{"^":"h3;w:length=",
er:function(a,b){var z=this.fM(a,b)
return z!=null?z:""},
fM:function(a,b){if(W.dd(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.dk()+b)},
fC:function(a,b){var z,y
z=$.$get$de()
y=z[b]
if(typeof y==="string")return y
y=W.dd(b) in a?b:P.dk()+b
z[b]=y
return y},
h_:function(a,b,c,d){a.setProperty(b,c,d)},
gt:function(a){return a.height},
st:function(a,b){a.height=b},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
h3:{"^":"j+fF;"},
fF:{"^":"d;",
gt:function(a){return this.er(a,"height")},
st:function(a,b){this.h_(a,this.fC(a,"height"),b,"")}},
fP:{"^":"b7;","%":"XMLDocument;Document"},
kn:{"^":"b7;",$isj:1,"%":"DocumentFragment|ShadowRoot"},
ko:{"^":"j;",
l:function(a){return String(a)},
"%":"DOMException"},
dw:{"^":"b7;a3:id=",
l:function(a){return a.localName},
ge0:function(a){return new W.bQ(a,"mousedown",!1,[W.b6])},
ge1:function(a){return new W.bQ(a,"mouseup",!1,[W.b6])},
$isj:1,
"%":";Element"},
kp:{"^":"J;t:height%,aK:width}","%":"HTMLEmbedElement"},
kq:{"^":"bw;aG:error=","%":"ErrorEvent"},
bw:{"^":"j;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CrossOriginConnectEvent|CustomEvent|DefaultSessionStartEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PeriodicSyncEvent|PopStateEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|WebGLContextEvent|WebKitTransitionEvent|XMLHttpRequestProgressEvent;Event|InputEvent"},
cj:{"^":"j;",
fv:function(a,b,c,d){return a.addEventListener(b,H.aG(c,1),!1)},
fW:function(a,b,c,d){return a.removeEventListener(b,H.aG(c,1),!1)},
"%":";EventTarget"},
kL:{"^":"J;w:length=","%":"HTMLFormElement"},
kN:{"^":"bw;a3:id=","%":"GeofencingEvent"},
kO:{"^":"fP;b1:body=","%":"HTMLDocument"},
kP:{"^":"J;t:height%,aK:width}","%":"HTMLIFrameElement"},
kQ:{"^":"J;t:height%,aK:width}","%":"HTMLImageElement"},
kS:{"^":"J;t:height%,aK:width}",$isj:1,"%":"HTMLInputElement"},
ht:{"^":"J;aG:error=","%":"HTMLAudioElement;HTMLMediaElement"},
kX:{"^":"cj;a3:id=","%":"MediaStream"},
b6:{"^":"iy;","%":"WheelEvent;DragEvent|MouseEvent"},
l5:{"^":"j;",$isj:1,"%":"Navigator"},
b7:{"^":"cj;U:parentElement=",
l:function(a){var z=a.nodeValue
return z==null?this.f3(a):z},
"%":"Attr;Node"},
l7:{"^":"J;t:height%,aK:width}","%":"HTMLObjectElement"},
l8:{"^":"J;L:index=","%":"HTMLOptionElement"},
le:{"^":"b6;t:height=","%":"PointerEvent"},
lj:{"^":"J;w:length=","%":"HTMLSelectElement"},
lk:{"^":"bw;aG:error=","%":"SpeechRecognitionError"},
iy:{"^":"bw;","%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent|TouchEvent;UIEvent"},
lq:{"^":"ht;t:height%,aK:width}","%":"HTMLVideoElement"},
iC:{"^":"cj;",
dm:function(a,b){return a.requestAnimationFrame(H.aG(b,1))},
d6:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
gU:function(a){return W.jB(a.parent)},
$isj:1,
"%":"DOMWindow|Window"},
lw:{"^":"b7;",$isj:1,"%":"DocumentType"},
ly:{"^":"J;",$isj:1,"%":"HTMLFrameSetElement"},
iX:{"^":"ak;$ti",
bb:function(a,b,c,d){var z=new W.cM(0,this.a,this.b,W.bh(a),!1,this.$ti)
z.bw()
return z},
dX:function(a,b,c){return this.bb(a,null,b,c)}},
bQ:{"^":"iX;a,b,c,$ti"},
cM:{"^":"ie;a,b,c,d,e,$ti",
dB:function(){if(this.b==null)return
this.dv()
this.b=null
this.d=null
return},
cv:function(a,b){if(this.b==null)return;++this.a
this.dv()},
e2:function(a){return this.cv(a,null)},
ea:function(){if(this.b==null||this.a<=0)return;--this.a
this.bw()},
bw:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.fd(x,this.c,z,!1)}},
dv:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.fe(x,this.c,z,!1)}}},
iR:{"^":"d;a",
gU:function(a){return W.eC(this.a.parent)},
$isj:1,
u:{
eC:function(a){if(a===window)return a
else return new W.iR(a)}}}}],["","",,P,{"^":"",
dl:function(){var z=$.dj
if(z==null){z=J.c3(window.navigator.userAgent,"Opera",0)
$.dj=z}return z},
dk:function(){var z,y
z=$.dg
if(z!=null)return z
y=$.dh
if(y==null){y=J.c3(window.navigator.userAgent,"Firefox",0)
$.dh=y}if(y===!0)z="-moz-"
else{y=$.di
if(y==null){y=P.dl()!==!0&&J.c3(window.navigator.userAgent,"Trident/",0)
$.di=y}if(y===!0)z="-ms-"
else z=P.dl()===!0?"-o-":"-webkit-"}$.dg=z
return z}}],["","",,P,{"^":""}],["","",,P,{"^":"",
Q:function(a,b){var z
if(typeof b!=="number")throw H.i(P.aq(b))
if(a>b)return b
if(a<b)return a
if(typeof b==="number"){if(typeof a==="number")if(a===0)return(a+b)*a*b
if(a===0)z=b===0?1/b<0:b<0
else z=!1
if(z||isNaN(b))return b
return a}return a},
A:function(a,b){var z
if(typeof a!=="number")throw H.i(P.aq(a))
if(typeof b!=="number")throw H.i(P.aq(b))
if(a>b)return a
if(a<b)return b
if(typeof b==="number"){if(typeof a==="number")if(a===0)return a+b
if(isNaN(b))return b
return a}if(b===0)z=a===0?1/a<0:a<0
else z=!1
if(z)return b
return a}}],["","",,P,{"^":"",kc:{"^":"av;",$isj:1,"%":"SVGAElement"},ke:{"^":"t;",$isj:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},kk:{"^":"dC;aZ:r=","%":"SVGCircleElement"},kr:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEBlendElement"},ks:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEColorMatrixElement"},kt:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEComponentTransferElement"},ku:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFECompositeElement"},kv:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEConvolveMatrixElement"},kw:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEDiffuseLightingElement"},kx:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEDisplacementMapElement"},ky:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEFloodElement"},kz:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEGaussianBlurElement"},kA:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEImageElement"},kB:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEMergeElement"},kC:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEMorphologyElement"},kD:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFEOffsetElement"},kE:{"^":"t;h:x=,i:y=","%":"SVGFEPointLightElement"},kF:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFESpecularLightingElement"},kG:{"^":"t;h:x=,i:y=","%":"SVGFESpotLightElement"},kH:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFETileElement"},kI:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFETurbulenceElement"},kJ:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGFilterElement"},kK:{"^":"av;t:height=,h:x=,i:y=","%":"SVGForeignObjectElement"},dC:{"^":"av;","%":"SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},av:{"^":"t;",$isj:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},kR:{"^":"av;t:height=,h:x=,i:y=",$isj:1,"%":"SVGImageElement"},kV:{"^":"t;",$isj:1,"%":"SVGMarkerElement"},kW:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGMaskElement"},lc:{"^":"t;t:height=,h:x=,i:y=",$isj:1,"%":"SVGPatternElement"},ld:{"^":"j;w:length=","%":"SVGPointList"},lg:{"^":"jb;aZ:r=","%":"SVGRadialGradientElement"},lh:{"^":"dC;t:height=,h:x=,i:y=","%":"SVGRectElement"},li:{"^":"t;",$isj:1,"%":"SVGScriptElement"},t:{"^":"dw;",
ge0:function(a){return new W.bQ(a,"mousedown",!1,[W.b6])},
ge1:function(a){return new W.bQ(a,"mouseup",!1,[W.b6])},
$isj:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},ll:{"^":"av;t:height=,h:x=,i:y=",$isj:1,"%":"SVGSVGElement"},lm:{"^":"t;",$isj:1,"%":"SVGSymbolElement"},eb:{"^":"av;","%":";SVGTextContentElement"},ln:{"^":"eb;",$isj:1,"%":"SVGTextPathElement"},lo:{"^":"eb;h:x=,i:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},lp:{"^":"av;t:height=,h:x=,i:y=",$isj:1,"%":"SVGUseElement"},lr:{"^":"t;",$isj:1,"%":"SVGViewElement"},jb:{"^":"t;",$isj:1,"%":"SVGLinearGradientElement;SVGGradientElement"},lz:{"^":"t;",$isj:1,"%":"SVGCursorElement"},lA:{"^":"t;",$isj:1,"%":"SVGFEDropShadowElement"},lB:{"^":"t;",$isj:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",h0:{"^":"d;",$iso:1,
$aso:function(){return[P.R]},
$ism:1,
$asm:function(){return[P.R]}}}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,P,{"^":""}],["","",,V,{"^":"",
hO:function(a){return a.gL(a).S(0,0)},
fA:{"^":"d;",
cO:function(a,b){var z,y,x
z=a.y
y=b.y
x=z.c
if(x===y.c&&x!==0)return x>0
return(z.b&y.a)!==0&&(z.a&y.b)!==0}},
da:{"^":"d;a,b,c"},
aH:{"^":"d;i5:a<,b",
B:function(a){var z,y
z=a.gi5().a
y=this.a.a
y[0]=z[0]
y[1]=z[1]
z=a.b.a
y=this.b.a
y[0]=z[0]
y[1]=z[1]},
W:function(a,b){var z,y,x,w
z=a.a.a
y=z[0]
x=b.a.a
w=x[0]
y=y<w?y:w
w=this.a.a
w[0]=y
z=z[1]
x=x[1]
w[1]=z<x?z:x
z=a.b.a
y=z[0]
x=b.b.a
w=x[0]
y=y>w?y:w
w=this.b.a
w[0]=y
z=z[1]
x=x[1]
w[1]=z>x?z:x},
l:function(a){return"AABB["+this.a.l(0)+" . "+this.b.l(0)+"]"},
u:{
aI:function(){return new V.aH(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))))},
fp:function(a,b){var z,y
z=b.a.a
y=a.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
z=a.a.a
y=b.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
return!0}}},
fI:{"^":"d;a,b,c,d,e,f,r,x,y",
iv:function(a,b){var z,y,x,w
z=this.a
y=z.b
if(a<0||a>=y.length)return H.a(y,a)
x=y[a].gK()
z=z.b
if(b<0||b>=z.length)return H.a(z,b)
w=z[b].gK()
z=w.a.a
y=x.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
z=x.a.a
y=w.b.a
if(z[0]-y[0]>0||z[1]-y[1]>0)return!1
return!0},
cF:function(a){var z,y,x,w,v,u,t
this.x=0
for(z=this.a,y=0;y<this.e;++y){x=this.c
if(y>=x.length)return H.a(x,y)
x=x[y]
this.y=x
if(J.z(x,-1))continue
x=this.y
w=z.b
if(x>>>0!==x||x>=w.length)return H.a(w,x)
z.ie(0,this,w[x].gK())}this.e=0
F.f6(this.f,0,this.x)
for(y=0;y<this.x;){x=this.f
if(y<0||y>=x.length)return H.a(x,y)
v=x[y]
x=v.gbd()
w=z.b
if(x>>>0!==x||x>=w.length)return H.a(w,x)
u=w[x].gau()
x=v.b
w=z.b
if(x>>>0!==x||x>=w.length)return H.a(w,x)
a.h6(u,w[x].gau());++y
for(;y<this.x;){x=this.f
if(y>=x.length)return H.a(x,y)
t=x[y]
if(!J.z(t.gbd(),v.a)||!J.z(t.b,v.b))break;++y}}},
dA:function(a){var z,y,x
z=this.e
y=this.d
if(z===y){x=this.c
z=y*2
this.d=z
z=new Array(z)
z.fixed$length=Array
z=H.k(z,[P.n])
this.c=z
C.d.Y(z,0,x.length,x,0)}z=this.c
y=this.e
if(y>=z.length)return H.a(z,y)
z[y]=a
this.e=y+1},
eg:function(a){var z,y,x,w,v
if(a===this.y)return!0
z=this.x
y=this.r
if(z===y){x=this.f
z=y*2
this.r=z
z=new Array(z)
z.fixed$length=Array
z=H.k(z,[V.b8])
this.f=z
w=x.length
C.d.Y(z,0,w,x,0)
for(z=this.r,y=this.f;w<z;++w){if(w>=y.length)return H.a(y,w)
y[w]=new V.b8(0,0)}}z=this.y
if(typeof z!=="number")return H.e(z)
y=this.f
v=this.x
if(a<z){if(v>=y.length)return H.a(y,v)
y[v].sbd(a)
z=this.f
y=this.x
if(y>=z.length)return H.a(z,y)
z[y].se4(this.y)}else{if(v>=y.length)return H.a(y,v)
y[v].sbd(z)
z=this.f
y=this.x
if(y>=z.length)return H.a(z,y)
z[y].se4(a)}++this.x
return!0},
fc:function(a){var z,y,x
z=new Array(this.r)
z.fixed$length=Array
z=H.k(z,[V.b8])
this.f=z
for(y=this.r,x=0;x<y;++x){if(x>=z.length)return H.a(z,x)
z[x]=new V.b8(0,0)}this.c=P.ax(this.d,0,!1,P.n)},
u:{
fJ:function(a){var z=new V.fI(a,0,null,16,0,null,16,0,-1)
z.fc(a)
return z}}},
fS:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
i8:function(a,b,c){var z,y,x,w,v,u,t,s
z=this.b
if(a<0||a>=z.length)return H.a(z,a)
y=z[a]
x=y.gK()
z=x.a.a
w=b.a.a
if(z[0]<=w[0])if(z[1]<=w[1]){v=b.b.a
u=x.b.a
v=v[0]<=u[0]&&v[1]<=u[1]}else v=!1
else v=!1
if(v)return!1
this.fX(y)
z[0]=w[0]-0.1
z[1]=w[1]-0.1
w=b.b.a
v=x.b.a
v[0]=w[0]+0.1
v[1]=w[1]+0.1
w=c.a
t=w[0]*2
s=w[1]*2
if(t<0)z[0]=z[0]+t
else v[0]=v[0]+t
if(s<0)z[1]=z[1]+s
else v[1]=v[1]+s
this.dc(a)
return!0},
ie:function(a,b,c){var z,y,x,w,v,u,t,s
this.x=0
z=this.r
this.x=1
y=this.a
if(0>=z.length)return H.a(z,0)
z[0]=y
for(z=[V.b0];y=this.x,y>0;){x=this.r;--y
this.x=y
if(y>=x.length)return H.a(x,y)
w=x[y]
if(w==null)continue
if(V.fp(w.gK(),c))if(w.gV()==null)b.eg(w.f)
else{y=this.r
x=y.length
if(x-this.x-2<=0){y=new Array(x*2)
y.fixed$length=Array
v=H.k(y,z)
y=this.r
C.d.Y(v,0,y.length,y,0)
this.r=v
y=v}x=this.x
u=x+1
this.x=u
t=w.d
s=y.length
if(x<0||x>=s)return H.a(y,x)
y[x]=t
this.x=u+1
t=w.e
if(u<0||u>=s)return H.a(y,u)
y[u]=t}}},
cW:function(){var z,y,x,w,v,u,t
z=this.e
if(z===-1){y=this.b
z=this.d*=2
z=new Array(z)
z.fixed$length=Array
z=H.k(z,[V.b0])
this.b=z
C.d.Y(z,0,y.length,y,0)
for(x=this.d-1;z=this.c,x>=z;--x){z=this.b
w=new Float64Array(2)
v=new Float64Array(2)
if(x<0||x>=z.length)return H.a(z,x)
z[x]=new V.b0(new V.aH(new E.b(w),new E.b(v)),null,null,null,null,x,0)
v=this.b
w=v.length
if(x>=w)return H.a(v,x)
z=v[x]
if(x===this.d-1)w=null
else{u=x+1
if(u>=w)return H.a(v,u)
u=v[u]
w=u}J.b_(z,w)
w=this.b
if(x>=w.length)return H.a(w,x)
J.c8(w[x],-1)}this.e=z}w=this.b
if(z>>>0!==z||z>=w.length)return H.a(w,z)
t=w[z]
z=J.f(t)
this.e=z.gU(t)!=null?J.a8(z.gU(t)):-1
z.sU(t,null)
t.d=null
t.e=null
t.r=0
t.b=null;++this.c
return t},
d7:function(a){var z,y
z=this.e
if(z!==-1){y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
z=y[z]}else z=null
a.c=z
a.r=-1
this.e=a.f;--this.c},
dc:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.b
if(a<0||a>=z.length)return H.a(z,a)
y=z[a]
if(this.a==null){this.a=y
J.b_(y,null)
return}x=y.gK()
w=this.a
for(z=this.ch,v=z.b.a,u=z.a.a;w.gV()!=null;){t=w.d
s=w.e
r=w.a
q=r.b.a
p=q[0]
o=r.a.a
n=o[0]
q=q[1]
o=o[1]
z.W(r,x)
m=2*(v[0]-u[0]+v[1]-u[1])
l=2*m
k=2*(m-2*(p-n+q-o))
r=t.gV()
q=t.a
if(r==null){z.W(x,q)
j=2*(v[0]-u[0]+v[1]-u[1])+k}else{z.W(x,q)
r=q.b.a
p=r[0]
q=q.a.a
o=q[0]
r=r[1]
q=q[1]
j=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+r-q)+k}r=s.gV()
q=s.a
if(r==null){z.W(x,q)
i=2*(v[0]-u[0]+v[1]-u[1])+k}else{z.W(x,q)
r=q.b.a
p=r[0]
q=q.a.a
o=q[0]
r=r[1]
q=q[1]
i=2*(v[0]-u[0]+v[1]-u[1])-2*(p-o+r-q)+k}if(l<j&&l<i)break
w=j<i?t:s}z=this.b
v=w.f
if(v<0||v>=z.length)return H.a(z,v)
h=J.d3(z[v])
g=this.cW()
g.c=h
g.b=null
g.a.W(x,w.a)
g.r=w.r+1
if(h!=null){if(J.z(h.gV(),w))h.d=g
else h.e=g
g.d=w
g.e=y
w.c=g
y.sU(0,g)}else{g.d=w
g.e=y
w.c=g
y.sU(0,g)
this.a=g}w=y.gU(y)
for(;w!=null;){w=this.cY(w)
t=w.gV()
s=w.e
w.r=1+P.A(J.d1(t),J.d1(s))
w.a.W(t.gK(),s.gK())
w=w.c}},
fX:function(a){var z,y,x,w,v,u
if(a===this.a){this.a=null
return}z=a.gU(a)
y=J.d3(z)
x=J.z(z.gV(),a)?z.e:z.d
if(y!=null){if(J.z(y.gV(),z))y.d=x
else y.e=x
J.b_(x,y)
this.d7(z)
for(w=y;w!=null;){w=this.cY(w)
v=w.gV()
u=w.e
w.a.W(v.gK(),u.gK())
w.r=1+P.A(v.gt(v),u.gt(u))
w=w.c}}else{this.a=x
J.b_(x,null)
this.d7(z)}},
cY:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
if(a.gV()==null||a.r<2)return a
z=a.d
y=a.e
x=J.f(y)
w=x.gt(y)
v=J.f(z)
u=v.gt(z)
if(typeof w!=="number")return w.n()
if(typeof u!=="number")return H.e(u)
t=w-u
if(t>1){s=y.gV()
r=y.e
y.d=a
y.c=a.c
a.c=y
x=y.c
if(x!=null){x=J.z(x.gV(),a)
w=y.c
if(x)w.sV(y)
else w.sdD(y)}else this.a=y
x=J.f(s)
w=x.gt(s)
u=J.f(r)
q=u.gt(r)
if(typeof w!=="number")return w.Z()
if(typeof q!=="number")return H.e(q)
p=y.a
o=a.a
if(w>q){y.e=s
a.e=r
u.sU(r,a)
o.W(z.gK(),r.a)
p.W(o,s.gK())
w=1+P.A(v.gt(z),r.r)
a.r=w
y.r=1+P.A(w,x.gt(s))}else{y.e=r
a.e=s
x.sU(s,a)
o.W(z.gK(),s.a)
p.W(o,r.gK())
x=1+P.A(v.gt(z),s.r)
a.r=x
y.r=1+P.A(x,u.gt(r))}return y}if(t<-1){n=z.gV()
m=z.e
z.d=a
z.c=a.c
a.c=z
w=z.c
if(w!=null){w=J.z(w.gV(),a)
v=z.c
if(w)v.sV(z)
else v.sdD(z)}else this.a=z
w=J.f(n)
v=w.gt(n)
u=J.f(m)
q=u.gt(m)
if(typeof v!=="number")return v.Z()
if(typeof q!=="number")return H.e(q)
p=a.a
o=z.a
if(v>q){z.e=n
a.d=m
u.sU(m,a)
p.W(y.gK(),m.a)
o.W(p,n.gK())
x=1+P.A(x.gt(y),m.r)
a.r=x
z.r=1+P.A(x,w.gt(n))}else{z.e=m
a.d=n
w.sU(n,a)
p.W(y.gK(),n.a)
o.W(p,m.gK())
x=1+P.A(x.gt(y),n.r)
a.r=x
z.r=1+P.A(x,u.gt(m))}return z}return a},
ff:function(){var z,y,x,w,v
for(z=this.d-1;z>=0;--z){y=this.b
x=new Float64Array(2)
w=new Float64Array(2)
if(z>=y.length)return H.a(y,z)
y[z]=new V.b0(new V.aH(new E.b(x),new E.b(w)),null,null,null,null,z,0)
w=this.b
x=w.length
if(z>=x)return H.a(w,z)
y=w[z]
if(z===this.d-1)x=null
else{v=z+1
if(v>=x)return H.a(w,v)
v=w[v]
x=v}J.b_(y,x)
x=this.b
if(z>=x.length)return H.a(x,z)
J.c8(x[z],-1)}for(y=this.f,z=0;z<4;++z)y[z]=new E.b(new Float64Array(2))},
u:{
fT:function(){var z,y,x,w
z=new Array(16)
z.fixed$length=Array
y=[V.b0]
z=H.k(z,y)
x=H.k(new Array(4),[E.b])
w=new Array(20)
w.fixed$length=Array
y=new V.fS(null,z,0,16,0,x,H.k(w,y),0,new E.b(new Float64Array(H.c(2))),V.aI(),new V.cB(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0),V.aI(),new G.cf(0,0,0),new E.b(new Float64Array(H.c(2))))
y.ff()
return y}}},
b0:{"^":"d;K:a<,au:b<,U:c*,V:d@,dD:e?,a3:f>,t:r*"},
b8:{"^":"d;bd:a@,e4:b?",
aU:function(a,b){var z
if(J.a3(this.a,b.gbd()))return-1
if(J.z(this.a,b.a)){if(J.a3(this.b,b.b))z=-1
else z=J.z(this.b,b.b)?0:1
return z}return 1},
$isC:1,
$asC:function(){return[V.b8]}},
eE:{"^":"d;a,b"},
a1:{"^":"d;P:a<,a3:b>",
B:function(a){var z,y
z=a.gP().a
y=this.a.a
y[0]=z[0]
y[1]=z[1]
z=a.ga3(a).a
y=this.b.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]
y[3]=z[3]}},
ci:{"^":"d;L:a>",
l:function(a){return C.a0.k(0,this.a)}},
dt:{"^":"d;a,L:b*,c"},
io:{"^":"d;a,b,c",
fp:function(){var z,y,x
for(z=this.b,y=this.a,x=0;x<8;++x){y[x]=new E.b(new Float64Array(2))
z[x]=new E.b(new Float64Array(2))}},
u:{
ip:function(){var z=[E.b]
z=new V.io(H.k(new Array(8),z),H.k(new Array(8),z),0)
z.fp()
return z}}},
jp:{"^":"d;a,b,c,d,a6:e<,f,r,x,y"},
fx:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3",
hg:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
a.e=0
z=b.ga5(b)
y=d.ga5(d)
x=c.b
w=C.b.m(x.b,z.gh(z))
v=C.b.m(x.a,z.gi(z))
u=c.a.a
t=u[0]
s=C.b.m(x.a,z.gh(z))
x=C.b.m(x.b,z.gi(z))
u=u[1]
r=e.b
q=e.a.a
p=C.b.m(r.b,y.gh(y))-C.b.m(r.a,y.gi(y))+q[0]-(w-v+t)
o=C.b.m(r.a,y.gh(y))+C.b.m(r.b,y.gi(y))+q[1]-(s+x+u)
n=b.b.p(0,d.b)
if(C.b.Z(p*p+o*o,n.m(0,n)))return
a.d=C.k
a.c.j(z)
a.b.N()
a.e=1
x=a.a
x[0].gI().j(y)
J.a8(x[0]).bh()},
hh:function(b3,b4,b5,b6,b7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2
b3.e=0
z=b6.ga5(b6)
y=b7.b
x=b5.b
w=C.b.m(y.b,z.gh(z))
v=C.b.m(y.a,z.gi(z))
u=b7.a.a
t=u[0]
s=C.b.m(y.a,z.gh(z))
r=C.b.m(y.b,z.gi(z))
u=u[1]
q=b5.a.a
p=w-v+t-q[0]
o=s+r+u-q[1]
q=x.b
u=x.a
n=q*p+u*o
m=-u*p+q*o
l=C.b.p(b4.b,b6.b)
k=b4.f
j=b4.d
i=b4.e
for(h=0,g=-17976931348623157e292,f=0;f<k;++f){if(f>=8)return H.a(j,f)
e=j[f]
w=J.f(e)
v=w.gh(e)
if(typeof v!=="number")return H.e(v)
w=w.gi(e)
if(typeof w!=="number")return H.e(w)
u=J.c4(i[f])
if(typeof u!=="number")return u.m()
t=J.c5(i[f])
if(typeof t!=="number")return t.m()
d=u*(n-v)+t*(m-w)
if(d>l)return
if(d>g){g=d
h=f}}c=h+1
c=c<k?c:0
if(h<0||h>=8)return H.a(j,h)
b=j[h]
if(c<0||c>=8)return H.a(j,c)
a=j[c]
if(g<11920928955078125e-23){b3.e=1
b3.d=C.i
a0=i[h]
w=J.f(a0)
v=b3.b.a
v[0]=w.gh(a0)
v[1]=w.gi(a0)
w=J.f(b)
v=w.gh(b)
u=J.f(a)
t=u.gh(a)
if(typeof v!=="number")return v.p()
if(typeof t!=="number")return H.e(t)
s=b3.c.a
s[0]=(v+t)*0.5
w=w.gi(b)
u=u.gi(a)
if(typeof w!=="number")return w.p()
if(typeof u!=="number")return H.e(u)
s[1]=(w+u)*0.5
a1=b3.a[0]
a1.gI().a[0]=z.gh(z)
a1.gI().a[1]=z.gi(z)
a1.ga3(a1).bh()
return}w=J.f(b)
v=w.gh(b)
if(typeof v!=="number")return H.e(v)
u=w.gi(b)
if(typeof u!=="number")return H.e(u)
t=J.f(a)
s=t.gh(a)
r=w.gh(b)
if(typeof s!=="number")return s.n()
if(typeof r!=="number")return H.e(r)
q=t.gi(a)
a2=w.gi(b)
if(typeof q!=="number")return q.n()
if(typeof a2!=="number")return H.e(a2)
a3=t.gh(a)
if(typeof a3!=="number")return H.e(a3)
a4=t.gi(a)
if(typeof a4!=="number")return H.e(a4)
a5=w.gh(b)
a6=t.gh(a)
if(typeof a5!=="number")return a5.n()
if(typeof a6!=="number")return H.e(a6)
a7=w.gi(b)
a8=t.gi(a)
if(typeof a7!=="number")return a7.n()
if(typeof a8!=="number")return H.e(a8)
if((n-v)*(s-r)+(m-u)*(q-a2)<=0){v=w.gh(b)
if(typeof v!=="number")return H.e(v)
a9=n-v
v=w.gi(b)
if(typeof v!=="number")return H.e(v)
b0=m-v
if(a9*a9+b0*b0>l*l)return
b3.e=1
b3.d=C.i
v=b3.b
u=w.gh(b)
if(typeof u!=="number")return H.e(u)
t=v.a
t[0]=n-u
w=w.gi(b)
if(typeof w!=="number")return H.e(w)
t[1]=m-w
v.a1()
b3.c.j(b)
v=b3.a
v[0].gI().j(z)
J.a8(v[0]).bh()}else if((n-a3)*(a5-a6)+(m-a4)*(a7-a8)<=0){w=t.gh(a)
if(typeof w!=="number")return H.e(w)
a9=n-w
w=t.gi(a)
if(typeof w!=="number")return H.e(w)
b0=m-w
if(a9*a9+b0*b0>l*l)return
b3.e=1
b3.d=C.i
w=b3.b
v=t.gh(a)
if(typeof v!=="number")return H.e(v)
u=w.a
u[0]=n-v
t=t.gi(a)
if(typeof t!=="number")return H.e(t)
u[1]=m-t
w.a1()
b3.c.j(a)
w=b3.a
w[0].gI().j(z)
J.a8(w[0]).bh()}else{v=w.gh(b)
u=t.gh(a)
if(typeof v!=="number")return v.p()
if(typeof u!=="number")return H.e(u)
b1=(v+u)*0.5
w=w.gi(b)
t=t.gi(a)
if(typeof w!=="number")return w.p()
if(typeof t!=="number")return H.e(t)
b2=(w+t)*0.5
a0=i[h]
t=J.f(a0)
w=t.gh(a0)
if(typeof w!=="number")return H.e(w)
t=t.gi(a0)
if(typeof t!=="number")return H.e(t)
if((n-b1)*w+(m-b2)*t>l)return
b3.e=1
b3.d=C.i
b3.b.j(i[h])
w=b3.c.a
w[0]=b1
w[1]=b2
w=b3.a
w[0].gI().j(z)
J.a8(w[0]).bh()}},
dM:function(a,b,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=b.f
y=a1.f
x=b.e
w=b.d
v=a1.d
u=this.f
G.ei(a2,a0,u)
t=u.b
for(s=this.r,r=s.a,q=this.x,p=q.a,o=0,n=-17976931348623157e292,m=0;m<z;++m){if(m>=8)return H.a(x,m)
G.V(t,x[m],s)
G.v(u,w[m],q)
for(l=17976931348623157e292,k=0;k<y;++k){if(k>=8)return H.a(v,k)
j=v[k]
i=r[0]
h=J.f(j)
g=h.gh(j)
f=p[0]
if(typeof g!=="number")return g.n()
e=r[1]
h=h.gi(j)
d=p[1]
if(typeof h!=="number")return h.n()
c=i*(g-f)+e*(h-d)
if(c<l)l=c}if(l>n){n=l
o=m}}a.b=o
a.a=n},
hI:function(a4,a5,a6,a7,a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
z=a5.e
y=a8.f
x=a8.d
w=a8.e
v=a4[0]
u=a4[1]
t=a6.b
s=a9.b
if(a7>=8)return H.a(z,a7)
r=z[a7]
q=t.b
p=J.f(r)
o=p.gh(r)
if(typeof o!=="number")return H.e(o)
n=t.a
m=p.gi(r)
if(typeof m!=="number")return H.e(m)
l=q*o-n*m
m=t.a
n=p.gh(r)
if(typeof n!=="number")return H.e(n)
o=t.b
p=p.gi(r)
if(typeof p!=="number")return H.e(p)
k=m*n+o*p
p=s.b
o=s.a
j=p*l+o*k
i=-o*l+p*k
for(h=0,g=17976931348623157e292,f=0;f<y;++f){if(f>=8)return H.a(w,f)
e=w[f]
q=J.f(e)
p=q.gh(e)
if(typeof p!=="number")return H.e(p)
q=q.gi(e)
if(typeof q!=="number")return H.e(q)
d=j*p+i*q
if(d<g){g=d
h=f}}c=h+1
c=c<y?c:0
if(h<0||h>=8)return H.a(x,h)
b=x[h]
a=v.a
q=s.b
p=J.f(b)
o=p.gh(b)
if(typeof o!=="number")return H.e(o)
n=s.a
m=p.gi(b)
if(typeof m!=="number")return H.e(m)
a0=a9.a.a
a1=a.a
a1[0]=q*o-n*m+a0[0]
m=s.a
n=p.gh(b)
if(typeof n!=="number")return H.e(n)
o=s.b
p=p.gi(b)
if(typeof p!=="number")return H.e(p)
a1[1]=m*n+o*p+a0[1]
p=a7&255
o=v.b.a
o[0]=p
o[1]=h&255
o[2]=1
o[3]=0
if(c<0||c>=8)return H.a(x,c)
a2=x[c]
a3=u.a
o=s.b
n=J.f(a2)
m=n.gh(a2)
if(typeof m!=="number")return H.e(m)
a1=s.a
q=n.gi(a2)
if(typeof q!=="number")return H.e(q)
a3=a3.a
a3[0]=o*m-a1*q+a0[0]
q=s.a
a1=n.gh(a2)
if(typeof a1!=="number")return H.e(a1)
m=s.b
n=n.gi(a2)
if(typeof n!=="number")return H.e(n)
a3[1]=q*a1+m*n+a0[1]
a0=u.b.a
a0[0]=p
a0[1]=c&255
a0[2]=1
a0[3]=0},
hi:function(a9,b0,b1,b2,b3){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8
a9.e=0
z=b0.b+b2.b
y=this.y
this.dM(y,b0,b1,b2,b3)
if(y.a>z)return
x=this.z
this.dM(x,b2,b3,b0,b1)
w=x.a
if(w>z)return
if(w>y.a+0.0005){v=x.b
a9.d=C.q
u=b1
t=b3
s=b0
r=b2
q=!0}else{v=y.b
a9.d=C.i
u=b3
t=b1
s=b2
r=b0
q=!1}p=t.b
y=this.Q
this.hI(y,r,t,v,s,u)
o=r.f
n=r.d
m=v+1
m=m<o?m:0
x=this.dx
if(v>=8)return H.a(n,v)
x.j(n[v])
w=this.dy
if(m>=8)return H.a(n,m)
w.j(n[m])
l=this.ch
k=w.a
j=x.a
i=l.a
i[0]=k[0]-j[0]
i[1]=k[1]-j[1]
l.a1()
l=this.cx
h=l.a
h[0]=i[1]
h[1]=-1*i[0]
h=this.cy
g=h.a
g[0]=(j[0]+k[0])*0.5
g[1]=(j[1]+k[1])*0.5
g=this.db
f=p.b
e=i[0]
d=p.a
c=g.a
c[0]=f*e-d*i[1]
c[1]=d*i[0]+f*i[1]
b=c[1]
a=-1*c[0]
G.aP(t,x,x)
G.aP(t,w,w)
w=j[0]
j=j[1]
a0=b*w+a*j
x=c[0]
c=c[1]
i=k[0]
k=k[1]
g.M()
f=this.fr
a1=V.bq(f,y,g,-(x*w+c*j)+z,v)
g.M()
if(a1<2)return
y=this.fx
if(V.bq(y,f,g,x*i+c*k+z,m)<2)return
a9.b.j(l)
a9.c.j(h)
for(x=a9.a,w=u.a.a,l=u.b,a2=0,a3=0;a3<2;++a3){k=y[a3].a.a
if(b*k[0]+a*k[1]-a0<=z){if(a2>=2)return H.a(x,a2)
a4=x[a2]
a5=a4.gI()
k=y[a3].a.a
a6=k[0]-w[0]
a7=k[1]-w[1]
k=l.b
j=l.a
i=a5.a
i[0]=k*a6+j*a7
i[1]=-j*a6+k*a7
k=a4.ga3(a4)
j=y[a3].b
k=k.a
k[0]=j.gD()
k[1]=j.gE()
k[2]=j.gcD()
k[3]=j.a[3]
if(q){k=a4.d.a
a8=k[0]
k[0]=k[1]
k[1]=a8
a8=k[2]
k[2]=k[3]
k[3]=a8}++a2}}a9.e=a2},
dF:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n
a.e=0
z=this.e
G.v(e,d.ga5(d),z)
y=this.fy
G.ej(c,z,y)
x=b.gek()
w=b.d
v=this.go
v.j(w)
v.v(x)
z.j(w)
z.v(y)
u=v.A(z)
z.j(y)
z.v(x)
t=v.A(z)
s=C.b.p(b.b,d.b)
r=this.id
q=r.a
q[1]=0
q[3]=0
if(t<=0){z=$.$get$as()
z.j(y)
z.v(x)
z=$.$get$as()
if(z.A(z)>s*s)return
q[0]=0
q[2]=0
a.e=1
a.d=C.k
a.b.N()
a.c.j(x)
z=a.a
J.a8(z[0]).B(r)
z[0].gI().j(d.ga5(d))
return}if(u<=0){z=$.$get$as()
z.j(y)
z.v(w)
z=$.$get$as()
if(z.A(z)>s*s)return
q[0]=1
q[2]=0
a.e=1
a.d=C.k
a.b.N()
a.c.j(w)
z=a.a
J.a8(z[0]).B(r)
z[0].gI().j(d.ga5(d))
return}p=v.A(v)
o=this.k2
o.j(x)
o.F(0,u)
z.j(w)
z.F(0,t)
o.C(0,z)
o.F(0,1/p)
n=$.$get$as()
n.j(y)
n.v(o)
o=$.$get$as()
if(o.A(o)>s*s)return
o=this.r
v=v.a
n=o.a
n[0]=-v[1]
n[1]=v[0]
z.j(y)
z.v(x)
if(o.A(z)<0){z=n[0]
y=n[1]
n[0]=-z
n[1]=-y}o.a1()
q[0]=0
q[2]=1
a.e=1
a.d=C.i
a.b.j(o)
a.c.j(x)
z=a.a
J.a8(z[0]).B(r)
z[0].gI().j(d.ga5(d))},
u:{
bq:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=b[1]
x=z.a
w=y.a
v=c.A(x)-d
u=c.A(w)-d
if(v<=0){a[0].B(z)
t=1}else t=0
if(u<=0){s=t+1
a[t].B(y)
t=s}if(v*u<0){r=v/(v-u)
if(t>=2)return H.a(a,t)
q=a[t]
p=q.a
o=x.a
n=o[0]
m=w.a
p=p.a
p[0]=n+r*(m[0]-n)
o=o[1]
p[1]=o+r*(m[1]-o)
o=q.b
if(typeof e!=="number")return e.X()
o=o.a
o[0]=e&255
o[1]=z.b.a[1]
o[2]=0
o[3]=1;++t}return t}}},
iB:{"^":"d;L:a>",
l:function(a){return C.Y.k(0,this.a)}},
fU:{"^":"d;a,b,c,d,e,f,r,x,y,z,a6:Q<,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx",
dE:function(a,b,c,a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.b
G.ei(c,a1,z)
y=this.c
G.v(z,a0.c,y)
this.d=b.giC()
this.e=b.c
x=b.d
this.f=x
this.r=b.f
w=this.fr
w.j(x)
w.v(this.e)
w.a1()
x=this.y
w=w.a
v=w[1]
w=w[0]
u=x.a
u[0]=v
u[1]=-w
w=this.fx
w.j(y)
w.v(this.e)
t=x.A(w)
y=t>=0
this.dy=y
v=this.Q.a
s=this.db.a
r=this.cy.a
if(y){v[0]=u[0]
v[1]=u[1]
r[0]=-u[0]
r[1]=-u[1]
s[0]=-u[0]
s[1]=-u[1]}else{v[0]=-u[0]
v[1]=-u[1]
r[0]=u[0]
r[1]=u[1]
s[0]=u[0]
s[1]=u[1]}y=this.a
y.c=a0.f
for(v=y.a,u=z.b,s=y.b,q=0;q<a0.f;++q){r=a0.d
if(q>=8)return H.a(r,q)
G.v(z,r[q],v[q])
G.V(u,a0.e[q],s[q])}this.dx=0.02
a.e=0
p=this.k4
this.hj(p)
if(p.a===C.m)return
if(p.c>this.dx)return
o=this.r1
this.hl(o)
u=o.a===C.m
if(!u&&o.c>this.dx)return
if(!u)if(o.c>0.98*p.c+0.001)p=o
u=this.id
n=u[0]
m=u[1]
if(p.a===C.p){a.d=C.i
r=this.Q
l=r.A(s[0])
for(k=0,q=1;j=y.c,q<j;++q){if(q>=8)return H.a(s,q)
i=r.A(s[q])
if(i<l){l=i
k=q}}h=k+1
h=h<j?h:0
y=n.a
if(k<0||k>=8)return H.a(v,k)
y.j(v[k])
y=n.b.a
y[0]=0
y[1]=k&255
y[2]=1
y[3]=0
y=m.a
if(h<0||h>=8)return H.a(v,h)
y.j(v[h])
v=m.b.a
v[0]=0
v[1]=h&255
v[2]=1
v[3]=0
y=this.k3
v=y.c
s=y.d
r=y.e
if(this.dy){y.a=0
y.b=1
v.j(this.e)
s.j(this.f)
r.j(x)}else{y.a=1
y.b=0
v.j(this.f)
s.j(this.e)
r.j(x)
r.M()}}else{a.d=C.q
n.a.j(this.e)
x=n.b.a
x[0]=0
r=p.b
if(typeof r!=="number")return r.X()
x[1]=r&255
x[2]=0
x[3]=1
m.a.j(this.f)
x=m.b.a
x[0]=0
r=p.b
if(typeof r!=="number")return r.X()
x[1]=r&255
x[2]=0
x[3]=1
x=this.k3
x.a=r
x.b=r+1<y.c?J.p(x.a,1):0
j=x.a
if(j>>>0!==j||j>=8)return H.a(v,j)
x.c.j(v[j])
j=x.b
if(j>>>0!==j||j>=8)return H.a(v,j)
x.d.j(v[j])
j=x.a
if(j>>>0!==j||j>=8)return H.a(s,j)
x.e.j(s[j])
y=x}x=y.f
v=y.e
s=v.a
r=s[1]
s=s[0]
j=x.a
j[0]=r
j[1]=-s
s=y.x
s.j(x)
s.M()
j=y.c
y.r=x.A(j)
y.y=s.A(y.d)
r=this.k1
if(V.bq(r,u,x,y.r,y.a)<2)return
x=this.k2
if(V.bq(x,r,s,y.y,y.b)<2)return
u=a.b
s=a.c
if(p.a===C.p){u.j(v)
s.j(j)}else{r=a0.e
g=y.a
if(g>>>0!==g||g>=8)return H.a(r,g)
u.j(r[g])
g=a0.d
y=y.a
if(y>>>0!==y||y>=8)return H.a(g,y)
s.j(g[y])}for(y=w.a,u=a.a,f=0,q=0;q<2;++q){e=x[q].a.a
y[1]=e[1]
y[0]=e[0]
w.v(j)
if(v.A(w)<=this.dx){if(f>=2)return H.a(u,f)
d=u[f]
if(p.a===C.p){G.ej(z,x[q].a,d.gI())
s=d.ga3(d)
r=x[q].b
s=s.a
s[0]=r.gD()
s[1]=r.gE()
s[2]=r.gcD()
s[3]=r.a[3]}else{s=d.gI()
e=x[q].a.a
s=s.a
s[1]=e[1]
s[0]=e[0]
s=d.ga3(d)
r=x[q].b.a
s.a[2]=r[3]
s=d.d.a
s[3]=r[2]
s[0]=r[1]
s[1]=r[0]}++f}}a.e=f},
hj:function(a){var z,y,x,w,v,u,t,s,r,q
a.a=C.p
a.b=this.dy?0:1
a.c=17976931348623157e292
z=this.Q.a
y=z[0]
x=z[1]
for(z=this.a,w=z.a,v=0,u=17976931348623157e292;v<z.c;++v){if(v>=8)return H.a(w,v)
t=w[v].a
s=t[0]
r=this.e.a
q=y*(s-r[0])+x*(t[1]-r[1])
if(q<u){a.c=q
u=q}}},
hl:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
a.a=C.m
a.b=-1
a.c=-17976931348623157e292
z=this.Q
y=z.a
x=this.r2.a
x[0]=-y[1]
x[1]=y[0]
for(y=this.a,w=this.fx,v=this.rx.a,u=w.a,t=this.cy,s=y.b,r=y.a,q=this.db,p=0;p<y.c;++p){if(p>=8)return H.a(s,p)
o=s[p]
n=r[p]
m=o.a
v[0]=-m[0]
v[1]=-m[1]
m=n.a
l=m[0]
k=this.e.a
j=k[0]
m=m[1]
k=k[1]
i=v[0]
h=v[1]
g=this.f.a
f=P.Q(i*(l-j)+h*(m-k),i*(l-g[0])+h*(m-g[1]))
if(f>this.dx){a.a=C.A
a.b=p
a.c=f
return}m=v[0]
l=x[0]
k=v[1]
if(m*l+k*x[1]>=0){u[1]=k
u[0]=v[0]
w.v(q)
if(w.A(z)<-0.03490658503988659)continue}else{u[1]=k
u[0]=v[0]
w.v(t)
if(w.A(z)<-0.03490658503988659)continue}if(f>a.c){a.a=C.A
a.b=p
a.c=f}}},
fg:function(){var z,y,x,w,v
for(z=this.k2,y=this.k1,x=this.id,w=0;w<2;++w){v=new Float64Array(2)
x[w]=new V.a1(new E.b(v),new V.T(new Int8Array(4)))
v=new Float64Array(2)
y[w]=new V.a1(new E.b(v),new V.T(new Int8Array(4)))
v=new Float64Array(2)
z[w]=new V.a1(new E.b(v),new V.T(new Int8Array(4)))}},
u:{
fV:function(){var z=[V.a1]
z=new V.fU(V.ip(),G.B(),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),C.G,C.G,new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,!1,new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),H.k(new Array(2),z),H.k(new Array(2),z),H.k(new Array(2),z),new V.jp(0,0,new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,new E.b(new Float64Array(H.c(2))),0),new V.dt(C.m,0,0),new V.dt(C.m,0,0),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))))
z.fg()
return z}}},
T:{"^":"d;a",
sD:function(a){this.a[0]=a},
sE:function(a){this.a[1]=a},
gD:function(){return this.a[0]},
gE:function(){return this.a[1]},
gcD:function(){return this.a[2]},
bk:function(){var z,y,x,w
z=this.a
y=z[0]
if(typeof y!=="number")return y.bm()
x=z[1]
if(typeof x!=="number")return x.bm()
w=z[2]
if(typeof w!=="number")return w.bm()
z=z[3]
if(typeof z!=="number")return H.e(z)
return(y<<24|x<<16|w<<8|z)>>>0},
i0:function(a){return this.bk()===a.bk()},
B:function(a){var z=this.a
z[0]=a.gD()
z[1]=a.gE()
z[2]=a.gcD()
z[3]=a.a[3]},
bh:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
aU:function(a,b){return this.bk()-b.bk()},
$isC:1,
$asC:function(){return[V.T]}},
bU:{"^":"d;iD:a<,b,R:c<,ap:d*,D:e@,E:f@",
B:function(a){this.a.j(a.giD())
this.b.j(a.b)
this.c.j(a.c)
this.d=a.d
this.e=a.e
this.f=a.f}},
i8:{"^":"d;i7:a<,b,D:c<,E:d<",
B:function(a){var z=this.c
C.d.Y(z,0,z.length,a.gD(),0)
z=this.d
C.d.Y(z,0,z.length,a.gE(),0)
this.a=a.gi7()
this.b=a.b},
fn:function(){var z,y
z=this.c
y=z.length
if(0>=y)return H.a(z,0)
z[0]=1073741823
if(1>=y)return H.a(z,1)
z[1]=1073741823
if(2>=y)return H.a(z,2)
z[2]=1073741823
z=this.d
y=z.length
if(0>=y)return H.a(z,0)
z[0]=1073741823
if(1>=y)return H.a(z,1)
z[1]=1073741823
if(2>=y)return H.a(z,2)
z[2]=1073741823},
u:{
e3:function(){var z=P.n
z=new V.i8(0,0,P.ax(3,0,!1,z),P.ax(3,0,!1,z))
z.fn()
return z}}},
ju:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db",
ij:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
this.e=a.b
for(z=this.d,y=a.c,x=y.length,w=a.d,v=w.length,u=b.a,t=d.a,s=0;r=this.e,s<r;++s){if(s>=3)return H.a(z,s)
q=z[s]
if(s>=x)return H.a(y,s)
r=y[s]
q.e=r
if(s>=v)return H.a(w,s)
p=w[s]
q.f=p
if(r>>>0!==r||r>=8)return H.a(u,r)
o=u[r]
if(p>>>0!==p||p>=8)return H.a(t,p)
n=t[p]
p=q.a
G.v(c,o,p)
r=q.b
G.v(e,n,r)
m=q.c
l=r.a
r=m.a
r[1]=l[1]
r[0]=l[0]
m.v(p)
q.d=0}if(r>1){k=a.a
j=this.cJ()
if(j<0.5*k||2*k<j||j<11920928955078125e-23)this.e=0}if(this.e===0){q=z[0]
q.e=0
q.f=0
o=u[0]
n=t[0]
z=q.a
G.v(c,o,z)
y=q.b
G.v(e,n,y)
x=q.c
x.j(y)
x.v(z)
this.e=1}},
iF:function(a){var z,y,x,w,v,u,t
a.a=this.cJ()
a.b=this.e
for(z=a.c,y=this.d,x=z.length,w=a.d,v=w.length,u=0;u<this.e;++u){if(u>=3)return H.a(y,u)
t=J.d5(y[u].e)
if(u>=x)return H.a(z,u)
z[u]=t
t=J.d5(y[u].f)
if(u>=v)return H.a(w,u)
w[u]=t}},
es:function(a){var z,y
switch(this.e){case 1:a.j(this.a.c)
a.M()
return
case 2:z=this.f
z.j(this.b.c)
y=this.a.c
z.v(y)
a.j(y)
a.M()
if(z.ak(a)>0)z.b_(1,a)
else z.b_(-1,a)
return
default:a.N()
return}},
cH:function(a){var z,y,x
switch(this.e){case 0:a.N()
return
case 1:a.j(this.a.c)
return
case 2:z=this.x
y=this.b
z.j(y.c)
z.F(0,y.d)
y=this.r
x=this.a
y.j(x.c)
y.F(0,x.d)
y.C(0,z)
a.j(y)
return
case 3:a.N()
return
default:a.N()
return}},
cJ:function(){var z,y,x
switch(this.e){case 0:return 0
case 1:return 0
case 2:return Math.sqrt(this.a.c.cg(this.b.c))
case 3:z=this.y
z.j(this.b.c)
y=this.a.c
z.v(y)
x=this.z
x.j(this.c.c)
x.v(y)
return z.ak(x)
default:return 0}},
eG:function(){var z,y,x,w,v,u,t,s
z=this.a
y=z.c
x=this.b
w=x.c
v=this.f
v.j(w)
v.v(y)
u=-y.A(v)
if(u<=0){z.d=1
this.e=1
return}t=w.A(v)
if(t<=0){x.d=1
this.e=1
z.B(x)
return}s=1/(t+u)
z.d=t*s
x.d=u*s
this.e=2},
eH:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.cx
y=this.a
z.j(y.c)
x=this.cy
w=this.b
x.j(w.c)
v=this.db
u=this.c
v.j(u.c)
t=this.f
t.j(x)
t.v(z)
s=z.A(t)
r=x.A(t)
q=-s
p=this.Q
p.j(v)
p.v(z)
o=z.A(p)
n=v.A(p)
m=-o
l=this.ch
l.j(v)
l.v(x)
k=x.A(l)
j=v.A(l)
i=-k
h=t.ak(p)
g=h*x.ak(v)
f=h*v.ak(z)
e=h*z.ak(x)
if(q<=0&&m<=0){y.d=1
this.e=1
return}if(r>0&&q>0&&e<=0){d=1/(r+q)
y.d=r*d
w.d=q*d
this.e=2
return}if(n>0&&m>0&&f<=0){c=1/(n+m)
y.d=n*c
u.d=m*c
this.e=2
w.B(u)
return}if(r<=0&&i<=0){w.d=1
this.e=1
y.B(w)
return}if(n<=0&&j<=0){u.d=1
this.e=1
y.B(u)
return}if(j>0&&i>0&&g<=0){b=1/(j+i)
w.d=j*b
u.d=i*b
this.e=2
y.B(u)
return}a=1/(g+f+e)
y.d=g*a
w.d=f*a
u.d=e*a
this.e=3}},
fO:{"^":"d;a,b,c,d",
cL:function(a,b){var z,y,x,w,v
switch(a.a){case C.l:this.a[0].j(a.ga5(a))
this.b=1
this.c=a.b
break
case C.j:this.b=a.f
this.c=a.b
for(z=this.a,y=0;y<this.b;++y){if(y>=8)return H.a(z,y)
x=z[y]
w=a.d[y]
x.toString
v=w.gaD()
x=x.a
x[1]=v[1]
x[0]=v[0]}break
case C.w:z=this.d
z[0]=a.gdw().k(0,b)
x=b+1
if(C.c.S(x,a.giN()))z[1]=a.gdw().k(0,x)
else z[1]=a.gdw().k(0,0)
x=this.a
x[0].j(z[0])
x[1].j(z[1])
this.b=2
this.c=a.b
break
case C.o:z=this.a
z[0].j(a.gek())
z[1].j(a.gj7())
this.b=2
this.c=a.b
break}},
aM:function(a){var z,y,x,w,v
z=this.a
y=z[0].A(a)
for(x=0,w=1;w<this.b;++w){if(w>=8)return H.a(z,w)
v=z[w].A(a)
if(v>y){y=v
x=w}}return x},
fe:function(){var z,y
for(z=this.a,y=0;y<8;++y)z[y]=new E.b(new Float64Array(2))
this.b=0
this.c=0},
u:{
aK:function(){var z=[E.b]
z=new V.fO(H.k(new Array(8),z),null,null,H.k(new Array(2),z))
z.fe()
return z}}},
fN:{"^":"d;a,b,c,d,e,f,r",
hy:function(a5,a6,a7){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4
$.dp=$.dp+1
z=a7.a
y=a7.b
x=a7.c
w=a7.d
v=this.a
v.ij(a6,z,x,y,w)
u=v.d
t=this.d
v.cH(t)
s=t.gba()
for(r=this.b,q=r.length,p=this.c,o=p.length,n=x.b,m=this.e,l=m.a,k=this.f,j=z.a,i=w.b,h=y.a,g=0;g<20;s=c){f=v.e
for(e=0;e<f;++e){if(e>=3)return H.a(u,e)
d=u[e].e
if(e>=q)return H.a(r,e)
r[e]=d
d=u[e].f
if(e>=o)return H.a(p,e)
p[e]=d}switch(f){case 1:break
case 2:v.eG()
break
case 3:v.eH()
break}if(v.e===3)break
v.cH(t)
c=t.gba()
c>=s
v.es(m)
if(m.gba()<14210854715202004e-30)break
d=v.e
if(d>=3)return H.a(u,d)
b=u[d]
l[1]=-l[1]
l[0]=-l[0]
G.a2(n,m,k)
d=z.aM(k)
b.e=d
if(d>=8)return H.a(j,d)
d=j[d]
a=b.a
G.v(x,d,a)
l[1]=-l[1]
l[0]=-l[0]
G.a2(i,m,k)
d=y.aM(k)
b.f=d
if(d>=8)return H.a(h,d)
d=h[d]
a0=b.b
G.v(w,d,a0)
d=b.c
a1=a0.a
a0=d.a
a0[1]=a1[1]
a0[0]=a1[0]
d.v(a);++g
$.dq=$.dq+1
e=0
while(!0){if(!(e<f)){a2=!1
break}d=b.e
if(e>=q)return H.a(r,e)
if(J.z(d,r[e])){d=b.f
if(e>=o)return H.a(p,e)
d=J.z(d,p[e])}else d=!1
if(d){a2=!0
break}++e}if(a2)break;++v.e}$.dr=P.A($.dr,g)
t=a5.a
r=a5.b
switch(v.e){case 0:break
case 1:q=v.a
t.j(q.a)
r.j(q.b)
break
case 2:q=v.r
p=v.a
q.j(p.a)
q.F(0,p.d)
o=v.b
t.j(o.a)
t.F(0,o.d)
t.C(0,q)
q.j(p.b)
q.F(0,p.d)
r.j(o.b)
r.F(0,o.d)
r.C(0,q)
break
case 3:q=v.a
t.j(q.a)
t.F(0,q.d)
q=v.y
p=v.b
q.j(p.a)
q.F(0,p.d)
p=v.z
o=v.c
p.j(o.a)
p.F(0,o.d)
t.C(0,q)
t.C(0,p)
r.j(t)
break
default:break}a5.c=Math.sqrt(t.cg(r))
a5.d=g
v.iF(a6)
if(a7.e){a3=z.c
a4=y.c
v=a5.c
q=a3+a4
if(v>q&&v>11920928955078125e-23){a5.c=v-q
v=this.r
v.j(r)
v.v(t)
v.a1()
k.j(v)
k.F(0,a3)
t.C(0,k)
k.j(v)
k.F(0,a4)
r.v(k)}else{t.C(0,r)
t.F(0,0.5)
r.j(t)
a5.c=0}}}},
dm:{"^":"d;a,b,c,d,e"},
dn:{"^":"d;a,b,c,d"},
cq:{"^":"d;L:a>",
l:function(a){return C.a1.k(0,this.a)}},
hp:{"^":"d;bG:a>,dY:b<,I:c<,eh:d>,as:e<",
B:function(a){var z,y
for(z=this.a,y=0;y<a.gas();++y){if(y>=2)return H.a(z,y)
z[y].B(a.gbG(a)[y])}this.d=a.geh(a)
this.b.j(a.gdY())
this.c.j(a.gI())
this.e=a.gas()},
fj:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.dM(new E.b(x),0,0,new V.T(new Int8Array(4)))}},
u:{
K:function(){var z=new Array(2)
z.fixed$length=Array
z=new V.hp(H.k(z,[V.dM]),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),C.k,0)
z.fj()
return z}}},
dM:{"^":"d;I:a<,a7:b@,a9:c@,a3:d>",
B:function(a){this.a.j(a.gI())
this.b=a.ga7()
this.c=a.c
this.d.B(a.d)}},
cB:{"^":"d;ia:a<,b,c",
B:function(a){this.a.j(a.gia())
this.b.j(a.b)
this.c=a.c}},
e0:{"^":"d;a6:a<,hN:b<",
B:function(a){this.a.j(a.ga6())
this.b=a.ghN()}},
du:{"^":"e2;ek:c<,d,iC:e<,f,r,x,a6:y<,a,b"},
hs:{"^":"d;e_:a<,b,fh:c<",
B:function(a){this.a=a.ge_()
this.c=a.gfh()
this.b.j(a.b)}},
hR:{"^":"e2;c,d,e,f,r,x,y,z,Q,a,b",
he:function(a){var z,y,x,w,v,u
z=V.cw()
z.c.j(this.c)
for(y=z.e,x=this.e,w=z.d,v=this.d,u=0;u<8;++u){y[u].j(x[u])
w[u].j(v[u])}z.b=this.b
z.f=this.f
return z},
cM:function(a,b){var z,y,x
this.f=4
z=this.d
y=-a
x=-b
z[0].ah(y,x)
z[1].ah(a,x)
z[2].ah(a,b)
z[3].ah(y,b)
y=this.e
y[0].ah(0,-1)
y[1].ah(1,0)
y[2].ah(0,1)
y[3].ah(-1,0)
this.c.N()},
ce:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.d
y=z[0]
x=b.b
w=x.b
v=x.a
x=b.a.a
u=x[0]
t=x[1]
x=J.f(y)
s=x.gh(y)
if(typeof s!=="number")return H.e(s)
r=x.gi(y)
if(typeof r!=="number")return H.e(r)
q=a.a.a
q[0]=w*s-v*r+u
r=x.gh(y)
if(typeof r!=="number")return H.e(r)
x=x.gi(y)
if(typeof x!=="number")return H.e(x)
q[1]=v*r+w*x+t
x=a.b.a
x[0]=q[0]
x[1]=q[1]
for(p=1;p<this.f;++p){if(p>=8)return H.a(z,p)
o=z[p]
s=J.f(o)
r=s.gh(o)
if(typeof r!=="number")return H.e(r)
n=s.gi(o)
if(typeof n!=="number")return H.e(n)
m=w*r-v*n+u
n=s.gh(o)
if(typeof n!=="number")return H.e(n)
s=s.gi(o)
if(typeof s!=="number")return H.e(s)
l=v*n+w*s+t
s=q[0]
q[0]=s<m?s:m
s=q[1]
q[1]=s<l?s:l
s=x[0]
x[0]=s>m?s:m
s=x[1]
x[1]=s>l?s:l}z=q[0]
s=this.b
q[0]=z-s
q[1]=q[1]-s
x[0]=x[0]+s
x[1]=x[1]+s},
hk:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.r
z.N()
y=this.x
y.N()
for(x=this.d,w=0;v=this.f,w<v;++w){if(w>=8)return H.a(x,w)
y.C(0,x[w])}y.F(0,1/v)
u=this.y
t=this.z
for(s=t.a,v=u.a,r=z.a,q=y.a,p=0,o=0,w=0;w<this.f;){if(w>=8)return H.a(x,w)
n=x[w].gaD()
v[1]=n[1]
v[0]=n[0]
u.v(y)
s[1]=q[1]
s[0]=q[0]
s[1]=-s[1]
s[0]=-s[0];++w
if(w<this.f){if(w>=8)return H.a(x,w)
m=x[w]}else m=x[0]
t.C(0,m)
m=v[0]
l=s[1]
k=v[1]
j=s[0]
i=m*l-k*j
h=0.5*i
p+=h
k=h*0.3333333333333333
r[0]=r[0]+k*(m+j)
r[1]=r[1]+k*(v[1]+s[1])
g=v[0]
f=v[1]
e=s[0]
d=s[1]
o+=0.08333333333333333*i*(g*g+e*g+e*e+(f*f+d*f+d*d))}a.a=b*p
z.F(0,1/p)
x=a.b
x.j(z)
x.C(0,y)
v=o*b
a.c=v
a.c=v+a.a*x.A(x)},
fl:function(){var z,y
for(z=this.d,y=0;y<8;++y)z[y]=new E.b(new Float64Array(2))
for(z=this.e,y=0;y<8;++y)z[y]=new E.b(new Float64Array(2))
this.b=0.01},
u:{
cw:function(){var z,y,x,w
z=new Float64Array(H.c(2))
y=new Array(8)
y.fixed$length=Array
x=[E.b]
y=H.k(y,x)
w=new Array(8)
w.fixed$length=Array
x=new V.hR(new E.b(z),y,H.k(w,x),0,new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),G.B(),C.j,0)
x.fl()
return x}}},
e2:{"^":"d;"},
bM:{"^":"d;L:a>",
l:function(a){return C.X.k(0,this.a)}},
il:{"^":"d;a,b,c,d,e"},
bc:{"^":"d;L:a>",
l:function(a){return C.a2.k(0,this.a)}},
im:{"^":"d;a,b"},
iq:{"^":"d;a,b,c,d,e,f,r,x,y,z",
ix:function(a4,a5){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3
$.ec=$.ec+1
a4.a=C.E
a4.b=a5.e
z=a5.a
y=a5.b
x=this.x
x.B(a5.c)
w=this.y
w.B(a5.d)
x.a1()
w.a1()
v=a5.e
u=P.A(0.005,z.c+y.c-0.015)
t=this.a
t.b=0
s=this.b
s.a=z
s.b=y
s.e=!1
for(r=this.f,q=this.r,p=q.length,o=u+0.00125,n=u-0.00125,m=this.e,l=this.c,k=this.d,j=this.z.fy,i=0,h=0;!0;){x.an(l,i)
w.an(k,i)
s.c=l
s.d=k
j.hy(m,t,s)
g=m.c
if(g<=0){a4.a=C.a4
a4.b=0
break}if(g<o){a4.a=C.x
a4.b=i
break}r.hW(0,t,z,x,y,w,i)
e=v
d=0
while(!0){if(!!0){f=!1
break}c=r.hJ(q,e)
if(c>o){a4.a=C.a5
a4.b=v
f=!0
break}if(c>n){i=e
f=!1
break}if(0>=p)return H.a(q,0)
g=q[0]
if(1>=p)return H.a(q,1)
b=r.ac(g,q[1],i)
if(b<n){a4.a=C.F
a4.b=i
f=!0
break}if(b<=o){a4.a=C.x
a4.b=i
f=!0
break}for(a=e,a0=i,a1=0;!0;){a2=(a1&1)===1?a0+(u-b)*(a-a0)/(c-b):0.5*(a0+a)
a3=r.ac(q[0],q[1],a2)
if(Math.abs(a3-u)<0.00125){e=a2
break}if(a3>u){a0=a2
b=a3}else{a=a2
c=a3}++a1
$.eg=$.eg+1
if(a1===50)break}$.ef=P.A($.ef,a1);++d
if(d===8){f=!1
break}}++h
$.ed=$.ed+1
if(f)break
if(h===1000){a4.a=C.F
a4.b=i
break}}$.ee=P.A($.ee,h)}},
cD:{"^":"d;L:a>",
l:function(a){return C.a_.k(0,this.a)}},
i5:{"^":"d;a,b,c,I:d<,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go",
hW:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
this.a=c
this.b=e
z=b.b
this.f=d
this.r=f
y=this.fr
d.an(y,g)
x=this.fx
this.r.an(x,g)
if(z===1){this.c=C.t
g=this.x
w=this.a
v=b.c
if(0>=v.length)return H.a(v,0)
v=v[0]
w=w.a
if(v>>>0!==v||v>=8)return H.a(w,v)
g.j(w[v])
v=this.y
w=this.b
u=b.d
if(0>=u.length)return H.a(u,0)
u=u[0]
w=w.a
if(u>>>0!==u||u>=8)return H.a(w,u)
v.j(w[u])
u=this.z
G.v(y,g,u)
g=this.Q
G.v(x,v,g)
v=this.e
v.j(g)
v.v(u)
return v.a1()}else{g=b.c
w=g.length
if(0>=w)return H.a(g,0)
v=g[0]
if(1>=w)return H.a(g,1)
w=b.d
u=this.z
t=this.d
s=this.cy
r=this.e
q=this.Q
p=this.dy
o=w.length
if(J.z(v,g[1])){this.c=C.v
v=this.db
n=this.b
if(0>=o)return H.a(w,0)
m=w[0]
n=n.a
if(m>>>0!==m||m>=8)return H.a(n,m)
v.j(n[m])
m=this.dx
n=this.b
if(1>=o)return H.a(w,1)
w=w[1]
n=n.a
if(w>>>0!==w||w>=8)return H.a(n,w)
m.j(n[w])
p.j(m)
p.v(v)
p.b_(-1,r)
r.a1()
G.V(x.b,r,s)
t.j(v)
t.C(0,m)
t.F(0,0.5)
G.v(x,t,q)
t=this.x
x=this.a
g=g[0]
x=x.a
if(g>>>0!==g||g>=8)return H.a(x,g)
t.j(x[g])
G.v(y,t,u)
p.j(u)
p.v(q)
l=p.A(s)
if(l<0){r.M()
l=-l}return l}else{this.c=C.u
v=this.ch
n=this.a
m=g[0]
n=n.a
if(m>>>0!==m||m>=8)return H.a(n,m)
v.j(n[m])
m=this.cx
n=this.a
g=g[1]
n=n.a
if(g>>>0!==g||g>=8)return H.a(n,g)
m.j(n[g])
p.j(m)
p.v(v)
p.b_(-1,r)
r.a1()
G.V(y.b,r,s)
t.j(v)
t.C(0,m)
t.F(0,0.5)
G.v(y,t,u)
t=this.y
y=this.b
if(0>=o)return H.a(w,0)
w=w[0]
y=y.a
if(w>>>0!==w||w>=8)return H.a(y,w)
t.j(y[w])
G.v(x,t,q)
p.j(q)
p.v(u)
l=p.A(s)
if(l<0){r.M()
l=-l}return l}}},
hJ:function(a,b){var z,y,x,w,v,u,t
z=this.fr
this.f.an(z,b)
y=this.fx
this.r.an(y,b)
x=a.length
switch(this.c){case C.t:w=this.e
v=this.fy
G.a2(z.b,w,v)
w.M()
u=this.go
G.a2(y.b,w,u)
w.M()
v=this.a.aM(v)
if(0>=x)return H.a(a,0)
a[0]=v
u=this.b.aM(u)
if(1>=x)return H.a(a,1)
a[1]=u
u=this.x
x=this.a
v=a[0]
x=x.a
if(v>>>0!==v||v>=8)return H.a(x,v)
u.j(x[v])
v=this.y
x=this.b
t=a[1]
x=x.a
if(t>>>0!==t||t>=8)return H.a(x,t)
v.j(x[t])
t=this.z
G.v(z,u,t)
u=this.Q
G.v(y,v,u)
u.v(t)
return u.A(w)
case C.u:w=this.cy
G.V(z.b,this.e,w)
v=this.z
G.v(z,this.d,v)
w.M()
z=this.go
G.a2(y.b,w,z)
w.M()
if(0>=x)return H.a(a,0)
a[0]=-1
z=this.b.aM(z)
if(1>=x)return H.a(a,1)
a[1]=z
x=this.y
u=this.b.a
if(z>=8)return H.a(u,z)
x.j(u[z])
z=this.Q
G.v(y,x,z)
z.v(v)
return z.A(w)
case C.v:w=this.cy
G.V(y.b,this.e,w)
v=this.Q
G.v(y,this.d,v)
w.M()
y=this.fy
G.a2(z.b,w,y)
w.M()
if(1>=x)return H.a(a,1)
a[1]=-1
y=this.a.aM(y)
a[0]=y
x=this.x
u=this.a.a
if(y>=8)return H.a(u,y)
x.j(u[y])
y=this.z
G.v(z,x,y)
y.v(v)
return y.A(w)
default:if(0>=x)return H.a(a,0)
a[0]=-1
if(1>=x)return H.a(a,1)
a[1]=-1
return 0}},
ac:function(a,b,c){var z,y,x,w,v,u
z=this.fr
this.f.an(z,c)
y=this.fx
this.r.an(y,c)
switch(this.c){case C.t:x=this.e
G.a2(z.b,x,this.fy)
x.M()
G.a2(y.b,x,this.go)
x.M()
w=this.x
v=this.a.a
if(a>>>0!==a||a>=8)return H.a(v,a)
w.j(v[a])
v=this.y
u=this.b.a
if(b>>>0!==b||b>=8)return H.a(u,b)
v.j(u[b])
u=this.z
G.v(z,w,u)
w=this.Q
G.v(y,v,w)
w.v(u)
return w.A(x)
case C.u:x=this.cy
G.V(z.b,this.e,x)
w=this.z
G.v(z,this.d,w)
x.M()
G.a2(y.b,x,this.go)
x.M()
z=this.y
v=this.b.a
if(b>>>0!==b||b>=8)return H.a(v,b)
z.j(v[b])
v=this.Q
G.v(y,z,v)
v.v(w)
return v.A(x)
case C.v:x=this.cy
G.V(y.b,this.e,x)
w=this.Q
G.v(y,this.d,w)
x.M()
G.a2(z.b,x,this.fy)
x.M()
y=this.x
v=this.a.a
if(a>>>0!==a||a>=8)return H.a(v,a)
y.j(v[a])
v=this.z
G.v(z,y,v)
v.v(w)
return v.A(x)
default:return 0}}},
iE:{"^":"d;a6:a<,b,c,d,e",
dT:function(a,b,c,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
if(b.e===0)return
switch(b.d){case C.k:z=this.d
y=this.e
x=this.a
w=x.a
w[0]=1
w[1]=0
v=c.b
u=v.b
t=b.c.a
s=t[0]
v=v.a
r=c.a.a
q=z.a
q[0]=u*s-v*t[1]+r[0]
q[1]=v*t[0]+u*t[1]+r[1]
p=b.a[0].gI()
r=a1.b
t=r.b
u=p.a
v=u[0]
r=r.a
s=a1.a.a
o=y.a
o[0]=t*v-r*u[1]+s[0]
o[1]=r*u[0]+t*u[1]+s[1]
if(z.cg(y)>14210854715202004e-30){w[0]=o[0]-q[0]
w[1]=o[1]-q[1]
x.a1()}x=w[0]
n=x*a0+q[0]
v=w[1]
m=v*a0+q[1]
l=-x*a2+o[0]
k=-v*a2+o[1]
o=this.b[0].a
o[0]=(n+l)*0.5
o[1]=(m+k)*0.5
this.c[0]=(l-n)*w[0]+(k-m)*w[1]
break
case C.i:j=this.d
x=this.a
G.V(c.b,b.b,x)
G.aP(c,b.c,j)
i=this.e
for(w=b.a,v=i.a,u=j.a,x=x.a,t=this.b,s=this.c,h=0;h<b.e;++h){if(h>=2)return H.a(w,h)
G.aP(a1,w[h].gI(),i)
r=v[0]
q=u[0]
o=x[0]
g=v[1]
f=u[1]
e=x[1]
d=a0-((r-q)*o+(g-f)*e)
n=o*d+r
m=e*d+g
l=-o*a2+r
k=-e*a2+g
g=t[h].a
g[0]=(n+l)*0.5
g[1]=(m+k)*0.5
s[h]=(l-n)*x[0]+(k-m)*x[1]}break
case C.q:j=this.d
x=this.a
G.V(a1.b,b.b,x)
G.aP(a1,b.c,j)
i=this.e
for(w=b.a,v=i.a,u=j.a,x=x.a,t=this.b,s=this.c,h=0;h<b.e;++h){if(h>=2)return H.a(w,h)
G.aP(c,w[h].gI(),i)
r=v[0]
q=u[0]
o=x[0]
g=v[1]
f=u[1]
e=x[1]
d=a2-((r-q)*o+(g-f)*e)
l=o*d+r
k=e*d+g
n=-o*a0+r
m=-e*a0+g
g=t[h].a
g[0]=(n+l)*0.5
g[1]=(m+k)*0.5
s[h]=(n-l)*x[0]+(m-k)*x[1]}x[0]=-x[0]
x[1]=-x[1]
break}},
fs:function(){var z,y
for(z=this.b,y=0;y<2;++y)z[y]=new E.b(new Float64Array(2))},
u:{
ez:function(){var z=new V.iE(new E.b(new Float64Array(H.c(2))),H.k(new Array(2),[E.b]),new Float64Array(H.c(2)),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))))
z.fs()
return z}}},
bl:{"^":"d;fB:a<,aj:b@,c,d,e,a2:f<,c2:r<,cX:x<,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,au:k4<,r1,r2,rx",
dJ:function(a){var z,y
z=this.Q
if((z.a&2)===2)return
y=new V.h_(0,null,null,null,0,0,null,0,new V.ck(1,65535,0),!1,null,V.aI(),V.aI(),new E.b(new Float64Array(H.c(2))))
y.hp(this,a)
if((this.b&32)===32)y.hq(z.b.a,this.d)
y.b=this.cy
this.cy=y;++this.db
y.c=this
if(y.a>0)this.im()
z.a|=1
return y},
h7:function(a,b){var z,y,x
if(this.a!==C.h)return
if((this.b&2)!==2)this.a_(!0)
z=this.y.a
y=a.a
z[0]=z[0]+y[0]
z[1]=z[1]+y[1]
z=b.a
x=this.f.c.a
this.z=this.z+((z[0]-x[0])*y[1]-(z[1]-x[1])*y[0])},
by:function(a,b,c){var z,y,x,w,v,u,t,s
if(this.a!==C.h)return
if((this.b&2)!==2)this.a_(!0)
z=this.r.a
y=z[0]
x=a.a
w=x[0]
v=this.fx
z[0]=y+w*v
z[1]=z[1]+x[1]*v
v=this.x
z=this.go
w=J.f(b)
y=w.gh(b)
u=this.f.c.a
t=u[0]
if(typeof y!=="number")return y.n()
s=x[1]
w=w.gi(b)
u=u[1]
if(typeof w!=="number")return w.n()
this.x=J.p(v,z*((y-t)*s-(w-u)*x[0]))},
ge_:function(){return this.fr},
im:function(){var z,y,x,w,v,u,t,s,r,q,p,o
this.fr=0
this.fx=0
this.fy=0
this.go=0
z=this.f
y=z.a
y.N()
x=this.a
if(x===C.f||x===C.H){y=this.d.a
z.b.j(y)
z.c.j(y)
z.d=z.e
return}x=this.Q.ch.a
w=x.a
v=x.b++
u=w.length
if(v<0||v>=u)return H.a(w,v)
t=w[v]
t.N()
v=x.b++
if(v<0||v>=u)return H.a(w,v)
s=w[v]
r=this.r2
for(q=this.cy,v=r.b;q!=null;q=q.b){p=q.a
if(p===0)continue
q.d.hk(r,p)
this.fr=this.fr+r.a
s.j(v)
s.F(0,r.a)
t.C(0,s)
this.fy=this.fy+r.c}v=this.fr
if(v>0){v=1/v
this.fx=v
t.F(0,v)}else{this.fr=1
this.fx=1}v=this.fy
if(v>0&&(this.b&16)===0){v-=this.fr*t.A(t)
this.fy=v
this.go=1/v}else{this.fy=0
this.go=0}v=x.b++
if(v<0||v>=u)return H.a(w,v)
o=w[v]
v=z.c
o.j(v)
y.j(t)
z=z.b
G.v(this.d,y,z)
v.j(z)
s.j(v)
s.v(o)
s.b_(this.x,o)
this.r.C(0,o)
x.b-=3},
bl:function(){return this.a},
a_:function(a){var z
if(a){z=this.b
if((z&2)===0){this.b=z|2
this.k3=0}}else{this.b&=4294967293
this.k3=0
this.r.N()
this.x=0
this.y.N()
this.z=0}},
cQ:function(){var z,y,x,w,v,u,t,s,r
z=this.rx
y=z.b
x=this.f
y.a=Math.sin(H.aW(x.d))
w=Math.cos(H.aW(x.d))
y.b=w
v=x.b.a
u=v[0]
x=x.a.a
t=x[0]
y=y.a
s=z.a.a
s[0]=u-w*t+y*x[1]
s[1]=v[1]-y*x[0]-w*x[1]
for(r=this.cy,y=this.Q,x=this.d;r!=null;r=r.b)r.f7(y.b.a,z,x)},
aO:function(){var z,y,x,w,v,u,t
z=this.d
y=z.b
x=this.f
y.a=Math.sin(H.aW(x.e))
w=Math.cos(H.aW(x.e))
y.b=w
v=x.c.a
u=v[0]
x=x.a.a
t=x[0]
y=y.a
z=z.a.a
z[0]=u-w*t+y*x[1]
z[1]=v[1]-y*x[0]-w*x[1]},
cN:function(a){var z
if(this.a!==C.h&&a.a!==C.h)return!1
for(z=this.dx;!1;z=z.gaY())z.gi9()
return!0},
aE:function(a){var z,y,x,w,v
z=this.f
z.aE(a)
y=z.c
y.j(z.b)
x=z.d
z.e=x
w=this.d
v=w.b
v.bL(x)
w=w.a
G.V(v,z.a,w)
w.F(0,-1)
w.C(0,y)},
l:function(a){return"Body[pos: "+this.d.a.l(0)+" linVel: "+this.r.l(0)+" angVel: "+H.h(this.x)+"]"}},
fr:{"^":"d;a,au:b<,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
bl:function(){return this.a},
a_:function(a){this.z=!1}},
cc:{"^":"d;L:a>",
l:function(a){return C.Z.k(0,this.a)}},
fB:{"^":"d;a,b,c,d,e,f",
h6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a.gb5()
y=b.gb5()
x=a.c
w=b.c
v=z.c
u=y.c
if(v==null?u==null:v===u)return
t=u.dy
for(;t!=null;){s=t.a
if(s==null?v==null:s===v){s=t.b
r=s.f
q=s.r
p=s.x
o=s.y
if((r==null?z==null:r===z)&&p===x&&(q==null?y==null:q===y)&&o===w)return
if((r==null?y==null:r===y)&&p===w&&(q==null?z==null:q===z)&&o===x)return}t=t.d}if(!u.cN(v))return
if(!this.d.cO(z,y))return
n=this.f.ib(z,x,y,w)
if(n==null)return
z=n.ghL()
y=n.r
v=z.c
u=y.c
n.b=null
s=this.b
n.c=s
if(s!=null)s.b=n
this.b=n
s=n.d
s.b=n
s.a=u
s.c=null
m=v.dy
s.d=m
if(m!=null)m.c=s
v.dy=s
s=n.e
s.b=n
s.a=v
s.c=null
m=u.dy
s.d=m
if(m!=null)m.c=s
u.dy=s
z.z
y.z
v.a_(!0)
u.a_(!0);++this.c},
cf:function(a){var z,y,x,w,v,u,t,s,r,q
z=a.f
y=a.r
x=z.c
w=y.c
v=a.b
if(v!=null)v.c=a.c
u=a.c
if(u!=null)u.b=v
if(a===this.b)this.b=u
v=a.d
u=v.c
if(u!=null)u.d=v.d
t=v.d
if(t!=null)t.c=u
if(v===x.dy)x.dy=t
v=a.e
u=v.c
if(u!=null)u.d=v.d
t=v.d
if(t!=null)t.c=u
if(v===w.dy)w.dy=t
z=a.f
y=a.r
if(a.z.e>0){z.z
y.z
v=!0}else v=!1
if(v){z.c.a_(!0)
y.c.a_(!0)}s=z.d.a
r=y.d.a
v=this.f.fy
u=s.a
if(u>=v.length)return H.a(v,u)
u=v[u]
v=r.a
if(v>=u.length)return H.a(u,v)
q=u[v].a
v=q.a
u=--q.b
if(u<0||u>=v.length)return H.a(v,u)
v[u]=a;--this.c},
hf:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=this.b
for(;z!=null;){y=z.f
x=z.r
w=z.x
v=z.y
u=y.c
t=x.c
if((z.a&8)===8){if(!t.cN(u)){s=z.c
this.cf(z)
z=s
continue}if(!this.d.cO(y,x)){s=z.c
this.cf(z)
z=s
continue}z.a&=4294967287}r=(u.b&2)===2&&u.a!==C.f
q=(t.b&2)===2&&t.a!==C.f
if(!r&&!q){z=z.c
continue}p=y.r
if(w>=p.length)return H.a(p,w)
o=p[w].gbc()
p=x.r
if(v>=p.length)return H.a(p,v)
n=p[v].gbc()
if(!this.a.iv(o,n)){s=z.c
this.cf(z)
z=s
continue}z.cE(this.e)
z=z.c}},
f8:function(a,b){this.b=null
this.d=new V.fA()
this.e=null
this.a=b},
u:{
fC:function(a,b){var z=new V.fB(null,null,0,null,null,a)
z.f8(a,b)
return z}}},
bn:{"^":"ad;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ad:function(a,b,c,d){this.bn(a,b,c,d)},
ac:function(a,b,c){var z=this.fr
this.f.d.en(z,this.x)
this.dx.fr.dF(a,z,b,this.r.d,c)}},
bo:{"^":"ad;fr,a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ad:function(a,b,c,d){this.bn(a,b,c,d)},
ac:function(a,b,c){var z,y,x
z=this.fr
this.f.d.en(z,this.x)
y=this.dx.fr
x=this.r.d
y.k3.dE(a,z,b,x,c)}},
bp:{"^":"ad;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ac:function(a,b,c){this.dx.fr.hg(a,this.f.d,b,this.r.d,c)}},
ad:{"^":"d;aj:a@",
ad:["bn",function(a,b,c,d){var z,y
this.a=4
this.f=a
this.r=c
this.x=b
this.y=d
this.z.e=0
this.b=null
this.c=null
z=this.d
z.b=null
z.c=null
z.d=null
z.a=null
z=this.e
z.b=null
z.c=null
z.d=null
z.a=null
this.Q=0
this.cx=Math.sqrt(a.e*c.e)
z=a.f
y=c.f
this.cy=z>y?z:y
this.db=0}],
ghL:function(){return this.f},
cE:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.dy
y=this.z
z.B(y)
x=this.a|=4
w=(x&2)===2
x=this.f
x.z
v=this.r
v.z
u=x.c
t=v.c
s=u.d
r=t.d
this.ac(y,s,r)
q=y.e>0
for(x=z.a,v=y.a,p=0;p<y.e;++p){if(p>=2)return H.a(v,p)
o=v[p]
o.sa7(0)
o.sa9(0)
n=o.ga3(o)
for(m=0;m<z.e;++m){if(m>=2)return H.a(x,m)
l=x[m]
if(J.a8(l).i0(n)){o.b=l.ga7()
o.c=l.ga9()
break}}}if(q!==w){u.a_(!0)
t.a_(!0)}z=this.a
if(q)this.a=z|2
else this.a=z&4294967293
return}},
I:{"^":"d;a,b,c,d"},
cg:{"^":"d;a,dY:b<,I:c<,D:d@,E:e@,b9:f@,bF:r@,cu:x<,y,bE:z<,cr:Q<,eh:ch>,ii:cx<,cy,as:db<",
f9:function(){var z,y
for(z=this.a,y=0;y<2;++y)z[y]=new E.b(new Float64Array(2))},
u:{
db:function(){var z=new V.cg(H.k(new Array(2),[E.b]),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,0,0,0,new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,0,null,0,0,0)
z.f9()
return z}}},
br:{"^":"d;a,b"},
bt:{"^":"d;a,b,c,d,e"},
fD:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q",
dR:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
this.a=a.a
z=a.c
this.r=z
y=this.d
x=y.length
if(x<z){z=new Array(P.A(x*2,z))
z.fixed$length=Array
z=H.k(z,[V.cg])
this.d=z
C.d.Y(z,0,x,y,0)
for(;z=this.d,x<z.length;++x)z[x]=V.db()}z=this.e
x=z.length
y=this.r
if(x<y){y=new Array(P.A(x*2,y))
y.fixed$length=Array
y=H.k(y,[V.ch])
this.e=y
C.d.Y(y,0,x,z,0)
for(;z=this.e,x<z.length;++x)z[x]=V.dc()}this.b=a.d
this.c=a.e
this.f=a.b
for(x=0;x<this.r;++x){z=this.f
if(x>=z.length)return H.a(z,x)
w=z[x]
v=w.f
u=w.r
t=v.d
s=u.d
r=t.b
q=s.b
p=v.c
o=u.c
n=w.z
m=n.e
z=this.e
if(x>=z.length)return H.a(z,x)
l=z[x]
l.sdN(w.cx)
l.se9(w.cy)
l.siu(w.db)
z=p.c
l.e=z
l.f=o.c
l.r=p.fx
l.x=o.fx
l.y=p.go
l.z=o.go
l.db=x
l.cy=m
y=l.d.a
y[0]=0
y[1]=0
y[2]=0
y[3]=0
y=l.c.a
y[0]=0
y[1]=0
y[2]=0
y[3]=0
y=this.d
if(x>=y.length)return H.a(y,x)
k=y[x]
k.sD(z)
k.sE(o.c)
k.sb9(p.fx)
k.sbF(o.fx)
z=k.gcu()
j=p.f.a.a
z=z.a
z[1]=j[1]
z[0]=j[0]
z=k.y
j=o.f.a.a
z=z.a
z[1]=j[1]
z[0]=j[0]
k.z=p.go
k.Q=o.go
j=n.b.a
z=k.b.a
z[1]=j[1]
z[0]=j[0]
j=n.c.a
z=k.c.a
z[1]=j[1]
z[0]=j[0]
k.db=m
k.cx=r
k.cy=q
k.ch=n.d
for(z=k.a,y=n.a,i=l.a,h=0;h<m;++h){if(h>=2)return H.a(y,h)
g=y[h]
f=i[h]
e=this.a
if(e.f){f.sa7(e.c*g.ga7())
f.sa9(this.a.c*g.ga9())}else{f.sa7(0)
f.sa9(0)}e=f.gat().a
e[0]=0
e[1]=0
e=f.b.a
e[0]=0
e[1]=0
f.e=0
f.f=0
f.r=0
e=z[h]
d=g.gI().a[0]
e.a[0]=d
d=z[h]
e=g.gI().a[1]
d.a[1]=e}}},
iE:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
for(z=0;z<this.r;++z){y=this.e
if(z>=y.length)return H.a(y,z)
x=y[z]
w=x.gD()
v=x.gE()
u=x.gb9()
t=x.gbE()
s=x.gbF()
r=x.gcr()
q=x.gas()
y=this.c
if(w>>>0!==w||w>=y.length)return H.a(y,w)
p=y[w].gP()
y=this.c
if(w>=y.length)return H.a(y,w)
o=y[w].gR()
y=this.c
if(v>>>0!==v||v>=y.length)return H.a(y,v)
n=y[v].gP()
y=this.c
if(v>=y.length)return H.a(y,v)
m=y[v].gR()
y=x.ga6().a
l=y[1]
k=-1*y[0]
for(j=x.a,i=p.a,h=n.a,g=0;g<q;++g){if(g>=2)return H.a(j,g)
f=j[g]
e=l*f.ga9()+y[0]*f.ga7()
d=k*f.ga9()+y[1]*f.ga7()
o=J.r(o,t*(f.gat().a[0]*d-f.a.a[1]*e))
i[0]=i[0]-e*u
i[1]=i[1]-d*u
c=f.b.a
m=J.p(m,r*(c[0]*d-c[1]*e))
h[0]=h[0]+e*s
h[1]=h[1]+d*s}y=this.c
if(w>=y.length)return H.a(y,w)
y[w].sR(o)
y=this.c
if(v>=y.length)return H.a(y,v)
y[v].sR(m)}},
dU:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9,e0,e1,e2,e3,e4
for(z=this.z,y=z.b,x=this.x,w=x.a.a,v=this.y,u=v.a.a,t=z.a.a,s=x.b,r=v.b,q=0;q<this.r;++q){p=this.e
if(q>=p.length)return H.a(p,q)
o=p[q]
p=this.d
if(q>=p.length)return H.a(p,q)
n=p[q]
m=n.gii()
l=n.cy
p=this.f
k=o.gdG()
if(k>=p.length)return H.a(p,k)
j=p[k].z
i=o.e
h=o.f
g=o.r
f=o.x
e=o.y
d=o.z
c=n.x
b=n.y
k=this.b
if(i>>>0!==i||i>=k.length)return H.a(k,i)
a=k[i].gH()
k=this.b
if(i>=k.length)return H.a(k,i)
a0=J.a0(k[i])
k=this.c
if(i>=k.length)return H.a(k,i)
a1=k[i].gP()
k=this.c
if(i>=k.length)return H.a(k,i)
a2=k[i].gR()
k=this.b
if(h>>>0!==h||h>=k.length)return H.a(k,h)
a3=k[h].gH()
k=this.b
if(h>=k.length)return H.a(k,h)
a4=J.a0(k[h])
k=this.c
if(h>=k.length)return H.a(k,h)
a5=k[h].gP()
k=this.c
if(h>=k.length)return H.a(k,h)
a6=k[h].gR()
p=typeof a0!=="number"
if(p)H.y(H.x(a0))
s.a=Math.sin(a0)
if(p)H.y(H.x(a0))
s.b=Math.cos(a0)
p=typeof a4!=="number"
if(p)H.y(H.x(a4))
r.a=Math.sin(a4)
if(p)H.y(H.x(a4))
r.b=Math.cos(a4)
p=J.f(a)
k=c.a
w[0]=p.gh(a)-(s.b*k[0]-s.a*k[1])
w[1]=p.gi(a)-(s.a*k[0]+s.b*k[1])
k=J.f(a3)
a7=b.a
u[0]=k.gh(a3)-(r.b*a7[0]-r.a*a7[1])
u[1]=k.gi(a3)-(r.a*a7[0]+r.b*a7[1])
z.dT(0,j,x,m,v,l)
a7=o.b.a
a7[0]=t[0]
a7[1]=t[1]
a8=o.cy
for(a9=a5.a,b0=J.O(a6),b1=a1.a,b2=J.O(a2),b3=g+f,b4=o.a,b5=0;b5<a8;++b5){if(b5>=2)return H.a(b4,b5)
b6=b4[b5]
b7=y[b5]
b8=b6.gat()
b9=b6.b
c0=b7.a
c1=b8.a
c1[0]=c0[0]-p.gh(a)
c1[1]=c0[1]-p.gi(a)
c2=b9.a
c2[0]=c0[0]-k.gh(a3)
c2[1]=c0[1]-k.gi(a3)
c0=c1[0]
c3=a7[1]
c4=c1[1]
c5=a7[0]
c6=c0*c3-c4*c5
c7=c2[0]
c8=c2[1]
c9=c7*c3-c8*c5
d0=b3+e*c6*c6+d*c9*c9
b6.e=d0>0?1/d0:0
d1=-1*c5
d2=c0*d1-c4*c3
d3=c7*d1-c8*c3
d4=b3+e*d2*d2+d*d3*d3
b6.f=d4>0?1/d4:0
b6.r=0
c0=a9[0]
c3=J.q(b0.ag(a6),c2[1])
if(typeof c3!=="number")return H.e(c3)
c4=b1[0]
c5=J.q(b2.ag(a2),c1[1])
if(typeof c5!=="number")return H.e(c5)
c7=a9[1]
c2=b0.m(a6,c2[0])
if(typeof c2!=="number")return H.e(c2)
c8=b1[1]
c1=b2.m(a2,c1[0])
if(typeof c1!=="number")return H.e(c1)
d5=a7[0]*(c0+c3-c4-c5)+a7[1]*(c7+c2-c8-c1)
if(d5<-1)b6.r=-o.ch*d5}if(o.cy===2){d6=b4[0]
d7=b4[1]
p=d6.gat().a[0]
k=a7[1]
a9=d6.a.a[1]
b0=a7[0]
d8=p*k-a9*b0
a9=d6.b.a
d9=a9[0]*k-a9[1]*b0
b0=d7.gat().a[0]
a9=a7[1]
k=d7.a.a[1]
a7=a7[0]
e0=b0*a9-k*a7
k=d7.b.a
e1=k[0]*a9-k[1]*a7
a7=e*d8
k=d*d9
e2=b3+a7*d8+k*d9
e3=b3+e*e0*e0+d*e1*e1
e4=b3+a7*e0+k*e1
if(e2*e2<100*(e2*e3-e4*e4)){p=o.d
k=p.a
k[3]=e3
k[2]=e4
k[1]=e4
k[0]=e2
k=o.c
k.j(p)
k.i_()}else o.cy=1}}},
cP:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5,c6,c7,c8,c9,d0,d1,d2,d3,d4,d5,d6,d7,d8,d9
for(z=0;z<this.r;++z){y=this.e
if(z>=y.length)return H.a(y,z)
x=y[z]
w=x.gD()
v=x.gE()
u=x.gb9()
t=x.gbF()
s=x.gbE()
r=x.gcr()
q=x.gas()
y=this.c
if(w>>>0!==w||w>=y.length)return H.a(y,w)
p=y[w].gP()
y=this.c
if(w>=y.length)return H.a(y,w)
o=y[w].gR()
y=this.c
if(v>>>0!==v||v>=y.length)return H.a(y,v)
n=y[v].gP()
y=this.c
if(v>=y.length)return H.a(y,v)
m=y[v].gR()
y=x.ga6().a
l=y[0]
k=y[1]
y=x.b.a
j=y[1]
i=-1*y[0]
h=x.Q
for(y=x.a,g=n.a,f=p.a,e=0;e<q;++e){if(e>=2)return H.a(y,e)
d=y[e]
c=d.gat()
b=J.O(m)
a=b.ag(m)
a0=d.b.a
a1=c.a
a2=J.aX(o)
a3=J.p(J.r(J.p(J.q(a,a0[1]),g[0]),f[0]),a2.m(o,a1[1]))
a4=J.r(J.r(J.p(b.m(m,a0[0]),g[1]),f[1]),a2.m(o,a1[0]))
a5=J.r(J.p(J.q(a3,j),J.q(a4,i)),x.cx)
a1=d.f
a=J.c2(a5)
if(typeof a!=="number")return H.e(a)
a6=h*d.c
a7=P.A(-a6,P.Q(d.d+a1*a,a6))
a8=a7-d.d
d.d=a7
a9=j*a8
b0=i*a8
f[0]=f[0]-a9*u
f[1]=f[1]-b0*u
a=d.a.a
o=a2.n(o,s*(a[0]*b0-a[1]*a9))
g[0]=g[0]+a9*t
g[1]=g[1]+b0*t
m=b.p(m,r*(a0[0]*b0-a0[1]*a9))}b=J.aX(m)
a=J.aX(o)
if(x.cy===1){d=y[0]
y=J.r(J.p(J.q(b.ag(m),d.gih().a[1]),g[0]),f[0])
a0=d.a.a
a3=J.p(y,a.m(o,a0[1]))
y=d.b.a
a4=J.r(J.r(J.p(b.m(m,y[0]),g[1]),f[1]),a.m(o,a0[0]))
b1=J.p(J.q(a3,l),J.q(a4,k))
a1=d.e
a2=J.r(b1,d.r)
if(typeof a2!=="number")return H.e(a2)
b2=d.c
c=b2+-a1*a2
a7=c>0?c:0
a8=a7-b2
d.c=a7
a9=l*a8
b0=k*a8
f[0]=f[0]-a9*u
f[1]=f[1]-b0*u
o=a.n(o,s*(a0[0]*b0-a0[1]*a9))
g[0]=g[0]+a9*t
g[1]=g[1]+b0*t
m=b.p(m,r*(y[0]*b0-y[1]*a9))}else{b3=y[0]
b4=y[1]
b5=b3.gat()
b6=b3.b
b7=b4.gat()
b8=b4.b
b9=b3.c
c0=b4.c
y=b6.a
a0=b5.a
c1=J.p(J.r(J.p(J.q(b.ag(m),y[1]),g[0]),f[0]),a.m(o,a0[1]))
c2=J.r(J.r(J.p(b.m(m,y[0]),g[1]),f[1]),a.m(o,a0[0]))
a1=b8.a
a2=b7.a
c3=J.p(J.r(J.p(J.q(b.ag(m),a1[1]),g[0]),f[0]),a.m(o,a2[1]))
c4=J.r(J.r(J.p(b.m(m,a1[0]),g[1]),f[1]),a.m(o,a2[0]))
c5=J.p(J.q(c1,l),J.q(c2,k))
c6=J.p(J.q(c3,l),J.q(c4,k))
c7=J.r(c5,b3.r)
c8=J.r(c6,b4.r)
b2=x.d.a
c7=J.r(c7,b2[0]*b9+b2[2]*c0)
c8=J.r(c8,b2[1]*b9+b2[3]*c0)
$loop$1:{c9=x.c.a
d0=c9[0]
if(typeof c7!=="number")return H.e(c7)
d1=c9[2]
if(typeof c8!=="number")return H.e(c8)
d2=(d0*c7+d1*c8)*-1
d3=(c9[1]*c7+c9[3]*c8)*-1
if(d2>=0&&d3>=0){d4=d2-b9
d5=d3-c0
d6=d4*l
d7=d4*k
d8=d5*l
d9=d5*k
b2=d6+d8
f[0]=f[0]-u*b2
c9=d7+d9
f[1]=f[1]-u*c9
g[0]=g[0]+t*b2
g[1]=g[1]+t*c9
o=a.n(o,s*(a0[0]*d7-a0[1]*d6+(a2[0]*d9-a2[1]*d8)))
m=b.p(m,r*(y[0]*d7-y[1]*d6+(a1[0]*d9-a1[1]*d8)))
b3.c=d2
b4.c=d3
break $loop$1}d2=-b3.e*c7
c9=b2[1]
if(d2>=0&&c9*d2+c8>=0){d4=d2-b9
d5=0-c0
d6=l*d4
d7=k*d4
d8=l*d5
d9=k*d5
b2=d6+d8
f[0]=f[0]-u*b2
c9=d7+d9
f[1]=f[1]-u*c9
g[0]=g[0]+t*b2
g[1]=g[1]+t*c9
o=a.n(o,s*(a0[0]*d7-a0[1]*d6+(a2[0]*d9-a2[1]*d8)))
m=b.p(m,r*(y[0]*d7-y[1]*d6+(a1[0]*d9-a1[1]*d8)))
b3.c=d2
b4.c=0
break $loop$1}d3=-b4.e*c8
b2=b2[2]
if(d3>=0&&b2*d3+c7>=0){d4=0-b9
d5=d3-c0
d6=l*d4
d7=k*d4
d8=l*d5
d9=k*d5
b2=d6+d8
f[0]=f[0]-u*b2
c9=d7+d9
f[1]=f[1]-u*c9
g[0]=g[0]+t*b2
g[1]=g[1]+t*c9
o=a.n(o,s*(a0[0]*d7-a0[1]*d6+(a2[0]*d9-a2[1]*d8)))
m=b.p(m,r*(y[0]*d7-y[1]*d6+(a1[0]*d9-a1[1]*d8)))
b3.c=0
b4.c=d3
break $loop$1}if(c7>=0&&c8>=0){d4=0-b9
d5=0-c0
d6=l*d4
d7=k*d4
d8=l*d5
d9=k*d5
b2=d6+d8
f[0]=f[0]-u*b2
c9=d7+d9
f[1]=f[1]-u*c9
g[0]=g[0]+t*b2
g[1]=g[1]+t*c9
o=a.n(o,s*(a0[0]*d7-a0[1]*d6+(a2[0]*d9-a2[1]*d8)))
m=b.p(m,r*(y[0]*d7-y[1]*d6+(a1[0]*d9-a1[1]*d8)))
b3.c=0
b4.c=0
break $loop$1}break $loop$1}}y=this.c
if(w>=y.length)return H.a(y,w)
y[w].sR(o)
y=this.c
if(v>=y.length)return H.a(y,v)
y[v].sR(m)}},
f_:function(){var z,y,x,w,v
for(z=0;z<this.r;++z){y=this.e
if(z>=y.length)return H.a(y,z)
x=y[z]
y=this.f
w=x.gdG()
if(w>=y.length)return H.a(y,w)
for(y=y[w].z.a,w=x.a,v=0;v<x.cy;++v){if(v>=2)return H.a(y,v)
y[v].sa7(w[v].ga7())
y[v].sa9(w[v].ga9())}}},
eM:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8
for(z=this.x,y=z.a.a,x=this.y,w=x.a.a,v=this.Q,u=v.b.a,t=v.a.a,s=z.b,r=x.b,q=0,p=0;p<this.r;++p){o=this.d
if(p>=o.length)return H.a(o,p)
n=o[p]
m=n.gD()
l=n.gE()
k=n.gb9()
j=n.gbE()
o=n.gcu().a
i=o[0]
h=o[1]
g=n.r
f=n.Q
o=n.y.a
e=o[0]
d=o[1]
c=n.db
o=this.b
if(m>>>0!==m||m>=o.length)return H.a(o,m)
b=o[m].gH()
o=this.b
if(m>=o.length)return H.a(o,m)
a=J.a0(o[m])
o=this.b
if(l>>>0!==l||l>=o.length)return H.a(o,l)
a0=o[l].gH()
o=this.b
if(l>=o.length)return H.a(o,l)
a1=J.a0(o[l])
for(o=J.f(b),a2=J.f(a0),a3=k+g,a4=0;a4<c;++a4){a5=typeof a!=="number"
if(a5)H.y(H.x(a))
s.a=Math.sin(a)
if(a5)H.y(H.x(a))
s.b=Math.cos(a)
a5=typeof a1!=="number"
if(a5)H.y(H.x(a1))
r.a=Math.sin(a1)
if(a5)H.y(H.x(a1))
r.b=Math.cos(a1)
y[0]=o.gh(b)-s.b*i+s.a*h
y[1]=o.gi(b)-s.a*i-s.b*h
w[0]=a2.gh(a0)-r.b*e+r.a*d
w[1]=a2.gi(a0)-r.a*e-r.b*d
v.dS(0,n,z,x,a4)
a6=v.c
a7=u[0]-o.gh(b)
a8=u[1]-o.gi(b)
a9=u[0]-a2.gh(a0)
b0=u[1]-a2.gi(a0)
q=P.Q(q,a6)
b1=P.A(-0.2,P.Q(0.2*(a6+0.005),0))
a5=t[1]
b2=t[0]
b3=a7*a5-a8*b2
b4=a9*a5-b0*b2
b5=a3+j*b3*b3+f*b4*b4
b6=b5>0?-b1/b5:0
b7=b2*b6
b8=a5*b6
o.sh(b,o.gh(b)-b7*k)
a5=b.a
a5[1]=a5[1]-b8*k
if(typeof a!=="number")return a.n()
a-=j*(a7*b8-a8*b7)
a2.sh(a0,a2.gh(a0)+b7*g)
a5=a0.a
a5[1]=a5[1]+b8*g
if(typeof a1!=="number")return a1.p()
a1+=f*(a9*b8-b0*b7)}o=this.b
if(m>=o.length)return H.a(o,m)
J.ac(o[m],a)
o=this.b
if(l>=o.length)return H.a(o,l)
J.ac(o[l],a1)}return q>=-0.015},
eU:function(c1,c2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0
for(z=this.x,y=z.a.a,x=this.y,w=x.a.a,v=this.Q,u=v.b.a,t=v.a.a,s=z.b,r=x.b,q=0,p=0;p<this.r;++p){o=this.d
if(p>=o.length)return H.a(o,p)
n=o[p]
m=n.gD()
l=n.gE()
k=n.gcu()
j=n.y
o=k.a
i=o[0]
h=o[1]
o=j.a
g=o[0]
f=o[1]
e=n.db
o=J.u(m)
if(o.G(m,c1)||o.G(m,c2)){d=n.f
c=n.z}else{d=0
c=0}o=J.u(l)
if(o.G(l,c1)||o.G(l,c2)){b=n.r
a=n.Q}else{b=0
a=0}o=this.b
if(m>>>0!==m||m>=o.length)return H.a(o,m)
a0=o[m].gH()
o=this.b
if(m>=o.length)return H.a(o,m)
a1=J.a0(o[m])
o=this.b
if(l>>>0!==l||l>=o.length)return H.a(o,l)
a2=o[l].gH()
o=this.b
if(l>=o.length)return H.a(o,l)
a3=J.a0(o[l])
for(o=J.f(a0),a4=J.f(a2),a5=d+b,a6=0;a6<e;++a6){a7=typeof a1!=="number"
if(a7)H.y(H.x(a1))
s.a=Math.sin(a1)
if(a7)H.y(H.x(a1))
s.b=Math.cos(a1)
a7=typeof a3!=="number"
if(a7)H.y(H.x(a3))
r.a=Math.sin(a3)
if(a7)H.y(H.x(a3))
r.b=Math.cos(a3)
y[0]=o.gh(a0)-s.b*i+s.a*h
y[1]=o.gi(a0)-s.a*i-s.b*h
w[0]=a4.gh(a2)-r.b*g+r.a*f
w[1]=a4.gi(a2)-r.a*g-r.b*f
v.dS(0,n,z,x,a6)
a8=v.c
a9=u[0]-o.gh(a0)
b0=u[1]-o.gi(a0)
b1=u[0]-a4.gh(a2)
b2=u[1]-a4.gi(a2)
q=P.Q(q,a8)
b3=P.A(-0.2,P.Q(0.75*(a8+0.005),0))
a7=t[1]
b4=t[0]
b5=a9*a7-b0*b4
b6=b1*a7-b2*b4
b7=a5+c*b5*b5+a*b6*b6
b8=b7>0?-b3/b7:0
b9=b4*b8
c0=a7*b8
o.sh(a0,o.gh(a0)-b9*d)
a7=a0.a
a7[1]=a7[1]-c0*d
if(typeof a1!=="number")return a1.n()
a1-=c*(a9*c0-b0*b9)
a4.sh(a2,a4.gh(a2)+b9*b)
a7=a2.a
a7[1]=a7[1]+c0*b
if(typeof a3!=="number")return a3.p()
a3+=a*(b1*c0-b2*b9)}o=this.b
if(m>=o.length)return H.a(o,m)
J.ac(o[m],a1)
o=this.b
if(l>=o.length)return H.a(o,l)
J.ac(o[l],a3)}return q>=-0.0075},
fa:function(){var z,y,x
z=new Array(256)
z.fixed$length=Array
this.d=H.k(z,[V.cg])
z=new Array(256)
z.fixed$length=Array
this.e=H.k(z,[V.ch])
for(y=0;y<256;++y){z=this.d
x=V.db()
if(y>=z.length)return H.a(z,y)
z[y]=x
x=this.e
z=V.dc()
if(y>=x.length)return H.a(x,y)
x[y]=z}},
u:{
bs:function(){var z=new V.fD(null,null,null,null,null,null,0,G.B(),G.B(),V.ez(),new V.hS(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0))
z.fa()
return z}}},
hS:{"^":"d;a6:a<,b,c",
dS:function(a,b,c,d,a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=c.b
y=d.b
x=b.a
if(a0>=2)return H.a(x,a0)
w=x[a0]
switch(b.ch){case C.k:v=x[0]
x=z.b
u=b.c.a
t=u[0]
s=z.a
u=u[1]
r=c.a.a
q=x*t-s*u+r[0]
p=s*t+x*u+r[1]
r=y.b
u=v.a
x=u[0]
t=y.a
u=u[1]
s=d.a.a
o=r*x-t*u+s[0]
n=t*x+r*u+s[1]
s=this.a
u=o-q
r=s.a
r[0]=u
x=n-p
r[1]=x
s.a1()
s=this.b.a
s[0]=(q+o)*0.5
s[1]=(p+n)*0.5
this.c=u*r[0]+x*r[1]-b.cx-b.cy
break
case C.i:x=z.b
u=b.b.a
t=u[0]
s=z.a
r=this.a.a
r[0]=x*t-s*u[1]
r[1]=s*u[0]+x*u[1]
u=b.c.a
t=u[0]
u=u[1]
m=c.a.a
l=m[0]
m=m[1]
k=y.b
j=w.a
i=j[0]
h=y.a
j=j[1]
g=d.a.a
f=k*i-h*j+g[0]
e=h*i+k*j+g[1]
this.c=(f-(x*t-s*u+l))*r[0]+(e-(s*t+x*u+m))*r[1]-b.cx-b.cy
r=this.b.a
r[0]=f
r[1]=e
break
case C.q:x=y.b
u=b.b.a
t=u[0]
s=y.a
r=this.a.a
r[0]=x*t-s*u[1]
r[1]=s*u[0]+x*u[1]
u=b.c.a
t=u[0]
u=u[1]
m=d.a.a
l=m[0]
m=m[1]
k=z.b
j=w.a
i=j[0]
h=z.a
j=j[1]
g=c.a.a
f=k*i-h*j+g[0]
e=h*i+k*j+g[1]
this.c=(f-(x*t-s*u+l))*r[0]+(e-(s*t+x*u+m))*r[1]-b.cx-b.cy
m=this.b.a
m[0]=f
m[1]=e
r[0]=r[0]*-1
r[1]=r[1]*-1
break}}},
ey:{"^":"d;at:a<,ih:b<,a7:c@,a9:d@,e,f,r"},
ch:{"^":"d;bG:a>,a6:b<,c,d,D:e@,E:f@,b9:r@,bF:x@,bE:y<,cr:z<,dN:Q?,e9:ch?,iu:cx?,as:cy<,dG:db<",
fb:function(){var z,y,x
for(z=this.a,y=0;y<2;++y){x=new Float64Array(2)
z[y]=new V.ey(new E.b(x),new E.b(new Float64Array(2)),0,0,0,0,0)}},
u:{
dc:function(){var z=new Array(2)
z.fixed$length=Array
z=new V.ch(H.k(z,[V.ey]),new E.b(new Float64Array(H.c(2))),new E.ay(new Float64Array(H.c(4))),new E.ay(new Float64Array(H.c(4))),0,0,0,0,0,0,0,0,0,0,0)
z.fb()
return z}}},
bu:{"^":"ad;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ad:function(a,b,c,d){this.bn(a,b,c,d)},
ac:function(a,b,c){this.dx.fr.dF(a,this.f.d,b,this.r.d,c)}},
bv:{"^":"ad;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ad:function(a,b,c,d){this.bn(a,b,c,d)},
ac:function(a,b,c){var z,y,x
z=this.dx.fr
y=this.f.d
x=this.r.d
z.k3.dE(a,y,b,x,c)}},
bG:{"^":"ad;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ac:function(a,b,c){this.dx.fr.hh(a,this.f.d,b,this.r.d,c)}},
bH:{"^":"ad;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy",
ac:function(a,b,c){this.dx.fr.hi(a,this.f.d,b,this.r.d,c)}},
cx:{"^":"d;H:a<,ap:b*"},
cK:{"^":"d;P:a<,R:b@"},
ck:{"^":"d;h9:a<,b,c",
B:function(a){this.a=a.gh9()
this.b=a.b
this.c=a.c}},
h_:{"^":"d;a,b,c,d,e,f,r,x,y,z,au:Q<,ch,cx,cy",
bl:function(){return this.d.a},
hp:function(a,b){var z,y,x,w,v
this.Q=b.b
this.e=b.c
this.f=b.d
this.c=a
this.b=null
this.y.B(b.r)
this.z=!1
this.d=b.a.he(0)
if(this.r==null){z=new Array(1)
z.fixed$length=Array
this.r=H.k(z,[V.by])
for(y=0;y<1;++y){z=this.r
x=new Float64Array(2)
w=new Float64Array(2)
if(y>=z.length)return H.a(z,y)
z[y]=new V.by(new V.aH(new E.b(x),new E.b(w)),null,0,0)
w=this.r
if(y>=w.length)return H.a(w,y)
w[y].sb5(null)
w=this.r
if(y>=w.length)return H.a(w,y)
w[y].sbc(-1)}}z=this.r
x=z.length
if(x<1){v=P.A(x*2,1)
w=new Array(v)
w.fixed$length=Array
w=H.k(w,[V.by])
this.r=w
C.d.Y(w,0,x,z,0)
for(y=0;y<v;++y){z=this.r
x=new Float64Array(2)
w=new Float64Array(2)
if(y>=z.length)return H.a(z,y)
z[y]=new V.by(new V.aH(new E.b(x),new E.b(w)),null,0,0)
z=this.r
if(y>=z.length)return H.a(z,y)
z[y].sb5(null)
z=this.r
if(y>=z.length)return H.a(z,y)
z[y].sbc(-1)}}this.x=0
this.a=b.e},
hq:function(a,b){var z,y,x,w,v,u,t,s,r
this.d.toString
this.x=1
for(z=a.a,y=0;y<this.x;++y){x=this.r
if(y>=x.length)return H.a(x,y)
w=x[y]
this.d.ce(w.gK(),b,y)
x=w.gK()
v=z.cW()
u=v.f
t=v.a
s=x.a.a
r=t.a.a
r[0]=s[0]-0.1
r[1]=s[1]-0.1
x=x.b.a
s=t.b.a
s[0]=x[0]+0.1
s[1]=x[1]+0.1
v.b=w
z.dc(u);++a.b
a.dA(u)
w.sbc(u)
w.b=this
w.c=y}},
f7:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(this.x===0)return
for(z=this.cy,y=c.a.a,x=b.a.a,w=z.a,v=a.a,u=this.ch,t=this.cx,s=u.a.a,r=u.b.a,q=0;q<this.x;++q){p=this.r
if(q>=p.length)return H.a(p,q)
o=p[q]
this.d.ce(u,b,o.ghb())
this.d.ce(t,c,o.c)
p=o.a
n=s[0]
m=t.a.a
l=m[0]
n=n<l?n:l
l=p.a.a
l[0]=n
n=s[1]
m=m[1]
l[1]=n<m?n:m
n=r[0]
m=t.b.a
l=m[0]
n=n>l?n:l
l=p.b.a
l[0]=n
n=r[1]
m=m[1]
l[1]=n>m?n:m
w[0]=y[0]-x[0]
w[1]=y[1]-x[1]
n=o.d
if(v.i8(n,p,z))a.dA(n)}}},
dB:{"^":"d;a,au:b<,dN:c?,e9:d?,e,f,r"},
by:{"^":"d;K:a<,b5:b@,hb:c<,bc:d@"},
dD:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr",
ad:function(a,b,c,d){var z,y,x,w,v
this.z=a
this.Q=b
this.ch=c
this.r=0
this.y=0
this.x=0
this.a=d
z=this.b
if(z!=null){z=z.length
if(typeof a!=="number")return a.Z()
z=a>z}else z=!0
if(z){if(typeof a!=="number")return H.e(a)
z=new Array(a)
z.fixed$length=Array
this.b=H.k(z,[V.bl])}z=this.d
if(z!=null){y=this.ch
z=z.length
if(typeof y!=="number")return y.Z()
z=y>z}else z=!0
if(z){z=this.ch
if(typeof z!=="number")return H.e(z)
this.d=H.k(new Array(z),[V.hh])}z=this.c
if(z==null||this.Q>z.length)this.c=H.k(new Array(this.Q),[V.ad])
x=this.f
z=x==null
if(!z){y=this.z
w=x.length
if(typeof y!=="number")return y.Z()
w=y>w
y=w}else y=!0
if(y){if(z)x=H.k(new Array(0),[V.cK])
z=this.z
if(typeof z!=="number")return H.e(z)
z=new Array(z)
z.fixed$length=Array
z=H.k(z,[V.cK])
this.f=z
v=x.length
C.d.Y(z,0,v,x,0)
for(;z=this.f,v<z.length;++v)z[v]=new V.cK(new E.b(new Float64Array(2)),0)}x=this.e
z=x==null
if(!z){y=this.z
w=x.length
if(typeof y!=="number")return y.Z()
w=y>w
y=w}else y=!0
if(y){if(z)x=H.k(new Array(0),[V.cx])
z=this.z
if(typeof z!=="number")return H.e(z)
z=new Array(z)
z.fixed$length=Array
z=H.k(z,[V.cx])
this.e=z
v=x.length
C.d.Y(z,0,v,x,0)
for(;z=this.e,v<z.length;++v)z[v]=new V.cx(new E.b(new Float64Array(2)),0)}},
eF:function(a1,a2,a3,a4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0
z=a2.a
for(y=a3.a,x=0;x<this.r;++x){w=this.b
if(x>=w.length)return H.a(w,x)
v=w[x]
u=v.ga2()
t=u.e
s=v.r
r=v.x
q=u.c.a
w=u.b.a
w[1]=q[1]
w[0]=q[0]
u.d=t
if(v.a===C.h){w=s.a
p=w[0]
o=v.k2
n=y[0]
m=v.fx
l=v.y.a
w[0]=p+z*(o*n+m*l[0])
w[1]=w[1]+z*(o*y[1]+m*l[1])
r=J.p(r,z*v.go*v.z)
l=w[0]
m=1/(1+z*v.id)
w[0]=l*m
w[1]=w[1]*m
r=J.q(r,1/(1+z*v.k1))}w=this.e
if(x>=w.length)return H.a(w,x)
J.c9(w[x].gH(),q[0])
w=this.e
if(x>=w.length)return H.a(w,x)
J.ca(w[x].gH(),q[1])
w=this.e
if(x>=w.length)return H.a(w,x)
J.ac(w[x],t)
w=this.f
if(x>=w.length)return H.a(w,x)
p=s.a
w[x].gP().a[0]=p[0]
w=this.f
if(x>=w.length)return H.a(w,x)
w[x].gP().a[1]=p[1]
p=this.f
if(x>=p.length)return H.a(p,x)
p[x].sR(r)}y=this.cy
y.a=a2
w=this.e
y.b=w
p=this.f
y.c=p
o=this.db
o.a=a2
o.b=this.c
o.c=this.y
o.d=w
o.e=p
p=this.cx
p.dR(o)
p.dU()
if(a2.f)p.iE()
for(x=0;x<this.x;++x){w=this.d
if(x>=w.length)return H.a(w,x)
w[x].iZ(y)}for(x=0;x<a2.d;++x){for(k=0;k<this.x;++k){w=this.d
if(k>=w.length)return H.a(w,k)
w[k].iK(y)}p.cP()}p.f_()
for(x=0;x<this.r;++x){w=this.e
if(x>=w.length)return H.a(w,x)
j=w[x].gH()
w=this.e
if(x>=w.length)return H.a(w,x)
t=J.a0(w[x])
w=this.f
if(x>=w.length)return H.a(w,x)
s=w[x].gP()
w=this.f
if(x>=w.length)return H.a(w,x)
r=w[x].gR()
w=s.a
i=w[0]*z
h=w[1]*z
o=i*i+h*h
if(o>4){g=2/Math.sqrt(o)
w[0]=w[0]*g
w[1]=w[1]*g}if(typeof r!=="number")return H.e(r)
f=z*r
if(f*f>2.4674011002723395)r*=1.5707963267948966/Math.abs(f)
o=J.f(j)
o.sh(j,o.gh(j)+z*w[0])
o=j.a
o[1]=o[1]+z*w[1]
if(typeof t!=="number")return t.p()
w=this.e
if(x>=w.length)return H.a(w,x)
J.ac(w[x],t+z*r)
w=this.f
if(x>=w.length)return H.a(w,x)
w[x].sR(r)}x=0
while(!0){if(!(x<a2.e)){e=!1
break}d=p.eM()
for(c=!0,k=0;k<this.x;++k){w=this.d
if(k>=w.length)return H.a(w,k)
b=w[k].iJ(y)
c=c&&b}if(d&&c){e=!0
break}++x}for(x=0;x<this.r;++x){y=this.b
if(x>=y.length)return H.a(y,x)
a=y[x]
y=a.ga2()
w=this.e
if(x>=w.length)return H.a(w,x)
y.c.a[0]=J.c4(w[x].gH())
w=a.f
y=this.e
if(x>=y.length)return H.a(y,x)
w.c.a[1]=J.c5(y[x].gH())
y=this.e
if(x>=y.length)return H.a(y,x)
w.e=J.a0(y[x])
y=a.r
w=this.f
if(x>=w.length)return H.a(w,x)
y=y.a
y[0]=w[x].gP().a[0]
w=this.f
if(x>=w.length)return H.a(w,x)
y[1]=w[x].gP().a[1]
w=this.f
if(x>=w.length)return H.a(w,x)
a.x=w[x].gR()
a.aO()}this.e7(p.e)
if(a4){for(a0=17976931348623157e292,x=0;x<this.r;++x){y=this.b
if(x>=y.length)return H.a(y,x)
v=y[x]
if(v.bl()===C.f)continue
if((v.gaj()&4)!==0){y=v.x
y=J.q(y,y)
if(typeof y!=="number")return y.Z()
if(!(y>0.0012184696791468343)){y=v.r
y=y.A(y)>0.0001}else y=!0}else y=!0
if(y){v.k3=0
a0=0}else{y=v.k3+=z
a0=P.Q(a0,y)}}if(a0>=0.5&&e)for(x=0;x<this.r;++x){y=this.b
if(x>=y.length)return H.a(y,x)
y[x].a_(!1)}}},
eT:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
for(z=0;z<this.r;++z){y=this.e
if(z>=y.length)return H.a(y,z)
y=y[z].gH()
x=this.b
if(z>=x.length)return H.a(x,z)
J.c9(y,x[z].ga2().c.a[0])
x=this.e
if(z>=x.length)return H.a(x,z)
x=x[z].gH()
y=this.b
if(z>=y.length)return H.a(y,z)
J.ca(x,y[z].ga2().c.a[1])
y=this.e
if(z>=y.length)return H.a(y,z)
y=y[z]
x=this.b
if(z>=x.length)return H.a(x,z)
J.ac(y,x[z].ga2().e)
x=this.f
if(z>=x.length)return H.a(x,z)
x=x[z].gP()
y=this.b
if(z>=y.length)return H.a(y,z)
x.a[0]=y[z].gc2().a[0]
y=this.f
if(z>=y.length)return H.a(y,z)
y=y[z].gP()
x=this.b
if(z>=x.length)return H.a(x,z)
y.a[1]=x[z].gc2().a[1]
x=this.f
if(z>=x.length)return H.a(x,z)
x=x[z]
y=this.b
if(z>=y.length)return H.a(y,z)
x.sR(y[z].gcX())}y=this.dy
y.b=this.c
y.c=this.y
y.a=a
y.d=this.e
y.e=this.f
x=this.dx
x.dR(y)
for(z=0;z<a.e;++z)if(x.eU(b,c))break
y=this.b
if(b>=y.length)return H.a(y,b)
y=y[b].ga2()
w=this.e
if(b>=w.length)return H.a(w,b)
y.b.a[0]=J.c4(w[b].gH())
w=this.b
if(b>=w.length)return H.a(w,b)
w=w[b].ga2()
y=this.e
if(b>=y.length)return H.a(y,b)
w.b.a[1]=J.c5(y[b].gH())
y=this.b
if(b>=y.length)return H.a(y,b)
y=y[b].ga2()
w=this.e
if(b>=w.length)return H.a(w,b)
y.d=J.a0(w[b])
w=this.b
if(c>=w.length)return H.a(w,c)
w=w[c].ga2()
y=this.e
if(c>=y.length)return H.a(y,c)
w.b.j(y[c].gH())
y=this.b
if(c>=y.length)return H.a(y,c)
y=y[c].ga2()
w=this.e
if(c>=w.length)return H.a(w,c)
y.d=J.a0(w[c])
x.dU()
for(z=0;z<a.d;++z)x.cP()
v=a.a
for(z=0;z<this.r;++z){y=this.e
if(z>=y.length)return H.a(y,z)
u=y[z].gH()
y=this.e
if(z>=y.length)return H.a(y,z)
t=J.a0(y[z])
y=this.f
if(z>=y.length)return H.a(y,z)
s=y[z].gP()
y=this.f
if(z>=y.length)return H.a(y,z)
r=y[z].gR()
y=s.a
q=y[0]*v
p=y[1]*v
w=q*q+p*p
if(w>4){o=2/Math.sqrt(w)
y[1]=y[1]*o
y[0]=y[0]*o}if(typeof r!=="number")return H.e(r)
n=v*r
if(n*n>2.4674011002723395)r*=1.5707963267948966/Math.abs(n)
w=J.f(u)
w.sh(u,w.gh(u)+y[0]*v)
w=u.a
w[1]=w[1]+y[1]*v
if(typeof t!=="number")return t.p()
t+=v*r
m=this.e
if(z>=m.length)return H.a(m,z)
J.c9(m[z].gH(),w[0])
m=this.e
if(z>=m.length)return H.a(m,z)
J.ca(m[z].gH(),w[1])
m=this.e
if(z>=m.length)return H.a(m,z)
J.ac(m[z],t)
m=this.f
if(z>=m.length)return H.a(m,z)
m[z].gP().a[0]=y[0]
m=this.f
if(z>=m.length)return H.a(m,z)
m[z].gP().a[1]=y[1]
m=this.f
if(z>=m.length)return H.a(m,z)
m[z].sR(r)
m=this.b
if(z>=m.length)return H.a(m,z)
l=m[z]
l.ga2().c.a[0]=w[0]
m=l.f
m.c.a[1]=w[1]
m.e=t
m=l.r.a
m[0]=y[0]
m[1]=y[1]
l.x=r
l.aO()}this.e7(x.e)},
e7:function(a){var z,y,x,w,v,u,t,s
if(this.a==null)return
for(z=this.fr,y=z.a,x=z.b,w=0;w<this.y;++w){v=this.c
if(w>=v.length)return H.a(v,w)
u=v[w]
if(w>=a.length)return H.a(a,w)
t=a[w]
z.c=t.gas()
for(s=0;s<t.gas();++s){v=t.gbG(t)
if(s>=2)return H.a(v,s)
y[s]=v[s].ga7()
x[s]=t.gbG(t)[s].ga9()}this.a.j3(u,z)}}},
hh:{"^":"d;"},
a6:{"^":"d;a,b,c,d,e",
af:function(a){this.a=this.a*0.95+a*0.05
this.b=this.b*0.8+a*0.2
this.c=P.Q(a,this.c)
this.d=P.A(a,this.d)},
l:function(a){return H.h(this.b)+" ("+H.h(this.a)+") ["+H.h(this.c)+","+H.h(this.d)+"]"}},
hU:{"^":"d;a,b,c,d,e,f,r,x,y,z"},
e7:{"^":"d;a,b,c"},
eh:{"^":"d;a,b,c,d,e,f"},
iD:{"^":"d;aj:a@,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,dL,aq,ci,aV,bz,bA,bB,cj,ck,cl,cm,bC,cn,co,aW,cp,hz",
ay:function(a,b,c){var z,y,x,w,v,u,t
z=new V.br(null,!1)
z.a=a
z.b=!0
y=this.fy
x=b.a
w=y.length
if(x>=w)return H.a(y,x)
v=y[x]
u=c.a
if(u>=v.length)return H.a(v,u)
v[u]=z
if(b!==c){t=new V.br(null,!1)
t.a=a
t.b=!1
if(u>=w)return H.a(y,u)
y=y[u]
if(x>=y.length)return H.a(y,x)
y[x]=t}},
fR:function(){var z=this.ch
this.ay(z.ch,C.l,C.l)
this.ay(z.cx,C.j,C.l)
this.ay(z.Q,C.j,C.j)
this.ay(z.cy,C.o,C.l)
this.ay(z.db,C.o,C.j)
this.ay(z.dx,C.w,C.l)
this.ay(z.dy,C.w,C.j)},
ib:function(a,b,c,d){var z,y,x,w,v,u
z=a.d.a
y=c.d.a
x=this.fy
w=z.a
if(w>=x.length)return H.a(x,w)
w=x[w]
x=y.a
if(x>=w.length)return H.a(w,x)
v=w[x]
if(v!=null){x=v.b
w=v.a
if(x){u=w.e3()
u.ad(a,b,c,d)
return u}else{u=w.e3()
u.ad(c,d,a,b)
return u}}else return},
dI:function(a){var z,y,x,w,v,u,t,s,r
if((this.a&2)===2)return
z=G.B()
y=G.B()
x=new E.b(new Float64Array(H.c(2)))
w=new E.b(new Float64Array(H.c(2)))
v=new E.b(new Float64Array(H.c(2)))
u=new G.az(x,w,v,0,0,0)
t=new E.b(new Float64Array(H.c(2)))
s=new E.b(new Float64Array(H.c(2)))
r=new V.bl(C.f,0,0,z,y,u,t,0,s,0,this,null,null,null,0,null,null,0,0,0,0,0,0,0,0,null,new V.dB(null,null,0.2,0,0,!1,new V.ck(1,65535,0)),new V.hs(0,new E.b(new Float64Array(H.c(2))),0),G.B())
r.b=0
r.b=4
if(a.z){r.b=6
y=6}else y=4
r.b=y|32
y=z.a
y.j(a.c)
z.b.bL(a.d)
x.N()
w.j(y)
v.j(y)
y=a.d
u.d=y
u.e=y
u.f=0
r.dx=null
r.dy=null
r.ch=null
r.cx=null
t.j(a.e)
r.x=a.f
r.id=a.r
r.k1=a.x
r.k2=a.cy
s.N()
r.k3=0
s=a.a
r.a=s
if(s===C.h){r.fr=1
r.fx=1}else{r.fr=0
r.fx=0}r.fy=0
r.go=0
r.k4=a.b
r.cy=null
r.db=0
r.ch=null
z=this.c
r.cx=z
if(z!=null)z.ch=r
this.c=r;++this.e
return r},
hc:function(){var z,y
for(z=this.c;z!=null;z=z.cx){y=z.y.a
y[0]=0
y[1]=0
z.z=0}},
bM:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.fr
z.f.e=0
z.r.e=0
z.x.e=0
for(y=this.c;y!=null;y=y.cx){z=y.e
x=y.d
w=x.a.a
v=z.a.a
v[1]=w[1]
v[0]=w[0]
z=z.b
x=x.b
z.a=x.a
z.b=x.b}z=this.x2
x=this.e
v=this.b
z.ad(x,v.c,this.f,v.e)
for(y=this.c;y!=null;y=y.cx)y.b=y.b&4294967294
for(u=this.b.b;u!=null;u=u.c)u.a=u.a&4294967294
for(t=this.d;!1;t=t.gbs())t.sde(!1)
s=this.e
if(this.y1.length<s)this.y1=H.k(new Array(s),[V.bl])
for(r=this.c,x=this.r;r!=null;r=r.cx){v=r.b
if((v&1)===1)continue
if((v&2)!==2||(v&32)!==32)continue
if(r.a===C.f)continue
z.r=0
z.y=0
z.x=0
q=this.y1
if(0>=q.length)return H.a(q,0)
q[0]=r
r.b=v|1
for(p=1;p>0;){v=this.y1;--p
if(p>=v.length)return H.a(v,p)
y=v[p]
v=z.r
y.c=v
q=z.b
if(v>=q.length)return H.a(q,v)
q[v]=y
z.r=v+1
y.a_(!0)
if(y.a===C.f)continue
for(o=y.dy;o!=null;o=o.d){n=o.b
v=n.a
if((v&1)===1)continue
if((v&4)!==4||(v&2)!==2)continue
n.f.z
n.r.z
q=z.c
m=z.y++
if(m>=q.length)return H.a(q,m)
q[m]=n
n.a=v|1
l=o.a
v=l.b
if((v&1)===1)continue
q=this.y1
k=p+1
if(p>=q.length)return H.a(q,p)
q[p]=l
l.b=v|1
p=k}for(j=y.dx;!1;j=j.gaY()){j.gdV().gde()
l=j.gi9()
l.j_()
v=j.gdV()
q=z.d
m=z.x++
if(m>=q.length)return H.a(q,m)
q[m]=v
j.gdV().sde(!0)
l.gaj().X(0,1)
v=this.y1
k=p+1
if(p<0||p>=v.length)return H.a(v,p)
v[p]=l
l.saj(l.gaj().bJ(0,1))
p=k}}z.eF(this.fr,a,x,this.x)
for(i=0;i<z.r;++i){v=z.b
if(i>=v.length)return H.a(v,i)
y=v[i]
if(y.bl()===C.f)y.b=y.gaj()&4294967294}}z=this.fr.f
z.af(z.e)
z=this.fr.r
z.af(z.e)
z=this.fr.x
z.af(z.e)
z=this.y2.a
x=z.b
z.a=x==null?$.D.$0():x
for(y=this.c;y!=null;y=y.cx){if((y.b&1)===0)continue
if(y.a===C.f)continue
y.cQ()}x=this.b
x.a.cF(x)
x=this.fr.y
v=z.b
if(v==null)v=$.D.$0()
x.af(J.an(J.am(J.q(J.r(v,z.a),1000),$.N)))},
eS:function(b4){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3
z=this.dL
z.ad(64,32,0,this.b.e)
if(this.dy){for(y=this.c;y!=null;y=y.cx){y.b=y.b&4294967294
y.f.f=0}for(x=this.b.b;x!=null;x=x.c){x.a=x.a&4294967262
x.Q=0
x.ch=1}}for(w=this.aV,v=this.bz,u=this.bA,t=this.bB,s=this.ci,r=this.aq,q=r.a,p=r.b,o=r.c,n=r.d,m=this.ch;!0;){for(x=this.b.b,l=null,k=1;x!=null;x=x.c){j=x.a
if((j&4)!==4)continue
if(x.Q>8)continue
if((j&32)!==0)i=x.ch
else{h=x.f
g=x.r
h.z
g.z
f=h.c
e=g.c
d=f.a
c=e.a
j=f.b
b=(j&2)===2&&d!==C.f
a=e.b
a0=(a&2)===2&&c!==C.f
if(!b&&!a0)continue
a1=(j&8)===8||d!==C.h
a2=(a&8)===8||c!==C.h
if(!a1&&!a2)continue
j=f.f
a3=j.f
a=e.f
a4=a.f
if(a3<a4){j.aE(a4)
a3=a4}else if(a4<a3)a.aE(a3)
a5=x.x
a6=x.y
q.cL(h.d,a5)
p.cL(g.d,a6)
o.B(j)
n.B(a)
r.e=1
m.fx.ix(s,r)
a7=s.b
i=s.a===C.x?P.Q(a3+(1-a3)*a7,1):1
x.ch=i
x.a|=32}if(i<k){k=i
l=x}}if(l==null||0.9999988079071045<k){this.dy=!0
break}h=l.f
g=l.r
f=h.c
e=g.c
j=f.f
u.B(j)
a=e.f
t.B(a)
f.aE(k)
e.aE(k)
l.cE(this.b.e)
a8=l.a&=4294967263;++l.Q
if((a8&4)!==4||(a8&2)!==2){l.a=a8&4294967291
j.B(u)
a.B(t)
f.aO()
e.aO()
continue}f.a_(!0)
e.a_(!0)
z.r=0
z.y=0
z.x=0
f.c=0
j=z.b
a=j.length
if(0>=a)return H.a(j,0)
j[0]=f
a8=0+1
z.r=a8
e.c=a8
if(a8>=a)return H.a(j,a8)
j[a8]=e
z.r=a8+1
a8=z.c
z.y=0+1
if(0>=a8.length)return H.a(a8,0)
a8[0]=l
f.b|=1
e.b|=1
l.a|=1
v[0]=f
v[1]=e
for(a9=0;a9<2;++a9){b0=v[a9]
if(b0.a===C.h)for(b1=b0.dy;b1!=null;b1=b1.d){if(z.r===z.z)break
if(z.y===z.Q)break
b2=b1.b
if((b2.a&1)!==0)continue
b3=b1.a
if(b3.a===C.h&&(b0.b&8)!==8&&(b3.b&8)!==8)continue
b2.f.z
b2.r.z
j=b3.f
u.B(j)
if((b3.b&1)===0)b3.aE(k)
b2.cE(this.b.e)
a=b2.a
if((a&4)!==4){j.B(u)
b3.aO()
continue}if((a&2)!==2){j.B(u)
b3.aO()
continue}b2.a=a|1
j=z.c
a=z.y++
if(a>=j.length)return H.a(j,a)
j[a]=b2
j=b3.b
if((j&1)!==0)continue
b3.b=j|1
if(b3.a!==C.f)b3.a_(!0)
j=z.r
b3.c=j
a=z.b
if(j>=a.length)return H.a(a,j)
a[j]=b3
z.r=j+1}}j=(1-k)*b4.a
w.a=j
w.b=1/j
w.c=1
w.e=20
w.d=b4.d
w.f=!1
z.eT(w,f.c,e.c)
for(a9=0;a9<z.r;++a9){j=z.b
if(a9>=j.length)return H.a(j,a9)
b0=j[a9]
b0.saj(b0.gaj()&4294967294)
if(b0.gfB()!==C.h)continue
b0.cQ()
for(b1=b0.dy;b1!=null;b1=b1.d)b1.b.a&=4294967262}j=this.b
j.a.cF(j)}},
u:{
iH:function(a,b){var z,y,x,w,v
z=H.k(new Array(a),[[P.o,V.br]])
for(y=[V.br],x=z.length,w=0;w<a;++w){v=H.k(new Array(b),y)
if(w>=x)return H.a(z,w)
z[w]=v}return z}}},
iF:{"^":"d;a,b",
eg:function(a){var z,y
z=this.a.a.b
if(a<0||a>=z.length)return H.a(z,a)
y=z[a].gau()
return this.b.j5(y.gb5())}},
iG:{"^":"d;a,b,c,d,e"},
cv:{"^":"d;a",
sap:function(a,b){this.a[3]=b},
gaZ:function(a){return this.a[0]},
gbi:function(){return this.a[1]},
gcb:function(){return this.a[2]},
gap:function(a){return this.a[3]}},
hL:{"^":"d;aX:a<,b,c,d,au:e<"},
bF:{"^":"d;a,b,c"},
hK:{"^":"d;a,b"},
hC:{"^":"d;a,b,c"},
fM:{"^":"d;a,b,c,d,e",
ad:function(a,b,c,d){this.a=a
this.b=b
this.c=c
this.e=0
this.d=d}},
iA:{"^":"d;a,b"},
fE:{"^":"d;a,b,c"},
ia:{"^":"d;a,b,c,d,e,f"},
hM:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy,go,id,k1,k2,k3,k4,r1,r2,rx,ry,x1,x2,y1,y2,dL,aq,ci,aV,bz,bA,bB,cj,ck,cl,cm,bC,cn,co,aW,cp,hz,iT,b4,iU,iV,iW,iX,hA,hB,hC,hD,hE,hF,iY",
e8:function(a,b){var z,y,x,w,v
if(a==null){x=this.Q
w=new Array(x)
w.fixed$length=Array
a=w
for(z=0;J.a3(z,x);z=J.p(z,1))try{J.fc(a,z,b.$0())}catch(v){x=H.a_(v)
y=x
throw H.i("Exception "+H.h(y))}}return a},
hw:function(a){var z,y
z=this.aW
z.cK()
z.cK().iH(a)
for(y=a.gbp(),z=this.fy;y.S(0,a.gbr());y=y.p(0,1))C.a.q(z,y,null)
a.gc8()
a.gc8().sbs(a.gbs())
a.gbs()
a.gbs().sc8(a.gc8());--this.ci},
iB:function(a){var z,y,x,w,v,u,t,s,r
for(z=this.k2,y=this.x,x=0;w=this.id,x<w;++x){v=C.a.k(z,x)
u=v.gL(v)
w=this.cy.a
if(u>>>0!==u||u>=w.length)return H.a(w,u)
t=w[u]
w=J.f(t)
s=w.gh(t)
if(typeof s!=="number")return H.e(s)
w=w.gi(t)
if(typeof w!=="number")return H.e(w)
v.sit(0,(C.b.aa(y*w+2048)<<19>>>0)+(C.b.aa(128*(y*s))+262144))}F.f6(z,0,w)
this.k3=0
for(u=0;u<this.id;++u){r=C.a.k(z,u)
V.hP(r.git(r),1,0)}},
iA:function(){var z,y,x,w,v,u
z=this.cp
y=z.a.a
y[0]=17976931348623157e292
y[1]=17976931348623157e292
x=z.b.a
x[0]=-17976931348623157e292
x[1]=-17976931348623157e292
for(w=0;w<this.z;++w){v=this.cy.a
if(w>=v.length)return H.a(v,w)
u=v[w]
v=J.f(u)
y[0]=P.Q(y[0],v.gh(u))
y[1]=P.Q(y[1],v.gi(u))
x[0]=P.A(x[0],v.gh(u))
x[1]=P.A(x[1],v.gi(u))}v=this.r
y[0]=y[0]-v
y[1]=y[1]-v
x[0]=x[0]+v
x[1]=x[1]+v
this.r2=0
v=this.hA
v.a=this
this.aW.ig(v,z)},
eI:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.cp
y=z.a.a
y[0]=17976931348623157e292
y[1]=17976931348623157e292
x=z.b.a
x[0]=-17976931348623157e292
x[1]=-17976931348623157e292
for(w=0;w<this.z;++w){v=this.db.a
if(w>=v.length)return H.a(v,w)
u=v[w]
v=this.cy.a
if(w>=v.length)return H.a(v,w)
t=v[w]
v=J.f(t)
s=v.gh(t)
r=v.gi(t)
v=a.a
q=J.f(u)
p=q.gh(u)
if(typeof p!=="number")return H.e(p)
if(typeof s!=="number")return s.p()
o=s+v*p
p=a.a
q=q.gi(u)
if(typeof q!=="number")return H.e(q)
if(typeof r!=="number")return r.p()
n=r+p*q
if(s<o)m=s
else m=o
if(r<n)l=r
else l=n
v=y[0]
y[0]=v<m?v:m
v=y[1]
y[1]=v<l?v:l
if(s>o)k=s
else k=o
if(r>n)j=r
else j=n
v=x[0]
x[0]=v>k?v:k
v=x[1]
x[1]=v>j?v:j}y=this.hB
y.b=a
y.a=this
this.aW.ig(y,z)},
bM:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l;++this.a
if(this.z===0)return
this.b=0
for(z=0,y=0;z<this.z;++z){y=C.c.bJ(y,C.a.k(this.cx.a,z))
this.b=y}if((y&2)!==0)this.eY()
if(this.z===0)return
this.c=0
for(x=this.aV;!1;x=x.bI())this.c=C.c.bJ(this.c,x.gd8())
y=a.a
w=this.f
v=this.aW
u=v.eq()
t=C.b.m(y*w,u.gh(u))
u=a.a
v=v.eq()
s=C.b.m(u*w,v.gi(v))
r=this.cI(a)
for(z=0;z<this.z;++z){y=this.db.a
if(z>=y.length)return H.a(y,z)
q=y[z]
y=J.f(q)
w=y.gh(q)
if(typeof w!=="number")return w.p()
y.sh(q,w+t)
y.si(q,y.gi(q)+s)
p=y.gh(q)*y.gh(q)+y.gi(q)*y.gi(q)
if(p>r){if(p===0)o=17976931348623157e292
else o=Math.sqrt(r/p)
y.sh(q,y.gh(q)*o)
y.si(q,y.gi(q)*o)}}this.eI(a)
if((this.c&2)!==0)this.eP(a)
if((this.b&4)!==0)this.eX(a)
for(z=0;z<this.z;++z){y=this.cy.a
if(z>=y.length)return H.a(y,z)
n=y[z]
y=this.db.a
if(z>=y.length)return H.a(y,z)
m=y[z]
y=J.f(n)
w=y.gh(n)
v=a.a
u=J.f(m)
l=u.gh(m)
if(typeof l!=="number")return H.e(l)
if(typeof w!=="number")return w.p()
y.sh(n,w+v*l)
l=y.gi(n)
v=a.a
u=u.gi(m)
if(typeof u!=="number")return H.e(u)
y.si(n,l+v*u)}this.iA()
this.iB(!1)
if((this.b&32)!==0)this.eW(a)
if((this.b&64)!==0)this.eN(a)
if((this.b&128)!==0)this.eV(a)
if((this.b&16)!==0)this.eL(a)
if((this.b&8)!==0)this.eR(a)
if((this.c&1)!==0)this.eQ(a)
if((this.b&256)!==0)this.eJ(a)
this.eO(a)
this.eK(a)},
eO:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b
for(z=this.dx,y=0;y<this.z;++y)C.a.q(z,y,0)
for(x=0;x<this.r2;++x){w=this.ry
if(x>=w.length)return H.a(w,x)
v=w[x]
u=J.d2(v)
t=v.ga8()
C.a.q(z,u,C.a.k(z,u).p(0,t))}for(x=0;x<this.k3;++x){w=this.r1
if(x>=w.length)return H.a(w,x)
v=w[x]
u=v.gD()
s=v.gE()
t=v.ga8()
C.a.q(z,u,C.a.k(z,u).p(0,t))
C.a.q(z,s,C.a.k(z,s).p(0,t))}if((this.b&64)!==0)for(y=0;y<this.z;++y){C.a.k(this.cx.a,y).X(0,64)
C.a.q(z,y,0)}r=this.bz*(this.d*this.cI(a))
for(y=0;y<this.z;++y)C.a.q(z,y,r*P.A(0,P.Q(C.a.k(z,y),5)-1))
q=a.a/(this.d*this.r)
for(p=this.b4,w=p.a,o=this.x,n=1.777777*this.e*o*o,x=0;x<this.r2;++x){o=this.ry
if(x>=o.length)return H.a(o,x)
v=o[x]
o=J.f(v)
u=o.gL(v)
s=o.gb1(v)
t=v.ga8()
m=v.e
l=v.d
o=this.cy.a
if(u>>>0!==u||u>=o.length)return H.a(o,u)
k=o[u]
j=C.n.m(q*t*m,C.a.k(z,u).p(0,r*t))
o=l.a
w[0]=j*o[0]
w[1]=j*o[1]
o=this.db.a
if(u>=o.length)return H.a(o,u)
i=o[u]
o=J.f(i)
h=o.gh(i)
g=w[0]
if(typeof h!=="number")return h.n()
o.sh(i,h-n*g)
o.si(i,o.gi(i)-n*w[1])
s.by(p,k,!0)}for(x=0;x<this.k3;++x){w=this.r1
if(x>=w.length)return H.a(w,x)
v=w[x]
u=v.gD()
s=v.gE()
t=v.ga8()
l=v.ga6()
f=C.a.k(z,u).p(0,C.a.k(z,s))
w=q*t
o=l.a
e=C.n.m(w,f)*o[0]
d=C.n.m(w,f)*o[1]
o=this.db.a
w=o.length
if(u>>>0!==u||u>=w)return H.a(o,u)
c=o[u]
if(s>>>0!==s||s>=w)return H.a(o,s)
b=o[s]
o=J.f(c)
w=o.gh(c)
if(typeof w!=="number")return w.n()
o.sh(c,w-e)
o.si(c,o.gi(c)-d)
o=J.f(b)
w=o.gh(b)
if(typeof w!=="number")return w.p()
o.sh(b,w+e)
o.si(b,o.gi(b)+d)}},
eK:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=this.bA
for(y=this.b4,x=y.a,w=this.x,v=1.777777*this.e*w*w,u=0;u<this.r2;++u){w=this.ry
if(u>=w.length)return H.a(w,u)
t=w[u]
w=J.f(t)
s=w.gL(t)
r=w.gb1(t)
q=t.ga8()
p=t.e
o=t.d
w=this.cy.a
if(s>>>0!==s||s>=w.length)return H.a(w,s)
n=w[s]
w=J.f(n)
m=w.gh(n)
l=r.ga2().c.a[0]
if(typeof m!=="number")return m.n()
w=w.gi(n)
k=r.f.c.a[1]
if(typeof w!=="number")return w.n()
j=this.db.a
if(s>=j.length)return H.a(j,s)
i=j[s]
k=J.q(J.c2(r.x),w-k)
w=r.r.a
j=J.f(i)
h=J.r(J.p(k,w[0]),j.gh(i))
g=J.r(J.p(J.q(r.x,m-l),w[1]),j.gi(i))
w=o.a
f=J.p(J.q(h,w[0]),J.q(g,w[1]))
if(typeof f!=="number")return f.S()
if(f<0){m=z*q*p*f
x[0]=m*w[0]
x[1]=m*w[1]
w=j.gh(i)
m=x[0]
if(typeof w!=="number")return w.p()
j.sh(i,w+v*m)
j.si(i,j.gi(i)+v*x[1])
x[0]=-x[0]
x[1]=-x[1]
r.by(y,n,!0)}}for(u=0;u<this.k3;++u){x=this.r1
if(u>=x.length)return H.a(x,u)
t=x[u]
s=t.gD()
r=t.gE()
q=t.ga8()
o=t.ga6()
x=this.db.a
w=x.length
if(s>>>0!==s||s>=w)return H.a(x,s)
i=x[s]
if(r>>>0!==r||r>=w)return H.a(x,r)
e=x[r]
x=J.f(e)
w=x.gh(e)
m=J.f(i)
l=m.gh(i)
if(typeof w!=="number")return w.n()
if(typeof l!=="number")return H.e(l)
k=x.gi(e)
j=m.gi(i)
if(typeof k!=="number")return k.n()
if(typeof j!=="number")return H.e(j)
d=o.a
c=d[0]
d=d[1]
f=(w-l)*c+(k-j)*d
if(f<0){w=z*q*f
b=w*c
a=w*d
d=m.gh(i)
if(typeof d!=="number")return d.p()
m.sh(i,d+b)
m.si(i,m.gi(i)+a)
m=x.gh(e)
if(typeof m!=="number")return m.n()
x.sh(e,m-b)
x.si(e,x.gi(e)-a)}}},
eX:function(a){var z,y,x
for(z=0;z<this.z;++z){C.a.k(this.cx.a,z).X(0,4)
y=this.db.a
if(z>=y.length)return H.a(y,z)
x=y[z]
y=J.f(x)
y.sh(x,0)
y.si(x,0)}},
eP:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
for(z=this.aV,y=this.hE,x=y.a,w=x.a,y=y.b,v=this.hF,u=v.a.a,t=v.b,s=this.b4,r=this.hC,q=this.hD;!1;z=z.bI()){z.gd8().X(0,2)
z.j6()
p=C.b.m(a.a,z.gcX())
q.a=Math.sin(p)
q.b=Math.cos(p)
G.V(q,z.gfD(),r)
o=z.gc2().gaD()
p=s.a
if(1>=o.length)return H.a(o,1)
p[1]=o[1]
p[0]=o[0]
n=a.a
p[1]=p[1]*n
p[0]=p[0]*n
s.C(0,z.gfD())
s.v(r)
w[1]=p[1]
w[0]=p[0]
y.a=q.a
y.b=q.b
p=z.gh3()
n=z.gh3()
m=p.gcz()
l=n.gcz()
k=C.b.m(y.b,m.gH())
j=C.b.m(y.a,m.gaN())
l.saN(C.b.m(y.a,m.gH())+C.b.m(y.b,m.gaN()))
l.sH(k-j)
p=p.ga5(p)
j=n.ga5(n)
k=C.b.m(y.a,p.gh(p))
l=C.b.m(y.b,p.gi(p))
j.sh(0,C.b.m(y.b,p.gh(p))-C.b.m(y.a,p.gi(p)))
j.si(0,k+l)
n.ga5(n).C(0,x)
n=a.b
u[0]=n*w[0]
u[1]=n*w[1]
t.a=n*y.a
t.b=n*(y.b-1)
for(i=z.gbp();C.c.S(i,z.gbr());++i){p=this.cy.a
if(i<0||i>=p.length)return H.a(p,i)
p=p[i]
n=this.db.a
if(i>=n.length)return H.a(n,i)
G.v(v,p,n[i])}}},
eL:function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=a8.b*this.bB
for(y=0;y<this.y2;++y){x=C.a.k(this.aq,y)
x.gaX().X(0,16)
w=x.gD()
v=x.gE()
u=x.gcq()
t=x.gj0()
s=x.gj1()
r=x.gj2()
q=this.cy.a
p=q.length
if(w>>>0!==w||w>=p)return H.a(q,w)
o=q[w]
if(v>>>0!==v||v>=p)return H.a(q,v)
n=q[v]
if(u>>>0!==u||u>=p)return H.a(q,u)
m=q[u]
q=J.f(o)
p=q.gh(o)
l=J.f(n)
k=l.gh(n)
if(typeof p!=="number")return p.p()
if(typeof k!=="number")return H.e(k)
j=J.f(m)
i=j.gh(m)
if(typeof i!=="number")return H.e(i)
h=0.3333333333333333*(p+k+i)
i=q.gi(o)
k=l.gi(n)
if(typeof i!=="number")return i.p()
if(typeof k!=="number")return H.e(k)
p=j.gi(m)
if(typeof p!=="number")return H.e(p)
g=0.3333333333333333*(i+k+p)
f=t.ak(o).p(0,s.ak(n)).p(0,r.ak(m))
e=t.A(o).p(0,s.A(n)).p(0,r.A(m))
d=f.m(0,f).p(0,e.m(0,e))
p=C.c.cG(1,d)
c=Math.sqrt(p)
f=f.m(0,c)
e=e.m(0,c)
b=C.b.m(z,x.gf0())
a=e.m(0,t.gh(t)).n(0,f.m(0,t.gi(t)))
a0=f.m(0,t.gh(t)).p(0,e.m(0,t.gi(t)))
a1=e.m(0,s.gh(s)).n(0,f.m(0,s.gi(s)))
a2=f.m(0,s.gh(s)).p(0,e.m(0,s.gi(s)))
a3=e.m(0,r.gh(r)).n(0,f.m(0,r.gi(r)))
a4=f.m(0,r.gh(r)).p(0,e.m(0,r.gi(r)))
p=this.db.a
k=p.length
if(w>=k)return H.a(p,w)
a5=p[w]
if(v>=k)return H.a(p,v)
a6=p[v]
if(u>=k)return H.a(p,u)
a7=p[u]
p=J.f(a5)
k=p.gh(a5)
i=q.gh(o)
if(typeof i!=="number")return i.n()
i=C.b.m(b,a.n(0,i-h))
if(typeof k!=="number")return k.p()
p.sh(a5,k+i)
i=p.gi(a5)
q=q.gi(o)
if(typeof q!=="number")return q.n()
p.si(a5,i+C.b.m(b,a0.n(0,q-g)))
q=J.f(a6)
i=q.gh(a6)
p=l.gh(n)
if(typeof p!=="number")return p.n()
p=C.b.m(b,a1.n(0,p-h))
if(typeof i!=="number")return i.p()
q.sh(a6,i+p)
p=q.gi(a6)
l=l.gi(n)
if(typeof l!=="number")return l.n()
q.si(a6,p+C.b.m(b,a2.n(0,l-g)))
l=J.f(a7)
p=l.gh(a7)
q=j.gh(m)
if(typeof q!=="number")return q.n()
q=C.b.m(b,a3.n(0,q-h))
if(typeof p!=="number")return p.p()
l.sh(a7,p+q)
q=l.gi(a7)
j=j.gi(m)
if(typeof j!=="number")return j.n()
l.si(a7,q+C.b.m(b,a4.n(0,j-g)))}},
eR:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=a.b*this.cj
for(y=this.y1,x=0;x<this.x1;++x){w=C.a.k(y,x)
w.gaX().X(0,8)
v=w.gD()
u=w.gE()
t=this.cy.a
s=t.length
if(v>>>0!==v||v>=s)return H.a(t,v)
r=t[v]
if(u>>>0!==u||u>=s)return H.a(t,u)
q=t[u]
t=J.f(q)
s=t.gh(q)
p=J.f(r)
o=p.gh(r)
if(typeof s!=="number")return s.n()
if(typeof o!=="number")return H.e(o)
n=s-o
t=t.gi(q)
p=p.gi(r)
if(typeof t!=="number")return t.n()
if(typeof p!=="number")return H.e(p)
m=t-p
l=w.giS()
k=Math.sqrt(n*n+m*m)
if(k===0)k=17976931348623157e292
j=C.b.m(z,w.gf0())
i=C.b.m(j,l.n(0,k))/k*n
h=C.b.m(j,l.n(0,k))/k*m
t=this.db.a
s=t.length
if(v>=s)return H.a(t,v)
g=t[v]
if(u>=s)return H.a(t,u)
f=t[u]
t=J.f(g)
s=t.gh(g)
if(typeof s!=="number")return s.n()
t.sh(g,s-i)
t.si(g,t.gi(g)-h)
t=J.f(f)
s=t.gh(f)
if(typeof s!=="number")return s.p()
t.sh(f,s+i)
t.si(f,t.gi(f)+h)}},
eV:function(a0){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
this.dy=this.e8(this.dy,V.cU())
for(z=this.dx,y=0;y<this.z;++y){C.a.q(z,y,0)
x=this.dy
if(y>=x.length)return H.a(x,y)
x[y].N()}for(w=0;w<this.k3;++w){x=this.r1
if(w>=x.length)return H.a(x,w)
v=x[w]
if((v.gaX()&128)!==0){u=v.gD()
t=v.gE()
s=v.ga8()
r=v.e
C.a.q(z,u,C.a.k(z,u).p(0,s))
C.a.q(z,t,C.a.k(z,t).p(0,s))
x=this.dy
q=x.length
if(u>>>0!==u||u>=q)return H.a(x,u)
p=x[u]
if(t>>>0!==t||t>=q)return H.a(x,t)
o=x[t]
n=(1-s)*s
x=J.f(p)
q=x.gh(p)
m=r.a
l=m[0]
if(typeof q!=="number")return q.n()
x.sh(p,q-n*l)
x.si(p,x.gi(p)-n*m[1])
x=J.f(o)
l=x.gh(o)
q=m[0]
if(typeof l!=="number")return l.p()
x.sh(o,l+n*q)
x.si(o,x.gi(o)+n*m[1])}}x=this.cl
q=this.r*a0.b
k=x*q
j=this.cm*q
for(w=0;w<this.k3;++w){x=this.r1
if(w>=x.length)return H.a(x,w)
v=x[w]
if((v.gaX()&128)!==0){u=v.gD()
t=v.gE()
s=v.ga8()
r=v.e
x=this.dy
q=x.length
if(u>>>0!==u||u>=q)return H.a(x,u)
p=x[u]
if(t>>>0!==t||t>=q)return H.a(x,t)
o=x[t]
i=C.a.k(z,u).p(0,C.a.k(z,t))
x=J.f(o)
q=x.gh(o)
m=J.f(p)
l=m.gh(p)
if(typeof q!=="number")return q.n()
if(typeof l!=="number")return H.e(l)
x=x.gi(o)
m=m.gi(p)
if(typeof x!=="number")return x.n()
if(typeof m!=="number")return H.e(m)
h=C.n.m(k,i.n(0,2))
g=r.a
f=g[0]
g=g[1]
e=(h+j*((q-l)*f+(x-m)*g))*s
d=e*f
c=e*g
g=this.db.a
f=g.length
if(u>=f)return H.a(g,u)
b=g[u]
if(t>=f)return H.a(g,t)
a=g[t]
g=J.f(b)
f=g.gh(b)
if(typeof f!=="number")return f.n()
g.sh(b,f-d)
g.si(b,g.gi(b)-c)
g=J.f(a)
f=g.gh(a)
if(typeof f!=="number")return f.p()
g.sh(a,f+d)
g.si(a,g.gi(a)+c)}}},
eW:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z=this.ck
for(y=this.b4,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry
if(v>=u.length)return H.a(u,v)
t=u[v]
u=J.f(t)
s=u.gL(t)
C.a.k(this.cx.a,s).X(0,32)
r=u.gb1(t)
q=t.ga8()
p=t.e
u=this.cy.a
if(s>>>0!==s||s>=u.length)return H.a(u,s)
o=u[s]
u=this.db.a
if(s>=u.length)return H.a(u,s)
n=u[s]
u=J.f(o)
m=u.gh(o)
l=r.ga2().c.a[0]
if(typeof m!=="number")return m.n()
u=u.gi(o)
k=r.f.c.a[1]
if(typeof u!=="number")return u.n()
k=J.q(J.c2(r.x),u-k)
u=r.r.a
j=J.f(n)
i=J.r(J.p(k,u[0]),j.gh(n))
h=J.r(J.p(J.q(r.x,m-l),u[1]),j.gi(n))
u=z*p*q
if(typeof i!=="number")return H.e(i)
x[0]=u*i
if(typeof h!=="number")return H.e(h)
x[1]=u*h
u=j.gh(n)
l=x[0]
if(typeof u!=="number")return u.p()
j.sh(n,u+w*l)
j.si(n,j.gi(n)+w*x[1])
x[0]=-x[0]
x[1]=-x[1]
r.by(y,o,!0)}for(v=0;v<this.k3;++v){x=this.r1
if(v>=x.length)return H.a(x,v)
t=x[v]
if((t.gaX()&32)!==0){s=t.gD()
r=t.gE()
q=t.ga8()
x=this.db.a
u=x.length
if(s>>>0!==s||s>=u)return H.a(x,s)
n=x[s]
if(r>>>0!==r||r>=u)return H.a(x,r)
g=x[r]
x=J.f(g)
u=x.gh(g)
m=J.f(n)
l=m.gh(n)
if(typeof u!=="number")return u.n()
if(typeof l!=="number")return H.e(l)
k=x.gi(g)
j=m.gi(n)
if(typeof k!=="number")return k.n()
if(typeof j!=="number")return H.e(j)
f=z*q
e=f*(u-l)
d=f*(k-j)
j=m.gh(n)
if(typeof j!=="number")return j.p()
m.sh(n,j+e)
m.si(n,m.gi(n)+d)
m=x.gh(g)
if(typeof m!=="number")return m.n()
x.sh(g,m-e)
x.si(g,x.gi(g)-d)}}},
eN:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=this.bC*(this.r*a.b)
for(y=this.b4,x=this.x,w=1.777777*this.e*x*x,x=y.a,v=0;v<this.r2;++v){u=this.ry
if(v>=u.length)return H.a(u,v)
t=u[v]
u=J.f(t)
s=u.gL(t)
C.a.k(this.cx.a,s).X(0,64)
r=t.ga8()
if(r>0.25){q=u.gb1(t)
p=t.e
u=this.cy.a
if(s>>>0!==s||s>=u.length)return H.a(u,s)
o=u[s]
n=t.d
u=this.db.a
if(s>=u.length)return H.a(u,s)
m=u[s]
l=z*p*(r-0.25)
u=n.a
x[0]=l*u[0]
x[1]=l*u[1]
u=J.f(m)
k=u.gh(m)
j=x[0]
if(typeof k!=="number")return k.n()
u.sh(m,k-w*j)
u.si(m,u.gi(m)-w*x[1])
q.by(y,o,!0)}}for(v=0;v<this.k3;++v){x=this.r1
if(v>=x.length)return H.a(x,v)
t=x[v]
if((t.gaX()&64)!==0){r=t.ga8()
if(r>0.25){s=t.a
q=t.b
n=t.e
x=this.db.a
u=x.length
if(s>>>0!==s||s>=u)return H.a(x,s)
m=x[s]
if(q>>>0!==q||q>=u)return H.a(x,q)
i=x[q]
l=this.bC*(r-0.25)
x=n.a
h=l*x[0]
g=l*x[1]
x=J.f(m)
u=x.gh(m)
if(typeof u!=="number")return u.n()
x.sh(m,u-h)
x.si(m,x.gi(m)-g)
x=J.f(i)
u=x.gh(i)
if(typeof u!=="number")return u.p()
x.sh(i,u+h)
x.si(i,x.gi(i)+g)}}}},
eQ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.fr
this.fr=z==null?new Float64Array(H.c(this.Q)):z
y=a.b*this.cn
for(x=this.fy,w=0;w<this.k3;++w){v=this.r1
if(w>=v.length)return H.a(v,w)
u=v[w]
t=u.gD()
s=u.gE()
C.a.k(x,t)
C.a.k(x,s)
r=u.ga8()
q=u.ga6()
v=this.fr
p=v.length
if(t>>>0!==t||t>=p)return H.a(v,t)
o=v[t]
if(s>>>0!==s||s>=p)return H.a(v,s)
v=v[s]
p=this.db.a
n=p.length
if(t>=n)return H.a(p,t)
m=p[t]
if(s>=n)return H.a(p,s)
l=p[s]
k=y*(o+v)*r
v=q.a
j=k*v[0]
i=k*v[1]
v=J.f(m)
o=v.gh(m)
if(typeof o!=="number")return o.n()
v.sh(m,o-j)
v.si(m,v.gi(m)-i)
v=J.f(l)
o=v.gh(l)
if(typeof o!=="number")return o.p()
v.sh(l,o+j)
v.si(l,v.gi(l)+i)}},
eJ:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.fx
z.a=this.e8(z.a,V.eR())
y=C.b.aa(256*this.co)
for(x=0;x<this.k3;++x){z=this.r1
if(x>=z.length)return H.a(z,x)
w=z[x]
v=w.gD()
u=w.gE()
C.a.k(this.cx.a,v).X(0,C.a.k(this.cx.a,u)).X(0,256)
z=this.fx.a
t=z.length
if(v>>>0!==v||v>=t)return H.a(z,v)
s=z[v]
if(u>>>0!==u||u>=t)return H.a(z,u)
r=z[u]
z=J.f(r)
t=z.gaZ(r)
q=J.f(s)
p=q.gaZ(s)
if(typeof t!=="number")return t.n()
if(typeof p!=="number")return H.e(p)
o=C.c.aS(C.b.aa(y*(t-p)),8)
p=r.gbi()
t=s.gbi()
if(typeof p!=="number")return p.n()
if(typeof t!=="number")return H.e(t)
n=C.c.aS(C.b.aa(y*(p-t)),8)
t=r.gcb()
p=s.gcb()
if(typeof t!=="number")return t.n()
if(typeof p!=="number")return H.e(p)
m=C.c.aS(C.b.aa(y*(t-p)),8)
z=z.gap(r)
q=q.gap(s)
if(typeof z!=="number")return z.n()
if(typeof q!=="number")return H.e(q)
l=C.c.aS(C.b.aa(y*(z-q)),8)
q=s.a
z=q[0]
if(typeof z!=="number")return z.p()
q[0]=z+o
z=q[1]
if(typeof z!=="number")return z.p()
q[1]=z+n
z=q[2]
if(typeof z!=="number")return z.p()
q[2]=z+m
z=q[3]
if(typeof z!=="number")return z.p()
q[3]=z+l
z=r.a
q=z[0]
if(typeof q!=="number")return q.n()
z[0]=q-o
q=z[1]
if(typeof q!=="number")return q.n()
z[1]=q-n
q=z[2]
if(typeof q!=="number")return q.n()
z[2]=q-m
q=z[3]
if(typeof q!=="number")return q.n()
z[3]=q-l}},
eY:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=this.z
y=P.ax(z,0,!1,P.n)
for(x=this.aW,w=0;w<this.z;++w){v=C.a.k(this.cx.a,w)
v.X(0,2)
u=x.cK()
v.X(0,512)
u.iG(w)
if(w>=z)return H.a(y,w)
y[w]=-1}for(x=this.k2,t=0;s=this.id,t<s;++t){r=C.a.k(x,t)
q=r.gL(r)
if(q>>>0!==q||q>=z)return H.a(y,q)
r.sL(0,y[q])}for(w=0;w<s;++w)if(V.hO(C.a.k(x,w))){--s
p=C.a.k(x,s)
C.a.q(x,s,C.a.k(x,w))
C.a.q(x,w,p);--w}this.id=s
for(t=0;s=this.k3,t<s;++t){x=this.r1
if(t>=x.length)return H.a(x,t)
o=x[t]
x=o.gD()
if(x>>>0!==x||x>=z)return H.a(y,x)
o.sD(y[x])
x=o.gE()
if(x>>>0!==x||x>=z)return H.a(y,x)
o.sE(y[x])}for(w=0;w<s;++w){x=this.r1
if(w<0||w>=x.length)return H.a(x,w)
x=x[w]
if(J.a3(x.gD(),0)||J.a3(x.gE(),0)){--s
x=this.r1
q=x.length
if(s<0||s>=q)return H.a(x,s)
p=x[s]
if(w>=q)return H.a(x,w)
x[s]=x[w]
x[w]=p;--w}}this.k3=s
for(t=0;s=this.r2,t<s;++t){x=this.ry
if(t>=x.length)return H.a(x,t)
o=x[t]
x=J.f(o)
q=x.gL(o)
if(q>>>0!==q||q>=z)return H.a(y,q)
x.sL(o,y[q])}for(w=0;w<s;++w){x=this.ry
if(w<0||w>=x.length)return H.a(x,w)
if(J.a3(J.d2(x[w]),0)){--s
x=this.ry
q=x.length
if(s<0||s>=q)return H.a(x,s)
p=x[s]
if(w>=q)return H.a(x,w)
x[s]=x[w]
x[w]=p;--w}}this.r2=s
for(x=this.y1,t=0;s=this.x1,t<s;++t){n=C.a.k(x,t)
q=n.gD()
if(q>>>0!==q||q>=z)return H.a(y,q)
n.sD(y[q])
q=n.gE()
if(q>>>0!==q||q>=z)return H.a(y,q)
n.sE(y[q])}for(w=0;w<s;++w){q=C.a.k(x,w)
if(q.gD().S(0,0)||q.gE().S(0,0)){--s
p=C.a.k(x,s)
C.a.q(x,s,C.a.k(x,w))
C.a.q(x,w,p);--w}}this.x1=s
for(t=0;s=this.y2,t<s;++t){m=C.a.k(this.aq,t)
x=m.gD()
if(x>>>0!==x||x>=z)return H.a(y,x)
m.sD(y[x])
x=m.gE()
if(x>>>0!==x||x>=z)return H.a(y,x)
m.sE(y[x])
x=m.gcq()
if(x>>>0!==x||x>=z)return H.a(y,x)
m.scq(y[x])}for(w=0;w<s;++w){x=C.a.k(this.aq,w)
if(x.gD().S(0,0)||x.gE().S(0,0)||x.gcq().S(0,0)){--s
p=C.a.k(this.aq,s)
x=this.aq
C.a.q(x,s,C.a.k(x,w))
C.a.q(this.aq,w,p);--w}}this.y2=s
for(l=this.aV;!1;l=l.bI()){for(w=l.gbp(),k=0,j=0,i=!1;C.c.S(w,l.gbr());++w){if(w<0||w>=z)return H.a(y,w)
s=y[w]
x=J.O(s)
if(x.bj(s,0)){k=P.Q(k,s)
j=P.A(j,x.p(s,1))}else i=!0}if(k<j){l.sbp(k)
l.sbr(j)
if(i){l.gd8().X(0,2)
l.sh2(!0)}}else{l.sbp(0)
l.sbr(0)
if(l.giO())l.sh1(!0)}}this.z=0
for(l=this.aV;!1;l=h){h=l.bI()
if(l.gh1())this.hw(l)
else l.gh2()}},
cI:function(a){var z=this.r*a.b
return z*z},
fk:function(a){this.bz=0.05
this.bA=1
this.bB=0.25
this.cj=0.25
this.ck=0.25
this.cl=0.1
this.cm=0.2
this.bC=0.5
this.cn=0.5
this.co=0.5
this.cx=new V.hK(null,null)
this.cy=new V.bF(null,V.cU(),0)
this.db=new V.bF(null,V.cU(),0)
this.fx=new V.bF(null,V.eR(),0)
this.go=new V.bF(null,V.jN(),0)},
u:{
hP:function(a,b,c){return a.p(0,c<<19>>>0).p(0,b<<7>>>0)},
lb:[function(){return new E.b(new Float64Array(H.c(2)))},"$0","cU",0,0,7],
l9:[function(){return new P.d()},"$0","jN",0,0,7],
la:[function(){var z=new Int8Array(H.c(4))
z[0]=127
z[1]=127
z[2]=127
z[3]=50
return new V.cv(z)},"$0","eR",0,0,17],
hN:function(a){var z=new V.hM(0,0,0,1,1,1,1,1,1,0,0,0,null,null,null,null,null,null,null,null,null,0,0,null,0,0,null,0,0,null,0,0,null,0,0,null,0,null,null,null,null,null,null,null,null,null,null,null,null,V.aI(),new V.fM(null,null,null,!1,0),V.aI(),new E.b(new Float64Array(H.c(2))),G.B(),G.B(),new V.fE(null,null,null),new V.hL(0,new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),null,null),new V.iA(null,new E.b(new Float64Array(H.c(2)))),new V.ia(null,null,new V.cB(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0),new V.e0(new E.b(new Float64Array(H.c(2))),0),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2)))),new E.b(new Float64Array(H.c(2))),new G.cC(0,1),G.B(),G.B(),new V.hC(0,0,0))
z.fk(a)
return z}}},
ew:{"^":"d;a"},
hH:{"^":"aN;a,b,c,d",
a0:function(){return new E.b(new Float64Array(2))}},
hI:{"^":"aN;a,b,c,d",
a0:function(){return new E.aQ(new Float64Array(3))}},
hE:{"^":"aN;a,b,c,d",
a0:function(){return new E.ay(new Float64Array(4))}},
hF:{"^":"aN;a,b,c,d",
a0:function(){return new E.b5(new Float64Array(9))}},
hD:{"^":"aN;a,b,c,d",
a0:function(){var z=new Float64Array(2)
return new V.aH(new E.b(z),new E.b(new Float64Array(2)))}},
hG:{"^":"aN;a,b,c,d",
a0:function(){return new G.cC(0,1)}},
L:{"^":"ab;$ti"},
hA:{"^":"L;d,a,b,c",
a0:function(){return new V.bH(0,null,null,new V.I(null,null,null,null),new V.I(null,null,null,null),null,null,0,0,V.K(),0,0,0,0,0,this.d,V.K())},
$asL:function(){return[V.bH]},
$asab:function(){return[V.bH]}},
hw:{"^":"L;d,a,b,c",
a0:function(){return new V.bp(0,null,null,new V.I(null,null,null,null),new V.I(null,null,null,null),null,null,0,0,V.K(),0,0,0,0,0,this.d,V.K())},
$asL:function(){return[V.bp]},
$asab:function(){return[V.bp]}},
hz:{"^":"L;d,a,b,c",
a0:function(){return new V.bG(0,null,null,new V.I(null,null,null,null),new V.I(null,null,null,null),null,null,0,0,V.K(),0,0,0,0,0,this.d,V.K())},
$asL:function(){return[V.bG]},
$asab:function(){return[V.bG]}},
hx:{"^":"L;d,a,b,c",
a0:function(){return new V.bu(0,null,null,new V.I(null,null,null,null),new V.I(null,null,null,null),null,null,0,0,V.K(),0,0,0,0,0,this.d,V.K())},
$asL:function(){return[V.bu]},
$asab:function(){return[V.bu]}},
hy:{"^":"L;d,a,b,c",
a0:function(){return new V.bv(0,null,null,new V.I(null,null,null,null),new V.I(null,null,null,null),null,null,0,0,V.K(),0,0,0,0,0,this.d,V.K())},
$asL:function(){return[V.bv]},
$asab:function(){return[V.bv]}},
hu:{"^":"L;d,a,b,c",
a0:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.du(new E.b(z),new E.b(y),new E.b(x),new E.b(w),!1,!1,new E.b(new Float64Array(2)),C.o,0)
z.b=0.01
return new V.bn(z,0,null,null,new V.I(null,null,null,null),new V.I(null,null,null,null),null,null,0,0,V.K(),0,0,0,0,0,this.d,V.K())},
$asL:function(){return[V.bn]},
$asab:function(){return[V.bn]}},
hv:{"^":"L;d,a,b,c",
a0:function(){var z,y,x,w
z=new Float64Array(2)
y=new Float64Array(2)
x=new Float64Array(2)
w=new Float64Array(2)
z=new V.du(new E.b(z),new E.b(y),new E.b(x),new E.b(w),!1,!1,new E.b(new Float64Array(2)),C.o,0)
z.b=0.01
return new V.bo(z,0,null,null,new V.I(null,null,null,null),new V.I(null,null,null,null),null,null,0,0,V.K(),0,0,0,0,0,this.d,V.K())},
$asL:function(){return[V.bo]},
$asab:function(){return[V.bo]}},
fK:{"^":"d;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx,dy,fr,fx,fy",
fd:function(a0,a1){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a
z=new V.hA(this,null,null,null)
z.ax(10,V.bH)
this.Q=z
z=new V.hw(this,null,null,null)
z.ax(10,V.bp)
this.ch=z
z=new V.hz(this,null,null,null)
z.ax(10,V.bG)
this.cx=z
z=new V.hx(this,null,null,null)
z.ax(10,V.bu)
this.cy=z
z=new V.hy(this,null,null,null)
z.ax(10,V.bv)
this.db=z
z=new V.hu(this,null,null,null)
z.ax(10,V.bn)
this.dx=z
z=new V.hv(this,null,null,null)
z.ax(10,V.bo)
this.dy=z
z=V.aK()
y=V.aK()
x=G.B()
w=G.B()
v=V.e3()
u=new Float64Array(H.c(2))
t=new Float64Array(H.c(2))
s=new Float64Array(H.c(2))
r=G.B()
q=new Float64Array(H.c(2))
p=new Float64Array(H.c(2))
o=[V.a1]
n=H.k(new Array(2),o)
m=new Float64Array(H.c(2))
l=new Float64Array(H.c(2))
k=new Float64Array(H.c(2))
j=new Float64Array(H.c(2))
i=new Float64Array(H.c(2))
h=new Float64Array(H.c(2))
g=H.k(new Array(2),o)
o=H.k(new Array(2),o)
f=new Float64Array(H.c(2))
e=new Float64Array(H.c(2))
d=new Int8Array(H.c(4))
c=new Float64Array(H.c(2))
b=new Float64Array(H.c(2))
a=V.fV()
n[0]=new V.a1(new E.b(new Float64Array(H.c(2))),new V.T(new Int8Array(H.c(4))))
n[1]=new V.a1(new E.b(new Float64Array(H.c(2))),new V.T(new Int8Array(H.c(4))))
g[0]=new V.a1(new E.b(new Float64Array(H.c(2))),new V.T(new Int8Array(H.c(4))))
g[1]=new V.a1(new E.b(new Float64Array(H.c(2))),new V.T(new Int8Array(H.c(4))))
o[0]=new V.a1(new E.b(new Float64Array(H.c(2))),new V.T(new Int8Array(H.c(4))))
o[1]=new V.a1(new E.b(new Float64Array(H.c(2))),new V.T(new Int8Array(H.c(4))))
this.fr=new V.fx(this,new V.dm(z,y,x,w,!1),v,new V.dn(new E.b(u),new E.b(t),0,0),new E.b(s),r,new E.b(q),new E.b(p),new V.eE(0,0),new V.eE(0,0),n,new E.b(m),new E.b(l),new E.b(k),new E.b(j),new E.b(i),new E.b(h),g,o,new E.b(f),new E.b(e),new V.T(d),new E.b(c),new E.b(b),a)
this.fx=new V.iq(V.e3(),new V.dm(V.aK(),V.aK(),G.B(),G.B(),!1),G.B(),G.B(),new V.dn(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,0),new V.i5(null,null,null,new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),null,null,new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),G.B(),G.B(),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2)))),P.ax(2,0,!1,P.n),new G.az(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,0,0),new G.az(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,0,0),this)
this.z=this},
u:{
fL:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
z=P.n
y=P.b1(null,null,null,z,P.h0)
x=P.b1(null,null,null,z,[P.o,P.n])
w=P.b1(null,null,null,z,[P.o,E.b])
v=new V.hH(new Array(a),0,a,new Array(b))
v.aP(a,b)
u=new V.hI(new Array(a),0,a,new Array(b))
u.aP(a,b)
t=new V.hE(new Array(a),0,a,new Array(b))
t.aP(a,b)
s=new V.hD(new Array(a),0,a,new Array(b))
s.aP(a,b)
r=new V.hG(new Array(a),0,a,new Array(b))
r.aP(a,b)
q=new V.hF(new Array(a),0,a,new Array(b))
q.aP(a,b)
p=new V.bU(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,0,0)
o=new V.bU(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,0,0)
n=new V.bU(new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),0,0,0)
m=H.k(new Array(3),[V.bU])
l=new Float64Array(H.c(2))
k=new Float64Array(H.c(2))
j=new Float64Array(H.c(2))
i=new Float64Array(H.c(2))
h=new Float64Array(H.c(2))
g=new Float64Array(H.c(2))
f=new Float64Array(H.c(2))
e=new Float64Array(H.c(2))
d=new Float64Array(H.c(2))
c=new Float64Array(H.c(2))
m[0]=p
m[1]=o
m[2]=n
z=new V.fK(v,u,t,q,s,r,y,x,w,null,null,null,null,null,null,null,null,null,null,new V.fN(new V.ju(p,o,n,m,0,new E.b(l),new E.b(k),new E.b(j),new E.b(i),new E.b(h),new E.b(g),new E.b(f),new E.b(e),new E.b(d),new E.b(c)),P.ax(3,0,!1,z),P.ax(3,0,!1,z),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2))),new E.b(new Float64Array(H.c(2)))))
z.fd(a,b)
return z}}},
ab:{"^":"d;$ti",
dK:function(a){var z,y,x
z=new Array(a)
z.fixed$length=Array
y=H.k(z,[H.F(this,"ab",0)])
z=this.a
if(z!=null)C.d.Y(y,0,this.c,z,0)
for(z=y.length,x=0;x<z;++x)y[x]=this.a0()
this.a=y
this.c=z},
e3:function(){var z,y
z=this.b
y=this.c
if(z>=y)this.dK(y*2)
z=this.a
y=this.b++
if(y<0||y>=z.length)return H.a(z,y)
return z[y]},
ax:function(a,b){this.b=0
this.a=null
this.b=0
this.c=0
this.dK(a)}},
aN:{"^":"d;",
aP:function(a,b){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<a;++x){w=this.a0()
if(x>=y)return H.a(z,x)
z[x]=w}}}}],["","",,F,{"^":"",
f6:function(a,b,c){var z,y
P.cA(b,c,a.length,null,null,null)
z=P.bD(H.bb(a,b,c,H.Y(a,0)),!0,null)
C.d.cd(z,"sort")
y=P.jP()
H.b9(z,0,z.length-1,y);(a&&C.d).eE(a,b,c,z)}}],["","",,G,{"^":"",cf:{"^":"d;h:a*,i:b*,c"},cC:{"^":"d;aN:a<,H:b<",
bL:function(a){this.a=Math.sin(H.aW(a))
this.b=Math.cos(H.aW(a))
return this},
B:function(a){this.a=a.gaN()
this.b=a.gH()
return this},
l:function(a){return"Rot(s:"+H.h(this.a)+", c:"+H.h(this.b)+")"},
u:{
V:function(a,b,c){var z,y,x,w,v,u
z=a.b
y=J.f(b)
x=y.gh(b)
if(typeof x!=="number")return H.e(x)
w=a.a
v=y.gi(b)
if(typeof v!=="number")return H.e(v)
u=c.a
u[0]=z*x-w*v
v=a.a
w=y.gh(b)
if(typeof w!=="number")return H.e(w)
x=a.b
y=y.gi(b)
if(typeof y!=="number")return H.e(y)
u[1]=v*w+x*y},
a2:function(a,b,c){var z,y,x,w,v
z=a.b
y=b.a
x=y[0]
w=a.a
v=c.a
v[0]=z*x+w*y[1]
v[1]=-w*y[0]+z*y[1]}}},az:{"^":"d;i4:a<,b,H:c<,d,ap:e*,f",
l:function(a){return"Sweep:\nlocalCenter: "+this.a.l(0)+"\n"+("c0: "+this.b.l(0)+", c: "+this.c.l(0)+"\n")+("a0: "+H.h(this.d)+", a: "+H.h(this.e)+"\n")+("alpha0: "+H.h(this.f))},
a1:function(){var z,y
z=this.d
if(typeof z!=="number")return z.cG()
y=6.283185307179586*C.n.b6(z/6.283185307179586)
z=this.d
if(typeof z!=="number")return z.n()
this.d=z-y
z=this.e
if(typeof z!=="number")return z.n()
this.e=z-y},
B:function(a){this.a.j(a.gi4())
this.b.j(a.b)
this.c.j(a.c)
this.d=a.d
this.e=a.e
this.f=a.f
return this},
an:function(a,b){var z,y,x,w,v,u
z=1-b
y=this.b.a
x=this.c.a
w=a.a.a
w[0]=z*y[0]+b*x[0]
w[1]=z*y[1]+b*x[1]
x=this.d
if(typeof x!=="number")return H.e(x)
y=this.e
if(typeof y!=="number")return H.e(y)
v=a.b
v.bL(z*x+b*y)
y=w[0]
x=v.b
z=this.a.a
u=z[0]
v=v.a
w[0]=y-(x*u-v*z[1])
w[1]=w[1]-(v*z[0]+x*z[1])},
aE:function(a){var z,y,x,w
z=this.f
y=(a-z)/(1-z)
z=this.b.a
x=z[0]
w=this.c.a
z[0]=x+y*(w[0]-x)
x=z[1]
z[1]=x+y*(w[1]-x)
x=this.d
w=this.e
if(typeof w!=="number")return w.n()
if(typeof x!=="number")return H.e(x)
this.d=x+y*(w-x)
this.f=a}},cH:{"^":"d;a"},iw:{"^":"d;a5:a>,cz:b<",
B:function(a){var z,y
this.a.j(J.fj(a))
z=this.b
y=a.gcz()
z.a=y.a
z.b=y.b
return this},
l:function(a){var z=this.b
return"XForm:\n"+("Position: "+this.a.l(0)+"\n")+("R: \t"+("Rot(s:"+H.h(z.a)+", c:"+H.h(z.b)+")")+"\n")},
u:{
B:function(){return new G.iw(new E.b(new Float64Array(H.c(2))),new G.cC(0,1))},
aP:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=z.a
x=b.a
w=x[0]
z=z.b
x=x[1]
v=a.a.a
u=v[1]
t=c.a
t[0]=z*w-y*x+v[0]
t[1]=y*w+z*x+u},
v:function(a,b,c){var z,y,x,w,v,u,t,s
z=a.b
y=z.b
x=J.f(b)
w=x.gh(b)
if(typeof w!=="number")return H.e(w)
v=z.a
u=x.gi(b)
if(typeof u!=="number")return H.e(u)
t=a.a.a
s=J.f(c)
s.sh(c,y*w-v*u+t[0])
u=z.a
v=x.gh(b)
if(typeof v!=="number")return H.e(v)
z=z.b
x=x.gi(b)
if(typeof x!=="number")return H.e(x)
s.si(c,u*v+z*x+t[1])},
ej:function(a,b,c){var z,y,x,w,v,u
z=J.f(b)
y=z.gh(b)
x=a.a.a
w=x[0]
if(typeof y!=="number")return y.n()
v=y-w
z=z.gi(b)
x=x[1]
if(typeof z!=="number")return z.n()
u=z-x
x=a.b
z=x.b
x=x.a
w=c.a
w[0]=z*v+x*u
w[1]=-x*v+z*u},
ei:function(a,b,c){var z,y,x,w,v,u,t
z=a.b
y=b.b
x=c.b
w=z.b
v=y.a
u=z.a
t=y.b
x.a=w*v-u*t
x.b=w*t+z.a*y.a
y=$.$get$cJ()
y.j(b.a)
y.v(a.a)
G.a2(z,$.$get$cJ(),c.a)}}}}],["","",,A,{"^":"",
bY:function(a){var z,y
z=C.a3.hM(a,0,new A.jR())
if(typeof z!=="number")return H.e(z)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
jR:{"^":"l:4;",
$2:function(a,b){var z,y
z=J.p(a,b&0x1FFFFFFF)
if(typeof z!=="number")return H.e(z)
y=536870911&z
y=536870911&y+((524287&y)<<10)
return y^y>>>6}}}],["","",,E,{"^":"",ay:{"^":"d;c3:a<",
hV:[function(a,b,c){return J.p(J.q(c,2),b)},"$2","gL",4,0,6],
j:function(a){var z,y
z=a.gc3()
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
l:function(a){return"[0] "+this.aL(0).l(0)+"\n[1] "+this.aL(1).l(0)+"\n"},
k:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
z[b]=c},
G:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.ay){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gT:function(a){return A.bY(this.a)},
aL:function(a){var z,y,x
z=new Float64Array(H.c(2))
y=this.a
if(a>=4)return H.a(y,a)
z[0]=y[a]
x=2+a
if(x>=4)return H.a(y,x)
z[1]=y[x]
return new E.b(z)},
m:function(a,b){var z
if(typeof b==="number"){z=new E.ay(new Float64Array(H.c(4)))
z.j(this)
z.F(0,b)
return z}b.ghx()
throw H.i(P.aq(b))},
p:function(a,b){var z=new E.ay(new Float64Array(H.c(4)))
z.j(this)
z.C(0,b)
return z},
n:function(a,b){var z=new E.ay(new Float64Array(H.c(4)))
z.j(this)
z.v(b)
return z},
N:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0},
i_:function(){var z,y,x,w,v,u,t
z=this.a
y=z[0]
x=z[3]
w=z[1]
v=z[2]
u=y*x-w*v
if(u===0)return 0
t=1/u
z[0]=x*t
z[1]=-w*t
z[2]=-v*t
z[3]=y*t
return u},
F:function(a,b){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b},
C:function(a,b){var z,y
z=b.gc3()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]},
v:function(a){var z,y
z=a.gc3()
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]
y[2]=y[2]-z[2]
y[3]=y[3]-z[3]}},b5:{"^":"d;c4:a<",
hV:[function(a,b,c){return J.p(J.q(c,3),b)},"$2","gL",4,0,6],
j:function(a){var z,y
z=a.gc4()
y=this.a
y[8]=z[8]
y[7]=z[7]
y[6]=z[6]
y[5]=z[5]
y[4]=z[4]
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
l:function(a){return"[0] "+this.aL(0).l(0)+"\n[1] "+this.aL(1).l(0)+"\n[2] "+this.aL(2).l(0)+"\n"},
k:function(a,b){var z=this.a
if(b>>>0!==b||b>=9)return H.a(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=9)return H.a(z,b)
z[b]=c},
G:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.b5){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]}else z=!1
return z},
gT:function(a){return A.bY(this.a)},
aL:function(a){var z,y,x
z=new Float64Array(H.c(3))
y=this.a
if(a>=9)return H.a(y,a)
z[0]=y[a]
x=3+a
if(x>=9)return H.a(y,x)
z[1]=y[x]
x=6+a
if(x>=9)return H.a(y,x)
z[2]=y[x]
return new E.aQ(z)},
m:function(a,b){var z
if(typeof b==="number"){z=new E.b5(new Float64Array(H.c(9)))
z.j(this)
z.F(0,b)
return z}b.ghx()
throw H.i(P.aq(b))},
p:function(a,b){var z=new E.b5(new Float64Array(H.c(9)))
z.j(this)
z.C(0,b)
return z},
n:function(a,b){var z=new E.b5(new Float64Array(H.c(9)))
z.j(this)
z.v(b)
return z},
N:function(){var z=this.a
z[0]=0
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=0
z[6]=0
z[7]=0
z[8]=0},
F:function(a,b){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b
z[4]=z[4]*b
z[5]=z[5]*b
z[6]=z[6]*b
z[7]=z[7]*b
z[8]=z[8]*b},
C:function(a,b){var z,y
z=b.gc4()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]
y[4]=y[4]+z[4]
y[5]=y[5]+z[5]
y[6]=y[6]+z[6]
y[7]=y[7]+z[7]
y[8]=y[8]+z[8]},
v:function(a){var z,y
z=a.gc4()
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]
y[2]=y[2]-z[2]
y[3]=y[3]-z[3]
y[4]=y[4]-z[4]
y[5]=y[5]-z[5]
y[6]=y[6]-z[6]
y[7]=y[7]-z[7]
y[8]=y[8]-z[8]}},b:{"^":"d;aD:a<",
ah:function(a,b){var z=this.a
z[0]=a
z[1]=b},
N:function(){var z=this.a
z[0]=0
z[1]=0},
j:function(a){var z,y
z=a.gaD()
y=this.a
y[1]=z[1]
y[0]=z[0]},
l:function(a){var z=this.a
return"["+H.h(z[0])+","+H.h(z[1])+"]"},
G:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.b){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gT:function(a){return A.bY(this.a)},
ag:function(a){var z=new E.b(new Float64Array(H.c(2)))
z.j(this)
z.M()
return z},
n:function(a,b){var z=new E.b(new Float64Array(H.c(2)))
z.j(this)
z.v(b)
return z},
p:function(a,b){var z=new E.b(new Float64Array(H.c(2)))
z.j(this)
z.C(0,b)
return z},
m:function(a,b){var z=new E.b(new Float64Array(H.c(2)))
z.j(this)
z.F(0,b)
return z},
k:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
z[b]=c},
gw:function(a){return Math.sqrt(this.gba())},
gba:function(){var z,y
z=this.a
y=z[0]
z=z[1]
return y*y+z*z},
a1:function(){var z,y,x
z=Math.sqrt(this.gba())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
return z},
cg:function(a){var z,y,x,w,v
z=this.a
y=z[0]
x=a.a
w=y-x[0]
v=z[1]-x[1]
return w*w+v*v},
A:function(a){var z,y
z=a.gaD()
y=this.a
return y[0]*z[0]+y[1]*z[1]},
ak:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[1]-y[1]*z[0]},
b_:function(a,b){var z,y
z=J.O(a)
y=this.a
b.ah(J.q(z.ag(a),y[1]),z.m(a,y[0]))
return b},
C:function(a,b){var z,y
z=b.gaD()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
v:function(a){var z,y
z=a.gaD()
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]},
F:function(a,b){var z,y
z=this.a
y=z[1]
if(typeof b!=="number")return H.e(b)
z[1]=y*b
z[0]=z[0]*b},
M:function(){var z=this.a
z[1]=-z[1]
z[0]=-z[0]},
sh:function(a,b){this.a[0]=b
return b},
si:function(a,b){this.a[1]=b
return b},
gaZ:function(a){return this.a[0]},
gbi:function(){return this.a[1]},
gaN:function(){return this.a[0]},
gh:function(a){return this.a[0]},
gi:function(a){return this.a[1]},
u:{
ex:function(){return new E.b(new Float64Array(H.c(2)))}}},aQ:{"^":"d;bx:a<",
N:function(){var z=this.a
z[2]=0
z[1]=0
z[0]=0},
j:function(a){var z,y
z=a.gbx()
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
l:function(a){var z=this.a
return"["+H.h(z[0])+","+H.h(z[1])+","+H.h(z[2])+"]"},
G:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof E.aQ){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gT:function(a){return A.bY(this.a)},
n:function(a,b){var z=new E.aQ(new Float64Array(H.c(3)))
z.j(this)
z.v(b)
return z},
p:function(a,b){var z=new E.aQ(new Float64Array(H.c(3)))
z.j(this)
z.C(0,b)
return z},
m:function(a,b){var z=new E.aQ(new Float64Array(H.c(3)))
z.j(this)
z.F(0,b)
return z},
k:function(a,b){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
return z[b]},
q:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=3)return H.a(z,b)
z[b]=c},
gw:function(a){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return Math.sqrt(y*y+x*x+z*z)},
A:function(a){var z,y
z=a.gbx()
y=this.a
return y[0]*z[0]+y[1]*z[1]+y[2]*z[2]},
C:function(a,b){var z,y
z=b.gbx()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]},
v:function(a){var z,y
z=a.gbx()
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]
y[2]=y[2]-z[2]},
F:function(a,b){var z=this.a
z[2]=z[2]*b
z[1]=z[1]*b
z[0]=z[0]*b},
sh:function(a,b){this.a[0]=b
return b},
si:function(a,b){this.a[1]=b
return b},
gaZ:function(a){return this.a[0]},
gbi:function(){return this.a[1]},
gcb:function(){return this.a[2]},
gaN:function(){return this.a[0]},
ga5:function(a){return this.a[2]},
gh:function(a){return this.a[0]},
gi:function(a){return this.a[1]}}}],["","",,B,{"^":"",
lF:[function(){var z,y
z=B.i2()
document.body.appendChild(z.f)
y=window
C.r.d6(y)
C.r.dm(y,W.bh(z.ge6()))},"$0","f5",0,0,1],
i1:{"^":"d;a,b,c,b1:d>,e,f,r",
ef:function(a){var z,y
z=a.f
y=z.e
z=z.c.a
J.d6(this.r,z[0],z[1])
J.fm(this.r,y)},
j4:[function(a){var z
J.ff(this.r,0,0,1280,720)
J.c7(this.r)
J.d6(this.r,640,360)
J.fn(this.r,32,32)
J.c7(this.r)
this.ef(this.d)
z=this.r
J.d4(z,this.b?"#08c":"#080")
J.d0(this.r,-1,-1,2,2)
J.c6(this.r)
J.c7(this.r)
this.ef(this.e)
J.d4(this.r,"#c80")
J.d0(this.r,-16,-1,32,2)
J.c6(this.r)
J.c6(this.r)
this.eZ()
z=window
C.r.d6(z)
C.r.dm(z,W.bh(this.ge6()))},"$1","ge6",2,0,14],
eZ:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=this.d.dy
y=new E.b(new Float64Array(H.c(2)))
for(x=0;z!=null;z=z.d){w=z.b
v=V.ez()
u=w.f
t=u.c
s=w.r
r=s.c
q=u.d
p=s.d
v.dT(0,w.z,t.d,q.b,r.d,p.b)
if(v.a.a[1]>-0.5)continue
for(u=v.b,o=0;o<2;++o){y.C(0,u[o]);++x}}u=x>0
this.b=u
if(this.c&&u){y.F(0,1/x)
u=new Float64Array(H.c(2))
u[0]=0
u[1]=-100
this.d.h7(new E.b(u),y)
P.c0("Jump")}u=this.a
s=u.id.a
n=s.b
s.a=n==null?$.D.$0():n
n=u.k1.a
m=n.b
n.a=m==null?$.D.$0():m
m=u.a
if((m&1)===1){m=u.b
m.a.cF(m)
m=u.a&=4294967294}u.a=m|2
m=u.go
m.a=0.016666666666666666
m.d=10
m.e=10
m.b=60
m.c=u.cx*0.016666666666666666
m.f=u.cy
l=u.fr.b
k=n.b
if(k==null)k=$.D.$0()
l.af(J.an(J.am(J.q(J.r(k,n.a),1000),$.N)))
l=n.b
n.a=l==null?$.D.$0():l
u.b.hf()
l=u.fr.c
k=n.b
if(k==null)k=$.D.$0()
l.af(J.an(J.am(J.q(J.r(k,n.a),1000),$.N)))
if(u.dy&&m.a>0){l=n.b
n.a=l==null?$.D.$0():l
u.fx.bM(m)
l=u.fr.d
k=n.b
if(k==null)k=$.D.$0()
l.af(J.an(J.am(J.q(J.r(k,n.a),1000),$.N)))
l=n.b
n.a=l==null?$.D.$0():l
u.bM(m)
l=u.fr.e
k=n.b
if(k==null)k=$.D.$0()
l.af(J.an(J.am(J.q(J.r(k,n.a),1000),$.N)))}if(u.db&&m.a>0){l=n.b
n.a=l==null?$.D.$0():l
u.eS(m)
l=u.fr.z
k=n.b
if(k==null)k=$.D.$0()
l.af(J.an(J.am(J.q(J.r(k,n.a),1000),$.N)))}if(m.a>0)u.cx=m.b
if((u.a&4)===4)u.hc()
u.a&=4294967293
u=u.fr.a
n=s.b
if(n==null)n=$.D.$0()
u.af(J.an(J.am(J.q(J.r(n,s.a),1000),$.N)))},
fm:function(){var z,y,x,w,v,u,t,s
z=new V.fr(C.f,null,new E.b(new Float64Array(H.c(2))),0,new E.b(new Float64Array(H.c(2))),0,0,0,!0,!0,!1,!1,!0,1)
y=V.cw()
y.cM(16,1)
x=new Float64Array(H.c(2))
x[0]=0
x[1]=4
z.c=new E.b(x)
x=this.a
w=x.dI(z)
this.e=w
v=w.r1
v.a=y
v.e=0
w.dJ(v)
v=new Float64Array(H.c(2))
v[0]=0
v[1]=-4
z.c=new E.b(v)
z.d=1
z.a=C.h
this.d=x.dI(z)
y=V.cw()
y.cM(1,1)
u=new V.dB(null,null,0.2,0,0,!1,new V.ck(1,65535,0))
u.d=0.5
u.e=0.05
u.a=y
this.d.dJ(u)
x=document
t=x.createElement("canvas")
J.fo(t,1280)
J.c8(t,720)
this.f=t
s=window.devicePixelRatio
if(s!==1){x=t.style
if(typeof s!=="number")return H.e(s)
w=H.h(1280/s)+"px"
x.width=w
x=this.f.style
w=H.h(720/s)+"px"
x.height=w}this.r=J.fk(this.f,"2d")
x=J.fh(this.f)
new W.cM(0,x.a,x.b,W.bh(new B.i3(this)),!1,[H.Y(x,0)]).bw()
x=J.fi(this.f)
new W.cM(0,x.a,x.b,W.bh(new B.i4(this)),!1,[H.Y(x,0)]).bw()},
u:{
i2:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4,c5
z=new Float64Array(H.c(2))
z[0]=0
z[1]=10
y=V.fL(100,10)
x=V.fJ(V.fT())
w=V.iH(4,4)
v=new P.cF(0,0)
if($.N==null){H.cz()
$.N=$.aO}v.bN(0)
u=new P.cF(0,0)
if($.N==null){H.cz()
$.N=$.aO}u.bN(0)
t=G.B()
s=new Float64Array(H.c(2))
r=new Float64Array(H.c(2))
q=P.n
p=[P.o,E.b]
o=P.b1(null,null,null,q,p)
n=new Float64Array(H.c(2))
m=new Float64Array(H.c(2))
l=new Float64Array(H.c(2))
k=new Float64Array(H.c(2))
j=new Float64Array(H.c(2))
i=V.bs()
h=V.bs()
g=new Float64Array(H.c(2))
f=new Float64Array(H.c(2))
e=[V.bl]
d=H.k(new Array(10),e)
c=new P.cF(0,0)
if($.N==null){H.cz()
$.N=$.aO}c.bN(0)
b=V.bs()
a=V.bs()
a0=new Float64Array(H.c(2))
a1=new Float64Array(H.c(2))
a2=V.aK()
a3=V.aK()
a4=new Float64Array(H.c(2))
a5=new Float64Array(H.c(2))
a6=new Float64Array(H.c(2))
a7=new Float64Array(H.c(2))
a8=new Float64Array(H.c(2))
a9=new Float64Array(H.c(2))
e=H.k(new Array(2),e)
b0=new Float64Array(H.c(2))
b1=new Float64Array(H.c(2))
b2=new Float64Array(H.c(2))
b3=new Float64Array(H.c(2))
b4=new Float64Array(H.c(2))
b5=new Float64Array(H.c(2))
b6=new Float64Array(H.c(2))
b7=new Float64Array(H.c(2))
b8=C.c.aa(C.c.b6(102))
b9=C.c.aa(C.c.b6(102))
c0=C.c.aa(C.c.b6(255))
c1=new Float64Array(H.c(2))
c2=new Float64Array(H.c(2))
c3=new Float64Array(H.c(2))
c4=new Float64Array(H.c(2))
p=P.b1(null,null,null,q,p)
q=new E.b(new Float64Array(H.c(2)))
q.j(new E.b(z))
c5=new V.iD(0,null,null,null,0,0,q,!1,null,null,null,y,0,!1,!1,!1,!1,null,null,w,new V.eh(0,0,0,0,0,!1),new G.cH(v),new G.cH(u),new G.cf(0,0,0),t,new E.b(s),new E.b(r),new V.ew(o),new V.iF(null,null),new V.iG(new V.e0(new E.b(n),0),new E.b(m),new E.b(l),null,null),new V.cB(new E.b(k),new E.b(j),0),new V.dD(null,null,null,null,null,null,0,0,0,0,0,0,i,new V.e7(null,null,null),new V.bt(null,null,0,null,null),h,new V.bt(null,null,0,null,null),new V.da(g,f,0)),d,new G.cH(c),new V.dD(null,null,null,null,null,null,0,0,0,0,0,0,b,new V.e7(null,null,null),new V.bt(null,null,0,null,null),a,new V.bt(null,null,0,null,null),new V.da(a0,a1,0)),new V.il(a2,a3,new G.az(new E.b(a4),new E.b(a5),new E.b(a6),0,0,0),new G.az(new E.b(a7),new E.b(a8),new E.b(a9),0,0,0),0),new V.im(C.E,0),new V.eh(0,0,0,0,0,!1),e,new G.az(new E.b(b0),new E.b(b1),new E.b(b2),0,0,0),new G.az(new E.b(b3),new E.b(b4),new E.b(b5),0,0,0),0.12,-1,new E.b(b6),new E.b(b7),new G.cf(b8,b9,c0),new E.b(c1),new E.b(c2),new E.b(c3),new E.b(c4),new V.ew(p))
c5.y=null
c5.Q=null
c5.c=null
c5.d=null
c5.e=0
c5.f=0
c5.cy=!0
c5.db=!0
c5.dx=!1
c5.dy=!0
c5.x=!0
c5.a=4
c5.cx=0
c5.b=V.fC(c5,x)
c5.fr=new V.hU(new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0),new V.a6(0,0,17976931348623157e292,-17976931348623157e292,0))
c5.fx=V.hN(c5)
c5.fR()
x=new B.i1(c5,!1,!1,null,null,null,null)
x.fm()
return x}}},
i3:{"^":"l:2;a",
$1:function(a){this.a.c=!0
return!0}},
i4:{"^":"l:2;a",
$1:function(a){this.a.c=!1
return!1}}},1]]
setupProgram(dart,0)
J.u=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.dJ.prototype
return J.dI.prototype}if(typeof a=="string")return J.bC.prototype
if(a==null)return J.dK.prototype
if(typeof a=="boolean")return J.hf.prototype
if(a.constructor==Array)return J.b2.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b4.prototype
return a}if(a instanceof P.d)return a
return J.bX(a)}
J.H=function(a){if(typeof a=="string")return J.bC.prototype
if(a==null)return a
if(a.constructor==Array)return J.b2.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b4.prototype
return a}if(a instanceof P.d)return a
return J.bX(a)}
J.bW=function(a){if(a==null)return a
if(a.constructor==Array)return J.b2.prototype
if(typeof a!="object"){if(typeof a=="function")return J.b4.prototype
return a}if(a instanceof P.d)return a
return J.bX(a)}
J.O=function(a){if(typeof a=="number")return J.b3.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bO.prototype
return a}
J.aX=function(a){if(typeof a=="number")return J.b3.prototype
if(typeof a=="string")return J.bC.prototype
if(a==null)return a
if(!(a instanceof P.d))return J.bO.prototype
return a}
J.f=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.b4.prototype
return a}if(a instanceof P.d)return a
return J.bX(a)}
J.p=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.aX(a).p(a,b)}
J.z=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.u(a).G(a,b)}
J.S=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.O(a).Z(a,b)}
J.a3=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.O(a).S(a,b)}
J.q=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.aX(a).m(a,b)}
J.c2=function(a){if(typeof a=="number")return-a
return J.O(a).ag(a)}
J.r=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.O(a).n(a,b)}
J.am=function(a,b){return J.O(a).bO(a,b)}
J.fb=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.eZ(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.H(a).k(a,b)}
J.fc=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.eZ(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.bW(a).q(a,b,c)}
J.fd=function(a,b,c,d){return J.f(a).fv(a,b,c,d)}
J.fe=function(a,b,c,d){return J.f(a).fW(a,b,c,d)}
J.ff=function(a,b,c,d,e){return J.f(a).hd(a,b,c,d,e)}
J.fg=function(a,b){return J.aX(a).aU(a,b)}
J.c3=function(a,b,c){return J.H(a).hn(a,b,c)}
J.d_=function(a,b){return J.bW(a).al(a,b)}
J.d0=function(a,b,c,d,e){return J.f(a).hG(a,b,c,d,e)}
J.a0=function(a){return J.f(a).gap(a)}
J.aY=function(a){return J.f(a).gaG(a)}
J.aZ=function(a){return J.u(a).gT(a)}
J.d1=function(a){return J.f(a).gt(a)}
J.a8=function(a){return J.f(a).ga3(a)}
J.d2=function(a){return J.f(a).gL(a)}
J.bj=function(a){return J.bW(a).ga4(a)}
J.a9=function(a){return J.H(a).gw(a)}
J.fh=function(a){return J.f(a).ge0(a)}
J.fi=function(a){return J.f(a).ge1(a)}
J.fj=function(a){return J.f(a).ga5(a)}
J.d3=function(a){return J.f(a).gU(a)}
J.c4=function(a){return J.f(a).gh(a)}
J.c5=function(a){return J.f(a).gi(a)}
J.fk=function(a,b){return J.f(a).eo(a,b)}
J.fl=function(a,b){return J.bW(a).aI(a,b)}
J.c6=function(a){return J.f(a).io(a)}
J.fm=function(a,b){return J.f(a).ip(a,b)}
J.c7=function(a){return J.f(a).eu(a)}
J.fn=function(a,b,c){return J.f(a).ev(a,b,c)}
J.ac=function(a,b){return J.f(a).sap(a,b)}
J.d4=function(a,b){return J.f(a).shH(a,b)}
J.c8=function(a,b){return J.f(a).st(a,b)}
J.b_=function(a,b){return J.f(a).sU(a,b)}
J.fo=function(a,b){return J.f(a).saK(a,b)}
J.c9=function(a,b){return J.f(a).sh(a,b)}
J.ca=function(a,b){return J.f(a).si(a,b)}
J.an=function(a){return J.O(a).iy(a)}
J.d5=function(a){return J.O(a).aa(a)}
J.ao=function(a){return J.u(a).l(a)}
J.d6=function(a,b,c){return J.f(a).iz(a,b,c)}
var $=I.p
C.N=J.j.prototype
C.d=J.b2.prototype
C.n=J.dI.prototype
C.c=J.dJ.prototype
C.a=J.dK.prototype
C.b=J.b3.prototype
C.O=J.bC.prototype
C.W=J.b4.prototype
C.a3=H.hB.prototype
C.D=J.hQ.prototype
C.y=J.bO.prototype
C.r=W.iC.prototype
C.f=new V.cc(0)
C.H=new V.cc(1)
C.h=new V.cc(2)
C.I=new H.ds()
C.J=new H.dx([null])
C.K=new H.fX()
C.L=new P.hJ()
C.M=new P.iT()
C.e=new P.jq()
C.z=new P.ae(0)
C.m=new V.ci(0)
C.p=new V.ci(1)
C.A=new V.ci(2)
C.P=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.Q=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.B=function(hooks) { return hooks; }

C.R=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.S=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.T=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.U=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.V=function(_, letter) { return letter.toUpperCase(); }
C.C=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.k=new V.cq(0)
C.i=new V.cq(1)
C.q=new V.cq(2)
C.X=new H.au([0,"ShapeType.CIRCLE",1,"ShapeType.EDGE",2,"ShapeType.POLYGON",3,"ShapeType.CHAIN"],[null,null])
C.Y=new H.au([0,"VertexType.ISOLATED",1,"VertexType.CONCAVE",2,"VertexType.CONVEX"],[null,null])
C.Z=new H.au([0,"BodyType.STATIC",1,"BodyType.KINEMATIC",2,"BodyType.DYNAMIC"],[null,null])
C.a_=new H.au([0,"SeparationFunctionType.POINTS",1,"SeparationFunctionType.FACE_A",2,"SeparationFunctionType.FACE_B"],[null,null])
C.a0=new H.au([0,"EPAxisType.UNKNOWN",1,"EPAxisType.EDGE_A",2,"EPAxisType.EDGE_B"],[null,null])
C.a1=new H.au([0,"ManifoldType.CIRCLES",1,"ManifoldType.FACE_A",2,"ManifoldType.FACE_B"],[null,null])
C.a2=new H.au([0,"TOIOutputState.UNKNOWN",1,"TOIOutputState.FAILED",2,"TOIOutputState.OVERLAPPED",3,"TOIOutputState.TOUCHING",4,"TOIOutputState.SEPARATED"],[null,null])
C.t=new V.cD(0)
C.u=new V.cD(1)
C.v=new V.cD(2)
C.l=new V.bM(0)
C.o=new V.bM(1)
C.j=new V.bM(2)
C.w=new V.bM(3)
C.E=new V.bc(0)
C.F=new V.bc(1)
C.a4=new V.bc(2)
C.x=new V.bc(3)
C.a5=new V.bc(4)
C.G=new V.iB(0)
$.dW="$cachedFunction"
$.dX="$cachedInvocation"
$.aO=null
$.D=null
$.a4=0
$.aJ=null
$.d7=null
$.cX=null
$.eO=null
$.f2=null
$.bV=null
$.bZ=null
$.cY=null
$.aD=null
$.aS=null
$.aT=null
$.cS=!1
$.w=C.e
$.dz=0
$.N=null
$.dj=null
$.di=null
$.dh=null
$.dg=null
$.dp=0
$.dq=0
$.dr=20
$.ec=0
$.ed=0
$.ee=0
$.eg=0
$.ef=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["df","$get$df",function(){return H.eW("_$dart_dartClosure")},"cl","$get$cl",function(){return H.eW("_$dart_js")},"dE","$get$dE",function(){return H.ha()},"dF","$get$dF",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.dz
$.dz=z+1
z="expando$key$"+z}return new P.fZ(null,z)},"ek","$get$ek",function(){return H.a7(H.bN({
toString:function(){return"$receiver$"}}))},"el","$get$el",function(){return H.a7(H.bN({$method$:null,
toString:function(){return"$receiver$"}}))},"em","$get$em",function(){return H.a7(H.bN(null))},"en","$get$en",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"er","$get$er",function(){return H.a7(H.bN(void 0))},"es","$get$es",function(){return H.a7(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"ep","$get$ep",function(){return H.a7(H.eq(null))},"eo","$get$eo",function(){return H.a7(function(){try{null.$method$}catch(z){return z.message}}())},"eu","$get$eu",function(){return H.a7(H.eq(void 0))},"et","$get$et",function(){return H.a7(function(){try{(void 0).$method$}catch(z){return z.message}}())},"cL","$get$cL",function(){return P.iJ()},"bz","$get$bz",function(){var z=new P.aA(0,P.iI(),null,[null])
z.ft(null,null)
return z},"aV","$get$aV",function(){return[]},"de","$get$de",function(){return{}},"as","$get$as",function(){return E.ex()},"cJ","$get$cJ",function(){return E.ex()}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,,]},{func:1,ret:P.al,args:[P.n]},{func:1,ret:P.n,args:[P.n,P.n]},{func:1,ret:E.b},{func:1,args:[,P.al]},{func:1,args:[P.al]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[,],opt:[P.ba]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,P.ba]},{func:1,v:true,args:[P.Z]},{func:1,ret:P.Z},{func:1,ret:P.n,args:[P.C,P.C]},{func:1,ret:V.cv}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}else if(x===y)H.ka(d||a)
return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.M=a.M
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.f7(B.f5(),b)},[])
else (function(b){H.f7(B.f5(),b)})([])})})()