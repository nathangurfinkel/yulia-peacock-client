import { Button } from 'antd';

function ButtonFactory({ text, action }) {
  return (
    <Button type='primary' size='large' onClick={action}>
      {text}
    </Button>
  );
}

export default ButtonFactory;
