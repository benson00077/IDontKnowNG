
export function evalFnOnDevltools(fn: () => void, cb: (result: unknown) => void) {
  chrome.devtools.inspectedWindow.eval(
    `(${fn.toString()})()`,
    (result, isException) => {
      if (isException) {
        console.info(`Fn ${fn.name} throw exception`, isException);
      } else {
        console.info(`Fn ${fn.name} result: ` + result);
        cb(result)
      }
    }
  );
}

export function getSelectedNodeInfo() {
  const el = $0
  if (!el) return "No element selected.";
  if (!window.angular) console.error("No angular found.")
  const ngEl = angular.element(el);
  const info = {
    scope: ngEl.scope(),
    controller: ngEl.controller(),
  }
  return info
}

export function getGlobalModules() {
  const ngRootNode = document.querySelector('[ng-app="myApp"]')
  if (!ngRootNode) return "No angular app found."
  const modules = angular.element(ngRootNode).injector().modules
  const services = Object.keys(modules).map(key => {
    return {
      name: modules[key].name,
      requires: modules[key].requires
    }
  })
  return services
}
