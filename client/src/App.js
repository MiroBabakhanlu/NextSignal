import { StrictMode } from 'react';
import './App.css';
import ColorContextProvider from './Context/ColorContextProvider';
import ProductContextProvider from './Context/ProductContextProvider';
import UserContextProvider from './Context/UserContextProvider';
import WebApp from './WebApp';
import ShippingContextProvider from './Context/ShippingCotextProvider';

//react query 
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient  = new queryClient();
function App() {
  return (
    <div className="App">
      {/* <StrictMode> */}  
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <ProductContextProvider>
            <ShippingContextProvider>
              <ColorContextProvider>
                <WebApp />
              </ColorContextProvider>
            </ShippingContextProvider>
          </ProductContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
      {/* </StrictMode> */}
    </div>
  );
}

export default App;
