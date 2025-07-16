import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  return (
    <>
      <style>
        {`
          .nav-link.active {
            background-color: white !important;
            color: red !important;
          }
        `}
      </style>
      
      <ListGroup
        id="wd-kambaz-navigation"
        style={{ width: 110 }}
        className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      >
        <ListGroup.Item
          id="wd-neu-link"
          target="_blank"
          href="https://www.northeastern.edu/"
          className="border-0 text-center"
        >
          <img src="/images/NEU.png" width="75px" />
        </ListGroup.Item>

        <ListGroup.Item 
          to="/Kambaz/Account" 
          as={NavLink}
          className="nav-link text-center border-0 bg-black text-white"
        >
          <FaRegCircleUser className="fs-1" /><br />
          Account
        </ListGroup.Item>

        <ListGroup.Item 
          to="/Kambaz/Dashboard" 
          as={NavLink}
          className="nav-link text-white border-0 bg-black text-center"
        >
          <LiaBookSolid className="fs-1" /><br />
          Dashboard
        </ListGroup.Item>

        <ListGroup.Item 
          to="/Kambaz/Courses/Home" 
          as={NavLink}
          className="nav-link text-white border-0 bg-black text-center"
        >
          <LiaBookSolid className="fs-1" /><br />
          Courses
        </ListGroup.Item>

        <ListGroup.Item
          to="/Kambaz/Calendar"
          as={NavLink}
          className="nav-link text-white bg-black text-center border-0"
        >
          <IoCalendarOutline className="fs-1" />
          <br />
          Calendar
        </ListGroup.Item>

        <ListGroup.Item
          to="/Kambaz/Inbox"
          as={NavLink}
          className="nav-link text-white bg-black text-center border-0"
        >
          <FaInbox className="fs-1" />
          <br />
          Inbox
        </ListGroup.Item>

        <ListGroup.Item
          to="/Labs"
          as={NavLink}
          className="nav-link text-white bg-black text-center border-0"
        >
          <LiaCogSolid className="fs-1" />
          <br />
          Labs
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}