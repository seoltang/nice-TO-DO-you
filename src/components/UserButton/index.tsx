import { useEffect, useState } from 'react';
import { useAnimate } from 'framer-motion';
import { logOut } from '@utils/googleAuth';
import { AuthButton, Container, ListWrapper, UserImgButton } from './style';
import { useNavigate } from 'react-router-dom';

type UserButtonType = {
  imageURL: string;
};

const UserButton = ({ imageURL }: UserButtonType) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

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
            onClick={() => logOut(navigate)}
            whileHover={{ backgroundColor: 'rgb(255, 255, 255, 1)' }}
            whileTap={{ scale: 0.95 }}
          >
            로그아웃
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
    });
  }, [isOpen]);

  return scope;
}

export default UserButton;
