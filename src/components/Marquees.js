const Marquees = ({ contentText }) => {
  return (
    <div className="bg-black relative flex overflow-x-hidden">
      <div className="animate-marquee">
        <span className="text-xl font-medium text-white mx-8 uppercase whitespace-nowrap">
          {contentText}
        </span>
      </div>

      <div className="absolute top-0 animate-marquee2">
        <span className="text-xl font-medium text-white mx-8 uppercase whitespace-nowrap">
          {contentText}
        </span>
      </div>
    </div>
  );
};

export default Marquees;
