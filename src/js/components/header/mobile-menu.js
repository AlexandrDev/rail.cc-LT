import Collapse from 'bootstrap/js/dist/collapse';

let hamburger = document.getElementsByClassName('hamburger')[0];

hamburger.addEventListener(clickEvent, () => {
  hamburger.classList.toggle('hamburger_is-open')
  document.body.classList.toggle('main-menu-is-open')
})


let menuParents = document.querySelectorAll('.main-menu__item_parent');

[...menuParents].forEach(parent => {
  let link = parent.querySelector('[data-bs-target]'),
    submenu = parent.querySelector('.collapse');

  if (link && submenu) {
    setMenuCollapse(link, submenu)

    window.addEventListener('resize', () => {
      setMenuCollapse(link, submenu)
    }, true);

    submenu.addEventListener('hide.bs.collapse', event => {
      link.classList.add('collapsed')
    })
  }
})

function setMenuCollapse(link, submenu) {
  let collapseInstance = Collapse.getInstance(submenu);

  if (isMobile()) {
    init()
  } else {
    destroy()
  }

  function init() {
    if (!collapseInstance) {
      collapseInstance = new Collapse(submenu, {toggle: false})

      link.classList.add('collapsed')
      collapseInstance.hide()

      link.onclick = (e) => {
        e.preventDefault()

        link.classList.toggle('collapsed')
        collapseInstance.toggle()
      }
    }
  }

  function destroy() {
    if (collapseInstance) {
      collapseInstance.dispose()

      link.onclick = (e) => {
        e || window.event;
      }
    }
  }
}
