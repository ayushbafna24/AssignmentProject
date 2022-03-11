import React, { PureComponent } from 'react';
import { Cell } from './cell';

export class Grid extends PureComponent {
  render() {
    const cells = this.props.list.map((el, id) => <Cell key={id} alive={el} />);
    return (
      <div
        style={{
          width: '500px',
          height: '10px',
          display: 'flex'
        }}
      >
        {cells}
      </div>
    );
  }
}
