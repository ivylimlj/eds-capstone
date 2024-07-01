export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
      const h2 = col.querySelector('h2');
      if (h2) {
        const h2Wrapper = h2.closest('div');
        if (h2Wrapper) {
          h2Wrapper.classList.add('columns-text-col');
        }
      }
    });
  });
}
