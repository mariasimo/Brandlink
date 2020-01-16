import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    minWidth: '500px',
    minHeight: '250px',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'column',
    padding: "2em 3em",
    transform: 'translate(-40%, -50%)',
    boxShadow: "0 0 20px  rgba(60,90,195, 0.4)"
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

export default class MyModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const projectId = this.props.projectId;

    return (
      <div>
        <button className="button is-primary is-light is-fullwidth" onClick={this.openModal}>Share this project</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <div>
          <a class='delete close-modal' onClick={this.closeModal}></a>
          <h3 className='title is-4'>Share this Brandlink</h3>
          <form id='contact-form' onSubmit={this.props.sendMessage} method='POST'>
            
            <div class='field is-grouped'>
              <p class='control is-expanded'>
                <input
                class="input"
                  type='email'
                  id='email'
                  aria-describedby='emailHelp'
                  placeholder='Email'
                ></input>
              </p>
              <input
              type='hidden'
              name='projectid'
              id='projectid'
              value={projectId}
            />
              <p class='control'>
                <button type="submit" class='button is-info'>Send</button>
              </p>
            </div>
          </form>
          </div>
        </Modal>
      </div>
    );
  }
}
