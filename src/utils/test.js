export function extractStyle(renderHookResult, name) {
  if (!renderHookResult || !renderHookResult.current) {
    return;
  }
  return renderHookResult.current.elementCollection[renderHookResult.current.targetId][name]
}
