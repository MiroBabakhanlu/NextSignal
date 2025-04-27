import { StrictMode } from 'react';
import './App.css';
import ColorContextProvider from './Context/ColorContextProvider';
import ProductContextProvider from './Context/ProductContextProvider';
import UserContextProvider from './Context/UserContextProvider';
import WebApp from './WebApp';
import ShippingContextProvider from './Context/ShippingCotextProvider';

function App() {
  return (
    <div className="App">
      {/* <StrictMode> */}
        <UserContextProvider>
          <ProductContextProvider>
            <ShippingContextProvider>
              <ColorContextProvider>
                <WebApp />
              </ColorContextProvider>
            </ShippingContextProvider>
          </ProductContextProvider>
        </UserContextProvider>
      {/* </StrictMode> */}
    </div>
  );
}

export default App;
