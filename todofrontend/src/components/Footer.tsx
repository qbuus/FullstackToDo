import { useEffect, useState } from "react";
import dateFormat from "../utils/dateFormat";
import { VscGithubAlt } from "react-icons/vsc";
import { GrLinkedinOption } from "react-icons/gr";

export default function Footer() {
  const [date, setDate] = useState<string>(
    new Date().toString()
  );

  useEffect(() => {
    const dateInterval = setInterval(() => {
      setDate(new Date().toString());
    }, 60000);
    return () => {
      clearInterval(dateInterval);
    };
  }, []);

  const formattedDate = dateFormat(date);

  return (
    <footer className="page-footer font-small pt-4 bg-primary text-white fixed-bottom">
      <div className="container ">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase">Time</h5>
            <p>{formattedDate}</p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <ul className="list-unstyled">
              <li>
                <a href="https://github.com/qbuus">
                  <VscGithubAlt size={30} color="white" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/jakub-ko%C5%82cz-11843a267/">
                  <GrLinkedinOption size={30} color="white" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
