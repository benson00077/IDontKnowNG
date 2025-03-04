import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function getAngularInfo() {
  //@ts-ignore
  const el = $0; // DevTools-selected element
  console.log(200, el)
  if (!el) return "No element selected.";
  if (!window.angular) console.error("No angular found.")
  const ngEl = window.angular.element(el);
  return {
    scope: ngEl.scope(),
    controller: ngEl.controller(),
    injector: ngEl.injector(),
  };
}

function App() {
  const [count, setCount] = useState(0)
  const [angularInfo, setAngularInfo] = useState<unknown>(null);

  const handleInspect = () => {
    chrome.devtools.inspectedWindow.eval(
      `(${getAngularInfo.toString()})()`,
      (result, isException) => {
        console.log(201, { result, isException })
        if (!isException) {
          setAngularInfo(result);
        }
      }
    );
  };

  console.log(200, chrome.devtools)
  console.log(300, angularInfo)
  // chrome.devtools.panels.create("AngularJS", "", "panel.html", function (panel) {
  //   console.log(300, panel)
  //   console.log("AngularJS DevTools Panel Created!");
  // });

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
        <button onClick={handleInspect}>
          Inspect
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
