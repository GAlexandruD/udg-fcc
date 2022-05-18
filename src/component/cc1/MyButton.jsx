const MyButton = ({ onClick, text, type = "button" }) => {
  return (
    <button
      className="p-4 m-2 bg-green-600 transition duration-150 ease-in-out focus:outline-none border border-transparent hover:bg-green-500 rounded text-yellow-50 px-5 h-8 flex items-center text-md shadow-md shadow-green-800"
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MyButton;
