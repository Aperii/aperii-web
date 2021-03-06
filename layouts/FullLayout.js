import React, { Component, useState } from 'react';
import Search from '../components/Search'
import ProfileDropdown from '../components/ProfileDropdown'
import SidebarFeedOption from '../components/SidebarFeedOption'
function FullLayout(props) {
  const [open, setOpen] = useState(false)
  const [imgstuff, setBase] = useState('')
  const user = props.user
  function toggleDropdown(e) {
    setOpen(!open)
    e.target.className = `av ${open ? '' : 'clicked'}`
  }

  function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

  function makePost(e) {
    var reader = new FileReader()
    e.preventDefault()
    var reader = new FileReader();
    reader.onload = function(){
        var arrayBuffer = this.result;
        console.log(arrayBuffer);
        setBase(_arrayBufferToBase64(arrayBuffer))
    }
    //reader.readAsArrayBuffer(e.target[1].files[0]);
    e.target[2].disabled = true
    fetch(`https://aperii.com/api/v1/users/${user.id}/posts`, {
      body: JSON.stringify({
        body: e.target[0].value
      }),
      headers: {
        'content-type': 'application/json',
        authorization: localStorage.getItem('token')
      },
      method: 'POST'
    }).then(res => res.json()).then(json => {
      window.location = '/home'
    })
    return false
  }
  return (
    <div className="container">            
    <div className={`ui full`}>
  <div className={`sticky left`}>
    <span className={`logo`}></span>
    <SidebarFeedOption name="Home" current={true} icon="home"></SidebarFeedOption>
    <SidebarFeedOption name="Discover" icon="compass"></SidebarFeedOption>
  </div>
  <div className={`feed`}>
    <Search></Search>
    <div className="content">
      {props.children}
    </div>
  </div>
  <div className={`sticky right`}>
    <div className="av-container">
      <img className={`av`} src={'https://avatars.githubusercontent.com/u/44992537?v=1'} onClick={toggleDropdown}></img>
      {open ? <ProfileDropdown /> : ''}
    </div>
    <div className="sidebar-profile">
      <div className="profile"></div>
      <div className="post-form">
        <form onSubmit={makePost}>
          <input type="text"></input>
          <input type="file"></input>
          <input type="submit"></input>
          <img src={`data:image/png;base64, ${imgstuff}`}></img>
        </form>
      </div>
    </div>
  </div>  
</div>
</div>

);
}

export default FullLayout;