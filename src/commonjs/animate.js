export function scrollToView(el, site, speed) {
  let id = null;
  function move() {
    el.scrollTop -= speed;
    let elScrollTop = el.scrollTop;
    if (elScrollTop > site) {
      id = window.requestAnimationFrame(move);
    } else {
      window.cancelAnimationFrame(id);
    }
  }
  window.requestAnimationFrame(move);
}

export function scrollTab(el, onEl) {
  let initialWidth = document.body.clientWidth;
  let onElement = onEl;
  if (!onElement) {
    return false;
  }
  let nextElement = onElement.nextSibling;
  let lastElement = onElement.previousSibling;
  let nextElementWidth = 0;
  let lastElementWidth = 0;
  let nextOnBoxRight = 0;
  let lastOnBoxLeft = 0;
  if (nextElement) {
    nextElementWidth = nextElement.getBoundingClientRect().width;
    nextOnBoxRight = nextElement.getBoundingClientRect().right;
  }
  if (lastElement) {
    lastElementWidth = lastElement.getBoundingClientRect().width;
    lastOnBoxLeft = lastElement.getBoundingClientRect().left;
  }
  let onBoxRight = onElement.getBoundingClientRect().right;
  let onBoxLeft = onElement.getBoundingClientRect().left;
  let contentTitle = el;
  let contentTitleChild = contentTitle.childNodes[0];
  let initialLeft = window.getComputedStyle(contentTitleChild, null).marginLeft;
  let startLeft = contentTitle.scrollLeft;
  if (onBoxRight > initialWidth) {
    console.log(1);
    let Difference = onBoxRight - initialWidth;
    contentTitle.scrollLeft =
      startLeft +
      (Difference + parseInt(initialLeft)) +
      parseInt(nextElementWidth);
  } else if (nextOnBoxRight > initialWidth) {
    console.log(2);
    let Difference = nextOnBoxRight - initialWidth;
    contentTitle.scrollLeft = startLeft + (Difference + parseInt(initialLeft));
  } else if (lastOnBoxLeft < 0) {
    console.log(3);
    contentTitle.scrollLeft = startLeft + lastOnBoxLeft - parseInt(initialLeft);
  } else if (onBoxRight <= 0 || parseInt(onBoxLeft) <= 0) {
    console.log(4);
    contentTitle.scrollLeft =
      startLeft +
      (onBoxLeft - parseInt(initialLeft)) -
      parseInt(lastElementWidth);
  }
}
