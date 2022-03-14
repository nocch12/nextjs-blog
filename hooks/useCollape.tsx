import { Collapse, useDisclosure } from '@chakra-ui/react';
import { ReactElement } from 'react';

const useCollapse = () => {
  const { isOpen, onToggle } = useDisclosure();

  const collapseContent = (el: ReactElement) => {
    return (
      <Collapse in={isOpen} animateOpacity>
        {el}
      </Collapse>
    );
  };

  return {
    isOpen,
    onToggle,
    collapseContent,
  };
};

export default useCollapse;
