import { useReducer } from 'react';

const reducer = (value: number) => (value + 1) % 1000000;

/**
 * Hook returns a function, when this function is called component rerenders
 *
 * @see https://mantine.dev/hooks/use-force-update/
 *
 * @example
 * function Demo() {
 *   const forceUpdate = useForceUpdate();
 *
 *   return (
 *     <Group position="center">
 *       <Text>{randomId()}</Text>
 *       <Button onClick={forceUpdate}>Force update</Button>
 *     </Group>
 *   );
 * }
 */
function useForceUpdate(): () => void {
  const [, update] = useReducer(reducer, 0);
  return update;
}

export default useForceUpdate;
