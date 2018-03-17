import React, { Component } from 'react';

import avatar from '../../theme/assets/lisa.png';

export default class Composer extends Component {
  render(){
     return (
         <section>
           <img alt="lisa"
                src={ avatar }
           />
           <form>
             <textarea placeholder={`What do you think about, Oksana?`} />
             <input type="submit" value="Post"/>
           </form>
         </section>
     )
  }
}