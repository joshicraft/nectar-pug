"use strict";
var assets = {
  sounds: [{
    id: "Chirp",
    key: "chirp",
    volume: 0.5,
    group: "a",
    position: 1,
    template: 'index',
    load: function() {
      media.sound.play('Chirp');
      animate();
    },
    error: function() {
      animate();
    }
  }, {
    id: "Woosh",
    key: "woosh",
    volume: 0.5,
    group: "a",
    template: 'contact',
    position: 1
  }, {
    id: "Click",
    key: "click",
    volume: 0.5,
    group: "a",
    template: 'contact',
    position: 1
  }, {
    id: "Error",
    key: "error",
    template: 'contact',
    volume: 0.5,
    group: "a",
    position: 1
  }, {
    id: "Success",
    key: "success",
    template: 'contact',
    volume: 0.5,
    group: "a",
    position: 1
  }],
  images: []
};

"use strict";
var device = function() {
  return {
    sizes: {
      mobile: {
        SMALL: {
          w: 320,
          h: 530
        },
        MEDIUM: {
          w: 535,
          h: 850
        },
        LARGE: {
          w: 641,
          h: 1030
        }
      },
      tablet: {
        SMALL: {
          w: 770,
          h: 1026
        },
        MEDIUM: {
          w: 800,
          h: 1280
        },
        LARGE: {
          w: 920,
          h: 1380
        }
      }
    },
    touch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
    touch_types: function() {
      if (window.navigator.pointerEnabled) {
        return {
          end: 'pointerup',
          start: 'pointerdown',
          move: 'pointermove',
          enter: 'pointerenter',
          leave: 'pointerleave'
        };
      } else if (window.navigator.msPointerEnabled) {
        return {
          end: 'MSPointerUp',
          start: 'MSPointerDown',
          move: 'MSPointerMove',
          enter: 'MSPointerEnter',
          leave: 'MSPointerLeave'
        };
      } else {
        return {
          end: 'touchend',
          start: 'touchstart',
          move: 'mousemove',
          enter: 'mouseenter',
          leave: 'mouseleave'
        };
      }
    }(),
    click: function() {
      return this.touch ? 'touchend' : 'click';
    },
    is_device: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent),
    o_s: function() {
      var OSName = "Unknown OS";
      if (navigator.appVersion.indexOf("Win") != -1)
        OSName = "Windows";
      if (navigator.appVersion.indexOf("Mac") != -1)
        OSName = "OSX";
      if (navigator.appVersion.indexOf("X11") != -1)
        OSName = "UNIX";
      if (navigator.appVersion.indexOf("Linux") != -1)
        OSName = "Linux";
      if (/Android/i.test(navigator.userAgent))
        OSName = 'Android';
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
        OSName = 'iOS';
      return OSName;
    }(),
    browser: function() {
      var browser = '';
      if (navigator.userAgent.indexOf('Edge/') > -1) {
        browser = 'Edge';
      } else if (navigator.userAgent.indexOf('Chrome') > -1) {
        browser = 'Chrome';
        if (navigator.userAgent.indexOf('SamsungBrowser') > -1) {
          browser = 'Samsung-Browser';
        }
      } else if (!!window.MSInputMethodContext || navigator.userAgent.indexOf('MSIE') > -1) {
        browser = 'MSIE';
      } else if (navigator.userAgent.indexOf('Firefox') > -1) {
        browser = 'Firefox';
      } else if (navigator.userAgent.indexOf('Safari') > -1) {
        browser = 'Safari';
      }
      return browser;
    }(),
    port: function() {
      return window.innerHeight > window.innerWidth;
    },
    land: function() {
      return window.innerHeight < window.innerWidth;
    },
    is_device_size: function(dimensions) {
      if (dimensions === undefined) {
        dimensions = this.sizes.mobile.LARGE;
      }
      console.log(dimensions);
      return (screen.height <= dimensions.h && screen.width <= dimensions.w) || (screen.height <= dimensions.w && screen.height <= dimensions.h);
    },
    hover_support: function() {
      return {
        in: this.touch ? this.touch_types.start : this.touch_types.enter,
        out: this.touch ? this.touch_types.end : this.touch_types.leave
      };
    }
  };
}();

"use strict";
var header_visible = false,
    header_at_top = true;
