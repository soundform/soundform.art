import * as THREE from "three";
import { Mesh, OrthographicCamera, BufferGeometry, Float32BufferAttribute, Loader, FileLoader, Quaternion, Vector3, Color, Matrix4 } from "three";
const _camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
class FullscreenTriangleGeometry extends BufferGeometry {
  constructor() {
    super();
    this.setAttribute("position", new Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3));
    this.setAttribute("uv", new Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
  }
}
const _geometry = new FullscreenTriangleGeometry();
class FullScreenQuad {
  constructor(material) {
    this._mesh = new Mesh(_geometry, material);
  }
  dispose() {
    this._mesh.geometry.dispose();
  }
  render(renderer) {
    renderer.render(this._mesh, _camera);
  }
  get material() {
    return this._mesh.material;
  }
  set material(value) {
    this._mesh.material = value;
  }
}
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b.b;
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
  var x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
  flt[i] = 8;
for (var i = 144; i < 256; ++i)
  flt[i] = 9;
for (var i = 256; i < 280; ++i)
  flt[i] = 7;
for (var i = 280; i < 288; ++i)
  flt[i] = 8;
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
  fdt[i] = 5;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max$1 = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max$1(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max$1(lt);
        dbt = max$1(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add2 = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add2 = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add2;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var b2 = function(d, b) {
  return d[b] | d[b + 1] << 8;
};
var b4 = function(d, b) {
  return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b8 = function(d, b) {
  return b4(d, b) + b4(d, b + 4) * 4294967296;
};
var gzs = function(d) {
  if (d[0] != 31 || d[1] != 139 || d[2] != 8)
    err(6, "invalid gzip data");
  var flg = d[3];
  var st = 10;
  if (flg & 4)
    st += (d[10] | d[11] << 8) + 2;
  for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
    ;
  return st + (flg & 2);
};
var Inflate = /* @__PURE__ */ function() {
  function Inflate2(opts, cb) {
    if (typeof opts == "function")
      cb = opts, opts = {};
    this.ondata = cb;
    var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);
    this.s = { i: 0, b: dict ? dict.length : 0 };
    this.o = new u8(32768);
    this.p = new u8(0);
    if (dict)
      this.o.set(dict);
  }
  Inflate2.prototype.e = function(c) {
    if (!this.ondata)
      err(5);
    if (this.d)
      err(4);
    if (!this.p.length)
      this.p = c;
    else if (c.length) {
      var n = new u8(this.p.length + c.length);
      n.set(this.p), n.set(c, this.p.length), this.p = n;
    }
  };
  Inflate2.prototype.c = function(final) {
    this.s.i = +(this.d = final || false);
    var bts = this.s.b;
    var dt = inflt(this.p, this.s, this.o);
    this.ondata(slc(dt, bts, this.s.b), this.d);
    this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
    this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
  };
  Inflate2.prototype.push = function(chunk, final) {
    this.e(chunk), this.c(final);
  };
  return Inflate2;
}();
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
var Gunzip = /* @__PURE__ */ function() {
  function Gunzip2(opts, cb) {
    this.v = 1;
    this.r = 0;
    Inflate.call(this, opts, cb);
  }
  Gunzip2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    this.r += chunk.length;
    if (this.v) {
      var p = this.p.subarray(this.v - 1);
      var s = p.length > 3 ? gzs(p) : 4;
      if (s > p.length) {
        if (!final)
          return;
      } else if (this.v > 1 && this.onmember) {
        this.onmember(this.r - p.length);
      }
      this.p = p.subarray(s), this.v = 0;
    }
    Inflate.prototype.c.call(this, final);
    if (this.s.f && !this.s.l && !final) {
      this.v = shft(this.s.p) + 9;
      this.s = { i: 0 };
      this.o = new u8(0);
      this.push(new u8(0), final);
    }
  };
  return Gunzip2;
}();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
var dutf8 = function(d) {
  for (var r = "", i = 0; ; ) {
    var c = d[i++];
    var eb = (c > 127) + (c > 223) + (c > 239);
    if (i + eb > d.length)
      return { s: r, r: slc(d, i - 1) };
    if (!eb)
      r += String.fromCharCode(c);
    else if (eb == 3) {
      c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
    } else if (eb & 1)
      r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
    else
      r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
  }
};
function strFromU8(dat, latin1) {
  if (latin1) {
    var r = "";
    for (var i = 0; i < dat.length; i += 16384)
      r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r;
  } else if (td) {
    return td.decode(dat);
  } else {
    var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
    if (r.length)
      err(8);
    return s;
  }
}
var slzh = function(d, b) {
  return b + 30 + b2(d, b + 26) + b2(d, b + 28);
};
var zh = function(d, b, z) {
  var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
  var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
  return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
var z64e = function(d, b) {
  for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
    ;
  return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
function unzipSync(data, opts) {
  var files = {};
  var e = data.length - 22;
  for (; b4(data, e) != 101010256; --e) {
    if (!e || data.length - e > 65558)
      err(13);
  }
  var c = b2(data, e + 8);
  if (!c)
    return {};
  var o = b4(data, e + 16);
  var z = o == 4294967295 || c == 65535;
  if (z) {
    var ze = b4(data, e - 12);
    z = b4(data, ze) == 101075792;
    if (z) {
      c = b4(data, ze + 32);
      o = b4(data, ze + 48);
    }
  }
  var fltr = opts && opts.filter;
  for (var i = 0; i < c; ++i) {
    var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
    o = no;
    if (!fltr || fltr({
      name: fn,
      size: sc,
      originalSize: su,
      compression: c_2
    })) {
      if (!c_2)
        files[fn] = slc(data, b, b + sc);
      else if (c_2 == 8)
        files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });
      else
        err(14, "unknown compression type " + c_2);
    }
  }
  return files;
}
let wasm;
const cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}
let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
function raycast_splats(origin_x, origin_y, origin_z, dir_x, dir_y, dir_z, near, far, num_splats, packed_splats, raycast_ellipsoid) {
  const ret = wasm.raycast_splats(origin_x, origin_y, origin_z, dir_x, dir_y, dir_z, near, far, num_splats, packed_splats, raycast_ellipsoid);
  return ret;
}
async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
    const ret = arg0.buffer;
    return ret;
  };
  imports.wbg.__wbg_length_3b4f022188ae8db6 = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_length_6ca527665d89694d = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_length_8cfd2c6409af88ad = function(arg0) {
    const ret = arg0.length;
    return ret;
  };
  imports.wbg.__wbg_new_9fee97a409b32b68 = function(arg0) {
    const ret = new Uint16Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_new_e3b321dcfef89fc7 = function(arg0) {
    const ret = new Uint32Array(arg0);
    return ret;
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354 = function(arg0, arg1, arg2) {
    const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212 = function(arg0, arg1, arg2) {
    const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_newwithlength_5a5efe313cfd59f1 = function(arg0) {
    const ret = new Float32Array(arg0 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_set_10bad9bee0e9c58b = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbg_set_d23661d19148b229 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbg_set_f4f1f0daa30696fc = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
  };
  imports.wbg.__wbg_subarray_3aaeec89bb2544f0 = function(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbg_subarray_769e1e0f81bb259b = function(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
  };
  imports.wbg.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_0;
    const offset = table.grow(4);
    table.set(0, void 0);
    table.set(offset + 0, void 0);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  return imports;
}
function __wbg_finalize_init(instance, module) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedUint8ArrayMemory0 = null;
  wasm.__wbindgen_start();
  return wasm;
}
async function __wbg_init(module_or_path) {
  if (wasm !== void 0) return wasm;
  if (typeof module_or_path !== "undefined") {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (typeof module_or_path === "undefined") {
    module_or_path = new URL("data:application/wasm;base64,AGFzbQEAAAAB9wEkYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAF/AX9gAX8AYAV/f39/fwBgA29/fwFvYAV/f39/fwF/YAR/f39/AGABbwFvYANvb38AYAFvAX9gAAF/YAAAYAd/f39/f39/AX9gAX0BfWAGf39/f39/AGAEf39/fwF/YAF/AW9gAAFvYAd/f39/f39/AGACf34Bf2ADf35+AGACf34AYAt9fX19fX19fX9vfwFvYAZ/f39/f38Bf2AFf399f38AYAR/fX9/AGAFf39+f38AYAR/fn9/AGAFf398f38AYAR/fH9/AGADf35+AX9gA39vbwF/YAJ9fQF9AvIEEQN3YmcdX193YmdfYnVmZmVyXzYwOWNjM2VlZTUxZWQxNTgACgN3YmcaX193YmdfbmV3XzlmZWU5N2E0MDliMzJiNjgACgN3YmcaX193Ymdfc2V0X2Y0ZjFmMGRhYTMwNjk2ZmMACwN3YmcdX193YmdfbGVuZ3RoXzhjZmQyYzY0MDlhZjg4YWQADAN3YmcxX193YmdfbmV3d2l0aGJ5dGVvZmZzZXRhbmRsZW5ndGhfZjFkZWFkNDRkMWZjNzIxMgAHA3diZxpfX3diZ19uZXdfZTNiMzIxZGNmZWY4OWZjNwAKA3diZxpfX3diZ19zZXRfZDIzNjYxZDE5MTQ4YjIyOQALA3diZx1fX3diZ19sZW5ndGhfNmNhNTI3NjY1ZDg5Njk0ZAAMA3diZzFfX3diZ19uZXd3aXRoYnl0ZW9mZnNldGFuZGxlbmd0aF9lNmI3ZTY5YWNkNGM3MzU0AAcDd2JnGl9fd2JnX3NldF8xMGJhZDliZWUwZTljNThiAAsDd2JnHV9fd2JnX2xlbmd0aF8zYjRmMDIyMTg4YWU4ZGI2AAwDd2JnH19fd2JnX3N1YmFycmF5Xzc2OWUxZTBmODFiYjI1OWIABwN3YmcfX193Ymdfc3ViYXJyYXlfM2FhZWVjODliYjI1NDRmMAAHA3diZyRfX3diZ19uZXd3aXRobGVuZ3RoXzVhNWVmZTMxM2NmZDU5ZjEAEwN3YmcQX193YmluZGdlbl90aHJvdwACA3diZxFfX3diaW5kZ2VuX21lbW9yeQAUA3diZx9fX3diaW5kZ2VuX2luaXRfZXh0ZXJucmVmX3RhYmxlAA4DvAG6AQQAAAYABAQE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QCADQQFxDQAgA0ECcUUNASABKAIAIgMgAGohACABIANrIgFB0NrAACgCAEYEQCACKAIEQQNxQQNHDQFByNrAACAANgIAIAIgAigCBEF+cTYCBCABIABBAXI2AgQgAiAANgIADwsgASADEDkLAkACQAJAAkACQCACKAIEIgNBAnFFBEAgAkHU2sAAKAIARg0CIAJB0NrAACgCAEYNAyACIANBeHEiAhA5IAEgACACaiIAQQFyNgIEIAAgAWogADYCACABQdDawAAoAgBHDQFByNrAACAANgIADwsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQIgASAAEEFBACEBQejawABB6NrAACgCAEEBayIANgIAIAANBEGw2MAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQejawABB/x8gASABQf8fTRs2AgAPC0HU2sAAIAE2AgBBzNrAAEHM2sAAKAIAIABqIgA2AgAgASAAQQFyNgIEQdDawAAoAgAgAUYEQEHI2sAAQQA2AgBB0NrAAEEANgIACyAAQeDawAAoAgAiA00NA0HU2sAAKAIAIgJFDQNBACEAQczawAAoAgAiBEEpSQ0CQajYwAAhAQNAIAIgASgCACIFTwRAIAIgBSABKAIEakkNBAsgASgCCCEBDAALAAtB0NrAACABNgIAQcjawABByNrAACgCACAAaiIANgIAIAEgAEEBcjYCBCAAIAFqIAA2AgAPCyAAQfgBcUG42MAAaiECAn9BwNrAACgCACIDQQEgAEEDdnQiAHFFBEBBwNrAACAAIANyNgIAIAIMAQsgAigCCAshACACIAE2AgggACABNgIMIAEgAjYCDCABIAA2AggPC0Gw2MAAKAIAIgEEQANAIABBAWohACABKAIIIgENAAsLQejawABB/x8gACAAQf8fTRs2AgAgAyAETw0AQeDawABBfzYCAAsL6QQBBX8CfwJAIAJBAk8EQCABKAIEIgRB//8BcUUEQCAEQRB0DAMLIARB/wdxIQUgBEGAgAJxIQMgBEGA+AFxIgZBgPgBRgRAIANBEHQhAyADQYCAgPwHciAFRQ0DGiADIAVBDXRyQYCAgP4HcgwDCyADQRB0IQMgBkUNASAGQQ10QYCAgPwAcSAFQQ10ckGAgIDAA2ogA3IMAgtBAUEBQfSEwAAQ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CCACQQxqIAEQkwEhAwsgAkEQaiQAIAMLhgIBA38jAEGAAWsiBCQAIAAoAgAhAAJ/AkAgASgCCCICQYCAgBBxRQRAIAJBgICAIHENASAAKAIAIAEQOAwCCyAAKAIAIQBBACECA0AgAiAEakH/AGogAEEPcSIDQTByIANB1wBqIANBCkkbOgAAIAJBAWshAiAAQQ9LIABBBHYhAA0ACyABQfu+wABBAiACIARqQYABakEAIAJrECEMAQsgACgCACEAQQAhAgNAIAIgBGpB/wBqIABBD3EiA0EwciADQTdqIANBCkkbOgAAIAJBAWshAiAAQQ9LIABBBHYhAA0ACyABQfu+wABBAiACIARqQYABakEAIAJrECELIARBgAFqJAALygECBH8BfiMAQSBrIgMkAAJAAkAgASABIAJqIgJLDQBBCCACIAAoAgAiAUEBdCIEIAIgBEsbIgIgAkEITRsiBK0iB0IgiFBFDQAgB6ciBUH/////B0sNACADIAEEfyADIAE2AhwgAyAAKAIENgIUQQEFQQALNgIYIANBCGpBASAFIANBFGoQXCADKAIIQQFHDQEgAygCECECIAMoAgwhBgsgBiACQaCOwAAQjAEACyADKAIMIQEgACAENgIAIAAgATYCBCADQSBqJAALiQIBAX8jAEEQayICJAAgACgCACEAAn8gAS0AC0EYcUUEQCABKAIAIAAgASgCBCgCEBEAAAwBCyACQQA2AgwgASACQQxqAn8gAEGAAU8EQCAAQYAQTwRAIABBgIAETwRAIAIgAEE/cUGAAXI6AA8gAiAAQRJ2QfABcjoADCACIABBBnZBP3FBgAFyOgAOIAIgAEEMdkE/cUGAAXI6AA1BBAwDCyACIABBP3FBgAFyOgAOIAIgAEEMdkHgAXI6AAwgAiAAQQZ2QT9xQYABcjoADUEDDAILIAIgAEE/cUGAAXI6AA0gAiAAQQZ2QcABcjoADEECDAELIAIgADoADEEBCxAmCyACQRBqJAALqgICA38BfiMAQUBqIgIkACABKAIAQYCAgIB4RgRAIAEoAgwhAyACQSRqIgRBADYCACACQoCAgIAQNwIcIAJBMGogAygCACIDQQhqKQIANwMAIAJBOGogA0EQaikCADcDACACIAMpAgA3AyggAkEcakHsmMAAIAJBKGoQKhogAkEYaiAEKAIAIgM2AgAg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AEEQayICJAAgAkEIaiABEHYgAiACKAIIIAIoAgwoAhgRAgAgAigCBCEBIAAgAigCADYCACAAIAE2AgQgAkEQaiQAC08BAn9BhdfAAC0AABogASgCBCECIAEoAgAhA0EIQQQQnwEiAUUEQEEEQQgQwQEACyABIAI2AgQgASADNgIAIABBpJ7AADYCBCAAIAE2AgALQQEBfyMAQSBrIgMkACADQQA2AhAgA0EBNgIEIANCBDcCCCADIAE2AhwgAyAANgIYIAMgA0EYajYCACADIAIQfgALPQECfyAAIAAoAgQiAyACazYCBCAAIAAoAgAgAiADS3IiBDYCAEEBIQMgBAR/IAMFIAAoAgggASACEJMBCws+AQF/IwBBEGsiAiQAIAJBCGogASABKAIAKAIEEQIAIAIoAgwhASAAIAIoAgg2AgAgACABNgIEIAJBEGokAAuuAwEDfyAAKAIAIQIgASgCCCIAQYCAgBBxRQRAIABBgICAIHFFBEAjAEEQayIAJABBAyEDIAItAAAiAiEEIAJBCk8EQCAAIAIgAkHkAG4iBEHkAGxrQf8BcUEBdCIDQf6+wABqLQAAOgAPIAAgA0H9vsAAai0AADoADkEBIQMLQQAgAiAEG0UEQCADQQFrIgMgAEENamogBEEBdEH+AXFB/r7AAGotAAA6AAALIAFBAUEAIABBDWogA2pBAyADaxAhIABBEGokAA8LIwBBgAFrIgQkACACLQAAIQBBACECA0AgAiAEakH/AGogAEEPcSIDQTByIANBN2ogA0EKSRs6AAAgAkEBayECIAAiA0EEdiEAIANBD0sNAAsgAUH7vsAAQQIgAiAEakGAAWpBACACaxAhIARBgAFqJAAPCyMAQYABayIEJAAgAi0AACEAQQAhAgNAIAIgBGpB/wBqIABBD3EiA0EwciADQdcAaiADQQpJGzoAACACQQFrIQIgACIDQQR2IQAgA0EPSw0ACyABQfu+wABBAiACIARqQYABakEAIAJrECEgBEGAAWokAAs4AAJAIAJBgIDEAEYNACAAIAIgASgCEBEAAEUNAEEBDwsgA0UEQEEADwsgACADIAQgASgCDBEBAAs8AQF/IwBBEGsiAiQAIAJB6KDAADYCDCACIAA2AgggAkEIakGcl8AAIAJBDGpBnJfAACABQbCcwAAQPQALpQQBBn8jAEEQayIG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DJQgEiAOIA6UIBUgFZSSIA0gDZSSIBAgEZIgC5JDAABAQJUiCyALlJOUkyILQwAAAABdDQAgDIwgC5GTIBKVIgsgBmBFIAcgC2BFcg0AICgoAggiIyAoKAIARgRAIChB1ITAABBUCyAoKAIEICNBAnRqIAs4AgAgKCAjQQFqNgIICyAKIClBAnRqIQogJCApayIkDQALCyAnQRBqJAAgIigCFCIKQYQBTwRAIAoQVwsgJiIkICpJDQALCyAiKAIQISQgKygCAEEBags2AgAgJBANIQkQWCIIIAkmASAiIAg2AiQgIigCDCEmICIoAhAhIyMAQSBrIiUkACAlICJBJGooAgAiJCUBEAoiCjYCACAlICM2AgQCQCAKICNGBEAQlwEiKhCPASIKJQEgJiAjEAghCRBYIiYgCSYBICpBhAFPBEAgKhBXCyAKQYQBTwRAIAoQVwsgJCUBICYlAUEAEAkgJkGEAU8EQCAmEFcLICVBIGokAAwBCyAlQQA2AgggJSAlQQRqICVBCGoQewALICIoAggiCgRAICIoAgwgCkECdEEEEKkBCyAiKAIEIgpBhAFPBEAgChBXCyAiQTBqJAAgCAwCCxBuAAsgJCAsQbiJwAAQrAEACyIIJQEgCBBXC/oBAgJ/AX4jAEEQayICJAAgAkEBOwEMIAIgATYCCCACIAA2AgQjAEEQayIBJAAgAkEEaiIAKQIAIQQgASAANgIMIAEgBDcCBCMAQRBrIgAkACABQQRqIgEoAgAiAigCDCEDAkACQAJAAkAgAigCBA4CAAECCyADDQFBASECQQAhAwwCCyADDQAgAigCACICKAIEIQMgAigCACECDAELIABBgICAgHg2AgAgACABNgIMIABB0J7AACABKAIEIAEoAggiAC0ACCAALQAJEFEACyAAIAM2AgQgACACNgIAIABBtJ7AACABKAIEIAEoAggiAC0ACCAALQAJEFEACyUAIABFBEBBoJXAAEEyELYBAAsgACACIAMgBCAFIAEoAhARCAALKAAgASAAKAIALQAAQQJ0IgBB3K/AAGooAgAgAEHIr8AAaigCABCTAQsjACAARQRAQaCVwABBMhC2AQALIAAgAiADIAQgASgCEBEJAAsjACAARQRAQaCVwABBMhC2AQALIAAgAiADIAQgASgCEBEcAAsjACAARQRAQaCVwABBMhC2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OCAFQTBqIAQQfgALFAIBbwF/EA8hABBYIgEgACYBIAELEwAgAEEoNgIEIABBgIDAADYCAAsTACAAQdSBwAA2AgQgACABNgIACxMAIABBKDYCBCAAQYSGwAA2AgALIQAgAELUnP3HsryhmMUANwMIIABClLiFgpHLl7R0NwMACyAAIABC7Lz5lKyqlJNxNwMIIABC+enA7KyX2tdONwMACxAAIAAoAgQgACgCCCABEBwLEQAgACgCBCAAKAIIIAEQwwELGQACfyABQQlPBEAgASAAEDUMAQsgABARCwsiACAAQu26rbbNhdT14wA3AwggAEL4gpm9le7Gxbl/NwMACyEAIABCgLzfhaul+JsnNwMIIABCn/WWlNbu7cOhfzcDAAsRACAAKAIAIAAoAgQgARDDAQsTACAAQaSewAA2AgQgACABNgIACxEAIAEgACgCACAAKAIEEJMBCxAAIAAoAgAgACgCBCABEBwLEAAgASAAKAIAIAAoAgQQJgsQACABKAIAIAEoAgQgABAqCw4AIAAlASABJQEgAhAGC18BAX8CQAJAIABBBGsoAgAiAkF4cSIDQQRBCCACQQNxIgIbIAFqTwRAIAJBACADIAFBJ2pLGw0BIAAQJAwCC0GtmcAAQS5B3JnAABB0AAtB7JnAAEEuQZyawAAQdAALCx0BAW8gACgCACUBIAEgAhAMIQMQWCIAIAMmASAAC2oBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQQI2AgwgA0Gc1MAANgIIIANCAjcCFCADIANBBGqtQoCAgICAA4Q3AyggAyADrUKAgICAgAOENwMgIAMgA0EgajYCECADQQhqIAIQfgALagEBfyMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQbzUwAA2AgggA0ICNwIUIAMgA0EEaq1CgICAgIADhDcDKCADIAOtQoCAgICAA4Q3AyAgAyADQSBqNgIQIANBCGogAhB+AAtqAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0ECNgIMIANB8NTAADYCCCADQgI3AhQgAyADQQRqrUKAgICAgAOENwMoIAMgA61CgICAgIADhDcDICADIANBIGo2AhAgA0EIaiACEH4ACwsAIAAoAgAgARA4Cw4AQa28wABBKyAAEHQAC+8CAgV/A34gACkDACEJIwBBIGsiAyQAQRQhACAJIgdC6AdaBEAgByEIA0AgA0EMaiAAaiICQQNrIAggCEKQzgCAIgdCkM4Afn2nIgRB//8DcUHkAG4iBUEBdCIGQf6+wABqLQAAOgAAIAJBBGsgBkH9vsAAai0AADoAACACQQFrIAQgBUHkAGxrQf//A3FBAXQiBEH+vsAAai0AADoAACACQQJrIARB/b7AAGotAAA6AAAgAEEEayEAIAhC/6ziBFYgByEIDQALCyAHQglWBEAgACADakELaiAHpyICIAJB//8DcUHkAG4iAkHkAGxrQf//A3FBAXQiBEH+vsAAai0AADoAACAAQQJrIgAgA0EMamogBEH9vsAAai0AADoAACACrSEHCyAJUEUgB1BxRQRAIABBAWsiACADQQxqaiAHp0EBdEEecUH+vsAAai0AADoAAAsgAUEBQQAgA0EMaiAAakEUIABrECEgA0EgaiQACw0AIABBpIrAACABECoLDQAgAEGwjsAAIAEQKgsKACAAIAEgAhAqCw4AIAFBhJDAAEEFEJMBC8IDAgZ/AX4gACgCACEAIwBB0ABrIgIkACACQSBqIAAgACgCACgCBBECACACIAJByABqrUKAgICAwASENwMoQQEhAyACQQE2AjQgAkH4kcAANgIwIAJCATcCPCACIAIpAyA3AkggAiACQShqNgI4AkAgASgCACIGIAEoAgQiByACQTBqECoNACABLQAKQYABcUUEQEEAIQMMAQsgAkEYaiAAIAAoAgAoAgQRAgAgAkEQaiACKAIYIAIoAhwoAhgRAgAgAigCECIERQRAQQAhAwwBCyACQQhqIAQgAigCFCIFKAIYEQIAIAIoAgwhASACKAIIIQAgAiAFNgIsIAIgBDYCKCACQQE2AjQgAkGEksAANgIwIAJCATcCPCACIAJBKGqtQoCAgIDABIQiCDcDSCACIAJByABqNgI4IAYgByACQTBqELMBDQADQCAARQRAQQAhAwwCCyACIAAgASgCGBECACACKAIEIAIoAgAgAiABNgIsIAIgADYCKCACQQE2AjQgAkGEksAANgIwIAJCATcCPCACIAg3A0ggAiACQcgAajYCOCEAIQEgBiAHIAJBMGoQswFFDQALCyACQdAAaiQAIAMLCQAgACABEA4ACykAAn8gACgCAC0AAEUEQCABQeDAwABBBRAmDAEL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AAAANQAAABUAAACkARAAHQAAACYAAAAUAAAAc3BhcmstaW50ZXJuYWwtcnMvc3JjL3JheWNhc3QucnM0AhAAIAAAADUAAAAXAAAANAIQACAAAACCAAAAFwAAADQCEAAgAAAAiAAAABwAAAA0AhAAIAAAAIoAAAAcAAAANAIQACAAAACPAAAAIAAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMApAIQAE8AAAAUAgAAJgAAAGRlc2NyaXB0aW9uKCkgaXMgZGVwcmVjYXRlZDsgdXNlIERpc3BsYXkaAAAADAAAAAQAAAACAAAAGgAAAAwAAAAEAAAAAwAAAAIAAAAsAxAABwAAAAUAAAAbAAAABwAAABwAAABpbnRlcm5hbCBlcnJvcjogZW50ZXJlZCB1bnJlYWNoYWJsZSBjb2RlOiBpbnZhbGlkIE9uY2Ugc3RhdGVoAxAAPAAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvc3RkL3NyYy9zeXMvc3luYy9vbmNlL25vX3RocmVhZHMucnMArAMQAFsAAAA1AAAAEgAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAAAYBBAASgAAAL4BAAAdAAAAc3BhcmstaW50ZXJuYWwtcnMvc3JjL2xpYi5yc3QEEAAcAAAAHAAAADMAAAB0BBAAHAAAACcAAAAtAAAAAQAAAAAAAAB0BBAAHAAAAD8AAAAoAAAAL3J1c3RjLzE3MDY3ZTlhYzZkN2VjYjcwZTUwZjkyYzE5NDRlNTQ1MTg4ZDIzNTkvbGlicmFyeS9hbGxvYy9zcmMvdmVjL21vZC5yc8gEEABMAAAAVgoAACQAAAAAAAAAEAAAAAQAAAAdAAAAHgAAAB8AAAAgICAgOiAAAAEAAAAAAAAAQAUQAAIAAAAgICAgICAgL3J1c3RjLzE3MDY3ZTlhYzZkN2VjYjcwZTUwZjkyYzE5NDRlNTQ1MTg4ZDIzNTkvbGlicmFyeS9jb3JlL3NyYy9wdHIvbW9kLnJzAABbBRAASwAAAAsCAAABAAAAL3J1c3RjLzE3MDY3ZTlhYzZkN2VjYjcwZTUwZjkyYzE5NDRlNTQ1MTg4ZDIzNTkvbGlicmFyeS9jb3JlL3NyYy9zbGljZS9pbmRleC5ycwC4BRAATwAAAEwDAAA0AAAAuAUQAE8AAABTAwAAMgAAAGFzc2VydGlvbiBmYWlsZWQ6IHNlbGYuaXNfY2hhcl9ib3VuZGFyeShuKS9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwAAAFIGEABLAAAA7QcAAB0AAABSBhAASwAAAPUHAAAdAAAAUgYQAEsAAAB9BQAAGwAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMvbW9kLnJz0AYQAFAAAAAuAgAAEQAAACAAAAAMAAAABAAAACEAAAAiAAAAIwAAACYAAAAMAAAABAAAACcAAAAoAAAAIwBB6I7AAAvBGQEAAAApAAAAYSBEaXNwbGF5IGltcGxlbWVudGF0aW9uIHJldHVybmVkIGFuIGVycm9yIHVuZXhwZWN0ZWRseS9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwAApwcQAEsAAADRCgAADgAAAEVycm9yAAAApwcQAEsAAAB9BQAAGwAAAGFzc2VydGlvbiBmYWlsZWQ6IHNlbGYuaXNfY2hhcl9ib3VuZGFyeShuZXdfbGVuKacHEABLAAAAsgUAAA0AAAAAAAAAEAAAAAQAAAAdAAAAHgAAAB8AAABiYWNrdHJhY2UgY2FwdHVyZSBmYWlsZWQvaG9tZS91c2VyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2YvYW55aG93LTEuMC45OC9zcmMvZXJyb3IucnMAAIwIEABaAAAAZwQAAA4AAAABAAAAAAAAADogAAAACRAAAgAAAAoKQ2F1c2VkIGJ5OgoAAAAYCRAAAQAAAAoKc3RhY2sgYmFja3RyYWNlOlN0YWNrIGJhY2t0cmFjZToKADYJEAARAAAAUy9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvY29yZS9zcmMvaXRlci90cmFpdHMvaXRlcmF0b3IucnMAAABRCRAAWAAAAMEHAAAJAAAAL2hvbWUvdXNlci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2pzLXN5cy0wLjMuNzcvc3JjL2xpYi5yc7wJEABYAAAA+xgAAAEAAAAvaG9tZS91c2VyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvd2FzbS1iaW5kZ2VuLTAuMi4xMDAvc3JjL2NvbnZlcnQvc2xpY2VzLnJzAAAkChAAagAAACQBAAAOAAAAY2xvc3VyZSBpbnZva2VkIHJlY3Vyc2l2ZWx5IG9yIGFmdGVyIGJlaW5nIGRyb3BwZWRMYXp5IGluc3RhbmNlIGhhcyBwcmV2aW91c2x5IGJlZW4gcG9pc29uZWTSChAAKgAAAC9ob21lL3VzZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9vbmNlX2NlbGwtMS4yMS4zL3NyYy9saWIucnMABAsQAFsAAAAIAwAAGQAAAHJlZW50cmFudCBpbml0AABwCxAADgAAAAQLEABbAAAAegIAAA0AAAA6IAAAAAAAAAQAAAAEAAAAOwAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwCsCxAASwAAAH0FAAAbAAAAL3J1c3RjLzE3MDY3ZTlhYzZkN2VjYjcwZTUwZjkyYzE5NDRlNTQ1MTg4ZDIzNTkvbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy9tb2QucnMIDBAAUAAAAC4CAAARAAAAOgAAADwAAAAMAAAABAAAAD0AAAA+AAAAPwAAAC9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjcvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACEDBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAhAwQACkAAACuBAAADQAAAGxpYnJhcnkvc3RkL3NyYy9iYWNrdHJhY2UucnNvcGVyYXRpb24gbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtSA0QACgAAAAkAAAAAAAAAAIAAABwDRAAdW5zdXBwb3J0ZWQgYmFja3RyYWNlZGlzYWJsZWQgYmFja3RyYWNlACwNEAAcAAAAigEAAB0AAABAAAAAEAAAAAQAAABBAAAAQgAAAAEAAAAAAAAAY2Fubm90IHJlY3Vyc2l2ZWx5IGFjcXVpcmUgbXV0ZXjcDRAAIAAAAGxpYnJhcnkvc3RkL3NyYy9zeXMvc3luYy9tdXRleC9ub190aHJlYWRzLnJzBA4QACwAAAATAAAACQAAAGxpYnJhcnkvc3RkL3NyYy9zeW5jL3BvaXNvbi9vbmNlLnJzAEAOEAAjAAAAmwAAADIAAABsaWJyYXJ5L3N0ZC9zcmMvc3luYy9sYXp5X2xvY2sucnMAAAB0DhAAIQAAANEAAAATAAAAPHVua25vd24+77+9bWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAAAtA4QABUAAADJDhAADQAAAGxpYnJhcnkvc3RkL3NyYy9hbGxvYy5yc+gOEAAYAAAAZAEAAAkAAAAKAAAAPAAAAAwAAAAEAAAAQwAAAAAAAAAIAAAABAAAAEQAAAAAAAAACAAAAAQAAABFAAAARgAAAEcAAABIAAAASQAAABAAAAAEAAAASgAAAEsAAABMAAAATQAAAGxpYnJhcnkvc3RkL3NyYy8uLi8uLi9iYWNrdHJhY2Uvc3JjL3N5bWJvbGl6ZS9tb2QucnNsDxAANAAAAGcBAAAwAAAAAQAAAAAAAACYCxAAAgAAACAtIAABAAAAAAAAAMAPEAADAAAAICAgICAgICAgICAgICAgICAgIGF0IAAAaAwQAAEAAABPbmNlIGluc3RhbmNlIGhhcyBwcmV2aW91c2x5IGJlZW4gcG9pc29uZWQAAPQPEAAqAAAAb25l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", import.meta.url);
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  const { instance, module } = await __wbg_load(await module_or_path, imports);
  return __wbg_finalize_init(instance, module);
}
const LN_SCALE_MIN = -12;
const LN_SCALE_MAX = 9;
const LN_RESCALE = (LN_SCALE_MAX - LN_SCALE_MIN) / 254;
const LN_SCALE_ZERO = -30;
const SCALE_ZERO = Math.exp(LN_SCALE_ZERO);
const SPLAT_TEX_WIDTH_BITS = 11;
const SPLAT_TEX_HEIGHT_BITS = 11;
const SPLAT_TEX_WIDTH = 1 << SPLAT_TEX_WIDTH_BITS;
const SPLAT_TEX_HEIGHT = 1 << SPLAT_TEX_HEIGHT_BITS;
const SPLAT_TEX_MIN_HEIGHT = 1;
function isBoolType(type) {
  return type === "bool" || type === "bvec2" || type === "bvec3" || type === "bvec4";
}
function isScalarType(type) {
  return type === "int" || type === "uint" || type === "float";
}
function isIntType(type) {
  return type === "int" || type === "ivec2" || type === "ivec3" || type === "ivec4";
}
function isUintType(type) {
  return type === "uint" || type === "uvec2" || type === "uvec3" || type === "uvec4";
}
function isFloatType(type) {
  return type === "float" || type === "vec2" || type === "vec3" || type === "vec4";
}
function isMatFloatType(type) {
  return type === "mat2" || type === "mat2x2" || type === "mat2x3" || type === "mat2x4" || type === "mat3" || type === "mat3x2" || type === "mat3x3" || type === "mat3x4" || type === "mat4" || type === "mat4x2" || type === "mat4x3" || type === "mat4x4";
}
function isAllFloatType(type) {
  return isFloatType(type) || isMatFloatType(type);
}
function isVector2Type(type) {
  return type === "vec2" || type === "ivec2" || type === "uvec2";
}
function isVector3Type(type) {
  return type === "vec3" || type === "ivec3" || type === "uvec3";
}
function isVector4Type(type) {
  return type === "vec4" || type === "ivec4" || type === "uvec4";
}
function isVectorType(type) {
  return isVector2Type(type) || isVector3Type(type) || isVector4Type(type);
}
function isMat2(type) {
  return type === "mat2" || type === "mat2x2";
}
function isMat3(type) {
  return type === "mat3" || type === "mat3x3";
}
function isMat4(type) {
  return type === "mat4" || type === "mat4x4";
}
function vectorElementType(type) {
  switch (type) {
    case "vec2":
      return "float";
    case "vec3":
      return "float";
    case "vec4":
      return "float";
    case "ivec2":
      return "int";
    case "ivec3":
      return "int";
    case "ivec4":
      return "int";
    case "uvec2":
      return "uint";
    case "uvec3":
      return "uint";
    case "uvec4":
      return "uint";
    default:
      throw new Error(`Invalid vector type: ${type}`);
  }
}
function vectorDim(type) {
  switch (type) {
    case "vec2":
    case "ivec2":
    case "uvec2":
      return 2;
    case "vec3":
    case "ivec3":
    case "uvec3":
      return 3;
    case "vec4":
    case "ivec4":
    case "uvec4":
      return 4;
    default:
      throw new Error(`Invalid vector type: ${type}`);
  }
}
function sameSizeVec(type) {
  if (isScalarType(type)) {
    return "float";
  }
  if (isVector2Type(type)) {
    return "vec2";
  }
  if (isVector3Type(type)) {
    return "vec3";
  }
  if (isVector4Type(type)) {
    return "vec4";
  }
  throw new Error(`Invalid vector type: ${type}`);
}
function sameSizeUvec(type) {
  if (isScalarType(type)) {
    return "uint";
  }
  if (isVector2Type(type)) {
    return "uvec2";
  }
  if (isVector3Type(type)) {
    return "uvec3";
  }
  if (isVector4Type(type)) {
    return "uvec4";
  }
  throw new Error(`Invalid vector type: ${type}`);
}
function sameSizeIvec(type) {
  if (isScalarType(type)) {
    return "int";
  }
  if (isVector2Type(type)) {
    return "ivec2";
  }
  if (isVector3Type(type)) {
    return "ivec3";
  }
  if (isVector4Type(type)) {
    return "ivec4";
  }
  throw new Error(`Invalid vector type: ${type}`);
}
function typeLiteral(type) {
  if (typeof type === "string") {
    return type;
  }
  if (typeof type === "object" && type.type) {
    return type.type;
  }
  throw new Error(`Invalid DynoType: ${String(type)}`);
}
function numberAsInt(value) {
  return Math.trunc(value).toString();
}
function numberAsUint(value) {
  const v = Math.max(0, Math.trunc(value));
  return `${v.toString()}u`;
}
function numberAsFloat(value) {
  return value === Number.POSITIVE_INFINITY ? "INFINITY" : value === Number.NEGATIVE_INFINITY ? "-INFINITY" : Number.isInteger(value) ? value.toFixed(1) : value.toString();
}
function valType(val) {
  if (val instanceof DynoValue) {
    return val.type;
  }
  const value = val.dynoOut();
  return value.type;
}
class DynoValue {
  constructor(type) {
    this.__isDynoValue = true;
    this.type = type;
  }
}
class DynoOutput extends DynoValue {
  constructor(dyno2, key) {
    super(dyno2.outTypes[key]);
    this.dyno = dyno2;
    this.key = key;
  }
}
class DynoLiteral extends DynoValue {
  constructor(type, literal) {
    super(type);
    this.literal = literal;
  }
  getLiteral() {
    return this.literal;
  }
}
function dynoLiteral(type, literal) {
  return new DynoLiteral(type, literal);
}
class DynoConst extends DynoLiteral {
  constructor(type, value) {
    super(type, "");
    this.value = value;
  }
  getLiteral() {
    const { type, value } = this;
    switch (type) {
      case "bool":
        return value ? "true" : "false";
      case "uint":
        return numberAsUint(value);
      case "int":
        return numberAsInt(value);
      case "float":
        return numberAsFloat(value);
      case "bvec2": {
        const v = value;
        return `bvec2(${v[0]}, ${v[1]})`;
      }
      case "uvec2": {
        if (value instanceof THREE.Vector2) {
          return `uvec2(${numberAsUint(value.x)}, ${numberAsUint(value.y)})`;
        }
        const v = value;
        return `uvec2(${numberAsUint(v[0])}, ${numberAsUint(v[1])})`;
      }
      case "ivec2": {
        if (value instanceof THREE.Vector2) {
          return `ivec2(${numberAsInt(value.x)}, ${numberAsInt(value.y)})`;
        }
        const v = value;
        return `ivec2(${numberAsInt(v[0])}, ${numberAsInt(v[1])})`;
      }
      case "vec2": {
        if (value instanceof THREE.Vector2) {
          return `vec2(${numberAsFloat(value.x)}, ${numberAsFloat(value.y)})`;
        }
        const v = value;
        return `vec2(${numberAsFloat(v[0])}, ${numberAsFloat(v[1])})`;
      }
      case "bvec3": {
        const v = value;
        return `bvec3(${v[0]}, ${v[1]}, ${v[2]})`;
      }
      case "uvec3": {
        if (value instanceof THREE.Vector3) {
          return `uvec3(${numberAsUint(value.x)}, ${numberAsUint(value.y)}, ${numberAsUint(value.z)})`;
        }
        const v = value;
        return `uvec3(${numberAsUint(v[0])}, ${numberAsUint(v[1])}, ${numberAsUint(v[2])})`;
      }
      case "ivec3": {
        if (value instanceof THREE.Vector3) {
          return `ivec3(${numberAsInt(value.x)}, ${numberAsInt(value.y)}, ${numberAsInt(value.z)})`;
        }
        const v = value;
        return `ivec3(${numberAsInt(v[0])}, ${numberAsInt(v[1])}, ${numberAsInt(v[2])})`;
      }
      case "vec3": {
        if (value instanceof THREE.Vector3) {
          return `vec3(${numberAsFloat(value.x)}, ${numberAsFloat(value.y)}, ${numberAsFloat(value.z)})`;
        }
        const v = value;
        return `vec3(${numberAsFloat(v[0])}, ${numberAsFloat(v[1])}, ${numberAsFloat(v[2])})`;
      }
      case "bvec4": {
        const v = value;
        return `bvec4(${v[0]}, ${v[1]}, ${v[2]}, ${v[3]})`;
      }
      case "uvec4": {
        if (value instanceof THREE.Vector4) {
          return `uvec4(${numberAsUint(value.x)}, ${numberAsUint(value.y)}, ${numberAsUint(value.z)}, ${numberAsUint(value.w)})`;
        }
        const v = value;
        return `uvec4(${numberAsUint(v[0])}, ${numberAsUint(v[1])}, ${numberAsUint(v[2])}, ${numberAsUint(v[3])})`;
      }
      case "ivec4": {
        if (value instanceof THREE.Vector4) {
          return `ivec4(${numberAsInt(value.x)}, ${numberAsInt(value.y)}, ${numberAsInt(value.z)}, ${numberAsInt(value.w)})`;
        }
        const v = value;
        return `ivec4(${numberAsInt(v[0])}, ${numberAsInt(v[1])}, ${numberAsInt(v[2])}, ${numberAsInt(v[3])})`;
      }
      case "vec4": {
        if (value instanceof THREE.Vector4) {
          return `vec4(${numberAsFloat(value.x)}, ${numberAsFloat(value.y)}, ${numberAsFloat(value.z)}, ${numberAsFloat(value.w)})`;
        }
        if (value instanceof THREE.Quaternion) {
          return `vec4(${numberAsFloat(value.x)}, ${numberAsFloat(value.y)}, ${numberAsFloat(value.z)}, ${numberAsFloat(value.w)})`;
        }
        const v = value;
        return `vec4(${numberAsFloat(v[0])}, ${numberAsFloat(v[1])}, ${numberAsFloat(v[2])}, ${numberAsFloat(v[3])})`;
      }
      case "mat2":
      case "mat2x2": {
        const m = value;
        const e = m instanceof THREE.Matrix2 ? m.elements : value;
        const arg = new Array(4).fill(0).map((_, i) => numberAsFloat(e[i]));
        return `${type}(${arg.join(", ")})`;
      }
      case "mat2x3": {
        const e = value;
        const arg = new Array(6).fill(0).map((_, i) => numberAsFloat(e[i]));
        return `${type}(${arg.join(", ")})`;
      }
      case "mat2x4": {
        const e = value;
        const arg = new Array(8).fill(0).map((_, i) => numberAsFloat(e[i]));
        return `${type}(${arg.join(", ")})`;
      }
      case "mat3":
      case "mat3x3": {
        const m = value;
        const e = m instanceof THREE.Matrix3 ? m.elements : value;
        const arg = new Array(9).fill(0).map((_, i) => numberAsFloat(e[i]));
        return `${type}(${arg.join(", ")})`;
      }
      case "mat3x2": {
        const e = value;
        const arg = new Array(6).fill(0).map((_, i) => numberAsFloat(e[i]));
        return `${type}(${arg.join(", ")})`;
      }
      case "mat3x4": {
        const e = value;
        const arg = new Array(12).fill(0).map((_, i) => numberAsFloat(e[i]));
        return `${type}(${arg.join(", ")})`;
      }
      case "mat4":
      case "mat4x4": {
        const m = value;
        const e = m instanceof THREE.Matrix4 ? m.elements : value;
        const arg = new Array(16).fill(0).map((_, i) => numberAsFloat(e[i]));
        return `${type}(${arg.join(", ")})`;
      }
      case "mat4x2": {
        const e = value;
        const arg = new Array(8).fill(0).map((_, i) => numberAsFloat(e[i]));
        return `${type}(${arg.join(", ")})`;
      }
      case "mat4x3": {
        const e = value;
        const arg = new Array(12).fill(0).map((_, i) => numberAsFloat(e[i]));
        return `${type}(${arg.join(", ")})`;
      }
      default:
        throw new Error(`Type not implemented: ${String(type)}`);
    }
  }
}
function dynoConst(type, value) {
  return new DynoConst(type, value);
}
function literalZero(type) {
  const typeString = String(type);
  if (isBoolType(type)) {
    return `${typeString}(false)`;
  }
  if (isAllFloatType(type)) {
    return `${typeString}(0.0)`;
  }
  if (isIntType(type)) {
    return `${typeString}(0)`;
  }
  if (isUintType(type)) {
    return `${typeString}(0u)`;
  }
  throw new Error(`Type not implemented: ${typeString}`);
}
function literalOne(type) {
  const typeString = String(type);
  if (isBoolType(type)) {
    return `${typeString}(true)`;
  }
  if (isAllFloatType(type)) {
    return `${typeString}(1.0)`;
  }
  if (isIntType(type)) {
    return `${typeString}(1)`;
  }
  if (isUintType(type)) {
    return `${typeString}(1u)`;
  }
  throw new Error(`Type not implemented: ${typeString}`);
}
function literalNegOne(type) {
  const typeString = String(type);
  if (isBoolType(type)) {
    return `${typeString}(true)`;
  }
  if (isAllFloatType(type)) {
    return `${typeString}(-1.0)`;
  }
  if (isIntType(type)) {
    return `${typeString}(-1)`;
  }
  if (isUintType(type)) {
    return `${typeString}(0xFFFFFFFFu)`;
  }
  throw new Error(`Type not implemented: ${typeString}`);
}
const DEFAULT_INDENT = "    ";
class Compilation {
  constructor({ indent } = {}) {
    this.globals = /* @__PURE__ */ new Set();
    this.statements = [];
    this.uniforms = {};
    this.declares = /* @__PURE__ */ new Set();
    this.updaters = [];
    this.sequence = 0;
    this.indent = DEFAULT_INDENT;
    this.indent = indent ?? DEFAULT_INDENT;
  }
  nextSequence() {
    return this.sequence++;
  }
}
class Dyno {
  constructor({
    inTypes,
    outTypes,
    inputs,
    update,
    globals,
    statements,
    generate
  }) {
    this.inTypes = inTypes ?? {};
    this.outTypes = outTypes ?? {};
    this.inputs = inputs ?? {};
    this.update = update;
    this.globals = globals;
    this.statements = statements;
    this.generate = generate ?? (({ inputs: inputs2, outputs, compile }) => {
      var _a2, _b2;
      return {
        globals: (_a2 = this.globals) == null ? void 0 : _a2.call(this, { inputs: inputs2, outputs, compile }),
        statements: (_b2 = this.statements) == null ? void 0 : _b2.call(this, { inputs: inputs2, outputs, compile })
      };
    });
  }
  get outputs() {
    const outputs = {};
    for (const key in this.outTypes) {
      outputs[key] = new DynoOutput(this, key);
    }
    return outputs;
  }
  apply(inputs) {
    Object.assign(this.inputs, inputs);
    return this.outputs;
  }
  compile({
    inputs,
    outputs,
    compile
  }) {
    const result = [
      `// ${this.constructor.name}(${Object.values(inputs).join(", ")}) => (${Object.values(outputs).join(", ")})`
    ];
    const declares = [];
    for (const key in outputs) {
      const name = outputs[key];
      if (name && !compile.declares.has(name)) {
        compile.declares.add(name);
        declares.push(key);
      }
    }
    const { globals, statements, uniforms } = this.generate({
      inputs,
      outputs,
      compile
    });
    for (const global of globals ?? []) {
      compile.globals.add(global);
    }
    for (const key in uniforms) {
      compile.uniforms[key] = uniforms[key];
    }
    if (this.update) {
      compile.updaters.push(this.update);
    }
    for (const key of declares) {
      const name = outputs[key];
      if (name) {
        if (!compile.uniforms[name]) {
          result.push(`${dynoDeclare(name, this.outTypes[key])};`);
        }
      }
    }
    if (statements == null ? void 0 : statements.length) {
      result.push("{");
      result.push(...statements.map((line) => compile.indent + line));
      result.push("}");
    }
    return result;
  }
}
class DynoBlock extends Dyno {
  constructor({
    inTypes,
    outTypes,
    inputs,
    update,
    globals,
    construct
  }) {
    super({
      inTypes,
      outTypes,
      inputs,
      update,
      globals,
      generate: (args) => this.generateBlock(args)
    });
    this.construct = construct;
  }
  generateBlock({
    inputs,
    outputs,
    compile
  }) {
    var _a2, _b2;
    const blockInputs = {};
    const blockOutputs = {};
    for (const key in inputs) {
      if (inputs[key] != null) {
        blockInputs[key] = new DynoLiteral(this.inTypes[key], inputs[key]);
      }
    }
    for (const key in outputs) {
      if (outputs[key] != null) {
        blockOutputs[key] = new DynoValue(this.outTypes[key]);
      }
    }
    const options = { roots: [] };
    const returned = this.construct(blockInputs, blockOutputs, options);
    for (const global of ((_a2 = this.globals) == null ? void 0 : _a2.call(this, { inputs, outputs, compile })) ?? []) {
      compile.globals.add(global);
    }
    const ordering = [];
    const nodeOuts = /* @__PURE__ */ new Map();
    function visit(node, outKey, outName) {
      let outs = nodeOuts.get(node);
      if (!outs) {
        outs = {
          sequence: compile.nextSequence(),
          outNames: /* @__PURE__ */ new Map(),
          newOuts: /* @__PURE__ */ new Set()
        };
        nodeOuts.set(node, outs);
        for (const key in node.inputs) {
          let input = node.inputs[key];
          while (input) {
            if (input instanceof DynoValue) {
              if (input instanceof DynoOutput) {
                visit(input.dyno, input.key);
              }
              break;
            }
            input = input.dynoOut();
          }
        }
        ordering.push(node);
      }
      if (outKey) {
        if (!outName) {
          outs.newOuts.add(outKey);
        }
        outs.outNames.set(outKey, outName ?? `${outKey}_${outs.sequence}`);
      }
    }
    for (const root of options.roots) {
      visit(root);
    }
    for (const key in blockOutputs) {
      let value = (returned == null ? void 0 : returned[key]) ?? blockOutputs[key];
      while (value) {
        if (value instanceof DynoValue) {
          if (value instanceof DynoOutput) {
            visit(value.dyno, value.key, outputs[key]);
          }
          break;
        }
        value = value.dynoOut();
      }
      blockOutputs[key] = value;
    }
    const steps = [];
    for (const dyno2 of ordering) {
      const inputs2 = {};
      const outputs2 = {};
      for (const key in dyno2.inputs) {
        let value = dyno2.inputs[key];
        while (value) {
          if (value instanceof DynoValue) {
            if (value instanceof DynoLiteral) {
              inputs2[key] = value.getLiteral();
            } else if (value instanceof DynoOutput) {
              const source = (_b2 = nodeOuts.get(value.dyno)) == null ? void 0 : _b2.outNames.get(value.key);
              if (!source) {
                throw new Error(
                  `Source not found for ${value.dyno.constructor.name}.${value.key}`
                );
              }
              inputs2[key] = source;
            }
            break;
          }
          value = value.dynoOut();
        }
      }
      const outs = nodeOuts.get(dyno2) ?? { outNames: /* @__PURE__ */ new Map() };
      for (const [key, name] of outs.outNames.entries()) {
        outputs2[key] = name;
      }
      const newSteps = dyno2.compile({ inputs: inputs2, outputs: outputs2, compile });
      steps.push(newSteps);
    }
    const literalOutputs = [];
    for (const key in outputs) {
      if (blockOutputs[key] instanceof DynoLiteral) {
        literalOutputs.push(
          `${outputs[key]} = ${blockOutputs[key].getLiteral()};`
        );
      }
    }
    if (literalOutputs.length > 0) {
      steps.push(literalOutputs);
    }
    const statements = steps.flatMap((step2, index) => {
      return index === 0 ? step2 : ["", ...step2];
    });
    return { statements };
  }
}
function dynoBlock(inTypes, outTypes, construct, { update, globals } = {}) {
  return new DynoBlock({ inTypes, outTypes, construct, update, globals });
}
function dyno$1({
  inTypes,
  outTypes,
  inputs,
  update,
  globals,
  statements,
  generate
}) {
  return new Dyno({
    inTypes,
    outTypes,
    inputs,
    update,
    globals,
    statements,
    generate
  });
}
function dynoDeclare(name, type, count) {
  const typeStr = typeof type === "string" ? type : type.type;
  if (!typeStr) {
    throw new Error(`Invalid DynoType: ${String(type)}`);
  }
  return `${typeStr} ${name}${count != null ? `[${count}]` : ""}`;
}
function unindentLines(s) {
  var _a2;
  let seenNonEmpty = false;
  const lines = s.split("\n").map((line) => {
    const trimmedLine = line.trimEnd();
    if (seenNonEmpty) {
      return trimmedLine;
    }
    if (trimmedLine.length > 0) {
      seenNonEmpty = true;
      return trimmedLine;
    }
    return null;
  }).filter((line) => line != null);
  while (lines.length > 0 && lines[lines.length - 1].length === 0) {
    lines.pop();
  }
  if (lines.length === 0) {
    return [];
  }
  const indent = (_a2 = lines[0].match(/^\s*/)) == null ? void 0 : _a2[0];
  if (!indent) {
    return lines;
  }
  const regex = new RegExp(`^${indent}`);
  return lines.map((line) => line.replace(regex, ""));
}
function unindent(s) {
  return unindentLines(s).join("\n");
}
class UnaryOp extends Dyno {
  constructor({
    a,
    outKey,
    outTypeFunc
  }) {
    const inTypes = { a: valType(a) };
    const outType = outTypeFunc(valType(a));
    const outTypes = { [outKey]: outType };
    super({ inTypes, outTypes, inputs: { a } });
    this.outKey = outKey;
  }
  dynoOut() {
    return new DynoOutput(this, this.outKey);
  }
}
class BinaryOp extends Dyno {
  constructor({
    a,
    b,
    outKey,
    outTypeFunc
  }) {
    const inTypes = { a: valType(a), b: valType(b) };
    const outType = outTypeFunc(valType(a), valType(b));
    const outTypes = { [outKey]: outType };
    super({ inTypes, outTypes, inputs: { a, b } });
    this.outKey = outKey;
  }
  dynoOut() {
    return new DynoOutput(this, this.outKey);
  }
}
class TrinaryOp extends Dyno {
  constructor({
    a,
    b,
    c,
    outKey,
    outTypeFunc
  }) {
    const inTypes = { a: valType(a), b: valType(b), c: valType(c) };
    const outType = outTypeFunc(valType(a), valType(b), valType(c));
    const outTypes = { [outKey]: outType };
    super({ inTypes, outTypes, inputs: { a, b, c } });
    this.outKey = outKey;
  }
  dynoOut() {
    return new DynoOutput(this, this.outKey);
  }
}
const Gsplat = { type: "Gsplat" };
const TPackedSplats = { type: "PackedSplats" };
const numPackedSplats = (packedSplats) => new NumPackedSplats({ packedSplats });
const readPackedSplat = (packedSplats, index) => new ReadPackedSplat({ packedSplats, index });
const readPackedSplatRange = (packedSplats, index, base, count) => new ReadPackedSplatRange({ packedSplats, index, base, count });
const splitGsplat = (gsplat) => new SplitGsplat({ gsplat });
const combineGsplat = ({
  gsplat,
  flags,
  index,
  center,
  scales,
  quaternion,
  rgba,
  rgb,
  opacity,
  x,
  y,
  z,
  r,
  g,
  b
}) => {
  return new CombineGsplat({
    gsplat,
    flags,
    index,
    center,
    scales,
    quaternion,
    rgba,
    rgb,
    opacity,
    x,
    y,
    z,
    r,
    g,
    b
  });
};
const gsplatNormal = (gsplat) => new GsplatNormal({ gsplat });
const transformGsplat = (gsplat, {
  scale,
  rotate,
  translate,
  recolor
}) => {
  return new TransformGsplat({ gsplat, scale, rotate, translate, recolor });
};
const defineGsplat = unindent(`
  struct Gsplat {
    vec3 center;
    uint flags;
    vec3 scales;
    int index;
    vec4 quaternion;
    vec4 rgba;
  };
  const uint GSPLAT_FLAG_ACTIVE = 1u << 0u;

  bool isGsplatActive(uint flags) {
    return (flags & GSPLAT_FLAG_ACTIVE) != 0u;
  }
`);
const definePackedSplats = unindent(`
  struct PackedSplats {
    usampler2DArray texture;
    int numSplats;
  };
`);
class NumPackedSplats extends UnaryOp {
  constructor({
    packedSplats
  }) {
    super({ a: packedSplats, outKey: "numSplats", outTypeFunc: () => "int" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.numSplats} = ${inputs.a}.numSplats;`
    ];
  }
}
const defineReadPackedSplat = unindent(`
  bool readPackedSplat(usampler2DArray texture, int numSplats, int index, out Gsplat gsplat) {
    if ((index >= 0) && (index < numSplats)) {
      uvec4 packed = texelFetch(texture, splatTexCoord(index), 0);
      unpackSplat(packed, gsplat.center, gsplat.scales, gsplat.quaternion, gsplat.rgba);
      return true;
    } else {
      return false;
    }
  }
`);
class ReadPackedSplat extends Dyno {
  constructor({
    packedSplats,
    index
  }) {
    super({
      inTypes: { packedSplats: TPackedSplats, index: "int" },
      outTypes: { gsplat: Gsplat },
      inputs: { packedSplats, index },
      globals: () => [defineGsplat, definePackedSplats, defineReadPackedSplat],
      statements: ({ inputs, outputs }) => {
        const { gsplat } = outputs;
        if (!gsplat) {
          return [];
        }
        const { packedSplats: packedSplats2, index: index2 } = inputs;
        let statements;
        if (packedSplats2 && index2) {
          statements = unindentLines(`
            if (readPackedSplat(${packedSplats2}.texture, ${packedSplats2}.numSplats, ${index2}, ${gsplat})) {
              bool zeroSize = all(equal(${gsplat}.scales, vec3(0.0, 0.0, 0.0)));
              ${gsplat}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;
            } else {
              ${gsplat}.flags = 0u;
            }
          `);
        } else {
          statements = [`${gsplat}.flags = 0u;`];
        }
        statements.push(`${gsplat}.index = ${index2 ?? "0"};`);
        return statements;
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "gsplat");
  }
}
class ReadPackedSplatRange extends Dyno {
  constructor({
    packedSplats,
    index,
    base,
    count
  }) {
    super({
      inTypes: {
        packedSplats: TPackedSplats,
        index: "int",
        base: "int",
        count: "int"
      },
      outTypes: { gsplat: Gsplat },
      inputs: { packedSplats, index, base, count },
      globals: () => [defineGsplat, definePackedSplats, defineReadPackedSplat],
      statements: ({ inputs, outputs }) => {
        const { gsplat } = outputs;
        if (!gsplat) {
          return [];
        }
        const { packedSplats: packedSplats2, index: index2, base: base2, count: count2 } = inputs;
        let statements;
        if (packedSplats2 && index2 && base2 && count2) {
          statements = unindentLines(`
            ${gsplat}.flags = 0u;
            if ((${index2} >= ${base2}) && (${index2} < (${base2} + ${count2}))) {
              if (readPackedSplat(${packedSplats2}.texture, ${packedSplats2}.numSplats, ${index2}, ${gsplat})) {
                bool zeroSize = all(equal(${gsplat}.scales, vec3(0.0, 0.0, 0.0)));
                ${gsplat}.flags = zeroSize ? 0u : GSPLAT_FLAG_ACTIVE;
              }
            }
          `);
        } else {
          statements = [`${gsplat}.flags = 0u;`];
        }
        statements.push(`${gsplat}.index = ${index2 ?? "0"};`);
        return statements;
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "gsplat");
  }
}
class SplitGsplat extends Dyno {
  constructor({ gsplat }) {
    super({
      inTypes: { gsplat: Gsplat },
      outTypes: {
        flags: "uint",
        active: "bool",
        index: "int",
        center: "vec3",
        scales: "vec3",
        quaternion: "vec4",
        rgba: "vec4",
        rgb: "vec3",
        opacity: "float",
        x: "float",
        y: "float",
        z: "float",
        r: "float",
        g: "float",
        b: "float"
      },
      inputs: { gsplat },
      globals: () => [defineGsplat],
      statements: ({ inputs, outputs }) => {
        const { gsplat: gsplat2 } = inputs;
        const {
          flags,
          active,
          index,
          center,
          scales,
          quaternion,
          rgba,
          rgb,
          opacity,
          x,
          y,
          z,
          r,
          g,
          b
        } = outputs;
        return [
          !flags ? null : `${flags} = ${gsplat2 ? `${gsplat2}.flags` : "0u"};`,
          !active ? null : `${active} = isGsplatActive(${gsplat2 ? `${gsplat2}.flags` : "0u"});`,
          !index ? null : `${index} = ${gsplat2 ? `${gsplat2}.index` : "0"};`,
          !center ? null : `${center} = ${gsplat2 ? `${gsplat2}.center` : "vec3(0.0, 0.0, 0.0)"};`,
          !scales ? null : `${scales} = ${gsplat2 ? `${gsplat2}.scales` : "vec3(0.0, 0.0, 0.0)"};`,
          !quaternion ? null : `${quaternion} = ${gsplat2 ? `${gsplat2}.quaternion` : "vec4(0.0, 0.0, 0.0, 1.0)"};`,
          !rgba ? null : `${rgba} = ${gsplat2 ? `${gsplat2}.rgba` : "vec4(0.0, 0.0, 0.0, 0.0)"};`,
          !rgb ? null : `${rgb} = ${gsplat2 ? `${gsplat2}.rgba.rgb` : "vec3(0.0, 0.0, 0.0)"};`,
          !opacity ? null : `${opacity} = ${gsplat2 ? `${gsplat2}.rgba.a` : "0.0"};`,
          !x ? null : `${x} = ${gsplat2 ? `${gsplat2}.center.x` : "0.0"};`,
          !y ? null : `${y} = ${gsplat2 ? `${gsplat2}.center.y` : "0.0"};`,
          !z ? null : `${z} = ${gsplat2 ? `${gsplat2}.center.z` : "0.0"};`,
          !r ? null : `${r} = ${gsplat2 ? `${gsplat2}.rgba.r` : "0.0"};`,
          !g ? null : `${g} = ${gsplat2 ? `${gsplat2}.rgba.g` : "0.0"};`,
          !b ? null : `${b} = ${gsplat2 ? `${gsplat2}.rgba.b` : "0.0"};`
        ].filter(Boolean);
      }
    });
  }
}
class CombineGsplat extends Dyno {
  constructor({
    gsplat,
    flags,
    index,
    center,
    scales,
    quaternion,
    rgba,
    rgb,
    opacity,
    x,
    y,
    z,
    r,
    g,
    b
  }) {
    super({
      inTypes: {
        gsplat: Gsplat,
        flags: "uint",
        index: "int",
        center: "vec3",
        scales: "vec3",
        quaternion: "vec4",
        rgba: "vec4",
        rgb: "vec3",
        opacity: "float",
        x: "float",
        y: "float",
        z: "float",
        r: "float",
        g: "float",
        b: "float"
      },
      outTypes: { gsplat: Gsplat },
      inputs: {
        gsplat,
        flags,
        index,
        center,
        scales,
        quaternion,
        rgba,
        rgb,
        opacity,
        x,
        y,
        z,
        r,
        g,
        b
      },
      globals: () => [defineGsplat],
      statements: ({ inputs, outputs }) => {
        const { gsplat: outGsplat } = outputs;
        if (!outGsplat) {
          return [];
        }
        const {
          gsplat: gsplat2,
          flags: flags2,
          index: index2,
          center: center2,
          scales: scales2,
          quaternion: quaternion2,
          rgba: rgba2,
          rgb: rgb2,
          opacity: opacity2,
          x: x2,
          y: y2,
          z: z2,
          r: r2,
          g: g2,
          b: b22
        } = inputs;
        return [
          `${outGsplat}.flags = ${flags2 ?? (gsplat2 ? `${gsplat2}.flags` : "0u")};`,
          `${outGsplat}.index = ${index2 ?? (gsplat2 ? `${gsplat2}.index` : "0")};`,
          `${outGsplat}.center = ${center2 ?? (gsplat2 ? `${gsplat2}.center` : "vec3(0.0, 0.0, 0.0)")};`,
          `${outGsplat}.scales = ${scales2 ?? (gsplat2 ? `${gsplat2}.scales` : "vec3(0.0, 0.0, 0.0)")};`,
          `${outGsplat}.quaternion = ${quaternion2 ?? (gsplat2 ? `${gsplat2}.quaternion` : "vec4(0.0, 0.0, 0.0, 1.0)")};`,
          `${outGsplat}.rgba = ${rgba2 ?? (gsplat2 ? `${gsplat2}.rgba` : "vec4(0.0, 0.0, 0.0, 0.0)")};`,
          !rgb2 ? null : `${outGsplat}.rgba.rgb = ${rgb2};`,
          !opacity2 ? null : `${outGsplat}.rgba.a = ${opacity2};`,
          !x2 ? null : `${outGsplat}.center.x = ${x2};`,
          !y2 ? null : `${outGsplat}.center.y = ${y2};`,
          !z2 ? null : `${outGsplat}.center.z = ${z2};`,
          !r2 ? null : `${outGsplat}.rgba.r = ${r2};`,
          !g2 ? null : `${outGsplat}.rgba.g = ${g2};`,
          !b22 ? null : `${outGsplat}.rgba.b = ${b22};`
        ].filter(Boolean);
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "gsplat");
  }
}
const defineGsplatNormal = unindent(`
  vec3 gsplatNormal(vec3 scales, vec4 quaternion) {
    float minScale = min(scales.x, min(scales.y, scales.z));
    vec3 normal;
    if (scales.z == minScale) {
      normal = vec3(0.0, 0.0, 1.0);
    } else if (scales.y == minScale) {
      normal = vec3(0.0, 1.0, 0.0);
    } else {
      normal = vec3(1.0, 0.0, 0.0);
    }
    return quatVec(quaternion, normal);
  }
`);
class GsplatNormal extends UnaryOp {
  constructor({ gsplat }) {
    super({ a: gsplat, outKey: "normal", outTypeFunc: () => "vec3" });
    this.globals = () => [defineGsplat, defineGsplatNormal];
    this.statements = ({ inputs, outputs }) => [
      `${outputs.normal} = gsplatNormal(${inputs.a}.scales, ${inputs.a}.quaternion);`
    ];
  }
}
class TransformGsplat extends Dyno {
  constructor({
    gsplat,
    scale,
    rotate,
    translate,
    recolor
  }) {
    super({
      inTypes: {
        gsplat: Gsplat,
        scale: "float",
        rotate: "vec4",
        translate: "vec3",
        recolor: "vec4"
      },
      outTypes: { gsplat: Gsplat },
      inputs: { gsplat, scale, rotate, translate, recolor },
      globals: () => [defineGsplat],
      statements: ({ inputs, outputs, compile }) => {
        const { gsplat: gsplat2 } = outputs;
        if (!gsplat2 || !inputs.gsplat) {
          return [];
        }
        const { scale: scale2, rotate: rotate2, translate: translate2, recolor: recolor2 } = inputs;
        const indent = compile.indent;
        const statements = [
          `${gsplat2} = ${inputs.gsplat};`,
          `if (isGsplatActive(${gsplat2}.flags)) {`,
          scale2 ? `${indent}${gsplat2}.center *= ${scale2};` : null,
          rotate2 ? `${indent}${gsplat2}.center = quatVec(${rotate2}, ${gsplat2}.center);` : null,
          translate2 ? `${indent}${gsplat2}.center += ${translate2};` : null,
          scale2 ? `${indent}${gsplat2}.scales *= ${scale2};` : null,
          rotate2 ? `${indent}${gsplat2}.quaternion = quatQuat(${rotate2}, ${gsplat2}.quaternion);` : null,
          recolor2 ? `${indent}${gsplat2}.rgba *= ${recolor2};` : null,
          "}"
        ].filter(Boolean);
        return statements;
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "gsplat");
  }
}
const outputPackedSplat = (gsplat) => new OutputPackedSplat({ gsplat });
const outputRgba8 = (rgba8) => new OutputRgba8({ rgba8 });
class OutputPackedSplat extends Dyno {
  constructor({ gsplat }) {
    super({
      inTypes: { gsplat: Gsplat },
      inputs: { gsplat },
      globals: () => [defineGsplat],
      statements: ({ inputs, outputs }) => {
        const { output } = outputs;
        if (!output) {
          return [];
        }
        const { gsplat: gsplat2 } = inputs;
        if (gsplat2) {
          return unindentLines(`
            if (isGsplatActive(${gsplat2}.flags)) {
              ${output} = packSplat(${gsplat2}.center, ${gsplat2}.scales, ${gsplat2}.quaternion, ${gsplat2}.rgba);
            } else {
              ${output} = uvec4(0u, 0u, 0u, 0u);
            }
          `);
        }
        return [`${output} = uvec4(0u, 0u, 0u, 0u);`];
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "output");
  }
}
class OutputRgba8 extends Dyno {
  constructor({ rgba8 }) {
    super({
      inTypes: { rgba8: "vec4" },
      inputs: { rgba8 },
      statements: ({ inputs, outputs }) => [
        `target = ${inputs.rgba8 ?? "vec4(0.0, 0.0, 0.0, 0.0)"};`
      ]
    });
  }
  dynoOut() {
    return new DynoOutput(this, "rgba8");
  }
}
const uniform = (key, type, value) => new DynoUniform({ key, type, value });
const dynoBool = (value = false, key) => new DynoBool({ key, value });
const dynoUint = (value = 0, key) => new DynoUint({ key, value });
const dynoInt = (value = 0, key) => new DynoInt({ key, value });
const dynoFloat = (value = 0, key) => new DynoFloat({ key, value });
const dynoBvec2 = (value, key) => new DynoBvec2({ key, value });
const dynoUvec2 = (value, key) => new DynoUvec2({ key, value });
const dynoIvec2 = (value, key) => new DynoIvec2({ key, value });
const dynoVec2 = (value, key) => new DynoVec2({ key, value });
const dynoBvec3 = (value, key) => new DynoBvec3({ key, value });
const dynoUvec3 = (value, key) => new DynoUvec3({ key, value });
const dynoIvec3 = (value, key) => new DynoIvec3({ key, value });
const dynoVec3 = (value, key) => new DynoVec3({ key, value });
const dynoBvec4 = (value, key) => new DynoBvec4({ key, value });
const dynoUvec4 = (value, key) => new DynoUvec4({ key, value });
const dynoIvec4 = (value, key) => new DynoIvec4({ key, value });
const dynoVec4 = (value, key) => new DynoVec4({ key, value });
const dynoMat2 = (value, key) => new DynoMat2({ key, value });
const dynoMat2x2 = (value, key) => new DynoMat2x2({ key, value });
const dynoMat2x3 = (value, key) => new DynoMat2x3({ key, value });
const dynoMat2x4 = (value, key) => new DynoMat2x4({ key, value });
const dynoMat3 = (value, key) => new DynoMat3({ key, value });
const dynoMat3x2 = (value, key) => new DynoMat3x2({ key, value });
const dynoMat3x3 = (value, key) => new DynoMat3x3({ key, value });
const dynoMat3x4 = (value, key) => new DynoMat3x4({ key, value });
const dynoMat4 = (value, key) => new DynoMat4({ key, value });
const dynoMat4x2 = (value, key) => new DynoMat4x2({ key, value });
const dynoMat4x3 = (value, key) => new DynoMat4x3({ key, value });
const dynoMat4x4 = (value, key) => new DynoMat4x4({ key, value });
const dynoUsampler2D = (value, key) => new DynoUsampler2D({ key, value });
const dynoIsampler2D = (value, key) => new DynoIsampler2D({ key, value });
const dynoSampler2D = (value, key) => new DynoSampler2D({ key, value });
const dynoUsampler2DArray = (value, key) => new DynoUsampler2DArray({ key, value });
const dynoIsampler2DArray = (key, value) => new DynoIsampler2DArray({ key, value });
const dynoSampler2DArray = (value, key) => new DynoSampler2DArray({ key, value });
const dynoUsampler3D = (value, key) => new DynoUsampler3D({ key, value });
const dynoIsampler3D = (value, key) => new DynoIsampler3D({ key, value });
const dynoSampler3D = (value, key) => new DynoSampler3D({ key, value });
const dynoUsamplerCube = (value, key) => new DynoUsamplerCube({ key, value });
const dynoIsamplerCube = (value, key) => new DynoIsamplerCube({ key, value });
const dynoSamplerCube = (value, key) => new DynoSamplerCube({ key, value });
const dynoSampler2DShadow = (value, key) => new DynoSampler2DShadow({ key, value });
const dynoSampler2DArrayShadow = (value, key) => new DynoSampler2DArrayShadow({ key, value });
const dynoSamplerCubeShadow = (value, key) => new DynoSamplerCubeShadow({ key, value });
class DynoUniform extends Dyno {
  constructor({
    key,
    type,
    count,
    value,
    update,
    globals
  }) {
    key = key ?? "value";
    super({
      outTypes: { [key]: type },
      update: () => {
        if (update) {
          const value2 = update(this.value);
          if (value2 !== void 0) {
            this.value = value2;
          }
        }
        this.uniform.value = this.value;
      },
      generate: ({ inputs, outputs }) => {
        const allGlobals = (globals == null ? void 0 : globals({ inputs, outputs })) ?? [];
        const uniforms = {};
        const name = outputs[key];
        if (name) {
          allGlobals.push(`uniform ${dynoDeclare(name, type, count)};`);
          uniforms[name] = this.uniform;
        }
        return { globals: allGlobals, uniforms };
      }
    });
    this.type = type;
    this.count = count;
    this.value = value;
    this.uniform = { value };
    this.outKey = key;
  }
  dynoOut() {
    return new DynoOutput(this, this.outKey);
  }
}
class DynoBool extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "bool", value, update });
  }
}
class DynoUint extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "uint", value, update });
  }
}
class DynoInt extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "int", value, update });
  }
}
class DynoFloat extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "float", value, update });
  }
}
class DynoBvec2 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "bvec2", value, update });
  }
}
class DynoUvec2 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "uvec2", value, update });
  }
}
class DynoIvec2 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "ivec2", value, update });
  }
}
class DynoVec2 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "vec2", value, update });
  }
}
class DynoBvec3 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "bvec3", value, update });
  }
}
class DynoUvec3 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "uvec3", value, update });
  }
}
class DynoIvec3 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "ivec3", value, update });
  }
}
class DynoVec3 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "vec3", value, update });
  }
}
class DynoBvec4 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "bvec4", value, update });
  }
}
class DynoUvec4 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "uvec4", value, update });
  }
}
class DynoIvec4 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "ivec4", value, update });
  }
}
class DynoVec4 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "vec4", value, update });
  }
}
class DynoMat2 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat2", value, update });
  }
}
class DynoMat2x2 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat2x2", value, update });
  }
}
class DynoMat2x3 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat2x3", value, update });
  }
}
class DynoMat2x4 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat2x4", value, update });
  }
}
class DynoMat3 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat3", value, update });
  }
}
class DynoMat3x2 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat3x2", value, update });
  }
}
class DynoMat3x3 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat3x3", value, update });
  }
}
class DynoMat3x4 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat3x4", value, update });
  }
}
class DynoMat4 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat4", value, update });
  }
}
class DynoMat4x2 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat4x2", value, update });
  }
}
class DynoMat4x3 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat4x3", value, update });
  }
}
class DynoMat4x4 extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "mat4x4", value, update });
  }
}
class DynoUsampler2D extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "usampler2D", value, update });
  }
}
class DynoIsampler2D extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "isampler2D", value, update });
  }
}
class DynoSampler2D extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "sampler2D", value, update });
  }
}
class DynoUsampler2DArray extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "usampler2DArray", value, update });
  }
}
class DynoIsampler2DArray extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "isampler2DArray", value, update });
  }
}
class DynoSampler2DArray extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "sampler2DArray", value, update });
  }
}
class DynoUsampler3D extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "usampler3D", value, update });
  }
}
class DynoIsampler3D extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "isampler3D", value, update });
  }
}
class DynoSampler3D extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "sampler3D", value, update });
  }
}
class DynoUsamplerCube extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "usamplerCube", value, update });
  }
}
class DynoIsamplerCube extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "isamplerCube", value, update });
  }
}
class DynoSamplerCube extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "samplerCube", value, update });
  }
}
class DynoSampler2DShadow extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "sampler2DShadow", value, update });
  }
}
class DynoSampler2DArrayShadow extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "sampler2DArrayShadow", value, update });
  }
}
class DynoSamplerCubeShadow extends DynoUniform {
  constructor({
    key,
    value,
    update
  }) {
    super({ key, type: "samplerCubeShadow", value, update });
  }
}
const f32buffer = new Float32Array(1);
const u32buffer = new Uint32Array(f32buffer.buffer);
function floatBitsToUint$1(f) {
  f32buffer[0] = f;
  return u32buffer[0];
}
function uintBitsToFloat$1(u) {
  u32buffer[0] = u;
  return f32buffer[0];
}
function toHalf(f) {
  f32buffer[0] = f;
  const bits2 = u32buffer[0];
  const sign2 = bits2 >> 31 & 1;
  const exp3 = bits2 >> 23 & 255;
  const frac = bits2 & 8388607;
  const halfSign = sign2 << 15;
  if (exp3 === 255) {
    if (frac !== 0) {
      return halfSign | 32767;
    }
    return halfSign | 31744;
  }
  const newExp = exp3 - 127 + 15;
  if (newExp >= 31) {
    return halfSign | 31744;
  }
  if (newExp <= 0) {
    if (newExp < -10) {
      return halfSign;
    }
    const subFrac = (frac | 8388608) >> 1 - newExp + 13;
    return halfSign | subFrac;
  }
  const halfFrac = frac >> 13;
  return halfSign | newExp << 10 | halfFrac;
}
function fromHalf(h) {
  const sign2 = h >> 15 & 1;
  const exp3 = h >> 10 & 31;
  const frac = h & 1023;
  let f32bits;
  if (exp3 === 0) {
    if (frac === 0) {
      f32bits = sign2 << 31;
    } else {
      let mant = frac;
      let e = -14;
      while ((mant & 1024) === 0) {
        mant <<= 1;
        e--;
      }
      mant &= 1023;
      const newExp = e + 127;
      const newFrac = mant << 13;
      f32bits = sign2 << 31 | newExp << 23 | newFrac;
    }
  } else if (exp3 === 31) {
    if (frac === 0) {
      f32bits = sign2 << 31 | 2139095040;
    } else {
      f32bits = sign2 << 31 | 2143289344;
    }
  } else {
    const newExp = exp3 - 15 + 127;
    const newFrac = frac << 13;
    f32bits = sign2 << 31 | newExp << 23 | newFrac;
  }
  u32buffer[0] = f32bits;
  return f32buffer[0];
}
function floatToUint8(v) {
  return Math.max(0, Math.min(255, Math.round(v * 255)));
}
function floatToSint8(v) {
  return Math.max(-127, Math.min(127, Math.round(v * 127)));
}
function Uint8ToFloat(v) {
  return v / 255;
}
function Sint8ToFloat(v) {
  return v / 127;
}
class DataCache {
  // Create a DataCache with a given function that fetches data not in the cache.
  constructor({
    asyncFetch,
    maxItems = 5
  }) {
    this.asyncFetch = asyncFetch;
    this.maxItems = maxItems;
    this.items = [];
  }
  // Fetch data for the key, returning cached data if available.
  async getFetch(key) {
    const index = this.items.findIndex((item) => item.key === key);
    if (index >= 0) {
      const item = this.items.splice(index, 1)[0];
      this.items.push(item);
      return item.data;
    }
    const data = await this.asyncFetch(key);
    this.items.push({ key, data });
    while (this.items.length > this.maxItems) {
      this.items.shift();
    }
    return data;
  }
}
function mapObject(obj, fn) {
  const entries = Object.entries(obj).map(([key, value]) => [
    key,
    fn(value, key)
  ]);
  return Object.fromEntries(entries);
}
function mapFilterObject(obj, fn) {
  const entries = Object.entries(obj).map(([key, value]) => [key, fn(value, key)]).filter(([_, value]) => value !== void 0);
  return Object.fromEntries(entries);
}
function getArrayBuffers(ctx) {
  const buffers = [];
  const seen = /* @__PURE__ */ new Set();
  function traverse(obj) {
    if (obj && typeof obj === "object" && !seen.has(obj)) {
      seen.add(obj);
      if (obj instanceof ArrayBuffer) {
        buffers.push(obj);
      } else if (ArrayBuffer.isView(obj)) {
        buffers.push(obj.buffer);
      } else if (Array.isArray(obj)) {
        obj.forEach(traverse);
      } else {
        Object.values(obj).forEach(traverse);
      }
    }
  }
  traverse(ctx);
  return buffers;
}
function newArray(n, initFunction) {
  return new Array(n).fill(null).map((_, i) => initFunction(i));
}
class FreeList {
  constructor({
    // Allocate a new item with the given args
    allocate,
    // Dispose of an item (optional, if GC is enough)
    dispose,
    // Check if an existing item in the list is valid for the given args,
    // allowing you to store heterogeneous items in the list.
    valid
  }) {
    this.items = [];
    this.allocate = allocate;
    this.dispose = dispose;
    this.valid = valid;
  }
  // Allocate a new item from the free list, first checking if a existing item
  // on the freelist is valid for the given args.
  alloc(args) {
    while (true) {
      const item = this.items.pop();
      if (!item) {
        break;
      }
      if (this.valid(item, args)) {
        return item;
      }
      if (this.dispose) {
        this.dispose(item);
      }
    }
    return this.allocate(args);
  }
  free(item) {
    this.items.push(item);
  }
  disposeAll() {
    let item;
    item = this.items.pop();
    while (item) {
      if (this.dispose) {
        this.dispose(item);
      }
      item = this.items.pop();
    }
  }
}
function setPackedSplat(packedSplats, index, x, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) {
  const uR = floatToUint8(r);
  const uG = floatToUint8(g);
  const uB = floatToUint8(b);
  const uA = floatToUint8(opacity);
  const uQuat = encodeQuatOctXy88R8(
    new THREE.Quaternion(quatX, quatY, quatZ, quatW)
  );
  const uQuatX = uQuat & 255;
  const uQuatY = uQuat >>> 8 & 255;
  const uQuatZ = uQuat >>> 16 & 255;
  const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(
    255,
    Math.max(
      1,
      Math.round((Math.log(scaleX) - LN_SCALE_MIN) / LN_RESCALE) + 1
    )
  );
  const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(
    255,
    Math.max(
      1,
      Math.round((Math.log(scaleY) - LN_SCALE_MIN) / LN_RESCALE) + 1
    )
  );
  const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(
    255,
    Math.max(
      1,
      Math.round((Math.log(scaleZ) - LN_SCALE_MIN) / LN_RESCALE) + 1
    )
  );
  const uCenterX = toHalf(x);
  const uCenterY = toHalf(y);
  const uCenterZ = toHalf(z);
  const i4 = index * 4;
  packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;
  packedSplats[i4 + 1] = uCenterX | uCenterY << 16;
  packedSplats[i4 + 2] = uCenterZ | uQuatX << 16 | uQuatY << 24;
  packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | uQuatZ << 24;
}
function setPackedSplatCenter(packedSplats, index, x, y, z) {
  const uCenterX = toHalf(x);
  const uCenterY = toHalf(y);
  const uCenterZ = toHalf(z);
  const i4 = index * 4;
  packedSplats[i4 + 1] = uCenterX | uCenterY << 16;
  packedSplats[i4 + 2] = uCenterZ | packedSplats[i4 + 2] & 4294901760;
}
function setPackedSplatScales(packedSplats, index, scaleX, scaleY, scaleZ) {
  const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(
    255,
    Math.max(
      1,
      Math.round((Math.log(scaleX) - LN_SCALE_MIN) / LN_RESCALE) + 1
    )
  );
  const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(
    255,
    Math.max(
      1,
      Math.round((Math.log(scaleY) - LN_SCALE_MIN) / LN_RESCALE) + 1
    )
  );
  const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(
    255,
    Math.max(
      1,
      Math.round((Math.log(scaleZ) - LN_SCALE_MIN) / LN_RESCALE) + 1
    )
  );
  const i4 = index * 4;
  packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | packedSplats[i4 + 3] & 4278190080;
}
function setPackedSplatQuat(packedSplats, index, quatX, quatY, quatZ, quatW) {
  const uQuat = encodeQuatOctXy88R8(
    new THREE.Quaternion(quatX, quatY, quatZ, quatW)
  );
  const uQuatX = uQuat & 255;
  const uQuatY = uQuat >>> 8 & 255;
  const uQuatZ = uQuat >>> 16 & 255;
  const i4 = index * 4;
  packedSplats[i4 + 2] = packedSplats[i4 + 2] & 65535 | uQuatX << 16 | uQuatY << 24;
  packedSplats[i4 + 3] = packedSplats[i4 + 3] & 16777215 | uQuatZ << 24;
}
function setPackedSplatRgba(packedSplats, index, r, g, b, a) {
  const uR = floatToUint8(r);
  const uG = floatToUint8(g);
  const uB = floatToUint8(b);
  const uA = floatToUint8(a);
  const i4 = index * 4;
  packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;
}
function setPackedSplatRgb(packedSplats, index, r, g, b) {
  const uR = floatToUint8(r);
  const uG = floatToUint8(g);
  const uB = floatToUint8(b);
  const i4 = index * 4;
  packedSplats[i4] = uR | uG << 8 | uB << 16 | packedSplats[i4] & 4278190080;
}
function setPackedSplatOpacity(packedSplats, index, opacity) {
  const uA = floatToUint8(opacity);
  const i4 = index * 4;
  packedSplats[i4] = packedSplats[i4] & 16777215 | uA << 24;
}
const packedCenter = new THREE.Vector3();
const packedScales = new THREE.Vector3();
const packedQuaternion = new THREE.Quaternion();
const packedColor = new THREE.Color();
const packedFields = {
  center: packedCenter,
  scales: packedScales,
  quaternion: packedQuaternion,
  color: packedColor,
  opacity: 0
};
function unpackSplat(packedSplats, index) {
  const result = packedFields;
  const i4 = index * 4;
  const word0 = packedSplats[i4];
  const word1 = packedSplats[i4 + 1];
  const word2 = packedSplats[i4 + 2];
  const word3 = packedSplats[i4 + 3];
  result.color.set(
    (word0 & 255) / 255,
    (word0 >>> 8 & 255) / 255,
    (word0 >>> 16 & 255) / 255
  );
  result.opacity = (word0 >>> 24 & 255) / 255;
  result.center.set(
    fromHalf(word1 & 65535),
    fromHalf(word1 >>> 16 & 65535),
    fromHalf(word2 & 65535)
  );
  const uScalesX = word3 & 255;
  result.scales.x = uScalesX === 0 ? 0 : Math.exp(LN_SCALE_MIN + (uScalesX - 1) * LN_RESCALE);
  const uScalesY = word3 >>> 8 & 255;
  result.scales.y = uScalesY === 0 ? 0 : Math.exp(LN_SCALE_MIN + (uScalesY - 1) * LN_RESCALE);
  const uScalesZ = word3 >>> 16 & 255;
  result.scales.z = uScalesZ === 0 ? 0 : Math.exp(LN_SCALE_MIN + (uScalesZ - 1) * LN_RESCALE);
  const uQuat = word2 >>> 16 & 65535 | word3 >>> 8 & 16711680;
  decodeQuatOctXy88R8(uQuat, result.quaternion);
  return result;
}
function getTextureSize(numSplats) {
  const width = SPLAT_TEX_WIDTH;
  const height = Math.max(
    SPLAT_TEX_MIN_HEIGHT,
    Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))
  );
  const depth = Math.ceil(numSplats / (width * height));
  const maxSplats = width * height * depth;
  return { width, height, depth, maxSplats };
}
function computeMaxSplats(numSplats) {
  const width = SPLAT_TEX_WIDTH;
  const height = Math.max(
    SPLAT_TEX_MIN_HEIGHT,
    Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))
  );
  const depth = Math.ceil(numSplats / (width * height));
  return width * height * depth;
}
function isMobile() {
  if (navigator.maxTouchPoints > 0) {
    return true;
  }
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/.test(
    navigator.userAgent
  );
}
function isAndroid() {
  return /Android/.test(navigator.userAgent);
}
function isOculus() {
  return /Oculus/.test(navigator.userAgent);
}
function flipPixels(pixels, width, height) {
  const tempLine = new Uint8Array(width * 4);
  for (let y = 0; y < height / 2; y++) {
    const topOffset = y * width * 4;
    const bottomOffset = (height - 1 - y) * width * 4;
    tempLine.set(pixels.subarray(topOffset, topOffset + width * 4));
    pixels.set(
      pixels.subarray(bottomOffset, bottomOffset + width * 4),
      topOffset
    );
    pixels.set(tempLine, bottomOffset);
  }
  return pixels;
}
function pixelsToPngUrl(pixels, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Can't get 2d context");
  }
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}
function cloneClock(clock) {
  const newClock = new THREE.Clock(clock.autoStart);
  newClock.startTime = clock.startTime;
  newClock.oldTime = clock.oldTime;
  newClock.elapsedTime = clock.elapsedTime;
  newClock.running = clock.running;
  return newClock;
}
function omitUndefined(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== void 0)
  );
}
const IDENT_VERTEX_SHADER = unindent(`
  precision highp float;

  in vec3 position;

  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`);
function averagePositions(positions) {
  const sum = new THREE.Vector3();
  for (const position of positions) {
    sum.add(position);
  }
  return sum.divideScalar(positions.length);
}
function averageQuaternions(quaternions) {
  if (quaternions.length === 0) {
    return new THREE.Quaternion();
  }
  const sum = quaternions[0].clone();
  for (let i = 1; i < quaternions.length; i++) {
    if (quaternions[i].dot(quaternions[0]) < 0) {
      sum.x -= quaternions[i].x;
      sum.y -= quaternions[i].y;
      sum.z -= quaternions[i].z;
      sum.w -= quaternions[i].w;
    } else {
      sum.x += quaternions[i].x;
      sum.y += quaternions[i].y;
      sum.z += quaternions[i].z;
      sum.w += quaternions[i].w;
    }
  }
  return sum.normalize();
}
function coinciDist(matrix1, matrix2) {
  const origin1 = new THREE.Vector3(0, 0, 0).applyMatrix4(matrix1);
  const origin2 = new THREE.Vector3(0, 0, 0).applyMatrix4(matrix2);
  const direction1 = new THREE.Vector3(0, 0, -1).applyMatrix4(matrix1).sub(origin1).normalize();
  const direction2 = new THREE.Vector3(0, 0, -1).applyMatrix4(matrix2).sub(origin2).normalize();
  const distance2 = origin1.distanceTo(origin2);
  const coincidence = direction1.dot(direction2);
  return { distance: distance2, coincidence };
}
function withinDist({
  matrix1,
  matrix2,
  maxDistance
}) {
  const origin1 = new THREE.Vector3(0, 0, 0).applyMatrix4(matrix1);
  const origin2 = new THREE.Vector3(0, 0, 0).applyMatrix4(matrix2);
  return origin1.distanceTo(origin2) <= maxDistance;
}
function withinCoinciDist({
  matrix1,
  matrix2,
  maxDistance,
  minCoincidence
}) {
  const { distance: distance2, coincidence } = coinciDist(matrix1, matrix2);
  return distance2 <= maxDistance && (minCoincidence == null || coincidence >= minCoincidence);
}
function coorientDist(matrix1, matrix2) {
  const [origin1, rotate1] = [new THREE.Vector3(), new THREE.Quaternion()];
  const [origin2, rotate2] = [new THREE.Vector3(), new THREE.Quaternion()];
  matrix1.decompose(origin1, rotate1, new THREE.Vector3());
  matrix2.decompose(origin2, rotate2, new THREE.Vector3());
  const distance2 = origin1.distanceTo(origin2);
  const coorient = Math.abs(rotate1.dot(rotate2));
  return { distance: distance2, coorient };
}
function withinCoorientDist({
  matrix1,
  matrix2,
  maxDistance,
  minCoorient
}) {
  const { distance: distance2, coorient } = coorientDist(matrix1, matrix2);
  return distance2 <= maxDistance && (minCoorient == null || coorient >= minCoorient);
}
function epsilonSign(value, epsilon = 1e-3) {
  if (Math.abs(value) < epsilon) {
    return 0;
  }
  return Math.sign(value);
}
function encodeQuatXyz888(q) {
  const negQuat = q.w < 0;
  const iQuatX = floatToSint8(negQuat ? -q.x : q.x);
  const iQuatY = floatToSint8(negQuat ? -q.y : q.y);
  const iQuatZ = floatToSint8(negQuat ? -q.z : q.z);
  const uQuatX = iQuatX & 255;
  const uQuatY = iQuatY & 255;
  const uQuatZ = iQuatZ & 255;
  return uQuatX | uQuatY << 8 | uQuatZ << 16;
}
function decodeQuatXyz888(encoded, out) {
  const iQuatX = encoded << 24 >> 24;
  const iQuatY = encoded << 16 >> 24;
  const iQuatZ = encoded << 8 >> 24;
  out.set(iQuatX / 127, iQuatY / 127, iQuatZ / 127, 0);
  const dotSelf = out.x * out.x + out.y * out.y + out.z * out.z;
  out.w = Math.sqrt(Math.max(0, 1 - dotSelf));
  return out;
}
function encodeQuatOctXy88R8(q) {
  const qnorm = q.clone().normalize();
  if (qnorm.w < 0) {
    qnorm.set(-qnorm.x, -qnorm.y, -qnorm.z, -qnorm.w);
  }
  const theta = 2 * Math.acos(qnorm.w);
  const xyz_norm = Math.sqrt(
    qnorm.x * qnorm.x + qnorm.y * qnorm.y + qnorm.z * qnorm.z
  );
  const axis = xyz_norm < 1e-6 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(qnorm.x, qnorm.y, qnorm.z).divideScalar(xyz_norm);
  const sum = Math.abs(axis.x) + Math.abs(axis.y) + Math.abs(axis.z);
  let p_x = axis.x / sum;
  let p_y = axis.y / sum;
  if (axis.z < 0) {
    const tmp = p_x;
    p_x = (1 - Math.abs(p_y)) * (p_x >= 0 ? 1 : -1);
    p_y = (1 - Math.abs(tmp)) * (p_y >= 0 ? 1 : -1);
  }
  const u_f = p_x * 0.5 + 0.5;
  const v_f = p_y * 0.5 + 0.5;
  const quantU = Math.round(u_f * 255);
  const quantV = Math.round(v_f * 255);
  const angleInt = Math.round(theta * (255 / Math.PI));
  return angleInt << 16 | quantV << 8 | quantU;
}
function decodeQuatOctXy88R8(encoded, out) {
  const quantU = encoded & 255;
  const quantV = encoded >>> 8 & 255;
  const angleInt = encoded >>> 16 & 255;
  const u_f = quantU / 255;
  const v_f = quantV / 255;
  let f_x = (u_f - 0.5) * 2;
  let f_y = (v_f - 0.5) * 2;
  const f_z = 1 - (Math.abs(f_x) + Math.abs(f_y));
  const t = Math.max(-f_z, 0);
  f_x += f_x >= 0 ? -t : t;
  f_y += f_y >= 0 ? -t : t;
  const axis = new THREE.Vector3(f_x, f_y, f_z).normalize();
  const theta = angleInt / 255 * Math.PI;
  const halfTheta = theta * 0.5;
  const s = Math.sin(halfTheta);
  const w = Math.cos(halfTheta);
  out.set(axis.x * s, axis.y * s, axis.z * s, w);
  return out;
}
function encodeQuatEulerXyz888(q) {
  const qNorm = q.clone().normalize();
  const sinr_cosp = 2 * (qNorm.w * qNorm.x + qNorm.y * qNorm.z);
  const cosr_cosp = 1 - 2 * (qNorm.x * qNorm.x + qNorm.y * qNorm.y);
  const roll = Math.atan2(sinr_cosp, cosr_cosp);
  const sinp = 2 * (qNorm.w * qNorm.y - qNorm.z * qNorm.x);
  const pitch = Math.abs(sinp) >= 1 ? Math.sign(sinp) * (Math.PI / 2) : Math.asin(sinp);
  const siny_cosp = 2 * (qNorm.w * qNorm.z + qNorm.x * qNorm.y);
  const cosy_cosp = 1 - 2 * (qNorm.y * qNorm.y + qNorm.z * qNorm.z);
  const yaw = Math.atan2(siny_cosp, cosy_cosp);
  const normRoll = (roll + Math.PI) / (2 * Math.PI);
  const normPitch = (pitch + Math.PI) / (2 * Math.PI);
  const normYaw = (yaw + Math.PI) / (2 * Math.PI);
  const rollQ = Math.round(normRoll * 255);
  const pitchQ = Math.round(normPitch * 255);
  const yawQ = Math.round(normYaw * 255);
  return yawQ << 16 | pitchQ << 8 | rollQ;
}
function decodeQuatEulerXyz888(encoded, out) {
  const rollQ = encoded & 255;
  const pitchQ = encoded >>> 8 & 255;
  const yawQ = encoded >>> 16 & 255;
  const normRoll = rollQ / 255;
  const normPitch = pitchQ / 255;
  const normYaw = yawQ / 255;
  const roll = normRoll * (2 * Math.PI) - Math.PI;
  const pitch = normPitch * (2 * Math.PI) - Math.PI;
  const yaw = normYaw * (2 * Math.PI) - Math.PI;
  const cr = Math.cos(roll * 0.5);
  const sr = Math.sin(roll * 0.5);
  const cp = Math.cos(pitch * 0.5);
  const sp = Math.sin(pitch * 0.5);
  const cy = Math.cos(yaw * 0.5);
  const sy = Math.sin(yaw * 0.5);
  out.w = cr * cp * cy + sr * sp * sy;
  out.x = sr * cp * cy - cr * sp * sy;
  out.y = cr * sp * cy + sr * cp * sy;
  out.z = cr * cp * sy - sr * sp * cy;
  out.normalize();
  return out;
}
function packSint8Bytes(b0, b1, b22, b3) {
  const clampedB0 = Math.max(-127, Math.min(127, b0 * 127));
  const clampedB1 = Math.max(-127, Math.min(127, b1 * 127));
  const clampedB2 = Math.max(-127, Math.min(127, b22 * 127));
  const clampedB3 = Math.max(-127, Math.min(127, b3 * 127));
  return clampedB0 & 255 | (clampedB1 & 255) << 8 | (clampedB2 & 255) << 16 | (clampedB3 & 255) << 24;
}
function encodeSh1Rgb(sh1Array, index, sh1Rgb) {
  const base = index * 2;
  for (let i = 0; i < 9; ++i) {
    const value = Math.max(-63, Math.min(63, sh1Rgb[i] * 63)) & 127;
    const bitStart = i * 7;
    const bitEnd = bitStart + 7;
    const wordStart = Math.floor(bitStart / 32);
    const bitOffset = bitStart - wordStart * 32;
    const firstWord = value << bitOffset & 4294967295;
    sh1Array[base + wordStart] |= firstWord;
    if (bitEnd > wordStart * 32 + 32) {
      const secondWord = value >>> 32 - bitOffset & 4294967295;
      sh1Array[base + wordStart + 1] |= secondWord;
    }
  }
}
function encodeSh2Rgb(sh2Array, index, sh2Rgb) {
  sh2Array[index * 4 + 0] = packSint8Bytes(
    sh2Rgb[0],
    sh2Rgb[1],
    sh2Rgb[2],
    sh2Rgb[3]
  );
  sh2Array[index * 4 + 1] = packSint8Bytes(
    sh2Rgb[4],
    sh2Rgb[5],
    sh2Rgb[6],
    sh2Rgb[7]
  );
  sh2Array[index * 4 + 2] = packSint8Bytes(
    sh2Rgb[8],
    sh2Rgb[9],
    sh2Rgb[10],
    sh2Rgb[11]
  );
  sh2Array[index * 4 + 3] = packSint8Bytes(
    sh2Rgb[12],
    sh2Rgb[13],
    sh2Rgb[14],
    0
  );
}
function encodeSh3Rgb(sh3Array, index, sh3Rgb) {
  const base = index * 4;
  for (let i = 0; i < 21; ++i) {
    const value = Math.max(-31, Math.min(31, sh3Rgb[i] * 31)) & 63;
    const bitStart = i * 6;
    const bitEnd = bitStart + 6;
    const wordStart = Math.floor(bitStart / 32);
    const bitOffset = bitStart - wordStart * 32;
    const firstWord = value << bitOffset & 4294967295;
    sh3Array[base + wordStart] |= firstWord;
    if (bitEnd > wordStart * 32 + 32) {
      const secondWord = value >>> 32 - bitOffset & 4294967295;
      sh3Array[base + wordStart + 1] |= secondWord;
    }
  }
}
function decompressPartialGzip(fileBytes, numBytes) {
  const chunks = [];
  let totalBytes = 0;
  let result = null;
  const gunzip = new Gunzip((data, final) => {
    chunks.push(data);
    totalBytes += data.length;
    if (final || totalBytes >= numBytes) {
      const allBytes = new Uint8Array(totalBytes);
      let offset2 = 0;
      for (const chunk of chunks) {
        allBytes.set(chunk, offset2);
        offset2 += chunk.length;
      }
      result = allBytes.slice(0, numBytes);
    }
  });
  const CHUNK_SIZE = 1024;
  let offset = 0;
  while (result == null && offset < fileBytes.length) {
    const chunk = fileBytes.slice(offset, offset + CHUNK_SIZE);
    gunzip.push(chunk, false);
    offset += CHUNK_SIZE;
  }
  if (result == null) {
    gunzip.push(new Uint8Array(), true);
    if (result == null) {
      throw new Error("Failed to decompress partial gzip");
    }
  }
  return result;
}
class GunzipReader {
  constructor({
    fileBytes,
    chunkBytes = 64 * 1024
  }) {
    this.fileBytes = fileBytes;
    this.chunkBytes = chunkBytes;
    this.offset = 0;
    this.chunks = [];
    this.totalBytes = 0;
    this.gunzip = new Gunzip((chunk, _final) => {
      this.chunks.push(chunk);
      this.totalBytes += chunk.length;
    });
  }
  read(numBytes) {
    while (this.totalBytes < numBytes && this.offset < this.fileBytes.length) {
      const end = Math.min(
        this.offset + this.chunkBytes,
        this.fileBytes.length
      );
      this.gunzip.push(this.fileBytes.subarray(this.offset, end), false);
      this.offset = end;
    }
    if (this.totalBytes < numBytes && this.offset >= this.fileBytes.length) {
      this.gunzip.push(new Uint8Array(0), true);
    }
    if (this.totalBytes < numBytes) {
      throw new Error(
        `Unexpected EOF: needed ${numBytes}, got ${this.totalBytes}`
      );
    }
    const allBytes = new Uint8Array(this.totalBytes);
    let outOffset = 0;
    for (const chunk of this.chunks) {
      allBytes.set(chunk, outOffset);
      outOffset += chunk.length;
    }
    const result = allBytes.subarray(0, numBytes);
    this.chunks = [allBytes.subarray(numBytes)];
    this.totalBytes -= numBytes;
    return result;
  }
}
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DataCache,
  FreeList,
  GunzipReader,
  IDENT_VERTEX_SHADER,
  Sint8ToFloat,
  Uint8ToFloat,
  averagePositions,
  averageQuaternions,
  cloneClock,
  coinciDist,
  computeMaxSplats,
  coorientDist,
  decodeQuatEulerXyz888,
  decodeQuatOctXy88R8,
  decodeQuatXyz888,
  decompressPartialGzip,
  encodeQuatEulerXyz888,
  encodeQuatOctXy88R8,
  encodeQuatXyz888,
  encodeSh1Rgb,
  encodeSh2Rgb,
  encodeSh3Rgb,
  epsilonSign,
  flipPixels,
  floatBitsToUint: floatBitsToUint$1,
  floatToSint8,
  floatToUint8,
  fromHalf,
  getArrayBuffers,
  getTextureSize,
  isAndroid,
  isMobile,
  isOculus,
  mapFilterObject,
  mapObject,
  newArray,
  omitUndefined,
  pixelsToPngUrl,
  setPackedSplat,
  setPackedSplatCenter,
  setPackedSplatOpacity,
  setPackedSplatQuat,
  setPackedSplatRgb,
  setPackedSplatRgba,
  setPackedSplatScales,
  toHalf,
  uintBitsToFloat: uintBitsToFloat$1,
  unpackSplat,
  withinCoinciDist,
  withinCoorientDist,
  withinDist
}, Symbol.toStringTag, { value: "Module" }));
class DynoProgram {
  constructor({
    graph,
    inputs,
    outputs,
    template
  }) {
    this.graph = graph;
    this.template = template;
    this.inputs = inputs ?? {};
    this.outputs = outputs ?? {};
    const compile = new Compilation({ indent: this.template.indent });
    for (const key in this.outputs) {
      if (this.outputs[key]) {
        compile.declares.add(this.outputs[key]);
      }
    }
    const statements = graph.compile({
      inputs: this.inputs,
      outputs: this.outputs,
      compile
    });
    this.shader = template.generate({ globals: compile.globals, statements });
    this.uniforms = compile.uniforms;
    this.updaters = compile.updaters;
  }
  prepareMaterial() {
    return getMaterial(this);
  }
  update() {
    for (const updater of this.updaters) {
      updater();
    }
  }
}
class DynoProgramTemplate {
  constructor(template) {
    const globals = template.match(/^([ \t]*)\{\{\s*GLOBALS\s*\}\}/m);
    const statements = template.match(/^([ \t]*)\{\{\s*STATEMENTS\s*\}\}/m);
    if (!globals || !statements) {
      throw new Error(
        "Template must contain {{ GLOBALS }} and {{ STATEMENTS }}"
      );
    }
    this.before = template.substring(0, globals.index);
    this.between = template.substring(
      globals.index + globals[0].length,
      statements.index
    );
    this.after = template.substring(
      statements.index + statements[0].length
    );
    this.indent = statements[1];
  }
  generate({
    globals,
    statements
  }) {
    return this.before + Array.from(globals).join("\n\n") + this.between + statements.map((s) => this.indent + s).join("\n") + this.after;
  }
}
const programMaterial = /* @__PURE__ */ new Map();
function getMaterial(program) {
  let material = programMaterial.get(program);
  if (material) {
    return material;
  }
  material = new THREE.RawShaderMaterial({
    glslVersion: THREE.GLSL3,
    vertexShader: IDENT_VERTEX_SHADER,
    fragmentShader: program.shader,
    uniforms: program.uniforms
  });
  programMaterial.set(program, material);
  return material;
}
function addOutputType(a, b, operation = "add") {
  const error = () => {
    throw new Error(`Invalid ${operation} types: ${a}, ${b}`);
  };
  if (a === b) return a;
  if (a === "int") {
    if (isIntType(b)) return b;
    error();
  }
  if (b === "int") {
    if (isIntType(a)) return a;
    error();
  }
  if (a === "uint") {
    if (isUintType(b)) return b;
    error();
  }
  if (b === "uint") {
    if (isUintType(a)) return a;
    error();
  }
  if (a === "float") {
    if (isAllFloatType(b)) return b;
    error();
  }
  if (b === "float") {
    if (isAllFloatType(a)) return a;
    error();
  }
  throw new Error(`Invalid ${operation} types: ${a}, ${b}`);
}
function subOutputType(a, b) {
  return addOutputType(a, b, "sub");
}
function mulOutputType(a, b) {
  const error = () => {
    throw new Error(`Invalid mul types: ${a}, ${b}`);
  };
  const result = (value) => value;
  if (a === "int") {
    if (isIntType(b)) return result(b);
    error();
  }
  if (b === "int") {
    if (isIntType(a)) return result(a);
    error();
  }
  if (a === "uint") {
    if (isUintType(b)) return result(b);
    error();
  }
  if (b === "uint") {
    if (isUintType(a)) return result(a);
    error();
  }
  if (a === "float") {
    if (isAllFloatType(b)) return result(b);
    error();
  }
  if (b === "float") {
    if (isAllFloatType(a)) return result(a);
    error();
  }
  if (isIntType(a) || isUintType(a) || isIntType(b) || isUintType(b)) {
    if (a === b) return result(a);
    error();
  }
  if (a === "vec2") {
    if (b === "vec2" || isMat2(b)) return result("vec2");
    if (b === "mat3x2") return result("vec3");
    if (b === "mat4x2") return result("vec4");
    error();
  }
  if (a === "vec3") {
    if (b === "mat2x3") return result("vec2");
    if (b === "vec3" || isMat3(b)) return result("vec3");
    if (b === "mat4x3") return result("vec4");
    error();
  }
  if (a === "vec4") {
    if (b === "mat2x4") return result("vec2");
    if (b === "mat3x4") return result("vec3");
    if (b === "vec4" || isMat4(b)) return result("vec4");
    error();
  }
  if (b === "vec2") {
    if (isMat2(a)) return result("vec2");
    if (a === "mat2x3") return result("vec3");
    if (a === "mat2x4") return result("vec4");
    error();
  }
  if (b === "vec3") {
    if (a === "mat3x2") return result("vec2");
    if (isMat3(a)) return result("vec3");
    if (a === "mat3x4") return result("vec4");
    error();
  }
  if (b === "vec4") {
    if (a === "mat4x2") return result("vec2");
    if (a === "mat4x3") return result("vec3");
    if (isMat4(a)) return result("vec4");
    error();
  }
  if (isMat2(a)) {
    if (isMat2(b)) return result("mat2");
    if (b === "mat3x2") return result("mat3x2");
    if (b === "mat4x2") return result("mat4x2");
    error();
  }
  if (a === "mat2x3") {
    if (isMat2(b)) return result("mat2x3");
    if (b === "mat3x2") return result("mat3");
    if (b === "mat4x2") return result("mat4x3");
    error();
  }
  if (a === "mat2x4") {
    if (isMat2(b)) return result("mat2x4");
    if (b === "mat3x2") return result("mat3x4");
    if (b === "mat4x2") return result("mat4");
    error();
  }
  if (a === "mat3x2") {
    if (b === "mat2x3") return result("mat2");
    if (isMat3(b)) return result("mat3x2");
    if (b === "mat4x3") return result("mat4x2");
    error();
  }
  if (isMat3(a)) {
    if (b === "mat2x3") return result("mat2x3");
    if (isMat3(b)) return result("mat3");
    if (b === "mat4x3") return result("mat4x3");
    error();
  }
  if (a === "mat3x4") {
    if (b === "mat2x3") return result("mat2x4");
    if (isMat3(b)) return result("mat3x4");
    if (b === "mat4x3") return result("mat4");
    error();
  }
  if (a === "mat4x2") {
    if (b === "mat2x4") return result("mat2");
    if (b === "mat3x4") return result("mat3x2");
    if (isMat4(b)) return result("mat4x2");
    error();
  }
  if (a === "mat4x3") {
    if (b === "mat2x4") return result("mat2x3");
    if (b === "mat3x4") return result("mat3");
    if (isMat4(b)) return result("mat4x3");
    error();
  }
  if (isMat4(a)) {
    if (b === "mat2x4") return result("mat2x4");
    if (b === "mat3x4") return result("mat3x4");
    if (isMat4(b)) return result("mat4");
    error();
  }
  throw new Error(`Invalid mul types: ${a}, ${b}`);
}
function divOutputType(a, b) {
  return addOutputType(a, b, "div");
}
function imodOutputType(a, b) {
  if (a === b) return a;
  if (a === "int") {
    if (isIntType(b)) return b;
  } else if (b === "int") {
    if (isIntType(a)) return a;
  } else if (a === "uint") {
    if (isUintType(b)) return b;
  } else if (b === "uint") {
    if (isUintType(a)) return a;
  }
  throw new Error(`Invalid imod types: ${a}, ${b}`);
}
function modOutputType(a, b) {
  if (a === b || b === "float") return a;
  throw new Error(`Invalid mod types: ${a}, ${b}`);
}
function modfOutputType(a) {
  return a;
}
function negOutputType(a) {
  return a;
}
function absOutputType(a) {
  return a;
}
function signOutputType(a) {
  return a;
}
function floorOutputType(a) {
  return a;
}
function ceilOutputType(a) {
  return a;
}
function truncOutputType(a) {
  return a;
}
function roundOutputType(a) {
  return a;
}
function fractOutputType(a) {
  return a;
}
function powOutputType(a) {
  return a;
}
function expOutputType(a) {
  return a;
}
function exp2OutputType(a) {
  return a;
}
function logOutputType(a) {
  return a;
}
function log2OutputType(a) {
  return a;
}
function sqrOutputType(a) {
  return a;
}
function sqrtOutputType(a) {
  return a;
}
function inversesqrtOutputType(a) {
  return a;
}
function minOutputType(a, b, operation = "min") {
  if (a === b) return a;
  if (b === "float") {
    if (isFloatType(a)) return a;
  } else if (b === "int") {
    if (isIntType(a)) return a;
  } else if (b === "uint") {
    if (isUintType(a)) return a;
  }
  throw new Error(`Invalid ${operation} types: ${a}, ${b}`);
}
function maxOutputType(a, b) {
  return minOutputType(a, b, "max");
}
function clampOutputType(a, b, _c) {
  if (b === "float") {
    if (isFloatType(a)) return a;
  } else if (b === "int") {
    if (isIntType(a)) return a;
  } else if (b === "uint") {
    if (isUintType(a)) return a;
  }
  throw new Error(`Invalid clamp types: ${a}, ${b}`);
}
function mixOutputType(a, b, c) {
  if (c === a) return a;
  if (c === "float") return a;
  if (c === "bool" && a === "float") return a;
  if (c === "bvec2" && a === "vec2") return a;
  if (c === "bvec3" && a === "vec3") return a;
  if (c === "bvec4" && a === "vec4") return a;
  throw new Error(`Invalid mix types: ${a}, ${b}, ${c}`);
}
function stepOutputType(a, b) {
  if (a === b || b === "float") return b;
  throw new Error(`Invalid step types: ${a}, ${b}`);
}
function smoothstepOutputType(a, b, c) {
  if (a === b) {
    if (a === c || a === "float") return c;
  }
  throw new Error(`Invalid smoothstep types: ${a}, ${b}, ${c}`);
}
function isNanOutputType(a, operation = "isNan") {
  if (a === "float") return "bool";
  if (a === "vec2") return "bvec2";
  if (a === "vec3") return "bvec3";
  if (a === "vec4") return "bvec4";
  throw new Error(`Invalid ${operation} types: ${a}`);
}
function isInfOutputType(a) {
  return isNanOutputType(a, "isInf");
}
const add = (a, b) => new Add({ a, b });
const sub = (a, b) => new Sub({ a, b });
const mul = (a, b) => new Mul({ a, b });
const div = (a, b) => new Div({ a, b });
const imod = (a, b) => new IMod({ a, b });
const mod = (a, b) => new Mod({ a, b });
const modf = (a) => new Modf({ a }).outputs;
const neg = (a) => new Neg({ a });
const abs = (a) => new Abs({ a });
const sign = (a) => new Sign({ a });
const floor = (a) => new Floor({ a });
const ceil = (a) => new Ceil({ a });
const trunc = (a) => new Trunc({ a });
const round = (a) => new Round({ a });
const fract = (a) => new Fract({ a });
const pow = (a, b) => new Pow({ a, b });
const exp = (a) => new Exp({ a });
const exp2 = (a) => new Exp2({ a });
const log = (a) => new Log({ a });
const log2 = (a) => new Log2({ a });
const sqr = (a) => new Sqr({ a });
const sqrt = (a) => new Sqrt({ a });
const inversesqrt = (a) => new InverseSqrt({ a });
const min = (a, b) => new Min({ a, b });
const max = (a, b) => new Max({ a, b });
const clamp = (a, min2, max2) => new Clamp({ a, min: min2, max: max2 });
const mix = (a, b, t) => new Mix({ a, b, t });
const step = (edge, x) => new Step({ edge, x });
const smoothstep = (edge0, edge1, x) => new Smoothstep({ edge0, edge1, x });
const isNan = (a) => new IsNan({ a });
const isInf = (a) => new IsInf({ a });
class Add extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "sum", outTypeFunc: addOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.sum} = ${inputs.a} + ${inputs.b};`];
    };
  }
}
class Sub extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "difference", outTypeFunc: subOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.difference} = ${inputs.a} - ${inputs.b};`];
    };
  }
}
class Mul extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "product", outTypeFunc: mulOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.product} = ${inputs.a} * ${inputs.b};`];
    };
  }
}
class Div extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "quotient", outTypeFunc: divOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.quotient} = ${inputs.a} / ${inputs.b};`];
    };
  }
}
class IMod extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "remainder", outTypeFunc: imodOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.remainder} = ${inputs.a} % ${inputs.b};`];
    };
  }
}
class Mod extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "remainder", outTypeFunc: modOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.remainder} = mod(${inputs.a}, ${inputs.b});`];
    };
  }
}
class Modf extends Dyno {
  constructor({ a }) {
    const inTypes = { a: valType(a) };
    const outType = modfOutputType(inTypes.a);
    const outTypes = {
      fract: outType,
      integer: outType
    };
    super({ inTypes, outTypes, inputs: { a } });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.fract} = modf(${inputs.a}, ${outputs.integer});`];
    };
  }
}
class Neg extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "neg", outTypeFunc: negOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.neg} = -${inputs.a};`];
    };
  }
}
class Abs extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "abs", outTypeFunc: absOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.abs} = abs(${inputs.a});`];
    };
  }
}
class Sign extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "sign", outTypeFunc: signOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.sign} = sign(${inputs.a});`];
    };
  }
}
class Floor extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "floor", outTypeFunc: floorOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.floor} = floor(${inputs.a});`];
    };
  }
}
class Ceil extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "ceil", outTypeFunc: ceilOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.ceil} = ceil(${inputs.a});`];
    };
  }
}
class Trunc extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "trunc", outTypeFunc: truncOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.trunc} = trunc(${inputs.a});`];
    };
  }
}
class Round extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "round", outTypeFunc: roundOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.round} = round(${inputs.a});`];
    };
  }
}
class Fract extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "fract", outTypeFunc: fractOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.fract} = fract(${inputs.a});`];
    };
  }
}
class Pow extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "power", outTypeFunc: powOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.power} = pow(${inputs.a}, ${inputs.b});`];
    };
  }
}
class Exp extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "exp", outTypeFunc: expOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.exp} = exp(${inputs.a});`];
    };
  }
}
class Exp2 extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "exp2", outTypeFunc: exp2OutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.exp2} = exp2(${inputs.a});`];
    };
  }
}
class Log extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "log", outTypeFunc: logOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.log} = log(${inputs.a});`];
    };
  }
}
class Log2 extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "log2", outTypeFunc: log2OutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.log2} = log2(${inputs.a});`];
    };
  }
}
class Sqr extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "sqr", outTypeFunc: sqrOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.sqr} = ${inputs.a} * ${inputs.a};`];
    };
  }
}
class Sqrt extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "sqrt", outTypeFunc: sqrtOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.sqrt} = sqrt(${inputs.a});`];
    };
  }
}
class InverseSqrt extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "inversesqrt", outTypeFunc: inversesqrtOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.inversesqrt} = inversesqrt(${inputs.a});`];
    };
  }
}
class Min extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "min", outTypeFunc: minOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.min} = min(${inputs.a}, ${inputs.b});`];
    };
  }
}
class Max extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "max", outTypeFunc: maxOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.max} = max(${inputs.a}, ${inputs.b});`];
    };
  }
}
class Clamp extends TrinaryOp {
  constructor({
    a,
    min: min2,
    max: max2
  }) {
    super({
      a,
      b: min2,
      c: max2,
      outKey: "clamp",
      outTypeFunc: clampOutputType
    });
    this.statements = ({ inputs, outputs }) => {
      const { a: a2, b: min3, c: max3 } = inputs;
      return [`${outputs.clamp} = clamp(${a2}, ${min3}, ${max3});`];
    };
  }
}
class Mix extends TrinaryOp {
  constructor({ a, b, t }) {
    super({ a, b, c: t, outKey: "mix", outTypeFunc: mixOutputType });
    this.statements = ({ inputs, outputs }) => {
      const { a: a2, b: b22, c: t2 } = inputs;
      return [`${outputs.mix} = mix(${a2}, ${b22}, ${t2});`];
    };
  }
}
class Step extends BinaryOp {
  constructor({ edge, x }) {
    super({
      a: edge,
      b: x,
      outKey: "step",
      outTypeFunc: stepOutputType
    });
    this.statements = ({ inputs, outputs }) => {
      const { a: edge2, b: x2 } = inputs;
      return [`${outputs.step} = step(${edge2}, ${x2});`];
    };
  }
}
class Smoothstep extends TrinaryOp {
  constructor({
    edge0,
    edge1,
    x
  }) {
    super({
      a: edge0,
      b: edge1,
      c: x,
      outKey: "smoothstep",
      outTypeFunc: smoothstepOutputType
    });
    this.statements = ({ inputs, outputs }) => {
      const { a: edge02, b: edge12, c: x2 } = inputs;
      return [`${outputs.smoothstep} = smoothstep(${edge02}, ${edge12}, ${x2});`];
    };
  }
}
class IsNan extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "isNan", outTypeFunc: isNanOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.isNan} = isNan(${inputs.a});`];
    };
  }
}
class IsInf extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "isInf", outTypeFunc: isInfOutputType });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.isInf} = isInf(${inputs.a});`];
    };
  }
}
const and = (a, b) => new And({ a, b });
const or = (a, b) => new Or({ a, b });
const xor = (a, b) => new Xor({ a, b });
const not = (a) => new Not({ a });
const lessThan = (a, b) => new LessThan({ a, b });
const lessThanEqual = (a, b) => new LessThanEqual({ a, b });
const greaterThan = (a, b) => new GreaterThan({ a, b });
const greaterThanEqual = (a, b) => new GreaterThanEqual({ a, b });
const equal = (a, b) => new Equal({ a, b });
const notEqual = (a, b) => new NotEqual({ a, b });
const any = (a) => new Any({ a });
const all = (a) => new All({ a });
const select = (cond, t, f) => new Select({ cond, t, f });
const compXor = (a) => new CompXor({ a });
class And extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outTypeFunc: (aType, bType) => aType, outKey: "and" });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.and === "bool") {
        return [`${outputs.and} = ${inputs.a} && ${inputs.b};`];
      }
      return [`${outputs.and} = ${inputs.a} & ${inputs.b};`];
    };
  }
}
class Or extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outTypeFunc: (aType, bType) => aType, outKey: "or" });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.or === "bool") {
        return [`${outputs.or} = ${inputs.a} || ${inputs.b};`];
      }
      return [`${outputs.or} = ${inputs.a} | ${inputs.b};`];
    };
  }
}
class Xor extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outTypeFunc: (aType, bType) => aType, outKey: "xor" });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.xor === "bool") {
        return [`${outputs.xor} = ${inputs.a} ^^ ${inputs.b};`];
      }
      return [`${outputs.xor} = ${inputs.a} ^ ${inputs.b};`];
    };
  }
}
class Not extends UnaryOp {
  constructor({ a }) {
    super({ a, outTypeFunc: (aType) => aType, outKey: "not" });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.not === "bool") {
        return [`${outputs.not} = !${inputs.a};`];
      }
      return [`${outputs.not} = not(${inputs.a});`];
    };
  }
}
class LessThan extends BinaryOp {
  constructor({ a, b }) {
    super({
      a,
      b,
      outTypeFunc: (aType, bType) => compareOutputType(aType, "lessThan"),
      outKey: "lessThan"
    });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.lessThan === "bool") {
        return [`${outputs.lessThan} = ${inputs.a} < ${inputs.b};`];
      }
      return [`${outputs.lessThan} = lessThan(${inputs.a}, ${inputs.b});`];
    };
  }
}
class LessThanEqual extends BinaryOp {
  constructor({ a, b }) {
    super({
      a,
      b,
      outTypeFunc: (aType, bType) => compareOutputType(aType, "lessThanEqual"),
      outKey: "lessThanEqual"
    });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.lessThanEqual === "bool") {
        return [`${outputs.lessThanEqual} = ${inputs.a} <= ${inputs.b};`];
      }
      return [
        `${outputs.lessThanEqual} = lessThanEqual(${inputs.a}, ${inputs.b});`
      ];
    };
  }
}
class GreaterThan extends BinaryOp {
  constructor({ a, b }) {
    super({
      a,
      b,
      outTypeFunc: (aType, bType) => compareOutputType(aType, "greaterThan"),
      outKey: "greaterThan"
    });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.greaterThan === "bool") {
        return [`${outputs.greaterThan} = ${inputs.a} > ${inputs.b};`];
      }
      return [
        `${outputs.greaterThan} = greaterThan(${inputs.a}, ${inputs.b});`
      ];
    };
  }
}
class GreaterThanEqual extends BinaryOp {
  constructor({ a, b }) {
    super({
      a,
      b,
      outTypeFunc: (aType, bType) => compareOutputType(aType, "greaterThanEqual"),
      outKey: "greaterThanEqual"
    });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.greaterThanEqual === "bool") {
        return [`${outputs.greaterThanEqual} = ${inputs.a} >= ${inputs.b};`];
      }
      return [
        `${outputs.greaterThanEqual} = greaterThanEqual(${inputs.a}, ${inputs.b});`
      ];
    };
  }
}
class Equal extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outTypeFunc: equalOutputType, outKey: "equal" });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.equal === "bool") {
        return [`${outputs.equal} = ${inputs.a} == ${inputs.b};`];
      }
      return [`${outputs.equal} = equal(${inputs.a}, ${inputs.b});`];
    };
  }
}
class NotEqual extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outTypeFunc: notEqualOutputType, outKey: "notEqual" });
    this.statements = ({ inputs, outputs }) => {
      if (this.outTypes.notEqual === "bool") {
        return [`${outputs.notEqual} = ${inputs.a} != ${inputs.b};`];
      }
      return [`${outputs.notEqual} = notEqual(${inputs.a}, ${inputs.b});`];
    };
  }
}
class Any extends UnaryOp {
  constructor({ a }) {
    super({ a, outTypeFunc: (aType) => "bool", outKey: "any" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.any} = any(${inputs.a});`];
    };
  }
}
class All extends UnaryOp {
  constructor({ a }) {
    super({ a, outTypeFunc: (aType) => "bool", outKey: "all" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.all} = all(${inputs.a});`];
    };
  }
}
class Select extends TrinaryOp {
  constructor({
    cond,
    t,
    f
  }) {
    super({
      a: cond,
      b: t,
      c: f,
      outKey: "select",
      outTypeFunc: (aType, bType, cType) => bType
    });
    this.statements = ({ inputs, outputs }) => {
      const { a: cond2, b: t2, c: f2 } = inputs;
      return [`${outputs.select} = (${cond2}) ? (${t2}) : (${f2});`];
    };
  }
}
function compareOutputType(type, operator) {
  if (isScalarType(type)) {
    return "bool";
  }
  if (type === "ivec2" || type === "uvec2" || type === "vec2") {
    return "bvec2";
  }
  if (type === "ivec3" || type === "uvec3" || type === "vec3") {
    return "bvec3";
  }
  if (type === "ivec4" || type === "uvec4" || type === "vec4") {
    return "bvec4";
  }
  throw new Error(`Invalid ${operator} type: ${type}`);
}
function equalOutputType(type, operator = "equal") {
  if (isScalarType(type)) {
    return "bool";
  }
  if (isBoolType(type)) {
    return type;
  }
  if (type === "ivec2" || type === "uvec2" || type === "vec2") {
    return "bvec2";
  }
  if (type === "ivec3" || type === "uvec3" || type === "vec3") {
    return "bvec3";
  }
  if (type === "ivec4" || type === "uvec4" || type === "vec4") {
    return "bvec4";
  }
  throw new Error(`Invalid ${operator} type: ${type}`);
}
function notEqualOutputType(type) {
  return equalOutputType(type, "notEqual");
}
function compXorOutputType(type) {
  if (isBoolType(type)) {
    return "bool";
  }
  if (isIntType(type)) {
    return "int";
  }
  if (isUintType(type)) {
    return "uint";
  }
  throw new Error(`Invalid compXor type: ${type}`);
}
class CompXor extends UnaryOp {
  constructor({ a }) {
    const outType = compXorOutputType(valType(a));
    super({ a, outTypeFunc: (aType) => outType, outKey: "compXor" });
    this.statements = ({ inputs, outputs }) => {
      if (isScalarType(this.outTypes.compXor)) {
        return [`${outputs.compXor} = ${inputs.a};`];
      }
      const components = isVector2Type(outType) ? ["x", "y"] : isVector3Type(outType) ? ["x", "y", "z"] : ["x", "y", "z", "w"];
      const operands = components.map((c) => `${inputs.a}.${c}`);
      const operator = isBoolType(outType) ? "^^" : "^";
      return [`${outputs.compXor} = ${operands.join(` ${operator} `)};`];
    };
  }
}
const bool = (value) => new Bool({ value });
const int = (value) => new Int({ value });
const uint = (value) => new Uint({ value });
const float = (value) => new Float({ value });
const bvec2 = (value) => new BVec2({ value });
const bvec3 = (value) => new BVec3({ value });
const bvec4 = (value) => new BVec4({ value });
const ivec2 = (value) => new IVec2({ value });
const ivec3 = (value) => new IVec3({ value });
const ivec4 = (value) => new IVec4({ value });
const uvec2 = (value) => new UVec2({ value });
const uvec3 = (value) => new UVec3({ value });
const uvec4 = (value) => new UVec4({ value });
const vec2 = (value) => new Vec2({ value });
const vec3 = (value) => new Vec3({ value });
const vec4 = (value) => new Vec4({ value });
const mat2 = (value) => new Mat2({ value });
const mat3 = (value) => new Mat3({ value });
const mat4 = (value) => new Mat4({ value });
const floatBitsToInt = (value) => new FloatBitsToInt({ value });
const floatBitsToUint = (value) => new FloatBitsToUint({ value });
const intBitsToFloat = (value) => new IntBitsToFloat({ value });
const uintBitsToFloat = (value) => new UintBitsToFloat({ value });
const packSnorm2x16 = (value) => new PackSnorm2x16({ value });
const unpackSnorm2x16 = (value) => new UnpackSnorm2x16({ value });
const packUnorm2x16 = (value) => new PackUnorm2x16({ value });
const unpackUnorm2x16 = (value) => new UnpackUnorm2x16({ value });
const packHalf2x16 = (value) => new PackHalf2x16({ value });
const unpackHalf2x16 = (value) => new UnpackHalf2x16({ value });
const uintToRgba8 = (value) => new UintToRgba8({ value });
class SimpleCast extends UnaryOp {
  constructor({
    value,
    outType,
    outKey
  }) {
    super({ a: value, outTypeFunc: () => outType, outKey });
    this.statements = ({ inputs, outputs }) => [
      `${outputs[outKey]} = ${typeLiteral(outType)}(${inputs.a});`
    ];
  }
}
class Bool extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "bool", outKey: "bool" });
  }
}
class Int extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "int", outKey: "int" });
  }
}
class Uint extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "uint", outKey: "uint" });
  }
}
class Float extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "float", outKey: "float" });
  }
}
class BVec2 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "bvec2", outKey: "bvec2" });
  }
}
class BVec3 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "bvec3", outKey: "bvec3" });
  }
}
class BVec4 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "bvec4", outKey: "bvec4" });
  }
}
class IVec2 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "ivec2", outKey: "ivec2" });
  }
}
class IVec3 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "ivec3", outKey: "ivec3" });
  }
}
class IVec4 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "ivec4", outKey: "ivec4" });
  }
}
class UVec2 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "uvec2", outKey: "uvec2" });
  }
}
class UVec3 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "uvec3", outKey: "uvec3" });
  }
}
class UVec4 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "uvec4", outKey: "uvec4" });
  }
}
class Vec2 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "vec2", outKey: "vec2" });
  }
}
class Vec3 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "vec3", outKey: "vec3" });
  }
}
class Vec4 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "vec4", outKey: "vec4" });
  }
}
class Mat2 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "mat2", outKey: "mat2" });
  }
}
class Mat3 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "mat3", outKey: "mat3" });
  }
}
class Mat4 extends SimpleCast {
  constructor({
    value
  }) {
    super({ value, outType: "mat4", outKey: "mat4" });
  }
}
class FloatBitsToInt extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "int", outTypeFunc: () => "int" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.int} = floatBitsToInt(${inputs.a});`];
    };
  }
}
class FloatBitsToUint extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "uint", outTypeFunc: () => "uint" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.uint} = floatBitsToUint(${inputs.a});`];
    };
  }
}
class IntBitsToFloat extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "float", outTypeFunc: () => "float" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.float} = intBitsToFloat(${inputs.a});`];
    };
  }
}
class UintBitsToFloat extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "float", outTypeFunc: () => "float" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.float} = uintBitsToFloat(${inputs.a});`];
    };
  }
}
class PackSnorm2x16 extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "uint", outTypeFunc: () => "uint" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.uint} = packSnorm2x16(${inputs.a});`];
    };
  }
}
class UnpackSnorm2x16 extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "vec2", outTypeFunc: () => "vec2" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.vec2} = unpackSnorm2x16(${inputs.a});`];
    };
  }
}
class PackUnorm2x16 extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "uint", outTypeFunc: () => "uint" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.uint} = packUnorm2x16(${inputs.a});`];
    };
  }
}
class UnpackUnorm2x16 extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "vec2", outTypeFunc: () => "vec2" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.vec2} = unpackUnorm2x16(${inputs.a});`];
    };
  }
}
class PackHalf2x16 extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "uint", outTypeFunc: () => "uint" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.uint} = packHalf2x16(${inputs.a});`];
    };
  }
}
class UnpackHalf2x16 extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "vec2", outTypeFunc: () => "vec2" });
    this.statements = ({ inputs, outputs }) => {
      return [`${outputs.vec2} = unpackHalf2x16(${inputs.a});`];
    };
  }
}
class UintToRgba8 extends UnaryOp {
  constructor({ value }) {
    super({ a: value, outKey: "rgba8", outTypeFunc: () => "vec4" });
    this.statements = ({ inputs, outputs }) => {
      return [
        `uvec4 uRgba = uvec4(${inputs.a} & 0xffu, (${inputs.a} >> 8u) & 0xffu, (${inputs.a} >> 16u) & 0xffu, (${inputs.a} >> 24u) & 0xffu);`,
        `${outputs.rgba8} = vec4(uRgba) / 255.0;`
      ];
    };
  }
}
const length = (a) => new Length({ a });
const distance = (a, b) => new Distance({ a, b });
const dot = (a, b) => new Dot({ a, b });
const cross = (a, b) => new Cross({ a, b });
const normalize = (a) => new Normalize({ a });
const faceforward = (a, b, c) => new FaceForward({ a, b, c });
const reflectVec = (incident, normal) => new ReflectVec({ incident, normal });
const refractVec = (incident, normal, eta) => new RefractVec({ incident, normal, eta });
const split = (vector) => new Split({ vector });
const combine = ({
  vector,
  vectorType,
  x,
  y,
  z,
  w,
  r,
  g,
  b,
  a
}) => new Combine({ vector, vectorType, x, y, z, w, r, g, b, a });
const projectH = (a) => new ProjectH({ a });
const extendVec = (a, b) => new ExtendVec({ a, b });
const swizzle = (a, select2) => new Swizzle({ vector: a, select: select2 });
const compMult = (a, b) => new CompMult({ a, b });
const outer = (a, b) => new Outer({ a, b });
const transpose = (a) => new Transpose({ a });
const determinant = (a) => new Determinant({ a });
const inverse = (a) => new Inverse({ a });
class Length extends UnaryOp {
  constructor({ a }) {
    super({ a, outTypeFunc: (aType) => "float", outKey: "length" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.length} = length(${inputs.a});`
    ];
  }
}
class Distance extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "distance", outTypeFunc: (aType, bType) => "float" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.distance} = distance(${inputs.a}, ${inputs.b});`
    ];
  }
}
class Dot extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "dot", outTypeFunc: (aType, bType) => "float" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.dot} = dot(${inputs.a}, ${inputs.b});`
    ];
  }
}
class Cross extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "cross", outTypeFunc: (aType, bType) => "vec3" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.cross} = cross(${inputs.a}, ${inputs.b});`
    ];
  }
}
class Normalize extends UnaryOp {
  constructor({ a }) {
    super({ a, outTypeFunc: (aType) => aType, outKey: "normalize" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.normalize} = normalize(${inputs.a});`
    ];
  }
}
function projectHOutputType(type) {
  if (type === "vec3") {
    return "vec2";
  }
  if (type === "vec4") {
    return "vec3";
  }
  throw new Error("Invalid type");
}
class ProjectH extends UnaryOp {
  constructor({ a }) {
    super({
      a,
      outTypeFunc: (aType) => projectHOutputType(aType),
      outKey: "projected"
    });
    this.statements = ({ inputs, outputs }) => {
      if (this.inTypes.a === "vec3") {
        return [`${outputs.projected} = ${inputs.a}.xy / ${inputs.a}.z;`];
      }
      if (this.inTypes.a === "vec4") {
        return [`${outputs.projected} = ${inputs.a}.xyz / ${inputs.a}.w;`];
      }
      throw new Error("Invalid type");
    };
  }
}
function extendVecOutputType(type) {
  if (type === "float") return "vec2";
  if (type === "vec2") return "vec3";
  if (type === "vec3") return "vec4";
  throw new Error("Invalid type");
}
class ExtendVec extends BinaryOp {
  constructor({ a, b }) {
    const type = valType(a);
    const outType = extendVecOutputType(type);
    super({ a, b, outKey: "extend", outTypeFunc: () => outType });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.extend} = ${outType}(${inputs.a}, ${inputs.b});`
    ];
  }
}
class FaceForward extends TrinaryOp {
  constructor({ a, b, c }) {
    super({
      a,
      b,
      c,
      outKey: "forward",
      outTypeFunc: (aType, bType, cType) => aType
    });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.forward} = faceforward(${inputs.a}, ${inputs.b}, ${inputs.c});`
    ];
  }
}
class ReflectVec extends BinaryOp {
  constructor({
    incident,
    normal
  }) {
    super({
      a: incident,
      b: normal,
      outKey: "reflection",
      outTypeFunc: (aType, bType) => aType
    });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.reflection} = reflect(${inputs.a}, ${inputs.b});`
    ];
  }
}
class RefractVec extends TrinaryOp {
  constructor({
    incident,
    normal,
    eta
  }) {
    super({
      a: incident,
      b: normal,
      c: eta,
      outKey: "refraction",
      outTypeFunc: (aType, bType, cType) => aType
    });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.refraction} = refract(${inputs.a}, ${inputs.b}, ${inputs.c});`
    ];
  }
}
class CompMult extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "product", outTypeFunc: (aType, bType) => aType });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.product} = matrixCompMult(${a}, ${b});`
    ];
  }
}
function outerOutputType(aType, bType) {
  if (aType === "vec2") {
    if (bType === "vec2") return "mat2";
    if (bType === "vec3") return "mat3x2";
    if (bType === "vec4") return "mat4x2";
  }
  if (aType === "vec3") {
    if (bType === "vec2") return "mat2x3";
    if (bType === "vec3") return "mat3";
    if (bType === "vec4") return "mat4x3";
  }
  if (aType === "vec4") {
    if (bType === "vec2") return "mat2x4";
    if (bType === "vec3") return "mat3x4";
    if (bType === "vec4") return "mat4";
  }
  throw new Error(`Invalid outer type: ${aType}, ${bType}`);
}
class Outer extends BinaryOp {
  constructor({ a, b }) {
    super({ a, b, outKey: "outer", outTypeFunc: outerOutputType });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.outer} = outerProduct(${inputs.a}, ${inputs.b});`
    ];
  }
}
function transposeOutputType(type) {
  if (type === "mat2") return "mat2";
  if (type === "mat3") return "mat3";
  if (type === "mat4") return "mat4";
  if (type === "mat2x2") return "mat2x2";
  if (type === "mat2x3") return "mat3x2";
  if (type === "mat2x4") return "mat4x2";
  if (type === "mat3x2") return "mat2x3";
  if (type === "mat3x3") return "mat3x3";
  if (type === "mat3x4") return "mat4x3";
  if (type === "mat4x2") return "mat2x4";
  if (type === "mat4x3") return "mat3x4";
  if (type === "mat4x4") return "mat4x4";
  throw new Error(`Invalid transpose type: ${type}`);
}
class Transpose extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "transpose", outTypeFunc: transposeOutputType });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.transpose} = transpose(${inputs.a});`
    ];
  }
}
class Determinant extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "det", outTypeFunc: (aType) => "float" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.det} = determinant(${inputs.a});`
    ];
  }
}
class Inverse extends UnaryOp {
  constructor({ a }) {
    super({ a, outKey: "inverse", outTypeFunc: (aType) => aType });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.inverse} = inverse(${a});`
    ];
  }
}
function splitOutTypes(type) {
  const result = (value) => value;
  switch (type) {
    case "vec2":
      return result({ x: "float", y: "float", r: "float", g: "float" });
    case "vec3":
      return result({
        x: "float",
        y: "float",
        z: "float",
        r: "float",
        g: "float",
        b: "float"
      });
    case "vec4":
      return result({
        x: "float",
        y: "float",
        z: "float",
        w: "float",
        r: "float",
        g: "float",
        b: "float",
        a: "float"
      });
    case "ivec2":
      return result({ x: "int", y: "int", r: "int", g: "int" });
    case "ivec3":
      return result({
        x: "int",
        y: "int",
        z: "int",
        r: "int",
        g: "int",
        b: "int"
      });
    case "ivec4":
      return result({
        x: "int",
        y: "int",
        z: "int",
        w: "int",
        r: "int",
        g: "int",
        b: "int",
        a: "int"
      });
    case "uvec2":
      return result({ x: "uint", y: "uint", r: "uint", g: "uint" });
    case "uvec3":
      return result({
        x: "uint",
        y: "uint",
        z: "uint",
        r: "uint",
        g: "uint",
        b: "uint"
      });
    case "uvec4":
      return result({
        x: "uint",
        y: "uint",
        z: "uint",
        w: "uint",
        r: "uint",
        g: "uint",
        b: "uint",
        a: "uint"
      });
    default:
      throw new Error(`Invalid vector type: ${type}`);
  }
}
class Split extends Dyno {
  constructor({ vector }) {
    const type = valType(vector);
    const inTypes = { vector: type };
    const outTypes = splitOutTypes(inTypes.vector);
    super({ inTypes, outTypes, inputs: { vector } });
    this.statements = ({ inputs, outputs }) => {
      const { x, y, z, w, r, g, b, a } = outputs;
      const { vector: vector2 } = inputs;
      return [
        x ? `${x} = ${vector2}.x;` : null,
        y ? `${y} = ${vector2}.y;` : null,
        z ? `${z} = ${vector2}.z;` : null,
        w ? `${w} = ${vector2}.w;` : null,
        r ? `${r} = ${vector2}.r;` : null,
        g ? `${g} = ${vector2}.g;` : null,
        b ? `${b} = ${vector2}.b;` : null,
        a ? `${a} = ${vector2}.a;` : null
      ].filter(Boolean);
    };
  }
}
class Combine extends Dyno {
  constructor({
    vector,
    vectorType,
    x,
    y,
    z,
    w,
    r,
    g,
    b,
    a
  }) {
    if (!vector && !vectorType) {
      throw new Error("Either vector or vectorType must be provided");
    }
    const vType = vectorType ?? valType(vector);
    const elType = vectorElementType(vType);
    const dim = vectorDim(vType);
    const inTypes = {
      vector: vType,
      x: elType,
      y: elType,
      r: elType,
      g: elType
    };
    const inputs = { vector, x, y, r, g };
    if (dim >= 3) {
      Object.assign(inTypes, { z: elType, b: elType });
      Object.assign(inputs, { z, b });
    }
    if (dim >= 4) {
      Object.assign(inTypes, { w: elType, a: elType });
      Object.assign(inputs, { w, a });
    }
    super({ inTypes, outTypes: { vector: vType }, inputs });
    this.statements = ({ inputs: inputs2, outputs }) => {
      const { vector: vector2 } = outputs;
      const {
        vector: input,
        x: x2,
        y: y2,
        z: z2,
        w: w2,
        r: r2,
        g: g2,
        b: b22,
        a: a2
      } = inputs2;
      const statements = [
        `${vector2}.x = ${x2 ?? r2 ?? (input ? `${input}.x` : literalZero(elType))};`,
        `${vector2}.y = ${y2 ?? g2 ?? (input ? `${input}.y` : literalZero(elType))};`
      ];
      if (dim >= 3)
        statements.push(
          `${vector2}.z = ${z2 ?? b22 ?? (input ? `${input}.z` : literalZero(elType))};`
        );
      if (dim >= 4)
        statements.push(
          `${vector2}.w = ${w2 ?? a2 ?? (input ? `${input}.w` : literalZero(elType))};`
        );
      return statements;
    };
  }
  dynoOut() {
    return new DynoOutput(
      this,
      "vector"
    );
  }
}
function swizzleOutputType(type, swizzle2) {
  let result = null;
  if (isFloatType(type)) {
    result = swizzle2.length === 1 ? "float" : swizzle2.length === 2 ? "vec2" : swizzle2.length === 3 ? "vec3" : swizzle2.length === 4 ? "vec4" : null;
  } else if (isIntType(type)) {
    result = swizzle2.length === 1 ? "int" : swizzle2.length === 2 ? "ivec2" : swizzle2.length === 3 ? "ivec3" : swizzle2.length === 4 ? "ivec4" : null;
  } else if (isUintType(type)) {
    result = swizzle2.length === 1 ? "uint" : swizzle2.length === 2 ? "uvec2" : swizzle2.length === 3 ? "uvec3" : swizzle2.length === 4 ? "uvec4" : null;
  }
  if (result == null) {
    throw new Error(`Invalid swizzle: ${swizzle2}`);
  }
  return result;
}
class Swizzle extends UnaryOp {
  constructor({ vector, select: select2 }) {
    super({
      a: vector,
      outKey: "swizzle",
      outTypeFunc: (aType) => swizzleOutputType(aType, select2)
    });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.swizzle} = ${inputs.a}.${select2};`
    ];
  }
}
const remapIndex = (index, from, to) => {
  return new DynoRemapIndex({ index, from, to });
};
const pcgMix = (value) => {
  return new PcgMix({ value });
};
const pcgNext = (state) => {
  return new PcgNext({ state });
};
const pcgHash = (state) => {
  return new PcgHash({ state });
};
const hash = (value) => {
  return new Hash({ value });
};
const hash2 = (value) => {
  return new Hash2({ value });
};
const hash3 = (value) => {
  return new Hash3({ value });
};
const hash4 = (value) => {
  return new Hash4({ value });
};
const hashFloat = (value) => {
  return new HashFloat({ value });
};
const hashVec2 = (value) => {
  return new HashVec2({ value });
};
const hashVec3 = (value) => {
  return new HashVec3({ value });
};
const hashVec4 = (value) => {
  return new HashVec4({ value });
};
const normalizedDepth = (z, zNear, zFar) => {
  return new NormalizedDepth({ z, zNear, zFar }).outputs.depth;
};
class DynoRemapIndex extends Dyno {
  constructor({
    from,
    to,
    index
  }) {
    super({
      inTypes: { from: "int", to: "int", index: "int" },
      outTypes: { index: "int" },
      inputs: { from, to, index },
      statements: ({ inputs, outputs }) => {
        return [
          `${outputs.index} = ${inputs.index} - ${inputs.from} + ${inputs.to};`
        ];
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "index");
  }
}
class PcgNext extends Dyno {
  constructor({ state }) {
    const type = valType(state);
    super({
      inTypes: { state: type },
      outTypes: { state: "uint" },
      inputs: { state },
      globals: () => [
        unindent(`
          uint pcg_next(uint state) {
            return state * 747796405u + 2891336453u;
          }
        `)
      ],
      statements: ({ inputs, outputs }) => {
        const toUint = type === "uint" ? `${inputs.state}` : type === "int" ? `uint(${inputs.state})` : `floatBitsToUint(${inputs.state})`;
        return [`${outputs.state} = pcg_next(${toUint});`];
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "state");
  }
}
class PcgHash extends Dyno {
  constructor({ state }) {
    super({
      inTypes: { state: "uint" },
      outTypes: { hash: "uint" },
      inputs: { state },
      globals: () => [
        unindent(`
          uint pcg_hash(uint state) {
            uint hash = ((state >> ((state >> 28u) + 4u)) ^ state) * 277803737u;
            return (hash >> 22u) ^ hash;
          }
        `)
      ],
      statements: ({ inputs, outputs }) => [
        `${outputs.hash} = pcg_hash(${inputs.state});`
      ]
    });
  }
  dynoOut() {
    return new DynoOutput(this, "hash");
  }
}
class PcgMix extends Dyno {
  constructor({ value }) {
    const type = valType(value);
    const tempType = sameSizeUvec(type);
    super({
      inTypes: { value: type },
      outTypes: { state: "uint" },
      inputs: { value },
      globals: () => [
        unindent(`
          uint pcg_mix(uint value) {
            return value;
          }
          uint pcg_mix(uvec2 value) {
            return value.x + 0x9e3779b9u * value.y;
          }
          uint pcg_mix(uvec3 value) {
            return value.x + 0x9e3779b9u * value.y + 0x85ebca6bu * value.z;
          }
          uint pcg_mix(uvec4 value) {
            return value.x + 0x9e3779b9u * value.y + 0x85ebca6bu * value.z + 0xc2b2ae35u * value.w;
          }
        `)
      ],
      statements: ({ inputs, outputs }) => {
        const toUvec = isUintType(type) ? `${inputs.value}` : isIntType(type) ? `${tempType}(${inputs.value})` : `floatBitsToUint(${inputs.value})`;
        return [
          `${tempType} bits = ${toUvec};`,
          `${outputs.state} = pcg_mix(bits);`
        ];
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "state");
  }
}
class Hash extends DynoBlock {
  constructor({ value }) {
    super({
      inTypes: { value: valType(value) },
      outTypes: { hash: "uint" },
      inputs: { value },
      construct: ({ value: value2 }) => {
        if (!value2) {
          throw new Error("value is required");
        }
        let state = new PcgMix({ value: value2 }).outputs.state;
        state = new PcgNext({ state }).outputs.state;
        return new PcgHash({ state }).outputs;
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "hash");
  }
}
class Hash2 extends DynoBlock {
  constructor({ value }) {
    super({
      inTypes: { value: valType(value) },
      outTypes: { hash: "uvec2" },
      inputs: { value },
      construct: ({ value: value2 }) => {
        if (!value2) {
          throw new Error("value is required");
        }
        let state = new PcgMix({ value: value2 }).outputs.state;
        state = new PcgNext({ state }).outputs.state;
        const x = new PcgHash({ state }).outputs.hash;
        state = new PcgNext({ state }).outputs.state;
        const y = new PcgHash({ state }).outputs.hash;
        return { hash: combine({ vectorType: "uvec2", x, y }) };
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "hash");
  }
}
class Hash3 extends DynoBlock {
  constructor({ value }) {
    super({
      inTypes: { value: valType(value) },
      outTypes: { hash: "uvec3" },
      inputs: { value },
      construct: ({ value: value2 }) => {
        if (!value2) {
          throw new Error("value is required");
        }
        let state = new PcgMix({ value: value2 }).outputs.state;
        state = new PcgNext({ state }).outputs.state;
        const x = new PcgHash({ state }).outputs.hash;
        state = new PcgNext({ state }).outputs.state;
        const y = new PcgHash({ state }).outputs.hash;
        state = new PcgNext({ state }).outputs.state;
        const z = new PcgHash({ state }).outputs.hash;
        return { hash: combine({ vectorType: "uvec3", x, y, z }) };
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "hash");
  }
}
class Hash4 extends DynoBlock {
  constructor({ value }) {
    super({
      inTypes: { value: valType(value) },
      outTypes: { hash: "uvec4" },
      inputs: { value },
      construct: ({ value: value2 }) => {
        if (!value2) {
          throw new Error("value is required");
        }
        let state = new PcgMix({ value: value2 }).outputs.state;
        state = new PcgNext({ state }).outputs.state;
        const x = new PcgHash({ state }).outputs.hash;
        state = new PcgNext({ state }).outputs.state;
        const y = new PcgHash({ state }).outputs.hash;
        state = new PcgNext({ state }).outputs.state;
        const z = new PcgHash({ state }).outputs.hash;
        state = new PcgNext({ state }).outputs.state;
        const w = new PcgHash({ state }).outputs.hash;
        return { hash: combine({ vectorType: "uvec4", x, y, z, w }) };
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "hash");
  }
}
class HashFloat extends DynoBlock {
  constructor({ value }) {
    super({
      inTypes: { value: valType(value) },
      outTypes: { hash: "float" },
      inputs: { value },
      construct: ({ value: value2 }) => {
        if (!value2) {
          throw new Error("value is required");
        }
        const word = hash(value2);
        return { hash: mul(float(word), dynoConst("float", 1 / 2 ** 32)) };
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "hash");
  }
}
class HashVec2 extends DynoBlock {
  constructor({ value }) {
    super({
      inTypes: { value: valType(value) },
      outTypes: { hash: "vec2" },
      inputs: { value },
      construct: ({ value: value2 }) => {
        if (!value2) {
          throw new Error("value is required");
        }
        const words = hash2(value2);
        return { hash: mul(vec2(words), dynoConst("float", 1 / 2 ** 32)) };
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "hash");
  }
}
class HashVec3 extends DynoBlock {
  constructor({ value }) {
    super({
      inTypes: { value: valType(value) },
      outTypes: { hash: "vec3" },
      inputs: { value },
      construct: ({ value: value2 }) => {
        if (!value2) {
          throw new Error("value is required");
        }
        const words = hash3(value2);
        return { hash: mul(vec3(words), dynoConst("float", 1 / 2 ** 32)) };
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "hash");
  }
}
class HashVec4 extends DynoBlock {
  constructor({ value }) {
    super({
      inTypes: { value: valType(value) },
      outTypes: { hash: "vec4" },
      inputs: { value },
      construct: ({ value: value2 }) => {
        if (!value2) {
          throw new Error("value is required");
        }
        const words = hash4(value2);
        return { hash: mul(vec4(words), dynoConst("float", 1 / 2 ** 32)) };
      }
    });
  }
  dynoOut() {
    return new DynoOutput(this, "hash");
  }
}
class NormalizedDepth extends Dyno {
  constructor({
    z,
    zNear,
    zFar
  }) {
    super({
      inTypes: { z: "float", zNear: "float", zFar: "float" },
      outTypes: { depth: "float" },
      inputs: { z, zNear, zFar },
      statements: ({ inputs, outputs }) => [
        `float clamped = clamp(${inputs.z}, ${inputs.zNear}, ${inputs.zFar});`,
        `${outputs.depth} = (log2(clamped + 1.0) - log2(${inputs.zNear} + 1.0)) / (log2(${inputs.zFar} + 1.0) - log2(${inputs.zNear} + 1.0));`
      ]
    });
  }
  dynoOut() {
    return new DynoOutput(this, "depth");
  }
}
const transformPos = (position, {
  scale,
  scales,
  rotate,
  translate
}) => {
  return new TransformPosition({ position, scale, scales, rotate, translate }).outputs.position;
};
const transformDir = (dir, {
  scale,
  scales,
  rotate
}) => {
  return new TransformDir({ dir, scale, scales, rotate }).outputs.dir;
};
const transformQuat = (quaternion, { rotate }) => {
  return new TransformQuaternion({ quaternion, rotate }).outputs.quaternion;
};
class TransformPosition extends Dyno {
  constructor({
    position,
    scale,
    scales,
    rotate,
    translate
  }) {
    super({
      inTypes: {
        position: "vec3",
        scale: "float",
        scales: "vec3",
        rotate: "vec4",
        translate: "vec3"
      },
      outTypes: { position: "vec3" },
      inputs: { position, scale, scales, rotate, translate },
      statements: ({ inputs, outputs }) => {
        const { position: position2 } = outputs;
        if (!position2) {
          return [];
        }
        const { scale: scale2, scales: scales2, rotate: rotate2, translate: translate2 } = inputs;
        return [
          `${position2} = ${inputs.position ?? "vec3(0.0, 0.0, 0.0)"};`,
          !scale2 ? null : `${position2} *= ${scale2};`,
          !scales2 ? null : `${position2} *= ${scales2};`,
          !rotate2 ? null : `${position2} = quatVec(${rotate2}, ${position2});`,
          !translate2 ? null : `${position2} += ${translate2};`
        ].filter(Boolean);
      }
    });
  }
}
class TransformDir extends Dyno {
  constructor({
    dir,
    scale,
    scales,
    rotate
  }) {
    super({
      inTypes: { dir: "vec3", scale: "float", scales: "vec3", rotate: "vec4" },
      outTypes: { dir: "vec3" },
      inputs: { dir, scale, scales, rotate },
      statements: ({ inputs, outputs }) => {
        const { dir: dir2 } = outputs;
        if (!dir2) {
          return [];
        }
        const { scale: scale2, scales: scales2, rotate: rotate2 } = inputs;
        return [
          `${dir2} = ${inputs.dir ?? "vec3(0.0, 0.0, 0.0)"};`,
          !scale2 ? null : `${dir2} *= ${scale2};`,
          !scales2 ? null : `${dir2} *= ${scales2};`,
          !rotate2 ? null : `${dir2} = quatVec(${rotate2}, ${dir2});`
        ].filter(Boolean);
      }
    });
  }
}
class TransformQuaternion extends Dyno {
  constructor({
    quaternion,
    rotate
  }) {
    super({
      inTypes: { quaternion: "vec4", rotate: "vec4" },
      outTypes: { quaternion: "vec4" },
      inputs: { quaternion, rotate },
      statements: ({ inputs, outputs }) => {
        const { quaternion: quaternion2 } = outputs;
        if (!quaternion2) {
          return [];
        }
        return [
          `${quaternion2} = ${inputs.quaternion ?? "vec4(0.0, 0.0, 0.0, 1.0)"};`,
          !rotate ? null : `${quaternion2} = quatQuat(${inputs.rotate}, ${quaternion2});`
        ].filter(Boolean);
      }
    });
  }
}
const dynoIf = () => {
  throw new Error("Not implemented");
};
const dynoSwitch = () => {
  throw new Error("Not implemented");
};
const dynoFor = () => {
  throw new Error("Not implemented");
};
const comment = () => {
  throw new Error("Not implemented");
};
const arrayIndex = () => {
  throw new Error("Not implemented");
};
const arrayLength = () => {
  throw new Error("Not implemented");
};
const textureSize = (texture2, lod) => new TextureSize({ texture: texture2, lod });
const texture = (texture2, coord, bias) => new Texture({ texture: texture2, coord, bias });
const texelFetch = (texture2, coord, lod) => new TexelFetch({ texture: texture2, coord, lod });
class TextureSize extends Dyno {
  constructor({ texture: texture2, lod }) {
    const textureType = valType(texture2);
    super({
      inTypes: { texture: textureType, lod: "int" },
      outTypes: { size: textureSizeType(textureType) },
      inputs: { texture: texture2, lod },
      statements: ({ inputs, outputs }) => [
        `${outputs.size} = textureSize(${inputs.texture}, ${inputs.lod ?? "0"});`
      ]
    });
  }
  dynoOut() {
    return new DynoOutput(this, "size");
  }
}
class Texture extends Dyno {
  constructor({
    texture: texture2,
    coord,
    bias
  }) {
    const textureType = valType(texture2);
    super({
      inTypes: {
        texture: textureType,
        coord: textureCoordType(textureType),
        bias: "float"
      },
      outTypes: { sample: textureReturnType(textureType) },
      inputs: { texture: texture2, coord, bias },
      statements: ({ inputs, outputs }) => [
        `${outputs.sample} = texture(${inputs.texture}, ${inputs.coord}${inputs.bias ? `, ${inputs.bias}` : ""});`
      ]
    });
  }
  dynoOut() {
    return new DynoOutput(this, "sample");
  }
}
class TexelFetch extends Dyno {
  constructor({
    texture: texture2,
    coord,
    lod
  }) {
    const textureType = valType(texture2);
    super({
      inTypes: {
        texture: textureType,
        coord: textureSizeType(textureType),
        lod: "int"
      },
      outTypes: { texel: textureReturnType(textureType) },
      inputs: { texture: texture2, coord, lod },
      statements: ({ inputs, outputs }) => [
        `${outputs.texel} = texelFetch(${inputs.texture}, ${inputs.coord}, ${inputs.lod ?? "0"});`
      ]
    });
  }
  dynoOut() {
    return new DynoOutput(this, "texel");
  }
}
function textureSizeType(textureType) {
  switch (textureType) {
    case "sampler2D":
    case "usampler2D":
    case "isampler2D":
    case "samplerCube":
    case "usamplerCube":
    case "isamplerCube":
    case "sampler2DShadow":
    case "samplerCubeShadow":
      return "ivec2";
    case "sampler3D":
    case "usampler3D":
    case "isampler3D":
    case "sampler2DArray":
    case "usampler2DArray":
    case "isampler2DArray":
    case "sampler2DArrayShadow":
      return "ivec3";
    default:
      throw new Error(`Invalid texture type: ${textureType}`);
  }
}
function textureCoordType(textureType) {
  switch (textureType) {
    case "sampler2D":
    case "usampler2D":
    case "isampler2D":
      return "vec2";
    case "sampler3D":
    case "usampler3D":
    case "isampler3D":
    case "samplerCube":
    case "usamplerCube":
    case "isamplerCube":
    case "sampler2DArray":
    case "usampler2DArray":
    case "isampler2DArray":
    case "sampler2DShadow":
      return "vec3";
    case "samplerCubeShadow":
    case "sampler2DArrayShadow":
      return "vec4";
    default:
      throw new Error(`Invalid texture type: ${textureType}`);
  }
}
function textureReturnType(textureType) {
  switch (textureType) {
    case "sampler2D":
    case "sampler2DArray":
    case "sampler3D":
    case "samplerCube":
    case "sampler2DShadow":
      return "vec4";
    case "usampler2D":
    case "usampler2DArray":
    case "usampler3D":
    case "usamplerCube":
      return "uvec4";
    case "isampler2D":
    case "isampler2DArray":
    case "isampler3D":
    case "isamplerCube":
      return "ivec4";
    case "samplerCubeShadow":
    case "sampler2DArrayShadow":
      return "float";
    default:
      throw new Error(`Invalid texture type: ${textureType}`);
  }
}
const radians = (degrees2) => new Radians({ degrees: degrees2 });
const degrees = (radians2) => new Degrees({ radians: radians2 });
const sin = (radians2) => new Sin({ radians: radians2 });
const cos = (radians2) => new Cos({ radians: radians2 });
const tan = (radians2) => new Tan({ radians: radians2 });
const asin = (sin2) => new Asin({ sin: sin2 });
const acos = (cos2) => new Acos({ cos: cos2 });
const atan = (tan2) => new Atan({ tan: tan2 });
const atan2 = (y, x) => new Atan2({ y, x });
const sinh = (x) => new Sinh({ x });
const cosh = (x) => new Cosh({ x });
const tanh = (x) => new Tanh({ x });
const asinh = (x) => new Asinh({ x });
const acosh = (x) => new Acosh({ x });
const atanh = (x) => new Atanh({ x });
class Radians extends UnaryOp {
  constructor({ degrees: degrees2 }) {
    super({ a: degrees2, outTypeFunc: (aType) => aType, outKey: "radians" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.radians} = radians(${inputs.a});`
    ];
  }
}
class Degrees extends UnaryOp {
  constructor({ radians: radians2 }) {
    super({ a: radians2, outTypeFunc: (aType) => aType, outKey: "degrees" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.degrees} = degrees(${inputs.a});`
    ];
  }
}
class Sin extends UnaryOp {
  constructor({ radians: radians2 }) {
    super({ a: radians2, outTypeFunc: (aType) => aType, outKey: "sin" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.sin} = sin(${inputs.a});`
    ];
  }
}
class Cos extends UnaryOp {
  constructor({ radians: radians2 }) {
    super({ a: radians2, outTypeFunc: (aType) => aType, outKey: "cos" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.cos} = cos(${inputs.a});`
    ];
  }
}
class Tan extends UnaryOp {
  constructor({ radians: radians2 }) {
    super({ a: radians2, outTypeFunc: (aType) => aType, outKey: "tan" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.tan} = tan(${inputs.a});`
    ];
  }
}
class Asin extends UnaryOp {
  constructor({ sin: sin2 }) {
    super({ a: sin2, outTypeFunc: (aType) => aType, outKey: "asin" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.asin} = asin(${inputs.a});`
    ];
  }
}
class Acos extends UnaryOp {
  constructor({ cos: cos2 }) {
    super({ a: cos2, outTypeFunc: (aType) => aType, outKey: "acos" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.acos} = acos(${inputs.a});`
    ];
  }
}
class Atan extends UnaryOp {
  constructor({ tan: tan2 }) {
    super({ a: tan2, outTypeFunc: (aType) => aType, outKey: "atan" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.atan} = atan(${inputs.a});`
    ];
  }
}
class Atan2 extends BinaryOp {
  constructor({ y, x }) {
    super({
      a: y,
      b: x,
      outTypeFunc: (aType, bType) => aType,
      outKey: "atan2"
    });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.atan2} = atan2(${inputs.a}, ${inputs.b});`
    ];
  }
}
class Sinh extends UnaryOp {
  constructor({ x }) {
    super({ a: x, outTypeFunc: (aType) => aType, outKey: "sinh" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.sinh} = sinh(${inputs.a});`
    ];
  }
}
class Cosh extends UnaryOp {
  constructor({ x }) {
    super({ a: x, outTypeFunc: (aType) => aType, outKey: "cosh" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.cosh} = cosh(${inputs.a});`
    ];
  }
}
class Tanh extends UnaryOp {
  constructor({ x }) {
    super({ a: x, outTypeFunc: (aType) => aType, outKey: "tanh" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.tanh} = tanh(${inputs.a});`
    ];
  }
}
class Asinh extends UnaryOp {
  constructor({ x }) {
    super({ a: x, outTypeFunc: (aType) => aType, outKey: "asinh" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.asinh} = asinh(${inputs.a});`
    ];
  }
}
class Acosh extends UnaryOp {
  constructor({ x }) {
    super({ a: x, outTypeFunc: (aType) => aType, outKey: "acosh" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.acosh} = acosh(${inputs.a});`
    ];
  }
}
class Atanh extends UnaryOp {
  constructor({ x }) {
    super({ a: x, outTypeFunc: (aType) => aType, outKey: "atanh" });
    this.statements = ({ inputs, outputs }) => [
      `${outputs.atanh} = atanh(${inputs.a});`
    ];
  }
}
const dyno = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Abs,
  Acos,
  Acosh,
  Add,
  All,
  And,
  Any,
  Asin,
  Asinh,
  Atan,
  Atan2,
  Atanh,
  BVec2,
  BVec3,
  BVec4,
  BinaryOp,
  Bool,
  Ceil,
  Clamp,
  Combine,
  CombineGsplat,
  CompMult,
  CompXor,
  Compilation,
  Cos,
  Cosh,
  Cross,
  Degrees,
  Determinant,
  Distance,
  Div,
  Dot,
  Dyno,
  DynoBlock,
  DynoBool,
  DynoBvec2,
  DynoBvec3,
  DynoBvec4,
  DynoConst,
  DynoFloat,
  DynoInt,
  DynoIsampler2D,
  DynoIsampler2DArray,
  DynoIsampler3D,
  DynoIsamplerCube,
  DynoIvec2,
  DynoIvec3,
  DynoIvec4,
  DynoLiteral,
  DynoMat2,
  DynoMat2x2,
  DynoMat2x3,
  DynoMat2x4,
  DynoMat3,
  DynoMat3x2,
  DynoMat3x3,
  DynoMat3x4,
  DynoMat4,
  DynoMat4x2,
  DynoMat4x3,
  DynoMat4x4,
  DynoOutput,
  DynoProgram,
  DynoProgramTemplate,
  DynoRemapIndex,
  DynoSampler2D,
  DynoSampler2DArray,
  DynoSampler2DArrayShadow,
  DynoSampler2DShadow,
  DynoSampler3D,
  DynoSamplerCube,
  DynoSamplerCubeShadow,
  DynoUint,
  DynoUniform,
  DynoUsampler2D,
  DynoUsampler2DArray,
  DynoUsampler3D,
  DynoUsamplerCube,
  DynoUvec2,
  DynoUvec3,
  DynoUvec4,
  DynoValue,
  DynoVec2,
  DynoVec3,
  DynoVec4,
  Equal,
  Exp,
  Exp2,
  ExtendVec,
  FaceForward,
  Float,
  FloatBitsToInt,
  FloatBitsToUint,
  Floor,
  Fract,
  GreaterThan,
  GreaterThanEqual,
  Gsplat,
  GsplatNormal,
  Hash,
  Hash2,
  Hash3,
  Hash4,
  HashFloat,
  HashVec2,
  HashVec3,
  HashVec4,
  IMod,
  IVec2,
  IVec3,
  IVec4,
  Int,
  IntBitsToFloat,
  Inverse,
  InverseSqrt,
  IsInf,
  IsNan,
  Length,
  LessThan,
  LessThanEqual,
  Log,
  Log2,
  Mat2,
  Mat3,
  Mat4,
  Max,
  Min,
  Mix,
  Mod,
  Modf,
  Mul,
  Neg,
  Normalize,
  NormalizedDepth,
  Not,
  NotEqual,
  NumPackedSplats,
  Or,
  Outer,
  OutputPackedSplat,
  OutputRgba8,
  PackHalf2x16,
  PackSnorm2x16,
  PackUnorm2x16,
  PcgHash,
  PcgMix,
  PcgNext,
  Pow,
  ProjectH,
  Radians,
  ReadPackedSplat,
  ReadPackedSplatRange,
  ReflectVec,
  RefractVec,
  Round,
  Select,
  Sign,
  SimpleCast,
  Sin,
  Sinh,
  Smoothstep,
  Split,
  SplitGsplat,
  Sqr,
  Sqrt,
  Step,
  Sub,
  Swizzle,
  TPackedSplats,
  Tan,
  Tanh,
  TexelFetch,
  Texture,
  TextureSize,
  TransformDir,
  TransformGsplat,
  TransformPosition,
  TransformQuaternion,
  Transpose,
  TrinaryOp,
  Trunc,
  UVec2,
  UVec3,
  UVec4,
  Uint,
  UintBitsToFloat,
  UintToRgba8,
  UnaryOp,
  UnpackHalf2x16,
  UnpackSnorm2x16,
  UnpackUnorm2x16,
  Vec2,
  Vec3,
  Vec4,
  Xor,
  abs,
  acos,
  acosh,
  add,
  all,
  and,
  any,
  arrayIndex,
  arrayLength,
  asin,
  asinh,
  atan,
  atan2,
  atanh,
  bool,
  bvec2,
  bvec3,
  bvec4,
  ceil,
  clamp,
  combine,
  combineGsplat,
  comment,
  compMult,
  compXor,
  cos,
  cosh,
  cross,
  defineGsplat,
  defineGsplatNormal,
  definePackedSplats,
  degrees,
  determinant,
  distance,
  div,
  dot,
  dyno: dyno$1,
  dynoBlock,
  dynoBool,
  dynoBvec2,
  dynoBvec3,
  dynoBvec4,
  dynoConst,
  dynoDeclare,
  dynoFloat,
  dynoFor,
  dynoIf,
  dynoInt,
  dynoIsampler2D,
  dynoIsampler2DArray,
  dynoIsampler3D,
  dynoIsamplerCube,
  dynoIvec2,
  dynoIvec3,
  dynoIvec4,
  dynoLiteral,
  dynoMat2,
  dynoMat2x2,
  dynoMat2x3,
  dynoMat2x4,
  dynoMat3,
  dynoMat3x2,
  dynoMat3x3,
  dynoMat3x4,
  dynoMat4,
  dynoMat4x2,
  dynoMat4x3,
  dynoMat4x4,
  dynoSampler2D,
  dynoSampler2DArray,
  dynoSampler2DArrayShadow,
  dynoSampler2DShadow,
  dynoSampler3D,
  dynoSamplerCube,
  dynoSamplerCubeShadow,
  dynoSwitch,
  dynoUint,
  dynoUsampler2D,
  dynoUsampler2DArray,
  dynoUsampler3D,
  dynoUsamplerCube,
  dynoUvec2,
  dynoUvec3,
  dynoUvec4,
  dynoVec2,
  dynoVec3,
  dynoVec4,
  equal,
  exp,
  exp2,
  extendVec,
  faceforward,
  float,
  floatBitsToInt,
  floatBitsToUint,
  floor,
  fract,
  greaterThan,
  greaterThanEqual,
  gsplatNormal,
  hash,
  hash2,
  hash3,
  hash4,
  hashFloat,
  hashVec2,
  hashVec3,
  hashVec4,
  imod,
  int,
  intBitsToFloat,
  inverse,
  inversesqrt,
  isAllFloatType,
  isBoolType,
  isFloatType,
  isInf,
  isIntType,
  isMat2,
  isMat3,
  isMat4,
  isMatFloatType,
  isNan,
  isScalarType,
  isUintType,
  isVector2Type,
  isVector3Type,
  isVector4Type,
  isVectorType,
  ivec2,
  ivec3,
  ivec4,
  length,
  lessThan,
  lessThanEqual,
  literalNegOne,
  literalOne,
  literalZero,
  log,
  log2,
  mat2,
  mat3,
  mat4,
  max,
  min,
  mix,
  mod,
  modf,
  mul,
  neg,
  normalize,
  normalizedDepth,
  not,
  notEqual,
  numPackedSplats,
  numberAsFloat,
  numberAsInt,
  numberAsUint,
  or,
  outer,
  outputPackedSplat,
  outputRgba8,
  packHalf2x16,
  packSnorm2x16,
  packUnorm2x16,
  pcgHash,
  pcgMix,
  pcgNext,
  pow,
  projectH,
  radians,
  readPackedSplat,
  readPackedSplatRange,
  reflectVec,
  refractVec,
  remapIndex,
  round,
  sameSizeIvec,
  sameSizeUvec,
  sameSizeVec,
  select,
  sign,
  sin,
  sinh,
  smoothstep,
  split,
  splitGsplat,
  sqr,
  sqrt,
  step,
  sub,
  swizzle,
  tan,
  tanh,
  texelFetch,
  texture,
  textureSize,
  transformDir,
  transformGsplat,
  transformPos,
  transformQuat,
  transpose,
  trunc,
  typeLiteral,
  uint,
  uintBitsToFloat,
  uintToRgba8,
  uniform,
  unindent,
  unindentLines,
  unpackHalf2x16,
  unpackSnorm2x16,
  unpackUnorm2x16,
  uvec2,
  uvec3,
  uvec4,
  valType,
  vec2,
  vec3,
  vec4,
  vectorDim,
  vectorElementType,
  xor
}, Symbol.toStringTag, { value: "Module" }));
var computeVec4_default = "precision highp float;\nprecision highp int;\nprecision highp sampler2D;\nprecision highp usampler2D;\nprecision highp isampler2D;\nprecision highp sampler2DArray;\nprecision highp usampler2DArray;\nprecision highp isampler2DArray;\nprecision highp sampler3D;\nprecision highp usampler3D;\nprecision highp isampler3D;\n\n#include <splatDefines>\n\nuniform uint targetLayer;\nuniform int targetBase;\nuniform int targetCount;\n\nout vec4 target;\n\n{{ GLOBALS }}\n\nvoid computeReadback(int index) {\n    {{ STATEMENTS }}\n}\n\nvoid main() {\n    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);\n    int index = targetIndex - targetBase;\n\n    if ((index >= 0) && (index < targetCount)) {\n        computeReadback(index);\n    } else {\n        target = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}";
const _Readback = class _Readback {
  constructor({ renderer } = {}) {
    this.renderer = renderer;
    this.capacity = 0;
    this.count = 0;
  }
  dispose() {
    if (this.target) {
      this.target.dispose();
      this.target = void 0;
    }
  }
  // Ensure we have a buffer large enough for the readback of count indices.
  // Pass in previous bufer of the desired type.
  ensureBuffer(count, buffer) {
    const roundedCount = Math.ceil(Math.max(1, count) / SPLAT_TEX_WIDTH) * SPLAT_TEX_WIDTH;
    const bytes = roundedCount * 4;
    if (buffer.byteLength >= bytes) {
      return buffer;
    }
    const newBuffer = new ArrayBuffer(bytes);
    if (buffer instanceof ArrayBuffer) {
      return newBuffer;
    }
    const ctor = buffer.constructor;
    return new ctor(newBuffer);
  }
  // Ensure our render target is large enough for the readback of capacity indices.
  ensureCapacity(capacity) {
    const { width, height, depth, maxSplats } = getTextureSize(capacity);
    if (!this.target || maxSplats > this.capacity) {
      this.dispose();
      this.capacity = maxSplats;
      this.target = new THREE.WebGLArrayRenderTarget(width, height, depth, {
        depthBuffer: false,
        stencilBuffer: false,
        generateMipmaps: false,
        magFilter: THREE.NearestFilter,
        minFilter: THREE.NearestFilter
      });
      this.target.texture.format = THREE.RGBAFormat;
      this.target.texture.type = THREE.UnsignedByteType;
      this.target.texture.internalFormat = "RGBA8";
      this.target.scissorTest = true;
    }
  }
  // Get a program and THREE.RawShaderMaterial for a given Rgba8Readback,
  // generating it if necessary and caching the result.
  prepareProgramMaterial(reader) {
    let program = _Readback.readbackProgram.get(reader);
    if (!program) {
      const graph = dynoBlock(
        { index: "int" },
        { rgba8: "vec4" },
        ({ index }) => {
          reader.inputs.index = index;
          const rgba8 = new OutputRgba8({ rgba8: reader.outputs.rgba8 });
          return { rgba8 };
        }
      );
      if (!_Readback.programTemplate) {
        _Readback.programTemplate = new DynoProgramTemplate(computeVec4_default);
      }
      program = new DynoProgram({
        graph,
        inputs: { index: "index" },
        outputs: { rgba8: "target" },
        template: _Readback.programTemplate
      });
      Object.assign(program.uniforms, {
        targetLayer: { value: 0 },
        targetBase: { value: 0 },
        targetCount: { value: 0 }
      });
      _Readback.readbackProgram.set(reader, program);
    }
    const material = program.prepareMaterial();
    _Readback.fullScreenQuad.material = material;
    return { program, material };
  }
  saveRenderState(renderer) {
    return {
      xrEnabled: renderer.xr.enabled,
      autoClear: renderer.autoClear
    };
  }
  resetRenderState(renderer, state) {
    renderer.setRenderTarget(null);
    renderer.xr.enabled = state.xrEnabled;
    renderer.autoClear = state.autoClear;
  }
  process({
    count,
    material
  }) {
    const renderer = this.renderer;
    if (!renderer) {
      throw new Error("No renderer");
    }
    if (!this.target) {
      throw new Error("No target");
    }
    const layerSize = SPLAT_TEX_WIDTH * SPLAT_TEX_HEIGHT;
    material.uniforms.targetBase.value = 0;
    material.uniforms.targetCount.value = count;
    let baseIndex = 0;
    while (baseIndex < count) {
      const layer = Math.floor(baseIndex / layerSize);
      const layerBase = layer * layerSize;
      const layerYEnd = Math.min(
        SPLAT_TEX_HEIGHT,
        Math.ceil((count - layerBase) / SPLAT_TEX_WIDTH)
      );
      material.uniforms.targetLayer.value = layer;
      this.target.scissor.set(0, 0, SPLAT_TEX_WIDTH, layerYEnd);
      renderer.setRenderTarget(this.target, layer);
      renderer.xr.enabled = false;
      renderer.autoClear = false;
      _Readback.fullScreenQuad.render(renderer);
      baseIndex += SPLAT_TEX_WIDTH * layerYEnd;
    }
    this.count = count;
  }
  async read({
    readback
  }) {
    const renderer = this.renderer;
    if (!renderer) {
      throw new Error("No renderer");
    }
    if (!this.target) {
      throw new Error("No target");
    }
    const roundedCount = Math.ceil(this.count / SPLAT_TEX_WIDTH) * SPLAT_TEX_WIDTH;
    if (readback.byteLength < roundedCount * 4) {
      throw new Error(
        `Readback buffer too small: ${readback.byteLength} < ${roundedCount * 4}`
      );
    }
    const readbackUint8 = new Uint8Array(
      readback instanceof ArrayBuffer ? readback : readback.buffer
    );
    const layerSize = SPLAT_TEX_WIDTH * SPLAT_TEX_HEIGHT;
    let baseIndex = 0;
    const promises = [];
    while (baseIndex < this.count) {
      const layer = Math.floor(baseIndex / layerSize);
      const layerBase = layer * layerSize;
      const layerYEnd = Math.min(
        SPLAT_TEX_HEIGHT,
        Math.ceil((this.count - layerBase) / SPLAT_TEX_WIDTH)
      );
      renderer.setRenderTarget(this.target, layer);
      const readbackSize = SPLAT_TEX_WIDTH * layerYEnd * 4;
      const subReadback = readbackUint8.subarray(
        layerBase * 4,
        layerBase * 4 + readbackSize
      );
      const promise = renderer == null ? void 0 : renderer.readRenderTargetPixelsAsync(
        this.target,
        0,
        0,
        SPLAT_TEX_WIDTH,
        layerYEnd,
        subReadback
      );
      promises.push(promise);
      baseIndex += SPLAT_TEX_WIDTH * layerYEnd;
    }
    return Promise.all(promises).then(() => readback);
  }
  // Perform render operation to run the Rgba8Readback program
  // but don't perform the readback yet.
  render({
    reader,
    count,
    renderer
  }) {
    this.renderer = renderer || this.renderer;
    if (!this.renderer) {
      throw new Error("No renderer");
    }
    this.ensureCapacity(count);
    const { program, material } = this.prepareProgramMaterial(reader);
    program.update();
    const renderState = this.saveRenderState(this.renderer);
    this.process({ count, material });
    this.resetRenderState(this.renderer, renderState);
  }
  // Perform a readback of the render target, returning a buffer of the
  // given type.
  async readback({
    readback
  }) {
    if (!this.renderer) {
      throw new Error("No renderer");
    }
    const renderState = this.saveRenderState(this.renderer);
    const promise = this.read({ readback });
    this.resetRenderState(this.renderer, renderState);
    return promise;
  }
  // Perform a render and readback operation for the given Rgba8Readback,
  // and readback buffer (call ensureBuffer first).
  async renderReadback({
    reader,
    count,
    renderer,
    readback
  }) {
    this.renderer = renderer || this.renderer;
    if (!this.renderer) {
      throw new Error("No renderer");
    }
    this.ensureCapacity(count);
    const { program, material } = this.prepareProgramMaterial(reader);
    program.update();
    const renderState = this.saveRenderState(this.renderer);
    this.process({ count, material });
    const promise = this.read({ readback });
    this.resetRenderState(this.renderer, renderState);
    return promise;
  }
  getTexture() {
    var _a2;
    return (_a2 = this.target) == null ? void 0 : _a2.texture;
  }
};
_Readback.programTemplate = null;
_Readback.readbackProgram = /* @__PURE__ */ new Map();
_Readback.fullScreenQuad = new FullScreenQuad(
  new THREE.RawShaderMaterial({ visible: false })
);
let Readback = _Readback;
const _RgbaArray = class _RgbaArray {
  constructor(options = {}) {
    this.capacity = 0;
    this.count = 0;
    this.array = null;
    this.readback = null;
    this.source = null;
    this.needsUpdate = true;
    this.dyno = new DynoUniform({
      key: "rgbaArray",
      type: TRgbaArray,
      globals: () => [defineRgbaArray],
      value: {
        texture: _RgbaArray.getEmpty(),
        count: 0
      },
      update: (value) => {
        var _a2;
        value.texture = ((_a2 = this.readback) == null ? void 0 : _a2.getTexture()) ?? this.source ?? _RgbaArray.getEmpty();
        value.count = this.count;
        return value;
      }
    });
    if (options.array) {
      this.array = options.array;
      this.capacity = Math.floor(this.array.length / 4);
      this.capacity = Math.floor(this.capacity / SPLAT_TEX_WIDTH) * SPLAT_TEX_WIDTH;
      this.count = Math.min(
        this.capacity,
        options.count ?? Number.POSITIVE_INFINITY
      );
    } else {
      this.capacity = options.capacity ?? 0;
      this.count = 0;
    }
  }
  // Free up resources
  dispose() {
    if (this.readback) {
      this.readback.dispose();
      this.readback = null;
    }
    if (this.source) {
      this.source.dispose();
      this.source = null;
    }
  }
  // Ensure that our array is large enough to hold capacity RGBA8 values.
  ensureCapacity(capacity) {
    var _a2;
    if (!this.array || capacity > (((_a2 = this.array) == null ? void 0 : _a2.length) ?? 0) / 4) {
      this.capacity = getTextureSize(capacity).maxSplats;
      const newArray2 = new Uint8Array(this.capacity * 4);
      if (this.array) {
        newArray2.set(this.array);
      }
      this.array = newArray2;
    }
    return this.array;
  }
  // Get the THREE.DataArrayTexture from either the readback or the source.
  getTexture() {
    var _a2;
    let texture2 = (_a2 = this.readback) == null ? void 0 : _a2.getTexture();
    if (this.source || this.array) {
      texture2 = this.maybeUpdateSource();
    }
    return texture2 ?? _RgbaArray.getEmpty();
  }
  // Create or get a THREE.DataArrayTexture from the data array.
  maybeUpdateSource() {
    if (!this.array) {
      throw new Error("No array");
    }
    if (this.needsUpdate || !this.source) {
      this.needsUpdate = false;
      if (this.source) {
        const { width, height, depth } = this.source.image;
        if (this.capacity !== width * height * depth) {
          this.source.dispose();
          this.source = null;
        }
      }
      if (!this.source) {
        const { width, height, depth } = getTextureSize(this.capacity);
        this.source = new THREE.DataArrayTexture(
          this.array,
          width,
          height,
          depth
        );
        this.source.format = THREE.RGBAFormat;
        this.source.type = THREE.UnsignedByteType;
        this.source.internalFormat = "RGBA8";
        this.source.needsUpdate = true;
      } else if (this.array.buffer !== this.source.image.data.buffer) {
        this.source.image.data = new Uint8Array(this.array.buffer);
      }
      this.source.needsUpdate = true;
    }
    return this.source;
  }
  // Generate the RGBA8 values from a Rgba8Readback dyno program.
  render({
    reader,
    count,
    renderer
  }) {
    if (!this.readback) {
      this.readback = new Readback({ renderer });
    }
    this.readback.render({ reader, count, renderer });
    this.capacity = this.readback.capacity;
    this.count = this.readback.count;
  }
  // Extract the RGBA8 values from a PackedSplats collection.
  fromPackedSplats({
    packedSplats,
    base,
    count,
    renderer
  }) {
    const { dynoSplats, dynoBase, dynoCount, reader } = _RgbaArray.makeDynos();
    dynoSplats.packedSplats = packedSplats;
    dynoBase.value = base;
    dynoCount.value = count;
    this.render({ reader, count, renderer });
    return this;
  }
  // Read back the RGBA8 values from the readback buffer.
  async read() {
    if (!this.readback) {
      throw new Error("No readback");
    }
    if (!this.array || this.array.length < this.count * 4) {
      this.array = new Uint8Array(this.capacity * 4);
    }
    const result = await this.readback.readback({ readback: this.array });
    return result.subarray(0, this.count * 4);
  }
  // Can be used where you need an uninitialized THREE.DataArrayTexture like
  // a uniform you will update with the result of this.getTexture() later.
  static getEmpty() {
    if (!_RgbaArray.emptySource) {
      const emptyArray = new Uint8Array(1 * 4);
      _RgbaArray.emptySource = new THREE.DataArrayTexture(emptyArray, 1, 1, 1);
      _RgbaArray.emptySource.format = THREE.RGBAFormat;
      _RgbaArray.emptySource.type = THREE.UnsignedByteType;
      _RgbaArray.emptySource.internalFormat = "RGBA8";
      _RgbaArray.emptySource.needsUpdate = true;
    }
    return _RgbaArray.emptySource;
  }
  // Create a dyno program that can extract RGBA8 values from a PackedSplats
  static makeDynos() {
    if (!_RgbaArray.dynos) {
      const dynoSplats = new DynoPackedSplats();
      const dynoBase = new DynoInt({ value: 0 });
      const dynoCount = new DynoInt({ value: 0 });
      const reader = dynoBlock(
        { index: "int" },
        { rgba8: "vec4" },
        ({ index }) => {
          if (!index) {
            throw new Error("index is undefined");
          }
          index = add(index, dynoBase);
          const gsplat = readPackedSplatRange(
            dynoSplats,
            index,
            dynoBase,
            dynoCount
          );
          return { rgba8: splitGsplat(gsplat).outputs.rgba };
        }
      );
      _RgbaArray.dynos = { dynoSplats, dynoBase, dynoCount, reader };
    }
    return _RgbaArray.dynos;
  }
};
_RgbaArray.emptySource = null;
_RgbaArray.dynos = null;
let RgbaArray = _RgbaArray;
const TRgbaArray = { type: "RgbaArray" };
const defineRgbaArray = unindent(`
  struct RgbaArray {
    sampler2DArray texture;
    int count;
  };
`);
function readRgbaArray(rgba, index) {
  const dyno2 = new Dyno({
    inTypes: { rgba: TRgbaArray, index: "int" },
    outTypes: { rgba: "vec4" },
    inputs: { rgba, index },
    globals: () => [defineRgbaArray],
    statements: ({ inputs, outputs }) => unindentLines(`
        if ((index >= 0) && (index < ${inputs.rgba}.count)) {
          ${outputs.rgba} = texelFetch(${inputs.rgba}.texture, splatTexCoord(index), 0);
        } else {
          ${outputs.rgba} = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `)
  });
  return dyno2.outputs.rgba;
}
var SplatEditSdfType = /* @__PURE__ */ ((SplatEditSdfType2) => {
  SplatEditSdfType2["ALL"] = "all";
  SplatEditSdfType2["PLANE"] = "plane";
  SplatEditSdfType2["SPHERE"] = "sphere";
  SplatEditSdfType2["BOX"] = "box";
  SplatEditSdfType2["ELLIPSOID"] = "ellipsoid";
  SplatEditSdfType2["CYLINDER"] = "cylinder";
  SplatEditSdfType2["CAPSULE"] = "capsule";
  SplatEditSdfType2["INFINITE_CONE"] = "infinite_cone";
  return SplatEditSdfType2;
})(SplatEditSdfType || {});
function sdfTypeToNumber(type) {
  switch (type) {
    case "all":
      return 0;
    case "plane":
      return 1;
    case "sphere":
      return 2;
    case "box":
      return 3;
    case "ellipsoid":
      return 4;
    case "cylinder":
      return 5;
    case "capsule":
      return 6;
    case "infinite_cone":
      return 7;
    default:
      throw new Error(`Unknown SDF type: ${type}`);
  }
}
var SplatEditRgbaBlendMode = /* @__PURE__ */ ((SplatEditRgbaBlendMode2) => {
  SplatEditRgbaBlendMode2["MULTIPLY"] = "multiply";
  SplatEditRgbaBlendMode2["SET_RGB"] = "set_rgb";
  SplatEditRgbaBlendMode2["ADD_RGBA"] = "add_rgba";
  return SplatEditRgbaBlendMode2;
})(SplatEditRgbaBlendMode || {});
function rgbaBlendModeToNumber(mode) {
  switch (mode) {
    case "multiply":
      return 0;
    case "set_rgb":
      return 1;
    case "add_rgba":
      return 2;
    default:
      throw new Error(`Unknown blend mode: ${mode}`);
  }
}
class SplatEditSdf extends THREE.Object3D {
  constructor(options = {}) {
    super();
    const { type, invert, opacity, color, displace, radius } = options;
    this.type = type ?? "sphere";
    this.invert = invert ?? false;
    this.opacity = opacity ?? 1;
    this.color = color ?? new THREE.Color(1, 1, 1);
    this.displace = displace ?? new THREE.Vector3(0, 0, 0);
    this.radius = radius ?? 0;
  }
}
const _SplatEdit = class _SplatEdit extends THREE.Object3D {
  constructor(options = {}) {
    const {
      name,
      rgbaBlendMode = "multiply",
      sdfSmooth = 0,
      softEdge = 0,
      invert = false,
      sdfs = null
    } = options;
    super();
    this.rgbaBlendMode = rgbaBlendMode;
    this.sdfSmooth = sdfSmooth;
    this.softEdge = softEdge;
    this.invert = invert;
    this.sdfs = sdfs;
    this.ordering = _SplatEdit.nextOrdering++;
    this.name = name ?? `Edit ${this.ordering}`;
  }
  addSdf(sdf) {
    if (this.sdfs == null) {
      this.sdfs = [];
    }
    if (!this.sdfs.includes(sdf)) {
      this.sdfs.push(sdf);
    }
  }
  removeSdf(sdf) {
    if (this.sdfs == null) {
      return;
    }
    this.sdfs = this.sdfs.filter((s) => s !== sdf);
  }
};
_SplatEdit.nextOrdering = 1;
let SplatEdit = _SplatEdit;
class SplatEdits {
  constructor({ maxSdfs, maxEdits }) {
    this.maxSdfs = Math.max(16, maxSdfs ?? 0);
    this.numSdfs = 0;
    this.sdfData = new Uint32Array(this.maxSdfs * 8 * 4);
    this.sdfFloatData = new Float32Array(this.sdfData.buffer);
    this.sdfTexture = this.newSdfTexture(this.sdfData, this.maxSdfs);
    this.dynoSdfArray = new DynoUniform({
      key: "sdfArray",
      type: SdfArray,
      globals: () => [defineSdfArray],
      value: {
        numSdfs: 0,
        sdfTexture: this.sdfTexture
      },
      update: (uniform2) => {
        uniform2.numSdfs = this.numSdfs;
        uniform2.sdfTexture = this.sdfTexture;
        return uniform2;
      }
    });
    this.maxEdits = Math.max(16, maxEdits ?? 0);
    this.numEdits = 0;
    this.editData = new Uint32Array(this.maxEdits * 4);
    this.editFloatData = new Float32Array(this.editData.buffer);
    this.dynoNumEdits = new DynoInt({ value: 0 });
    this.dynoEdits = this.newEdits(this.editData, this.maxEdits);
  }
  newSdfTexture(data, maxSdfs) {
    const texture2 = new THREE.DataTexture(
      data,
      8,
      maxSdfs,
      THREE.RGBAIntegerFormat,
      THREE.UnsignedIntType
    );
    texture2.internalFormat = "RGBA32UI";
    texture2.needsUpdate = true;
    return texture2;
  }
  newEdits(data, maxEdits) {
    return new DynoUniform({
      key: "edits",
      type: "uvec4",
      count: maxEdits,
      globals: () => [defineEdit],
      value: data
    });
  }
  // Ensure our SDF texture and edits uniform array have enough capacity.
  // Reallocate if not.
  ensureCapacity({
    maxSdfs,
    maxEdits
  }) {
    let dynoUpdated = false;
    if (maxSdfs > this.sdfTexture.image.height) {
      this.sdfTexture.dispose();
      this.maxSdfs = Math.max(this.maxSdfs * 2, maxSdfs);
      this.sdfData = new Uint32Array(this.maxSdfs * 8 * 4);
      this.sdfFloatData = new Float32Array(this.sdfData.buffer);
      this.sdfTexture = this.newSdfTexture(this.sdfData, this.maxSdfs);
    }
    if (maxEdits > (this.dynoEdits.count ?? 0)) {
      this.maxEdits = Math.max(this.maxEdits * 2, maxEdits);
      this.editData = new Uint32Array(this.maxEdits * 4);
      this.editFloatData = new Float32Array(this.editData.buffer);
      this.dynoEdits = this.newEdits(this.editData, this.maxEdits);
      dynoUpdated = true;
    }
    return dynoUpdated;
  }
  updateEditData(offset, value) {
    const updated = this.editData[offset] !== value;
    this.editData[offset] = value;
    return updated;
  }
  updateEditFloatData(offset, value) {
    tempFloat32[0] = value;
    const updated = this.editFloatData[offset] !== tempFloat32[0];
    if (updated) {
      this.editFloatData[offset] = tempFloat32[0];
    }
    return updated;
  }
  encodeEdit(editIndex, {
    sdfFirst,
    sdfCount,
    invert,
    rgbaBlendMode,
    softEdge,
    sdfSmooth
  }) {
    const base = editIndex * 4;
    let updated = false;
    updated = this.updateEditData(base + 0, rgbaBlendMode | (invert ? 1 << 8 : 0)) || updated;
    updated = this.updateEditData(base + 1, sdfFirst | sdfCount << 16) || updated;
    updated = this.updateEditFloatData(base + 2, softEdge) || updated;
    updated = this.updateEditFloatData(base + 3, sdfSmooth) || updated;
    return updated;
  }
  updateSdfData(offset, value) {
    const updated = this.sdfData[offset] !== value;
    this.sdfData[offset] = value;
    return updated;
  }
  updateSdfFloatData(offset, value) {
    tempFloat32[0] = value;
    const updated = this.sdfFloatData[offset] !== tempFloat32[0];
    if (updated) {
      this.sdfFloatData[offset] = tempFloat32[0];
    }
    return updated;
  }
  encodeSdf(sdfIndex, {
    sdfType,
    invert,
    center,
    quaternion,
    scale,
    sizes
  }, values) {
    const base = sdfIndex * (8 * 4);
    const flags = sdfType | (invert ? 1 << 8 : 0);
    let updated = false;
    updated = this.updateSdfFloatData(base + 0, (center == null ? void 0 : center.x) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 1, (center == null ? void 0 : center.y) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 2, (center == null ? void 0 : center.z) ?? 0) || updated;
    updated = this.updateSdfData(base + 3, flags) || updated;
    updated = this.updateSdfFloatData(base + 4, (quaternion == null ? void 0 : quaternion.x) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 5, (quaternion == null ? void 0 : quaternion.y) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 6, (quaternion == null ? void 0 : quaternion.z) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 7, (quaternion == null ? void 0 : quaternion.w) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 8, (scale == null ? void 0 : scale.x) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 9, (scale == null ? void 0 : scale.y) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 10, (scale == null ? void 0 : scale.z) ?? 0) || updated;
    updated = this.updateSdfData(base + 11, 0) || updated;
    updated = this.updateSdfFloatData(base + 12, (sizes == null ? void 0 : sizes.x) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 13, (sizes == null ? void 0 : sizes.y) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 14, (sizes == null ? void 0 : sizes.z) ?? 0) || updated;
    updated = this.updateSdfFloatData(base + 15, (sizes == null ? void 0 : sizes.w) ?? 0) || updated;
    const nValues = Math.min(4, values.length);
    for (let i = 0; i < nValues; ++i) {
      const vBase = base + 16 + i * 4;
      updated = this.updateSdfFloatData(vBase + 0, values[i].x) || updated;
      updated = this.updateSdfFloatData(vBase + 1, values[i].y) || updated;
      updated = this.updateSdfFloatData(vBase + 2, values[i].z) || updated;
      updated = this.updateSdfFloatData(vBase + 3, values[i].w) || updated;
    }
    return updated;
  }
  // Update the SDFs and edits from an array of SplatEdits and their
  // associated SplatEditSdfs, updating it for the dyno shader program.
  update(edits) {
    const sdfCount = edits.reduce((total, { sdfs }) => total + sdfs.length, 0);
    const dynoUpdated = this.ensureCapacity({
      maxEdits: edits.length,
      maxSdfs: sdfCount
    });
    const values = [new THREE.Vector4(), new THREE.Vector4()];
    const center = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    const sizes = new THREE.Vector4();
    let sdfIndex = 0;
    let updated = dynoUpdated;
    if (edits.length !== this.dynoNumEdits.value) {
      this.dynoNumEdits.value = edits.length;
      this.numEdits = edits.length;
      updated = true;
    }
    for (const [editIndex, { edit, sdfs }] of edits.entries()) {
      updated = this.encodeEdit(editIndex, {
        sdfFirst: sdfIndex,
        sdfCount: sdfs.length,
        invert: edit.invert,
        rgbaBlendMode: rgbaBlendModeToNumber(edit.rgbaBlendMode),
        softEdge: edit.softEdge,
        sdfSmooth: edit.sdfSmooth
      }) || updated;
      let sdfUpdated = false;
      for (const sdf of sdfs) {
        sizes.set(sdf.scale.x, sdf.scale.y, sdf.scale.z, sdf.radius);
        sdf.scale.setScalar(1);
        sdf.updateMatrixWorld();
        const worldToSdf = sdf.matrixWorld.clone().invert();
        worldToSdf.decompose(center, quaternion, scale);
        sdf.scale.set(sizes.x, sizes.y, sizes.z);
        sdf.updateMatrixWorld();
        values[0].set(sdf.color.r, sdf.color.g, sdf.color.b, sdf.opacity);
        values[1].set(sdf.displace.x, sdf.displace.y, sdf.displace.z, 1);
        sdfUpdated = this.encodeSdf(
          sdfIndex,
          {
            sdfType: sdfTypeToNumber(sdf.type),
            invert: sdf.invert,
            center,
            quaternion,
            scale,
            sizes
          },
          values
        ) || sdfUpdated;
        sdfIndex += 1;
      }
      this.numSdfs = sdfIndex;
      if (sdfUpdated) {
        this.sdfTexture.needsUpdate = true;
      }
      updated || (updated = sdfUpdated);
    }
    return { updated, dynoUpdated };
  }
  // Modify a Gsplat in a dyno shader program using the current edits and SDFs.
  modify(gsplat) {
    return applyGsplatRgbaDisplaceEdits(
      gsplat,
      this.dynoSdfArray,
      this.dynoNumEdits,
      this.dynoEdits
    );
  }
}
const SdfArray = { type: "SdfArray" };
const defineSdfArray = unindent(`
  struct SdfArray {
    int numSdfs;
    usampler2D sdfTexture;
  };

  void unpackSdfArray(
    usampler2D sdfTexture, int sdfIndex, out uint flags,
    out vec3 center, out vec4 quaternion, out vec3 scale, out vec4 sizes,
    int numValues, out vec4 values[4]
  ) {
    uvec4 temp = texelFetch(sdfTexture, ivec2(0, sdfIndex), 0);
    flags = temp.w;
    center = vec3(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z));

    temp = texelFetch(sdfTexture, ivec2(1, sdfIndex), 0);
    quaternion = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));

    temp = texelFetch(sdfTexture, ivec2(2, sdfIndex), 0);
    scale = vec3(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z));

    temp = texelFetch(sdfTexture, ivec2(3, sdfIndex), 0);
    sizes = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));

    for (int i = 0; i < numValues; ++i) {
      temp = texelFetch(sdfTexture, ivec2(4 + i, sdfIndex), 0);
      values[i] = vec4(uintBitsToFloat(temp.x), uintBitsToFloat(temp.y), uintBitsToFloat(temp.z), uintBitsToFloat(temp.w));
    }
  }

  const uint SDF_FLAG_TYPE = 0xFFu;
  const uint SDF_FLAG_INVERT = 1u << 8u;

  const uint SDF_TYPE_ALL = 0u;
  const uint SDF_TYPE_PLANE = 1u;
  const uint SDF_TYPE_SPHERE = 2u;
  const uint SDF_TYPE_BOX = 3u;
  const uint SDF_TYPE_ELLIPSOID = 4u;
  const uint SDF_TYPE_CYLINDER = 5u;
  const uint SDF_TYPE_CAPSULE = 6u;
  const uint SDF_TYPE_INFINITE_CONE = 7u;

  float evaluateSdfArray(
    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, vec3 pos,
    float smoothK, int numValues, out vec4 outValues[4]
  ) {
    float distanceAccum = (smoothK == 0.0) ? 1.0 / 0.0 : 0.0;
    float maxExp = -1.0 / 0.0;
    for (int i = 0; i < numValues; ++i) {
        outValues[i] = vec4(0.0);
    }

    uint flags;
    vec3 center, scale;
    vec4 quaternion, sizes;
    vec4 values[4];

    int sdfLast = min(sdfFirst + sdfCount, numSdfs);
    for (int index = sdfFirst; index < sdfLast; ++index) {
      unpackSdfArray(sdfTexture, index, flags, center, quaternion, scale, sizes, numValues, values);
      uint sdfType = flags & SDF_FLAG_TYPE;
      vec3 sdfPos = quatVec(quaternion, pos * scale) + center;

      float distance;
      switch (sdfType) {
        case SDF_TYPE_ALL:
          distance = -1.0 / 0.0;
          break;
        case SDF_TYPE_PLANE: {
          distance = sdfPos.z;
          break;
        }
        case SDF_TYPE_SPHERE: {
          distance = length(sdfPos) - sizes.w;
          break;
        }
        case SDF_TYPE_BOX: {
          vec3 q = abs(sdfPos) - sizes.xyz + sizes.w;
          distance = length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - sizes.w;
          break;
        }
        case SDF_TYPE_ELLIPSOID: {
          vec3 sizes = sizes.xyz;
          float k0 = length(sdfPos / sizes);
          float k1 = length(sdfPos / dot(sizes, sizes));
          distance = k0 * (k0 - 1.0) / k1;
          break;
        }
        case SDF_TYPE_CYLINDER: {
          vec2 d = abs(vec2(length(sdfPos.xz), sdfPos.y)) - sizes.wy;
          distance = min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
          break;
        }
        case SDF_TYPE_CAPSULE: {
          sdfPos.y -= clamp(sdfPos.y, -0.5 * sizes.y, 0.5 * sizes.y);
          distance = length(sdfPos) - sizes.w;
          break;
        }
        case SDF_TYPE_INFINITE_CONE: {
          float angle = 0.25 * PI * sizes.w;
          vec2 c = vec2(sin(angle), cos(angle));
          vec2 q = vec2(length(sdfPos.xy), -sdfPos.z);
          float d = length(q - c * max(dot(q, c), 0.0));
          distance = d * (((q.x * c.y - q.y * c.x) < 0.0) ? -1.0 : 1.0);
          break;
        }
      }

      if ((flags & SDF_FLAG_INVERT) != 0u) {
        distance = -distance;
      }

      if (smoothK == 0.0) {
        if (distance < distanceAccum) {
          distanceAccum = distance;
          for (int i = 0; i < numValues; ++i) {
            outValues[i] = values[i];
          }
        }
      } else {
        float scaledDistance = -distance / smoothK;
        if (scaledDistance > maxExp) {
          float scale = exp(maxExp - scaledDistance);
          distanceAccum *= scale;
          for (int i = 0; i < numValues; ++i) {
            outValues[i] *= scale;
          }
          maxExp = scaledDistance;
        }

        float weight = exp(scaledDistance - maxExp);
        distanceAccum += weight;
        for (int i = 0; i < numValues; ++i) {
          outValues[i] += weight * values[i];
        }
      }
    }

    if (smoothK == 0.0) {
      return distanceAccum;
    } else {
      // Very distant SDFs may result in 0 accumulation
      if (distanceAccum == 0.0) {
        return 1.0 / 0.0;
      }
      for (int i = 0; i < numValues; ++i) {
        outValues[i] /= distanceAccum;
      }
      return (-log(distanceAccum) - maxExp) * smoothK;
    }
  }

  float modulateSdfArray(
    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, vec3 pos,
    float smoothK, int numValues, out vec4 values[4],
    float softEdge, bool invert
  ) {
    float distance = evaluateSdfArray(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, smoothK, numValues, values);
    if (invert) {
      distance = -distance;
    }

    return (softEdge == 0.0) ? ((distance < 0.0) ? 1.0 : 0.0)
      : clamp(-distance / softEdge + 0.5, 0.0, 1.0);
  }
`);
const defineEdit = unindent(`
  const uint EDIT_FLAG_BLEND = 0xFFu;
  const uint EDIT_BLEND_MULTIPLY = 0u;
  const uint EDIT_BLEND_SET_RGB = 1u;
  const uint EDIT_BLEND_ADD_RGBA = 2u;
  const uint EDIT_FLAG_INVERT = 0x100u;

  void decodeEdit(
    uvec4 packedEdit, out int sdfFirst, out int sdfCount,
    out bool invert, out uint rgbaBlendMode, out float softEdge, out float sdfSmooth
  ) {
    rgbaBlendMode = packedEdit.x & EDIT_FLAG_BLEND;
    invert = (packedEdit.x & EDIT_FLAG_INVERT) != 0u;

    sdfFirst = int(packedEdit.y & 0xFFFFu);
    sdfCount = int(packedEdit.y >> 16u);

    softEdge = uintBitsToFloat(packedEdit.z);
    sdfSmooth = uintBitsToFloat(packedEdit.w);
  }

  void applyRgbaDisplaceEdit(
    usampler2D sdfTexture, int numSdfs, int sdfFirst, int sdfCount, inout vec3 pos,
    float smoothK, float softEdge, bool invert, uint rgbaBlendMode, inout vec4 rgba
  ) {
    vec4 values[4];
    float modulate = modulateSdfArray(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, smoothK, 2, values, softEdge, invert);
    // On Android, moving values[0] is necessary to work around a compiler bug.
    vec4 sdfRgba = values[0];
    vec4 sdfDisplaceScale = values[1];

    vec4 target;
    switch (rgbaBlendMode) {
      case EDIT_BLEND_MULTIPLY:
        target = rgba * sdfRgba;
        break;
      case EDIT_BLEND_SET_RGB:
        target = vec4(sdfRgba.rgb, rgba.a * sdfRgba.a);
        break;
      case EDIT_BLEND_ADD_RGBA:
        target = rgba + sdfRgba;
        break;
      default:
        // Debug output if blend mode not set
        target = vec4(fract(pos), 1.0);
    }
    rgba = mix(rgba, target, modulate);
    pos += sdfDisplaceScale.xyz * modulate;
  }

  void applyPackedRgbaDisplaceEdit(uvec4 packedEdit, usampler2D sdfTexture, int numSdfs, inout vec3 pos, inout vec4 rgba) {
    int sdfFirst, sdfCount;
    bool invert;
    uint rgbaBlendMode;
    float softEdge, sdfSmooth;
    decodeEdit(packedEdit, sdfFirst, sdfCount, invert, rgbaBlendMode, softEdge, sdfSmooth);
    applyRgbaDisplaceEdit(sdfTexture, numSdfs, sdfFirst, sdfCount, pos, sdfSmooth, softEdge, invert, rgbaBlendMode, rgba);
  }
`);
function applyGsplatRgbaDisplaceEdits(gsplat, sdfArray, numEdits, rgbaDisplaceEdits) {
  const dyno2 = new Dyno({
    inTypes: {
      gsplat: Gsplat,
      sdfArray: SdfArray,
      numEdits: "int",
      rgbaDisplaceEdits: "uvec4"
    },
    outTypes: { gsplat: Gsplat },
    globals: () => [defineSdfArray, defineEdit],
    inputs: { gsplat, sdfArray, numEdits, rgbaDisplaceEdits },
    statements: ({ inputs, outputs }) => {
      const { sdfArray: sdfArray2, numEdits: numEdits2, rgbaDisplaceEdits: rgbaDisplaceEdits2 } = inputs;
      const { gsplat: gsplat2 } = outputs;
      return unindentLines(`
        ${gsplat2} = ${inputs.gsplat};
        if (isGsplatActive(${gsplat2}.flags)) {
          for (int editIndex = 0; editIndex < ${numEdits2}; ++editIndex) {
            applyPackedRgbaDisplaceEdit(
              ${rgbaDisplaceEdits2}[editIndex], ${sdfArray2}.sdfTexture, ${sdfArray2}.numSdfs,
              ${gsplat2}.center, ${gsplat2}.rgba
            );
          }
        }
      `);
    }
  });
  return dyno2.outputs.gsplat;
}
const tempFloat32 = new Float32Array(1);
class SplatModifier {
  constructor(modifier) {
    this.modifier = modifier;
    this.cache = /* @__PURE__ */ new Map();
  }
  apply(generator) {
    let modified = this.cache.get(generator);
    if (!modified) {
      modified = dynoBlock(
        { index: "int" },
        { gsplat: Gsplat },
        ({ index }) => {
          const { gsplat } = generator.apply({ index });
          return this.modifier.apply({ gsplat });
        }
      );
      this.cache.set(generator, modified);
    }
    return modified;
  }
}
class SplatTransformer {
  // Create the dyno uniforms that parameterize the transform, setting them
  // to initial values that are different from any valid transform.
  constructor() {
    this.scale = new DynoFloat({ value: Number.NEGATIVE_INFINITY });
    this.rotate = new DynoVec4({
      value: new THREE.Quaternion(
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY
      )
    });
    this.translate = new DynoVec3({
      value: new THREE.Vector3(
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY,
        Number.POSITIVE_INFINITY
      )
    });
  }
  // Apply the transform to a Vec3 position in a dyno program.
  apply(position) {
    return transformPos(position, {
      scale: this.scale,
      rotate: this.rotate,
      translate: this.translate
    });
  }
  applyDir(dir) {
    return transformDir(dir, {
      rotate: this.rotate
    });
  }
  // Apply the transform to a Gsplat in a dyno program.
  applyGsplat(gsplat) {
    return transformGsplat(gsplat, {
      scale: this.scale,
      rotate: this.rotate,
      translate: this.translate
    });
  }
  // Update the uniforms to match the given transform matrix.
  updateFromMatrix(transform) {
    const scale = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const position = new THREE.Vector3();
    transform.decompose(position, quaternion, scale);
    const newScale = (scale.x + scale.y + scale.z) / 3;
    let updated = false;
    if (newScale !== this.scale.value) {
      this.scale.value = newScale;
      updated = true;
    }
    if (!position.equals(this.translate.value)) {
      this.translate.value.copy(position);
      updated = true;
    }
    if (!quaternion.equals(this.rotate.value)) {
      this.rotate.value.copy(quaternion);
      updated = true;
    }
    return updated;
  }
  // Update this transform to match the object's to-world transform.
  update(object) {
    object.updateMatrixWorld();
    return this.updateFromMatrix(object.matrixWorld);
  }
}
class SplatGenerator extends THREE.Object3D {
  constructor({
    numSplats,
    generator,
    construct,
    update
  }) {
    super();
    this.numSplats = numSplats ?? 0;
    this.generator = generator;
    this.frameUpdate = update;
    this.version = 0;
    if (construct) {
      const constructed = construct(this);
      Object.assign(this, constructed);
    }
  }
  updateVersion() {
    this.version += 1;
  }
  set needsUpdate(value) {
    if (value) {
      this.updateVersion();
    }
  }
}
const _SplatMesh = class _SplatMesh extends SplatGenerator {
  constructor(options = {}) {
    const transform = new SplatTransformer();
    const viewToWorld = new SplatTransformer();
    const worldToView = new SplatTransformer();
    const viewToObject = new SplatTransformer();
    const recolor = new DynoVec4({
      value: new THREE.Vector4(
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY,
        Number.NEGATIVE_INFINITY
      )
    });
    const time = new DynoFloat({ value: 0 });
    const deltaTime = new DynoFloat({ value: 0 });
    const context = {
      transform,
      viewToWorld,
      worldToView,
      viewToObject,
      recolor,
      time,
      deltaTime
    };
    super({
      update: ({ time: time2, deltaTime: deltaTime2, viewToWorld: viewToWorld2, globalEdits }) => this.update({ time: time2, deltaTime: deltaTime2, viewToWorld: viewToWorld2, globalEdits })
    });
    this.isInitialized = false;
    this.recolor = new THREE.Color(1, 1, 1);
    this.opacity = 1;
    this.enableViewToObject = false;
    this.enableViewToWorld = false;
    this.enableWorldToView = false;
    this.skinning = null;
    this.edits = null;
    this.rgbaDisplaceEdits = null;
    this.splatRgba = null;
    this.maxSh = 3;
    this.packedSplats = options.packedSplats ?? new PackedSplats();
    this.numSplats = this.packedSplats.numSplats;
    this.editable = options.editable ?? true;
    this.onFrame = options.onFrame;
    this.context = context;
    this.objectModifier = options.objectModifier;
    this.worldModifier = options.worldModifier;
    this.updateGenerator();
    if (options.url || options.fileBytes || options.constructSplats || options.packedSplats && !options.packedSplats.isInitialized) {
      this.initialized = this.asyncInitialize(options).then(async () => {
        this.updateGenerator();
        this.isInitialized = true;
        if (options.onLoad) {
          const maybePromise = options.onLoad(this);
          if (maybePromise instanceof Promise) {
            await maybePromise;
          }
        }
        return this;
      });
    } else {
      this.isInitialized = true;
      this.initialized = Promise.resolve(this);
      if (options.onLoad) {
        const maybePromise = options.onLoad(this);
        if (maybePromise instanceof Promise) {
          this.initialized = maybePromise.then(() => this);
        }
      }
    }
  }
  async asyncInitialize(options) {
    const { url, fileBytes, fileType, fileName, maxSplats, constructSplats } = options;
    if (url || fileBytes || constructSplats) {
      const packedSplatsOptions = {
        url,
        fileBytes,
        fileType,
        fileName,
        maxSplats,
        construct: constructSplats
      };
      this.packedSplats.reinitialize(packedSplatsOptions);
    }
    if (this.packedSplats) {
      await this.packedSplats.initialized;
      this.numSplats = this.packedSplats.numSplats;
      this.updateGenerator();
    }
  }
  static async staticInitialize() {
    await __wbg_init();
    _SplatMesh.isStaticInitialized = true;
  }
  // Creates a new Gsplat with the provided parameters (all values in "float" space,
  // i.e. 0-1 for opacity and color) and adds it to the end of the packedSplats,
  // increasing numSplats by 1. If necessary, reallocates the buffer with an exponential
  // doubling strategy to fit the new data, so it's fairly efficient to just
  // pushSplat(...) each Gsplat you want to create in a loop.
  pushSplat(center, scales, quaternion, opacity, color) {
    this.packedSplats.pushSplat(center, scales, quaternion, opacity, color);
  }
  // This method iterates over all Gsplats in this instance's packedSplats,
  // invoking the provided callback with index: number in 0..=(this.numSplats-1) and
  // center: THREE.Vector3, scales: THREE.Vector3, quaternion: THREE.Quaternion,
  // opacity: number (0..1), and color: THREE.Color (rgb values in 0..1).
  // Note that the objects passed in as center etc. are the same for every callback
  // invocation: these objects are reused for efficiency. Changing these values has
  // no effect as they are decoded/unpacked copies of the underlying data. To update
  // the packedSplats, call .packedSplats.setSplat(index, center, scales,
  // quaternion, opacity, color).
  forEachSplat(callback) {
    this.packedSplats.forEachSplat(callback);
  }
  // Call this when you are finished with the SplatMesh and want to free
  // any buffers it holds (via packedSplats).
  dispose() {
    this.packedSplats.dispose();
  }
  constructGenerator(context) {
    const { transform, viewToObject, recolor } = context;
    const generator = dynoBlock(
      { index: "int" },
      { gsplat: Gsplat },
      ({ index }) => {
        if (!index) {
          throw new Error("index is undefined");
        }
        let gsplat = readPackedSplat(this.packedSplats.dyno, index);
        if (this.maxSh >= 1) {
          const { sh1Texture, sh2Texture, sh3Texture } = this.ensureShTextures();
          if (sh1Texture) {
            const viewCenterInObject = viewToObject.translate;
            const { center } = splitGsplat(gsplat).outputs;
            const viewDir = normalize(sub(center, viewCenterInObject));
            let rgb = evaluateSH1(gsplat, sh1Texture, viewDir);
            if (this.maxSh >= 2 && sh2Texture) {
              rgb = add(rgb, evaluateSH2(gsplat, sh2Texture, viewDir));
            }
            if (this.maxSh >= 3 && sh3Texture) {
              rgb = add(rgb, evaluateSH3(gsplat, sh3Texture, viewDir));
            }
            let { rgba } = splitGsplat(gsplat).outputs;
            rgba = add(rgba, extendVec(rgb, dynoConst("float", 0)));
            gsplat = combineGsplat({ gsplat, rgba });
          }
        }
        if (this.splatRgba) {
          const rgba = readRgbaArray(this.splatRgba.dyno, index);
          gsplat = combineGsplat({ gsplat, rgba });
        }
        if (this.skinning) {
          gsplat = this.skinning.modify(gsplat);
        }
        if (this.objectModifier) {
          gsplat = this.objectModifier.apply({ gsplat }).gsplat;
        }
        gsplat = transform.applyGsplat(gsplat);
        const recolorRgba = mul(recolor, splitGsplat(gsplat).outputs.rgba);
        gsplat = combineGsplat({ gsplat, rgba: recolorRgba });
        if (this.rgbaDisplaceEdits) {
          gsplat = this.rgbaDisplaceEdits.modify(gsplat);
        }
        if (this.worldModifier) {
          gsplat = this.worldModifier.apply({ gsplat }).gsplat;
        }
        return { gsplat };
      }
    );
    this.generator = generator;
  }
  // Call this whenever something changes in the Gsplat processing pipeline,
  // for example changing maxSh or updating objectModifier or worldModifier.
  // Compiled generators are cached for efficiency and re-use when the same
  // pipeline structure emerges after successive changes.
  updateGenerator() {
    this.constructGenerator(this.context);
  }
  // This is called automatically by SparkRenderer and you should not have to
  // call it. It updates parameters for the generated pipeline and calls
  // updateGenerator() if the pipeline needs to change.
  update({
    time,
    viewToWorld,
    deltaTime,
    globalEdits
  }) {
    var _a2;
    this.numSplats = this.packedSplats.numSplats;
    this.context.time.value = time;
    this.context.deltaTime.value = deltaTime;
    _SplatMesh.dynoTime.value = time;
    const { transform, viewToObject, recolor } = this.context;
    let updated = transform.update(this);
    if (this.context.viewToWorld.updateFromMatrix(viewToWorld) && this.enableViewToWorld) {
      updated = true;
    }
    const worldToView = viewToWorld.clone().invert();
    if (this.context.worldToView.updateFromMatrix(worldToView) && this.enableWorldToView) {
      updated = true;
    }
    const objectToWorld = new THREE.Matrix4().compose(
      transform.translate.value,
      transform.rotate.value,
      new THREE.Vector3().setScalar(transform.scale.value)
    );
    const worldToObject = objectToWorld.invert();
    const viewToObjectMatrix = worldToObject.multiply(viewToWorld);
    if (viewToObject.updateFromMatrix(viewToObjectMatrix) && (this.enableViewToObject || this.packedSplats.extra.sh1)) {
      updated = true;
    }
    const newRecolor = new THREE.Vector4(
      this.recolor.r,
      this.recolor.g,
      this.recolor.b,
      this.opacity
    );
    if (!newRecolor.equals(recolor.value)) {
      recolor.value.copy(newRecolor);
      updated = true;
    }
    const edits = this.editable ? (this.edits ?? []).concat(globalEdits) : [];
    if (this.editable && !this.edits) {
      this.traverseVisible((node) => {
        if (node instanceof SplatEdit) {
          edits.push(node);
        }
      });
    }
    edits.sort((a, b) => a.ordering - b.ordering);
    const editsSdfs = edits.map((edit) => {
      if (edit.sdfs != null) {
        return { edit, sdfs: edit.sdfs };
      }
      const sdfs = [];
      edit.traverseVisible((node) => {
        if (node instanceof SplatEditSdf) {
          sdfs.push(node);
        }
      });
      return { edit, sdfs };
    });
    if (editsSdfs.length > 0 && !this.rgbaDisplaceEdits) {
      const edits2 = editsSdfs.length;
      const sdfs = editsSdfs.reduce(
        (total, edit) => total + edit.sdfs.length,
        0
      );
      this.rgbaDisplaceEdits = new SplatEdits({
        maxEdits: edits2,
        maxSdfs: sdfs
      });
      this.updateGenerator();
    }
    if (this.rgbaDisplaceEdits) {
      const editResult = this.rgbaDisplaceEdits.update(editsSdfs);
      updated || (updated = editResult.updated);
      if (editResult.dynoUpdated) {
        this.updateGenerator();
      }
    }
    if (updated) {
      this.updateVersion();
    }
    (_a2 = this.onFrame) == null ? void 0 : _a2.call(this, { mesh: this, time, deltaTime });
  }
  // This method conforms to the standard THREE.Raycaster API, performing object-ray
  // intersections using this method to populate the provided intersects[] array
  // with each intersection point.
  raycast(raycaster, intersects) {
    if (!this.packedSplats.packedArray || !this.packedSplats.numSplats) {
      return;
    }
    const { near, far, ray } = raycaster;
    const worldToMesh = this.matrixWorld.clone().invert();
    const worldToMeshRot = new THREE.Matrix3().setFromMatrix4(worldToMesh);
    const origin = ray.origin.clone().applyMatrix4(worldToMesh);
    const direction = ray.direction.clone().applyMatrix3(worldToMeshRot);
    const scales = new THREE.Vector3();
    worldToMesh.decompose(new THREE.Vector3(), new THREE.Quaternion(), scales);
    (scales.x * scales.y * scales.z) ** (1 / 3);
    const RAYCAST_ELLIPSOID = true;
    const distances = raycast_splats(
      origin.x,
      origin.y,
      origin.z,
      direction.x,
      direction.y,
      direction.z,
      near,
      far,
      this.packedSplats.numSplats,
      this.packedSplats.packedArray,
      RAYCAST_ELLIPSOID
    );
    for (const distance2 of distances) {
      const point = ray.direction.clone().multiplyScalar(distance2).add(ray.origin);
      intersects.push({
        distance: distance2,
        point,
        object: this
      });
    }
  }
  ensureShTextures() {
    if (!this.packedSplats.extra.sh1) {
      return {};
    }
    let sh1Texture = this.packedSplats.extra.sh1Texture;
    if (!sh1Texture) {
      let sh1 = this.packedSplats.extra.sh1;
      const { width, height, depth, maxSplats } = getTextureSize(
        sh1.length / 2
      );
      if (sh1.length < maxSplats * 2) {
        const newSh1 = new Uint32Array(maxSplats * 2);
        newSh1.set(sh1);
        this.packedSplats.extra.sh1 = newSh1;
        sh1 = newSh1;
      }
      const texture2 = new THREE.DataArrayTexture(sh1, width, height, depth);
      texture2.format = THREE.RGIntegerFormat;
      texture2.type = THREE.UnsignedIntType;
      texture2.internalFormat = "RG32UI";
      texture2.needsUpdate = true;
      sh1Texture = new DynoUsampler2DArray({
        value: texture2,
        key: "sh1"
      });
      this.packedSplats.extra.sh1Texture = sh1Texture;
    }
    if (!this.packedSplats.extra.sh2) {
      return { sh1Texture };
    }
    let sh2Texture = this.packedSplats.extra.sh2Texture;
    if (!sh2Texture) {
      let sh2 = this.packedSplats.extra.sh2;
      const { width, height, depth, maxSplats } = getTextureSize(
        sh2.length / 4
      );
      if (sh2.length < maxSplats * 4) {
        const newSh2 = new Uint32Array(maxSplats * 4);
        newSh2.set(sh2);
        this.packedSplats.extra.sh2 = newSh2;
        sh2 = newSh2;
      }
      const texture2 = new THREE.DataArrayTexture(sh2, width, height, depth);
      texture2.format = THREE.RGBAIntegerFormat;
      texture2.type = THREE.UnsignedIntType;
      texture2.internalFormat = "RGBA32UI";
      texture2.needsUpdate = true;
      sh2Texture = new DynoUsampler2DArray({
        value: texture2,
        key: "sh2"
      });
      this.packedSplats.extra.sh2Texture = sh2Texture;
    }
    if (!this.packedSplats.extra.sh3) {
      return { sh1Texture, sh2Texture };
    }
    let sh3Texture = this.packedSplats.extra.sh3Texture;
    if (!sh3Texture) {
      let sh3 = this.packedSplats.extra.sh3;
      const { width, height, depth, maxSplats } = getTextureSize(
        sh3.length / 4
      );
      if (sh3.length < maxSplats * 4) {
        const newSh3 = new Uint32Array(maxSplats * 4);
        newSh3.set(sh3);
        this.packedSplats.extra.sh3 = newSh3;
        sh3 = newSh3;
      }
      const texture2 = new THREE.DataArrayTexture(sh3, width, height, depth);
      texture2.format = THREE.RGBAIntegerFormat;
      texture2.type = THREE.UnsignedIntType;
      texture2.internalFormat = "RGBA32UI";
      texture2.needsUpdate = true;
      sh3Texture = new DynoUsampler2DArray({
        value: texture2,
        key: "sh3"
      });
      this.packedSplats.extra.sh3Texture = sh3Texture;
    }
    return { sh1Texture, sh2Texture, sh3Texture };
  }
};
_SplatMesh.staticInitialized = _SplatMesh.staticInitialize();
_SplatMesh.isStaticInitialized = false;
_SplatMesh.dynoTime = new DynoFloat({ value: 0 });
let SplatMesh = _SplatMesh;
const defineEvaluateSH1 = unindent(`
  vec3 evaluateSH1(Gsplat gsplat, usampler2DArray sh1, vec3 viewDir) {
    // Extract sint7 values packed into 2 x uint32
    uvec2 packed = texelFetch(sh1, splatTexCoord(gsplat.index), 0).rg;
    vec3 sh1_0 = vec3(ivec3(
      int(packed.x << 25u) >> 25,
      int(packed.x << 18u) >> 25,
      int(packed.x << 11u) >> 25
    )) / 63.0;
    vec3 sh1_1 = vec3(ivec3(
      int(packed.x << 4u) >> 25,
      int((packed.x >> 3u) | (packed.y << 29u)) >> 25,
      int(packed.y << 22u) >> 25
    )) / 63.0;
    vec3 sh1_2 = vec3(ivec3(
      int(packed.y << 15u) >> 25,
      int(packed.y << 8u) >> 25,
      int(packed.y << 1u) >> 25
    )) / 63.0;

    return sh1_0 * (-0.4886025 * viewDir.y)
      + sh1_1 * (0.4886025 * viewDir.z)
      + sh1_2 * (-0.4886025 * viewDir.x);
  }
`);
const defineEvaluateSH2 = unindent(`
  vec3 evaluateSH2(Gsplat gsplat, usampler2DArray sh2, vec3 viewDir) {
    // Extract sint8 values packed into 4 x uint32
    uvec4 packed = texelFetch(sh2, splatTexCoord(gsplat.index), 0);
    vec3 sh2_0 = vec3(ivec3(
      int(packed.x << 24u) >> 24,
      int(packed.x << 16u) >> 24,
      int(packed.x << 8u) >> 24
    )) / 127.0;
    vec3 sh2_1 = vec3(ivec3(
      int(packed.x) >> 24,
      int(packed.y << 24u) >> 24,
      int(packed.y << 16u) >> 24
    )) / 127.0;
    vec3 sh2_2 = vec3(ivec3(
      int(packed.y << 8u) >> 24,
      int(packed.y) >> 24,
      int(packed.z << 24u) >> 24
    )) / 127.0;
    vec3 sh2_3 = vec3(ivec3(
      int(packed.z << 16u) >> 24,
      int(packed.z << 8u) >> 24,
      int(packed.z) >> 24
    )) / 127.0;
    vec3 sh2_4 = vec3(ivec3(
      int(packed.w << 24u) >> 24,
      int(packed.w << 16u) >> 24,
      int(packed.w << 8u) >> 24
    )) / 127.0;

    return sh2_0 * (1.0925484 * viewDir.x * viewDir.y)
      + sh2_1 * (-1.0925484 * viewDir.y * viewDir.z)
      + sh2_2 * (0.3153915 * (2.0 * viewDir.z * viewDir.z - viewDir.x * viewDir.x - viewDir.y * viewDir.y))
      + sh2_3 * (-1.0925484 * viewDir.x * viewDir.z)
      + sh2_4 * (0.5462742 * (viewDir.x * viewDir.x - viewDir.y * viewDir.y));
  }
`);
const defineEvaluateSH3 = unindent(`
  vec3 evaluateSH3(Gsplat gsplat, usampler2DArray sh3, vec3 viewDir) {
    // Extract sint6 values packed into 4 x uint32
    uvec4 packed = texelFetch(sh3, splatTexCoord(gsplat.index), 0);
    vec3 sh3_0 = vec3(ivec3(
      int(packed.x << 26u) >> 26,
      int(packed.x << 20u) >> 26,
      int(packed.x << 14u) >> 26
    )) / 31.0;
    vec3 sh3_1 = vec3(ivec3(
      int(packed.x << 8u) >> 26,
      int(packed.x << 2u) >> 26,
      int((packed.x >> 4u) | (packed.y << 28u)) >> 26
    )) / 31.0;
    vec3 sh3_2 = vec3(ivec3(
      int(packed.y << 22u) >> 26,
      int(packed.y << 16u) >> 26,
      int(packed.y << 10u) >> 26
    )) / 31.0;
    vec3 sh3_3 = vec3(ivec3(
      int(packed.y << 4u) >> 26,
      int((packed.y >> 2u) | (packed.z << 30u)) >> 26,
      int(packed.z << 24u) >> 26
    )) / 31.0;
    vec3 sh3_4 = vec3(ivec3(
      int(packed.z << 18u) >> 26,
      int(packed.z << 12u) >> 26,
      int(packed.z << 6u) >> 26
    )) / 31.0;
    vec3 sh3_5 = vec3(ivec3(
      int(packed.z) >> 26,
      int(packed.w << 26u) >> 26,
      int(packed.w << 20u) >> 26
    )) / 31.0;
    vec3 sh3_6 = vec3(ivec3(
      int(packed.w << 14u) >> 26,
      int(packed.w << 8u) >> 26,
      int(packed.w << 2u) >> 26
    )) / 31.0;

    float xx = viewDir.x * viewDir.x;
    float yy = viewDir.y * viewDir.y;
    float zz = viewDir.z * viewDir.z;
    float xy = viewDir.x * viewDir.y;
    float yz = viewDir.y * viewDir.z;
    float zx = viewDir.z * viewDir.x;

    return sh3_0 * (-0.5900436 * viewDir.y * (3.0 * xx - yy))
      + sh3_1 * (2.8906114 * xy * viewDir.z) +
      + sh3_2 * (-0.4570458 * viewDir.y * (4.0 * zz - xx - yy))
      + sh3_3 * (0.3731763 * viewDir.z * (2.0 * zz - 3.0 * xx - 3.0 * yy))
      + sh3_4 * (-0.4570458 * viewDir.x * (4.0 * zz - xx - yy))
      + sh3_5 * (1.4453057 * viewDir.z * (xx - yy))
      + sh3_6 * (-0.5900436 * viewDir.x * (xx - 3.0 * yy));
  }
`);
function evaluateSH1(gsplat, sh1, viewDir) {
  return dyno$1({
    inTypes: { gsplat: Gsplat, sh1: "usampler2DArray", viewDir: "vec3" },
    outTypes: { rgb: "vec3" },
    inputs: { gsplat, sh1, viewDir },
    globals: () => [defineGsplat, defineEvaluateSH1],
    statements: ({ inputs, outputs }) => {
      const statements = unindentLines(`
        if (isGsplatActive(${inputs.gsplat}.flags)) {
          ${outputs.rgb} = evaluateSH1(${inputs.gsplat}, ${inputs.sh1}, ${inputs.viewDir});
        } else {
          ${outputs.rgb} = vec3(0.0);
        }
      `);
      return statements;
    }
  }).outputs.rgb;
}
function evaluateSH2(gsplat, sh2, viewDir) {
  return dyno$1({
    inTypes: { gsplat: Gsplat, sh2: "usampler2DArray", viewDir: "vec3" },
    outTypes: { rgb: "vec3" },
    inputs: { gsplat, sh2, viewDir },
    globals: () => [defineGsplat, defineEvaluateSH2],
    statements: ({ inputs, outputs }) => unindentLines(`
        if (isGsplatActive(${inputs.gsplat}.flags)) {
          ${outputs.rgb} = evaluateSH2(${inputs.gsplat}, ${inputs.sh2}, ${inputs.viewDir});
        } else {
          ${outputs.rgb} = vec3(0.0);
        }
      `)
  }).outputs.rgb;
}
function evaluateSH3(gsplat, sh3, viewDir) {
  return dyno$1({
    inTypes: { gsplat: Gsplat, sh3: "usampler2DArray", viewDir: "vec3" },
    outTypes: { rgb: "vec3" },
    inputs: { gsplat, sh3, viewDir },
    globals: () => [defineGsplat, defineEvaluateSH3],
    statements: ({ inputs, outputs }) => unindentLines(`
        if (isGsplatActive(${inputs.gsplat}.flags)) {
          ${outputs.rgb} = evaluateSH3(${inputs.gsplat}, ${inputs.sh3}, ${inputs.viewDir});
        } else {
          ${outputs.rgb} = vec3(0.0);
        }
      `)
  }).outputs.rgb;
}
const _PlyReader = class _PlyReader {
  // Create a PlyReader from a Uint8Array/ArrayBuffer, no parsing done yet
  constructor({ fileBytes }) {
    this.header = "";
    this.littleEndian = true;
    this.elements = {};
    this.comments = [];
    this.data = null;
    this.numSplats = 0;
    this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;
  }
  // Identify and parse the PLY text header (assumed to be <64KB in size).
  // this.elements will contain all the elements in the file, typically
  // "vertex" contains the Gsplat data.
  async parseHeader() {
    const bufferStream = new ReadableStream({
      start: (controller) => {
        controller.enqueue(this.fileBytes.slice(0, 65536));
        controller.close();
      }
    });
    const decoder = bufferStream.pipeThrough(new TextDecoderStream()).getReader();
    this.header = "";
    const headerTerminator = "end_header\n";
    while (true) {
      const { value, done } = await decoder.read();
      if (done) {
        throw new Error("Failed to read header");
      }
      this.header += value;
      const endHeader = this.header.indexOf(headerTerminator);
      if (endHeader >= 0) {
        this.header = this.header.slice(0, endHeader + headerTerminator.length);
        break;
      }
    }
    const headerLen = new TextEncoder().encode(this.header).length;
    this.data = new DataView(this.fileBytes.buffer, headerLen);
    this.elements = {};
    let curElement = null;
    this.comments = [];
    this.header.trim().split("\n").forEach((line, lineIndex) => {
      const trimmedLine = line.trim();
      if (lineIndex === 0) {
        if (trimmedLine !== "ply") {
          throw new Error("Invalid PLY header");
        }
        return;
      }
      if (trimmedLine.length === 0) {
        return;
      }
      const fields = trimmedLine.split(" ");
      switch (fields[0]) {
        case "format":
          if (fields[1] === "binary_little_endian") {
            this.littleEndian = true;
          } else if (fields[1] === "binary_big_endian") {
            this.littleEndian = false;
          } else {
            throw new Error(`Unsupported PLY format: ${fields[1]}`);
          }
          if (fields[2] !== "1.0") {
            throw new Error(`Unsupported PLY version: ${fields[2]}`);
          }
          break;
        case "end_header":
          break;
        case "comment":
          this.comments.push(trimmedLine.slice("comment ".length));
          break;
        case "element": {
          const name = fields[1];
          curElement = {
            name,
            count: Number.parseInt(fields[2]),
            properties: {}
          };
          this.elements[name] = curElement;
          break;
        }
        case "property":
          if (curElement == null) {
            throw new Error("Property must be inside an element");
          }
          if (fields[1] === "list") {
            curElement.properties[fields[4]] = {
              isList: true,
              type: fields[3],
              countType: fields[2]
            };
          } else {
            curElement.properties[fields[2]] = {
              isList: false,
              type: fields[1]
            };
          }
          break;
      }
    });
    if (this.elements.vertex) {
      this.numSplats = this.elements.vertex.count;
    }
  }
  parseData(elementCallback) {
    let offset = 0;
    const data = this.data;
    if (data == null) {
      throw new Error("No data to parse");
    }
    for (const elementName in this.elements) {
      const element = this.elements[elementName];
      const { count, properties } = element;
      const item = {};
      const parsers = [];
      for (const [propertyName, property] of Object.entries(properties)) {
        if (!property.isList) {
          item[propertyName] = 0;
          parsers.push(() => {
            item[propertyName] = PARSE_FIELD[property.type](
              data,
              offset,
              this.littleEndian
            );
            offset += FIELD_BYTES[property.type];
          });
        } else {
          item[propertyName] = [];
          parsers.push(() => {
            const list = item[propertyName];
            list.length = PARSE_FIELD[property.countType](
              data,
              offset,
              this.littleEndian
            );
            offset += FIELD_BYTES[property.countType];
            for (let i = 0; i < list.length; i++) {
              list[i] = PARSE_FIELD[property.type](
                data,
                offset,
                this.littleEndian
              );
              offset += FIELD_BYTES[property.type];
            }
          });
        }
      }
      const callback = elementCallback(element) ?? (() => {
      });
      for (let index = 0; index < count; index++) {
        for (const parser of parsers) {
          parser();
        }
        callback(index, item);
      }
    }
  }
  // Parse all the Gsplat data in the PLY file in go, invoking the given
  // callbacks for each Gsplat.
  parseSplats(splatCallback, shCallback) {
    if (this.elements.vertex == null) {
      throw new Error("No vertex element found");
    }
    let isSuperSplat = false;
    const ssChunks = [];
    let numSh = 0;
    let sh1Props = [];
    let sh2Props = [];
    let sh3Props = [];
    let sh1 = void 0;
    let sh2 = void 0;
    let sh3 = void 0;
    function prepareSh() {
      const num_f_rest = NUM_SH_TO_NUM_F_REST[numSh];
      sh1Props = new Array(3).fill(null).flatMap(
        (_, k) => [0, 1, 2].map((_2, d) => `f_rest_${k + d * num_f_rest / 3}`)
      );
      sh2Props = new Array(5).fill(null).flatMap(
        (_, k) => [0, 1, 2].map((_2, d) => `f_rest_${3 + k + d * num_f_rest / 3}`)
      );
      sh3Props = new Array(7).fill(null).flatMap(
        (_, k) => [0, 1, 2].map((_2, d) => `f_rest_${8 + k + d * num_f_rest / 3}`)
      );
      sh1 = numSh >= 1 ? new Float32Array(3 * 3) : void 0;
      sh2 = numSh >= 2 ? new Float32Array(5 * 3) : void 0;
      sh3 = numSh >= 3 ? new Float32Array(7 * 3) : void 0;
    }
    function ssShCallback(index, item) {
      if (!sh1) {
        throw new Error("Missing sh1");
      }
      for (const [i, key] of sh1Props.entries()) {
        sh1[i] = item[key] * 8 / 255 - 4;
      }
      if (sh2) {
        for (const [i, key] of sh2Props.entries()) {
          sh2[i] = item[key] * 8 / 255 - 4;
        }
      }
      if (sh3) {
        for (const [i, key] of sh3Props.entries()) {
          sh3[i] = item[key] * 8 / 255 - 4;
        }
      }
      shCallback == null ? void 0 : shCallback(index, sh1, sh2, sh3);
    }
    function initSuperSplat(element) {
      const {
        min_x,
        min_y,
        min_z,
        max_x,
        max_y,
        max_z,
        min_scale_x,
        min_scale_y,
        min_scale_z,
        max_scale_x,
        max_scale_y,
        max_scale_z
      } = element.properties;
      if (!min_x || !min_y || !min_z || !max_x || !max_y || !max_z || !min_scale_x || !min_scale_y || !min_scale_z || !max_scale_x || !max_scale_y || !max_scale_z) {
        throw new Error("Missing PLY chunk properties");
      }
      isSuperSplat = true;
      return (index, item) => {
        const {
          min_x: min_x2,
          min_y: min_y2,
          min_z: min_z2,
          max_x: max_x2,
          max_y: max_y2,
          max_z: max_z2,
          min_scale_x: min_scale_x2,
          min_scale_y: min_scale_y2,
          min_scale_z: min_scale_z2,
          max_scale_x: max_scale_x2,
          max_scale_y: max_scale_y2,
          max_scale_z: max_scale_z2,
          min_r,
          min_g,
          min_b,
          max_r,
          max_g,
          max_b
        } = item;
        ssChunks.push({
          min_x: min_x2,
          min_y: min_y2,
          min_z: min_z2,
          max_x: max_x2,
          max_y: max_y2,
          max_z: max_z2,
          min_scale_x: min_scale_x2,
          min_scale_y: min_scale_y2,
          min_scale_z: min_scale_z2,
          max_scale_x: max_scale_x2,
          max_scale_y: max_scale_y2,
          max_scale_z: max_scale_z2,
          min_r,
          min_g,
          min_b,
          max_r,
          max_g,
          max_b
        });
      };
    }
    function decodeSuperSplat(element) {
      if (shCallback && element.name === "sh") {
        numSh = getNumSh(element.properties);
        prepareSh();
        return ssShCallback;
      }
      if (element.name !== "vertex") {
        return null;
      }
      const { packed_position, packed_rotation, packed_scale, packed_color } = element.properties;
      if (!packed_position || !packed_rotation || !packed_scale || !packed_color) {
        throw new Error(
          "Missing PLY properties: packed_position, packed_rotation, packed_scale, packed_color"
        );
      }
      const SQRT2 = Math.sqrt(2);
      return (index, item) => {
        const chunk = ssChunks[index >>> 8];
        if (chunk == null) {
          throw new Error("Missing PLY chunk");
        }
        const {
          min_x,
          min_y,
          min_z,
          max_x,
          max_y,
          max_z,
          min_scale_x,
          min_scale_y,
          min_scale_z,
          max_scale_x,
          max_scale_y,
          max_scale_z,
          min_r,
          min_g,
          min_b,
          max_r,
          max_g,
          max_b
        } = chunk;
        const { packed_position: packed_position2, packed_rotation: packed_rotation2, packed_scale: packed_scale2, packed_color: packed_color2 } = item;
        const x = (packed_position2 >>> 21 & 2047) / 2047 * (max_x - min_x) + min_x;
        const y = (packed_position2 >>> 11 & 1023) / 1023 * (max_y - min_y) + min_y;
        const z = (packed_position2 & 2047) / 2047 * (max_z - min_z) + min_z;
        const r0 = ((packed_rotation2 >>> 20 & 1023) / 1023 - 0.5) * SQRT2;
        const r1 = ((packed_rotation2 >>> 10 & 1023) / 1023 - 0.5) * SQRT2;
        const r2 = ((packed_rotation2 & 1023) / 1023 - 0.5) * SQRT2;
        const rr = Math.sqrt(Math.max(0, 1 - r0 * r0 - r1 * r1 - r2 * r2));
        const rOrder = packed_rotation2 >>> 30;
        const quatX = rOrder === 0 ? r0 : rOrder === 1 ? rr : r1;
        const quatY = rOrder <= 1 ? r1 : rOrder === 2 ? rr : r2;
        const quatZ = rOrder <= 2 ? r2 : rr;
        const quatW = rOrder === 0 ? rr : r0;
        const scaleX = Math.exp(
          (packed_scale2 >>> 21 & 2047) / 2047 * (max_scale_x - min_scale_x) + min_scale_x
        );
        const scaleY = Math.exp(
          (packed_scale2 >>> 11 & 1023) / 1023 * (max_scale_y - min_scale_y) + min_scale_y
        );
        const scaleZ = Math.exp(
          (packed_scale2 & 2047) / 2047 * (max_scale_z - min_scale_z) + min_scale_z
        );
        const r = (packed_color2 >>> 24 & 255) / 255 * ((max_r ?? 1) - (min_r ?? 0)) + (min_r ?? 0);
        const g = (packed_color2 >>> 16 & 255) / 255 * ((max_g ?? 1) - (min_g ?? 0)) + (min_g ?? 0);
        const b = (packed_color2 >>> 8 & 255) / 255 * ((max_b ?? 1) - (min_b ?? 0)) + (min_b ?? 0);
        const opacity = (packed_color2 & 255) / 255;
        splatCallback(
          index,
          x,
          y,
          z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          opacity,
          r,
          g,
          b
        );
      };
    }
    const elementCallback = (element) => {
      if (element.name === "chunk") {
        return initSuperSplat(element);
      }
      if (isSuperSplat) {
        return decodeSuperSplat(element);
      }
      if (element.name !== "vertex") {
        return null;
      }
      const {
        x,
        y,
        z,
        scale_0,
        scale_1,
        scale_2,
        rot_0,
        rot_1,
        rot_2,
        rot_3,
        opacity,
        f_dc_0,
        f_dc_1,
        f_dc_2,
        red,
        green,
        blue,
        alpha
      } = element.properties;
      if (!x || !y || !z) {
        throw new Error("Missing PLY properties: x, y, z");
      }
      const hasScales = scale_0 && scale_1 && scale_2;
      const hasRots = rot_0 && rot_1 && rot_2 && rot_3;
      const alphaDiv = alpha != null ? FIELD_SCALE[alpha.type] : 1;
      const redDiv = red != null ? FIELD_SCALE[red.type] : 1;
      const greenDiv = green != null ? FIELD_SCALE[green.type] : 1;
      const blueDiv = blue != null ? FIELD_SCALE[blue.type] : 1;
      numSh = getNumSh(element.properties);
      prepareSh();
      return (index, item) => {
        const scaleX = hasScales ? Math.exp(item.scale_0) : _PlyReader.defaultPointScale;
        const scaleY = hasScales ? Math.exp(item.scale_1) : _PlyReader.defaultPointScale;
        const scaleZ = hasScales ? Math.exp(item.scale_2) : _PlyReader.defaultPointScale;
        const quatX = hasRots ? item.rot_1 : 0;
        const quatY = hasRots ? item.rot_2 : 0;
        const quatZ = hasRots ? item.rot_3 : 0;
        const quatW = hasRots ? item.rot_0 : 1;
        const op = opacity != null ? 1 / (1 + Math.exp(-item.opacity)) : alpha != null ? item.alpha / alphaDiv : 1;
        const r = f_dc_0 != null ? item.f_dc_0 * SH_C0$1 + 0.5 : red != null ? item.red / redDiv : 1;
        const g = f_dc_1 != null ? item.f_dc_1 * SH_C0$1 + 0.5 : green != null ? item.green / greenDiv : 1;
        const b = f_dc_2 != null ? item.f_dc_2 * SH_C0$1 + 0.5 : blue != null ? item.blue / blueDiv : 1;
        splatCallback(
          index,
          item.x,
          item.y,
          item.z,
          scaleX,
          scaleY,
          scaleZ,
          quatX,
          quatY,
          quatZ,
          quatW,
          op,
          r,
          g,
          b
        );
        if (shCallback && sh1) {
          if (sh1) {
            for (const [i, key] of sh1Props.entries()) {
              sh1[i] = item[key];
            }
          }
          if (sh2) {
            for (const [i, key] of sh2Props.entries()) {
              sh2[i] = item[key];
            }
          }
          if (sh3) {
            for (const [i, key] of sh3Props.entries()) {
              sh3[i] = item[key];
            }
          }
          shCallback(index, sh1, sh2, sh3);
        }
      };
    };
    this.parseData(elementCallback);
  }
  // Inject RGBA values into original PLY file, which can be used to modify
  // the color/opacity of the Gsplats and write out the modified PLY file.
  injectRgba(rgba) {
    let offset = 0;
    const data = this.data;
    if (data == null) {
      throw new Error("No parsed data");
    }
    if (rgba.length !== this.numSplats * 4) {
      throw new Error("Invalid RGBA array length");
    }
    for (const elementName in this.elements) {
      const element = this.elements[elementName];
      const { count, properties } = element;
      const parsers = [];
      let rgbaOffset = 0;
      const isVertex = elementName === "vertex";
      if (isVertex) {
        for (const name of ["opacity", "f_dc_0", "f_dc_1", "f_dc_2"]) {
          if (!properties[name] || properties[name].type !== "float") {
            throw new Error(`Can't injectRgba due to property: ${name}`);
          }
        }
      }
      for (const [propertyName, property] of Object.entries(properties)) {
        if (!property.isList) {
          if (isVertex) {
            if (propertyName === "f_dc_0" || propertyName === "f_dc_1" || propertyName === "f_dc_2") {
              const component = Number.parseInt(
                propertyName.slice("f_dc_".length)
              );
              parsers.push(() => {
                const value = (rgba[rgbaOffset + component] / 255 - 0.5) / SH_C0$1;
                SET_FIELD[property.type](
                  data,
                  offset,
                  this.littleEndian,
                  value
                );
              });
            } else if (propertyName === "opacity") {
              parsers.push(() => {
                const value = Math.max(
                  -100,
                  Math.min(
                    100,
                    -Math.log(1 / (rgba[rgbaOffset + 3] / 255) - 1)
                  )
                );
                SET_FIELD[property.type](
                  data,
                  offset,
                  this.littleEndian,
                  value
                );
              });
            }
          }
          parsers.push(() => {
            offset += FIELD_BYTES[property.type];
          });
        } else {
          parsers.push(() => {
            const length2 = PARSE_FIELD[property.countType](
              data,
              offset,
              this.littleEndian
            );
            offset += FIELD_BYTES[property.countType];
            offset += length2 * FIELD_BYTES[property.type];
          });
        }
      }
      for (let index = 0; index < count; index++) {
        for (const parser of parsers) {
          parser();
        }
        if (isVertex) {
          rgbaOffset += 4;
        }
      }
    }
  }
};
_PlyReader.defaultPointScale = 1e-3;
let PlyReader = _PlyReader;
const SH_C0$1 = 0.28209479177387814;
const PARSE_FIELD = {
  char: (data, offset, littleEndian) => {
    return data.getInt8(offset);
  },
  uchar: (data, offset, littleEndian) => {
    return data.getUint8(offset);
  },
  short: (data, offset, littleEndian) => {
    return data.getInt16(offset, littleEndian);
  },
  ushort: (data, offset, littleEndian) => {
    return data.getUint16(offset, littleEndian);
  },
  int: (data, offset, littleEndian) => {
    return data.getInt32(offset, littleEndian);
  },
  uint: (data, offset, littleEndian) => {
    return data.getUint32(offset, littleEndian);
  },
  float: (data, offset, littleEndian) => {
    return data.getFloat32(offset, littleEndian);
  },
  double: (data, offset, littleEndian) => {
    return data.getFloat64(offset, littleEndian);
  }
};
const SET_FIELD = {
  char: (data, offset, littleEndian, value) => {
    data.setInt8(offset, value);
  },
  uchar: (data, offset, littleEndian, value) => {
    data.setUint8(offset, value);
  },
  short: (data, offset, littleEndian, value) => {
    data.setInt16(offset, value, littleEndian);
  },
  ushort: (data, offset, littleEndian, value) => {
    data.setUint16(offset, value, littleEndian);
  },
  int: (data, offset, littleEndian, value) => {
    data.setInt32(offset, value, littleEndian);
  },
  uint: (data, offset, littleEndian, value) => {
    data.setUint32(offset, value, littleEndian);
  },
  float: (data, offset, littleEndian, value) => {
    data.setFloat32(offset, value, littleEndian);
  },
  double: (data, offset, littleEndian, value) => {
    data.setFloat64(offset, value, littleEndian);
  }
};
const FIELD_BYTES = {
  char: 1,
  uchar: 1,
  short: 2,
  ushort: 2,
  int: 4,
  uint: 4,
  float: 4,
  double: 8
};
const FIELD_SCALE = {
  char: 127,
  uchar: 255,
  short: 32767,
  ushort: 65535,
  int: 2147483647,
  uint: 4294967295,
  float: 1,
  double: 1
};
const NUM_F_REST_TO_NUM_SH = {
  0: 0,
  9: 1,
  24: 2,
  45: 3
};
const NUM_SH_TO_NUM_F_REST = {
  0: 0,
  1: 9,
  2: 24,
  3: 45
};
function getNumSh(properties) {
  let num_f_rest = 0;
  while (properties[`f_rest_${num_f_rest}`]) {
    num_f_rest += 1;
  }
  const numSh = NUM_F_REST_TO_NUM_SH[num_f_rest];
  if (numSh == null) {
    throw new Error(`Unsupported number of SH coefficients: ${num_f_rest}`);
  }
  return numSh;
}
const jsContent = '(function() {\n  "use strict";\n  let wasm;\n  const cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {\n    throw Error("TextDecoder not available");\n  } };\n  if (typeof TextDecoder !== "undefined") {\n    cachedTextDecoder.decode();\n  }\n  let cachedUint8ArrayMemory0 = null;\n  function getUint8ArrayMemory0() {\n    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {\n      cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8ArrayMemory0;\n  }\n  function getStringFromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));\n  }\n  function sort_splats(num_splats, readback, ordering) {\n    const ret = wasm.sort_splats(num_splats, readback, ordering);\n    return ret >>> 0;\n  }\n  async function __wbg_load(module, imports) {\n    if (typeof Response === "function" && module instanceof Response) {\n      if (typeof WebAssembly.instantiateStreaming === "function") {\n        try {\n          return await WebAssembly.instantiateStreaming(module, imports);\n        } catch (e) {\n          if (module.headers.get("Content-Type") != "application/wasm") {\n            console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n", e);\n          } else {\n            throw e;\n          }\n        }\n      }\n      const bytes = await module.arrayBuffer();\n      return await WebAssembly.instantiate(bytes, imports);\n    } else {\n      const instance = await WebAssembly.instantiate(module, imports);\n      if (instance instanceof WebAssembly.Instance) {\n        return { instance, module };\n      } else {\n        return instance;\n      }\n    }\n  }\n  function __wbg_get_imports() {\n    const imports = {};\n    imports.wbg = {};\n    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {\n      const ret = arg0.buffer;\n      return ret;\n    };\n    imports.wbg.__wbg_length_3b4f022188ae8db6 = function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    };\n    imports.wbg.__wbg_length_6ca527665d89694d = function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    };\n    imports.wbg.__wbg_length_8cfd2c6409af88ad = function(arg0) {\n      const ret = arg0.length;\n      return ret;\n    };\n    imports.wbg.__wbg_new_9fee97a409b32b68 = function(arg0) {\n      const ret = new Uint16Array(arg0);\n      return ret;\n    };\n    imports.wbg.__wbg_new_e3b321dcfef89fc7 = function(arg0) {\n      const ret = new Uint32Array(arg0);\n      return ret;\n    };\n    imports.wbg.__wbg_newwithbyteoffsetandlength_e6b7e69acd4c7354 = function(arg0, arg1, arg2) {\n      const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbg_newwithbyteoffsetandlength_f1dead44d1fc7212 = function(arg0, arg1, arg2) {\n      const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbg_newwithlength_5a5efe313cfd59f1 = function(arg0) {\n      const ret = new Float32Array(arg0 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbg_set_10bad9bee0e9c58b = function(arg0, arg1, arg2) {\n      arg0.set(arg1, arg2 >>> 0);\n    };\n    imports.wbg.__wbg_set_d23661d19148b229 = function(arg0, arg1, arg2) {\n      arg0.set(arg1, arg2 >>> 0);\n    };\n    imports.wbg.__wbg_set_f4f1f0daa30696fc = function(arg0, arg1, arg2) {\n      arg0.set(arg1, arg2 >>> 0);\n    };\n    imports.wbg.__wbg_subarray_3aaeec89bb2544f0 = function(arg0, arg1, arg2) {\n      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbg_subarray_769e1e0f81bb259b = function(arg0, arg1, arg2) {\n      const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);\n      return ret;\n    };\n    imports.wbg.__wbindgen_init_externref_table = function() {\n      const table = wasm.__wbindgen_export_0;\n      const offset = table.grow(4);\n      table.set(0, void 0);\n      table.set(offset + 0, void 0);\n      table.set(offset + 1, null);\n      table.set(offset + 2, true);\n      table.set(offset + 3, false);\n    };\n    imports.wbg.__wbindgen_memory = function() {\n      const ret = wasm.memory;\n      return ret;\n    };\n    imports.wbg.__wbindgen_throw = function(arg0, arg1) {\n      throw new Error(getStringFromWasm0(arg0, arg1));\n    };\n    return imports;\n  }\n  function __wbg_finalize_init(instance, module) {\n    wasm = instance.exports;\n    __wbg_init.__wbindgen_wasm_module = module;\n    cachedUint8ArrayMemory0 = null;\n    wasm.__wbindgen_start();\n    return wasm;\n  }\n  async function __wbg_init(module_or_path) {\n    if (wasm !== void 0) return wasm;\n    if (typeof module_or_path !== "undefined") {\n      if (Object.getPrototypeOf(module_or_path) === Object.prototype) {\n        ({ module_or_path } = module_or_path);\n      } else {\n        console.warn("using deprecated parameters for the initialization function; pass a single object instead");\n      }\n    }\n    if (typeof module_or_path === "undefined") {\n      module_or_path = new URL("data:application/wasm;base64,AGFzbQEAAAAB9wEkYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAF/AX9gAX8AYAV/f39/fwBgA29/fwFvYAV/f39/fwF/YAR/f39/AGABbwFvYANvb38AYAFvAX9gAAF/YAAAYAd/f39/f39/AX9gAX0BfWAGf39/f39/AGAEf39/fwF/YAF/AW9gAAFvYAd/f39/f39/AGACf34Bf2ADf35+AGACf34AYAt9fX19fX19fX9vfwFvYAZ/f39/f38Bf2AFf399f38AYAR/fX9/AGAFf39+f38AYAR/fn9/AGAFf398f38AYAR/fH9/AGADf35+AX9gA39vbwF/YAJ9fQF9AvIEEQN3YmcdX193YmdfYnVmZmVyXzYwOWNjM2VlZTUxZWQxNTgACgN3YmcaX193YmdfbmV3XzlmZWU5N2E0MDliMzJiNjgACgN3YmcaX193Ymdfc2V0X2Y0ZjFmMGRhYTMwNjk2ZmMACwN3YmcdX193YmdfbGVuZ3RoXzhjZmQyYzY0MDlhZjg4YWQADAN3YmcxX193YmdfbmV3d2l0aGJ5dGVvZmZzZXRhbmRsZW5ndGhfZjFkZWFkNDRkMWZjNzIxMgAHA3diZxpfX3diZ19uZXdfZTNiMzIxZGNmZWY4OWZjNwAKA3diZxpfX3diZ19zZXRfZDIzNjYxZDE5MTQ4YjIyOQALA3diZx1fX3diZ19sZW5ndGhfNmNhNTI3NjY1ZDg5Njk0ZAAMA3diZzFfX3diZ19uZXd3aXRoYnl0ZW9mZnNldGFuZGxlbmd0aF9lNmI3ZTY5YWNkNGM3MzU0AAcDd2JnGl9fd2JnX3NldF8xMGJhZDliZWUwZTljNThiAAsDd2JnHV9fd2JnX2xlbmd0aF8zYjRmMDIyMTg4YWU4ZGI2AAwDd2JnH19fd2JnX3N1YmFycmF5Xzc2OWUxZTBmODFiYjI1OWIABwN3YmcfX193Ymdfc3ViYXJyYXlfM2FhZWVjODliYjI1NDRmMAAHA3diZyRfX3diZ19uZXd3aXRobGVuZ3RoXzVhNWVmZTMxM2NmZDU5ZjEAEwN3YmcQX193YmluZGdlbl90aHJvdwACA3diZxFfX3diaW5kZ2VuX21lbW9yeQAUA3diZx9fX3diaW5kZ2VuX2luaXRfZXh0ZXJucmVmX3RhYmxlAA4DvAG6AQQAAAYABAQE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QCADQQFxDQAgA0ECcUUNASABKAIAIgMgAGohACABIANrIgFB0NrAACgCAEYEQCACKAIEQQNxQQNHDQFByNrAACAANgIAIAIgAigCBEF+cTYCBCABIABBAXI2AgQgAiAANgIADwsgASADEDkLAkACQAJAAkACQCACKAIEIgNBAnFFBEAgAkHU2sAAKAIARg0CIAJB0NrAACgCAEYNAyACIANBeHEiAhA5IAEgACACaiIAQQFyNgIEIAAgAWogADYCACABQdDawAAoAgBHDQFByNrAACAANgIADwsgAiADQX5xNgIEIAEgAEEBcjYCBCAAIAFqIAA2AgALIABBgAJJDQIgASAAEEFBACEBQejawABB6NrAACgCAEEBayIANgIAIAANBEGw2MAAKAIAIgAEQANAIAFBAWohASAAKAIIIgANAAsLQejawABB/x8gASABQf8fTRs2AgAPC0HU2sAAIAE2AgBBzNrAAEHM2sAAKAIAIABqIgA2AgAgASAAQQFyNgIEQdDawAAoAgAgAUYEQEHI2sAAQQA2AgBB0NrAAEEANgIACyAAQeDawAAoAgAiA00NA0HU2sAAKAIAIgJFDQNBACEAQczawAAoAgAiBEEpSQ0CQajYwAAhAQNAIAIgASgCACIFTwRAIAIgBSABKAIEakkNBAsgASgCCCEBDAALAAtB0NrAACABNgIAQcjawABByNrAACgCACAAaiIANgIAIAEgAEEBcjYCBCAAIAFqIAA2AgAPCyAAQfgBcUG42MAAaiECAn9BwNrAACgCACIDQQEgAEEDdnQiAHFFBEBBwNrAACAAIANyNgIAIAIMAQsgAigCCAshACACIAE2AgggACABNgIMIAEgAjYCDCABIAA2AggPC0Gw2MAAKAIAIgEEQANAIABBAWohACABKAIIIgENAAsLQejawABB/x8gACAAQf8fTRs2AgAgAyAETw0AQeDawABBfzYCAAsL6QQBBX8CfwJAIAJBAk8EQCABKAIEIgRB//8BcUUEQCAEQRB0DAMLIARB/wdxIQUgBEGAgAJxIQMgBEGA+AFxIgZBgPgBRgRAIANBEHQhAyADQYCAgPwHciAFRQ0DGiADIAVBDXRyQYCAgP4HcgwDCyADQRB0IQMgBkUNASAGQQ10QYCAgPwAcSAFQQ10ckGAgIDAA2ogA3IMAgtBAUEBQfSEwAAQ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CCACQQxqIAEQkwEhAwsgAkEQaiQAIAMLhgIBA38jAEGAAWsiBCQAIAAoAgAhAAJ/AkAgASgCCCICQYCAgBBxRQRAIAJBgICAIHENASAAKAIAIAEQOAwCCyAAKAIAIQBBACECA0AgAiAEakH/AGogAEEPcSIDQTByIANB1wBqIANBCkkbOgAAIAJBAWshAiAAQQ9LIABBBHYhAA0ACyABQfu+wABBAiACIARqQYABakEAIAJrECEMAQsgACgCACEAQQAhAgNAIAIgBGpB/wBqIABBD3EiA0EwciADQTdqIANBCkkbOgAAIAJBAWshAiAAQQ9LIABBBHYhAA0ACyABQfu+wABBAiACIARqQYABakEAIAJrECELIARBgAFqJAALygECBH8BfiMAQSBrIgMkAAJAAkAgASABIAJqIgJLDQBBCCACIAAoAgAiAUEBdCIEIAIgBEsbIgIgAkEITRsiBK0iB0IgiFBFDQAgB6ciBUH/////B0sNACADIAEEfyADIAE2AhwgAyAAKAIENgIUQQEFQQALNgIYIANBCGpBASAFIANBFGoQXCADKAIIQQFHDQEgAygCECECIAMoAgwhBgsgBiACQaCOwAAQjAEACyADKAIMIQEgACAENgIAIAAgATYCBCADQSBqJAALiQIBAX8jAEEQayICJAAgACgCACEAAn8gAS0AC0EYcUUEQCABKAIAIAAgASgCBCgCEBEAAAwBCyACQQA2AgwgASACQQxqAn8gAEGAAU8EQCAAQYAQTwRAIABBgIAETwRAIAIgAEE/cUGAAXI6AA8gAiAAQRJ2QfABcjoADCACIABBBnZBP3FBgAFyOgAOIAIgAEEMdkE/cUGAAXI6AA1BBAwDCyACIABBP3FBgAFyOgAOIAIgAEEMdkHgAXI6AAwgAiAAQQZ2QT9xQYABcjoADUEDDAILIAIgAEE/cUGAAXI6AA0gAiAAQQZ2QcABcjoADEECDAELIAIgADoADEEBCxAmCyACQRBqJAALqgICA38BfiMAQUBqIgIkACABKAIAQYCAgIB4RgRAIAEoAgwhAyACQSRqIgRBADYCACACQoCAgIAQNwIcIAJBMGogAygCACIDQQhqKQIANwMAIAJBOGogA0EQaikCADcDACACIAMpAgA3AyggAkEcakHsmMAAIAJBKGoQKhogAkEYaiAEKAIAIgM2AgAg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AEEQayICJAAgAkEIaiABEHYgAiACKAIIIAIoAgwoAhgRAgAgAigCBCEBIAAgAigCADYCACAAIAE2AgQgAkEQaiQAC08BAn9BhdfAAC0AABogASgCBCECIAEoAgAhA0EIQQQQnwEiAUUEQEEEQQgQwQEACyABIAI2AgQgASADNgIAIABBpJ7AADYCBCAAIAE2AgALQQEBfyMAQSBrIgMkACADQQA2AhAgA0EBNgIEIANCBDcCCCADIAE2AhwgAyAANgIYIAMgA0EYajYCACADIAIQfgALPQECfyAAIAAoAgQiAyACazYCBCAAIAAoAgAgAiADS3IiBDYCAEEBIQMgBAR/IAMFIAAoAgggASACEJMBCws+AQF/IwBBEGsiAiQAIAJBCGogASABKAIAKAIEEQIAIAIoAgwhASAAIAIoAgg2AgAgACABNgIEIAJBEGokAAuuAwEDfyAAKAIAIQIgASgCCCIAQYCAgBBxRQRAIABBgICAIHFFBEAjAEEQayIAJABBAyEDIAItAAAiAiEEIAJBCk8EQCAAIAIgAkHkAG4iBEHkAGxrQf8BcUEBdCIDQf6+wABqLQAAOgAPIAAgA0H9vsAAai0AADoADkEBIQMLQQAgAiAEG0UEQCADQQFrIgMgAEENamogBEEBdEH+AXFB/r7AAGotAAA6AAALIAFBAUEAIABBDWogA2pBAyADaxAhIABBEGokAA8LIwBBgAFrIgQkACACLQAAIQBBACECA0AgAiAEakH/AGogAEEPcSIDQTByIANBN2ogA0EKSRs6AAAgAkEBayECIAAiA0EEdiEAIANBD0sNAAsgAUH7vsAAQQIgAiAEakGAAWpBACACaxAhIARBgAFqJAAPCyMAQYABayIEJAAgAi0AACEAQQAhAgNAIAIgBGpB/wBqIABBD3EiA0EwciADQdcAaiADQQpJGzoAACACQQFrIQIgACIDQQR2IQAgA0EPSw0ACyABQfu+wABBAiACIARqQYABakEAIAJrECEgBEGAAWokAAs4AAJAIAJBgIDEAEYNACAAIAIgASgCEBEAAEUNAEEBDwsgA0UEQEEADwsgACADIAQgASgCDBEBAAs8AQF/IwBBEGsiAiQAIAJB6KDAADYCDCACIAA2AgggAkEIakGcl8AAIAJBDGpBnJfAACABQbCcwAAQPQALpQQBBn8jAEEQayIG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DJQgEiAOIA6UIBUgFZSSIA0gDZSSIBAgEZIgC5JDAABAQJUiCyALlJOUkyILQwAAAABdDQAgDIwgC5GTIBKVIgsgBmBFIAcgC2BFcg0AICgoAggiIyAoKAIARgRAIChB1ITAABBUCyAoKAIEICNBAnRqIAs4AgAgKCAjQQFqNgIICyAKIClBAnRqIQogJCApayIkDQALCyAnQRBqJAAgIigCFCIKQYQBTwRAIAoQVwsgJiIkICpJDQALCyAiKAIQISQgKygCAEEBags2AgAgJBANIQkQWCIIIAkmASAiIAg2AiQgIigCDCEmICIoAhAhIyMAQSBrIiUkACAlICJBJGooAgAiJCUBEAoiCjYCACAlICM2AgQCQCAKICNGBEAQlwEiKhCPASIKJQEgJiAjEAghCRBYIiYgCSYBICpBhAFPBEAgKhBXCyAKQYQBTwRAIAoQVwsgJCUBICYlAUEAEAkgJkGEAU8EQCAmEFcLICVBIGokAAwBCyAlQQA2AgggJSAlQQRqICVBCGoQewALICIoAggiCgRAICIoAgwgCkECdEEEEKkBCyAiKAIEIgpBhAFPBEAgChBXCyAiQTBqJAAgCAwCCxBuAAsgJCAsQbiJwAAQrAEACyIIJQEgCBBXC/oBAgJ/AX4jAEEQayICJAAgAkEBOwEMIAIgATYCCCACIAA2AgQjAEEQayIBJAAgAkEEaiIAKQIAIQQgASAANgIMIAEgBDcCBCMAQRBrIgAkACABQQRqIgEoAgAiAigCDCEDAkACQAJAAkAgAigCBA4CAAECCyADDQFBASECQQAhAwwCCyADDQAgAigCACICKAIEIQMgAigCACECDAELIABBgICAgHg2AgAgACABNgIMIABB0J7AACABKAIEIAEoAggiAC0ACCAALQAJEFEACyAAIAM2AgQgACACNgIAIABBtJ7AACABKAIEIAEoAggiAC0ACCAALQAJEFEACyUAIABFBEBBoJXAAEEyELYBAAsgACACIAMgBCAFIAEoAhARCAALKAAgASAAKAIALQAAQQJ0IgBB3K/AAGooAgAgAEHIr8AAaigCABCTAQsjACAARQRAQaCVwABBMhC2AQALIAAgAiADIAQgASgCEBEJAAsjACAARQRAQaCVwABBMhC2AQALIAAgAiADIAQgASgCEBEcAAsjACAARQRAQaCVwABBMhC2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OCAFQTBqIAQQfgALFAIBbwF/EA8hABBYIgEgACYBIAELEwAgAEEoNgIEIABBgIDAADYCAAsTACAAQdSBwAA2AgQgACABNgIACxMAIABBKDYCBCAAQYSGwAA2AgALIQAgAELUnP3HsryhmMUANwMIIABClLiFgpHLl7R0NwMACyAAIABC7Lz5lKyqlJNxNwMIIABC+enA7KyX2tdONwMACxAAIAAoAgQgACgCCCABEBwLEQAgACgCBCAAKAIIIAEQwwELGQACfyABQQlPBEAgASAAEDUMAQsgABARCwsiACAAQu26rbbNhdT14wA3AwggAEL4gpm9le7Gxbl/NwMACyEAIABCgLzfhaul+JsnNwMIIABCn/WWlNbu7cOhfzcDAAsRACAAKAIAIAAoAgQgARDDAQsTACAAQaSewAA2AgQgACABNgIACxEAIAEgACgCACAAKAIEEJMBCxAAIAAoAgAgACgCBCABEBwLEAAgASAAKAIAIAAoAgQQJgsQACABKAIAIAEoAgQgABAqCw4AIAAlASABJQEgAhAGC18BAX8CQAJAIABBBGsoAgAiAkF4cSIDQQRBCCACQQNxIgIbIAFqTwRAIAJBACADIAFBJ2pLGw0BIAAQJAwCC0GtmcAAQS5B3JnAABB0AAtB7JnAAEEuQZyawAAQdAALCx0BAW8gACgCACUBIAEgAhAMIQMQWCIAIAMmASAAC2oBAX8jAEEwayIDJAAgAyABNgIEIAMgADYCACADQQI2AgwgA0Gc1MAANgIIIANCAjcCFCADIANBBGqtQoCAgICAA4Q3AyggAyADrUKAgICAgAOENwMgIAMgA0EgajYCECADQQhqIAIQfgALagEBfyMAQTBrIgMkACADIAE2AgQgAyAANgIAIANBAjYCDCADQbzUwAA2AgggA0ICNwIUIAMgA0EEaq1CgICAgIADhDcDKCADIAOtQoCAgICAA4Q3AyAgAyADQSBqNgIQIANBCGogAhB+AAtqAQF/IwBBMGsiAyQAIAMgATYCBCADIAA2AgAgA0ECNgIMIANB8NTAADYCCCADQgI3AhQgAyADQQRqrUKAgICAgAOENwMoIAMgA61CgICAgIADhDcDICADIANBIGo2AhAgA0EIaiACEH4ACwsAIAAoAgAgARA4Cw4AQa28wABBKyAAEHQAC+8CAgV/A34gACkDACEJIwBBIGsiAyQAQRQhACAJIgdC6AdaBEAgByEIA0AgA0EMaiAAaiICQQNrIAggCEKQzgCAIgdCkM4Afn2nIgRB//8DcUHkAG4iBUEBdCIGQf6+wABqLQAAOgAAIAJBBGsgBkH9vsAAai0AADoAACACQQFrIAQgBUHkAGxrQf//A3FBAXQiBEH+vsAAai0AADoAACACQQJrIARB/b7AAGotAAA6AAAgAEEEayEAIAhC/6ziBFYgByEIDQALCyAHQglWBEAgACADakELaiAHpyICIAJB//8DcUHkAG4iAkHkAGxrQf//A3FBAXQiBEH+vsAAai0AADoAACAAQQJrIgAgA0EMamogBEH9vsAAai0AADoAACACrSEHCyAJUEUgB1BxRQRAIABBAWsiACADQQxqaiAHp0EBdEEecUH+vsAAai0AADoAAAsgAUEBQQAgA0EMaiAAakEUIABrECEgA0EgaiQACw0AIABBpIrAACABECoLDQAgAEGwjsAAIAEQKgsKACAAIAEgAhAqCw4AIAFBhJDAAEEFEJMBC8IDAgZ/AX4gACgCACEAIwBB0ABrIgIkACACQSBqIAAgACgCACgCBBECACACIAJByABqrUKAgICAwASENwMoQQEhAyACQQE2AjQgAkH4kcAANgIwIAJCATcCPCACIAIpAyA3AkggAiACQShqNgI4AkAgASgCACIGIAEoAgQiByACQTBqECoNACABLQAKQYABcUUEQEEAIQMMAQsgAkEYaiAAIAAoAgAoAgQRAgAgAkEQaiACKAIYIAIoAhwoAhgRAgAgAigCECIERQRAQQAhAwwBCyACQQhqIAQgAigCFCIFKAIYEQIAIAIoAgwhASACKAIIIQAgAiAFNgIsIAIgBDYCKCACQQE2AjQgAkGEksAANgIwIAJCATcCPCACIAJBKGqtQoCAgIDABIQiCDcDSCACIAJByABqNgI4IAYgByACQTBqELMBDQADQCAARQRAQQAhAwwCCyACIAAgASgCGBECACACKAIEIAIoAgAgAiABNgIsIAIgADYCKCACQQE2AjQgAkGEksAANgIwIAJCATcCPCACIAg3A0ggAiACQcgAajYCOCEAIQEgBiAHIAJBMGoQswFFDQALCyACQdAAaiQAIAMLCQAgACABEA4ACykAAn8gACgCAC0AAEUEQCABQeDAwABBBRAmDAEL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AAAANQAAABUAAACkARAAHQAAACYAAAAUAAAAc3BhcmstaW50ZXJuYWwtcnMvc3JjL3JheWNhc3QucnM0AhAAIAAAADUAAAAXAAAANAIQACAAAACCAAAAFwAAADQCEAAgAAAAiAAAABwAAAA0AhAAIAAAAIoAAAAcAAAANAIQACAAAACPAAAAIAAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvc3RkL3NyYy90aHJlYWQvbG9jYWwucnMApAIQAE8AAAAUAgAAJgAAAGRlc2NyaXB0aW9uKCkgaXMgZGVwcmVjYXRlZDsgdXNlIERpc3BsYXkaAAAADAAAAAQAAAACAAAAGgAAAAwAAAAEAAAAAwAAAAIAAAAsAxAABwAAAAUAAAAbAAAABwAAABwAAABpbnRlcm5hbCBlcnJvcjogZW50ZXJlZCB1bnJlYWNoYWJsZSBjb2RlOiBpbnZhbGlkIE9uY2Ugc3RhdGVoAxAAPAAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvc3RkL3NyYy9zeXMvc3luYy9vbmNlL25vX3RocmVhZHMucnMArAMQAFsAAAA1AAAAEgAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3NsaWNlLnJzAAAYBBAASgAAAL4BAAAdAAAAc3BhcmstaW50ZXJuYWwtcnMvc3JjL2xpYi5yc3QEEAAcAAAAHAAAADMAAAB0BBAAHAAAACcAAAAtAAAAAQAAAAAAAAB0BBAAHAAAAD8AAAAoAAAAL3J1c3RjLzE3MDY3ZTlhYzZkN2VjYjcwZTUwZjkyYzE5NDRlNTQ1MTg4ZDIzNTkvbGlicmFyeS9hbGxvYy9zcmMvdmVjL21vZC5yc8gEEABMAAAAVgoAACQAAAAAAAAAEAAAAAQAAAAdAAAAHgAAAB8AAAAgICAgOiAAAAEAAAAAAAAAQAUQAAIAAAAgICAgICAgL3J1c3RjLzE3MDY3ZTlhYzZkN2VjYjcwZTUwZjkyYzE5NDRlNTQ1MTg4ZDIzNTkvbGlicmFyeS9jb3JlL3NyYy9wdHIvbW9kLnJzAABbBRAASwAAAAsCAAABAAAAL3J1c3RjLzE3MDY3ZTlhYzZkN2VjYjcwZTUwZjkyYzE5NDRlNTQ1MTg4ZDIzNTkvbGlicmFyeS9jb3JlL3NyYy9zbGljZS9pbmRleC5ycwC4BRAATwAAAEwDAAA0AAAAuAUQAE8AAABTAwAAMgAAAGFzc2VydGlvbiBmYWlsZWQ6IHNlbGYuaXNfY2hhcl9ib3VuZGFyeShuKS9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwAAAFIGEABLAAAA7QcAAB0AAABSBhAASwAAAPUHAAAdAAAAUgYQAEsAAAB9BQAAGwAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3Jhd192ZWMvbW9kLnJz0AYQAFAAAAAuAgAAEQAAACAAAAAMAAAABAAAACEAAAAiAAAAIwAAACYAAAAMAAAABAAAACcAAAAoAAAAIwBB6I7AAAvBGQEAAAApAAAAYSBEaXNwbGF5IGltcGxlbWVudGF0aW9uIHJldHVybmVkIGFuIGVycm9yIHVuZXhwZWN0ZWRseS9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwAApwcQAEsAAADRCgAADgAAAEVycm9yAAAApwcQAEsAAAB9BQAAGwAAAGFzc2VydGlvbiBmYWlsZWQ6IHNlbGYuaXNfY2hhcl9ib3VuZGFyeShuZXdfbGVuKacHEABLAAAAsgUAAA0AAAAAAAAAEAAAAAQAAAAdAAAAHgAAAB8AAABiYWNrdHJhY2UgY2FwdHVyZSBmYWlsZWQvaG9tZS91c2VyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2YvYW55aG93LTEuMC45OC9zcmMvZXJyb3IucnMAAIwIEABaAAAAZwQAAA4AAAABAAAAAAAAADogAAAACRAAAgAAAAoKQ2F1c2VkIGJ5OgoAAAAYCRAAAQAAAAoKc3RhY2sgYmFja3RyYWNlOlN0YWNrIGJhY2t0cmFjZToKADYJEAARAAAAUy9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvY29yZS9zcmMvaXRlci90cmFpdHMvaXRlcmF0b3IucnMAAABRCRAAWAAAAMEHAAAJAAAAL2hvbWUvdXNlci8uY2FyZ28vcmVnaXN0cnkvc3JjL2luZGV4LmNyYXRlcy5pby0xOTQ5Y2Y4YzZiNWI1NTdmL2pzLXN5cy0wLjMuNzcvc3JjL2xpYi5yc7wJEABYAAAA+xgAAAEAAAAvaG9tZS91c2VyLy5jYXJnby9yZWdpc3RyeS9zcmMvaW5kZXguY3JhdGVzLmlvLTE5NDljZjhjNmI1YjU1N2Yvd2FzbS1iaW5kZ2VuLTAuMi4xMDAvc3JjL2NvbnZlcnQvc2xpY2VzLnJzAAAkChAAagAAACQBAAAOAAAAY2xvc3VyZSBpbnZva2VkIHJlY3Vyc2l2ZWx5IG9yIGFmdGVyIGJlaW5nIGRyb3BwZWRMYXp5IGluc3RhbmNlIGhhcyBwcmV2aW91c2x5IGJlZW4gcG9pc29uZWTSChAAKgAAAC9ob21lL3VzZXIvLmNhcmdvL3JlZ2lzdHJ5L3NyYy9pbmRleC5jcmF0ZXMuaW8tMTk0OWNmOGM2YjViNTU3Zi9vbmNlX2NlbGwtMS4yMS4zL3NyYy9saWIucnMABAsQAFsAAAAIAwAAGQAAAHJlZW50cmFudCBpbml0AABwCxAADgAAAAQLEABbAAAAegIAAA0AAAA6IAAAAAAAAAQAAAAEAAAAOwAAAC9ydXN0Yy8xNzA2N2U5YWM2ZDdlY2I3MGU1MGY5MmMxOTQ0ZTU0NTE4OGQyMzU5L2xpYnJhcnkvYWxsb2Mvc3JjL3N0cmluZy5ycwCsCxAASwAAAH0FAAAbAAAAL3J1c3RjLzE3MDY3ZTlhYzZkN2VjYjcwZTUwZjkyYzE5NDRlNTQ1MTg4ZDIzNTkvbGlicmFyeS9hbGxvYy9zcmMvcmF3X3ZlYy9tb2QucnMIDBAAUAAAAC4CAAARAAAAOgAAADwAAAAMAAAABAAAAD0AAAA+AAAAPwAAAC9ydXN0L2RlcHMvZGxtYWxsb2MtMC4yLjcvc3JjL2RsbWFsbG9jLnJzYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPj0gc2l6ZSArIG1pbl9vdmVyaGVhZACEDBAAKQAAAKgEAAAJAAAAYXNzZXJ0aW9uIGZhaWxlZDogcHNpemUgPD0gc2l6ZSArIG1heF9vdmVyaGVhZAAAhAwQACkAAACuBAAADQAAAGxpYnJhcnkvc3RkL3NyYy9iYWNrdHJhY2UucnNvcGVyYXRpb24gbm90IHN1cHBvcnRlZCBvbiB0aGlzIHBsYXRmb3JtSA0QACgAAAAkAAAAAAAAAAIAAABwDRAAdW5zdXBwb3J0ZWQgYmFja3RyYWNlZGlzYWJsZWQgYmFja3RyYWNlACwNEAAcAAAAigEAAB0AAABAAAAAEAAAAAQAAABBAAAAQgAAAAEAAAAAAAAAY2Fubm90IHJlY3Vyc2l2ZWx5IGFjcXVpcmUgbXV0ZXjcDRAAIAAAAGxpYnJhcnkvc3RkL3NyYy9zeXMvc3luYy9tdXRleC9ub190aHJlYWRzLnJzBA4QACwAAAATAAAACQAAAGxpYnJhcnkvc3RkL3NyYy9zeW5jL3BvaXNvbi9vbmNlLnJzAEAOEAAjAAAAmwAAADIAAABsaWJyYXJ5L3N0ZC9zcmMvc3luYy9sYXp5X2xvY2sucnMAAAB0DhAAIQAAANEAAAATAAAAPHVua25vd24+77+9bWVtb3J5IGFsbG9jYXRpb24gb2YgIGJ5dGVzIGZhaWxlZAAAtA4QABUAAADJDhAADQAAAGxpYnJhcnkvc3RkL3NyYy9hbGxvYy5yc+gOEAAYAAAAZAEAAAkAAAAKAAAAPAAAAAwAAAAEAAAAQwAAAAAAAAAIAAAABAAAAEQAAAAAAAAACAAAAAQAAABFAAAARgAAAEcAAABIAAAASQAAABAAAAAEAAAASgAAAEsAAABMAAAATQAAAGxpYnJhcnkvc3RkL3NyYy8uLi8uLi9iYWNrdHJhY2Uvc3JjL3N5bWJvbGl6ZS9tb2QucnNsDxAANAAAAGcBAAAwAAAAAQAAAAAAAACYCxAAAgAAACAtIAABAAAAAAAAAMAPEAADAAAAICAgICAgICAgICAgICAgICAgIGF0IAAAaAwQAAEAAABPbmNlIGluc3RhbmNlIGhhcyBwcmV2aW91c2x5IGJlZW4gcG9pc29uZWQAAPQPEAAqAAAAb25l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", self.location.href);\n    }\n    const imports = __wbg_get_imports();\n    if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {\n      module_or_path = fetch(module_or_path);\n    }\n    const { instance, module } = await __wbg_load(await module_or_path, imports);\n    return __wbg_finalize_init(instance, module);\n  }\n  var ch2 = {};\n  var wk = function(c, id, msg, transfer, cb) {\n    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([\n      c + \';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})\'\n    ], { type: "text/javascript" }))));\n    w.onmessage = function(e) {\n      var d = e.data, ed = d.$e$;\n      if (ed) {\n        var err2 = new Error(ed[0]);\n        err2["code"] = ed[1];\n        err2.stack = ed[2];\n        cb(err2, null);\n      } else\n        cb(null, d);\n    };\n    w.postMessage(msg, transfer);\n    return w;\n  };\n  var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;\n  var fleb = new u8([\n    0,\n    0,\n    0,\n    0,\n    0,\n    0,\n    0,\n    0,\n    1,\n    1,\n    1,\n    1,\n    2,\n    2,\n    2,\n    2,\n    3,\n    3,\n    3,\n    3,\n    4,\n    4,\n    4,\n    4,\n    5,\n    5,\n    5,\n    5,\n    0,\n    /* unused */\n    0,\n    0,\n    /* impossible */\n    0\n  ]);\n  var fdeb = new u8([\n    0,\n    0,\n    0,\n    0,\n    1,\n    1,\n    2,\n    2,\n    3,\n    3,\n    4,\n    4,\n    5,\n    5,\n    6,\n    6,\n    7,\n    7,\n    8,\n    8,\n    9,\n    9,\n    10,\n    10,\n    11,\n    11,\n    12,\n    12,\n    13,\n    13,\n    /* unused */\n    0,\n    0\n  ]);\n  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);\n  var freb = function(eb, start) {\n    var b = new u16(31);\n    for (var i2 = 0; i2 < 31; ++i2) {\n      b[i2] = start += 1 << eb[i2 - 1];\n    }\n    var r = new i32(b[30]);\n    for (var i2 = 1; i2 < 30; ++i2) {\n      for (var j = b[i2]; j < b[i2 + 1]; ++j) {\n        r[j] = j - b[i2] << 5 | i2;\n      }\n    }\n    return { b, r };\n  };\n  var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;\n  fl[28] = 258, revfl[258] = 28;\n  var _b = freb(fdeb, 0), fd = _b.b;\n  var rev = new u16(32768);\n  for (var i = 0; i < 32768; ++i) {\n    var x = (i & 43690) >> 1 | (i & 21845) << 1;\n    x = (x & 52428) >> 2 | (x & 13107) << 2;\n    x = (x & 61680) >> 4 | (x & 3855) << 4;\n    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;\n  }\n  var hMap = function(cd, mb, r) {\n    var s = cd.length;\n    var i2 = 0;\n    var l = new u16(mb);\n    for (; i2 < s; ++i2) {\n      if (cd[i2])\n        ++l[cd[i2] - 1];\n    }\n    var le = new u16(mb);\n    for (i2 = 1; i2 < mb; ++i2) {\n      le[i2] = le[i2 - 1] + l[i2 - 1] << 1;\n    }\n    var co;\n    if (r) {\n      co = new u16(1 << mb);\n      var rvb = 15 - mb;\n      for (i2 = 0; i2 < s; ++i2) {\n        if (cd[i2]) {\n          var sv = i2 << 4 | cd[i2];\n          var r_1 = mb - cd[i2];\n          var v = le[cd[i2] - 1]++ << r_1;\n          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {\n            co[rev[v] >> rvb] = sv;\n          }\n        }\n      }\n    } else {\n      co = new u16(s);\n      for (i2 = 0; i2 < s; ++i2) {\n        if (cd[i2]) {\n          co[i2] = rev[le[cd[i2] - 1]++] >> 15 - cd[i2];\n        }\n      }\n    }\n    return co;\n  };\n  var flt = new u8(288);\n  for (var i = 0; i < 144; ++i)\n    flt[i] = 8;\n  for (var i = 144; i < 256; ++i)\n    flt[i] = 9;\n  for (var i = 256; i < 280; ++i)\n    flt[i] = 7;\n  for (var i = 280; i < 288; ++i)\n    flt[i] = 8;\n  var fdt = new u8(32);\n  for (var i = 0; i < 32; ++i)\n    fdt[i] = 5;\n  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);\n  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);\n  var max = function(a) {\n    var m = a[0];\n    for (var i2 = 1; i2 < a.length; ++i2) {\n      if (a[i2] > m)\n        m = a[i2];\n    }\n    return m;\n  };\n  var bits = function(d, p, m) {\n    var o = p / 8 | 0;\n    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;\n  };\n  var bits16 = function(d, p) {\n    var o = p / 8 | 0;\n    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);\n  };\n  var shft = function(p) {\n    return (p + 7) / 8 | 0;\n  };\n  var slc = function(v, s, e) {\n    if (s == null || s < 0)\n      s = 0;\n    if (e == null || e > v.length)\n      e = v.length;\n    return new u8(v.subarray(s, e));\n  };\n  var ec = [\n    "unexpected EOF",\n    "invalid block type",\n    "invalid length/literal",\n    "invalid distance",\n    "stream finished",\n    "no stream handler",\n    ,\n    "no callback",\n    "invalid UTF-8 data",\n    "extra field too long",\n    "date not in range 1980-2099",\n    "filename too long",\n    "stream finishing",\n    "invalid zip data"\n    // determined by unknown compression method\n  ];\n  var err = function(ind, msg, nt) {\n    var e = new Error(msg || ec[ind]);\n    e.code = ind;\n    if (Error.captureStackTrace)\n      Error.captureStackTrace(e, err);\n    if (!nt)\n      throw e;\n    return e;\n  };\n  var inflt = function(dat, st, buf, dict) {\n    var sl = dat.length, dl = dict ? dict.length : 0;\n    if (!sl || st.f && !st.l)\n      return buf || new u8(0);\n    var noBuf = !buf;\n    var resize = noBuf || st.i != 2;\n    var noSt = st.i;\n    if (noBuf)\n      buf = new u8(sl * 3);\n    var cbuf = function(l2) {\n      var bl = buf.length;\n      if (l2 > bl) {\n        var nbuf = new u8(Math.max(bl * 2, l2));\n        nbuf.set(buf);\n        buf = nbuf;\n      }\n    };\n    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;\n    var tbts = sl * 8;\n    do {\n      if (!lm) {\n        final = bits(dat, pos, 1);\n        var type = bits(dat, pos + 1, 3);\n        pos += 3;\n        if (!type) {\n          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;\n          if (t > sl) {\n            if (noSt)\n              err(0);\n            break;\n          }\n          if (resize)\n            cbuf(bt + l);\n          buf.set(dat.subarray(s, t), bt);\n          st.b = bt += l, st.p = pos = t * 8, st.f = final;\n          continue;\n        } else if (type == 1)\n          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;\n        else if (type == 2) {\n          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;\n          var tl = hLit + bits(dat, pos + 5, 31) + 1;\n          pos += 14;\n          var ldt = new u8(tl);\n          var clt = new u8(19);\n          for (var i2 = 0; i2 < hcLen; ++i2) {\n            clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);\n          }\n          pos += hcLen * 3;\n          var clb = max(clt), clbmsk = (1 << clb) - 1;\n          var clm = hMap(clt, clb, 1);\n          for (var i2 = 0; i2 < tl; ) {\n            var r = clm[bits(dat, pos, clbmsk)];\n            pos += r & 15;\n            var s = r >> 4;\n            if (s < 16) {\n              ldt[i2++] = s;\n            } else {\n              var c = 0, n = 0;\n              if (s == 16)\n                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i2 - 1];\n              else if (s == 17)\n                n = 3 + bits(dat, pos, 7), pos += 3;\n              else if (s == 18)\n                n = 11 + bits(dat, pos, 127), pos += 7;\n              while (n--)\n                ldt[i2++] = c;\n            }\n          }\n          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);\n          lbt = max(lt);\n          dbt = max(dt);\n          lm = hMap(lt, lbt, 1);\n          dm = hMap(dt, dbt, 1);\n        } else\n          err(1);\n        if (pos > tbts) {\n          if (noSt)\n            err(0);\n          break;\n        }\n      }\n      if (resize)\n        cbuf(bt + 131072);\n      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;\n      var lpos = pos;\n      for (; ; lpos = pos) {\n        var c = lm[bits16(dat, pos) & lms], sym = c >> 4;\n        pos += c & 15;\n        if (pos > tbts) {\n          if (noSt)\n            err(0);\n          break;\n        }\n        if (!c)\n          err(2);\n        if (sym < 256)\n          buf[bt++] = sym;\n        else if (sym == 256) {\n          lpos = pos, lm = null;\n          break;\n        } else {\n          var add = sym - 254;\n          if (sym > 264) {\n            var i2 = sym - 257, b = fleb[i2];\n            add = bits(dat, pos, (1 << b) - 1) + fl[i2];\n            pos += b;\n          }\n          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;\n          if (!d)\n            err(3);\n          pos += d & 15;\n          var dt = fd[dsym];\n          if (dsym > 3) {\n            var b = fdeb[dsym];\n            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;\n          }\n          if (pos > tbts) {\n            if (noSt)\n              err(0);\n            break;\n          }\n          if (resize)\n            cbuf(bt + 131072);\n          var end = bt + add;\n          if (bt < dt) {\n            var shift = dl - dt, dend = Math.min(dt, end);\n            if (shift + bt < 0)\n              err(3);\n            for (; bt < dend; ++bt)\n              buf[bt] = dict[shift + bt];\n          }\n          for (; bt < end; ++bt)\n            buf[bt] = buf[bt - dt];\n        }\n      }\n      st.l = lm, st.p = lpos, st.b = bt, st.f = final;\n      if (lm)\n        final = 1, st.m = lbt, st.d = dm, st.n = dbt;\n    } while (!final);\n    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);\n  };\n  var et = /* @__PURE__ */ new u8(0);\n  var mrg = function(a, b) {\n    var o = {};\n    for (var k in a)\n      o[k] = a[k];\n    for (var k in b)\n      o[k] = b[k];\n    return o;\n  };\n  var wcln = function(fn, fnStr, td2) {\n    var dt = fn();\n    var st = fn.toString();\n    var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\\s+/g, "").split(",");\n    for (var i2 = 0; i2 < dt.length; ++i2) {\n      var v = dt[i2], k = ks[i2];\n      if (typeof v == "function") {\n        fnStr += ";" + k + "=";\n        var st_1 = v.toString();\n        if (v.prototype) {\n          if (st_1.indexOf("[native code]") != -1) {\n            var spInd = st_1.indexOf(" ", 8) + 1;\n            fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));\n          } else {\n            fnStr += st_1;\n            for (var t in v.prototype)\n              fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();\n          }\n        } else\n          fnStr += st_1;\n      } else\n        td2[k] = v;\n    }\n    return fnStr;\n  };\n  var ch = [];\n  var cbfs = function(v) {\n    var tl = [];\n    for (var k in v) {\n      if (v[k].buffer) {\n        tl.push((v[k] = new v[k].constructor(v[k])).buffer);\n      }\n    }\n    return tl;\n  };\n  var wrkr = function(fns, init, id, cb) {\n    if (!ch[id]) {\n      var fnStr = "", td_1 = {}, m = fns.length - 1;\n      for (var i2 = 0; i2 < m; ++i2)\n        fnStr = wcln(fns[i2], fnStr, td_1);\n      ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };\n    }\n    var td2 = mrg({}, ch[id].e);\n    return wk(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);\n  };\n  var bInflt = function() {\n    return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt];\n  };\n  var pbf = function(msg) {\n    return postMessage(msg, [msg.buffer]);\n  };\n  var gopt = function(o) {\n    return o && {\n      out: o.size && new u8(o.size),\n      dictionary: o.dictionary\n    };\n  };\n  var cbify = function(dat, opts, fns, init, id, cb) {\n    var w = wrkr(fns, init, id, function(err2, dat2) {\n      w.terminate();\n      cb(err2, dat2);\n    });\n    w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);\n    return function() {\n      w.terminate();\n    };\n  };\n  var b2 = function(d, b) {\n    return d[b] | d[b + 1] << 8;\n  };\n  var b4 = function(d, b) {\n    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;\n  };\n  var b8 = function(d, b) {\n    return b4(d, b) + b4(d, b + 4) * 4294967296;\n  };\n  var gzs = function(d) {\n    if (d[0] != 31 || d[1] != 139 || d[2] != 8)\n      err(6, "invalid gzip data");\n    var flg = d[3];\n    var st = 10;\n    if (flg & 4)\n      st += (d[10] | d[11] << 8) + 2;\n    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])\n      ;\n    return st + (flg & 2);\n  };\n  var Inflate = /* @__PURE__ */ function() {\n    function Inflate2(opts, cb) {\n      if (typeof opts == "function")\n        cb = opts, opts = {};\n      this.ondata = cb;\n      var dict = opts && opts.dictionary && opts.dictionary.subarray(-32768);\n      this.s = { i: 0, b: dict ? dict.length : 0 };\n      this.o = new u8(32768);\n      this.p = new u8(0);\n      if (dict)\n        this.o.set(dict);\n    }\n    Inflate2.prototype.e = function(c) {\n      if (!this.ondata)\n        err(5);\n      if (this.d)\n        err(4);\n      if (!this.p.length)\n        this.p = c;\n      else if (c.length) {\n        var n = new u8(this.p.length + c.length);\n        n.set(this.p), n.set(c, this.p.length), this.p = n;\n      }\n    };\n    Inflate2.prototype.c = function(final) {\n      this.s.i = +(this.d = final || false);\n      var bts = this.s.b;\n      var dt = inflt(this.p, this.s, this.o);\n      this.ondata(slc(dt, bts, this.s.b), this.d);\n      this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;\n      this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;\n    };\n    Inflate2.prototype.push = function(chunk, final) {\n      this.e(chunk), this.c(final);\n    };\n    return Inflate2;\n  }();\n  function inflate(data, opts, cb) {\n    if (!cb)\n      cb = opts, opts = {};\n    if (typeof cb != "function")\n      err(7);\n    return cbify(data, opts, [\n      bInflt\n    ], function(ev) {\n      return pbf(inflateSync(ev.data[0], gopt(ev.data[1])));\n    }, 1, cb);\n  }\n  function inflateSync(data, opts) {\n    return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);\n  }\n  var Gunzip = /* @__PURE__ */ function() {\n    function Gunzip2(opts, cb) {\n      this.v = 1;\n      this.r = 0;\n      Inflate.call(this, opts, cb);\n    }\n    Gunzip2.prototype.push = function(chunk, final) {\n      Inflate.prototype.e.call(this, chunk);\n      this.r += chunk.length;\n      if (this.v) {\n        var p = this.p.subarray(this.v - 1);\n        var s = p.length > 3 ? gzs(p) : 4;\n        if (s > p.length) {\n          if (!final)\n            return;\n        } else if (this.v > 1 && this.onmember) {\n          this.onmember(this.r - p.length);\n        }\n        this.p = p.subarray(s), this.v = 0;\n      }\n      Inflate.prototype.c.call(this, final);\n      if (this.s.f && !this.s.l && !final) {\n        this.v = shft(this.s.p) + 9;\n        this.s = { i: 0 };\n        this.o = new u8(0);\n        this.push(new u8(0), final);\n      }\n    };\n    return Gunzip2;\n  }();\n  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();\n  try {\n    td.decode(et, { stream: true });\n  } catch (e) {\n  }\n  var dutf8 = function(d) {\n    for (var r = "", i2 = 0; ; ) {\n      var c = d[i2++];\n      var eb = (c > 127) + (c > 223) + (c > 239);\n      if (i2 + eb > d.length)\n        return { s: r, r: slc(d, i2 - 1) };\n      if (!eb)\n        r += String.fromCharCode(c);\n      else if (eb == 3) {\n        c = ((c & 15) << 18 | (d[i2++] & 63) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);\n      } else if (eb & 1)\n        r += String.fromCharCode((c & 31) << 6 | d[i2++] & 63);\n      else\n        r += String.fromCharCode((c & 15) << 12 | (d[i2++] & 63) << 6 | d[i2++] & 63);\n    }\n  };\n  function strFromU8(dat, latin1) {\n    if (latin1) {\n      var r = "";\n      for (var i2 = 0; i2 < dat.length; i2 += 16384)\n        r += String.fromCharCode.apply(null, dat.subarray(i2, i2 + 16384));\n      return r;\n    } else if (td) {\n      return td.decode(dat);\n    } else {\n      var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;\n      if (r.length)\n        err(8);\n      return s;\n    }\n  }\n  var slzh = function(d, b) {\n    return b + 30 + b2(d, b + 26) + b2(d, b + 28);\n  };\n  var zh = function(d, b, z) {\n    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);\n    var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];\n    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];\n  };\n  var z64e = function(d, b) {\n    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))\n      ;\n    return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];\n  };\n  var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {\n    fn();\n  };\n  function unzip(data, opts, cb) {\n    if (!cb)\n      cb = opts, opts = {};\n    if (typeof cb != "function")\n      err(7);\n    var term = [];\n    var tAll = function() {\n      for (var i3 = 0; i3 < term.length; ++i3)\n        term[i3]();\n    };\n    var files = {};\n    var cbd = function(a, b) {\n      mt(function() {\n        cb(a, b);\n      });\n    };\n    mt(function() {\n      cbd = cb;\n    });\n    var e = data.length - 22;\n    for (; b4(data, e) != 101010256; --e) {\n      if (!e || data.length - e > 65558) {\n        cbd(err(13, 0, 1), null);\n        return tAll;\n      }\n    }\n    var lft = b2(data, e + 8);\n    if (lft) {\n      var c = lft;\n      var o = b4(data, e + 16);\n      var z = o == 4294967295 || c == 65535;\n      if (z) {\n        var ze = b4(data, e - 12);\n        z = b4(data, ze) == 101075792;\n        if (z) {\n          c = lft = b4(data, ze + 32);\n          o = b4(data, ze + 48);\n        }\n      }\n      var fltr = opts && opts.filter;\n      var _loop_3 = function(i3) {\n        var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);\n        o = no;\n        var cbl = function(e2, d) {\n          if (e2) {\n            tAll();\n            cbd(e2, null);\n          } else {\n            if (d)\n              files[fn] = d;\n            if (!--lft)\n              cbd(null, files);\n          }\n        };\n        if (!fltr || fltr({\n          name: fn,\n          size: sc,\n          originalSize: su,\n          compression: c_1\n        })) {\n          if (!c_1)\n            cbl(null, slc(data, b, b + sc));\n          else if (c_1 == 8) {\n            var infl = data.subarray(b, b + sc);\n            if (su < 524288 || sc > 0.8 * su) {\n              try {\n                cbl(null, inflateSync(infl, { out: new u8(su) }));\n              } catch (e2) {\n                cbl(e2, null);\n              }\n            } else\n              term.push(inflate(infl, { size: su }, cbl));\n          } else\n            cbl(err(14, "unknown compression type " + c_1, 1), null);\n        } else\n          cbl(null, null);\n      };\n      for (var i2 = 0; i2 < c; ++i2) {\n        _loop_3(i2);\n      }\n    } else\n      cbd(null, {});\n    return tAll;\n  }\n  function unzipSync(data, opts) {\n    var files = {};\n    var e = data.length - 22;\n    for (; b4(data, e) != 101010256; --e) {\n      if (!e || data.length - e > 65558)\n        err(13);\n    }\n    var c = b2(data, e + 8);\n    if (!c)\n      return {};\n    var o = b4(data, e + 16);\n    var z = o == 4294967295 || c == 65535;\n    if (z) {\n      var ze = b4(data, e - 12);\n      z = b4(data, ze) == 101075792;\n      if (z) {\n        c = b4(data, ze + 32);\n        o = b4(data, ze + 48);\n      }\n    }\n    var fltr = opts && opts.filter;\n    for (var i2 = 0; i2 < c; ++i2) {\n      var _a2 = zh(data, o, z), c_2 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);\n      o = no;\n      if (!fltr || fltr({\n        name: fn,\n        size: sc,\n        originalSize: su,\n        compression: c_2\n      })) {\n        if (!c_2)\n          files[fn] = slc(data, b, b + sc);\n        else if (c_2 == 8)\n          files[fn] = inflateSync(data.subarray(b, b + sc), { out: new u8(su) });\n        else\n          err(14, "unknown compression type " + c_2);\n      }\n    }\n    return files;\n  }\n  /**\n   * @license\n   * Copyright 2010-2024 Three.js Authors\n   * SPDX-License-Identifier: MIT\n   */\n  const REVISION = "172";\n  const NoColorSpace = "";\n  const SRGBColorSpace = "srgb";\n  const LinearSRGBColorSpace = "srgb-linear";\n  const LinearTransfer = "linear";\n  const SRGBTransfer = "srgb";\n  function clamp(value, min, max2) {\n    return Math.max(min, Math.min(max2, value));\n  }\n  function euclideanModulo(n, m) {\n    return (n % m + m) % m;\n  }\n  function lerp(x2, y, t) {\n    return (1 - t) * x2 + t * y;\n  }\n  class Matrix3 {\n    constructor(n11, n12, n13, n21, n22, n23, n31, n32, n33) {\n      Matrix3.prototype.isMatrix3 = true;\n      this.elements = [\n        1,\n        0,\n        0,\n        0,\n        1,\n        0,\n        0,\n        0,\n        1\n      ];\n      if (n11 !== void 0) {\n        this.set(n11, n12, n13, n21, n22, n23, n31, n32, n33);\n      }\n    }\n    set(n11, n12, n13, n21, n22, n23, n31, n32, n33) {\n      const te = this.elements;\n      te[0] = n11;\n      te[1] = n21;\n      te[2] = n31;\n      te[3] = n12;\n      te[4] = n22;\n      te[5] = n32;\n      te[6] = n13;\n      te[7] = n23;\n      te[8] = n33;\n      return this;\n    }\n    identity() {\n      this.set(\n        1,\n        0,\n        0,\n        0,\n        1,\n        0,\n        0,\n        0,\n        1\n      );\n      return this;\n    }\n    copy(m) {\n      const te = this.elements;\n      const me = m.elements;\n      te[0] = me[0];\n      te[1] = me[1];\n      te[2] = me[2];\n      te[3] = me[3];\n      te[4] = me[4];\n      te[5] = me[5];\n      te[6] = me[6];\n      te[7] = me[7];\n      te[8] = me[8];\n      return this;\n    }\n    extractBasis(xAxis, yAxis, zAxis) {\n      xAxis.setFromMatrix3Column(this, 0);\n      yAxis.setFromMatrix3Column(this, 1);\n      zAxis.setFromMatrix3Column(this, 2);\n      return this;\n    }\n    setFromMatrix4(m) {\n      const me = m.elements;\n      this.set(\n        me[0],\n        me[4],\n        me[8],\n        me[1],\n        me[5],\n        me[9],\n        me[2],\n        me[6],\n        me[10]\n      );\n      return this;\n    }\n    multiply(m) {\n      return this.multiplyMatrices(this, m);\n    }\n    premultiply(m) {\n      return this.multiplyMatrices(m, this);\n    }\n    multiplyMatrices(a, b) {\n      const ae = a.elements;\n      const be = b.elements;\n      const te = this.elements;\n      const a11 = ae[0], a12 = ae[3], a13 = ae[6];\n      const a21 = ae[1], a22 = ae[4], a23 = ae[7];\n      const a31 = ae[2], a32 = ae[5], a33 = ae[8];\n      const b11 = be[0], b12 = be[3], b13 = be[6];\n      const b21 = be[1], b22 = be[4], b23 = be[7];\n      const b31 = be[2], b32 = be[5], b33 = be[8];\n      te[0] = a11 * b11 + a12 * b21 + a13 * b31;\n      te[3] = a11 * b12 + a12 * b22 + a13 * b32;\n      te[6] = a11 * b13 + a12 * b23 + a13 * b33;\n      te[1] = a21 * b11 + a22 * b21 + a23 * b31;\n      te[4] = a21 * b12 + a22 * b22 + a23 * b32;\n      te[7] = a21 * b13 + a22 * b23 + a23 * b33;\n      te[2] = a31 * b11 + a32 * b21 + a33 * b31;\n      te[5] = a31 * b12 + a32 * b22 + a33 * b32;\n      te[8] = a31 * b13 + a32 * b23 + a33 * b33;\n      return this;\n    }\n    multiplyScalar(s) {\n      const te = this.elements;\n      te[0] *= s;\n      te[3] *= s;\n      te[6] *= s;\n      te[1] *= s;\n      te[4] *= s;\n      te[7] *= s;\n      te[2] *= s;\n      te[5] *= s;\n      te[8] *= s;\n      return this;\n    }\n    determinant() {\n      const te = this.elements;\n      const a = te[0], b = te[1], c = te[2], d = te[3], e = te[4], f = te[5], g = te[6], h = te[7], i2 = te[8];\n      return a * e * i2 - a * f * h - b * d * i2 + b * f * g + c * d * h - c * e * g;\n    }\n    invert() {\n      const te = this.elements, n11 = te[0], n21 = te[1], n31 = te[2], n12 = te[3], n22 = te[4], n32 = te[5], n13 = te[6], n23 = te[7], n33 = te[8], t11 = n33 * n22 - n32 * n23, t12 = n32 * n13 - n33 * n12, t13 = n23 * n12 - n22 * n13, det = n11 * t11 + n21 * t12 + n31 * t13;\n      if (det === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);\n      const detInv = 1 / det;\n      te[0] = t11 * detInv;\n      te[1] = (n31 * n23 - n33 * n21) * detInv;\n      te[2] = (n32 * n21 - n31 * n22) * detInv;\n      te[3] = t12 * detInv;\n      te[4] = (n33 * n11 - n31 * n13) * detInv;\n      te[5] = (n31 * n12 - n32 * n11) * detInv;\n      te[6] = t13 * detInv;\n      te[7] = (n21 * n13 - n23 * n11) * detInv;\n      te[8] = (n22 * n11 - n21 * n12) * detInv;\n      return this;\n    }\n    transpose() {\n      let tmp;\n      const m = this.elements;\n      tmp = m[1];\n      m[1] = m[3];\n      m[3] = tmp;\n      tmp = m[2];\n      m[2] = m[6];\n      m[6] = tmp;\n      tmp = m[5];\n      m[5] = m[7];\n      m[7] = tmp;\n      return this;\n    }\n    getNormalMatrix(matrix4) {\n      return this.setFromMatrix4(matrix4).invert().transpose();\n    }\n    transposeIntoArray(r) {\n      const m = this.elements;\n      r[0] = m[0];\n      r[1] = m[3];\n      r[2] = m[6];\n      r[3] = m[1];\n      r[4] = m[4];\n      r[5] = m[7];\n      r[6] = m[2];\n      r[7] = m[5];\n      r[8] = m[8];\n      return this;\n    }\n    setUvTransform(tx, ty, sx, sy, rotation, cx, cy) {\n      const c = Math.cos(rotation);\n      const s = Math.sin(rotation);\n      this.set(\n        sx * c,\n        sx * s,\n        -sx * (c * cx + s * cy) + cx + tx,\n        -sy * s,\n        sy * c,\n        -sy * (-s * cx + c * cy) + cy + ty,\n        0,\n        0,\n        1\n      );\n      return this;\n    }\n    //\n    scale(sx, sy) {\n      this.premultiply(_m3.makeScale(sx, sy));\n      return this;\n    }\n    rotate(theta) {\n      this.premultiply(_m3.makeRotation(-theta));\n      return this;\n    }\n    translate(tx, ty) {\n      this.premultiply(_m3.makeTranslation(tx, ty));\n      return this;\n    }\n    // for 2D Transforms\n    makeTranslation(x2, y) {\n      if (x2.isVector2) {\n        this.set(\n          1,\n          0,\n          x2.x,\n          0,\n          1,\n          x2.y,\n          0,\n          0,\n          1\n        );\n      } else {\n        this.set(\n          1,\n          0,\n          x2,\n          0,\n          1,\n          y,\n          0,\n          0,\n          1\n        );\n      }\n      return this;\n    }\n    makeRotation(theta) {\n      const c = Math.cos(theta);\n      const s = Math.sin(theta);\n      this.set(\n        c,\n        -s,\n        0,\n        s,\n        c,\n        0,\n        0,\n        0,\n        1\n      );\n      return this;\n    }\n    makeScale(x2, y) {\n      this.set(\n        x2,\n        0,\n        0,\n        0,\n        y,\n        0,\n        0,\n        0,\n        1\n      );\n      return this;\n    }\n    //\n    equals(matrix) {\n      const te = this.elements;\n      const me = matrix.elements;\n      for (let i2 = 0; i2 < 9; i2++) {\n        if (te[i2] !== me[i2]) return false;\n      }\n      return true;\n    }\n    fromArray(array, offset = 0) {\n      for (let i2 = 0; i2 < 9; i2++) {\n        this.elements[i2] = array[i2 + offset];\n      }\n      return this;\n    }\n    toArray(array = [], offset = 0) {\n      const te = this.elements;\n      array[offset] = te[0];\n      array[offset + 1] = te[1];\n      array[offset + 2] = te[2];\n      array[offset + 3] = te[3];\n      array[offset + 4] = te[4];\n      array[offset + 5] = te[5];\n      array[offset + 6] = te[6];\n      array[offset + 7] = te[7];\n      array[offset + 8] = te[8];\n      return array;\n    }\n    clone() {\n      return new this.constructor().fromArray(this.elements);\n    }\n  }\n  const _m3 = /* @__PURE__ */ new Matrix3();\n  const LINEAR_REC709_TO_XYZ = /* @__PURE__ */ new Matrix3().set(\n    0.4123908,\n    0.3575843,\n    0.1804808,\n    0.212639,\n    0.7151687,\n    0.0721923,\n    0.0193308,\n    0.1191948,\n    0.9505322\n  );\n  const XYZ_TO_LINEAR_REC709 = /* @__PURE__ */ new Matrix3().set(\n    3.2409699,\n    -1.5373832,\n    -0.4986108,\n    -0.9692436,\n    1.8759675,\n    0.0415551,\n    0.0556301,\n    -0.203977,\n    1.0569715\n  );\n  function createColorManagement() {\n    const ColorManagement2 = {\n      enabled: true,\n      workingColorSpace: LinearSRGBColorSpace,\n      /**\n       * Implementations of supported color spaces.\n       *\n       * Required:\n       *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]\n       *	- whitePoint: reference white [ x y ]\n       *	- transfer: transfer function (pre-defined)\n       *	- toXYZ: Matrix3 RGB to XYZ transform\n       *	- fromXYZ: Matrix3 XYZ to RGB transform\n       *	- luminanceCoefficients: RGB luminance coefficients\n       *\n       * Optional:\n       *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace }\n       *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }\n       *\n       * Reference:\n       * - https://www.russellcottrell.com/photo/matrixCalculator.htm\n       */\n      spaces: {},\n      convert: function(color, sourceColorSpace, targetColorSpace) {\n        if (this.enabled === false || sourceColorSpace === targetColorSpace || !sourceColorSpace || !targetColorSpace) {\n          return color;\n        }\n        if (this.spaces[sourceColorSpace].transfer === SRGBTransfer) {\n          color.r = SRGBToLinear(color.r);\n          color.g = SRGBToLinear(color.g);\n          color.b = SRGBToLinear(color.b);\n        }\n        if (this.spaces[sourceColorSpace].primaries !== this.spaces[targetColorSpace].primaries) {\n          color.applyMatrix3(this.spaces[sourceColorSpace].toXYZ);\n          color.applyMatrix3(this.spaces[targetColorSpace].fromXYZ);\n        }\n        if (this.spaces[targetColorSpace].transfer === SRGBTransfer) {\n          color.r = LinearToSRGB(color.r);\n          color.g = LinearToSRGB(color.g);\n          color.b = LinearToSRGB(color.b);\n        }\n        return color;\n      },\n      fromWorkingColorSpace: function(color, targetColorSpace) {\n        return this.convert(color, this.workingColorSpace, targetColorSpace);\n      },\n      toWorkingColorSpace: function(color, sourceColorSpace) {\n        return this.convert(color, sourceColorSpace, this.workingColorSpace);\n      },\n      getPrimaries: function(colorSpace) {\n        return this.spaces[colorSpace].primaries;\n      },\n      getTransfer: function(colorSpace) {\n        if (colorSpace === NoColorSpace) return LinearTransfer;\n        return this.spaces[colorSpace].transfer;\n      },\n      getLuminanceCoefficients: function(target, colorSpace = this.workingColorSpace) {\n        return target.fromArray(this.spaces[colorSpace].luminanceCoefficients);\n      },\n      define: function(colorSpaces) {\n        Object.assign(this.spaces, colorSpaces);\n      },\n      // Internal APIs\n      _getMatrix: function(targetMatrix, sourceColorSpace, targetColorSpace) {\n        return targetMatrix.copy(this.spaces[sourceColorSpace].toXYZ).multiply(this.spaces[targetColorSpace].fromXYZ);\n      },\n      _getDrawingBufferColorSpace: function(colorSpace) {\n        return this.spaces[colorSpace].outputColorSpaceConfig.drawingBufferColorSpace;\n      },\n      _getUnpackColorSpace: function(colorSpace = this.workingColorSpace) {\n        return this.spaces[colorSpace].workingColorSpaceConfig.unpackColorSpace;\n      }\n    };\n    const REC709_PRIMARIES = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06];\n    const REC709_LUMINANCE_COEFFICIENTS = [0.2126, 0.7152, 0.0722];\n    const D65 = [0.3127, 0.329];\n    ColorManagement2.define({\n      [LinearSRGBColorSpace]: {\n        primaries: REC709_PRIMARIES,\n        whitePoint: D65,\n        transfer: LinearTransfer,\n        toXYZ: LINEAR_REC709_TO_XYZ,\n        fromXYZ: XYZ_TO_LINEAR_REC709,\n        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,\n        workingColorSpaceConfig: { unpackColorSpace: SRGBColorSpace },\n        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }\n      },\n      [SRGBColorSpace]: {\n        primaries: REC709_PRIMARIES,\n        whitePoint: D65,\n        transfer: SRGBTransfer,\n        toXYZ: LINEAR_REC709_TO_XYZ,\n        fromXYZ: XYZ_TO_LINEAR_REC709,\n        luminanceCoefficients: REC709_LUMINANCE_COEFFICIENTS,\n        outputColorSpaceConfig: { drawingBufferColorSpace: SRGBColorSpace }\n      }\n    });\n    return ColorManagement2;\n  }\n  const ColorManagement = /* @__PURE__ */ createColorManagement();\n  function SRGBToLinear(c) {\n    return c < 0.04045 ? c * 0.0773993808 : Math.pow(c * 0.9478672986 + 0.0521327014, 2.4);\n  }\n  function LinearToSRGB(c) {\n    return c < 31308e-7 ? c * 12.92 : 1.055 * Math.pow(c, 0.41666) - 0.055;\n  }\n  class Quaternion {\n    constructor(x2 = 0, y = 0, z = 0, w = 1) {\n      this.isQuaternion = true;\n      this._x = x2;\n      this._y = y;\n      this._z = z;\n      this._w = w;\n    }\n    static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {\n      let x0 = src0[srcOffset0 + 0], y0 = src0[srcOffset0 + 1], z0 = src0[srcOffset0 + 2], w0 = src0[srcOffset0 + 3];\n      const x1 = src1[srcOffset1 + 0], y1 = src1[srcOffset1 + 1], z1 = src1[srcOffset1 + 2], w1 = src1[srcOffset1 + 3];\n      if (t === 0) {\n        dst[dstOffset + 0] = x0;\n        dst[dstOffset + 1] = y0;\n        dst[dstOffset + 2] = z0;\n        dst[dstOffset + 3] = w0;\n        return;\n      }\n      if (t === 1) {\n        dst[dstOffset + 0] = x1;\n        dst[dstOffset + 1] = y1;\n        dst[dstOffset + 2] = z1;\n        dst[dstOffset + 3] = w1;\n        return;\n      }\n      if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {\n        let s = 1 - t;\n        const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1, dir = cos >= 0 ? 1 : -1, sqrSin = 1 - cos * cos;\n        if (sqrSin > Number.EPSILON) {\n          const sin = Math.sqrt(sqrSin), len = Math.atan2(sin, cos * dir);\n          s = Math.sin(s * len) / sin;\n          t = Math.sin(t * len) / sin;\n        }\n        const tDir = t * dir;\n        x0 = x0 * s + x1 * tDir;\n        y0 = y0 * s + y1 * tDir;\n        z0 = z0 * s + z1 * tDir;\n        w0 = w0 * s + w1 * tDir;\n        if (s === 1 - t) {\n          const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);\n          x0 *= f;\n          y0 *= f;\n          z0 *= f;\n          w0 *= f;\n        }\n      }\n      dst[dstOffset] = x0;\n      dst[dstOffset + 1] = y0;\n      dst[dstOffset + 2] = z0;\n      dst[dstOffset + 3] = w0;\n    }\n    static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {\n      const x0 = src0[srcOffset0];\n      const y0 = src0[srcOffset0 + 1];\n      const z0 = src0[srcOffset0 + 2];\n      const w0 = src0[srcOffset0 + 3];\n      const x1 = src1[srcOffset1];\n      const y1 = src1[srcOffset1 + 1];\n      const z1 = src1[srcOffset1 + 2];\n      const w1 = src1[srcOffset1 + 3];\n      dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;\n      dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;\n      dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;\n      dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;\n      return dst;\n    }\n    get x() {\n      return this._x;\n    }\n    set x(value) {\n      this._x = value;\n      this._onChangeCallback();\n    }\n    get y() {\n      return this._y;\n    }\n    set y(value) {\n      this._y = value;\n      this._onChangeCallback();\n    }\n    get z() {\n      return this._z;\n    }\n    set z(value) {\n      this._z = value;\n      this._onChangeCallback();\n    }\n    get w() {\n      return this._w;\n    }\n    set w(value) {\n      this._w = value;\n      this._onChangeCallback();\n    }\n    set(x2, y, z, w) {\n      this._x = x2;\n      this._y = y;\n      this._z = z;\n      this._w = w;\n      this._onChangeCallback();\n      return this;\n    }\n    clone() {\n      return new this.constructor(this._x, this._y, this._z, this._w);\n    }\n    copy(quaternion) {\n      this._x = quaternion.x;\n      this._y = quaternion.y;\n      this._z = quaternion.z;\n      this._w = quaternion.w;\n      this._onChangeCallback();\n      return this;\n    }\n    setFromEuler(euler, update = true) {\n      const x2 = euler._x, y = euler._y, z = euler._z, order = euler._order;\n      const cos = Math.cos;\n      const sin = Math.sin;\n      const c1 = cos(x2 / 2);\n      const c2 = cos(y / 2);\n      const c3 = cos(z / 2);\n      const s1 = sin(x2 / 2);\n      const s2 = sin(y / 2);\n      const s3 = sin(z / 2);\n      switch (order) {\n        case "XYZ":\n          this._x = s1 * c2 * c3 + c1 * s2 * s3;\n          this._y = c1 * s2 * c3 - s1 * c2 * s3;\n          this._z = c1 * c2 * s3 + s1 * s2 * c3;\n          this._w = c1 * c2 * c3 - s1 * s2 * s3;\n          break;\n        case "YXZ":\n          this._x = s1 * c2 * c3 + c1 * s2 * s3;\n          this._y = c1 * s2 * c3 - s1 * c2 * s3;\n          this._z = c1 * c2 * s3 - s1 * s2 * c3;\n          this._w = c1 * c2 * c3 + s1 * s2 * s3;\n          break;\n        case "ZXY":\n          this._x = s1 * c2 * c3 - c1 * s2 * s3;\n          this._y = c1 * s2 * c3 + s1 * c2 * s3;\n          this._z = c1 * c2 * s3 + s1 * s2 * c3;\n          this._w = c1 * c2 * c3 - s1 * s2 * s3;\n          break;\n        case "ZYX":\n          this._x = s1 * c2 * c3 - c1 * s2 * s3;\n          this._y = c1 * s2 * c3 + s1 * c2 * s3;\n          this._z = c1 * c2 * s3 - s1 * s2 * c3;\n          this._w = c1 * c2 * c3 + s1 * s2 * s3;\n          break;\n        case "YZX":\n          this._x = s1 * c2 * c3 + c1 * s2 * s3;\n          this._y = c1 * s2 * c3 + s1 * c2 * s3;\n          this._z = c1 * c2 * s3 - s1 * s2 * c3;\n          this._w = c1 * c2 * c3 - s1 * s2 * s3;\n          break;\n        case "XZY":\n          this._x = s1 * c2 * c3 - c1 * s2 * s3;\n          this._y = c1 * s2 * c3 - s1 * c2 * s3;\n          this._z = c1 * c2 * s3 + s1 * s2 * c3;\n          this._w = c1 * c2 * c3 + s1 * s2 * s3;\n          break;\n        default:\n          console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + order);\n      }\n      if (update === true) this._onChangeCallback();\n      return this;\n    }\n    setFromAxisAngle(axis, angle) {\n      const halfAngle = angle / 2, s = Math.sin(halfAngle);\n      this._x = axis.x * s;\n      this._y = axis.y * s;\n      this._z = axis.z * s;\n      this._w = Math.cos(halfAngle);\n      this._onChangeCallback();\n      return this;\n    }\n    setFromRotationMatrix(m) {\n      const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;\n      if (trace > 0) {\n        const s = 0.5 / Math.sqrt(trace + 1);\n        this._w = 0.25 / s;\n        this._x = (m32 - m23) * s;\n        this._y = (m13 - m31) * s;\n        this._z = (m21 - m12) * s;\n      } else if (m11 > m22 && m11 > m33) {\n        const s = 2 * Math.sqrt(1 + m11 - m22 - m33);\n        this._w = (m32 - m23) / s;\n        this._x = 0.25 * s;\n        this._y = (m12 + m21) / s;\n        this._z = (m13 + m31) / s;\n      } else if (m22 > m33) {\n        const s = 2 * Math.sqrt(1 + m22 - m11 - m33);\n        this._w = (m13 - m31) / s;\n        this._x = (m12 + m21) / s;\n        this._y = 0.25 * s;\n        this._z = (m23 + m32) / s;\n      } else {\n        const s = 2 * Math.sqrt(1 + m33 - m11 - m22);\n        this._w = (m21 - m12) / s;\n        this._x = (m13 + m31) / s;\n        this._y = (m23 + m32) / s;\n        this._z = 0.25 * s;\n      }\n      this._onChangeCallback();\n      return this;\n    }\n    setFromUnitVectors(vFrom, vTo) {\n      let r = vFrom.dot(vTo) + 1;\n      if (r < Number.EPSILON) {\n        r = 0;\n        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {\n          this._x = -vFrom.y;\n          this._y = vFrom.x;\n          this._z = 0;\n          this._w = r;\n        } else {\n          this._x = 0;\n          this._y = -vFrom.z;\n          this._z = vFrom.y;\n          this._w = r;\n        }\n      } else {\n        this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;\n        this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;\n        this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;\n        this._w = r;\n      }\n      return this.normalize();\n    }\n    angleTo(q) {\n      return 2 * Math.acos(Math.abs(clamp(this.dot(q), -1, 1)));\n    }\n    rotateTowards(q, step) {\n      const angle = this.angleTo(q);\n      if (angle === 0) return this;\n      const t = Math.min(1, step / angle);\n      this.slerp(q, t);\n      return this;\n    }\n    identity() {\n      return this.set(0, 0, 0, 1);\n    }\n    invert() {\n      return this.conjugate();\n    }\n    conjugate() {\n      this._x *= -1;\n      this._y *= -1;\n      this._z *= -1;\n      this._onChangeCallback();\n      return this;\n    }\n    dot(v) {\n      return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;\n    }\n    lengthSq() {\n      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;\n    }\n    length() {\n      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);\n    }\n    normalize() {\n      let l = this.length();\n      if (l === 0) {\n        this._x = 0;\n        this._y = 0;\n        this._z = 0;\n        this._w = 1;\n      } else {\n        l = 1 / l;\n        this._x = this._x * l;\n        this._y = this._y * l;\n        this._z = this._z * l;\n        this._w = this._w * l;\n      }\n      this._onChangeCallback();\n      return this;\n    }\n    multiply(q) {\n      return this.multiplyQuaternions(this, q);\n    }\n    premultiply(q) {\n      return this.multiplyQuaternions(q, this);\n    }\n    multiplyQuaternions(a, b) {\n      const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;\n      const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;\n      this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;\n      this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;\n      this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;\n      this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;\n      this._onChangeCallback();\n      return this;\n    }\n    slerp(qb, t) {\n      if (t === 0) return this;\n      if (t === 1) return this.copy(qb);\n      const x2 = this._x, y = this._y, z = this._z, w = this._w;\n      let cosHalfTheta = w * qb._w + x2 * qb._x + y * qb._y + z * qb._z;\n      if (cosHalfTheta < 0) {\n        this._w = -qb._w;\n        this._x = -qb._x;\n        this._y = -qb._y;\n        this._z = -qb._z;\n        cosHalfTheta = -cosHalfTheta;\n      } else {\n        this.copy(qb);\n      }\n      if (cosHalfTheta >= 1) {\n        this._w = w;\n        this._x = x2;\n        this._y = y;\n        this._z = z;\n        return this;\n      }\n      const sqrSinHalfTheta = 1 - cosHalfTheta * cosHalfTheta;\n      if (sqrSinHalfTheta <= Number.EPSILON) {\n        const s = 1 - t;\n        this._w = s * w + t * this._w;\n        this._x = s * x2 + t * this._x;\n        this._y = s * y + t * this._y;\n        this._z = s * z + t * this._z;\n        this.normalize();\n        return this;\n      }\n      const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);\n      const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);\n      const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;\n      this._w = w * ratioA + this._w * ratioB;\n      this._x = x2 * ratioA + this._x * ratioB;\n      this._y = y * ratioA + this._y * ratioB;\n      this._z = z * ratioA + this._z * ratioB;\n      this._onChangeCallback();\n      return this;\n    }\n    slerpQuaternions(qa, qb, t) {\n      return this.copy(qa).slerp(qb, t);\n    }\n    random() {\n      const theta1 = 2 * Math.PI * Math.random();\n      const theta2 = 2 * Math.PI * Math.random();\n      const x0 = Math.random();\n      const r1 = Math.sqrt(1 - x0);\n      const r2 = Math.sqrt(x0);\n      return this.set(\n        r1 * Math.sin(theta1),\n        r1 * Math.cos(theta1),\n        r2 * Math.sin(theta2),\n        r2 * Math.cos(theta2)\n      );\n    }\n    equals(quaternion) {\n      return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;\n    }\n    fromArray(array, offset = 0) {\n      this._x = array[offset];\n      this._y = array[offset + 1];\n      this._z = array[offset + 2];\n      this._w = array[offset + 3];\n      this._onChangeCallback();\n      return this;\n    }\n    toArray(array = [], offset = 0) {\n      array[offset] = this._x;\n      array[offset + 1] = this._y;\n      array[offset + 2] = this._z;\n      array[offset + 3] = this._w;\n      return array;\n    }\n    fromBufferAttribute(attribute, index) {\n      this._x = attribute.getX(index);\n      this._y = attribute.getY(index);\n      this._z = attribute.getZ(index);\n      this._w = attribute.getW(index);\n      this._onChangeCallback();\n      return this;\n    }\n    toJSON() {\n      return this.toArray();\n    }\n    _onChange(callback) {\n      this._onChangeCallback = callback;\n      return this;\n    }\n    _onChangeCallback() {\n    }\n    *[Symbol.iterator]() {\n      yield this._x;\n      yield this._y;\n      yield this._z;\n      yield this._w;\n    }\n  }\n  class Vector3 {\n    constructor(x2 = 0, y = 0, z = 0) {\n      Vector3.prototype.isVector3 = true;\n      this.x = x2;\n      this.y = y;\n      this.z = z;\n    }\n    set(x2, y, z) {\n      if (z === void 0) z = this.z;\n      this.x = x2;\n      this.y = y;\n      this.z = z;\n      return this;\n    }\n    setScalar(scalar) {\n      this.x = scalar;\n      this.y = scalar;\n      this.z = scalar;\n      return this;\n    }\n    setX(x2) {\n      this.x = x2;\n      return this;\n    }\n    setY(y) {\n      this.y = y;\n      return this;\n    }\n    setZ(z) {\n      this.z = z;\n      return this;\n    }\n    setComponent(index, value) {\n      switch (index) {\n        case 0:\n          this.x = value;\n          break;\n        case 1:\n          this.y = value;\n          break;\n        case 2:\n          this.z = value;\n          break;\n        default:\n          throw new Error("index is out of range: " + index);\n      }\n      return this;\n    }\n    getComponent(index) {\n      switch (index) {\n        case 0:\n          return this.x;\n        case 1:\n          return this.y;\n        case 2:\n          return this.z;\n        default:\n          throw new Error("index is out of range: " + index);\n      }\n    }\n    clone() {\n      return new this.constructor(this.x, this.y, this.z);\n    }\n    copy(v) {\n      this.x = v.x;\n      this.y = v.y;\n      this.z = v.z;\n      return this;\n    }\n    add(v) {\n      this.x += v.x;\n      this.y += v.y;\n      this.z += v.z;\n      return this;\n    }\n    addScalar(s) {\n      this.x += s;\n      this.y += s;\n      this.z += s;\n      return this;\n    }\n    addVectors(a, b) {\n      this.x = a.x + b.x;\n      this.y = a.y + b.y;\n      this.z = a.z + b.z;\n      return this;\n    }\n    addScaledVector(v, s) {\n      this.x += v.x * s;\n      this.y += v.y * s;\n      this.z += v.z * s;\n      return this;\n    }\n    sub(v) {\n      this.x -= v.x;\n      this.y -= v.y;\n      this.z -= v.z;\n      return this;\n    }\n    subScalar(s) {\n      this.x -= s;\n      this.y -= s;\n      this.z -= s;\n      return this;\n    }\n    subVectors(a, b) {\n      this.x = a.x - b.x;\n      this.y = a.y - b.y;\n      this.z = a.z - b.z;\n      return this;\n    }\n    multiply(v) {\n      this.x *= v.x;\n      this.y *= v.y;\n      this.z *= v.z;\n      return this;\n    }\n    multiplyScalar(scalar) {\n      this.x *= scalar;\n      this.y *= scalar;\n      this.z *= scalar;\n      return this;\n    }\n    multiplyVectors(a, b) {\n      this.x = a.x * b.x;\n      this.y = a.y * b.y;\n      this.z = a.z * b.z;\n      return this;\n    }\n    applyEuler(euler) {\n      return this.applyQuaternion(_quaternion$4.setFromEuler(euler));\n    }\n    applyAxisAngle(axis, angle) {\n      return this.applyQuaternion(_quaternion$4.setFromAxisAngle(axis, angle));\n    }\n    applyMatrix3(m) {\n      const x2 = this.x, y = this.y, z = this.z;\n      const e = m.elements;\n      this.x = e[0] * x2 + e[3] * y + e[6] * z;\n      this.y = e[1] * x2 + e[4] * y + e[7] * z;\n      this.z = e[2] * x2 + e[5] * y + e[8] * z;\n      return this;\n    }\n    applyNormalMatrix(m) {\n      return this.applyMatrix3(m).normalize();\n    }\n    applyMatrix4(m) {\n      const x2 = this.x, y = this.y, z = this.z;\n      const e = m.elements;\n      const w = 1 / (e[3] * x2 + e[7] * y + e[11] * z + e[15]);\n      this.x = (e[0] * x2 + e[4] * y + e[8] * z + e[12]) * w;\n      this.y = (e[1] * x2 + e[5] * y + e[9] * z + e[13]) * w;\n      this.z = (e[2] * x2 + e[6] * y + e[10] * z + e[14]) * w;\n      return this;\n    }\n    applyQuaternion(q) {\n      const vx = this.x, vy = this.y, vz = this.z;\n      const qx = q.x, qy = q.y, qz = q.z, qw = q.w;\n      const tx = 2 * (qy * vz - qz * vy);\n      const ty = 2 * (qz * vx - qx * vz);\n      const tz = 2 * (qx * vy - qy * vx);\n      this.x = vx + qw * tx + qy * tz - qz * ty;\n      this.y = vy + qw * ty + qz * tx - qx * tz;\n      this.z = vz + qw * tz + qx * ty - qy * tx;\n      return this;\n    }\n    project(camera) {\n      return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);\n    }\n    unproject(camera) {\n      return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);\n    }\n    transformDirection(m) {\n      const x2 = this.x, y = this.y, z = this.z;\n      const e = m.elements;\n      this.x = e[0] * x2 + e[4] * y + e[8] * z;\n      this.y = e[1] * x2 + e[5] * y + e[9] * z;\n      this.z = e[2] * x2 + e[6] * y + e[10] * z;\n      return this.normalize();\n    }\n    divide(v) {\n      this.x /= v.x;\n      this.y /= v.y;\n      this.z /= v.z;\n      return this;\n    }\n    divideScalar(scalar) {\n      return this.multiplyScalar(1 / scalar);\n    }\n    min(v) {\n      this.x = Math.min(this.x, v.x);\n      this.y = Math.min(this.y, v.y);\n      this.z = Math.min(this.z, v.z);\n      return this;\n    }\n    max(v) {\n      this.x = Math.max(this.x, v.x);\n      this.y = Math.max(this.y, v.y);\n      this.z = Math.max(this.z, v.z);\n      return this;\n    }\n    clamp(min, max2) {\n      this.x = clamp(this.x, min.x, max2.x);\n      this.y = clamp(this.y, min.y, max2.y);\n      this.z = clamp(this.z, min.z, max2.z);\n      return this;\n    }\n    clampScalar(minVal, maxVal) {\n      this.x = clamp(this.x, minVal, maxVal);\n      this.y = clamp(this.y, minVal, maxVal);\n      this.z = clamp(this.z, minVal, maxVal);\n      return this;\n    }\n    clampLength(min, max2) {\n      const length = this.length();\n      return this.divideScalar(length || 1).multiplyScalar(clamp(length, min, max2));\n    }\n    floor() {\n      this.x = Math.floor(this.x);\n      this.y = Math.floor(this.y);\n      this.z = Math.floor(this.z);\n      return this;\n    }\n    ceil() {\n      this.x = Math.ceil(this.x);\n      this.y = Math.ceil(this.y);\n      this.z = Math.ceil(this.z);\n      return this;\n    }\n    round() {\n      this.x = Math.round(this.x);\n      this.y = Math.round(this.y);\n      this.z = Math.round(this.z);\n      return this;\n    }\n    roundToZero() {\n      this.x = Math.trunc(this.x);\n      this.y = Math.trunc(this.y);\n      this.z = Math.trunc(this.z);\n      return this;\n    }\n    negate() {\n      this.x = -this.x;\n      this.y = -this.y;\n      this.z = -this.z;\n      return this;\n    }\n    dot(v) {\n      return this.x * v.x + this.y * v.y + this.z * v.z;\n    }\n    // TODO lengthSquared?\n    lengthSq() {\n      return this.x * this.x + this.y * this.y + this.z * this.z;\n    }\n    length() {\n      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);\n    }\n    manhattanLength() {\n      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);\n    }\n    normalize() {\n      return this.divideScalar(this.length() || 1);\n    }\n    setLength(length) {\n      return this.normalize().multiplyScalar(length);\n    }\n    lerp(v, alpha) {\n      this.x += (v.x - this.x) * alpha;\n      this.y += (v.y - this.y) * alpha;\n      this.z += (v.z - this.z) * alpha;\n      return this;\n    }\n    lerpVectors(v1, v2, alpha) {\n      this.x = v1.x + (v2.x - v1.x) * alpha;\n      this.y = v1.y + (v2.y - v1.y) * alpha;\n      this.z = v1.z + (v2.z - v1.z) * alpha;\n      return this;\n    }\n    cross(v) {\n      return this.crossVectors(this, v);\n    }\n    crossVectors(a, b) {\n      const ax = a.x, ay = a.y, az = a.z;\n      const bx = b.x, by = b.y, bz = b.z;\n      this.x = ay * bz - az * by;\n      this.y = az * bx - ax * bz;\n      this.z = ax * by - ay * bx;\n      return this;\n    }\n    projectOnVector(v) {\n      const denominator = v.lengthSq();\n      if (denominator === 0) return this.set(0, 0, 0);\n      const scalar = v.dot(this) / denominator;\n      return this.copy(v).multiplyScalar(scalar);\n    }\n    projectOnPlane(planeNormal) {\n      _vector$c.copy(this).projectOnVector(planeNormal);\n      return this.sub(_vector$c);\n    }\n    reflect(normal) {\n      return this.sub(_vector$c.copy(normal).multiplyScalar(2 * this.dot(normal)));\n    }\n    angleTo(v) {\n      const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());\n      if (denominator === 0) return Math.PI / 2;\n      const theta = this.dot(v) / denominator;\n      return Math.acos(clamp(theta, -1, 1));\n    }\n    distanceTo(v) {\n      return Math.sqrt(this.distanceToSquared(v));\n    }\n    distanceToSquared(v) {\n      const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;\n      return dx * dx + dy * dy + dz * dz;\n    }\n    manhattanDistanceTo(v) {\n      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);\n    }\n    setFromSpherical(s) {\n      return this.setFromSphericalCoords(s.radius, s.phi, s.theta);\n    }\n    setFromSphericalCoords(radius, phi, theta) {\n      const sinPhiRadius = Math.sin(phi) * radius;\n      this.x = sinPhiRadius * Math.sin(theta);\n      this.y = Math.cos(phi) * radius;\n      this.z = sinPhiRadius * Math.cos(theta);\n      return this;\n    }\n    setFromCylindrical(c) {\n      return this.setFromCylindricalCoords(c.radius, c.theta, c.y);\n    }\n    setFromCylindricalCoords(radius, theta, y) {\n      this.x = radius * Math.sin(theta);\n      this.y = y;\n      this.z = radius * Math.cos(theta);\n      return this;\n    }\n    setFromMatrixPosition(m) {\n      const e = m.elements;\n      this.x = e[12];\n      this.y = e[13];\n      this.z = e[14];\n      return this;\n    }\n    setFromMatrixScale(m) {\n      const sx = this.setFromMatrixColumn(m, 0).length();\n      const sy = this.setFromMatrixColumn(m, 1).length();\n      const sz = this.setFromMatrixColumn(m, 2).length();\n      this.x = sx;\n      this.y = sy;\n      this.z = sz;\n      return this;\n    }\n    setFromMatrixColumn(m, index) {\n      return this.fromArray(m.elements, index * 4);\n    }\n    setFromMatrix3Column(m, index) {\n      return this.fromArray(m.elements, index * 3);\n    }\n    setFromEuler(e) {\n      this.x = e._x;\n      this.y = e._y;\n      this.z = e._z;\n      return this;\n    }\n    setFromColor(c) {\n      this.x = c.r;\n      this.y = c.g;\n      this.z = c.b;\n      return this;\n    }\n    equals(v) {\n      return v.x === this.x && v.y === this.y && v.z === this.z;\n    }\n    fromArray(array, offset = 0) {\n      this.x = array[offset];\n      this.y = array[offset + 1];\n      this.z = array[offset + 2];\n      return this;\n    }\n    toArray(array = [], offset = 0) {\n      array[offset] = this.x;\n      array[offset + 1] = this.y;\n      array[offset + 2] = this.z;\n      return array;\n    }\n    fromBufferAttribute(attribute, index) {\n      this.x = attribute.getX(index);\n      this.y = attribute.getY(index);\n      this.z = attribute.getZ(index);\n      return this;\n    }\n    random() {\n      this.x = Math.random();\n      this.y = Math.random();\n      this.z = Math.random();\n      return this;\n    }\n    randomDirection() {\n      const theta = Math.random() * Math.PI * 2;\n      const u = Math.random() * 2 - 1;\n      const c = Math.sqrt(1 - u * u);\n      this.x = c * Math.cos(theta);\n      this.y = u;\n      this.z = c * Math.sin(theta);\n      return this;\n    }\n    *[Symbol.iterator]() {\n      yield this.x;\n      yield this.y;\n      yield this.z;\n    }\n  }\n  const _vector$c = /* @__PURE__ */ new Vector3();\n  const _quaternion$4 = /* @__PURE__ */ new Quaternion();\n  class Box3 {\n    constructor(min = new Vector3(Infinity, Infinity, Infinity), max2 = new Vector3(-Infinity, -Infinity, -Infinity)) {\n      this.isBox3 = true;\n      this.min = min;\n      this.max = max2;\n    }\n    set(min, max2) {\n      this.min.copy(min);\n      this.max.copy(max2);\n      return this;\n    }\n    setFromArray(array) {\n      this.makeEmpty();\n      for (let i2 = 0, il = array.length; i2 < il; i2 += 3) {\n        this.expandByPoint(_vector$b.fromArray(array, i2));\n      }\n      return this;\n    }\n    setFromBufferAttribute(attribute) {\n      this.makeEmpty();\n      for (let i2 = 0, il = attribute.count; i2 < il; i2++) {\n        this.expandByPoint(_vector$b.fromBufferAttribute(attribute, i2));\n      }\n      return this;\n    }\n    setFromPoints(points) {\n      this.makeEmpty();\n      for (let i2 = 0, il = points.length; i2 < il; i2++) {\n        this.expandByPoint(points[i2]);\n      }\n      return this;\n    }\n    setFromCenterAndSize(center, size) {\n      const halfSize = _vector$b.copy(size).multiplyScalar(0.5);\n      this.min.copy(center).sub(halfSize);\n      this.max.copy(center).add(halfSize);\n      return this;\n    }\n    setFromObject(object, precise = false) {\n      this.makeEmpty();\n      return this.expandByObject(object, precise);\n    }\n    clone() {\n      return new this.constructor().copy(this);\n    }\n    copy(box) {\n      this.min.copy(box.min);\n      this.max.copy(box.max);\n      return this;\n    }\n    makeEmpty() {\n      this.min.x = this.min.y = this.min.z = Infinity;\n      this.max.x = this.max.y = this.max.z = -Infinity;\n      return this;\n    }\n    isEmpty() {\n      return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;\n    }\n    getCenter(target) {\n      return this.isEmpty() ? target.set(0, 0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);\n    }\n    getSize(target) {\n      return this.isEmpty() ? target.set(0, 0, 0) : target.subVectors(this.max, this.min);\n    }\n    expandByPoint(point) {\n      this.min.min(point);\n      this.max.max(point);\n      return this;\n    }\n    expandByVector(vector) {\n      this.min.sub(vector);\n      this.max.add(vector);\n      return this;\n    }\n    expandByScalar(scalar) {\n      this.min.addScalar(-scalar);\n      this.max.addScalar(scalar);\n      return this;\n    }\n    expandByObject(object, precise = false) {\n      object.updateWorldMatrix(false, false);\n      const geometry = object.geometry;\n      if (geometry !== void 0) {\n        const positionAttribute = geometry.getAttribute("position");\n        if (precise === true && positionAttribute !== void 0 && object.isInstancedMesh !== true) {\n          for (let i2 = 0, l = positionAttribute.count; i2 < l; i2++) {\n            if (object.isMesh === true) {\n              object.getVertexPosition(i2, _vector$b);\n            } else {\n              _vector$b.fromBufferAttribute(positionAttribute, i2);\n            }\n            _vector$b.applyMatrix4(object.matrixWorld);\n            this.expandByPoint(_vector$b);\n          }\n        } else {\n          if (object.boundingBox !== void 0) {\n            if (object.boundingBox === null) {\n              object.computeBoundingBox();\n            }\n            _box$4.copy(object.boundingBox);\n          } else {\n            if (geometry.boundingBox === null) {\n              geometry.computeBoundingBox();\n            }\n            _box$4.copy(geometry.boundingBox);\n          }\n          _box$4.applyMatrix4(object.matrixWorld);\n          this.union(_box$4);\n        }\n      }\n      const children = object.children;\n      for (let i2 = 0, l = children.length; i2 < l; i2++) {\n        this.expandByObject(children[i2], precise);\n      }\n      return this;\n    }\n    containsPoint(point) {\n      return point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y && point.z >= this.min.z && point.z <= this.max.z;\n    }\n    containsBox(box) {\n      return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y && this.min.z <= box.min.z && box.max.z <= this.max.z;\n    }\n    getParameter(point, target) {\n      return target.set(\n        (point.x - this.min.x) / (this.max.x - this.min.x),\n        (point.y - this.min.y) / (this.max.y - this.min.y),\n        (point.z - this.min.z) / (this.max.z - this.min.z)\n      );\n    }\n    intersectsBox(box) {\n      return box.max.x >= this.min.x && box.min.x <= this.max.x && box.max.y >= this.min.y && box.min.y <= this.max.y && box.max.z >= this.min.z && box.min.z <= this.max.z;\n    }\n    intersectsSphere(sphere) {\n      this.clampPoint(sphere.center, _vector$b);\n      return _vector$b.distanceToSquared(sphere.center) <= sphere.radius * sphere.radius;\n    }\n    intersectsPlane(plane) {\n      let min, max2;\n      if (plane.normal.x > 0) {\n        min = plane.normal.x * this.min.x;\n        max2 = plane.normal.x * this.max.x;\n      } else {\n        min = plane.normal.x * this.max.x;\n        max2 = plane.normal.x * this.min.x;\n      }\n      if (plane.normal.y > 0) {\n        min += plane.normal.y * this.min.y;\n        max2 += plane.normal.y * this.max.y;\n      } else {\n        min += plane.normal.y * this.max.y;\n        max2 += plane.normal.y * this.min.y;\n      }\n      if (plane.normal.z > 0) {\n        min += plane.normal.z * this.min.z;\n        max2 += plane.normal.z * this.max.z;\n      } else {\n        min += plane.normal.z * this.max.z;\n        max2 += plane.normal.z * this.min.z;\n      }\n      return min <= -plane.constant && max2 >= -plane.constant;\n    }\n    intersectsTriangle(triangle) {\n      if (this.isEmpty()) {\n        return false;\n      }\n      this.getCenter(_center);\n      _extents.subVectors(this.max, _center);\n      _v0$2.subVectors(triangle.a, _center);\n      _v1$7.subVectors(triangle.b, _center);\n      _v2$4.subVectors(triangle.c, _center);\n      _f0.subVectors(_v1$7, _v0$2);\n      _f1.subVectors(_v2$4, _v1$7);\n      _f2.subVectors(_v0$2, _v2$4);\n      let axes = [\n        0,\n        -_f0.z,\n        _f0.y,\n        0,\n        -_f1.z,\n        _f1.y,\n        0,\n        -_f2.z,\n        _f2.y,\n        _f0.z,\n        0,\n        -_f0.x,\n        _f1.z,\n        0,\n        -_f1.x,\n        _f2.z,\n        0,\n        -_f2.x,\n        -_f0.y,\n        _f0.x,\n        0,\n        -_f1.y,\n        _f1.x,\n        0,\n        -_f2.y,\n        _f2.x,\n        0\n      ];\n      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {\n        return false;\n      }\n      axes = [1, 0, 0, 0, 1, 0, 0, 0, 1];\n      if (!satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents)) {\n        return false;\n      }\n      _triangleNormal.crossVectors(_f0, _f1);\n      axes = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];\n      return satForAxes(axes, _v0$2, _v1$7, _v2$4, _extents);\n    }\n    clampPoint(point, target) {\n      return target.copy(point).clamp(this.min, this.max);\n    }\n    distanceToPoint(point) {\n      return this.clampPoint(point, _vector$b).distanceTo(point);\n    }\n    getBoundingSphere(target) {\n      if (this.isEmpty()) {\n        target.makeEmpty();\n      } else {\n        this.getCenter(target.center);\n        target.radius = this.getSize(_vector$b).length() * 0.5;\n      }\n      return target;\n    }\n    intersect(box) {\n      this.min.max(box.min);\n      this.max.min(box.max);\n      if (this.isEmpty()) this.makeEmpty();\n      return this;\n    }\n    union(box) {\n      this.min.min(box.min);\n      this.max.max(box.max);\n      return this;\n    }\n    applyMatrix4(matrix) {\n      if (this.isEmpty()) return this;\n      _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(matrix);\n      _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(matrix);\n      _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(matrix);\n      _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(matrix);\n      _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(matrix);\n      _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(matrix);\n      _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(matrix);\n      _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(matrix);\n      this.setFromPoints(_points);\n      return this;\n    }\n    translate(offset) {\n      this.min.add(offset);\n      this.max.add(offset);\n      return this;\n    }\n    equals(box) {\n      return box.min.equals(this.min) && box.max.equals(this.max);\n    }\n  }\n  const _points = [\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3(),\n    /* @__PURE__ */ new Vector3()\n  ];\n  const _vector$b = /* @__PURE__ */ new Vector3();\n  const _box$4 = /* @__PURE__ */ new Box3();\n  const _v0$2 = /* @__PURE__ */ new Vector3();\n  const _v1$7 = /* @__PURE__ */ new Vector3();\n  const _v2$4 = /* @__PURE__ */ new Vector3();\n  const _f0 = /* @__PURE__ */ new Vector3();\n  const _f1 = /* @__PURE__ */ new Vector3();\n  const _f2 = /* @__PURE__ */ new Vector3();\n  const _center = /* @__PURE__ */ new Vector3();\n  const _extents = /* @__PURE__ */ new Vector3();\n  const _triangleNormal = /* @__PURE__ */ new Vector3();\n  const _testAxis = /* @__PURE__ */ new Vector3();\n  function satForAxes(axes, v0, v1, v2, extents) {\n    for (let i2 = 0, j = axes.length - 3; i2 <= j; i2 += 3) {\n      _testAxis.fromArray(axes, i2);\n      const r = extents.x * Math.abs(_testAxis.x) + extents.y * Math.abs(_testAxis.y) + extents.z * Math.abs(_testAxis.z);\n      const p0 = v0.dot(_testAxis);\n      const p1 = v1.dot(_testAxis);\n      const p2 = v2.dot(_testAxis);\n      if (Math.max(-Math.max(p0, p1, p2), Math.min(p0, p1, p2)) > r) {\n        return false;\n      }\n    }\n    return true;\n  }\n  const _colorKeywords = {\n    "aliceblue": 15792383,\n    "antiquewhite": 16444375,\n    "aqua": 65535,\n    "aquamarine": 8388564,\n    "azure": 15794175,\n    "beige": 16119260,\n    "bisque": 16770244,\n    "black": 0,\n    "blanchedalmond": 16772045,\n    "blue": 255,\n    "blueviolet": 9055202,\n    "brown": 10824234,\n    "burlywood": 14596231,\n    "cadetblue": 6266528,\n    "chartreuse": 8388352,\n    "chocolate": 13789470,\n    "coral": 16744272,\n    "cornflowerblue": 6591981,\n    "cornsilk": 16775388,\n    "crimson": 14423100,\n    "cyan": 65535,\n    "darkblue": 139,\n    "darkcyan": 35723,\n    "darkgoldenrod": 12092939,\n    "darkgray": 11119017,\n    "darkgreen": 25600,\n    "darkgrey": 11119017,\n    "darkkhaki": 12433259,\n    "darkmagenta": 9109643,\n    "darkolivegreen": 5597999,\n    "darkorange": 16747520,\n    "darkorchid": 10040012,\n    "darkred": 9109504,\n    "darksalmon": 15308410,\n    "darkseagreen": 9419919,\n    "darkslateblue": 4734347,\n    "darkslategray": 3100495,\n    "darkslategrey": 3100495,\n    "darkturquoise": 52945,\n    "darkviolet": 9699539,\n    "deeppink": 16716947,\n    "deepskyblue": 49151,\n    "dimgray": 6908265,\n    "dimgrey": 6908265,\n    "dodgerblue": 2003199,\n    "firebrick": 11674146,\n    "floralwhite": 16775920,\n    "forestgreen": 2263842,\n    "fuchsia": 16711935,\n    "gainsboro": 14474460,\n    "ghostwhite": 16316671,\n    "gold": 16766720,\n    "goldenrod": 14329120,\n    "gray": 8421504,\n    "green": 32768,\n    "greenyellow": 11403055,\n    "grey": 8421504,\n    "honeydew": 15794160,\n    "hotpink": 16738740,\n    "indianred": 13458524,\n    "indigo": 4915330,\n    "ivory": 16777200,\n    "khaki": 15787660,\n    "lavender": 15132410,\n    "lavenderblush": 16773365,\n    "lawngreen": 8190976,\n    "lemonchiffon": 16775885,\n    "lightblue": 11393254,\n    "lightcoral": 15761536,\n    "lightcyan": 14745599,\n    "lightgoldenrodyellow": 16448210,\n    "lightgray": 13882323,\n    "lightgreen": 9498256,\n    "lightgrey": 13882323,\n    "lightpink": 16758465,\n    "lightsalmon": 16752762,\n    "lightseagreen": 2142890,\n    "lightskyblue": 8900346,\n    "lightslategray": 7833753,\n    "lightslategrey": 7833753,\n    "lightsteelblue": 11584734,\n    "lightyellow": 16777184,\n    "lime": 65280,\n    "limegreen": 3329330,\n    "linen": 16445670,\n    "magenta": 16711935,\n    "maroon": 8388608,\n    "mediumaquamarine": 6737322,\n    "mediumblue": 205,\n    "mediumorchid": 12211667,\n    "mediumpurple": 9662683,\n    "mediumseagreen": 3978097,\n    "mediumslateblue": 8087790,\n    "mediumspringgreen": 64154,\n    "mediumturquoise": 4772300,\n    "mediumvioletred": 13047173,\n    "midnightblue": 1644912,\n    "mintcream": 16121850,\n    "mistyrose": 16770273,\n    "moccasin": 16770229,\n    "navajowhite": 16768685,\n    "navy": 128,\n    "oldlace": 16643558,\n    "olive": 8421376,\n    "olivedrab": 7048739,\n    "orange": 16753920,\n    "orangered": 16729344,\n    "orchid": 14315734,\n    "palegoldenrod": 15657130,\n    "palegreen": 10025880,\n    "paleturquoise": 11529966,\n    "palevioletred": 14381203,\n    "papayawhip": 16773077,\n    "peachpuff": 16767673,\n    "peru": 13468991,\n    "pink": 16761035,\n    "plum": 14524637,\n    "powderblue": 11591910,\n    "purple": 8388736,\n    "rebeccapurple": 6697881,\n    "red": 16711680,\n    "rosybrown": 12357519,\n    "royalblue": 4286945,\n    "saddlebrown": 9127187,\n    "salmon": 16416882,\n    "sandybrown": 16032864,\n    "seagreen": 3050327,\n    "seashell": 16774638,\n    "sienna": 10506797,\n    "silver": 12632256,\n    "skyblue": 8900331,\n    "slateblue": 6970061,\n    "slategray": 7372944,\n    "slategrey": 7372944,\n    "snow": 16775930,\n    "springgreen": 65407,\n    "steelblue": 4620980,\n    "tan": 13808780,\n    "teal": 32896,\n    "thistle": 14204888,\n    "tomato": 16737095,\n    "turquoise": 4251856,\n    "violet": 15631086,\n    "wheat": 16113331,\n    "white": 16777215,\n    "whitesmoke": 16119285,\n    "yellow": 16776960,\n    "yellowgreen": 10145074\n  };\n  const _hslA = { h: 0, s: 0, l: 0 };\n  const _hslB = { h: 0, s: 0, l: 0 };\n  function hue2rgb(p, q, t) {\n    if (t < 0) t += 1;\n    if (t > 1) t -= 1;\n    if (t < 1 / 6) return p + (q - p) * 6 * t;\n    if (t < 1 / 2) return q;\n    if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);\n    return p;\n  }\n  class Color {\n    constructor(r, g, b) {\n      this.isColor = true;\n      this.r = 1;\n      this.g = 1;\n      this.b = 1;\n      return this.set(r, g, b);\n    }\n    set(r, g, b) {\n      if (g === void 0 && b === void 0) {\n        const value = r;\n        if (value && value.isColor) {\n          this.copy(value);\n        } else if (typeof value === "number") {\n          this.setHex(value);\n        } else if (typeof value === "string") {\n          this.setStyle(value);\n        }\n      } else {\n        this.setRGB(r, g, b);\n      }\n      return this;\n    }\n    setScalar(scalar) {\n      this.r = scalar;\n      this.g = scalar;\n      this.b = scalar;\n      return this;\n    }\n    setHex(hex, colorSpace = SRGBColorSpace) {\n      hex = Math.floor(hex);\n      this.r = (hex >> 16 & 255) / 255;\n      this.g = (hex >> 8 & 255) / 255;\n      this.b = (hex & 255) / 255;\n      ColorManagement.toWorkingColorSpace(this, colorSpace);\n      return this;\n    }\n    setRGB(r, g, b, colorSpace = ColorManagement.workingColorSpace) {\n      this.r = r;\n      this.g = g;\n      this.b = b;\n      ColorManagement.toWorkingColorSpace(this, colorSpace);\n      return this;\n    }\n    setHSL(h, s, l, colorSpace = ColorManagement.workingColorSpace) {\n      h = euclideanModulo(h, 1);\n      s = clamp(s, 0, 1);\n      l = clamp(l, 0, 1);\n      if (s === 0) {\n        this.r = this.g = this.b = l;\n      } else {\n        const p = l <= 0.5 ? l * (1 + s) : l + s - l * s;\n        const q = 2 * l - p;\n        this.r = hue2rgb(q, p, h + 1 / 3);\n        this.g = hue2rgb(q, p, h);\n        this.b = hue2rgb(q, p, h - 1 / 3);\n      }\n      ColorManagement.toWorkingColorSpace(this, colorSpace);\n      return this;\n    }\n    setStyle(style, colorSpace = SRGBColorSpace) {\n      function handleAlpha(string) {\n        if (string === void 0) return;\n        if (parseFloat(string) < 1) {\n          console.warn("THREE.Color: Alpha component of " + style + " will be ignored.");\n        }\n      }\n      let m;\n      if (m = /^(\\w+)\\(([^\\)]*)\\)/.exec(style)) {\n        let color;\n        const name = m[1];\n        const components = m[2];\n        switch (name) {\n          case "rgb":\n          case "rgba":\n            if (color = /^\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {\n              handleAlpha(color[4]);\n              return this.setRGB(\n                Math.min(255, parseInt(color[1], 10)) / 255,\n                Math.min(255, parseInt(color[2], 10)) / 255,\n                Math.min(255, parseInt(color[3], 10)) / 255,\n                colorSpace\n              );\n            }\n            if (color = /^\\s*(\\d+)\\%\\s*,\\s*(\\d+)\\%\\s*,\\s*(\\d+)\\%\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {\n              handleAlpha(color[4]);\n              return this.setRGB(\n                Math.min(100, parseInt(color[1], 10)) / 100,\n                Math.min(100, parseInt(color[2], 10)) / 100,\n                Math.min(100, parseInt(color[3], 10)) / 100,\n                colorSpace\n              );\n            }\n            break;\n          case "hsl":\n          case "hsla":\n            if (color = /^\\s*(\\d*\\.?\\d+)\\s*,\\s*(\\d*\\.?\\d+)\\%\\s*,\\s*(\\d*\\.?\\d+)\\%\\s*(?:,\\s*(\\d*\\.?\\d+)\\s*)?$/.exec(components)) {\n              handleAlpha(color[4]);\n              return this.setHSL(\n                parseFloat(color[1]) / 360,\n                parseFloat(color[2]) / 100,\n                parseFloat(color[3]) / 100,\n                colorSpace\n              );\n            }\n            break;\n          default:\n            console.warn("THREE.Color: Unknown color model " + style);\n        }\n      } else if (m = /^\\#([A-Fa-f\\d]+)$/.exec(style)) {\n        const hex = m[1];\n        const size = hex.length;\n        if (size === 3) {\n          return this.setRGB(\n            parseInt(hex.charAt(0), 16) / 15,\n            parseInt(hex.charAt(1), 16) / 15,\n            parseInt(hex.charAt(2), 16) / 15,\n            colorSpace\n          );\n        } else if (size === 6) {\n          return this.setHex(parseInt(hex, 16), colorSpace);\n        } else {\n          console.warn("THREE.Color: Invalid hex color " + style);\n        }\n      } else if (style && style.length > 0) {\n        return this.setColorName(style, colorSpace);\n      }\n      return this;\n    }\n    setColorName(style, colorSpace = SRGBColorSpace) {\n      const hex = _colorKeywords[style.toLowerCase()];\n      if (hex !== void 0) {\n        this.setHex(hex, colorSpace);\n      } else {\n        console.warn("THREE.Color: Unknown color " + style);\n      }\n      return this;\n    }\n    clone() {\n      return new this.constructor(this.r, this.g, this.b);\n    }\n    copy(color) {\n      this.r = color.r;\n      this.g = color.g;\n      this.b = color.b;\n      return this;\n    }\n    copySRGBToLinear(color) {\n      this.r = SRGBToLinear(color.r);\n      this.g = SRGBToLinear(color.g);\n      this.b = SRGBToLinear(color.b);\n      return this;\n    }\n    copyLinearToSRGB(color) {\n      this.r = LinearToSRGB(color.r);\n      this.g = LinearToSRGB(color.g);\n      this.b = LinearToSRGB(color.b);\n      return this;\n    }\n    convertSRGBToLinear() {\n      this.copySRGBToLinear(this);\n      return this;\n    }\n    convertLinearToSRGB() {\n      this.copyLinearToSRGB(this);\n      return this;\n    }\n    getHex(colorSpace = SRGBColorSpace) {\n      ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);\n      return Math.round(clamp(_color.r * 255, 0, 255)) * 65536 + Math.round(clamp(_color.g * 255, 0, 255)) * 256 + Math.round(clamp(_color.b * 255, 0, 255));\n    }\n    getHexString(colorSpace = SRGBColorSpace) {\n      return ("000000" + this.getHex(colorSpace).toString(16)).slice(-6);\n    }\n    getHSL(target, colorSpace = ColorManagement.workingColorSpace) {\n      ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);\n      const r = _color.r, g = _color.g, b = _color.b;\n      const max2 = Math.max(r, g, b);\n      const min = Math.min(r, g, b);\n      let hue, saturation;\n      const lightness = (min + max2) / 2;\n      if (min === max2) {\n        hue = 0;\n        saturation = 0;\n      } else {\n        const delta = max2 - min;\n        saturation = lightness <= 0.5 ? delta / (max2 + min) : delta / (2 - max2 - min);\n        switch (max2) {\n          case r:\n            hue = (g - b) / delta + (g < b ? 6 : 0);\n            break;\n          case g:\n            hue = (b - r) / delta + 2;\n            break;\n          case b:\n            hue = (r - g) / delta + 4;\n            break;\n        }\n        hue /= 6;\n      }\n      target.h = hue;\n      target.s = saturation;\n      target.l = lightness;\n      return target;\n    }\n    getRGB(target, colorSpace = ColorManagement.workingColorSpace) {\n      ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);\n      target.r = _color.r;\n      target.g = _color.g;\n      target.b = _color.b;\n      return target;\n    }\n    getStyle(colorSpace = SRGBColorSpace) {\n      ColorManagement.fromWorkingColorSpace(_color.copy(this), colorSpace);\n      const r = _color.r, g = _color.g, b = _color.b;\n      if (colorSpace !== SRGBColorSpace) {\n        return `color(${colorSpace} ${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)})`;\n      }\n      return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;\n    }\n    offsetHSL(h, s, l) {\n      this.getHSL(_hslA);\n      return this.setHSL(_hslA.h + h, _hslA.s + s, _hslA.l + l);\n    }\n    add(color) {\n      this.r += color.r;\n      this.g += color.g;\n      this.b += color.b;\n      return this;\n    }\n    addColors(color1, color2) {\n      this.r = color1.r + color2.r;\n      this.g = color1.g + color2.g;\n      this.b = color1.b + color2.b;\n      return this;\n    }\n    addScalar(s) {\n      this.r += s;\n      this.g += s;\n      this.b += s;\n      return this;\n    }\n    sub(color) {\n      this.r = Math.max(0, this.r - color.r);\n      this.g = Math.max(0, this.g - color.g);\n      this.b = Math.max(0, this.b - color.b);\n      return this;\n    }\n    multiply(color) {\n      this.r *= color.r;\n      this.g *= color.g;\n      this.b *= color.b;\n      return this;\n    }\n    multiplyScalar(s) {\n      this.r *= s;\n      this.g *= s;\n      this.b *= s;\n      return this;\n    }\n    lerp(color, alpha) {\n      this.r += (color.r - this.r) * alpha;\n      this.g += (color.g - this.g) * alpha;\n      this.b += (color.b - this.b) * alpha;\n      return this;\n    }\n    lerpColors(color1, color2, alpha) {\n      this.r = color1.r + (color2.r - color1.r) * alpha;\n      this.g = color1.g + (color2.g - color1.g) * alpha;\n      this.b = color1.b + (color2.b - color1.b) * alpha;\n      return this;\n    }\n    lerpHSL(color, alpha) {\n      this.getHSL(_hslA);\n      color.getHSL(_hslB);\n      const h = lerp(_hslA.h, _hslB.h, alpha);\n      const s = lerp(_hslA.s, _hslB.s, alpha);\n      const l = lerp(_hslA.l, _hslB.l, alpha);\n      this.setHSL(h, s, l);\n      return this;\n    }\n    setFromVector3(v) {\n      this.r = v.x;\n      this.g = v.y;\n      this.b = v.z;\n      return this;\n    }\n    applyMatrix3(m) {\n      const r = this.r, g = this.g, b = this.b;\n      const e = m.elements;\n      this.r = e[0] * r + e[3] * g + e[6] * b;\n      this.g = e[1] * r + e[4] * g + e[7] * b;\n      this.b = e[2] * r + e[5] * g + e[8] * b;\n      return this;\n    }\n    equals(c) {\n      return c.r === this.r && c.g === this.g && c.b === this.b;\n    }\n    fromArray(array, offset = 0) {\n      this.r = array[offset];\n      this.g = array[offset + 1];\n      this.b = array[offset + 2];\n      return this;\n    }\n    toArray(array = [], offset = 0) {\n      array[offset] = this.r;\n      array[offset + 1] = this.g;\n      array[offset + 2] = this.b;\n      return array;\n    }\n    fromBufferAttribute(attribute, index) {\n      this.r = attribute.getX(index);\n      this.g = attribute.getY(index);\n      this.b = attribute.getZ(index);\n      return this;\n    }\n    toJSON() {\n      return this.getHex();\n    }\n    *[Symbol.iterator]() {\n      yield this.r;\n      yield this.g;\n      yield this.b;\n    }\n  }\n  const _color = /* @__PURE__ */ new Color();\n  Color.NAMES = _colorKeywords;\n  if (typeof __THREE_DEVTOOLS__ !== "undefined") {\n    __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {\n      revision: REVISION\n    } }));\n  }\n  if (typeof window !== "undefined") {\n    if (window.__THREE__) {\n      console.warn("WARNING: Multiple instances of Three.js being imported.");\n    } else {\n      window.__THREE__ = REVISION;\n    }\n  }\n  const LN_SCALE_MIN = -12;\n  const LN_SCALE_MAX = 9;\n  const LN_RESCALE = (LN_SCALE_MAX - LN_SCALE_MIN) / 254;\n  const LN_SCALE_ZERO = -30;\n  const SCALE_ZERO = Math.exp(LN_SCALE_ZERO);\n  const SPLAT_TEX_WIDTH_BITS = 11;\n  const SPLAT_TEX_HEIGHT_BITS = 11;\n  const SPLAT_TEX_WIDTH = 1 << SPLAT_TEX_WIDTH_BITS;\n  const SPLAT_TEX_HEIGHT = 1 << SPLAT_TEX_HEIGHT_BITS;\n  const SPLAT_TEX_MIN_HEIGHT = 1;\n  function unindentLines(s) {\n    var _a2;\n    let seenNonEmpty = false;\n    const lines = s.split("\\n").map((line) => {\n      const trimmedLine = line.trimEnd();\n      if (seenNonEmpty) {\n        return trimmedLine;\n      }\n      if (trimmedLine.length > 0) {\n        seenNonEmpty = true;\n        return trimmedLine;\n      }\n      return null;\n    }).filter((line) => line != null);\n    while (lines.length > 0 && lines[lines.length - 1].length === 0) {\n      lines.pop();\n    }\n    if (lines.length === 0) {\n      return [];\n    }\n    const indent = (_a2 = lines[0].match(/^\\s*/)) == null ? void 0 : _a2[0];\n    if (!indent) {\n      return lines;\n    }\n    const regex = new RegExp(`^${indent}`);\n    return lines.map((line) => line.replace(regex, ""));\n  }\n  function unindent(s) {\n    return unindentLines(s).join("\\n");\n  }\n  const f32buffer = new Float32Array(1);\n  const u32buffer = new Uint32Array(f32buffer.buffer);\n  function toHalf(f) {\n    f32buffer[0] = f;\n    const bits2 = u32buffer[0];\n    const sign = bits2 >> 31 & 1;\n    const exp = bits2 >> 23 & 255;\n    const frac = bits2 & 8388607;\n    const halfSign = sign << 15;\n    if (exp === 255) {\n      if (frac !== 0) {\n        return halfSign | 32767;\n      }\n      return halfSign | 31744;\n    }\n    const newExp = exp - 127 + 15;\n    if (newExp >= 31) {\n      return halfSign | 31744;\n    }\n    if (newExp <= 0) {\n      if (newExp < -10) {\n        return halfSign;\n      }\n      const subFrac = (frac | 8388608) >> 1 - newExp + 13;\n      return halfSign | subFrac;\n    }\n    const halfFrac = frac >> 13;\n    return halfSign | newExp << 10 | halfFrac;\n  }\n  function fromHalf(h) {\n    const sign = h >> 15 & 1;\n    const exp = h >> 10 & 31;\n    const frac = h & 1023;\n    let f32bits;\n    if (exp === 0) {\n      if (frac === 0) {\n        f32bits = sign << 31;\n      } else {\n        let mant = frac;\n        let e = -14;\n        while ((mant & 1024) === 0) {\n          mant <<= 1;\n          e--;\n        }\n        mant &= 1023;\n        const newExp = e + 127;\n        const newFrac = mant << 13;\n        f32bits = sign << 31 | newExp << 23 | newFrac;\n      }\n    } else if (exp === 31) {\n      if (frac === 0) {\n        f32bits = sign << 31 | 2139095040;\n      } else {\n        f32bits = sign << 31 | 2143289344;\n      }\n    } else {\n      const newExp = exp - 15 + 127;\n      const newFrac = frac << 13;\n      f32bits = sign << 31 | newExp << 23 | newFrac;\n    }\n    u32buffer[0] = f32bits;\n    return f32buffer[0];\n  }\n  function floatToUint8(v) {\n    return Math.max(0, Math.min(255, Math.round(v * 255)));\n  }\n  function getArrayBuffers(ctx) {\n    const buffers = [];\n    const seen = /* @__PURE__ */ new Set();\n    function traverse(obj) {\n      if (obj && typeof obj === "object" && !seen.has(obj)) {\n        seen.add(obj);\n        if (obj instanceof ArrayBuffer) {\n          buffers.push(obj);\n        } else if (ArrayBuffer.isView(obj)) {\n          buffers.push(obj.buffer);\n        } else if (Array.isArray(obj)) {\n          obj.forEach(traverse);\n        } else {\n          Object.values(obj).forEach(traverse);\n        }\n      }\n    }\n    traverse(ctx);\n    return buffers;\n  }\n  function setPackedSplat(packedSplats, index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) {\n    const uR = floatToUint8(r);\n    const uG = floatToUint8(g);\n    const uB = floatToUint8(b);\n    const uA = floatToUint8(opacity);\n    const uQuat = encodeQuatOctXy88R8(\n      new Quaternion(quatX, quatY, quatZ, quatW)\n    );\n    const uQuatX = uQuat & 255;\n    const uQuatY = uQuat >>> 8 & 255;\n    const uQuatZ = uQuat >>> 16 & 255;\n    const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleX) - LN_SCALE_MIN) / LN_RESCALE) + 1\n      )\n    );\n    const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleY) - LN_SCALE_MIN) / LN_RESCALE) + 1\n      )\n    );\n    const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleZ) - LN_SCALE_MIN) / LN_RESCALE) + 1\n      )\n    );\n    const uCenterX = toHalf(x2);\n    const uCenterY = toHalf(y);\n    const uCenterZ = toHalf(z);\n    const i4 = index * 4;\n    packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;\n    packedSplats[i4 + 1] = uCenterX | uCenterY << 16;\n    packedSplats[i4 + 2] = uCenterZ | uQuatX << 16 | uQuatY << 24;\n    packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | uQuatZ << 24;\n  }\n  function setPackedSplatCenter(packedSplats, index, x2, y, z) {\n    const uCenterX = toHalf(x2);\n    const uCenterY = toHalf(y);\n    const uCenterZ = toHalf(z);\n    const i4 = index * 4;\n    packedSplats[i4 + 1] = uCenterX | uCenterY << 16;\n    packedSplats[i4 + 2] = uCenterZ | packedSplats[i4 + 2] & 4294901760;\n  }\n  function setPackedSplatScales(packedSplats, index, scaleX, scaleY, scaleZ) {\n    const uScaleX = scaleX < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleX) - LN_SCALE_MIN) / LN_RESCALE) + 1\n      )\n    );\n    const uScaleY = scaleY < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleY) - LN_SCALE_MIN) / LN_RESCALE) + 1\n      )\n    );\n    const uScaleZ = scaleZ < SCALE_ZERO ? 0 : Math.min(\n      255,\n      Math.max(\n        1,\n        Math.round((Math.log(scaleZ) - LN_SCALE_MIN) / LN_RESCALE) + 1\n      )\n    );\n    const i4 = index * 4;\n    packedSplats[i4 + 3] = uScaleX | uScaleY << 8 | uScaleZ << 16 | packedSplats[i4 + 3] & 4278190080;\n  }\n  function setPackedSplatQuat(packedSplats, index, quatX, quatY, quatZ, quatW) {\n    const uQuat = encodeQuatOctXy88R8(\n      new Quaternion(quatX, quatY, quatZ, quatW)\n    );\n    const uQuatX = uQuat & 255;\n    const uQuatY = uQuat >>> 8 & 255;\n    const uQuatZ = uQuat >>> 16 & 255;\n    const i4 = index * 4;\n    packedSplats[i4 + 2] = packedSplats[i4 + 2] & 65535 | uQuatX << 16 | uQuatY << 24;\n    packedSplats[i4 + 3] = packedSplats[i4 + 3] & 16777215 | uQuatZ << 24;\n  }\n  function setPackedSplatRgba(packedSplats, index, r, g, b, a) {\n    const uR = floatToUint8(r);\n    const uG = floatToUint8(g);\n    const uB = floatToUint8(b);\n    const uA = floatToUint8(a);\n    const i4 = index * 4;\n    packedSplats[i4] = uR | uG << 8 | uB << 16 | uA << 24;\n  }\n  function setPackedSplatRgb(packedSplats, index, r, g, b) {\n    const uR = floatToUint8(r);\n    const uG = floatToUint8(g);\n    const uB = floatToUint8(b);\n    const i4 = index * 4;\n    packedSplats[i4] = uR | uG << 8 | uB << 16 | packedSplats[i4] & 4278190080;\n  }\n  function setPackedSplatOpacity(packedSplats, index, opacity) {\n    const uA = floatToUint8(opacity);\n    const i4 = index * 4;\n    packedSplats[i4] = packedSplats[i4] & 16777215 | uA << 24;\n  }\n  new Vector3();\n  new Vector3();\n  new Color();\n  function getTextureSize(numSplats) {\n    const width = SPLAT_TEX_WIDTH;\n    const height = Math.max(\n      SPLAT_TEX_MIN_HEIGHT,\n      Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))\n    );\n    const depth = Math.ceil(numSplats / (width * height));\n    const maxSplats = width * height * depth;\n    return { width, height, depth, maxSplats };\n  }\n  function computeMaxSplats(numSplats) {\n    const width = SPLAT_TEX_WIDTH;\n    const height = Math.max(\n      SPLAT_TEX_MIN_HEIGHT,\n      Math.min(SPLAT_TEX_HEIGHT, Math.ceil(numSplats / width))\n    );\n    const depth = Math.ceil(numSplats / (width * height));\n    return width * height * depth;\n  }\n  unindent(`\n  precision highp float;\n\n  in vec3 position;\n\n  void main() {\n    gl_Position = vec4(position.xy, 0.0, 1.0);\n  }\n`);\n  function encodeQuatOctXy88R8(q) {\n    const qnorm = q.clone().normalize();\n    if (qnorm.w < 0) {\n      qnorm.set(-qnorm.x, -qnorm.y, -qnorm.z, -qnorm.w);\n    }\n    const theta = 2 * Math.acos(qnorm.w);\n    const xyz_norm = Math.sqrt(\n      qnorm.x * qnorm.x + qnorm.y * qnorm.y + qnorm.z * qnorm.z\n    );\n    const axis = xyz_norm < 1e-6 ? new Vector3(1, 0, 0) : new Vector3(qnorm.x, qnorm.y, qnorm.z).divideScalar(xyz_norm);\n    const sum = Math.abs(axis.x) + Math.abs(axis.y) + Math.abs(axis.z);\n    let p_x = axis.x / sum;\n    let p_y = axis.y / sum;\n    if (axis.z < 0) {\n      const tmp = p_x;\n      p_x = (1 - Math.abs(p_y)) * (p_x >= 0 ? 1 : -1);\n      p_y = (1 - Math.abs(tmp)) * (p_y >= 0 ? 1 : -1);\n    }\n    const u_f = p_x * 0.5 + 0.5;\n    const v_f = p_y * 0.5 + 0.5;\n    const quantU = Math.round(u_f * 255);\n    const quantV = Math.round(v_f * 255);\n    const angleInt = Math.round(theta * (255 / Math.PI));\n    return angleInt << 16 | quantV << 8 | quantU;\n  }\n  function packSint8Bytes(b0, b1, b22, b3) {\n    const clampedB0 = Math.max(-127, Math.min(127, b0 * 127));\n    const clampedB1 = Math.max(-127, Math.min(127, b1 * 127));\n    const clampedB2 = Math.max(-127, Math.min(127, b22 * 127));\n    const clampedB3 = Math.max(-127, Math.min(127, b3 * 127));\n    return clampedB0 & 255 | (clampedB1 & 255) << 8 | (clampedB2 & 255) << 16 | (clampedB3 & 255) << 24;\n  }\n  function encodeSh1Rgb(sh1Array, index, sh1Rgb) {\n    const base = index * 2;\n    for (let i2 = 0; i2 < 9; ++i2) {\n      const value = Math.max(-63, Math.min(63, sh1Rgb[i2] * 63)) & 127;\n      const bitStart = i2 * 7;\n      const bitEnd = bitStart + 7;\n      const wordStart = Math.floor(bitStart / 32);\n      const bitOffset = bitStart - wordStart * 32;\n      const firstWord = value << bitOffset & 4294967295;\n      sh1Array[base + wordStart] |= firstWord;\n      if (bitEnd > wordStart * 32 + 32) {\n        const secondWord = value >>> 32 - bitOffset & 4294967295;\n        sh1Array[base + wordStart + 1] |= secondWord;\n      }\n    }\n  }\n  function encodeSh2Rgb(sh2Array, index, sh2Rgb) {\n    sh2Array[index * 4 + 0] = packSint8Bytes(\n      sh2Rgb[0],\n      sh2Rgb[1],\n      sh2Rgb[2],\n      sh2Rgb[3]\n    );\n    sh2Array[index * 4 + 1] = packSint8Bytes(\n      sh2Rgb[4],\n      sh2Rgb[5],\n      sh2Rgb[6],\n      sh2Rgb[7]\n    );\n    sh2Array[index * 4 + 2] = packSint8Bytes(\n      sh2Rgb[8],\n      sh2Rgb[9],\n      sh2Rgb[10],\n      sh2Rgb[11]\n    );\n    sh2Array[index * 4 + 3] = packSint8Bytes(\n      sh2Rgb[12],\n      sh2Rgb[13],\n      sh2Rgb[14],\n      0\n    );\n  }\n  function encodeSh3Rgb(sh3Array, index, sh3Rgb) {\n    const base = index * 4;\n    for (let i2 = 0; i2 < 21; ++i2) {\n      const value = Math.max(-31, Math.min(31, sh3Rgb[i2] * 31)) & 63;\n      const bitStart = i2 * 6;\n      const bitEnd = bitStart + 6;\n      const wordStart = Math.floor(bitStart / 32);\n      const bitOffset = bitStart - wordStart * 32;\n      const firstWord = value << bitOffset & 4294967295;\n      sh3Array[base + wordStart] |= firstWord;\n      if (bitEnd > wordStart * 32 + 32) {\n        const secondWord = value >>> 32 - bitOffset & 4294967295;\n        sh3Array[base + wordStart + 1] |= secondWord;\n      }\n    }\n  }\n  function decompressPartialGzip(fileBytes, numBytes) {\n    const chunks = [];\n    let totalBytes = 0;\n    let result = null;\n    const gunzip = new Gunzip((data, final) => {\n      chunks.push(data);\n      totalBytes += data.length;\n      if (final || totalBytes >= numBytes) {\n        const allBytes = new Uint8Array(totalBytes);\n        let offset2 = 0;\n        for (const chunk of chunks) {\n          allBytes.set(chunk, offset2);\n          offset2 += chunk.length;\n        }\n        result = allBytes.slice(0, numBytes);\n      }\n    });\n    const CHUNK_SIZE = 1024;\n    let offset = 0;\n    while (result == null && offset < fileBytes.length) {\n      const chunk = fileBytes.slice(offset, offset + CHUNK_SIZE);\n      gunzip.push(chunk, false);\n      offset += CHUNK_SIZE;\n    }\n    if (result == null) {\n      gunzip.push(new Uint8Array(), true);\n      if (result == null) {\n        throw new Error("Failed to decompress partial gzip");\n      }\n    }\n    return result;\n  }\n  class GunzipReader {\n    constructor({\n      fileBytes,\n      chunkBytes = 64 * 1024\n    }) {\n      this.fileBytes = fileBytes;\n      this.chunkBytes = chunkBytes;\n      this.offset = 0;\n      this.chunks = [];\n      this.totalBytes = 0;\n      this.gunzip = new Gunzip((chunk, _final) => {\n        this.chunks.push(chunk);\n        this.totalBytes += chunk.length;\n      });\n    }\n    read(numBytes) {\n      while (this.totalBytes < numBytes && this.offset < this.fileBytes.length) {\n        const end = Math.min(\n          this.offset + this.chunkBytes,\n          this.fileBytes.length\n        );\n        this.gunzip.push(this.fileBytes.subarray(this.offset, end), false);\n        this.offset = end;\n      }\n      if (this.totalBytes < numBytes && this.offset >= this.fileBytes.length) {\n        this.gunzip.push(new Uint8Array(0), true);\n      }\n      if (this.totalBytes < numBytes) {\n        throw new Error(\n          `Unexpected EOF: needed ${numBytes}, got ${this.totalBytes}`\n        );\n      }\n      const allBytes = new Uint8Array(this.totalBytes);\n      let outOffset = 0;\n      for (const chunk of this.chunks) {\n        allBytes.set(chunk, outOffset);\n        outOffset += chunk.length;\n      }\n      const result = allBytes.subarray(0, numBytes);\n      this.chunks = [allBytes.subarray(numBytes)];\n      this.totalBytes -= numBytes;\n      return result;\n    }\n  }\n  function decodeAntiSplat(fileBytes, initNumSplats, splatCallback) {\n    const numSplats = Math.floor(fileBytes.length / 32);\n    if (numSplats * 32 !== fileBytes.length) {\n      throw new Error("Invalid .splat file size");\n    }\n    initNumSplats(numSplats);\n    const f32 = new Float32Array(fileBytes.buffer);\n    for (let i2 = 0; i2 < numSplats; ++i2) {\n      const i322 = i2 * 32;\n      const i8 = i2 * 8;\n      const x2 = f32[i8 + 0];\n      const y = f32[i8 + 1];\n      const z = f32[i8 + 2];\n      const scaleX = f32[i8 + 3];\n      const scaleY = f32[i8 + 4];\n      const scaleZ = f32[i8 + 5];\n      const r = fileBytes[i322 + 24] / 255;\n      const g = fileBytes[i322 + 25] / 255;\n      const b = fileBytes[i322 + 26] / 255;\n      const opacity = fileBytes[i322 + 27] / 255;\n      const quatW = (fileBytes[i322 + 28] - 128) / 128;\n      const quatX = (fileBytes[i322 + 29] - 128) / 128;\n      const quatY = (fileBytes[i322 + 30] - 128) / 128;\n      const quatZ = (fileBytes[i322 + 31] - 128) / 128;\n      splatCallback(\n        i2,\n        x2,\n        y,\n        z,\n        scaleX,\n        scaleY,\n        scaleZ,\n        quatX,\n        quatY,\n        quatZ,\n        quatW,\n        opacity,\n        r,\n        g,\n        b\n      );\n    }\n  }\n  function unpackAntiSplat(fileBytes) {\n    let numSplats = 0;\n    let maxSplats = 0;\n    let packedArray = new Uint32Array(0);\n    decodeAntiSplat(\n      fileBytes,\n      (cbNumSplats) => {\n        numSplats = cbNumSplats;\n        maxSplats = computeMaxSplats(numSplats);\n        packedArray = new Uint32Array(maxSplats * 4);\n      },\n      (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n        setPackedSplat(\n          packedArray,\n          index,\n          x2,\n          y,\n          z,\n          scaleX,\n          scaleY,\n          scaleZ,\n          quatX,\n          quatY,\n          quatZ,\n          quatW,\n          opacity,\n          r,\n          g,\n          b\n        );\n      }\n    );\n    return { packedArray, numSplats };\n  }\n  const KSPLAT_COMPRESSION = {\n    0: {\n      bytesPerCenter: 12,\n      bytesPerScale: 12,\n      bytesPerRotation: 16,\n      bytesPerColor: 4,\n      bytesPerSphericalHarmonicsComponent: 4,\n      scaleOffsetBytes: 12,\n      rotationOffsetBytes: 24,\n      colorOffsetBytes: 40,\n      sphericalHarmonicsOffsetBytes: 44,\n      scaleRange: 1\n    },\n    1: {\n      bytesPerCenter: 6,\n      bytesPerScale: 6,\n      bytesPerRotation: 8,\n      bytesPerColor: 4,\n      bytesPerSphericalHarmonicsComponent: 2,\n      scaleOffsetBytes: 6,\n      rotationOffsetBytes: 12,\n      colorOffsetBytes: 20,\n      sphericalHarmonicsOffsetBytes: 24,\n      scaleRange: 32767\n    },\n    2: {\n      bytesPerCenter: 6,\n      bytesPerScale: 6,\n      bytesPerRotation: 8,\n      bytesPerColor: 4,\n      bytesPerSphericalHarmonicsComponent: 1,\n      scaleOffsetBytes: 6,\n      rotationOffsetBytes: 12,\n      colorOffsetBytes: 20,\n      sphericalHarmonicsOffsetBytes: 24,\n      scaleRange: 32767\n    }\n  };\n  const KSPLAT_SH_DEGREE_TO_COMPONENTS = {\n    0: 0,\n    1: 9,\n    2: 24,\n    3: 45\n  };\n  function decodeKsplat(fileBytes, initNumSplats, splatCallback, shCallback) {\n    var _a2;\n    const HEADER_BYTES = 4096;\n    const SECTION_BYTES = 1024;\n    let headerOffset = 0;\n    const header = new DataView(fileBytes.buffer, headerOffset, HEADER_BYTES);\n    headerOffset += HEADER_BYTES;\n    const versionMajor = header.getUint8(0);\n    const versionMinor = header.getUint8(1);\n    if (versionMajor !== 0 || versionMinor < 1) {\n      throw new Error(\n        `Unsupported .ksplat version: ${versionMajor}.${versionMinor}`\n      );\n    }\n    const maxSectionCount = header.getUint32(4, true);\n    header.getUint32(16, true);\n    const compressionLevel = header.getUint16(20, true);\n    if (compressionLevel < 0 || compressionLevel > 2) {\n      throw new Error(`Invalid .ksplat compression level: ${compressionLevel}`);\n    }\n    const minSphericalHarmonicsCoeff = header.getFloat32(36, true) || -1.5;\n    const maxSphericalHarmonicsCoeff = header.getFloat32(40, true) || 1.5;\n    let sectionBase = HEADER_BYTES + maxSectionCount * SECTION_BYTES;\n    for (let section = 0; section < maxSectionCount; ++section) {\n      let getSh = function(splatOffset, component) {\n        if (compressionLevel === 0) {\n          return data.getFloat32(\n            splatOffset + sphericalHarmonicsOffsetBytes + component * 4,\n            true\n          );\n        }\n        if (compressionLevel === 1) {\n          return fromHalf(\n            data.getUint16(\n              splatOffset + sphericalHarmonicsOffsetBytes + component * 2,\n              true\n            )\n          );\n        }\n        const t = data.getUint8(splatOffset + sphericalHarmonicsOffsetBytes + component) / 255;\n        return minSphericalHarmonicsCoeff + t * (maxSphericalHarmonicsCoeff - minSphericalHarmonicsCoeff);\n      };\n      const section2 = new DataView(fileBytes.buffer, headerOffset, SECTION_BYTES);\n      headerOffset += SECTION_BYTES;\n      const sectionSplatCount = section2.getUint32(0, true);\n      const sectionMaxSplatCount = section2.getUint32(4, true);\n      const bucketSize = section2.getUint32(8, true);\n      const bucketCount = section2.getUint32(12, true);\n      const bucketBlockSize = section2.getFloat32(16, true);\n      const bucketStorageSizeBytes = section2.getUint16(20, true);\n      const compressionScaleRange = (section2.getUint32(24, true) || ((_a2 = KSPLAT_COMPRESSION[compressionLevel]) == null ? void 0 : _a2.scaleRange)) ?? 1;\n      const fullBucketCount = section2.getUint32(32, true);\n      const fullBucketSplats = fullBucketCount * bucketSize;\n      const partiallyFilledBucketCount = section2.getUint32(36, true);\n      const bucketsMetaDataSizeBytes = partiallyFilledBucketCount * 4;\n      const bucketsStorageSizeBytes = bucketStorageSizeBytes * bucketCount + bucketsMetaDataSizeBytes;\n      const sphericalHarmonicsDegree = section2.getUint16(40, true);\n      const shComponents = KSPLAT_SH_DEGREE_TO_COMPONENTS[sphericalHarmonicsDegree];\n      const {\n        bytesPerCenter,\n        bytesPerScale,\n        bytesPerRotation,\n        bytesPerColor,\n        bytesPerSphericalHarmonicsComponent,\n        scaleOffsetBytes,\n        rotationOffsetBytes,\n        colorOffsetBytes,\n        sphericalHarmonicsOffsetBytes\n      } = KSPLAT_COMPRESSION[compressionLevel];\n      const bytesPerSplat = bytesPerCenter + bytesPerScale + bytesPerRotation + bytesPerColor + shComponents * bytesPerSphericalHarmonicsComponent;\n      const splatDataStorageSizeBytes = bytesPerSplat * sectionMaxSplatCount;\n      const storageSizeBytes = splatDataStorageSizeBytes + bucketsStorageSizeBytes;\n      const sh1Index = [0, 3, 6, 1, 4, 7, 2, 5, 8];\n      const sh2Index = [\n        9,\n        14,\n        19,\n        10,\n        15,\n        20,\n        11,\n        16,\n        21,\n        12,\n        17,\n        22,\n        13,\n        18,\n        23\n      ];\n      const sh3Index = [\n        24,\n        31,\n        38,\n        25,\n        32,\n        39,\n        26,\n        33,\n        40,\n        27,\n        34,\n        41,\n        28,\n        35,\n        42,\n        29,\n        36,\n        43,\n        30,\n        37,\n        44\n      ];\n      const sh1 = sphericalHarmonicsDegree >= 1 ? new Float32Array(3 * 3) : void 0;\n      const sh2 = sphericalHarmonicsDegree >= 2 ? new Float32Array(5 * 3) : void 0;\n      const sh3 = sphericalHarmonicsDegree >= 3 ? new Float32Array(7 * 3) : void 0;\n      const compressionScaleFactor = bucketBlockSize / 2 / compressionScaleRange;\n      const bucketsBase = sectionBase + bucketsMetaDataSizeBytes;\n      const dataBase = sectionBase + bucketsStorageSizeBytes;\n      const data = new DataView(\n        fileBytes.buffer,\n        dataBase,\n        splatDataStorageSizeBytes\n      );\n      const bucketArray = new Float32Array(\n        fileBytes.buffer,\n        bucketsBase,\n        bucketCount * 3\n      );\n      const partiallyFilledBucketLengths = new Uint32Array(\n        fileBytes.buffer,\n        sectionBase,\n        partiallyFilledBucketCount\n      );\n      let partialBucketIndex = fullBucketCount;\n      let partialBucketBase = fullBucketSplats;\n      for (let i2 = 0; i2 < sectionSplatCount; ++i2) {\n        const splatOffset = i2 * bytesPerSplat;\n        let bucketIndex;\n        if (i2 < fullBucketSplats) {\n          bucketIndex = Math.floor(i2 / bucketSize);\n        } else {\n          const bucketLength = partiallyFilledBucketLengths[partialBucketIndex - fullBucketCount];\n          if (i2 >= partialBucketBase + bucketLength) {\n            partialBucketIndex += 1;\n            partialBucketBase += bucketLength;\n          }\n          bucketIndex = partialBucketIndex;\n        }\n        const x2 = compressionLevel === 0 ? data.getFloat32(splatOffset + 0, true) : (data.getUint16(splatOffset + 0, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 0];\n        const y = compressionLevel === 0 ? data.getFloat32(splatOffset + 4, true) : (data.getUint16(splatOffset + 2, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 1];\n        const z = compressionLevel === 0 ? data.getFloat32(splatOffset + 8, true) : (data.getUint16(splatOffset + 4, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 2];\n        const scaleX = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 0, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 0, true));\n        const scaleY = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 4, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 2, true));\n        const scaleZ = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 8, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 4, true));\n        const quatW = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 0, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 0, true)\n        );\n        const quatX = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 4, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 2, true)\n        );\n        const quatY = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 8, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 4, true)\n        );\n        const quatZ = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 12, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 6, true)\n        );\n        const r = data.getUint8(splatOffset + colorOffsetBytes + 0) / 255;\n        const g = data.getUint8(splatOffset + colorOffsetBytes + 1) / 255;\n        const b = data.getUint8(splatOffset + colorOffsetBytes + 2) / 255;\n        const opacity = data.getUint8(splatOffset + colorOffsetBytes + 3) / 255;\n        splatCallback(\n          i2,\n          x2,\n          y,\n          z,\n          scaleX,\n          scaleY,\n          scaleZ,\n          quatX,\n          quatY,\n          quatZ,\n          quatW,\n          opacity,\n          r,\n          g,\n          b\n        );\n        if (sphericalHarmonicsDegree >= 1 && sh1) {\n          for (const [i22, key] of sh1Index.entries()) {\n            sh1[i22] = getSh(splatOffset, key);\n          }\n          if (sh2) {\n            for (const [i22, key] of sh2Index.entries()) {\n              sh2[i22] = getSh(splatOffset, key);\n            }\n          }\n          if (sh3) {\n            for (const [i22, key] of sh3Index.entries()) {\n              sh3[i22] = getSh(splatOffset, key);\n            }\n          }\n          shCallback == null ? void 0 : shCallback(i2, sh1, sh2, sh3);\n        }\n      }\n      sectionBase += storageSizeBytes;\n    }\n  }\n  function unpackKsplat(fileBytes) {\n    var _a2;\n    const HEADER_BYTES = 4096;\n    const SECTION_BYTES = 1024;\n    let headerOffset = 0;\n    const header = new DataView(fileBytes.buffer, headerOffset, HEADER_BYTES);\n    headerOffset += HEADER_BYTES;\n    const versionMajor = header.getUint8(0);\n    const versionMinor = header.getUint8(1);\n    if (versionMajor !== 0 || versionMinor < 1) {\n      throw new Error(\n        `Unsupported .ksplat version: ${versionMajor}.${versionMinor}`\n      );\n    }\n    const maxSectionCount = header.getUint32(4, true);\n    const splatCount = header.getUint32(16, true);\n    const compressionLevel = header.getUint16(20, true);\n    if (compressionLevel < 0 || compressionLevel > 2) {\n      throw new Error(`Invalid .ksplat compression level: ${compressionLevel}`);\n    }\n    const minSphericalHarmonicsCoeff = header.getFloat32(36, true) || -1.5;\n    const maxSphericalHarmonicsCoeff = header.getFloat32(40, true) || 1.5;\n    const numSplats = splatCount;\n    const maxSplats = computeMaxSplats(numSplats);\n    const packedArray = new Uint32Array(maxSplats * 4);\n    const extra = {};\n    let sectionBase = HEADER_BYTES + maxSectionCount * SECTION_BYTES;\n    for (let section = 0; section < maxSectionCount; ++section) {\n      let getSh = function(splatOffset, component) {\n        if (compressionLevel === 0) {\n          return data.getFloat32(\n            splatOffset + sphericalHarmonicsOffsetBytes + component * 4,\n            true\n          );\n        }\n        if (compressionLevel === 1) {\n          return fromHalf(\n            data.getUint16(\n              splatOffset + sphericalHarmonicsOffsetBytes + component * 2,\n              true\n            )\n          );\n        }\n        const t = data.getUint8(splatOffset + sphericalHarmonicsOffsetBytes + component) / 255;\n        return minSphericalHarmonicsCoeff + t * (maxSphericalHarmonicsCoeff - minSphericalHarmonicsCoeff);\n      };\n      const section2 = new DataView(fileBytes.buffer, headerOffset, SECTION_BYTES);\n      headerOffset += SECTION_BYTES;\n      const sectionSplatCount = section2.getUint32(0, true);\n      const sectionMaxSplatCount = section2.getUint32(4, true);\n      const bucketSize = section2.getUint32(8, true);\n      const bucketCount = section2.getUint32(12, true);\n      const bucketBlockSize = section2.getFloat32(16, true);\n      const bucketStorageSizeBytes = section2.getUint16(20, true);\n      const compressionScaleRange = (section2.getUint32(24, true) || ((_a2 = KSPLAT_COMPRESSION[compressionLevel]) == null ? void 0 : _a2.scaleRange)) ?? 1;\n      const fullBucketCount = section2.getUint32(32, true);\n      const fullBucketSplats = fullBucketCount * bucketSize;\n      const partiallyFilledBucketCount = section2.getUint32(36, true);\n      const bucketsMetaDataSizeBytes = partiallyFilledBucketCount * 4;\n      const bucketsStorageSizeBytes = bucketStorageSizeBytes * bucketCount + bucketsMetaDataSizeBytes;\n      const sphericalHarmonicsDegree = section2.getUint16(40, true);\n      const shComponents = KSPLAT_SH_DEGREE_TO_COMPONENTS[sphericalHarmonicsDegree];\n      const {\n        bytesPerCenter,\n        bytesPerScale,\n        bytesPerRotation,\n        bytesPerColor,\n        bytesPerSphericalHarmonicsComponent,\n        scaleOffsetBytes,\n        rotationOffsetBytes,\n        colorOffsetBytes,\n        sphericalHarmonicsOffsetBytes\n      } = KSPLAT_COMPRESSION[compressionLevel];\n      const bytesPerSplat = bytesPerCenter + bytesPerScale + bytesPerRotation + bytesPerColor + shComponents * bytesPerSphericalHarmonicsComponent;\n      const splatDataStorageSizeBytes = bytesPerSplat * sectionMaxSplatCount;\n      const storageSizeBytes = splatDataStorageSizeBytes + bucketsStorageSizeBytes;\n      const sh1Index = [0, 3, 6, 1, 4, 7, 2, 5, 8];\n      const sh2Index = [\n        9,\n        14,\n        19,\n        10,\n        15,\n        20,\n        11,\n        16,\n        21,\n        12,\n        17,\n        22,\n        13,\n        18,\n        23\n      ];\n      const sh3Index = [\n        24,\n        31,\n        38,\n        25,\n        32,\n        39,\n        26,\n        33,\n        40,\n        27,\n        34,\n        41,\n        28,\n        35,\n        42,\n        29,\n        36,\n        43,\n        30,\n        37,\n        44\n      ];\n      const sh1 = sphericalHarmonicsDegree >= 1 ? new Float32Array(3 * 3) : void 0;\n      const sh2 = sphericalHarmonicsDegree >= 2 ? new Float32Array(5 * 3) : void 0;\n      const sh3 = sphericalHarmonicsDegree >= 3 ? new Float32Array(7 * 3) : void 0;\n      const compressionScaleFactor = bucketBlockSize / 2 / compressionScaleRange;\n      const bucketsBase = sectionBase + bucketsMetaDataSizeBytes;\n      const dataBase = sectionBase + bucketsStorageSizeBytes;\n      const data = new DataView(\n        fileBytes.buffer,\n        dataBase,\n        splatDataStorageSizeBytes\n      );\n      const bucketArray = new Float32Array(\n        fileBytes.buffer,\n        bucketsBase,\n        bucketCount * 3\n      );\n      const partiallyFilledBucketLengths = new Uint32Array(\n        fileBytes.buffer,\n        sectionBase,\n        partiallyFilledBucketCount\n      );\n      let partialBucketIndex = fullBucketCount;\n      let partialBucketBase = fullBucketSplats;\n      for (let i2 = 0; i2 < sectionSplatCount; ++i2) {\n        const splatOffset = i2 * bytesPerSplat;\n        let bucketIndex;\n        if (i2 < fullBucketSplats) {\n          bucketIndex = Math.floor(i2 / bucketSize);\n        } else {\n          const bucketLength = partiallyFilledBucketLengths[partialBucketIndex - fullBucketCount];\n          if (i2 >= partialBucketBase + bucketLength) {\n            partialBucketIndex += 1;\n            partialBucketBase += bucketLength;\n          }\n          bucketIndex = partialBucketIndex;\n        }\n        const x2 = compressionLevel === 0 ? data.getFloat32(splatOffset + 0, true) : (data.getUint16(splatOffset + 0, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 0];\n        const y = compressionLevel === 0 ? data.getFloat32(splatOffset + 4, true) : (data.getUint16(splatOffset + 2, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 1];\n        const z = compressionLevel === 0 ? data.getFloat32(splatOffset + 8, true) : (data.getUint16(splatOffset + 4, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 2];\n        const scaleX = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 0, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 0, true));\n        const scaleY = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 4, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 2, true));\n        const scaleZ = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 8, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 4, true));\n        const quatW = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 0, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 0, true)\n        );\n        const quatX = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 4, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 2, true)\n        );\n        const quatY = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 8, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 4, true)\n        );\n        const quatZ = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 12, true) : fromHalf(\n          data.getUint16(splatOffset + rotationOffsetBytes + 6, true)\n        );\n        const r = data.getUint8(splatOffset + colorOffsetBytes + 0) / 255;\n        const g = data.getUint8(splatOffset + colorOffsetBytes + 1) / 255;\n        const b = data.getUint8(splatOffset + colorOffsetBytes + 2) / 255;\n        const opacity = data.getUint8(splatOffset + colorOffsetBytes + 3) / 255;\n        setPackedSplat(\n          packedArray,\n          i2,\n          x2,\n          y,\n          z,\n          scaleX,\n          scaleY,\n          scaleZ,\n          quatX,\n          quatY,\n          quatZ,\n          quatW,\n          opacity,\n          r,\n          g,\n          b\n        );\n        if (sphericalHarmonicsDegree >= 1) {\n          if (sh1) {\n            if (!extra.sh1) {\n              extra.sh1 = new Uint32Array(numSplats * 2);\n            }\n            for (const [i22, key] of sh1Index.entries()) {\n              sh1[i22] = getSh(splatOffset, key);\n            }\n            encodeSh1Rgb(extra.sh1, i2, sh1);\n          }\n          if (sh2) {\n            if (!extra.sh2) {\n              extra.sh2 = new Uint32Array(numSplats * 4);\n            }\n            for (const [i22, key] of sh2Index.entries()) {\n              sh2[i22] = getSh(splatOffset, key);\n            }\n            encodeSh2Rgb(extra.sh2, i2, sh2);\n          }\n          if (sh3) {\n            if (!extra.sh3) {\n              extra.sh3 = new Uint32Array(numSplats * 4);\n            }\n            for (const [i22, key] of sh3Index.entries()) {\n              sh3[i22] = getSh(splatOffset, key);\n            }\n            encodeSh3Rgb(extra.sh3, i2, sh3);\n          }\n        }\n      }\n      sectionBase += storageSizeBytes;\n    }\n    return { packedArray, numSplats, extra };\n  }\n  const _PlyReader = class _PlyReader {\n    // Create a PlyReader from a Uint8Array/ArrayBuffer, no parsing done yet\n    constructor({ fileBytes }) {\n      this.header = "";\n      this.littleEndian = true;\n      this.elements = {};\n      this.comments = [];\n      this.data = null;\n      this.numSplats = 0;\n      this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;\n    }\n    // Identify and parse the PLY text header (assumed to be <64KB in size).\n    // this.elements will contain all the elements in the file, typically\n    // "vertex" contains the Gsplat data.\n    async parseHeader() {\n      const bufferStream = new ReadableStream({\n        start: (controller) => {\n          controller.enqueue(this.fileBytes.slice(0, 65536));\n          controller.close();\n        }\n      });\n      const decoder = bufferStream.pipeThrough(new TextDecoderStream()).getReader();\n      this.header = "";\n      const headerTerminator = "end_header\\n";\n      while (true) {\n        const { value, done } = await decoder.read();\n        if (done) {\n          throw new Error("Failed to read header");\n        }\n        this.header += value;\n        const endHeader = this.header.indexOf(headerTerminator);\n        if (endHeader >= 0) {\n          this.header = this.header.slice(0, endHeader + headerTerminator.length);\n          break;\n        }\n      }\n      const headerLen = new TextEncoder().encode(this.header).length;\n      this.data = new DataView(this.fileBytes.buffer, headerLen);\n      this.elements = {};\n      let curElement = null;\n      this.comments = [];\n      this.header.trim().split("\\n").forEach((line, lineIndex) => {\n        const trimmedLine = line.trim();\n        if (lineIndex === 0) {\n          if (trimmedLine !== "ply") {\n            throw new Error("Invalid PLY header");\n          }\n          return;\n        }\n        if (trimmedLine.length === 0) {\n          return;\n        }\n        const fields = trimmedLine.split(" ");\n        switch (fields[0]) {\n          case "format":\n            if (fields[1] === "binary_little_endian") {\n              this.littleEndian = true;\n            } else if (fields[1] === "binary_big_endian") {\n              this.littleEndian = false;\n            } else {\n              throw new Error(`Unsupported PLY format: ${fields[1]}`);\n            }\n            if (fields[2] !== "1.0") {\n              throw new Error(`Unsupported PLY version: ${fields[2]}`);\n            }\n            break;\n          case "end_header":\n            break;\n          case "comment":\n            this.comments.push(trimmedLine.slice("comment ".length));\n            break;\n          case "element": {\n            const name = fields[1];\n            curElement = {\n              name,\n              count: Number.parseInt(fields[2]),\n              properties: {}\n            };\n            this.elements[name] = curElement;\n            break;\n          }\n          case "property":\n            if (curElement == null) {\n              throw new Error("Property must be inside an element");\n            }\n            if (fields[1] === "list") {\n              curElement.properties[fields[4]] = {\n                isList: true,\n                type: fields[3],\n                countType: fields[2]\n              };\n            } else {\n              curElement.properties[fields[2]] = {\n                isList: false,\n                type: fields[1]\n              };\n            }\n            break;\n        }\n      });\n      if (this.elements.vertex) {\n        this.numSplats = this.elements.vertex.count;\n      }\n    }\n    parseData(elementCallback) {\n      let offset = 0;\n      const data = this.data;\n      if (data == null) {\n        throw new Error("No data to parse");\n      }\n      for (const elementName in this.elements) {\n        const element = this.elements[elementName];\n        const { count, properties } = element;\n        const item = {};\n        const parsers = [];\n        for (const [propertyName, property] of Object.entries(properties)) {\n          if (!property.isList) {\n            item[propertyName] = 0;\n            parsers.push(() => {\n              item[propertyName] = PARSE_FIELD[property.type](\n                data,\n                offset,\n                this.littleEndian\n              );\n              offset += FIELD_BYTES[property.type];\n            });\n          } else {\n            item[propertyName] = [];\n            parsers.push(() => {\n              const list = item[propertyName];\n              list.length = PARSE_FIELD[property.countType](\n                data,\n                offset,\n                this.littleEndian\n              );\n              offset += FIELD_BYTES[property.countType];\n              for (let i2 = 0; i2 < list.length; i2++) {\n                list[i2] = PARSE_FIELD[property.type](\n                  data,\n                  offset,\n                  this.littleEndian\n                );\n                offset += FIELD_BYTES[property.type];\n              }\n            });\n          }\n        }\n        const callback = elementCallback(element) ?? (() => {\n        });\n        for (let index = 0; index < count; index++) {\n          for (const parser of parsers) {\n            parser();\n          }\n          callback(index, item);\n        }\n      }\n    }\n    // Parse all the Gsplat data in the PLY file in go, invoking the given\n    // callbacks for each Gsplat.\n    parseSplats(splatCallback, shCallback) {\n      if (this.elements.vertex == null) {\n        throw new Error("No vertex element found");\n      }\n      let isSuperSplat = false;\n      const ssChunks = [];\n      let numSh = 0;\n      let sh1Props = [];\n      let sh2Props = [];\n      let sh3Props = [];\n      let sh1 = void 0;\n      let sh2 = void 0;\n      let sh3 = void 0;\n      function prepareSh() {\n        const num_f_rest = NUM_SH_TO_NUM_F_REST[numSh];\n        sh1Props = new Array(3).fill(null).flatMap(\n          (_, k) => [0, 1, 2].map((_2, d) => `f_rest_${k + d * num_f_rest / 3}`)\n        );\n        sh2Props = new Array(5).fill(null).flatMap(\n          (_, k) => [0, 1, 2].map((_2, d) => `f_rest_${3 + k + d * num_f_rest / 3}`)\n        );\n        sh3Props = new Array(7).fill(null).flatMap(\n          (_, k) => [0, 1, 2].map((_2, d) => `f_rest_${8 + k + d * num_f_rest / 3}`)\n        );\n        sh1 = numSh >= 1 ? new Float32Array(3 * 3) : void 0;\n        sh2 = numSh >= 2 ? new Float32Array(5 * 3) : void 0;\n        sh3 = numSh >= 3 ? new Float32Array(7 * 3) : void 0;\n      }\n      function ssShCallback(index, item) {\n        if (!sh1) {\n          throw new Error("Missing sh1");\n        }\n        for (const [i2, key] of sh1Props.entries()) {\n          sh1[i2] = item[key] * 8 / 255 - 4;\n        }\n        if (sh2) {\n          for (const [i2, key] of sh2Props.entries()) {\n            sh2[i2] = item[key] * 8 / 255 - 4;\n          }\n        }\n        if (sh3) {\n          for (const [i2, key] of sh3Props.entries()) {\n            sh3[i2] = item[key] * 8 / 255 - 4;\n          }\n        }\n        shCallback == null ? void 0 : shCallback(index, sh1, sh2, sh3);\n      }\n      function initSuperSplat(element) {\n        const {\n          min_x,\n          min_y,\n          min_z,\n          max_x,\n          max_y,\n          max_z,\n          min_scale_x,\n          min_scale_y,\n          min_scale_z,\n          max_scale_x,\n          max_scale_y,\n          max_scale_z\n        } = element.properties;\n        if (!min_x || !min_y || !min_z || !max_x || !max_y || !max_z || !min_scale_x || !min_scale_y || !min_scale_z || !max_scale_x || !max_scale_y || !max_scale_z) {\n          throw new Error("Missing PLY chunk properties");\n        }\n        isSuperSplat = true;\n        return (index, item) => {\n          const {\n            min_x: min_x2,\n            min_y: min_y2,\n            min_z: min_z2,\n            max_x: max_x2,\n            max_y: max_y2,\n            max_z: max_z2,\n            min_scale_x: min_scale_x2,\n            min_scale_y: min_scale_y2,\n            min_scale_z: min_scale_z2,\n            max_scale_x: max_scale_x2,\n            max_scale_y: max_scale_y2,\n            max_scale_z: max_scale_z2,\n            min_r,\n            min_g,\n            min_b,\n            max_r,\n            max_g,\n            max_b\n          } = item;\n          ssChunks.push({\n            min_x: min_x2,\n            min_y: min_y2,\n            min_z: min_z2,\n            max_x: max_x2,\n            max_y: max_y2,\n            max_z: max_z2,\n            min_scale_x: min_scale_x2,\n            min_scale_y: min_scale_y2,\n            min_scale_z: min_scale_z2,\n            max_scale_x: max_scale_x2,\n            max_scale_y: max_scale_y2,\n            max_scale_z: max_scale_z2,\n            min_r,\n            min_g,\n            min_b,\n            max_r,\n            max_g,\n            max_b\n          });\n        };\n      }\n      function decodeSuperSplat(element) {\n        if (shCallback && element.name === "sh") {\n          numSh = getNumSh(element.properties);\n          prepareSh();\n          return ssShCallback;\n        }\n        if (element.name !== "vertex") {\n          return null;\n        }\n        const { packed_position, packed_rotation, packed_scale, packed_color } = element.properties;\n        if (!packed_position || !packed_rotation || !packed_scale || !packed_color) {\n          throw new Error(\n            "Missing PLY properties: packed_position, packed_rotation, packed_scale, packed_color"\n          );\n        }\n        const SQRT2 = Math.sqrt(2);\n        return (index, item) => {\n          const chunk = ssChunks[index >>> 8];\n          if (chunk == null) {\n            throw new Error("Missing PLY chunk");\n          }\n          const {\n            min_x,\n            min_y,\n            min_z,\n            max_x,\n            max_y,\n            max_z,\n            min_scale_x,\n            min_scale_y,\n            min_scale_z,\n            max_scale_x,\n            max_scale_y,\n            max_scale_z,\n            min_r,\n            min_g,\n            min_b,\n            max_r,\n            max_g,\n            max_b\n          } = chunk;\n          const { packed_position: packed_position2, packed_rotation: packed_rotation2, packed_scale: packed_scale2, packed_color: packed_color2 } = item;\n          const x2 = (packed_position2 >>> 21 & 2047) / 2047 * (max_x - min_x) + min_x;\n          const y = (packed_position2 >>> 11 & 1023) / 1023 * (max_y - min_y) + min_y;\n          const z = (packed_position2 & 2047) / 2047 * (max_z - min_z) + min_z;\n          const r0 = ((packed_rotation2 >>> 20 & 1023) / 1023 - 0.5) * SQRT2;\n          const r1 = ((packed_rotation2 >>> 10 & 1023) / 1023 - 0.5) * SQRT2;\n          const r2 = ((packed_rotation2 & 1023) / 1023 - 0.5) * SQRT2;\n          const rr = Math.sqrt(Math.max(0, 1 - r0 * r0 - r1 * r1 - r2 * r2));\n          const rOrder = packed_rotation2 >>> 30;\n          const quatX = rOrder === 0 ? r0 : rOrder === 1 ? rr : r1;\n          const quatY = rOrder <= 1 ? r1 : rOrder === 2 ? rr : r2;\n          const quatZ = rOrder <= 2 ? r2 : rr;\n          const quatW = rOrder === 0 ? rr : r0;\n          const scaleX = Math.exp(\n            (packed_scale2 >>> 21 & 2047) / 2047 * (max_scale_x - min_scale_x) + min_scale_x\n          );\n          const scaleY = Math.exp(\n            (packed_scale2 >>> 11 & 1023) / 1023 * (max_scale_y - min_scale_y) + min_scale_y\n          );\n          const scaleZ = Math.exp(\n            (packed_scale2 & 2047) / 2047 * (max_scale_z - min_scale_z) + min_scale_z\n          );\n          const r = (packed_color2 >>> 24 & 255) / 255 * ((max_r ?? 1) - (min_r ?? 0)) + (min_r ?? 0);\n          const g = (packed_color2 >>> 16 & 255) / 255 * ((max_g ?? 1) - (min_g ?? 0)) + (min_g ?? 0);\n          const b = (packed_color2 >>> 8 & 255) / 255 * ((max_b ?? 1) - (min_b ?? 0)) + (min_b ?? 0);\n          const opacity = (packed_color2 & 255) / 255;\n          splatCallback(\n            index,\n            x2,\n            y,\n            z,\n            scaleX,\n            scaleY,\n            scaleZ,\n            quatX,\n            quatY,\n            quatZ,\n            quatW,\n            opacity,\n            r,\n            g,\n            b\n          );\n        };\n      }\n      const elementCallback = (element) => {\n        if (element.name === "chunk") {\n          return initSuperSplat(element);\n        }\n        if (isSuperSplat) {\n          return decodeSuperSplat(element);\n        }\n        if (element.name !== "vertex") {\n          return null;\n        }\n        const {\n          x: x2,\n          y,\n          z,\n          scale_0,\n          scale_1,\n          scale_2,\n          rot_0,\n          rot_1,\n          rot_2,\n          rot_3,\n          opacity,\n          f_dc_0,\n          f_dc_1,\n          f_dc_2,\n          red,\n          green,\n          blue,\n          alpha\n        } = element.properties;\n        if (!x2 || !y || !z) {\n          throw new Error("Missing PLY properties: x, y, z");\n        }\n        const hasScales = scale_0 && scale_1 && scale_2;\n        const hasRots = rot_0 && rot_1 && rot_2 && rot_3;\n        const alphaDiv = alpha != null ? FIELD_SCALE[alpha.type] : 1;\n        const redDiv = red != null ? FIELD_SCALE[red.type] : 1;\n        const greenDiv = green != null ? FIELD_SCALE[green.type] : 1;\n        const blueDiv = blue != null ? FIELD_SCALE[blue.type] : 1;\n        numSh = getNumSh(element.properties);\n        prepareSh();\n        return (index, item) => {\n          const scaleX = hasScales ? Math.exp(item.scale_0) : _PlyReader.defaultPointScale;\n          const scaleY = hasScales ? Math.exp(item.scale_1) : _PlyReader.defaultPointScale;\n          const scaleZ = hasScales ? Math.exp(item.scale_2) : _PlyReader.defaultPointScale;\n          const quatX = hasRots ? item.rot_1 : 0;\n          const quatY = hasRots ? item.rot_2 : 0;\n          const quatZ = hasRots ? item.rot_3 : 0;\n          const quatW = hasRots ? item.rot_0 : 1;\n          const op = opacity != null ? 1 / (1 + Math.exp(-item.opacity)) : alpha != null ? item.alpha / alphaDiv : 1;\n          const r = f_dc_0 != null ? item.f_dc_0 * SH_C0$1 + 0.5 : red != null ? item.red / redDiv : 1;\n          const g = f_dc_1 != null ? item.f_dc_1 * SH_C0$1 + 0.5 : green != null ? item.green / greenDiv : 1;\n          const b = f_dc_2 != null ? item.f_dc_2 * SH_C0$1 + 0.5 : blue != null ? item.blue / blueDiv : 1;\n          splatCallback(\n            index,\n            item.x,\n            item.y,\n            item.z,\n            scaleX,\n            scaleY,\n            scaleZ,\n            quatX,\n            quatY,\n            quatZ,\n            quatW,\n            op,\n            r,\n            g,\n            b\n          );\n          if (shCallback && sh1) {\n            if (sh1) {\n              for (const [i2, key] of sh1Props.entries()) {\n                sh1[i2] = item[key];\n              }\n            }\n            if (sh2) {\n              for (const [i2, key] of sh2Props.entries()) {\n                sh2[i2] = item[key];\n              }\n            }\n            if (sh3) {\n              for (const [i2, key] of sh3Props.entries()) {\n                sh3[i2] = item[key];\n              }\n            }\n            shCallback(index, sh1, sh2, sh3);\n          }\n        };\n      };\n      this.parseData(elementCallback);\n    }\n    // Inject RGBA values into original PLY file, which can be used to modify\n    // the color/opacity of the Gsplats and write out the modified PLY file.\n    injectRgba(rgba) {\n      let offset = 0;\n      const data = this.data;\n      if (data == null) {\n        throw new Error("No parsed data");\n      }\n      if (rgba.length !== this.numSplats * 4) {\n        throw new Error("Invalid RGBA array length");\n      }\n      for (const elementName in this.elements) {\n        const element = this.elements[elementName];\n        const { count, properties } = element;\n        const parsers = [];\n        let rgbaOffset = 0;\n        const isVertex = elementName === "vertex";\n        if (isVertex) {\n          for (const name of ["opacity", "f_dc_0", "f_dc_1", "f_dc_2"]) {\n            if (!properties[name] || properties[name].type !== "float") {\n              throw new Error(`Can\'t injectRgba due to property: ${name}`);\n            }\n          }\n        }\n        for (const [propertyName, property] of Object.entries(properties)) {\n          if (!property.isList) {\n            if (isVertex) {\n              if (propertyName === "f_dc_0" || propertyName === "f_dc_1" || propertyName === "f_dc_2") {\n                const component = Number.parseInt(\n                  propertyName.slice("f_dc_".length)\n                );\n                parsers.push(() => {\n                  const value = (rgba[rgbaOffset + component] / 255 - 0.5) / SH_C0$1;\n                  SET_FIELD[property.type](\n                    data,\n                    offset,\n                    this.littleEndian,\n                    value\n                  );\n                });\n              } else if (propertyName === "opacity") {\n                parsers.push(() => {\n                  const value = Math.max(\n                    -100,\n                    Math.min(\n                      100,\n                      -Math.log(1 / (rgba[rgbaOffset + 3] / 255) - 1)\n                    )\n                  );\n                  SET_FIELD[property.type](\n                    data,\n                    offset,\n                    this.littleEndian,\n                    value\n                  );\n                });\n              }\n            }\n            parsers.push(() => {\n              offset += FIELD_BYTES[property.type];\n            });\n          } else {\n            parsers.push(() => {\n              const length = PARSE_FIELD[property.countType](\n                data,\n                offset,\n                this.littleEndian\n              );\n              offset += FIELD_BYTES[property.countType];\n              offset += length * FIELD_BYTES[property.type];\n            });\n          }\n        }\n        for (let index = 0; index < count; index++) {\n          for (const parser of parsers) {\n            parser();\n          }\n          if (isVertex) {\n            rgbaOffset += 4;\n          }\n        }\n      }\n    }\n  };\n  _PlyReader.defaultPointScale = 1e-3;\n  let PlyReader = _PlyReader;\n  const SH_C0$1 = 0.28209479177387814;\n  const PARSE_FIELD = {\n    char: (data, offset, littleEndian) => {\n      return data.getInt8(offset);\n    },\n    uchar: (data, offset, littleEndian) => {\n      return data.getUint8(offset);\n    },\n    short: (data, offset, littleEndian) => {\n      return data.getInt16(offset, littleEndian);\n    },\n    ushort: (data, offset, littleEndian) => {\n      return data.getUint16(offset, littleEndian);\n    },\n    int: (data, offset, littleEndian) => {\n      return data.getInt32(offset, littleEndian);\n    },\n    uint: (data, offset, littleEndian) => {\n      return data.getUint32(offset, littleEndian);\n    },\n    float: (data, offset, littleEndian) => {\n      return data.getFloat32(offset, littleEndian);\n    },\n    double: (data, offset, littleEndian) => {\n      return data.getFloat64(offset, littleEndian);\n    }\n  };\n  const SET_FIELD = {\n    char: (data, offset, littleEndian, value) => {\n      data.setInt8(offset, value);\n    },\n    uchar: (data, offset, littleEndian, value) => {\n      data.setUint8(offset, value);\n    },\n    short: (data, offset, littleEndian, value) => {\n      data.setInt16(offset, value, littleEndian);\n    },\n    ushort: (data, offset, littleEndian, value) => {\n      data.setUint16(offset, value, littleEndian);\n    },\n    int: (data, offset, littleEndian, value) => {\n      data.setInt32(offset, value, littleEndian);\n    },\n    uint: (data, offset, littleEndian, value) => {\n      data.setUint32(offset, value, littleEndian);\n    },\n    float: (data, offset, littleEndian, value) => {\n      data.setFloat32(offset, value, littleEndian);\n    },\n    double: (data, offset, littleEndian, value) => {\n      data.setFloat64(offset, value, littleEndian);\n    }\n  };\n  const FIELD_BYTES = {\n    char: 1,\n    uchar: 1,\n    short: 2,\n    ushort: 2,\n    int: 4,\n    uint: 4,\n    float: 4,\n    double: 8\n  };\n  const FIELD_SCALE = {\n    char: 127,\n    uchar: 255,\n    short: 32767,\n    ushort: 65535,\n    int: 2147483647,\n    uint: 4294967295,\n    float: 1,\n    double: 1\n  };\n  const NUM_F_REST_TO_NUM_SH = {\n    0: 0,\n    9: 1,\n    24: 2,\n    45: 3\n  };\n  const NUM_SH_TO_NUM_F_REST = {\n    0: 0,\n    1: 9,\n    2: 24,\n    3: 45\n  };\n  function getNumSh(properties) {\n    let num_f_rest = 0;\n    while (properties[`f_rest_${num_f_rest}`]) {\n      num_f_rest += 1;\n    }\n    const numSh = NUM_F_REST_TO_NUM_SH[num_f_rest];\n    if (numSh == null) {\n      throw new Error(`Unsupported number of SH coefficients: ${num_f_rest}`);\n    }\n    return numSh;\n  }\n  var SplatFileType = /* @__PURE__ */ ((SplatFileType2) => {\n    SplatFileType2["PLY"] = "ply";\n    SplatFileType2["SPZ"] = "spz";\n    SplatFileType2["SPLAT"] = "splat";\n    SplatFileType2["KSPLAT"] = "ksplat";\n    SplatFileType2["PCSOGS"] = "pcsogs";\n    SplatFileType2["PCSOGSZIP"] = "pcsogszip";\n    return SplatFileType2;\n  })(SplatFileType || {});\n  function getSplatFileType(fileBytes) {\n    const view = new DataView(fileBytes.buffer);\n    if ((view.getUint32(0, true) & 16777215) === 7957616) {\n      return "ply";\n    }\n    if ((view.getUint32(0, true) & 16777215) === 559903) {\n      const header = decompressPartialGzip(fileBytes, 4);\n      const gView = new DataView(header.buffer);\n      if (gView.getUint32(0, true) === 1347635022) {\n        return "spz";\n      }\n      return void 0;\n    }\n    if (view.getUint32(0, true) === 67324752) {\n      if (tryPcSogsZip(fileBytes)) {\n        return "pcsogszip";\n      }\n      return void 0;\n    }\n    return void 0;\n  }\n  function getFileExtension(pathOrUrl) {\n    const noTrailing = pathOrUrl.split(/[?#]/, 1)[0];\n    const lastSlash = Math.max(\n      noTrailing.lastIndexOf("/"),\n      noTrailing.lastIndexOf("\\\\")\n    );\n    const filename = noTrailing.slice(lastSlash + 1);\n    const lastDot = filename.lastIndexOf(".");\n    if (lastDot <= 0 || lastDot === filename.length - 1) {\n      return "";\n    }\n    return filename.slice(lastDot + 1).toLowerCase();\n  }\n  function getSplatFileTypeFromPath(pathOrUrl) {\n    const extension = getFileExtension(pathOrUrl);\n    if (extension === "ply") {\n      return "ply";\n    }\n    if (extension === "spz") {\n      return "spz";\n    }\n    if (extension === "splat") {\n      return "splat";\n    }\n    if (extension === "ksplat") {\n      return "ksplat";\n    }\n    return void 0;\n  }\n  function tryPcSogs(input) {\n    try {\n      let text;\n      if (typeof input === "string") {\n        text = input;\n      } else {\n        const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;\n        if (fileBytes.length > 65536) {\n          return void 0;\n        }\n        text = new TextDecoder().decode(fileBytes);\n      }\n      const json = JSON.parse(text);\n      if (!json || typeof json !== "object" || Array.isArray(json)) {\n        return void 0;\n      }\n      for (const key of ["means", "scales", "quats", "sh0"]) {\n        if (!json[key] || typeof json[key] !== "object" || Array.isArray(json[key])) {\n          return void 0;\n        }\n        if (!json[key].shape || !json[key].files) {\n          return void 0;\n        }\n        if (key !== "quats" && (!json[key].mins || !json[key].maxs)) {\n          return void 0;\n        }\n      }\n      return json;\n    } catch {\n      return void 0;\n    }\n  }\n  function tryPcSogsZip(input) {\n    try {\n      const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;\n      let metaFilename = null;\n      const unzipped = unzipSync(fileBytes, {\n        filter: ({ name }) => {\n          const filename = name.split(/[\\\\/]/).pop();\n          if (filename === "meta.json") {\n            metaFilename = name;\n            return true;\n          }\n          return false;\n        }\n      });\n      if (!metaFilename) {\n        return void 0;\n      }\n      const json = tryPcSogs(unzipped[metaFilename]);\n      if (!json) {\n        return void 0;\n      }\n      return { name: metaFilename, json };\n    } catch {\n      return void 0;\n    }\n  }\n  class SplatData {\n    constructor({ maxSplats = 1 } = {}) {\n      this.numSplats = 0;\n      this.maxSplats = getTextureSize(maxSplats).maxSplats;\n      this.centers = new Float32Array(this.maxSplats * 3);\n      this.scales = new Float32Array(this.maxSplats * 3);\n      this.quaternions = new Float32Array(this.maxSplats * 4);\n      this.opacities = new Float32Array(this.maxSplats);\n      this.colors = new Float32Array(this.maxSplats * 3);\n    }\n    pushSplat() {\n      const index = this.numSplats;\n      this.ensureIndex(index);\n      this.numSplats += 1;\n      return index;\n    }\n    unpushSplat(index) {\n      if (index === this.numSplats - 1) {\n        this.numSplats -= 1;\n      } else {\n        throw new Error("Cannot unpush splat from non-last position");\n      }\n    }\n    ensureCapacity(numSplats) {\n      if (numSplats > this.maxSplats) {\n        const targetSplats = Math.max(numSplats, this.maxSplats * 2);\n        const newCenters = new Float32Array(targetSplats * 3);\n        const newScales = new Float32Array(targetSplats * 3);\n        const newQuaternions = new Float32Array(targetSplats * 4);\n        const newOpacities = new Float32Array(targetSplats);\n        const newColors = new Float32Array(targetSplats * 3);\n        newCenters.set(this.centers);\n        newScales.set(this.scales);\n        newQuaternions.set(this.quaternions);\n        newOpacities.set(this.opacities);\n        newColors.set(this.colors);\n        this.centers = newCenters;\n        this.scales = newScales;\n        this.quaternions = newQuaternions;\n        this.opacities = newOpacities;\n        this.colors = newColors;\n        if (this.sh1) {\n          const newSh1 = new Float32Array(targetSplats * 9);\n          newSh1.set(this.sh1);\n          this.sh1 = newSh1;\n        }\n        if (this.sh2) {\n          const newSh2 = new Float32Array(targetSplats * 15);\n          newSh2.set(this.sh2);\n          this.sh2 = newSh2;\n        }\n        if (this.sh3) {\n          const newSh3 = new Float32Array(targetSplats * 21);\n          newSh3.set(this.sh3);\n          this.sh3 = newSh3;\n        }\n        this.maxSplats = targetSplats;\n      }\n    }\n    ensureIndex(index) {\n      this.ensureCapacity(index + 1);\n    }\n    setCenter(index, x2, y, z) {\n      this.centers[index * 3] = x2;\n      this.centers[index * 3 + 1] = y;\n      this.centers[index * 3 + 2] = z;\n    }\n    setScale(index, scaleX, scaleY, scaleZ) {\n      this.scales[index * 3] = scaleX;\n      this.scales[index * 3 + 1] = scaleY;\n      this.scales[index * 3 + 2] = scaleZ;\n    }\n    setQuaternion(index, x2, y, z, w) {\n      this.quaternions[index * 4] = x2;\n      this.quaternions[index * 4 + 1] = y;\n      this.quaternions[index * 4 + 2] = z;\n      this.quaternions[index * 4 + 3] = w;\n    }\n    setOpacity(index, opacity) {\n      this.opacities[index] = opacity;\n    }\n    setColor(index, r, g, b) {\n      this.colors[index * 3] = r;\n      this.colors[index * 3 + 1] = g;\n      this.colors[index * 3 + 2] = b;\n    }\n    setSh1(index, sh1) {\n      if (!this.sh1) {\n        this.sh1 = new Float32Array(this.maxSplats * 9);\n      }\n      for (let j = 0; j < 9; ++j) {\n        this.sh1[index * 9 + j] = sh1[j];\n      }\n    }\n    setSh2(index, sh2) {\n      if (!this.sh2) {\n        this.sh2 = new Float32Array(this.maxSplats * 15);\n      }\n      for (let j = 0; j < 15; ++j) {\n        this.sh2[index * 15 + j] = sh2[j];\n      }\n    }\n    setSh3(index, sh3) {\n      if (!this.sh3) {\n        this.sh3 = new Float32Array(this.maxSplats * 21);\n      }\n      for (let j = 0; j < 21; ++j) {\n        this.sh3[index * 21 + j] = sh3[j];\n      }\n    }\n  }\n  async function unpackPcSogs(json, extraFiles) {\n    if (json.quats.encoding !== "quaternion_packed") {\n      throw new Error("Unsupported quaternion encoding");\n    }\n    const numSplats = json.means.shape[0];\n    const maxSplats = computeMaxSplats(numSplats);\n    const packedArray = new Uint32Array(maxSplats * 4);\n    const extra = {};\n    const meansPromise = Promise.all([\n      decodeImageRgba(extraFiles[json.means.files[0]]),\n      decodeImageRgba(extraFiles[json.means.files[1]])\n    ]).then((means) => {\n      for (let i2 = 0; i2 < numSplats; ++i2) {\n        const i4 = i2 * 4;\n        const fx = (means[0][i4 + 0] + (means[1][i4 + 0] << 8)) / 65535;\n        const fy = (means[0][i4 + 1] + (means[1][i4 + 1] << 8)) / 65535;\n        const fz = (means[0][i4 + 2] + (means[1][i4 + 2] << 8)) / 65535;\n        let x2 = json.means.mins[0] + (json.means.maxs[0] - json.means.mins[0]) * fx;\n        let y = json.means.mins[1] + (json.means.maxs[1] - json.means.mins[1]) * fy;\n        let z = json.means.mins[2] + (json.means.maxs[2] - json.means.mins[2]) * fz;\n        x2 = Math.sign(x2) * (Math.exp(Math.abs(x2)) - 1);\n        y = Math.sign(y) * (Math.exp(Math.abs(y)) - 1);\n        z = Math.sign(z) * (Math.exp(Math.abs(z)) - 1);\n        setPackedSplatCenter(packedArray, i2, x2, y, z);\n      }\n    });\n    const scalesPromise = decodeImageRgba(extraFiles[json.scales.files[0]]).then(\n      (scales) => {\n        for (let i2 = 0; i2 < numSplats; ++i2) {\n          const i4 = i2 * 4;\n          const fx = scales[i4 + 0] / 255;\n          const fy = scales[i4 + 1] / 255;\n          const fz = scales[i4 + 2] / 255;\n          const x2 = json.scales.mins[0] + (json.scales.maxs[0] - json.scales.mins[0]) * fx;\n          const y = json.scales.mins[1] + (json.scales.maxs[1] - json.scales.mins[1]) * fy;\n          const z = json.scales.mins[2] + (json.scales.maxs[2] - json.scales.mins[2]) * fz;\n          setPackedSplatScales(\n            packedArray,\n            i2,\n            Math.exp(x2),\n            Math.exp(y),\n            Math.exp(z)\n          );\n        }\n      }\n    );\n    const quatsPromise = decodeImageRgba(extraFiles[json.quats.files[0]]).then(\n      (quats) => {\n        const SQRT2 = Math.sqrt(2);\n        for (let i2 = 0; i2 < numSplats; ++i2) {\n          const i4 = i2 * 4;\n          const r0 = (quats[i4 + 0] / 255 - 0.5) * SQRT2;\n          const r1 = (quats[i4 + 1] / 255 - 0.5) * SQRT2;\n          const r2 = (quats[i4 + 2] / 255 - 0.5) * SQRT2;\n          const rr = Math.sqrt(Math.max(0, 1 - r0 * r0 - r1 * r1 - r2 * r2));\n          const rOrder = quats[i4 + 3] - 252;\n          const quatX = rOrder === 0 ? r0 : rOrder === 1 ? rr : r1;\n          const quatY = rOrder <= 1 ? r1 : rOrder === 2 ? rr : r2;\n          const quatZ = rOrder <= 2 ? r2 : rr;\n          const quatW = rOrder === 0 ? rr : r0;\n          setPackedSplatQuat(packedArray, i2, quatX, quatY, quatZ, quatW);\n        }\n      }\n    );\n    const sh0Promise = decodeImageRgba(extraFiles[json.sh0.files[0]]).then(\n      (sh0) => {\n        const SH_C02 = 0.28209479177387814;\n        for (let i2 = 0; i2 < numSplats; ++i2) {\n          const i4 = i2 * 4;\n          const f0 = sh0[i4 + 0] / 255;\n          const f1 = sh0[i4 + 1] / 255;\n          const f2 = sh0[i4 + 2] / 255;\n          const f3 = sh0[i4 + 3] / 255;\n          const dc0 = json.sh0.mins[0] + (json.sh0.maxs[0] - json.sh0.mins[0]) * f0;\n          const dc1 = json.sh0.mins[1] + (json.sh0.maxs[1] - json.sh0.mins[1]) * f1;\n          const dc2 = json.sh0.mins[2] + (json.sh0.maxs[2] - json.sh0.mins[2]) * f2;\n          const opa = json.sh0.mins[3] + (json.sh0.maxs[3] - json.sh0.mins[3]) * f3;\n          const r = SH_C02 * dc0 + 0.5;\n          const g = SH_C02 * dc1 + 0.5;\n          const b = SH_C02 * dc2 + 0.5;\n          const a = 1 / (1 + Math.exp(-opa));\n          setPackedSplatRgba(packedArray, i2, r, g, b, a);\n        }\n      }\n    );\n    const promises = [meansPromise, scalesPromise, quatsPromise, sh0Promise];\n    if (json.shN) {\n      const useSH3 = json.shN.shape[1] >= 48 - 3;\n      const useSH2 = json.shN.shape[1] >= 27 - 3;\n      const useSH1 = json.shN.shape[1] >= 12 - 3;\n      if (useSH1) extra.sh1 = new Uint32Array(numSplats * 2);\n      if (useSH2) extra.sh2 = new Uint32Array(numSplats * 4);\n      if (useSH3) extra.sh3 = new Uint32Array(numSplats * 4);\n      const sh1 = new Float32Array(9);\n      const sh2 = new Float32Array(15);\n      const sh3 = new Float32Array(21);\n      const shN = json.shN;\n      const shNPromise = Promise.all([\n        decodeImage(extraFiles[json.shN.files[0]]),\n        decodeImage(extraFiles[json.shN.files[1]])\n      ]).then(([centroids, labels]) => {\n        for (let i2 = 0; i2 < numSplats; ++i2) {\n          const i4 = i2 * 4;\n          const label = labels.rgba[i4 + 0] + (labels.rgba[i4 + 1] << 8);\n          const col = (label & 63) * 15;\n          const row = label >>> 6;\n          const offset = row * centroids.width + col;\n          for (let d = 0; d < 3; ++d) {\n            if (useSH1) {\n              for (let k = 0; k < 3; ++k) {\n                sh1[k * 3 + d] = shN.mins + (shN.maxs - shN.mins) * centroids.rgba[(offset + k) * 4 + d] / 255;\n              }\n            }\n            if (useSH2) {\n              for (let k = 0; k < 5; ++k) {\n                sh2[k * 3 + d] = shN.mins + (shN.maxs - shN.mins) * centroids.rgba[(offset + 3 + k) * 4 + d] / 255;\n              }\n            }\n            if (useSH3) {\n              for (let k = 0; k < 7; ++k) {\n                sh3[k * 3 + d] = shN.mins + (shN.maxs - shN.mins) * centroids.rgba[(offset + 8 + k) * 4 + d] / 255;\n              }\n            }\n          }\n          if (useSH1) encodeSh1Rgb(extra.sh1, i2, sh1);\n          if (useSH2) encodeSh2Rgb(extra.sh2, i2, sh2);\n          if (useSH3) encodeSh3Rgb(extra.sh3, i2, sh3);\n        }\n      });\n      promises.push(shNPromise);\n    }\n    await Promise.all(promises);\n    return { packedArray, numSplats, extra };\n  }\n  let offscreenGlContext = null;\n  async function decodeImage(fileBytes) {\n    if (!offscreenGlContext) {\n      const canvas = new OffscreenCanvas(1, 1);\n      offscreenGlContext = canvas.getContext("webgl2");\n      if (!offscreenGlContext) {\n        throw new Error("Failed to create WebGL2 context");\n      }\n    }\n    const imageBlob = new Blob([fileBytes]);\n    const bitmap = await createImageBitmap(imageBlob, {\n      premultiplyAlpha: "none"\n    });\n    const gl = offscreenGlContext;\n    const texture = gl.createTexture();\n    gl.bindTexture(gl.TEXTURE_2D, texture);\n    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);\n    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\n    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\n    const framebuffer = gl.createFramebuffer();\n    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);\n    gl.framebufferTexture2D(\n      gl.FRAMEBUFFER,\n      gl.COLOR_ATTACHMENT0,\n      gl.TEXTURE_2D,\n      texture,\n      0\n    );\n    const data = new Uint8Array(bitmap.width * bitmap.height * 4);\n    gl.readPixels(\n      0,\n      0,\n      bitmap.width,\n      bitmap.height,\n      gl.RGBA,\n      gl.UNSIGNED_BYTE,\n      data\n    );\n    gl.deleteTexture(texture);\n    gl.deleteFramebuffer(framebuffer);\n    return { rgba: data, width: bitmap.width, height: bitmap.height };\n  }\n  async function decodeImageRgba(fileBytes) {\n    const { rgba } = await decodeImage(fileBytes);\n    return rgba;\n  }\n  async function unpackPcSogsZip(fileBytes) {\n    var _a2;\n    const nameJson = tryPcSogsZip(fileBytes);\n    if (!nameJson) {\n      throw new Error("Invalid PC SOGS zip file");\n    }\n    const { name, json } = nameJson;\n    const lastSlash = name.lastIndexOf("/");\n    const lastBackslash = name.lastIndexOf("\\\\");\n    const prefix = name.slice(0, Math.max(lastSlash, lastBackslash) + 1);\n    const fileMap = /* @__PURE__ */ new Map();\n    const refFiles = [\n      ...json.means.files,\n      ...json.scales.files,\n      ...json.quats.files,\n      ...json.sh0.files,\n      ...((_a2 = json.shN) == null ? void 0 : _a2.files) ?? []\n    ];\n    for (const file of refFiles) {\n      fileMap.set(prefix + file, file);\n    }\n    const unzipped = await new Promise(\n      (resolve, reject) => {\n        unzip(\n          fileBytes,\n          {\n            filter: ({ name: name2 }) => {\n              return fileMap.has(name2);\n            }\n          },\n          (err2, files) => {\n            if (err2) {\n              reject(err2);\n            } else {\n              resolve(files);\n            }\n          }\n        );\n      }\n    );\n    const extraFiles = {};\n    for (const [full, name2] of fileMap.entries()) {\n      extraFiles[name2] = unzipped[full];\n    }\n    return await unpackPcSogs(json, extraFiles);\n  }\n  class SpzReader {\n    constructor({ fileBytes }) {\n      this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;\n      this.reader = new GunzipReader({ fileBytes: this.fileBytes });\n      const header = new DataView(this.reader.read(16).buffer);\n      if (header.getUint32(0, true) !== 1347635022) {\n        throw new Error("Invalid SPZ file");\n      }\n      this.version = header.getUint32(4, true);\n      if (this.version < 1 || this.version > 2) {\n        throw new Error(`Unsupported SPZ version: ${this.version}`);\n      }\n      this.numSplats = header.getUint32(8, true);\n      this.shDegree = header.getUint8(12);\n      this.fractionalBits = header.getUint8(13);\n      this.flags = header.getUint8(14);\n      this.flagAntiAlias = (this.flags & 1) !== 0;\n      this.reserved = header.getUint8(15);\n      this.parsed = false;\n    }\n    parseSplats(centerCallback, alphaCallback, rgbCallback, scalesCallback, quatCallback, shCallback) {\n      if (this.parsed) {\n        throw new Error("SPZ file already parsed");\n      }\n      this.parsed = true;\n      if (this.version === 1) {\n        const centerBytes = this.reader.read(this.numSplats * 3 * 2);\n        const centerUint16 = new Uint16Array(centerBytes.buffer);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i3 = i2 * 3;\n          const x2 = fromHalf(centerUint16[i3]);\n          const y = fromHalf(centerUint16[i3 + 1]);\n          const z = fromHalf(centerUint16[i3 + 2]);\n          centerCallback == null ? void 0 : centerCallback(i2, x2, y, z);\n        }\n      } else if (this.version === 2) {\n        const fixed = 1 << this.fractionalBits;\n        const centerBytes = this.reader.read(this.numSplats * 3 * 3);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i9 = i2 * 9;\n          const x2 = ((centerBytes[i9 + 2] << 24 | centerBytes[i9 + 1] << 16 | centerBytes[i9] << 8) >> 8) / fixed;\n          const y = ((centerBytes[i9 + 5] << 24 | centerBytes[i9 + 4] << 16 | centerBytes[i9 + 3] << 8) >> 8) / fixed;\n          const z = ((centerBytes[i9 + 8] << 24 | centerBytes[i9 + 7] << 16 | centerBytes[i9 + 6] << 8) >> 8) / fixed;\n          centerCallback == null ? void 0 : centerCallback(i2, x2, y, z);\n        }\n      } else {\n        throw new Error("Unreachable");\n      }\n      {\n        const bytes = this.reader.read(this.numSplats);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          alphaCallback == null ? void 0 : alphaCallback(i2, bytes[i2] / 255);\n        }\n      }\n      {\n        const rgbBytes = this.reader.read(this.numSplats * 3);\n        const scale = SH_C0 / 0.15;\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i3 = i2 * 3;\n          const r = (rgbBytes[i3] / 255 - 0.5) * scale + 0.5;\n          const g = (rgbBytes[i3 + 1] / 255 - 0.5) * scale + 0.5;\n          const b = (rgbBytes[i3 + 2] / 255 - 0.5) * scale + 0.5;\n          rgbCallback == null ? void 0 : rgbCallback(i2, r, g, b);\n        }\n      }\n      {\n        const scalesBytes = this.reader.read(this.numSplats * 3);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i3 = i2 * 3;\n          const scaleX = Math.exp(scalesBytes[i3] / 16 - 10);\n          const scaleY = Math.exp(scalesBytes[i3 + 1] / 16 - 10);\n          const scaleZ = Math.exp(scalesBytes[i3 + 2] / 16 - 10);\n          scalesCallback == null ? void 0 : scalesCallback(i2, scaleX, scaleY, scaleZ);\n        }\n      }\n      {\n        const quatBytes = this.reader.read(this.numSplats * 3);\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          const i3 = i2 * 3;\n          const quatX = quatBytes[i3] / 127.5 - 1;\n          const quatY = quatBytes[i3 + 1] / 127.5 - 1;\n          const quatZ = quatBytes[i3 + 2] / 127.5 - 1;\n          const quatW = Math.sqrt(\n            Math.max(0, 1 - quatX * quatX - quatY * quatY - quatZ * quatZ)\n          );\n          quatCallback == null ? void 0 : quatCallback(i2, quatX, quatY, quatZ, quatW);\n        }\n      }\n      if (shCallback && this.shDegree >= 1) {\n        const sh1 = new Float32Array(3 * 3);\n        const sh2 = this.shDegree >= 2 ? new Float32Array(5 * 3) : void 0;\n        const sh3 = this.shDegree >= 3 ? new Float32Array(7 * 3) : void 0;\n        const shBytes = this.reader.read(\n          this.numSplats * SH_DEGREE_TO_VECS[this.shDegree] * 3\n        );\n        let offset = 0;\n        for (let i2 = 0; i2 < this.numSplats; i2++) {\n          for (let j = 0; j < 9; ++j) {\n            sh1[j] = (shBytes[offset + j] - 128) / 128;\n          }\n          offset += 9;\n          if (sh2) {\n            for (let j = 0; j < 15; ++j) {\n              sh2[j] = (shBytes[offset + j] - 128) / 128;\n            }\n            offset += 15;\n          }\n          if (sh3) {\n            for (let j = 0; j < 21; ++j) {\n              sh3[j] = (shBytes[offset + j] - 128) / 128;\n            }\n            offset += 21;\n          }\n          shCallback == null ? void 0 : shCallback(i2, sh1, sh2, sh3);\n        }\n      }\n    }\n  }\n  const SH_DEGREE_TO_VECS = { 1: 3, 2: 8, 3: 15 };\n  const SH_C0 = 0.28209479177387814;\n  const SPZ_MAGIC = 1347635022;\n  const SPZ_VERSION = 2;\n  const FLAG_ANTIALIASED = 1;\n  class SpzWriter {\n    constructor({\n      numSplats,\n      shDegree,\n      fractionalBits = 12,\n      flagAntiAlias = true\n    }) {\n      this.clippedCount = 0;\n      const splatSize = 9 + 1 + 3 + 3 + 3 + (shDegree >= 1 ? 9 : 0) + (shDegree >= 2 ? 15 : 0) + (shDegree >= 3 ? 21 : 0);\n      const bufferSize = 16 + numSplats * splatSize;\n      this.buffer = new ArrayBuffer(bufferSize);\n      this.view = new DataView(this.buffer);\n      this.view.setUint32(0, SPZ_MAGIC, true);\n      this.view.setUint32(4, SPZ_VERSION, true);\n      this.view.setUint32(8, numSplats, true);\n      this.view.setUint8(12, shDegree);\n      this.view.setUint8(13, fractionalBits);\n      this.view.setUint8(14, flagAntiAlias ? FLAG_ANTIALIASED : 0);\n      this.view.setUint8(15, 0);\n      this.numSplats = numSplats;\n      this.shDegree = shDegree;\n      this.fractionalBits = fractionalBits;\n      this.fraction = 1 << fractionalBits;\n      this.flagAntiAlias = flagAntiAlias;\n    }\n    setCenter(index, x2, y, z) {\n      const xRounded = Math.round(x2 * this.fraction);\n      const xInt = Math.max(-8388607, Math.min(8388607, xRounded));\n      const yRounded = Math.round(y * this.fraction);\n      const yInt = Math.max(-8388607, Math.min(8388607, yRounded));\n      const zRounded = Math.round(z * this.fraction);\n      const zInt = Math.max(-8388607, Math.min(8388607, zRounded));\n      const clipped = xRounded !== xInt || yRounded !== yInt || zRounded !== zInt;\n      if (clipped) {\n        this.clippedCount += 1;\n      }\n      const i9 = index * 9;\n      const base = 16 + i9;\n      this.view.setUint8(base, xInt & 255);\n      this.view.setUint8(base + 1, xInt >> 8 & 255);\n      this.view.setUint8(base + 2, xInt >> 16 & 255);\n      this.view.setUint8(base + 3, yInt & 255);\n      this.view.setUint8(base + 4, yInt >> 8 & 255);\n      this.view.setUint8(base + 5, yInt >> 16 & 255);\n      this.view.setUint8(base + 6, zInt & 255);\n      this.view.setUint8(base + 7, zInt >> 8 & 255);\n      this.view.setUint8(base + 8, zInt >> 16 & 255);\n    }\n    setAlpha(index, alpha) {\n      const base = 16 + this.numSplats * 9 + index;\n      this.view.setUint8(\n        base,\n        Math.max(0, Math.min(255, Math.round(alpha * 255)))\n      );\n    }\n    static scaleRgb(r) {\n      const v = ((r - 0.5) / (SH_C0 / 0.15) + 0.5) * 255;\n      return Math.max(0, Math.min(255, Math.round(v)));\n    }\n    setRgb(index, r, g, b) {\n      const base = 16 + this.numSplats * 10 + index * 3;\n      this.view.setUint8(base, SpzWriter.scaleRgb(r));\n      this.view.setUint8(base + 1, SpzWriter.scaleRgb(g));\n      this.view.setUint8(base + 2, SpzWriter.scaleRgb(b));\n    }\n    setScale(index, scaleX, scaleY, scaleZ) {\n      const base = 16 + this.numSplats * 13 + index * 3;\n      this.view.setUint8(\n        base,\n        Math.max(0, Math.min(255, Math.round((Math.log(scaleX) + 10) * 16)))\n      );\n      this.view.setUint8(\n        base + 1,\n        Math.max(0, Math.min(255, Math.round((Math.log(scaleY) + 10) * 16)))\n      );\n      this.view.setUint8(\n        base + 2,\n        Math.max(0, Math.min(255, Math.round((Math.log(scaleZ) + 10) * 16)))\n      );\n    }\n    setQuat(index, quatX, quatY, quatZ, quatW) {\n      const base = 16 + this.numSplats * 16 + index * 3;\n      const quatNeg = quatW < 0;\n      this.view.setUint8(\n        base,\n        Math.max(\n          0,\n          Math.min(255, Math.round(((quatNeg ? -quatX : quatX) + 1) * 127.5))\n        )\n      );\n      this.view.setUint8(\n        base + 1,\n        Math.max(\n          0,\n          Math.min(255, Math.round(((quatNeg ? -quatY : quatY) + 1) * 127.5))\n        )\n      );\n      this.view.setUint8(\n        base + 2,\n        Math.max(\n          0,\n          Math.min(255, Math.round(((quatNeg ? -quatZ : quatZ) + 1) * 127.5))\n        )\n      );\n    }\n    static quantizeSh(sh, bits2) {\n      const value = Math.round(sh * 128) + 128;\n      const bucketSize = 1 << 8 - bits2;\n      const quantized = Math.floor((value + bucketSize / 2) / bucketSize) * bucketSize;\n      return Math.max(0, Math.min(255, quantized));\n    }\n    setSh(index, sh1, sh2, sh3) {\n      const shVecs = SH_DEGREE_TO_VECS[this.shDegree] || 0;\n      const base1 = 16 + this.numSplats * 19 + index * shVecs * 3;\n      for (let j = 0; j < 9; ++j) {\n        this.view.setUint8(base1 + j, SpzWriter.quantizeSh(sh1[j], 5));\n      }\n      if (sh2) {\n        const base2 = base1 + 9;\n        for (let j = 0; j < 15; ++j) {\n          this.view.setUint8(base2 + j, SpzWriter.quantizeSh(sh2[j], 4));\n        }\n        if (sh3) {\n          const base3 = base2 + 15;\n          for (let j = 0; j < 21; ++j) {\n            this.view.setUint8(base3 + j, SpzWriter.quantizeSh(sh3[j], 4));\n          }\n        }\n      }\n    }\n    async finalize() {\n      const input = new Uint8Array(this.buffer);\n      const stream = new ReadableStream({\n        async start(controller) {\n          controller.enqueue(input);\n          controller.close();\n        }\n      });\n      const compressed = stream.pipeThrough(new CompressionStream("gzip"));\n      const response = new Response(compressed);\n      const buffer = await response.arrayBuffer();\n      console.log(\n        "Compressed",\n        input.length,\n        "bytes to",\n        buffer.byteLength,\n        "bytes"\n      );\n      return new Uint8Array(buffer);\n    }\n  }\n  async function transcodeSpz(input) {\n    var _a2, _b2, _c;\n    const splats = new SplatData();\n    const {\n      inputs,\n      clipXyz,\n      maxSh,\n      fractionalBits = 12,\n      opacityThreshold\n    } = input;\n    for (const input2 of inputs) {\n      let transformPos = function(pos) {\n        pos.multiplyScalar(scale);\n        pos.applyQuaternion(quaternion);\n        pos.add(translate);\n        return pos;\n      }, transformScales = function(scales) {\n        scales.multiplyScalar(scale);\n        return scales;\n      }, transformQuaternion = function(quat) {\n        quat.premultiply(quaternion);\n        return quat;\n      }, withinClip = function(p) {\n        return !clip || clip.containsPoint(p);\n      }, withinOpacity = function(opacity) {\n        return opacityThreshold !== void 0 ? opacity >= opacityThreshold : true;\n      };\n      const scale = ((_a2 = input2.transform) == null ? void 0 : _a2.scale) ?? 1;\n      const quaternion = new Quaternion().fromArray(\n        ((_b2 = input2.transform) == null ? void 0 : _b2.quaternion) ?? [0, 0, 0, 1]\n      );\n      const translate = new Vector3().fromArray(\n        ((_c = input2.transform) == null ? void 0 : _c.translate) ?? [0, 0, 0]\n      );\n      const clip = clipXyz ? new Box3(\n        new Vector3().fromArray(clipXyz.min),\n        new Vector3().fromArray(clipXyz.max)\n      ) : void 0;\n      let fileType = input2.fileType;\n      if (!fileType) {\n        fileType = getSplatFileType(input2.fileBytes);\n        if (!fileType && input2.pathOrUrl) {\n          fileType = getSplatFileTypeFromPath(input2.pathOrUrl);\n        }\n      }\n      switch (fileType) {\n        case SplatFileType.PLY: {\n          const ply = new PlyReader({ fileBytes: input2.fileBytes });\n          await ply.parseHeader();\n          let lastIndex = null;\n          ply.parseSplats(\n            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n              const center = transformPos(new Vector3(x2, y, z));\n              if (withinClip(center) && withinOpacity(opacity)) {\n                lastIndex = splats.pushSplat();\n                splats.setCenter(lastIndex, center.x, center.y, center.z);\n                const scales = transformScales(\n                  new Vector3(scaleX, scaleY, scaleZ)\n                );\n                splats.setScale(lastIndex, scales.x, scales.y, scales.z);\n                const quaternion2 = transformQuaternion(\n                  new Quaternion(quatX, quatY, quatZ, quatW)\n                );\n                splats.setQuaternion(\n                  lastIndex,\n                  quaternion2.x,\n                  quaternion2.y,\n                  quaternion2.z,\n                  quaternion2.w\n                );\n                splats.setOpacity(lastIndex, opacity);\n                splats.setColor(lastIndex, r, g, b);\n              } else {\n                lastIndex = null;\n              }\n            },\n            (index, sh1, sh2, sh3) => {\n              if (sh1 && lastIndex !== null) {\n                splats.setSh1(lastIndex, sh1);\n              }\n              if (sh2 && lastIndex !== null) {\n                splats.setSh2(lastIndex, sh2);\n              }\n              if (sh3 && lastIndex !== null) {\n                splats.setSh3(lastIndex, sh3);\n              }\n            }\n          );\n          break;\n        }\n        case SplatFileType.SPZ: {\n          const spz2 = new SpzReader({ fileBytes: input2.fileBytes });\n          const mapping = new Int32Array(spz2.numSplats);\n          mapping.fill(-1);\n          const centers = new Float32Array(spz2.numSplats * 3);\n          const center = new Vector3();\n          spz2.parseSplats(\n            (index, x2, y, z) => {\n              const center2 = transformPos(new Vector3(x2, y, z));\n              centers[index * 3] = center2.x;\n              centers[index * 3 + 1] = center2.y;\n              centers[index * 3 + 2] = center2.z;\n            },\n            (index, alpha) => {\n              center.fromArray(centers, index * 3);\n              if (withinClip(center) && withinOpacity(alpha)) {\n                mapping[index] = splats.pushSplat();\n                splats.setCenter(mapping[index], center.x, center.y, center.z);\n                splats.setOpacity(mapping[index], alpha);\n              }\n            },\n            (index, r, g, b) => {\n              if (mapping[index] >= 0) {\n                splats.setColor(mapping[index], r, g, b);\n              }\n            },\n            (index, scaleX, scaleY, scaleZ) => {\n              if (mapping[index] >= 0) {\n                const scales = transformScales(\n                  new Vector3(scaleX, scaleY, scaleZ)\n                );\n                splats.setScale(mapping[index], scales.x, scales.y, scales.z);\n              }\n            },\n            (index, quatX, quatY, quatZ, quatW) => {\n              if (mapping[index] >= 0) {\n                const quaternion2 = transformQuaternion(\n                  new Quaternion(quatX, quatY, quatZ, quatW)\n                );\n                splats.setQuaternion(\n                  mapping[index],\n                  quaternion2.x,\n                  quaternion2.y,\n                  quaternion2.z,\n                  quaternion2.w\n                );\n              }\n            },\n            (index, sh1, sh2, sh3) => {\n              if (mapping[index] >= 0) {\n                splats.setSh1(mapping[index], sh1);\n                if (sh2) {\n                  splats.setSh2(mapping[index], sh2);\n                }\n                if (sh3) {\n                  splats.setSh3(mapping[index], sh3);\n                }\n              }\n            }\n          );\n          break;\n        }\n        case SplatFileType.SPLAT:\n          decodeAntiSplat(\n            input2.fileBytes,\n            (numSplats) => {\n            },\n            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n              const center = transformPos(new Vector3(x2, y, z));\n              if (withinClip(center) && withinOpacity(opacity)) {\n                const index2 = splats.pushSplat();\n                splats.setCenter(index2, center.x, center.y, center.z);\n                const scales = transformScales(\n                  new Vector3(scaleX, scaleY, scaleZ)\n                );\n                splats.setScale(index2, scales.x, scales.y, scales.z);\n                const quaternion2 = transformQuaternion(\n                  new Quaternion(quatX, quatY, quatZ, quatW)\n                );\n                splats.setQuaternion(\n                  index2,\n                  quaternion2.x,\n                  quaternion2.y,\n                  quaternion2.z,\n                  quaternion2.w\n                );\n                splats.setOpacity(index2, opacity);\n                splats.setColor(index2, r, g, b);\n              }\n            }\n          );\n          break;\n        case SplatFileType.KSPLAT: {\n          let lastIndex = null;\n          decodeKsplat(\n            input2.fileBytes,\n            (numSplats) => {\n            },\n            (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n              const center = transformPos(new Vector3(x2, y, z));\n              if (withinClip(center) && withinOpacity(opacity)) {\n                lastIndex = splats.pushSplat();\n                splats.setCenter(lastIndex, center.x, center.y, center.z);\n                const scales = transformScales(\n                  new Vector3(scaleX, scaleY, scaleZ)\n                );\n                splats.setScale(lastIndex, scales.x, scales.y, scales.z);\n                const quaternion2 = transformQuaternion(\n                  new Quaternion(quatX, quatY, quatZ, quatW)\n                );\n                splats.setQuaternion(\n                  lastIndex,\n                  quaternion2.x,\n                  quaternion2.y,\n                  quaternion2.z,\n                  quaternion2.w\n                );\n                splats.setOpacity(lastIndex, opacity);\n                splats.setColor(lastIndex, r, g, b);\n              } else {\n                lastIndex = null;\n              }\n            },\n            (index, sh1, sh2, sh3) => {\n              if (lastIndex !== null) {\n                splats.setSh1(lastIndex, sh1);\n                if (sh2) {\n                  splats.setSh2(lastIndex, sh2);\n                }\n                if (sh3) {\n                  splats.setSh3(lastIndex, sh3);\n                }\n              }\n            }\n          );\n          break;\n        }\n        default:\n          throw new Error(`transcodeSpz not implemented for ${fileType}`);\n      }\n    }\n    const shDegree = Math.min(\n      maxSh ?? 3,\n      splats.sh3 ? 3 : splats.sh2 ? 2 : splats.sh1 ? 1 : 0\n    );\n    const spz = new SpzWriter({\n      numSplats: splats.numSplats,\n      shDegree,\n      fractionalBits,\n      flagAntiAlias: true\n    });\n    for (let i2 = 0; i2 < splats.numSplats; ++i2) {\n      const i3 = i2 * 3;\n      const i4 = i2 * 4;\n      spz.setCenter(\n        i2,\n        splats.centers[i3],\n        splats.centers[i3 + 1],\n        splats.centers[i3 + 2]\n      );\n      spz.setScale(\n        i2,\n        splats.scales[i3],\n        splats.scales[i3 + 1],\n        splats.scales[i3 + 2]\n      );\n      spz.setQuat(\n        i2,\n        splats.quaternions[i4],\n        splats.quaternions[i4 + 1],\n        splats.quaternions[i4 + 2],\n        splats.quaternions[i4 + 3]\n      );\n      spz.setAlpha(i2, splats.opacities[i2]);\n      spz.setRgb(\n        i2,\n        splats.colors[i3],\n        splats.colors[i3 + 1],\n        splats.colors[i3 + 2]\n      );\n      if (splats.sh1 && shDegree >= 1) {\n        spz.setSh(\n          i2,\n          splats.sh1.slice(i2 * 9, (i2 + 1) * 9),\n          shDegree >= 2 && splats.sh2 ? splats.sh2.slice(i2 * 15, (i2 + 1) * 15) : void 0,\n          shDegree >= 3 && splats.sh3 ? splats.sh3.slice(i2 * 21, (i2 + 1) * 21) : void 0\n        );\n      }\n    }\n    const spzBytes = await spz.finalize();\n    return { fileBytes: spzBytes, clippedCount: spz.clippedCount };\n  }\n  async function onMessage(event) {\n    const { name, args, id } = event.data;\n    let result = void 0;\n    let error = void 0;\n    try {\n      switch (name) {\n        case "unpackPly": {\n          const { packedArray, fileBytes } = args;\n          const decoded = await unpackPly({ packedArray, fileBytes });\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case "decodeSpz": {\n          const { fileBytes } = args;\n          const decoded = unpackSpz(fileBytes);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case "decodeAntiSplat": {\n          const { fileBytes } = args;\n          const decoded = unpackAntiSplat(fileBytes);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray\n          };\n          break;\n        }\n        case "decodeKsplat": {\n          const { fileBytes } = args;\n          const decoded = unpackKsplat(fileBytes);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case "decodePcSogs": {\n          const { fileBytes, extraFiles } = args;\n          const json = JSON.parse(\n            new TextDecoder().decode(fileBytes)\n          );\n          const decoded = await unpackPcSogs(json, extraFiles);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case "decodePcSogsZip": {\n          const { fileBytes } = args;\n          const decoded = await unpackPcSogsZip(fileBytes);\n          result = {\n            id,\n            numSplats: decoded.numSplats,\n            packedArray: decoded.packedArray,\n            extra: decoded.extra\n          };\n          break;\n        }\n        case "sortSplats": {\n          const { totalSplats, readback, ordering } = args;\n          result = {\n            id,\n            readback,\n            ...sortSplats({ totalSplats, readback, ordering })\n          };\n          break;\n        }\n        case "sortDoubleSplats": {\n          const { numSplats, readback, ordering } = args;\n          result = {\n            id,\n            readback,\n            ordering\n          };\n          {\n            result = {\n              id,\n              readback,\n              ordering,\n              activeSplats: sort_splats(numSplats, readback, ordering)\n            };\n          }\n          break;\n        }\n        case "transcodeSpz": {\n          const input = args;\n          const spzBytes = await transcodeSpz(input);\n          result = {\n            id,\n            fileBytes: spzBytes,\n            input\n          };\n          break;\n        }\n        default: {\n          throw new Error(`Unknown name: ${name}`);\n        }\n      }\n    } catch (e) {\n      error = e;\n    }\n    self.postMessage(\n      { id, result, error },\n      { transfer: getArrayBuffers(result) }\n    );\n  }\n  async function unpackPly({\n    packedArray,\n    fileBytes\n  }) {\n    const ply = new PlyReader({ fileBytes });\n    await ply.parseHeader();\n    const numSplats = ply.numSplats;\n    const extra = {};\n    ply.parseSplats(\n      (index, x2, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {\n        setPackedSplat(\n          packedArray,\n          index,\n          x2,\n          y,\n          z,\n          scaleX,\n          scaleY,\n          scaleZ,\n          quatX,\n          quatY,\n          quatZ,\n          quatW,\n          opacity,\n          r,\n          g,\n          b\n        );\n      },\n      (index, sh1, sh2, sh3) => {\n        if (sh1) {\n          if (!extra.sh1) {\n            extra.sh1 = new Uint32Array(numSplats * 2);\n          }\n          encodeSh1Rgb(extra.sh1, index, sh1);\n        }\n        if (sh2) {\n          if (!extra.sh2) {\n            extra.sh2 = new Uint32Array(numSplats * 4);\n          }\n          encodeSh2Rgb(extra.sh2, index, sh2);\n        }\n        if (sh3) {\n          if (!extra.sh3) {\n            extra.sh3 = new Uint32Array(numSplats * 4);\n          }\n          encodeSh3Rgb(extra.sh3, index, sh3);\n        }\n      }\n    );\n    return { packedArray, numSplats, extra };\n  }\n  function unpackSpz(fileBytes) {\n    const spz = new SpzReader({ fileBytes });\n    const numSplats = spz.numSplats;\n    const maxSplats = computeMaxSplats(numSplats);\n    const packedArray = new Uint32Array(maxSplats * 4);\n    const extra = {};\n    spz.parseSplats(\n      (index, x2, y, z) => {\n        setPackedSplatCenter(packedArray, index, x2, y, z);\n      },\n      (index, alpha) => {\n        setPackedSplatOpacity(packedArray, index, alpha);\n      },\n      (index, r, g, b) => {\n        setPackedSplatRgb(packedArray, index, r, g, b);\n      },\n      (index, scaleX, scaleY, scaleZ) => {\n        setPackedSplatScales(packedArray, index, scaleX, scaleY, scaleZ);\n      },\n      (index, quatX, quatY, quatZ, quatW) => {\n        setPackedSplatQuat(packedArray, index, quatX, quatY, quatZ, quatW);\n      },\n      (index, sh1, sh2, sh3) => {\n        if (sh1) {\n          if (!extra.sh1) {\n            extra.sh1 = new Uint32Array(numSplats * 2);\n          }\n          encodeSh1Rgb(extra.sh1, index, sh1);\n        }\n        if (sh2) {\n          if (!extra.sh2) {\n            extra.sh2 = new Uint32Array(numSplats * 4);\n          }\n          encodeSh2Rgb(extra.sh2, index, sh2);\n        }\n        if (sh3) {\n          if (!extra.sh3) {\n            extra.sh3 = new Uint32Array(numSplats * 4);\n          }\n          encodeSh3Rgb(extra.sh3, index, sh3);\n        }\n      }\n    );\n    return { packedArray, numSplats, extra };\n  }\n  const DEPTH_INFINITY = 31744;\n  const DEPTH_SIZE = DEPTH_INFINITY + 1;\n  let depthArray = null;\n  function sortSplats({\n    totalSplats,\n    readback,\n    ordering\n  }) {\n    if (!depthArray) {\n      depthArray = new Uint32Array(DEPTH_SIZE);\n    }\n    depthArray.fill(0);\n    const readbackUint32 = readback.map((layer) => new Uint32Array(layer.buffer));\n    const layerSize = readbackUint32[0].length;\n    const numLayers = Math.ceil(totalSplats / layerSize);\n    let layerBase = 0;\n    for (let layer = 0; layer < numLayers; ++layer) {\n      const readbackLayer = readbackUint32[layer];\n      const layerSplats = Math.min(readbackLayer.length, totalSplats - layerBase);\n      for (let i2 = 0; i2 < layerSplats; ++i2) {\n        const pri = readbackLayer[i2] & 32767;\n        if (pri < DEPTH_INFINITY) {\n          depthArray[pri] += 1;\n        }\n      }\n      layerBase += layerSplats;\n    }\n    let activeSplats = 0;\n    for (let j = 0; j < DEPTH_SIZE; ++j) {\n      const nextIndex = activeSplats + depthArray[j];\n      depthArray[j] = activeSplats;\n      activeSplats = nextIndex;\n    }\n    layerBase = 0;\n    for (let layer = 0; layer < numLayers; ++layer) {\n      const readbackLayer = readbackUint32[layer];\n      const layerSplats = Math.min(readbackLayer.length, totalSplats - layerBase);\n      for (let i2 = 0; i2 < layerSplats; ++i2) {\n        const pri = readbackLayer[i2] & 32767;\n        if (pri < DEPTH_INFINITY) {\n          ordering[depthArray[pri]] = layerBase + i2;\n          depthArray[pri] += 1;\n        }\n      }\n      layerBase += layerSplats;\n    }\n    if (depthArray[DEPTH_SIZE - 1] !== activeSplats) {\n      throw new Error(\n        `Expected ${activeSplats} active splats but got ${depthArray[DEPTH_SIZE - 1]}`\n      );\n    }\n    return { activeSplats, ordering };\n  }\n  const messageBuffer = [];\n  function bufferMessage(event) {\n    messageBuffer.push(event);\n  }\n  async function initialize() {\n    self.addEventListener("message", bufferMessage);\n    await __wbg_init();\n    self.removeEventListener("message", bufferMessage);\n    self.addEventListener("message", onMessage);\n    for (const event of messageBuffer) {\n      onMessage(event);\n    }\n    messageBuffer.length = 0;\n  }\n  initialize().catch(console.error);\n})();\n//# sourceMappingURL=worker-aN8n0Tv8.js.map\n';
const blob = typeof self !== "undefined" && self.Blob && new Blob([jsContent], { type: "text/javascript;charset=utf-8" });
function WorkerWrapper(options) {
  let objURL;
  try {
    objURL = blob && (self.URL || self.webkitURL).createObjectURL(blob);
    if (!objURL) throw "";
    const worker = new Worker(objURL, {
      name: options == null ? void 0 : options.name
    });
    worker.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(objURL);
    });
    return worker;
  } catch (e) {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(jsContent),
      {
        name: options == null ? void 0 : options.name
      }
    );
  } finally {
    objURL && (self.URL || self.webkitURL).revokeObjectURL(objURL);
  }
}
class SplatWorker {
  constructor() {
    this.messages = {};
    this.messageIdNext = 0;
    this.worker = new WorkerWrapper();
    this.worker.onmessage = (event) => this.onMessage(event);
  }
  makeMessageId() {
    return ++this.messageIdNext;
  }
  makeMessagePromiseId() {
    const id = this.makeMessageId();
    const promise = new Promise((resolve, reject) => {
      this.messages[id] = { resolve, reject };
    });
    return { id, promise };
  }
  onMessage(event) {
    const { id, result, error } = event.data;
    const handler = this.messages[id];
    if (handler) {
      delete this.messages[id];
      if (error) {
        handler.reject(error);
      } else {
        handler.resolve(result);
      }
    }
  }
  // Invoke an RPC on the worker with the given name and arguments.
  // The normal usage of a worker is to run one activity at a time,
  // but this function allows for concurrent calls, tagging each request
  // with a unique message Id and awaiting a response to that same Id.
  // The method will automatically transfer any ArrayBuffers in the
  // arguments to the worker. If you'd like to transfer a copy of a
  // buffer then you must clone it before passing to this function.
  async call(name, args) {
    const { id, promise } = this.makeMessagePromiseId();
    this.worker.postMessage(
      { name, args, id },
      { transfer: getArrayBuffers(args) }
    );
    return promise;
  }
}
let maxWorkers = 4;
let numWorkers = 0;
const freeWorkers = [];
const workerQueue = [];
async function allocWorker() {
  const worker = freeWorkers.shift();
  if (worker) {
    return worker;
  }
  if (numWorkers < maxWorkers) {
    const worker2 = new SplatWorker();
    numWorkers += 1;
    return worker2;
  }
  return new Promise((resolve) => {
    workerQueue.push(resolve);
  });
}
function freeWorker(worker) {
  if (numWorkers > maxWorkers) {
    numWorkers -= 1;
    return;
  }
  const waiter = workerQueue.shift();
  if (waiter) {
    waiter(worker);
    return;
  }
  freeWorkers.push(worker);
}
async function withWorker(callback) {
  const worker = await allocWorker();
  try {
    return await callback(worker);
  } finally {
    freeWorker(worker);
  }
}
class SplatLoader extends Loader {
  constructor(manager) {
    super(manager);
    this.fileLoader = new FileLoader(manager);
  }
  load(url, onLoad, onProgress, onError) {
    const resolvedURL = this.manager.resolveURL(
      (this.path ?? "") + (url ?? "")
    );
    const headers = new Headers(this.requestHeader);
    const credentials = this.withCredentials ? "include" : "same-origin";
    const request = new Request(resolvedURL, { headers, credentials });
    let fileType = this.fileType;
    this.manager.itemStart(resolvedURL);
    fetchWithProgress(request, onProgress).then(async (input) => {
      const progresses = [
        new ProgressEvent("progress", {
          lengthComputable: true,
          loaded: input.byteLength,
          total: input.byteLength
        })
      ];
      function updateProgresses() {
        if (onProgress) {
          const lengthComputable = progresses.every((p) => {
            return p.lengthComputable || p.loaded === 0 && p.total === 0;
          });
          const loaded = progresses.reduce((sum, p) => sum + p.loaded, 0);
          const total = progresses.reduce((sum, p) => sum + p.total, 0);
          onProgress(
            new ProgressEvent("progress", {
              lengthComputable,
              loaded,
              total
            })
          );
        }
      }
      const extraFiles = {};
      const promises = [];
      const pcSogsJson = tryPcSogs(input);
      if (fileType === "pcsogs") {
        if (pcSogsJson === void 0) {
          throw new Error("Invalid PC SOGS file");
        }
      }
      if (pcSogsJson !== void 0) {
        fileType = "pcsogs";
        for (const key of ["means", "scales", "quats", "sh0", "shN"]) {
          const prop = pcSogsJson[key];
          if (prop) {
            for (const file of prop.files) {
              const fileUrl = new URL(file, resolvedURL).toString();
              const progressIndex = progresses.length;
              progresses.push(new ProgressEvent("progress"));
              this.manager.itemStart(fileUrl);
              const request2 = new Request(fileUrl, { headers, credentials });
              const promise = fetchWithProgress(request2, (progress) => {
                progresses[progressIndex] = progress;
                updateProgresses();
              }).then((data) => {
                extraFiles[file] = data;
              }).catch((error) => {
                this.manager.itemError(fileUrl);
                throw error;
              }).finally(() => {
                this.manager.itemEnd(fileUrl);
              });
              promises.push(promise);
            }
          }
        }
      }
      await Promise.all(promises);
      if (onLoad) {
        const decoded = await unpackSplats({
          input,
          extraFiles,
          fileType,
          pathOrUrl: resolvedURL
        });
        if (this.packedSplats) {
          this.packedSplats.initialize(decoded);
          onLoad(this.packedSplats);
        } else {
          onLoad(new PackedSplats(decoded));
        }
      }
    }).catch((error) => {
      this.manager.itemError(resolvedURL);
      onError == null ? void 0 : onError(error);
    }).finally(() => {
      this.manager.itemEnd(resolvedURL);
    });
  }
  async loadAsync(url, onProgress) {
    return new Promise((resolve, reject) => {
      this.load(
        url,
        (decoded) => {
          resolve(decoded);
        },
        onProgress,
        reject
      );
    });
  }
  parse(packedSplats) {
    return new SplatMesh({ packedSplats });
  }
}
async function fetchWithProgress(request, onProgress) {
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(
      `${response.status} "${response.statusText}" fetching URL: ${request.url}`
    );
  }
  if (!response.body) {
    throw new Error(`Response body is null for URL: ${request.url}`);
  }
  const reader = response.body.getReader();
  const contentLength = Number.parseInt(
    response.headers.get("Content-Length") || "0"
  );
  const total = Number.isNaN(contentLength) ? 0 : contentLength;
  let loaded = 0;
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
    loaded += value.length;
    if (onProgress) {
      onProgress(
        new ProgressEvent("progress", {
          lengthComputable: total !== 0,
          loaded,
          total
        })
      );
    }
  }
  const bytes = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return bytes.buffer;
}
var SplatFileType = /* @__PURE__ */ ((SplatFileType2) => {
  SplatFileType2["PLY"] = "ply";
  SplatFileType2["SPZ"] = "spz";
  SplatFileType2["SPLAT"] = "splat";
  SplatFileType2["KSPLAT"] = "ksplat";
  SplatFileType2["PCSOGS"] = "pcsogs";
  SplatFileType2["PCSOGSZIP"] = "pcsogszip";
  return SplatFileType2;
})(SplatFileType || {});
function getSplatFileType(fileBytes) {
  const view = new DataView(fileBytes.buffer);
  if ((view.getUint32(0, true) & 16777215) === 7957616) {
    return "ply";
  }
  if ((view.getUint32(0, true) & 16777215) === 559903) {
    const header = decompressPartialGzip(fileBytes, 4);
    const gView = new DataView(header.buffer);
    if (gView.getUint32(0, true) === 1347635022) {
      return "spz";
    }
    return void 0;
  }
  if (view.getUint32(0, true) === 67324752) {
    if (tryPcSogsZip(fileBytes)) {
      return "pcsogszip";
    }
    return void 0;
  }
  return void 0;
}
function getFileExtension(pathOrUrl) {
  const noTrailing = pathOrUrl.split(/[?#]/, 1)[0];
  const lastSlash = Math.max(
    noTrailing.lastIndexOf("/"),
    noTrailing.lastIndexOf("\\")
  );
  const filename = noTrailing.slice(lastSlash + 1);
  const lastDot = filename.lastIndexOf(".");
  if (lastDot <= 0 || lastDot === filename.length - 1) {
    return "";
  }
  return filename.slice(lastDot + 1).toLowerCase();
}
function getSplatFileTypeFromPath(pathOrUrl) {
  const extension = getFileExtension(pathOrUrl);
  if (extension === "ply") {
    return "ply";
  }
  if (extension === "spz") {
    return "spz";
  }
  if (extension === "splat") {
    return "splat";
  }
  if (extension === "ksplat") {
    return "ksplat";
  }
  return void 0;
}
function isPcSogs(input) {
  return tryPcSogs(input) !== void 0;
}
function tryPcSogs(input) {
  try {
    let text;
    if (typeof input === "string") {
      text = input;
    } else {
      const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
      if (fileBytes.length > 65536) {
        return void 0;
      }
      text = new TextDecoder().decode(fileBytes);
    }
    const json = JSON.parse(text);
    if (!json || typeof json !== "object" || Array.isArray(json)) {
      return void 0;
    }
    for (const key of ["means", "scales", "quats", "sh0"]) {
      if (!json[key] || typeof json[key] !== "object" || Array.isArray(json[key])) {
        return void 0;
      }
      if (!json[key].shape || !json[key].files) {
        return void 0;
      }
      if (key !== "quats" && (!json[key].mins || !json[key].maxs)) {
        return void 0;
      }
    }
    return json;
  } catch {
    return void 0;
  }
}
function tryPcSogsZip(input) {
  try {
    const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
    let metaFilename = null;
    const unzipped = unzipSync(fileBytes, {
      filter: ({ name }) => {
        const filename = name.split(/[\\/]/).pop();
        if (filename === "meta.json") {
          metaFilename = name;
          return true;
        }
        return false;
      }
    });
    if (!metaFilename) {
      return void 0;
    }
    const json = tryPcSogs(unzipped[metaFilename]);
    if (!json) {
      return void 0;
    }
    return { name: metaFilename, json };
  } catch {
    return void 0;
  }
}
async function unpackSplats({
  input,
  extraFiles,
  fileType,
  pathOrUrl
}) {
  const fileBytes = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
  let splatFileType = fileType;
  if (!fileType) {
    splatFileType = getSplatFileType(fileBytes);
    if (!splatFileType && pathOrUrl) {
      splatFileType = getSplatFileTypeFromPath(pathOrUrl);
    }
  }
  switch (splatFileType) {
    case "ply": {
      const ply = new PlyReader({ fileBytes });
      await ply.parseHeader();
      const numSplats = ply.numSplats;
      const maxSplats = getTextureSize(numSplats).maxSplats;
      const args = { fileBytes, packedArray: new Uint32Array(maxSplats * 4) };
      return await withWorker(async (worker) => {
        const { packedArray, numSplats: numSplats2, extra } = await worker.call(
          "unpackPly",
          args
        );
        return { packedArray, numSplats: numSplats2, extra };
      });
    }
    case "spz": {
      return await withWorker(async (worker) => {
        const { packedArray, numSplats, extra } = await worker.call(
          "decodeSpz",
          {
            fileBytes
          }
        );
        return { packedArray, numSplats, extra };
      });
    }
    case "splat": {
      return await withWorker(async (worker) => {
        const { packedArray, numSplats } = await worker.call(
          "decodeAntiSplat",
          {
            fileBytes
          }
        );
        return { packedArray, numSplats };
      });
    }
    case "ksplat": {
      return await withWorker(async (worker) => {
        const { packedArray, numSplats, extra } = await worker.call(
          "decodeKsplat",
          { fileBytes }
        );
        return { packedArray, numSplats, extra };
      });
    }
    case "pcsogs": {
      return await withWorker(async (worker) => {
        const { packedArray, numSplats, extra } = await worker.call(
          "decodePcSogs",
          { fileBytes, extraFiles }
        );
        return { packedArray, numSplats, extra };
      });
    }
    case "pcsogszip": {
      return await withWorker(async (worker) => {
        const { packedArray, numSplats, extra } = await worker.call(
          "decodePcSogsZip",
          { fileBytes }
        );
        return { packedArray, numSplats, extra };
      });
    }
    default: {
      throw new Error(`Unknown splat file type: ${splatFileType}`);
    }
  }
}
class SplatData {
  constructor({ maxSplats = 1 } = {}) {
    this.numSplats = 0;
    this.maxSplats = getTextureSize(maxSplats).maxSplats;
    this.centers = new Float32Array(this.maxSplats * 3);
    this.scales = new Float32Array(this.maxSplats * 3);
    this.quaternions = new Float32Array(this.maxSplats * 4);
    this.opacities = new Float32Array(this.maxSplats);
    this.colors = new Float32Array(this.maxSplats * 3);
  }
  pushSplat() {
    const index = this.numSplats;
    this.ensureIndex(index);
    this.numSplats += 1;
    return index;
  }
  unpushSplat(index) {
    if (index === this.numSplats - 1) {
      this.numSplats -= 1;
    } else {
      throw new Error("Cannot unpush splat from non-last position");
    }
  }
  ensureCapacity(numSplats) {
    if (numSplats > this.maxSplats) {
      const targetSplats = Math.max(numSplats, this.maxSplats * 2);
      const newCenters = new Float32Array(targetSplats * 3);
      const newScales = new Float32Array(targetSplats * 3);
      const newQuaternions = new Float32Array(targetSplats * 4);
      const newOpacities = new Float32Array(targetSplats);
      const newColors = new Float32Array(targetSplats * 3);
      newCenters.set(this.centers);
      newScales.set(this.scales);
      newQuaternions.set(this.quaternions);
      newOpacities.set(this.opacities);
      newColors.set(this.colors);
      this.centers = newCenters;
      this.scales = newScales;
      this.quaternions = newQuaternions;
      this.opacities = newOpacities;
      this.colors = newColors;
      if (this.sh1) {
        const newSh1 = new Float32Array(targetSplats * 9);
        newSh1.set(this.sh1);
        this.sh1 = newSh1;
      }
      if (this.sh2) {
        const newSh2 = new Float32Array(targetSplats * 15);
        newSh2.set(this.sh2);
        this.sh2 = newSh2;
      }
      if (this.sh3) {
        const newSh3 = new Float32Array(targetSplats * 21);
        newSh3.set(this.sh3);
        this.sh3 = newSh3;
      }
      this.maxSplats = targetSplats;
    }
  }
  ensureIndex(index) {
    this.ensureCapacity(index + 1);
  }
  setCenter(index, x, y, z) {
    this.centers[index * 3] = x;
    this.centers[index * 3 + 1] = y;
    this.centers[index * 3 + 2] = z;
  }
  setScale(index, scaleX, scaleY, scaleZ) {
    this.scales[index * 3] = scaleX;
    this.scales[index * 3 + 1] = scaleY;
    this.scales[index * 3 + 2] = scaleZ;
  }
  setQuaternion(index, x, y, z, w) {
    this.quaternions[index * 4] = x;
    this.quaternions[index * 4 + 1] = y;
    this.quaternions[index * 4 + 2] = z;
    this.quaternions[index * 4 + 3] = w;
  }
  setOpacity(index, opacity) {
    this.opacities[index] = opacity;
  }
  setColor(index, r, g, b) {
    this.colors[index * 3] = r;
    this.colors[index * 3 + 1] = g;
    this.colors[index * 3 + 2] = b;
  }
  setSh1(index, sh1) {
    if (!this.sh1) {
      this.sh1 = new Float32Array(this.maxSplats * 9);
    }
    for (let j = 0; j < 9; ++j) {
      this.sh1[index * 9 + j] = sh1[j];
    }
  }
  setSh2(index, sh2) {
    if (!this.sh2) {
      this.sh2 = new Float32Array(this.maxSplats * 15);
    }
    for (let j = 0; j < 15; ++j) {
      this.sh2[index * 15 + j] = sh2[j];
    }
  }
  setSh3(index, sh3) {
    if (!this.sh3) {
      this.sh3 = new Float32Array(this.maxSplats * 21);
    }
    for (let j = 0; j < 21; ++j) {
      this.sh3[index * 21 + j] = sh3[j];
    }
  }
}
var computeUvec4_default = "precision highp float;\nprecision highp int;\nprecision highp sampler2D;\nprecision highp usampler2D;\nprecision highp isampler2D;\nprecision highp sampler2DArray;\nprecision highp usampler2DArray;\nprecision highp isampler2DArray;\nprecision highp sampler3D;\nprecision highp usampler3D;\nprecision highp isampler3D;\n\n#include <splatDefines>\n\nuniform uint targetLayer;\nuniform int targetBase;\nuniform int targetCount;\n\nout uvec4 target;\n\n{{ GLOBALS }}\n\nvoid produceSplat(int index) {\n    {{ STATEMENTS }}\n}\n\nvoid main() {\n    int targetIndex = int(targetLayer << SPLAT_TEX_LAYER_BITS) + int(uint(gl_FragCoord.y) << SPLAT_TEX_WIDTH_BITS) + int(gl_FragCoord.x);\n    int index = targetIndex - targetBase;\n\n    if ((index >= 0) && (index < targetCount)) {\n        produceSplat(index);\n    } else {\n        target = uvec4(0u, 0u, 0u, 0u);\n    }\n}";
const _PackedSplats = class _PackedSplats {
  constructor(options = {}) {
    this.maxSplats = 0;
    this.numSplats = 0;
    this.packedArray = null;
    this.isInitialized = false;
    this.target = null;
    this.source = null;
    this.needsUpdate = true;
    this.extra = {};
    this.dyno = new DynoPackedSplats({ packedSplats: this });
    this.initialized = Promise.resolve(this);
    this.reinitialize(options);
  }
  reinitialize(options) {
    this.isInitialized = false;
    if (options.url || options.fileBytes || options.construct) {
      this.initialized = this.asyncInitialize(options).then(() => {
        this.isInitialized = true;
        return this;
      });
    } else {
      this.initialize(options);
      this.isInitialized = true;
      this.initialized = Promise.resolve(this);
    }
  }
  initialize(options) {
    if (options.packedArray) {
      this.packedArray = options.packedArray;
      this.maxSplats = Math.floor(this.packedArray.length / 4);
      this.maxSplats = Math.floor(this.maxSplats / SPLAT_TEX_WIDTH) * SPLAT_TEX_WIDTH;
      this.numSplats = Math.min(
        this.maxSplats,
        options.numSplats ?? Number.POSITIVE_INFINITY
      );
    } else {
      this.maxSplats = options.maxSplats ?? 0;
      this.numSplats = 0;
    }
    this.extra = options.extra ?? {};
  }
  async asyncInitialize(options) {
    const { url, fileBytes, construct } = options;
    if (url) {
      const loader = new SplatLoader();
      loader.packedSplats = this;
      await loader.loadAsync(url);
    } else if (fileBytes) {
      const unpacked = await unpackSplats({
        input: fileBytes,
        fileType: options.fileType,
        pathOrUrl: options.fileName ?? url
      });
      this.initialize(unpacked);
    }
    if (construct) {
      const maybePromise = construct(this);
      if (maybePromise instanceof Promise) {
        await maybePromise;
      }
    }
  }
  // Call this when you are finished with the PackedSplats and want to free
  // any buffers it holds.
  dispose() {
    if (this.target) {
      this.target.dispose();
      this.target = null;
    }
    if (this.source) {
      this.source.dispose();
      this.source = null;
    }
  }
  // Ensures that this.packedArray can fit numSplats Gsplats. If it's too small,
  // resize exponentially and copy over the original data.
  //
  // Typically you don't need to call this, because calling this.setSplat(index, ...)
  // and this.pushSplat(...) will automatically call ensureSplats() so we have
  // enough splats.
  ensureSplats(numSplats) {
    const targetSize = numSplats <= this.maxSplats ? this.maxSplats : (
      // Grow exponentially to avoid frequent reallocations
      Math.max(numSplats, 2 * this.maxSplats)
    );
    const currentSize = !this.packedArray ? 0 : this.packedArray.length / 4;
    if (!this.packedArray || targetSize > currentSize) {
      this.maxSplats = getTextureSize(targetSize).maxSplats;
      const newArray2 = new Uint32Array(this.maxSplats * 4);
      if (this.packedArray) {
        newArray2.set(this.packedArray);
      }
      this.packedArray = newArray2;
    }
    return this.packedArray;
  }
  // Ensure the extra array for the given level is large enough to hold numSplats
  ensureSplatsSh(level, numSplats) {
    let wordsPerSplat;
    let key;
    if (level === 0) {
      return this.ensureSplats(numSplats);
    }
    if (level === 1) {
      wordsPerSplat = 2;
      key = "sh1";
    } else if (level === 2) {
      wordsPerSplat = 4;
      key = "sh2";
    } else if (level === 3) {
      wordsPerSplat = 4;
      key = "sh3";
    } else {
      throw new Error(`Invalid level: ${level}`);
    }
    let maxSplats = !this.extra[key] ? 0 : this.extra[key].length / wordsPerSplat;
    const targetSize = numSplats <= maxSplats ? maxSplats : Math.max(numSplats, 2 * maxSplats);
    if (!this.extra[key] || targetSize > maxSplats) {
      maxSplats = getTextureSize(targetSize).maxSplats;
      const newArray2 = new Uint32Array(maxSplats * wordsPerSplat);
      if (this.extra[key]) {
        newArray2.set(this.extra[key]);
      }
      this.extra[key] = newArray2;
    }
    return this.extra[key];
  }
  // Unpack the 16-byte Gsplat data at index into the Three.js components
  // center: THREE.Vector3, scales: THREE.Vector3, quaternion: THREE.Quaternion,
  // opacity: number 0..1, color: THREE.Color 0..1.
  getSplat(index) {
    if (!this.packedArray || index >= this.numSplats) {
      throw new Error("Invalid index");
    }
    return unpackSplat(this.packedArray, index);
  }
  // Set all PackedSplat components at index with the provided Gsplat attributes
  // (can be the same objects returned by getSplat). Ensures there is capacity
  // for at least index+1 Gsplats.
  setSplat(index, center, scales, quaternion, opacity, color) {
    const packedSplats = this.ensureSplats(index + 1);
    setPackedSplat(
      packedSplats,
      index,
      center.x,
      center.y,
      center.z,
      scales.x,
      scales.y,
      scales.z,
      quaternion.x,
      quaternion.y,
      quaternion.z,
      quaternion.w,
      opacity,
      color.r,
      color.g,
      color.b
    );
    this.numSplats = Math.max(this.numSplats, index + 1);
  }
  // Effectively calls this.setSplat(this.numSplats++, center, ...), useful on
  // construction where you just want to iterate and create a collection of Gsplats.
  pushSplat(center, scales, quaternion, opacity, color) {
    const packedSplats = this.ensureSplats(this.numSplats + 1);
    setPackedSplat(
      packedSplats,
      this.numSplats,
      center.x,
      center.y,
      center.z,
      scales.x,
      scales.y,
      scales.z,
      quaternion.x,
      quaternion.y,
      quaternion.z,
      quaternion.w,
      opacity,
      color.r,
      color.g,
      color.b
    );
    ++this.numSplats;
  }
  // Iterate over Gsplats index 0..=(this.numSplats-1), unpack each Gsplat
  // and invoke the callback function with the Gsplat attributes.
  forEachSplat(callback) {
    if (!this.packedArray || !this.numSplats) {
      return;
    }
    for (let i = 0; i < this.numSplats; ++i) {
      const unpacked = unpackSplat(this.packedArray, i);
      callback(
        i,
        unpacked.center,
        unpacked.scales,
        unpacked.quaternion,
        unpacked.opacity,
        unpacked.color
      );
    }
  }
  // Ensures our PackedSplats.target render target has enough space to generate
  // maxSplats total Gsplats, and reallocate if not large enough.
  ensureGenerate(maxSplats) {
    if (this.target && (maxSplats ?? 1) <= this.maxSplats) {
      return false;
    }
    this.dispose();
    const textureSize2 = getTextureSize(maxSplats ?? 1);
    const { width, height, depth } = textureSize2;
    this.maxSplats = textureSize2.maxSplats;
    this.target = new THREE.WebGLArrayRenderTarget(width, height, depth, {
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
      magFilter: THREE.NearestFilter,
      minFilter: THREE.NearestFilter
    });
    this.target.texture.format = THREE.RGBAIntegerFormat;
    this.target.texture.type = THREE.UnsignedIntType;
    this.target.texture.internalFormat = "RGBA32UI";
    this.target.scissorTest = true;
    return true;
  }
  // Given an array of splatCounts (.numSplats for each
  // SplatGenerator/SplatMesh in the scene), compute a
  // "mapping layout" in the composite array of generated outputs.
  generateMapping(splatCounts) {
    let maxSplats = 0;
    const mapping = splatCounts.map((numSplats) => {
      const base = maxSplats;
      const rounded = Math.ceil(numSplats / SPLAT_TEX_WIDTH) * SPLAT_TEX_WIDTH;
      maxSplats += rounded;
      return { base, count: numSplats };
    });
    return { maxSplats, mapping };
  }
  // Returns a THREE.DataArrayTexture representing the PackedSplats content as
  // a Uint32x4 data array texture (2048 x 2048 x depth in size)
  getTexture() {
    if (this.target) {
      return this.target.texture;
    }
    if (this.source || this.packedArray) {
      const source = this.maybeUpdateSource();
      return source;
    }
    return _PackedSplats.getEmpty();
  }
  // Check if source texture needs to be created/updated
  maybeUpdateSource() {
    if (!this.packedArray) {
      throw new Error("No packed splats");
    }
    if (this.needsUpdate || !this.source) {
      this.needsUpdate = false;
      if (this.source) {
        const { width, height, depth } = this.source.image;
        if (this.maxSplats !== width * height * depth) {
          this.source.dispose();
          this.source = null;
        }
      }
      if (!this.source) {
        const { width, height, depth } = getTextureSize(this.maxSplats);
        this.source = new THREE.DataArrayTexture(
          this.packedArray,
          width,
          height,
          depth
        );
        this.source.format = THREE.RGBAIntegerFormat;
        this.source.type = THREE.UnsignedIntType;
        this.source.internalFormat = "RGBA32UI";
        this.source.needsUpdate = true;
      } else if (this.packedArray.buffer !== this.source.image.data.buffer) {
        this.source.image.data = new Uint8Array(this.packedArray.buffer);
      }
      this.source.needsUpdate = true;
    }
    return this.source;
  }
  // Can be used where you need an uninitialized THREE.DataArrayTexture like
  // a uniform you will update with the result of this.getTexture() later.
  static getEmpty() {
    if (!_PackedSplats.emptySource) {
      const { width, height, depth, maxSplats } = getTextureSize(1);
      const emptyArray = new Uint32Array(maxSplats * 4);
      _PackedSplats.emptySource = new THREE.DataArrayTexture(
        emptyArray,
        width,
        height,
        depth
      );
      _PackedSplats.emptySource.format = THREE.RGBAIntegerFormat;
      _PackedSplats.emptySource.type = THREE.UnsignedIntType;
      _PackedSplats.emptySource.internalFormat = "RGBA32UI";
      _PackedSplats.emptySource.needsUpdate = true;
    }
    return _PackedSplats.emptySource;
  }
  // Get a program and THREE.RawShaderMaterial for a given GsplatGenerator,
  // generating it if necessary and caching the result.
  prepareProgramMaterial(generator) {
    let program = _PackedSplats.generatorProgram.get(generator);
    if (!program) {
      const graph = dynoBlock(
        { index: "int" },
        { output: "uvec4" },
        ({ index }) => {
          generator.inputs.index = index;
          const gsplat = generator.outputs.gsplat;
          const output = outputPackedSplat(gsplat);
          return { output };
        }
      );
      if (!_PackedSplats.programTemplate) {
        _PackedSplats.programTemplate = new DynoProgramTemplate(
          computeUvec4_default
        );
      }
      program = new DynoProgram({
        graph,
        inputs: { index: "index" },
        outputs: { output: "target" },
        template: _PackedSplats.programTemplate
      });
      Object.assign(program.uniforms, {
        targetLayer: { value: 0 },
        targetBase: { value: 0 },
        targetCount: { value: 0 }
      });
      _PackedSplats.generatorProgram.set(generator, program);
    }
    const material = program.prepareMaterial();
    _PackedSplats.fullScreenQuad.material = material;
    return { program, material };
  }
  saveRenderState(renderer) {
    return {
      xrEnabled: renderer.xr.enabled,
      autoClear: renderer.autoClear
    };
  }
  resetRenderState(renderer, state) {
    renderer.setRenderTarget(null);
    renderer.xr.enabled = state.xrEnabled;
    renderer.autoClear = state.autoClear;
  }
  // Executes a dyno program specified by generator which is any DynoBlock that
  // maps { index: "int" } to { gsplat: Gsplat }. This is called in
  // SparkRenderer.updateInternal() to re-generate Gsplats in the scene for
  // SplatGenerator instances whose version is newer than what was generated
  // for it last time.
  generate({
    generator,
    base,
    count,
    renderer
  }) {
    if (!this.target) {
      throw new Error("Target must be initialized with ensureSplats");
    }
    if (base + count > this.maxSplats) {
      throw new Error("Base + count exceeds maxSplats");
    }
    const { program, material } = this.prepareProgramMaterial(generator);
    program.update();
    const renderState = this.saveRenderState(renderer);
    const nextBase = Math.ceil((base + count) / SPLAT_TEX_WIDTH) * SPLAT_TEX_WIDTH;
    const layerSize = SPLAT_TEX_WIDTH * SPLAT_TEX_HEIGHT;
    material.uniforms.targetBase.value = base;
    material.uniforms.targetCount.value = count;
    while (base < nextBase) {
      const layer = Math.floor(base / layerSize);
      material.uniforms.targetLayer.value = layer;
      const layerBase = layer * layerSize;
      const layerYStart = Math.floor((base - layerBase) / SPLAT_TEX_WIDTH);
      const layerYEnd = Math.min(
        SPLAT_TEX_HEIGHT,
        Math.ceil((nextBase - layerBase) / SPLAT_TEX_WIDTH)
      );
      this.target.scissor.set(
        0,
        layerYStart,
        SPLAT_TEX_WIDTH,
        layerYEnd - layerYStart
      );
      renderer.setRenderTarget(this.target, layer);
      renderer.xr.enabled = false;
      renderer.autoClear = false;
      _PackedSplats.fullScreenQuad.render(renderer);
      base += SPLAT_TEX_WIDTH * (layerYEnd - layerYStart);
    }
    this.resetRenderState(renderer, renderState);
    return { nextBase };
  }
};
_PackedSplats.emptySource = null;
_PackedSplats.programTemplate = null;
_PackedSplats.generatorProgram = /* @__PURE__ */ new Map();
_PackedSplats.fullScreenQuad = new FullScreenQuad(
  new THREE.RawShaderMaterial({ visible: false })
);
let PackedSplats = _PackedSplats;
class DynoPackedSplats extends DynoUniform {
  constructor({ packedSplats } = {}) {
    super({
      key: "packedSplats",
      type: TPackedSplats,
      globals: () => [definePackedSplats],
      value: {
        texture: PackedSplats.getEmpty(),
        numSplats: 0
      },
      update: (value) => {
        var _a2, _b2;
        value.texture = ((_a2 = this.packedSplats) == null ? void 0 : _a2.getTexture()) ?? PackedSplats.getEmpty();
        value.numSplats = ((_b2 = this.packedSplats) == null ? void 0 : _b2.numSplats) ?? 0;
        return value;
      }
    });
    this.packedSplats = packedSplats;
  }
}
class SplatGeometry extends THREE.InstancedBufferGeometry {
  constructor(ordering, activeSplats) {
    super();
    this.ordering = ordering;
    this.setAttribute("position", new THREE.BufferAttribute(QUAD_VERTICES, 3));
    this.setIndex(new THREE.BufferAttribute(QUAD_INDICES, 1));
    this._maxInstanceCount = ordering.length;
    this.instanceCount = activeSplats;
    this.attribute = new THREE.InstancedBufferAttribute(ordering, 1, false, 1);
    this.attribute.setUsage(THREE.DynamicDrawUsage);
    this.setAttribute("splatIndex", this.attribute);
  }
  update(ordering, activeSplats) {
    this.ordering = ordering;
    this.attribute.array = ordering;
    this.instanceCount = activeSplats;
    this.attribute.addUpdateRange(0, activeSplats);
    this.attribute.needsUpdate = true;
  }
}
const QUAD_VERTICES = new Float32Array([
  -1,
  -1,
  0,
  1,
  -1,
  0,
  1,
  1,
  0,
  -1,
  1,
  0
]);
const QUAD_INDICES = new Uint16Array([0, 1, 2, 0, 2, 3]);
const _SparkViewpoint = class _SparkViewpoint {
  constructor(options) {
    this.lastTime = null;
    this.encodeLinear = false;
    this.superXY = 1;
    this.display = null;
    this.sorting = null;
    this.pending = null;
    this.sortingCheck = false;
    this.readback = new Uint16Array(0);
    this.spark = options.spark;
    this.camera = options.camera;
    this.viewToWorld = options.viewToWorld ?? new THREE.Matrix4();
    if (options.target) {
      const { width, height, doubleBuffer } = options.target;
      const superXY = Math.max(1, Math.min(4, options.target.superXY ?? 1));
      this.superXY = superXY;
      if (width * superXY > 8192 || height * superXY > 8192) {
        throw new Error("Target size too large");
      }
      this.target = new THREE.WebGLRenderTarget(
        width * superXY,
        height * superXY,
        {
          format: THREE.RGBAFormat,
          type: THREE.UnsignedByteType,
          colorSpace: THREE.SRGBColorSpace
        }
      );
      if (doubleBuffer) {
        this.back = new THREE.WebGLRenderTarget(
          width * superXY,
          height * superXY,
          {
            format: THREE.RGBAFormat,
            type: THREE.UnsignedByteType,
            colorSpace: THREE.SRGBColorSpace
          }
        );
      }
      this.encodeLinear = true;
    }
    this.onTextureUpdated = options.onTextureUpdated;
    this.sortRadial = options.sortRadial ?? true;
    this.sortDistance = options.sortDistance;
    this.sortCoorient = options.sortCoorient;
    this.depthBias = options.depthBias;
    this.sort360 = options.sort360;
    this.orderingFreelist = new FreeList({
      allocate: (maxSplats) => new Uint32Array(maxSplats),
      valid: (ordering, maxSplats) => ordering.length === maxSplats
    });
    this.autoUpdate = false;
    this.setAutoUpdate(options.autoUpdate ?? false);
  }
  // Call this when you are done with the SparkViewpoint and want to
  // free up its resources (GPU targets, pixel buffers, etc.)
  dispose() {
    var _a2;
    this.setAutoUpdate(false);
    if (this.target) {
      this.target.dispose();
      this.target = void 0;
    }
    if (this.back) {
      this.back.dispose();
      this.back = void 0;
    }
    if (this.display) {
      this.spark.releaseAccumulator(this.display.accumulator);
      this.display.geometry.dispose();
      this.display = null;
    }
    if ((_a2 = this.pending) == null ? void 0 : _a2.accumulator) {
      this.spark.releaseAccumulator(this.pending.accumulator);
      this.pending = null;
    }
  }
  // Use this function to change whether this viewpoint will auto-update
  // its sort order whenever the attached SparkRenderer updates the Gsplats.
  // Turn this on or off depending on whether you expect to do renders from
  // this viewpoint most frames.
  setAutoUpdate(autoUpdate) {
    if (!this.autoUpdate && autoUpdate) {
      this.spark.autoViewpoints.push(this);
    } else if (this.autoUpdate && !autoUpdate) {
      this.spark.autoViewpoints = this.spark.autoViewpoints.filter(
        (v) => v !== this
      );
    }
    this.autoUpdate = autoUpdate;
  }
  // See below async prepareRenderPixels() for explanation of parameters.
  // Awaiting this method updates the Gsplats in the scene and performs a sort of the
  // Gsplats from this viewpoint, preparing it for a subsequent this.renderTarget()
  // call in the same tick.
  async prepare({
    scene,
    camera,
    viewToWorld,
    update,
    forceOrigin
  }) {
    var _a2;
    if (viewToWorld) {
      this.viewToWorld = viewToWorld;
    } else {
      this.camera = camera ?? this.camera;
      if (this.camera) {
        this.camera.updateMatrixWorld();
        this.viewToWorld = this.camera.matrixWorld.clone();
      }
    }
    while (update ?? true) {
      const originToWorld = forceOrigin ? this.viewToWorld : void 0;
      const updated = this.spark.updateInternal({ scene, originToWorld });
      if (updated) {
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    const accumulator = this.spark.active;
    if (accumulator !== ((_a2 = this.display) == null ? void 0 : _a2.accumulator)) {
      this.spark.active.refCount += 1;
    }
    await this.sortUpdate({ accumulator, viewToWorld: this.viewToWorld });
  }
  // Render out the viewpoint to the view target RGBA buffer.
  // Swaps buffers if doubleBuffer: true was set.
  // Calls onTextureUpdated(texture) with the resulting texture.
  renderTarget({
    scene,
    camera
  }) {
    var _a2;
    const target = this.back ?? this.target;
    if (!target) {
      throw new Error("Must initialize SparkViewpoint with target");
    }
    camera = camera ?? this.camera;
    if (!camera) {
      throw new Error("Must provide camera");
    }
    if (camera instanceof THREE.PerspectiveCamera) {
      const newCam = new THREE.PerspectiveCamera().copy(camera, false);
      newCam.aspect = target.width / target.height;
      newCam.updateProjectionMatrix();
      camera = newCam;
    }
    this.viewToWorld = camera.matrixWorld.clone();
    try {
      this.spark.renderer.setRenderTarget(target);
      this.spark.prepareViewpoint(this);
      this.spark.renderer.render(scene, camera);
    } finally {
      this.spark.prepareViewpoint(this.spark.defaultView);
      this.spark.renderer.setRenderTarget(null);
    }
    if (target !== this.target) {
      [this.target, this.back] = [this.back, this.target];
    }
    (_a2 = this.onTextureUpdated) == null ? void 0 : _a2.call(this, target.texture);
  }
  // Read back the previously rendered target image as a Uint8Array of packed
  // RGBA values (in that order). If superXY was set greater than 1 then
  // downsampling is performed in the target pixel array with simple averaging
  // to derive the returned pixel values. Subsequent calls to this.readTarget()
  // will reuse the same buffers to minimize memory allocations.
  async readTarget() {
    if (!this.target) {
      throw new Error("Must initialize SparkViewpoint with target");
    }
    const { width, height } = this.target;
    const byteSize = width * height * 4;
    if (!this.superPixels || this.superPixels.length < byteSize) {
      this.superPixels = new Uint8Array(byteSize);
    }
    await this.spark.renderer.readRenderTargetPixelsAsync(
      this.target,
      0,
      0,
      width,
      height,
      this.superPixels
    );
    const { superXY } = this;
    if (superXY === 1) {
      return this.superPixels;
    }
    const subWidth = width / superXY;
    const subHeight = height / superXY;
    const subSize = subWidth * subHeight * 4;
    if (!this.pixels || this.pixels.length < subSize) {
      this.pixels = new Uint8Array(subSize);
    }
    const { superPixels, pixels } = this;
    const super2 = superXY * superXY;
    for (let y = 0; y < subHeight; y++) {
      const row = y * subWidth;
      for (let x = 0; x < subWidth; x++) {
        const superCol = x * superXY;
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        for (let sy = 0; sy < superXY; sy++) {
          const superRow = (y * superXY + sy) * this.target.width;
          for (let sx = 0; sx < superXY; sx++) {
            const superIndex = (superRow + superCol + sx) * 4;
            r += superPixels[superIndex];
            g += superPixels[superIndex + 1];
            b += superPixels[superIndex + 2];
            a += superPixels[superIndex + 3];
          }
        }
        const pixelIndex = (row + x) * 4;
        pixels[pixelIndex] = r / super2;
        pixels[pixelIndex + 1] = g / super2;
        pixels[pixelIndex + 2] = b / super2;
        pixels[pixelIndex + 3] = a / super2;
      }
    }
    return pixels;
  }
  // Render out a viewpoint as a Uint8Array of RGBA values for the provided scene
  // and any camera/viewToWorld viewpoint overrides. By default update is true,
  // which triggers its SparkRenderer to check and potentially update the Gsplats.
  // Setting update to false disables this and sorts the Gsplats as they are.
  // Setting forceOrigin (default: false) to true forces the view update to
  // recalculate the splats with this view origin, potentially altering any
  // view-dependent effects. If you expect view-dependent effects to play a role
  // in the rendering quality, enable this.
  //
  // Underneath, prepareRenderPixels() simply calls await this.prepare(...),
  // this.renderTarget(...), and finally returns the result this.readTarget(),
  // a Promise to a Uint8Array with RGBA values for all the pixels (potentially
  // downsampled if the superXY parameter was used). These steps can also be called
  // manually, for example if you need to alter the scene before and after
  // this.renderTarget(...) to hide UI elements from being rendered.
  async prepareRenderPixels({
    scene,
    camera,
    viewToWorld,
    update,
    forceOrigin
  }) {
    await this.prepare({ scene, camera, viewToWorld, update, forceOrigin });
    this.renderTarget({ scene, camera });
    return this.readTarget();
  }
  // This is called automatically by SparkRenderer, there is no need to call it!
  // The method cannot be private because then SparkRenderer would
  // not be able to call it.
  autoPoll({ accumulator }) {
    var _a2, _b2, _c, _d;
    if (this.camera) {
      this.camera.updateMatrixWorld();
      this.viewToWorld = this.camera.matrixWorld.clone();
    }
    let needsSort = false;
    let displayed = false;
    if (!this.display) {
      needsSort = true;
    } else if (accumulator) {
      needsSort = true;
      const { mappingVersion } = this.display.accumulator;
      if (accumulator.mappingVersion === mappingVersion) {
        this.spark.releaseAccumulator(this.display.accumulator);
        this.display.accumulator = accumulator;
        displayed = true;
      }
    }
    const latestView = ((_a2 = this.sorting) == null ? void 0 : _a2.viewToWorld) ?? ((_b2 = this.display) == null ? void 0 : _b2.viewToWorld);
    if (latestView && !withinCoorientDist({
      matrix1: this.viewToWorld,
      matrix2: latestView,
      // By default update sort each 1 cm
      maxDistance: this.sortDistance ?? 0.01,
      // By default for radial sort, update for intermittent movement so that
      // we bring back splats culled by being behind the camera.
      // For depth sort, small rotations can change sort order a lot, so
      // update sort for even small rotations.
      minCoorient: this.sortCoorient ?? this.sortRadial ? 0.99 : 0.999
    })) {
      needsSort = true;
    }
    if (!needsSort) {
      return;
    }
    if (accumulator) {
      accumulator.refCount += 1;
    }
    if (accumulator && ((_c = this.pending) == null ? void 0 : _c.accumulator) && this.pending.accumulator !== ((_d = this.display) == null ? void 0 : _d.accumulator)) {
      this.spark.releaseAccumulator(this.pending.accumulator);
    }
    this.pending = { accumulator, viewToWorld: this.viewToWorld, displayed };
    this.driveSort();
  }
  async driveSort() {
    var _a2;
    while (true) {
      if (this.sorting || !this.pending) {
        return;
      }
      const { viewToWorld, displayed } = this.pending;
      let accumulator = this.pending.accumulator ?? ((_a2 = this.display) == null ? void 0 : _a2.accumulator);
      if (!accumulator) {
        accumulator = this.spark.active;
        accumulator.refCount += 1;
      }
      this.pending = null;
      if (!accumulator) {
        throw new Error("No accumulator to sort");
      }
      this.sorting = { viewToWorld };
      await this.sortUpdate({ accumulator, viewToWorld, displayed });
      this.sorting = null;
    }
  }
  async sortUpdate({
    accumulator,
    viewToWorld,
    displayed = false
  }) {
    if (this.sortingCheck) {
      throw new Error("Only one sort at a time");
    }
    this.sortingCheck = true;
    accumulator = accumulator ?? this.spark.active;
    const { numSplats, maxSplats } = accumulator.splats;
    let activeSplats = 0;
    let ordering = this.orderingFreelist.alloc(maxSplats);
    if (numSplats > 0) {
      const {
        reader,
        doubleSortReader,
        dynoSortRadial,
        dynoOrigin,
        dynoDirection,
        dynoDepthBias,
        dynoSort360,
        dynoSplats
      } = _SparkViewpoint.makeSorter();
      const halfMaxSplats = Math.ceil(maxSplats / 2);
      this.readback = reader.ensureBuffer(halfMaxSplats, this.readback);
      const worldToOrigin = accumulator.toWorld.clone().invert();
      const viewToOrigin = viewToWorld.clone().premultiply(worldToOrigin);
      dynoSortRadial.value = this.sort360 ? true : this.sortRadial;
      dynoOrigin.value.set(0, 0, 0).applyMatrix4(viewToOrigin);
      dynoDirection.value.set(0, 0, -1).applyMatrix4(viewToOrigin).sub(dynoOrigin.value).normalize();
      dynoDepthBias.value = this.depthBias ?? 1;
      dynoSort360.value = this.sort360 ?? false;
      dynoSplats.packedSplats = accumulator.splats;
      await reader.renderReadback({
        renderer: this.spark.renderer,
        reader: doubleSortReader,
        count: Math.ceil(numSplats / 2),
        readback: this.readback
      });
      const result = await withWorker(async (worker) => {
        return worker.call("sortDoubleSplats", {
          numSplats,
          readback: this.readback,
          ordering
        });
      });
      this.readback = result.readback;
      ordering = result.ordering;
      activeSplats = result.activeSplats;
    }
    this.updateDisplay({
      accumulator,
      viewToWorld,
      ordering,
      activeSplats,
      displayed
    });
    this.sortingCheck = false;
  }
  updateDisplay({
    accumulator,
    viewToWorld,
    ordering,
    activeSplats,
    displayed = false
  }) {
    if (!this.display) {
      this.display = {
        accumulator,
        viewToWorld,
        geometry: new SplatGeometry(ordering, activeSplats)
      };
    } else {
      if (!displayed && accumulator !== this.display.accumulator) {
        this.spark.releaseAccumulator(this.display.accumulator);
        this.display.accumulator = accumulator;
      }
      this.display.viewToWorld = viewToWorld;
      const oldOrdering = this.display.geometry.ordering;
      if (oldOrdering.length === ordering.length) {
        this.display.geometry.update(ordering, activeSplats);
      } else {
        this.display.geometry.dispose();
        this.display.geometry = new SplatGeometry(ordering, activeSplats);
      }
      this.orderingFreelist.free(oldOrdering);
    }
    if (this.spark.viewpoint === this) {
      this.spark.prepareViewpoint(this);
    }
  }
  static makeSorter() {
    if (!_SparkViewpoint.dynos) {
      const dynoSortRadial = new DynoBool({ value: true });
      const dynoOrigin = new DynoVec3({ value: new THREE.Vector3() });
      const dynoDirection = new DynoVec3({ value: new THREE.Vector3() });
      const dynoDepthBias = new DynoFloat({ value: 1 });
      const dynoSort360 = new DynoBool({ value: false });
      const dynoSplats = new DynoPackedSplats();
      const reader = new Readback();
      const doubleSortReader = dynoBlock(
        { index: "int" },
        { rgba8: "vec4" },
        ({ index }) => {
          if (!index) {
            throw new Error("No index");
          }
          const sortParams = {
            sortRadial: dynoSortRadial,
            sortOrigin: dynoOrigin,
            sortDirection: dynoDirection,
            sortDepthBias: dynoDepthBias,
            sort360: dynoSort360
          };
          const index2 = mul(index, dynoConst("int", 2));
          const gsplat0 = readPackedSplat(dynoSplats, index2);
          const metric0 = computeSortMetric({ gsplat: gsplat0, ...sortParams });
          const gsplat1 = readPackedSplat(
            dynoSplats,
            add(index2, dynoConst("int", 1))
          );
          const metric1 = computeSortMetric({ gsplat: gsplat1, ...sortParams });
          const combined = combine({
            vectorType: "vec2",
            x: metric0,
            y: metric1
          });
          const rgba8 = uintToRgba8(packHalf2x16(combined));
          return { rgba8 };
        }
      );
      _SparkViewpoint.dynos = {
        dynoSortRadial,
        dynoOrigin,
        dynoDirection,
        dynoDepthBias,
        dynoSort360,
        dynoSplats,
        reader,
        doubleSortReader
      };
    }
    return _SparkViewpoint.dynos;
  }
};
_SparkViewpoint.EMPTY_TEXTURE = new THREE.Texture();
_SparkViewpoint.dynos = null;
let SparkViewpoint = _SparkViewpoint;
const defineComputeSortMetric = unindent(`
  float computeSort(Gsplat gsplat, bool sortRadial, vec3 sortOrigin, vec3 sortDirection, float sortDepthBias, bool sort360) {
    if (!isGsplatActive(gsplat.flags)) {
      return INFINITY;
    }

    vec3 center = gsplat.center - sortOrigin;
    float biasedDepth = dot(center, sortDirection) + sortDepthBias;
    if (!sort360 && (biasedDepth <= 0.0)) {
      return INFINITY;
    }

    return sortRadial ? length(center) : biasedDepth;
  }
`);
function computeSortMetric({
  gsplat,
  sortRadial,
  sortOrigin,
  sortDirection,
  sortDepthBias,
  sort360
}) {
  return dyno$1({
    inTypes: {
      gsplat: Gsplat,
      sortRadial: "bool",
      sortOrigin: "vec3",
      sortDirection: "vec3",
      sortDepthBias: "float",
      sort360: "bool"
    },
    outTypes: { metric: "float" },
    globals: () => [defineGsplat, defineComputeSortMetric],
    inputs: {
      gsplat,
      sortRadial,
      sortOrigin,
      sortDirection,
      sortDepthBias,
      sort360
    },
    statements: ({ inputs, outputs }) => {
      const {
        gsplat: gsplat2,
        sortRadial: sortRadial2,
        sortOrigin: sortOrigin2,
        sortDirection: sortDirection2,
        sortDepthBias: sortDepthBias2,
        sort360: sort3602
      } = inputs;
      return unindentLines(`
        ${outputs.metric} = computeSort(${gsplat2}, ${sortRadial2}, ${sortOrigin2}, ${sortDirection2}, ${sortDepthBias2}, ${sort3602});
      `);
    }
  }).outputs.metric;
}
class SplatAccumulator {
  constructor() {
    this.splats = new PackedSplats();
    this.toWorld = new THREE.Matrix4();
    this.mapping = [];
    this.refCount = 0;
    this.splatsVersion = -1;
    this.mappingVersion = -1;
  }
  ensureGenerate(maxSplats) {
    if (this.splats.ensureGenerate(maxSplats)) {
      this.mapping = [];
    }
  }
  // Generate all Gsplats from an array of generators
  generateSplats({
    renderer,
    modifier,
    generators: generators2,
    forceUpdate,
    originToWorld
  }) {
    const mapping = this.mapping.reduce((map, record) => {
      map.set(record.node, record);
      return map;
    }, /* @__PURE__ */ new Map());
    let updated = 0;
    let numSplats = 0;
    for (const { node, generator, version, base, count } of generators2) {
      const current = mapping.get(node);
      if (forceUpdate || generator !== (current == null ? void 0 : current.generator) || version !== (current == null ? void 0 : current.version) || base !== (current == null ? void 0 : current.base) || count !== (current == null ? void 0 : current.count)) {
        if (generator && count > 0) {
          const modGenerator = modifier.apply(generator);
          try {
            this.splats.generate({
              generator: modGenerator,
              base,
              count,
              renderer
            });
          } catch (error) {
            node.generator = void 0;
            node.generatorError = error;
          }
          updated += 1;
        }
      }
      numSplats = Math.max(numSplats, base + count);
    }
    this.splats.numSplats = numSplats;
    this.toWorld = originToWorld;
    this.mapping = generators2;
    return updated !== 0;
  }
  // Check if this accumulator has exactly the same generator mapping as
  // the previous one. If so, we can reuse the Gsplat sort order.
  hasCorrespondence(other) {
    if (this.mapping.length !== other.mapping.length) {
      return false;
    }
    return this.mapping.every(({ node, base, count }, i) => {
      const {
        node: otherNode,
        base: otherBase,
        count: otherCount
      } = other.mapping[i];
      return node === otherNode && base === otherBase && count === otherCount;
    });
  }
}
var splatDefines_default = "const float LN_SCALE_MIN = -12.0;\nconst float LN_SCALE_MAX = 9.0;\nconst float LN_RESCALE = (LN_SCALE_MAX - LN_SCALE_MIN) / 254.0; \n\nconst uint SPLAT_TEX_WIDTH_BITS = 11u;\nconst uint SPLAT_TEX_HEIGHT_BITS = 11u;\nconst uint SPLAT_TEX_DEPTH_BITS = 11u;\nconst uint SPLAT_TEX_LAYER_BITS = SPLAT_TEX_WIDTH_BITS + SPLAT_TEX_HEIGHT_BITS;\n\nconst uint SPLAT_TEX_WIDTH = 1u << SPLAT_TEX_WIDTH_BITS;\nconst uint SPLAT_TEX_HEIGHT = 1u << SPLAT_TEX_HEIGHT_BITS;\nconst uint SPLAT_TEX_DEPTH = 1u << SPLAT_TEX_DEPTH_BITS;\n\nconst uint SPLAT_TEX_WIDTH_MASK = SPLAT_TEX_WIDTH - 1u;\nconst uint SPLAT_TEX_HEIGHT_MASK = SPLAT_TEX_HEIGHT - 1u;\nconst uint SPLAT_TEX_DEPTH_MASK = SPLAT_TEX_DEPTH - 1u;\n\nconst uint F16_INF = 0x7c00u;\nconst float PI = 3.1415926535897932384626433832795;\n\nconst float INFINITY = 1.0 / 0.0;\nconst float NEG_INFINITY = -INFINITY;\n\nconst float MAX_PIXEL_RADIUS = 512.0;\nconst float MIN_ALPHA = 0.0 * (1.0 / 255.0); \nconst float MAX_STDDEV = sqrt(8.0);\n\nfloat sqr(float x) {\n    return x * x;\n}\n\nfloat pow4(float x) {\n    float x2 = x * x;\n    return x2 * x2;\n}\n\nfloat pow8(float x) {\n    float x4 = pow4(x);\n    return x4 * x4;\n}\n\nvec3 srgbToLinear(vec3 rgb) {\n    return pow(rgb, vec3(2.2));\n}\n\nvec3 linearToSrgb(vec3 rgb) {\n    return pow(rgb, vec3(1.0 / 2.2));\n}\n\nuint encodeQuatOctXy88R8(vec4 q) {\n    \n    if (q.w < 0.0) {\n        q = -q;\n    }\n    \n    float theta = 2.0 * acos(q.w);\n    float halfTheta = theta * 0.5;\n    float s = sin(halfTheta);\n    \n    vec3 axis = (abs(s) < 1e-6) ? vec3(1.0, 0.0, 0.0) : q.xyz / s;\n    \n    \n    \n    float sum = abs(axis.x) + abs(axis.y) + abs(axis.z);\n    vec2 p = vec2(axis.x, axis.y) / sum;\n    \n    if (axis.z < 0.0) {\n        float oldPx = p.x;\n        p.x = (1.0 - abs(p.y)) * (p.x >= 0.0 ? 1.0 : -1.0);\n        p.y = (1.0 - abs(oldPx)) * (p.y >= 0.0 ? 1.0 : -1.0);\n    }\n    \n    float u_f = p.x * 0.5 + 0.5;\n    float v_f = p.y * 0.5 + 0.5;\n    \n    uint quantU = uint(clamp(round(u_f * 255.0), 0.0, 255.0));\n    uint quantV = uint(clamp(round(v_f * 255.0), 0.0, 255.0));\n    \n    \n    \n    uint angleInt = uint(clamp(round((theta / 3.14159265359) * 255.0), 0.0, 255.0));\n    \n    \n    return (angleInt << 16u) | (quantV << 8u) | quantU;\n}\n\nvec4 decodeQuatOctXy88R8(uint encoded) {\n    \n    uint quantU = encoded & uint(0xFFu);               \n    uint quantV = (encoded >> 8u) & uint(0xFFu);         \n    uint angleInt = encoded >> 16u;                      \n\n    \n    float u_f = float(quantU) / 255.0;\n    float v_f = float(quantV) / 255.0;\n    vec2 f = vec2(u_f * 2.0 - 1.0, v_f * 2.0 - 1.0);\n\n    vec3 axis = vec3(f.xy, 1.0 - abs(f.x) - abs(f.y));\n    float t = max(-axis.z, 0.0);\n    axis.x += (axis.x >= 0.0) ? -t : t;\n    axis.y += (axis.y >= 0.0) ? -t : t;\n    axis = normalize(axis);\n    \n    \n    float theta = (float(angleInt) / 255.0) * 3.14159265359;\n    float halfTheta = theta * 0.5;\n    float s = sin(halfTheta);\n    float w = cos(halfTheta);\n    \n    return vec4(axis * s, w);\n}\n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\n    \n\nuvec4 packSplat(vec3 center, vec3 scales, vec4 quaternion, vec4 rgba) {\n    uvec4 uRgba = uvec4(round(clamp(rgba * 255.0, 0.0, 255.0)));\n\n    uint uQuat = encodeQuatOctXy88R8(quaternion);\n    \n    \n    uvec3 uQuat3 = uvec3(uQuat & 0xffu, (uQuat >> 8u) & 0xffu, (uQuat >> 16u) & 0xffu);\n\n    \n    uvec3 uScales = uvec3(\n        (scales.x == 0.0) ? 0u : uint(round(clamp((log(scales.x) - LN_SCALE_MIN) / LN_RESCALE, 0.0, 254.0))) + 1u,\n        (scales.y == 0.0) ? 0u : uint(round(clamp((log(scales.y) - LN_SCALE_MIN) / LN_RESCALE, 0.0, 254.0))) + 1u,\n        (scales.z == 0.0) ? 0u : uint(round(clamp((log(scales.z) - LN_SCALE_MIN) / LN_RESCALE, 0.0, 254.0))) + 1u\n    );\n\n    \n    uint word0 = uRgba.r | (uRgba.g << 8u) | (uRgba.b << 16u) | (uRgba.a << 24u);\n    uint word1 = packHalf2x16(center.xy);\n    uint word2 = packHalf2x16(vec2(center.z, 0.0)) | (uQuat3.x << 16u) | (uQuat3.y << 24u);\n    uint word3 = uScales.x | (uScales.y << 8u) | (uScales.z << 16u) | (uQuat3.z << 24u);\n    return uvec4(word0, word1, word2, word3);\n}\n\nvoid unpackSplat(uvec4 packed, out vec3 center, out vec3 scales, out vec4 quaternion, out vec4 rgba) {\n    uint word0 = packed.x, word1 = packed.y, word2 = packed.z, word3 = packed.w;\n\n    uvec4 uRgba = uvec4(word0 & 0xffu, (word0 >> 8u) & 0xffu, (word0 >> 16u) & 0xffu, (word0 >> 24u) & 0xffu);\n    rgba = vec4(uRgba) / 255.0;\n\n    center = vec4(\n        unpackHalf2x16(word1),\n        unpackHalf2x16(word2 & 0xffffu)\n    ).xyz;\n\n    uvec3 uScales = uvec3(word3 & 0xffu, (word3 >> 8u) & 0xffu, (word3 >> 16u) & 0xffu);\n    scales = vec3(\n        (uScales.x == 0u) ? 0.0 : exp(LN_SCALE_MIN + float(uScales.x - 1u) * LN_RESCALE),\n        (uScales.y == 0u) ? 0.0 : exp(LN_SCALE_MIN + float(uScales.y - 1u) * LN_RESCALE),\n        (uScales.z == 0u) ? 0.0 : exp(LN_SCALE_MIN + float(uScales.z - 1u) * LN_RESCALE)\n    );\n\n    uint uQuat = ((word2 >> 16u) & 0xFFFFu) | ((word3 >> 8u) & 0xFF0000u);\n    quaternion = decodeQuatOctXy88R8(uQuat);\n    \n    \n}\n\nvec3 quatVec(vec4 q, vec3 v) {\n    \n    vec3 t = 2.0 * cross(q.xyz, v);\n    return v + q.w * t + cross(q.xyz, t);\n}\n\nvec4 quatQuat(vec4 q1, vec4 q2) {\n    return vec4(\n        q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,\n        q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,\n        q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w,\n        q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z\n    );\n}\n\nmat3 scaleQuaternionToMatrix(vec3 s, vec4 q) {\n    \n    return mat3(\n        s.x * (1.0 - 2.0 * (q.y * q.y + q.z * q.z)),\n        s.x * (2.0 * (q.x * q.y + q.w * q.z)),\n        s.x * (2.0 * (q.x * q.z - q.w * q.y)),\n        s.y * (2.0 * (q.x * q.y - q.w * q.z)),\n        s.y * (1.0 - 2.0 * (q.x * q.x + q.z * q.z)),\n        s.y * (2.0 * (q.y * q.z + q.w * q.x)),\n        s.z * (2.0 * (q.x * q.z + q.w * q.y)),\n        s.z * (2.0 * (q.y * q.z - q.w * q.x)),\n        s.z * (1.0 - 2.0 * (q.x * q.x + q.y * q.y))\n    );\n}\n\nvec4 slerp(vec4 q1, vec4 q2, float t) {\n    \n    float cosHalfTheta = dot(q1, q2);\n\n    \n    if (abs(cosHalfTheta) >= 0.999) {\n        return q1;\n    }\n    \n    \n    \n    if (cosHalfTheta < 0.0) {\n        q2 = -q2;\n        cosHalfTheta = -cosHalfTheta;\n    }\n\n    \n    float halfTheta = acos(cosHalfTheta);\n    float sinHalfTheta = sqrt(1.0 - cosHalfTheta * cosHalfTheta);\n\n    \n    float ratioA = sin((1.0 - t) * halfTheta) / sinHalfTheta;\n    float ratioB = sin(t * halfTheta) / sinHalfTheta;\n\n    \n    return q1 * ratioA + q2 * ratioB;\n}\n\nivec3 splatTexCoord(int index) {\n    uint x = uint(index) & SPLAT_TEX_WIDTH_MASK;\n    uint y = (uint(index) >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK;\n    uint z = uint(index) >> SPLAT_TEX_LAYER_BITS;\n    return ivec3(x, y, z);\n}";
var splatFragment_default = "precision highp float;\nprecision highp int;\n\n#include <splatDefines>\n\nuniform float near;\nuniform float far;\nuniform bool encodeLinear;\nuniform float maxStdDev;\nuniform bool disableFalloff;\nuniform float falloff;\n\nuniform bool splatTexEnable;\nuniform sampler3D splatTexture;\nuniform mat2 splatTexMul;\nuniform vec2 splatTexAdd;\nuniform float splatTexNear;\nuniform float splatTexFar;\nuniform float splatTexMid;\n\nout vec4 fragColor;\n\nin vec4 vRgba;\nin vec2 vSplatUv;\nin vec3 vNdc;\n\nvoid main() {\n    vec4 rgba = vRgba;\n\n    float z = dot(vSplatUv, vSplatUv);\n    if (!splatTexEnable) {\n        if (z > (maxStdDev * maxStdDev)) {\n            discard;\n        }\n    } else {\n        vec2 uv = splatTexMul * vSplatUv + splatTexAdd;\n        float ndcZ = vNdc.z;\n        float depth = (2.0 * near * far) / (far + near - ndcZ * (far - near));\n        float clampedFar = max(splatTexFar, splatTexNear);\n        float clampedDepth = clamp(depth, splatTexNear, clampedFar);\n        float logDepth = log2(clampedDepth + 1.0);\n        float logNear = log2(splatTexNear + 1.0);\n        float logFar = log2(clampedFar + 1.0);\n\n        float texZ;\n        if (splatTexMid > 0.0) {\n            float clampedMid = clamp(splatTexMid, splatTexNear, clampedFar);\n            float logMid = log2(clampedMid + 1.0);\n            texZ = (clampedDepth <= clampedMid) ?\n                (0.5 * ((logDepth - logNear) / (logMid - logNear))) :\n                (0.5 * ((logDepth - logMid) / (logFar - logMid)) + 0.5);\n        } else {\n            texZ = (logDepth - logNear) / (logFar - logNear);\n        }\n\n        vec4 modulate = texture(splatTexture, vec3(uv, 1.0 - texZ));\n        rgba *= modulate;\n    }\n\n    rgba.a *= mix(1.0, exp(-0.5 * z), falloff);\n\n    if (rgba.a < MIN_ALPHA) {\n        discard;\n    }\n    if (encodeLinear) {\n        rgba.rgb = srgbToLinear(rgba.rgb);\n    }\n    fragColor = rgba;\n}";
var splatVertex_default = "precision highp float;\nprecision highp int;\nprecision highp usampler2DArray;\n\n#include <splatDefines>\n\nattribute uint splatIndex;\n\nout vec4 vRgba;\nout vec2 vSplatUv;\nout vec3 vNdc;\n\nuniform vec2 renderSize;\nuniform uint numSplats;\nuniform vec4 renderToViewQuat;\nuniform vec3 renderToViewPos;\nuniform float maxStdDev;\nuniform float time;\nuniform float deltaTime;\nuniform bool debugFlag;\nuniform bool enable2DGS;\nuniform float blurAmount;\nuniform float preBlurAmount;\nuniform float focalDistance;\nuniform float apertureAngle;\nuniform float clipXY;\nuniform float focalAdjustment;\n\nuniform usampler2DArray packedSplats;\n\nvoid main() {\n    \n    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);\n\n    if (uint(gl_InstanceID) >= numSplats) {\n        return;\n    }\n    if (splatIndex == 0xffffffffu) {\n        \n        return;\n    }\n\n    ivec3 texCoord = ivec3(\n        splatIndex & SPLAT_TEX_WIDTH_MASK,\n        (splatIndex >> SPLAT_TEX_WIDTH_BITS) & SPLAT_TEX_HEIGHT_MASK,\n        splatIndex >> SPLAT_TEX_LAYER_BITS\n    );\n    uvec4 packed = texelFetch(packedSplats, texCoord, 0);\n\n    vec3 center, scales;\n    vec4 quaternion, rgba;\n    unpackSplat(packed, center, scales, quaternion, rgba);\n\n    if (rgba.a < MIN_ALPHA) {\n        return;\n    }\n    bvec3 zeroScales = equal(scales, vec3(0.0));\n    if (all(zeroScales)) {\n        return;\n    }\n\n    \n    vec3 viewCenter = quatVec(renderToViewQuat, center) + renderToViewPos;\n\n    \n    if (viewCenter.z >= 0.0) {\n        return;\n    }\n\n    \n    vec4 clipCenter = projectionMatrix * vec4(viewCenter, 1.0);\n\n    \n    if (abs(clipCenter.z) >= clipCenter.w) {\n        return;\n    }\n\n    \n    float clip = clipXY * clipCenter.w;\n    if (abs(clipCenter.x) > clip || abs(clipCenter.y) > clip) {\n        return;\n    }\n\n    \n    vec4 viewQuaternion = quatQuat(renderToViewQuat, quaternion);\n\n    if (enable2DGS && any(zeroScales)) {\n        vRgba = rgba;\n        vSplatUv = position.xy * maxStdDev;\n\n        vec3 offset;\n        if (zeroScales.z) {\n            offset = vec3(vSplatUv.xy * scales.xy, 0.0);\n        } else if (zeroScales.y) {\n            offset = vec3(vSplatUv.x * scales.x, 0.0, vSplatUv.y * scales.z);\n        } else {\n            offset = vec3(0.0, vSplatUv.xy * scales.yz);\n        }\n\n        vec3 viewPos = viewCenter + quatVec(viewQuaternion, offset);\n        gl_Position = projectionMatrix * vec4(viewPos, 1.0);\n        vNdc = gl_Position.xyz / gl_Position.w;\n        return;\n    }\n\n    \n    vec3 ndcCenter = clipCenter.xyz / clipCenter.w;\n\n    \n    mat3 RS = scaleQuaternionToMatrix(scales, viewQuaternion);\n    mat3 cov3D = RS * transpose(RS);\n\n    \n    vec2 scaledRenderSize = renderSize * focalAdjustment;\n    vec2 focal = 0.5 * scaledRenderSize * vec2(projectionMatrix[0][0], projectionMatrix[1][1]);\n    float invZ = 1.0 / viewCenter.z;\n    vec2 J1 = focal * invZ;\n    vec2 J2 = -(J1 * viewCenter.xy) * invZ;\n    mat3 J = mat3(\n        J1.x, 0.0, J2.x,\n        0.0, J1.y, J2.y,\n        0.0, 0.0, 0.0\n    );\n\n    \n    \n    \n    \n    \n    \n    \n    mat3 cov2D = transpose(J) * cov3D * J;\n    float a = cov2D[0][0];\n    float d = cov2D[1][1];\n    float b = cov2D[0][1];\n\n    \n    a += preBlurAmount;\n    d += preBlurAmount;\n\n    float fullBlurAmount = blurAmount;\n    if ((focalDistance > 0.0) && (apertureAngle > 0.0)) {\n        float focusRadius = MAX_PIXEL_RADIUS;\n        if (viewCenter.z < 0.0) {\n            float focusBlur = abs((-viewCenter.z - focalDistance) / viewCenter.z);\n            float apertureRadius = focal.x * tan(0.5 * apertureAngle);\n            focusRadius = focusBlur * apertureRadius;\n        }\n        fullBlurAmount = clamp(sqr(focusRadius), blurAmount, sqr(MAX_PIXEL_RADIUS));\n    }\n\n    \n    float detOrig = a * d - b * b;\n    a += fullBlurAmount;\n    d += fullBlurAmount;\n    float det = a * d - b * b;\n\n    \n    float blurAdjust = sqrt(max(0.0, detOrig / det));\n    rgba.a *= blurAdjust;\n    if (rgba.a < MIN_ALPHA) {\n        return;\n    }\n\n    \n    float eigenAvg = 0.5 * (a + d);\n    float eigenDelta = sqrt(max(0.0, eigenAvg * eigenAvg - det));\n    float eigen1 = eigenAvg + eigenDelta;\n    float eigen2 = eigenAvg - eigenDelta;\n\n    vec2 eigenVec1 = normalize(vec2((abs(b) < 0.001) ? 1.0 : b, eigen1 - a));\n    vec2 eigenVec2 = vec2(eigenVec1.y, -eigenVec1.x);\n\n    float scale1 = position.x * min(MAX_PIXEL_RADIUS, maxStdDev * sqrt(eigen1));\n    float scale2 = position.y * min(MAX_PIXEL_RADIUS, maxStdDev * sqrt(eigen2));\n\n    \n    vec2 pixelOffset = eigenVec1 * scale1 + eigenVec2 * scale2;\n    vec2 ndcOffset = (2.0 / scaledRenderSize) * pixelOffset;\n    vec3 ndc = vec3(ndcCenter.xy + ndcOffset, ndcCenter.z);\n\n    vRgba = rgba;\n    vSplatUv = position.xy * maxStdDev;\n    vNdc = ndc;\n    gl_Position = vec4(ndc.xy * clipCenter.w, clipCenter.zw);\n}";
let shaders = null;
function getShaders() {
  if (!shaders) {
    THREE.ShaderChunk.splatDefines = splatDefines_default;
    shaders = {
      splatVertex: splatVertex_default,
      splatFragment: splatFragment_default
    };
  }
  return shaders;
}
const MAX_ACCUMULATORS = 5;
let hasSplatMesh = false;
let hasSparkRenderer = false;
let sparkRendererInstance;
function containsSplatMesh(object3D) {
  let hasSplatMesh2 = false;
  if (object3D instanceof SplatMesh) {
    return true;
  }
  object3D.traverse((child) => {
    hasSplatMesh2 = hasSplatMesh2 || child instanceof SplatMesh;
  });
  return hasSplatMesh2;
}
const sceneAdd = THREE.Scene.prototype.add;
THREE.Scene.prototype.add = function(object) {
  hasSplatMesh = hasSplatMesh || containsSplatMesh(object);
  hasSparkRenderer = hasSparkRenderer || object instanceof SparkRenderer;
  sceneAdd.call(this, object);
  return this;
};
const sceneOnBeforeRender = THREE.Scene.prototype.onBeforeRender;
THREE.Scene.prototype.onBeforeRender = function(renderer) {
  if (!hasSplatMesh) {
    return;
  }
  if (!hasSparkRenderer) {
    const spark = sparkRendererInstance || new SparkRenderer({ renderer });
    this.add(spark);
  }
  THREE.Scene.prototype.onBeforeRender = sceneOnBeforeRender;
  THREE.Scene.prototype.add = sceneAdd;
};
const _SparkRenderer = class _SparkRenderer extends THREE.Mesh {
  constructor(options) {
    const uniforms = _SparkRenderer.makeUniforms();
    const shaders2 = getShaders();
    const materialParams = {
      glslVersion: THREE.GLSL3,
      vertexShader: shaders2.splatVertex,
      fragmentShader: shaders2.splatFragment,
      uniforms,
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide
    };
    const material = new THREE.ShaderMaterial(options.material ? options.material(materialParams) : materialParams);
    super(EMPTY_GEOMETRY, material);
    this.splatTexture = null;
    this.autoViewpoints = [];
    this.rotateToAccumulator = new DynoVec4({ value: new THREE.Quaternion() });
    this.translateToAccumulator = new DynoVec3({ value: new THREE.Vector3() });
    this.lastFrame = -1;
    this.lastUpdateTime = null;
    this.defaultCameras = [];
    this.pendingUpdate = null;
    this.envViewpoint = null;
    this.frustumCulled = false;
    this.renderer = options.renderer;
    this.material = material;
    this.uniforms = uniforms;
    const modifier = dynoBlock(
      { gsplat: Gsplat },
      { gsplat: Gsplat },
      ({ gsplat }) => {
        if (!gsplat) {
          throw new Error("gsplat not defined");
        }
        gsplat = transformGsplat(gsplat, {
          rotate: this.rotateToAccumulator,
          translate: this.translateToAccumulator
        });
        return { gsplat };
      }
    );
    this.modifier = new SplatModifier(modifier);
    this.autoUpdate = options.autoUpdate ?? true;
    this.preUpdate = options.preUpdate ?? false;
    this.originDistance = options.originDistance ?? 1;
    this.maxStdDev = options.maxStdDev ?? Math.sqrt(8);
    this.enable2DGS = options.enable2DGS ?? false;
    this.preBlurAmount = options.preBlurAmount ?? 0;
    this.blurAmount = options.blurAmount ?? 0.3;
    this.focalDistance = options.focalDistance ?? 0;
    this.apertureAngle = options.apertureAngle ?? 0;
    this.falloff = options.falloff ?? 1;
    this.clipXY = options.clipXY ?? 1.4;
    this.focalAdjustment = options.focalAdjustment ?? 1;
    this.active = new SplatAccumulator();
    this.accumulatorCount = 1;
    this.freeAccumulators = [];
    for (let count = 0; count < 1; ++count) {
      this.freeAccumulators.push(new SplatAccumulator());
      this.accumulatorCount += 1;
    }
    this.defaultView = new SparkViewpoint({
      ...options.view,
      autoUpdate: true,
      spark: this
    });
    this.viewpoint = this.defaultView;
    this.prepareViewpoint(this.viewpoint);
    this.clock = options.clock ? cloneClock(options.clock) : new THREE.Clock();
    sparkRendererInstance = this;
  }
  static makeUniforms() {
    const uniforms = {
      // Size of render viewport in pixels
      renderSize: { value: new THREE.Vector2() },
      // Near and far plane distances
      near: { value: 0.1 },
      far: { value: 1e3 },
      // Total number of Gsplats in packedSplats to render
      numSplats: { value: 0 },
      // SplatAccumulator to view transformation quaternion
      renderToViewQuat: { value: new THREE.Quaternion() },
      // SplatAccumulator to view transformation translation
      renderToViewPos: { value: new THREE.Vector3() },
      // Maximum distance (in stddevs) from Gsplat center to render
      maxStdDev: { value: 1 },
      // Enable interpreting 0-thickness Gsplats as 2DGS
      enable2DGS: { value: false },
      // Add to projected 2D splat covariance diagonal (thickens and brightens)
      preBlurAmount: { value: 0 },
      // Add to 2D splat covariance diagonal and adjust opacity (anti-aliasing)
      blurAmount: { value: 0.3 },
      // Depth-of-field distance to focal plane
      focalDistance: { value: 0 },
      // Full-width angle of aperture opening (in radians)
      apertureAngle: { value: 0 },
      // Modulate Gaussian kernal falloff. 0 means "no falloff, flat shading",
      // 1 is normal e^-x^2 falloff.
      falloff: { value: 1 },
      // Clip Gsplats that are clipXY times beyond the +-1 frustum bounds
      clipXY: { value: 1.4 },
      // Debug renderSize scale factor
      focalAdjustment: { value: 1 },
      // Enable splat texture rendering
      splatTexEnable: { value: false },
      // Splat texture to render
      splatTexture: { type: "t", value: _SparkRenderer.EMPTY_SPLAT_TEXTURE },
      // Splat texture UV transform (multiply)
      splatTexMul: { value: new THREE.Matrix2() },
      // Splat texture UV transform (add)
      splatTexAdd: { value: new THREE.Vector2() },
      // Splat texture near plane distance
      splatTexNear: { value: 0.1 },
      // Splat texture far plane distance
      splatTexFar: { value: 1e3 },
      // Splat texture mid plane distance, or 0.0 to disable
      splatTexMid: { value: 0 },
      // Gsplat collection to render
      packedSplats: { type: "t", value: PackedSplats.getEmpty() },
      // Time in seconds for time-based effects
      time: { value: 0 },
      // Delta time in seconds since last frame
      deltaTime: { value: 0 },
      // Whether to encode Gsplat with linear RGB (for environment mapping)
      encodeLinear: { value: false },
      // Debug flag that alternates each frame
      debugFlag: { value: false }
    };
    return uniforms;
  }
  canAllocAccumulator() {
    return this.freeAccumulators.length > 0 || this.accumulatorCount < MAX_ACCUMULATORS;
  }
  maybeAllocAccumulator() {
    let accumulator = this.freeAccumulators.pop();
    if (accumulator === void 0) {
      if (this.accumulatorCount >= MAX_ACCUMULATORS) {
        return null;
      }
      accumulator = new SplatAccumulator();
      this.accumulatorCount += 1;
    }
    accumulator.refCount = 1;
    return accumulator;
  }
  releaseAccumulator(accumulator) {
    accumulator.refCount -= 1;
    if (accumulator.refCount === 0) {
      this.freeAccumulators.push(accumulator);
    }
  }
  newViewpoint(options) {
    return new SparkViewpoint({ ...options, spark: this });
  }
  onBeforeRender(renderer, scene, camera) {
    var _a2, _b2;
    const time = this.time ?? this.clock.getElapsedTime();
    const deltaTime = time - (this.viewpoint.lastTime ?? time);
    this.viewpoint.lastTime = time;
    const frame = renderer.info.render.frame;
    const isNewFrame = frame !== this.lastFrame;
    this.lastFrame = frame;
    const viewpoint = this.viewpoint;
    if (viewpoint === this.defaultView) {
      if (isNewFrame) {
        if (!renderer.xr.isPresenting) {
          this.defaultView.viewToWorld = camera.matrixWorld.clone();
          this.defaultCameras = [this.defaultView.viewToWorld];
        } else {
          const cameras = renderer.xr.getCamera().cameras;
          this.defaultCameras = cameras.map((camera2) => camera2.matrixWorld);
          this.defaultView.viewToWorld = averageOriginToWorlds(this.defaultCameras) ?? new THREE.Matrix4();
        }
      }
      if (this.autoUpdate) {
        this.update({ scene, viewToWorld: this.defaultView.viewToWorld });
      }
    }
    if (isNewFrame) {
      this.uniforms.time.value = time;
      this.uniforms.deltaTime.value = deltaTime;
      this.uniforms.debugFlag.value = performance.now() / 1e3 % 2 < 1;
    }
    if (viewpoint.target) {
      this.uniforms.renderSize.value.set(
        viewpoint.target.width,
        viewpoint.target.height
      );
    } else {
      const renderSize = renderer.getDrawingBufferSize(
        this.uniforms.renderSize.value
      );
      if (renderSize.x === 1 && renderSize.y === 1) {
        const baseLayer = (_a2 = renderer.xr.getSession()) == null ? void 0 : _a2.renderState.baseLayer;
        if (baseLayer) {
          renderSize.x = baseLayer.framebufferWidth;
          renderSize.y = baseLayer.framebufferHeight;
        }
      }
    }
    const typedCamera = camera;
    this.uniforms.near.value = typedCamera.near;
    this.uniforms.far.value = typedCamera.far;
    this.uniforms.encodeLinear.value = viewpoint.encodeLinear;
    this.uniforms.maxStdDev.value = this.maxStdDev;
    this.uniforms.enable2DGS.value = this.enable2DGS;
    this.uniforms.preBlurAmount.value = this.preBlurAmount;
    this.uniforms.blurAmount.value = this.blurAmount;
    this.uniforms.focalDistance.value = this.focalDistance;
    this.uniforms.apertureAngle.value = this.apertureAngle;
    this.uniforms.falloff.value = this.falloff;
    this.uniforms.clipXY.value = this.clipXY;
    this.uniforms.focalAdjustment.value = this.focalAdjustment;
    if (this.splatTexture) {
      const { enable, texture: texture2, multiply, add: add2, near, far, mid } = this.splatTexture;
      if (enable && texture2) {
        this.uniforms.splatTexEnable.value = true;
        this.uniforms.splatTexture.value = texture2;
        if (multiply) {
          this.uniforms.splatTexMul.value.fromArray(multiply.elements);
        } else {
          this.uniforms.splatTexMul.value.set(
            0.5 / this.maxStdDev,
            0,
            0,
            0.5 / this.maxStdDev
          );
        }
        this.uniforms.splatTexAdd.value.set((add2 == null ? void 0 : add2.x) ?? 0.5, (add2 == null ? void 0 : add2.y) ?? 0.5);
        this.uniforms.splatTexNear.value = near ?? this.uniforms.near.value;
        this.uniforms.splatTexFar.value = far ?? this.uniforms.far.value;
        this.uniforms.splatTexMid.value = mid ?? 0;
      } else {
        this.uniforms.splatTexEnable.value = false;
        this.uniforms.splatTexture.value = _SparkRenderer.EMPTY_SPLAT_TEXTURE;
      }
    } else {
      this.uniforms.splatTexEnable.value = false;
      this.uniforms.splatTexture.value = _SparkRenderer.EMPTY_SPLAT_TEXTURE;
    }
    const accumToWorld = ((_b2 = viewpoint.display) == null ? void 0 : _b2.accumulator.toWorld) ?? new THREE.Matrix4();
    const worldToCamera = camera.matrixWorld.clone().invert();
    const originToCamera = accumToWorld.clone().premultiply(worldToCamera);
    originToCamera.decompose(
      this.uniforms.renderToViewPos.value,
      this.uniforms.renderToViewQuat.value,
      new THREE.Vector3()
    );
  }
  // Update the uniforms for the given viewpoint.
  // Note that the client expects to be able to call render() at any point
  // to update the canvas, so we must switch the viewpoint back to
  // defaultView when we're finished.
  prepareViewpoint(viewpoint) {
    this.viewpoint = viewpoint ?? this.viewpoint;
    if (this.viewpoint.display) {
      const { accumulator, geometry } = this.viewpoint.display;
      this.uniforms.numSplats.value = accumulator.splats.numSplats;
      this.uniforms.packedSplats.value = accumulator.splats.getTexture();
      this.geometry = geometry;
    } else {
      this.uniforms.numSplats.value = 0;
      this.uniforms.packedSplats.value = PackedSplats.getEmpty();
      this.geometry = EMPTY_GEOMETRY;
    }
  }
  // If spark.autoUpdate is false then you must manually call
  // spark.update({ scene }) to have the scene Gsplats be re-generated.
  update({
    scene,
    viewToWorld
  }) {
    const originToWorld = this.matrixWorld.clone();
    if (this.preUpdate) {
      this.updateInternal({ scene, originToWorld, viewToWorld });
    } else {
      this.pendingUpdate = {
        scene,
        originToWorld
      };
      setTimeout(() => {
        if (this.pendingUpdate) {
          const { scene: scene2, originToWorld: originToWorld2 } = this.pendingUpdate;
          this.pendingUpdate = null;
          this.updateInternal({ scene: scene2, originToWorld: originToWorld2, viewToWorld });
        }
      }, 1);
    }
  }
  updateInternal({
    scene,
    originToWorld,
    viewToWorld
  }) {
    var _a2;
    if (!this.canAllocAccumulator()) {
      return false;
    }
    if (!originToWorld) {
      originToWorld = this.active.toWorld;
    }
    viewToWorld = viewToWorld ?? originToWorld.clone();
    const time = this.time ?? this.clock.getElapsedTime();
    const deltaTime = time - (this.lastUpdateTime ?? time);
    this.lastUpdateTime = time;
    const activeMapping = this.active.mapping.reduce((map, record) => {
      map.set(record.node, record);
      return map;
    }, /* @__PURE__ */ new Map());
    const { generators: generators2, visibleGenerators, globalEdits } = this.compileScene(scene);
    for (const object of generators2) {
      (_a2 = object.frameUpdate) == null ? void 0 : _a2.call(object, {
        object,
        time,
        deltaTime,
        viewToWorld,
        globalEdits
      });
    }
    const visibleGenHash = new Set(visibleGenerators.map((g) => g.uuid));
    for (const object of generators2) {
      const current = activeMapping.get(object);
      const isVisible = object.generator && visibleGenHash.has(object.uuid);
      const numSplats = isVisible ? object.numSplats : 0;
      if (object.generator !== (current == null ? void 0 : current.generator) || numSplats !== (current == null ? void 0 : current.count)) {
        object.updateVersion();
      }
    }
    const originUpdate = !withinCoorientDist({
      matrix1: originToWorld,
      matrix2: this.active.toWorld,
      maxDistance: this.originDistance
    });
    const needsUpdate = originUpdate || generators2.length !== activeMapping.size || generators2.some((g) => {
      var _a3;
      return g.version !== ((_a3 = activeMapping.get(g)) == null ? void 0 : _a3.version);
    });
    let accumulator = null;
    if (needsUpdate) {
      accumulator = this.maybeAllocAccumulator();
      if (!accumulator) {
        throw new Error("Unreachable");
      }
      const originChanged = !withinCoorientDist({
        matrix1: originToWorld,
        matrix2: this.active.toWorld,
        maxDistance: 1e-5,
        minCoorient: 0.99999
      });
      const sorted = visibleGenerators.map((g, gIndex) => {
        const lastGen = activeMapping.get(g);
        return !lastGen ? [Number.POSITIVE_INFINITY, g.version, g] : (
          // Sort by version deltas then by previous ordering in the mapping,
          // attempting to keep unchanging generators near the front
          // to improve our chances of avoiding a re-generation.
          [g.version - lastGen.version, lastGen.base, g]
        );
      }).sort((a, b) => {
        if (a[0] !== b[0]) {
          return a[0] - b[0];
        }
        return a[1] - b[1];
      });
      const genOrder = sorted.map(([_version, _seq, g]) => g);
      const splatCounts = genOrder.map((g) => g.numSplats);
      const { maxSplats, mapping } = accumulator.splats.generateMapping(splatCounts);
      const newGenerators = genOrder.map((node, gIndex) => {
        const { base, count } = mapping[gIndex];
        return {
          node,
          generator: node.generator,
          version: node.version,
          base,
          count
        };
      });
      originToWorld.clone().invert().decompose(
        this.translateToAccumulator.value,
        this.rotateToAccumulator.value,
        new THREE.Vector3()
      );
      accumulator.ensureGenerate(maxSplats);
      accumulator.generateSplats({
        renderer: this.renderer,
        modifier: this.modifier,
        generators: newGenerators,
        forceUpdate: originChanged,
        originToWorld
      });
      accumulator.splatsVersion = this.active.splatsVersion + 1;
      const hasCorrespondence = accumulator.hasCorrespondence(this.active);
      accumulator.mappingVersion = this.active.mappingVersion + (hasCorrespondence ? 0 : 1);
      this.releaseAccumulator(this.active);
      this.active = accumulator;
      this.prepareViewpoint();
    }
    setTimeout(() => {
      for (const view of this.autoViewpoints) {
        view.autoPoll({ accumulator: accumulator ?? void 0 });
      }
    }, 1);
    return true;
  }
  compileScene(scene) {
    const generators2 = [];
    scene.traverse((node) => {
      if (node instanceof SplatGenerator) {
        generators2.push(node);
      }
    });
    const visibleGenerators = [];
    scene.traverseVisible((node) => {
      if (node instanceof SplatGenerator) {
        visibleGenerators.push(node);
      }
    });
    const globalEdits = /* @__PURE__ */ new Set();
    scene.traverseVisible((node) => {
      if (node instanceof SplatEdit) {
        let ancestor = node.parent;
        while (ancestor != null && !(ancestor instanceof SplatMesh)) {
          ancestor = ancestor.parent;
        }
        if (ancestor == null) {
          globalEdits.add(node);
        }
      }
    });
    return {
      generators: generators2,
      visibleGenerators,
      globalEdits: Array.from(globalEdits)
    };
  }
  // Renders out the scene to an environment map that can be used for
  // Image-based lighting or similar applications. First optionally updates Gsplats,
  // sorts them with respect to the provided worldCenter, renders 6 cube faces,
  // then pre-filters them using THREE.PMREMGenerator and returns a THREE.Texture
  // that can assigned directly to a THREE.MeshStandardMaterial.envMap property.
  async renderEnvMap({
    renderer,
    scene,
    worldCenter,
    size = 256,
    near = 0.1,
    far = 1e3,
    hideObjects = [],
    update = false
  }) {
    var _a2, _b2;
    if (!this.envViewpoint) {
      this.envViewpoint = this.newViewpoint({ sort360: true });
    }
    if (!_SparkRenderer.cubeRender || _SparkRenderer.cubeRender.target.width !== size || _SparkRenderer.cubeRender.near !== near || _SparkRenderer.cubeRender.far !== far) {
      if (_SparkRenderer.cubeRender) {
        _SparkRenderer.cubeRender.target.dispose();
      }
      const target2 = new THREE.WebGLCubeRenderTarget(size, {
        format: THREE.RGBAFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipMapLinearFilter
      });
      const camera2 = new THREE.CubeCamera(near, far, target2);
      _SparkRenderer.cubeRender = { target: target2, camera: camera2, near, far };
    }
    if (!_SparkRenderer.pmrem) {
      _SparkRenderer.pmrem = new THREE.PMREMGenerator(renderer ?? this.renderer);
    }
    const viewToWorld = new THREE.Matrix4().setPosition(worldCenter);
    await ((_a2 = this.envViewpoint) == null ? void 0 : _a2.prepare({ scene, viewToWorld, update }));
    const { target, camera } = _SparkRenderer.cubeRender;
    camera.position.copy(worldCenter);
    const objectVisibility = /* @__PURE__ */ new Map();
    for (const object of hideObjects) {
      objectVisibility.set(object, object.visible);
      object.visible = false;
    }
    this.prepareViewpoint(this.envViewpoint);
    camera.update(renderer ?? this.renderer, scene);
    this.prepareViewpoint(this.defaultView);
    for (const [object, visible] of objectVisibility.entries()) {
      object.visible = visible;
    }
    return (_b2 = _SparkRenderer.pmrem) == null ? void 0 : _b2.fromCubemap(target.texture).texture;
  }
  // Utility function to recursively set the envMap property for any
  // THREE.MeshStandardMaterial within the subtree of root.
  recurseSetEnvMap(root, envMap) {
    root.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        if (Array.isArray(node.material)) {
          for (const material of node.material) {
            if (material instanceof THREE.MeshStandardMaterial) {
              material.envMap = envMap;
            }
          }
        } else {
          if (node.material instanceof THREE.MeshStandardMaterial) {
            node.material.envMap = envMap;
          }
        }
      }
    });
  }
  // Utility function that helps extract the Gsplat RGBA values from a
  // SplatGenerator, including the result of any real-time RGBA SDF edits applied
  // to a SplatMesh. This effectively "bakes" any computed RGBA values, which can
  // now be used as a pipeline input via SplatMesh.splatRgba to inject these
  // baked values into the Gsplat data.
  getRgba({
    generator,
    rgba
  }) {
    const mapping = this.active.mapping.find(({ node }) => node === generator);
    if (!mapping) {
      throw new Error("Generator not found");
    }
    rgba = rgba ?? new RgbaArray();
    rgba.fromPackedSplats({
      packedSplats: this.active.splats,
      base: mapping.base,
      count: mapping.count,
      renderer: this.renderer
    });
    return rgba;
  }
  // Utility function that builds on getRgba({ generator }) and additionally
  // reads back the RGBA values to the CPU in a Uint8Array with packed RGBA
  // in that byte order.
  async readRgba({
    generator,
    rgba
  }) {
    rgba = this.getRgba({ generator, rgba });
    return rgba.read();
  }
};
_SparkRenderer.cubeRender = null;
_SparkRenderer.pmrem = null;
_SparkRenderer.EMPTY_SPLAT_TEXTURE = new THREE.Data3DTexture();
let SparkRenderer = _SparkRenderer;
const EMPTY_GEOMETRY = new SplatGeometry(new Uint32Array(1), 0);
dynoBlock(
  { packedSplats: TPackedSplats, index: "int" },
  { gsplat: Gsplat },
  ({ packedSplats, index }) => {
    if (!packedSplats || !index) {
      throw new Error("Invalid input");
    }
    const gsplat = readPackedSplat(packedSplats, index);
    return { gsplat };
  }
);
function averageOriginToWorlds(originToWorlds) {
  if (originToWorlds.length === 0) {
    return null;
  }
  const position = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const positions = [];
  const quaternions = [];
  for (const matrix of originToWorlds) {
    matrix.decompose(position, quaternion, scale);
    positions.push(position);
    quaternions.push(quaternion);
  }
  return new THREE.Matrix4().compose(
    averagePositions(positions),
    averageQuaternions(quaternions),
    new THREE.Vector3(1, 1, 1)
  );
}
function decodeAntiSplat(fileBytes, initNumSplats, splatCallback) {
  const numSplats = Math.floor(fileBytes.length / 32);
  if (numSplats * 32 !== fileBytes.length) {
    throw new Error("Invalid .splat file size");
  }
  const f32 = new Float32Array(fileBytes.buffer);
  for (let i = 0; i < numSplats; ++i) {
    const i322 = i * 32;
    const i8 = i * 8;
    const x = f32[i8 + 0];
    const y = f32[i8 + 1];
    const z = f32[i8 + 2];
    const scaleX = f32[i8 + 3];
    const scaleY = f32[i8 + 4];
    const scaleZ = f32[i8 + 5];
    const r = fileBytes[i322 + 24] / 255;
    const g = fileBytes[i322 + 25] / 255;
    const b = fileBytes[i322 + 26] / 255;
    const opacity = fileBytes[i322 + 27] / 255;
    const quatW = (fileBytes[i322 + 28] - 128) / 128;
    const quatX = (fileBytes[i322 + 29] - 128) / 128;
    const quatY = (fileBytes[i322 + 30] - 128) / 128;
    const quatZ = (fileBytes[i322 + 31] - 128) / 128;
    splatCallback(
      i,
      x,
      y,
      z,
      scaleX,
      scaleY,
      scaleZ,
      quatX,
      quatY,
      quatZ,
      quatW,
      opacity,
      r,
      g,
      b
    );
  }
}
const KSPLAT_COMPRESSION = {
  0: {
    bytesPerCenter: 12,
    bytesPerScale: 12,
    bytesPerRotation: 16,
    bytesPerColor: 4,
    bytesPerSphericalHarmonicsComponent: 4,
    scaleOffsetBytes: 12,
    rotationOffsetBytes: 24,
    colorOffsetBytes: 40,
    sphericalHarmonicsOffsetBytes: 44,
    scaleRange: 1
  },
  1: {
    bytesPerCenter: 6,
    bytesPerScale: 6,
    bytesPerRotation: 8,
    bytesPerColor: 4,
    bytesPerSphericalHarmonicsComponent: 2,
    scaleOffsetBytes: 6,
    rotationOffsetBytes: 12,
    colorOffsetBytes: 20,
    sphericalHarmonicsOffsetBytes: 24,
    scaleRange: 32767
  },
  2: {
    bytesPerCenter: 6,
    bytesPerScale: 6,
    bytesPerRotation: 8,
    bytesPerColor: 4,
    bytesPerSphericalHarmonicsComponent: 1,
    scaleOffsetBytes: 6,
    rotationOffsetBytes: 12,
    colorOffsetBytes: 20,
    sphericalHarmonicsOffsetBytes: 24,
    scaleRange: 32767
  }
};
const KSPLAT_SH_DEGREE_TO_COMPONENTS = {
  0: 0,
  1: 9,
  2: 24,
  3: 45
};
function decodeKsplat(fileBytes, initNumSplats, splatCallback, shCallback) {
  var _a2;
  const HEADER_BYTES = 4096;
  const SECTION_BYTES = 1024;
  let headerOffset = 0;
  const header = new DataView(fileBytes.buffer, headerOffset, HEADER_BYTES);
  headerOffset += HEADER_BYTES;
  const versionMajor = header.getUint8(0);
  const versionMinor = header.getUint8(1);
  if (versionMajor !== 0 || versionMinor < 1) {
    throw new Error(
      `Unsupported .ksplat version: ${versionMajor}.${versionMinor}`
    );
  }
  const maxSectionCount = header.getUint32(4, true);
  header.getUint32(16, true);
  const compressionLevel = header.getUint16(20, true);
  if (compressionLevel < 0 || compressionLevel > 2) {
    throw new Error(`Invalid .ksplat compression level: ${compressionLevel}`);
  }
  const minSphericalHarmonicsCoeff = header.getFloat32(36, true) || -1.5;
  const maxSphericalHarmonicsCoeff = header.getFloat32(40, true) || 1.5;
  let sectionBase = HEADER_BYTES + maxSectionCount * SECTION_BYTES;
  for (let section = 0; section < maxSectionCount; ++section) {
    let getSh = function(splatOffset, component) {
      if (compressionLevel === 0) {
        return data.getFloat32(
          splatOffset + sphericalHarmonicsOffsetBytes + component * 4,
          true
        );
      }
      if (compressionLevel === 1) {
        return fromHalf(
          data.getUint16(
            splatOffset + sphericalHarmonicsOffsetBytes + component * 2,
            true
          )
        );
      }
      const t = data.getUint8(splatOffset + sphericalHarmonicsOffsetBytes + component) / 255;
      return minSphericalHarmonicsCoeff + t * (maxSphericalHarmonicsCoeff - minSphericalHarmonicsCoeff);
    };
    const section2 = new DataView(fileBytes.buffer, headerOffset, SECTION_BYTES);
    headerOffset += SECTION_BYTES;
    const sectionSplatCount = section2.getUint32(0, true);
    const sectionMaxSplatCount = section2.getUint32(4, true);
    const bucketSize = section2.getUint32(8, true);
    const bucketCount = section2.getUint32(12, true);
    const bucketBlockSize = section2.getFloat32(16, true);
    const bucketStorageSizeBytes = section2.getUint16(20, true);
    const compressionScaleRange = (section2.getUint32(24, true) || ((_a2 = KSPLAT_COMPRESSION[compressionLevel]) == null ? void 0 : _a2.scaleRange)) ?? 1;
    const fullBucketCount = section2.getUint32(32, true);
    const fullBucketSplats = fullBucketCount * bucketSize;
    const partiallyFilledBucketCount = section2.getUint32(36, true);
    const bucketsMetaDataSizeBytes = partiallyFilledBucketCount * 4;
    const bucketsStorageSizeBytes = bucketStorageSizeBytes * bucketCount + bucketsMetaDataSizeBytes;
    const sphericalHarmonicsDegree = section2.getUint16(40, true);
    const shComponents = KSPLAT_SH_DEGREE_TO_COMPONENTS[sphericalHarmonicsDegree];
    const {
      bytesPerCenter,
      bytesPerScale,
      bytesPerRotation,
      bytesPerColor,
      bytesPerSphericalHarmonicsComponent,
      scaleOffsetBytes,
      rotationOffsetBytes,
      colorOffsetBytes,
      sphericalHarmonicsOffsetBytes
    } = KSPLAT_COMPRESSION[compressionLevel];
    const bytesPerSplat = bytesPerCenter + bytesPerScale + bytesPerRotation + bytesPerColor + shComponents * bytesPerSphericalHarmonicsComponent;
    const splatDataStorageSizeBytes = bytesPerSplat * sectionMaxSplatCount;
    const storageSizeBytes = splatDataStorageSizeBytes + bucketsStorageSizeBytes;
    const sh1Index = [0, 3, 6, 1, 4, 7, 2, 5, 8];
    const sh2Index = [
      9,
      14,
      19,
      10,
      15,
      20,
      11,
      16,
      21,
      12,
      17,
      22,
      13,
      18,
      23
    ];
    const sh3Index = [
      24,
      31,
      38,
      25,
      32,
      39,
      26,
      33,
      40,
      27,
      34,
      41,
      28,
      35,
      42,
      29,
      36,
      43,
      30,
      37,
      44
    ];
    const sh1 = sphericalHarmonicsDegree >= 1 ? new Float32Array(3 * 3) : void 0;
    const sh2 = sphericalHarmonicsDegree >= 2 ? new Float32Array(5 * 3) : void 0;
    const sh3 = sphericalHarmonicsDegree >= 3 ? new Float32Array(7 * 3) : void 0;
    const compressionScaleFactor = bucketBlockSize / 2 / compressionScaleRange;
    const bucketsBase = sectionBase + bucketsMetaDataSizeBytes;
    const dataBase = sectionBase + bucketsStorageSizeBytes;
    const data = new DataView(
      fileBytes.buffer,
      dataBase,
      splatDataStorageSizeBytes
    );
    const bucketArray = new Float32Array(
      fileBytes.buffer,
      bucketsBase,
      bucketCount * 3
    );
    const partiallyFilledBucketLengths = new Uint32Array(
      fileBytes.buffer,
      sectionBase,
      partiallyFilledBucketCount
    );
    let partialBucketIndex = fullBucketCount;
    let partialBucketBase = fullBucketSplats;
    for (let i = 0; i < sectionSplatCount; ++i) {
      const splatOffset = i * bytesPerSplat;
      let bucketIndex;
      if (i < fullBucketSplats) {
        bucketIndex = Math.floor(i / bucketSize);
      } else {
        const bucketLength = partiallyFilledBucketLengths[partialBucketIndex - fullBucketCount];
        if (i >= partialBucketBase + bucketLength) {
          partialBucketIndex += 1;
          partialBucketBase += bucketLength;
        }
        bucketIndex = partialBucketIndex;
      }
      const x = compressionLevel === 0 ? data.getFloat32(splatOffset + 0, true) : (data.getUint16(splatOffset + 0, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 0];
      const y = compressionLevel === 0 ? data.getFloat32(splatOffset + 4, true) : (data.getUint16(splatOffset + 2, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 1];
      const z = compressionLevel === 0 ? data.getFloat32(splatOffset + 8, true) : (data.getUint16(splatOffset + 4, true) - compressionScaleRange) * compressionScaleFactor + bucketArray[3 * bucketIndex + 2];
      const scaleX = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 0, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 0, true));
      const scaleY = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 4, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 2, true));
      const scaleZ = compressionLevel === 0 ? data.getFloat32(splatOffset + scaleOffsetBytes + 8, true) : fromHalf(data.getUint16(splatOffset + scaleOffsetBytes + 4, true));
      const quatW = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 0, true) : fromHalf(
        data.getUint16(splatOffset + rotationOffsetBytes + 0, true)
      );
      const quatX = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 4, true) : fromHalf(
        data.getUint16(splatOffset + rotationOffsetBytes + 2, true)
      );
      const quatY = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 8, true) : fromHalf(
        data.getUint16(splatOffset + rotationOffsetBytes + 4, true)
      );
      const quatZ = compressionLevel === 0 ? data.getFloat32(splatOffset + rotationOffsetBytes + 12, true) : fromHalf(
        data.getUint16(splatOffset + rotationOffsetBytes + 6, true)
      );
      const r = data.getUint8(splatOffset + colorOffsetBytes + 0) / 255;
      const g = data.getUint8(splatOffset + colorOffsetBytes + 1) / 255;
      const b = data.getUint8(splatOffset + colorOffsetBytes + 2) / 255;
      const opacity = data.getUint8(splatOffset + colorOffsetBytes + 3) / 255;
      splatCallback(
        i,
        x,
        y,
        z,
        scaleX,
        scaleY,
        scaleZ,
        quatX,
        quatY,
        quatZ,
        quatW,
        opacity,
        r,
        g,
        b
      );
      if (sphericalHarmonicsDegree >= 1 && sh1) {
        for (const [i2, key] of sh1Index.entries()) {
          sh1[i2] = getSh(splatOffset, key);
        }
        if (sh2) {
          for (const [i2, key] of sh2Index.entries()) {
            sh2[i2] = getSh(splatOffset, key);
          }
        }
        if (sh3) {
          for (const [i2, key] of sh3Index.entries()) {
            sh3[i2] = getSh(splatOffset, key);
          }
        }
        shCallback == null ? void 0 : shCallback(i, sh1, sh2, sh3);
      }
    }
    sectionBase += storageSizeBytes;
  }
}
class SpzReader {
  constructor({ fileBytes }) {
    this.fileBytes = fileBytes instanceof ArrayBuffer ? new Uint8Array(fileBytes) : fileBytes;
    this.reader = new GunzipReader({ fileBytes: this.fileBytes });
    const header = new DataView(this.reader.read(16).buffer);
    if (header.getUint32(0, true) !== 1347635022) {
      throw new Error("Invalid SPZ file");
    }
    this.version = header.getUint32(4, true);
    if (this.version < 1 || this.version > 2) {
      throw new Error(`Unsupported SPZ version: ${this.version}`);
    }
    this.numSplats = header.getUint32(8, true);
    this.shDegree = header.getUint8(12);
    this.fractionalBits = header.getUint8(13);
    this.flags = header.getUint8(14);
    this.flagAntiAlias = (this.flags & 1) !== 0;
    this.reserved = header.getUint8(15);
    this.parsed = false;
  }
  parseSplats(centerCallback, alphaCallback, rgbCallback, scalesCallback, quatCallback, shCallback) {
    if (this.parsed) {
      throw new Error("SPZ file already parsed");
    }
    this.parsed = true;
    if (this.version === 1) {
      const centerBytes = this.reader.read(this.numSplats * 3 * 2);
      const centerUint16 = new Uint16Array(centerBytes.buffer);
      for (let i = 0; i < this.numSplats; i++) {
        const i3 = i * 3;
        const x = fromHalf(centerUint16[i3]);
        const y = fromHalf(centerUint16[i3 + 1]);
        const z = fromHalf(centerUint16[i3 + 2]);
        centerCallback == null ? void 0 : centerCallback(i, x, y, z);
      }
    } else if (this.version === 2) {
      const fixed = 1 << this.fractionalBits;
      const centerBytes = this.reader.read(this.numSplats * 3 * 3);
      for (let i = 0; i < this.numSplats; i++) {
        const i9 = i * 9;
        const x = ((centerBytes[i9 + 2] << 24 | centerBytes[i9 + 1] << 16 | centerBytes[i9] << 8) >> 8) / fixed;
        const y = ((centerBytes[i9 + 5] << 24 | centerBytes[i9 + 4] << 16 | centerBytes[i9 + 3] << 8) >> 8) / fixed;
        const z = ((centerBytes[i9 + 8] << 24 | centerBytes[i9 + 7] << 16 | centerBytes[i9 + 6] << 8) >> 8) / fixed;
        centerCallback == null ? void 0 : centerCallback(i, x, y, z);
      }
    } else {
      throw new Error("Unreachable");
    }
    {
      const bytes = this.reader.read(this.numSplats);
      for (let i = 0; i < this.numSplats; i++) {
        alphaCallback == null ? void 0 : alphaCallback(i, bytes[i] / 255);
      }
    }
    {
      const rgbBytes = this.reader.read(this.numSplats * 3);
      const scale = SH_C0 / 0.15;
      for (let i = 0; i < this.numSplats; i++) {
        const i3 = i * 3;
        const r = (rgbBytes[i3] / 255 - 0.5) * scale + 0.5;
        const g = (rgbBytes[i3 + 1] / 255 - 0.5) * scale + 0.5;
        const b = (rgbBytes[i3 + 2] / 255 - 0.5) * scale + 0.5;
        rgbCallback == null ? void 0 : rgbCallback(i, r, g, b);
      }
    }
    {
      const scalesBytes = this.reader.read(this.numSplats * 3);
      for (let i = 0; i < this.numSplats; i++) {
        const i3 = i * 3;
        const scaleX = Math.exp(scalesBytes[i3] / 16 - 10);
        const scaleY = Math.exp(scalesBytes[i3 + 1] / 16 - 10);
        const scaleZ = Math.exp(scalesBytes[i3 + 2] / 16 - 10);
        scalesCallback == null ? void 0 : scalesCallback(i, scaleX, scaleY, scaleZ);
      }
    }
    {
      const quatBytes = this.reader.read(this.numSplats * 3);
      for (let i = 0; i < this.numSplats; i++) {
        const i3 = i * 3;
        const quatX = quatBytes[i3] / 127.5 - 1;
        const quatY = quatBytes[i3 + 1] / 127.5 - 1;
        const quatZ = quatBytes[i3 + 2] / 127.5 - 1;
        const quatW = Math.sqrt(
          Math.max(0, 1 - quatX * quatX - quatY * quatY - quatZ * quatZ)
        );
        quatCallback == null ? void 0 : quatCallback(i, quatX, quatY, quatZ, quatW);
      }
    }
    if (shCallback && this.shDegree >= 1) {
      const sh1 = new Float32Array(3 * 3);
      const sh2 = this.shDegree >= 2 ? new Float32Array(5 * 3) : void 0;
      const sh3 = this.shDegree >= 3 ? new Float32Array(7 * 3) : void 0;
      const shBytes = this.reader.read(
        this.numSplats * SH_DEGREE_TO_VECS[this.shDegree] * 3
      );
      let offset = 0;
      for (let i = 0; i < this.numSplats; i++) {
        for (let j = 0; j < 9; ++j) {
          sh1[j] = (shBytes[offset + j] - 128) / 128;
        }
        offset += 9;
        if (sh2) {
          for (let j = 0; j < 15; ++j) {
            sh2[j] = (shBytes[offset + j] - 128) / 128;
          }
          offset += 15;
        }
        if (sh3) {
          for (let j = 0; j < 21; ++j) {
            sh3[j] = (shBytes[offset + j] - 128) / 128;
          }
          offset += 21;
        }
        shCallback == null ? void 0 : shCallback(i, sh1, sh2, sh3);
      }
    }
  }
}
const SH_DEGREE_TO_VECS = { 1: 3, 2: 8, 3: 15 };
const SH_C0 = 0.28209479177387814;
const SPZ_MAGIC = 1347635022;
const SPZ_VERSION = 2;
const FLAG_ANTIALIASED = 1;
class SpzWriter {
  constructor({
    numSplats,
    shDegree,
    fractionalBits = 12,
    flagAntiAlias = true
  }) {
    this.clippedCount = 0;
    const splatSize = 9 + 1 + 3 + 3 + 3 + (shDegree >= 1 ? 9 : 0) + (shDegree >= 2 ? 15 : 0) + (shDegree >= 3 ? 21 : 0);
    const bufferSize = 16 + numSplats * splatSize;
    this.buffer = new ArrayBuffer(bufferSize);
    this.view = new DataView(this.buffer);
    this.view.setUint32(0, SPZ_MAGIC, true);
    this.view.setUint32(4, SPZ_VERSION, true);
    this.view.setUint32(8, numSplats, true);
    this.view.setUint8(12, shDegree);
    this.view.setUint8(13, fractionalBits);
    this.view.setUint8(14, flagAntiAlias ? FLAG_ANTIALIASED : 0);
    this.view.setUint8(15, 0);
    this.numSplats = numSplats;
    this.shDegree = shDegree;
    this.fractionalBits = fractionalBits;
    this.fraction = 1 << fractionalBits;
    this.flagAntiAlias = flagAntiAlias;
  }
  setCenter(index, x, y, z) {
    const xRounded = Math.round(x * this.fraction);
    const xInt = Math.max(-8388607, Math.min(8388607, xRounded));
    const yRounded = Math.round(y * this.fraction);
    const yInt = Math.max(-8388607, Math.min(8388607, yRounded));
    const zRounded = Math.round(z * this.fraction);
    const zInt = Math.max(-8388607, Math.min(8388607, zRounded));
    const clipped = xRounded !== xInt || yRounded !== yInt || zRounded !== zInt;
    if (clipped) {
      this.clippedCount += 1;
    }
    const i9 = index * 9;
    const base = 16 + i9;
    this.view.setUint8(base, xInt & 255);
    this.view.setUint8(base + 1, xInt >> 8 & 255);
    this.view.setUint8(base + 2, xInt >> 16 & 255);
    this.view.setUint8(base + 3, yInt & 255);
    this.view.setUint8(base + 4, yInt >> 8 & 255);
    this.view.setUint8(base + 5, yInt >> 16 & 255);
    this.view.setUint8(base + 6, zInt & 255);
    this.view.setUint8(base + 7, zInt >> 8 & 255);
    this.view.setUint8(base + 8, zInt >> 16 & 255);
  }
  setAlpha(index, alpha) {
    const base = 16 + this.numSplats * 9 + index;
    this.view.setUint8(
      base,
      Math.max(0, Math.min(255, Math.round(alpha * 255)))
    );
  }
  static scaleRgb(r) {
    const v = ((r - 0.5) / (SH_C0 / 0.15) + 0.5) * 255;
    return Math.max(0, Math.min(255, Math.round(v)));
  }
  setRgb(index, r, g, b) {
    const base = 16 + this.numSplats * 10 + index * 3;
    this.view.setUint8(base, SpzWriter.scaleRgb(r));
    this.view.setUint8(base + 1, SpzWriter.scaleRgb(g));
    this.view.setUint8(base + 2, SpzWriter.scaleRgb(b));
  }
  setScale(index, scaleX, scaleY, scaleZ) {
    const base = 16 + this.numSplats * 13 + index * 3;
    this.view.setUint8(
      base,
      Math.max(0, Math.min(255, Math.round((Math.log(scaleX) + 10) * 16)))
    );
    this.view.setUint8(
      base + 1,
      Math.max(0, Math.min(255, Math.round((Math.log(scaleY) + 10) * 16)))
    );
    this.view.setUint8(
      base + 2,
      Math.max(0, Math.min(255, Math.round((Math.log(scaleZ) + 10) * 16)))
    );
  }
  setQuat(index, quatX, quatY, quatZ, quatW) {
    const base = 16 + this.numSplats * 16 + index * 3;
    const quatNeg = quatW < 0;
    this.view.setUint8(
      base,
      Math.max(
        0,
        Math.min(255, Math.round(((quatNeg ? -quatX : quatX) + 1) * 127.5))
      )
    );
    this.view.setUint8(
      base + 1,
      Math.max(
        0,
        Math.min(255, Math.round(((quatNeg ? -quatY : quatY) + 1) * 127.5))
      )
    );
    this.view.setUint8(
      base + 2,
      Math.max(
        0,
        Math.min(255, Math.round(((quatNeg ? -quatZ : quatZ) + 1) * 127.5))
      )
    );
  }
  static quantizeSh(sh, bits2) {
    const value = Math.round(sh * 128) + 128;
    const bucketSize = 1 << 8 - bits2;
    const quantized = Math.floor((value + bucketSize / 2) / bucketSize) * bucketSize;
    return Math.max(0, Math.min(255, quantized));
  }
  setSh(index, sh1, sh2, sh3) {
    const shVecs = SH_DEGREE_TO_VECS[this.shDegree] || 0;
    const base1 = 16 + this.numSplats * 19 + index * shVecs * 3;
    for (let j = 0; j < 9; ++j) {
      this.view.setUint8(base1 + j, SpzWriter.quantizeSh(sh1[j], 5));
    }
    if (sh2) {
      const base2 = base1 + 9;
      for (let j = 0; j < 15; ++j) {
        this.view.setUint8(base2 + j, SpzWriter.quantizeSh(sh2[j], 4));
      }
      if (sh3) {
        const base3 = base2 + 15;
        for (let j = 0; j < 21; ++j) {
          this.view.setUint8(base3 + j, SpzWriter.quantizeSh(sh3[j], 4));
        }
      }
    }
  }
  async finalize() {
    const input = new Uint8Array(this.buffer);
    const stream = new ReadableStream({
      async start(controller) {
        controller.enqueue(input);
        controller.close();
      }
    });
    const compressed = stream.pipeThrough(new CompressionStream("gzip"));
    const response = new Response(compressed);
    const buffer = await response.arrayBuffer();
    console.log(
      "Compressed",
      input.length,
      "bytes to",
      buffer.byteLength,
      "bytes"
    );
    return new Uint8Array(buffer);
  }
}
async function transcodeSpz(input) {
  var _a2, _b2, _c;
  const splats = new SplatData();
  const {
    inputs,
    clipXyz,
    maxSh,
    fractionalBits = 12,
    opacityThreshold
  } = input;
  for (const input2 of inputs) {
    let transformPos2 = function(pos) {
      pos.multiplyScalar(scale);
      pos.applyQuaternion(quaternion);
      pos.add(translate);
      return pos;
    }, transformScales = function(scales) {
      scales.multiplyScalar(scale);
      return scales;
    }, transformQuaternion = function(quat) {
      quat.premultiply(quaternion);
      return quat;
    }, withinClip = function(p) {
      return !clip || clip.containsPoint(p);
    }, withinOpacity = function(opacity) {
      return opacityThreshold !== void 0 ? opacity >= opacityThreshold : true;
    };
    const scale = ((_a2 = input2.transform) == null ? void 0 : _a2.scale) ?? 1;
    const quaternion = new THREE.Quaternion().fromArray(
      ((_b2 = input2.transform) == null ? void 0 : _b2.quaternion) ?? [0, 0, 0, 1]
    );
    const translate = new THREE.Vector3().fromArray(
      ((_c = input2.transform) == null ? void 0 : _c.translate) ?? [0, 0, 0]
    );
    const clip = clipXyz ? new THREE.Box3(
      new THREE.Vector3().fromArray(clipXyz.min),
      new THREE.Vector3().fromArray(clipXyz.max)
    ) : void 0;
    let fileType = input2.fileType;
    if (!fileType) {
      fileType = getSplatFileType(input2.fileBytes);
      if (!fileType && input2.pathOrUrl) {
        fileType = getSplatFileTypeFromPath(input2.pathOrUrl);
      }
    }
    switch (fileType) {
      case SplatFileType.PLY: {
        const ply = new PlyReader({ fileBytes: input2.fileBytes });
        await ply.parseHeader();
        let lastIndex = null;
        ply.parseSplats(
          (index, x, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
            const center = transformPos2(new THREE.Vector3(x, y, z));
            if (withinClip(center) && withinOpacity(opacity)) {
              lastIndex = splats.pushSplat();
              splats.setCenter(lastIndex, center.x, center.y, center.z);
              const scales = transformScales(
                new THREE.Vector3(scaleX, scaleY, scaleZ)
              );
              splats.setScale(lastIndex, scales.x, scales.y, scales.z);
              const quaternion2 = transformQuaternion(
                new THREE.Quaternion(quatX, quatY, quatZ, quatW)
              );
              splats.setQuaternion(
                lastIndex,
                quaternion2.x,
                quaternion2.y,
                quaternion2.z,
                quaternion2.w
              );
              splats.setOpacity(lastIndex, opacity);
              splats.setColor(lastIndex, r, g, b);
            } else {
              lastIndex = null;
            }
          },
          (index, sh1, sh2, sh3) => {
            if (sh1 && lastIndex !== null) {
              splats.setSh1(lastIndex, sh1);
            }
            if (sh2 && lastIndex !== null) {
              splats.setSh2(lastIndex, sh2);
            }
            if (sh3 && lastIndex !== null) {
              splats.setSh3(lastIndex, sh3);
            }
          }
        );
        break;
      }
      case SplatFileType.SPZ: {
        const spz2 = new SpzReader({ fileBytes: input2.fileBytes });
        const mapping = new Int32Array(spz2.numSplats);
        mapping.fill(-1);
        const centers = new Float32Array(spz2.numSplats * 3);
        const center = new THREE.Vector3();
        spz2.parseSplats(
          (index, x, y, z) => {
            const center2 = transformPos2(new THREE.Vector3(x, y, z));
            centers[index * 3] = center2.x;
            centers[index * 3 + 1] = center2.y;
            centers[index * 3 + 2] = center2.z;
          },
          (index, alpha) => {
            center.fromArray(centers, index * 3);
            if (withinClip(center) && withinOpacity(alpha)) {
              mapping[index] = splats.pushSplat();
              splats.setCenter(mapping[index], center.x, center.y, center.z);
              splats.setOpacity(mapping[index], alpha);
            }
          },
          (index, r, g, b) => {
            if (mapping[index] >= 0) {
              splats.setColor(mapping[index], r, g, b);
            }
          },
          (index, scaleX, scaleY, scaleZ) => {
            if (mapping[index] >= 0) {
              const scales = transformScales(
                new THREE.Vector3(scaleX, scaleY, scaleZ)
              );
              splats.setScale(mapping[index], scales.x, scales.y, scales.z);
            }
          },
          (index, quatX, quatY, quatZ, quatW) => {
            if (mapping[index] >= 0) {
              const quaternion2 = transformQuaternion(
                new THREE.Quaternion(quatX, quatY, quatZ, quatW)
              );
              splats.setQuaternion(
                mapping[index],
                quaternion2.x,
                quaternion2.y,
                quaternion2.z,
                quaternion2.w
              );
            }
          },
          (index, sh1, sh2, sh3) => {
            if (mapping[index] >= 0) {
              splats.setSh1(mapping[index], sh1);
              if (sh2) {
                splats.setSh2(mapping[index], sh2);
              }
              if (sh3) {
                splats.setSh3(mapping[index], sh3);
              }
            }
          }
        );
        break;
      }
      case SplatFileType.SPLAT:
        decodeAntiSplat(
          input2.fileBytes,
          (numSplats) => {
          },
          (index, x, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
            const center = transformPos2(new THREE.Vector3(x, y, z));
            if (withinClip(center) && withinOpacity(opacity)) {
              const index2 = splats.pushSplat();
              splats.setCenter(index2, center.x, center.y, center.z);
              const scales = transformScales(
                new THREE.Vector3(scaleX, scaleY, scaleZ)
              );
              splats.setScale(index2, scales.x, scales.y, scales.z);
              const quaternion2 = transformQuaternion(
                new THREE.Quaternion(quatX, quatY, quatZ, quatW)
              );
              splats.setQuaternion(
                index2,
                quaternion2.x,
                quaternion2.y,
                quaternion2.z,
                quaternion2.w
              );
              splats.setOpacity(index2, opacity);
              splats.setColor(index2, r, g, b);
            }
          }
        );
        break;
      case SplatFileType.KSPLAT: {
        let lastIndex = null;
        decodeKsplat(
          input2.fileBytes,
          (numSplats) => {
          },
          (index, x, y, z, scaleX, scaleY, scaleZ, quatX, quatY, quatZ, quatW, opacity, r, g, b) => {
            const center = transformPos2(new THREE.Vector3(x, y, z));
            if (withinClip(center) && withinOpacity(opacity)) {
              lastIndex = splats.pushSplat();
              splats.setCenter(lastIndex, center.x, center.y, center.z);
              const scales = transformScales(
                new THREE.Vector3(scaleX, scaleY, scaleZ)
              );
              splats.setScale(lastIndex, scales.x, scales.y, scales.z);
              const quaternion2 = transformQuaternion(
                new THREE.Quaternion(quatX, quatY, quatZ, quatW)
              );
              splats.setQuaternion(
                lastIndex,
                quaternion2.x,
                quaternion2.y,
                quaternion2.z,
                quaternion2.w
              );
              splats.setOpacity(lastIndex, opacity);
              splats.setColor(lastIndex, r, g, b);
            } else {
              lastIndex = null;
            }
          },
          (index, sh1, sh2, sh3) => {
            if (lastIndex !== null) {
              splats.setSh1(lastIndex, sh1);
              if (sh2) {
                splats.setSh2(lastIndex, sh2);
              }
              if (sh3) {
                splats.setSh3(lastIndex, sh3);
              }
            }
          }
        );
        break;
      }
      default:
        throw new Error(`transcodeSpz not implemented for ${fileType}`);
    }
  }
  const shDegree = Math.min(
    maxSh ?? 3,
    splats.sh3 ? 3 : splats.sh2 ? 2 : splats.sh1 ? 1 : 0
  );
  const spz = new SpzWriter({
    numSplats: splats.numSplats,
    shDegree,
    fractionalBits,
    flagAntiAlias: true
  });
  for (let i = 0; i < splats.numSplats; ++i) {
    const i3 = i * 3;
    const i4 = i * 4;
    spz.setCenter(
      i,
      splats.centers[i3],
      splats.centers[i3 + 1],
      splats.centers[i3 + 2]
    );
    spz.setScale(
      i,
      splats.scales[i3],
      splats.scales[i3 + 1],
      splats.scales[i3 + 2]
    );
    spz.setQuat(
      i,
      splats.quaternions[i4],
      splats.quaternions[i4 + 1],
      splats.quaternions[i4 + 2],
      splats.quaternions[i4 + 3]
    );
    spz.setAlpha(i, splats.opacities[i]);
    spz.setRgb(
      i,
      splats.colors[i3],
      splats.colors[i3 + 1],
      splats.colors[i3 + 2]
    );
    if (splats.sh1 && shDegree >= 1) {
      spz.setSh(
        i,
        splats.sh1.slice(i * 9, (i + 1) * 9),
        shDegree >= 2 && splats.sh2 ? splats.sh2.slice(i * 15, (i + 1) * 15) : void 0,
        shDegree >= 3 && splats.sh3 ? splats.sh3.slice(i * 21, (i + 1) * 21) : void 0
      );
    }
  }
  const spzBytes = await spz.finalize();
  return { fileBytes: spzBytes, clippedCount: spz.clippedCount };
}
class SplatSkinning {
  constructor(options) {
    this.mesh = options.mesh;
    this.numSplats = options.numSplats ?? this.mesh.numSplats;
    const { width, height, depth, maxSplats } = getTextureSize(this.numSplats);
    this.skinData = new Uint16Array(maxSplats * 4);
    this.skinTexture = new THREE.DataArrayTexture(
      this.skinData,
      width,
      height,
      depth
    );
    this.skinTexture.format = THREE.RGBAIntegerFormat;
    this.skinTexture.type = THREE.UnsignedShortType;
    this.skinTexture.internalFormat = "RGBA16UI";
    this.skinTexture.needsUpdate = true;
    this.numBones = options.numBones ?? 256;
    this.boneData = new Float32Array(this.numBones * 16);
    this.boneTexture = new THREE.DataTexture(
      this.boneData,
      4,
      this.numBones,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this.boneTexture.internalFormat = "RGBA32F";
    this.boneTexture.needsUpdate = true;
    this.uniform = new DynoUniform({
      key: "skinning",
      type: GsplatSkinning,
      globals: () => [defineGsplatSkinning],
      value: {
        numSplats: this.numSplats,
        numBones: this.numBones,
        skinTexture: this.skinTexture,
        boneTexture: this.boneTexture
      }
    });
  }
  // Apply the skeletal animation to a Gsplat in a dyno program.
  modify(gsplat) {
    return applyGsplatSkinning(gsplat, this.uniform);
  }
  // Set the "rest" pose for a bone with position and quaternion orientation.
  setRestQuatPos(boneIndex, quat, pos) {
    const i16 = boneIndex * 16;
    this.boneData[i16 + 0] = quat.x;
    this.boneData[i16 + 1] = quat.y;
    this.boneData[i16 + 2] = quat.z;
    this.boneData[i16 + 3] = quat.w;
    this.boneData[i16 + 4] = pos.x;
    this.boneData[i16 + 5] = pos.y;
    this.boneData[i16 + 6] = pos.z;
    this.boneData[i16 + 7] = 0;
    this.boneData[i16 + 8] = 0;
    this.boneData[i16 + 9] = 0;
    this.boneData[i16 + 10] = 0;
    this.boneData[i16 + 11] = 1;
    this.boneData[i16 + 12] = 0;
    this.boneData[i16 + 13] = 0;
    this.boneData[i16 + 14] = 0;
    this.boneData[i16 + 15] = 0;
  }
  // Set the "current" position and orientation of a bone.
  setBoneQuatPos(boneIndex, quat, pos) {
    const i16 = boneIndex * 16;
    const origQuat = new THREE.Quaternion(
      this.boneData[i16 + 0],
      this.boneData[i16 + 1],
      this.boneData[i16 + 2],
      this.boneData[i16 + 3]
    );
    const origPos = new THREE.Vector3(
      this.boneData[i16 + 4],
      this.boneData[i16 + 5],
      this.boneData[i16 + 6]
    );
    const relQuat = origQuat.clone().invert();
    const relPos = pos.clone().sub(origPos);
    relPos.applyQuaternion(relQuat);
    relQuat.multiply(quat);
    const dual = new THREE.Quaternion(
      relPos.x,
      relPos.y,
      relPos.z,
      0
    ).multiply(origQuat);
    this.boneData[i16 + 8] = relQuat.x;
    this.boneData[i16 + 9] = relQuat.y;
    this.boneData[i16 + 10] = relQuat.z;
    this.boneData[i16 + 11] = relQuat.w;
    this.boneData[i16 + 12] = 0.5 * dual.x;
    this.boneData[i16 + 13] = 0.5 * dual.y;
    this.boneData[i16 + 14] = 0.5 * dual.z;
    this.boneData[i16 + 15] = 0.5 * dual.w;
  }
  // Set up to 4 bone indices and weights for a Gsplat. For fewer than 4 bones,
  // you can set the remaining weights to 0 (and index=0).
  setSplatBones(splatIndex, boneIndices, weights) {
    const i4 = splatIndex * 4;
    this.skinData[i4 + 0] = Math.min(255, Math.max(0, Math.round(weights.x * 255))) + (boneIndices.x << 8);
    this.skinData[i4 + 1] = Math.min(255, Math.max(0, Math.round(weights.y * 255))) + (boneIndices.y << 8);
    this.skinData[i4 + 2] = Math.min(255, Math.max(0, Math.round(weights.z * 255))) + (boneIndices.z << 8);
    this.skinData[i4 + 3] = Math.min(255, Math.max(0, Math.round(weights.w * 255))) + (boneIndices.w << 8);
  }
  // Call this to indicate that the bones have changed and the Gsplats need to be
  // re-generated with updated skinning.
  updateBones() {
    this.boneTexture.needsUpdate = true;
    this.mesh.needsUpdate = true;
  }
}
const GsplatSkinning = { type: "GsplatSkinning" };
const defineGsplatSkinning = unindent(`
  struct GsplatSkinning {
    int numSplats;
    int numBones;
    usampler2DArray skinTexture;
    sampler2D boneTexture;
  };
`);
const defineApplyGsplatSkinning = unindent(`
  void applyGsplatSkinning(
    int numSplats, int numBones,
    usampler2DArray skinTexture, sampler2D boneTexture,
    int splatIndex, inout vec3 center, inout vec4 quaternion
  ) {
    if ((splatIndex < 0) || (splatIndex >= numSplats)) {
      return;
    }

    uvec4 skinData = texelFetch(skinTexture, splatTexCoord(splatIndex), 0);

    float weights[4];
    weights[0] = float(skinData.x & 0xffu) / 255.0;
    weights[1] = float(skinData.y & 0xffu) / 255.0;
    weights[2] = float(skinData.z & 0xffu) / 255.0;
    weights[3] = float(skinData.w & 0xffu) / 255.0;

    uint boneIndices[4];
    boneIndices[0] = (skinData.x >> 8u) & 0xffu;
    boneIndices[1] = (skinData.y >> 8u) & 0xffu;
    boneIndices[2] = (skinData.z >> 8u) & 0xffu;
    boneIndices[3] = (skinData.w >> 8u) & 0xffu;

    vec4 quat = vec4(0.0);
    vec4 dual = vec4(0.0);
    for (int i = 0; i < 4; i++) {
      if (weights[i] > 0.0) {
        int boneIndex = int(boneIndices[i]);
        vec4 boneQuat = vec4(0.0, 0.0, 0.0, 1.0);
        vec4 boneDual = vec4(0.0);
        if (boneIndex < numBones) {
          boneQuat = texelFetch(boneTexture, ivec2(2, boneIndex), 0);
          boneDual = texelFetch(boneTexture, ivec2(3, boneIndex), 0);
        }

        if ((i > 0) && (dot(quat, boneQuat) < 0.0)) {
          // Flip sign if next blend is pointing in the opposite direction
          boneQuat = -boneQuat;
          boneDual = -boneDual;
        }
        quat += weights[i] * boneQuat;
        dual += weights[i] * boneDual;
      }
    }

    // Normalize dual quaternion
    float norm = length(quat);
    quat /= norm;
    dual /= norm;
    vec3 translate = vec3(
      2.0 * (-dual.w * quat.x + dual.x * quat.w - dual.y * quat.z + dual.z * quat.y),
      2.0 * (-dual.w * quat.y + dual.x * quat.z + dual.y * quat.w - dual.z * quat.x),
      2.0 * (-dual.w * quat.z - dual.x * quat.y + dual.y * quat.x + dual.z * quat.w)
    );

    center = quatVec(quat, center) + translate;
    quaternion = quatQuat(quat, quaternion);
  }
`);
function applyGsplatSkinning(gsplat, skinning) {
  const dyno2 = new Dyno({
    inTypes: { gsplat: Gsplat, skinning: GsplatSkinning },
    outTypes: { gsplat: Gsplat },
    globals: () => [defineGsplatSkinning, defineApplyGsplatSkinning],
    inputs: { gsplat, skinning },
    statements: ({ inputs, outputs }) => {
      const { skinning: skinning2 } = inputs;
      const { gsplat: gsplat2 } = outputs;
      return unindentLines(`
        ${gsplat2} = ${inputs.gsplat};
        if (isGsplatActive(${gsplat2}.flags)) {
          applyGsplatSkinning(
            ${skinning2}.numSplats, ${skinning2}.numBones,
            ${skinning2}.skinTexture, ${skinning2}.boneTexture,
            ${gsplat2}.index, ${gsplat2}.center, ${gsplat2}.quaternion
          );
        }
      `);
    }
  });
  return dyno2.outputs.gsplat;
}
function constructGrid({
  // PackedSplats object to add splats to
  splats,
  // min and max box extents of the grid
  extents,
  // step size along each grid axis
  stepSize = 1,
  // spherical radius of each Gsplat
  pointRadius = 0.01,
  // relative size of the "shadow copy" of each Gsplat placed behind it
  pointShadowScale = 2,
  // Gsplat opacity
  opacity = 1,
  // Gsplat color (THREE.Color) or function to set color for position:
  // ((THREE.Color, THREE.Vector3) => void) (default: RGB-modulated grid)
  color
}) {
  const EPSILON = 1e-6;
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3();
  const quaternion = new THREE.Quaternion(0, 0, 0, 1);
  if (color == null) {
    color = (color2, point) => color2.set(
      0.55 + 0.45 * Math.cos(point.x * 1),
      0.55 + 0.45 * Math.cos(point.y * 1),
      0.55 + 0.45 * Math.cos(point.z * 1)
    );
  }
  const pointColor = new THREE.Color();
  for (let z = extents.min.z; z < extents.max.z + EPSILON; z += stepSize) {
    for (let y = extents.min.y; y < extents.max.y + EPSILON; y += stepSize) {
      for (let x = extents.min.x; x < extents.max.x + EPSILON; x += stepSize) {
        center.set(x, y, z);
        for (let layer = 0; layer < 2; ++layer) {
          scales.setScalar(pointRadius * (layer ? 1 : pointShadowScale));
          if (!layer) {
            pointColor.setScalar(0);
          } else if (typeof color === "function") {
            color(pointColor, center);
          } else {
            pointColor.copy(color);
          }
          splats.pushSplat(center, scales, quaternion, opacity, pointColor);
        }
      }
    }
  }
}
function constructAxes({
  // PackedSplats object to add splats to
  splats,
  // scale (Gsplat scale along axis)
  scale = 0.25,
  // radius of the axes (Gsplat scale orthogonal to axis)
  axisRadius = 75e-4,
  // relative size of the "shadow copy" of each Gsplat placed behind it
  axisShadowScale = 2,
  // origins of the axes (default single axis at origin)
  origins = [new THREE.Vector3()]
}) {
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3();
  const quaternion = new THREE.Quaternion(0, 0, 0, 1);
  const color = new THREE.Color();
  const opacity = 1;
  for (const origin of origins) {
    for (let axis = 0; axis < 3; ++axis) {
      center.set(
        origin.x + (axis === 0 ? scale : 0),
        origin.y + (axis === 1 ? scale : 0),
        origin.z + (axis === 2 ? scale : 0)
      );
      for (let layer = 0; layer < 2; ++layer) {
        scales.set(
          (axis === 0 ? scale : axisRadius) * (layer ? 1 : axisShadowScale),
          (axis === 1 ? scale : axisRadius) * (layer ? 1 : axisShadowScale),
          (axis === 2 ? scale : axisRadius) * (layer ? 1 : axisShadowScale)
        );
        color.setRGB(
          layer === 0 ? 0 : axis === 0 ? 1 : 0,
          layer === 0 ? 0 : axis === 1 ? 1 : 0,
          layer === 0 ? 0 : axis === 2 ? 1 : 0
        );
        splats.pushSplat(center, scales, quaternion, opacity, color);
      }
    }
  }
}
function constructSpherePoints({
  // PackedSplats object to add splats to
  splats,
  // center of the sphere (default: origin)
  origin = new THREE.Vector3(),
  // radius of the sphere
  radius = 1,
  // maximum depth of recursion for subdividing the sphere
  // Warning: Gsplat count grows exponentially with depth
  maxDepth = 3,
  // filter function to apply to each point, for example to select
  // points in a certain direction or other function ((THREE.Vector3) => boolean)
  // (default: null)
  filter = null,
  // radius of each oriented Gsplat
  pointRadius = 0.02,
  // flatness of each oriented Gsplat
  pointThickness = 1e-3,
  // color of each Gsplat (THREE.Color) or function to set color for point:
  // ((THREE.Color, THREE.Vector3) => void) (default: white)
  color = new THREE.Color(1, 1, 1)
}) {
  const pointsHash = {};
  function addPoint(p) {
    if (filter && !filter(p)) {
      return;
    }
    const key = `${p.x},${p.y},${p.z}`;
    if (!pointsHash[key]) {
      pointsHash[key] = p;
    }
  }
  function recurse(depth, p0, p1, p2) {
    addPoint(p0);
    addPoint(p1);
    addPoint(p2);
    if (depth >= maxDepth) {
      return;
    }
    const p01 = new THREE.Vector3().addVectors(p0, p1).normalize();
    const p12 = new THREE.Vector3().addVectors(p1, p2).normalize();
    const p20 = new THREE.Vector3().addVectors(p2, p0).normalize();
    recurse(depth + 1, p0, p01, p20);
    recurse(depth + 1, p01, p1, p12);
    recurse(depth + 1, p20, p12, p2);
    recurse(depth + 1, p01, p12, p20);
  }
  for (const x of [-1, 1]) {
    for (const y of [-1, 1]) {
      for (const z of [-1, 1]) {
        const p0 = new THREE.Vector3(x, 0, 0);
        const p1 = new THREE.Vector3(0, y, 0);
        const p2 = new THREE.Vector3(0, 0, z);
        recurse(0, p0, p1, p2);
      }
    }
  }
  const points = Object.values(pointsHash);
  const scales = new THREE.Vector3(pointRadius, pointRadius, pointThickness);
  const quaternion = new THREE.Quaternion();
  const pointColor = typeof color === "function" ? new THREE.Color() : color;
  for (const point of points) {
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), point);
    if (typeof color === "function") {
      color(pointColor, point);
    }
    point.multiplyScalar(radius);
    point.add(origin);
    splats.pushSplat(point, scales, quaternion, 1, pointColor);
  }
}
function textSplats({
  // text string to display
  text,
  // browser font to render text with (default: "Arial")
  font,
  // font size in pixels/Gsplats (default: 32)
  fontSize,
  // SplatMesh.recolor tint assuming white Gsplats (default: white)
  color,
  // Individual Gsplat color (default: white)
  rgb,
  // Gsplat radius (default: 0.8 covers 1-unit spacing well)
  dotRadius,
  // text alignment: "left", "center", "right", "start", "end" (default: "start")
  textAlign,
  // line spacing multiplier, lines delimited by "\n" (default: 1.0)
  lineHeight,
  // Coordinate scale in object-space (default: 1.0)
  objectScale
}) {
  font = font ?? "Arial";
  fontSize = fontSize ?? 32;
  color = color ?? new THREE.Color(1, 1, 1);
  dotRadius = dotRadius ?? 0.8;
  textAlign = textAlign ?? "start";
  lineHeight = lineHeight ?? 1;
  objectScale = objectScale ?? 1;
  const lines = text.split("\n");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to create canvas context");
  }
  ctx.font = `${fontSize}px ${font}`;
  ctx.textAlign = textAlign;
  const metrics = ctx.measureText("");
  const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
  let minLeft = Number.POSITIVE_INFINITY;
  let maxRight = Number.NEGATIVE_INFINITY;
  let minTop = Number.POSITIVE_INFINITY;
  let maxBottom = Number.NEGATIVE_INFINITY;
  for (let line = 0; line < lines.length; ++line) {
    const metrics2 = ctx.measureText(lines[line]);
    const y = fontHeight * lineHeight * line;
    minLeft = Math.min(minLeft, -metrics2.actualBoundingBoxLeft);
    maxRight = Math.max(maxRight, metrics2.actualBoundingBoxRight);
    minTop = Math.min(minTop, y - metrics2.actualBoundingBoxAscent);
    maxBottom = Math.max(maxBottom, y + metrics2.actualBoundingBoxDescent);
  }
  const originLeft = Math.floor(minLeft);
  const originTop = Math.floor(minTop);
  const width = Math.ceil(maxRight) - originLeft;
  const height = Math.ceil(maxBottom) - originTop;
  canvas.width = width;
  canvas.height = height;
  ctx.font = `${fontSize}px ${font}`;
  ctx.textAlign = textAlign;
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#FFFFFF";
  for (let i = 0; i < lines.length; ++i) {
    const y = fontHeight * lineHeight * i - originTop;
    ctx.fillText(lines[i], -originLeft, y);
  }
  const imageData = ctx.getImageData(0, 0, width, height);
  const rgba = new Uint8Array(imageData.data.buffer);
  const splats = new PackedSplats();
  const center = new THREE.Vector3();
  const scales = new THREE.Vector3().setScalar(dotRadius * objectScale);
  const quaternion = new THREE.Quaternion(0, 0, 0, 1);
  rgb = rgb ?? new THREE.Color(1, 1, 1);
  let offset = 0;
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const a = rgba[offset + 3];
      if (a > 0) {
        const opacity = a / 255;
        center.set(x - 0.5 * (width - 1), 0.5 * (height - 1) - y, 0);
        center.multiplyScalar(objectScale);
        splats.pushSplat(center, scales, quaternion, opacity, rgb);
      }
      offset += 4;
    }
  }
  const mesh = new SplatMesh({ packedSplats: splats });
  mesh.recolor = color;
  return mesh;
}
function imageSplats({
  // URL of the image to convert to splats (example: `url: "./image.png"`)
  url,
  // Radius of each Gsplat, default covers 1-unit spacing well (default: 0.8)
  dotRadius,
  // Subsampling factor for the image. Higher values reduce resolution,
  // for example 2 will halve the width and height by averaging (default: 1)
  subXY,
  // Optional callback function to modify each Gsplat before it's added.
  // Return null to skip adding the Gsplat, or a number to set the opacity
  // and add the Gsplat with parameter values in the objects center, rgba etc. were
  // passed into the forEachSplat callback. Ending the callback in `return opacity;`
  // will retain the original opacity.
  // ((width: number, height: number, index: number, center: THREE.Vector3, scales: THREE.Vector3, quaternion: THREE.Quaternion, opacity: number, color: THREE.Color) => number | null)
  forEachSplat
}) {
  dotRadius = dotRadius ?? 0.8;
  subXY = Math.max(1, Math.floor(subXY ?? 1));
  return new SplatMesh({
    constructSplats: async (splats) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onerror = reject;
        img.onload = () => {
          const { width, height } = img;
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Failed to create canvas context"));
            return;
          }
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          const destWidth = Math.round(width / subXY);
          const destHeight = Math.round(height / subXY);
          ctx.drawImage(img, 0, 0, destWidth, destHeight);
          try {
            const imageData = ctx.getImageData(0, 0, destWidth, destHeight);
            const rgba = new Uint8Array(imageData.data.buffer);
            const center = new THREE.Vector3();
            const scales = new THREE.Vector3().setScalar(dotRadius);
            const quaternion = new THREE.Quaternion(0, 0, 0, 1);
            const rgb = new THREE.Color();
            let index = 0;
            for (let y = 0; y < destHeight; ++y) {
              for (let x = 0; x < destWidth; ++x) {
                const offset = index * 4;
                const a = rgba[offset + 3];
                if (a > 0) {
                  let opacity = a / 255;
                  rgb.set(
                    rgba[offset + 0] / 255,
                    rgba[offset + 1] / 255,
                    rgba[offset + 2] / 255
                  );
                  center.set(
                    x - 0.5 * (destWidth - 1),
                    0.5 * (destHeight - 1) - y,
                    0
                  );
                  scales.setScalar(dotRadius);
                  quaternion.set(0, 0, 0, 1);
                  let push = true;
                  if (forEachSplat) {
                    const maybeOpacity = forEachSplat(
                      destWidth,
                      destHeight,
                      index,
                      center,
                      scales,
                      quaternion,
                      opacity,
                      rgb
                    );
                    opacity = maybeOpacity ?? opacity;
                    push = maybeOpacity !== null;
                  }
                  if (push) {
                    splats.pushSplat(center, scales, quaternion, opacity, rgb);
                  }
                }
                index += 1;
              }
            }
            resolve();
          } catch (error) {
            reject(error);
          }
        };
        img.src = url;
      });
    }
  });
}
function staticBox({
  box,
  cells,
  dotScale,
  color,
  opacity
}) {
  cells.x = Math.max(1, Math.round(cells.x));
  cells.y = Math.max(1, Math.round(cells.y));
  cells.z = Math.max(1, Math.round(cells.z));
  opacity = opacity ?? 1;
  const numSplats = cells.x * cells.y * cells.z;
  const dynoX = dynoConst("int", cells.x);
  const dynoY = dynoConst("int", cells.y);
  dynoConst("int", cells.z);
  const dynoTime = dynoFloat(0);
  const generator = new SplatGenerator({
    numSplats,
    generator: dynoBlock(
      { index: "int" },
      { gsplat: Gsplat },
      ({ index }) => {
        if (!index) {
          throw new Error("index is undefined");
        }
        const cellX = imod(index, dynoX);
        const index2 = div(index, dynoX);
        const cellY = imod(index2, dynoY);
        const cellZ = div(index2, dynoY);
        const cell = combine({
          vectorType: "ivec3",
          x: cellX,
          y: cellY,
          z: cellZ
        });
        const intTime = floatBitsToInt(dynoTime);
        const inputs = combine({ vectorType: "ivec2", x: index, y: intTime });
        const random = hashVec3(inputs);
        const min2 = dynoConst("vec3", box.min);
        const max2 = dynoConst("vec3", box.max);
        const size = sub(max2, min2);
        const coord = div(add(vec3(cell), random), dynoConst("vec3", cells));
        let r;
        let g;
        let b;
        if (color) {
          r = dynoConst("float", color.r);
          g = dynoConst("float", color.g);
          b = dynoConst("float", color.b);
        } else {
          ({ r, g, b } = split(coord).outputs);
        }
        const rgba = combine({
          vectorType: "vec4",
          r,
          g,
          b,
          a: dynoConst("float", opacity)
        });
        const center = add(min2, mul(size, coord));
        const scales = vec3(dynoConst("float", dotScale));
        const quaternion = dynoConst("vec4", new THREE.Quaternion(0, 0, 0, 1));
        let gsplat = combineGsplat({
          flags: dynoLiteral("uint", "GSPLAT_FLAG_ACTIVE"),
          index,
          center,
          scales,
          quaternion,
          rgba
        });
        gsplat = transformer.applyGsplat(gsplat);
        return { gsplat };
      },
      {
        globals: () => [defineGsplat]
      }
    ),
    update: ({ time }) => {
      dynoTime.value = time;
      transformer.update(generator);
      generator.updateVersion();
    }
  });
  const transformer = new SplatTransformer();
  return generator;
}
const DEFAULT_SNOW = {
  box: new THREE.Box3(
    new THREE.Vector3(-1, -1, -1),
    new THREE.Vector3(1, 1, 1)
  ),
  density: 100,
  fallDirection: new THREE.Vector3(-1, -3, 1).normalize(),
  fallVelocity: 0.02,
  wanderScale: 0.04,
  wanderVariance: 2,
  color1: new THREE.Color(1, 1, 1),
  color2: new THREE.Color(0.5, 0.5, 1),
  minScale: 1e-3,
  maxScale: 5e-3,
  anisoScale: new THREE.Vector3(1, 1, 1)
};
const DEFAULT_RAIN = {
  box: new THREE.Box3(
    new THREE.Vector3(-2, -1, -2),
    new THREE.Vector3(2, 5, 2)
  ),
  density: 10,
  fallDirection: new THREE.Vector3(0, -1, 0),
  fallVelocity: 2,
  wanderScale: 0.1,
  wanderVariance: 1,
  color1: new THREE.Color(1, 1, 1),
  color2: new THREE.Color(0.25, 0.25, 0.5),
  minScale: 5e-3,
  maxScale: 0.01,
  anisoScale: new THREE.Vector3(0.1, 1, 0.1)
};
function snowBox({
  // min and max box extents of the snowBox
  box,
  // minimum y-coordinate to clamp particle position, which can be used to
  // fake hitting a ground plane and lingering there for a bit
  minY,
  // number of Gsplats to generate (default: calculated from box and density)
  numSplats,
  // density of Gsplats per unit volume (default: 100)
  density,
  // The xyz anisotropic scale of the Gsplat, which can be used for example
  // to elongate rain particles (default: (1, 1, 1))
  anisoScale,
  // Minimum Gsplat particle scale (default: 0.001)
  minScale,
  // Maximum Gsplat particle scale (default: 0.005)
  maxScale,
  // The average direction of fall (default: (0, -1, 0))
  fallDirection,
  // The average speed of the fall (multiplied with fallDirection) (default: 0.02)
  fallVelocity,
  // The world scale of wandering overlay motion (default: 0.01)
  wanderScale,
  // Controls how uniformly the particles wander in sync, more variance mean
  // more randomness in the motion (default: 2)
  wanderVariance,
  // Color 1 of the two colors interpolated between (default: (1, 1, 1))
  color1,
  // Color 2 of the two colors interpolated between (default: (0.5, 0.5, 1))
  color2,
  // The base opacity of the Gsplats (default: 1)
  opacity,
  // Optional callback function to call each frame.
  onFrame
}) {
  box = box ?? new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1));
  const volume = (box.max.x - box.min.x) * (box.max.y - box.min.y) * (box.max.z - box.min.z);
  density = density ?? 100;
  numSplats = numSplats ?? Math.max(1, Math.min(1e6, Math.round(volume * density)));
  const dynoMinScale = dynoFloat(minScale ?? 1e-3);
  const dynoMaxScale = dynoFloat(maxScale ?? 5e-3);
  const dynoAnisoScale = dynoVec3(
    ((anisoScale == null ? void 0 : anisoScale.clone()) ?? new THREE.Vector3(1, 1, 1)).normalize()
  );
  const dynoFallDirection = dynoVec3(
    (fallDirection ?? new THREE.Vector3(0, -1, 0)).normalize()
  );
  const dynoFallVelocity = dynoFloat(fallVelocity ?? 0.02);
  const dynoWanderScale = dynoFloat(wanderScale ?? 0.01);
  const dynoWanderVariance = dynoFloat(wanderVariance ?? 2);
  const dynoColor1 = dynoVec3(color1 ?? new THREE.Color(1, 1, 1));
  const dynoColor2 = dynoVec3(color2 ?? new THREE.Color(0.5, 0.5, 1));
  const dynoOpacity = dynoFloat(opacity ?? 1);
  const dynoTime = dynoFloat(0);
  const globalOffset = dynoVec3(new THREE.Vector3(0, 0, 0));
  const dynoMin = dynoVec3(box.min);
  const dynoMax = dynoVec3(box.max);
  const dynoMinY = dynoFloat(minY ?? Number.NEGATIVE_INFINITY);
  const minMax = sub(dynoMax, dynoMin);
  const snow = new SplatGenerator({
    numSplats,
    generator: dynoBlock(
      { index: "int" },
      { gsplat: Gsplat },
      ({ index }) => {
        if (!index) {
          throw new Error("index not defined");
        }
        const random = hashVec4(index);
        const randomW = split(random).outputs.w;
        let position = vec3(random);
        let size = fract(mul(randomW, dynoConst("float", 100)));
        size = sin(mul(dynoLiteral("float", "PI"), size));
        size = add(dynoMinScale, mul(size, sub(dynoMaxScale, dynoMinScale)));
        const scales = mul(size, dynoAnisoScale);
        const intensity = fract(mul(randomW, dynoConst("float", 10)));
        const hue = fract(randomW);
        const color = mix(dynoColor1, dynoColor2, hue);
        const rgb = mul(color, intensity);
        const random2 = hashVec4(
          combine({
            vectorType: "ivec2",
            x: index,
            y: dynoConst("int", 6837)
          })
        );
        let perturb = vec3(random2);
        let timeOffset = mul(split(random2).outputs.w, dynoWanderVariance);
        timeOffset = add(dynoTime, timeOffset);
        position = add(position, globalOffset);
        const modulo = mod(
          position,
          dynoConst("vec3", new THREE.Vector3(1, 1, 1))
        );
        position = add(dynoMin, mul(minMax, modulo));
        const quaternion = dynoConst("vec4", new THREE.Quaternion(0, 0, 0, 1));
        perturb = sin(add(vec3(timeOffset), perturb));
        perturb = mul(perturb, dynoWanderScale);
        let center = add(position, perturb);
        let centerY = split(center).outputs.y;
        centerY = max(dynoMinY, centerY);
        center = combine({ vector: center, y: centerY });
        let gsplat = combineGsplat({
          flags: dynoLiteral("uint", "GSPLAT_FLAG_ACTIVE"),
          index,
          center,
          scales,
          quaternion,
          rgb,
          opacity: dynoOpacity
        });
        gsplat = transformer.applyGsplat(gsplat);
        return { gsplat };
      },
      {
        globals: () => [defineGsplat]
      }
    ),
    update: ({ object, time, deltaTime }) => {
      dynoTime.value = time;
      transformer.update(snow);
      const fallDelta = dynoFallDirection.value.clone().multiplyScalar(dynoFallVelocity.value * deltaTime);
      globalOffset.value.add(fallDelta);
      object.visible = dynoOpacity.value > 0;
      onFrame == null ? void 0 : onFrame({ object, time, deltaTime });
      snow.updateVersion();
    }
  });
  const transformer = new SplatTransformer();
  return {
    snow,
    min: dynoMin,
    max: dynoMax,
    minY: dynoMinY,
    color1: dynoColor1,
    color2: dynoColor2,
    opacity: dynoOpacity,
    fallVelocity: dynoFallVelocity,
    wanderVariance: dynoWanderVariance,
    wanderScale: dynoWanderScale,
    fallDirection: dynoFallDirection,
    minScale: dynoMinScale,
    maxScale: dynoMaxScale,
    anisoScale: dynoAnisoScale
  };
}
const generators = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_RAIN,
  DEFAULT_SNOW,
  snowBox,
  staticBox
}, Symbol.toStringTag, { value: "Module" }));
function makeNormalColorModifier(splatToView) {
  return dynoBlock({ gsplat: Gsplat }, { gsplat: Gsplat }, ({ gsplat }) => {
    if (!gsplat) {
      throw new Error("No gsplat input");
    }
    let normal = gsplatNormal(gsplat);
    const viewGsplat = splatToView.applyGsplat(gsplat);
    const viewCenter = splitGsplat(viewGsplat).outputs.center;
    const viewNormal = gsplatNormal(viewGsplat);
    const splatDot = dot(viewCenter, viewNormal);
    const sameDir = greaterThanEqual(splatDot, dynoConst("float", 0));
    normal = select(sameDir, neg(normal), normal);
    const rgb = add(
      mul(normal, dynoConst("float", 0.5)),
      dynoConst("float", 0.5)
    );
    gsplat = combineGsplat({ gsplat, rgb });
    return { gsplat };
  });
}
function setWorldNormalColor(splats) {
  splats.enableWorldToView = true;
  splats.worldModifier = makeNormalColorModifier(splats.context.worldToView);
  splats.updateGenerator();
}
function makeDepthColorModifier(splatToView, minDepth, maxDepth, reverse) {
  return dynoBlock({ gsplat: Gsplat }, { gsplat: Gsplat }, ({ gsplat }) => {
    if (!gsplat) {
      throw new Error("No gsplat input");
    }
    let { center } = splitGsplat(gsplat).outputs;
    center = splatToView.apply(center);
    const { z } = split(center).outputs;
    let depth = normalizedDepth(neg(z), minDepth, maxDepth);
    depth = select(reverse, sub(dynoConst("float", 1), depth), depth);
    gsplat = combineGsplat({ gsplat, r: depth, g: depth, b: depth });
    return { gsplat };
  });
}
function setDepthColor(splats, minDepth, maxDepth, reverse) {
  splats.enableWorldToView = true;
  const dynoMinDepth = dynoConst("float", minDepth);
  const dynoMaxDepth = dynoConst("float", maxDepth);
  const dynoReverse = dynoConst("bool", reverse ?? false);
  splats.worldModifier = makeDepthColorModifier(
    splats.context.worldToView,
    dynoMinDepth,
    dynoMaxDepth,
    dynoReverse
  );
  splats.updateGenerator();
  return {
    minDepth: dynoMinDepth,
    maxDepth: dynoMaxDepth,
    reverse: dynoReverse
  };
}
const modifiers = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  makeDepthColorModifier,
  makeNormalColorModifier,
  setDepthColor,
  setWorldNormalColor
}, Symbol.toStringTag, { value: "Module" }));
const _VRButton = class _VRButton {
  static createButton(renderer, sessionInit = {}) {
    const navigatorXr = navigator.xr;
    if (!navigatorXr) {
      return null;
    }
    const xr = navigatorXr;
    const button = document.createElement("button");
    renderer.xr.enabled = true;
    renderer.xr.setReferenceSpaceType("local");
    function showEnterVR() {
      let currentSession = null;
      async function onSessionStarted(session) {
        console.log("onSessionStarted");
        session.addEventListener("end", onSessionEnded);
        await renderer.xr.setSession(session);
        button.textContent = "EXIT VR";
        currentSession = session;
      }
      function onSessionEnded() {
        console.log("onSessionEnded");
        currentSession == null ? void 0 : currentSession.removeEventListener("end", onSessionEnded);
        button.textContent = "ENTER VR";
        currentSession = null;
      }
      button.style.display = "";
      button.style.cursor = "pointer";
      button.style.left = "calc(50% - 100px)";
      button.style.width = "200px";
      button.style.height = "100px";
      button.textContent = "ENTER VR";
      const sessionOptions = {
        ...sessionInit,
        optionalFeatures: [
          // "local-floor",
          // "bounded-floor",
          // "layers",
          ...sessionInit.optionalFeatures || []
        ]
      };
      button.onmouseenter = () => {
        button.style.opacity = "1.0";
      };
      button.onmouseleave = () => {
        button.style.opacity = "0.5";
      };
      button.onclick = () => {
        if (currentSession === null) {
          console.log("requesting session");
          xr.requestSession("immersive-vr", sessionOptions).then(
            onSessionStarted
          );
        } else {
          console.log("ending session");
          currentSession.end();
        }
      };
    }
    function disableButton() {
      button.style.display = "none";
      button.style.cursor = "auto";
      button.style.left = "calc(50% - 75px)";
      button.style.width = "150px";
      button.onmouseenter = null;
      button.onmouseleave = null;
      button.onclick = null;
    }
    function showWebXRNotFound() {
      disableButton();
      button.textContent = "VR NOT SUPPORTED";
    }
    function showVRNotAllowed(exception) {
      disableButton();
      console.warn(
        "Exception when trying to call xr.isSessionSupported",
        exception
      );
      button.textContent = "VR NOT ALLOWED";
    }
    function stylizeElement(element) {
      element.style.position = "absolute";
      element.style.bottom = "20px";
      element.style.padding = "12px 6px";
      element.style.border = "1px solid #fff";
      element.style.borderRadius = "4px";
      element.style.background = "rgba(0,0,0,0.1)";
      element.style.color = "#fff";
      element.style.font = "normal 13px sans-serif";
      element.style.textAlign = "center";
      element.style.opacity = "0.5";
      element.style.outline = "none";
      element.style.zIndex = "999";
    }
    button.id = "VRButton";
    button.style.display = "none";
    stylizeElement(button);
    xr.isSessionSupported("immersive-vr").then((supported) => {
      supported ? showEnterVR() : showWebXRNotFound();
      if (supported && _VRButton.xrSessionIsGranted) {
        button.click();
      }
    }).catch(showVRNotAllowed);
    return button;
  }
  static registerSessionGrantedListener() {
    const navigatorXr = navigator.xr;
    if (!navigatorXr) {
      return null;
    }
    const xr = navigatorXr;
    if (/WebXRViewer\//i.test(navigator.userAgent)) return;
    xr.addEventListener("sessiongranted", () => {
      _VRButton.xrSessionIsGranted = true;
    });
  }
};
_VRButton.xrSessionIsGranted = false;
let VRButton = _VRButton;
VRButton.registerSessionGrantedListener();
const DEFAULT_MOVE_INERTIA$1 = 0.5;
const DEFAULT_ROTATE_INERTIA$1 = 0.5;
const TOUCH_BIAS = 0;
var JointEnum = /* @__PURE__ */ ((JointEnum2) => {
  JointEnum2["w"] = "wrist";
  JointEnum2["t0"] = "thumb-metacarpal";
  JointEnum2["t1"] = "thumb-phalanx-proximal";
  JointEnum2["t2"] = "thumb-phalanx-distal";
  JointEnum2["t3"] = "thumb-tip";
  JointEnum2["i0"] = "index-finger-metacarpal";
  JointEnum2["i1"] = "index-finger-phalanx-proximal";
  JointEnum2["i2"] = "index-finger-phalanx-intermediate";
  JointEnum2["i3"] = "index-finger-phalanx-distal";
  JointEnum2["i4"] = "index-finger-tip";
  JointEnum2["m0"] = "middle-finger-metacarpal";
  JointEnum2["m1"] = "middle-finger-phalanx-proximal";
  JointEnum2["m2"] = "middle-finger-phalanx-intermediate";
  JointEnum2["m3"] = "middle-finger-phalanx-distal";
  JointEnum2["m4"] = "middle-finger-tip";
  JointEnum2["r0"] = "ring-finger-metacarpal";
  JointEnum2["r1"] = "ring-finger-phalanx-proximal";
  JointEnum2["r2"] = "ring-finger-phalanx-intermediate";
  JointEnum2["r3"] = "ring-finger-phalanx-distal";
  JointEnum2["r4"] = "ring-finger-tip";
  JointEnum2["p0"] = "pinky-finger-metacarpal";
  JointEnum2["p1"] = "pinky-finger-phalanx-proximal";
  JointEnum2["p2"] = "pinky-finger-phalanx-intermediate";
  JointEnum2["p3"] = "pinky-finger-phalanx-distal";
  JointEnum2["p4"] = "pinky-finger-tip";
  return JointEnum2;
})(JointEnum || {});
const JOINT_IDS = Object.keys(JointEnum);
const NUM_JOINTS = JOINT_IDS.length;
const JOINT_INDEX = {
  w: 0,
  t0: 1,
  t1: 2,
  t2: 3,
  t3: 4,
  i0: 5,
  i1: 6,
  i2: 7,
  i3: 8,
  i4: 9,
  m0: 10,
  m1: 11,
  m2: 12,
  m3: 13,
  m4: 14,
  r0: 15,
  r1: 16,
  r2: 17,
  r3: 18,
  r4: 19,
  p0: 20,
  p1: 21,
  p2: 22,
  p3: 23,
  p4: 24
};
const JOINT_RADIUS = {
  w: 0.02,
  t0: 0.02,
  t1: 0.014,
  t2: 0.0115,
  t3: 85e-4,
  i0: 0.022,
  i1: 0.012,
  i2: 85e-4,
  i3: 75e-4,
  i4: 65e-4,
  m0: 0.021,
  m1: 0.012,
  m2: 8e-3,
  m3: 75e-4,
  m4: 65e-4,
  r0: 0.019,
  r1: 0.011,
  r2: 75e-4,
  r3: 7e-3,
  r4: 6e-3,
  p0: 0.012,
  p1: 0.01,
  p2: 7e-3,
  p3: 65e-4,
  p4: 55e-4
};
const JOINT_SEGMENTS = [
  ["w", "t0", "t1", "t2", "t3"],
  ["w", "i0", "i1", "i2", "i3", "i4"],
  ["w", "m0", "m1", "m2", "m3", "m4"],
  ["w", "r0", "r1", "r2", "r3", "r4"],
  ["w", "p0", "p1", "p2", "p3", "p4"]
];
const JOINT_SEGMENT_STEPS = [
  [8, 10, 8, 6],
  [8, 19, 14, 8, 6],
  [8, 19, 14, 8, 6],
  [8, 19, 14, 8, 6],
  [8, 19, 14, 8, 6]
];
const JOINT_TIPS = ["t3", "i4", "m4", "r4", "p4"];
const FINGER_TIPS = ["i4", "m4", "r4", "p4"];
var Hand = /* @__PURE__ */ ((Hand2) => {
  Hand2["left"] = "left";
  Hand2["right"] = "right";
  return Hand2;
})(Hand || {});
const HANDS = Object.keys(Hand);
class XrHands {
  constructor() {
    this.hands = {};
    this.last = {};
    this.values = {};
    this.tests = {};
    this.lastTests = {};
    this.updated = false;
  }
  update({ xr, xrFrame }) {
    const xrSession = xr.getSession();
    if (!xrSession) {
      return;
    }
    const referenceSpace = xr.getReferenceSpace();
    if (!referenceSpace) {
      return;
    }
    if (!xrFrame.getJointPose) {
      return;
    }
    this.last = this.hands;
    this.lastTests = this.tests;
    this.hands = {};
    this.values = {};
    this.tests = {};
    for (const inputSource of xrSession.inputSources) {
      if (!inputSource.hand) {
        continue;
      }
      const hand = inputSource.handedness;
      this.hands[hand] = {};
      for (const jointId of JOINT_IDS) {
        const jointSpace = inputSource.hand.get(JointEnum[jointId]);
        if (jointSpace) {
          const jointPose = xrFrame.getJointPose(jointSpace, referenceSpace);
          if (jointPose) {
            const { position, orientation } = jointPose.transform;
            this.hands[hand][jointId] = {
              position: new Vector3(position.x, position.y, position.z),
              quaternion: new Quaternion(
                orientation.x,
                orientation.y,
                orientation.z,
                orientation.w
              ),
              radius: jointPose.radius || 1e-3
            };
          }
        }
      }
    }
    for (const hand of HANDS) {
      for (const { key, value } of [
        { key: `${hand}AllTips`, value: this.allTipsTouching(hand) },
        {
          key: `${hand}IndexThumb`,
          value: this.touching(hand, "i4", hand, "t3")
        },
        {
          key: `${hand}MiddleThumb`,
          value: this.touching(hand, "m4", hand, "t3")
        },
        {
          key: `${hand}RingThumb`,
          value: this.touching(hand, "r4", hand, "t3")
        },
        {
          key: `${hand}PinkyThumb`,
          value: this.touching(hand, "p4", hand, "t3")
        },
        { key: `${hand}TriTips`, value: this.triTipsTouching(hand) }
      ]) {
        this.values[key] = value;
        this.tests[key] = value === 1 ? true : value === 0 ? false : this.lastTests[key] ?? false;
      }
    }
  }
  makeGhostMesh() {
    const center = new Vector3();
    const scales = new Vector3(0.01, 0.01, 0.01);
    const quaternion = new Quaternion(0, 0, 0, 1);
    const color = new Color(1, 1, 1);
    const CYCLE = Math.PI * 3;
    new Color(1, 1, 1);
    let opacity = 1;
    const mesh = new SplatMesh({
      onFrame: () => {
        let splatIndex = 0;
        for (const handedness of HANDS) {
          const xrHand = this.hands[handedness];
          for (const [index, segment] of JOINT_SEGMENTS.entries()) {
            for (let i = 1; i < segment.length; ++i) {
              const segmentSplats = JOINT_SEGMENT_STEPS[index][i - 1] * 2;
              const lastSegment = i + 1 === segment.length;
              const jointA = xrHand == null ? void 0 : xrHand[segment[i - 1]];
              const jointB = xrHand == null ? void 0 : xrHand[segment[i]];
              for (let j = 0; j < segmentSplats; ++j) {
                const t = (j + 0.5) / segmentSplats;
                opacity = 0;
                if (jointA && jointB) {
                  center.copy(jointA.position).lerp(jointB.position, t);
                  quaternion.copy(jointA.quaternion).slerp(jointB.quaternion, t);
                  const radiusA = JOINT_RADIUS[segment[i - 1]];
                  const radiusB = JOINT_RADIUS[segment[i]];
                  let radius = (1 - t) * radiusA + t * radiusB;
                  if (lastSegment && t > 0.8) {
                    radius *= Math.sqrt(1 - ((t - 0.8) / 0.2) ** 2);
                  }
                  scales.set(0.65 * radius, 0.5 * radius, 3e-3);
                  color.set(
                    0.55 + 0.45 * Math.sin(center.x * CYCLE),
                    0.55 + 0.45 * Math.sin(center.y * CYCLE),
                    0.55 + 0.45 * Math.sin(center.z * CYCLE)
                  );
                  if (handedness === "right") {
                    color.set(1 - color.r, 1 - color.g, 1 - color.b);
                  }
                  opacity = 0.75;
                }
                mesh.packedSplats.setSplat(
                  splatIndex,
                  center,
                  scales,
                  quaternion,
                  opacity,
                  color
                );
                splatIndex += 1;
              }
            }
          }
        }
        mesh.packedSplats.numSplats = splatIndex;
        mesh.packedSplats.needsUpdate = true;
        mesh.numSplats = splatIndex;
        mesh.updateVersion();
      }
    });
    return mesh;
  }
  distance(handA, jointA, handB, jointB, last = false) {
    const hA = last ? this.last[handA] : this.hands[handA];
    const hB = last ? this.last[handB] : this.hands[handB];
    const jA = hA == null ? void 0 : hA[jointA];
    const jB = hB == null ? void 0 : hB[jointB];
    if (!jA || !jB) {
      return Number.POSITIVE_INFINITY;
    }
    return jA.position.distanceTo(jB.position);
  }
  separation(handA, jointA, handB, jointB, last = false) {
    const d = this.distance(handA, jointA, handB, jointB, last);
    if (d === Number.POSITIVE_INFINITY) {
      return Number.POSITIVE_INFINITY;
    }
    return d - JOINT_RADIUS[jointA] - JOINT_RADIUS[jointB];
  }
  touching(handA, jointA, handB, jointB, last = false) {
    const d = this.separation(handA, jointA, handB, jointB, last);
    if (d === Number.POSITIVE_INFINITY) {
      return Number.POSITIVE_INFINITY;
    }
    return 1 - Math.max(0, Math.min(1, d / 0.01 - TOUCH_BIAS));
  }
  allTipsTouching(hand, last = false) {
    return Math.min(
      this.touching(hand, "t3", hand, "i4", last),
      this.touching(hand, "i4", hand, "m4", last),
      this.touching(hand, "m4", hand, "r4", last),
      this.touching(hand, "r4", hand, "p4", last)
      // this.touching(hand, "p4", hand, "t3", last),
    );
  }
  triTipsTouching(hand, last = false) {
    return Math.min(
      this.touching(hand, "t3", hand, "i4", last),
      this.touching(hand, "i4", hand, "m4", last),
      this.touching(hand, "m4", hand, "t3", last)
    );
  }
}
class HandMovement {
  constructor({
    xrHands,
    control,
    moveInertia,
    rotateInertia
  }) {
    this.lastGrip = {};
    this.lastPivot = new Vector3();
    this.rotateVelocity = 0;
    this.velocity = new Vector3();
    this.xrHands = xrHands;
    this.control = control;
    this.moveInertia = moveInertia ?? DEFAULT_MOVE_INERTIA$1;
    this.rotateInertia = rotateInertia ?? DEFAULT_ROTATE_INERTIA$1;
  }
  update(deltaTime) {
    var _a2, _b2, _c, _d, _e;
    const grip = {};
    for (const handedness of HANDS) {
      const hand = this.xrHands.hands[handedness];
      if (hand && this.xrHands.tests[`${handedness}MiddleThumb`]) {
        grip[handedness] = new Vector3().add(((_a2 = hand.t3) == null ? void 0 : _a2.position) ?? new Vector3()).add(((_b2 = hand.i4) == null ? void 0 : _b2.position) ?? new Vector3()).add(((_c = hand.m4) == null ? void 0 : _c.position) ?? new Vector3()).add(((_d = hand.r4) == null ? void 0 : _d.position) ?? new Vector3()).add(((_e = hand.p4) == null ? void 0 : _e.position) ?? new Vector3()).multiplyScalar(1 / 5);
      }
    }
    if (grip.left && grip.right && this.lastGrip.left && this.lastGrip.right) {
      const mid = grip.left.clone().add(grip.right).multiplyScalar(0.5);
      const lastMid = this.lastGrip.left.clone().add(this.lastGrip.right).multiplyScalar(0.5);
      this.lastPivot = mid;
      const delta = mid.clone().applyMatrix4(this.control.matrix);
      delta.sub(lastMid.clone().applyMatrix4(this.control.matrix));
      delta.multiplyScalar(1 / deltaTime);
      this.velocity.lerp(delta, 1 - Math.exp(-20 * deltaTime));
      const angle = Math.atan2(grip.left.z - mid.z, grip.left.x - mid.x);
      const lastAngle = Math.atan2(
        this.lastGrip.left.z - lastMid.z,
        this.lastGrip.left.x - lastMid.x
      );
      let closestAngle = angle - lastAngle;
      if (closestAngle > Math.PI) {
        closestAngle -= Math.PI * 2;
      } else if (closestAngle < -Math.PI) {
        closestAngle += Math.PI * 2;
      }
      const rotateVelocity = closestAngle / deltaTime;
      const blend = Math.exp(-20 * deltaTime);
      this.rotateVelocity = this.rotateVelocity * blend + rotateVelocity * (1 - blend);
    } else {
      this.rotateVelocity *= Math.exp(-deltaTime / this.rotateInertia);
      if (grip.left && this.lastGrip.left) {
        const delta = grip.left.clone().applyMatrix4(this.control.matrix);
        delta.sub(this.lastGrip.left.clone().applyMatrix4(this.control.matrix));
        delta.multiplyScalar(1 / deltaTime);
        this.velocity.lerp(delta, 1 - Math.exp(-20 * deltaTime));
      } else if (grip.right && this.lastGrip.right) {
        const delta = grip.right.clone().applyMatrix4(this.control.matrix);
        delta.sub(
          this.lastGrip.right.clone().applyMatrix4(this.control.matrix)
        );
        delta.multiplyScalar(1 / deltaTime);
        this.velocity.lerp(delta, 1 - Math.exp(-20 * deltaTime));
      } else {
        this.velocity.multiplyScalar(Math.exp(-deltaTime / this.moveInertia));
      }
    }
    const negPivot = this.lastPivot.clone().negate();
    const rotate = new Matrix4().makeTranslation(negPivot).premultiply(new Matrix4().makeRotationY(this.rotateVelocity * deltaTime)).premultiply(new Matrix4().makeTranslation(this.lastPivot));
    this.control.matrix.multiply(rotate);
    this.control.matrix.decompose(
      this.control.position,
      this.control.quaternion,
      this.control.scale
    );
    this.control.updateMatrixWorld(true);
    this.control.position.sub(this.velocity.clone().multiplyScalar(deltaTime));
    this.lastGrip = grip;
  }
}
const DEFAULT_MOVEMENT_SPEED = 1;
const DEFAULT_ROLL_SPEED = 2;
const DEFAULT_ROTATE_SPEED = 2e-3;
const DEFAULT_SLIDE_SPEED = 6e-3;
const DEFAULT_SCROLL_SPEED = 15e-4;
const DEFAULT_ROTATE_INERTIA = 0.15;
const DEFAULT_MOVE_INERTIA = 0.15;
const DEFAULT_STICK_THRESHOLD = 0.1;
const DEFAULT_FPS_ROTATE_SPEED = 2;
const DEFAULT_POINTER_ROLL_SCALE = 1;
const DUAL_PRESS_MS = 200;
const DOUBLE_PRESS_LIMIT_MS = 400;
const DOUBLE_PRESS_DISTANCE = 50;
const WASD_KEYCODE_MOVE = {
  KeyW: new THREE.Vector3(0, 0, -1),
  KeyS: new THREE.Vector3(0, 0, 1),
  KeyA: new THREE.Vector3(-1, 0, 0),
  KeyD: new THREE.Vector3(1, 0, 0),
  KeyR: new THREE.Vector3(0, 1, 0),
  KeyF: new THREE.Vector3(0, -1, 0)
};
const ARROW_KEYCODE_MOVE = {
  ArrowUp: new THREE.Vector3(0, 0, -1),
  ArrowDown: new THREE.Vector3(0, 0, 1),
  ArrowLeft: new THREE.Vector3(-1, 0, 0),
  ArrowRight: new THREE.Vector3(1, 0, 0),
  PageUp: new THREE.Vector3(0, 1, 0),
  PageDown: new THREE.Vector3(0, -1, 0)
};
const QE_KEYCODE_ROTATE = {
  KeyQ: new THREE.Vector3(0, 0, 1),
  KeyE: new THREE.Vector3(0, 0, -1)
};
const ARROW_KEYCODE_ROTATE = {
  Home: new THREE.Vector3(0, -1, 0),
  End: new THREE.Vector3(0, 1, 0),
  Insert: new THREE.Vector3(-1, 0, 0),
  Delete: new THREE.Vector3(1, 0, 0)
};
class SparkControls {
  constructor({ canvas }) {
    this.lastTime = 0;
    this.fpsMovement = new FpsMovement({});
    this.pointerControls = new PointerControls({ canvas });
  }
  update(control) {
    const time = performance.now();
    const deltaTime = (time - (this.lastTime || time)) / 1e3;
    this.lastTime = time;
    this.fpsMovement.update(deltaTime, control);
    this.pointerControls.update(deltaTime, control);
  }
}
class FpsMovement {
  constructor({
    moveSpeed,
    rollSpeed,
    stickThreshold,
    rotateSpeed,
    keycodeMoveMapping,
    keycodeRotateMapping,
    gamepadMapping,
    capsMultiplier,
    shiftMultiplier,
    ctrlMultiplier,
    xr
  } = {}) {
    this.enable = true;
    this.moveSpeed = moveSpeed ?? DEFAULT_MOVEMENT_SPEED;
    this.rollSpeed = rollSpeed ?? DEFAULT_ROLL_SPEED;
    this.stickThreshold = stickThreshold ?? DEFAULT_STICK_THRESHOLD;
    this.rotateSpeed = rotateSpeed ?? DEFAULT_FPS_ROTATE_SPEED;
    this.keycodeMoveMapping = keycodeMoveMapping ?? {
      ...WASD_KEYCODE_MOVE,
      ...ARROW_KEYCODE_MOVE
    };
    this.keycodeRotateMapping = keycodeRotateMapping ?? {
      ...QE_KEYCODE_ROTATE,
      ...ARROW_KEYCODE_ROTATE
    };
    this.gamepadMapping = gamepadMapping ?? {
      4: "rollLeft",
      5: "rollRight",
      6: "ctrl",
      7: "shift"
    };
    this.capsMultiplier = capsMultiplier ?? 10;
    this.shiftMultiplier = shiftMultiplier ?? 5;
    this.ctrlMultiplier = ctrlMultiplier ?? 1 / 5;
    this.xr = xr;
    this.keydown = {};
    this.keycode = {};
    document.addEventListener("keydown", (event) => {
      this.keydown[event.key] = true;
      this.keycode[event.code] = true;
    });
    document.addEventListener("keyup", (event) => {
      this.keydown[event.key] = false;
      this.keycode[event.code] = false;
    });
    window.addEventListener("blur", () => {
      this.keydown = {};
      this.keycode = {};
    });
  }
  // Call this method in your render loop with `control` set to the object to control
  // (`THREE.Camera` or a `THREE.Object3D` that contains it), with `deltaTime`
  // in seconds since the last update.
  update(deltaTime, control) {
    var _a2, _b2;
    if (!this.enable) {
      return;
    }
    const sticks = [new THREE.Vector2(), new THREE.Vector2()];
    const gamepad = navigator.getGamepads()[0];
    if (gamepad) {
      sticks[0].set(gamepad.axes[0], gamepad.axes[1]);
      sticks[1].set(gamepad.axes[2], gamepad.axes[3]);
    }
    const gamepadButtons = (gamepad == null ? void 0 : gamepad.buttons.map((button) => button.pressed)) || [];
    const xrSources = Array.from(((_b2 = (_a2 = this.xr) == null ? void 0 : _a2.getSession()) == null ? void 0 : _b2.inputSources) ?? []);
    for (const source of xrSources) {
      const gamepad2 = source.gamepad;
      if (gamepad2) {
        switch (source.handedness) {
          case "none": {
            sticks[0].x += gamepad2.axes[0];
            sticks[0].y += gamepad2.axes[1];
            sticks[1].x += gamepad2.axes[2];
            sticks[1].y += gamepad2.axes[3];
            break;
          }
          case "left": {
            sticks[0].x += gamepad2.axes[2];
            sticks[0].y += gamepad2.axes[3];
            break;
          }
          case "right": {
            sticks[1].x += gamepad2.axes[2];
            sticks[1].y += gamepad2.axes[3];
            break;
          }
        }
      }
    }
    for (const stick of sticks) {
      stick.x = Math.abs(stick.x) >= this.stickThreshold ? stick.x : 0;
      stick.y = Math.abs(stick.y) >= this.stickThreshold ? stick.y : 0;
    }
    const rotate = new THREE.Vector3(
      sticks[1].x,
      sticks[1].y,
      0
    ).multiplyScalar(this.rotateSpeed);
    for (const [keycode, rot] of Object.entries(this.keycodeRotateMapping)) {
      if (this.keycode[keycode]) {
        rotate.add(rot);
      }
    }
    for (const button in this.gamepadMapping) {
      if (gamepadButtons[Number.parseInt(button)]) {
        switch (this.gamepadMapping[button]) {
          case "rollLeft":
            rotate.z += 1;
            break;
          case "rollRight":
            rotate.z -= 1;
            break;
        }
      }
    }
    rotate.multiply(
      new THREE.Vector3(this.rotateSpeed, this.rotateSpeed, this.rollSpeed)
    );
    if (rotate.manhattanLength() > 0) {
      rotate.multiplyScalar(deltaTime);
      const eulers = new THREE.Euler().setFromQuaternion(
        control.quaternion,
        "YXZ"
      );
      eulers.y -= rotate.x;
      eulers.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, eulers.x - rotate.y)
      );
      eulers.z = Math.max(-Math.PI, Math.min(Math.PI, eulers.z + rotate.z));
      control.quaternion.setFromEuler(eulers);
    }
    const moveVector = new THREE.Vector3(sticks[0].x, 0, sticks[0].y);
    for (const [keycode, move] of Object.entries(this.keycodeMoveMapping)) {
      if (this.keycode[keycode]) {
        moveVector.add(move);
      }
    }
    let speedMultiplier = 1;
    if (this.keydown.CapsLock) {
      speedMultiplier *= this.capsMultiplier;
    }
    if (this.keycode.ShiftLeft || this.keycode.ShiftRight) {
      speedMultiplier *= this.shiftMultiplier;
    }
    if (this.keycode.ControlLeft || this.keycode.ControlRight) {
      speedMultiplier *= this.ctrlMultiplier;
    }
    for (const button in this.gamepadMapping) {
      if (gamepadButtons[Number.parseInt(button)]) {
        switch (this.gamepadMapping[button]) {
          case "shift":
            speedMultiplier *= this.shiftMultiplier;
            break;
          case "ctrl":
            speedMultiplier *= this.ctrlMultiplier;
            break;
        }
      }
    }
    moveVector.applyQuaternion(control.quaternion);
    control.position.add(
      moveVector.multiplyScalar(this.moveSpeed * speedMultiplier * deltaTime)
    );
  }
}
class PointerControls {
  constructor({
    // The HTML canvas element to attach pointer events to
    canvas,
    // Speed of rotation (default DEFAULT_ROTATE_SPEED)
    rotateSpeed,
    // Speed of sliding when dragging with right/middle mouse button or two fingers
    // (default DEFAULT_SLIDE_SPEED)
    slideSpeed,
    // Speed of movement when using mouse scroll wheel (default DEFAULT_SCROLL_SPEED)
    scrollSpeed,
    // Swap the direction of rotation and sliding (default: false)
    swapRotateSlide,
    // Reverse the direction of rotation (default: false)
    reverseRotate,
    // Reverse the direction of sliding (default: false)
    reverseSlide,
    // Reverse the direction of swipe gestures (default: false)
    reverseSwipe,
    // Reverse the direction of scroll wheel movement (default: false)
    reverseScroll,
    // Inertia factor for movement (default: DEFAULT_MOVE_INERTIA)
    moveInertia,
    // Inertia factor for rotation (default: DEFAULT_ROTATE_INERTIA)
    rotateInertia,
    // Pointer rolling scale factor (default: DEFAULT_POINTER_ROLL_SCALE)
    pointerRollScale,
    // Callback for double press events (default: () => {})
    doublePress
  }) {
    this.enable = true;
    this.canvas = canvas;
    this.rotateSpeed = rotateSpeed ?? DEFAULT_ROTATE_SPEED;
    this.slideSpeed = slideSpeed ?? DEFAULT_SLIDE_SPEED;
    this.scrollSpeed = scrollSpeed ?? DEFAULT_SCROLL_SPEED;
    this.swapRotateSlide = swapRotateSlide ?? false;
    this.reverseRotate = reverseRotate ?? false;
    this.reverseSlide = reverseSlide ?? false;
    this.reverseSwipe = reverseSwipe ?? false;
    this.reverseScroll = reverseScroll ?? false;
    this.moveInertia = moveInertia ?? DEFAULT_MOVE_INERTIA;
    this.rotateInertia = rotateInertia ?? DEFAULT_ROTATE_INERTIA;
    this.pointerRollScale = pointerRollScale ?? DEFAULT_POINTER_ROLL_SCALE;
    this.doublePress = doublePress ?? (() => {
    });
    this.doublePressLimitMs = DOUBLE_PRESS_LIMIT_MS;
    this.doublePressDistance = DOUBLE_PRESS_DISTANCE;
    this.lastUp = null;
    this.rotating = null;
    this.sliding = null;
    this.dualPress = false;
    this.scroll = new THREE.Vector3();
    this.rotateVelocity = new THREE.Vector3();
    this.moveVelocity = new THREE.Vector3();
    canvas.addEventListener("pointerdown", (event) => {
      const position = this.getPointerPosition(event);
      const initial = position.clone();
      const last = position.clone();
      const isRotate = !this.swapRotateSlide && !this.rotating && (event.pointerType !== "mouse" || event.button === 0) || this.swapRotateSlide && this.sliding && !this.rotating && (event.pointerType !== "mouse" || event.button === 1);
      const { pointerId, timeStamp } = event;
      if (isRotate) {
        this.rotating = { initial, last, position, pointerId, timeStamp };
        canvas.setPointerCapture(event.pointerId);
        this.dualPress = false;
      } else if (!this.sliding) {
        const button = event.pointerType === "mouse" ? event.button : void 0;
        this.sliding = {
          initial,
          last,
          position,
          pointerId,
          button,
          timeStamp
        };
        canvas.setPointerCapture(event.pointerId);
        this.dualPress = this.rotating != null && timeStamp - this.rotating.timeStamp < DUAL_PRESS_MS;
      }
    });
    const pointerUp = (event) => {
      var _a2, _b2;
      if (((_a2 = this.rotating) == null ? void 0 : _a2.pointerId) === event.pointerId) {
        this.rotating = null;
        canvas.releasePointerCapture(event.pointerId);
        if (this.dualPress && this.sliding) {
          canvas.releasePointerCapture(this.sliding.pointerId);
          this.sliding = null;
        }
      } else if (((_b2 = this.sliding) == null ? void 0 : _b2.pointerId) === event.pointerId) {
        this.sliding = null;
        canvas.releasePointerCapture(event.pointerId);
        if (this.dualPress && this.rotating) {
          canvas.releasePointerCapture(this.rotating.pointerId);
          this.rotating = null;
        }
      }
      const position = this.getPointerPosition(event);
      const lastUp = this.lastUp;
      this.lastUp = { position, time: event.timeStamp };
      if (lastUp) {
        const distance2 = lastUp.position.distanceTo(position);
        if (distance2 < this.doublePressDistance) {
          const intervalMs = event.timeStamp - lastUp.time;
          if (intervalMs < this.doublePressLimitMs) {
            this.lastUp = null;
            this.doublePress({ position, intervalMs });
          }
        }
      }
    };
    document.addEventListener("pointerup", pointerUp);
    document.addEventListener("pointercancel", pointerUp);
    document.addEventListener("pointermove", (event) => {
      var _a2, _b2;
      if (((_a2 = this.rotating) == null ? void 0 : _a2.pointerId) === event.pointerId) {
        this.rotating.position = this.getPointerPosition(event);
      } else if (((_b2 = this.sliding) == null ? void 0 : _b2.pointerId) === event.pointerId) {
        this.sliding.position = this.getPointerPosition(event);
      }
    });
    canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    canvas.addEventListener("wheel", (event) => {
      this.scroll.add(
        new THREE.Vector3(event.deltaX, event.deltaY, event.deltaZ)
      );
      event.preventDefault();
    });
  }
  getPointerPosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    return new THREE.Vector2(
      event.clientX - rect.left,
      event.clientY - rect.top
    );
  }
  update(deltaTime, control) {
    if (!this.enable) {
      return;
    }
    if (this.dualPress && this.rotating && this.sliding) {
      const motion = [
        this.rotating.position.clone().sub(this.rotating.last),
        this.sliding.position.clone().sub(this.sliding.last)
      ];
      const coincidence = motion[0].dot(motion[1]);
      if (coincidence >= 0.2) {
        const totalMotion = motion[0].clone().add(motion[1]);
        const slide = new THREE.Vector3(totalMotion.x, -totalMotion.y, 0);
        slide.multiplyScalar(this.slideSpeed * (this.reverseSwipe ? 1 : -1));
        slide.applyQuaternion(control.quaternion);
        control.position.add(slide);
        this.moveVelocity = slide.clone().multiplyScalar(1 / deltaTime);
      } else if (coincidence <= -0.2) {
        const deltaDir = this.sliding.last.clone().sub(this.rotating.last);
        const deltaDist = deltaDir.length();
        deltaDir.multiplyScalar(1 / deltaDist).normalize();
        const orthoDir = new THREE.Vector2(-deltaDir.y, deltaDir.x);
        const motionDir = [motion[0].dot(deltaDir), motion[1].dot(deltaDir)];
        const motionOrtho = [motion[0].dot(orthoDir), motion[1].dot(orthoDir)];
        const midpoint = this.rotating.last.clone().add(this.sliding.last).multiplyScalar(0.5);
        let midpointDir = new THREE.Vector3();
        if (control instanceof THREE.Camera) {
          const ndcMidpoint = new THREE.Vector2(
            midpoint.x / this.canvas.clientWidth * 2 - 1,
            -(midpoint.y / this.canvas.clientHeight) * 2 + 1
          );
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(ndcMidpoint, control);
          midpointDir = raycaster.ray.direction;
        }
        const pinchOut = motionDir[1] - motionDir[0];
        const slide = midpointDir.multiplyScalar(pinchOut * this.slideSpeed);
        control.position.add(slide);
        this.moveVelocity = slide.clone().multiplyScalar(1 / deltaTime);
        const angles = [
          Math.atan(motionOrtho[0] / (-0.5 * deltaDist)),
          Math.atan(motionOrtho[1] / (0.5 * deltaDist))
        ];
        const rotate = 0.5 * (angles[0] + angles[1]) * this.pointerRollScale;
        const eulers = new THREE.Euler().setFromQuaternion(
          control.quaternion,
          "YXZ"
        );
        eulers.z = Math.max(
          -Math.PI,
          Math.min(Math.PI, eulers.z + 0.5 * rotate)
        );
        control.quaternion.setFromEuler(eulers);
      }
      this.rotating.last.copy(this.rotating.position);
      this.sliding.last.copy(this.sliding.position);
    } else {
      const rotate = new THREE.Vector3();
      if (this.rotating && !this.dualPress) {
        const delta = this.rotating.position.clone().sub(this.rotating.last);
        this.rotating.last.copy(this.rotating.position);
        rotate.set(delta.x, delta.y, 0);
        rotate.multiplyScalar(this.rotateSpeed * (this.reverseRotate ? -1 : 1));
        this.rotateVelocity = rotate.clone().multiplyScalar(1 / deltaTime);
      } else {
        this.rotateVelocity.multiplyScalar(
          Math.exp(-deltaTime / this.rotateInertia)
        );
        rotate.addScaledVector(this.rotateVelocity, deltaTime);
      }
      const eulers = new THREE.Euler().setFromQuaternion(
        control.quaternion,
        "YXZ"
      );
      eulers.y -= rotate.x;
      eulers.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, eulers.x - rotate.y)
      );
      eulers.z *= Math.exp(-0 * deltaTime);
      control.quaternion.setFromEuler(eulers);
      if (this.sliding && !this.dualPress) {
        const delta = this.sliding.position.clone().sub(this.sliding.last);
        this.sliding.last.copy(this.sliding.position);
        const slide = this.sliding.button !== 2 ? new THREE.Vector3(delta.x, 0, delta.y) : new THREE.Vector3(delta.x, -delta.y, 0);
        slide.multiplyScalar(this.slideSpeed * (this.reverseSlide ? -1 : 1));
        slide.applyQuaternion(control.quaternion);
        control.position.add(slide);
        this.moveVelocity = slide.clone().multiplyScalar(1 / deltaTime);
      } else {
        this.moveVelocity.multiplyScalar(
          Math.exp(-deltaTime / this.moveInertia)
        );
        control.position.addScaledVector(this.moveVelocity, deltaTime);
      }
    }
    const scroll = this.scroll.multiplyScalar(this.scrollSpeed);
    scroll.set(scroll.x, scroll.z, scroll.y);
    if (this.reverseScroll) {
      scroll.multiplyScalar(-1);
    }
    scroll.applyQuaternion(control.quaternion);
    control.position.add(scroll);
    this.scroll.set(0, 0, 0);
  }
}
export {
  FINGER_TIPS,
  FpsMovement,
  HANDS,
  Hand,
  HandMovement,
  JOINT_IDS,
  JOINT_INDEX,
  JOINT_RADIUS,
  JOINT_SEGMENTS,
  JOINT_SEGMENT_STEPS,
  JOINT_TIPS,
  JointEnum,
  NUM_JOINTS,
  PackedSplats,
  PlyReader,
  PointerControls,
  Readback,
  Sint8ToFloat,
  SparkControls,
  SparkRenderer,
  SparkViewpoint,
  SplatAccumulator,
  SplatEdit,
  SplatEditRgbaBlendMode,
  SplatEditSdf,
  SplatEditSdfType,
  SplatEdits,
  SplatFileType,
  SplatGenerator,
  SplatLoader,
  SplatMesh,
  SplatModifier,
  SplatSkinning,
  SplatTransformer,
  SpzReader,
  SpzWriter,
  Uint8ToFloat,
  VRButton,
  XrHands,
  constructAxes,
  constructGrid,
  constructSpherePoints,
  dyno,
  flipPixels,
  floatToSint8,
  floatToUint8,
  fromHalf,
  generators,
  getSplatFileType,
  imageSplats,
  isAndroid,
  isMobile,
  isOculus,
  isPcSogs,
  modifiers,
  pixelsToPngUrl,
  setPackedSplat,
  textSplats,
  toHalf,
  transcodeSpz,
  unpackSplat,
  unpackSplats,
  utils
};
//# sourceMappingURL=spark.module.js.map
