import React from 'react';
import '../template/css/index.css';
import '../template/resources/awesome/css/font-awesome.css';

class App extends React.Component {
  render(){
    return(
      <div className='container'>
        <Top/>
        <hr/>
        <div className='row'>
          <SideInfo className='col-sm-7'/>
          <LogSignForm className= "col-sm-5"/>
        </div>
        <Footer />
      </div>
    );
  }
}

class Top extends React.Component {
  render(){
    return(
      <h1>Explore cultures, through recipes</h1>
    );
  }
}

class SideInfo extends React.Component {
  render(){
    return(
      <div>
        <ul className = "fa-ul">
						<li><i className="fa-li fa fa-check-square"></i><h3><span className="main-points">Explore</span> recipes</h3></li>
						<li><i className="fa-li fa fa-check-square"></i><h3> <span className="main-points">Share</span> your recipes</h3></li>
						<li><i className="fa-li fa fa-check-square"></i><h3> Get and give <span className="main-points">feedback</span></h3></li>
						<li><i className="fa-li fa fa-check-square"></i><h3> Keep your <span className="main-points">favourites</span></h3></li>
				</ul>
      </div>
    );
  }
}


class LogSignForm extends React.Component {
  render(){
    return(
      <section id= "signin-login-section">

				<ul className="nav nav-tabs" id="signin-login-tab" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" data-toggle="tab" href="#sign-in" role="tab">Sign in</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" data-toggle="tab" href="#log-in" role="tab">Log in</a>
					</li>
				</ul>
				
				<div className="tab-content">
					
					<div id="sign-in" className="tab-pane active pad-content-above" role="tabpanel">
						<form className="form-horizontal" role="form">
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Firstname" id="firstname"/>
							</div>
							<div className="form-group">
								<input type="text" className="form-control" placeholder="Lastname" id="lastname"/>
							</div>
							<div className="form-group">
								<input type="email" className="form-control email" placeholder="Email"/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control password" placeholder="Password"/>
							</div>

							<div className="form-group">
								<button type="submit" className="btn btn-default">Sign in</button>
							</div>
						</form>	
					</div>

					<div id="log-in" className="tab-pane pad-content-above" role="tabpanel">
						<form className="form-horizontal" role="form">
							<div className="form-group">
								<input type="email" className="form-control email" placeholder="Email"/>
							</div>
							<div className="form-group">
								<input type="password" className="form-control password" placeholder="Password"/>
							</div>

							<div className="form-group">
								<button type="submit" className="btn btn-default">Log in</button>
							</div>

						</form>	
					</div>


				</div>

			</section>	
    );
  }
}


class Footer extends React.Component {
  render(){
    return(
      <footer>
            <p className="pull-right"><a href="#">Back to top</a></p>
            <p>&copy; 2017 Mustard, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
      </footer>
    );
  }
}


export default App;