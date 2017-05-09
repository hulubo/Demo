var e = function(selector) {
    return document.querySelector(selector)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}


var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}


//轮播图定时器
var time1 = setInterval(function(){
  var button = e('.next.vertical-center.right')
  button.click()
}, 4000)

var time2 = setInterval(function(){
  var button = e('.shop-next.vertical-center.right')
  button.click()
}, 4000)

var time3 = setInterval(function(){
  var button = e('.content-next.vertical-center.right')
  button.click()
}, 4000)


//轮播图
class Slide {

    constructor() {

    }

    nextIndex(button) {
        var father = button.parentElement
        var slide = father.parentElement
        // 得到图片总数和当前图片下标
        var numberOfImgs = parseInt(slide.dataset.imgs)
        var activeIndex = parseInt(slide.dataset.active)
        // 求出下一张图片的 id
        var offset = parseInt(button.dataset.next)
        var index = (numberOfImgs + activeIndex + offset) % numberOfImgs
        // 设置父节点的 data-active
        slide.dataset.active = index
        return index
    }

    showImage (index,selector) {
        var n = (-100) * (index)
        e(selector).style.transform = `translateX(${n}vw)`
    }

    showIndex(index) {
        var nextSelector = '#id-index-' + String(index)
        // 删除当前图片的 class 给下一张图片加上 class
        var className = 'on'
        removeClassAll(className)
        var cr = e(nextSelector)
        cr.classList.add(className)
    }

}

var headSlide = new Slide()
var shopSlide = new Slide()
var contentSlide = new Slide()


//滚轮组件
var goPage = function(index) {
    index = Number(index)
    if (index >= 0 && index <= 3) {
        e('.home-page-content').style.transform = `translateY(${index*(-100)}vh)`;
        e('.home-page-content').dataset.page = index
    }
    if (index == 3) {
        e('.nextPage').classList.add('hidden')
    } else {
        e('.nextPage').classList.remove('hidden')
    }
}


var bindWheel = function() {
    e('body').addEventListener('mousewheel', function(event){
        var content = e('.home-page-content')
        var index = parseInt(content.dataset.page)
        if (event.deltaY > 0) {
            var newIndex = index + 1
            goPage(newIndex)
        } else {
            var newIndex = index - 1
            goPage(newIndex)
        }
    })
}


var bindEventSlide = function() {
    var selector = '.next'
    bindAll(selector, 'click', function(event) {
        console.log('silde click')
        button = event.target
        var newIndex = headSlide.nextIndex(button)
        headSlide.showImage(newIndex,'.slide')
        headSlide.showIndex(newIndex)
		console.log('newIndex', newIndex)
		if(newIndex == 1){
			clearInterval(time1)
		}
    })
}

var bindEventSlideShop = function () {
    var selector = '.shop-next'
    bindAll(selector, 'click', function(event) {
        console.log('shop click')
        button = event.target
        var newIndex = shopSlide.nextIndex(button)
        shopSlide.showImage(newIndex,'.shop-slide')
        console.log('shop newIndex', newIndex)
        if(newIndex == 4){
            clearInterval(time2)
        }
    })
}

var bindEventSlideContent = function () {
    var selector = '.content-next'
    bindAll(selector, 'click', function(event) {
        console.log('content click')
        button = event.target
        var newIndex = contentSlide.nextIndex(button)
        contentSlide.showImage(newIndex,'.content-slide')
        console.log('content newIndex', newIndex)
        if(newIndex == 4){
            clearInterval(time3)
        }
    })
}

var __main = function() {
    bindEventSlide()
    bindEventSlideShop()
    bindEventSlideContent()
	bindWheel()
}

__main()
