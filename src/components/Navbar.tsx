import { SupervisorsApi } from "@dynopii/callchimp";
import { useEffect, useMemo, useState } from "react";
import { config } from "../API/ConfigAPI";
import { FcAssistant } from "react-icons/fc";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const SupervisorApi = new SupervisorsApi(config);
  const SupervisorApi = useMemo(() => new SupervisorsApi(config), []);

  interface supervisor {
    name: string | undefined;
    phone: string | undefined;
    otpVerified: boolean | undefined;
    id: number | undefined;
  }
  const [user, setUser] = useState<supervisor>({
    name: "",
    phone: "",
    otpVerified: false,
    id: 30,
  });

  const [otp, setOtp] = useState<string>();
  useEffect(() => {
    // const SupervisorApi = new SupervisorsApi(config);
    const supervisorDetails = SupervisorApi.supervisorsGet({ id: 30 });
    supervisorDetails
      .then((res) => {
        setUser({
          name: res.name,
          phone: res.phone,
          otpVerified: res.otpVerified,
          id: res.id,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [SupervisorApi]);

  const OTPInitiated = (value: number) => {
    const supervisorOTPSent = SupervisorApi.supervisorsSendotp({ id: value });
    supervisorOTPSent.then((res) => {
      console.log(res);
    });
  };

  const OTPChecker = (OTPvalue: number | undefined, id: number) => {
    const supervisorOTPverification = SupervisorApi.supervisorsVerifyotp({
      id: id,
      supervisorVerifyOtpRequest: { otp: OTPvalue },
    });
    supervisorOTPverification.then((res) => {
      console.log(res.message);
    });
  };

  return (
    <nav className="navbar bg-dark w-100">
      <div className="container-fluid">
        <a className="navbar-brand text-light fw-bold">
          {" "}
          <TiShoppingCart size="40px" color="yellow" /> E-Support
        </a>
        <div className="navbar-nav d-flex flex-row me-auto mb-2 mb-lg-0">
          <button className="nav-item btn btn-light mx-3 fw-bold">
            <Link to={"/"} className="text-decoration-none text-dark">
              {" "}
              Actions
            </Link>
          </button>
          <button className="nav-item btn btn-light mx-3 fw-bold">
            <Link to={"/dashboard"} className="text-decoration-none text-dark">
              {" "}
              Dashboard
            </Link>
          </button>
        </div>
        <div className="d-flex">
          <a
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => {
              if (typeof user.id === "number") {
                OTPInitiated(user?.id);
              }
            }}
            className={`card-link text-light d-${
              user.otpVerified ? "none" : "block"
            }`}
          >
            Send OTP
          </a>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Modal title
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="OTP"
                    aria-label="OTP"
                    aria-describedby="basic-addon1"
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                    value={otp}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    onClick={() => {
                      OTPChecker(user.id, Number(otp));
                    }}
                    type="button"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex mx-2 justify-content-center align-items-center">
            <div
              className={`p-2 fw-bold bg-${
                user.otpVerified ? "success" : "danger"
              } text-light rounded-pill`}
            >
              {user.otpVerified ? "verified" : "not-verfied"}
            </div>
          </div>
          <div className="d-flex mx-2 text-light flex-column justify-content-center align-items-center">
            <p className="fw-bold mb-0">{user.name}</p>
            <p className="text-secondary mb-0">{user.phone}</p>
          </div>
          <div className="fs-1 border border-3 p-2 mx-2 d-flex justify-content-center align-items-center ">
            <FcAssistant color="white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
