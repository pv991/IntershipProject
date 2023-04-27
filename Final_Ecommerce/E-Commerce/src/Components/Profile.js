import React from 'react'

function Profile() {
  const userDetails = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
    <div className="container">
      <section className="vh-100" style={{backgroundColor: '#eee'}}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-4">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body text-center">
                  <div className="mt-3 mb-4 col-3 ms-auto mr-auto">
                    <img src={`http://localhost:5000/${userDetails.Image}`} className="rounded-circle img-fluid" style={{width: '100px',height:"auto"}} />
                  </div>
                  <h4 className="mb-2">{userDetails.FirstName} {userDetails.LastName}</h4>
                  <p className="text-muted mb-4">
                    <span> {userDetails.Email} </span><span className="mx-2">|</span>
                    <span>{userDetails.Number}</span>
                  </p>
                  <p className="text-muted mb-4">
                    <span> {userDetails.DateOfBirth} </span><span className="mx-2">|</span>
                    <span>{userDetails.Gender == "m" || userDetails.Gender == "male" || userDetails.Gender =="Male" ?"Male" :"Female" }</span>
                  </p>
                  <p className="text-muted mb-4">
                    <span> {userDetails.Address}</span>
                  </p>
                  <div className="mb-4 pb-2">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  )
}

export default Profile;