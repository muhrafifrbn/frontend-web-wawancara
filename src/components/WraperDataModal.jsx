const WrapperDataModal = ({ title, value }) => {
  return (
    <div className="border border-gray-500 p-3 rounded-lg group hover:bg-red-500 hover:border-red-400">
      <p className="text-red-900 font-bold group-hover:text-white text-lg">{title}</p>
      <p className="group-hover:text-white text-md">{value}</p>
    </div>
  );
};

export default WrapperDataModal;
