import './index.css'
import {MdLocationOn, MdStar} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobCard = props => {
  const {eachjobcardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachjobcardDetails
  return (
    <li className="jobcard_container">
      <div className="joblogo_container">
        <div>
          <img
            src={companyLogoUrl}
            className="logo_container"
            alt="company logo"
          />
        </div>
        <div className="rating_container">
          <h1 className="rating_title">{title}</h1>
          <div className="star_container">
            <MdStar className="star_icon" />

            <p className="rating_number">{rating}</p>
          </div>
        </div>
      </div>{' '}
      <div className="salaryDetails_container">
        <div className="locationDetails_container">
          <MdLocationOn />
          <p className="location_title">{location}</p>
          <BsFillBriefcaseFill />
          <p className="employeetype_title">{employmentType}</p>
        </div>
        <div className="locationDetails_container">
          <h1 className="package_text">{packagePerAnnum}</h1>
        </div>
      </div>
      <hr className="line_break" />
      <div className="description_container">
        <h1 className="description_head">Description</h1>
        <p>{jobDescription}</p>
      </div>
    </li>
  )
}
export default JobCard
