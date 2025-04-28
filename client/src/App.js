import { StrictMode } from 'react';
import './App.css';
import ColorContextProvider from './Context/ColorContextProvider';
import ProductContextProvider from './Context/ProductContextProvider';
import UserContextProvider from './Context/UserContextProvider';
import WebApp from './WebApp';
import ShippingContextProvider from './Context/ShippingCotextProvider';

//react query 
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 1000 * 60 * 5, 
      staleTime: 1000 * 10, 
      retry: 1, 
      // refetchOnWindowFocus: false, 
      // refetchIntervalInBackground: true, 
    },
    mutations: {
      retry: 1,
    },
  },
});

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
