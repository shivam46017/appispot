import Banner from "./components/Banner";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 lg:grid lg:grid-cols-1">
        <div className="col-span-1 lg:!mb-0">
          <Banner />
        </div>  
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProfileOverview;