var check_header_scroll = function(e) {
  if (header_visible) {
    show_menu_items();
  }
};
window.addEventListener("scroll", check_header_scroll);
window.addEventListener("mousewheel", check_header_scroll);
var index_clicks = function() {
  var hover_support = device.hover_support();
  $(".menu-icon").on("click", show_menu_items);
  if (!device.touch) {
    $(".-menu-icon:not(.menu-icon)").on(hover_support.in + " " + hover_support.out, hover_menu_items);
  }
};
var show_menu_icon = function($menu) {
  TweenMax.fromTo($menu || ".menu-icon", 0.288, {left: "-100%"}, {
    autoAlpha: 1,
    left: 0
  });
};
var hover_menu_items = function(e) {
  var $b = $(e.currentTarget),
      on = e.type === device.hover_support().in;
  TweenMax.to($b.children(".-icon-name"), 0.3, {
    left: on ? $b.outerWidth() + 15 : 0,
    autoAlpha: on ? 1 : 0
  });
};
var show_menu_items = function(e) {
  var $b = $(e ? e.currentTarget : ".menu-icon"),
      $icons = $b.siblings().find(".-menu-icon"),
      active = $b.hasClass("__active"),
      dur = 0.3,
      call_back = active ? "onStart" : "onComplete",
      vars = {
        ease: Quart.easeInOut,
        left: active ? "-100%" : 0,
        autoAlpha: 1
      };
  header_visible = !active;
  vars[call_back] = function(e) {
    if (device.touch || e.type != "click") {
      var new_e = e || {},
          h_s = device.hover_support();
      new_e.currentTarget = this.target;
      new_e.type = active ? h_s.out : h_s.in;
      hover_menu_items(new_e);
    }
  };
  vars[call_back + "Params"] = [e];
  $b[active ? "removeClass" : "addClass"]("__active");
  TweenMax.staggerTo($icons, dur, vars, dur / 2);
};

"use strict";
var media = function() {
  var act = {
    process_images: function(asset) {
      asset.load_type = "load";
      asset.type = "html_asset";
      asset.image_asset = true;
      asset.src = (asset.local || (media.PATH + "image/upload/f_auto,q_99/v20000/" + (asset.template || "") + (asset.category || "/product/") + asset.key));
      asset.element = new Image();
    },
    process_videos: function(asset) {
      asset.load_type = "canplaythrough";
      asset.type = "video";
      asset.image_asset = true;
      asset.src = asset.local + asset.id + '.mp4';
      asset.element = document.createElement('video');
    },
    process_sounds: function(asset) {
      asset.sound_asset = true;
      asset.load_type = media.sound.WEB_AUDIO ? null : "canplaythrough";
      asset.type = media.sound.WEB_AUDIO ? 'web_audio' : "html_asset";
      asset.src = (asset.local || media.sound.SOUND_PATH + asset.key) + media.sound.EXTENSION;
    }
  };
  function process_assets(types) {
    var t = types.constructor === Array ? types : [types];
    t.forEach(function(type) {
      assets[type].forEach(function(a) {
        a.position = a.position || 9999;
        act["process_" + type](a);
      });
      order(assets[type]);
    });
  }
  function Asset(settings) {
    var defaults = {
      id: '',
      src: ''
    },
        type = {
          sound: {volume: 1},
          image: {size: {
              width: null,
              height: null
            }}
        };
    $.extend(defaults, settings, settings[type]);
    return defaults;
  }
  function order(batch) {
    batch.sort(function(a, b) {
      return a.position - b.position;
    });
    return batch;
  }
  function group(assets, group, type) {
    return assets.filter(function(a) {
      if (group === 'id') {
        return a[group].indexOf(type) !== -1;
      }
      return a[group] === type;
    });
  }
  return {
    PATH: '/',
    play_video: function(elm) {
      elm[0].play();
    },
    pause_video: function(elm) {
      elm[0].pause();
    },
    get: function(type, id) {
      var items = assets[type],
          i;
      if (!id) {
        return items;
      }
      return items.find(function(item) {
        return item.id === id;
      });
    },
    init: function(group_items, template) {
      process_assets(["sounds", 'images']);
      media.pre_load.chain_load(group(assets['sounds'], group_items, template)).then(function() {});
    }
  };
}();

