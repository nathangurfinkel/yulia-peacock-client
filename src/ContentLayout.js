// cms layout schema

//

const layout = {
  rows: [
    {
      id: 'row1',
      style: {
        backgroundColor: 'red',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      },
      columnsAmount: 2,
      columnIds: ['col1', 'col2'],
    },
    {
      id: 'row2',
      //etc
    },
  ],
  columns: [
    {
      id: 'col1',
      style: {
        backgroundColor: 'blue',
        padding: '1rem',
        justifyContent: 'center',
      },
      content: {
        type: 'text',
        text: 'text',
      },
    },
    {
      id: 'col2',
      style: {
        backgroundColor: 'green',
        padding: '1rem',
        justifyContent: 'center',
      },
    },
  ],
};
