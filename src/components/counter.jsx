// import { useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h2>Compteur : {count}</h2>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(0)}>Reset</button>
//     </div>
//   );
// }

// export default Counter;

import { useState } from 'react';

function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <h2>Compteur : {count}</h2>
      <button onClick={() => setCount(count + step)}>+{step}</button>
      <button onClick={() => setCount(count - step)}>-{step}</button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </div>
  );
}

export default Counter;