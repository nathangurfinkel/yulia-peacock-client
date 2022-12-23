const layoutMockData = {
  rows: [
    {
      id: 'row1',
      style: {
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      },
      title: 'row1title',
      columnIds: ['col1', 'col2', 'col3'],
    },
    {
      id: 'row2',
      style: {
        // backgroundColor: 'green',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      },

      columnIds: ['col1', 'col2'],
      title: 'Register for a free session',
      //etc
    },
  ],
  columns: [
    {
      id: 'col1',
      style: {
        // backgroundColor: 'blue',
        justifyContent: 'center',
        minHeight: '80vh',
      },

      content: [
        {
          type: 'text',
          id: 'text1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae lacus tristique, pulvinar nisi in, scelerisque tortor. Donec fringilla, lacus ac accumsan placerat, neque mauris imperdiet mauris, a euismod purus nulla vel lectus. Proin porta massa dui, nec gravida augue pulvinar in. Proin viverra accumsan arcu ac ornare. Vestibulum mauris erat, mattis varius aliquet eu, ornare eget magna. Vivamus a mi tellus. Proin tincidunt enim nec venenatis tempor',
        },
        {
          type: 'button',
          id: 'btn1',
          text: 'Scroll To Row 2',
          setOnClick: { action: 'scrollTo', target: 'row2' },
        },
        // {
        //   type: 'form',
        //   id: 'form1',
        // },
      ],

      title: 'col1title',
    },
    {
      id: 'col2',
      style: {
        // padding: '1rem',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '16px',

        //   backgroundColor: 'red',
      },
      content: [
        {
          type: 'text',
          id: 'text2',
          text: 'text 2222 here lorem pupsik',
        },
        {
          type: 'button',
          id: 'btn1',
          text: 'Scroll To Row 2',
          setOnClick: { action: 'scrollTo', target: 'row2' },
        },
      ],
    },
    {
      id: 'col3',
      style: {
        //   backgroundColor: 'black',
        // padding: '1rem',
        justifyContent: 'center',
        minHeight: '100vh',
      },
      content: [
        {
          type: 'text',
          id: 'text1',
        },
        {
          type: 'button',
          id: 'btn2',
          text: 'Go to Google',
          setOnClick: { action: 'goTo', target: 'https://www.google.com' },
        },
        {
          type: 'image',
          id: 'img1',
          src: 'https://picsum.photos/200/300',
        },
        {
          type: 'form',
          id: 'form1',
          fields: [
            {
              id: 'field1',
              type: 'text',
              label: 'name',
              placeholder: 'enter your name',
            },
            {
              id: 'field2',
              type: 'text',
              label: 'email',
              placeholder: 'enter your email',
            },
            {
              id: 'field3',
              label: 'Username',
              placeholder: 'username',
              rules: [
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ],
            },
          ],
          submit: {
            text: 'submit',
            onClick: () => {
              console.log('form submitted');
            },
          },
        },
      ],
    },
  ],
};
export default layoutMockData;
