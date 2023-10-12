import Banner from "./components/Banner";
import General from "./components/General";
import Notification from "./components/Notification";
import Project from "./components/Project";
import Storage from "./components/Storage";
import Upload from "./components/Upload";

const ProfileOverview = () => {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="w-ful mt-3 lg:grid lg:grid-cols-1">
        <div className="col-span-1 lg:!mb-0">
          
          <Banner />
        </div>  

        {/* <div className="col-span-3 lg:!mb-0">
          <Storage />
        </div> */}

        {/* <div className="z-0 col-span-5 lg:!mb-0">
          <Upload />
        </div> */}
        {/* <div className="lg:mb-0">
          <Project />
        </div>

        <div className="lg:mb-0">
          <Notification />
        </div> */}
      </div>
      {/* all project & ... */}

      {/* <div className="grid h-full grid-cols-2 gap-5"> */}
        

      {/* </div> */}
    </div>
  );
};

export default ProfileOverview;
