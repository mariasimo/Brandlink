import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Hero extends Component {
    render() {
        return (
            <div className='hero'>
              <h2 className='title is-1'>Your brand one click away.</h2>
              <p class=''>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut viverra
                massa vitae sem dignissim porta. Nulla in odio in urna auctor eleifend.
                Duis vitae rutrum quam.
              </p>
              <div class='is-grouped'>
                <Link
                  to='/signup'
                  className='button is-rounded is-primary is-inverted is-medium'
                >
                  Signup
                </Link>
                <Link to='/login' className='button is-rounded is-primary is-medium'>
                  Login
                </Link>
              </div>
            </div>
        )
    }
}
