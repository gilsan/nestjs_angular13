
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';

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

export const widthState = trigger('linewidth', [
  state('start', style({
    width: '85%',
    height: '1px',
    background: 'red',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
  })),
  state('finish', style({
    width: '200px',
    height: '1px',
    background: '#fff',
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
     })),
  transition('start => finish', animate(3000)),
])


export const barState = trigger('movingBar', [
   state('start', style({
    height: '10px',
    width: '90%',
    borderRadius: '2px',
    background: '#6cff8d',
   })),
   state('finish', style({
    background: '#6cff8d',
    rotate: '270deg',
    top: '200%',
    left: '1000%'

   })),
  transition('start => finish',   animate(3000))
])

export const boxState = trigger('makeCircle', [
   state('circle', style({
    height: '300px',
    borderRadius: '50%'
   })),
   state('hide', style({
     border: 'none'
   })),
   transition('void => circle', [
    animate(4000),
   ]),

])

export const imageState = trigger('rolling', [
    state('start', style({
      transform: 'rotate(0deg) translate(-50%, -50%)',
      transformOrigin: 'center'
    })),
    state('end', style({
      transform: 'rotate(360deg) translate(-50%, -50%)',
      transformOrigin: 'center'
    })),
    transition('start => end', animate(3000))
])

export const movingLeft = trigger('movingleft', [
  state('start', style({
    transform: 'translate(0)'
  })),
  state('end', style({
    transform: 'translate(50%)'
  })),
  transition('start => end', animate(15000))
])

export const movingRight = trigger('movingright', [
  state('start', style({
    transform: 'translate(0)'
  })),
  state('end', style({
    transform: 'translate(-50%)'
  })),

  transition('start => end', animate(15000)),

])
