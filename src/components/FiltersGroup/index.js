import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'
class FiltersGroup extends Component {
  state = {
    selectEmpList: '',
    isLoading: true,
    profileList: [],
    profileApiFailed: false,
  }
  checkboxList = []
  componentDidMount() {
    this.getProfileDetails()
  }
  handleRetry = () => {
    this.setState({isLoading: true})
    this.getProfileDetails()
  }
  renderLoader = () => {
    return (
      <div className="products-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    )
  }
  getProfileDetails = async () => {
    // this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const profileoptions = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const profileresponse = await fetch(profileApiUrl, profileoptions)

    if (profileresponse.ok) {
      const profileData = await profileresponse.json()
      const UpdatedData = {
        name: profileData.profile_details.name,
        profileImageUrl: profileData.profile_details.profile_image_url,
        shortBio: profileData.profile_details.short_bio,
      }

      this.setState({
        profileList: UpdatedData,
        isLoading: false,
        profileApiFailed: false,
      })
    } else {
      this.setState({isLoading: false, profileApiFailed: true})
    }
  }

  getRadiovalue = event => {
    const {onSelectSalaryRange} = this.props
    console.log('radio value', event.target.value)
    const salaryvalue = event.target.value
    onSelectSalaryRange(salaryvalue)
  }
  getCheckboxvalue = event => {
    const {onSelectEmploymentType} = this.props
    const checkboxvalue = event.target.value
    if (event.target.checked) {
      // Add value to checkboxList if checked
      if (!this.checkboxList.includes(checkboxvalue)) {
        this.checkboxList.push(checkboxvalue)
      }
    } else {
      // Remove value from checkboxList if unchecked
      const index = this.checkboxList.indexOf(checkboxvalue)
      if (index > -1) {
        this.checkboxList.splice(index, 1)
      }
    }
    const checkboxstring = this.checkboxList.join(',')

    this.setState({selectEmpList: checkboxstring})
    onSelectEmploymentType(checkboxstring)
    console.log('getCheckboxvalue:', this.checkboxList, checkboxstring)
  }
  render() {
    const {salaryRangesList, employmentTypesList} = this.props
    const {profileList, isLoading, profileApiFailed} = this.state
    const {name, profileImageUrl, shortBio} = profileList
    console.log(
      'prfilelist data+++++++++++++:',
      profileList,
      salaryRangesList,
      isLoading,
      profileApiFailed,
    )

    return (
      <>
        <div className="Profile_Filter_container">
          {profileApiFailed && (
            <div className="retrybtn_container">
              <button className="retryBtn" onClick={this.handleRetry}>
                Retry
              </button>{' '}
            </div>
          )}

          {isLoading && this.renderLoader()}
          {/* Profile Details Section */}
          {!isLoading && !profileApiFailed && (
            <div className="profile_container">
              <img
                src={profileImageUrl}
                className="profile_img"
                alt="profile"
              />
              <h1 className="profile_name">{name}</h1>
              <p className="profile_bio">{shortBio}</p>
            </div>
          )}
          {/* Employment Types and Salary Range - Always Displayed */}
          <hr className="line_break" />
          <h1 className="employeeType_header">Type of Employment</h1>
          {employmentTypesList.map(eachEmp => (
            <div className="checkbox_container" key={eachEmp.employmentTypeId}>
              <input
                type="checkbox"
                id={`checkboxname-${eachEmp.employmentTypeId}`}
                className="checkbox_field"
                value={eachEmp.employmentTypeId}
                onChange={this.getCheckboxvalue}
              />
              <label
                className="checkbox_label"
                htmlFor={`checkboxname-${eachEmp.employmentTypeId}`}
              >
                {eachEmp.label}
              </label>
            </div>
          ))}

          <hr className="line_break" />
          <h1 className="employeeType_header">Salary Range</h1>
          {salaryRangesList.map(eachSalary => (
            <div className="checkbox_container" key={eachSalary.salaryRangeId}>
              <input
                type="radio"
                name="salaryRadio"
                id={`salaryRadio-${eachSalary.salaryRangeId}`}
                className="checkbox_field"
                value={eachSalary.salaryRangeId}
                onChange={this.getRadiovalue}
              />
              <label
                className="checkbox_label"
                htmlFor={`salaryRadio-${eachSalary.salaryRangeId}`}
              >
                {eachSalary.label}
              </label>
            </div>
          ))}
        </div>
      </>
    )
  }
}
export default FiltersGroup
