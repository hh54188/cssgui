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
  console.log(allIds, allIds[allIds.length - 1], renderHookResult.current.elementCollection[allIds[allIds.length - 1]])
  return renderHookResult.current.elementCollection[allIds[allIds.length - 1]][name]
}