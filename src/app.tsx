import * as React from 'react';
import coordinateIcon from '@icons/coordinate.svg';

const App = () => {
  let styleObject = {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${require('@images/border.png')})`,
    backgroundSize: 'cover',
  };
  return (
    <div style={styleObject}>
      <header>
        <h1>Welcome to React</h1>
      </header>
      <p>
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <img src={coordinateIcon}></img>
    </div>
  );
};

export default App;
