import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdSearch} from 'react-icons/md'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    jobSearch: '',
    salary: '',
    empType: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied
    const {empType, salary, jobSearch} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${salary}&search=${jobSearch}`
    // const apiUrl = `https://apis.ccloyment_typnimum_pacrch=${jobSearch}`
    console.log('url', apiUrl)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const fetchedData = await response.json()
        const UpdatedData = fetchedData.jobs.map(eachjob => ({
          companyLogoUrl: eachjob.company_logo_url,
          employmentType: eachjob.employment_type,
          id: eachjob.id,
          jobDescription: eachjob.job_description,
          location: eachjob.location,
          packagePerAnnum: eachjob.package_per_annum,
          rating: eachjob.rating,
          title: eachjob.title,
        }))
        console.log('UpdatedData:', UpdatedData)

        this.setState({
          jobsList: UpdatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      console.log('Network error:', error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }
  renderJobs() {
    const {apiStatus} = this.state
    console.log('renderJobs api status=', apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderjobsList()
      case apiStatusConstants.failure:
        return this.renderApiFailed()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }
  handleRetry = () => {
    this.setState({isLoading: false})
    this.getJobs()
  }
  renderjobsList = () => {
    const {jobsList, apiFailed, isLoading, jobSearch} = this.state
    const {id} = jobsList

    console.log('=====jobslist===', jobsList, jobsList.length === 0)
    // TODO: Add No Products View

    return (
      <div className="all-products-container">
        <ul className="products-list">
          {jobsList.length > 0 ? (
            <ul className="products-list">
              {jobsList.map(eachjobcard => (
                <Link
                  to={`/jobs/${eachjobcard.id}`}
                  className="jobcardLink"
                  key={eachjobcard.id}
                >
                  <JobCard eachjobcardDetails={eachjobcard} />
                </Link>
              ))}
            </ul>
          ) : (
            <div className="productfailure_container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                alt="no jobs"
                className="productfailure_img"
              />
              <h1 className="failureapi_mainhead">No Jobs Found</h1>
              <p className="failureapi_mainhead">
                We could not find any jobs. Try other filters.
              </p>
            </div>
          )}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  renderApiFailed = () => {
    const {jobSearch} = this.state
    return (
      <div className="Mainapifailures_container">
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
      </div>
    )
  }

  // TODO: Add failure view
  onSelectSalaryRange = onSelectSalaryRange => {
    console.log('salary-', onSelectSalaryRange)
    this.setState({salary: onSelectSalaryRange}, this.getJobs)
  }
  onSelectEmploymentType = onSelectEmploymentType => {
    console.log('empType-------', onSelectEmploymentType)
    this.setState({empType: onSelectEmploymentType}, this.getJobs)
  }

  onSearchFilter = event => {
    // if (event.key === 'Enter') {
    //   this.setState({jobSearch: event.target.value}, this.getJobs)
    //   console.log('evetn trigerred enter', event.target.value)
    // }
    this.setState({jobSearch: event.target.value}) // Update state with every key press
    // if (event.key === 'Enter') {
    //   this.getJobs()
    // }
  }
  onSearchFilterKeyDown = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }
  OnSearchClick = event => {
    this.getJobs()
  }

  render() {
    const {isLoading, onSelectSalaryRange, onSelectEmploymentType, jobSearch} =
      this.state
    const {employmentTypesList, salaryRangesList} = this.props
    console.log('isloading==', isLoading)
    return (
      <>
        <Header />
        <div className="all-products-section">
          {/* TODO: Update the below element profile filter should be added here*/}

          <ul className="All_profile_Filter_container">
            <FiltersGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onSelectSalaryRange={this.onSelectSalaryRange}
              onSelectEmploymentType={this.onSelectEmploymentType}
            />
          </ul>
          <div className="all-products-container">
            <div className="searchcard_container">
              <div className="search_container">
                <div className="input_field_container">
                  <input
                    type="search"
                    placeholder="Search"
                    className="input_field"
                    value={jobSearch}
                    role="searchbox"
                    onChange={this.onSearchFilter}
                  />
                </div>

                <button
                  className="searchIcon_container"
                  onClick={this.OnSearchClick}
                  data-testid="searchButton"
                  type="button"
                >
                  <MdSearch className="search_img" />
                </button>
              </div>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
