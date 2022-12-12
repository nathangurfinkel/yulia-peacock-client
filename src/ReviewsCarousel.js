import { Card, Carousel, Typography } from 'antd';
const contentStyle = {
  height: '160px',
  color: '#db3314',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#ffcfc4',
};
export default function ReviewsCarousel() {
  // const namesAndText = {
  //     'John Doe':
  //       'I was struggling with my mental health and I was looking for a therapist. I found Yulia and she helped me a lot. I am very grateful for her help.',
  //     'Jane Doe':
  //       'Meeting with Yulia was a great experience. She is very professional and I felt very comfortable with her. I would recommend her to anyone.',
  //     'Homer Simpson':
  //       'I was having a hard time with my family and I was looking for a therapist. I found Yulia and she helped me a lot. I am very grateful for her help.',
  //     'Marge Simpson':
  //       'One of the best therapists I have ever met. She is very professional and I felt very comfortable with her. I would recommend her to anyone.',
  //     'Bart Simpson':
  //       'I met with Yulia and she helped me a lot. I am very grateful for her help.',
  //     'Lisa Simpson':
  //       'Professional and very helpful. I would recommend her to anyone.',
  //     'Maggie Simpson': 'Wonderful experience. I would recommend her to anyone.',
  //     'Peter Griffin':
  //       'I was struggling with my mental health and I was looking for a therapist. I found Yulia and she helped me a lot. I am very grateful for her help.',
  //     'Lois Griffin':
  //       'Meeting with Yulia was a great experience. She is very professional and I felt very comfortable with her. I would recommend her to anyone.',
  //     'Meg Griffin':
  //       'I was having a hard time with my family and I was looking for a therapist. I found Yulia and she helped me a lot. I am very grateful for her help.',
  //     'Chris Griffin':
  //       'One of the best therapists I have ever met. She is very professional and I felt very comfortable with her. I would recommend her to anyone.',
  //     'Stewie Griffin':
  //       'I met with Yulia and she helped me a lot. I am very grateful for her help.',
  //   };

  //   returns carousel with names as title and texts as content
  const { Title, Paragraph, Text } = Typography;

  return (
    <Card>
      <Carousel
        autoplay
        style={{
          borderRadius: '25px',
        }}
      >
        <div
          style={{
            borderRadius: '25px',
          }}
        >
          <Title level={3}>John Doe</Title>
          <Paragraph style={contentStyle}>
            I was struggling with my mental health and I was looking for a
            therapist. I found Yulia and she helped me a lot. I am very grateful
            for her help.
          </Paragraph>
        </div>
        <div>
          <Title level={3}>Jane Doe</Title>
          <Paragraph style={contentStyle}>
            Meeting with Yulia was a great experience. She is very professional
            and I felt very comfortable with her. I would recommend her to
            anyone.
          </Paragraph>
        </div>
        <div>
          <Title level={3}>Homer Simpson</Title>
          <Paragraph style={contentStyle}>
            I was having a hard time with my family and I was looking for a
            therapist. I found Yulia and she helped me a lot. I am very grateful
            for her help.
          </Paragraph>
        </div>
      </Carousel>
    </Card>
  );
}
