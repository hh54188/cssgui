export function extractStyle(renderHookResult, name) {
  if (!renderHookResult || !renderHookResult.current) {
    return;
  }
  return renderHookResult.current.elementCollection[renderHookResult.current.targetId][name]
}

export function extractLatestElementStyle(renderHookResult, name) {
  if (!renderHookResult || !renderHookResult.current) {
    return;
  }
  const allIds = Object.keys(renderHookResult.current.elementCollection)
  return renderHookResult.current.elementCollection[allIds[allIds.length - 1]][name]
}

export function verifyEveryElementStyle(renderHookResult, name, value) {
  if (!renderHookResult || !renderHookResult.current) {
    return;
  }
  const allIds = Object.keys(renderHookResult.current.elementCollection)
  return allIds.every(id => {
    return renderHookResult.current.elementCollection[id][name] === value
  })
}