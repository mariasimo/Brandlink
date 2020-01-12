import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class LandingPage extends Component {
  render() {
    return (
      <React.Fragment>
            <main className="landing-page">
        <section className='section main-content hero'>
        <div className='container columns'>
          <div className='column img'>
            {/* todo Here goes another component for the left para of the screen */}
            <div>
              <h1 className='title is-1'>Brand guidelines always on point.</h1>
              <p>
              BrandLink help designers to create and mantain neat, synced and always up-to-date brand guidelines they can share with their clients.  
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

          <div className='column is-three-fifths'>
            <img src='/landing-hero-illustration.png' alt=''/>
          </div>
        </div>
      </section>
      <section className="section is-paddingless blocks">
          {/* Block 1 */}
          <div className="columns block block-1">
            <div className="column is-half text">
              <h2 className="title is-3">What are brand guidelines and why are important?</h2>
              <p>Brand guidelines are a document of great importance for both designers and their clients. For the designer, summarizes the decisions he took at the branding stage, explaning graphics, rules, usage and values that form the brand. For clients, its a key reference for mantain brand looks, consistency and flexibility across teams, spaces and time.</p>
            </div>
            <div className="column is-half img">
              <img src='/landing-block-1.png' alt=''/>
            </div>
          </div>

          {/* Block 2 */}
          <div className="columns block block-2">
            <div className="column is-half img">
              <img src='/landing-block-2.png' alt=''/>
            </div>
            <div className="column is-half text">
              <h2 className="title is-3">What can we do to make better brand guidelines?</h2>
              <p>Very often, the hard work that goes into create a brand guideline its lost because it is a static document (usually a PDF), and client forgets about it, losses it or it simply gets outdated. This is a loss for designers, that sees its works misused, and clients, that lose value for their brands.</p>
            </div>
          </div>

          {/* Block 3 */}
          <div className="columns block block-3">
            <div className="column is-half text">
              <h2 className="title is-3">A tool to deliver brand guidelines online</h2>
              <p>We have created BrandLink as a solution for the problems inherent to brand guidelines. A dedicated format for visual identities, where designers can design, deliver and mantaioner brand guidelines that clients can reference, used and share very easily.</p>
            </div>
            <div className="column is-half img">
              <img src='/landing-block-3.png' alt=''/>
            </div>
          </div>

      </section>
      <section className="section features">
        <div className="container">
          <h2 className="title is-3">Learn about Brandlink features and values</h2>
          <div className="features-content">
            <div className="feature">
              <img src="/feat-no-coding.svg" alt="No coding required"/>
              <h3 className="title is-5">No coding required</h3>
              <p>An easy to-use-editor where you can add all the assets and display them on a grid without coding.</p>
            </div>
            <div className="feature">
              <img src="/feat-sharing.svg" alt="Share with clients"/>
              <h3 className="title is-5">Share with clients</h3>
              <p>Create and edit your project. Once your ready, share with your client just by sending the link.</p>
            </div>
            <div className="feature">
              <img src="/feat-synced.svg" alt="Always synced and updated"/>
              <h3 className="title is-5">Always synced and updated</h3>
              <p>Go back to a project anytime for maintenance. Changes are instantlly accesible for your client.</p>
            </div>
            <div className="feature">
              <img src="/feat-assets.svg" alt="Everything you need"/>
              <h3 className="title is-5">Everything you need</h3>
              <p>Add custom fonts, color palette, images and text to design a brand guideline that speaks for itself.</p>
            </div>
            <div className="feature">
              <img src="/feat-centralized.svg" alt="A centralized online space"/>
              <h3 className="title is-5">A centralized online space</h3>
              <p>Unify your brand guidelines in one place. Keep together your projects with the right access for everyone.</p>
            </div>
            <div className="feature">
              <img src="/feat-downloadable.svg" alt="Downloadable assets"/>
              <h3 className="title is-5">Downloadable assets</h3>
              <p>Never email a logo again. Clients and partners can download logos, vectors and other files.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="banner">
        <div className="container">
         <div className="banner-content">
            <img src="/logo-line.svg" alt="Logo"/>
            <h2 className="title is-3">Sign up and start today</h2>
            <p>Join us and make your first BrandLink today.</p>
            <Link to='/signup' className='button is-rounded is-primary is-inverted is-medium'>
              Create an account
            </Link>
         </div>
        </div>
      </section>
      </main>
      <footer className="landing-page-footer">
        <div className="container">
            <Link to='/' className='navbar-item'>
              <img
              src={`${process.env.REACT_APP_URL}/logo.svg`}
              height='24'
                alt='BrandLink'
              ></img>
            </Link>
            <p clasS="small">Created with hope and fear at Ironhack, 2019</p>
        </div>
      </footer>
      </React.Fragment>  
    );
  }
}
