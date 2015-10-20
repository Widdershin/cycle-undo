import {Rx, run} from '@cycle/core';
import {h, makeDOMDriver} from '@cycle/dom';

import Undo from '../src/undo';

function main ({DOM}) {
  const count$ = DOM.select('.add').events('click')
    .map(event => +1)
    .startWith(0)
    .scan((total, change) => total + change);

  const undo$ = DOM.select('.undo').events('click');

  const undo = Undo(count$, undo$);

  return {
    DOM: undo.state$.map(count =>
      h('div', [
        `Count: ${count}`,
        h('button.add', '+'),
        h('button.undo', 'Undo')
      ])
    )
  };
}

run(main, {
  DOM: makeDOMDriver('.app')
});
