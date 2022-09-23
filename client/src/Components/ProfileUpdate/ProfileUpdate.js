import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProfileUpdate.css";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [img, setimg] = useState();
  const [bio, setBio] = useState("");
  const [locationn, setLocation] = useState("");
  const [imgPre, setimgPre] = useState("");
  const location = useLocation();
  const { data } = location.state;
  const [dataa, setdataa] = useState(data);

  const proimage = async () => {
    if (imgPre === "") {
      const res = await fetch("/updateprofileinitial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          bio,
          location: locationn,
          username: dataa,
        }),
      });
      navigate("/signin");
    } else {
      const picdata = new FormData();
      picdata.append("file", img);
      picdata.append("upload_preset", "filtersocialimages");
      picdata.append("cloud_name", "filtersocialnew");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/filtersocialnew/image/upload",
        {
          method: "POST",
          body: picdata,
        }
      );
      const dataaa = await res.json();
      const ress = await fetch("/updateprofilepicinitial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          bio,
          location: locationn,
          url: dataaa.url,
          username: dataaa.secure_url,
        }),
      });
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setimgPre(reader.result);
      };
      reader.readAsDataURL(img);
    } else {
      setimgPre("");
    }
  }, [img]);

  const profilestateupload = async (event) => {
    setimg(event.target.files[0]);
  };
  return (
    <div className="profileupdatemain">
      <div
        className="EditProfile"
        onClick={() => {
          navigate("/loginRegi");
        }}
      ></div>
      <div className="EditProfile_box">
        <div className="edit_header">
          <i
            className="fas fa-times"
            onClick={() => {
              navigate("/loginRegi");
            }}
          ></i>
          <h2>Add Profile</h2>
          <button className="save_button" onClick={proimage}>
            Save
          </button>
        </div>

        <label htmlFor="pic_upload">
          <div className="profile_pic_center">
            {imgPre === "" ? (
              <img
                src="/profile/defaultimg.png"
                className="profile_pic"
                alt=""
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img
                src={imgPre}
                className="profile_pic"
                style={{ objectFit: "cover" }}
                alt=""
              />
            )}
          </div>
        </label>
        <input
          type="file"
          id="pic_upload"
          accept="image/png, image/jpg, image/jpeg"
          onChange={profilestateupload}
        />
        <div className="warning">
          <p>*To Update Your Profile Click on Save Button</p>
        </div>
        <div className="profie_update">
          <div>
            <form className="regi_form" method="POST">
              <div className="regi_in">
                <input
                  type="text"
                  placeholder="Bio (optional)"
                  className="regi_input_profile"
                  name="Bio"
                  autoComplete="off"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="regi_in">
                <input
                  type="text"
                  placeholder="Location (optional"
                  className="regi_input_profile"
                  name="Location"
                  autoComplete="off"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
