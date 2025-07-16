const TextComponent = ({
  text,
  fontSize,
  color,
  title,
  italic,
  className,
}) => {
  let textStyle = {};

  if (title) {
    textStyle = {
      fontWeight: '600',
      fontSize: '20px',
      color: 'black',
    };
  } else if (italic) {
    textStyle = {
      fontStyle: 'italic',
      fontSize: '16px',
      color: 'gray',
    };
  } else {
    textStyle = {
      fontWeight: 'normal',
      fontSize: '18px',
      color: 'black',
    };
  }

  if (fontSize) textStyle.fontSize = fontSize;
  if (color) textStyle.color = color;

  return <p style={textStyle} className={className}>{text}</p>;
};

export default TextComponent;
