import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdStar} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header'
import './index.css'
class JobItemDetails extends Component {
  state = {isLoading: true, jobItemList: [], apiFailed: false}
  componentDidMount() {
    this.getJobItemDetailsApi()
  }
  renderLoader = () => {
    return (
      <div className="products-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }
  handleRetry = () => {
    this.setState({isLoading: true, apiFailed: false}, () =>
      this.getJobItemDetailsApi(),
    )
    // this.renderJodItemDetail()
  }
  renderJodItemDetail = () => {
    const {jobItemList} = this.state
    const {jobDetails} = jobItemList
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      lifeAtCompany,
      skills,
    } = jobDetails
    const {similarJobs} = jobItemList
    const {description, imageUrl} = lifeAtCompany
    console.log('title', title)
    return (
      <div className="jobItemDetails_container">
        <ul className="jobcard_container">
          <li className="joblogo_container">
            <div>
              <img
                src={companyLogoUrl}
                className="logo_container"
                alt="job details company logo"
              />
            </div>
            <div className="rating_container">
              <h1 className="rating_title">{title}</h1>
              <div className="star_container">
                <MdStar className="star_icon" />

                <p className="rating_number">{rating}</p>
              </div>
            </div>
          </li>{' '}
          <li className="salaryDetails_container">
            <div className="locationDetails_container">
              <MdLocationOn />
              <p className="location_title">{location}</p>
              <BsFillBriefcaseFill />
              <p className="employeetype_title">{employmentType}</p>
            </div>
            <div className="locationDetails_container">
              <p className="package_text">{packagePerAnnum}</p>
            </div>
          </li>
          <hr className="line_break" />
          <li className="description_container">
            <div className="description_header_container">
              <h1 className="description_head">Description</h1>
              <a href={companyWebsiteUrl} className="visit_link_container">
                Visit <FaExternalLinkAlt className="visitLink_icon" />
              </a>
            </div>

            <p>{jobDescription}</p>
          </li>
          <ul className="skills_container">
            <h1>Skills</h1>
            <li className="eachSkill_container">
              {skills.map(each => (
                <div className="eachskill_imgCOntainer" key={each.name}>
                  <img
                    src={each.imageUrl}
                    className="skill_img"
                    alt={each.name}
                  />
                  <h5>{each.name}</h5>
                </div>
              ))}
            </li>
            <li className="lifeAtCompany_container">
              <div className="lifeatCompany_text_container">
                <h1>Life At Company</h1>
                <p>{description}</p>
              </div>
              <div>
                <img
                  src={imageUrl}
                  alt="life at company"
                  className="lifeatCompany_img"
                />
              </div>
            </li>
          </ul>
        </ul>

        <ul className="similarJobs_container">
          <h1 className="similarJob_header">Similar Jobs</h1>
          <li className="eachSimilarJob_container">
            {similarJobs.map(eachsimilarjob => (
              <div
                className="eachsimilarjobCard_container"
                key={eachsimilarjob.id}
              >
                <div className="jobcard_container">
                  <div className="joblogo_container">
                    <div>
                      <img
                        src={eachsimilarjob.companyLogoUrl}
                        className="logo_container"
                        alt="similar job company logo"
                      />
                    </div>
                    <div className="rating_container">
                      <h1 className="rating_title">{eachsimilarjob.title}</h1>
                      <div className="star_container">
                        <MdStar className="star_icon" />

                        <p className="rating_number">{eachsimilarjob.rating}</p>
                      </div>
                    </div>
                  </div>{' '}
                  <div className="description_container">
                    <h1 className="description_head">Description</h1>

                    <p>{eachsimilarjob.jobDescription}</p>
                  </div>
                  <div className="locationDetails_container">
                    <MdLocationOn />
                    <p className="location_title">{eachsimilarjob.location}</p>
                    <BsFillBriefcaseFill />
                    <p className="employeetype_title">
                      {eachsimilarjob.employmentType}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </li>
        </ul>
      </div>
    )
  }
  getJobItemDetailsApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const JobItemurl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const JobItemeoptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const JobitemResponse = await fetch(JobItemurl, JobItemeoptions)
    if (JobitemResponse.ok) {
      const Jobitemdata = await JobitemResponse.json()
      console.log('jobDetails+++++++++:', Jobitemdata)
      const UpdatedJobItemData = {
        jobDetails: {
          companyLogoUrl: Jobitemdata.job_details.company_logo_url,
          companyWebsiteUrl: Jobitemdata.job_details.company_website_url,
          employmentType: Jobitemdata.job_details.employment_type,
          id: Jobitemdata.job_details.id,
          jobDescription: Jobitemdata.job_details.job_description,
          location: Jobitemdata.job_details.location,
          packagePerAnnum: Jobitemdata.job_details.package_per_annum,
          rating: Jobitemdata.job_details.rating,
          title: Jobitemdata.job_details.title,
          lifeAtCompany: {
            description: Jobitemdata.job_details.life_at_company.description,
            imageUrl: Jobitemdata.job_details.life_at_company.image_url,
          },
          skills: Jobitemdata.job_details.skills.map(eachskill => ({
            imageUrl: eachskill.image_url,
            name: eachskill.name,
          })),
        },
        similarJobs: Jobitemdata.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      this.setState({
        jobItemList: UpdatedJobItemData,
        isLoading: false,
        apiFailed: false,
      })
    } else {
      this.setState({isLoading: false, apiFailed: true})
    }
  }

  render() {
    const {isLoading, apiFailed, jobItemList} = this.state

    console.log('loading,jobitemlist-=-=-=-', jobItemList, isLoading)
    if (apiFailed) {
      return (
        <div className="failureApi_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            className="failureApi_img"
            alt="failure view"
          />
          <h1 className="failureapi_mainhead">Oops! Something Went Wrong!</h1>
          <p className="failureapi_mainhead">
            We cannot seem to find the page you are looking for.
          </p>

          <button className="retry_btn" onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      )
    }
    return (
      <>
        <Header />
        <div className="jobItemBg_container">
          {isLoading ? this.renderLoader() : this.renderJodItemDetail()}
        </div>
      </>
    )
  }
}
export default JobItemDetails
