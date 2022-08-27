
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

export const blinkState = trigger('blink', [
      state('show', style({
        opacity: '1'
      })),
      state('hide', style({
          opacity: '0'
        })),
        transition('* <=> *', animate(1000))
    ]
)

export const widthState = trigger('width', [
  transition('* => *', animate(1000, style({
    width: '85%'
  }))),
  transition('*=> *', animate(1000, style({
    width: '200px'
  })) )
])


export const barState = trigger('movingBar', [



  //  state('end', style({
  //   height: '10px',
  //   width: '90%',
  //   borderRadius: '2px',
  //   background: '#6cff8d',
  //   rotate: '90deg',
  //   top: '200%',
  //   left: '1000%'

  //  })),
  //  transition('void => *', animate(2000) ),
  transition('void => *',   [
    style({
      height: '10px',
      width: '90%',
      borderRadius: '2px',
      background: '#6cff8d',
    }),
    animate(2000)
  ]),
  // transition('void => end',   animate(1000))
])
