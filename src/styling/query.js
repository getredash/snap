export default function restyleQuery() {
  function iterateElements(className, fn) {
    let elements = document.getElementsByClassName(className);
    elements.map(fn);
  }

  function removeByClassName(className) {
    iterateElements(className, (e) => e.remove());
  }

  function toggleClass(className) {
    iterateElements(className, (e) => e.classList.remove(className));
  }

  try {
    removeByClassName('modebar');
    removeByClassName('hidden-print');
    removeByClassName('btn');
    removeByClassName('btn-group');
    const tiles = document.getElementsByClassName('tile');
    if (tiles.length) {
      tiles[0].style.marginBottom = '0px';
    }
    toggleClass('visible-print');
  } catch (err) {
    console.log('error!', err);
  }
}