"use strict";
var pre_load = function() {
  function web_audio_buffered(buffer) {
    this.element = buffer;
    media.pre_load.load_finished({
      data: {asset: this},
      success: buffer
    });
  }
  function web_audio_load(data) {
    media.sound.CONTEXT.decodeAudioData(data.xhr.response, web_audio_buffered.bind(data.asset));
  }
  function load(asset) {
    return new Promise(function(resolve, reject) {
      switch (asset.type) {
        case 'html_asset':
          asset.element['on' + asset.load_type] = function() {
            resolve({asset: asset});
          };
          asset.element['onerror'] = function(error) {
            reject(asset, error);
          };
          asset.element.src = asset.src;
          break;
        case 'web_audio':
          var xhr = new XMLHttpRequest();
          xhr.open("GET", asset.src, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = function(progress) {
            media.sound.CONTEXT.decodeAudioData(xhr.response, function(buffer) {
              if (!buffer) {
                reject(asset, 'FAILED');
              }
              asset.element = buffer;
              resolve({asset: asset});
            });
          };
          xhr.onerror = function(error) {
            reject(asset, error);
          };
          try {
            xhr.send();
          } catch (e) {
            reject(asset, 'FAILED: ' + e);
          }
          break;
        case 'video':
          asset.element['onload'] = function() {
            resolve({asset: asset});
          };
          asset.element['onerror'] = function(error) {
            reject(asset, error);
          };
          asset.element.appendChild(document.createElement('source'));
          asset.element.lastChild.type = "video/mp4";
          asset.element.lastChild.src = asset.src;
        case 'js':
        case 'font':
      }
    }).then(function(data) {
      load_finished({data: data}, "SUCCESS");
    }).catch(function(error) {
      load_finished({data: {asset: error}}, "FAILED: " + error);
    });
  }
  function load_batch(batch, id) {
    var promises = [];
    for (var i = 0; i < batch.length; i++) {
      var asset = batch[i];
      build_asset_info(asset);
      promises.push(load(asset));
    }
    return Promise.all(promises).then(function() {
      console.log('BATCH: ' + id + ' LOADED, at time: ' + Date.now() % 100000);
    });
  }
  function build_asset_url(asset) {
    asset.path = '';
    asset.path += asset.paths.forEach(function(piece) {
      return piece;
    });
    return asset;
  }
  function build_responsive_size(asset) {
    if (!asset.r_size) {
      return;
    }
  }
  function build_asset_info(asset) {
    if (asset.info_generated) {
      return;
    }
    if (asset.image) {
      build_responsive_size(asset);
      build_asset_url(asset);
      asset.src = $.cloudinary.url(asset.src);
    } else {
      asset.volume = asset.volume || 1;
    }
    asset.init_time = Date.now() % 100000;
    asset.generated_info = true;
  }
  function pre_load(batch, call_back, call_back_params) {
    if (batch.loaded) {
      return;
    }
    load_batch(batch, call_back, call_back_params);
  }
  function load_finished(e, type) {
    var asset = e.data.asset,
        batch = e.data.batch;
    if (asset.load)
      asset.load.apply(asset, asset.load_params);
    if (asset.error)
      asset.error.apply(asset, asset.load_params);
    if (asset.inject) {
      $(asset.target).attr('src', asset.src);
    }
    if (asset.load_time_limit && Date.now() % 100000 - asset.init_time > asset.load_time_limit) {}
    console.log('LOAD STATE: ' + type + ", For: " + asset.id + (asset.position != 9999 ? ", Load Position: " + asset.position : "") + (asset.group ? ", Load Group: " + asset.group : "") + (asset.init_time ? ", Initialized at: " + asset.init_time + " and Loaded at: " + Date.now() % 100000 : ""));
  }
  return {
    act: function(type, parameters) {
      if (parameters && parameters.constructor != Array)
        parameters = [parameters];
      return act[type].apply(this, parameters);
    },
    asset_loaded: function(e) {
      load_finished(e, "SUCCESS");
    },
    asset_error: function(e) {
      load_finished(e, "FAILED");
    },
    load_finished: function(e) {
      load_finished(e, e.success ? 'SUCCESS' : 'FAILED');
    },
    load: function(type, call_back, call_back_parameters) {
      pre_load(type.constructor === Array ? type : media.get(type), call_back, call_back_parameters);
    },
    chain_load: function(type, id, resolved) {
      return load_batch(type.constructor === Array ? type : media.get(type), id, resolved);
    },
    init: function() {
      load("images");
      load("sounds");
    }
  };
}();

"use strict";
function check_scroll_event(trigger, scroller) {
  var offset = get_offset(trigger.static_point || trigger.trigger_elm).top,
      opts = trigger.scroll_options || {},
      elm,
      t_p = trigger.trigger_point($(scroller));
  opts.prev_offset = opts.prev_offset || 0;
  trigger.scroll_options = opts;
  if (!opts.triggered && offset < t_p) {
    opts.triggered = true;
    if (trigger.settings.in.func) {
      if (trigger.settings.in.transition)
        trigger.settings.in.transition.totalProgress(1);
      TweenMax.killDelayedCallsTo(media.sound.play);
      trigger.settings.in.transition = trigger.settings.in.func(trigger);
      current_scroll_trigger.in = trigger;
    }
  } else if (opts.triggered && ((trigger.settings.hide_below_fold && offset > window.innerHeight) || (!trigger.settings.hide_below_fold && offset > (t_p + $(trigger.trigger_elm).height()) + (trigger.settings.out.offset || 0)))) {
    opts.triggered = false;
    if (trigger.settings.out.func) {
      if (trigger.settings.out.transition)
        trigger.settings.out.transition.totalProgress(1);
      trigger.settings.out.transition = trigger.settings.out.func(trigger);
      current_scroll_trigger.out = trigger;
    }
  }
  opts.prev_offset = offset;
}
var scroll_triggers = function(elm) {
  var triggers = [],
      id = elm;
  function fire_scroll_event(event) {
    triggers.forEach(function(trigger) {
      check_scroll_event(trigger, event.currentTarget);
    });
  }
  return {
    update: function(temp) {
      $(ANIMATION_CONFIG.SCROLL_TARGET).off("mousewheel scroll", fire_scroll_event).on("mousewheel scroll", fire_scroll_event);
    },
    remove: function() {
      $(ANIMATION_CONFIG.SCROLL_TARGET).off("mousewheel scroll", fire_scroll_event);
    },
    new_trigger: function(temp, trigger) {
      scroll_triggers.update();
      triggers.push.apply(triggers, trigger);
    }
  };
}(window);
function Trigger($temp, settings) {
  var defaults = {
    id: "blank",
    trigger_elm: $temp.find(".trigger-point-" + "a"),
    scroll_options: {
      offset: 0,
      triggered: false
    },
    trigger_point: function() {
      return window.innerHeight / 2;
    },
    settings: {in: {
        vars: {autoAlpha: 1},
        elm: $temp.find(".trigger-elm-" + "a"),
        dur: 1,
        func: function() {},
        parameters: []
      }}
  };
  return $.extend({}, defaults, settings);
}
var current_scroll_trigger = {click_index: -1};
function get_top_offset(el) {
  if (el instanceof jQuery) {
    el = el[0];
  }
  try {
    return el.getBoundingClientRect().top;
  } catch (err) {
    console.warn("cannot retrieve element for measuring top offset");
    return;
  }
}
function get_offset(el) {
  if (el instanceof jQuery) {
    el = el[0];
  }
  try {
    return el.getBoundingClientRect();
  } catch (err) {
    console.warn("cannot retrieve element for measuring top offset");
    return;
  }
}

"use strict";
var sound = function() {
  var current_sound,
      gain_node,
      scratch_buffer,
      current_theme;
  var AUDIO_ELM = new Audio(),
      CONTEXT = createAudioContext(),
      ANALYSER = CONTEXT ? CONTEXT.createAnalyser() : false;
  function createAudioContext(desiredSampleRate) {
    var AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) {
      return false;
    }
    desiredSampleRate = typeof desiredSampleRate === 'number' ? desiredSampleRate : 44100;
    var context = new AudioCtor();
    context.onstatechange = function() {
      if (context.state === 'suspended') {
        context.resume();
      }
    };
    return context;
  }
  function unlock() {
    if (!CONTEXT) {
      return false;
    }
    scratch_buffer = CONTEXT.createBuffer(1, 1, 22050);
    var unlock = function() {
      var source = CONTEXT.createBufferSource();
      source.buffer = scratch_buffer;
      source.connect(CONTEXT.destination);
      if (typeof source.start === 'undefined') {
        source.noteOn(0);
      } else {
        source.start(0);
      }
      if (typeof CONTEXT.resume === 'function') {
        CONTEXT.resume();
      }
      source.onended = function() {
        source.disconnect(0);
        document.removeEventListener('touchstart', unlock, true);
        document.removeEventListener('touchend', unlock, true);
      };
    };
    document.addEventListener('touchstart', unlock, true);
    document.addEventListener('touchend', unlock, true);
  }
  function play_blank() {
    var buffer = CONTEXT.createBuffer(1, 1, 44100);
    var dummy = CONTEXT.createBufferSource();
    dummy.buffer = buffer;
    dummy.connect(CONTEXT.destination);
    dummy.start(0);
    dummy.disconnect();
  }
  function delay_play(sound, dep, dep_args, volume) {
    if ((dep && dep(dep_args)) || (sound.prevent && sound.prevent())) {
      return;
    }
    if (current_theme && current_theme.isTheme && sound.isTheme) {
      media.sound.stop(current_theme);
    }
    CONTEXT ? play_web_audio(sound, volume) : play_elm_audio(sound, volume);
    current_sound = sound;
    if (sound.isTheme)
      current_theme = sound;
    console.log("SOUND PLAYED: " + sound.id);
  }
  function web_audio_buffered(batch, cold, buffer) {
    this.element = buffer;
    media.pre_load.load_finished({
      data: {
        asset: this,
        batch: batch
      },
      success: buffer
    });
    if (cold) {
      play_web_audio(this);
    }
  }
  function web_audio_load(asset, batch, cold) {
    CONTEXT.decodeAudioData(this.response, web_audio_buffered.bind(asset, batch, cold));
  }
  function load_web_audio(asset, batch, cold) {
    return asset.promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", asset.src, true);
      xhr.responseType = "arraybuffer";
      xhr.onload = function(progress) {
        resolve(this, progress);
      };
      xhr.onerror = function() {
        reject(error);
      };
      xhr.send();
    }).then(function(xhr, progress) {
      CONTEXT.decodeAudioData(xhr.response, web_audio_buffered.bind(asset, batch, cold));
    });
  }
  function stop_elm_audio(data) {
    data.element.pause();
    data.element.currentTime = 0;
  }
  function stop_web_audio(data) {
    data.source[data.source.stop ? "stop" : "noteOff"](0);
  }
  function play_elm_audio(data, volume) {
    data.element.currentTime = 0;
    data.element.volume = 0;
    data.element.play();
  }
  function play_web_audio(data, volume) {
    if (!data) {
      load_web_audio(data, false, true);
      return;
    }
    var source = CONTEXT.createBufferSource();
    source.buffer = data.element;
    if (data.volume) {
      gain_node = CONTEXT.createGain ? CONTEXT.createGain() : CONTEXT.createGainNode();
      source.connect(gain_node);
      gain_node.connect(CONTEXT.destination);
      gain_node.gain.value = data.volume * (volume || 1);
    } else {
      source.connect(CONTEXT.destination);
    }
    source.loop = !!data.loop;
    if (CONTEXT.state === "suspended") {
      CONTEXT.resume();
    }
    source[source.start ? "start" : "noteOn"](0);
    data.source = source;
  }
  unlock();
  return {
    SOUND_PATH: 'sounds/',
    WEB_AUDIO: !!CONTEXT,
    CONTEXT: CONTEXT,
    EXTENSION: !!(AUDIO_ELM.canPlayType && AUDIO_ELM.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, "")) ? ".ogg" : ".mp3",
    play: function(id, del, dep, dep_args, volume) {
      if (id === 'blank') {
        play_blank();
        return;
      }
      var sound = id.key ? id : media.get("sounds", id);
      if (del) {
        TweenMax.delayedCall(del, delay_play, [sound, dep, dep_args, volume]);
      } else {
        delay_play(sound, dep, dep_args, volume);
      }
    },
    stop: function(id) {
      var sound = id.key ? id : media.get("sounds", id);
      CONTEXT ? stop_web_audio(sound) : stop_elm_audio(sound);
      console.log('SOUND STOPPED: ' + id);
    },
    load: function(id, batch) {
      var sound = id.id ? id : media.get("sounds", id);
      if (CONTEXT)
        load_web_audio(sound, batch);
    }
  };
}();

//# sourceMappingURL=transpiled.js.map
