import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Profileitem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills
  }
}) => {
  return (
    <div className='profile bg-light'>
      <div>
        <h2>{name}</h2>
        <img src={avatar} width='42'></img>
        <p>
          {status} {company && <span>at {company}</span>}
          <p className='my-1'>{location && <span>{location}</span>}</p>
          <Link to={`/profile/${_id}`} className='btn btn-primary'>
            View Profile
          </Link>
        </p>
      </div>
      <ul>
        {skills.map((skill, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

Profileitem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profileitem;
