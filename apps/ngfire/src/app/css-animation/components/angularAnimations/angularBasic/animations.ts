
import { trigger, state, style, transition, animate} from '@angular/animations';

export const numberEntereState =  trigger('numberEntereeState', [
  state('unselectedNumber', style({
    margin: '0 5px 0 5px',
     border: '1px solid black',
     padding: '5px'

  })),
  state('selectedNumber', style({
    margin: '0 5px 0 5px',
    border: '1px solid black',
    padding: '5px',
    backgroundColor: 'green'
  })),
  transition('unselectedNumber => selectedNumber',
  [
    style({
      border: '4px solid blue',
      padding: '5px'
    }),
    animate(500, style({ backgroundColor: 'red'})),

   // animate(500)
  ] )
])
