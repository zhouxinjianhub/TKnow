;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-fenxiang" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M787.008 629.888c-69.504 0-130.368 36.224-165.248 90.752L411.456 600.384C425.088 573.76 433.408 544.064 433.408 512c0-19.776-3.712-38.4-9.216-56.448l218.752-125.056c35.904 38.912 86.848 63.68 144 63.68 108.352 0 196.352-87.936 196.352-196.352s-88-196.352-196.352-196.352c-108.48 0-196.352 87.936-196.352 196.352 0 19.776 3.776 38.464 9.152 56.448L380.992 379.264C345.088 340.352 294.144 315.648 237.056 315.648 128.576 315.648 40.64 403.52 40.64 512c0 108.48 87.936 196.352 196.352 196.352 44.8 0 85.568-15.616 118.592-40.768l-0.768 1.344 237.888 136c-0.896 6.976-2.112 13.888-2.112 21.376 0 108.224 87.872 196.224 196.352 196.224 108.352 0 196.352-88 196.352-196.224C983.36 717.76 895.36 629.888 787.008 629.888zM787.008 79.936c65.024 0 117.888 52.8 117.888 117.824 0 65.088-52.864 117.824-117.888 117.824-65.152 0-117.888-52.736-117.888-117.824C669.12 132.736 721.856 79.936 787.008 79.936zM237.056 629.888c-65.088 0-117.76-52.736-117.76-117.888 0-65.088 52.736-117.824 117.76-117.824 65.088 0 117.824 52.736 117.824 117.824C354.88 577.152 302.144 629.888 237.056 629.888zM787.008 944.128c-65.152 0-117.888-52.864-117.888-117.76 0-65.28 52.736-118.016 117.888-118.016 65.024 0 117.888 52.736 117.888 118.016C904.896 891.264 852.032 944.128 787.008 944.128z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-xialakuang" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M848 368c0-26.512-21.488-48-48-48-12.944 0-24.672 5.136-33.312 13.456l-0.016-0.016L511.888 588.224 260.4 336.736C251.6 326.496 238.56 320 224 320c-26.512 0-48 21.488-48 48 0 12.88 5.088 24.576 13.36 33.2l-0.128 0.128 288 288 0.016-0.016C485.984 698.368 498.224 704 511.792 704c0.032 0 0.064 0 0.112 0 0.032 0 0.064 0 0.112 0 13.584 0 25.792-5.632 34.544-14.688l0.016 0.016 288-288-0.016-0.016C842.88 392.688 848 380.944 848 368z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-jiantouyoujiantou" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M723.696401 533.102744c0.486519-0.973037 1.337926-1.824445 1.702815-2.797482 8.514075-17.757928 5.716593-39.651265-9.365483-53.881934L372.30835 151.307281c-18.730966-17.757928-48.28697-16.906521-66.044898 1.824445-17.757928 18.730966-16.906521 48.28697 1.824445 66.044898l308.452785 291.789524L309.304193 807.012709c-18.609336 17.879558-19.095855 47.435562-1.216296 66.044898 9.122224 9.487112 21.406818 14.352298 33.569783 14.352298 11.676446 0 23.352892-4.378667 32.353486-13.136002l340.563012-328.278418c0.608148-0.608148 0.851408-1.581185 1.581185-2.189334 0.486519-0.486519 0.973037-0.851408 1.581185-1.337926C720.53403 539.670745 721.871956 536.265115 723.696401 533.102744L723.696401 533.102744zM723.696401 533.102744"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-xialakuang-copy" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M176 655.999c0 26.512 21.488 48 48 48 12.944 0 24.672-5.136 33.312-13.456l0.016 0.016 254.784-254.784 251.488 251.488c8.8 10.24 21.84 16.736 36.4 16.736 26.512 0 48-21.488 48-48 0-12.881-5.088-24.576-13.36-33.2l0.128-0.128-288.017-287.984c-8.736-9.056-20.976-14.688-34.544-14.688-0.033 0-0.064 0-0.112 0-0.033 0-0.064 0-0.112 0-13.584 0-25.792 5.632-34.544 14.688l-0.016-0.016-287.984 288.017c-8.32 8.624-13.44 20.368-13.44 33.313z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-jiantouyoujiantou1" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M490.897 723.696c0.973 0.486 1.824 1.338 2.797 1.703 17.758 8.514 39.651 5.717 53.882-9.365l325.116-343.725c17.758-18.731 16.907-48.287-1.824-66.045s-48.287-16.907-66.045 1.824l-291.79 308.453-296.047-307.236c-17.881-18.609-47.436-19.096-66.045-1.216-9.487 9.122-14.351 21.407-14.352 33.57 0 11.676 4.378 23.353 13.137 32.353l328.278 340.563c0.608 0.608 1.581 0.851 2.189 1.581 0.487 0.487 0.851 0.973 1.338 1.581 2.797 2.797 6.203 4.135 9.365 5.959v0zM490.897 723.696z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-jiantouyoujiantou2" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M300.304 490.897c-0.486 0.973-1.338 1.824-1.703 2.797-8.514 17.758-5.717 39.651 9.365 53.882l343.725 325.116c18.731 17.758 48.287 16.907 66.045-1.824s16.907-48.287-1.824-66.045l-308.453-291.79 307.236-296.047c18.609-17.881 19.096-47.436 1.216-66.045-9.122-9.487-21.407-14.351-33.57-14.352-11.676 0-23.353 4.378-32.353 13.137l-340.563 328.278c-0.608 0.608-0.851 1.581-1.581 2.189-0.487 0.487-0.973 0.851-1.581 1.338-2.797 2.797-4.135 6.203-5.959 9.365v0zM300.304 490.897z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
