import PropTypes from 'prop-types'

function Card(props) {
  const { extra, children, ...rest } = props;
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 ${extra} `}
      {...rest}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  extra: PropTypes.string,
  children: PropTypes.any,
  rest: PropTypes.any
}

export default Card;
