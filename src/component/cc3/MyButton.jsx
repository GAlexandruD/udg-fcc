const MyButton = ({
  onClick,
  clicked = false,
  text,
  type = "button",
  bgColor = "rgba(22,163,74,0.8)",
}) => {
  return (
    <button
      style={{
        backgroundColor: clicked ? bgColor : "rgba(0,0,0,0.8)",
        textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
      }}
      className={`${
        clicked
          ? "border-t-green-500"
          : "border-t-2 opacity-50 grayscale hover:grayscale-0 "
      } border-t-2 p-4 hover:border-t-green-500 m-2 transition duration-150 ease-in-out focus:outline-none border rounded text-yellow-50 px-5 h-8 flex items-center text-md shadow-md `}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MyButton;
