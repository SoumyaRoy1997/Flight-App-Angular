import { trigger, style, state, transition, keyframes, animate } from '@angular/animations';

export const animation = [
    trigger('rotateAdd', [
        state(
          'initial',
          style(
            {cursor: 'pointer', color: 'blue'
          })),
        state(
          'rotated',
          style({
            cursor: 'pointer', color: 'blue', animation: 'rotation'
        })),
        transition(
          'initial <=> rotated',
          animate(2000,
          keyframes([
            style({
              transform: 'rotate(90deg)',
              offset: 0
            }),
            style({
              transform: 'rotate(180deg)',
              offset: 0.3
            }),
            style({
              transform: 'rotate(2700deg)',
              offset: 0.6
            }),
            style({
              transform: 'rotate(360deg)',
              offset: 1
            })
          ])
          )),
      ]),
      trigger('list1', [
        state('in', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
        transition('void => *', [
          style({
            opacity: 0,
            transform: 'translateX(-100px)'
          }),
          animate(300)
        ]),
        transition('* => void', [
          animate(300, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ]),
      trigger('list2', [
        state('in', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
        transition('void => *', [
          animate(1000, keyframes([
            style({
              transform: 'translateX(-100px)',
              opacity: 0,
              offset: 0
            }),
            style({
              transform: 'translateX(-50px)',
              opacity: 0.5,
              offset: 0.3
            }),
            style({
              transform: 'translateX(-20px)',
              opacity: 1,
              offset: 0.8
            }),
            style({
              transform: 'translateX(0px)',
              opacity: 1,
              offset: 1
            })
          ]))
        ])
      ])
];
