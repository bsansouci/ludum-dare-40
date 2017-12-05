var ludumdare = (function (exports) {
'use strict';

var out_of_memory = /* tuple */[
  "Out_of_memory",
  0
];

var sys_error = /* tuple */[
  "Sys_error",
  -1
];

var failure = /* tuple */[
  "Failure",
  -2
];

var invalid_argument = /* tuple */[
  "Invalid_argument",
  -3
];

var end_of_file = /* tuple */[
  "End_of_file",
  -4
];

var division_by_zero = /* tuple */[
  "Division_by_zero",
  -5
];

var not_found = /* tuple */[
  "Not_found",
  -6
];

var match_failure = /* tuple */[
  "Match_failure",
  -7
];

var stack_overflow = /* tuple */[
  "Stack_overflow",
  -8
];

var sys_blocked_io = /* tuple */[
  "Sys_blocked_io",
  -9
];

var assert_failure = /* tuple */[
  "Assert_failure",
  -10
];

var undefined_recursive_module = /* tuple */[
  "Undefined_recursive_module",
  -11
];

out_of_memory.tag = 248;

sys_error.tag = 248;

failure.tag = 248;

invalid_argument.tag = 248;

end_of_file.tag = 248;

division_by_zero.tag = 248;

not_found.tag = 248;

match_failure.tag = 248;

stack_overflow.tag = 248;

sys_blocked_io.tag = 248;

assert_failure.tag = 248;

undefined_recursive_module.tag = 248;


/*  Not a pure module */

function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }
  return result;
}

function caml_array_set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    xs[index] = newval;
    return /* () */0;
  }
}

function caml_array_get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return xs[index];
  }
}

function caml_make_vect(len, init) {
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = init;
  }
  return b;
}

function caml_array_blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for(var j = 0 ,j_finish = len - 1 | 0; j <= j_finish; ++j){
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }
    return /* () */0;
  } else {
    for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
      a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
    }
    return /* () */0;
  }
}


/* No side effect */

function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var arity = f.length;
    var arity$1 = arity ? arity : 1;
    var len = args.length;
    var d = arity$1 - len | 0;
    if (d) {
      if (d < 0) {
        _args = caml_array_sub(args, arity$1, -d | 0);
        _f = f.apply(null, caml_array_sub(args, 0, arity$1));
        continue ;
        
      } else {
        return (function(f,args){
        return function (x) {
          return app(f, args.concat(/* array */[x]));
        }
        }(f,args));
      }
    } else {
      return f.apply(null, args);
    }
  }
}

function curry_1(o, a0, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[a0]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return o(a0);
      case 2 : 
          return (function (param) {
              return o(a0, param);
            });
      case 3 : 
          return (function (param, param$1) {
              return o(a0, param, param$1);
            });
      case 4 : 
          return (function (param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            });
      case 5 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            });
      
    }
  }
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    return curry_1(o, a0, arity);
  }
}

function curry_2(o, a0, a1, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return app(o(a0), /* array */[a1]);
      case 2 : 
          return o(a0, a1);
      case 3 : 
          return (function (param) {
              return o(a0, a1, param);
            });
      case 4 : 
          return (function (param, param$1) {
              return o(a0, a1, param, param$1);
            });
      case 5 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            });
      
    }
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    return curry_2(o, a0, a1, arity);
  }
}

function curry_3(o, a0, a1, a2, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[a2]);
      case 3 : 
          return o(a0, a1, a2);
      case 4 : 
          return (function (param) {
              return o(a0, a1, a2, param);
            });
      case 5 : 
          return (function (param, param$1) {
              return o(a0, a1, a2, param, param$1);
            });
      case 6 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, a2, param, param$1, param$2);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, a1, a2, param, param$1, param$2, param$3);
            });
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2
              ]);
  }
  
}

function _3(o, a0, a1, a2) {
  var arity = o.length;
  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    return curry_3(o, a0, a1, a2, arity);
  }
}

function curry_4(o, a0, a1, a2, a3, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2,
                a3
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[
                      a2,
                      a3
                    ]);
      case 3 : 
          return app(o(a0, a1, a2), /* array */[a3]);
      case 4 : 
          return o(a0, a1, a2, a3);
      case 5 : 
          return (function (param) {
              return o(a0, a1, a2, a3, param);
            });
      case 6 : 
          return (function (param, param$1) {
              return o(a0, a1, a2, a3, param, param$1);
            });
      case 7 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, a2, a3, param, param$1, param$2);
            });
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2,
                a3
              ]);
  }
  
}

function _4(o, a0, a1, a2, a3) {
  var arity = o.length;
  if (arity === 4) {
    return o(a0, a1, a2, a3);
  } else {
    return curry_4(o, a0, a1, a2, a3, arity);
  }
}

function curry_5(o, a0, a1, a2, a3, a4, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2,
                a3,
                a4
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[
                      a2,
                      a3,
                      a4
                    ]);
      case 3 : 
          return app(o(a0, a1, a2), /* array */[
                      a3,
                      a4
                    ]);
      case 4 : 
          return app(o(a0, a1, a2, a3), /* array */[a4]);
      case 5 : 
          return o(a0, a1, a2, a3, a4);
      case 6 : 
          return (function (param) {
              return o(a0, a1, a2, a3, a4, param);
            });
      case 7 : 
          return (function (param, param$1) {
              return o(a0, a1, a2, a3, a4, param, param$1);
            });
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2,
                a3,
                a4
              ]);
  }
  
}

function _5(o, a0, a1, a2, a3, a4) {
  var arity = o.length;
  if (arity === 5) {
    return o(a0, a1, a2, a3, a4);
  } else {
    return curry_5(o, a0, a1, a2, a3, a4, arity);
  }
}

function curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity) {
  var exit = 0;
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1,
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          exit = 1;
          break;
      case 2 : 
          return app(o(a0, a1), /* array */[
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 3 : 
          return app(o(a0, a1, a2), /* array */[
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 4 : 
          return app(o(a0, a1, a2, a3), /* array */[
                      a4,
                      a5,
                      a6
                    ]);
      case 5 : 
          return app(o(a0, a1, a2, a3, a4), /* array */[
                      a5,
                      a6
                    ]);
      case 6 : 
          return app(o(a0, a1, a2, a3, a4, a5), /* array */[a6]);
      case 7 : 
          return o(a0, a1, a2, a3, a4, a5, a6);
      
    }
  }
  if (exit === 1) {
    return app(o(a0), /* array */[
                a1,
                a2,
                a3,
                a4,
                a5,
                a6
              ]);
  }
  
}

function _7(o, a0, a1, a2, a3, a4, a5, a6) {
  var arity = o.length;
  if (arity === 7) {
    return o(a0, a1, a2, a3, a4, a5, a6);
  } else {
    return curry_7(o, a0, a1, a2, a3, a4, a5, a6, arity);
  }
}


/* No side effect */

function Make(funarg) {
  var height = function (param) {
    if (param) {
      return param[4];
    } else {
      return 0;
    }
  };
  var create = function (l, x, d, r) {
    var hl = height(l);
    var hr = height(r);
    return /* Node */[
            l,
            x,
            d,
            r,
            hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  };
  var singleton = function (x, d) {
    return /* Node */[
            /* Empty */0,
            x,
            d,
            /* Empty */0,
            1
          ];
  };
  var bal = function (l, x, d, r) {
    var hl = l ? l[4] : 0;
    var hr = r ? r[4] : 0;
    if (hl > (hr + 2 | 0)) {
      if (l) {
        var lr = l[3];
        var ld = l[2];
        var lv = l[1];
        var ll = l[0];
        if (height(ll) >= height(lr)) {
          return create(ll, lv, ld, create(lr, x, d, r));
        } else if (lr) {
          return create(create(ll, lv, ld, lr[0]), lr[1], lr[2], create(lr[3], x, d, r));
        } else {
          throw [
                invalid_argument,
                "Map.bal"
              ];
        }
      } else {
        throw [
              invalid_argument,
              "Map.bal"
            ];
      }
    } else if (hr > (hl + 2 | 0)) {
      if (r) {
        var rr = r[3];
        var rd = r[2];
        var rv = r[1];
        var rl = r[0];
        if (height(rr) >= height(rl)) {
          return create(create(l, x, d, rl), rv, rd, rr);
        } else if (rl) {
          return create(create(l, x, d, rl[0]), rl[1], rl[2], create(rl[3], rv, rd, rr));
        } else {
          throw [
                invalid_argument,
                "Map.bal"
              ];
        }
      } else {
        throw [
              invalid_argument,
              "Map.bal"
            ];
      }
    } else {
      return /* Node */[
              l,
              x,
              d,
              r,
              hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    }
  };
  var is_empty = function (param) {
    if (param) {
      return /* false */0;
    } else {
      return /* true */1;
    }
  };
  var add = function (x, data, param) {
    if (param) {
      var r = param[3];
      var d = param[2];
      var v = param[1];
      var l = param[0];
      var c = _2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          return bal(add(x, data, l), v, d, r);
        } else {
          return bal(l, v, d, add(x, data, r));
        }
      } else {
        return /* Node */[
                l,
                x,
                data,
                r,
                param[4]
              ];
      }
    } else {
      return /* Node */[
              /* Empty */0,
              x,
              data,
              /* Empty */0,
              1
            ];
    }
  };
  var find = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var c = _2(funarg[/* compare */0], x, param[1]);
        if (c) {
          _param = c < 0 ? param[0] : param[3];
          continue ;
          
        } else {
          return param[2];
        }
      } else {
        throw not_found;
      }
    }
  };
  var mem = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var c = _2(funarg[/* compare */0], x, param[1]);
        if (c) {
          _param = c < 0 ? param[0] : param[3];
          continue ;
          
        } else {
          return /* true */1;
        }
      } else {
        return /* false */0;
      }
    }
  };
  var min_binding = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var l = param[0];
        if (l) {
          _param = l;
          continue ;
          
        } else {
          return /* tuple */[
                  param[1],
                  param[2]
                ];
        }
      } else {
        throw not_found;
      }
    }
  };
  var max_binding = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var r = param[3];
        if (r) {
          _param = r;
          continue ;
          
        } else {
          return /* tuple */[
                  param[1],
                  param[2]
                ];
        }
      } else {
        throw not_found;
      }
    }
  };
  var remove_min_binding = function (param) {
    if (param) {
      var l = param[0];
      if (l) {
        return bal(remove_min_binding(l), param[1], param[2], param[3]);
      } else {
        return param[3];
      }
    } else {
      throw [
            invalid_argument,
            "Map.remove_min_elt"
          ];
    }
  };
  var remove = function (x, param) {
    if (param) {
      var r = param[3];
      var d = param[2];
      var v = param[1];
      var l = param[0];
      var c = _2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          return bal(remove(x, l), v, d, r);
        } else {
          return bal(l, v, d, remove(x, r));
        }
      } else {
        var t1 = l;
        var t2 = r;
        if (t1) {
          if (t2) {
            var match = min_binding(t2);
            return bal(t1, match[0], match[1], remove_min_binding(t2));
          } else {
            return t1;
          }
        } else {
          return t2;
        }
      }
    } else {
      return /* Empty */0;
    }
  };
  var iter = function (f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        iter(f, param[0]);
        _2(f, param[1], param[2]);
        _param = param[3];
        continue ;
        
      } else {
        return /* () */0;
      }
    }
  };
  var map = function (f, param) {
    if (param) {
      var l$prime = map(f, param[0]);
      var d$prime = _1(f, param[2]);
      var r$prime = map(f, param[3]);
      return /* Node */[
              l$prime,
              param[1],
              d$prime,
              r$prime,
              param[4]
            ];
    } else {
      return /* Empty */0;
    }
  };
  var mapi = function (f, param) {
    if (param) {
      var v = param[1];
      var l$prime = mapi(f, param[0]);
      var d$prime = _2(f, v, param[2]);
      var r$prime = mapi(f, param[3]);
      return /* Node */[
              l$prime,
              v,
              d$prime,
              r$prime,
              param[4]
            ];
    } else {
      return /* Empty */0;
    }
  };
  var fold = function (f, _m, _accu) {
    while(true) {
      var accu = _accu;
      var m = _m;
      if (m) {
        _accu = _3(f, m[1], m[2], fold(f, m[0], accu));
        _m = m[3];
        continue ;
        
      } else {
        return accu;
      }
    }
  };
  var for_all = function (p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (_2(p, param[1], param[2])) {
          if (for_all(p, param[0])) {
            _param = param[3];
            continue ;
            
          } else {
            return /* false */0;
          }
        } else {
          return /* false */0;
        }
      } else {
        return /* true */1;
      }
    }
  };
  var exists = function (p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (_2(p, param[1], param[2])) {
          return /* true */1;
        } else if (exists(p, param[0])) {
          return /* true */1;
        } else {
          _param = param[3];
          continue ;
          
        }
      } else {
        return /* false */0;
      }
    }
  };
  var add_min_binding = function (k, v, param) {
    if (param) {
      return bal(add_min_binding(k, v, param[0]), param[1], param[2], param[3]);
    } else {
      return singleton(k, v);
    }
  };
  var add_max_binding = function (k, v, param) {
    if (param) {
      return bal(param[0], param[1], param[2], add_max_binding(k, v, param[3]));
    } else {
      return singleton(k, v);
    }
  };
  var join = function (l, v, d, r) {
    if (l) {
      if (r) {
        var rh = r[4];
        var lh = l[4];
        if (lh > (rh + 2 | 0)) {
          return bal(l[0], l[1], l[2], join(l[3], v, d, r));
        } else if (rh > (lh + 2 | 0)) {
          return bal(join(l, v, d, r[0]), r[1], r[2], r[3]);
        } else {
          return create(l, v, d, r);
        }
      } else {
        return add_max_binding(v, d, l);
      }
    } else {
      return add_min_binding(v, d, r);
    }
  };
  var concat = function (t1, t2) {
    if (t1) {
      if (t2) {
        var match = min_binding(t2);
        return join(t1, match[0], match[1], remove_min_binding(t2));
      } else {
        return t1;
      }
    } else {
      return t2;
    }
  };
  var concat_or_join = function (t1, v, d, t2) {
    if (d) {
      return join(t1, v, d[0], t2);
    } else {
      return concat(t1, t2);
    }
  };
  var split = function (x, param) {
    if (param) {
      var r = param[3];
      var d = param[2];
      var v = param[1];
      var l = param[0];
      var c = _2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          var match = split(x, l);
          return /* tuple */[
                  match[0],
                  match[1],
                  join(match[2], v, d, r)
                ];
        } else {
          var match$1 = split(x, r);
          return /* tuple */[
                  join(l, v, d, match$1[0]),
                  match$1[1],
                  match$1[2]
                ];
        }
      } else {
        return /* tuple */[
                l,
                /* Some */[d],
                r
              ];
      }
    } else {
      return /* tuple */[
              /* Empty */0,
              /* None */0,
              /* Empty */0
            ];
    }
  };
  var merge = function (f, s1, s2) {
    var exit = 0;
    if (s1) {
      var v1 = s1[1];
      if (s1[4] >= height(s2)) {
        var match = split(v1, s2);
        return concat_or_join(merge(f, s1[0], match[0]), v1, _3(f, v1, /* Some */[s1[2]], match[1]), merge(f, s1[3], match[2]));
      } else {
        exit = 1;
      }
    } else if (s2) {
      exit = 1;
    } else {
      return /* Empty */0;
    }
    if (exit === 1) {
      if (s2) {
        var v2 = s2[1];
        var match$1 = split(v2, s1);
        return concat_or_join(merge(f, match$1[0], s2[0]), v2, _3(f, v2, match$1[1], /* Some */[s2[2]]), merge(f, match$1[2], s2[3]));
      } else {
        throw [
              assert_failure,
              [
                "map.ml",
                270,
                10
              ]
            ];
      }
    }
    
  };
  var filter = function (p, param) {
    if (param) {
      var d = param[2];
      var v = param[1];
      var l$prime = filter(p, param[0]);
      var pvd = _2(p, v, d);
      var r$prime = filter(p, param[3]);
      if (pvd) {
        return join(l$prime, v, d, r$prime);
      } else {
        return concat(l$prime, r$prime);
      }
    } else {
      return /* Empty */0;
    }
  };
  var partition = function (p, param) {
    if (param) {
      var d = param[2];
      var v = param[1];
      var match = partition(p, param[0]);
      var lf = match[1];
      var lt = match[0];
      var pvd = _2(p, v, d);
      var match$1 = partition(p, param[3]);
      var rf = match$1[1];
      var rt = match$1[0];
      if (pvd) {
        return /* tuple */[
                join(lt, v, d, rt),
                concat(lf, rf)
              ];
      } else {
        return /* tuple */[
                concat(lt, rt),
                join(lf, v, d, rf)
              ];
      }
    } else {
      return /* tuple */[
              /* Empty */0,
              /* Empty */0
            ];
    }
  };
  var cons_enum = function (_m, _e) {
    while(true) {
      var e = _e;
      var m = _m;
      if (m) {
        _e = /* More */[
          m[1],
          m[2],
          m[3],
          e
        ];
        _m = m[0];
        continue ;
        
      } else {
        return e;
      }
    }
  };
  var compare = function (cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (e1) {
        if (e2) {
          var c = _2(funarg[/* compare */0], e1[0], e2[0]);
          if (c !== 0) {
            return c;
          } else {
            var c$1 = _2(cmp, e1[1], e2[1]);
            if (c$1 !== 0) {
              return c$1;
            } else {
              _e2 = cons_enum(e2[2], e2[3]);
              _e1 = cons_enum(e1[2], e1[3]);
              continue ;
              
            }
          }
        } else {
          return 1;
        }
      } else if (e2) {
        return -1;
      } else {
        return 0;
      }
    }
  };
  var equal = function (cmp, m1, m2) {
    var _e1 = cons_enum(m1, /* End */0);
    var _e2 = cons_enum(m2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (e1) {
        if (e2) {
          if (_2(funarg[/* compare */0], e1[0], e2[0])) {
            return /* false */0;
          } else if (_2(cmp, e1[1], e2[1])) {
            _e2 = cons_enum(e2[2], e2[3]);
            _e1 = cons_enum(e1[2], e1[3]);
            continue ;
            
          } else {
            return /* false */0;
          }
        } else {
          return /* false */0;
        }
      } else if (e2) {
        return /* false */0;
      } else {
        return /* true */1;
      }
    }
  };
  var cardinal = function (param) {
    if (param) {
      return (cardinal(param[0]) + 1 | 0) + cardinal(param[3]) | 0;
    } else {
      return 0;
    }
  };
  var bindings_aux = function (_accu, _param) {
    while(true) {
      var param = _param;
      var accu = _accu;
      if (param) {
        _param = param[0];
        _accu = /* :: */[
          /* tuple */[
            param[1],
            param[2]
          ],
          bindings_aux(accu, param[3])
        ];
        continue ;
        
      } else {
        return accu;
      }
    }
  };
  var bindings = function (s) {
    return bindings_aux(/* [] */0, s);
  };
  return [
          /* Empty */0,
          is_empty,
          mem,
          add,
          singleton,
          remove,
          merge,
          compare,
          equal,
          iter,
          fold,
          for_all,
          exists,
          filter,
          partition,
          cardinal,
          bindings,
          min_binding,
          max_binding,
          min_binding,
          split,
          find,
          map,
          mapi
        ];
}


/* No side effect */

function __(tag, block) {
  block.tag = tag;
  return block;
}


/* No side effect */

function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_compare(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return 0;
    } else {
      var a_type = typeof a;
      var b_type = typeof b;
      if (a_type === "string") {
        var x = a;
        var y = b;
        if (x < y) {
          return -1;
        } else if (x === y) {
          return 0;
        } else {
          return 1;
        }
      } else {
        var is_a_number = +(a_type === "number");
        var is_b_number = +(b_type === "number");
        if (is_a_number !== 0) {
          if (is_b_number !== 0) {
            return caml_int_compare(a, b);
          } else {
            return -1;
          }
        } else if (is_b_number !== 0) {
          return 1;
        } else if (a_type === "boolean" || a_type === "undefined" || a === null) {
          var x$1 = a;
          var y$1 = b;
          if (x$1 === y$1) {
            return 0;
          } else if (x$1 < y$1) {
            return -1;
          } else {
            return 1;
          }
        } else if (a_type === "function" || b_type === "function") {
          throw [
                invalid_argument,
                "compare: functional value"
              ];
        } else {
          var tag_a = a.tag | 0;
          var tag_b = b.tag | 0;
          if (tag_a === 250) {
            _a = a[0];
            continue ;
            
          } else if (tag_b === 250) {
            _b = b[0];
            continue ;
            
          } else if (tag_a === 248) {
            return caml_int_compare(a[1], b[1]);
          } else if (tag_a === 251) {
            throw [
                  invalid_argument,
                  "equal: abstract value"
                ];
          } else if (tag_a !== tag_b) {
            if (tag_a < tag_b) {
              return -1;
            } else {
              return 1;
            }
          } else {
            var len_a = a.length | 0;
            var len_b = b.length | 0;
            if (len_a === len_b) {
              var a$1 = a;
              var b$1 = b;
              var _i = 0;
              var same_length = len_a;
              while(true) {
                var i = _i;
                if (i === same_length) {
                  return 0;
                } else {
                  var res = caml_compare(a$1[i], b$1[i]);
                  if (res !== 0) {
                    return res;
                  } else {
                    _i = i + 1 | 0;
                    continue ;
                    
                  }
                }
              }
            } else if (len_a < len_b) {
              var a$2 = a;
              var b$2 = b;
              var _i$1 = 0;
              var short_length = len_a;
              while(true) {
                var i$1 = _i$1;
                if (i$1 === short_length) {
                  return -1;
                } else {
                  var res$1 = caml_compare(a$2[i$1], b$2[i$1]);
                  if (res$1 !== 0) {
                    return res$1;
                  } else {
                    _i$1 = i$1 + 1 | 0;
                    continue ;
                    
                  }
                }
              }
            } else {
              var a$3 = a;
              var b$3 = b;
              var _i$2 = 0;
              var short_length$1 = len_b;
              while(true) {
                var i$2 = _i$2;
                if (i$2 === short_length$1) {
                  return 1;
                } else {
                  var res$2 = caml_compare(a$3[i$2], b$3[i$2]);
                  if (res$2 !== 0) {
                    return res$2;
                  } else {
                    _i$2 = i$2 + 1 | 0;
                    continue ;
                    
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function caml_equal(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return /* true */1;
    } else {
      var a_type = typeof a;
      if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
        return /* false */0;
      } else {
        var b_type = typeof b;
        if (a_type === "function" || b_type === "function") {
          throw [
                invalid_argument,
                "equal: functional value"
              ];
        } else if (b_type === "number" || b_type === "undefined" || b === null) {
          return /* false */0;
        } else {
          var tag_a = a.tag | 0;
          var tag_b = b.tag | 0;
          if (tag_a === 250) {
            _a = a[0];
            continue ;
            
          } else if (tag_b === 250) {
            _b = b[0];
            continue ;
            
          } else if (tag_a === 248) {
            return +(a[1] === b[1]);
          } else if (tag_a === 251) {
            throw [
                  invalid_argument,
                  "equal: abstract value"
                ];
          } else if (tag_a !== tag_b) {
            return /* false */0;
          } else {
            var len_a = a.length | 0;
            var len_b = b.length | 0;
            if (len_a === len_b) {
              var a$1 = a;
              var b$1 = b;
              var _i = 0;
              var same_length = len_a;
              while(true) {
                var i = _i;
                if (i === same_length) {
                  return /* true */1;
                } else if (caml_equal(a$1[i], b$1[i])) {
                  _i = i + 1 | 0;
                  continue ;
                  
                } else {
                  return /* false */0;
                }
              }
            } else {
              return /* false */0;
            }
          }
        }
      }
    }
  }
}

function caml_notequal(a, b) {
  return 1 - caml_equal(a, b);
}

function caml_greaterequal(a, b) {
  return +(caml_compare(a, b) >= 0);
}

function caml_lessequal(a, b) {
  return +(caml_compare(a, b) <= 0);
}


/* No side effect */

/* stdin Not a pure module */

function caml_sys_random_seed() {
  return /* array */[((Date.now() | 0) ^ 4294967295) * Math.random() | 0];
}

function caml_sys_get_argv() {
  var match = typeof (process) === "undefined" ? undefined : (process);
  if (match !== undefined) {
    if (match.argv == null) {
      return /* tuple */[
              "",
              /* array */[""]
            ];
    } else {
      return /* tuple */[
              match.argv[0],
              match.argv
            ];
    }
  } else {
    return /* tuple */[
            "",
            /* array */[""]
          ];
  }
}


/* No side effect */

function div(x, y) {
  if (y === 0) {
    throw division_by_zero;
  } else {
    return x / y | 0;
  }
}

function mod_(x, y) {
  if (y === 0) {
    throw division_by_zero;
  } else {
    return x % y;
  }
}

var imul = ( Math.imul || function (x,y) {
  y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
}
);


/* imul Not a pure module */

var repeat = ( (String.prototype.repeat && function (count,self){return self.repeat(count)}) ||
                                                  function(count , self) {
        if (self.length == 0 || count == 0) {
            return '';
        }
        // Ensuring count is a 31-bit integer allows us to heavily optimize the
        // main part. But anyway, most current (August 2014) browsers can't handle
        // strings 1 << 28 chars or longer, so:
        if (self.length * count >= 1 << 28) {
            throw new RangeError('repeat count must not overflow maximum string size');
        }
        var rpt = '';
        for (;;) {
            if ((count & 1) == 1) {
                rpt += self;
            }
            count >>>= 1;
            if (count == 0) {
                break;
            }
            self += self;
        }
        return rpt;
    }
);


/* repeat Not a pure module */

var min_int$1 = /* record */[
  /* hi */-2147483648,
  /* lo */0
];

var max_int$1 = /* record */[
  /* hi */134217727,
  /* lo */1
];

var one = /* record */[
  /* hi */0,
  /* lo */1
];

var zero = /* record */[
  /* hi */0,
  /* lo */0
];

var neg_one = /* record */[
  /* hi */-1,
  /* lo */4294967295
];

function neg_signed(x) {
  return +((x & 2147483648) !== 0);
}

function add$1(param, param$1) {
  var other_low_ = param$1[/* lo */1];
  var this_low_ = param[/* lo */1];
  var lo = this_low_ + other_low_ & 4294967295;
  var overflow = neg_signed(this_low_) && (neg_signed(other_low_) || !neg_signed(lo)) || neg_signed(other_low_) && !neg_signed(lo) ? 1 : 0;
  var hi = param[/* hi */0] + param$1[/* hi */0] + overflow & 4294967295;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function not(param) {
  var hi = param[/* hi */0] ^ -1;
  var lo = param[/* lo */1] ^ -1;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function eq(x, y) {
  if (x[/* hi */0] === y[/* hi */0]) {
    return +(x[/* lo */1] === y[/* lo */1]);
  } else {
    return /* false */0;
  }
}

function neg(x) {
  if (eq(x, min_int$1)) {
    return min_int$1;
  } else {
    return add$1(not(x), one);
  }
}

function lsl_(x, numBits) {
  if (numBits) {
    var lo = x[/* lo */1];
    if (numBits >= 32) {
      return /* record */[
              /* hi */(lo << (numBits - 32 | 0)),
              /* lo */0
            ];
    } else {
      var hi = (lo >>> (32 - numBits | 0)) | (x[/* hi */0] << numBits);
      return /* record */[
              /* hi */hi,
              /* lo */((lo << numBits) >>> 0)
            ];
    }
  } else {
    return x;
  }
}

function asr_(x, numBits) {
  if (numBits) {
    var hi = x[/* hi */0];
    if (numBits < 32) {
      var hi$1 = (hi >> numBits);
      var lo = (hi << (32 - numBits | 0)) | (x[/* lo */1] >>> numBits);
      return /* record */[
              /* hi */hi$1,
              /* lo */(lo >>> 0)
            ];
    } else {
      var lo$1 = (hi >> (numBits - 32 | 0));
      return /* record */[
              /* hi */hi >= 0 ? 0 : -1,
              /* lo */(lo$1 >>> 0)
            ];
    }
  } else {
    return x;
  }
}

function is_zero(param) {
  if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
    return /* false */0;
  } else {
    return /* true */1;
  }
}

function mul$1(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var exit = 0;
    var lo;
    var this_hi = $$this[/* hi */0];
    var exit$1 = 0;
    var exit$2 = 0;
    var exit$3 = 0;
    if (this_hi !== 0) {
      exit$3 = 4;
    } else if ($$this[/* lo */1] !== 0) {
      exit$3 = 4;
    } else {
      return zero;
    }
    if (exit$3 === 4) {
      if (other[/* hi */0] !== 0) {
        exit$2 = 3;
      } else if (other[/* lo */1] !== 0) {
        exit$2 = 3;
      } else {
        return zero;
      }
    }
    if (exit$2 === 3) {
      if (this_hi !== -2147483648) {
        exit$1 = 2;
      } else if ($$this[/* lo */1] !== 0) {
        exit$1 = 2;
      } else {
        lo = other[/* lo */1];
        exit = 1;
      }
    }
    if (exit$1 === 2) {
      var other_hi = other[/* hi */0];
      var lo$1 = $$this[/* lo */1];
      var exit$4 = 0;
      if (other_hi !== -2147483648) {
        exit$4 = 3;
      } else if (other[/* lo */1] !== 0) {
        exit$4 = 3;
      } else {
        lo = lo$1;
        exit = 1;
      }
      if (exit$4 === 3) {
        var other_lo = other[/* lo */1];
        if (this_hi < 0) {
          if (other_hi < 0) {
            _other = neg(other);
            _this = neg($$this);
            continue ;
            
          } else {
            return neg(mul$1(neg($$this), other));
          }
        } else if (other_hi < 0) {
          return neg(mul$1($$this, neg(other)));
        } else {
          var a48 = (this_hi >>> 16);
          var a32 = this_hi & 65535;
          var a16 = (lo$1 >>> 16);
          var a00 = lo$1 & 65535;
          var b48 = (other_hi >>> 16);
          var b32 = other_hi & 65535;
          var b16 = (other_lo >>> 16);
          var b00 = other_lo & 65535;
          var c48 = 0;
          var c32 = 0;
          var c16 = 0;
          var c00 = a00 * b00;
          c16 = (c00 >>> 16) + a16 * b00;
          c32 = (c16 >>> 16);
          c16 = (c16 & 65535) + a00 * b16;
          c32 = c32 + (c16 >>> 16) + a32 * b00;
          c48 = (c32 >>> 16);
          c32 = (c32 & 65535) + a16 * b16;
          c48 += (c32 >>> 16);
          c32 = (c32 & 65535) + a00 * b32;
          c48 += (c32 >>> 16);
          c32 = c32 & 65535;
          c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
          var hi = c32 | (c48 << 16);
          var lo$2 = c00 & 65535 | ((c16 & 65535) << 16);
          return /* record */[
                  /* hi */hi,
                  /* lo */(lo$2 >>> 0)
                ];
        }
      }
      
    }
    if (exit === 1) {
      if ((lo & 1) === 0) {
        return zero;
      } else {
        return min_int$1;
      }
    }
    
  }
}

function ge(param, param$1) {
  var other_hi = param$1[/* hi */0];
  var hi = param[/* hi */0];
  if (hi > other_hi) {
    return /* true */1;
  } else if (hi < other_hi) {
    return /* false */0;
  } else {
    return +(param[/* lo */1] >= param$1[/* lo */1]);
  }
}

function neq(x, y) {
  return 1 - eq(x, y);
}

function lt(x, y) {
  return 1 - ge(x, y);
}

function gt(x, y) {
  if (x[/* hi */0] > y[/* hi */0]) {
    return /* true */1;
  } else if (x[/* hi */0] < y[/* hi */0]) {
    return /* false */0;
  } else {
    return +(x[/* lo */1] > y[/* lo */1]);
  }
}

function to_float(param) {
  return param[/* hi */0] * (0x100000000) + param[/* lo */1];
}

var two_ptr_32_dbl = Math.pow(2, 32);

var two_ptr_63_dbl = Math.pow(2, 63);

var neg_two_ptr_63 = -Math.pow(2, 63);

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  } else if (x <= neg_two_ptr_63) {
    return min_int$1;
  } else if (x + 1 >= two_ptr_63_dbl) {
    return max_int$1;
  } else if (x < 0) {
    return neg(of_float(-x));
  } else {
    var hi = x / two_ptr_32_dbl | 0;
    var lo = x % two_ptr_32_dbl | 0;
    return /* record */[
            /* hi */hi,
            /* lo */(lo >>> 0)
          ];
  }
}

function div$1(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var self_hi = self[/* hi */0];
    var exit = 0;
    var exit$1 = 0;
    if (other[/* hi */0] !== 0) {
      exit$1 = 2;
    } else if (other[/* lo */1] !== 0) {
      exit$1 = 2;
    } else {
      throw division_by_zero;
    }
    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0) {
          exit = 1;
        } else if (self[/* lo */1] !== 0) {
          exit = 1;
        } else {
          return zero;
        }
      } else if (self[/* lo */1] !== 0) {
        exit = 1;
      } else if (eq(other, one) || eq(other, neg_one)) {
        return self;
      } else if (eq(other, min_int$1)) {
        return one;
      } else {
        var other_hi = other[/* hi */0];
        var half_this = asr_(self, 1);
        var approx = lsl_(div$1(half_this, other), 1);
        var exit$2 = 0;
        if (approx[/* hi */0] !== 0) {
          exit$2 = 3;
        } else if (approx[/* lo */1] !== 0) {
          exit$2 = 3;
        } else if (other_hi < 0) {
          return one;
        } else {
          return neg(one);
        }
        if (exit$2 === 3) {
          var y = mul$1(other, approx);
          var rem = add$1(self, neg(y));
          return add$1(approx, div$1(rem, other));
        }
        
      }
    }
    if (exit === 1) {
      var other_hi$1 = other[/* hi */0];
      var exit$3 = 0;
      if (other_hi$1 !== -2147483648) {
        exit$3 = 2;
      } else if (other[/* lo */1] !== 0) {
        exit$3 = 2;
      } else {
        return zero;
      }
      if (exit$3 === 2) {
        if (self_hi < 0) {
          if (other_hi$1 < 0) {
            _other = neg(other);
            _self = neg(self);
            continue ;
            
          } else {
            return neg(div$1(neg(self), other));
          }
        } else if (other_hi$1 < 0) {
          return neg(div$1(self, neg(other)));
        } else {
          var res = zero;
          var rem$1 = self;
          while(ge(rem$1, other)) {
            var approx$1 = Math.max(1, Math.floor(to_float(rem$1) / to_float(other)));
            var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
            var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
            var approxRes = of_float(approx$1);
            var approxRem = mul$1(approxRes, other);
            while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
              approx$1 -= delta;
              approxRes = of_float(approx$1);
              approxRem = mul$1(approxRes, other);
            }
            if (is_zero(approxRes)) {
              approxRes = one;
            }
            res = add$1(res, approxRes);
            rem$1 = add$1(rem$1, neg(approxRem));
          }
          return res;
        }
      }
      
    }
    
  }
}

function div_mod(self, other) {
  var quotient = div$1(self, other);
  var y = mul$1(quotient, other);
  return /* tuple */[
          quotient,
          add$1(self, neg(y))
        ];
}

function to_hex(x) {
  var aux = function (v) {
    return (v >>> 0).toString(16);
  };
  var match = x[/* hi */0];
  var match$1 = x[/* lo */1];
  var exit = 0;
  if (match !== 0) {
    exit = 1;
  } else if (match$1 !== 0) {
    exit = 1;
  } else {
    return "0";
  }
  if (exit === 1) {
    if (match$1 !== 0) {
      if (match !== 0) {
        var lo = aux(x[/* lo */1]);
        var pad = 8 - lo.length | 0;
        if (pad <= 0) {
          return aux(x[/* hi */0]) + lo;
        } else {
          return aux(x[/* hi */0]) + (repeat(pad, "0") + lo);
        }
      } else {
        return aux(x[/* lo */1]);
      }
    } else {
      return aux(x[/* hi */0]) + "00000000";
    }
  }
  
}

function discard_sign(x) {
  return /* record */[
          /* hi */2147483647 & x[/* hi */0],
          /* lo */x[/* lo */1]
        ];
}


/* two_ptr_32_dbl Not a pure module */

function parse_digit(c) {
  if (c >= 65) {
    if (c >= 97) {
      if (c >= 123) {
        return -1;
      } else {
        return c - 87 | 0;
      }
    } else if (c >= 91) {
      return -1;
    } else {
      return c - 55 | 0;
    }
  } else if (c > 57 || c < 48) {
    return -1;
  } else {
    return c - /* "0" */48 | 0;
  }
}

function int_of_string_base(param) {
  switch (param) {
    case 0 : 
        return 8;
    case 1 : 
        return 16;
    case 2 : 
        return 10;
    case 3 : 
        return 2;
    
  }
}

function parse_sign_and_base(s) {
  var sign = 1;
  var base = /* Dec */2;
  var i = 0;
  if (s[i] === "-") {
    sign = -1;
    i = i + 1 | 0;
  }
  var match = s.charCodeAt(i);
  var match$1 = s.charCodeAt(i + 1 | 0);
  if (match === 48) {
    if (match$1 >= 89) {
      if (match$1 !== 98) {
        if (match$1 !== 111) {
          if (match$1 === 120) {
            base = /* Hex */1;
            i = i + 2 | 0;
          }
          
        } else {
          base = /* Oct */0;
          i = i + 2 | 0;
        }
      } else {
        base = /* Bin */3;
        i = i + 2 | 0;
      }
    } else if (match$1 !== 66) {
      if (match$1 !== 79) {
        if (match$1 >= 88) {
          base = /* Hex */1;
          i = i + 2 | 0;
        }
        
      } else {
        base = /* Oct */0;
        i = i + 2 | 0;
      }
    } else {
      base = /* Bin */3;
      i = i + 2 | 0;
    }
  }
  return /* tuple */[
          i,
          sign,
          base
        ];
}

function caml_int_of_string(s) {
  var match = parse_sign_and_base(s);
  var i = match[0];
  var base = int_of_string_base(match[2]);
  var threshold = 4294967295;
  var len = s.length;
  var c = i < len ? s.charCodeAt(i) : /* "\000" */0;
  var d = parse_digit(c);
  if (d < 0 || d >= base) {
    throw [
          failure,
          "int_of_string"
        ];
  }
  var aux = function (_acc, _k) {
    while(true) {
      var k = _k;
      var acc = _acc;
      if (k === len) {
        return acc;
      } else {
        var a = s.charCodeAt(k);
        if (a === /* "_" */95) {
          _k = k + 1 | 0;
          continue ;
          
        } else {
          var v = parse_digit(a);
          if (v < 0 || v >= base) {
            throw [
                  failure,
                  "int_of_string"
                ];
          } else {
            var acc$1 = base * acc + v;
            if (acc$1 > threshold) {
              throw [
                    failure,
                    "int_of_string"
                  ];
            } else {
              _k = k + 1 | 0;
              _acc = acc$1;
              continue ;
              
            }
          }
        }
      }
    }
  };
  var res = match[1] * aux(d, i + 1 | 0);
  var or_res = res | 0;
  if (base === 10 && res !== or_res) {
    throw [
          failure,
          "int_of_string"
        ];
  }
  return or_res;
}

function int_of_base(param) {
  switch (param) {
    case 0 : 
        return 8;
    case 1 : 
        return 16;
    case 2 : 
        return 10;
    
  }
}

function lowercase(c) {
  if (c >= /* "A" */65 && c <= /* "Z" */90 || c >= /* "\192" */192 && c <= /* "\214" */214 || c >= /* "\216" */216 && c <= /* "\222" */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function parse_format(fmt) {
  var len = fmt.length;
  if (len > 31) {
    throw [
          invalid_argument,
          "format_int: format too long"
        ];
  }
  var f = /* record */[
    /* justify */"+",
    /* signstyle */"-",
    /* filter */" ",
    /* alternate : false */0,
    /* base : Dec */2,
    /* signedconv : false */0,
    /* width */0,
    /* uppercase : false */0,
    /* sign */1,
    /* prec */-1,
    /* conv */"f"
  ];
  var _i = 0;
  while(true) {
    var i = _i;
    if (i >= len) {
      return f;
    } else {
      var c = fmt.charCodeAt(i);
      var exit = 0;
      if (c >= 69) {
        if (c >= 88) {
          if (c >= 121) {
            exit = 1;
          } else {
            switch (c - 88 | 0) {
              case 0 : 
                  f[/* base */4] = /* Hex */1;
                  f[/* uppercase */7] = /* true */1;
                  _i = i + 1 | 0;
                  continue ;
                  case 13 : 
              case 14 : 
              case 15 : 
                  exit = 5;
                  break;
              case 12 : 
              case 17 : 
                  exit = 4;
                  break;
              case 23 : 
                  f[/* base */4] = /* Oct */0;
                  _i = i + 1 | 0;
                  continue ;
                  case 29 : 
                  f[/* base */4] = /* Dec */2;
                  _i = i + 1 | 0;
                  continue ;
                  case 1 : 
              case 2 : 
              case 3 : 
              case 4 : 
              case 5 : 
              case 6 : 
              case 7 : 
              case 8 : 
              case 9 : 
              case 10 : 
              case 11 : 
              case 16 : 
              case 18 : 
              case 19 : 
              case 20 : 
              case 21 : 
              case 22 : 
              case 24 : 
              case 25 : 
              case 26 : 
              case 27 : 
              case 28 : 
              case 30 : 
              case 31 : 
                  exit = 1;
                  break;
              case 32 : 
                  f[/* base */4] = /* Hex */1;
                  _i = i + 1 | 0;
                  continue ;
                  
            }
          }
        } else if (c >= 72) {
          exit = 1;
        } else {
          f[/* signedconv */5] = /* true */1;
          f[/* uppercase */7] = /* true */1;
          f[/* conv */10] = String.fromCharCode(lowercase(c));
          _i = i + 1 | 0;
          continue ;
          
        }
      } else {
        var switcher = c - 32 | 0;
        if (switcher > 25 || switcher < 0) {
          exit = 1;
        } else {
          switch (switcher) {
            case 3 : 
                f[/* alternate */3] = /* true */1;
                _i = i + 1 | 0;
                continue ;
                case 0 : 
            case 11 : 
                exit = 2;
                break;
            case 13 : 
                f[/* justify */0] = "-";
                _i = i + 1 | 0;
                continue ;
                case 14 : 
                f[/* prec */9] = 0;
                var j = i + 1 | 0;
                while((function(j){
                    return function () {
                      var w = fmt.charCodeAt(j) - /* "0" */48 | 0;
                      return +(w >= 0 && w <= 9);
                    }
                    }(j))()) {
                  f[/* prec */9] = (imul(f[/* prec */9], 10) + fmt.charCodeAt(j) | 0) - /* "0" */48 | 0;
                  j = j + 1 | 0;
                };
                _i = j;
                continue ;
                case 1 : 
            case 2 : 
            case 4 : 
            case 5 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 12 : 
            case 15 : 
                exit = 1;
                break;
            case 16 : 
                f[/* filter */2] = "0";
                _i = i + 1 | 0;
                continue ;
                case 17 : 
            case 18 : 
            case 19 : 
            case 20 : 
            case 21 : 
            case 22 : 
            case 23 : 
            case 24 : 
            case 25 : 
                exit = 3;
                break;
            
          }
        }
      }
      switch (exit) {
        case 1 : 
            _i = i + 1 | 0;
            continue ;
            case 2 : 
            f[/* signstyle */1] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
            case 3 : 
            f[/* width */6] = 0;
            var j$1 = i;
            while((function(j$1){
                return function () {
                  var w = fmt.charCodeAt(j$1) - /* "0" */48 | 0;
                  return +(w >= 0 && w <= 9);
                }
                }(j$1))()) {
              f[/* width */6] = (imul(f[/* width */6], 10) + fmt.charCodeAt(j$1) | 0) - /* "0" */48 | 0;
              j$1 = j$1 + 1 | 0;
            };
            _i = j$1;
            continue ;
            case 4 : 
            f[/* signedconv */5] = /* true */1;
            f[/* base */4] = /* Dec */2;
            _i = i + 1 | 0;
            continue ;
            case 5 : 
            f[/* signedconv */5] = /* true */1;
            f[/* conv */10] = String.fromCharCode(c);
            _i = i + 1 | 0;
            continue ;
            
      }
    }
  }
}

function finish_formatting(param, rawbuffer) {
  var justify = param[/* justify */0];
  var signstyle = param[/* signstyle */1];
  var filter = param[/* filter */2];
  var alternate = param[/* alternate */3];
  var base = param[/* base */4];
  var signedconv = param[/* signedconv */5];
  var width = param[/* width */6];
  var uppercase = param[/* uppercase */7];
  var sign = param[/* sign */8];
  var len = rawbuffer.length;
  if (signedconv && (sign < 0 || signstyle !== "-")) {
    len = len + 1 | 0;
  }
  if (alternate) {
    if (base) {
      if (base === /* Hex */1) {
        len = len + 2 | 0;
      }
      
    } else {
      len = len + 1 | 0;
    }
  }
  var buffer = "";
  if (justify === "+" && filter === " ") {
    for(var i = len ,i_finish = width - 1 | 0; i <= i_finish; ++i){
      buffer = buffer + filter;
    }
  }
  if (signedconv) {
    if (sign < 0) {
      buffer = buffer + "-";
    } else if (signstyle !== "-") {
      buffer = buffer + signstyle;
    }
    
  }
  if (alternate && base === /* Oct */0) {
    buffer = buffer + "0";
  }
  if (alternate && base === /* Hex */1) {
    buffer = buffer + "0x";
  }
  if (justify === "+" && filter === "0") {
    for(var i$1 = len ,i_finish$1 = width - 1 | 0; i$1 <= i_finish$1; ++i$1){
      buffer = buffer + filter;
    }
  }
  buffer = uppercase ? buffer + rawbuffer.toUpperCase() : buffer + rawbuffer;
  if (justify === "-") {
    for(var i$2 = len ,i_finish$2 = width - 1 | 0; i$2 <= i_finish$2; ++i$2){
      buffer = buffer + " ";
    }
  }
  return buffer;
}

function caml_format_int(fmt, i) {
  if (fmt === "%d") {
    return String(i);
  } else {
    var f = parse_format(fmt);
    var f$1 = f;
    var i$1 = i;
    var i$2 = i$1 < 0 ? (
        f$1[/* signedconv */5] ? (f$1[/* sign */8] = -1, -i$1) : (i$1 >>> 0)
      ) : i$1;
    var s = i$2.toString(int_of_base(f$1[/* base */4]));
    if (f$1[/* prec */9] >= 0) {
      f$1[/* filter */2] = " ";
      var n = f$1[/* prec */9] - s.length | 0;
      if (n > 0) {
        s = repeat(n, "0") + s;
      }
      
    }
    return finish_formatting(f$1, s);
  }
}

function caml_int64_format(fmt, x) {
  var f = parse_format(fmt);
  var x$1 = f[/* signedconv */5] && lt(x, /* int64 */[
        /* hi */0,
        /* lo */0
      ]) ? (f[/* sign */8] = -1, neg(x)) : x;
  var s = "";
  var match = f[/* base */4];
  switch (match) {
    case 0 : 
        var wbase = /* int64 */[
          /* hi */0,
          /* lo */8
        ];
        var cvtbl = "01234567";
        if (lt(x$1, /* int64 */[
                /* hi */0,
                /* lo */0
              ])) {
          var y = discard_sign(x$1);
          var match$1 = div_mod(y, wbase);
          var quotient = add$1(/* int64 */[
                /* hi */268435456,
                /* lo */0
              ], match$1[0]);
          var modulus = match$1[1];
          s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
          while(neq(quotient, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$2 = div_mod(quotient, wbase);
            quotient = match$2[0];
            modulus = match$2[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus[1] | 0)) + s;
          }
        } else {
          var match$3 = div_mod(x$1, wbase);
          var quotient$1 = match$3[0];
          var modulus$1 = match$3[1];
          s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
          while(neq(quotient$1, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$4 = div_mod(quotient$1, wbase);
            quotient$1 = match$4[0];
            modulus$1 = match$4[1];
            s = String.fromCharCode(cvtbl.charCodeAt(modulus$1[1] | 0)) + s;
          }
        }
        break;
    case 1 : 
        s = to_hex(x$1) + s;
        break;
    case 2 : 
        var wbase$1 = /* int64 */[
          /* hi */0,
          /* lo */10
        ];
        var cvtbl$1 = "0123456789";
        if (lt(x$1, /* int64 */[
                /* hi */0,
                /* lo */0
              ])) {
          var y$1 = discard_sign(x$1);
          var match$5 = div_mod(y$1, wbase$1);
          var match$6 = div_mod(add$1(/* int64 */[
                    /* hi */0,
                    /* lo */8
                  ], match$5[1]), wbase$1);
          var quotient$2 = add$1(add$1(/* int64 */[
                    /* hi */214748364,
                    /* lo */3435973836
                  ], match$5[0]), match$6[0]);
          var modulus$2 = match$6[1];
          s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
          while(neq(quotient$2, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$7 = div_mod(quotient$2, wbase$1);
            quotient$2 = match$7[0];
            modulus$2 = match$7[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$2[1] | 0)) + s;
          }
        } else {
          var match$8 = div_mod(x$1, wbase$1);
          var quotient$3 = match$8[0];
          var modulus$3 = match$8[1];
          s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
          while(neq(quotient$3, /* int64 */[
                  /* hi */0,
                  /* lo */0
                ])) {
            var match$9 = div_mod(quotient$3, wbase$1);
            quotient$3 = match$9[0];
            modulus$3 = match$9[1];
            s = String.fromCharCode(cvtbl$1.charCodeAt(modulus$3[1] | 0)) + s;
          }
        }
        break;
    
  }
  if (f[/* prec */9] >= 0) {
    f[/* filter */2] = " ";
    var n = f[/* prec */9] - s.length | 0;
    if (n > 0) {
      s = repeat(n, "0") + s;
    }
    
  }
  return finish_formatting(f, s);
}

function caml_format_float(fmt, x) {
  var f = parse_format(fmt);
  var prec = f[/* prec */9] < 0 ? 6 : f[/* prec */9];
  var x$1 = x < 0 ? (f[/* sign */8] = -1, -x) : x;
  var s = "";
  if (isNaN(x$1)) {
    s = "nan";
    f[/* filter */2] = " ";
  } else if (isFinite(x$1)) {
    var match = f[/* conv */10];
    switch (match) {
      case "e" : 
          s = x$1.toExponential(prec);
          var i = s.length;
          if (s[i - 3 | 0] === "e") {
            s = s.slice(0, i - 1 | 0) + ("0" + s.slice(i - 1 | 0));
          }
          break;
      case "f" : 
          s = x$1.toFixed(prec);
          break;
      case "g" : 
          var prec$1 = prec !== 0 ? prec : 1;
          s = x$1.toExponential(prec$1 - 1 | 0);
          var j = s.indexOf("e");
          var exp = Number(s.slice(j + 1 | 0)) | 0;
          if (exp < -4 || x$1 >= 1e21 || x$1.toFixed().length > prec$1) {
            var i$1 = j - 1 | 0;
            while(s[i$1] === "0") {
              i$1 = i$1 - 1 | 0;
            }
            if (s[i$1] === ".") {
              i$1 = i$1 - 1 | 0;
            }
            s = s.slice(0, i$1 + 1 | 0) + s.slice(j);
            var i$2 = s.length;
            if (s[i$2 - 3 | 0] === "e") {
              s = s.slice(0, i$2 - 1 | 0) + ("0" + s.slice(i$2 - 1 | 0));
            }
            
          } else {
            var p = prec$1;
            if (exp < 0) {
              p = p - (exp + 1 | 0) | 0;
              s = x$1.toFixed(p);
            } else {
              while((function () {
                      s = x$1.toFixed(p);
                      return +(s.length > (prec$1 + 1 | 0));
                    })()) {
                p = p - 1 | 0;
              }
            }
            if (p !== 0) {
              var k = s.length - 1 | 0;
              while(s[k] === "0") {
                k = k - 1 | 0;
              }
              if (s[k] === ".") {
                k = k - 1 | 0;
              }
              s = s.slice(0, k + 1 | 0);
            }
            
          }
          break;
      default:
        
    }
  } else {
    s = "inf";
    f[/* filter */2] = " ";
  }
  return finish_formatting(f, s);
}

var caml_nativeint_format = caml_format_int;

var caml_int32_format = caml_format_int;


/* float_of_string Not a pure module */

function caml_create_string(len) {
  if (len < 0) {
    throw [
          invalid_argument,
          "String.create"
        ];
  } else {
    return new Array(len);
  }
}

function caml_string_compare(s1, s2) {
  if (s1 === s2) {
    return 0;
  } else if (s1 < s2) {
    return -1;
  } else {
    return 1;
  }
}

function caml_fill_string(s, i, l, c) {
  if (l > 0) {
    for(var k = i ,k_finish = (l + i | 0) - 1 | 0; k <= k_finish; ++k){
      s[k] = c;
    }
    return /* () */0;
  } else {
    return 0;
  }
}

function caml_blit_string(s1, i1, s2, i2, len) {
  if (len > 0) {
    var off1 = s1.length - i1 | 0;
    if (len <= off1) {
      for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
        s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
      }
      return /* () */0;
    } else {
      for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
        s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
      }
      for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
        s2[i2 + i$2 | 0] = /* "\000" */0;
      }
      return /* () */0;
    }
  } else {
    return 0;
  }
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len > 0) {
    if (s1 === s2) {
      var s1$1 = s1;
      var i1$1 = i1;
      var i2$1 = i2;
      var len$1 = len;
      if (i1$1 < i2$1) {
        var range_a = (s1$1.length - i2$1 | 0) - 1 | 0;
        var range_b = len$1 - 1 | 0;
        var range = range_a > range_b ? range_b : range_a;
        for(var j = range; j >= 0; --j){
          s1$1[i2$1 + j | 0] = s1$1[i1$1 + j | 0];
        }
        return /* () */0;
      } else if (i1$1 > i2$1) {
        var range_a$1 = (s1$1.length - i1$1 | 0) - 1 | 0;
        var range_b$1 = len$1 - 1 | 0;
        var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
        for(var k = 0; k <= range$1; ++k){
          s1$1[i2$1 + k | 0] = s1$1[i1$1 + k | 0];
        }
        return /* () */0;
      } else {
        return 0;
      }
    } else {
      var off1 = s1.length - i1 | 0;
      if (len <= off1) {
        for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
          s2[i2 + i | 0] = s1[i1 + i | 0];
        }
        return /* () */0;
      } else {
        for(var i$1 = 0 ,i_finish$1 = off1 - 1 | 0; i$1 <= i_finish$1; ++i$1){
          s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
        }
        for(var i$2 = off1 ,i_finish$2 = len - 1 | 0; i$2 <= i_finish$2; ++i$2){
          s2[i2 + i$2 | 0] = /* "\000" */0;
        }
        return /* () */0;
      }
    }
  } else {
    return 0;
  }
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    res[i] = s.charCodeAt(i);
  }
  return res;
}

function bytes_to_string(a) {
  var bytes = a;
  var i = 0;
  var len = a.length;
  var s = "";
  var s_len = len;
  if (i === 0 && len <= 4096 && len === bytes.length) {
    return String.fromCharCode.apply(null,bytes);
  } else {
    var offset = 0;
    while(s_len > 0) {
      var next = s_len < 1024 ? s_len : 1024;
      var tmp_bytes = new Array(next);
      caml_blit_bytes(bytes, offset, tmp_bytes, 0, next);
      s = s + String.fromCharCode.apply(null,tmp_bytes);
      s_len = s_len - next | 0;
      offset = offset + next | 0;
    }
    return s;
  }
}

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return s.charCodeAt(i);
  }
}


/* No side effect */

var id = [0];

function get_id() {
  id[0] += 1;
  return id[0];
}

function create(str) {
  var v_001 = get_id(/* () */0);
  var v = /* tuple */[
    str,
    v_001
  ];
  v.tag = 248;
  return v;
}


/* No side effect */

/* not_implemented Not a pure module */

function erase_rel(param) {
  if (typeof param === "number") {
    return /* End_of_fmtty */0;
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return /* Char_ty */__(0, [erase_rel(param[0])]);
      case 1 : 
          return /* String_ty */__(1, [erase_rel(param[0])]);
      case 2 : 
          return /* Int_ty */__(2, [erase_rel(param[0])]);
      case 3 : 
          return /* Int32_ty */__(3, [erase_rel(param[0])]);
      case 4 : 
          return /* Nativeint_ty */__(4, [erase_rel(param[0])]);
      case 5 : 
          return /* Int64_ty */__(5, [erase_rel(param[0])]);
      case 6 : 
          return /* Float_ty */__(6, [erase_rel(param[0])]);
      case 7 : 
          return /* Bool_ty */__(7, [erase_rel(param[0])]);
      case 8 : 
          return /* Format_arg_ty */__(8, [
                    param[0],
                    erase_rel(param[1])
                  ]);
      case 9 : 
          var ty1 = param[0];
          return /* Format_subst_ty */__(9, [
                    ty1,
                    ty1,
                    erase_rel(param[2])
                  ]);
      case 10 : 
          return /* Alpha_ty */__(10, [erase_rel(param[0])]);
      case 11 : 
          return /* Theta_ty */__(11, [erase_rel(param[0])]);
      case 12 : 
          return /* Any_ty */__(12, [erase_rel(param[0])]);
      case 13 : 
          return /* Reader_ty */__(13, [erase_rel(param[0])]);
      case 14 : 
          return /* Ignored_reader_ty */__(14, [erase_rel(param[0])]);
      
    }
  }
}

function concat_fmtty(fmtty1, fmtty2) {
  if (typeof fmtty1 === "number") {
    return fmtty2;
  } else {
    switch (fmtty1.tag | 0) {
      case 0 : 
          return /* Char_ty */__(0, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 1 : 
          return /* String_ty */__(1, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 2 : 
          return /* Int_ty */__(2, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 3 : 
          return /* Int32_ty */__(3, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 4 : 
          return /* Nativeint_ty */__(4, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 5 : 
          return /* Int64_ty */__(5, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 6 : 
          return /* Float_ty */__(6, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 7 : 
          return /* Bool_ty */__(7, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 8 : 
          return /* Format_arg_ty */__(8, [
                    fmtty1[0],
                    concat_fmtty(fmtty1[1], fmtty2)
                  ]);
      case 9 : 
          return /* Format_subst_ty */__(9, [
                    fmtty1[0],
                    fmtty1[1],
                    concat_fmtty(fmtty1[2], fmtty2)
                  ]);
      case 10 : 
          return /* Alpha_ty */__(10, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 11 : 
          return /* Theta_ty */__(11, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 12 : 
          return /* Any_ty */__(12, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 13 : 
          return /* Reader_ty */__(13, [concat_fmtty(fmtty1[0], fmtty2)]);
      case 14 : 
          return /* Ignored_reader_ty */__(14, [concat_fmtty(fmtty1[0], fmtty2)]);
      
    }
  }
}

function concat_fmt(fmt1, fmt2) {
  if (typeof fmt1 === "number") {
    return fmt2;
  } else {
    switch (fmt1.tag | 0) {
      case 0 : 
          return /* Char */__(0, [concat_fmt(fmt1[0], fmt2)]);
      case 1 : 
          return /* Caml_char */__(1, [concat_fmt(fmt1[0], fmt2)]);
      case 2 : 
          return /* String */__(2, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 3 : 
          return /* Caml_string */__(3, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 4 : 
          return /* Int */__(4, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 5 : 
          return /* Int32 */__(5, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 6 : 
          return /* Nativeint */__(6, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 7 : 
          return /* Int64 */__(7, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 8 : 
          return /* Float */__(8, [
                    fmt1[0],
                    fmt1[1],
                    fmt1[2],
                    concat_fmt(fmt1[3], fmt2)
                  ]);
      case 9 : 
          return /* Bool */__(9, [concat_fmt(fmt1[0], fmt2)]);
      case 10 : 
          return /* Flush */__(10, [concat_fmt(fmt1[0], fmt2)]);
      case 11 : 
          return /* String_literal */__(11, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 12 : 
          return /* Char_literal */__(12, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 13 : 
          return /* Format_arg */__(13, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 14 : 
          return /* Format_subst */__(14, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 15 : 
          return /* Alpha */__(15, [concat_fmt(fmt1[0], fmt2)]);
      case 16 : 
          return /* Theta */__(16, [concat_fmt(fmt1[0], fmt2)]);
      case 17 : 
          return /* Formatting_lit */__(17, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 18 : 
          return /* Formatting_gen */__(18, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 19 : 
          return /* Reader */__(19, [concat_fmt(fmt1[0], fmt2)]);
      case 20 : 
          return /* Scan_char_set */__(20, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      case 21 : 
          return /* Scan_get_counter */__(21, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 22 : 
          return /* Scan_next_char */__(22, [concat_fmt(fmt1[0], fmt2)]);
      case 23 : 
          return /* Ignored_param */__(23, [
                    fmt1[0],
                    concat_fmt(fmt1[1], fmt2)
                  ]);
      case 24 : 
          return /* Custom */__(24, [
                    fmt1[0],
                    fmt1[1],
                    concat_fmt(fmt1[2], fmt2)
                  ]);
      
    }
  }
}


/* No side effect */

function failwith(s) {
  throw [
        failure,
        s
      ];
}

var Exit = create("Pervasives.Exit");

function min(x, y) {
  if (caml_lessequal(x, y)) {
    return x;
  } else {
    return y;
  }
}

function max(x, y) {
  if (caml_greaterequal(x, y)) {
    return x;
  } else {
    return y;
  }
}

function abs(x) {
  if (x >= 0) {
    return x;
  } else {
    return -x | 0;
  }
}

function string_of_int(param) {
  return "" + param;
}

function $at(l1, l2) {
  if (l1) {
    return /* :: */[
            l1[0],
            $at(l1[1], l2)
          ];
  } else {
    return l2;
  }
}


/* No side effect */

function length(l) {
  var _len = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var len = _len;
    if (param) {
      _param = param[1];
      _len = len + 1 | 0;
      continue ;
      
    } else {
      return len;
    }
  }
}

function hd(param) {
  if (param) {
    return param[0];
  } else {
    throw [
          failure,
          "hd"
        ];
  }
}

function nth(l, n) {
  if (n < 0) {
    throw [
          invalid_argument,
          "List.nth"
        ];
  } else {
    var _l = l;
    var _n = n;
    while(true) {
      var n$1 = _n;
      var l$1 = _l;
      if (l$1) {
        if (n$1) {
          _n = n$1 - 1 | 0;
          _l = l$1[1];
          continue ;
          
        } else {
          return l$1[0];
        }
      } else {
        throw [
              failure,
              "nth"
            ];
      }
    }
  }
}

function rev_append(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      _l2 = /* :: */[
        l1[0],
        l2
      ];
      _l1 = l1[1];
      continue ;
      
    } else {
      return l2;
    }
  }
}

function rev(l) {
  return rev_append(l, /* [] */0);
}

function map(f, param) {
  if (param) {
    var r = _1(f, param[0]);
    return /* :: */[
            r,
            map(f, param[1])
          ];
  } else {
    return /* [] */0;
  }
}

function mapi(i, f, param) {
  if (param) {
    var r = _2(f, i, param[0]);
    return /* :: */[
            r,
            mapi(i + 1 | 0, f, param[1])
          ];
  } else {
    return /* [] */0;
  }
}

function mapi$1(f, l) {
  return mapi(0, f, l);
}

function iter(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      _1(f, param[0]);
      _param = param[1];
      continue ;
      
    } else {
      return /* () */0;
    }
  }
}

function fold_left(f, _accu, _l) {
  while(true) {
    var l = _l;
    var accu = _accu;
    if (l) {
      _l = l[1];
      _accu = _2(f, accu, l[0]);
      continue ;
      
    } else {
      return accu;
    }
  }
}

function for_all(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (_1(p, param[0])) {
        _param = param[1];
        continue ;
        
      } else {
        return /* false */0;
      }
    } else {
      return /* true */1;
    }
  }
}

function exists(p, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (_1(p, param[0])) {
        return /* true */1;
      } else {
        _param = param[1];
        continue ;
        
      }
    } else {
      return /* false */0;
    }
  }
}

function mem(x, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (caml_compare(param[0], x)) {
        _param = param[1];
        continue ;
        
      } else {
        return /* true */1;
      }
    } else {
      return /* false */0;
    }
  }
}

function find_all(p) {
  return (function (param) {
      var _accu = /* [] */0;
      var _param = param;
      while(true) {
        var param$1 = _param;
        var accu = _accu;
        if (param$1) {
          var l = param$1[1];
          var x = param$1[0];
          if (_1(p, x)) {
            _param = l;
            _accu = /* :: */[
              x,
              accu
            ];
            continue ;
            
          } else {
            _param = l;
            continue ;
            
          }
        } else {
          return rev_append(accu, /* [] */0);
        }
      }
    });
}

function chop(_k, _l) {
  while(true) {
    var l = _l;
    var k = _k;
    if (k) {
      if (l) {
        _l = l[1];
        _k = k - 1 | 0;
        continue ;
        
      } else {
        throw [
              assert_failure,
              [
                "list.ml",
                223,
                11
              ]
            ];
      }
    } else {
      return l;
    }
  }
}

function stable_sort(cmp, l) {
  var sort = function (n, l) {
    var exit$$1 = 0;
    if (n !== 2) {
      if (n !== 3) {
        exit$$1 = 1;
      } else if (l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            if (_2(cmp, x1, x2) <= 0) {
              if (_2(cmp, x2, x3) <= 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (_2(cmp, x1, x3) <= 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else if (_2(cmp, x1, x3) <= 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ]
                    ];
            } else if (_2(cmp, x2, x3) <= 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            } else {
              return /* :: */[
                      x3,
                      /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            }
          } else {
            exit$$1 = 1;
          }
        } else {
          exit$$1 = 1;
        }
      } else {
        exit$$1 = 1;
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        if (_2(cmp, x1$1, x2$1) <= 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
        }
      } else {
        exit$$1 = 1;
      }
    } else {
      exit$$1 = 1;
    }
    if (exit$$1 === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = rev_sort(n1, l);
      var s2 = rev_sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var h2 = l2$1[0];
            var h1 = l1[0];
            if (_2(cmp, h1, h2) > 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l1 = l1[1];
              continue ;
              
            } else {
              _accu = /* :: */[
                h2,
                accu
              ];
              _l2 = l2$1[1];
              continue ;
              
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      }
    }
    
  };
  var rev_sort = function (n, l) {
    var exit$$1 = 0;
    if (n !== 2) {
      if (n !== 3) {
        exit$$1 = 1;
      } else if (l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            if (_2(cmp, x1, x2) > 0) {
              if (_2(cmp, x2, x3) > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ]
                      ];
              } else if (_2(cmp, x1, x3) > 0) {
                return /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              } else {
                return /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ]
                      ];
              }
            } else if (_2(cmp, x1, x3) > 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x1,
                        /* :: */[
                          x3,
                          /* [] */0
                        ]
                      ]
                    ];
            } else if (_2(cmp, x2, x3) > 0) {
              return /* :: */[
                      x2,
                      /* :: */[
                        x3,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            } else {
              return /* :: */[
                      x3,
                      /* :: */[
                        x2,
                        /* :: */[
                          x1,
                          /* [] */0
                        ]
                      ]
                    ];
            }
          } else {
            exit$$1 = 1;
          }
        } else {
          exit$$1 = 1;
        }
      } else {
        exit$$1 = 1;
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        if (_2(cmp, x1$1, x2$1) > 0) {
          return /* :: */[
                  x1$1,
                  /* :: */[
                    x2$1,
                    /* [] */0
                  ]
                ];
        } else {
          return /* :: */[
                  x2$1,
                  /* :: */[
                    x1$1,
                    /* [] */0
                  ]
                ];
        }
      } else {
        exit$$1 = 1;
      }
    } else {
      exit$$1 = 1;
    }
    if (exit$$1 === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = sort(n1, l);
      var s2 = sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var h2 = l2$1[0];
            var h1 = l1[0];
            if (_2(cmp, h1, h2) <= 0) {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l1 = l1[1];
              continue ;
              
            } else {
              _accu = /* :: */[
                h2,
                accu
              ];
              _l2 = l2$1[1];
              continue ;
              
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      }
    }
    
  };
  var len = length(l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

function sort_uniq(cmp, l) {
  var sort = function (n, l) {
    var exit$$1 = 0;
    if (n !== 2) {
      if (n !== 3) {
        exit$$1 = 1;
      } else if (l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            var c = _2(cmp, x1, x2);
            if (c) {
              if (c < 0) {
                var c$1 = _2(cmp, x2, x3);
                if (c$1) {
                  if (c$1 < 0) {
                    return /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* :: */[
                                x3,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    var c$2 = _2(cmp, x1, x3);
                    if (c$2) {
                      if (c$2 < 0) {
                        return /* :: */[
                                x1,
                                /* :: */[
                                  x3,
                                  /* :: */[
                                    x2,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      } else {
                        return /* :: */[
                                x3,
                                /* :: */[
                                  x1,
                                  /* :: */[
                                    x2,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      }
                    } else {
                      return /* :: */[
                              x1,
                              /* :: */[
                                x2,
                                /* [] */0
                              ]
                            ];
                    }
                  }
                } else {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else {
                var c$3 = _2(cmp, x1, x3);
                if (c$3) {
                  if (c$3 < 0) {
                    return /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* :: */[
                                x3,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    var c$4 = _2(cmp, x2, x3);
                    if (c$4) {
                      if (c$4 < 0) {
                        return /* :: */[
                                x2,
                                /* :: */[
                                  x3,
                                  /* :: */[
                                    x1,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      } else {
                        return /* :: */[
                                x3,
                                /* :: */[
                                  x2,
                                  /* :: */[
                                    x1,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      }
                    } else {
                      return /* :: */[
                              x2,
                              /* :: */[
                                x1,
                                /* [] */0
                              ]
                            ];
                    }
                  }
                } else {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                }
              }
            } else {
              var c$5 = _2(cmp, x2, x3);
              if (c$5) {
                if (c$5 < 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else {
                return /* :: */[
                        x2,
                        /* [] */0
                      ];
              }
            }
          } else {
            exit$$1 = 1;
          }
        } else {
          exit$$1 = 1;
        }
      } else {
        exit$$1 = 1;
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        var c$6 = _2(cmp, x1$1, x2$1);
        if (c$6) {
          if (c$6 < 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        } else {
          return /* :: */[
                  x1$1,
                  /* [] */0
                ];
        }
      } else {
        exit$$1 = 1;
      }
    } else {
      exit$$1 = 1;
    }
    if (exit$$1 === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = rev_sort(n1, l);
      var s2 = rev_sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var t2 = l2$1[1];
            var h2 = l2$1[0];
            var t1 = l1[1];
            var h1 = l1[0];
            var c$7 = _2(cmp, h1, h2);
            if (c$7) {
              if (c$7 > 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l1 = t1;
                continue ;
                
              } else {
                _accu = /* :: */[
                  h2,
                  accu
                ];
                _l2 = t2;
                continue ;
                
              }
            } else {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l2 = t2;
              _l1 = t1;
              continue ;
              
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      }
    }
    
  };
  var rev_sort = function (n, l) {
    var exit$$1 = 0;
    if (n !== 2) {
      if (n !== 3) {
        exit$$1 = 1;
      } else if (l) {
        var match = l[1];
        if (match) {
          var match$1 = match[1];
          if (match$1) {
            var x3 = match$1[0];
            var x2 = match[0];
            var x1 = l[0];
            var c = _2(cmp, x1, x2);
            if (c) {
              if (c > 0) {
                var c$1 = _2(cmp, x2, x3);
                if (c$1) {
                  if (c$1 > 0) {
                    return /* :: */[
                            x1,
                            /* :: */[
                              x2,
                              /* :: */[
                                x3,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    var c$2 = _2(cmp, x1, x3);
                    if (c$2) {
                      if (c$2 > 0) {
                        return /* :: */[
                                x1,
                                /* :: */[
                                  x3,
                                  /* :: */[
                                    x2,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      } else {
                        return /* :: */[
                                x3,
                                /* :: */[
                                  x1,
                                  /* :: */[
                                    x2,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      }
                    } else {
                      return /* :: */[
                              x1,
                              /* :: */[
                                x2,
                                /* [] */0
                              ]
                            ];
                    }
                  }
                } else {
                  return /* :: */[
                          x1,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else {
                var c$3 = _2(cmp, x1, x3);
                if (c$3) {
                  if (c$3 > 0) {
                    return /* :: */[
                            x2,
                            /* :: */[
                              x1,
                              /* :: */[
                                x3,
                                /* [] */0
                              ]
                            ]
                          ];
                  } else {
                    var c$4 = _2(cmp, x2, x3);
                    if (c$4) {
                      if (c$4 > 0) {
                        return /* :: */[
                                x2,
                                /* :: */[
                                  x3,
                                  /* :: */[
                                    x1,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      } else {
                        return /* :: */[
                                x3,
                                /* :: */[
                                  x2,
                                  /* :: */[
                                    x1,
                                    /* [] */0
                                  ]
                                ]
                              ];
                      }
                    } else {
                      return /* :: */[
                              x2,
                              /* :: */[
                                x1,
                                /* [] */0
                              ]
                            ];
                    }
                  }
                } else {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x1,
                            /* [] */0
                          ]
                        ];
                }
              }
            } else {
              var c$5 = _2(cmp, x2, x3);
              if (c$5) {
                if (c$5 > 0) {
                  return /* :: */[
                          x2,
                          /* :: */[
                            x3,
                            /* [] */0
                          ]
                        ];
                } else {
                  return /* :: */[
                          x3,
                          /* :: */[
                            x2,
                            /* [] */0
                          ]
                        ];
                }
              } else {
                return /* :: */[
                        x2,
                        /* [] */0
                      ];
              }
            }
          } else {
            exit$$1 = 1;
          }
        } else {
          exit$$1 = 1;
        }
      } else {
        exit$$1 = 1;
      }
    } else if (l) {
      var match$2 = l[1];
      if (match$2) {
        var x2$1 = match$2[0];
        var x1$1 = l[0];
        var c$6 = _2(cmp, x1$1, x2$1);
        if (c$6) {
          if (c$6 > 0) {
            return /* :: */[
                    x1$1,
                    /* :: */[
                      x2$1,
                      /* [] */0
                    ]
                  ];
          } else {
            return /* :: */[
                    x2$1,
                    /* :: */[
                      x1$1,
                      /* [] */0
                    ]
                  ];
          }
        } else {
          return /* :: */[
                  x1$1,
                  /* [] */0
                ];
        }
      } else {
        exit$$1 = 1;
      }
    } else {
      exit$$1 = 1;
    }
    if (exit$$1 === 1) {
      var n1 = (n >> 1);
      var n2 = n - n1 | 0;
      var l2 = chop(n1, l);
      var s1 = sort(n1, l);
      var s2 = sort(n2, l2);
      var _l1 = s1;
      var _l2 = s2;
      var _accu = /* [] */0;
      while(true) {
        var accu = _accu;
        var l2$1 = _l2;
        var l1 = _l1;
        if (l1) {
          if (l2$1) {
            var t2 = l2$1[1];
            var h2 = l2$1[0];
            var t1 = l1[1];
            var h1 = l1[0];
            var c$7 = _2(cmp, h1, h2);
            if (c$7) {
              if (c$7 < 0) {
                _accu = /* :: */[
                  h1,
                  accu
                ];
                _l1 = t1;
                continue ;
                
              } else {
                _accu = /* :: */[
                  h2,
                  accu
                ];
                _l2 = t2;
                continue ;
                
              }
            } else {
              _accu = /* :: */[
                h1,
                accu
              ];
              _l2 = t2;
              _l1 = t1;
              continue ;
              
            }
          } else {
            return rev_append(l1, accu);
          }
        } else {
          return rev_append(l2$1, accu);
        }
      }
    }
    
  };
  var len = length(l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

var filter = find_all;

var sort = stable_sort;


/* No side effect */

var $$Error = create("Js_exn.Error");


/* No side effect */

function make_matrix(sx, sy, init) {
  var res = caml_make_vect(sx, /* array */[]);
  for(var x = 0 ,x_finish = sx - 1 | 0; x <= x_finish; ++x){
    res[x] = caml_make_vect(sy, init);
  }
  return res;
}

function copy(a) {
  var l = a.length;
  if (l) {
    return caml_array_sub(a, 0, l);
  } else {
    return /* array */[];
  }
}

function append$1(a1, a2) {
  var l1 = a1.length;
  if (l1) {
    if (a2.length) {
      return a1.concat(a2);
    } else {
      return caml_array_sub(a1, 0, l1);
    }
  } else {
    return copy(a2);
  }
}

function blit(a1, ofs1, a2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (a1.length - len | 0) || ofs2 < 0 || ofs2 > (a2.length - len | 0)) {
    throw [
          invalid_argument,
          "Array.blit"
        ];
  } else {
    return caml_array_blit(a1, ofs1, a2, ofs2, len);
  }
}

function mapi$1$1(f, a) {
  var l = a.length;
  if (l) {
    var r = caml_make_vect(l, _2(f, 0, a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = _2(f, i, a[i]);
    }
    return r;
  } else {
    return /* array */[];
  }
}

var Bottom = create("Array.Bottom");


/* No side effect */

function escaped$1(c) {
  var exit = 0;
  if (c >= 40) {
    if (c !== 92) {
      exit = c >= 127 ? 1 : 2;
    } else {
      return "\\\\";
    }
  } else if (c >= 32) {
    if (c >= 39) {
      return "\\'";
    } else {
      exit = 2;
    }
  } else if (c >= 14) {
    exit = 1;
  } else {
    switch (c) {
      case 8 : 
          return "\\b";
      case 9 : 
          return "\\t";
      case 10 : 
          return "\\n";
      case 0 : 
      case 1 : 
      case 2 : 
      case 3 : 
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 11 : 
      case 12 : 
          exit = 1;
          break;
      case 13 : 
          return "\\r";
      
    }
  }
  switch (exit) {
    case 1 : 
        var s = new Array(4);
        s[0] = /* "\\" */92;
        s[1] = 48 + (c / 100 | 0) | 0;
        s[2] = 48 + (c / 10 | 0) % 10 | 0;
        s[3] = 48 + c % 10 | 0;
        return bytes_to_string(s);
    case 2 : 
        var s$1 = new Array(1);
        s$1[0] = c;
        return bytes_to_string(s$1);
    
  }
}


/* No side effect */

function make(n, c) {
  var s = caml_create_string(n);
  caml_fill_string(s, 0, n, c);
  return s;
}

function copy$1(s) {
  var len = s.length;
  var r = caml_create_string(len);
  caml_blit_bytes(s, 0, r, 0, len);
  return r;
}

function sub$3(s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw [
          invalid_argument,
          "String.sub / Bytes.sub"
        ];
  } else {
    var r = caml_create_string(len);
    caml_blit_bytes(s, ofs, r, 0, len);
    return r;
  }
}

function sub_string(b, ofs, len) {
  return bytes_to_string(sub$3(b, ofs, len));
}

function blit$2(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw [
          invalid_argument,
          "Bytes.blit"
        ];
  } else {
    return caml_blit_bytes(s1, ofs1, s2, ofs2, len);
  }
}

function blit_string(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw [
          invalid_argument,
          "String.blit / Bytes.blit_string"
        ];
  } else {
    return caml_blit_string(s1, ofs1, s2, ofs2, len);
  }
}

function iter$2(f, a) {
  for(var i = 0 ,i_finish = a.length - 1 | 0; i <= i_finish; ++i){
    _1(f, a[i]);
  }
  return /* () */0;
}

function escaped(s) {
  var n = 0;
  for(var i = 0 ,i_finish = s.length - 1 | 0; i <= i_finish; ++i){
    var match = s[i];
    var tmp;
    if (match >= 32) {
      var switcher = match - 34 | 0;
      tmp = switcher > 58 || switcher < 0 ? (
          switcher >= 93 ? 4 : 1
        ) : (
          switcher > 57 || switcher < 1 ? 2 : 1
        );
    } else {
      tmp = match >= 11 ? (
          match !== 13 ? 4 : 2
        ) : (
          match >= 8 ? 2 : 4
        );
    }
    n = n + tmp | 0;
  }
  if (n === s.length) {
    return copy$1(s);
  } else {
    var s$prime = caml_create_string(n);
    n = 0;
    for(var i$1 = 0 ,i_finish$1 = s.length - 1 | 0; i$1 <= i_finish$1; ++i$1){
      var c = s[i$1];
      var exit$$1 = 0;
      if (c >= 35) {
        if (c !== 92) {
          if (c >= 127) {
            exit$$1 = 1;
          } else {
            s$prime[n] = c;
          }
        } else {
          exit$$1 = 2;
        }
      } else if (c >= 32) {
        if (c >= 34) {
          exit$$1 = 2;
        } else {
          s$prime[n] = c;
        }
      } else if (c >= 14) {
        exit$$1 = 1;
      } else {
        switch (c) {
          case 8 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "b" */98;
              break;
          case 9 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "t" */116;
              break;
          case 10 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "n" */110;
              break;
          case 0 : 
          case 1 : 
          case 2 : 
          case 3 : 
          case 4 : 
          case 5 : 
          case 6 : 
          case 7 : 
          case 11 : 
          case 12 : 
              exit$$1 = 1;
              break;
          case 13 : 
              s$prime[n] = /* "\\" */92;
              n = n + 1 | 0;
              s$prime[n] = /* "r" */114;
              break;
          
        }
      }
      switch (exit$$1) {
        case 1 : 
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 100 | 0) | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + (c / 10 | 0) % 10 | 0;
            n = n + 1 | 0;
            s$prime[n] = 48 + c % 10 | 0;
            break;
        case 2 : 
            s$prime[n] = /* "\\" */92;
            n = n + 1 | 0;
            s$prime[n] = c;
            break;
        
      }
      n = n + 1 | 0;
    }
    return s$prime;
  }
}


/* No side effect */

function make$1(n, c) {
  return bytes_to_string(make(n, c));
}

function sub$4(s, ofs, len) {
  return bytes_to_string(sub$3(bytes_of_string(s), ofs, len));
}

function concat$3(sep, l) {
  if (l) {
    var hd$$1 = l[0];
    var num = [0];
    var len = [0];
    iter((function (s) {
            num[0] = num[0] + 1 | 0;
            len[0] = len[0] + s.length | 0;
            return /* () */0;
          }), l);
    var r = caml_create_string(len[0] + imul(sep.length, num[0] - 1 | 0) | 0);
    caml_blit_string(hd$$1, 0, r, 0, hd$$1.length);
    var pos = [hd$$1.length];
    iter((function (s) {
            caml_blit_string(sep, 0, r, pos[0], sep.length);
            pos[0] = pos[0] + sep.length | 0;
            caml_blit_string(s, 0, r, pos[0], s.length);
            pos[0] = pos[0] + s.length | 0;
            return /* () */0;
          }), l[1]);
    return bytes_to_string(r);
  } else {
    return "";
  }
}

function iter$3(f, s) {
  return iter$2(f, bytes_of_string(s));
}

function escaped$2(s) {
  var needs_escape = function (_i) {
    while(true) {
      var i = _i;
      if (i >= s.length) {
        return /* false */0;
      } else {
        var match = s.charCodeAt(i);
        if (match >= 32) {
          var switcher = match - 34 | 0;
          if (switcher > 58 || switcher < 0) {
            if (switcher >= 93) {
              return /* true */1;
            } else {
              _i = i + 1 | 0;
              continue ;
              
            }
          } else if (switcher > 57 || switcher < 1) {
            return /* true */1;
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        } else {
          return /* true */1;
        }
      }
    }
  };
  if (needs_escape(0)) {
    return bytes_to_string(escaped(bytes_of_string(s)));
  } else {
    return s;
  }
}

var compare$3 = caml_string_compare;

var blit$3 = blit_string;


/* No side effect */

function create$1(n) {
  var n$1 = n < 1 ? 1 : n;
  var s = caml_create_string(n$1);
  return /* record */[
          /* buffer */s,
          /* position */0,
          /* length */n$1,
          /* initial_buffer */s
        ];
}

function contents(b) {
  return sub_string(b[/* buffer */0], 0, b[/* position */1]);
}

function resize(b, more) {
  var len = b[/* length */2];
  var new_len = len;
  while((b[/* position */1] + more | 0) > new_len) {
    new_len = (new_len << 1);
  }
  var new_buffer = caml_create_string(new_len);
  blit$2(b[/* buffer */0], 0, new_buffer, 0, b[/* position */1]);
  b[/* buffer */0] = new_buffer;
  b[/* length */2] = new_len;
  return /* () */0;
}

function add_char(b, c) {
  var pos = b[/* position */1];
  if (pos >= b[/* length */2]) {
    resize(b, 1);
  }
  b[/* buffer */0][pos] = c;
  b[/* position */1] = pos + 1 | 0;
  return /* () */0;
}

function add_string(b, s) {
  var len = s.length;
  var new_position = b[/* position */1] + len | 0;
  if (new_position > b[/* length */2]) {
    resize(b, len);
  }
  blit_string(s, 0, b[/* buffer */0], b[/* position */1], len);
  b[/* position */1] = new_position;
  return /* () */0;
}


/* No side effect */

/* No side effect */

function caml_classify_float(x) {
  if (isFinite(x)) {
    if (Math.abs(x) >= 2.2250738585072014e-308) {
      return /* FP_normal */0;
    } else if (x !== 0) {
      return /* FP_subnormal */1;
    } else {
      return /* FP_zero */2;
    }
  } else if (isNaN(x)) {
    return /* FP_nan */4;
  } else {
    return /* FP_infinite */3;
  }
}


/* No side effect */

function buffer_check_size(buf, overhead) {
  var len = buf[/* bytes */1].length;
  var min_len = buf[/* ind */0] + overhead | 0;
  if (min_len > len) {
    var new_len = max((len << 1), min_len);
    var new_str = caml_create_string(new_len);
    blit$2(buf[/* bytes */1], 0, new_str, 0, len);
    buf[/* bytes */1] = new_str;
    return /* () */0;
  } else {
    return 0;
  }
}

function buffer_add_char(buf, c) {
  buffer_check_size(buf, 1);
  buf[/* bytes */1][buf[/* ind */0]] = c;
  buf[/* ind */0] = buf[/* ind */0] + 1 | 0;
  return /* () */0;
}

function buffer_add_string(buf, s) {
  var str_len = s.length;
  buffer_check_size(buf, str_len);
  blit$3(s, 0, buf[/* bytes */1], buf[/* ind */0], str_len);
  buf[/* ind */0] = buf[/* ind */0] + str_len | 0;
  return /* () */0;
}

function buffer_contents(buf) {
  return sub_string(buf[/* bytes */1], 0, buf[/* ind */0]);
}

function char_of_fconv(fconv) {
  switch (fconv) {
    case 0 : 
    case 1 : 
    case 2 : 
        return /* "f" */102;
    case 3 : 
    case 4 : 
    case 5 : 
        return /* "e" */101;
    case 6 : 
    case 7 : 
    case 8 : 
        return /* "E" */69;
    case 9 : 
    case 10 : 
    case 11 : 
        return /* "g" */103;
    case 12 : 
    case 13 : 
    case 14 : 
        return /* "G" */71;
    case 15 : 
        return /* "F" */70;
    
  }
}

function bprint_fconv_flag(buf, fconv) {
  switch (fconv) {
    case 1 : 
    case 4 : 
    case 7 : 
    case 10 : 
    case 13 : 
        return buffer_add_char(buf, /* "+" */43);
    case 2 : 
    case 5 : 
    case 8 : 
    case 11 : 
    case 14 : 
        return buffer_add_char(buf, /* " " */32);
    case 0 : 
    case 3 : 
    case 6 : 
    case 9 : 
    case 12 : 
    case 15 : 
        return /* () */0;
    
  }
}

function string_of_formatting_lit(formatting_lit) {
  if (typeof formatting_lit === "number") {
    switch (formatting_lit) {
      case 0 : 
          return "@]";
      case 1 : 
          return "@}";
      case 2 : 
          return "@?";
      case 3 : 
          return "@\n";
      case 4 : 
          return "@.";
      case 5 : 
          return "@@";
      case 6 : 
          return "@%";
      
    }
  } else {
    switch (formatting_lit.tag | 0) {
      case 0 : 
      case 1 : 
          return formatting_lit[0];
      case 2 : 
          return "@" + bytes_to_string(make(1, formatting_lit[0]));
      
    }
  }
}

function bprint_fmtty(buf, _fmtty) {
  while(true) {
    var fmtty = _fmtty;
    if (typeof fmtty === "number") {
      return /* () */0;
    } else {
      switch (fmtty.tag | 0) {
        case 0 : 
            buffer_add_string(buf, "%c");
            _fmtty = fmtty[0];
            continue ;
            case 1 : 
            buffer_add_string(buf, "%s");
            _fmtty = fmtty[0];
            continue ;
            case 2 : 
            buffer_add_string(buf, "%i");
            _fmtty = fmtty[0];
            continue ;
            case 3 : 
            buffer_add_string(buf, "%li");
            _fmtty = fmtty[0];
            continue ;
            case 4 : 
            buffer_add_string(buf, "%ni");
            _fmtty = fmtty[0];
            continue ;
            case 5 : 
            buffer_add_string(buf, "%Li");
            _fmtty = fmtty[0];
            continue ;
            case 6 : 
            buffer_add_string(buf, "%f");
            _fmtty = fmtty[0];
            continue ;
            case 7 : 
            buffer_add_string(buf, "%B");
            _fmtty = fmtty[0];
            continue ;
            case 8 : 
            buffer_add_string(buf, "%{");
            bprint_fmtty(buf, fmtty[0]);
            buffer_add_string(buf, "%}");
            _fmtty = fmtty[1];
            continue ;
            case 9 : 
            buffer_add_string(buf, "%(");
            bprint_fmtty(buf, fmtty[0]);
            buffer_add_string(buf, "%)");
            _fmtty = fmtty[2];
            continue ;
            case 10 : 
            buffer_add_string(buf, "%a");
            _fmtty = fmtty[0];
            continue ;
            case 11 : 
            buffer_add_string(buf, "%t");
            _fmtty = fmtty[0];
            continue ;
            case 12 : 
            buffer_add_string(buf, "%?");
            _fmtty = fmtty[0];
            continue ;
            case 13 : 
            buffer_add_string(buf, "%r");
            _fmtty = fmtty[0];
            continue ;
            case 14 : 
            buffer_add_string(buf, "%_r");
            _fmtty = fmtty[0];
            continue ;
            
      }
    }
  }
}

function symm(param) {
  if (typeof param === "number") {
    return /* End_of_fmtty */0;
  } else {
    switch (param.tag | 0) {
      case 0 : 
          return /* Char_ty */__(0, [symm(param[0])]);
      case 1 : 
          return /* String_ty */__(1, [symm(param[0])]);
      case 2 : 
          return /* Int_ty */__(2, [symm(param[0])]);
      case 3 : 
          return /* Int32_ty */__(3, [symm(param[0])]);
      case 4 : 
          return /* Nativeint_ty */__(4, [symm(param[0])]);
      case 5 : 
          return /* Int64_ty */__(5, [symm(param[0])]);
      case 6 : 
          return /* Float_ty */__(6, [symm(param[0])]);
      case 7 : 
          return /* Bool_ty */__(7, [symm(param[0])]);
      case 8 : 
          return /* Format_arg_ty */__(8, [
                    param[0],
                    symm(param[1])
                  ]);
      case 9 : 
          return /* Format_subst_ty */__(9, [
                    param[1],
                    param[0],
                    symm(param[2])
                  ]);
      case 10 : 
          return /* Alpha_ty */__(10, [symm(param[0])]);
      case 11 : 
          return /* Theta_ty */__(11, [symm(param[0])]);
      case 12 : 
          return /* Any_ty */__(12, [symm(param[0])]);
      case 13 : 
          return /* Reader_ty */__(13, [symm(param[0])]);
      case 14 : 
          return /* Ignored_reader_ty */__(14, [symm(param[0])]);
      
    }
  }
}

function fmtty_rel_det(param) {
  if (typeof param === "number") {
    return /* tuple */[
            (function () {
                return /* Refl */0;
              }),
            (function () {
                return /* Refl */0;
              }),
            (function () {
                return /* Refl */0;
              }),
            (function () {
                return /* Refl */0;
              })
          ];
  } else {
    switch (param.tag | 0) {
      case 0 : 
          var match = fmtty_rel_det(param[0]);
          var af = match[1];
          var fa = match[0];
          return /* tuple */[
                  (function () {
                      _1(fa, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match[2],
                  match[3]
                ];
      case 1 : 
          var match$1 = fmtty_rel_det(param[0]);
          var af$1 = match$1[1];
          var fa$1 = match$1[0];
          return /* tuple */[
                  (function () {
                      _1(fa$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$1[2],
                  match$1[3]
                ];
      case 2 : 
          var match$2 = fmtty_rel_det(param[0]);
          var af$2 = match$2[1];
          var fa$2 = match$2[0];
          return /* tuple */[
                  (function () {
                      _1(fa$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$2[2],
                  match$2[3]
                ];
      case 3 : 
          var match$3 = fmtty_rel_det(param[0]);
          var af$3 = match$3[1];
          var fa$3 = match$3[0];
          return /* tuple */[
                  (function () {
                      _1(fa$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$3, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$3[2],
                  match$3[3]
                ];
      case 4 : 
          var match$4 = fmtty_rel_det(param[0]);
          var af$4 = match$4[1];
          var fa$4 = match$4[0];
          return /* tuple */[
                  (function () {
                      _1(fa$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$4, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$4[2],
                  match$4[3]
                ];
      case 5 : 
          var match$5 = fmtty_rel_det(param[0]);
          var af$5 = match$5[1];
          var fa$5 = match$5[0];
          return /* tuple */[
                  (function () {
                      _1(fa$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$5, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$5[2],
                  match$5[3]
                ];
      case 6 : 
          var match$6 = fmtty_rel_det(param[0]);
          var af$6 = match$6[1];
          var fa$6 = match$6[0];
          return /* tuple */[
                  (function () {
                      _1(fa$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$6, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$6[2],
                  match$6[3]
                ];
      case 7 : 
          var match$7 = fmtty_rel_det(param[0]);
          var af$7 = match$7[1];
          var fa$7 = match$7[0];
          return /* tuple */[
                  (function () {
                      _1(fa$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$7, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$7[2],
                  match$7[3]
                ];
      case 8 : 
          var match$8 = fmtty_rel_det(param[1]);
          var af$8 = match$8[1];
          var fa$8 = match$8[0];
          return /* tuple */[
                  (function () {
                      _1(fa$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$8, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$8[2],
                  match$8[3]
                ];
      case 9 : 
          var match$9 = fmtty_rel_det(param[2]);
          var de = match$9[3];
          var ed = match$9[2];
          var af$9 = match$9[1];
          var fa$9 = match$9[0];
          var ty = trans(symm(param[0]), param[1]);
          var match$10 = fmtty_rel_det(ty);
          var jd = match$10[3];
          var dj = match$10[2];
          var ga = match$10[1];
          var ag = match$10[0];
          return /* tuple */[
                  (function () {
                      _1(fa$9, /* Refl */0);
                      _1(ag, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(ga, /* Refl */0);
                      _1(af$9, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(ed, /* Refl */0);
                      _1(dj, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(jd, /* Refl */0);
                      _1(de, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case 10 : 
          var match$11 = fmtty_rel_det(param[0]);
          var af$10 = match$11[1];
          var fa$10 = match$11[0];
          return /* tuple */[
                  (function () {
                      _1(fa$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$10, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$11[2],
                  match$11[3]
                ];
      case 11 : 
          var match$12 = fmtty_rel_det(param[0]);
          var af$11 = match$12[1];
          var fa$11 = match$12[0];
          return /* tuple */[
                  (function () {
                      _1(fa$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$11, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$12[2],
                  match$12[3]
                ];
      case 12 : 
          var match$13 = fmtty_rel_det(param[0]);
          var af$12 = match$13[1];
          var fa$12 = match$13[0];
          return /* tuple */[
                  (function () {
                      _1(fa$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$12, /* Refl */0);
                      return /* Refl */0;
                    }),
                  match$13[2],
                  match$13[3]
                ];
      case 13 : 
          var match$14 = fmtty_rel_det(param[0]);
          var de$1 = match$14[3];
          var ed$1 = match$14[2];
          var af$13 = match$14[1];
          var fa$13 = match$14[0];
          return /* tuple */[
                  (function () {
                      _1(fa$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$13, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(ed$1, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(de$1, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      case 14 : 
          var match$15 = fmtty_rel_det(param[0]);
          var de$2 = match$15[3];
          var ed$2 = match$15[2];
          var af$14 = match$15[1];
          var fa$14 = match$15[0];
          return /* tuple */[
                  (function () {
                      _1(fa$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(af$14, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(ed$2, /* Refl */0);
                      return /* Refl */0;
                    }),
                  (function () {
                      _1(de$2, /* Refl */0);
                      return /* Refl */0;
                    })
                ];
      
    }
  }
}

function trans(ty1, ty2) {
  var exit$$1 = 0;
  if (typeof ty1 === "number") {
    if (typeof ty2 === "number") {
      return /* End_of_fmtty */0;
    } else {
      switch (ty2.tag | 0) {
        case 8 : 
            exit$$1 = 6;
            break;
        case 9 : 
            exit$$1 = 7;
            break;
        case 10 : 
            exit$$1 = 1;
            break;
        case 11 : 
            exit$$1 = 2;
            break;
        case 12 : 
            exit$$1 = 3;
            break;
        case 13 : 
            exit$$1 = 4;
            break;
        case 14 : 
            exit$$1 = 5;
            break;
        default:
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  816,
                  23
                ]
              ];
      }
    }
  } else {
    switch (ty1.tag | 0) {
      case 0 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 0 : 
                  return /* Char_ty */__(0, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 1 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 1 : 
                  return /* String_ty */__(1, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 2 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 2 : 
                  return /* Int_ty */__(2, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 3 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 3 : 
                  return /* Int32_ty */__(3, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 4 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 4 : 
                  return /* Nativeint_ty */__(4, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 5 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 5 : 
                  return /* Int64_ty */__(5, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 6 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 6 : 
                  return /* Float_ty */__(6, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 7 : 
          if (typeof ty2 === "number") {
            exit$$1 = 8;
          } else {
            switch (ty2.tag | 0) {
              case 7 : 
                  return /* Bool_ty */__(7, [trans(ty1[0], ty2[0])]);
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  exit$$1 = 7;
                  break;
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              
            }
          }
          break;
      case 8 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    802,
                    26
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 8 : 
                  return /* Format_arg_ty */__(8, [
                            trans(ty1[0], ty2[0]),
                            trans(ty1[1], ty2[1])
                          ]);
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        802,
                        26
                      ]
                    ];
            }
          }
          break;
      case 9 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    812,
                    28
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 8 : 
                  exit$$1 = 6;
                  break;
              case 9 : 
                  var ty = trans(symm(ty1[1]), ty2[0]);
                  var match = fmtty_rel_det(ty);
                  _1(match[1], /* Refl */0);
                  _1(match[3], /* Refl */0);
                  return /* Format_subst_ty */__(9, [
                            ty1[0],
                            ty2[1],
                            trans(ty1[2], ty2[2])
                          ]);
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  exit$$1 = 5;
                  break;
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        812,
                        28
                      ]
                    ];
            }
          }
          break;
      case 10 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    780,
                    21
                  ]
                ];
          } else if (ty2.tag === 10) {
            return /* Alpha_ty */__(10, [trans(ty1[0], ty2[0])]);
          } else {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    780,
                    21
                  ]
                ];
          }
          break;
      case 11 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    784,
                    21
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  return /* Theta_ty */__(11, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        784,
                        21
                      ]
                    ];
            }
          }
          break;
      case 12 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    788,
                    19
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  return /* Any_ty */__(12, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        788,
                        19
                      ]
                    ];
            }
          }
          break;
      case 13 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    792,
                    22
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  return /* Reader_ty */__(13, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        792,
                        22
                      ]
                    ];
            }
          }
          break;
      case 14 : 
          if (typeof ty2 === "number") {
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    797,
                    30
                  ]
                ];
          } else {
            switch (ty2.tag | 0) {
              case 10 : 
                  exit$$1 = 1;
                  break;
              case 11 : 
                  exit$$1 = 2;
                  break;
              case 12 : 
                  exit$$1 = 3;
                  break;
              case 13 : 
                  exit$$1 = 4;
                  break;
              case 14 : 
                  return /* Ignored_reader_ty */__(14, [trans(ty1[0], ty2[0])]);
              default:
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        797,
                        30
                      ]
                    ];
            }
          }
          break;
      
    }
  }
  switch (exit$$1) {
    case 1 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                781,
                21
              ]
            ];
    case 2 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                785,
                21
              ]
            ];
    case 3 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                789,
                19
              ]
            ];
    case 4 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                793,
                22
              ]
            ];
    case 5 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                798,
                30
              ]
            ];
    case 6 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                803,
                26
              ]
            ];
    case 7 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                813,
                28
              ]
            ];
    case 8 : 
        throw [
              assert_failure,
              [
                "camlinternalFormat.ml",
                817,
                23
              ]
            ];
    
  }
}

var Type_mismatch = create("CamlinternalFormat.Type_mismatch");

function type_padding(pad, fmtty) {
  if (typeof pad === "number") {
    return /* Padding_fmtty_EBB */[
            /* No_padding */0,
            fmtty
          ];
  } else if (pad.tag) {
    if (typeof fmtty === "number") {
      throw Type_mismatch;
    } else if (fmtty.tag === 2) {
      return /* Padding_fmtty_EBB */[
              /* Arg_padding */__(1, [pad[0]]),
              fmtty[0]
            ];
    } else {
      throw Type_mismatch;
    }
  } else {
    return /* Padding_fmtty_EBB */[
            /* Lit_padding */__(0, [
                pad[0],
                pad[1]
              ]),
            fmtty
          ];
  }
}

function type_padprec(pad, prec, fmtty) {
  var match = type_padding(pad, fmtty);
  if (typeof prec === "number") {
    if (prec !== 0) {
      var match$1 = match[1];
      if (typeof match$1 === "number") {
        throw Type_mismatch;
      } else if (match$1.tag === 2) {
        return /* Padprec_fmtty_EBB */[
                match[0],
                /* Arg_precision */1,
                match$1[0]
              ];
      } else {
        throw Type_mismatch;
      }
    } else {
      return /* Padprec_fmtty_EBB */[
              match[0],
              /* No_precision */0,
              match[1]
            ];
    }
  } else {
    return /* Padprec_fmtty_EBB */[
            match[0],
            /* Lit_precision */[prec[0]],
            match[1]
          ];
  }
}

function type_ignored_param_one(ign, fmt, fmtty) {
  var match = type_format_gen(fmt, fmtty);
  return /* Fmt_fmtty_EBB */[
          /* Ignored_param */__(23, [
              ign,
              match[0]
            ]),
          match[1]
        ];
}

function type_format_gen(fmt, fmtty) {
  if (typeof fmt === "number") {
    return /* Fmt_fmtty_EBB */[
            /* End_of_format */0,
            fmtty
          ];
  } else {
    switch (fmt.tag | 0) {
      case 0 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag) {
            throw Type_mismatch;
          } else {
            var match = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Char */__(0, [match[0]]),
                    match[1]
                  ];
          }
          break;
      case 1 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag) {
            throw Type_mismatch;
          } else {
            var match$1 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Caml_char */__(1, [match$1[0]]),
                    match$1[1]
                  ];
          }
          break;
      case 2 : 
          var match$2 = type_padding(fmt[0], fmtty);
          var match$3 = match$2[1];
          if (typeof match$3 === "number") {
            throw Type_mismatch;
          } else if (match$3.tag === 1) {
            var match$4 = type_format_gen(fmt[1], match$3[0]);
            return /* Fmt_fmtty_EBB */[
                    /* String */__(2, [
                        match$2[0],
                        match$4[0]
                      ]),
                    match$4[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 3 : 
          var match$5 = type_padding(fmt[0], fmtty);
          var match$6 = match$5[1];
          if (typeof match$6 === "number") {
            throw Type_mismatch;
          } else if (match$6.tag === 1) {
            var match$7 = type_format_gen(fmt[1], match$6[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Caml_string */__(3, [
                        match$5[0],
                        match$7[0]
                      ]),
                    match$7[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 4 : 
          var match$8 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$9 = match$8[2];
          if (typeof match$9 === "number") {
            throw Type_mismatch;
          } else if (match$9.tag === 2) {
            var match$10 = type_format_gen(fmt[3], match$9[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int */__(4, [
                        fmt[0],
                        match$8[0],
                        match$8[1],
                        match$10[0]
                      ]),
                    match$10[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 5 : 
          var match$11 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$12 = match$11[2];
          if (typeof match$12 === "number") {
            throw Type_mismatch;
          } else if (match$12.tag === 3) {
            var match$13 = type_format_gen(fmt[3], match$12[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int32 */__(5, [
                        fmt[0],
                        match$11[0],
                        match$11[1],
                        match$13[0]
                      ]),
                    match$13[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 6 : 
          var match$14 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$15 = match$14[2];
          if (typeof match$15 === "number") {
            throw Type_mismatch;
          } else if (match$15.tag === 4) {
            var match$16 = type_format_gen(fmt[3], match$15[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Nativeint */__(6, [
                        fmt[0],
                        match$14[0],
                        match$14[1],
                        match$16[0]
                      ]),
                    match$16[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 7 : 
          var match$17 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$18 = match$17[2];
          if (typeof match$18 === "number") {
            throw Type_mismatch;
          } else if (match$18.tag === 5) {
            var match$19 = type_format_gen(fmt[3], match$18[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Int64 */__(7, [
                        fmt[0],
                        match$17[0],
                        match$17[1],
                        match$19[0]
                      ]),
                    match$19[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 8 : 
          var match$20 = type_padprec(fmt[1], fmt[2], fmtty);
          var match$21 = match$20[2];
          if (typeof match$21 === "number") {
            throw Type_mismatch;
          } else if (match$21.tag === 6) {
            var match$22 = type_format_gen(fmt[3], match$21[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Float */__(8, [
                        fmt[0],
                        match$20[0],
                        match$20[1],
                        match$22[0]
                      ]),
                    match$22[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 9 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 7) {
            var match$23 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Bool */__(9, [match$23[0]]),
                    match$23[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 10 : 
          var match$24 = type_format_gen(fmt[0], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Flush */__(10, [match$24[0]]),
                  match$24[1]
                ];
      case 11 : 
          var match$25 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* String_literal */__(11, [
                      fmt[0],
                      match$25[0]
                    ]),
                  match$25[1]
                ];
      case 12 : 
          var match$26 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Char_literal */__(12, [
                      fmt[0],
                      match$26[0]
                    ]),
                  match$26[1]
                ];
      case 13 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 8) {
            var sub_fmtty$prime = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[fmt[1]], /* Fmtty_EBB */[sub_fmtty$prime])) {
              throw Type_mismatch;
            }
            var match$27 = type_format_gen(fmt[2], fmtty[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Format_arg */__(13, [
                        fmt[0],
                        sub_fmtty$prime,
                        match$27[0]
                      ]),
                    match$27[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 14 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 9) {
            var sub_fmtty1 = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[erase_rel(fmt[1])], /* Fmtty_EBB */[erase_rel(sub_fmtty1)])) {
              throw Type_mismatch;
            }
            var match$28 = type_format_gen(fmt[2], erase_rel(fmtty[2]));
            return /* Fmt_fmtty_EBB */[
                    /* Format_subst */__(14, [
                        fmt[0],
                        sub_fmtty1,
                        match$28[0]
                      ]),
                    match$28[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 15 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 10) {
            var match$29 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Alpha */__(15, [match$29[0]]),
                    match$29[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 16 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 11) {
            var match$30 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Theta */__(16, [match$30[0]]),
                    match$30[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 17 : 
          var match$31 = type_format_gen(fmt[1], fmtty);
          return /* Fmt_fmtty_EBB */[
                  /* Formatting_lit */__(17, [
                      fmt[0],
                      match$31[0]
                    ]),
                  match$31[1]
                ];
      case 18 : 
          var formatting_gen = fmt[0];
          var fmt0 = fmt[1];
          var fmtty0 = fmtty;
          if (formatting_gen.tag) {
            var match$32 = formatting_gen[0];
            var match$33 = type_format_gen(match$32[0], fmtty0);
            var match$34 = type_format_gen(fmt0, match$33[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Formatting_gen */__(18, [
                        /* Open_box */__(1, [/* Format */[
                              match$33[0],
                              match$32[1]
                            ]]),
                        match$34[0]
                      ]),
                    match$34[1]
                  ];
          } else {
            var match$35 = formatting_gen[0];
            var match$36 = type_format_gen(match$35[0], fmtty0);
            var match$37 = type_format_gen(fmt0, match$36[1]);
            return /* Fmt_fmtty_EBB */[
                    /* Formatting_gen */__(18, [
                        /* Open_tag */__(0, [/* Format */[
                              match$36[0],
                              match$35[1]
                            ]]),
                        match$37[0]
                      ]),
                    match$37[1]
                  ];
          }
      case 19 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 13) {
            var match$38 = type_format_gen(fmt[0], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Reader */__(19, [match$38[0]]),
                    match$38[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 20 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 1) {
            var match$39 = type_format_gen(fmt[2], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Scan_char_set */__(20, [
                        fmt[0],
                        fmt[1],
                        match$39[0]
                      ]),
                    match$39[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 21 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 2) {
            var match$40 = type_format_gen(fmt[1], fmtty[0]);
            return /* Fmt_fmtty_EBB */[
                    /* Scan_get_counter */__(21, [
                        fmt[0],
                        match$40[0]
                      ]),
                    match$40[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 23 : 
          var ign = fmt[0];
          var fmt$1 = fmt[1];
          var fmtty$1 = fmtty;
          if (typeof ign === "number") {
            if (ign === 3) {
              if (typeof fmtty$1 === "number") {
                throw Type_mismatch;
              } else if (fmtty$1.tag === 14) {
                var match$41 = type_format_gen(fmt$1, fmtty$1[0]);
                return /* Fmt_fmtty_EBB */[
                        /* Ignored_param */__(23, [
                            /* Ignored_reader */3,
                            match$41[0]
                          ]),
                        match$41[1]
                      ];
              } else {
                throw Type_mismatch;
              }
            } else {
              return type_ignored_param_one(ign, fmt$1, fmtty$1);
            }
          } else {
            switch (ign.tag | 0) {
              case 7 : 
                  return type_ignored_param_one(/* Ignored_format_arg */__(7, [
                                ign[0],
                                ign[1]
                              ]), fmt$1, fmtty$1);
              case 8 : 
                  var match$42 = type_ignored_format_substitution(ign[1], fmt$1, fmtty$1);
                  var match$43 = match$42[1];
                  return /* Fmt_fmtty_EBB */[
                          /* Ignored_param */__(23, [
                              /* Ignored_format_subst */__(8, [
                                  ign[0],
                                  match$42[0]
                                ]),
                              match$43[0]
                            ]),
                          match$43[1]
                        ];
              default:
                return type_ignored_param_one(ign, fmt$1, fmtty$1);
            }
          }
      case 22 : 
      case 24 : 
          throw Type_mismatch;
      
    }
  }
}

function type_ignored_format_substitution(sub_fmtty, fmt, fmtty) {
  if (typeof sub_fmtty === "number") {
    return /* Fmtty_fmt_EBB */[
            /* End_of_fmtty */0,
            type_format_gen(fmt, fmtty)
          ];
  } else {
    switch (sub_fmtty.tag | 0) {
      case 0 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag) {
            throw Type_mismatch;
          } else {
            var match = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Char_ty */__(0, [match[0]]),
                    match[1]
                  ];
          }
          break;
      case 1 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 1) {
            var match$1 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* String_ty */__(1, [match$1[0]]),
                    match$1[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 2 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 2) {
            var match$2 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int_ty */__(2, [match$2[0]]),
                    match$2[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 3 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 3) {
            var match$3 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int32_ty */__(3, [match$3[0]]),
                    match$3[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 4 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 4) {
            var match$4 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Nativeint_ty */__(4, [match$4[0]]),
                    match$4[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 5 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 5) {
            var match$5 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Int64_ty */__(5, [match$5[0]]),
                    match$5[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 6 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 6) {
            var match$6 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Float_ty */__(6, [match$6[0]]),
                    match$6[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 7 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 7) {
            var match$7 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Bool_ty */__(7, [match$7[0]]),
                    match$7[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 8 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 8) {
            var sub2_fmtty$prime = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[sub_fmtty[0]], /* Fmtty_EBB */[sub2_fmtty$prime])) {
              throw Type_mismatch;
            }
            var match$8 = type_ignored_format_substitution(sub_fmtty[1], fmt, fmtty[1]);
            return /* Fmtty_fmt_EBB */[
                    /* Format_arg_ty */__(8, [
                        sub2_fmtty$prime,
                        match$8[0]
                      ]),
                    match$8[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 9 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 9) {
            var sub2_fmtty$prime$1 = fmtty[1];
            var sub1_fmtty$prime = fmtty[0];
            if (caml_notequal(/* Fmtty_EBB */[erase_rel(sub_fmtty[0])], /* Fmtty_EBB */[erase_rel(sub1_fmtty$prime)])) {
              throw Type_mismatch;
            }
            if (caml_notequal(/* Fmtty_EBB */[erase_rel(sub_fmtty[1])], /* Fmtty_EBB */[erase_rel(sub2_fmtty$prime$1)])) {
              throw Type_mismatch;
            }
            var sub_fmtty$prime = trans(symm(sub1_fmtty$prime), sub2_fmtty$prime$1);
            var match$9 = fmtty_rel_det(sub_fmtty$prime);
            _1(match$9[1], /* Refl */0);
            _1(match$9[3], /* Refl */0);
            var match$10 = type_ignored_format_substitution(erase_rel(sub_fmtty[2]), fmt, fmtty[2]);
            return /* Fmtty_fmt_EBB */[
                    /* Format_subst_ty */__(9, [
                        sub1_fmtty$prime,
                        sub2_fmtty$prime$1,
                        symm(match$10[0])
                      ]),
                    match$10[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 10 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 10) {
            var match$11 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Alpha_ty */__(10, [match$11[0]]),
                    match$11[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 11 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 11) {
            var match$12 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Theta_ty */__(11, [match$12[0]]),
                    match$12[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 12 : 
          throw Type_mismatch;
      case 13 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 13) {
            var match$13 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Reader_ty */__(13, [match$13[0]]),
                    match$13[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      case 14 : 
          if (typeof fmtty === "number") {
            throw Type_mismatch;
          } else if (fmtty.tag === 14) {
            var match$14 = type_ignored_format_substitution(sub_fmtty[0], fmt, fmtty[0]);
            return /* Fmtty_fmt_EBB */[
                    /* Ignored_reader_ty */__(14, [match$14[0]]),
                    match$14[1]
                  ];
          } else {
            throw Type_mismatch;
          }
          break;
      
    }
  }
}

function type_format(fmt, fmtty) {
  var match = type_format_gen(fmt, fmtty);
  if (typeof match[1] === "number") {
    return match[0];
  } else {
    throw Type_mismatch;
  }
}

function recast(fmt, fmtty) {
  return type_format(fmt, erase_rel(symm(fmtty)));
}

function fix_padding(padty, width, str) {
  var len = str.length;
  var match_000 = abs(width);
  var match_001 = width < 0 ? /* Left */0 : padty;
  var width$1 = match_000;
  if (width$1 <= len) {
    return str;
  } else {
    var padty$1 = match_001;
    var res = make(width$1, padty$1 === /* Zeros */2 ? /* "0" */48 : /* " " */32);
    switch (padty$1) {
      case 0 : 
          blit$3(str, 0, res, 0, len);
          break;
      case 1 : 
          blit$3(str, 0, res, width$1 - len | 0, len);
          break;
      case 2 : 
          if (len > 0 && (get(str, 0) === /* "+" */43 || get(str, 0) === /* "-" */45 || get(str, 0) === /* " " */32)) {
            res[0] = get(str, 0);
            blit$3(str, 1, res, (width$1 - len | 0) + 1 | 0, len - 1 | 0);
          } else if (len > 1 && get(str, 0) === /* "0" */48 && (get(str, 1) === /* "x" */120 || get(str, 1) === /* "X" */88)) {
            res[1] = get(str, 1);
            blit$3(str, 2, res, (width$1 - len | 0) + 2 | 0, len - 2 | 0);
          } else {
            blit$3(str, 0, res, width$1 - len | 0, len);
          }
          break;
      
    }
    return bytes_to_string(res);
  }
}

function fix_int_precision(prec, str) {
  var prec$1 = abs(prec);
  var len = str.length;
  var c = get(str, 0);
  var exit$$1 = 0;
  if (c >= 58) {
    if (c >= 71) {
      if (c > 102 || c < 97) {
        return str;
      } else {
        exit$$1 = 2;
      }
    } else if (c >= 65) {
      exit$$1 = 2;
    } else {
      return str;
    }
  } else if (c !== 32) {
    if (c >= 43) {
      switch (c - 43 | 0) {
        case 0 : 
        case 2 : 
            exit$$1 = 1;
            break;
        case 1 : 
        case 3 : 
        case 4 : 
            return str;
        case 5 : 
            if ((prec$1 + 2 | 0) > len && len > 1 && (get(str, 1) === /* "x" */120 || get(str, 1) === /* "X" */88)) {
              var res = make(prec$1 + 2 | 0, /* "0" */48);
              res[1] = get(str, 1);
              blit$3(str, 2, res, (prec$1 - len | 0) + 4 | 0, len - 2 | 0);
              return bytes_to_string(res);
            } else {
              exit$$1 = 2;
            }
            break;
        case 6 : 
        case 7 : 
        case 8 : 
        case 9 : 
        case 10 : 
        case 11 : 
        case 12 : 
        case 13 : 
        case 14 : 
            exit$$1 = 2;
            break;
        
      }
    } else {
      return str;
    }
  } else {
    exit$$1 = 1;
  }
  switch (exit$$1) {
    case 1 : 
        if ((prec$1 + 1 | 0) > len) {
          var res$1 = make(prec$1 + 1 | 0, /* "0" */48);
          res$1[0] = c;
          blit$3(str, 1, res$1, (prec$1 - len | 0) + 2 | 0, len - 1 | 0);
          return bytes_to_string(res$1);
        } else {
          return str;
        }
        break;
    case 2 : 
        if (prec$1 > len) {
          var res$2 = make(prec$1, /* "0" */48);
          blit$3(str, 0, res$2, prec$1 - len | 0, len);
          return bytes_to_string(res$2);
        } else {
          return str;
        }
        break;
    
  }
}

function string_to_caml_string(str) {
  return concat$3(escaped$2(str), /* :: */[
              "\"",
              /* :: */[
                "\"",
                /* [] */0
              ]
            ]);
}

function format_of_iconv(iconv) {
  switch (iconv) {
    case 0 : 
        return "%d";
    case 1 : 
        return "%+d";
    case 2 : 
        return "% d";
    case 3 : 
        return "%i";
    case 4 : 
        return "%+i";
    case 5 : 
        return "% i";
    case 6 : 
        return "%x";
    case 7 : 
        return "%#x";
    case 8 : 
        return "%X";
    case 9 : 
        return "%#X";
    case 10 : 
        return "%o";
    case 11 : 
        return "%#o";
    case 12 : 
        return "%u";
    
  }
}

function format_of_aconv(iconv, c) {
  var seps;
  switch (iconv) {
    case 0 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "d",
            /* [] */0
          ]
        ];
        break;
    case 1 : 
        seps = /* :: */[
          "%+",
          /* :: */[
            "d",
            /* [] */0
          ]
        ];
        break;
    case 2 : 
        seps = /* :: */[
          "% ",
          /* :: */[
            "d",
            /* [] */0
          ]
        ];
        break;
    case 3 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "i",
            /* [] */0
          ]
        ];
        break;
    case 4 : 
        seps = /* :: */[
          "%+",
          /* :: */[
            "i",
            /* [] */0
          ]
        ];
        break;
    case 5 : 
        seps = /* :: */[
          "% ",
          /* :: */[
            "i",
            /* [] */0
          ]
        ];
        break;
    case 6 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "x",
            /* [] */0
          ]
        ];
        break;
    case 7 : 
        seps = /* :: */[
          "%#",
          /* :: */[
            "x",
            /* [] */0
          ]
        ];
        break;
    case 8 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "X",
            /* [] */0
          ]
        ];
        break;
    case 9 : 
        seps = /* :: */[
          "%#",
          /* :: */[
            "X",
            /* [] */0
          ]
        ];
        break;
    case 10 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "o",
            /* [] */0
          ]
        ];
        break;
    case 11 : 
        seps = /* :: */[
          "%#",
          /* :: */[
            "o",
            /* [] */0
          ]
        ];
        break;
    case 12 : 
        seps = /* :: */[
          "%",
          /* :: */[
            "u",
            /* [] */0
          ]
        ];
        break;
    
  }
  return concat$3(bytes_to_string(make(1, c)), seps);
}

function format_of_fconv(fconv, prec) {
  if (fconv === /* Float_F */15) {
    return "%.12g";
  } else {
    var prec$1 = abs(prec);
    var symb = char_of_fconv(fconv);
    var buf = /* record */[
      /* ind */0,
      /* bytes */new Array(16)
    ];
    buffer_add_char(buf, /* "%" */37);
    bprint_fconv_flag(buf, fconv);
    buffer_add_char(buf, /* "." */46);
    buffer_add_string(buf, "" + prec$1);
    buffer_add_char(buf, symb);
    return buffer_contents(buf);
  }
}

function convert_int(iconv, n) {
  return caml_format_int(format_of_iconv(iconv), n);
}

function convert_int32(iconv, n) {
  return caml_int32_format(format_of_aconv(iconv, /* "l" */108), n);
}

function convert_nativeint(iconv, n) {
  return caml_nativeint_format(format_of_aconv(iconv, /* "n" */110), n);
}

function convert_int64(iconv, n) {
  return caml_int64_format(format_of_aconv(iconv, /* "L" */76), n);
}

function convert_float(fconv, prec, x) {
  var prec$1 = abs(prec);
  var str = caml_format_float(format_of_fconv(fconv, prec$1), x);
  if (fconv !== /* Float_F */15) {
    return str;
  } else {
    var len = str.length;
    var is_valid = function (_i) {
      while(true) {
        var i = _i;
        if (i === len) {
          return /* false */0;
        } else {
          var match = get(str, i);
          var switcher = match - 46 | 0;
          if (switcher > 23 || switcher < 0) {
            if (switcher !== 55) {
              _i = i + 1 | 0;
              continue ;
              
            } else {
              return /* true */1;
            }
          } else if (switcher > 22 || switcher < 1) {
            return /* true */1;
          } else {
            _i = i + 1 | 0;
            continue ;
            
          }
        }
      }
    };
    var match = caml_classify_float(x);
    if (match !== 3) {
      if (match >= 4) {
        return "nan";
      } else if (is_valid(0)) {
        return str;
      } else {
        return str + ".";
      }
    } else if (x < 0.0) {
      return "neg_infinity";
    } else {
      return "infinity";
    }
  }
}

function format_caml_char(c) {
  return concat$3(escaped$1(c), /* :: */[
              "'",
              /* :: */[
                "'",
                /* [] */0
              ]
            ]);
}

function string_of_fmtty(fmtty) {
  var buf = /* record */[
    /* ind */0,
    /* bytes */new Array(16)
  ];
  bprint_fmtty(buf, fmtty);
  return buffer_contents(buf);
}

function make_printf(_k, o, _acc, _fmt) {
  while(true) {
    var fmt = _fmt;
    var acc = _acc;
    var k = _k;
    if (typeof fmt === "number") {
      return _2(k, o, acc);
    } else {
      switch (fmt.tag | 0) {
        case 0 : 
            var rest = fmt[0];
            return (function(k,acc,rest){
            return function (c) {
              var new_acc = /* Acc_data_char */__(5, [
                  acc,
                  c
                ]);
              return make_printf(k, o, new_acc, rest);
            }
            }(k,acc,rest));
        case 1 : 
            var rest$1 = fmt[0];
            return (function(k,acc,rest$1){
            return function (c) {
              var new_acc_001 = format_caml_char(c);
              var new_acc = /* Acc_data_string */__(4, [
                  acc,
                  new_acc_001
                ]);
              return make_printf(k, o, new_acc, rest$1);
            }
            }(k,acc,rest$1));
        case 2 : 
            return make_string_padding(k, o, acc, fmt[1], fmt[0], (function (str) {
                          return str;
                        }));
        case 3 : 
            return make_string_padding(k, o, acc, fmt[1], fmt[0], string_to_caml_string);
        case 4 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int, fmt[0]);
        case 5 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int32, fmt[0]);
        case 6 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_nativeint, fmt[0]);
        case 7 : 
            return make_int_padding_precision(k, o, acc, fmt[3], fmt[1], fmt[2], convert_int64, fmt[0]);
        case 8 : 
            var k$1 = k;
            var o$1 = o;
            var acc$1 = acc;
            var fmt$1 = fmt[3];
            var pad = fmt[1];
            var prec = fmt[2];
            var fconv = fmt[0];
            if (typeof pad === "number") {
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv){
                  return function (p, x) {
                    var str = convert_float(fconv, p, x);
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv));
                } else {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv){
                  return function (x) {
                    var str = convert_float(fconv, 6, x);
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv));
                }
              } else {
                var p = prec[0];
                return (function(k$1,o$1,acc$1,fmt$1,fconv,p){
                return function (x) {
                  var str = convert_float(fconv, p, x);
                  return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                acc$1,
                                str
                              ]), fmt$1);
                }
                }(k$1,o$1,acc$1,fmt$1,fconv,p));
              }
            } else if (pad.tag) {
              var padty = pad[0];
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty){
                  return function (w, p, x) {
                    var str = fix_padding(padty, w, convert_float(fconv, p, x));
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty));
                } else {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty){
                  return function (w, x) {
                    var str = convert_float(fconv, 6, x);
                    var str$prime = fix_padding(padty, w, str);
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str$prime
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty));
                }
              } else {
                var p$1 = prec[0];
                return (function(k$1,o$1,acc$1,fmt$1,fconv,padty,p$1){
                return function (w, x) {
                  var str = fix_padding(padty, w, convert_float(fconv, p$1, x));
                  return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                acc$1,
                                str
                              ]), fmt$1);
                }
                }(k$1,o$1,acc$1,fmt$1,fconv,padty,p$1));
              }
            } else {
              var w = pad[1];
              var padty$1 = pad[0];
              if (typeof prec === "number") {
                if (prec !== 0) {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w){
                  return function (p, x) {
                    var str = fix_padding(padty$1, w, convert_float(fconv, p, x));
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w));
                } else {
                  return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w){
                  return function (x) {
                    var str = convert_float(fconv, 6, x);
                    var str$prime = fix_padding(padty$1, w, str);
                    return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                  acc$1,
                                  str$prime
                                ]), fmt$1);
                  }
                  }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w));
                }
              } else {
                var p$2 = prec[0];
                return (function(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w,p$2){
                return function (x) {
                  var str = fix_padding(padty$1, w, convert_float(fconv, p$2, x));
                  return make_printf(k$1, o$1, /* Acc_data_string */__(4, [
                                acc$1,
                                str
                              ]), fmt$1);
                }
                }(k$1,o$1,acc$1,fmt$1,fconv,padty$1,w,p$2));
              }
            }
        case 9 : 
            var rest$2 = fmt[0];
            return (function(k,acc,rest$2){
            return function (b) {
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            b ? "true" : "false"
                          ]), rest$2);
            }
            }(k,acc,rest$2));
        case 10 : 
            _fmt = fmt[0];
            _acc = /* Acc_flush */__(7, [acc]);
            continue ;
            case 11 : 
            _fmt = fmt[1];
            _acc = /* Acc_string_literal */__(2, [
                acc,
                fmt[0]
              ]);
            continue ;
            case 12 : 
            _fmt = fmt[1];
            _acc = /* Acc_char_literal */__(3, [
                acc,
                fmt[0]
              ]);
            continue ;
            case 13 : 
            var rest$3 = fmt[2];
            var ty = string_of_fmtty(fmt[1]);
            return (function(k,acc,rest$3,ty){
            return function () {
              return make_printf(k, o, /* Acc_data_string */__(4, [
                            acc,
                            ty
                          ]), rest$3);
            }
            }(k,acc,rest$3,ty));
        case 14 : 
            var rest$4 = fmt[2];
            var fmtty = fmt[1];
            return (function(k,acc,fmtty,rest$4){
            return function (param) {
              return make_printf(k, o, acc, concat_fmt(recast(param[0], fmtty), rest$4));
            }
            }(k,acc,fmtty,rest$4));
        case 15 : 
            var rest$5 = fmt[0];
            return (function(k,acc,rest$5){
            return function (f, x) {
              return make_printf(k, o, /* Acc_delay */__(6, [
                            acc,
                            (function (o) {
                                return _2(f, o, x);
                              })
                          ]), rest$5);
            }
            }(k,acc,rest$5));
        case 16 : 
            var rest$6 = fmt[0];
            return (function(k,acc,rest$6){
            return function (f) {
              return make_printf(k, o, /* Acc_delay */__(6, [
                            acc,
                            f
                          ]), rest$6);
            }
            }(k,acc,rest$6));
        case 17 : 
            _fmt = fmt[1];
            _acc = /* Acc_formatting_lit */__(0, [
                acc,
                fmt[0]
              ]);
            continue ;
            case 18 : 
            var match = fmt[0];
            if (match.tag) {
              var rest$7 = fmt[1];
              var k$prime = (function(k,acc,rest$7){
              return function k$prime(koc, kacc) {
                return make_printf(k, koc, /* Acc_formatting_gen */__(1, [
                              acc,
                              /* Acc_open_box */__(1, [kacc])
                            ]), rest$7);
              }
              }(k,acc,rest$7));
              _fmt = match[0][0];
              _acc = /* End_of_acc */0;
              _k = k$prime;
              continue ;
              
            } else {
              var rest$8 = fmt[1];
              var k$prime$1 = (function(k,acc,rest$8){
              return function k$prime$1(koc, kacc) {
                return make_printf(k, koc, /* Acc_formatting_gen */__(1, [
                              acc,
                              /* Acc_open_tag */__(0, [kacc])
                            ]), rest$8);
              }
              }(k,acc,rest$8));
              _fmt = match[0][0];
              _acc = /* End_of_acc */0;
              _k = k$prime$1;
              continue ;
              
            }
            break;
        case 19 : 
            throw [
                  assert_failure,
                  [
                    "camlinternalFormat.ml",
                    1449,
                    4
                  ]
                ];
        case 20 : 
            var rest$9 = fmt[2];
            var new_acc = /* Acc_invalid_arg */__(8, [
                acc,
                "Printf: bad conversion %["
              ]);
            return (function(k,rest$9,new_acc){
            return function () {
              return make_printf(k, o, new_acc, rest$9);
            }
            }(k,rest$9,new_acc));
        case 21 : 
            var rest$10 = fmt[1];
            return (function(k,acc,rest$10){
            return function (n) {
              var new_acc_001 = caml_format_int("%u", n);
              var new_acc = /* Acc_data_string */__(4, [
                  acc,
                  new_acc_001
                ]);
              return make_printf(k, o, new_acc, rest$10);
            }
            }(k,acc,rest$10));
        case 22 : 
            var rest$11 = fmt[0];
            return (function(k,acc,rest$11){
            return function (c) {
              var new_acc = /* Acc_data_char */__(5, [
                  acc,
                  c
                ]);
              return make_printf(k, o, new_acc, rest$11);
            }
            }(k,acc,rest$11));
        case 23 : 
            var k$2 = k;
            var o$2 = o;
            var acc$2 = acc;
            var ign = fmt[0];
            var fmt$2 = fmt[1];
            if (typeof ign === "number") {
              if (ign === 3) {
                throw [
                      assert_failure,
                      [
                        "camlinternalFormat.ml",
                        1517,
                        39
                      ]
                    ];
              } else {
                return make_invalid_arg(k$2, o$2, acc$2, fmt$2);
              }
            } else if (ign.tag === 8) {
              return make_from_fmtty(k$2, o$2, acc$2, ign[1], fmt$2);
            } else {
              return make_invalid_arg(k$2, o$2, acc$2, fmt$2);
            }
        case 24 : 
            return make_custom(k, o, acc, fmt[2], fmt[0], _1(fmt[1], /* () */0));
        
      }
    }
  }
}

function make_from_fmtty(k, o, acc, fmtty, fmt) {
  if (typeof fmtty === "number") {
    return make_invalid_arg(k, o, acc, fmt);
  } else {
    switch (fmtty.tag | 0) {
      case 0 : 
          var rest = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest, fmt);
            });
      case 1 : 
          var rest$1 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$1, fmt);
            });
      case 2 : 
          var rest$2 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$2, fmt);
            });
      case 3 : 
          var rest$3 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$3, fmt);
            });
      case 4 : 
          var rest$4 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$4, fmt);
            });
      case 5 : 
          var rest$5 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$5, fmt);
            });
      case 6 : 
          var rest$6 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$6, fmt);
            });
      case 7 : 
          var rest$7 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$7, fmt);
            });
      case 8 : 
          var rest$8 = fmtty[1];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$8, fmt);
            });
      case 9 : 
          var rest$9 = fmtty[2];
          var ty = trans(symm(fmtty[0]), fmtty[1]);
          return (function () {
              return make_from_fmtty(k, o, acc, concat_fmtty(ty, rest$9), fmt);
            });
      case 10 : 
          var rest$10 = fmtty[0];
          return (function (_, _$1) {
              return make_from_fmtty(k, o, acc, rest$10, fmt);
            });
      case 11 : 
          var rest$11 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$11, fmt);
            });
      case 12 : 
          var rest$12 = fmtty[0];
          return (function () {
              return make_from_fmtty(k, o, acc, rest$12, fmt);
            });
      case 13 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  1540,
                  31
                ]
              ];
      case 14 : 
          throw [
                assert_failure,
                [
                  "camlinternalFormat.ml",
                  1541,
                  31
                ]
              ];
      
    }
  }
}

function make_invalid_arg(k, o, acc, fmt) {
  return make_printf(k, o, /* Acc_invalid_arg */__(8, [
                acc,
                "Printf: bad conversion %_"
              ]), fmt);
}

function make_string_padding(k, o, acc, fmt, pad, trans) {
  if (typeof pad === "number") {
    return (function (x) {
        var new_acc_001 = _1(trans, x);
        var new_acc = /* Acc_data_string */__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  } else if (pad.tag) {
    var padty = pad[0];
    return (function (w, x) {
        var new_acc_001 = fix_padding(padty, w, _1(trans, x));
        var new_acc = /* Acc_data_string */__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  } else {
    var width = pad[1];
    var padty$1 = pad[0];
    return (function (x) {
        var new_acc_001 = fix_padding(padty$1, width, _1(trans, x));
        var new_acc = /* Acc_data_string */__(4, [
            acc,
            new_acc_001
          ]);
        return make_printf(k, o, new_acc, fmt);
      });
  }
}

function make_int_padding_precision(k, o, acc, fmt, pad, prec, trans, iconv) {
  if (typeof pad === "number") {
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (p, x) {
            var str = fix_int_precision(p, _2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (x) {
            var str = _2(trans, iconv, x);
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var p = prec[0];
      return (function (x) {
          var str = fix_int_precision(p, _2(trans, iconv, x));
          return make_printf(k, o, /* Acc_data_string */__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
  } else if (pad.tag) {
    var padty = pad[0];
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (w, p, x) {
            var str = fix_padding(padty, w, fix_int_precision(p, _2(trans, iconv, x)));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (w, x) {
            var str = fix_padding(padty, w, _2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var p$1 = prec[0];
      return (function (w, x) {
          var str = fix_padding(padty, w, fix_int_precision(p$1, _2(trans, iconv, x)));
          return make_printf(k, o, /* Acc_data_string */__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
  } else {
    var w = pad[1];
    var padty$1 = pad[0];
    if (typeof prec === "number") {
      if (prec !== 0) {
        return (function (p, x) {
            var str = fix_padding(padty$1, w, fix_int_precision(p, _2(trans, iconv, x)));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      } else {
        return (function (x) {
            var str = fix_padding(padty$1, w, _2(trans, iconv, x));
            return make_printf(k, o, /* Acc_data_string */__(4, [
                          acc,
                          str
                        ]), fmt);
          });
      }
    } else {
      var p$2 = prec[0];
      return (function (x) {
          var str = fix_padding(padty$1, w, fix_int_precision(p$2, _2(trans, iconv, x)));
          return make_printf(k, o, /* Acc_data_string */__(4, [
                        acc,
                        str
                      ]), fmt);
        });
    }
  }
}

function make_custom(k, o, acc, rest, arity, f) {
  if (arity) {
    var arity$1 = arity[0];
    return (function (x) {
        return make_custom(k, o, acc, rest, arity$1, _1(f, x));
      });
  } else {
    return make_printf(k, o, /* Acc_data_string */__(4, [
                  acc,
                  f
                ]), rest);
  }
}

function strput_acc(b, _acc) {
  while(true) {
    var acc = _acc;
    var exit$$1 = 0;
    if (typeof acc === "number") {
      return /* () */0;
    } else {
      switch (acc.tag | 0) {
        case 0 : 
            var s = string_of_formatting_lit(acc[1]);
            strput_acc(b, acc[0]);
            return add_string(b, s);
        case 1 : 
            var match = acc[1];
            var p = acc[0];
            strput_acc(b, p);
            if (match.tag) {
              add_string(b, "@[");
              _acc = match[0];
              continue ;
              
            } else {
              add_string(b, "@{");
              _acc = match[0];
              continue ;
              
            }
            break;
        case 2 : 
        case 4 : 
            exit$$1 = 1;
            break;
        case 3 : 
        case 5 : 
            exit$$1 = 2;
            break;
        case 6 : 
            strput_acc(b, acc[0]);
            return add_string(b, _1(acc[1], /* () */0));
        case 7 : 
            _acc = acc[0];
            continue ;
            case 8 : 
            strput_acc(b, acc[0]);
            throw [
                  invalid_argument,
                  acc[1]
                ];
        
      }
    }
    switch (exit$$1) {
      case 1 : 
          strput_acc(b, acc[0]);
          return add_string(b, acc[1]);
      case 2 : 
          strput_acc(b, acc[0]);
          return add_char(b, acc[1]);
      
    }
  }
}


/* No side effect */

function ksprintf(k, param) {
  var k$prime = function (_, acc) {
    var buf = create$1(64);
    strput_acc(buf, acc);
    return _1(k, contents(buf));
  };
  return make_printf(k$prime, /* () */0, /* End_of_acc */0, param[0]);
}

function sprintf(fmt) {
  return ksprintf((function (s) {
                return s;
              }), fmt);
}


/* No side effect */

/* No side effect */

/* No side effect */

function cmn(q, a, b, x, s, t) {
  var a$1 = ((a + q | 0) + x | 0) + t | 0;
  return ((a$1 << s) | (a$1 >>> (32 - s | 0)) | 0) + b | 0;
}

function f(a, b, c, d, x, s, t) {
  return cmn(b & c | (b ^ -1) & d, a, b, x, s, t);
}

function g(a, b, c, d, x, s, t) {
  return cmn(b & d | c & (d ^ -1), a, b, x, s, t);
}

function h(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function i(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | d ^ -1), a, b, x, s, t);
}

function cycle(x, k) {
  var a = x[0];
  var b = x[1];
  var c = x[2];
  var d = x[3];
  a = f(a, b, c, d, k[0], 7, -680876936);
  d = f(d, a, b, c, k[1], 12, -389564586);
  c = f(c, d, a, b, k[2], 17, 606105819);
  b = f(b, c, d, a, k[3], 22, -1044525330);
  a = f(a, b, c, d, k[4], 7, -176418897);
  d = f(d, a, b, c, k[5], 12, 1200080426);
  c = f(c, d, a, b, k[6], 17, -1473231341);
  b = f(b, c, d, a, k[7], 22, -45705983);
  a = f(a, b, c, d, k[8], 7, 1770035416);
  d = f(d, a, b, c, k[9], 12, -1958414417);
  c = f(c, d, a, b, k[10], 17, -42063);
  b = f(b, c, d, a, k[11], 22, -1990404162);
  a = f(a, b, c, d, k[12], 7, 1804603682);
  d = f(d, a, b, c, k[13], 12, -40341101);
  c = f(c, d, a, b, k[14], 17, -1502002290);
  b = f(b, c, d, a, k[15], 22, 1236535329);
  a = g(a, b, c, d, k[1], 5, -165796510);
  d = g(d, a, b, c, k[6], 9, -1069501632);
  c = g(c, d, a, b, k[11], 14, 643717713);
  b = g(b, c, d, a, k[0], 20, -373897302);
  a = g(a, b, c, d, k[5], 5, -701558691);
  d = g(d, a, b, c, k[10], 9, 38016083);
  c = g(c, d, a, b, k[15], 14, -660478335);
  b = g(b, c, d, a, k[4], 20, -405537848);
  a = g(a, b, c, d, k[9], 5, 568446438);
  d = g(d, a, b, c, k[14], 9, -1019803690);
  c = g(c, d, a, b, k[3], 14, -187363961);
  b = g(b, c, d, a, k[8], 20, 1163531501);
  a = g(a, b, c, d, k[13], 5, -1444681467);
  d = g(d, a, b, c, k[2], 9, -51403784);
  c = g(c, d, a, b, k[7], 14, 1735328473);
  b = g(b, c, d, a, k[12], 20, -1926607734);
  a = h(a, b, c, d, k[5], 4, -378558);
  d = h(d, a, b, c, k[8], 11, -2022574463);
  c = h(c, d, a, b, k[11], 16, 1839030562);
  b = h(b, c, d, a, k[14], 23, -35309556);
  a = h(a, b, c, d, k[1], 4, -1530992060);
  d = h(d, a, b, c, k[4], 11, 1272893353);
  c = h(c, d, a, b, k[7], 16, -155497632);
  b = h(b, c, d, a, k[10], 23, -1094730640);
  a = h(a, b, c, d, k[13], 4, 681279174);
  d = h(d, a, b, c, k[0], 11, -358537222);
  c = h(c, d, a, b, k[3], 16, -722521979);
  b = h(b, c, d, a, k[6], 23, 76029189);
  a = h(a, b, c, d, k[9], 4, -640364487);
  d = h(d, a, b, c, k[12], 11, -421815835);
  c = h(c, d, a, b, k[15], 16, 530742520);
  b = h(b, c, d, a, k[2], 23, -995338651);
  a = i(a, b, c, d, k[0], 6, -198630844);
  d = i(d, a, b, c, k[7], 10, 1126891415);
  c = i(c, d, a, b, k[14], 15, -1416354905);
  b = i(b, c, d, a, k[5], 21, -57434055);
  a = i(a, b, c, d, k[12], 6, 1700485571);
  d = i(d, a, b, c, k[3], 10, -1894986606);
  c = i(c, d, a, b, k[10], 15, -1051523);
  b = i(b, c, d, a, k[1], 21, -2054922799);
  a = i(a, b, c, d, k[8], 6, 1873313359);
  d = i(d, a, b, c, k[15], 10, -30611744);
  c = i(c, d, a, b, k[6], 15, -1560198380);
  b = i(b, c, d, a, k[13], 21, 1309151649);
  a = i(a, b, c, d, k[4], 6, -145523070);
  d = i(d, a, b, c, k[11], 10, -1120210379);
  c = i(c, d, a, b, k[2], 15, 718787259);
  b = i(b, c, d, a, k[9], 21, -343485551);
  x[0] = a + x[0] | 0;
  x[1] = b + x[1] | 0;
  x[2] = c + x[2] | 0;
  x[3] = d + x[3] | 0;
  return /* () */0;
}

var state = /* array */[
  1732584193,
  -271733879,
  -1732584194,
  271733878
];

var md5blk = /* array */[
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];

function caml_md5_string(s, start, len) {
  var s$1 = s.slice(start, len);
  var n = s$1.length;
  state[0] = 1732584193;
  state[1] = -271733879;
  state[2] = -1732584194;
  state[3] = 271733878;
  for(var i = 0; i <= 15; ++i){
    md5blk[i] = 0;
  }
  var i_end = n / 64 | 0;
  for(var i$1 = 1; i$1 <= i_end; ++i$1){
    for(var j = 0; j <= 15; ++j){
      var k = ((i$1 << 6) - 64 | 0) + (j << 2) | 0;
      md5blk[j] = ((s$1.charCodeAt(k) + (s$1.charCodeAt(k + 1 | 0) << 8) | 0) + (s$1.charCodeAt(k + 2 | 0) << 16) | 0) + (s$1.charCodeAt(k + 3 | 0) << 24) | 0;
    }
    cycle(state, md5blk);
  }
  var s_tail = s$1.slice((i_end << 6));
  for(var kk = 0; kk <= 15; ++kk){
    md5blk[kk] = 0;
  }
  var i_end$1 = s_tail.length - 1 | 0;
  for(var i$2 = 0; i$2 <= i_end$1; ++i$2){
    md5blk[i$2 / 4 | 0] = md5blk[i$2 / 4 | 0] | (s_tail.charCodeAt(i$2) << (i$2 % 4 << 3));
  }
  var i$3 = i_end$1 + 1 | 0;
  md5blk[i$3 / 4 | 0] = md5blk[i$3 / 4 | 0] | (128 << (i$3 % 4 << 3));
  if (i$3 > 55) {
    cycle(state, md5blk);
    for(var i$4 = 0; i$4 <= 15; ++i$4){
      md5blk[i$4] = 0;
    }
  }
  md5blk[14] = (n << 3);
  cycle(state, md5blk);
  return String.fromCharCode(state[0] & 255, (state[0] >> 8) & 255, (state[0] >> 16) & 255, (state[0] >> 24) & 255, state[1] & 255, (state[1] >> 8) & 255, (state[1] >> 16) & 255, (state[1] >> 24) & 255, state[2] & 255, (state[2] >> 8) & 255, (state[2] >> 16) & 255, (state[2] >> 24) & 255, state[3] & 255, (state[3] >> 8) & 255, (state[3] >> 16) & 255, (state[3] >> 24) & 255);
}


/* No side effect */

function string(str) {
  return caml_md5_string(str, 0, str.length);
}


/* No side effect */

/* No side effect */

function assign(st1, st2) {
  blit(st2[/* st */0], 0, st1[/* st */0], 0, 55);
  st1[/* idx */1] = st2[/* idx */1];
  return /* () */0;
}

function full_init(s, seed) {
  var combine = function (accu, x) {
    return string(accu + x);
  };
  var extract = function (d) {
    return ((get(d, 0) + (get(d, 1) << 8) | 0) + (get(d, 2) << 16) | 0) + (get(d, 3) << 24) | 0;
  };
  var seed$1 = seed.length ? seed : /* int array */[0];
  var l = seed$1.length;
  for(var i = 0; i <= 54; ++i){
    caml_array_set(s[/* st */0], i, i);
  }
  var accu = "x";
  for(var i$1 = 0 ,i_finish = 54 + max(55, l) | 0; i$1 <= i_finish; ++i$1){
    var j = i$1 % 55;
    var k = i$1 % l;
    accu = combine(accu, caml_array_get(seed$1, k));
    caml_array_set(s[/* st */0], j, (caml_array_get(s[/* st */0], j) ^ extract(accu)) & 1073741823);
  }
  s[/* idx */1] = 0;
  return /* () */0;
}

function copy$3(s) {
  var result = /* record */[
    /* st */caml_make_vect(55, 0),
    /* idx */0
  ];
  assign(result, s);
  return result;
}

function bits(s) {
  s[/* idx */1] = (s[/* idx */1] + 1 | 0) % 55;
  var curval = caml_array_get(s[/* st */0], s[/* idx */1]);
  var newval = caml_array_get(s[/* st */0], (s[/* idx */1] + 24 | 0) % 55) + (curval ^ (curval >>> 25) & 31) | 0;
  var newval30 = newval & 1073741823;
  caml_array_set(s[/* st */0], s[/* idx */1], newval30);
  return newval30;
}

function $$int(s, bound) {
  if (bound > 1073741823 || bound <= 0) {
    throw [
          invalid_argument,
          "Random.int"
        ];
  } else {
    var s$1 = s;
    var n = bound;
    while(true) {
      var r = bits(s$1);
      var v = r % n;
      if ((r - v | 0) > ((1073741823 - n | 0) + 1 | 0)) {
        continue ;
        
      } else {
        return v;
      }
    }
  }
}

function rawfloat(s) {
  var r1 = bits(s);
  var r2 = bits(s);
  return (r1 / 1073741824.0 + r2) / 1073741824.0;
}

var $$default = /* record */[
  /* st : array */[
    987910699,
    495797812,
    364182224,
    414272206,
    318284740,
    990407751,
    383018966,
    270373319,
    840823159,
    24560019,
    536292337,
    512266505,
    189156120,
    730249596,
    143776328,
    51606627,
    140166561,
    366354223,
    1003410265,
    700563762,
    981890670,
    913149062,
    526082594,
    1021425055,
    784300257,
    667753350,
    630144451,
    949649812,
    48546892,
    415514493,
    258888527,
    511570777,
    89983870,
    283659902,
    308386020,
    242688715,
    482270760,
    865188196,
    1027664170,
    207196989,
    193777847,
    619708188,
    671350186,
    149669678,
    257044018,
    87658204,
    558145612,
    183450813,
    28133145,
    901332182,
    710253903,
    510646120,
    652377910,
    409934019,
    801085050
  ],
  /* idx */0
];

function $$int$1(bound) {
  return $$int($$default, bound);
}

function $$float$1(scale) {
  return rawfloat($$default) * scale;
}

function full_init$1(seed) {
  return full_init($$default, seed);
}

function init$3(seed) {
  return full_init($$default, /* int array */[seed]);
}

function self_init() {
  return full_init$1(caml_sys_random_seed(/* () */0));
}

function get_state() {
  return copy$3($$default);
}

function set_state(s) {
  return assign($$default, s);
}


/* No side effect */

var match = caml_sys_get_argv(/* () */0);

var Break = create("Sys.Break");

var argv = match[1];

var executable_name = match[0];


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
function keycodeMap(param) {
  var switcher = param - 8 | 0;
  if (switcher > 214 || switcher < 0) {
    return /* Nothing */65;
  } else {
    switch (switcher) {
      case 0 : 
          return /* Backspace */0;
      case 1 : 
          return /* Tab */1;
      case 5 : 
          return /* Enter */2;
      case 8 : 
          return /* LeftShift */56;
      case 9 : 
          return /* LeftCtrl */55;
      case 10 : 
          return /* LeftAlt */57;
      case 12 : 
          return /* CapsLock */63;
      case 19 : 
          return /* Escape */3;
      case 24 : 
          return /* Space */4;
      case 29 : 
          return /* Left */52;
      case 30 : 
          return /* Up */54;
      case 31 : 
          return /* Right */51;
      case 32 : 
          return /* Down */53;
      case 40 : 
          return /* Num_0 */10;
      case 41 : 
          return /* Num_1 */11;
      case 42 : 
          return /* Num_2 */12;
      case 43 : 
          return /* Num_3 */13;
      case 44 : 
          return /* Num_4 */14;
      case 45 : 
          return /* Num_5 */15;
      case 46 : 
          return /* Num_6 */16;
      case 47 : 
          return /* Num_7 */17;
      case 48 : 
          return /* Num_8 */18;
      case 49 : 
          return /* Num_9 */19;
      case 57 : 
          return /* A */25;
      case 58 : 
          return /* B */26;
      case 59 : 
          return /* C */27;
      case 60 : 
          return /* D */28;
      case 61 : 
          return /* E */29;
      case 62 : 
          return /* F */30;
      case 63 : 
          return /* G */31;
      case 64 : 
          return /* H */32;
      case 65 : 
          return /* I */33;
      case 66 : 
          return /* J */34;
      case 67 : 
          return /* K */35;
      case 68 : 
          return /* L */36;
      case 69 : 
          return /* M */37;
      case 70 : 
          return /* N */38;
      case 71 : 
          return /* O */39;
      case 72 : 
          return /* P */40;
      case 73 : 
          return /* Q */41;
      case 74 : 
          return /* R */42;
      case 75 : 
          return /* S */43;
      case 76 : 
          return /* T */44;
      case 77 : 
          return /* U */45;
      case 78 : 
          return /* V */46;
      case 79 : 
          return /* W */47;
      case 80 : 
          return /* X */48;
      case 81 : 
          return /* Y */49;
      case 82 : 
          return /* Z */50;
      case 83 : 
          return /* LeftOsKey */58;
      case 85 : 
          return /* RightOsKey */62;
      case 178 : 
          return /* Semicolon */20;
      case 179 : 
          return /* Equals */21;
      case 180 : 
          return /* Comma */6;
      case 181 : 
          return /* Minus */7;
      case 182 : 
          return /* Period */8;
      case 183 : 
          return /* Slash */9;
      case 184 : 
          return /* Backtick */64;
      case 2 : 
      case 3 : 
      case 4 : 
      case 6 : 
      case 7 : 
      case 11 : 
      case 13 : 
      case 14 : 
      case 15 : 
      case 16 : 
      case 17 : 
      case 18 : 
      case 20 : 
      case 21 : 
      case 22 : 
      case 23 : 
      case 25 : 
      case 26 : 
      case 27 : 
      case 28 : 
      case 33 : 
      case 34 : 
      case 35 : 
      case 36 : 
      case 37 : 
      case 38 : 
      case 39 : 
      case 50 : 
      case 51 : 
      case 52 : 
      case 53 : 
      case 54 : 
      case 55 : 
      case 56 : 
      case 84 : 
      case 86 : 
      case 87 : 
      case 88 : 
      case 89 : 
      case 90 : 
      case 91 : 
      case 92 : 
      case 93 : 
      case 94 : 
      case 95 : 
      case 96 : 
      case 97 : 
      case 98 : 
      case 99 : 
      case 100 : 
      case 101 : 
      case 102 : 
      case 103 : 
      case 104 : 
      case 105 : 
      case 106 : 
      case 107 : 
      case 108 : 
      case 109 : 
      case 110 : 
      case 111 : 
      case 112 : 
      case 113 : 
      case 114 : 
      case 115 : 
      case 116 : 
      case 117 : 
      case 118 : 
      case 119 : 
      case 120 : 
      case 121 : 
      case 122 : 
      case 123 : 
      case 124 : 
      case 125 : 
      case 126 : 
      case 127 : 
      case 128 : 
      case 129 : 
      case 130 : 
      case 131 : 
      case 132 : 
      case 133 : 
      case 134 : 
      case 135 : 
      case 136 : 
      case 137 : 
      case 138 : 
      case 139 : 
      case 140 : 
      case 141 : 
      case 142 : 
      case 143 : 
      case 144 : 
      case 145 : 
      case 146 : 
      case 147 : 
      case 148 : 
      case 149 : 
      case 150 : 
      case 151 : 
      case 152 : 
      case 153 : 
      case 154 : 
      case 155 : 
      case 156 : 
      case 157 : 
      case 158 : 
      case 159 : 
      case 160 : 
      case 161 : 
      case 162 : 
      case 163 : 
      case 164 : 
      case 165 : 
      case 166 : 
      case 167 : 
      case 168 : 
      case 169 : 
      case 170 : 
      case 171 : 
      case 172 : 
      case 173 : 
      case 174 : 
      case 175 : 
      case 176 : 
      case 177 : 
      case 185 : 
      case 186 : 
      case 187 : 
      case 188 : 
      case 189 : 
      case 190 : 
      case 191 : 
      case 192 : 
      case 193 : 
      case 194 : 
      case 195 : 
      case 196 : 
      case 197 : 
      case 198 : 
      case 199 : 
      case 200 : 
      case 201 : 
      case 202 : 
      case 203 : 
      case 204 : 
      case 205 : 
      case 206 : 
      case 207 : 
      case 208 : 
      case 209 : 
      case 210 : 
          return /* Nothing */65;
      case 211 : 
          return /* OpenBracket */22;
      case 212 : 
          return /* Backslash */23;
      case 213 : 
          return /* CloseBracket */24;
      case 214 : 
          return /* Quote */5;
      
    }
  }
}


/* No side effect */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * Common utilities
 * @module glMatrix
 */

// Configuration Constants
const EPSILON = 0.000001;
let ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;


/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */


const degree = Math.PI / 180;

/**
 * Convert Degree To Radian
 *
 * @param {Number} a Angle in Degrees
 */


/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 *
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 2x2 Matrix
 * @module mat2
 */

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */


/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */


/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */


/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */


/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */


/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */


/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */


/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */


/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */


/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */


/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */


/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */


/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/


/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */


/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */


/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */


/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */



/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */


/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */


/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */


/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */


/**
 * Alias for {@link mat2.multiply}
 * @function
 */


/**
 * Alias for {@link mat2.subtract}
 * @function
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 2x3 Matrix
 * @module mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */


/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */


/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */


/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */


/**
 * Create a new mat2d with the given values
 *
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} A new mat2d
 */


/**
 * Set the components of a mat2d to the given values
 *
 * @param {mat2d} out the receiving matrix
 * @param {Number} a Component A (index 0)
 * @param {Number} b Component B (index 1)
 * @param {Number} c Component C (index 2)
 * @param {Number} d Component D (index 3)
 * @param {Number} tx Component TX (index 4)
 * @param {Number} ty Component TY (index 5)
 * @returns {mat2d} out
 */


/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */


/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */


/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */


/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/


/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/


/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.rotate(dest, dest, rad);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */


/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.scale(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2d} out
 */


/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat2d.identity(dest);
 *     mat2d.translate(dest, dest, vec);
 *
 * @param {mat2d} out mat2d receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat2d} out
 */


/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */


/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


/**
 * Adds two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */


/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */


/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2d} out
 */


/**
 * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2d} out the receiving vector
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2d} out
 */


/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2d} a The first matrix.
 * @param {mat2d} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


/**
 * Alias for {@link mat2d.multiply}
 * @function
 */


/**
 * Alias for {@link mat2d.subtract}
 * @function
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 3x3 Matrix
 * @module mat3
 */

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
function create$5() {
  let out = new ARRAY_TYPE(9);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 1;
  out[5] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 1;
  return out;
}

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */


/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */


/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */


/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */


/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */


/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */


/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */


/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */


/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */


/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/


/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */


/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */


/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */


/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/


/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/


/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/


/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */


/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */


/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */


/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */




/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */


/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */


/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


/**
 * Alias for {@link mat3.multiply}
 * @function
 */


/**
 * Alias for {@link mat3.subtract}
 * @function
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 4x4 Matrix
 * @module mat4
 */

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
function create$6() {
  let out = new ARRAY_TYPE(16);
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */


/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */


/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */



/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function identity$4(out) {
  out[0] = 1;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = 1;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 1;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[15] = 1;
  return out;
}

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */


/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */


/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate$2(out, a, v) {
  let x = v[0], y = v[1], z = v[2];
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;

  if (a === out) {
    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
    out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
    out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

    out[12] = a00 * x + a10 * y + a20 * z + a[12];
    out[13] = a01 * x + a11 * y + a21 * z + a[13];
    out[14] = a02 * x + a12 * y + a22 * z + a[14];
    out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }

  return out;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function scale$4(out, a, v) {
  let x = v[0], y = v[1], z = v[2];

  out[0] = a[0] * x;
  out[1] = a[1] * x;
  out[2] = a[2] * x;
  out[3] = a[3] * x;
  out[4] = a[4] * y;
  out[5] = a[5] * y;
  out[6] = a[6] * y;
  out[7] = a[7] * y;
  out[8] = a[8] * z;
  out[9] = a[9] * z;
  out[10] = a[10] * z;
  out[11] = a[11] * z;
  out[12] = a[12];
  out[13] = a[13];
  out[14] = a[14];
  out[15] = a[15];
  return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate$3(out, a, rad, axis) {
  let x = axis[0], y = axis[1], z = axis[2];
  let len = Math.sqrt(x * x + y * y + z * z);
  let s, c, t;
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  let b00, b01, b02;
  let b10, b11, b12;
  let b20, b21, b22;

  if (Math.abs(len) < EPSILON) { return null; }

  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;

  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;

  a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
  a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
  a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

  // Construct the elements of the rotation matrix
  b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
  b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
  b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;

  if (a !== out) { // If the source and destination differ, copy the unchanged last row
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
  }
  return out;
}

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */


/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */


/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */


/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */


/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */


/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */


/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */


/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */


/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */


/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */


/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */


/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */


/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
  let lr = 1 / (left - right);
  let bt = 1 / (bottom - top);
  let nf = 1 / (near - far);
  out[0] = -2 * lr;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = -2 * bt;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[10] = 2 * nf;
  out[11] = 0;
  out[12] = (left + right) * lr;
  out[13] = (top + bottom) * bt;
  out[14] = (far + near) * nf;
  out[15] = 1;
  return out;
}

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */


/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */


/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */


/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */


/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */


/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */


/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */


/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */


/**
 * Alias for {@link mat4.multiply}
 * @function
 */


/**
 * Alias for {@link mat4.subtract}
 * @function
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 3 Dimensional Vector
 * @module vec3
 */

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
function create$8() {
  let out = new ARRAY_TYPE(3);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  return out;
}

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */


/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function length$3(a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  return Math.sqrt(x*x + y*y + z*z);
}

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
function fromValues$5(x, y, z) {
  let out = new ARRAY_TYPE(3);
  out[0] = x;
  out[1] = y;
  out[2] = z;
  return out;
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */


/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */


/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */


/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */


/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */


/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */


/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */


/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */


/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */


/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */


/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */


/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */


/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize$1(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let len = x*x + y*y + z*z;
  if (len > 0) {
    //TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len);
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot$1(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
  let ax = a[0], ay = a[1], az = a[2];
  let bx = b[0], by = b[1], bz = b[2];

  out[0] = ay * bz - az * by;
  out[1] = az * bx - ax * bz;
  out[2] = ax * by - ay * bx;
  return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */


/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */


/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */


/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */


/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */


/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */


/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */


/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */


/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */


/**
 * Returns a string representation of a vector
 *
 * @param {vec3} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


/**
 * Alias for {@link vec3.subtract}
 * @function
 */


/**
 * Alias for {@link vec3.multiply}
 * @function
 */


/**
 * Alias for {@link vec3.divide}
 * @function
 */


/**
 * Alias for {@link vec3.distance}
 * @function
 */


/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */


/**
 * Alias for {@link vec3.length}
 * @function
 */
const len$2 = length$3;

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */


/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
const forEach = (function() {
  let vec = create$8();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if(!stride) {
      stride = 3;
    }

    if(!offset) {
      offset = 0;
    }

    if(count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for(i = offset; i < l; i += stride) {
      vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
      fn(vec, vec, arg);
      a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
    }

    return a;
  };
})();

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 4 Dimensional Vector
 * @module vec4
 */

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
function create$9() {
  let out = new ARRAY_TYPE(4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  return out;
}

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */


/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */


/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */


/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */


/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


/**
 * Math.ceil the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to ceil
 * @returns {vec4} out
 */


/**
 * Math.floor the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to floor
 * @returns {vec4} out
 */


/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */


/**
 * Math.round the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to round
 * @returns {vec4} out
 */


/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */


/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */


/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */


/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */


/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */


/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */


/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */


/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function normalize$2(out, a) {
  let x = a[0];
  let y = a[1];
  let z = a[2];
  let w = a[3];
  let len = x*x + y*y + z*z + w*w;
  if (len > 0) {
    len = 1 / Math.sqrt(len);
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
  }
  return out;
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */


/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */


/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */


/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */


/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */


/**
 * Returns a string representation of a vector
 *
 * @param {vec4} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec4} a The first vector.
 * @param {vec4} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


/**
 * Alias for {@link vec4.subtract}
 * @function
 */


/**
 * Alias for {@link vec4.multiply}
 * @function
 */


/**
 * Alias for {@link vec4.divide}
 * @function
 */


/**
 * Alias for {@link vec4.distance}
 * @function
 */


/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */


/**
 * Alias for {@link vec4.length}
 * @function
 */


/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */


/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
const forEach$1 = (function() {
  let vec = create$9();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if(!stride) {
      stride = 4;
    }

    if(!offset) {
      offset = 0;
    }

    if(count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for(i = offset; i < l; i += stride) {
      vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
      fn(vec, vec, arg);
      a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
    }

    return a;
  };
})();

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * Quaternion
 * @module quat
 */

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
function create$7() {
  let out = new ARRAY_TYPE(4);
  out[0] = 0;
  out[1] = 0;
  out[2] = 0;
  out[3] = 1;
  return out;
}

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */


/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
  rad = rad * 0.5;
  let s = Math.sin(rad);
  out[0] = s * axis[0];
  out[1] = s * axis[1];
  out[2] = s * axis[2];
  out[3] = Math.cos(rad);
  return out;
}

/**
 * Gets the rotation axis and angle for a given
 *  quaternion. If a quaternion is created with
 *  setAxisAngle, this method will return the same
 *  values as providied in the original parameter list
 *  OR functionally equivalent values.
 * Example: The quaternion formed by axis [0, 0, 1] and
 *  angle -90 is the same as the quaternion formed by
 *  [0, 0, 1] and 270. This method favors the latter.
 * @param  {vec3} out_axis  Vector receiving the axis of rotation
 * @param  {quat} q     Quaternion to be decomposed
 * @return {Number}     Angle, in radians, of the rotation
 */


/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */


/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */


/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */


/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
function slerp(out, a, b, t) {
  // benchmarks:
  //    http://jsperf.com/quaternion-slerp-implementations
  let ax = a[0], ay = a[1], az = a[2], aw = a[3];
  let bx = b[0], by = b[1], bz = b[2], bw = b[3];

  let omega, cosom, sinom, scale0, scale1;

  // calc cosine
  cosom = ax * bx + ay * by + az * bz + aw * bw;
  // adjust signs (if necessary)
  if ( cosom < 0.0 ) {
    cosom = -cosom;
    bx = - bx;
    by = - by;
    bz = - bz;
    bw = - bw;
  }
  // calculate coefficients
  if ( (1.0 - cosom) > 0.000001 ) {
    // standard case (slerp)
    omega  = Math.acos(cosom);
    sinom  = Math.sin(omega);
    scale0 = Math.sin((1.0 - t) * omega) / sinom;
    scale1 = Math.sin(t * omega) / sinom;
  } else {
    // "from" and "to" quaternions are very close
    //  ... so we can do a linear interpolation
    scale0 = 1.0 - t;
    scale1 = t;
  }
  // calculate final values
  out[0] = scale0 * ax + scale1 * bx;
  out[1] = scale0 * ay + scale1 * by;
  out[2] = scale0 * az + scale1 * bz;
  out[3] = scale0 * aw + scale1 * bw;

  return out;
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */


/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */


/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
  // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
  // article "Quaternion Calculus and Fast Animation".
  let fTrace = m[0] + m[4] + m[8];
  let fRoot;

  if ( fTrace > 0.0 ) {
    // |w| > 1/2, may as well choose w > 1/2
    fRoot = Math.sqrt(fTrace + 1.0);  // 2w
    out[3] = 0.5 * fRoot;
    fRoot = 0.5/fRoot;  // 1/(4w)
    out[0] = (m[5]-m[7])*fRoot;
    out[1] = (m[6]-m[2])*fRoot;
    out[2] = (m[1]-m[3])*fRoot;
  } else {
    // |w| <= 1/2
    let i = 0;
    if ( m[4] > m[0] )
      i = 1;
    if ( m[8] > m[i*3+i] )
      i = 2;
    let j = (i+1)%3;
    let k = (i+2)%3;

    fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
    out[i] = 0.5 * fRoot;
    fRoot = 0.5 / fRoot;
    out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
    out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
    out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
  }

  return out;
}

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {x} Angle to rotate around X axis in degrees.
 * @param {y} Angle to rotate around Y axis in degrees.
 * @param {z} Angle to rotate around Z axis in degrees.
 * @returns {quat} out
 * @function
 */


/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */


/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */


/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */


/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */


/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */


/**
 * Alias for {@link quat.multiply}
 * @function
 */


/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */


/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */


/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */


/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */


/**
 * Alias for {@link quat.length}
 * @function
 */


/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */


/**
 * Alias for {@link quat.squaredLength}
 * @function
 */


/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
const normalize = normalize$2;

/**
 * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
 *
 * @param {quat} a The first quaternion.
 * @param {quat} b The second quaternion.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


/**
 * Returns whether or not the quaternions have approximately the same elements in the same position.
 *
 * @param {quat} a The first vector.
 * @param {quat} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
const rotationTo = (function() {
  let tmpvec3 = create$8();
  let xUnitVec3 = fromValues$5(1,0,0);
  let yUnitVec3 = fromValues$5(0,1,0);

  return function(out, a, b) {
    let dot = dot$1(a, b);
    if (dot < -0.999999) {
      cross(tmpvec3, xUnitVec3, a);
      if (len$2(tmpvec3) < 0.000001)
        cross(tmpvec3, yUnitVec3, a);
      normalize$1(tmpvec3, tmpvec3);
      setAxisAngle(out, tmpvec3, Math.PI);
      return out;
    } else if (dot > 0.999999) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 1;
      return out;
    } else {
      cross(tmpvec3, a, b);
      out[0] = tmpvec3[0];
      out[1] = tmpvec3[1];
      out[2] = tmpvec3[2];
      out[3] = 1 + dot;
      return normalize(out, out);
    }
  };
})();

/**
 * Performs a spherical linear interpolation with two control points
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {quat} c the third operand
 * @param {quat} d the fourth operand
 * @param {Number} t interpolation amount
 * @returns {quat} out
 */
const sqlerp = (function () {
  let temp1 = create$7();
  let temp2 = create$7();

  return function (out, a, b, c, d, t) {
    slerp(temp1, a, d, t);
    slerp(temp2, b, c, t);
    slerp(out, temp1, temp2, 2 * t * (1 - t));

    return out;
  };
}());

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
const setAxes = (function() {
  let matr = create$5();

  return function(out, view, right, up) {
    matr[0] = right[0];
    matr[3] = right[1];
    matr[6] = right[2];

    matr[1] = up[0];
    matr[4] = up[1];
    matr[7] = up[2];

    matr[2] = -view[0];
    matr[5] = -view[1];
    matr[8] = -view[2];

    return normalize(out, fromMat3(out, matr));
  };
})();

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * 2 Dimensional Vector
 * @module vec2
 */

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
function create$10() {
  let out = new ARRAY_TYPE(2);
  out[0] = 0;
  out[1] = 0;
  return out;
}

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */


/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */


/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */


/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */


/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */


/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */


/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */


/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */


/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */


/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */


/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */


/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */


/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */


/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */


/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */


/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */


/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */


/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */


/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */


/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */


/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */


/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */


/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */


/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */


/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */


/**
 * Returns a string representation of a vector
 *
 * @param {vec2} a vector to represent as a string
 * @returns {String} string representation of the vector
 */


/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */


/**
 * Alias for {@link vec2.length}
 * @function
 */


/**
 * Alias for {@link vec2.subtract}
 * @function
 */


/**
 * Alias for {@link vec2.multiply}
 * @function
 */


/**
 * Alias for {@link vec2.divide}
 * @function
 */


/**
 * Alias for {@link vec2.distance}
 * @function
 */


/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */


/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */


/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
const forEach$2 = (function() {
  let vec = create$10();

  return function(a, stride, offset, count, fn, arg) {
    let i, l;
    if(!stride) {
      stride = 2;
    }

    if(!offset) {
      offset = 0;
    }

    if(count) {
      l = Math.min((count * stride) + offset, a.length);
    } else {
      l = a.length;
    }

    for(i = offset; i < l; i += stride) {
      vec[0] = a[i]; vec[1] = a[i+1];
      fn(vec, vec, arg);
      a[i] = vec[0]; a[i+1] = vec[1];
    }

    return a;
  };
})();

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.4.0
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
// END HEADER

function to_js_boolean(b) {
  if (b) {
    return true;
  } else {
    return false;
  }
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var triangles = 4;

var texture0 = 33984;

var texture_2d = 3553;

var blend = 3042;

var texture_wrap_s = 10242;

var texture_wrap_t = 10243;

var clamp_to_edge = 33071;

var src_alpha = 770;

var one_minus_src_alpha = 771;

var rgba = 6408;

var array_buffer = 34962;

var element_array_buffer = 34963;

var stream_draw = 35040;

var float_ = 5126;

var fragment_shader = 35632;

var vertex_shader = 35633;

var depth_buffer_bit = 256;

var color_buffer_bit = 16384;

var unsigned_short = 5123;

var unsigned_byte = 5121;

var texture_mag_filter = 10240;

var texture_min_filter = 10241;

var nearest = 9728;

var linear = 9729;

var linear_mipmap_nearest = 9985;


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var $$window = (window);

var makeAudioContext = ( function() { return new (window.AudioContext || window.webkitAudioContext)(); } );

function readFile(filename, cb) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", filename, false);
  rawFile.onreadystatechange = (function () {
      if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
        return _1(cb, rawFile.responseText);
      } else {
        return 0;
      }
    });
  rawFile.send(null);
  return /* () */0;
}

var File = /* module */[/* readFile */readFile];

function getWidth(param) {
  return param[0].width / window.devicePixelRatio | 0;
}

function getHeight(param) {
  return param[0].height / window.devicePixelRatio | 0;
}

function getPixelWidth(param) {
  return param[0].width | 0;
}

function getPixelHeight(param) {
  return param[0].height | 0;
}

function getPixelScale() {
  return window.devicePixelRatio;
}

function init$4() {
  var canvas = document.createElement("canvas");
  canvas.style.backgroundColor = "black";
  document.body.appendChild(canvas);
  return /* tuple */[
          canvas,
          _1(makeAudioContext, /* () */0)
        ];
}

function setWindowSize(param, width, height) {
  var w = param[0];
  w.width = width * window.devicePixelRatio | 0;
  w.height = height * window.devicePixelRatio | 0;
  w.style.width = string_of_int(width) + "px";
  w.style.height = string_of_int(height) + "px";
  return /* () */0;
}

function getContext(param) {
  return param[0].getContext("webgl", {
              preserveDrawingBuffer: /* true */1,
              antialias: /* true */1
            });
}

var Window = /* module */[
  /* getWidth */getWidth,
  /* getHeight */getHeight,
  /* getPixelWidth */getPixelWidth,
  /* getPixelHeight */getPixelHeight,
  /* getPixelScale */getPixelScale,
  /* init */init$4,
  /* setWindowSize */setWindowSize,
  /* getContext */getContext
];

function loadSound(param, path, cb) {
  var audioctx = param[1];
  var rawFile = new XMLHttpRequest();
  rawFile.responseType = "arraybuffer";
  rawFile.open("GET", path, true);
  rawFile.onreadystatechange = (function () {
      if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
        audioctx.decodeAudioData(rawFile.response, cb);
        return /* () */0;
      } else {
        return 0;
      }
    });
  rawFile.send(null);
  return /* () */0;
}

function playSound$1(param, sound, volume, loop) {
  var audioctx = param[1];
  var src = audioctx.createBufferSource();
  var gain = audioctx.createGain();
  gain.gain.value = volume;
  src.buffer = sound;
  src.connect(gain);
  gain.connect(audioctx.destination);
  src.start(0.0);
  src.loop = to_js_boolean(loop);
  return /* () */0;
}

var Audio = /* module */[
  /* loadSound */loadSound,
  /* playSound */playSound$1
];

function render(param, mouseDown, mouseUp, mouseMove, keyDown, keyUp, windowResize, displayFunc, _) {
  var canvas = param[0];
  if (mouseDown) {
    var cb = mouseDown[0];
    canvas.addEventListener("mousedown", (function (e) {
            var match = e.button;
            var button;
            if (match > 2 || match < 0) {
              throw [
                    assert_failure,
                    [
                      "reasongl.re",
                      241,
                      19
                    ]
                  ];
            } else {
              button = match;
            }
            var rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left | 0;
            var y = e.clientY - rect.top | 0;
            return _4(cb, button, /* MouseDown */0, x, y);
          }));
  }
  if (mouseUp) {
    var cb$1 = mouseUp[0];
    canvas.addEventListener("mouseup", (function (e) {
            var match = e.button;
            var button;
            if (match > 2 || match < 0) {
              throw [
                    assert_failure,
                    [
                      "reasongl.re",
                      263,
                      19
                    ]
                  ];
            } else {
              button = match;
            }
            var rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left | 0;
            var y = e.clientY - rect.top | 0;
            return _4(cb$1, button, /* MouseUp */1, x, y);
          }));
  }
  if (mouseMove) {
    var cb$2 = mouseMove[0];
    canvas.addEventListener("mousemove", (function (e) {
            var rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left | 0;
            var y = e.clientY - rect.top | 0;
            return _2(cb$2, x, y);
          }));
  }
  var keyLastPressed = [/* [] */0];
  if (keyDown) {
    var cb$3 = keyDown[0];
    $$window.addEventListener("keydown", (function (e) {
            var keycode = e.which;
            var repeat = fold_left((function (acc, k) {
                    if (acc) {
                      return /* true */1;
                    } else {
                      return +(k === keycode);
                    }
                  }), /* false */0, keyLastPressed[0]);
            if (!repeat) {
              keyLastPressed[0] = /* :: */[
                keycode,
                keyLastPressed[0]
              ];
            }
            return _2(cb$3, keycodeMap(keycode), repeat);
          }));
  }
  if (keyUp) {
    var cb$4 = keyUp[0];
    $$window.addEventListener("keyup", (function (e) {
            var keycode = e.which;
            keyLastPressed[0] = filter((function (k) {
                      return +(k !== keycode);
                    }))(keyLastPressed[0]);
            return _1(cb$4, keycodeMap(keycode));
          }));
  }
  if (windowResize) {
    var cb$5 = windowResize[0];
    $$window.addEventListener("resize", (function () {
            return _1(cb$5, /* () */0);
          }));
  }
  var tick = function (prev, _) {
    var now = Date.now();
    _1(displayFunc, now - prev);
    canvas.__hiddenrafid = window.requestAnimationFrame((function (param) {
            return tick(now, param);
          }));
    return /* () */0;
  };
  var partial_arg = Date.now();
  canvas.__hiddenrafid = window.requestAnimationFrame((function (param) {
          return tick(partial_arg, param);
        }));
  return /* () */0;
}

function shaderSource(context, shader, source) {
  context.shaderSource(shader, "#version 100 \n precision highp float; \n" + source);
  return /* () */0;
}

function create$2(kind, size) {
  switch (kind) {
    case 0 : 
        return new Float64Array(size);
    case 1 : 
        return new Float32Array(size);
    case 2 : 
        return new Int16Array(size);
    case 3 : 
        return new Uint16Array(size);
    case 4 : 
        return new Int8Array(size);
    case 5 : 
    case 6 : 
        return new Uint8Array(size);
    case 8 : 
        throw [
              assert_failure,
              [
                "reasongl.re",
                457,
                17
              ]
            ];
    case 7 : 
    case 9 : 
        return new Int32Array(size);
    
  }
}

function of_array(kind, arr) {
  switch (kind) {
    case 0 : 
        return new Float64Array(arr);
    case 1 : 
        return new Float32Array(arr);
    case 2 : 
        return new Int16Array(arr);
    case 3 : 
        return new Uint16Array(arr);
    case 4 : 
        return new Int8Array(arr);
    case 5 : 
    case 6 : 
        return new Uint8Array(arr);
    case 8 : 
        throw [
              assert_failure,
              [
                "reasongl.re",
                470,
                17
              ]
            ];
    case 7 : 
    case 9 : 
        return new Int32Array(arr);
    
  }
}

function unsafe_blit(arr, arr2, offset, _) {
  arr2.set(arr, offset);
  return /* () */0;
}

function sub$5(arr, offset, len) {
  return arr.subarray(offset, offset + len | 0);
}

function readPixels_RGBA(context, x, y, width, height) {
  var data = new Uint8Array((imul(width, height) << 2));
  context.readPixels(x, y, width, height, rgba, unsigned_byte, data);
  return data;
}

function loadImage(filename, _, callback, _$1) {
  var image = new Image();
  image.src = filename;
  image.addEventListener("load", (function () {
          return _1(callback, /* Some */[image]);
        }));
  return /* () */0;
}

function texImage2DWithImage(context, target, level, image) {
  context.texImage2D(target, level, rgba, rgba, unsigned_byte, image);
  return /* () */0;
}

function texImage2D_RGBA(context, target, level, width, height, border, data) {
  context.texImage2D(target, level, rgba, width, height, border, rgba, unsigned_byte, data);
  return /* () */0;
}

function vertexAttribPointer(context, attribute, size, type_, normalize$$1, stride, offset) {
  var normalize$1$$1 = normalize$$1 ? true : false;
  context.vertexAttribPointer(attribute, size, type_, normalize$1$$1, stride, offset);
  return /* () */0;
}

function to_array(a) {
  return a;
}

function Mat4_001() {
  return create$6();
}

function Mat4_002(prim) {
  identity$4(prim);
  return /* () */0;
}

function Mat4_003(prim, prim$1, prim$2) {
  translate$2(prim, prim$1, prim$2);
  return /* () */0;
}

function Mat4_004(prim, prim$1, prim$2) {
  scale$4(prim, prim$1, prim$2);
  return /* () */0;
}

function Mat4_005(prim, prim$1, prim$2, prim$3) {
  rotate$3(prim, prim$1, prim$2, prim$3);
  return /* () */0;
}

function Mat4_006(prim, prim$1, prim$2, prim$3, prim$4, prim$5, prim$6) {
  ortho(prim, prim$1, prim$2, prim$3, prim$4, prim$5, prim$6);
  return /* () */0;
}

var Mat4 = /* module */[
  /* to_array */to_array,
  Mat4_001,
  Mat4_002,
  Mat4_003,
  Mat4_004,
  Mat4_005,
  Mat4_006
];

function uniformMatrix4fv(context, $$location, value) {
  context.uniformMatrix4fv($$location, false, value);
  return /* () */0;
}

function getProgramParameter(context, program, paramName) {
  switch (paramName) {
    case 0 : 
        if (context.getProgramParameter(program, context.DELETE_STATUS)) {
          return 1;
        } else {
          return 0;
        }
    case 1 : 
        if (context.getProgramParameter(program, context.LINK_STATUS)) {
          return 1;
        } else {
          return 0;
        }
    case 2 : 
        if (context.getProgramParameter(program, context.VALIDATE_STATUS)) {
          return 1;
        } else {
          return 0;
        }
    
  }
}

function getShaderParameter(context, shader, paramName) {
  switch (paramName) {
    case 0 : 
        if (context.getShaderParameter(shader, context.DELETE_STATUS)) {
          return 1;
        } else {
          return 0;
        }
    case 1 : 
        if (context.getShaderParameter(shader, context.COMPILE_STATUS)) {
          return 1;
        } else {
          return 0;
        }
    case 2 : 
        return context.getShaderParameter(shader, context.SHADER_TYPE);
    
  }
}

var Gl_004 = /* Events : Events */[keycodeMap];

function Gl_006(prim, prim$1, prim$2, prim$3, prim$4) {
  prim.clearColor(prim$1, prim$2, prim$3, prim$4);
  return /* () */0;
}

function Gl_007(prim) {
  return prim.createProgram();
}

function Gl_008(prim, prim$1) {
  return prim.createShader(prim$1);
}

function Gl_009(prim, prim$1, prim$2) {
  prim.attachShader(prim$1, prim$2);
  return /* () */0;
}

function Gl_010(prim, prim$1) {
  prim.deleteShader(prim$1);
  return /* () */0;
}

function Gl_012(prim, prim$1) {
  prim.compileShader(prim$1);
  return /* () */0;
}

function Gl_013(prim, prim$1) {
  prim.linkProgram(prim$1);
  return /* () */0;
}

function Gl_014(prim, prim$1) {
  prim.useProgram(prim$1);
  return /* () */0;
}

function Gl_015(prim) {
  return prim.createBuffer();
}

function Gl_016(prim, prim$1, prim$2) {
  prim.bindBuffer(prim$1, prim$2);
  return /* () */0;
}

function Gl_017(prim) {
  return prim.createTexture();
}

function Gl_018(prim, prim$1) {
  prim.activeTexture(prim$1);
  return /* () */0;
}

function Gl_019(prim, prim$1, prim$2) {
  prim.bindTexture(prim$1, prim$2);
  return /* () */0;
}

function Gl_020(prim, prim$1, prim$2, prim$3) {
  prim.texParameteri(prim$1, prim$2, prim$3);
  return /* () */0;
}

function Gl_021(prim, prim$1) {
  prim.enable(prim$1);
  return /* () */0;
}

function Gl_022(prim, prim$1) {
  prim.disable(prim$1);
  return /* () */0;
}

function Gl_023(prim, prim$1, prim$2) {
  prim.blendFunc(prim$1, prim$2);
  return /* () */0;
}

var Gl_024 = /* Bigarray */[
  create$2,
  of_array,
  (function (prim) {
      return prim.length;
    }),
  (function (prim, prim$1) {
      prim.set(prim$1);
      return /* () */0;
    }),
  unsafe_blit,
  (function (prim, prim$1) {
      return prim[prim$1];
    }),
  (function (prim, prim$1) {
      return prim[prim$1];
    }),
  (function (prim, prim$1, prim$2) {
      prim[prim$1] = prim$2;
      return /* () */0;
    }),
  (function (prim, prim$1, prim$2) {
      prim[prim$1] = prim$2;
      return /* () */0;
    }),
  sub$5
];

function Gl_025(prim, prim$1, prim$2, prim$3, prim$4, prim$5, prim$6, prim$7, prim$8, prim$9) {
  prim.texSubImage2D(prim$1, prim$2, prim$3, prim$4, prim$5, prim$6, prim$7, prim$8, prim$9);
  return /* () */0;
}

function Gl_027(prim) {
  return prim.width;
}

function Gl_028(prim) {
  return prim.height;
}

function Gl_031(prim, prim$1, prim$2) {
  prim.uniform1i(prim$1, prim$2);
  return /* () */0;
}

function Gl_032(prim, prim$1, prim$2) {
  prim.uniform1f(prim$1, prim$2);
  return /* () */0;
}

function Gl_033(prim, prim$1, prim$2, prim$3) {
  prim.uniform2f(prim$1, prim$2, prim$3);
  return /* () */0;
}

function Gl_034(prim, prim$1, prim$2, prim$3, prim$4) {
  prim.uniform3f(prim$1, prim$2, prim$3, prim$4);
  return /* () */0;
}

function Gl_035(prim, prim$1, prim$2, prim$3, prim$4, prim$5) {
  prim.uniform4f(prim$1, prim$2, prim$3, prim$4, prim$5);
  return /* () */0;
}

function Gl_037(prim, prim$1, prim$2, prim$3) {
  prim.bufferData(prim$1, prim$2, prim$3);
  return /* () */0;
}

function Gl_038(prim, prim$1, prim$2, prim$3, prim$4) {
  prim.viewport(prim$1, prim$2, prim$3, prim$4);
  return /* () */0;
}

function Gl_039(prim, prim$1) {
  prim.clear(prim$1);
  return /* () */0;
}

function Gl_040(prim, prim$1, prim$2) {
  return prim.getUniformLocation(prim$1, prim$2);
}

function Gl_041(prim, prim$1, prim$2) {
  return prim.getAttribLocation(prim$1, prim$2);
}

function Gl_042(prim, prim$1) {
  prim.enableVertexAttribArray(prim$1);
  return /* () */0;
}

function Gl_044(prim, prim$1, prim$2) {
  prim.vertexAttribDivisor(prim$1, prim$2);
  return /* () */0;
}

function Gl_049(prim, prim$1) {
  return prim.getShaderInfoLog(prim$1);
}

function Gl_050(prim, prim$1) {
  return prim.getProgramInfoLog(prim$1);
}

function Gl_051(prim, prim$1) {
  return prim.getShaderSource(prim$1);
}

function Gl_052(prim, prim$1, prim$2, prim$3) {
  prim.drawArrays(prim$1, prim$2, prim$3);
  return /* () */0;
}

function Gl_053(prim, prim$1, prim$2, prim$3, prim$4) {
  prim.drawElements(prim$1, prim$2, prim$3, prim$4);
  return /* () */0;
}

function Gl_054(prim, prim$1, prim$2, prim$3, prim$4, prim$5) {
  prim.drawElementsInstanced(prim$1, prim$2, prim$3, prim$4, prim$5);
  return /* () */0;
}

var Gl = /* module */[
  /* target */"web",
  /* File */File,
  /* Window */Window,
  /* Audio */Audio,
  Gl_004,
  /* render */render,
  Gl_006,
  Gl_007,
  Gl_008,
  Gl_009,
  Gl_010,
  /* shaderSource */shaderSource,
  Gl_012,
  Gl_013,
  Gl_014,
  Gl_015,
  Gl_016,
  Gl_017,
  Gl_018,
  Gl_019,
  Gl_020,
  Gl_021,
  Gl_022,
  Gl_023,
  Gl_024,
  Gl_025,
  /* readPixels_RGBA */readPixels_RGBA,
  Gl_027,
  Gl_028,
  /* loadImage */loadImage,
  /* texImage2DWithImage */texImage2DWithImage,
  Gl_031,
  Gl_032,
  Gl_033,
  Gl_034,
  Gl_035,
  /* texImage2D_RGBA */texImage2D_RGBA,
  Gl_037,
  Gl_038,
  Gl_039,
  Gl_040,
  Gl_041,
  Gl_042,
  /* vertexAttribPointer */vertexAttribPointer,
  Gl_044,
  /* Mat4 */Mat4,
  /* uniformMatrix4fv */uniformMatrix4fv,
  /* getProgramParameter */getProgramParameter,
  /* getShaderParameter */getShaderParameter,
  Gl_049,
  Gl_050,
  Gl_051,
  Gl_052,
  Gl_053,
  Gl_054
];


/* window Not a pure module */

function Make$1(funarg) {
  var height = function (param) {
    if (param) {
      return param[3];
    } else {
      return 0;
    }
  };
  var create = function (l, v, r) {
    var hl = l ? l[3] : 0;
    var hr = r ? r[3] : 0;
    return /* Node */[
            l,
            v,
            r,
            hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          ];
  };
  var bal = function (l, v, r) {
    var hl = l ? l[3] : 0;
    var hr = r ? r[3] : 0;
    if (hl > (hr + 2 | 0)) {
      if (l) {
        var lr = l[2];
        var lv = l[1];
        var ll = l[0];
        if (height(ll) >= height(lr)) {
          return create(ll, lv, create(lr, v, r));
        } else if (lr) {
          return create(create(ll, lv, lr[0]), lr[1], create(lr[2], v, r));
        } else {
          throw [
                invalid_argument,
                "Set.bal"
              ];
        }
      } else {
        throw [
              invalid_argument,
              "Set.bal"
            ];
      }
    } else if (hr > (hl + 2 | 0)) {
      if (r) {
        var rr = r[2];
        var rv = r[1];
        var rl = r[0];
        if (height(rr) >= height(rl)) {
          return create(create(l, v, rl), rv, rr);
        } else if (rl) {
          return create(create(l, v, rl[0]), rl[1], create(rl[2], rv, rr));
        } else {
          throw [
                invalid_argument,
                "Set.bal"
              ];
        }
      } else {
        throw [
              invalid_argument,
              "Set.bal"
            ];
      }
    } else {
      return /* Node */[
              l,
              v,
              r,
              hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            ];
    }
  };
  var add = function (x, t) {
    if (t) {
      var r = t[2];
      var v = t[1];
      var l = t[0];
      var c = _2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          return bal(add(x, l), v, r);
        } else {
          return bal(l, v, add(x, r));
        }
      } else {
        return t;
      }
    } else {
      return /* Node */[
              /* Empty */0,
              x,
              /* Empty */0,
              1
            ];
    }
  };
  var singleton = function (x) {
    return /* Node */[
            /* Empty */0,
            x,
            /* Empty */0,
            1
          ];
  };
  var add_min_element = function (v, param) {
    if (param) {
      return bal(add_min_element(v, param[0]), param[1], param[2]);
    } else {
      return singleton(v);
    }
  };
  var add_max_element = function (v, param) {
    if (param) {
      return bal(param[0], param[1], add_max_element(v, param[2]));
    } else {
      return singleton(v);
    }
  };
  var join = function (l, v, r) {
    if (l) {
      if (r) {
        var rh = r[3];
        var lh = l[3];
        if (lh > (rh + 2 | 0)) {
          return bal(l[0], l[1], join(l[2], v, r));
        } else if (rh > (lh + 2 | 0)) {
          return bal(join(l, v, r[0]), r[1], r[2]);
        } else {
          return create(l, v, r);
        }
      } else {
        return add_max_element(v, l);
      }
    } else {
      return add_min_element(v, r);
    }
  };
  var min_elt = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var l = param[0];
        if (l) {
          _param = l;
          continue ;
          
        } else {
          return param[1];
        }
      } else {
        throw not_found;
      }
    }
  };
  var max_elt = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        var r = param[2];
        if (r) {
          _param = r;
          continue ;
          
        } else {
          return param[1];
        }
      } else {
        throw not_found;
      }
    }
  };
  var remove_min_elt = function (param) {
    if (param) {
      var l = param[0];
      if (l) {
        return bal(remove_min_elt(l), param[1], param[2]);
      } else {
        return param[2];
      }
    } else {
      throw [
            invalid_argument,
            "Set.remove_min_elt"
          ];
    }
  };
  var concat$$1 = function (t1, t2) {
    if (t1) {
      if (t2) {
        return join(t1, min_elt(t2), remove_min_elt(t2));
      } else {
        return t1;
      }
    } else {
      return t2;
    }
  };
  var split$$1 = function (x, param) {
    if (param) {
      var r = param[2];
      var v = param[1];
      var l = param[0];
      var c = _2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          var match = split$$1(x, l);
          return /* tuple */[
                  match[0],
                  match[1],
                  join(match[2], v, r)
                ];
        } else {
          var match$1 = split$$1(x, r);
          return /* tuple */[
                  join(l, v, match$1[0]),
                  match$1[1],
                  match$1[2]
                ];
        }
      } else {
        return /* tuple */[
                l,
                /* true */1,
                r
              ];
      }
    } else {
      return /* tuple */[
              /* Empty */0,
              /* false */0,
              /* Empty */0
            ];
    }
  };
  var is_empty = function (param) {
    if (param) {
      return /* false */0;
    } else {
      return /* true */1;
    }
  };
  var mem$$1 = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var c = _2(funarg[/* compare */0], x, param[1]);
        if (c) {
          _param = c < 0 ? param[0] : param[2];
          continue ;
          
        } else {
          return /* true */1;
        }
      } else {
        return /* false */0;
      }
    }
  };
  var remove = function (x, param) {
    if (param) {
      var r = param[2];
      var v = param[1];
      var l = param[0];
      var c = _2(funarg[/* compare */0], x, v);
      if (c) {
        if (c < 0) {
          return bal(remove(x, l), v, r);
        } else {
          return bal(l, v, remove(x, r));
        }
      } else {
        var t1 = l;
        var t2 = r;
        if (t1) {
          if (t2) {
            return bal(t1, min_elt(t2), remove_min_elt(t2));
          } else {
            return t1;
          }
        } else {
          return t2;
        }
      }
    } else {
      return /* Empty */0;
    }
  };
  var union = function (s1, s2) {
    if (s1) {
      if (s2) {
        var h2 = s2[3];
        var v2 = s2[1];
        var h1 = s1[3];
        var v1 = s1[1];
        if (h1 >= h2) {
          if (h2 === 1) {
            return add(v2, s1);
          } else {
            var match = split$$1(v1, s2);
            return join(union(s1[0], match[0]), v1, union(s1[2], match[2]));
          }
        } else if (h1 === 1) {
          return add(v1, s2);
        } else {
          var match$1 = split$$1(v2, s1);
          return join(union(match$1[0], s2[0]), v2, union(match$1[2], s2[2]));
        }
      } else {
        return s1;
      }
    } else {
      return s2;
    }
  };
  var inter = function (s1, s2) {
    if (s1) {
      if (s2) {
        var r1 = s1[2];
        var v1 = s1[1];
        var l1 = s1[0];
        var match = split$$1(v1, s2);
        var l2 = match[0];
        if (match[1] !== 0) {
          return join(inter(l1, l2), v1, inter(r1, match[2]));
        } else {
          return concat$$1(inter(l1, l2), inter(r1, match[2]));
        }
      } else {
        return /* Empty */0;
      }
    } else {
      return /* Empty */0;
    }
  };
  var diff = function (s1, s2) {
    if (s1) {
      if (s2) {
        var r1 = s1[2];
        var v1 = s1[1];
        var l1 = s1[0];
        var match = split$$1(v1, s2);
        var l2 = match[0];
        if (match[1] !== 0) {
          return concat$$1(diff(l1, l2), diff(r1, match[2]));
        } else {
          return join(diff(l1, l2), v1, diff(r1, match[2]));
        }
      } else {
        return s1;
      }
    } else {
      return /* Empty */0;
    }
  };
  var cons_enum = function (_s, _e) {
    while(true) {
      var e = _e;
      var s = _s;
      if (s) {
        _e = /* More */[
          s[1],
          s[2],
          e
        ];
        _s = s[0];
        continue ;
        
      } else {
        return e;
      }
    }
  };
  var compare = function (s1, s2) {
    var _e1 = cons_enum(s1, /* End */0);
    var _e2 = cons_enum(s2, /* End */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (e1) {
        if (e2) {
          var c = _2(funarg[/* compare */0], e1[0], e2[0]);
          if (c !== 0) {
            return c;
          } else {
            _e2 = cons_enum(e2[1], e2[2]);
            _e1 = cons_enum(e1[1], e1[2]);
            continue ;
            
          }
        } else {
          return 1;
        }
      } else if (e2) {
        return -1;
      } else {
        return 0;
      }
    }
  };
  var equal = function (s1, s2) {
    return +(compare(s1, s2) === 0);
  };
  var subset = function (_s1, _s2) {
    while(true) {
      var s2 = _s2;
      var s1 = _s1;
      if (s1) {
        if (s2) {
          var r2 = s2[2];
          var l2 = s2[0];
          var r1 = s1[2];
          var v1 = s1[1];
          var l1 = s1[0];
          var c = _2(funarg[/* compare */0], v1, s2[1]);
          if (c) {
            if (c < 0) {
              if (subset(/* Node */[
                      l1,
                      v1,
                      /* Empty */0,
                      0
                    ], l2)) {
                _s1 = r1;
                continue ;
                
              } else {
                return /* false */0;
              }
            } else if (subset(/* Node */[
                    /* Empty */0,
                    v1,
                    r1,
                    0
                  ], r2)) {
              _s1 = l1;
              continue ;
              
            } else {
              return /* false */0;
            }
          } else if (subset(l1, l2)) {
            _s2 = r2;
            _s1 = r1;
            continue ;
            
          } else {
            return /* false */0;
          }
        } else {
          return /* false */0;
        }
      } else {
        return /* true */1;
      }
    }
  };
  var iter$$1 = function (f, _param) {
    while(true) {
      var param = _param;
      if (param) {
        iter$$1(f, param[0]);
        _1(f, param[1]);
        _param = param[2];
        continue ;
        
      } else {
        return /* () */0;
      }
    }
  };
  var fold = function (f, _s, _accu) {
    while(true) {
      var accu = _accu;
      var s = _s;
      if (s) {
        _accu = _2(f, s[1], fold(f, s[0], accu));
        _s = s[2];
        continue ;
        
      } else {
        return accu;
      }
    }
  };
  var for_all$$1 = function (p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (_1(p, param[1])) {
          if (for_all$$1(p, param[0])) {
            _param = param[2];
            continue ;
            
          } else {
            return /* false */0;
          }
        } else {
          return /* false */0;
        }
      } else {
        return /* true */1;
      }
    }
  };
  var exists$$1 = function (p, _param) {
    while(true) {
      var param = _param;
      if (param) {
        if (_1(p, param[1])) {
          return /* true */1;
        } else if (exists$$1(p, param[0])) {
          return /* true */1;
        } else {
          _param = param[2];
          continue ;
          
        }
      } else {
        return /* false */0;
      }
    }
  };
  var filter$$1 = function (p, param) {
    if (param) {
      var v = param[1];
      var l$prime = filter$$1(p, param[0]);
      var pv = _1(p, v);
      var r$prime = filter$$1(p, param[2]);
      if (pv) {
        return join(l$prime, v, r$prime);
      } else {
        return concat$$1(l$prime, r$prime);
      }
    } else {
      return /* Empty */0;
    }
  };
  var partition$$1 = function (p, param) {
    if (param) {
      var v = param[1];
      var match = partition$$1(p, param[0]);
      var lf = match[1];
      var lt = match[0];
      var pv = _1(p, v);
      var match$1 = partition$$1(p, param[2]);
      var rf = match$1[1];
      var rt = match$1[0];
      if (pv) {
        return /* tuple */[
                join(lt, v, rt),
                concat$$1(lf, rf)
              ];
      } else {
        return /* tuple */[
                concat$$1(lt, rt),
                join(lf, v, rf)
              ];
      }
    } else {
      return /* tuple */[
              /* Empty */0,
              /* Empty */0
            ];
    }
  };
  var cardinal = function (param) {
    if (param) {
      return (cardinal(param[0]) + 1 | 0) + cardinal(param[2]) | 0;
    } else {
      return 0;
    }
  };
  var elements_aux = function (_accu, _param) {
    while(true) {
      var param = _param;
      var accu = _accu;
      if (param) {
        _param = param[0];
        _accu = /* :: */[
          param[1],
          elements_aux(accu, param[2])
        ];
        continue ;
        
      } else {
        return accu;
      }
    }
  };
  var elements = function (s) {
    return elements_aux(/* [] */0, s);
  };
  var find$$1 = function (x, _param) {
    while(true) {
      var param = _param;
      if (param) {
        var v = param[1];
        var c = _2(funarg[/* compare */0], x, v);
        if (c) {
          _param = c < 0 ? param[0] : param[2];
          continue ;
          
        } else {
          return v;
        }
      } else {
        throw not_found;
      }
    }
  };
  var of_list = function (l) {
    if (l) {
      var match = l[1];
      var x0 = l[0];
      if (match) {
        var match$1 = match[1];
        var x1 = match[0];
        if (match$1) {
          var match$2 = match$1[1];
          var x2 = match$1[0];
          if (match$2) {
            var match$3 = match$2[1];
            var x3 = match$2[0];
            if (match$3) {
              if (match$3[1]) {
                var l$1 = sort_uniq(funarg[/* compare */0], l);
                var sub = function (n, l) {
                  var exit = 0;
                  if (n > 3 || n < 0) {
                    exit = 1;
                  } else {
                    switch (n) {
                      case 0 : 
                          return /* tuple */[
                                  /* Empty */0,
                                  l
                                ];
                      case 1 : 
                          if (l) {
                            return /* tuple */[
                                    /* Node */[
                                      /* Empty */0,
                                      l[0],
                                      /* Empty */0,
                                      1
                                    ],
                                    l[1]
                                  ];
                          } else {
                            exit = 1;
                          }
                          break;
                      case 2 : 
                          if (l) {
                            var match = l[1];
                            if (match) {
                              return /* tuple */[
                                      /* Node */[
                                        /* Node */[
                                          /* Empty */0,
                                          l[0],
                                          /* Empty */0,
                                          1
                                        ],
                                        match[0],
                                        /* Empty */0,
                                        2
                                      ],
                                      match[1]
                                    ];
                            } else {
                              exit = 1;
                            }
                          } else {
                            exit = 1;
                          }
                          break;
                      case 3 : 
                          if (l) {
                            var match$1 = l[1];
                            if (match$1) {
                              var match$2 = match$1[1];
                              if (match$2) {
                                return /* tuple */[
                                        /* Node */[
                                          /* Node */[
                                            /* Empty */0,
                                            l[0],
                                            /* Empty */0,
                                            1
                                          ],
                                          match$1[0],
                                          /* Node */[
                                            /* Empty */0,
                                            match$2[0],
                                            /* Empty */0,
                                            1
                                          ],
                                          2
                                        ],
                                        match$2[1]
                                      ];
                              } else {
                                exit = 1;
                              }
                            } else {
                              exit = 1;
                            }
                          } else {
                            exit = 1;
                          }
                          break;
                      
                    }
                  }
                  if (exit === 1) {
                    var nl = n / 2 | 0;
                    var match$3 = sub(nl, l);
                    var l$1 = match$3[1];
                    if (l$1) {
                      var match$4 = sub((n - nl | 0) - 1 | 0, l$1[1]);
                      return /* tuple */[
                              create(match$3[0], l$1[0], match$4[0]),
                              match$4[1]
                            ];
                    } else {
                      throw [
                            assert_failure,
                            [
                              "set.ml",
                              372,
                              18
                            ]
                          ];
                    }
                  }
                  
                };
                return sub(length(l$1), l$1)[0];
              } else {
                return add(match$3[0], add(x3, add(x2, add(x1, singleton(x0)))));
              }
            } else {
              return add(x3, add(x2, add(x1, singleton(x0))));
            }
          } else {
            return add(x2, add(x1, singleton(x0)));
          }
        } else {
          return add(x1, singleton(x0));
        }
      } else {
        return singleton(x0);
      }
    } else {
      return /* Empty */0;
    }
  };
  return [
          /* Empty */0,
          is_empty,
          mem$$1,
          add,
          singleton,
          remove,
          union,
          inter,
          diff,
          compare,
          equal,
          subset,
          iter$$1,
          fold,
          for_all$$1,
          exists$$1,
          filter$$1,
          partition$$1,
          cardinal,
          elements,
          min_elt,
          max_elt,
          min_elt,
          split$$1,
          find$$1,
          of_list
        ];
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var compare$8 = caml_compare;

var KeySet = Make$1(/* module */[/* compare */compare$8]);

function peekch(param) {
  var i = param[1];
  var str = param[0];
  if (i < str.length) {
    return /* Some */[get(str, i)];
  } else {
    return /* None */0;
  }
}

function popch(param) {
  return /* tuple */[
          param[0],
          param[1] + 1 | 0
        ];
}

function peekn(param, len) {
  var i = param[1];
  var str = param[0];
  if ((i + len | 0) < str.length) {
    return /* Some */[sub$4(str, i, len)];
  } else {
    return /* None */0;
  }
}

function skipWhite(param) {
  var str = param[0];
  var len = str.length;
  var _n = param[1];
  while(true) {
    var n = _n;
    if (n >= len) {
      return /* tuple */[
              str,
              n
            ];
    } else if (get(str, n) === /* " " */32) {
      _n = n + 1 | 0;
      continue ;
      
    } else {
      return /* tuple */[
              str,
              n
            ];
    }
  }
}

function popn(param, len) {
  return /* tuple */[
          param[0],
          param[1] + len | 0
        ];
}

function match_(stream, matchstr) {
  var len = matchstr.length;
  var match = peekn(stream, len);
  if (match) {
    var peek = match[0];
    if (peek === matchstr) {
      return popn(stream, len);
    } else {
      return failwith("Could not match '" + (matchstr + ("', got '" + (peek + "' instead."))));
    }
  } else {
    return failwith("Could not match " + matchstr);
  }
}

function charsRemaining(param) {
  return param[0].length - param[1] | 0;
}

function create$11(str) {
  return /* tuple */[
          str,
          0
        ];
}

var Stream = /* module */[
  /* empty : [] */0,
  /* peekch */peekch,
  /* popch */popch,
  /* peekn */peekn,
  /* skipWhite */skipWhite,
  /* popn */popn,
  /* match_ */match_,
  /* charsRemaining */charsRemaining,
  /* create */create$11
];

function append_char(s, c) {
  return s + make$1(1, c);
}

function split$1(str, sep) {
  var _stream = /* tuple */[
    str,
    0
  ];
  var sep$1 = sep;
  var _accstr = "";
  var _acc = /* [] */0;
  while(true) {
    var acc = _acc;
    var accstr = _accstr;
    var stream = _stream;
    var match = peekch(stream);
    if (match) {
      var c = match[0];
      if (c === sep$1) {
        _acc = /* :: */[
          accstr,
          acc
        ];
        _accstr = "";
        _stream = popch(stream);
        continue ;
        
      } else {
        _accstr = append_char(accstr, c);
        _stream = popch(stream);
        continue ;
        
      }
    } else {
      return rev(/* :: */[
                  accstr,
                  acc
                ]);
    }
  }
}

var circularBufferSize = 60000;

var vertexSize = 8;


/* KeySet Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var identity$6 = /* float array */[
  1,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  1
];

function createIdentity() {
  return /* float array */[
          1,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          1
        ];
}

function createTranslation(dx, dy) {
  return /* float array */[
          1,
          0,
          dx,
          0,
          1,
          dy,
          0,
          0,
          1
        ];
}

function createRotation(theta) {
  return /* float array */[
          Math.cos(theta),
          -Math.sin(theta),
          0,
          Math.sin(theta),
          Math.cos(theta),
          0,
          0,
          0,
          1
        ];
}

function createScaling(sx, sy) {
  return /* float array */[
          sx,
          0,
          0,
          0,
          sy,
          0,
          0,
          0,
          1
        ];
}

function copyInto(src, dst) {
  caml_array_set(dst, 0, caml_array_get(src, 0));
  caml_array_set(dst, 1, caml_array_get(src, 1));
  caml_array_set(dst, 2, caml_array_get(src, 2));
  caml_array_set(dst, 3, caml_array_get(src, 3));
  caml_array_set(dst, 4, caml_array_get(src, 4));
  caml_array_set(dst, 5, caml_array_get(src, 5));
  caml_array_set(dst, 6, caml_array_get(src, 6));
  caml_array_set(dst, 7, caml_array_get(src, 7));
  return caml_array_set(dst, 8, caml_array_get(src, 8));
}

function matmatmul(mat1, mat2) {
  if (mat1.length !== 9) {
    throw [
          assert_failure,
          [
            "Reprocessing_Matrix.re",
            56,
            9
          ]
        ];
  } else {
    var m0 = mat1[0];
    var m1 = mat1[1];
    var m2 = mat1[2];
    var m3 = mat1[3];
    var m4 = mat1[4];
    var m5 = mat1[5];
    var m6 = mat1[6];
    var m7 = mat1[7];
    var m8 = mat1[8];
    if (mat2.length !== 9) {
      throw [
            assert_failure,
            [
              "Reprocessing_Matrix.re",
              56,
              9
            ]
          ];
    } else {
      var ma = mat2[0];
      var mb = mat2[1];
      var mc = mat2[2];
      var md = mat2[3];
      var me = mat2[4];
      var mf = mat2[5];
      var mg = mat2[6];
      var mh = mat2[7];
      var mi = mat2[8];
      caml_array_set(mat1, 0, ma * m0 + md * m1 + mg * m2);
      caml_array_set(mat1, 1, mb * m0 + me * m1 + mh * m2);
      caml_array_set(mat1, 2, mc * m0 + mf * m1 + mi * m2);
      caml_array_set(mat1, 3, ma * m3 + md * m4 + mg * m5);
      caml_array_set(mat1, 4, mb * m3 + me * m4 + mh * m5);
      caml_array_set(mat1, 5, mc * m3 + mf * m4 + mi * m5);
      caml_array_set(mat1, 6, ma * m6 + md * m7 + mg * m8);
      caml_array_set(mat1, 7, mb * m6 + me * m7 + mh * m8);
      return caml_array_set(mat1, 8, mc * m6 + mf * m7 + mi * m8);
    }
  }
}

function matptmul(m, param) {
  var y = param[1];
  var x = param[0];
  return /* tuple */[
          x * caml_array_get(m, 0) + y * caml_array_get(m, 1) + caml_array_get(m, 2),
          x * caml_array_get(m, 3) + y * caml_array_get(m, 4) + caml_array_get(m, 5)
        ];
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var vertexShaderSource = "\n  attribute vec2 aVertexPosition;\n  attribute vec4 aVertexColor;\n  attribute vec2 aTextureCoord;\n\n  uniform mat4 uPMatrix;\n\n  varying vec4 vColor;\n  varying vec2 vTextureCoord;\n\n  void main(void) {\n    gl_Position = uPMatrix * vec4(aVertexPosition, 0.0, 1.0);\n    vColor = aVertexColor;\n    vTextureCoord = aTextureCoord;\n  }\n";

var fragmentShaderSource = "\n  varying vec4 vColor;\n  varying vec2 vTextureCoord;\n\n  uniform sampler2D uSampler;\n\n  void main(void) {\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor;\n  }\n";


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var pi = 4.0 * Math.atan(1.0);

var two_pi = 2.0 * pi;

var white = /* float array */[
  1,
  1,
  1,
  1
];

var black = /* float array */[
  0,
  0,
  0,
  1
];

var red = /* float array */[
  1,
  0,
  0,
  1
];

var tau = two_pi;


/* pi Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
function getProgram(context, vertexShaderSource$$1, fragmentShaderSource$$1) {
  var vertexShader = _2(Gl[/* createShader */8], context, vertex_shader);
  Gl[/* shaderSource */11](context, vertexShader, vertexShaderSource$$1);
  _2(Gl[/* compileShader */12], context, vertexShader);
  var compiledCorrectly = +(Gl[/* getShaderParameter */48](context, vertexShader, /* Compile_status */1) === 1);
  if (compiledCorrectly) {
    var fragmentShader = _2(Gl[/* createShader */8], context, fragment_shader);
    Gl[/* shaderSource */11](context, fragmentShader, fragmentShaderSource$$1);
    _2(Gl[/* compileShader */12], context, fragmentShader);
    var compiledCorrectly$1 = +(Gl[/* getShaderParameter */48](context, fragmentShader, /* Compile_status */1) === 1);
    if (compiledCorrectly$1) {
      var program = _1(Gl[/* createProgram */7], context);
      _3(Gl[/* attachShader */9], context, program, vertexShader);
      _2(Gl[/* deleteShader */10], context, vertexShader);
      _3(Gl[/* attachShader */9], context, program, fragmentShader);
      _2(Gl[/* deleteShader */10], context, fragmentShader);
      _2(Gl[/* linkProgram */13], context, program);
      var linkedCorrectly = +(Gl[/* getProgramParameter */47](context, program, /* Link_status */1) === 1);
      if (linkedCorrectly) {
        return /* Some */[program];
      } else {
        console.log("Linking error: " + _2(Gl[/* getProgramInfoLog */50], context, program));
        return /* None */0;
      }
    } else {
      console.log("Fragment shader error: " + _2(Gl[/* getShaderInfoLog */49], context, fragmentShader));
      return /* None */0;
    }
  } else {
    console.log("Vertex shader error: " + _2(Gl[/* getShaderInfoLog */49], context, vertexShader));
    return /* None */0;
  }
}

function createCanvas$1($$window, height, width) {
  _3(Gl[/* Window */2][/* setWindowSize */6], $$window, width, height);
  var context = _1(Gl[/* Window */2][/* getContext */7], $$window);
  _5(Gl[/* viewport */38], context, -1, -1, width, height);
  _5(Gl[/* clearColor */6], context, 0, 0, 0, 1);
  _2(Gl[/* clear */39], context, color_buffer_bit | depth_buffer_bit);
  var camera = /* record */[/* projectionMatrix */_1(Gl[/* Mat4 */45][/* create */1], /* () */0)];
  var vertexBuffer = _1(Gl[/* createBuffer */15], context);
  var elementBuffer = _1(Gl[/* createBuffer */15], context);
  var match = getProgram(context, vertexShaderSource, fragmentShaderSource);
  var program = match ? match[0] : failwith("Could not create the program and/or the shaders. Aborting.");
  _2(Gl[/* useProgram */14], context, program);
  var aVertexPosition = _3(Gl[/* getAttribLocation */41], context, program, "aVertexPosition");
  _2(Gl[/* enableVertexAttribArray */42], context, aVertexPosition);
  var aVertexColor = _3(Gl[/* getAttribLocation */41], context, program, "aVertexColor");
  _2(Gl[/* enableVertexAttribArray */42], context, aVertexColor);
  var pMatrixUniform = _3(Gl[/* getUniformLocation */40], context, program, "uPMatrix");
  Gl[/* uniformMatrix4fv */46](context, pMatrixUniform, camera[/* projectionMatrix */0]);
  var aTextureCoord = _3(Gl[/* getAttribLocation */41], context, program, "aTextureCoord");
  _2(Gl[/* enableVertexAttribArray */42], context, aTextureCoord);
  var texture = _1(Gl[/* createTexture */17], context);
  _2(Gl[/* activeTexture */18], context, texture0);
  _3(Gl[/* bindTexture */19], context, texture_2d, texture);
  var uSampler = _3(Gl[/* getUniformLocation */40], context, program, "uSampler");
  Gl[/* texImage2D_RGBA */36](context, texture_2d, 0, 1, 1, 0, _2(Gl[/* Bigarray */24][/* of_array */1], /* Uint8 */5, /* int array */[
            255,
            255,
            255,
            255
          ]));
  _4(Gl[/* texParameteri */20], context, texture_2d, texture_mag_filter, linear);
  _4(Gl[/* texParameteri */20], context, texture_2d, texture_min_filter, linear_mipmap_nearest);
  _2(Gl[/* enable */21], context, blend);
  _3(Gl[/* blendFunc */23], context, src_alpha, one_minus_src_alpha);
  _7(Gl[/* Mat4 */45][/* ortho */6], camera[/* projectionMatrix */0], 0, width, height, 0, 0, 1);
  return /* record */[
          /* camera */camera,
          /* window */$$window,
          /* gl */context,
          /* vertexBuffer */vertexBuffer,
          /* elementBuffer */elementBuffer,
          /* aVertexColor */aVertexColor,
          /* aTextureCoord */aTextureCoord,
          /* aVertexPosition */aVertexPosition,
          /* pMatrixUniform */pMatrixUniform,
          /* uSampler */uSampler,
          /* batch : record */[
            /* vertexArray */_2(Gl[/* Bigarray */24][/* create */0], /* Float32 */1, imul(circularBufferSize, vertexSize)),
            /* elementArray */_2(Gl[/* Bigarray */24][/* create */0], /* Uint16 */3, circularBufferSize),
            /* vertexPtr */0,
            /* elementPtr */0,
            /* currTex : None */0,
            /* nullTex */texture
          ],
          /* keyboard : record */[
            /* keyCode : Nothing */65,
            /* pressed */KeySet[/* empty */0],
            /* released */KeySet[/* empty */0],
            /* down */KeySet[/* empty */0]
          ],
          /* mouse : record */[
            /* pos : tuple */[
              0,
              0
            ],
            /* prevPos : tuple */[
              0,
              0
            ],
            /* pressed : false */0
          ],
          /* style : record */[
            /* strokeColor : None */0,
            /* strokeWeight */3,
            /* strokeCap : Round */0,
            /* fillColor : Some */[/* float array */[
                0,
                0,
                0,
                1
              ]],
            /* tintColor : None */0,
            /* rectMode : Corner */0
          ],
          /* styleStack : [] */0,
          /* frame : record */[
            /* count */1,
            /* rate */10,
            /* deltaTime */0.001
          ],
          /* matrix */createIdentity(/* () */0),
          /* matrixStack : [] */0,
          /* size : record */[
            /* height */height,
            /* width */width,
            /* resizeable : true */1
          ]
        ];
}

function drawGeometry(vertexArray, elementArray, mode, count, textureBuffer, env) {
  _3(Gl[/* bindBuffer */16], env[/* gl */2], array_buffer, env[/* vertexBuffer */3]);
  _4(Gl[/* bufferData */37], env[/* gl */2], array_buffer, vertexArray, stream_draw);
  Gl[/* vertexAttribPointer */43](env[/* gl */2], env[/* aVertexPosition */7], 2, float_, /* false */0, (vertexSize << 2), 0);
  Gl[/* vertexAttribPointer */43](env[/* gl */2], env[/* aVertexColor */5], 4, float_, /* false */0, (vertexSize << 2), 8);
  Gl[/* vertexAttribPointer */43](env[/* gl */2], env[/* aTextureCoord */6], 2, float_, /* false */0, (vertexSize << 2), 24);
  _3(Gl[/* uniform1i */31], env[/* gl */2], env[/* uSampler */9], 0);
  _3(Gl[/* bindBuffer */16], env[/* gl */2], element_array_buffer, env[/* elementBuffer */4]);
  _4(Gl[/* bufferData */37], env[/* gl */2], element_array_buffer, elementArray, stream_draw);
  _3(Gl[/* bindTexture */19], env[/* gl */2], texture_2d, textureBuffer);
  return _5(Gl[/* drawElements */53], env[/* gl */2], mode, count, unsigned_short, 0);
}

function flushGlobalBatch(env) {
  if (env[/* batch */10][/* elementPtr */3] > 0) {
    var match = env[/* batch */10][/* currTex */4];
    var textureBuffer = match ? match[0] : env[/* batch */10][/* nullTex */5];
    drawGeometry(_3(Gl[/* Bigarray */24][/* sub */9], env[/* batch */10][/* vertexArray */0], 0, env[/* batch */10][/* vertexPtr */2]), _3(Gl[/* Bigarray */24][/* sub */9], env[/* batch */10][/* elementArray */1], 0, env[/* batch */10][/* elementPtr */3]), triangles, env[/* batch */10][/* elementPtr */3], textureBuffer, env);
    env[/* batch */10][/* currTex */4] = /* None */0;
    env[/* batch */10][/* vertexPtr */2] = 0;
    env[/* batch */10][/* elementPtr */3] = 0;
    return /* () */0;
  } else {
    return 0;
  }
}

function maybeFlushBatch(texture, el, vert, env) {
  if ((env[/* batch */10][/* elementPtr */3] + el | 0) >= circularBufferSize || (env[/* batch */10][/* vertexPtr */2] + vert | 0) >= circularBufferSize || env[/* batch */10][/* elementPtr */3] > 0 && env[/* batch */10][/* currTex */4] !== texture) {
    return flushGlobalBatch(env);
  } else {
    return 0;
  }
}

function addRectToGlobalBatch(env, param, param$1, param$2, param$3, param$4) {
  var a = param$4[/* a */3];
  var b = param$4[/* b */2];
  var g = param$4[/* g */1];
  var r = param$4[/* r */0];
  maybeFlushBatch(/* None */0, 6, 32, env);
  var set = Gl[/* Bigarray */24][/* set */7];
  var i = env[/* batch */10][/* vertexPtr */2];
  var vertexArrayToMutate = env[/* batch */10][/* vertexArray */0];
  _3(set, vertexArrayToMutate, i + 0 | 0, param[0]);
  _3(set, vertexArrayToMutate, i + 1 | 0, param[1]);
  _3(set, vertexArrayToMutate, i + 2 | 0, r);
  _3(set, vertexArrayToMutate, i + 3 | 0, g);
  _3(set, vertexArrayToMutate, i + 4 | 0, b);
  _3(set, vertexArrayToMutate, i + 5 | 0, a);
  _3(set, vertexArrayToMutate, i + 6 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 7 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 8 | 0, param$1[0]);
  _3(set, vertexArrayToMutate, i + 9 | 0, param$1[1]);
  _3(set, vertexArrayToMutate, i + 10 | 0, r);
  _3(set, vertexArrayToMutate, i + 11 | 0, g);
  _3(set, vertexArrayToMutate, i + 12 | 0, b);
  _3(set, vertexArrayToMutate, i + 13 | 0, a);
  _3(set, vertexArrayToMutate, i + 14 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 15 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 16 | 0, param$2[0]);
  _3(set, vertexArrayToMutate, i + 17 | 0, param$2[1]);
  _3(set, vertexArrayToMutate, i + 18 | 0, r);
  _3(set, vertexArrayToMutate, i + 19 | 0, g);
  _3(set, vertexArrayToMutate, i + 20 | 0, b);
  _3(set, vertexArrayToMutate, i + 21 | 0, a);
  _3(set, vertexArrayToMutate, i + 22 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 23 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 24 | 0, param$3[0]);
  _3(set, vertexArrayToMutate, i + 25 | 0, param$3[1]);
  _3(set, vertexArrayToMutate, i + 26 | 0, r);
  _3(set, vertexArrayToMutate, i + 27 | 0, g);
  _3(set, vertexArrayToMutate, i + 28 | 0, b);
  _3(set, vertexArrayToMutate, i + 29 | 0, a);
  _3(set, vertexArrayToMutate, i + 30 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 31 | 0, 0.0);
  var ii = div(i, vertexSize);
  var j = env[/* batch */10][/* elementPtr */3];
  var elementArrayToMutate = env[/* batch */10][/* elementArray */1];
  _3(set, elementArrayToMutate, j + 0 | 0, ii);
  _3(set, elementArrayToMutate, j + 1 | 0, ii + 1 | 0);
  _3(set, elementArrayToMutate, j + 2 | 0, ii + 2 | 0);
  _3(set, elementArrayToMutate, j + 3 | 0, ii + 1 | 0);
  _3(set, elementArrayToMutate, j + 4 | 0, ii + 2 | 0);
  _3(set, elementArrayToMutate, j + 5 | 0, ii + 3 | 0);
  env[/* batch */10][/* vertexPtr */2] = i + (vertexSize << 2) | 0;
  env[/* batch */10][/* elementPtr */3] = j + 6 | 0;
  return /* () */0;
}

function drawTriangle(env, param, param$1, param$2, param$3) {
  var a = param$3[/* a */3];
  var b = param$3[/* b */2];
  var g = param$3[/* g */1];
  var r = param$3[/* r */0];
  maybeFlushBatch(/* None */0, 24, 3, env);
  var set = Gl[/* Bigarray */24][/* set */7];
  var i = env[/* batch */10][/* vertexPtr */2];
  var vertexArrayToMutate = env[/* batch */10][/* vertexArray */0];
  _3(set, vertexArrayToMutate, i + 0 | 0, param[0]);
  _3(set, vertexArrayToMutate, i + 1 | 0, param[1]);
  _3(set, vertexArrayToMutate, i + 2 | 0, r);
  _3(set, vertexArrayToMutate, i + 3 | 0, g);
  _3(set, vertexArrayToMutate, i + 4 | 0, b);
  _3(set, vertexArrayToMutate, i + 5 | 0, a);
  _3(set, vertexArrayToMutate, i + 6 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 7 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 8 | 0, param$1[0]);
  _3(set, vertexArrayToMutate, i + 9 | 0, param$1[1]);
  _3(set, vertexArrayToMutate, i + 10 | 0, r);
  _3(set, vertexArrayToMutate, i + 11 | 0, g);
  _3(set, vertexArrayToMutate, i + 12 | 0, b);
  _3(set, vertexArrayToMutate, i + 13 | 0, a);
  _3(set, vertexArrayToMutate, i + 14 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 15 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 16 | 0, param$2[0]);
  _3(set, vertexArrayToMutate, i + 17 | 0, param$2[1]);
  _3(set, vertexArrayToMutate, i + 18 | 0, r);
  _3(set, vertexArrayToMutate, i + 19 | 0, g);
  _3(set, vertexArrayToMutate, i + 20 | 0, b);
  _3(set, vertexArrayToMutate, i + 21 | 0, a);
  _3(set, vertexArrayToMutate, i + 22 | 0, 0.0);
  _3(set, vertexArrayToMutate, i + 23 | 0, 0.0);
  var ii = div(i, vertexSize);
  var j = env[/* batch */10][/* elementPtr */3];
  var elementArrayToMutate = env[/* batch */10][/* elementArray */1];
  _3(set, elementArrayToMutate, j + 0 | 0, ii);
  _3(set, elementArrayToMutate, j + 1 | 0, ii + 1 | 0);
  _3(set, elementArrayToMutate, j + 2 | 0, ii + 2 | 0);
  env[/* batch */10][/* vertexPtr */2] = i + imul(3, vertexSize) | 0;
  env[/* batch */10][/* elementPtr */3] = j + 3 | 0;
  return /* () */0;
}

function drawLine(param, param$1, color, width, project, env) {
  var yy2 = param$1[1];
  var xx2 = param$1[0];
  var yy1 = param[1];
  var xx1 = param[0];
  var dx = xx2 - xx1;
  var dy = yy2 - yy1;
  var mag = Math.sqrt(dx * dx + dy * dy);
  var radius = width / 2;
  var xthing = dy / mag * radius;
  var ything = -dx / mag * radius;
  var match = project !== 0 ? /* tuple */[
      dx / mag * radius,
      xthing
    ] : /* tuple */[
      0,
      0
    ];
  var projecty = match[1];
  var projectx = match[0];
  var x1 = xx2 + xthing + projectx;
  var y1 = yy2 + ything + projecty;
  var x2 = xx1 + xthing - projectx;
  var y2 = yy1 + ything - projecty;
  var x3 = xx2 - xthing + projectx;
  var y3 = yy2 - ything + projecty;
  var x4 = xx1 - xthing - projectx;
  var y4 = yy1 - ything - projecty;
  return addRectToGlobalBatch(env, /* tuple */[
              x1,
              y1
            ], /* tuple */[
              x2,
              y2
            ], /* tuple */[
              x3,
              y3
            ], /* tuple */[
              x4,
              y4
            ], color);
}

function drawArc(env, param, radx, rady, start, stop, isPie, matrix, param$1) {
  var a = param$1[/* a */3];
  var b = param$1[/* b */2];
  var g = param$1[/* g */1];
  var r = param$1[/* r */0];
  var yCenterOfCircle = param[1];
  var xCenterOfCircle = param[0];
  var noOfFans = ((radx + rady | 0) / 4 | 0) + 10 | 0;
  maybeFlushBatch(/* None */0, imul(3, noOfFans), (noOfFans << 3), env);
  var pi$$1 = 4.0 * Math.atan(1.0);
  var anglePerFan = 2 * pi$$1 / noOfFans;
  var verticesData = env[/* batch */10][/* vertexArray */0];
  var elementData = env[/* batch */10][/* elementArray */1];
  var set = Gl[/* Bigarray */24][/* set */7];
  var get = Gl[/* Bigarray */24][/* get */5];
  var vertexArrayOffset = env[/* batch */10][/* vertexPtr */2];
  var elementArrayOffset = env[/* batch */10][/* elementPtr */3];
  var start_i = isPie ? (start / anglePerFan | 0) - 2 | 0 : (start / anglePerFan | 0) - 1 | 0;
  var stop_i = (stop / anglePerFan | 0) - 1 | 0;
  for(var i = start_i; i <= stop_i; ++i){
    var param$2;
    if (isPie && (i - start_i | 0) === 0) {
      param$2 = /* tuple */[
        xCenterOfCircle,
        yCenterOfCircle
      ];
    } else {
      var angle = anglePerFan * (i + 1 | 0);
      param$2 = /* tuple */[
        xCenterOfCircle + Math.cos(angle) * radx,
        yCenterOfCircle + Math.sin(angle) * rady
      ];
    }
    var match = matptmul(matrix, param$2);
    var ii = imul(i - start_i | 0, vertexSize) + vertexArrayOffset | 0;
    _3(set, verticesData, ii + 0 | 0, match[0]);
    _3(set, verticesData, ii + 1 | 0, match[1]);
    _3(set, verticesData, ii + 2 | 0, r);
    _3(set, verticesData, ii + 3 | 0, g);
    _3(set, verticesData, ii + 4 | 0, b);
    _3(set, verticesData, ii + 5 | 0, a);
    _3(set, verticesData, ii + 6 | 0, 0.0);
    _3(set, verticesData, ii + 7 | 0, 0.0);
    if ((i - start_i | 0) < 3) {
      _3(set, elementData, (i - start_i | 0) + elementArrayOffset | 0, div(ii, vertexSize));
    } else {
      var jj = (imul((i - start_i | 0) - 3 | 0, 3) + elementArrayOffset | 0) + 3 | 0;
      _3(set, elementData, jj, div(vertexArrayOffset, vertexSize));
      _3(set, elementData, jj + 1 | 0, _2(get, elementData, jj - 1 | 0));
      _3(set, elementData, jj + 2 | 0, div(ii, vertexSize));
    }
  }
  env[/* batch */10][/* vertexPtr */2] = env[/* batch */10][/* vertexPtr */2] + imul(noOfFans, vertexSize) | 0;
  env[/* batch */10][/* elementPtr */3] = (env[/* batch */10][/* elementPtr */3] + imul((stop_i - start_i | 0) - 3 | 0, 3) | 0) + 3 | 0;
  return /* () */0;
}

function drawEllipse(env, center, radx, rady, matrix, c) {
  return drawArc(env, center, radx, rady, 0, tau, /* false */0, matrix, c);
}

function loadImage$1(env, filename, isPixel) {
  var imageRef = [/* None */0];
  Gl[/* loadImage */29](filename, /* None */0, (function (imageData) {
          if (imageData) {
            var img = imageData[0];
            var textureBuffer = _1(Gl[/* createTexture */17], env[/* gl */2]);
            var height = _1(Gl[/* getImageHeight */28], img);
            var width = _1(Gl[/* getImageWidth */27], img);
            var filter = isPixel !== 0 ? nearest : linear;
            imageRef[0] = /* Some */[/* record */[
                /* textureBuffer */textureBuffer,
                /* img */img,
                /* height */height,
                /* width */width
              ]];
            _3(Gl[/* bindTexture */19], env[/* gl */2], texture_2d, textureBuffer);
            Gl[/* texImage2DWithImage */30](env[/* gl */2], texture_2d, 0, img);
            _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_mag_filter, filter);
            _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_min_filter, filter);
            _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_wrap_s, clamp_to_edge);
            return _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_wrap_t, clamp_to_edge);
          } else {
            return failwith("Could not load image '" + (filename + "'."));
          }
        }), /* () */0);
  return imageRef;
}

function drawImage(param, param$1, param$2, param$3, param$4, subx, suby, subw, subh, env) {
  var imgw = param[/* width */3];
  var imgh = param[/* height */2];
  var textureBuffer = param[/* textureBuffer */0];
  var match = env[/* style */13][/* tintColor */4];
  var match$1 = match ? match[0] : /* float array */[
      1,
      1,
      1,
      1
    ];
  var a = match$1[/* a */3];
  var b = match$1[/* b */2];
  var g = match$1[/* g */1];
  var r = match$1[/* r */0];
  maybeFlushBatch(/* Some */[textureBuffer], 6, 32, env);
  var match_000 = subx / imgw;
  var match_001 = suby / imgh;
  var match_002 = subw / imgw;
  var match_003 = subh / imgh;
  var fsubh = match_003;
  var fsubw = match_002;
  var fsuby = match_001;
  var fsubx = match_000;
  var set = Gl[/* Bigarray */24][/* set */7];
  var ii = env[/* batch */10][/* vertexPtr */2];
  var vertexArray = env[/* batch */10][/* vertexArray */0];
  _3(set, vertexArray, ii + 0 | 0, param$1[0]);
  _3(set, vertexArray, ii + 1 | 0, param$1[1]);
  _3(set, vertexArray, ii + 2 | 0, r);
  _3(set, vertexArray, ii + 3 | 0, g);
  _3(set, vertexArray, ii + 4 | 0, b);
  _3(set, vertexArray, ii + 5 | 0, a);
  _3(set, vertexArray, ii + 6 | 0, fsubx + fsubw);
  _3(set, vertexArray, ii + 7 | 0, fsuby + fsubh);
  _3(set, vertexArray, ii + 8 | 0, param$2[0]);
  _3(set, vertexArray, ii + 9 | 0, param$2[1]);
  _3(set, vertexArray, ii + 10 | 0, r);
  _3(set, vertexArray, ii + 11 | 0, g);
  _3(set, vertexArray, ii + 12 | 0, b);
  _3(set, vertexArray, ii + 13 | 0, a);
  _3(set, vertexArray, ii + 14 | 0, fsubx);
  _3(set, vertexArray, ii + 15 | 0, fsuby + fsubh);
  _3(set, vertexArray, ii + 16 | 0, param$3[0]);
  _3(set, vertexArray, ii + 17 | 0, param$3[1]);
  _3(set, vertexArray, ii + 18 | 0, r);
  _3(set, vertexArray, ii + 19 | 0, g);
  _3(set, vertexArray, ii + 20 | 0, b);
  _3(set, vertexArray, ii + 21 | 0, a);
  _3(set, vertexArray, ii + 22 | 0, fsubx + fsubw);
  _3(set, vertexArray, ii + 23 | 0, fsuby);
  _3(set, vertexArray, ii + 24 | 0, param$4[0]);
  _3(set, vertexArray, ii + 25 | 0, param$4[1]);
  _3(set, vertexArray, ii + 26 | 0, r);
  _3(set, vertexArray, ii + 27 | 0, g);
  _3(set, vertexArray, ii + 28 | 0, b);
  _3(set, vertexArray, ii + 29 | 0, a);
  _3(set, vertexArray, ii + 30 | 0, fsubx);
  _3(set, vertexArray, ii + 31 | 0, fsuby);
  var jj = env[/* batch */10][/* elementPtr */3];
  var elementArray = env[/* batch */10][/* elementArray */1];
  _3(set, elementArray, jj, div(ii, vertexSize));
  _3(set, elementArray, jj + 1 | 0, div(ii, vertexSize) + 1 | 0);
  _3(set, elementArray, jj + 2 | 0, div(ii, vertexSize) + 2 | 0);
  _3(set, elementArray, jj + 3 | 0, div(ii, vertexSize) + 1 | 0);
  _3(set, elementArray, jj + 4 | 0, div(ii, vertexSize) + 2 | 0);
  _3(set, elementArray, jj + 5 | 0, div(ii, vertexSize) + 3 | 0);
  env[/* batch */10][/* vertexPtr */2] = ii + (vertexSize << 2) | 0;
  env[/* batch */10][/* elementPtr */3] = jj + 6 | 0;
  env[/* batch */10][/* currTex */4] = /* Some */[textureBuffer];
  return /* () */0;
}

function drawImageWithMatrix(image, x, y, width, height, subx, suby, subw, subh, env) {
  var partial_arg = env[/* matrix */16];
  var transform = function (param) {
    return matptmul(partial_arg, param);
  };
  var p1 = _1(transform, /* tuple */[
        x + width | 0,
        y + height | 0
      ]);
  var p2 = _1(transform, /* tuple */[
        x,
        y + height | 0
      ]);
  var p3 = _1(transform, /* tuple */[
        x + width | 0,
        y
      ]);
  var p4 = _1(transform, /* tuple */[
        x,
        y
      ]);
  return drawImage(image, p1, p2, p3, p4, subx, suby, subw, subh, env);
}

function drawImageWithMatrixf(image, x, y, width, height, subx, suby, subw, subh, env) {
  var partial_arg = env[/* matrix */16];
  var transform = function (param) {
    return matptmul(partial_arg, param);
  };
  var p1 = _1(transform, /* tuple */[
        x + width,
        y + height
      ]);
  var p2 = _1(transform, /* tuple */[
        x,
        y + height
      ]);
  var p3 = _1(transform, /* tuple */[
        x + width,
        y
      ]);
  var p4 = _1(transform, /* tuple */[
        x,
        y
      ]);
  return drawImage(image, p1, p2, p3, p4, subx, suby, subw, subh, env);
}

function resetSize(env, width, height) {
  env[/* size */18][/* width */1] = width;
  env[/* size */18][/* height */0] = height;
  var match_000 = _1(Gl[/* Window */2][/* getPixelWidth */2], env[/* window */1]);
  var match_001 = _1(Gl[/* Window */2][/* getPixelHeight */3], env[/* window */1]);
  _5(Gl[/* viewport */38], env[/* gl */2], 0, 0, match_000, match_001);
  _5(Gl[/* clearColor */6], env[/* gl */2], 0, 0, 0, 1);
  _7(Gl[/* Mat4 */45][/* ortho */6], env[/* camera */0][/* projectionMatrix */0], 0, width, height, 0, 0, 1);
  return Gl[/* uniformMatrix4fv */46](env[/* gl */2], env[/* pMatrixUniform */8], env[/* camera */0][/* projectionMatrix */0]);
}


/* Reasongl Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
function width(env) {
  return env[/* size */18][/* width */1];
}

function height(env) {
  return env[/* size */18][/* height */0];
}

function mouse(env) {
  return env[/* mouse */12][/* pos */0];
}

function mousePressed(env) {
  return env[/* mouse */12][/* pressed */2];
}

function key(key$1, env) {
  return _2(KeySet[/* mem */2], key$1, env[/* keyboard */11][/* down */3]);
}

function keyPressed(key, env) {
  return _2(KeySet[/* mem */2], key, env[/* keyboard */11][/* pressed */1]);
}

function size$1(width, height, env) {
  _3(Gl[/* Window */2][/* setWindowSize */6], env[/* window */1], width, height);
  return resetSize(env, width, height);
}

function deltaTime(env) {
  return env[/* frame */15][/* deltaTime */2];
}

function loadSound$1(path, env) {
  var sound = [/* Loading */0];
  _3(Gl[/* Audio */3][/* loadSound */0], env[/* window */1], path, (function (v) {
          var match = sound[0];
          if (typeof match !== "number") {
            if (!match.tag) {
              _4(Gl[/* Audio */3][/* playSound */1], env[/* window */1], v, match[0], match[1]);
            }
            
          }
          sound[0] = /* Loaded */__(1, [v]);
          return /* () */0;
        }));
  return sound;
}

function playSound$2(sound, $staropt$star, $staropt$star$1, env) {
  var volume = $staropt$star ? $staropt$star[0] : 1.0;
  var loop = $staropt$star$1 ? $staropt$star$1[0] : /* false */0;
  var match = sound[0];
  if (typeof match === "number") {
    sound[0] = /* ShouldPlay */__(0, [
        volume,
        loop
      ]);
    return /* () */0;
  } else if (match.tag) {
    return _4(Gl[/* Audio */3][/* playSound */1], env[/* window */1], match[0], volume, loop);
  } else {
    sound[0] = /* ShouldPlay */__(0, [
        volume,
        loop
      ]);
    return /* () */0;
  }
}


/* Reasongl Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var compare$9 = caml_compare;

var IntMap = Make(/* module */[/* compare */compare$9]);

function compare$1$1(param, param$1) {
  var first = caml_compare(param[0], param$1[0]);
  if (first !== 0) {
    return first;
  } else {
    return caml_compare(param[1], param$1[1]);
  }
}

var IntPairMap = Make(/* module */[/* compare */compare$1$1]);

function parse_num(_stream, _acc) {
  while(true) {
    var acc = _acc;
    var stream = _stream;
    var match = Stream[/* peekch */1](stream);
    var exit$$1 = 0;
    var c;
    if (match) {
      var c$1 = match[0];
      if (c$1 >= 48) {
        if (c$1 >= 58) {
          exit$$1 = 1;
        } else {
          c = c$1;
          exit$$1 = 2;
        }
      } else if (c$1 !== 45) {
        exit$$1 = 1;
      } else {
        c = c$1;
        exit$$1 = 2;
      }
    } else {
      exit$$1 = 1;
    }
    switch (exit$$1) {
      case 1 : 
          try {
            return /* tuple */[
                    stream,
                    caml_int_of_string(acc)
                  ];
          }
          catch (exn){
            return failwith("Could not parse number [" + (acc + "]."));
          }
          break;
      case 2 : 
          _acc = append_char(acc, c);
          _stream = Stream[/* popch */2](stream);
          continue ;
          
    }
  }
}

function parse_num$1(stream) {
  return parse_num(stream, "");
}

function parse_string(_stream, _acc) {
  while(true) {
    var acc = _acc;
    var stream = _stream;
    var match = Stream[/* peekch */1](stream);
    if (match) {
      var c = match[0];
      if (c !== 34) {
        _acc = append_char(acc, c);
        _stream = Stream[/* popch */2](stream);
        continue ;
        
      } else {
        return /* tuple */[
                Stream[/* popch */2](stream),
                acc
              ];
      }
    } else {
      return failwith("Unterminated string.");
    }
  }
}

function parse_string$1(stream) {
  return parse_string(stream, "");
}

function pop_line(_stream) {
  while(true) {
    var stream = _stream;
    var match = Stream[/* peekch */1](stream);
    if (match) {
      if (match[0] !== 10) {
        _stream = Stream[/* popch */2](stream);
        continue ;
        
      } else {
        return Stream[/* popch */2](stream);
      }
    } else {
      return failwith("could not pop line");
    }
  }
}

function parse_char_fmt(_stream, _num, _map) {
  while(true) {
    var map$$1 = _map;
    var num = _num;
    var stream = _stream;
    if (num < 0) {
      return /* tuple */[
              stream,
              map$$1
            ];
    } else {
      var stream$1 = Stream[/* match_ */6](stream, "char id=");
      var match = parse_num(stream$1, "");
      var stream$2 = Stream[/* match_ */6](Stream[/* skipWhite */4](match[0]), "x=");
      var match$1 = parse_num(stream$2, "");
      var stream$3 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$1[0]), "y=");
      var match$2 = parse_num(stream$3, "");
      var stream$4 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$2[0]), "width=");
      var match$3 = parse_num(stream$4, "");
      var stream$5 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$3[0]), "height=");
      var match$4 = parse_num(stream$5, "");
      var stream$6 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$4[0]), "xoffset=");
      var match$5 = parse_num(stream$6, "");
      var stream$7 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$5[0]), "yoffset=");
      var match$6 = parse_num(stream$7, "");
      var stream$8 = Stream[/* match_ */6](Stream[/* skipWhite */4](match$6[0]), "xadvance=");
      var match$7 = parse_num(stream$8, "");
      var stream$9 = pop_line(match$7[0]);
      var new_map = _3(IntMap[/* add */3], match[1], /* record */[
            /* x */match$1[1],
            /* y */match$2[1],
            /* width */match$3[1],
            /* height */match$4[1],
            /* xoffset */match$5[1],
            /* yoffset */match$6[1],
            /* xadvance */match$7[1]
          ], map$$1);
      _map = new_map;
      _num = num - 1 | 0;
      _stream = stream$9;
      continue ;
      
    }
  }
}

function parse_kern_fmt(_stream, _num, _map) {
  while(true) {
    var map$$1 = _map;
    var num = _num;
    var stream = _stream;
    if (num) {
      var stream$1 = Stream[/* match_ */6](stream, "kerning first=");
      var match = parse_num(stream$1, "");
      var stream$2 = Stream[/* match_ */6](match[0], " second=");
      var match$1 = parse_num(stream$2, "");
      var stream$3 = Stream[/* match_ */6](match$1[0], " amount=");
      var match$2 = parse_num(stream$3, "");
      var stream$4 = pop_line(match$2[0]);
      var new_map = _3(IntPairMap[/* add */3], /* tuple */[
            match[1],
            match$1[1]
          ], match$2[1], map$$1);
      _map = new_map;
      _num = num - 1 | 0;
      _stream = stream$4;
      continue ;
      
    } else {
      return /* tuple */[
              stream,
              map$$1
            ];
    }
  }
}

function replaceFilename(path, filename) {
  var splitStr = split$1(path, /* "/" */47);
  var revLst = rev(splitStr);
  var newRevLst = revLst ? /* :: */[
      filename,
      revLst[1]
    ] : /* [] */0;
  var newLst = rev(newRevLst);
  return concat$3("/", newLst);
}

function parseFontFormat(env, path, isPixel) {
  var ret = [/* None */0];
  _2(Gl[/* File */1][/* readFile */0], path, (function (str) {
          var stream = Stream[/* create */8](str + "\n");
          var stream$1 = pop_line(pop_line(stream));
          var stream$2 = Stream[/* match_ */6](stream$1, "page id=0 file=\"");
          var match = parse_string(stream$2, "");
          var stream$3 = pop_line(match[0]);
          var stream$4 = Stream[/* match_ */6](stream$3, "chars count=");
          var match$1 = parse_num(stream$4, "");
          var stream$5 = pop_line(match$1[0]);
          var match$2 = parse_char_fmt(stream$5, match$1[1], IntMap[/* empty */0]);
          var stream$6 = Stream[/* match_ */6](match$2[0], "kernings count=");
          var match$3 = parse_num(stream$6, "");
          var stream$7 = pop_line(match$3[0]);
          var match$4 = parse_kern_fmt(stream$7, match$3[1], IntPairMap[/* empty */0]);
          var img_filename = replaceFilename(path, match[1]);
          ret[0] = /* Some */[/* record */[
              /* chars */match$2[1],
              /* kerning */match$4[1],
              /* image */loadImage$1(env, img_filename, isPixel)
            ]];
          return /* () */0;
        }));
  return ret;
}

function getChar(fnt, ch) {
  try {
    return _2(IntMap[/* find */21], ch, fnt[/* chars */0]);
  }
  catch (exn){
    return failwith("Could not find character " + (string_of_int(ch) + " in font."));
  }
}

function drawChar(env, fnt, image, ch, last, x, y) {
  var c = getChar(fnt, ch);
  var kernAmount;
  if (last) {
    try {
      kernAmount = _2(IntPairMap[/* find */21], /* tuple */[
            last[0],
            ch
          ], fnt[/* kerning */1]);
    }
    catch (exn){
      kernAmount = 0;
    }
  } else {
    kernAmount = 0;
  }
  if (image) {
    drawImageWithMatrix(image[0], (x + c[/* xoffset */4] | 0) + kernAmount | 0, y + c[/* yoffset */5] | 0, c[/* width */2], c[/* height */3], c[/* x */0], c[/* y */1], c[/* width */2], c[/* height */3], env);
    return c[/* xadvance */6] + kernAmount | 0;
  } else {
    return c[/* xadvance */6] + kernAmount | 0;
  }
}

function drawString(env, fnt, str, x, y) {
  var match = fnt[0];
  if (match) {
    var fnt$1 = match[0];
    var match$1 = fnt$1[/* image */2][0];
    if (match$1) {
      var img = match$1[0];
      var offset = [x];
      var lastChar = [/* None */0];
      return iter$3((function (c) {
                    var advance = drawChar(env, fnt$1, /* Some */[img], c, lastChar[0], offset[0], y);
                    offset[0] = offset[0] + advance | 0;
                    lastChar[0] = /* Some */[c];
                    return /* () */0;
                  }), str);
    } else {
      console.log("loading font.");
      return /* () */0;
    }
  } else {
    return /* () */0;
  }
}

function calcStringWidth(env, fnt, str) {
  var offset = [0];
  var lastChar = [/* None */0];
  iter$3((function (c) {
          offset[0] = offset[0] + drawChar(env, fnt, /* None */0, c, lastChar[0], offset[0], 0) | 0;
          lastChar[0] = /* Some */[c];
          return /* () */0;
        }), str);
  return offset[0];
}

var Font = /* module */[
  /* IntMap */IntMap,
  /* IntPairMap */IntPairMap,
  /* parse_num */parse_num$1,
  /* parse_string */parse_string$1,
  /* pop_line */pop_line,
  /* parse_char_fmt */parse_char_fmt,
  /* parse_kern_fmt */parse_kern_fmt,
  /* replaceFilename */replaceFilename,
  /* parseFontFormat */parseFontFormat,
  /* getChar */getChar,
  /* drawChar */drawChar,
  /* drawString */drawString,
  /* calcStringWidth */calcStringWidth
];


/* IntMap Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
function translate$3(x, y, env) {
  return matmatmul(env[/* matrix */16], createTranslation(x, y));
}

function rotate$4(theta, env) {
  return matmatmul(env[/* matrix */16], createRotation(theta));
}

function scale$9(x, y, env) {
  return matmatmul(env[/* matrix */16], createScaling(x, y));
}

function fill$4(color, env) {
  var newrecord = env[/* style */13].slice();
  newrecord[/* fillColor */3] = /* Some */[color];
  env[/* style */13] = newrecord;
  return /* () */0;
}

function tint(color, env) {
  var newrecord = env[/* style */13].slice();
  newrecord[/* tintColor */4] = /* Some */[color];
  env[/* style */13] = newrecord;
  return /* () */0;
}

function noTint(env) {
  var newrecord = env[/* style */13].slice();
  newrecord[/* tintColor */4] = /* None */0;
  env[/* style */13] = newrecord;
  return /* () */0;
}

function stroke(color, env) {
  var newrecord = env[/* style */13].slice();
  newrecord[/* strokeColor */0] = /* Some */[color];
  env[/* style */13] = newrecord;
  return /* () */0;
}

function noStroke(env) {
  var newrecord = env[/* style */13].slice();
  newrecord[/* strokeColor */0] = /* None */0;
  env[/* style */13] = newrecord;
  return /* () */0;
}

function rectMode(rm, env) {
  var newrecord = env[/* style */13].slice();
  newrecord[/* rectMode */5] = rm;
  env[/* style */13] = newrecord;
  return /* () */0;
}

function pushMatrix(env) {
  var copy = createIdentity(/* () */0);
  copyInto(env[/* matrix */16], copy);
  env[/* matrixStack */17] = /* :: */[
    copy,
    env[/* matrixStack */17]
  ];
  return /* () */0;
}

function popMatrix(env) {
  var match = env[/* matrixStack */17];
  if (match) {
    env[/* matrix */16] = match[0];
    env[/* matrixStack */17] = match[1];
    return /* () */0;
  } else {
    return failwith("Too many `popMatrix` without enough `pushMatrix`.");
  }
}

function loadImage$2(filename, $staropt$star, env) {
  var isPixel = $staropt$star ? $staropt$star[0] : /* false */0;
  return loadImage$1(env, filename, isPixel);
}

function subImage(img, param, width$$1, height$$1, param$1, subw, subh, env) {
  var match = img[0];
  if (match) {
    return drawImageWithMatrix(match[0], param[0], param[1], width$$1, height$$1, param$1[0], param$1[1], subw, subh, env);
  } else {
    console.log("image not ready yet, just doing nothing :D");
    return /* () */0;
  }
}

function subImagef(img, param, width$$1, height$$1, param$1, subw, subh, env) {
  var match = img[0];
  if (match) {
    return drawImageWithMatrixf(match[0], param[0], param[1], width$$1, height$$1, param$1[0], param$1[1], subw, subh, env);
  } else {
    console.log("image not ready yet, just doing nothing :D");
    return /* () */0;
  }
}

function quadf(p1, p2, p3, p4, env) {
  var partial_arg = env[/* matrix */16];
  var transform = function (param) {
    return matptmul(partial_arg, param);
  };
  var match_000 = _1(transform, p1);
  var match_001 = _1(transform, p2);
  var match_002 = _1(transform, p3);
  var match_003 = _1(transform, p4);
  var p4$1 = match_003;
  var p3$1 = match_002;
  var p2$1 = match_001;
  var p1$1 = match_000;
  var match = env[/* style */13][/* fillColor */3];
  if (match) {
    addRectToGlobalBatch(env, p3$1, p4$1, p2$1, p1$1, match[0]);
  }
  var match$1 = env[/* style */13][/* strokeColor */0];
  if (match$1) {
    var color = match$1[0];
    var width$$1 = env[/* style */13][/* strokeWeight */1];
    drawLine(p1$1, p2$1, color, width$$1, /* false */0, env);
    drawLine(p2$1, p3$1, color, width$$1, /* false */0, env);
    drawLine(p3$1, p4$1, color, width$$1, /* false */0, env);
    drawLine(p1$1, p4$1, color, width$$1, /* false */0, env);
    var r = width$$1 / 2;
    drawEllipse(env, p1$1, r, r, identity$6, color);
    drawEllipse(env, p2$1, r, r, identity$6, color);
    drawEllipse(env, p3$1, r, r, identity$6, color);
    return drawEllipse(env, p4$1, r, r, identity$6, color);
  } else {
    return /* () */0;
  }
}

function rectf(param, width$$1, height$$1, env) {
  var y = param[1];
  var x = param[0];
  var match = env[/* style */13][/* rectMode */5];
  switch (match) {
    case 0 : 
        return quadf(/* tuple */[
                    x,
                    y
                  ], /* tuple */[
                    x + width$$1,
                    y
                  ], /* tuple */[
                    x + width$$1,
                    y + height$$1
                  ], /* tuple */[
                    x,
                    y + height$$1
                  ], env);
    case 1 : 
        var x$1 = x - width$$1 / 2;
        var y$1 = y - height$$1 / 2;
        return quadf(/* tuple */[
                    x$1,
                    y$1
                  ], /* tuple */[
                    x$1 + width$$1,
                    y$1
                  ], /* tuple */[
                    x$1 + width$$1,
                    y$1 + height$$1
                  ], /* tuple */[
                    x$1,
                    y$1 + height$$1
                  ], env);
    case 2 : 
        var x$2 = x - width$$1;
        var y$2 = y - height$$1;
        var width$1 = width$$1 * 2;
        var height$1 = height$$1 * 2;
        return quadf(/* tuple */[
                    x$2,
                    y$2
                  ], /* tuple */[
                    x$2 + width$1,
                    y$2
                  ], /* tuple */[
                    x$2 + width$1,
                    y$2 + height$1
                  ], /* tuple */[
                    x$2,
                    y$2 + height$1
                  ], env);
    
  }
}

function rect(param, width$$1, height$$1, env) {
  return rectf(/* tuple */[
              param[0],
              param[1]
            ], width$$1, height$$1, env);
}

function trianglef(p1, p2, p3, env) {
  var partial_arg = env[/* matrix */16];
  var transform = function (param) {
    return matptmul(partial_arg, param);
  };
  var match_000 = _1(transform, p1);
  var match_001 = _1(transform, p2);
  var match_002 = _1(transform, p3);
  var p3$1 = match_002;
  var p2$1 = match_001;
  var p1$1 = match_000;
  var match = env[/* style */13][/* fillColor */3];
  if (match) {
    drawTriangle(env, p1$1, p2$1, p3$1, match[0]);
  }
  var match$1 = env[/* style */13][/* strokeColor */0];
  if (match$1) {
    var color = match$1[0];
    var width$$1 = env[/* style */13][/* strokeWeight */1];
    drawLine(p1$1, p2$1, color, width$$1, /* false */0, env);
    drawLine(p2$1, p3$1, color, width$$1, /* false */0, env);
    drawLine(p1$1, p3$1, color, width$$1, /* false */0, env);
    var r = width$$1 / 2;
    drawEllipse(env, p1$1, r, r, identity$6, color);
    drawEllipse(env, p2$1, r, r, identity$6, color);
    return drawEllipse(env, p3$1, r, r, identity$6, color);
  } else {
    return /* () */0;
  }
}

function loadFont(filename, $staropt$star, env) {
  var isPixel = $staropt$star ? $staropt$star[0] : /* false */0;
  return Font[/* parseFontFormat */8](env, filename, isPixel);
}

function text(font, body, param, env) {
  return Font[/* drawString */11](env, font, body, param[0], param[1]);
}

function clear$1(env) {
  return _2(Gl[/* clear */39], env[/* gl */2], color_buffer_bit | depth_buffer_bit);
}

function background(color, env) {
  clear$1(env);
  var w = width(env);
  var h = height(env);
  return addRectToGlobalBatch(env, /* tuple */[
              w,
              h
            ], /* tuple */[
              0,
              h
            ], /* tuple */[
              w,
              0
            ], /* tuple */[
              0,
              0
            ], color);
}


/* Reasongl Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var lookup_table = [/* int array */[]];

function pow(base, exp) {
  if (exp !== 0) {
    if (exp !== 1) {
      var b = pow(base, exp / 2 | 0);
      return imul(imul(b, b), exp % 2 ? base : 1);
    } else {
      return base;
    }
  } else {
    return 1;
  }
}

function constrain(amt, low, high) {
  return max(min(amt, high), low);
}

function remapf(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
}

function randomf(min$$1, max$$1) {
  return $$float$1(max$$1 - min$$1) + min$$1;
}

function random$3(min$$1, max$$1) {
  return $$int$1(max$$1 - min$$1 | 0) + min$$1 | 0;
}

function lerpf(low, high) {
  return (function (param) {
      return remapf(param, 0, 1, low, high);
    });
}

function lerp$4(low, high, value) {
  return lerpf(low, high)(value) | 0;
}

function distf(param, param$1) {
  var dx = param$1[0] - param[0];
  var dy = param$1[1] - param[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function magf(vec) {
  return distf(/* tuple */[
              0,
              0
            ], vec);
}

function shuffle(array) {
  var array$1 = copy(array);
  var length = array$1.length;
  for(var i = 0; i <= 255; ++i){
    var j = $$int$1(length - i | 0);
    var tmp = caml_array_get(array$1, i);
    caml_array_set(array$1, i, caml_array_get(array$1, i + j | 0));
    caml_array_set(array$1, i + j | 0, tmp);
  }
  return array$1;
}

function noiseSeed(seed) {
  var state = get_state(/* () */0);
  init$3(seed);
  var array = caml_make_vect(256, 0);
  var array$1 = mapi$1$1((function (i, _) {
          return i;
        }), array);
  var array$2 = shuffle(array$1);
  var double_array = append$1(array$2, array$2);
  lookup_table[0] = double_array;
  return set_state(state);
}

function color(r, g, b, a) {
  return /* float array */[
          r / 255,
          g / 255,
          b / 255,
          a / 255
        ];
}

function intersectRectRect(param, rect1W, rect1H, param$1, rect2W, rect2H) {
  var ry2 = param$1[1];
  var rx2 = param$1[0];
  var ry1 = param[1];
  var rx1 = param[0];
  return 1 - +(rx2 > rx1 + rect1W || rx2 + rect2W < rx1 || ry2 > ry1 + rect1H || ry2 + rect2H < ry1);
}


/* Reprocessing_Common Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
function checkRebuild$1() {
  return failwith("Hotreload not supported for native and web, compile to bytecode.");
}


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var checkRebuild = checkRebuild$1;


/* No side effect */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var init$5 = Gl[/* Window */2][/* init */5];


/* Reasongl Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var hotreloadData = [/* None */0];

function unwrapOrDefault($$default, opt) {
  if (opt) {
    return opt[0];
  } else {
    return $$default;
  }
}

function identity(a, _) {
  return a;
}

function run(setup, draw, mouseMove, mouseDragged, mouseDown, mouseUp, keyPressed$$1, keyReleased$$1, keyTyped, _) {
  var match = hotreloadData[0];
  var fns;
  if (match) {
    var hr = match[0];
    hr[/* draw */2] = unwrapOrDefault(identity, draw);
    hr[/* keyPressed */7] = unwrapOrDefault(identity, keyPressed$$1);
    hr[/* keyReleased */8] = unwrapOrDefault(identity, keyReleased$$1);
    hr[/* keyTyped */9] = unwrapOrDefault(identity, keyTyped);
    hr[/* mouseMove */3] = unwrapOrDefault(identity, mouseMove);
    hr[/* mouseDragged */4] = unwrapOrDefault(identity, mouseDragged);
    hr[/* mouseDown */5] = unwrapOrDefault(identity, mouseDown);
    hr[/* mouseUp */6] = unwrapOrDefault(identity, mouseUp);
    console.log("Succesfully changed functions");
    fns = hr;
  } else {
    fns = /* record */[
      /* started : false */0,
      /* filename */"",
      /* draw */unwrapOrDefault(identity, draw),
      /* mouseMove */unwrapOrDefault(identity, mouseMove),
      /* mouseDragged */unwrapOrDefault(identity, mouseDragged),
      /* mouseDown */unwrapOrDefault(identity, mouseDown),
      /* mouseUp */unwrapOrDefault(identity, mouseUp),
      /* keyPressed */unwrapOrDefault(identity, keyPressed$$1),
      /* keyReleased */unwrapOrDefault(identity, keyReleased$$1),
      /* keyTyped */unwrapOrDefault(identity, keyTyped)
    ];
  }
  if (fns[/* started */0]) {
    return 0;
  } else {
    fns[/* started */0] = /* true */1;
    self_init(/* () */0);
    noiseSeed($$int$1(pow(2, 29)));
    var env = createCanvas$1(_1(init$5, argv), 200, 200);
    var userState = [_1(setup, env)];
    var width$$1 = _1(Gl[/* Window */2][/* getWidth */0], env[/* window */1]);
    var height$$1 = _1(Gl[/* Window */2][/* getHeight */1], env[/* window */1]);
    var data = Gl[/* readPixels_RGBA */26](env[/* gl */2], 0, 0, width$$1, height$$1);
    var textureBuffer = _1(Gl[/* createTexture */17], env[/* gl */2]);
    _3(Gl[/* bindTexture */19], env[/* gl */2], texture_2d, textureBuffer);
    Gl[/* texImage2D_RGBA */36](env[/* gl */2], texture_2d, 0, width$$1, height$$1, 0, data);
    _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_mag_filter, linear);
    _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_min_filter, linear);
    _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_wrap_s, clamp_to_edge);
    _4(Gl[/* texParameteri */20], env[/* gl */2], texture_2d, texture_wrap_t, clamp_to_edge);
    var reDrawPreviousBufferOnSecondFrame = function () {
      var match_000 = 0 + width$$1 | 0;
      var match_000$1 = 0 + width$$1 | 0;
      var match_001 = 0 + height$$1 | 0;
      var match_001$1 = 0 + height$$1 | 0;
      var verticesColorAndTexture = /* float array */[
        match_000,
        0,
        0.0,
        0.0,
        0.0,
        0.0,
        1,
        1.0,
        1.0,
        0,
        0,
        0.0,
        0.0,
        0.0,
        0.0,
        1,
        0.0,
        1.0,
        match_000$1,
        match_001,
        0.0,
        0.0,
        0.0,
        0.0,
        1,
        1.0,
        0.0,
        0,
        match_001$1,
        0.0,
        0.0,
        0.0,
        0.0,
        1,
        0.0,
        0.0
      ];
      return drawGeometry(_2(Gl[/* Bigarray */24][/* of_array */1], /* Float32 */1, verticesColorAndTexture), _2(Gl[/* Bigarray */24][/* of_array */1], /* Uint16 */3, /* array */[
                      0,
                      1,
                      2,
                      1,
                      2,
                      3
                    ]), triangles, 6, textureBuffer, env);
    };
    return Gl[/* render */5](env[/* window */1], /* Some */[(function (_, _$1, x, y) {
                    env[/* mouse */12][/* pos */0] = /* tuple */[
                      x,
                      y
                    ];
                    env[/* mouse */12][/* pressed */2] = /* true */1;
                    userState[0] = _2(fns[/* mouseDown */5], userState[0], env);
                    return /* () */0;
                  })], /* Some */[(function (_, _$1, x, y) {
                    env[/* mouse */12][/* pos */0] = /* tuple */[
                      x,
                      y
                    ];
                    env[/* mouse */12][/* pressed */2] = /* false */0;
                    userState[0] = _2(fns[/* mouseUp */6], userState[0], env);
                    return /* () */0;
                  })], /* Some */[(function (x, y) {
                    env[/* mouse */12][/* pos */0] = /* tuple */[
                      x,
                      y
                    ];
                    if (env[/* mouse */12][/* pressed */2]) {
                      userState[0] = _2(fns[/* mouseDragged */4], userState[0], env);
                      return /* () */0;
                    } else {
                      userState[0] = _2(fns[/* mouseMove */3], userState[0], env);
                      return /* () */0;
                    }
                  })], /* Some */[(function (keycode, repeat) {
                    env[/* keyboard */11][/* keyCode */0] = keycode;
                    if (!repeat) {
                      userState[0] = _2(fns[/* keyPressed */7], userState[0], env);
                      env[/* keyboard */11][/* pressed */1] = _2(KeySet[/* add */3], keycode, env[/* keyboard */11][/* pressed */1]);
                      env[/* keyboard */11][/* down */3] = _2(KeySet[/* add */3], keycode, env[/* keyboard */11][/* down */3]);
                    }
                    userState[0] = _2(fns[/* keyTyped */9], userState[0], env);
                    return /* () */0;
                  })], /* Some */[(function (keycode) {
                    env[/* keyboard */11][/* keyCode */0] = keycode;
                    env[/* keyboard */11][/* released */2] = _2(KeySet[/* add */3], keycode, env[/* keyboard */11][/* released */2]);
                    env[/* keyboard */11][/* down */3] = _2(KeySet[/* remove */5], keycode, env[/* keyboard */11][/* down */3]);
                    userState[0] = _2(fns[/* keyReleased */8], userState[0], env);
                    return /* () */0;
                  })], /* Some */[(function () {
                    if (env[/* size */18][/* resizeable */2]) {
                      var height$$1 = _1(Gl[/* Window */2][/* getHeight */1], env[/* window */1]);
                      var width$$1 = _1(Gl[/* Window */2][/* getWidth */0], env[/* window */1]);
                      return resetSize(env, width$$1, height$$1);
                    } else {
                      return size$1(width(env), height(env), env);
                    }
                  })], (function (f) {
                  if (env[/* frame */15][/* count */0] === 2) {
                    reDrawPreviousBufferOnSecondFrame(/* () */0);
                  }
                  var match = hotreloadData[0];
                  if (match) {
                    checkRebuild(fns[/* filename */1]);
                  }
                  userState[0] = _2(fns[/* draw */2], userState[0], env);
                  var f$1 = f;
                  var env$1 = env;
                  var rate = 1000 / f$1 | 0;
                  env$1[/* mouse */12][/* prevPos */1] = env$1[/* mouse */12][/* pos */0];
                  env$1[/* frame */15] = /* record */[
                    /* count */env$1[/* frame */15][/* count */0] + 1 | 0,
                    /* rate */rate,
                    /* deltaTime */f$1 / 1000
                  ];
                  env$1[/* keyboard */11][/* released */2] = KeySet[/* empty */0];
                  env$1[/* keyboard */11][/* pressed */1] = KeySet[/* empty */0];
                  copyInto(identity$6, env$1[/* matrix */16]);
                  if (env$1[/* batch */10][/* elementPtr */3] > 0) {
                    return flushGlobalBatch(env$1);
                  } else {
                    return 0;
                  }
                }), /* () */0);
  }
}


/* Reasongl Not a pure module */

// Generated by BUCKLESCRIPT VERSION 2.0.1, PLEASE EDIT WITH CARE
var mapSizePx = 640;

var directions = /* :: */[
  /* Up */54,
  /* :: */[
    /* Down */53,
    /* :: */[
      /* Left */52,
      /* :: */[
        /* Right */51,
        /* [] */0
      ]
    ]
  ]
];

var StringMap = Make([compare$3]);

function enemyTexPos(kind, isDead) {
  switch (kind) {
    case 0 : 
        if (isDead !== 0) {
          return /* :: */[
                  /* tuple */[
                    1904,
                    0
                  ],
                  /* [] */0
                ];
        } else {
          return /* :: */[
                  /* tuple */[
                    917,
                    0
                  ],
                  /* :: */[
                    /* tuple */[
                      965,
                      0
                    ],
                    /* [] */0
                  ]
                ];
        }
    case 1 : 
        if (isDead !== 0) {
          return /* :: */[
                  /* tuple */[
                    2094,
                    0
                  ],
                  /* [] */0
                ];
        } else {
          return /* :: */[
                  /* tuple */[
                    1206,
                    0
                  ],
                  /* :: */[
                    /* tuple */[
                      1254,
                      0
                    ],
                    /* [] */0
                  ]
                ];
        }
    case 2 : 
        if (isDead !== 0) {
          return /* :: */[
                  /* tuple */[
                    2189,
                    0
                  ],
                  /* [] */0
                ];
        } else {
          return /* :: */[
                  /* tuple */[
                    1348,
                    0
                  ],
                  /* :: */[
                    /* tuple */[
                      1396,
                      0
                    ],
                    /* [] */0
                  ]
                ];
        }
    case 3 : 
        if (isDead !== 0) {
          return /* :: */[
                  /* tuple */[
                    2000,
                    0
                  ],
                  /* [] */0
                ];
        } else {
          return /* :: */[
                  /* tuple */[
                    1062,
                    0
                  ],
                  /* :: */[
                    /* tuple */[
                      1110,
                      0
                    ],
                    /* [] */0
                  ]
                ];
        }
    case 4 : 
        if (isDead !== 0) {
          return /* :: */[
                  /* tuple */[
                    2288,
                    0
                  ],
                  /* [] */0
                ];
        } else {
          return /* :: */[
                  /* tuple */[
                    1493,
                    0
                  ],
                  /* :: */[
                    /* tuple */[
                      1541,
                      0
                    ],
                    /* [] */0
                  ]
                ];
        }
    
  }
}

function gunTexPos(kind) {
  switch (kind) {
    case 0 : 
        return /* tuple */[
                606,
                0
              ];
    case 1 : 
        return /* tuple */[
                0,
                0
              ];
    case 2 : 
        return /* tuple */[
                67,
                0
              ];
    case 3 : 
        return /* tuple */[
                802,
                0
              ];
    case 4 : 
        return /* tuple */[
                672,
                0
              ];
    case 5 : 
        return /* tuple */[
                342,
                0
              ];
    case 6 : 
        return /* tuple */[
                738,
                0
              ];
    case 7 : 
        return /* tuple */[
                1655,
                -3
              ];
    
  }
}

function add(v1, v2) {
  return /* float array */[
          v1[/* x */0] + v2[/* x */0],
          v1[/* y */1] + v2[/* y */1]
        ];
}

function mul(v1, v2) {
  return /* float array */[
          v1[/* x */0] * v2[/* x */0],
          v1[/* y */1] * v2[/* y */1]
        ];
}

function mulConst(v1, c) {
  return /* float array */[
          v1[/* x */0] * c,
          v1[/* y */1] * c
        ];
}

function moveBullet(bullet) {
  return /* record */[
          /* pos */add(bullet[/* pos */0], bullet[/* direction */1]),
          /* direction */bullet[/* direction */1],
          /* moveBullet */bullet[/* moveBullet */2],
          /* damage */bullet[/* damage */3],
          /* remainingRange */bullet[/* remainingRange */4] - magf(/* tuple */[
                bullet[/* direction */1][/* x */0],
                bullet[/* direction */1][/* y */1]
              ])
        ];
}

function makeDefaultFire(bulletSpeed, damage, state, deltaTime$$1, direction) {
  var bulletSpeed$1 = bulletSpeed * deltaTime$$1;
  var dir;
  var exit$$1 = 0;
  if (direction >= 51) {
    switch (direction - 51 | 0) {
      case 0 : 
          dir = /* float array */[
            bulletSpeed$1,
            0
          ];
          break;
      case 1 : 
          dir = /* float array */[
            -bulletSpeed$1,
            0
          ];
          break;
      case 2 : 
          dir = /* float array */[
            0,
            bulletSpeed$1
          ];
          break;
      case 3 : 
          dir = /* float array */[
            0,
            -bulletSpeed$1
          ];
          break;
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
          exit$$1 = 1;
          break;
      
    }
  } else {
    exit$$1 = 1;
  }
  if (exit$$1 === 1) {
    throw [
          assert_failure,
          [
            "index.re",
            204,
            11
          ]
        ];
  }
  var newrecord = state.slice();
  newrecord[/* playerBullets */7] = /* :: */[
    /* record */[
      /* pos : float array */[
        state[/* pos */0][/* x */0],
        state[/* pos */0][/* y */1]
      ],
      /* direction */dir,
      /* moveBullet */moveBullet,
      /* damage */damage,
      /* remainingRange */400
    ],
    state[/* playerBullets */7]
  ];
  var newrecord$1 = state[/* stats */22].slice();
  newrecord$1[/* numberOfBulletsFired */3] = state[/* stats */22][/* numberOfBulletsFired */3] + 1 | 0;
  newrecord[/* stats */22] = newrecord$1;
  return newrecord;
}

function makeTripleShotGunFire(bulletSpeed, otherSpeed, damage, state, deltaTime$$1, direction) {
  var otherSpeed$1 = otherSpeed * deltaTime$$1;
  var bulletSpeed$1 = bulletSpeed * deltaTime$$1;
  var dir1;
  var exit$$1 = 0;
  if (direction >= 51) {
    switch (direction - 51 | 0) {
      case 0 : 
          dir1 = /* float array */[
            bulletSpeed$1,
            -otherSpeed$1
          ];
          break;
      case 1 : 
          dir1 = /* float array */[
            -bulletSpeed$1,
            otherSpeed$1
          ];
          break;
      case 2 : 
          dir1 = /* float array */[
            otherSpeed$1,
            bulletSpeed$1
          ];
          break;
      case 3 : 
          dir1 = /* float array */[
            -otherSpeed$1,
            -bulletSpeed$1
          ];
          break;
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
          exit$$1 = 1;
          break;
      
    }
  } else {
    exit$$1 = 1;
  }
  if (exit$$1 === 1) {
    throw [
          assert_failure,
          [
            "index.re",
            232,
            11
          ]
        ];
  }
  var dir2;
  var exit$1 = 0;
  if (direction >= 51) {
    switch (direction - 51 | 0) {
      case 0 : 
          dir2 = /* float array */[
            bulletSpeed$1,
            0
          ];
          break;
      case 1 : 
          dir2 = /* float array */[
            -bulletSpeed$1,
            0
          ];
          break;
      case 2 : 
          dir2 = /* float array */[
            0,
            bulletSpeed$1
          ];
          break;
      case 3 : 
          dir2 = /* float array */[
            0,
            -bulletSpeed$1
          ];
          break;
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
          exit$1 = 1;
          break;
      
    }
  } else {
    exit$1 = 1;
  }
  if (exit$1 === 1) {
    throw [
          assert_failure,
          [
            "index.re",
            240,
            11
          ]
        ];
  }
  var dir3;
  var exit$2 = 0;
  if (direction >= 51) {
    switch (direction - 51 | 0) {
      case 0 : 
          dir3 = /* float array */[
            bulletSpeed$1,
            otherSpeed$1
          ];
          break;
      case 1 : 
          dir3 = /* float array */[
            -bulletSpeed$1,
            -otherSpeed$1
          ];
          break;
      case 2 : 
          dir3 = /* float array */[
            -otherSpeed$1,
            bulletSpeed$1
          ];
          break;
      case 3 : 
          dir3 = /* float array */[
            otherSpeed$1,
            -bulletSpeed$1
          ];
          break;
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
          exit$2 = 1;
          break;
      
    }
  } else {
    exit$2 = 1;
  }
  if (exit$2 === 1) {
    throw [
          assert_failure,
          [
            "index.re",
            248,
            11
          ]
        ];
  }
  var newrecord = state.slice();
  newrecord[/* playerBullets */7] = /* :: */[
    /* record */[
      /* pos : float array */[
        state[/* pos */0][/* x */0],
        state[/* pos */0][/* y */1]
      ],
      /* direction */dir1,
      /* moveBullet */moveBullet,
      /* damage */damage,
      /* remainingRange */400
    ],
    /* :: */[
      /* record */[
        /* pos : float array */[
          state[/* pos */0][/* x */0],
          state[/* pos */0][/* y */1]
        ],
        /* direction */dir2,
        /* moveBullet */moveBullet,
        /* damage */damage,
        /* remainingRange */400
      ],
      /* :: */[
        /* record */[
          /* pos : float array */[
            state[/* pos */0][/* x */0],
            state[/* pos */0][/* y */1]
          ],
          /* direction */dir3,
          /* moveBullet */moveBullet,
          /* damage */damage,
          /* remainingRange */400
        ],
        state[/* playerBullets */7]
      ]
    ]
  ];
  var newrecord$1 = state[/* stats */22].slice();
  newrecord$1[/* numberOfBulletsFired */3] = state[/* stats */22][/* numberOfBulletsFired */3] + 3 | 0;
  newrecord[/* stats */22] = newrecord$1;
  return newrecord;
}

function makeSineFire(bulletSpeed, otherSpeed, damage, state, deltaTime$$1, direction) {
  var otherSpeed$1 = otherSpeed * deltaTime$$1;
  var bulletSpeed$1 = bulletSpeed * deltaTime$$1;
  var dir1;
  var exit$$1 = 0;
  if (direction >= 51) {
    switch (direction - 51 | 0) {
      case 0 : 
          dir1 = /* float array */[
            bulletSpeed$1,
            -otherSpeed$1
          ];
          break;
      case 1 : 
          dir1 = /* float array */[
            -bulletSpeed$1,
            otherSpeed$1
          ];
          break;
      case 2 : 
          dir1 = /* float array */[
            otherSpeed$1,
            bulletSpeed$1
          ];
          break;
      case 3 : 
          dir1 = /* float array */[
            -otherSpeed$1,
            -bulletSpeed$1
          ];
          break;
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
          exit$$1 = 1;
          break;
      
    }
  } else {
    exit$$1 = 1;
  }
  if (exit$$1 === 1) {
    throw [
          assert_failure,
          [
            "index.re",
            290,
            11
          ]
        ];
  }
  var dir2;
  var exit$1 = 0;
  if (direction >= 51) {
    switch (direction - 51 | 0) {
      case 0 : 
          dir2 = /* float array */[
            bulletSpeed$1,
            0
          ];
          break;
      case 1 : 
          dir2 = /* float array */[
            -bulletSpeed$1,
            0
          ];
          break;
      case 2 : 
          dir2 = /* float array */[
            0,
            bulletSpeed$1
          ];
          break;
      case 3 : 
          dir2 = /* float array */[
            0,
            -bulletSpeed$1
          ];
          break;
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
          exit$1 = 1;
          break;
      
    }
  } else {
    exit$1 = 1;
  }
  if (exit$1 === 1) {
    throw [
          assert_failure,
          [
            "index.re",
            298,
            11
          ]
        ];
  }
  var dir3;
  var exit$2 = 0;
  if (direction >= 51) {
    switch (direction - 51 | 0) {
      case 0 : 
          dir3 = /* float array */[
            bulletSpeed$1,
            otherSpeed$1
          ];
          break;
      case 1 : 
          dir3 = /* float array */[
            -bulletSpeed$1,
            -otherSpeed$1
          ];
          break;
      case 2 : 
          dir3 = /* float array */[
            -otherSpeed$1,
            bulletSpeed$1
          ];
          break;
      case 3 : 
          dir3 = /* float array */[
            otherSpeed$1,
            -bulletSpeed$1
          ];
          break;
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
          exit$2 = 1;
          break;
      
    }
  } else {
    exit$2 = 1;
  }
  if (exit$2 === 1) {
    throw [
          assert_failure,
          [
            "index.re",
            306,
            11
          ]
        ];
  }
  var moveBullet = function (bullet) {
    var perpendicular = /* float array */[
      -bullet[/* direction */1][/* y */1],
      bullet[/* direction */1][/* x */0]
    ];
    var perpendicularSize = Math.sqrt(perpendicular[/* x */0] * perpendicular[/* x */0] + perpendicular[/* y */1] * perpendicular[/* y */1]);
    var perpendicular$1 = /* float array */[
      perpendicular[/* x */0] / perpendicularSize,
      perpendicular[/* y */1] / perpendicularSize
    ];
    var norm$$1 = Math.cos(bullet[/* remainingRange */4] / 10) * 4;
    var offset = /* float array */[
      perpendicular$1[/* x */0] * norm$$1,
      perpendicular$1[/* y */1] * norm$$1
    ];
    var totalOffset = add(bullet[/* direction */1], offset);
    return /* record */[
            /* pos */add(bullet[/* pos */0], totalOffset),
            /* direction */bullet[/* direction */1],
            /* moveBullet */bullet[/* moveBullet */2],
            /* damage */bullet[/* damage */3],
            /* remainingRange */bullet[/* remainingRange */4] - magf(/* tuple */[
                  totalOffset[/* x */0],
                  totalOffset[/* y */1]
                ])
          ];
  };
  var newrecord = state.slice();
  newrecord[/* playerBullets */7] = /* :: */[
    /* record */[
      /* pos : float array */[
        state[/* pos */0][/* x */0],
        state[/* pos */0][/* y */1]
      ],
      /* direction */dir1,
      /* moveBullet */moveBullet,
      /* damage */damage,
      /* remainingRange */400
    ],
    /* :: */[
      /* record */[
        /* pos : float array */[
          state[/* pos */0][/* x */0],
          state[/* pos */0][/* y */1]
        ],
        /* direction */dir2,
        /* moveBullet */moveBullet,
        /* damage */damage,
        /* remainingRange */400
      ],
      /* :: */[
        /* record */[
          /* pos : float array */[
            state[/* pos */0][/* x */0],
            state[/* pos */0][/* y */1]
          ],
          /* direction */dir3,
          /* moveBullet */moveBullet,
          /* damage */damage,
          /* remainingRange */400
        ],
        state[/* playerBullets */7]
      ]
    ]
  ];
  var newrecord$1 = state[/* stats */22].slice();
  newrecord$1[/* numberOfBulletsFired */3] = state[/* stats */22][/* numberOfBulletsFired */3] + 3 | 0;
  newrecord[/* stats */22] = newrecord$1;
  return newrecord;
}

function makeLaserFire(bulletSpeed, damage, state, deltaTime$$1, direction) {
  var bulletSpeed$1 = bulletSpeed * deltaTime$$1;
  var dir;
  var exit$$1 = 0;
  if (direction >= 51) {
    switch (direction - 51 | 0) {
      case 0 : 
          dir = /* float array */[
            1.0,
            0
          ];
          break;
      case 1 : 
          dir = /* float array */[
            -1.0,
            0
          ];
          break;
      case 2 : 
          dir = /* float array */[
            0,
            1.0
          ];
          break;
      case 3 : 
          dir = /* float array */[
            0,
            -1.0
          ];
          break;
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
          exit$$1 = 1;
          break;
      
    }
  } else {
    exit$$1 = 1;
  }
  if (exit$$1 === 1) {
    throw [
          assert_failure,
          [
            "index.re",
            364,
            11
          ]
        ];
  }
  var recur = function (_acc, _i) {
    while(true) {
      var i = _i;
      var acc = _acc;
      if (i < 0) {
        return acc;
      } else {
        _i = i - 1 | 0;
        _acc = /* :: */[
          /* record */[
            /* pos : float array */[
              state[/* pos */0][/* x */0] - mulConst(dir, i * 1.5)[/* x */0],
              state[/* pos */0][/* y */1] - mulConst(dir, i * 1.5)[/* y */1]
            ],
            /* direction */mulConst(dir, bulletSpeed$1),
            /* moveBullet */moveBullet,
            /* damage */damage,
            /* remainingRange */400
          ],
          acc
        ];
        continue ;
        
      }
    }
  };
  var newBullets = recur(/* [] */0, 10);
  var newrecord = state.slice();
  newrecord[/* playerBullets */7] = $at(newBullets, state[/* playerBullets */7]);
  var newrecord$1 = state[/* stats */22].slice();
  newrecord$1[/* numberOfBulletsFired */3] = state[/* stats */22][/* numberOfBulletsFired */3] + 1 | 0;
  newrecord[/* stats */22] = newrecord$1;
  return newrecord;
}

function makeBurstFire(bulletSpeed, damage, state, deltaTime$$1, direction) {
  var bulletSpeed$1 = bulletSpeed * deltaTime$$1;
  var dir2;
  var exit$$1 = 0;
  if (direction >= 51) {
    switch (direction - 51 | 0) {
      case 0 : 
          dir2 = /* float array */[
            bulletSpeed$1,
            0
          ];
          break;
      case 1 : 
          dir2 = /* float array */[
            -bulletSpeed$1,
            0
          ];
          break;
      case 2 : 
          dir2 = /* float array */[
            0,
            bulletSpeed$1
          ];
          break;
      case 3 : 
          dir2 = /* float array */[
            0,
            -bulletSpeed$1
          ];
          break;
      case 4 : 
      case 5 : 
      case 6 : 
      case 7 : 
      case 8 : 
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
          exit$$1 = 1;
          break;
      
    }
  } else {
    exit$$1 = 1;
  }
  if (exit$$1 === 1) {
    throw [
          assert_failure,
          [
            "index.re",
            405,
            11
          ]
        ];
  }
  var newrecord = state.slice();
  newrecord[/* playerBullets */7] = /* :: */[
    /* record */[
      /* pos : float array */[
        state[/* pos */0][/* x */0],
        state[/* pos */0][/* y */1]
      ],
      /* direction */dir2,
      /* moveBullet */moveBullet,
      /* damage */damage,
      /* remainingRange */400
    ],
    /* :: */[
      /* record */[
        /* pos */add(add(/* float array */[
                  state[/* pos */0][/* x */0],
                  state[/* pos */0][/* y */1]
                ], dir2), dir2),
        /* direction */dir2,
        /* moveBullet */moveBullet,
        /* damage */damage,
        /* remainingRange */400
      ],
      /* :: */[
        /* record */[
          /* pos */add(add(add(add(/* float array */[
                            state[/* pos */0][/* x */0],
                            state[/* pos */0][/* y */1]
                          ], dir2), dir2), dir2), dir2),
          /* direction */dir2,
          /* moveBullet */moveBullet,
          /* damage */damage,
          /* remainingRange */400
        ],
        state[/* playerBullets */7]
      ]
    ]
  ];
  var newrecord$1 = state[/* stats */22].slice();
  newrecord$1[/* numberOfBulletsFired */3] = state[/* stats */22][/* numberOfBulletsFired */3] + 3 | 0;
  newrecord[/* stats */22] = newrecord$1;
  return newrecord;
}

function makeUziFire(bulletSpeed, otherSpeed, damage) {
  var otherNoise = [0];
  return (function (state, deltaTime$$1, direction) {
      otherNoise[0] = constrain(otherNoise[0] + randomf(-2000 * deltaTime$$1, 2000 * deltaTime$$1), otherSpeed * -1, otherSpeed);
      var bulletSpeed$1 = bulletSpeed * deltaTime$$1;
      var otherSpeed$1 = otherNoise[0] * deltaTime$$1;
      var dir;
      var exit$$1 = 0;
      if (direction >= 51) {
        switch (direction - 51 | 0) {
          case 0 : 
              dir = /* float array */[
                bulletSpeed$1,
                -otherSpeed$1
              ];
              break;
          case 1 : 
              dir = /* float array */[
                -bulletSpeed$1,
                otherSpeed$1
              ];
              break;
          case 2 : 
              dir = /* float array */[
                otherSpeed$1,
                bulletSpeed$1
              ];
              break;
          case 3 : 
              dir = /* float array */[
                -otherSpeed$1,
                -bulletSpeed$1
              ];
              break;
          case 4 : 
          case 5 : 
          case 6 : 
          case 7 : 
          case 8 : 
          case 9 : 
          case 10 : 
          case 11 : 
          case 12 : 
          case 13 : 
          case 14 : 
              exit$$1 = 1;
              break;
          
        }
      } else {
        exit$$1 = 1;
      }
      if (exit$$1 === 1) {
        throw [
              assert_failure,
              [
                "index.re",
                454,
                13
              ]
            ];
      }
      var newBullet_000 = /* pos : float array */[
        state[/* pos */0][/* x */0],
        state[/* pos */0][/* y */1]
      ];
      var newBullet = /* record */[
        newBullet_000,
        /* direction */dir,
        /* moveBullet */moveBullet,
        /* damage */damage,
        /* remainingRange */400
      ];
      var newrecord = state.slice();
      newrecord[/* playerBullets */7] = /* :: */[
        newBullet,
        state[/* playerBullets */7]
      ];
      var newrecord$1 = state[/* stats */22].slice();
      newrecord$1[/* numberOfBulletsFired */3] = state[/* stats */22][/* numberOfBulletsFired */3] + 1 | 0;
      newrecord[/* stats */22] = newrecord$1;
      return newrecord;
    });
}

function makeShotgunFire(bulletSpeed, otherSpeed, maxBullets, damage, state, deltaTime$$1, direction) {
  var otherSpeed$1 = otherSpeed * deltaTime$$1;
  var bulletSpeed$1 = bulletSpeed * deltaTime$$1;
  var recur = function (_acc, _i) {
    while(true) {
      var i = _i;
      var acc = _acc;
      if (i < 0) {
        return acc;
      } else {
        var otherSpeed$2 = randomf(-otherSpeed$1, otherSpeed$1);
        var bulletSpeed$2 = randomf(0.5, 1) * bulletSpeed$1;
        var dir;
        var exit$$1 = 0;
        if (direction >= 51) {
          switch (direction - 51 | 0) {
            case 0 : 
                dir = /* float array */[
                  bulletSpeed$2,
                  -otherSpeed$2
                ];
                break;
            case 1 : 
                dir = /* float array */[
                  -bulletSpeed$2,
                  otherSpeed$2
                ];
                break;
            case 2 : 
                dir = /* float array */[
                  otherSpeed$2,
                  bulletSpeed$2
                ];
                break;
            case 3 : 
                dir = /* float array */[
                  -otherSpeed$2,
                  -bulletSpeed$2
                ];
                break;
            case 4 : 
            case 5 : 
            case 6 : 
            case 7 : 
            case 8 : 
            case 9 : 
            case 10 : 
            case 11 : 
            case 12 : 
            case 13 : 
            case 14 : 
                exit$$1 = 1;
                break;
            
          }
        } else {
          exit$$1 = 1;
        }
        if (exit$$1 === 1) {
          throw [
                assert_failure,
                [
                  "index.re",
                  495,
                  15
                ]
              ];
        }
        _i = i - 1 | 0;
        _acc = /* :: */[
          /* record */[
            /* pos : float array */[
              state[/* pos */0][/* x */0],
              state[/* pos */0][/* y */1]
            ],
            /* direction */dir,
            /* moveBullet */moveBullet,
            /* damage */damage,
            /* remainingRange */100 + randomf(0, 50)
          ],
          acc
        ];
        continue ;
        
      }
    }
  };
  var newBullets = recur(/* [] */0, random$3(max(1, maxBullets - 3 | 0), maxBullets + 1 | 0));
  var newrecord = state.slice();
  newrecord[/* playerBullets */7] = $at(newBullets, state[/* playerBullets */7]);
  var newrecord$1 = state[/* stats */22].slice();
  newrecord$1[/* numberOfBulletsFired */3] = state[/* stats */22][/* numberOfBulletsFired */3] + length(newBullets) | 0;
  newrecord$1[/* numberOfShotgunShots */6] = state[/* stats */22][/* numberOfShotgunShots */6] + 1 | 0;
  newrecord[/* stats */22] = newrecord$1;
  return newrecord;
}

var keyCount = [0];

var keySet = [/* [] */0];

function getNextGunKey() {
  if (length(keySet[0]) >= 61) {
    return /* None */0;
  } else {
    keyCount[0] = keyCount[0] + 1 | 0;
    var match = keyCount[0];
    var switcher = match - 1 | 0;
    var ret;
    if (switcher > 8 || switcher < 0) {
      var key$$1 = random$3(0, 61);
      while(mem(key$$1, keySet[0])) {
        key$$1 = random$3(0, 61);
      }
      keySet[0] = /* :: */[
        key$$1,
        keySet[0]
      ];
      var match$1 = key$$1;
      if (match$1 > 60 || match$1 < 0) {
        throw [
              assert_failure,
              [
                "index.re",
                612,
                19
              ]
            ];
      } else {
        switch (match$1) {
          case 0 : 
              ret = /* record */[
                /* primaryKey : Q */41,
                /* modifier : false */0
              ];
              break;
          case 1 : 
              ret = /* record */[
                /* primaryKey : E */29,
                /* modifier : false */0
              ];
              break;
          case 2 : 
              ret = /* record */[
                /* primaryKey : R */42,
                /* modifier : false */0
              ];
              break;
          case 3 : 
              ret = /* record */[
                /* primaryKey : T */44,
                /* modifier : false */0
              ];
              break;
          case 4 : 
              ret = /* record */[
                /* primaryKey : Y */49,
                /* modifier : false */0
              ];
              break;
          case 5 : 
              ret = /* record */[
                /* primaryKey : U */45,
                /* modifier : false */0
              ];
              break;
          case 6 : 
              ret = /* record */[
                /* primaryKey : O */39,
                /* modifier : false */0
              ];
              break;
          case 7 : 
              ret = /* record */[
                /* primaryKey : P */40,
                /* modifier : false */0
              ];
              break;
          case 8 : 
              ret = /* record */[
                /* primaryKey : OpenBracket */22,
                /* modifier : false */0
              ];
              break;
          case 9 : 
              ret = /* record */[
                /* primaryKey : CloseBracket */24,
                /* modifier : false */0
              ];
              break;
          case 10 : 
              ret = /* record */[
                /* primaryKey : F */30,
                /* modifier : false */0
              ];
              break;
          case 11 : 
              ret = /* record */[
                /* primaryKey : G */31,
                /* modifier : false */0
              ];
              break;
          case 12 : 
              ret = /* record */[
                /* primaryKey : H */32,
                /* modifier : false */0
              ];
              break;
          case 13 : 
              ret = /* record */[
                /* primaryKey : J */34,
                /* modifier : false */0
              ];
              break;
          case 14 : 
              ret = /* record */[
                /* primaryKey : K */35,
                /* modifier : false */0
              ];
              break;
          case 15 : 
              ret = /* record */[
                /* primaryKey : L */36,
                /* modifier : false */0
              ];
              break;
          case 16 : 
              ret = /* record */[
                /* primaryKey : Semicolon */20,
                /* modifier : false */0
              ];
              break;
          case 17 : 
              ret = /* record */[
                /* primaryKey : Num_9 */19,
                /* modifier : true */1
              ];
              break;
          case 18 : 
              ret = /* record */[
                /* primaryKey : Z */50,
                /* modifier : false */0
              ];
              break;
          case 19 : 
              ret = /* record */[
                /* primaryKey : X */48,
                /* modifier : false */0
              ];
              break;
          case 20 : 
              ret = /* record */[
                /* primaryKey : C */27,
                /* modifier : false */0
              ];
              break;
          case 21 : 
              ret = /* record */[
                /* primaryKey : V */46,
                /* modifier : false */0
              ];
              break;
          case 22 : 
              ret = /* record */[
                /* primaryKey : B */26,
                /* modifier : false */0
              ];
              break;
          case 23 : 
              ret = /* record */[
                /* primaryKey : N */38,
                /* modifier : false */0
              ];
              break;
          case 24 : 
              ret = /* record */[
                /* primaryKey : M */37,
                /* modifier : false */0
              ];
              break;
          case 25 : 
              ret = /* record */[
                /* primaryKey : Comma */6,
                /* modifier : false */0
              ];
              break;
          case 26 : 
              ret = /* record */[
                /* primaryKey : Period */8,
                /* modifier : false */0
              ];
              break;
          case 27 : 
              ret = /* record */[
                /* primaryKey : Q */41,
                /* modifier : true */1
              ];
              break;
          case 28 : 
              ret = /* record */[
                /* primaryKey : E */29,
                /* modifier : true */1
              ];
              break;
          case 29 : 
              ret = /* record */[
                /* primaryKey : R */42,
                /* modifier : true */1
              ];
              break;
          case 30 : 
              ret = /* record */[
                /* primaryKey : T */44,
                /* modifier : true */1
              ];
              break;
          case 31 : 
              ret = /* record */[
                /* primaryKey : Y */49,
                /* modifier : true */1
              ];
              break;
          case 32 : 
              ret = /* record */[
                /* primaryKey : U */45,
                /* modifier : true */1
              ];
              break;
          case 33 : 
              ret = /* record */[
                /* primaryKey : O */39,
                /* modifier : true */1
              ];
              break;
          case 34 : 
              ret = /* record */[
                /* primaryKey : P */40,
                /* modifier : true */1
              ];
              break;
          case 35 : 
              ret = /* record */[
                /* primaryKey : OpenBracket */22,
                /* modifier : true */1
              ];
              break;
          case 36 : 
              ret = /* record */[
                /* primaryKey : CloseBracket */24,
                /* modifier : true */1
              ];
              break;
          case 37 : 
              ret = /* record */[
                /* primaryKey : F */30,
                /* modifier : true */1
              ];
              break;
          case 38 : 
              ret = /* record */[
                /* primaryKey : G */31,
                /* modifier : true */1
              ];
              break;
          case 39 : 
              ret = /* record */[
                /* primaryKey : H */32,
                /* modifier : true */1
              ];
              break;
          case 40 : 
              ret = /* record */[
                /* primaryKey : J */34,
                /* modifier : true */1
              ];
              break;
          case 41 : 
              ret = /* record */[
                /* primaryKey : K */35,
                /* modifier : true */1
              ];
              break;
          case 42 : 
              ret = /* record */[
                /* primaryKey : L */36,
                /* modifier : true */1
              ];
              break;
          case 43 : 
              ret = /* record */[
                /* primaryKey : Semicolon */20,
                /* modifier : true */1
              ];
              break;
          case 44 : 
              ret = /* record */[
                /* primaryKey : Num_8 */18,
                /* modifier : true */1
              ];
              break;
          case 45 : 
              ret = /* record */[
                /* primaryKey : Z */50,
                /* modifier : true */1
              ];
              break;
          case 46 : 
              ret = /* record */[
                /* primaryKey : X */48,
                /* modifier : true */1
              ];
              break;
          case 47 : 
              ret = /* record */[
                /* primaryKey : C */27,
                /* modifier : true */1
              ];
              break;
          case 48 : 
              ret = /* record */[
                /* primaryKey : V */46,
                /* modifier : true */1
              ];
              break;
          case 49 : 
              ret = /* record */[
                /* primaryKey : B */26,
                /* modifier : true */1
              ];
              break;
          case 50 : 
              ret = /* record */[
                /* primaryKey : N */38,
                /* modifier : true */1
              ];
              break;
          case 51 : 
              ret = /* record */[
                /* primaryKey : M */37,
                /* modifier : true */1
              ];
              break;
          case 52 : 
              ret = /* record */[
                /* primaryKey : Comma */6,
                /* modifier : true */1
              ];
              break;
          case 53 : 
              ret = /* record */[
                /* primaryKey : Period */8,
                /* modifier : true */1
              ];
              break;
          case 54 : 
              ret = /* record */[
                /* primaryKey : Num_1 */11,
                /* modifier : true */1
              ];
              break;
          case 55 : 
              ret = /* record */[
                /* primaryKey : Num_2 */12,
                /* modifier : true */1
              ];
              break;
          case 56 : 
              ret = /* record */[
                /* primaryKey : Num_3 */13,
                /* modifier : true */1
              ];
              break;
          case 57 : 
              ret = /* record */[
                /* primaryKey : Num_4 */14,
                /* modifier : true */1
              ];
              break;
          case 58 : 
              ret = /* record */[
                /* primaryKey : Num_5 */15,
                /* modifier : true */1
              ];
              break;
          case 59 : 
              ret = /* record */[
                /* primaryKey : Num_6 */16,
                /* modifier : true */1
              ];
              break;
          case 60 : 
              ret = /* record */[
                /* primaryKey : Num_7 */17,
                /* modifier : true */1
              ];
              break;
          
        }
      }
    } else {
      switch (switcher) {
        case 0 : 
            ret = /* record */[
              /* primaryKey : Num_1 */11,
              /* modifier : false */0
            ];
            break;
        case 1 : 
            ret = /* record */[
              /* primaryKey : Num_2 */12,
              /* modifier : false */0
            ];
            break;
        case 2 : 
            ret = /* record */[
              /* primaryKey : Num_3 */13,
              /* modifier : false */0
            ];
            break;
        case 3 : 
            ret = /* record */[
              /* primaryKey : Num_4 */14,
              /* modifier : false */0
            ];
            break;
        case 4 : 
            ret = /* record */[
              /* primaryKey : Num_5 */15,
              /* modifier : false */0
            ];
            break;
        case 5 : 
            ret = /* record */[
              /* primaryKey : Num_6 */16,
              /* modifier : false */0
            ];
            break;
        case 6 : 
            ret = /* record */[
              /* primaryKey : Num_7 */17,
              /* modifier : false */0
            ];
            break;
        case 7 : 
            ret = /* record */[
              /* primaryKey : Num_8 */18,
              /* modifier : false */0
            ];
            break;
        case 8 : 
            ret = /* record */[
              /* primaryKey : Num_9 */19,
              /* modifier : false */0
            ];
            break;
        
      }
    }
    return /* Some */[ret];
  }
}

function generateGun(state) {
  var match = getNextGunKey(/* () */0);
  if (match) {
    var maxAmmunition = randomf(0, 1);
    var match$1 = state[/* waveNum */14] < 3 ? /* tuple */[
        randomf(0, 0.7),
        randomf(0, 0.7)
      ] : /* tuple */[
        randomf(0, 1),
        randomf(0, 1)
      ];
    var fireRate = match$1[1];
    var damage = match$1[0];
    var gunRank = damage + fireRate;
    var match$2 = random$3(0, 8);
    var match$3;
    if (match$2 > 6 || match$2 < 0) {
      var partial_arg = lerpf(400, 1000)(damage);
      var partial_arg$1 = randomf(50, 200);
      var partial_arg$2 = 400 - 200;
      match$3 = /* tuple */[
        /* AlienGun1 */2,
        (function (param, param$1, param$2) {
            return makeSineFire(partial_arg$2, partial_arg$1, partial_arg, param, param$1, param$2);
          }),
        lerpf(0.7, 0.5)(fireRate),
        lerp$4(1, 10, maxAmmunition),
        "aliengun_threeshots"
      ];
    } else {
      switch (match$2) {
        case 0 : 
            var partial_arg$3 = lerpf(200, 2000)(damage);
            match$3 = /* tuple */[
              /* Pistol */0,
              (function (param, param$1, param$2) {
                  return makeDefaultFire(400, partial_arg$3, param, param$1, param$2);
                }),
              lerpf(0.5, 0.3)(fireRate),
              lerp$4(1, 10, maxAmmunition),
              "machinegun_singleshot"
            ];
            break;
        case 1 : 
            var partial_arg$4 = lerpf(200, 1200)(damage);
            var partial_arg$5 = randomf(50, 200);
            match$3 = /* tuple */[
              /* AlienGun2 */3,
              (function (param, param$1, param$2) {
                  return makeTripleShotGunFire(400, partial_arg$5, partial_arg$4, param, param$1, param$2);
                }),
              lerpf(0.7, 0.5)(fireRate),
              lerp$4(1, 10, maxAmmunition),
              "shotgun"
            ];
            break;
        case 2 : 
            var partial_arg$6 = lerpf(200, 1200)(damage);
            match$3 = /* tuple */[
              /* Rifle */1,
              (function (param, param$1, param$2) {
                  return makeBurstFire(400, partial_arg$6, param, param$1, param$2);
                }),
              lerpf(0.7, 0.5)(fireRate),
              lerp$4(1, 6, maxAmmunition),
              "machinegun_threeshots"
            ];
            break;
        case 3 : 
            var partial_arg$7 = lerpf(100, 1000)(damage);
            var partial_arg$8 = randomf(50, 200);
            var partial_arg$9 = 400 + 300;
            match$3 = /* tuple */[
              /* Shotgun */4,
              (function (param, param$1, param$2) {
                  return makeShotgunFire(partial_arg$9, partial_arg$8, 8, partial_arg$7, param, param$1, param$2);
                }),
              lerpf(2.0, 1.2)(fireRate),
              lerp$4(2, 6, maxAmmunition),
              "shotgun"
            ];
            break;
        case 4 : 
            var partial_arg$10 = lerpf(100, 400)(damage);
            match$3 = /* tuple */[
              /* Machinegun */5,
              (function (param, param$1, param$2) {
                  return makeDefaultFire(400, partial_arg$10, param, param$1, param$2);
                }),
              lerpf(0.2, 0.06)(fireRate),
              lerp$4(5, 30, maxAmmunition),
              "machinegun_singleshot"
            ];
            break;
        case 5 : 
            match$3 = /* tuple */[
              /* Uzi */7,
              makeUziFire(400, randomf(100, 500), lerpf(50, 200)(damage)),
              lerpf(0.1, 0.03)(fireRate),
              lerp$4(20, 50, maxAmmunition),
              "machinegun_singleshot"
            ];
            break;
        case 6 : 
            var partial_arg$11 = lerpf(50, 250)(damage);
            var partial_arg$12 = 400 - 200;
            match$3 = /* tuple */[
              /* LaserGun */6,
              (function (param, param$1, param$2) {
                  return makeLaserFire(partial_arg$12, partial_arg$11, param, param$1, param$2);
                }),
              lerpf(1.5, 0.5)(fireRate),
              lerp$4(2, 10, maxAmmunition),
              "laser"
            ];
            break;
        
      }
    }
    var maxAmmunition$1 = match$3[3];
    var match$4 = gunRank > 0 && gunRank < 0.1 ? /* tuple */[
        /* Poor */0,
        color(188, 191, 187, 255)
      ] : (
        gunRank > 0.1 && gunRank < 1.1 ? /* tuple */[
            /* Common */1,
            color(62, 245, 21, 255)
          ] : (
            gunRank > 1.1 && gunRank < 1.7 ? /* tuple */[
                /* Rare */2,
                color(47, 119, 214, 255)
              ] : (
                gunRank > 1.7 && gunRank < 1.9 ? /* tuple */[
                    /* Epic */3,
                    color(173, 28, 221, 255)
                  ] : /* tuple */[
                    /* Legendary */4,
                    color(247, 133, 12, 255)
                  ]
              )
          )
      );
    return /* :: */[
            /* record */[
              /* fireRate */match$3[2],
              /* lastShotTime */0,
              /* ammunition */maxAmmunition$1,
              /* maxAmmunition */maxAmmunition$1,
              /* color */match$4[1],
              /* keyToggle */match[0],
              /* fire */match$3[1],
              /* kind */match$3[0],
              /* rank */match$4[0],
              /* soundName */match$3[4]
            ],
            state[/* guns */1]
          ];
  } else {
    return state[/* guns */1];
  }
}

function generateAchievements() {
  var loop = function (_acc, _i) {
    while(true) {
      var i = _i;
      var acc = _acc;
      if (i <= 0) {
        return /* :: */[
                /* record */[
                  /* state : Locked */0,
                  /* condition */(function (state, _) {
                      return +(state[/* stats */22][/* stepTaken */5] >= 800);
                    }),
                  /* message */"You walked your first 100 steps!"
                ],
                acc
              ];
      } else {
        _i = i - 1 | 0;
        _acc = /* :: */[
          /* record */[
            /* state : Locked */0,
            /* condition */(function(i){
            return function (state, _) {
              return +(state[/* stats */22][/* stepTaken */5] >= 10000 * i);
            }
            }(i)),
            /* message */_1(sprintf(/* Format */[
                      /* String_literal */__(11, [
                          "You walked more than ",
                          /* Int */__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* String_literal */__(11, [
                                  " steps!",
                                  /* End_of_format */0
                                ])
                            ])
                        ]),
                      "You walked more than %d steps!"
                    ]), imul(1000, i))
          ],
          acc
        ];
        continue ;
        
      }
    }
  };
  var achievements = loop(/* [] */0, 25);
  var loop$1 = function (_acc, _i) {
    while(true) {
      var i = _i;
      var acc = _acc;
      if (i <= 0) {
        return acc;
      } else {
        _i = i - 1 | 0;
        _acc = /* :: */[
          /* record */[
            /* state : Locked */0,
            /* condition */(function(i){
            return function (state, _) {
              return +(state[/* stats */22][/* numberOfBulletsFired */3] >= imul(100, i));
            }
            }(i)),
            /* message */_1(sprintf(/* Format */[
                      /* String_literal */__(11, [
                          "You fired more than ",
                          /* Int */__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* String_literal */__(11, [
                                  " bullets!",
                                  /* End_of_format */0
                                ])
                            ])
                        ]),
                      "You fired more than %d bullets!"
                    ]), imul(100, i))
          ],
          acc
        ];
        continue ;
        
      }
    }
  };
  var achievements$1 = loop$1(achievements, 25);
  var loop$2 = function (_acc, _i) {
    while(true) {
      var i = _i;
      var acc = _acc;
      if (i <= 0) {
        return acc;
      } else {
        _i = i - 1 | 0;
        _acc = /* :: */[
          /* record */[
            /* state : Locked */0,
            /* condition */(function(i){
            return function (state, _) {
              return +(state[/* stats */22][/* numberOfWeaponSwaps */7] >= imul(10, pow(2, i)));
            }
            }(i)),
            /* message */_1(sprintf(/* Format */[
                      /* String_literal */__(11, [
                          "You swapped guns more than ",
                          /* Int */__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* String_literal */__(11, [
                                  " times!",
                                  /* End_of_format */0
                                ])
                            ])
                        ]),
                      "You swapped guns more than %d times!"
                    ]), imul(10, pow(2, i)))
          ],
          acc
        ];
        continue ;
        
      }
    }
  };
  var achievements$2 = loop$2(achievements$1, 15);
  var loop$3 = function (_acc, _i) {
    while(true) {
      var i = _i;
      var acc = _acc;
      if (i <= 0) {
        return acc;
      } else {
        _i = i - 1 | 0;
        _acc = /* :: */[
          /* record */[
            /* state : Locked */0,
            /* condition */(function(i){
            return function (state, _) {
              return +(state[/* stats */22][/* numberOfShotgunShots */6] >= imul(10, i));
            }
            }(i)),
            /* message */_1(sprintf(/* Format */[
                      /* String_literal */__(11, [
                          "You fired the shotgun ",
                          /* Int */__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* String_literal */__(11, [
                                  " times!",
                                  /* End_of_format */0
                                ])
                            ])
                        ]),
                      "You fired the shotgun %d times!"
                    ]), imul(10, i))
          ],
          acc
        ];
        continue ;
        
      }
    }
  };
  var achievements$3 = loop$3(achievements$2, 15);
  var _acc = achievements$3;
  var _i = 25;
  while(true) {
    var i = _i;
    var acc = _acc;
    if (i <= 0) {
      return /* :: */[
              /* record */[
                /* state : Locked */0,
                /* condition */(function (state, _) {
                    return +(state[/* stats */22][/* normalEnemiesKilled */0] >= 1);
                  }),
                /* message */"You killed your first zombie!"
              ],
              /* :: */[
                /* record */[
                  /* state : Locked */0,
                  /* condition */(function (state, _) {
                      return +(state[/* stats */22][/* tallEnemiesKilled */2] >= 1);
                    }),
                  /* message */"You killed your first Runner!"
                ],
                /* :: */[
                  /* record */[
                    /* state : Locked */0,
                    /* condition */(function (state, _) {
                        return +(state[/* stats */22][/* bigEnemiesKilled */1] >= 1);
                      }),
                    /* message */"You killed your first Biggy!"
                  ],
                  acc
                ]
              ]
            ];
    } else {
      _i = i - 1 | 0;
      _acc = /* :: */[
        /* record */[
          /* state : Locked */0,
          /* condition */(function(i){
          return function (state, _) {
            return +(state[/* stats */22][/* normalEnemiesKilled */0] >= pow(2, i));
          }
          }(i)),
          /* message */_1(sprintf(/* Format */[
                    /* String_literal */__(11, [
                        "You killed ",
                        /* Int */__(4, [
                            /* Int_d */0,
                            /* No_padding */0,
                            /* No_precision */0,
                            /* String_literal */__(11, [
                                " zombies!",
                                /* End_of_format */0
                              ])
                          ])
                      ]),
                    "You killed %d zombies!"
                  ]), pow(2, i))
        ],
        /* :: */[
          /* record */[
            /* state : Locked */0,
            /* condition */(function(i){
            return function (state, _) {
              return +(state[/* stats */22][/* bigEnemiesKilled */1] >= pow(2, i));
            }
            }(i)),
            /* message */_1(sprintf(/* Format */[
                      /* String_literal */__(11, [
                          "You killed ",
                          /* Int */__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* String_literal */__(11, [
                                  " Biggies!",
                                  /* End_of_format */0
                                ])
                            ])
                        ]),
                      "You killed %d Biggies!"
                    ]), pow(2, i))
          ],
          /* :: */[
            /* record */[
              /* state : Locked */0,
              /* condition */(function(i){
              return function (state, _) {
                return +(state[/* stats */22][/* tallEnemiesKilled */2] >= pow(2, i));
              }
              }(i)),
              /* message */_1(sprintf(/* Format */[
                        /* String_literal */__(11, [
                            "You killed ",
                            /* Int */__(4, [
                                /* Int_d */0,
                                /* No_padding */0,
                                /* No_precision */0,
                                /* String_literal */__(11, [
                                    " Runners!",
                                    /* End_of_format */0
                                  ])
                              ])
                          ]),
                        "You killed %d Runners!"
                      ]), pow(2, i))
            ],
            acc
          ]
        ]
      ];
      continue ;
      
    }
  }
}

function drawKey(x, y, gun, state, env) {
  var match = gun[/* keyToggle */5];
  var body;
  switch (match[/* primaryKey */0]) {
    case 6 : 
        body = ",";
        break;
    case 8 : 
        body = ".";
        break;
    case 11 : 
        body = "1";
        break;
    case 12 : 
        body = "2";
        break;
    case 13 : 
        body = "3";
        break;
    case 14 : 
        body = "4";
        break;
    case 15 : 
        body = "5";
        break;
    case 16 : 
        body = "6";
        break;
    case 17 : 
        body = "7";
        break;
    case 18 : 
        body = "8";
        break;
    case 19 : 
        body = "9";
        break;
    case 20 : 
        body = ";";
        break;
    case 22 : 
        body = "[";
        break;
    case 24 : 
        body = "]";
        break;
    case 26 : 
        body = "B";
        break;
    case 27 : 
        body = "C";
        break;
    case 29 : 
        body = "E";
        break;
    case 30 : 
        body = "F";
        break;
    case 31 : 
        body = "G";
        break;
    case 32 : 
        body = "H";
        break;
    case 34 : 
        body = "J";
        break;
    case 35 : 
        body = "K";
        break;
    case 36 : 
        body = "L";
        break;
    case 37 : 
        body = "M";
        break;
    case 38 : 
        body = "N";
        break;
    case 39 : 
        body = "O";
        break;
    case 40 : 
        body = "P";
        break;
    case 41 : 
        body = "Q";
        break;
    case 42 : 
        body = "R";
        break;
    case 44 : 
        body = "T";
        break;
    case 45 : 
        body = "U";
        break;
    case 46 : 
        body = "V";
        break;
    case 48 : 
        body = "X";
        break;
    case 49 : 
        body = "Y";
        break;
    case 50 : 
        body = "Z";
        break;
    case 0 : 
    case 1 : 
    case 2 : 
    case 3 : 
    case 4 : 
    case 5 : 
    case 7 : 
    case 9 : 
    case 10 : 
    case 21 : 
    case 23 : 
    case 25 : 
    case 28 : 
    case 33 : 
    case 43 : 
    case 47 : 
    case 51 : 
    case 52 : 
    case 53 : 
    case 54 : 
    case 55 : 
    case 56 : 
    case 57 : 
    case 58 : 
    case 59 : 
    case 60 : 
    case 61 : 
    case 62 : 
    case 63 : 
    case 64 : 
    case 65 : 
        body = failwith("Fuck");
        break;
    
  }
  if (gun[/* keyToggle */5][/* modifier */1]) {
    subImage(state[/* shiftIcon */21], /* tuple */[
          (x | 0) - 2 | 0,
          (y | 0) + 17 | 0
        ], 17, 17, /* tuple */[
          0,
          0
        ], 277, 277, env);
    return text(state[/* mainFont */10], " " + body, /* tuple */[
                (x | 0) + 6 | 0,
                (y | 0) + 10 | 0
              ], env);
  } else {
    return text(state[/* mainFont */10], body, /* tuple */[
                x | 0,
                (y | 0) + 10 | 0
              ], env);
  }
}

function generateWave(state) {
  var enemyCount = random$3(10, 15);
  var list_init = function (_acc, f, _i) {
    while(true) {
      var i = _i;
      var acc = _acc;
      if (i <= 0) {
        return acc;
      } else {
        _i = i - 1 | 0;
        _acc = /* :: */[
          _1(f, /* () */0),
          acc
        ];
        continue ;
        
      }
    }
  };
  var genEnemyPos = function () {
    var match = random$3(0, 4);
    if (match > 3 || match < 0) {
      throw [
            assert_failure,
            [
              "index.re",
              924,
              11
            ]
          ];
    } else {
      switch (match) {
        case 0 : 
            return /* float array */[
                    randomf(0, mapSizePx),
                    -30
                  ];
        case 1 : 
            return /* float array */[
                    mapSizePx + 30,
                    randomf(0, mapSizePx)
                  ];
        case 2 : 
            return /* float array */[
                    randomf(0, mapSizePx),
                    mapSizePx + 30
                  ];
        case 3 : 
            return /* float array */[
                    -30,
                    randomf(0, mapSizePx)
                  ];
        
      }
    }
  };
  var makeEnemy = function () {
    var match = random$3(0, 3);
    var monsterKind = match !== 0 ? (
        match !== 1 ? /* Normal3Z */2 : /* Normal2Z */1
      ) : /* Normal1Z */0;
    return /* record */[
            /* maxHealth */35,
            /* health */35,
            /* pos */genEnemyPos(/* () */0),
            /* error : float array */[
              0,
              0
            ],
            /* speed */25,
            /* damage */100,
            /* deathCountdown */1.0,
            /* kind */monsterKind
          ];
  };
  var makeMiniBosses = function () {
    var match = random$3(1, 3);
    var match$1 = match !== 1 ? /* tuple */[
        /* TallZ */4,
        35,
        110,
        60
      ] : /* tuple */[
        /* BigZ */3,
        300,
        15,
        300
      ];
    var maxHealth = match$1[1];
    return /* record */[
            /* maxHealth */maxHealth,
            /* health */maxHealth,
            /* pos */genEnemyPos(/* () */0),
            /* error : float array */[
              0,
              0
            ],
            /* speed */match$1[2],
            /* damage */match$1[3],
            /* deathCountdown */1.0,
            /* kind */match$1[0]
          ];
  };
  var enemies = list_init(state[/* enemies */13], makeEnemy, enemyCount);
  var enemies$1;
  if (state[/* waveNum */14] === 2) {
    enemies$1 = list_init(enemies, makeMiniBosses, 2);
  } else if (state[/* waveNum */14] > 2) {
    var n = max(0, random$3(0, state[/* waveNum */14]));
    enemies$1 = list_init(enemies, makeMiniBosses, n);
  } else {
    enemies$1 = enemies;
  }
  var match = +(state[/* waveNum */14] > 1);
  var crateCount = match !== 0 ? random$3(0, 2) : 0;
  var makeCrate = function () {
    return /* record */[
            /* pos : float array */[
              randomf(50, mapSizePx - 50),
              randomf(50, mapSizePx - 50)
            ],
            /* kind */random$3(0, 8)
          ];
  };
  var newrecord = state.slice();
  newrecord[/* crates */9] = list_init(state[/* crates */9], makeCrate, crateCount);
  newrecord[/* enemies */13] = enemies$1;
  newrecord[/* waveNum */14] = state[/* waveNum */14] + 1 | 0;
  newrecord[/* nextWaveCountdown */15] = 60;
  newrecord[/* animatingWaveNumberTime */19] = 3;
  return newrecord;
}

function drawHealthBar(x, y, h, w, health, maxHealth, color$$1, $staropt$star, env) {
  var border = $staropt$star ? $staropt$star[0] : 2;
  var xOffset = w / 2;
  var halfBorder = border / 2;
  fill$4(black, env);
  rectf(/* tuple */[
        x - xOffset - halfBorder,
        y - halfBorder
      ], w + border, h + border, env);
  var healthW = remapf(health, 0, maxHealth, 0, w);
  fill$4(color$$1, env);
  return rectf(/* tuple */[
              x - xOffset,
              y
            ], healthW, h, env);
}

var soundNames = /* :: */[
  /* tuple */[
    "emptygun",
    1.0
  ],
  /* :: */[
    /* tuple */[
      "reload",
      1.0
    ],
    /* :: */[
      /* tuple */[
        "machinegun_singleshot",
        0.4
      ],
      /* :: */[
        /* tuple */[
          "machinegun_threeshots",
          0.4
        ],
        /* :: */[
          /* tuple */[
            "laser",
            0.3
          ],
          /* :: */[
            /* tuple */[
              "aliengun_threeshots",
              1.0
            ],
            /* :: */[
              /* tuple */[
                "shotgun",
                1.0
              ],
              /* :: */[
                /* tuple */[
                  "theme",
                  0.9
                ],
                /* :: */[
                  /* tuple */[
                    "hurt",
                    1.0
                  ],
                  /* :: */[
                    /* tuple */[
                      "achievement",
                      1.0
                    ],
                    /* :: */[
                      /* tuple */[
                        "zombie_one",
                        1.0
                      ],
                      /* :: */[
                        /* tuple */[
                          "zombie_two",
                          1.0
                        ],
                        /* :: */[
                          /* tuple */[
                            "zombie_three",
                            1.0
                          ],
                          /* :: */[
                            /* tuple */[
                              "new_wave",
                              1.0
                            ],
                            /* [] */0
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

function playSound(name, sounds, $staropt$star, env) {
  var loop = $staropt$star ? $staropt$star[0] : /* false */0;
  var exit$$1 = 0;
  var val;
  try {
    val = _2(StringMap[/* find */21], name, sounds);
    exit$$1 = 1;
  }
  catch (exn){
    if (exn === not_found) {
      console.log("Couldn't find sound " + name);
      return /* () */0;
    } else {
      throw exn;
    }
  }
  if (exit$$1 === 1) {
    return playSound$2(val[0], /* Some */[val[1]], /* Some */[loop], env);
  }
  
}

function setup(env) {
  size$1(1120, 650, env);
  var loadSound = function (soundMap, param) {
    var soundName = param[0];
    return _3(StringMap[/* add */3], soundName, /* tuple */[
                loadSound$1(_1(sprintf(/* Format */[
                              /* String_literal */__(11, [
                                  "assets/sounds/",
                                  /* String */__(2, [
                                      /* No_padding */0,
                                      /* String_literal */__(11, [
                                          ".wav",
                                          /* End_of_format */0
                                        ])
                                    ])
                                ]),
                              "assets/sounds/%s.wav"
                            ]), soundName), env),
                param[1]
              ], soundMap);
  };
  var sounds = fold_left(loadSound, StringMap[/* empty */0], soundNames);
  playSound("theme", sounds, /* Some */[/* true */1], env);
  return /* record */[
          /* pos : float array */[
            400,
            400
          ],
          /* guns : [] */0,
          /* facingLeft : true */1,
          /* moving : false */0,
          /* equippedGun */-1,
          /* health */50,
          /* invulnCountdown */0,
          /* playerBullets : [] */0,
          /* achievements */generateAchievements(/* () */0),
          /* crates : [] */0,
          /* mainFont */loadFont("assets/molot/font.fnt", /* None */0, env),
          /* mainSpriteSheet */loadImage$2("assets/spritesheet.png", /* Some */[/* true */1], env),
          /* sounds */sounds,
          /* enemies : :: */[
            /* record */[
              /* maxHealth */100,
              /* health */100,
              /* pos : float array */[
                100,
                250
              ],
              /* error : float array */[
                5,
                5
              ],
              /* speed */70,
              /* damage */100,
              /* deathCountdown */1.0,
              /* kind : Normal1Z */0
            ],
            /* [] */0
          ],
          /* waveNum */0,
          /* nextWaveCountdown */10,
          /* elapsedTime */0,
          /* animatingAchievementTime */0,
          /* animatingAchievement : None */0,
          /* animatingWaveNumberTime */0,
          /* running : true */1,
          /* shiftIcon */loadImage$2("assets/shift_icon.png", /* None */0, env),
          /* stats : record */[
            /* normalEnemiesKilled */0,
            /* bigEnemiesKilled */0,
            /* tallEnemiesKilled */0,
            /* numberOfBulletsFired */0,
            /* damageDone */0,
            /* stepTaken */0,
            /* numberOfShotgunShots */0,
            /* numberOfWeaponSwaps */0
          ]
        ];
}

function drawForest(state, env) {
  fill$4(color(43, 82, 69, 255), env);
  for(var i = 1; i <= 8; ++i){
    rectf(/* tuple */[
          i * 63,
          -25
        ], 65, -64, env);
    subImagef(state[/* mainSpriteSheet */11], /* tuple */[
          i * 64,
          25
        ], 64, -64, /* tuple */[
          540,
          0
        ], 64, 64, env);
  }
  var maxX = 9 * 63;
  for(var i$1 = 0; i$1 <= 8; ++i$1){
    pushMatrix(env);
    translate$3(maxX + 7, i$1 * 64 + 22, env);
    rotate$4(-pi / 2, env);
    rectf(/* tuple */[
          0,
          125
        ], 65, -64, env);
    subImagef(state[/* mainSpriteSheet */11], /* tuple */[
          0,
          0
        ], -65, 64, /* tuple */[
          540,
          0
        ], 64, 64, env);
    popMatrix(env);
  }
  rectf(/* tuple */[
        maxX + 67,
        9 * 64 + 22
      ], 65, -64, env);
  rectf(/* tuple */[
        maxX + 67,
        10 * 64 + 22
      ], 65, -64, env);
  rectf(/* tuple */[
        maxX + 67,
        11 * 64 + 22
      ], 65, -64, env);
  pushMatrix(env);
  translate$3(maxX + 9, -41, env);
  rotate$4(pi * 3 / 2, env);
  subImagef(state[/* mainSpriteSheet */11], /* tuple */[
        0,
        0
      ], -64, 64, /* tuple */[
        276,
        0
      ], 64, 64, env);
  popMatrix(env);
  for(var i$2 = 1; i$2 <= 8; ++i$2){
    rectf(/* tuple */[
          i$2 * 63,
          20 + mapSizePx
        ], 65, 64, env);
    subImagef(state[/* mainSpriteSheet */11], /* tuple */[
          i$2 * 64,
          -44 + mapSizePx
        ], 64, 64, /* tuple */[
          540,
          0
        ], 64, 64, env);
  }
  rectf(/* tuple */[
        0,
        20 + mapSizePx
      ], 65, 64, env);
  rectf(/* tuple */[
        -64,
        20 + mapSizePx
      ], 65, 64, env);
  rectf(/* tuple */[
        -64,
        20 + mapSizePx - 64
      ], 65, 64, env);
  subImagef(state[/* mainSpriteSheet */11], /* tuple */[
        mapSizePx - 1,
        -42 + mapSizePx
      ], -64, 64, /* tuple */[
        276,
        0
      ], 64, 64, env);
  for(var i$3 = 0; i$3 <= 8; ++i$3){
    pushMatrix(env);
    translate$3(64, i$3 * 64 + 22, env);
    rotate$4(pi / 2, env);
    rectf(/* tuple */[
          0,
          125
        ], 65, -64, env);
    subImagef(state[/* mainSpriteSheet */11], /* tuple */[
          0,
          0
        ], 65, 64, /* tuple */[
          540,
          0
        ], 64, 64, env);
    popMatrix(env);
  }
  pushMatrix(env);
  translate$3(64, -41, env);
  rotate$4(-pi * 3 / 2, env);
  subImagef(state[/* mainSpriteSheet */11], /* tuple */[
        0,
        0
      ], 64, 64, /* tuple */[
        276,
        0
      ], 64, 64, env);
  popMatrix(env);
  subImagef(state[/* mainSpriteSheet */11], /* tuple */[
        0,
        -42 + mapSizePx
      ], 64, 64, /* tuple */[
        276,
        0
      ], 64, 64, env);
  rectf(/* tuple */[
        -64,
        -32
      ], 65, 64, env);
  rectf(/* tuple */[
        -64,
        -32 - 64
      ], 65, 64, env);
  return rectf(/* tuple */[
              0,
              -32 - 64
            ], 65, 64, env);
}

var grid = make_matrix(10, 10, 0);

for(var _for = 0; _for <= 300; ++_for){
  var x = random$3(0, 10);
  var y = random$3(0, 10);
  caml_array_set(caml_array_get(grid, x), y, random$3(1, 4));
}

function checkOffset(prevOffset, offset, state) {
  if (state[/* pos */0][/* x */0] + offset[/* x */0] < 0 || state[/* pos */0][/* x */0] + offset[/* x */0] > mapSizePx || state[/* pos */0][/* y */1] + offset[/* y */1] < 0 || state[/* pos */0][/* y */1] + offset[/* y */1] > mapSizePx) {
    return prevOffset;
  } else {
    return offset;
  }
}

function handleGunSwitching(_state, _guns, _i, env) {
  while(true) {
    var i = _i;
    var guns = _guns;
    var state = _state;
    if (guns) {
      var gun = guns[0];
      var match = gun[/* keyToggle */5][/* modifier */1];
      var match$1 = keyPressed(gun[/* keyToggle */5][/* primaryKey */0], env) && (
        match !== 0 ? key(/* LeftShift */56, env) : 1 - key(/* LeftShift */56, env)
      );
      var tmp;
      if (match$1 !== 0) {
        var newrecord = state.slice();
        newrecord[/* equippedGun */4] = i;
        var newrecord$1 = state[/* stats */22].slice();
        var match$2 = +(i !== state[/* equippedGun */4]);
        newrecord$1[/* numberOfWeaponSwaps */7] = match$2 !== 0 ? state[/* stats */22][/* numberOfWeaponSwaps */7] + 1 | 0 : state[/* stats */22][/* numberOfWeaponSwaps */7];
        newrecord[/* stats */22] = newrecord$1;
        tmp = newrecord;
      } else {
        tmp = state;
      }
      _i = i + 1 | 0;
      _guns = guns[1];
      _state = tmp;
      continue ;
      
    } else {
      return state;
    }
  }
}

function draw(state, env) {
  var dt = deltaTime(env);
  background(color(43, 82, 69, 255), env);
  fill$4(color(41, 166, 244, 255), env);
  rectMode(/* Corner */0, env);
  var match = keyPressed(/* Escape */3, env);
  var state$1;
  if (match !== 0) {
    var newrecord = state.slice();
    newrecord[/* running */20] = 1 - state[/* running */20];
    state$1 = newrecord;
  } else {
    state$1 = state;
  }
  var state$2;
  if (state$1[/* running */20] && state$1[/* health */5] > 0) {
    var offset = /* float array */[
      0,
      0
    ];
    var numZombies = length(state$1[/* enemies */13]);
    if ($$float$1(1) + numZombies * 0.00005 > 0.995) {
      var match$1 = $$int$1(3);
      var num = match$1 !== 0 ? (
          match$1 !== 1 ? "three" : "two"
        ) : "one";
      playSound("zombie_" + num, state$1[/* sounds */12], /* None */0, env);
    }
    if (state$1[/* invulnCountdown */6] > 0) {
      state$1[/* invulnCountdown */6] = max(0, state$1[/* invulnCountdown */6] - dt);
    } else {
      iter((function (e) {
              if (state$1[/* invulnCountdown */6] <= 0 && e[/* health */1] >= 1 && intersectRectRect(/* tuple */[
                      state$1[/* pos */0][/* x */0] - 10,
                      state$1[/* pos */0][/* y */1] - 10
                    ], 30, 30, /* tuple */[
                      e[/* pos */2][/* x */0] - 20,
                      e[/* pos */2][/* y */1] - 20
                    ], 40, 40)) {
                state$1[/* invulnCountdown */6] = 1.0;
                state$1[/* health */5] = max(state$1[/* health */5] - e[/* damage */5] * dt, 0);
                return playSound("hurt", state$1[/* sounds */12], /* None */0, env);
              } else {
                return 0;
              }
            }), state$1[/* enemies */13]);
    }
    var playerSpeedDt = 150 * dt;
    var match$2 = key(/* A */25, env);
    var offset$1 = checkOffset(offset, match$2 !== 0 ? /* float array */[
            -playerSpeedDt,
            offset[/* y */1]
          ] : offset, state$1);
    var match$3 = key(/* D */28, env);
    var offset$2 = checkOffset(offset$1, match$3 !== 0 ? /* float array */[
            playerSpeedDt,
            offset$1[/* y */1]
          ] : offset$1, state$1);
    var match$4 = key(/* W */47, env);
    var offset$3 = checkOffset(offset$2, match$4 !== 0 ? /* float array */[
            offset$2[/* x */0],
            -playerSpeedDt
          ] : offset$2, state$1);
    var match$5 = key(/* S */43, env);
    var offset$4 = checkOffset(offset$3, match$5 !== 0 ? /* float array */[
            offset$3[/* x */0],
            playerSpeedDt
          ] : offset$3, state$1);
    var mag$$1 = magf(/* tuple */[
          offset$4[/* x */0],
          offset$4[/* y */1]
        ]);
    var state$3;
    if (mag$$1 > 0) {
      var dx = offset$4[/* x */0] / mag$$1 * playerSpeedDt;
      var dy = offset$4[/* y */1] / mag$$1 * playerSpeedDt;
      var newrecord$1 = state$1.slice();
      newrecord$1[/* pos */0] = /* float array */[
        state$1[/* pos */0][/* x */0] + dx,
        state$1[/* pos */0][/* y */1] + dy
      ];
      var newrecord$2 = state$1[/* stats */22].slice();
      newrecord$2[/* stepTaken */5] = state$1[/* stats */22][/* stepTaken */5] + playerSpeedDt;
      newrecord$1[/* stats */22] = newrecord$2;
      state$3 = newrecord$1;
    } else {
      state$3 = state$1;
    }
    var newrecord$3 = state$3.slice();
    var state$4 = fold_left((function (state, crate) {
            if (intersectRectRect(/* tuple */[
                    state[/* pos */0][/* x */0] - 20,
                    state[/* pos */0][/* y */1] - 20
                  ], 40, 40, /* tuple */[
                    crate[/* pos */0][/* x */0] - 20,
                    crate[/* pos */0][/* y */1] - 20
                  ], 40, 40) && exists((function (g) {
                      if (g[/* kind */7] === crate[/* kind */1]) {
                        return +(g[/* ammunition */2] < g[/* maxAmmunition */3]);
                      } else {
                        return /* false */0;
                      }
                    }), state[/* guns */1])) {
              playSound("reload", state[/* sounds */12], /* None */0, env);
              var newrecord = state.slice();
              newrecord[/* guns */1] = map((function (gun) {
                      var match = +(gun[/* kind */7] === crate[/* kind */1]);
                      if (match !== 0) {
                        var newrecord = gun.slice();
                        newrecord[/* ammunition */2] = gun[/* maxAmmunition */3];
                        return newrecord;
                      } else {
                        return gun;
                      }
                    }), state[/* guns */1]);
              return newrecord;
            } else {
              var newrecord$1 = state.slice();
              newrecord$1[/* crates */9] = /* :: */[
                crate,
                state[/* crates */9]
              ];
              return newrecord$1;
            }
          }), (newrecord$3[/* crates */9] = /* [] */0, newrecord$3), state$3[/* crates */9]);
    var state$5 = handleGunSwitching(state$4, state$4[/* guns */1], 0, env);
    var fireGun = function (state) {
      var newrecord = state.slice();
      newrecord[/* guns */1] = mapi$1((function (i, gun) {
              if (i === state[/* equippedGun */4]) {
                var newrecord = gun.slice();
                newrecord[/* lastShotTime */1] = state[/* elapsedTime */16];
                newrecord[/* ammunition */2] = max(gun[/* ammunition */2] - 1 | 0, 0);
                return newrecord;
              } else {
                return gun;
              }
            }), state[/* guns */1]);
      return newrecord;
    };
    var state$6;
    if (state$5[/* equippedGun */4] >= 0) {
      var curGun = nth(state$5[/* guns */1], state$5[/* equippedGun */4]);
      if (state$5[/* elapsedTime */16] - curGun[/* lastShotTime */1] > curGun[/* fireRate */0] && curGun[/* ammunition */2] > 0) {
        var match$6 = fold_left((function (param, dir) {
                var s = param[0];
                var match = key(dir, env);
                if (match !== 0) {
                  return /* tuple */[
                          _3(curGun[/* fire */6], s, dt, dir),
                          /* true */1
                        ];
                } else {
                  return /* tuple */[
                          s,
                          param[1]
                        ];
                }
              }), /* tuple */[
              state$5,
              /* false */0
            ], directions);
        var state$7 = match$6[0];
        if (match$6[1]) {
          playSound(curGun[/* soundName */9], state$7[/* sounds */12], /* None */0, env);
          state$6 = fireGun(state$7);
        } else {
          state$6 = state$7;
        }
      } else if (state$5[/* elapsedTime */16] - curGun[/* lastShotTime */1] > curGun[/* fireRate */0] && curGun[/* ammunition */2] === 0) {
        if (exists((function (dir) {
                  return key(dir, env);
                }), directions)) {
          playSound("emptygun", state$5[/* sounds */12], /* None */0, env);
          state$6 = fireGun(state$5);
        } else {
          state$6 = state$5;
        }
      } else {
        state$6 = state$5;
      }
    } else {
      state$6 = state$5;
    }
    var state$8;
    if (key(/* D */28, env)) {
      var newrecord$4 = state$6.slice();
      newrecord$4[/* facingLeft */2] = /* false */0;
      newrecord$4[/* moving */3] = /* true */1;
      state$8 = newrecord$4;
    } else if (key(/* A */25, env)) {
      var newrecord$5 = state$6.slice();
      newrecord$5[/* facingLeft */2] = /* true */1;
      newrecord$5[/* moving */3] = /* true */1;
      state$8 = newrecord$5;
    } else if (key(/* W */47, env)) {
      var newrecord$6 = state$6.slice();
      newrecord$6[/* moving */3] = /* true */1;
      state$8 = newrecord$6;
    } else if (key(/* S */43, env)) {
      var newrecord$7 = state$6.slice();
      newrecord$7[/* moving */3] = /* true */1;
      state$8 = newrecord$7;
    } else {
      var newrecord$8 = state$6.slice();
      newrecord$8[/* moving */3] = /* false */0;
      state$8 = newrecord$8;
    }
    var state$9;
    if (key(/* Right */51, env)) {
      var newrecord$9 = state$8.slice();
      newrecord$9[/* facingLeft */2] = /* false */0;
      state$9 = newrecord$9;
    } else if (key(/* Left */52, env)) {
      var newrecord$10 = state$8.slice();
      newrecord$10[/* facingLeft */2] = /* true */1;
      state$9 = newrecord$10;
    } else {
      state$9 = state$8;
    }
    var newrecord$11 = state$9.slice();
    newrecord$11[/* elapsedTime */16] = state$9[/* elapsedTime */16] + deltaTime(env);
    var newrecord$12 = newrecord$11.slice();
    newrecord$12[/* playerBullets */7] = map((function (bullet) {
            return _1(bullet[/* moveBullet */2], bullet);
          }), newrecord$11[/* playerBullets */7]);
    var newrecord$13 = newrecord$12.slice();
    newrecord$13[/* playerBullets */7] = filter((function (bullet) {
              return +(bullet[/* remainingRange */4] > 0);
            }))(newrecord$12[/* playerBullets */7]);
    var state$10 = fold_left((function (state, achievement) {
            if (achievement[/* state */0] === /* Locked */0 && _2(achievement[/* condition */1], state, env)) {
              playSound("achievement", state[/* sounds */12], /* None */0, env);
              var newrecord = state.slice();
              newrecord[/* guns */1] = generateGun(state);
              newrecord[/* equippedGun */4] = state[/* equippedGun */4] + 1 | 0;
              newrecord[/* achievements */8] = map((function (a) {
                      if (a === achievement) {
                        return /* record */[
                                /* state : Unlocked */1,
                                /* condition */a[/* condition */1],
                                /* message */a[/* message */2]
                              ];
                      } else {
                        return a;
                      }
                    }), state[/* achievements */8]);
              newrecord[/* animatingAchievementTime */17] = 3.2;
              newrecord[/* animatingAchievement */18] = /* Some */[achievement];
              newrecord[/* running */20] = /* false */0;
              return newrecord;
            } else {
              return state;
            }
          }), newrecord$13, newrecord$13[/* achievements */8]);
    var newrecord$14 = state$10.slice();
    newrecord$14[/* enemies */13] = map((function (enemy) {
            var size = distf(/* tuple */[
                  state$10[/* pos */0][/* x */0],
                  state$10[/* pos */0][/* y */1]
                ], /* tuple */[
                  enemy[/* pos */2][/* x */0],
                  enemy[/* pos */2][/* y */1]
                ]);
            var dx = (state$10[/* pos */0][/* x */0] - enemy[/* pos */2][/* x */0]) / size * enemy[/* speed */4] * dt;
            var dy = (state$10[/* pos */0][/* y */1] - enemy[/* pos */2][/* y */1]) / size * enemy[/* speed */4] * dt;
            var match = enemy[/* kind */7];
            var error = match >= 4 ? /* float array */[
                constrain(enemy[/* error */3][/* x */0] + randomf(-2, 2), -1 * enemy[/* speed */4] / 4, enemy[/* speed */4] / 4),
                constrain(enemy[/* error */3][/* y */1] + randomf(-2, 2), -1 * enemy[/* speed */4] / 4, enemy[/* speed */4] / 4)
              ] : /* float array */[
                constrain(enemy[/* error */3][/* x */0] + randomf(-2, 2), -1 * enemy[/* speed */4], enemy[/* speed */4]),
                constrain(enemy[/* error */3][/* y */1] + randomf(-2, 2), -1 * enemy[/* speed */4], enemy[/* speed */4])
              ];
            var match$1 = +(enemy[/* health */1] >= 1);
            if (match$1 !== 0) {
              var newrecord = enemy.slice();
              newrecord[/* pos */2] = /* float array */[
                enemy[/* pos */2][/* x */0] + dx + enemy[/* error */3][/* x */0] * dt,
                enemy[/* pos */2][/* y */1] + dy + enemy[/* error */3][/* y */1] * dt
              ];
              newrecord[/* error */3] = error;
              return newrecord;
            } else {
              return enemy;
            }
          }), state$10[/* enemies */13]);
    var newrecord$15 = newrecord$14.slice();
    var state$11 = fold_left((function (state, bullet) {
            var hurtEnemies = function (_acc, _enemies) {
              while(true) {
                var enemies = _enemies;
                var acc = _acc;
                if (enemies) {
                  var rest = enemies[1];
                  var e = enemies[0];
                  if (e[/* health */1] > 1 && intersectRectRect(/* tuple */[
                          bullet[/* pos */0][/* x */0],
                          bullet[/* pos */0][/* y */1]
                        ], 5, 5, /* tuple */[
                          e[/* pos */2][/* x */0] - 20,
                          e[/* pos */2][/* y */1] - 20
                        ], 40, 40)) {
                    var newrecord = e.slice();
                    return /* tuple */[
                            /* true */1,
                            $at(acc, /* :: */[
                                  (newrecord[/* health */1] = e[/* health */1] - bullet[/* damage */3] * deltaTime(env), newrecord),
                                  rest
                                ])
                          ];
                  } else {
                    _enemies = rest;
                    _acc = /* :: */[
                      e,
                      acc
                    ];
                    continue ;
                    
                  }
                } else {
                  return /* tuple */[
                          /* false */0,
                          acc
                        ];
                }
              }
            };
            var match = hurtEnemies(/* [] */0, state[/* enemies */13]);
            var didHit = match[0];
            var bullets = didHit ? state[/* playerBullets */7] : /* :: */[
                bullet,
                state[/* playerBullets */7]
              ];
            var newrecord = state.slice();
            newrecord[/* playerBullets */7] = bullets;
            newrecord[/* enemies */13] = match[1];
            var newrecord$1 = state[/* stats */22].slice();
            newrecord$1[/* damageDone */4] = didHit !== 0 ? state[/* stats */22][/* damageDone */4] + bullet[/* damage */3] * deltaTime(env) : state[/* stats */22][/* damageDone */4];
            newrecord[/* stats */22] = newrecord$1;
            return newrecord;
          }), (newrecord$15[/* playerBullets */7] = /* [] */0, newrecord$15), newrecord$14[/* playerBullets */7]);
    var state$12;
    if (length(state$11[/* guns */1]) > 0 && for_all((function (gun) {
              return +(gun[/* ammunition */2] === 0);
            }), state$11[/* guns */1])) {
      playSound("reload", state$11[/* sounds */12], /* None */0, env);
      var newrecord$16 = state$11.slice();
      newrecord$16[/* guns */1] = map((function (gun) {
              var newrecord = gun.slice();
              newrecord[/* ammunition */2] = gun[/* maxAmmunition */3];
              return newrecord;
            }), state$11[/* guns */1]);
      state$12 = newrecord$16;
    } else {
      state$12 = state$11;
    }
    var newrecord$17 = state$12.slice();
    newrecord$17[/* nextWaveCountdown */15] = state$12[/* nextWaveCountdown */15] - deltaTime(env);
    var state$13 = newrecord$17[/* nextWaveCountdown */15] <= 0 || length(newrecord$17[/* enemies */13]) === 0 ? (playSound("new_wave", newrecord$17[/* sounds */12], /* None */0, env), generateWave(newrecord$17)) : newrecord$17;
    var newrecord$18 = state$13.slice();
    newrecord$18[/* enemies */13] = map((function (e) {
            var match = +(e[/* health */1] < 1);
            if (match !== 0) {
              var newrecord = e.slice();
              newrecord[/* deathCountdown */6] = e[/* deathCountdown */6] - dt;
              return newrecord;
            } else {
              return e;
            }
          }), state$13[/* enemies */13]);
    var newrecord$19 = newrecord$18.slice();
    state$2 = fold_left((function (state, enemy) {
            if (enemy[/* deathCountdown */6] <= 0) {
              var match = enemy[/* kind */7];
              if (match !== 3) {
                if (match >= 4) {
                  var newrecord = state.slice();
                  var newrecord$1 = state[/* stats */22].slice();
                  newrecord$1[/* tallEnemiesKilled */2] = state[/* stats */22][/* tallEnemiesKilled */2] + 1 | 0;
                  newrecord[/* stats */22] = newrecord$1;
                  return newrecord;
                } else {
                  var newrecord$2 = state.slice();
                  var newrecord$3 = state[/* stats */22].slice();
                  newrecord$3[/* normalEnemiesKilled */0] = state[/* stats */22][/* normalEnemiesKilled */0] + 1 | 0;
                  newrecord$2[/* stats */22] = newrecord$3;
                  return newrecord$2;
                }
              } else {
                var newrecord$4 = state.slice();
                var newrecord$5 = state[/* stats */22].slice();
                newrecord$5[/* bigEnemiesKilled */1] = state[/* stats */22][/* bigEnemiesKilled */1] + 1 | 0;
                newrecord$4[/* stats */22] = newrecord$5;
                return newrecord$4;
              }
            } else {
              var newrecord$6 = state.slice();
              newrecord$6[/* enemies */13] = /* :: */[
                enemy,
                state[/* enemies */13]
              ];
              return newrecord$6;
            }
          }), (newrecord$19[/* enemies */13] = /* [] */0, newrecord$19), newrecord$18[/* enemies */13]);
  } else {
    state$2 = state$1;
  }
  var state$14;
  if (state$2[/* animatingAchievement */18]) {
    if (state$2[/* animatingAchievementTime */17] - deltaTime(env) <= 0) {
      var newrecord$20 = state$2.slice();
      newrecord$20[/* animatingAchievementTime */17] = 0;
      newrecord$20[/* animatingAchievement */18] = /* None */0;
      state$14 = newrecord$20;
    } else {
      var newrecord$21 = state$2.slice();
      newrecord$21[/* animatingAchievementTime */17] = state$2[/* animatingAchievementTime */17] - deltaTime(env);
      state$14 = newrecord$21;
    }
  } else {
    state$14 = state$2;
  }
  var state$15;
  if (state$14[/* animatingWaveNumberTime */19] > 0) {
    var newrecord$22 = state$14.slice();
    newrecord$22[/* animatingWaveNumberTime */19] = max(0, state$14[/* animatingWaveNumberTime */19] - deltaTime(env));
    state$15 = newrecord$22;
  } else {
    state$15 = state$14;
  }
  pushMatrix(env);
  scale$9(2, 2, env);
  translate$3(-state$15[/* pos */0][/* x */0] + width(env) / (2 * 2), -state$15[/* pos */0][/* y */1] + height(env) / (2 * 2), env);
  for(var y = 0; y <= 9; ++y){
    for(var x = 0; x <= 9; ++x){
      var id = caml_array_get(caml_array_get(grid, y), x);
      var texPos;
      if (id > 2 || id < 0) {
        texPos = /* tuple */[
          1788,
          0
        ];
      } else {
        switch (id) {
          case 0 : 
              texPos = /* tuple */[
                474,
                0
              ];
              break;
          case 1 : 
              texPos = /* tuple */[
                408,
                0
              ];
              break;
          case 2 : 
              texPos = /* tuple */[
                1722,
                0
              ];
              break;
          
        }
      }
      subImagef(state$15[/* mainSpriteSheet */11], /* tuple */[
            x * 63,
            y * 64
          ], 64, 64, texPos, 64, 64, env);
    }
  }
  var allThings = map((function (v) {
          return /* Enemy */__(1, [v]);
        }), state$15[/* enemies */13]);
  var allThings_000 = /* Player */__(0, [state$15[/* pos */0]]);
  var allThings$1 = /* :: */[
    allThings_000,
    allThings
  ];
  var allThings$2 = $at(allThings$1, map((function (c) {
              return /* Crate */__(2, [c]);
            }), state$15[/* crates */9]));
  var sortedAllThings = sort((function (thing1, thing2) {
          var pos1;
          switch (thing1.tag | 0) {
            case 0 : 
                pos1 = thing1[0];
                break;
            case 1 : 
                pos1 = thing1[0][/* pos */2];
                break;
            case 2 : 
                pos1 = thing1[0][/* pos */0];
                break;
            
          }
          var pos2;
          switch (thing2.tag | 0) {
            case 0 : 
                pos2 = thing2[0];
                break;
            case 1 : 
                pos2 = thing2[0][/* pos */2];
                break;
            case 2 : 
                pos2 = thing2[0][/* pos */0];
                break;
            
          }
          if (pos1[/* y */1] > pos2[/* y */1]) {
            return 1;
          } else if (pos1[/* y */1] < pos2[/* y */1]) {
            return -1;
          } else {
            return 0;
          }
        }), allThings$2);
  iter((function (param) {
          var pos = param[/* pos */0];
          fill$4(black, env);
          return rectf(/* tuple */[
                      pos[/* x */0],
                      pos[/* y */1]
                    ], 5, 5, env);
        }), state$15[/* playerBullets */7]);
  iter((function (thing) {
          switch (thing.tag | 0) {
            case 0 : 
                var p = thing[0];
                var texPos = state$15[/* moving */3] ? (
                    (state$15[/* stats */22][/* stepTaken */5] / 20 | 0) % 2 === 1 ? /* tuple */[
                        128,
                        0
                      ] : /* tuple */[
                        224,
                        0
                      ]
                  ) : /* tuple */[
                    180,
                    0
                  ];
                if (state$15[/* invulnCountdown */6] > 0) {
                  tint(color(200, 100, 100, Math.sin(state$15[/* invulnCountdown */6] * 10) * 100 + 155 | 0), env);
                }
                if (state$15[/* facingLeft */2]) {
                  subImagef(state$15[/* mainSpriteSheet */11], /* tuple */[
                        p[/* x */0] - 20,
                        p[/* y */1] - 32
                      ], 40, 64, texPos, 40, 64, env);
                } else {
                  subImagef(state$15[/* mainSpriteSheet */11], /* tuple */[
                        p[/* x */0] + 26,
                        p[/* y */1] - 32
                      ], -40, 64, texPos, 40, 64, env);
                }
                return noTint(env);
            case 1 : 
                var enemy = thing[0];
                if (enemy[/* pos */2][/* x */0] > -30 && enemy[/* pos */2][/* x */0] < mapSizePx + 30 && enemy[/* pos */2][/* y */1] > -30 && enemy[/* pos */2][/* y */1] < mapSizePx + 30) {
                  var animList = enemyTexPos(enemy[/* kind */7], +(enemy[/* health */1] < 1));
                  var animLen = length(animList);
                  var texPos$1 = nth(animList, mod_(state$15[/* elapsedTime */16] / 0.2 | 0, animLen));
                  var match = enemy[/* kind */7];
                  var match$1 = match >= 4 ? /* tuple */[
                      2,
                      -5
                    ] : /* tuple */[
                      -5,
                      0
                    ];
                  if (enemy[/* health */1] < 1) {
                    tint(color(255, 255, 255, enemy[/* deathCountdown */6] / 1.0 * 255 | 0), env);
                  }
                  if (enemy[/* pos */2][/* x */0] > state$15[/* pos */0][/* x */0] || enemy[/* health */1] < 1) {
                    subImagef(state$15[/* mainSpriteSheet */11], /* tuple */[
                          enemy[/* pos */2][/* x */0] - 25,
                          enemy[/* pos */2][/* y */1] - 32
                        ], 46, 64, texPos$1, 46, 64, env);
                  } else {
                    subImagef(state$15[/* mainSpriteSheet */11], /* tuple */[
                          enemy[/* pos */2][/* x */0] - 23 + 45,
                          enemy[/* pos */2][/* y */1] - 32
                        ], -46, 64, texPos$1, 46, 64, env);
                  }
                  if (enemy[/* health */1] >= 1) {
                    drawHealthBar(enemy[/* pos */2][/* x */0] + 5 + match$1[0], enemy[/* pos */2][/* y */1] - 35 + match$1[1], 5, 40, enemy[/* health */1], enemy[/* maxHealth */0], red, /* None */0, env);
                  }
                  return noTint(env);
                } else {
                  return 0;
                }
            case 2 : 
                var crate = thing[0];
                subImagef(state$15[/* mainSpriteSheet */11], /* tuple */[
                      crate[/* pos */0][/* x */0] - 20,
                      crate[/* pos */0][/* y */1] - 20
                    ], 40, 40, /* tuple */[
                      1590,
                      0
                    ], 64, 64, env);
                var yOffset = Math.sin(state$15[/* elapsedTime */16] * 2) * 2 - 17;
                fill$4(white, env);
                trianglef(/* tuple */[
                      crate[/* pos */0][/* x */0] - 5,
                      crate[/* pos */0][/* y */1] + 9.5 + yOffset
                    ], /* tuple */[
                      crate[/* pos */0][/* x */0] + 5,
                      crate[/* pos */0][/* y */1] + 9.5 + yOffset
                    ], /* tuple */[
                      crate[/* pos */0][/* x */0],
                      crate[/* pos */0][/* y */1] + 17 + yOffset
                    ], env);
                fill$4(color(150, 120, 10, 255), env);
                trianglef(/* tuple */[
                      crate[/* pos */0][/* x */0] - 4,
                      crate[/* pos */0][/* y */1] + 10 + yOffset
                    ], /* tuple */[
                      crate[/* pos */0][/* x */0] + 4,
                      crate[/* pos */0][/* y */1] + 10 + yOffset
                    ], /* tuple */[
                      crate[/* pos */0][/* x */0],
                      crate[/* pos */0][/* y */1] + 16 + yOffset
                    ], env);
                return subImagef(state$15[/* mainSpriteSheet */11], /* tuple */[
                            crate[/* pos */0][/* x */0] - 16,
                            crate[/* pos */0][/* y */1] - 16 + yOffset
                          ], 32, 32, gunTexPos(crate[/* kind */1]), 64, 64, env);
            
          }
        }), sortedAllThings);
  drawForest(state$15, env);
  popMatrix(env);
  var length$$1 = length(state$15[/* guns */1]);
  drawHealthBar(160, 35, 30, 250, state$15[/* health */5], 50, color(220, 0, 0, 255), /* Some */[5], env);
  if (length$$1 !== 0) {
    if (length$$1 !== 1) {
      var startX = (width(env) - 50 | 0) / 2 | 0;
      var t = state$15[/* animatingWaveNumberTime */19];
      var match$7 = t > 1.0 ? /* tuple */[
          startX,
          200
        ] : /* tuple */[
          remapf(t, 0, 1.0, 50, startX),
          remapf(t, 0, 1.0, 70, 200)
        ];
      text(state$15[/* mainFont */10], _1(sprintf(/* Format */[
                    /* String_literal */__(11, [
                        "Wave ",
                        /* Int */__(4, [
                            /* Int_d */0,
                            /* No_padding */0,
                            /* No_precision */0,
                            /* End_of_format */0
                          ])
                      ]),
                    "Wave %d"
                  ]), state$15[/* waveNum */14]), /* tuple */[
            match$7[0] | 0,
            match$7[1] | 0
          ], env);
      if (t <= 0) {
        text(state$15[/* mainFont */10], _1(sprintf(/* Format */[
                      /* String_literal */__(11, [
                          "Next wave in ",
                          /* Int */__(4, [
                              /* Int_d */0,
                              /* No_padding */0,
                              /* No_precision */0,
                              /* End_of_format */0
                            ])
                        ]),
                      "Next wave in %d"
                    ]), state$15[/* nextWaveCountdown */15] | 0), /* tuple */[
              50,
              100
            ], env);
      }
      
    } else {
      text(state$15[/* mainFont */10], sprintf(/* Format */[
                /* String_literal */__(11, [
                    "Use your new gun on the zombie!",
                    /* End_of_format */0
                  ]),
                "Use your new gun on the zombie!"
              ]), /* tuple */[
            50,
            120
          ], env);
    }
  } else {
    text(state$15[/* mainFont */10], sprintf(/* Format */[
              /* String_literal */__(11, [
                  "Run away from the zombie!",
                  /* End_of_format */0
                ]),
              "Run away from the zombie!"
            ]), /* tuple */[
          50,
          120
        ], env);
  }
  var boundsTopLeft = /* float array */[
    16,
    16
  ];
  var boundsBottomRight = /* float array */[
    width(env) - 16,
    height(env) - 16
  ];
  var width$$1 = boundsBottomRight[/* x */0] - boundsTopLeft[/* x */0];
  var height$$1 = boundsBottomRight[/* y */1] - boundsTopLeft[/* y */1];
  var numX = Math.floor(width$$1 / 90);
  var numY = Math.floor(height$$1 / 90);
  var diffX = width$$1 - numX * 90;
  var diffY = height$$1 - numY * 90;
  var squareSizeX = 90 + diffX / numX;
  var squareSizeY = 90 + diffY / numY;
  var boundsTopLeft$1 = /* float array */[
    16,
    16 + squareSizeY
  ];
  var boundsBottomRight$1 = /* float array */[
    boundsBottomRight[/* x */0] - squareSizeX,
    boundsBottomRight[/* y */1]
  ];
  var getNextGunIterator = function (acc) {
    var x = acc[/* pos */1][/* x */0];
    var y = acc[/* pos */1][/* y */1];
    var match = acc[/* direction */4];
    var match$1 = match[/* x */0];
    var match$2;
    var exit$$1 = 0;
    if (match$1 !== -1) {
      if (match$1 !== 0.0) {
        if (match$1 !== 1) {
          exit$$1 = 1;
        } else if (match[/* y */1] !== 0) {
          exit$$1 = 1;
        } else if (x + squareSizeX > acc[/* boundsBottomRight */3][/* x */0]) {
          var init$$1 = acc[/* boundsBottomRight */3];
          match$2 = /* tuple */[
            /* float array */[
              0,
              1.0
            ],
            /* float array */[
              acc[/* boundsBottomRight */3][/* x */0] - squareSizeX,
              init$$1[/* y */1]
            ],
            acc[/* boundsTopLeft */2]
          ];
        } else {
          exit$$1 = 1;
        }
      } else {
        var match$3 = match[/* y */1];
        if (match$3 !== -1.0) {
          if (match$3 !== 1.0) {
            exit$$1 = 1;
          } else if (y + squareSizeY + 10 > acc[/* boundsBottomRight */3][/* y */1]) {
            var init$1 = acc[/* boundsBottomRight */3];
            match$2 = /* tuple */[
              /* float array */[
                -1,
                0.0
              ],
              /* float array */[
                init$1[/* x */0],
                acc[/* boundsBottomRight */3][/* y */1] - squareSizeY
              ],
              acc[/* boundsTopLeft */2]
            ];
          } else {
            exit$$1 = 1;
          }
        } else if (y - squareSizeY < acc[/* boundsTopLeft */2][/* y */1]) {
          var init$2$$1 = acc[/* boundsTopLeft */2];
          match$2 = /* tuple */[
            /* float array */[
              1,
              0
            ],
            acc[/* boundsBottomRight */3],
            /* float array */[
              init$2$$1[/* x */0],
              acc[/* boundsTopLeft */2][/* y */1] + squareSizeY
            ]
          ];
        } else {
          exit$$1 = 1;
        }
      }
    } else if (match[/* y */1] !== 0.0) {
      exit$$1 = 1;
    } else if (x - squareSizeX + 10 < acc[/* boundsTopLeft */2][/* x */0]) {
      var init$3$$1 = acc[/* boundsTopLeft */2];
      match$2 = /* tuple */[
        /* float array */[
          0.0,
          -1.0
        ],
        acc[/* boundsBottomRight */3],
        /* float array */[
          acc[/* boundsTopLeft */2][/* x */0] + squareSizeX,
          init$3$$1[/* y */1]
        ]
      ];
    } else {
      exit$$1 = 1;
    }
    if (exit$$1 === 1) {
      match$2 = /* tuple */[
        acc[/* direction */4],
        acc[/* boundsBottomRight */3],
        acc[/* boundsTopLeft */2]
      ];
    }
    var newDirection = match$2[0];
    return /* record */[
            /* i */acc[/* i */0],
            /* pos : float array */[
              x + newDirection[/* x */0] * squareSizeX,
              y + newDirection[/* y */1] * squareSizeY
            ],
            /* boundsTopLeft */match$2[2],
            /* boundsBottomRight */match$2[1],
            /* direction */newDirection
          ];
  };
  var gunsLength = length(state$15[/* guns */1]);
  var lastGunIterator = fold_left((function (acc, gun) {
          var i = acc[/* i */0];
          if (state$15[/* animatingAchievement */18] === /* None */0 || i < (gunsLength - 1 | 0)) {
            var match = acc[/* pos */1];
            var centeredX = match[/* x */0] + squareSizeX / 2 - 40;
            var centeredY = match[/* y */1] + squareSizeY / 2 - 40;
            if (((length$$1 - i | 0) - 1 | 0) === state$15[/* equippedGun */4]) {
              fill$4(color(255, 255, 0, 255), env);
              rectf(/* tuple */[
                    centeredX,
                    centeredY
                  ], 80, 80, env);
            }
            fill$4(gun[/* color */4], env);
            rectf(/* tuple */[
                  centeredX + 5,
                  centeredY + 5
                ], 70, 70, env);
            subImagef(state$15[/* mainSpriteSheet */11], /* tuple */[
                  centeredX + 10,
                  centeredY
                ], 64, 64, gunTexPos(gun[/* kind */7]), 64, 64, env);
            drawKey(centeredX + 10, centeredY + 22, gun, state$15, env);
            drawHealthBar(centeredX + 5 + 35, centeredY + 64, 11, 70, gun[/* ammunition */2], gun[/* maxAmmunition */3], color(220, 220, 0, 255), /* Some */[0], env);
            var newAcc = getNextGunIterator(acc);
            return /* record */[
                    /* i */i + 1 | 0,
                    /* pos */newAcc[/* pos */1],
                    /* boundsTopLeft */newAcc[/* boundsTopLeft */2],
                    /* boundsBottomRight */newAcc[/* boundsBottomRight */3],
                    /* direction */newAcc[/* direction */4]
                  ];
          } else {
            return acc;
          }
        }), /* record */[
        /* i */0,
        /* pos : float array */[
          16 + squareSizeX * 3,
          16
        ],
        /* boundsTopLeft */boundsTopLeft$1,
        /* boundsBottomRight */boundsBottomRight$1,
        /* direction : float array */[
          1,
          0
        ]
      ], rev(state$15[/* guns */1]));
  var match$8 = state$15[/* animatingAchievement */18];
  var state$16;
  if (match$8) {
    var state$17 = handleGunSwitching(state$15, state$15[/* guns */1], 0, env);
    var x$1 = width(env) / 2;
    var y$1 = height(env) / 2;
    var t$1 = state$17[/* animatingAchievementTime */17];
    var match$9;
    if (state$17[/* animatingAchievementTime */17] > 2.8) {
      var width$1 = remapf(t$1, 2.8, 3.2, 550, 550 - 100);
      var height$1 = remapf(t$1, 2.8, 3.2, 300, 300 - 100);
      var opacity = remapf(t$1, 2.8, 3.2, 255, 155) | 0;
      match$9 = /* tuple */[
        width$1,
        height$1,
        opacity,
        opacity
      ];
    } else if (t$1 > 1) {
      match$9 = /* tuple */[
        550,
        300,
        255,
        255
      ];
    } else {
      var opacity$1 = remapf(t$1, 0, 1, 0, 255) | 0;
      match$9 = /* tuple */[
        550,
        300,
        opacity$1,
        255
      ];
    }
    var opacity$2 = match$9[2];
    var height$2 = match$9[1];
    var width$2 = match$9[0];
    fill$4(color(70, 70, 20, opacity$2), env);
    stroke(color(30, 30, 20, opacity$2), env);
    rectf(/* tuple */[
          x$1 - width$2 / 2,
          y$1 - height$2 / 2
        ], width$2, height$2, env);
    var gun = hd(state$17[/* guns */1]);
    var match$10 = gun[/* rank */8];
    var kindName;
    switch (match$10) {
      case 0 : 
          kindName = "POOR";
          break;
      case 1 : 
          kindName = "COMMON";
          break;
      case 2 : 
          kindName = "RARE";
          break;
      case 3 : 
          kindName = "EPIC";
          break;
      case 4 : 
          kindName = "LEGENDARY";
          break;
      
    }
    tint(color(255, 255, 255, opacity$2), env);
    text(state$17[/* mainFont */10], sprintf(/* Format */[
              /* String_literal */__(11, [
                  "Unlocked achievement",
                  /* End_of_format */0
                ]),
              "Unlocked achievement"
            ]), /* tuple */[
          x$1 - 130 | 0,
          y$1 - 130 | 0
        ], env);
    tint(color(gun[/* color */4][/* r */0] * 255 | 0, gun[/* color */4][/* g */1] * 255 | 0, gun[/* color */4][/* b */2] * 255 | 0, opacity$2), env);
    text(state$17[/* mainFont */10], _1(sprintf(/* Format */[
                  /* String_literal */__(11, [
                      "Quality: ",
                      /* String */__(2, [
                          /* No_padding */0,
                          /* End_of_format */0
                        ])
                    ]),
                  "Quality: %s"
                ]), kindName), /* tuple */[
          x$1 - 95 | 0,
          y$1 - 100 | 0
        ], env);
    tint(color(255, 255, 255, opacity$2), env);
    var startX$1 = x$1 - (128 + 12) / 2;
    var startY = y$1 - 50;
    text(state$17[/* mainFont */10], match$8[0][/* message */2], /* tuple */[
          x$1 - width$2 / 2 + 20 | 0,
          y$1 + 100 | 0
        ], env);
    var endX = lastGunIterator[/* pos */1][/* x */0] + squareSizeX / 2 - 40;
    var endY = lastGunIterator[/* pos */1][/* y */1] + squareSizeY / 2 - 40;
    var centeredX = t$1 > 2.8 || t$1 > 1 ? startX$1 : remapf(t$1, 0, 1, endX, startX$1);
    var match$11 = t$1 > 2.8 ? /* tuple */[
        startY,
        128
      ] : (
        t$1 > 1 ? /* tuple */[
            startY,
            128
          ] : /* tuple */[
            remapf(t$1, 0, 1, endY, startY),
            remapf(t$1, 0, 1, 64, 128)
          ]
      );
    var gunSize = match$11[1];
    var centeredY = match$11[0];
    noStroke(env);
    if (!state$17[/* equippedGun */4]) {
      fill$4(color(255, 255, 0, 255), env);
      rectf(/* tuple */[
            centeredX,
            centeredY
          ], gunSize + 16, gunSize + 16, env);
    }
    fill$4(gun[/* color */4], env);
    rectf(/* tuple */[
          centeredX + 5,
          centeredY + 5
        ], gunSize + 6, gunSize + 6, env);
    tint(color(255, 255, 255, match$9[3]), env);
    subImagef(state$17[/* mainSpriteSheet */11], /* tuple */[
          centeredX + 10,
          centeredY
        ], gunSize, gunSize, gunTexPos(gun[/* kind */7]), 64, 64, env);
    drawKey(centeredX + 10, centeredY + gunSize - 42, gun, state$17, env);
    drawHealthBar(centeredX + 8 + gunSize / 2, centeredY + gunSize, 11, gunSize + 6, gun[/* ammunition */2], gun[/* maxAmmunition */3], color(220, 220, 0, 255), /* Some */[0], env);
    noTint(env);
    var match$12 = +(t$1 > 0.4);
    if (match$12 !== 0) {
      state$16 = state$17;
    } else {
      var newrecord$23 = state$17.slice();
      newrecord$23[/* running */20] = /* true */1;
      state$16 = newrecord$23;
    }
  } else {
    state$16 = state$15;
  }
  if (!state$16[/* running */20] && state$16[/* animatingAchievement */18] === /* None */0) {
    var windowX = (width(env) - 160 | 0) / 2 | 0;
    var windowY = ((height(env) - 100 | 0) / 2 | 0) - 100 | 0;
    fill$4(black, env);
    rect(/* tuple */[
          windowX - 2 | 0,
          windowY - 2 | 0
        ], 164, 104, env);
    fill$4(color(244, 167, 66, 255), env);
    rect(/* tuple */[
          windowX,
          windowY
        ], 160, 100, env);
    text(state$16[/* mainFont */10], "PAUSED", /* tuple */[
          windowX + 38 | 0,
          windowY + 36 | 0
        ], env);
  }
  if (state$16[/* health */5] <= 0 || length(state$16[/* guns */1]) >= 69) {
    fill$4(color(244, 167, 66, 255), env);
    stroke(color(86, 56, 16, 255), env);
    var windowX$1 = (width(env) - 300 | 0) / 2 | 0;
    var windowY$1 = (height(env) - 300 | 0) / 2 | 0;
    rect(/* tuple */[
          windowX$1,
          windowY$1
        ], 300, 300, env);
    if (length(state$16[/* guns */1]) >= 69) {
      tint(color(58, 232, 27, 255), env);
      text(state$16[/* mainFont */10], "Congratulations", /* tuple */[
            windowX$1 + 47 | 0,
            windowY$1 + 20 | 0
          ], env);
      text(state$16[/* mainFont */10], "You Win!", /* tuple */[
            windowX$1 + 95 | 0,
            windowY$1 + 50 | 0
          ], env);
      noTint(env);
    } else {
      tint(color(232, 58, 27, 255), env);
      text(state$16[/* mainFont */10], "Game Over", /* tuple */[
            windowX$1 + 80 | 0,
            windowY$1 + 40 | 0
          ], env);
      noTint(env);
    }
    text(state$16[/* mainFont */10], "You made it to", /* tuple */[
          windowX$1 + 54 | 0,
          windowY$1 + 110 | 0
        ], env);
    text(state$16[/* mainFont */10], _1(sprintf(/* Format */[
                  /* String_literal */__(11, [
                      "wave ",
                      /* Int */__(4, [
                          /* Int_d */0,
                          /* No_padding */0,
                          /* No_precision */0,
                          /* Char_literal */__(12, [
                              /* "!" */33,
                              /* End_of_format */0
                            ])
                        ])
                    ]),
                  "wave %d!"
                ]), state$16[/* waveNum */14]), /* tuple */[
          windowX$1 + 105 | 0,
          windowY$1 + 140 | 0
        ], env);
    var buttonX = windowX$1 + 85 | 0;
    var buttonY = windowY$1 + 200 | 0;
    fill$4(color(101, 198, 55, 255), env);
    stroke(color(86, 56, 16, 255), env);
    rect(/* tuple */[
          buttonX,
          buttonY
        ], 120, 50, env);
    text(state$16[/* mainFont */10], "restart", /* tuple */[
          buttonX + 10 | 0,
          buttonY + 10 | 0
        ], env);
    noStroke(env);
    var match$13 = mouse(env);
    var my = match$13[1];
    var mx = match$13[0];
    if (mousePressed(env) && mx > buttonX && mx < (buttonX + 120 | 0) && my > buttonY && my < (buttonY + 50 | 0)) {
      return /* record */[
              /* pos : float array */[
                400,
                400
              ],
              /* guns : [] */0,
              /* facingLeft : true */1,
              /* moving : false */0,
              /* equippedGun */-1,
              /* health */50,
              /* invulnCountdown */0,
              /* playerBullets : [] */0,
              /* achievements */generateAchievements(/* () */0),
              /* crates : [] */0,
              /* mainFont */state$16[/* mainFont */10],
              /* mainSpriteSheet */state$16[/* mainSpriteSheet */11],
              /* sounds */state$16[/* sounds */12],
              /* enemies : :: */[
                /* record */[
                  /* maxHealth */100,
                  /* health */100,
                  /* pos : float array */[
                    100,
                    250
                  ],
                  /* error : float array */[
                    5,
                    5
                  ],
                  /* speed */70,
                  /* damage */100,
                  /* deathCountdown */1.0,
                  /* kind : Normal1Z */0
                ],
                /* [] */0
              ],
              /* waveNum */0,
              /* nextWaveCountdown */10,
              /* elapsedTime */0,
              /* animatingAchievementTime */0,
              /* animatingAchievement : None */0,
              /* animatingWaveNumberTime */state$16[/* animatingWaveNumberTime */19],
              /* running : true */1,
              /* shiftIcon */state$16[/* shiftIcon */21],
              /* stats : record */[
                /* normalEnemiesKilled */0,
                /* bigEnemiesKilled */0,
                /* tallEnemiesKilled */0,
                /* numberOfBulletsFired */0,
                /* damageDone */0,
                /* stepTaken */0,
                /* numberOfShotgunShots */0,
                /* numberOfWeaponSwaps */0
              ]
            ];
    } else {
      return state$16;
    }
  } else {
    return state$16;
  }
}

run(setup, /* Some */[draw], /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* () */0);

var animatingAchievementMaxTime = 3.2;

var fringePos = 30;

var playerSpeed = 150;

var mapSize = 10;

var bulletSpeed = 400;

var defaultRange = 400;

var scale = 2;

var invulnerabilityTime = 1.0;

var deathCountdown = 1.0;

var backgroundTileGrid = grid;


/* StringMap Not a pure module */

exports.animatingAchievementMaxTime = animatingAchievementMaxTime;
exports.fringePos = fringePos;
exports.playerSpeed = playerSpeed;
exports.mapSize = mapSize;
exports.mapSizePx = mapSizePx;
exports.bulletSpeed = bulletSpeed;
exports.defaultRange = defaultRange;
exports.scale = scale;
exports.directions = directions;
exports.invulnerabilityTime = invulnerabilityTime;
exports.deathCountdown = deathCountdown;
exports.StringMap = StringMap;
exports.enemyTexPos = enemyTexPos;
exports.gunTexPos = gunTexPos;
exports.add = add;
exports.mul = mul;
exports.mulConst = mulConst;
exports.moveBullet = moveBullet;
exports.makeDefaultFire = makeDefaultFire;
exports.makeTripleShotGunFire = makeTripleShotGunFire;
exports.makeSineFire = makeSineFire;
exports.makeLaserFire = makeLaserFire;
exports.makeBurstFire = makeBurstFire;
exports.makeUziFire = makeUziFire;
exports.makeShotgunFire = makeShotgunFire;
exports.generateGun = generateGun;
exports.generateAchievements = generateAchievements;
exports.drawKey = drawKey;
exports.generateWave = generateWave;
exports.drawHealthBar = drawHealthBar;
exports.soundNames = soundNames;
exports.playSound = playSound;
exports.setup = setup;
exports.drawForest = drawForest;
exports.backgroundTileGrid = backgroundTileGrid;
exports.checkOffset = checkOffset;
exports.handleGunSwitching = handleGunSwitching;
exports.draw = draw;

return exports;

}({}));
