import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { evalFnOnDevltools, getGlobalModules, getSelectedNodeInfo } from './helpers/evalFns'

type globalModule = {
  name: string,
  requires: string[]
}

function App() {
  const [count, setCount] = useState(0)
  const [globalModules, setGlobalModules] = useState<Array<globalModule>>([]);

  const handleInspect = () => {
    evalFnOnDevltools(getSelectedNodeInfo, (result) => {
      console.log(300, result)
    })
  };

  const inspectGlobalServices = () => {
    evalFnOnDevltools(getGlobalModules, (result) => {
      setGlobalModules(result as Array<globalModule>);
    })
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + TypeScript</h1>
      <div className="card">
        <div>{globalModules.map(module => {
          return (
            <div key={module.name}>
              {module.name} Requires: {module.requires.length}
            </div>
          )
        })}</div>
        <button onClick={handleInspect}>
          Inspect
        </button>
        <button onClick={inspectGlobalServices}>
          GlobalServices
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
