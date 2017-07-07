import {styled} from 'styletron-react';

export const Flex = styled('div', ({style}) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...style,
}));
