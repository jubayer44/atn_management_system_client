const Footer = () => {
  const currentYear = new Date()?.getFullYear();
  return (
    <div className="bg-gray-200 text-tColor p-4 md:ml-[256px]">
      <p className="text-center text-sm font-[500]">
        © {currentYear} NOVA Great Banquet
      </p>
    </div>
  );
};

export default Footer;
