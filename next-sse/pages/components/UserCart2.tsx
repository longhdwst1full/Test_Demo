export const UserCard3 = ({ photo, name, city, country }) => {
  return (
    <div className="mb-4 w-full h-auto p-4 flex flex-row gap-4 border rounded-xl">
      <div className="avatar">
        <div className="w-24 rounded-full">
          <img src={photo} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start">
        <strong>{name}</strong>
        <span className="text-sm">{city + ", " + country}</span>
      </div>
    </div>
  );
};
