// /frontend/src/App.jsx

import './App.css'

import AllRoutes from './Pages/AllRoutes';

import { RecoilRoot } from "recoil";

import FlashMessage from './Components/common/FlashMessage';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <FlashMessage />
          <AllRoutes />
        </RecoilRoot>
      </QueryClientProvider>
    </>
  );
}

export default App;
