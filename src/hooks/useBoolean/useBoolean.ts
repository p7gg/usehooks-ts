import { Dispatch, SetStateAction, useState } from 'react';

interface ReturnType {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

/**
 * A simple abstraction to play with a boolean, don't repeat yourself.
 * 
 * @see https://usehooks-ts.com/react-hook/use-boolean
 * 
 * @example
 * export default function Component() {
 *   const { value, setValue, setTrue, setFalse, toggle } = useBoolean(false)
 * 
 *   // Just an example to use "setValue"
 *   const customToggle = () => setValue(x => !x)
 * 
 *   return (
 *     <>
 *       <p>
 *         Value is <code>{value.toString()}</code>
 *       </p>
 *       <button onClick={setTrue}>set true</button>
 *       <button onClick={setFalse}>set false</button>
 *       <button onClick={toggle}>toggle</button>
 *       <button onClick={customToggle}>custom toggle</button>
 *     </>
 *   )
 * }
 */
function useBoolean(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue((x) => !x);

  return { value, setValue, setTrue, setFalse, toggle };
}

export default useBoolean;
