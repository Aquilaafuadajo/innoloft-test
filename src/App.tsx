import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SideNav from './components/sideNav';
import { routes } from './configs/routes';
import 'react-quill/dist/quill.snow.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { getConfiguration } from './store/configReducer';

function App() {
  const dispatch = useAppDispatch();
  const { loading, config } = useAppSelector((state) => state.configuration);

  useEffect(() => {
    const fetchConfiguration = () => {
      const action = getConfiguration();
      dispatch(action);
    };
    if (!config) {
      fetchConfiguration();
    }
  }, [config, dispatch]);

  return loading ? (
    <p>loading...</p>
  ) : (
    <div className="w-full bg-off-white">
      <Header color={config?.mainColor as string} />
      <main className="flex w-11/12 mx-auto md:mx-20 pt-16">
        <SideNav />
        <Routes>
          {routes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </main>
    </div>
  );
}

export default App;
