import React from 'react';

function assignRef<T = any>(ref: React.ForwardedRef<T>, value: T | null) {
  if (typeof ref === 'function') {
    ref(value);
  } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
}

export default assignRef;
