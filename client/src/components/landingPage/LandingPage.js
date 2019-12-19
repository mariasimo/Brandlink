import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class LandingPage extends Component {
  render() {
    return (
      <section className='section main-content landing'>
        <div className='container columns'>
          <div className='column is-one-third'>
            {/* todo Here goes another component for the left para of the screen */}
            <div className='hero'>
              <h2 className='title is-1'>Your brand one click away.</h2>
              <p class=''>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                viverra massa vitae sem dignissim porta. Nulla in odio in urna
                auctor eleifend. Duis vitae rutrum quam.
              </p>
              <div class="is-grouped">
              <Link to='/signup' className='button is-rounded is-primary is-inverted is-medium'>
                Signup
              </Link>
              <Link to='/login' className='button is-rounded is-primary is-medium'>
                Login
              </Link>
              </div>
            </div>
          </div>

          <div className='column is-two-thirds'>
            <img src='/landing-illustration.png' alt='' />
          </div>
        </div>
      </section>
    );
  }
}
