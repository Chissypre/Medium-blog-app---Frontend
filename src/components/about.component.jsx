import React from 'react'
import { Link } from 'react-router-dom';
import { FaYoutube } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { getFullDay } from '../common/date';

const AboutUser = ({className, bio, social_links,joinedAt}) => {
  const iconSize = 30; 
  return (
    <div className={'md:w-[90%] md::mt-7' + className}>
      <p>{bio.length ? bio:"Nothing to read here"}</p>

      <div className="flex gap-x-7 flex-wrap my-7 items-center text-dark-grey">
        {social_links.youtube && (
          <Link to={social_links.youtube} key="youtube" target='_blank'>
            <FaYoutube size={iconSize}/>
          </Link>
        )}

        {social_links.github && (
          <Link to={social_links.github} key="github" target='_blank'>
            <FaGithubSquare size={iconSize} />
          </Link>
        )}

        {social_links.facebook && (
          <Link to={social_links.facebook} key="facebook" target='_blank'>
            <FaFacebook size={iconSize} />
          </Link>
        )}
      </div>
      <p className='text-xl leading-7 text-dark-grey'>Joined on {getFullDay(joinedAt)}</p>
    </div>
  )
}

export default AboutUser