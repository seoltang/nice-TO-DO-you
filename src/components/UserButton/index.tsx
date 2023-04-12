import { useEffect, useState } from 'react';
import { AuthButton, Container, ListWrapper, UserImgButton } from './style';
import { useAnimate, stagger } from 'framer-motion';

const staggerMenuItems = stagger(0.1, { startDelay: 0.1 });

type UserButtonType = {
  imageURL: string;
};

const UserButton = ({ imageURL }: UserButtonType) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  const scope = useMenuAnimation(isOpen);

  return (
    <Container ref={scope}>
      <UserImgButton type="image" src={imageURL} onClick={onClick} />
      <ListWrapper isOpen={isOpen}>
        <li>
          <AuthButton
            whileHover={{ backgroundColor: 'rgb(255, 255, 255, 1)' }}
            whileTap={{ scale: 0.95 }}
          >
            로그아웃
          </AuthButton>
        </li>
        <li>
          <AuthButton
            whileHover={{ backgroundColor: 'rgb(255, 255, 255, 1)' }}
            whileTap={{ scale: 0.95 }}
          >
            계정 삭제
          </AuthButton>
        </li>
      </ListWrapper>
    </Container>
  );
};

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'ul',
      {},
      {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      }
    );

    animate('li', isOpen ? { opacity: 1 } : { opacity: 0 }, {
      duration: 0.1,
      delay: isOpen ? staggerMenuItems : 0,
    });
  }, [isOpen]);

  return scope;
}

export default UserButton;
