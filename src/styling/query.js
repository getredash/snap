export default function restyleQuery() {
  function iterateElements(className, fn) {
    const elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; ++i) {
      fn(elements[i]);
    }
  }

  function removeByClassName(className) {
    iterateElements(className, function(e) {
      e.remove();
    });
  }

  function toggleClass(className) {
    iterateElements(className, function(e) {
      e.classList.remove(className);
    });
  }

  removeByClassName('modebar');
  removeByClassName('hidden-print');
  removeByClassName('btn');
  removeByClassName('btn-group');
  const tiles = document.getElementsByClassName('tile');
  if (tiles.length) {
    tiles[0].style.marginBottom = '0px';
  }
  toggleClass('visible-print');
}
