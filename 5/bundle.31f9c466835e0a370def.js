(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",c="quarter",d="year",u="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:o,d:a,D:u,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},b="en",y={};y[b]=m;var $=function(t){return t instanceof D},g=function t(e,n,i){var s;if(!e)return b;if("string"==typeof e){var r=e.toLowerCase();y[r]&&(s=r),n&&(y[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;y[o]=e,s=o}return!i&&s&&(b=s),s||!i&&b},M=function(t,e){if($(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},w=_;w.l=g,w.i=$,w.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function m(t){this.$L=g(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return w},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return M(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<M(t)},v.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!w.u(e)||e,f=w.p(t),p=function(t,e){var i=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(a)},h=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,_=this.$D,b="set"+(this.$u?"UTC":"");switch(f){case d:return c?p(1,0):p(31,11);case l:return c?p(1,v):p(0,v+1);case o:var y=this.$locale().weekStart||0,$=(m<y?m+7:m)-y;return p(c?_-$:_+(6-$),v);case a:case u:return h(b+"Hours",0);case r:return h(b+"Minutes",1);case s:return h(b+"Seconds",2);case i:return h(b+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var o,c=w.p(t),f="set"+(this.$u?"UTC":""),p=(o={},o[a]=f+"Date",o[u]=f+"Date",o[l]=f+"Month",o[d]=f+"FullYear",o[r]=f+"Hours",o[s]=f+"Minutes",o[i]=f+"Seconds",o[n]=f+"Milliseconds",o)[c],h=c===a?this.$D+(e-this.$W):e;if(c===l||c===d){var m=this.clone().set(u,1);m.$d[p](h),m.init(),this.$d=m.set(u,Math.min(this.$D,m.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[w.p(t)]()},v.add=function(n,c){var u,f=this;n=Number(n);var p=w.p(c),h=function(t){var e=M(f);return w.w(e.date(e.date()+Math.round(t*n)),f)};if(p===l)return this.set(l,this.$M+n);if(p===d)return this.set(d,this.$y+n);if(p===a)return h(1);if(p===o)return h(7);var m=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[p]||1,v=this.$d.getTime()+n*m;return w.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=w.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,c=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return w.s(r%12||12,t,"0")},p=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:d(n.monthsShort,o,c,3),MMMM:d(c,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:w.s(r,2,"0"),h:u(1),hh:u(2),a:p(r,a,!0),A:p(r,a,!1),m:String(a),mm:w.s(a,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,u,f){var p,h=w.p(u),m=M(n),v=(m.utcOffset()-this.utcOffset())*t,_=this-m,b=w.m(this,m);return b=(p={},p[d]=b/12,p[l]=b,p[c]=b/3,p[o]=(_-v)/6048e5,p[a]=(_-v)/864e5,p[r]=_/e,p[s]=_/t,p[i]=_/1e3,p)[h]||_,f?b:w.a(b)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return y[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=g(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return w.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),S=D.prototype;return M.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",d],["$D",u]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,D,M),t.$i=!0),M},M.locale=g,M.isDayjs=$,M.unix=function(t){return M(1e3*t)},M.en=y[b],M.Ls=y,M.p={},M}()},646:function(t){t.exports=function(){"use strict";var t,e,n=1e3,i=6e4,s=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2592e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:o,months:l,days:r,hours:s,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},u=function(t){return t instanceof b},f=function(t,e,n){return new b(t,n,e.$l)},p=function(t){return e.p(t)+"s"},h=function(t){return t<0},m=function(t){return h(t)?Math.ceil(t):Math.floor(t)},v=function(t){return Math.abs(t)},_=function(t,e){return t?h(t)?{negative:!0,format:""+v(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},b=function(){function h(t,e,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return f(t*d[p(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){i.$d[p(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var s=t.match(c);if(s){var r=s.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var v=h.prototype;return v.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*d[n]}),0)},v.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=m(t/o),t%=o,this.$d.months=m(t/l),t%=l,this.$d.days=m(t/r),t%=r,this.$d.hours=m(t/s),t%=s,this.$d.minutes=m(t/i),t%=i,this.$d.seconds=m(t/n),t%=n,this.$d.milliseconds=t},v.toISOString=function(){var t=_(this.$d.years,"Y"),e=_(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=_(n,"D"),s=_(this.$d.hours,"H"),r=_(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3);var o=_(a,"S"),l=t.negative||e.negative||i.negative||s.negative||r.negative||o.negative,c=s.format||r.format||o.format?"T":"",d=(l?"-":"")+"P"+t.format+e.format+i.format+c+s.format+r.format+o.format;return"P"===d||"-P"===d?"P0D":d},v.toJSON=function(){return this.toISOString()},v.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(i[t])}))},v.as=function(t){return this.$ms/d[p(t)]},v.get=function(t){var e=this.$ms,n=p(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?m(e/d[n]):this.$d[n],0===e?0:e},v.add=function(t,e,n){var i;return i=e?t*d[p(e)]:u(t)?t.$ms:f(t,this).$ms,f(this.$ms+i*(n?-1:1),this)},v.subtract=function(t,e){return this.add(t,e,!0)},v.locale=function(t){var e=this.clone();return e.$l=t,e},v.clone=function(){return f(this.$ms,this)},v.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},v.milliseconds=function(){return this.get("milliseconds")},v.asMilliseconds=function(){return this.as("milliseconds")},v.seconds=function(){return this.get("seconds")},v.asSeconds=function(){return this.as("seconds")},v.minutes=function(){return this.get("minutes")},v.asMinutes=function(){return this.as("minutes")},v.hours=function(){return this.get("hours")},v.asHours=function(){return this.as("hours")},v.days=function(){return this.get("days")},v.asDays=function(){return this.as("days")},v.weeks=function(){return this.get("weeks")},v.asWeeks=function(){return this.as("weeks")},v.months=function(){return this.get("months")},v.asMonths=function(){return this.as("months")},v.years=function(){return this.get("years")},v.asYears=function(){return this.as("years")},h}();return function(n,i,s){t=s,e=s().$utils(),s.duration=function(t,e){var n=s.locale();return f(t,{$l:n},e)},s.isDuration=u;var r=i.prototype.add,a=i.prototype.subtract;i.prototype.add=function(t,e){return u(t)&&(t=t.asMilliseconds()),r.bind(this)(t,e)},i.prototype.subtract=function(t,e){return u(t)&&(t=t.asMilliseconds()),a.bind(this)(t,e)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t={BEFOREBEGIN:"beforebegin",AFTERBEGIN:"afterbegin",BEFOREEND:"beforeend",AFTEREND:"afterend"};function e(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function i(e,n){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t.BEFOREEND;n.insertAdjacentElement(i,e.getElement())}class s{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input\n                id="sort-day"\n                class="trip-sort__input  visually-hidden"\n                type="radio" name="trip-sort"\n                value="sort-day"\n                checked\n              >\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input\n                id="sort-event"\n                class="trip-sort__input  visually-hidden"\n                type="radio"\n                name="trip-sort"\n                value="sort-event"\n                disabled\n              >\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input\n                id="sort-time"\n                class="trip-sort__input  visually-hidden"\n                type="radio"\n                name="trip-sort"\n                value="sort-time"\n              >\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input\n                id="sort-price"\n                class="trip-sort__input  visually-hidden"\n                type="radio"\n                name="trip-sort"\n                value="sort-price"\n              >\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input\n                id="sort-offer"\n                class="trip-sort__input  visually-hidden"\n                type="radio"\n                name="trip-sort"\n                value="sort-offer"\n                disabled\n              >\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var r=n(484),a=n.n(r),o=n(646),l=n.n(o);a().extend(l());const c="MMM DD",d="HH:mm";function u(t){return t[Math.floor(Math.random()*t.length)]}function f(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e))+e}function p(t,e){const n=e?d:c;return t?a()(t).format(n):""}function h(t){const e=f(7),n=f(24),i=f(60);return t?a()(t).add(e,"day").add(n,"hour").add(i,"minute").format():a()().add(e,"day").add(n,"hour").add(i,"minute").format()}function m(t){return t.slice(0,16)}function v(t){return a()(t).format("DD/MM/YY HH:mm")}function _(t){return t[0].toUpperCase()+t.slice(1)}class b{constructor(t){let{point:e}=t;this.point=e}getTemplate(){return function(t){const{basePrice:e,dateFrom:n,dateTo:i,destination:s,isFavorite:r,offers:o,allOffersThisType:l,type:c}=t;let d="";if(o.length>0){d+='<ul class="event__selected-offers">';for(let t=0;t<o.length;t++){const e=l.find((e=>e.id===o[t]));d+=`<li class="event__offer">\n                        <span class="event__offer-title">${e.title}</span>\n                        &plus;&euro;&nbsp;\n                        <span class="event__offer-price">${e.price}</span>\n                  </li>`}d+="</ul>"}return`<li class="trip-events__item">\n              <div class="event">\n                <time\n                  class="event__date"\n                  datetime="${u=n,a()(u).format("YYYY-MM-DD")}"\n                  >${p(n)}</time>\n                <div class="event__type">\n                  <img\n                    class="event__type-icon"\n                    width="42"\n                    height="42"\n                    src="img/icons/${c}.png"\n                    alt="Event type icon"\n                  >\n                </div>\n                <h3 class="event__title">${c} ${s.name}</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time\n                      class="event__start-time"\n                      datetime="${m(n)}"\n                    >${p(n,!0)}</time>\n                    &mdash;\n                    <time\n                      class="event__end-time"\n                      datetime="${m(i)}"\n                    >${p(i,!0)}</time>\n                  </p>\n                  <p class="event__duration">${function(t,e){const n=a().duration(a()(e).diff(a()(t))).$d;return((n.year?`${n.year}Y `:"")+(n.months?`${n.months}Mth `:"")+(n.days?`${n.days}D `:"")+(n.hours?`${n.hours}H `:"")+(n.minutes?`${n.minutes}M`:"")).trimEnd()}(n,i)}</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${e}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                ${d}\n                <button\n                  class="event__favorite-btn${r?" event__favorite-btn--active":""}"\n                  type="button"\n                >\n                  <span class="visually-hidden">Add to favorite</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>`;var u}(this.point)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class y{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const $=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class g{constructor(t,e){let{point:n}=t;this.point=n,this.allDestinations=e}getTemplate(){return function(t,e){const{basePrice:n,dateFrom:i,dateTo:s,destination:r,offers:a,allOffersThisType:o,type:l}=t;return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-1">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img\n                        class="event__type-icon"\n                        width="17"\n                        height="17"\n                        src="img/icons/${l}.png"\n                        alt="Event type icon"\n                      >\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n                    <div class="event__type-list">\n                      <fieldset class="event__type-group">\n                        <legend class="visually-hidden">Event type</legend>\n                        ${function(){let e="";for(let n=0;n<$.length;n++){const i=$[n];e+=`\n        <div class="event__type-item">\n            <input\n              id="event-type-${i}-1"\n              class="event__type-input visually-hidden"\n              type="radio"\n              name="event-type"\n              value="${i}"\n              ${t.type===i?" checked":""}\n            >\n            <label\n              class="event__type-label  event__type-label--${i}"\n              for="event-type-${i}-1"\n            >${_(i)}\n            </label>\n        </div>\n`}return e}()}\n                      </fieldset>\n                    </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${_(l)}\n                    </label>\n                    <input\n                      class="event__input  event__input--destination"\n                      id="event-destination-1"\n                      type="text"\n                      name="event-destination"\n                      value="${r.name}"\n                      list="destination-list-1"\n                    >\n                    <datalist id="destination-list-1">\n                      ${function(){let t="";for(let n=0;n<e.length;n++)t+=`<option value="${e[n].name}"></option>`;return t}()}\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input\n                      class="event__input  event__input--time"\n                      id="event-start-time-1"\n                      type="text"\n                      name="event-start-time"\n                      value="${v(i)}"\n                    >\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input\n                      class="event__input  event__input--time"\n                      id="event-end-time-1"\n                      type="text"\n                      name="event-end-time"\n                      value="${v(s)}"\n                    >\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-1">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input\n                      class="event__input  event__input--price"\n                      id="event-price-1"\n                      type="text"\n                      name="event-price"\n                      value="${n}"\n                    >\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Delete</button>\n                  <button class="event__rollup-btn" type="button">\n                    <span class="visually-hidden">Open event</span>\n                  </button>\n                </header>\n                <section class="event__details">\n                  <section class="event__section  event__section--offers">\n                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n                    <div class="event__available-offers">\n                      ${function(){let t="";for(let e=0;e<o.length;e++){const n=!!a.find((t=>t===o[e].id));t+=`\n        <div class="event__offer-selector">\n          <input\n            class="event__offer-checkbox  visually-hidden"\n            id="${o[e].id}"\n            type="checkbox"\n            name="event-offer-comfort" ${n?"Checked":""}\n          >\n          <label class="event__offer-label" for="${o[e].id}">\n            <span class="event__offer-title">${o[e].title}</span>\n            &plus;&euro;&nbsp;\n            <span class="event__offer-price">${o[e].price}</span>\n          </label>\n        </div>\n      `}return t}()}\n                    </div>\n                  </section>\n\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${r.description}</p>\n                  </section>\n                </section>\n              </form>\n            </li>`}(this.point,this.allDestinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const M=[{type:"taxi",offers:[{id:"b4b4fa1c-f63c-41ef-83f0-7206f3348e32",title:"Upgrade to a business class",price:197},{id:"6d1f61b0-4ced-4929-bb23-b15ae2822273",title:"Choose the radio station",price:32},{id:"ee02abe7-1121-4b86-9c40-8f0f7ebb18c4",title:"Choose temperature",price:156},{id:"86385b20-6691-4785-bdcf-025f0151fc1f",title:"Drive quickly, I'm in a hurry",price:37},{id:"573d817e-d188-428f-a481-749ee9a14110",title:"Drive slowly",price:49}]},{type:"bus",offers:[{id:"6f110b17-0bcf-483e-9b82-a080c2eb99b4",title:"Infotainment system",price:148},{id:"c821cd37-6844-4689-88f5-a62b99944000",title:"Order meal",price:127},{id:"f195a78b-de87-469a-81ab-5995c04d6147",title:"Choose seats",price:48}]},{type:"train",offers:[{id:"389017d0-623a-41a1-8182-52837957a033",title:"Book a taxi at the arrival point",price:191},{id:"77193dd9-36bb-4e79-9e52-b5a5f6bf9515",title:"Order a breakfast",price:145},{id:"c6350636-2623-4c20-89e6-a75302a0d348",title:"Wake up at a certain time",price:166}]},{type:"flight",offers:[{id:"f57dac90-27e3-40f7-826e-9430e13da2f0",title:"Choose meal",price:76},{id:"8f96a473-922b-4626-953f-012b98cb657b",title:"Choose seats",price:138},{id:"70b820b7-2a52-4688-b499-0633a4c1e39a",title:"Upgrade to comfort class",price:169},{id:"48e22e76-d709-497b-b160-7c5f63c859f0",title:"Upgrade to business class",price:145},{id:"e5a45584-45ca-40a7-80cb-a63d136e8057",title:"Add luggage",price:38},{id:"515c2ec8-36f3-4bc9-ac33-f07e9c6e3ee2",title:"Business lounge",price:182}]},{type:"check-in",offers:[{id:"3906efa5-3ca0-4700-89a1-7e88ad80974d",title:"Choose the time of check-in",price:54},{id:"a7965ac3-b3cb-49d3-8c07-01b822f54b60",title:"Choose the time of check-out",price:101},{id:"ac6a4c74-a6cb-4f70-bcc4-15d60a62952d",title:"Add breakfast",price:32},{id:"78df120e-22d4-4b68-83cd-75efe0e5b29f",title:"Laundry",price:32},{id:"419861a0-171b-480c-bf57-971e6d0db854",title:"Order a meal from the restaurant",price:39}]},{type:"sightseeing",offers:[{id:"51ccd79e-1c43-45d1-ba0e-3164c80466391",title:"Test Offer",price:1},{id:"51ccd79e-1c43-45d1-ba0e-3164c80466392",title:"Test Offer",price:2},{id:"51ccd79e-1c43-45d1-ba0e-3164c80466393",title:"Test Offer",price:3},{id:"51ccd79e-1c43-45d1-ba0e-3164c80466394",title:"Test Offer",price:4},{id:"51ccd79e-1c43-45d1-ba0e-3164c80466395",title:"Test Offer",price:5}]},{type:"ship",offers:[{id:"51ccd79e-1c43-45d1-ba0e-3164c8046639",title:"Choose meal",price:171},{id:"38dcaba1-2ccb-4e49-ab8f-cc24fe38dbb0",title:"Choose seats",price:186},{id:"fe66a3b2-8023-42f1-939b-d4c94503be8c",title:"Upgrade to comfort class",price:70},{id:"350a4f66-bf21-4ff9-a84d-ea7ad122510e",title:"Upgrade to business class",price:100},{id:"2777a699-3cde-4e62-8965-ef6e366a6c3c",title:"Add luggage",price:200},{id:"b0faafe3-0134-49da-b181-99c5df271b3f",title:"Business lounge",price:115}]},{type:"drive",offers:[{id:"047ff914-f5b2-4a18-add9-6bc09fa3a74f",title:"With automatic transmission",price:51},{id:"f10c4d3a-0f3c-4e2d-b31a-212aeed3327d",title:"With air conditioning",price:123}]},{type:"restaurant",offers:[{id:"64124ac4-a701-44d4-b73f-223f302aea91",title:"Choose live music",price:134},{id:"d903fd0b-93ee-4e53-a535-b11757c55231",title:"Choose VIP area",price:98}]}];function w(t){return t?M.find((e=>e.type===t)):M}const D=["b8bbe9a6-9fde-4713-930b-8105ed8decbb","0ac9df44-6b6d-4233-8d29-3e227a3e470f","115c1f07-f50e-4811-8b30-6e386023d457","1ad0d08f-7172-4c3b-9fa1-5da21ea95bb2","8e1901ba-1e26-43fa-b740-95a8286ce345"];function S(){const t=f(3),e=u($),n=w(e).offers,i=h(),s=h(i),r=[];for(let e=0;e<t;e++)r.push(u(n).id);return{id:crypto.randomUUID(),basePrice:f(3e3),dateFrom:i,dateTo:s,destination:u(D),isFavorite:!!f(2),offers:r,type:e}}const O=[{id:"b8bbe9a6-9fde-4713-930b-8105ed8decbb",description:"Barcelona - with a beautiful old town",name:"Barcelona",pictures:[{src:"https://20.objects.pages.academy/static/destinations/1.jpg",description:"Barcelona with a beautiful old town"},{src:"https://20.objects.pages.academy/static/destinations/19.jpg",description:"Barcelona a true asian pearl"},{src:"https://20.objects.pages.academy/static/destinations/10.jpg",description:"Barcelona with an embankment of a mighty river as a centre of attraction"}]},{id:"0ac9df44-6b6d-4233-8d29-3e227a3e470f",description:"Moscow - with crowded streets",name:"Moscow",pictures:[{src:"https://20.objects.pages.academy/static/destinations/18.jpg",description:"Moscow is a beautiful city"},{src:"https://20.objects.pages.academy/static/destinations/3.jpg",description:"Moscow with a beautiful old town"},{src:"https://20.objects.pages.academy/static/destinations/11.jpg",description:"Moscow a true asian pearl"},{src:"https://20.objects.pages.academy/static/destinations/3.jpg",description:"Moscow full of of cozy canteens where you can try the best coffee in the Middle East"},{src:"https://20.objects.pages.academy/static/destinations/9.jpg",description:"Moscow is a beautiful city"}]},{id:"115c1f07-f50e-4811-8b30-6e386023d457",description:"Helsinki - a perfect place to stay with a family",name:"Helsinki",pictures:[{src:"https://20.objects.pages.academy/static/destinations/18.jpg",description:"Helsinki with crowded streets"}]},{id:"1ad0d08f-7172-4c3b-9fa1-5da21ea95bb2",description:"Geneva - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Geneva",pictures:[{src:"https://20.objects.pages.academy/static/destinations/5.jpg",description:"Geneva middle-eastern paradise"}]},{id:"8e1901ba-1e26-43fa-b740-95a8286ce345",description:"Vien - middle-eastern paradise",name:"Vien",pictures:[]}];function T(t){return t?O.find((e=>e.id===t)):O}const E=document.querySelector(".page-body"),k=E.querySelector(".trip-controls__filters"),C=E.querySelector(".trip-main"),Y=E.querySelector(".trip-events");i(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n            <div class="trip-info__main">\n              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n            </div>\n\n            <p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>\n          </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},C,t.AFTERBEGIN),i(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n                <div class="trip-filters__filter">\n                  <input\n                    id="filter-everything"\n                    class="trip-filters__filter-input  visually-hidden"\n                    type="radio"\n                    name="trip-filter"\n                    value="everything"\n                    checked\n                   >\n                  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input\n                    id="filter-future"\n                    class="trip-filters__filter-input  visually-hidden"\n                    type="radio"\n                    name="trip-filter"\n                    value="future"\n                   >\n                  <label\n                    class="trip-filters__filter-label"\n                    for="filter-future"\n                  >Future\n                  </label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input\n                    id="filter-present"\n                    class="trip-filters__filter-input  visually-hidden"\n                    type="radio"\n                    name="trip-filter"\n                    value="present"\n                   >\n                  <label class="trip-filters__filter-label" for="filter-present">Present</label>\n                </div>\n\n                <div class="trip-filters__filter">\n                  <input\n                    id="filter-past"\n                    class="trip-filters__filter-input  visually-hidden"\n                    type="radio"\n                    name="trip-filter"\n                    value="past"\n                  >\n                  <label class="trip-filters__filter-label" for="filter-past">Past</label>\n                </div>\n\n                <button class="visually-hidden" type="submit">Accept filter</button>\n              </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},k);const H=new class{_dataPoints=function(){return Array.from({length:15},S)}();getOrganizationDataPoints(t){const e=[];return t.forEach((t=>{const n={id:t.id,dateFrom:t.dateFrom,dateTo:t.dateTo,basePrice:t.basePrice,destination:T(t.destination),isFavorite:t.isFavorite,offers:t.offers,allOffersThisType:w(t.type).offers,type:t.type};e.push(n)})),e}getPoints(){return this.getOrganizationDataPoints(this._dataPoints)}},j=new class{destinations=T();getAllDestinations(){return this.destinations}},P=new class{listComponent=new y;sortComponent=new s;constructor(t){let{listContainer:e,pointsModel:n,destinationsModel:i}=t;this.listContainer=e,this.pointsModel=n,this.destinationsModel=i}init(){this.listPoints=this.pointsModel.getPoints(),this.allDestinations=this.destinationsModel.getAllDestinations(),i(this.sortComponent,this.listContainer),i(this.listComponent,this.listContainer),i(new g({point:this.listPoints[0]},this.allDestinations),this.listComponent.getElement());for(let t=1;t<this.listPoints.length;t++)i(new b({point:this.listPoints[t]}),this.listComponent.getElement())}}({listContainer:Y,pointsModel:H,destinationsModel:j});P.init()})()})();
//# sourceMappingURL=bundle.31f9c466835e0a370def.js.map