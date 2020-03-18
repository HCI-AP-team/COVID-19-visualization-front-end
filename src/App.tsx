import React from 'react';
import L7 from './graphs/international/L7'
import Homepage from './homepage/Homepage'
import China from './graphs/domestic/China'
import Province from './graphs/domestic/Province'
import City from './graphs/domestic/City'
function App() {
  return (
    <>
    <Homepage/>
    <L7/>
    <China/>
    <Province/>
    <City/>
    </>
  );
}

export default App;
