const MyButton = ({ onClick, clicked = false, text, type = "button" }) => {
  return (
    <button
      disabled
      className={`${
        clicked
          ? "bg-green-900 hover:bg-green-800 shadow-green-900"
          : "bg-green-600 hover:bg-green-500 shadow-green-800"
      } p-4 m-2 transition duration-150 ease-in-out focus:outline-none border border-transparent  rounded text-yellow-50 px-5 h-8 flex items-center text-md shadow-md`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MyButton;
