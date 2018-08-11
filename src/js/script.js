"use strict";
// scrollbar
(function () {
  const ps = new PerfectScrollbar(".catalog", {
    wheelSpeed: 0.5,
    wheelPropagation: true
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

  let btnWidth = Math.ceil(btnMin.offsetWidth / 2);  
  let btnPosition = btnWidth;

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
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  let btnSteps = returnPixelPostions(sliderSteps);

  let minValue = 0;
  let maxValue = btnSteps.length - 1;


  btnMin.style.left = btnSteps[inputMin.value] + "px";
  btnMax.style.left = btnSteps[inputMax.value] + "px";
  sliderStepsZindex();
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
    if (inputMin.value > inputMax.value && inputMax.value.length >= 1 && isNumeric(inputMin.value)) {
      inputMin.value = inputMax.value
    }
    if (inputMin.value.length >= 1 && !isNumeric(inputMin.value)) {
      inputMin.value = btnSteps[0];
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
    if (inputMax.value.length >= 1 && !isNumeric(inputMax.value)) {
      inputMax.value = btnSteps.length - 1;
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
  let popUp = document.querySelector(".pop-up");
  let filters = document.querySelector(".filters");
  let currentCoord;
  let catalogCoord;
  let currentBottomEdge;
  let catalogBottomEdge;
  
  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
  let weaponsQualuty = {
    "bs": "Battle-Scarred",
    "ww": "Well-Worn",
    "ft": "Field-Tested",
    "mw": "Minimal Wear",
    "fn": "Factory New"
  }
  function renderPopUpElements(prod, pop) {
    pop.querySelector(".pop-up__model-quality").textContent = weaponsQualuty[prod.querySelector(".product__quality").textContent];

    if (!prod.classList.contains("block")) {
      pop.querySelector(".pop-up__block").style.display = "none"
    }
    else {
      pop.querySelector(".pop-up__block").style.display = "block"
    }
    if (!prod.querySelector(".product__time")) {
      pop.querySelector(".pop-up__time").style.display = "none"
    }
    else {
      pop.querySelector(".pop-up__time").style.display = "block";
      pop.querySelector(".pop-up__time").textContent = prod.querySelector(".product__time").textContent.replace(/:/g, " : ")
    }
    if (!prod.querySelector(".product__stattrack")) {
      pop.querySelector(".pop-up__stattrack").style.display = "none"
    }
    else {
      pop.querySelector(".pop-up__stattrack").style.display = "flex";
    }

    pop.querySelectorAll(".pop-up__sticker").forEach(item => {
      item.remove();
    })
    let fragment = document.createDocumentFragment();
    prod.querySelectorAll(".product__sticker").forEach(item => {
      let clone = item.cloneNode(true);
      clone.classList.remove("product__sticker");
      clone.classList.add("pop-up__sticker")
      fragment.appendChild(clone)
    })
    pop.querySelector(".pop-up__stickers").appendChild(fragment);

  }
  let currentElem = null;
  catalog.addEventListener("mouseover", event => {

    if (currentElem) {
      return;
    }
    var target = event.target;
    if (target.matches(".pop-up, .pop-up *")) return;
    if (!target.closest(".product")) return;
    while (target != this) {
      if (target.classList.contains("product")) break;
      target = target.parentNode;
    }
    if (target == this) return;
    currentElem = target;
    currentCoord = getCoords(target);
    catalogCoord = getCoords(catalog);
    currentBottomEdge = currentCoord.top + target.offsetHeight;
    catalogBottomEdge = catalogCoord.top + catalog.offsetHeight;

    if (currentBottomEdge > catalogBottomEdge) {
      popUp.style.top = (100) + "%";
      popUp.style.left = (currentCoord.left - catalogCoord.left) + (target.offsetWidth / 2) + "px";
    } else {
      popUp.style.top = (currentCoord.top - catalogCoord.top) + (target.offsetHeight) + filters.offsetHeight + "px";
      popUp.style.left = (currentCoord.left - catalogCoord.left) + (target.offsetWidth / 2) + "px";
    }
    renderPopUpElements(target, popUp);
    popUp.classList.remove("hidden");
  });
  catalog.addEventListener("mouseout", event => {
    if (!currentElem) return;
    let relatedTarget = event.relatedTarget;


    if (relatedTarget) {
      while (relatedTarget) {
        if (relatedTarget == currentElem) return;
        relatedTarget = relatedTarget.parentNode;
      }
    }
    currentElem.classList.remove("inspect");
    popUp.classList.add("hidden");
    currentElem = null;
  });
  catalog.addEventListener("contextmenu", event => {

    event.preventDefault();

    if (event.target.matches(".product, .product *")) {
      let parent = event.target;

      while (!parent.classList.contains("product")) {
        parent = parent.parentNode;
      }
      parent.classList.toggle("inspect")
    }
  })
  //perfect-scrollbar event
  catalog.addEventListener("ps-scroll-y", event => {
    popUp.classList.add("hidden");
  })

})();