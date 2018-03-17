import React, { Component } from 'react';
import Styles from './styles.scss';

console.log(Styles)

import avatar from '../../theme/assets/lisa.png';

export default class Composer extends Component {
  render(){
     return (
         <section className = {Styles.composer} >
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