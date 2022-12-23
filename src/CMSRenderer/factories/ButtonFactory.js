import { Button } from 'antd';
// buttons: [
//     {
//       id: 'btn1',
//       text: 'button 1 text',
//       setOnClick: { action: 'scrollTo', target: 'row2' },
//     },
//     {
//       id: 'btn2',
//       text: 'button 2',
//       setOnClick: { action: 'goTo', target: 'https://www.google.com' },
//     },
//   ],
function ButtonFactory({ id, text, setOnClick }) {
  const handleClick = () => {
    switch (setOnClick.action) {
      case 'scrollTo':
        //smooth scroll to target
        document.getElementById(setOnClick.target).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        break;
      case 'goTo':
        window.location.href = setOnClick.target;
        break;
      default:
        break;
    }
  };

  return (
    <Button type='primary' size='large' block onClick={handleClick}>
      {text}
    </Button>
  );
}

export default ButtonFactory;
