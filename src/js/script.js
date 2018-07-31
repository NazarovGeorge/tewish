"use strict";
// scrollbar
(function () {

  const ps = new PerfectScrollbar('.catalog', {
    wheelSpeed: 1,
    wheelPropagation: true,
    minScrollbarLength: 165,
    maxScrollbarLength: 165
  });
})();
(function () {
  let gamesItems = document.querySelectorAll(".games__item");
  let filterGame = document.querySelector(".filter-game");
  let filterBots = document.querySelector(".filter-bots");
  let filterPrice = document.querySelector(".filter-price");
  let filterBotsTable = document.querySelector(".filter-bots__drop");
  let filterBotsCells = document.querySelectorAll(".filter-bots__cell");
  let filterResize = document.querySelector(".filter-resize");
  let catalog = document.querySelector(".catalog");
  let allSale = document.querySelector(".all-sale");

  function toggleGames(event) {
    let target = event.target;

    while (!target.classList.contains("games__item")) {
      target = target.parentNode;
    }
    if (!target.classList.contains("active")) {
      gamesItems.forEach(item => {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
          target.classList.add("active");
        }
      });
      if (target.classList.contains("cs-go")) {
        allSale.classList.add("hidden")
      } else {
        allSale.classList.remove("hidden")
      }
    }
  };
  gamesItems.forEach(item => {
    item.addEventListener("click", event => {
      toggleGames(event);
    });
  });
  filterGame.addEventListener("click", event => {
    filterGame.classList.toggle("active")
  });
  filterBots.addEventListener("click", event => {
    let target = event.target;
    if (target.matches(".filter-bots, .filter-bots__text")) {
      filterBots.classList.toggle("active")
    }
  });
  document.addEventListener("click", event => {
    let target = event.target;

    if (filterBots.classList.contains("active")) {
      if (!target.matches(".filter-bots, .filter-bots *")) {
        filterBots.classList.remove("active")
      }
    }
  })
  filterPrice.addEventListener("click", event => {
    let target = event.target;

    while (!target.classList.contains("filter-price")) {
      target = target.parentNode;
    }
    if (target.classList.contains("up")) {
      target.classList.remove("up");
      target.classList.add("down")
    } else {
      target.classList.remove("down");
      target.classList.add("up")
    }
  });
  filterBotsTable.addEventListener("click", event => {
    let target = event.target;

    if (target.classList.contains("filter-bots__all")) {
      event.preventDefault();
      filterBotsCells.forEach(item => {
        item.classList.remove("active")
      })
    } else if (target.matches(".filter-bots__cell, .filter-bots__cell *")) {

      while (!target.classList.contains("filter-bots__cell")) {
        target = target.parentNode;
      }
      target.classList.toggle("active")
    }
  });
  filterResize.addEventListener("click", event => {
    let target = event.target;
    while (!target.classList.contains("filter-resize")) {
      target = target.parentNode;
    };
    if (target.classList.contains("big")) {
      target.classList.remove("big");
      catalog.classList.remove("big");
      target.classList.add("small");
      catalog.classList.add("small")
    } else {
      target.classList.remove("small");
      target.classList.add("big");
      catalog.classList.remove("small");
      catalog.classList.add("big")
    }
  })
})();
//lang
(function () {
  let btnLang = document.querySelector(".lang__current");
  let langList = document.querySelector(".lang__list");
  let options = document.querySelectorAll(".lang__option");

  btnLang.addEventListener("click", event => {
    langList.classList.remove("close")
  });
  options.forEach(item => {
    item.addEventListener("click", event => {
      let target = event.target;

      if (!target.classList.contains("current")) {

        options.forEach(opt => {
          opt.classList.remove("current");
        })
        target.classList.add("current");
        btnLang.textContent = target.textContent;
      }
      langList.classList.add("close")
    })
  });
  document.addEventListener("click", event => {
    let target = event.target;

    if (!langList.classList.contains("close")) {
      if (!target.matches(".lang, .lang *")) {
        langList.classList.add("close")
      }
    }
  })

})();
//loader
(function () {
  let btnReload = document.querySelector(".filter-reload");
  let loader = document.querySelector(".loader");

  btnReload.addEventListener("click", event => {
    loader.classList.remove("hidden");

    setTimeout(() => {
      loader.classList.add("hidden");
    }, 2500)
  })
})();
//scroll to section
(function () {
  let links = document.querySelectorAll(".main-nav__link");
  links.forEach(link => {
    link.addEventListener("click", event => {
      let target = event.target;

      while (!target.classList.contains("main-nav__link")) {
        target = target.parentNode;
      }
      event.preventDefault();
      let obj = document.querySelector(target.getAttribute("href"));
      obj.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    })
  })
})();
//slider
(function () {
  let inputMin = document.querySelector("#inpun-min-id");
  let inputMax = document.querySelector("#inpun-max-id");
  let btnMin = document.querySelector(".slider__btn-min");
  let btnMax = document.querySelector(".slider__btn-max");
  let sliderSteps = document.querySelectorAll(".slider__step");
  let sliderLine = document.querySelector(".slider__line");


  let btnPosition = 5;
  let minPositon = 0;
  let sliderStepWidth = sliderSteps[0].offsetWidth;

  function returnPixelPostions(arr) {
    let newArr = [];
    newArr.push(minPositon)
    arr.forEach((item, i) => {
      let j = i;
      j++;
      let result = (j * item.offsetWidth) - btnPosition;
      if (i === arr.length - 1) {
        result = (j * item.offsetWidth) - btnMin.offsetWidth;
      }
      newArr.push(result)
    })
    return newArr
  }
  let btnSteps = returnPixelPostions(sliderSteps);

  let minValue = 0;
  let maxValue = btnSteps.length - 1;

  btnMin.style.left = btnSteps[1] + "px";
  btnMax.style.left = btnSteps[6] + "px";
  function setInputValue() {
    inputMin.value = pxToNum(btnMin.style.left);
    inputMax.value = pxToNum(btnMax.style.left);
  }
  function sliderStepsZindex() {
    let min = btnMin.style.left;
    let max = btnMax.style.left;

    min = pxToNum(min);
    max = pxToNum(max);

    if (min === minValue && max === minValue) {
      btnMin.style.zIndex = 4;
      btnMax.style.zIndex = 5;
    }
    if (min === maxValue && max === maxValue) {
      btnMax.style.zIndex = 4;
      btnMin.style.zIndex = 5;
    }
    sliderSteps.forEach((item, i) => {
      item.style.zIndex = 0;
      if (i < min || i >= max) {
        item.style.zIndex = 3;
      }
    })
  }
  function pxToNum(elem) {
    btnSteps.forEach((item, i) => {
      if (item == parseInt(elem)) {
        elem = i;
        return
      }
    })
    return elem;
  }

  btnMin.ondragstart = function () {
    return false;
  };
  btnMax.ondragstart = function () {
    return false;
  };

  function movingSlider(btn) {
    let sliderCoords, thumbCoords, shiftX, shiftY;

    btn.onmousedown = function (event) {
      if (event.target.closest(".slider__btn")) {
        startDrag(event.clientX, event.clientY);
        return false;
      }
    }
    function startDrag(startClientX, startClientY) {
      thumbCoords = btn.getBoundingClientRect();
      shiftX = startClientX - thumbCoords.left;
      shiftY = startClientY - thumbCoords.top;

      sliderCoords = sliderLine.getBoundingClientRect();

      document.addEventListener('mousemove', onDocumentMouseMove);
      document.addEventListener('mouseup', onDocumentMouseUp);
    }
    function moveTo(clientX) {
      let newLeft = clientX - shiftX - sliderCoords.left;

      if (btn.classList.contains("slider__btn-max")) {
        if (newLeft < parseInt(btnMin.style.left)) {
          newLeft = parseInt(btnMin.style.left);
        }
      } else {
        if (newLeft < 0) {
          newLeft = 0;
        }
      }
      let rightEdge = sliderLine.offsetWidth - btn.offsetWidth;

      if (btn.classList.contains("slider__btn-min")) {
        if (newLeft > parseInt(btnMax.style.left)) {
          newLeft = parseInt(btnMax.style.left);
        }
      } else {
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
      }
      btnSteps.forEach((item, i) => {
        if (newLeft <= (btnSteps[1] - (sliderStepWidth / 2))) {
          btn.style.left = 0 + "px";
        }
        if (newLeft > (item - (sliderStepWidth / 2)) && newLeft <= (btnSteps[i + 1] - (sliderStepWidth / 2))) {
          btn.style.left = item + "px"
        }
        if (newLeft > (btnSteps[btnSteps.length - 1]) - (sliderStepWidth / 2)) {
          btn.style.left = btnSteps[btnSteps.length - 1] + "px"
        }
      });
      sliderStepsZindex();
      setInputValue();
    }
    function onDocumentMouseMove(e) {
      moveTo(e.clientX);
    }

    function onDocumentMouseUp() {
      endDrag();
    }
    function endDrag() {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };
  };
  movingSlider(btnMin);
  movingSlider(btnMax);


  inputMin.addEventListener("input", event => {

    if (inputMin.value > btnSteps.length - 1) {
      inputMin.value = inputMax.value;
    }
    if (inputMin.value > inputMax.value && inputMax.value.length >= 1) {
      inputMin.value = inputMax.value
    }
    btnSteps.forEach((item, i) => {
      if (inputMin.value == i) {
        btnMin.style.left = item + "px"
      }
      if (inputMin.value.length < 1) {
        btnMin.style.left = btnSteps[0] + "px"
      }
    });
    sliderSteps.forEach((item, i) => {
      item.style.zIndex = 0;
      if ((i < inputMin.value && inputMin.value.length >= 1) || (i >= inputMax.value && inputMax.value.length >= 1)) {
        item.style.zIndex = 3;
      }
    })
  });
  inputMax.addEventListener("input", event => {
    if (inputMax.value > btnSteps.length - 1) {
      inputMax.value = btnSteps.length - 1;
    }
    if (inputMax.value < inputMin.value && inputMax.value.length >= 1) {
      inputMax.value = inputMin.value;
    }
    btnSteps.forEach((item, i) => {
      if (inputMax.value == i) {
        btnMax.style.left = item + "px"
      }
      if (inputMax.value.length < 1) {
        btnMax.style.left = btnSteps[btnSteps.length - 1] + "px"
      }
    });
    sliderSteps.forEach((item, i) => {
      item.style.zIndex = 0;
      if ((i < inputMin.value && inputMin.value.length >= 1) || (i >= inputMax.value && inputMax.value.length >= 1)) {
        item.style.zIndex = 3;
      }
    })
  });
  inputMin.addEventListener("blur", event => {
    if (event.target.value.length < 1) {
      event.target.value = 0;
    }
  });
  inputMax.addEventListener("blur", event => {
    if (event.target.value.length < 1) {
      event.target.value = btnSteps.length - 1;
    }
  });
})();
//counter
(function () {
  function inVisible(el) {
    let coords = el.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;

    let topVisible = coords.top > 0 && coords.top < windowHeight;
    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;
  }
  function counter() {
    let time = 5;
    let values = document.querySelectorAll(".statistics__value")
    if (inVisible(values[0])) {
      values.forEach(item => {
        let i = 1;
        let num = parseInt(item.textContent);
        let step = Math.round(num / (100 * time));
        let int = setInterval(function () {
          if (i <= num) {
            item.textContent = i + " " + "$"
          } else {
            item.textContent = num + " " + "$"
            clearInterval(int);
          }
          i += step;
        }, 1)
      })
      window.removeEventListener("scroll", counter);
    }
  }
  window.addEventListener("scroll", counter)
  counter();
})();
// pop-up
(function () {
  let catalog = document.querySelector(".catalog");
  let popUp = document.querySelector(".pop-up__inner");
  let overlay = document.querySelector(".pop-up");
  let filters = document.querySelector(".filters");
  let parent;

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
  let catalogCoord = getCoords(catalog);

  catalog.addEventListener("click", event => {
    let target = event.target;

    if (target.matches(".product__btn")) {
      parent = target;
      while (!parent.classList.contains("product")) {
        parent = parent.parentNode;
      }
      let parentCoord = getCoords(parent);
      parent.classList.add("hover");
      overlay.classList.remove("hidden");
      popUp.style.top = (parentCoord.top - catalogCoord.top) + parent.offsetHeight + filters.offsetHeight + "px";
      popUp.style.left = (parentCoord.left - catalogCoord.left) + (parent.offsetWidth / 2) + "px";
    }
  })
  document.addEventListener("click", event => {
    let target = event.target;

    if (!overlay.classList.contains("hidden")) {
      if (!target.matches(".pop-up__inner, .pop-up__inner *, .product__btn")) {
        overlay.classList.add("hidden");
        parent.classList.remove("hover")
      }
    }
  })
})();